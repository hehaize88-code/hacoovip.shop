# LoloBuy Sheet 项目记忆（当前有效）

更新：2026-10-20 UTC。继续工作先读本文件及 README；用户的新指示覆盖历史方案。

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
- 正式站 https://lolobuysheet.de/ 已部署到 Cloudflare 并绑定 apex / www；源码在 GitHub 同名独立目录。详情见末尾 2026-10-20 最新部署记录。

## 已实施的架构

- npm stable 核查后锁定 Astro 7.4.0、@astrojs/cloudflare 14.4.0、Wrangler 4.125.0。Node 24，最低 22.22。
- `output: static`；首页、目录、分类、详情为 SSR；指南/FAQ/文章/关于/隐私为 SSG。
- 首页读取最新 8 个真实商品预览；目录 20 件/页，手机双列，无本地假搜索。
- 6 种完整界面和编辑内容语言：DE 默认 `/`、EN `/en/`、ES `/es/`、FR `/fr/`、IT `/it/`、PL `/pl/`。
- 切换语言保留同页、关键词、分类、排序、页码；原商品名保持上游原值。
- canonical、HTML lang、互指 hreflang/x-default、robots、114 条稳定页面 sitemap 已实现。
- 搜索、筛选、排序、分页参数页 noindex；不生成重复的关键词入口页，不伪造库存/评分/Offer。
- 每语言 30 个本地化 FAQ、购买/QC/运输指南，以及 10 篇原创文章（六语言共 60 页）。内容和政策差异依据官方公开帮助核对，详见 docs/CONTENT_RESEARCH_2026-10-19.md。
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

**早期内部预览限制（后续 Cloudflare 临时站已通过浏览器 SSR 验收）：** 内部预览 Worker 对 cnfanshm 的直接 fetch 返回环境内部错误；同环境 Node 读取与 Node 预渲染取数成功。不能因此宣称正式 Worker 已能稳定访问上游。GitHub 交付可审阅源代码，首次真实部署后必须重新验收所有动态路径。

尚未上线正式域名；已创建独立临时 Worker，未购买域名、修改 DNS 或创建新账户凭证。GitHub Pages 是静态宿主，不能直接运行当前 SSR；README 提供 Workers 根目录和构建/发布命令。

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


## 2026-10-19 Cloudflare 临时预览已发布并验证

- 用户明确授权通过浏览器创建 LoloBuy 临时预览；复用已登录 Cloudflare 账户与已有 GitHub/Workers Builds 连接，没有新建账号凭证。
- **当前可用预览：https://lolobuysheet-preview.hehaize88.workers.dev/**；英文：https://lolobuysheet-preview.hehaize88.workers.dev/en/。
- Worker：lolobuysheet-preview；账户子域 hehaize88.workers.dev；GitHub main / lolobuysheet-de。
- 代码提交：073f2fa0a5a6f54bba5c0e76c3db1e4baeabed35。
- 构建命令 npm run build:preview，部署 npx wrangler deploy，NODE_VERSION=24。
- Cloudflare 构建 fffc1e95-2b02-4a01-8fbf-2c24044b46ce 成功；部署版本 195662f0-f7f5-4c86-9b72-57092435abca，2026-10-19 16:47 Asia/Shanghai。
- 浏览器真实公开验收：德语首页显示 cnfanshm 最新 8 件商品和 11 分类；搜索 Shorts 显示 20 个匹配商品；详情 6079 显示原商品 ID 7777809164、约 USD 21.90、4 张真实图集，切换第二图成功，购买 URL 正确。
- 德语详情切换英文仍在 /en/product/6079/。手机 390 像素检查首页及目录，页面无横向溢出；Logo 与首屏商品图加载正常，目录 20 件。
- 鞋类价格升序经过真实浏览器提交验证，缺价项显示待确认，有价项从 USD 0.48 递增至本页 5.10。未重新做全部功能或所有语言穷举测试。
- 预览全站 noindex/nofollow、robots Disallow；正式 npm run build 仍保留 lolobuysheet.de canonical 和正常收录标记，已构建检查。仅 ASSETS 绑定，没有 KV/D1/R2、数据库或商品快照。
- 执行环境的脚本 HTTP 请求仍返回 403；本次以用户连接浏览器的成功页面与实际操作作为访问验证，未绕过平台安全限制。
- 原 chatgpt.site 预览已由用户截图确认也被拦截，不再作为可用预览链接。该站身份保留，不重复创建。
- **尚未绑定 lolobuysheet.de / www 或修改 DNS。** 用户看过设计并确认后才进行正式域名部署。
- 搜图与 QC 图库仍未接通，需 cnfanshm 的可验证接口或源码；现有图片是普通商品图。


## 2026-10-19 内容扩展进行中

