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

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env: process.env,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

ensureVercelProjectFile();
run(process.execPath, [join(dirname(fileURLToPath(import.meta.url)), "patch-next-on-pages.mjs")]);
run("npx", ["vercel", "build", "--yes"]);
=======
run("npx", ["vercel", "build"]);
run("node", [
  "node_modules/@cloudflare/next-on-pages/bin/index.js",
  "--skip-build",
  "--disableChunksDedup",
]);

