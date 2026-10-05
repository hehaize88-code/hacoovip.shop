import { execFileSync } from "node:child_process";

execFileSync("python3", ["scripts/localize-export.py"], { stdio: "inherit" });
