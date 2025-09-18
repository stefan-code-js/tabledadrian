import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const nodeRequire = createRequire(import.meta.url);

const tsOptions = {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
    jsx: ts.JsxEmit.ReactJSX,
  },
};
const cache = new Map();
const testDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(testDir, '..');

function loadTs(filePath) {
  if (cache.has(filePath)) return cache.get(filePath);
  const code = fs.readFileSync(filePath, 'utf8');
  const { outputText } = ts.transpileModule(code, tsOptions);
  const module = { exports: {} };
  const dirname = path.dirname(filePath);
  const requireFn = (p) => {
    if (p.startsWith('.')) {
      let resolved = path.resolve(dirname, p);
      if (!fs.existsSync(resolved) && fs.existsSync(resolved + '.ts')) {
        resolved += '.ts';
      } else if (!fs.existsSync(resolved) && fs.existsSync(resolved + '.tsx')) {
        resolved += '.tsx';
      }
      if (resolved.endsWith('.ts')) {
        return loadTs(resolved);
      }
      if (resolved.endsWith('.tsx')) {
        return loadTs(resolved);
      }
      return nodeRequire(resolved);
    }
    if (p.startsWith('@/')) {
      let resolved = path.resolve(projectRoot, 'src', p.slice(2));
      if (!fs.existsSync(resolved) && fs.existsSync(resolved + '.ts')) {
        resolved += '.ts';
      } else if (!fs.existsSync(resolved) && fs.existsSync(resolved + '.tsx')) {
        resolved += '.tsx';
      }
      if (resolved.endsWith('.ts') || resolved.endsWith('.tsx')) {
        return loadTs(resolved);
      }
      return nodeRequire(resolved);
    }
    if (p === 'vitest') {
      return { describe: globalThis.describe, it: globalThis.it, expect: globalThis.expect, vi };
    }
    return nodeRequire(p);
  };
  const context = {
    module,
    exports: module.exports,
    require: requireFn,
    __dirname: dirname,
    __filename: filePath,
    process,
    URLSearchParams,
    Request: globalThis.Request,
    Response: globalThis.Response,
    fetch: globalThis.fetch,
  };
  vm.runInNewContext(outputText, context, { filename: filePath });
  cache.set(filePath, module.exports);
  return module.exports;
}

function expect(val) {
  return {
    toBe: (exp) => { if (val !== exp) throw new Error(`Expected ${val} to be ${exp}`); },
    toBeTruthy: () => { if (!val) throw new Error(`Expected value to be truthy`); }
  };
}

const vi = {
  fn: (impl = () => {}) => {
    const fn = (...args) => fn.impl(...args);
    fn.impl = impl;
    fn.mockResolvedValue = (val) => { fn.impl = () => Promise.resolve(val); return fn; };
    return fn;
  }
};
const pending = [];
globalThis.describe = (name, fn) => { console.log(name); fn(); };
globalThis.it = (name, fn) => {
  try {
    const res = fn();
    if (res instanceof Promise) {
      pending.push(res.then(() => console.log('✓', name)).catch((e) => { console.error('✗', name); console.error(e); process.exitCode = 1; }));
    } else {
      console.log('✓', name);
    }
  } catch (e) {
    console.error('✗', name);
    console.error(e);
    process.exitCode = 1;
  }
};
globalThis.expect = expect;
globalThis.vi = vi;
for (const file of fs.readdirSync(testDir)) {
  if (file.endsWith('.test.ts')) {
    loadTs(path.join(testDir, file));
  }
}
await Promise.all(pending);
if (process.exitCode > 0) {
  process.exit(process.exitCode);
} else {
  console.log('All tests passed');
}
