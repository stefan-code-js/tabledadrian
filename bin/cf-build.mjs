#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

function parseEnvFile(filePath) {
  const content = readFileSync(filePath, "utf8");
  const parsed = new Map();

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) {
      continue;
    }

    const exportPrefix = line.startsWith("export ") ? "export " : "";
    const lineWithoutExport = exportPrefix ? line.slice(exportPrefix.length) : line;
    const equalsIndex = lineWithoutExport.indexOf("=");

    if (equalsIndex === -1) {
      continue;
    }

    const key = lineWithoutExport.slice(0, equalsIndex).trim();
    if (!key) {
      continue;
    }

    let value = lineWithoutExport.slice(equalsIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    value = value.replace(/\\n/g, "\n").replace(/\\r/g, "\r");

    parsed.set(key, value);
  }

  return parsed;
}

function loadEnvFiles(projectRoot) {
  const nodeEnv = process.env.NODE_ENV ?? "production";
  const envFiles = [
    `.env.${nodeEnv}.local`,
    ".env.local",
    `.env.${nodeEnv}`,
    ".env",
  ];

  const resolved = new Map();

  for (const fileName of envFiles) {
    const filePath = join(projectRoot, fileName);
    if (!existsSync(filePath)) {
      continue;
    }

    const pairs = parseEnvFile(filePath);
    for (const [key, value] of pairs.entries()) {
      resolved.set(key, value);
    }
  }

  for (const [key, value] of resolved.entries()) {
    if (typeof process.env[key] === "undefined") {
      process.env[key] = value;
    }
  }
}

function ensureVercelProjectFile(projectRoot) {
  const filePath = join(projectRoot, ".vercel", "project.json");

  if (!existsSync(filePath)) {
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(
      filePath,
      JSON.stringify({ projectId: "local", orgId: "local" }, null, 2) + "\n",
      "utf8",
    );
  }
}

function run(label, command, args) {
  console.log(`\n> ${label}`);

  const result = spawnSync(command, args, {
    stdio: "inherit",
    env: process.env,
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    console.error(`\nX ${label} exited with code ${result.status ?? 1}`);
    process.exit(result.status ?? 1);
  }
}

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(scriptDir, "..");

// Load .env files so Stripe and other secrets reach the Vercel build step.
loadEnvFiles(projectRoot);
ensureVercelProjectFile(projectRoot);

run("Patch next-on-pages duplicate chunk guard", process.execPath, [
  join(scriptDir, "patch-next-on-pages.mjs"),
]);
run("Build Next.js app via Vercel CLI", "npx", ["vercel", "build", "--yes"]);
run("Generate Cloudflare Worker bundle", process.execPath, [
  join(
    projectRoot,
    "node_modules",
    "@cloudflare",
    "next-on-pages",
    "bin",
    "index.js",
  ),
  "--skip-build",
  "--disableChunksDedup",
]);