用户要求 20+ FAQ、明确的文章导航入口和 10 篇精品文章。当前平台仍为 LoloBuy；按要求调研 Kakobuy 官方 FAQ 的选题结构，但 LoloBuy 政策仅依据 LoloBuy 官方资料。已直接读取官方购买、QC、尺寸、仓储、包装、重量、订单状态、取消退款和售后申请帮助页。发现仓储 90/180 天及售后期限冲突，禁止将某个数字写成无条件承诺。具体证据、关键词和文章映射记录在 docs/CONTENT_RESEARCH_2026-10-19.md。


## 2026-10-19 FAQ 与文章扩展

- 顶部文章入口从德语 Ratgeber 改为清晰的 Artikel，排在 Spreadsheet 之后并突出显示；其他语言保留相应的 Articles / Artículos / Articles / Articoli / Artykuły。
- FAQ 从 8 扩展为每语言 24 条；每条附来源/详情及相关文章，覆盖注册、手动订单、两阶段付款、Received/In Stock、跟踪、QC 限制、封装、补充照片、仓储、合包、包装、体积重、运费修正、退货及退款去向。
- 10 篇主题：spreadsheet-guide、first-order、source-links、photo-check、shipping-cost、order-tracking、warehouse-guide、size-check、price-check、returns-guide。保留原有 4 个 URL，全面扩写并新增 6 篇；六语言正文分别维护于 src/lib/editorial/{locale}.ts，禁止英文回退或重复短文替代。
- 独立 /articles/ 中心展示 10 篇与摘要、阅读时长。每篇有 5 节正文、目录、具体检查清单、官方来源、核查日期、3 篇相关推荐以及 Article JSON-LD。首页只展示 4 篇。
- 按用户指定调研 Kakobuy 官方问题结构，LoloBuy 条款仅以 LoloBuy 官方为依据。关键词优先级按搜索结果与意图，未编造搜索量/难度或第一手测评。证据和选题映射：docs/CONTENT_RESEARCH_2026-10-19.md。
- 官方仓储资料存在 90 / 180 天差异，售后申请页存在 7 / 45 天与 3 天提醒冲突。FAQ 和文章明确说明并建议立即处理、核对具体订单，不承诺统一期限。计费示例标为假设演算，未复制官方重量文档中的错误示例。
- 已完成 Astro check：0 errors / warnings / hints。临时构建成功，109 个静态 HTML、114 个 sitemap URL。构建产物校验：60 篇文章及 144 条 FAQ、每篇 5 节和 3 个相关推荐、6 语言及 x-default、canonical、预览 noindex 和内链目标全部通过。
- 商品读取层、支付入口和品牌资源未变，仍只使用 cnfanshm.com。搜图/QC 图库仍待接口。正式域名和 DNS 未变。
- 本次提交将通过现有 Workers Builds 更新同一临时预览，部署后浏览器验证结果写入独立项目记忆文件。不要把代码构建通过等同于部署完成。


## 2026-10-19 全站手机布局压缩

- 用户明确要求不仅首页，还要所有独立页。采用 src/styles/mobile.css 统一 700px 以下布局，覆盖首页、目录/分类、详情、FAQ、文章中心、十篇文章、指南/QC/运费/关于/隐私/搜图和错误页，以及全部六语言路径。
- 缩小标题、段落间距、卡片留白与页脚；保留可读字号。搜索框使用 16px 避免 iOS 聚焦放大。商品缩略图保持 44px，购买按钮保持 44px。
- 信息页手机端移除与全站顶部完全重复的第二组导航；顶部文章入口及其他导航仍可直接访问。
- 目录分类和文章目录使用原生 details；手机初始收起，桌面初始展开。只在跨 700px 断点时重置，用户展开不会在普通缩放/滚动时丢失；无 JS 时仍展开可用。
- 商品详情主图 240px，完整图集仍能切换；文章中心保留十篇完整标题和摘要，缩短单卡高度；长文保留完整正文、清单、来源与相关推荐。
- 不删减 24 FAQ、60 篇六语言正文、首页 8 商品/4 文章、目录每页 20 商品。没有改动 cnfanshm 商品读取层。
- 改前 390×844 公开页面基准：德语首页总高 3122px；文章中心 3118px；首篇文章 3617px，正文起点 742px。后续公开部署后记录对比。
- Astro check 已通过，0 errors / warnings / hints。构建、发布与浏览器最终验收记录在独立项目记忆的本次完成条目。
- 继续复用现有 lolobuysheet-preview Worker，正式域名和 DNS 不变。


## 2026-10-19 用户更正调研对象为 LoloBuy

