import { spawn, spawnSync } from "node:child_process";

function run(command, args) {
  const executable = process.platform === "win32" ? `${command}.cmd` : command;
  const result = spawnSync(executable, args, { stdio: "inherit", env: process.env });
  if (result.status !== 0) process.exit(result.status || 1);
}

if (process.env.DATABASE_URL) {
  run("npx", ["--no-install", "drizzle-kit", "migrate"]);
  run("npx", ["--no-install", "tsx", "scripts/seed.ts"]);
}
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const server = spawn(npm, ["start"], { stdio: "inherit", env: process.env });
process.on("SIGTERM", () => server.kill("SIGTERM"));
process.on("SIGINT", () => server.kill("SIGINT"));
server.on("exit", (code) => process.exit(code ?? 1));
