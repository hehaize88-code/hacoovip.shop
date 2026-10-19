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

GitHub 保存源码；**GitHub Pages 无法执行此项目的 SSR**。已准备 Cloudflare Workers 构建配置，但没有创建 Worker、绑定域名、修改 DNS 或执行生产发布。

连接 GitHub 部署时填写：

| 项目 | 值 |
| --- | --- |
| 仓库 | `hehaize88-code/hacoovip.shop` |
| 分支 | `main` |
| 根目录 | `lolobuysheet-de` |
| Node | `24` |
| 构建 | `npm ci && npm run check && npm test && npm run build` |
| 发布 | `npm run deploy` |
| Worker 名称 | `lolobuysheet-de` |
| 正式域名 | `lolobuysheet.de`，需后续绑定 |

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

搜索、排序、筛选、分页参数页 noindex，canonical 指目录；隐私与不可用搜图页不进入 sitemap。每种语言 13 个稳定路径，共 78 个 sitemap URL。没有虚构评分、库存或 Offer 结构化数据。

官方 Logo / favicon 原始来源和核查记录见 [项目记忆](docs/PROJECT_MEMORY.md)。

## 验证范围

类型检查、单元测试、生产构建和真实上游协议已检查。浏览器核对了静态指南、同页语言切换、真实数据临时渲染的移动端布局与图集。临时 QA 页面和商品快照不提交。

当前内部预览的 Worker 对外 `fetch()` 返回环境内部错误，因此**未完成部署宿主上的 SSR 端到端验收**。Node 真实上游读取和预渲染取数成功；这不等于生产 Worker 已验收。首次正式部署后需验证首页/搜索/排序/分页/商品详情及域名，不应把 GitHub 提交当作域名已上线。
