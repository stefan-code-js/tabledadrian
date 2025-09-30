#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const targetPath = join(here, "..", "node_modules", "@cloudflare", "next-on-pages", "dist", "index.js");

let contents;
try {
  contents = readFileSync(targetPath, "utf8");
} catch {
  // Dependency not installed; nothing to patch.
  process.exit(0);
}

const patchedMarker = 'Duplicate identifier "${ident.identifier}" detected in ${entrypoint}; continuing without chunk deduplication.';
if (contents.includes(patchedMarker)) {
  // Already patched.
  process.exit(0);
}

const originalSnippet = String.raw`    if (!existing) {
      foundIdentifiers.set(ident.identifier, { consumers: [entrypoint] });
    } else if (!uniqueIdentifiers.has(ident.identifier)) {
      existing.consumers.push(entrypoint);
    } else {
      cliError(
        \`ERROR: A duplicated identifier has been detected in the same function file, aborting.\`,
        { spaced: true, showReport: true }
      );
      process.exit(1);
    }
    uniqueIdentifiers.add(ident.identifier);
  }
}`;

const patchedSnippet = String.raw`    if (!existing) {
      foundIdentifiers.set(ident.identifier, { consumers: [entrypoint] });
    } else if (!uniqueIdentifiers.has(ident.identifier)) {
      existing.consumers.push(entrypoint);
    } else {
      if (!existing.warnedDuplicate) {
        existing.warnedDuplicate = true;
        cliWarn(
          \`Duplicate identifier "\${ident.identifier}" detected in \${entrypoint}; continuing without chunk deduplication.\`,
          { spaced: true }
        );
      }
      continue;
    }
    uniqueIdentifiers.add(ident.identifier);
  }
}`;

if (!contents.includes(originalSnippet)) {
  console.warn("@cloudflare/next-on-pages format changed; duplicate identifier patch not applied.");
  process.exit(0);
}

writeFileSync(targetPath, contents.replace(originalSnippet, patchedSnippet), "utf8");
console.log("Applied duplicate identifier patch to @cloudflare/next-on-pages.");