- 用户明确更正：此前 kakobuy.com 写错，应重新到 lolobuy.com 调研并改进 FAQ 与十篇文章。以本条为准；历史 Kakobuy 选题参考不再作为当前内容依据。
- 已重新读取 LoloBuy 官方帮助目录和 20 个帮助正文（公共接口 code 200），并查看标准拍照服务表格原图；官网帮助的搜索抓取失败，未以空页面假装核验。具体证据和关键词补充见更新后的 CONTENT_RESEARCH_2026-10-19.md。
- FAQ 扩至每语言 30 条。新增照片数量/选项、下单后改规格、待确认回复、同卖家国内运费、符合条件的 120 小时退换、1688 起订和 QC。电子产品检查排除条款修正，部分 FAQ 支持多个官方来源。
- 原十篇文章各补一节具体官方流程/例子，六语言完整同等更新；新增内容在 src/lib/editorial/official-updates.ts；每篇六节正文，阅读时间重新计算，来源按具体声明扩充。
- 官方照片数量、90/180 天仓储、售后截止表述存在差异，明确按页面区分。五天退换引用专门规则和限制，不把免费处理当免费双程运费；PayPal 退款例外不等同当前普遍支付可用性。
- 手机压缩已于提交 93235d49eba0a70244401fdae007cff5ab8b8816 部署，构建 0cd45fc5-365f-49f1-a7a6-56a5521adae4。追加正文前 390px 实测：首页 3122→2600px，文章中心 3118→2272px，首篇文章 3617→2749px，正文开始 742→472px。目录能展开。
- 当前内容改进继续复用公开 Worker 预览；正式域名、DNS、数据源和后台不变。最终部署及多页手机验收写入独立项目记忆文件。
- 本次复核内容已通过 Astro check（0 errors / warnings / hints）与 preview build。构建产物检查：60 篇文章各 6 节、180 条 FAQ、每语言 10 篇文章入口、6 语言 + x-default、预览 canonical/noindex、全部官方文章来源 URL 与三个相关推荐通过；sitemap 仍为 114 URL。


## 2026-10-20 正式域名已部署并绑定（当前状态）

- 用户明确要求“帮我把 lolobuysheet.de 部署并连接 cf”，授权正式发布和域名绑定。使用既有 Cloudflare 账户/GitHub 连接，未新建凭证。
- **正式站：https://lolobuysheet.de/**。`www.lolobuysheet.de` 同时绑定，301 跳到主域名；HTTPS 可用，Universal SSL 状态 Active（当时到期 2027-01-17），托管附加证书仍自动验证中。未购买证书或升级套餐。
- Worker **lolobuysheet-de**；GitHub `hehaize88-code/hacoovip.shop` / `main` / `lolobuysheet-de`。Build `npm run build`，Deploy `npx wrangler deploy`，`NODE_VERSION=24`。生产构建监听仅 `lolobuysheet-de/**`。
- 首次正式构建 **7e2e3617-0b3a-4c59-ac66-00b55d7a8a51**，46 秒，部署版本前缀 **7086c5bd**，Ready / 100%。应用源码基线 **10d7f242c787ef5627301646204d3f2520961e9d**。本轮仅更新部署文档与记忆，不修改商品读取层或页面。
- 生产 Worker 的 workers.dev Production URL 和版本 Preview URL 均为关闭；旧 `lolobuysheet-preview` 继续独立 noindex 预览。正式构建不设置 PUBLIC_SITE_PREVIEW。
- 域名最初处于 Active、DNS 0 记录。已通过 Worker Domains 添加 apex 和 www，平台自动配置路由/DNS。其他域名和项目未改。
- Zone 已开启 Always Use HTTPS。Single Redirect **LoloBuy www to canonical HTTPS**：`*://www.lolobuysheet.de/*` → `https://lolobuysheet.de/${2}`，301，勾选保留 query string。自定义域名在控制台维护，不写入会影响旧预览的公共 routes。
- 浏览器公开验收成功：首页 8 件真实商品、11 分类、9 张首页主站图片全部加载；提交 Shorts 搜索得到 20 件；详情 6079 显示原始商品 ID 7777809164、21.90 USD、4 张图集入口，购买 URL 正确。
- 正式 FAQ 30 条；文章中心 10 张文章卡；英文 first-order 正文和 canonical 正确。首页及文章 `index,follow`；搜索 `noindex,follow`。
- 实测 `https://www.lolobuysheet.de/en/articles/first-order/?check=domain` 跳到 `https://lolobuysheet.de/en/articles/first-order/?check=domain`；`http://lolobuysheet.de/faq/` 跳到 HTTPS FAQ。
- 生产构建成功：109 静态 HTML，114 sitemap URL，正式 origin，无预览域名；robots.txt Allow / + 正式 sitemap，_headers 无全站 noindex。
- 验证边界：本执行环境直接 HTTP 返回 403；用户连接浏览器的上述页面访问成功。浏览器工具访问 robots.txt 和 sitemap.xml 返回 ERR_BLOCKED_BY_CLIENT，故二者仅核验构建产物，未宣称线上响应通过。未绕过访问限制。
- 最后阶段浏览器连接上下文丢失，未能再取得正式站截图或重复手机视口验收；本次无手机 CSS 改动，继承 2026-10-19 已验证的全站手机压缩版本。正式域名部署与主要公开页面验收在连接丢失前已完成。
- **搜图与 QC 图库依旧未接通**，待 cnfanshm 的有效接口/源码。无数据库、后台、商品快照、第三方商品来源。
- 本条覆盖历史“正式域名未绑定”“待确认发布”的状态；继续工作直接维护现有生产 Worker 和同一仓库目录。
