import { execFileSync } from "node:child_process";

execFileSync("python3", ["scripts/validate-localized-export.py"], { stdio: "inherit" });
