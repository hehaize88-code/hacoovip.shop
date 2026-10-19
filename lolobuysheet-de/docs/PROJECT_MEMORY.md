# LoloBuy Sheet 项目记忆（当前有效）

更新：2026-10-19 UTC。继续工作先读本文件及 README；用户的新指示覆盖历史方案。

## 固定需求

- 本次唯一平台 LoloBuy；域名 **lolobuysheet.de**，用户已准备。
- 源码目标 **hehaize88-code/hacoovip.shop**，分支 **main**，独立目录 **lolobuysheet-de**。不混用别的仓库或其他品牌站目录。
- 所有商品、分类、搜索、排序、图片、后续搜图/QC 都只用 **cnfanshm.com**。
- 不建数据库、商品导出库、QC 图库、相似搜索索引、后台。无演示商品、生成的商品图或装饰人物图。
- 参考 kakobuypicklist.com 的使用体验；不拷贝其产品或数据库。
- 官方 Logo 和 favicon；站点标明独立推荐站，不能冒充官方运营。
- 主词 **lolobuy spreadsheet**；只做这一平台/域名，后续优化另开迭代。
- 注册入口保留 **https://www.lolobuy.com/index**，不附加邀请码。
- 购买链接必须复现用户的微店样本：
  `https://www.lolobuy.com/productDetail/7711153142?url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D7711153142`
- 本次交付源码到 GitHub；没有创建 Cloudflare 资源、绑定域名或改 DNS。提交状态与公开上线状态分开记录。

## 已实施的架构

- npm stable 核查后锁定 Astro 7.4.0、@astrojs/cloudflare 14.4.0、Wrangler 4.125.0。Node 24，最低 22.22。
- `output: static`；首页、目录、分类、详情为 SSR；指南/FAQ/文章/关于/隐私为 SSG。
- 首页读取最新 8 个真实商品预览；目录 20 件/页，手机双列，无本地假搜索。
- 6 种完整界面和编辑内容语言：DE 默认 `/`、EN `/en/`、ES `/es/`、FR `/fr/`、IT `/it/`、PL `/pl/`。
- 切换语言保留同页、关键词、分类、排序、页码；原商品名保持上游原值。
- canonical、HTML lang、互指 hreflang/x-default、robots、78 条稳定页面 sitemap 已实现。
- 搜索、筛选、排序、分页参数页 noindex；不生成重复的关键词入口页，不伪造库存/评分/Offer。
- 8 个本地化 FAQ，购买/QC/运输指南，以及原始商品 ID、尺码、价格、图片检查四篇文章。政策段落依据官方公开帮助核对。
- 现阶段分类从 `/categories/` 进入 `/spreadsheet/?category=…`，组合页不收录；独立分类 SEO 页为后续优化项。

## 唯一数据层：src/lib/source.ts

没有已验证的正式 JSON API；当前读取主站公开 HTML，模板变化会影响选择器。

| 能力 | 实现与约束 |
| --- | --- |
| 目录/排序 | `/index.php?m=home&c=Lists&a=index&tid=1&sort=new\|click\|price&sort_asc=asc\|desc&ZXljbXM=1&page=N` |
| 分类 | 从 `/AllProducts/` 的真实分类按钮读取路径，再从分类页读取 tid，未硬编码商品数据 |
| 关键词 | `/search.html?keywords=…&channelid=2&method=1&page=N` |
| 分页 | 读取实际上游页大小，映射为本站每页 20；已验证跨上游页边界的本站第 4 页 |
| 搜索排序组合 | 未证实支持；搜索时采用主站搜索顺序，UI 不提供假排序 |
| 详情 | `/AllProducts/{catalogId}.html`，读取标题、价格、普通图集与原始微店链接 |
| 图片 | 优先 data-src，限定 cnfanshm.com 或 www.cnfanshm.com 的 HTTPS /uploads/ 地址，不复制到仓库 |
| 价格 | 读取主站公开 script.js 的 CNY_TO_USD_RATE，CNY 除以该值，标为估算；零价/缺价显示待确认 |
| 缓存 | 短期进程内文本缓存，最多 48 项；普通 5 分钟，分类/换算 1 小时；无持久化 |
| 失败 | 上游异常显示不可用和重试，503/no-store/Retry-After；无效 URL 404 |

