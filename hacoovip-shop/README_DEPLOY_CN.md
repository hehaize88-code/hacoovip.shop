# hacoovip.shop 部署与多语言维护

- 仓库：`hehaize88-code/hacoovip.shop`，该仓库包含多个站点。
- 本站静态文件目录：`hacoovip-shop/`。
- 现有 Cloudflare Pages 项目：`hacoovip-shop`，生产分支 `main`。
- 正式域名：`https://hacoovip.shop/`。
- 保留现有 Git 集成和 `_worker.js` 的规范网址重定向；不需要新建项目。

本次多语言内容源及构建脚本位于 `.github/content/hacoovip-20261102/`。在仓库根目录运行：

```sh
python .github/content/hacoovip-20261102/build.py
python .github/content/hacoovip-20261102/verify.py
node --check hacoovip-shop/assets/js/main.js
```

构建后的 HTML、样式和脚本一并提交，现有 Cloudflare Pages Git 集成负责发布。英文使用根路径，其余语言使用 `zh/es/fr/de/it/pt/pl/nl` 前缀。新增或编辑文章应同步全部语言内容源，再重新构建和验证。

本地静态预览使用 `.html` 文件路径；正式站点通过现有 Pages 和 Worker 提供无扩展名规范网址。部署后验证正式域名、语言切换和站点地图。
