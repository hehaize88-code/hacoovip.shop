# LoloBuy Cloudflare 临时预览

用户于 2026-10-19 明确授权通过浏览器创建临时预览。

- GitHub 仓库：hehaize88-code/hacoovip.shop
- 目录：lolobuysheet-de
- 分支：main；独立目录内提供 build:preview 构建入口
- Worker 名称：lolobuysheet-preview
- 预期地址（部署前不视为可用）：https://lolobuysheet-preview.hehaize88.workers.dev
- 构建：npm run build:preview；部署：npx wrangler deploy；Node 24。
- 保留 Astro SSR + SSG；唯一商品源 cnfanshm.com；无数据库或商品快照。
- 所有页面 noindex/nofollow；robots 禁止收录；独立 Worker 无正式域名路由。
- npm run build 保留正式域名配置；build:preview 在构建时切换临时 origin、禁止收录并设置生成产物的 Worker 名称，不修改其他域名目录。
- 完成后必须验证实际公开访问与 SSR 数据链路，不能仅凭构建成功宣称可用。