**ID 不可混用：** `catalogId=6079` → `sourceProductId=7777809164`。购买按钮必须使用后者。URL 函数验证微店主机、路径和 itemID 一致；不为 Taobao/1688 或未知来源猜购买 URL。

**价格不可误读：** 商品 6079 原始 159 CNY，当前主站换算规则 7.26，显示约 21.90 USD。上游部分 JSON-LD 把原始 CNY 标成 USD，meta 价格甚至写入图片地址，所以没有直接采用这些字段。主站换算常数不是实时外汇报价。页面提醒不含运费及额外费用。

## 搜图/QC：仍未接通

公开页面和脚本尚未定位到可验证的搜图接口或明确的 QC 字段。

- `/image-search/` 显示不可用，提供关键词与分类入口；不接收图片上传。
- 商品图片明确是普通商品图；详情说明暂未提供已核实的 QC 照片。
- QC 指南有真实原创说明，但它不是 QC 图库。
- 后续需用户提供 cnfanshm 的源码位置或接口说明再接入。不能以其他数据源、演示图、建立新库代替。

## 品牌资源与官方依据

- Logo：`https://www.lolobuy.com/assets/iconLolobuyLogo-1b346e9f.svg`
- favicon：`https://www.lolobuy.com/loloBuyIcon.png?v=1.0.1%402026-10-16T06%3A13%3A24.584Z`
- Logo SHA-256：`1b346e9f513674d79b1d7f4f783007503c1dc9a880134521baea4fc9d3355e8c`
- favicon SHA-256：`8a985781a139e1feb36a84002652d1b4f34a0d46f454b727b8aa8a01d7682fd1`
- 帮助目录：`https://www.lolobuy.com/prod-api/user/common/helpMenuList`
- 正文：`https://www.lolobuy.com/prod-api/user/common/helpMenuDetail?id={id}`
- 购买 ID 1242296499766165；标准验货 ID 1242300728672386；重量 ID 1242300798075086。
- 商品/国内运费先支付，国际包裹另付；QC 是外观/规格检查，不能保证真伪或功能。重量帮助有数字/单位不一致，本站没有复制该算例或承诺实时运费。

## 验证与剩余边界

已执行：

- Astro 类型检查；购买 URL、上游图片限制、字段缺失、六语言完整性等 4 项单元测试。
- 真实上游集成检查：20 件分页、页 1/2 不重复、跨源页的第 4 页、Shorts 搜索、鞋类价格升降序、6079 的原始商品 ID/图集。
- 真实样本：最新首条 6082；第 4 页首条 6022；6079 → 7777809164，四张主站图片。
- 生产构建；静态页面无需请求商品源即可构建。Wrangler deploy --dry-run 完成，最终 Worker gzip 约 336 KiB，仅 ASSETS 绑定。
- 每次构建自动清理本目录 dist，防止删除的路由或临时 QA 页面残留。最终构建为 73 个静态 HTML、78 个 sitemap URL，无 QA 产物。
- 浏览器：德语指南与完整英文正文切换，保留 `?q=Shorts&page=2`；临时使用真实上游取数渲染的主页/目录/详情检查手机布局、无横向溢出、图集切换、原图加载。
- 临时 QA HTML、复制的构建资源和样本页面已删除，不纳入仓库。

**未完成生产 SSR 端到端验收：** 内部预览 Worker 对 cnfanshm 的直接 fetch 返回环境内部错误；同环境 Node 读取与 Node 预渲染取数成功。不能因此宣称正式 Worker 已能稳定访问上游。GitHub 交付可审阅源代码，首次真实部署后必须重新验收所有动态路径。

