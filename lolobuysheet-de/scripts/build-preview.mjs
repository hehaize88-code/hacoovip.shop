import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
const name = 'lolobuysheet-preview';
const site = 'https://lolobuysheet-preview.hehaize88.workers.dev';
const result = spawnSync('npm', ['run', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, PUBLIC_SITE_URL: site, PUBLIC_SITE_PREVIEW: 'true' },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
const configPath = 'dist/server/wrangler.json';
const config = JSON.parse(readFileSync(configPath, 'utf8'));
config.name = name;
config.topLevelName = name;
writeFileSync(configPath, JSON.stringify(config));
writeFileSync('dist/client/robots.txt', 'User-agent: *\nDisallow: /\n');
const headersPath = 'dist/client/_headers';
const headers = readFileSync(headersPath, 'utf8');
writeFileSync(headersPath, headers + '\n/*\n  X-Robots-Tag: noindex, nofollow, noarchive\n');
console.log(`Temporary preview build ready: ${site}`);
