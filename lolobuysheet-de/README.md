# lolobuysheet.de

LoloBuy 独立商品推荐站。仓库目录：`hacoovip.shop/lolobuysheet-de`。

- Astro **7.4.0**，Cloudflare 适配器 **14.4.0**；依赖固定并提交 lockfile。
- 首页、分类、目录、搜索和详情使用 SSR；六语言指南、FAQ、文章使用 SSG。
- 德语默认 `/`；英语 `/en/`、西语 `/es/`、法语 `/fr/`、意语 `/it/`、波兰语 `/pl/`。
- 全部商品、图片、分类、排序、关键词搜索仅从 `https://cnfanshm.com` 读取。
- 不含数据库、商品快照、商品图片副本、图片索引、用户系统或管理后台。

## 本地命令

使用 Node 24（最低 22.22）。在本目录执行：

```sh
npm ci
npm run check
npm test
npm run build
npm run dev
```

`npm run test:source` 会对 cnfanshm 发出少量真实只读请求，验证上游数据契约。主站不可用时会失败。普通单元测试和生产构建不依赖商品服务。

## GitHub 与运行环境

GitHub 保存源码；**GitHub Pages 无法执行此项目的 SSR**。2026-10-20 已部署到 Cloudflare Workers 并绑定正式域名。生产入口：https://lolobuysheet.de/；www 永久跳转到主域名，HTTP 自动升级为 HTTPS。

连接 GitHub 部署时填写：

| 项目 | 值 |
| --- | --- |
| 仓库 | `hehaize88-code/hacoovip.shop` |
| 分支 | `main` |
| 根目录 | `lolobuysheet-de` |
| Node | `24` |
| 构建 | `npm run build`（平台先执行 npm ci） |
| 发布 | `npx wrangler deploy` |
| Worker 名称 | `lolobuysheet-de` |
| 正式域名 | `lolobuysheet.de`、`www.lolobuysheet.de` |
| 自动构建监听 | `lolobuysheet-de/**` |

Astro 7 的 Cloudflare 适配器生成 Workers 部署产物。不要把 `dist/client` 单独作为整个站点发布，也不要套用旧版 Pages `_worker.js` 路径。Wrangler 使用 `@astrojs/cloudflare/entrypoints/server`，构建时生成最终配置。

无数据库/KV/R2 绑定；Astro session 已关闭。不需要商品 API 密钥。认证凭证由部署环境管理，不提交仓库。

## 数据与链接

`src/lib/source.ts` 是唯一商品读取层，使用已验证的主站公开 HTML 协议。主站模板变更时需要调整选择器；目前未找到正式 JSON API。

- 目录：主站真实排序端点，支持最新、热门、价格升序/降序及分类。
- 搜索：主站 `/search.html`，不是在当前 20 条商品里本地搜索。
- 搜索结果采用主站自身顺序；没有假装支持未验证的搜索+分类+排序组合。
- 展示 20 件/页，根据上游实际页大小映射；只显示可确认的下一页，不虚构商品总数。
- 商品 ID 与主站目录 ID 分开：目录 `6079` 对应原始微店 `7777809164`。
- 图片只接受主站 `/uploads/` 地址，优先 `data-src`。浏览器直接读取主站图片。
- USD 价格使用主站公开脚本的换算规则；不是实时汇率，零价/缺价显示待确认，未包含运费。
- 单个进程最多 48 个短期文本响应缓存；默认 5 分钟，分类/主站换算规则 1 小时。无持久化。
- 上游失败返回 503 和重试提示，不显示演示商品或把失败当成零商品；无效页面返回 404。

注册入口保持 `https://www.lolobuy.com/index` 原样。购买按钮仅为已核实的微店来源生成用户指定的 LoloBuy URL；不附加邀请码。

## 未接通的能力

**搜图与 QC 图库尚未接通。** 目前主站公开页面和脚本未提供已验证的图片搜索协议，也没有明确标注 QC 的字段。搜图页明确显示不可用，不接收上传；详情中的普通商品图不会冒充 QC 图。

后续拿到 cnfanshm 的接口文档或源码位置后，再扩展同一个读取层。不能用第三方图库或自建数据库补齐。

## SEO 与语言

首页主词 `lolobuy spreadsheet`；目录承接 finds/products/links；购买、QC、运费、尺码和原始 ID 由独立指南承接。六语言有真实译文、`lang`、canonical、互指 hreflang、同页切换；原商品标题保持主站值，不伪造翻译后的商品信息。

搜索、排序、筛选、分页参数页 noindex，canonical 指目录；隐私与不可用搜图页不进入 sitemap。每种语言 19 个稳定路径，共 114 个 sitemap URL。每语言 30 条 FAQ 和 10 篇独立文章（共 60 篇）。没有虚构评分、库存或 Offer 结构化数据。

官方 Logo / favicon 原始来源和核查记录见 [项目记忆](docs/PROJECT_MEMORY.md)。

## 验证范围

类型检查、单元测试、生产构建和真实上游协议已检查。浏览器核对了静态指南、同页语言切换、真实数据临时渲染的移动端布局与图集。临时 QA 页面和商品快照不提交。

2026-10-20 正式域名真实浏览器验收：首页 8 件商品及图片加载正常、Shorts 搜索 20 件、商品 6079 对应微店 7777809164、FAQ 30 条、文章中心 10 篇、英文独立文章均成功。www 跳转保留路径和查询参数，HTTP 跳到 HTTPS；首页和文章 index,follow，搜索 noindex,follow。生产构建及 114 条 sitemap URL 已检查。执行环境直接 HTTP 请求返回 403，浏览器工具对 robots.txt / sitemap.xml 报 ERR_BLOCKED_BY_CLIENT；这两类线上响应尚未直接验证，不能将本地构建检查表述成线上 HTTP 验证。

## 生产与预览分离

- 生产 Worker：`lolobuysheet-de`；`npm run build`；`NODE_VERSION=24`；正式域名使用生产部署。Production/Preview workers.dev URL 均关闭，防止可收录的重复站点。
- 临时 Worker：`lolobuysheet-preview`；`npm run build:preview`；https://lolobuysheet-preview.hehaize88.workers.dev/ 继续 noindex。不要将预览构建发布到正式域名。
- 自定义域名由 Cloudflare Domains 面板管理，DNS 由平台自动创建；未写入预览也会继承的 Wrangler routes。
- Zone `lolobuysheet.de`：Always Use HTTPS 已启用；Single Redirect `LoloBuy www to canonical HTTPS` 使用 `*://www.lolobuysheet.de/*` → `https://lolobuysheet.de/${2}`，301，保留查询参数。
- 正式构建：`7e2e3617-0b3a-4c59-ac66-00b55d7a8a51`，版本前缀 `7086c5bd`；源码基线 `10d7f242c787ef5627301646204d3f2520961e9d`。
- 用户已明确授权本次生产部署和绑定；后续代码变更仍只编辑本域名目录。

## Google Analytics 4

2026-10-20 接入独立 GA4 网站数据流 `lolobuysheet.de Web`：

- Measurement ID：`G-LXR4CPTJ8E`；Stream ID：`16163077437`。
- 统计时区：中国时间（Asia/Shanghai）；报表币种：USD。
- 公共 `src/layouts/Layout.astro` 覆盖全部六语言 SSR / SSG 页面；只在正式根域和 www 主机运行，预览构建及其他主机不发送生产数据。
- 使用 GA4 自动网页浏览和增强型衡量；Google Signals 和广告个性化在站点代码中关闭。
- 六种语言隐私说明同步更新。不要重复添加 Google tag，以免重复计数。
