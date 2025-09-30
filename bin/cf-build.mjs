#!/usr/bin/env node

import { spawnSync } from "node:child_process";

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    env: process.env,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("npx", ["vercel", "build"]);
run("node", [
  "node_modules/@cloudflare/next-on-pages/bin/index.js",
  "--skip-build",
  "--disableChunksDedup",
]);

