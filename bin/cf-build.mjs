#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

function ensureVercelProjectFile() {
  const filePath = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    ".vercel",
    "project.json",
  );

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

ensureVercelProjectFile();

run("Patch next-on-pages duplicate chunk guard", process.execPath, [
  join(scriptDir, "patch-next-on-pages.mjs"),
]);
run("Build Next.js app via Vercel CLI", "npx", ["vercel", "build", "--yes"]);
run("Generate Cloudflare Worker bundle", process.execPath, [
  join(
    scriptDir,
    "..",
    "node_modules",
    "@cloudflare",
    "next-on-pages",
    "bin",
    "index.js",
  ),
  "--skip-build",
  "--disableChunksDedup",
]);