尚未上线正式域名；没有购买域名、修改 DNS、创建 Worker 或设置账户凭证。GitHub Pages 是静态宿主，不能直接运行当前 SSR；README 提供 Workers 根目录和构建/发布命令。

## 继续工作顺序

1. 以 GitHub 的 lolobuysheet-de 目录为源码权威，不重新创建站点或更换数据源。
2. 用户要求正式托管时，连接此独立目录，部署并验证 SSR 数据通路，再绑定域名。
3. 拿到 cnfanshm 搜图/QC 协议后补接同一读取层。
4. 后续再做独立分类 SEO、更多语言、内容深度和真实搜索表现优化。

关键词和竞争页面记录见 [SEO_RESEARCH.md](SEO_RESEARCH.md)。部署参数与本地命令见 [README](../README.md)。


## 2026-10-19 临时公开预览

用户要求先查看公开预览，通过后再准备正式 Cloudflare 部署和域名绑定。

- 公开预览：https://lolobuysheet-preview.hehaize88.chatgpt.site
- Sites project_id：appgprj_6ad5d28b70fc8191a91ce0d497291210（后续复用，不重复创建）。
- 源码基线：GitHub ee6cf692dbb586016214de0bfcb027ffb84c55d0 的 lolobuysheet-de。
- 预览源提交：d580c03c9fcf7be82a5ef73d1b2edfa31031f3c4。
- 已保存版本 1 并发布成功，访问权限 public；未绑定 lolobuysheet.de，未修改用户 Cloudflare/DNS。
- 保留 Astro SSR + SSG 和 cnfanshm 单一数据源。预览仅增加宿主入口映射、临时 origin 和全站 noindex，robots 禁止抓取。
- 外部访问验收受限：检查浏览器显示 Cloudflare “Sorry, you have been blocked”，刷新一次仍被拦截；HTTP 检查返回 403。Sites 状态为 active/public，发布状态 succeeded，错误日志为空。不能宣称公开页面功能已验收，也不能断言用户浏览器同样被拦截。
- 搜图和 QC 图库仍待 cnfanshm 接口；没有新增数据库、商品快照或第三方商品源。
- 下一步先收集用户预览反馈；确认后同步必要改动到 GitHub 原目录，再正式部署/绑定 Cloudflare。若用户也遇到访问拦截，按托管平台边缘访问问题处理，不把它当作商品源 429 或重复部署应用。


## 2026-10-19 用户确认预览被拦截

- 已读取用户截图 image(20261019-082757).png，确认显示 chatgpt.site 的 Cloudflare “Sorry, you have been blocked”。这次确认为用户也无法访问，旧预览链接不可作为可用交付。
- 再次核对 Sites：active、public、版本 1。应用日志只有内部页面截图请求 GET / 返回 200；这不代表外部访问已通过。现有工具没有该平台边缘防火墙的管理权限，没有重复发布同一构建或尝试绕过拦截。
- 已准备同一代码版本的临时替代预览，正式域名 lolobuysheet.de 仍待用户确认效果后部署/绑定。
- Cloudflare 连接的首个只读接口发现调用返回 UNAUTHORIZED / “This app connection requires reauthentication. Reconnect the app and try again.”。尚未读取账户清单，也未创建任何用户 Cloudflare 资源或更改 DNS。
- 当前下一步：用户重新连接 Cloudflare 后，核实账户和现有资源，发布独立临时预览地址，验证首页、搜索、排序、商品详情和移动布局实际可访问后才交付链接。暂未取得新的可用公开 URL。



## 2026-10-19 浏览器临时预览授权与实现

用户已明确允许通过浏览器创建 LoloBuy 临时预览。Cloudflare API 失效，但已通过用户浏览器访问同一账户和现有 GitHub 连接。已准备在 main 的 lolobuysheet-de 目录使用 npm run build:preview 构建独立 Worker lolobuysheet-preview，部署 npx wrangler deploy；正式域名绑定仍待用户确认效果。临时构建只切换 origin、Worker 名称和禁止收录标记，保留单一 cnfanshm 数据源和 SSR。实际发布及访问验证结果随后补充。
