# Design QA：4Party 宠物运营后台

## 对照基准

- 视觉基准：`/Users/ahs/Documents/原型/pet-figma-capture/qa/admin/existing-admin-reference.png`
- 需求基准：`/var/folders/rr/d8dyhcwn5wl0jdsgwg4dt66m0000gn/T/codex-clipboard-0bcb43b0-3327-4d79-af28-9fb4259e9538.png`
- 实现地址：`http://127.0.0.1:5173/`
- 默认列表页截图：`/Users/ahs/Documents/原型/pet-admin-prototype/qa-default-final-v3.png`
- 宠物编辑截图：`/Users/ahs/Documents/原型/pet-admin-prototype/qa-pet-drawer-v2.png`
- 多语言截图：`/Users/ahs/Documents/原型/pet-admin-prototype/qa-locales.png`
- 形态资源截图：`/Users/ahs/Documents/原型/pet-admin-prototype/qa-form-resources.png`
- 外部展示截图：`/Users/ahs/Documents/原型/pet-admin-prototype/qa-external.png`
- 宠物蛋列表截图：`/Users/ahs/Documents/原型/pet-admin-prototype/qa-egg-id-list-v2.png`
- 宠物蛋编辑截图：`/Users/ahs/Documents/原型/pet-admin-prototype/qa-egg-drawer-no-id.png`
- 关联宠物选择截图：`/Users/ahs/Documents/原型/pet-admin-prototype/qa-egg-pet-picker.png`
- 全屏视觉对照：`/Users/ahs/Documents/原型/pet-admin-prototype/qa-comparison-final-v3.png`
- 需求内容对照：`/Users/ahs/Documents/原型/pet-admin-prototype/qa-pet-content-coverage.png`
- 宠物蛋内容对照：`/Users/ahs/Documents/原型/pet-admin-prototype/qa-requirements-coverage.png`

## 视口与归一化

- 视觉基准像素：1280 × 720。
- 实现截图像素：1280 × 720。
- CSS 视口：1280 × 720。
- 密度：同一应用内浏览器、同一像素尺寸，不需要二次缩放。
- 默认状态：宠物配置列表，无筛选条件，无抽屉。
- 聚焦状态：宠物编辑、八区域名称、三星形态、外部展示、宠物蛋关联池。

## Findings

未发现需要修复的 P0、P1 或 P2 问题。

- 视觉语言与现有 Lottery Admin 一致：232px 深色侧栏、白色顶栏、蓝色主操作、浅灰工作区、紧凑表格和克制的边框/阴影。
- 刻意未复制视觉基准中的统计卡片。宠物配置没有已确认的业务指标口径，避免为了填充页面编造数据。
- 默认页优先展示独立宠物 ID、资源完整度、更新时间和编辑操作，符合高频配置后台的工作顺序。

## Required Fidelity Surfaces

### Fonts and typography

- 沿用现有后台的 Inter / 系统无衬线字体栈，并补充中文系统字体。
- 页面标题 21px、区块标题 16px、正文与表格 13–14px、辅助信息 11–12px，层级与基准一致。
- 表格资源文件名使用单行截断，未出现长文本挤压操作列。

### Spacing and layout rhythm

- 侧栏宽度、顶栏高度、内容边距、表格行高和表单间距延续现有后台的 8px 节奏。
- 抽屉在 1280px 视口保持 720px 宽，主列表仍保留上下文；内容可独立滚动，底部保存操作固定可见。
- 没有遮挡、不可达控件或持久操作溢出。

### Colors and visual tokens

- 使用深色导航 `#111827`、品牌蓝 `#2563eb`、浅灰工作区 `#f5f7fb` 和白色内容面。
- 品级与资源完整/待补充使用文字加语义色，不仅依赖颜色表达信息。
- 文本与背景对比度满足日常后台可读性要求。

### Image quality and asset fidelity

- 需求只要求资源上传与文件格式，没有提供宠物美术封面；实现使用文件类型、文件名和上传状态展示，没有伪造宠物图片。
- 宠物蛋与宠物资源均以真实文件配置对象呈现；宠物形态明确区分客户端 MP4 与 H5 WebP 资源。
- 未使用营销插画、装饰图片或无依据资源。

### Copy and content

- 宠物蛋覆盖：WebP 封面、A/S/SS/SSS 品级、关联已配置宠物。
- 宠物蛋 ID 由系统按照品级与已有序号自动生成，仅在宠物蛋列表中作为独立列展示；新建与编辑配置中均不显示、不可人工填写或修改。
- 添加关联宠物时读取全部宠物配置，支持按名称 / ID / 资源文件及品级筛选；已关联项明确标记，未关联项支持多选绑定。
- 宠物覆盖：默认名称、八个用户区域名称、A/S/SS/SSS 品级；展示封面读取对应形态缩略图。
- 宠物列表将宠物 ID 作为独立列展示，便于运营检索和研发对照。
- 三星形态覆盖：一星初始、二星等级 30、三星等级 50；每个形态均含封面缩略图，以及客户端 MP4、H5 WebP 两套待机与互动资源。
- 每个星级的封面缩略图均为必填 PNG / WebP 静态资源，文件名支持在上传区域内截断展示。
- 充值活动通过唯一活动 Key 管理；当前月度活动配置 $1,000 与 $1,700 两个累计充值阶梯，并分别关联宠物蛋配置奖励。
- 充值活动支持动态添加、移除阶梯；每个阶梯可从全部宠物蛋配置中添加多个奖励并设置数量。
- 客户端钱包跳转、累计周期与数据重置时间为固定产品逻辑，不在运营后台提供配置字段。
- 未提供的尺寸和文件大小明确显示“待确认”，没有擅自编造限制。

## Primary interactions tested

- 宠物配置与宠物蛋配置侧栏切换。
- 关键词和品级筛选；无结果空态与重置。
- 新建宠物必填校验。
- 新建宠物蛋保存时自动生成 ID，并在返回列表后展示；新建与编辑抽屉均不展示 ID。
- 宠物编辑分组切换：基础信息、多语言名称、形态资源。
- 宠物蛋关联宠物：打开选择面板、读取全部宠物配置、搜索筛选、多选确认绑定、已关联标记及单项移除。
- 充值活动：关键词筛选、新建与编辑、活动 Key 校验、充值阶梯增删、门槛递增校验、添加与移除宠物蛋奖励。
- 宠物与宠物蛋列表右侧仅保留编辑操作。
- 配置保存反馈。
- 浏览器控制台 error / warning：0。

## Comparison history

- 初次全屏对照：未发现 P0/P1/P2 视觉差异；保留列表主导的信息架构。
- 2026-07-31 定向修订：宠物 ID 调整为独立列；删除配置状态、状态筛选、状态列和启停操作；宠物与宠物蛋列表右侧统一只保留“编辑”。
- 2026-07-31 关联流程补充：宠物蛋编辑页新增“添加关联宠物”，通过独立选择面板读取全部宠物配置并完成多选绑定。
- 2026-08-10 形态资源补充：一星、二星、三星形态分别新增必填的 PNG / WebP 封面缩略图上传项，并移除基础信息中的独立宠物封面。
- 2026-08-10 文案统一：宠物蛋后台操作统一使用“发送”，不再使用“发放”。
- 2026-08-10 平台资源补充：每个星级形态分别配置客户端 MP4 与 H5 WebP 的待机、互动资源。
- 2026-08-11 活动配置补充：新增可扩展的充值活动列表和配置抽屉，支持活动 Key、动态阶梯及宠物蛋奖励；固定的钱包跳转、累计周期与重置时间不展示。
- 2026-07-31 ID 规则修订：删除配置抽屉中的 ID 展示，将系统生成的“宠物蛋 ID”移动到列表独立列。
- 2026-07-31 页面精简：删除“查看变更记录”入口、变更记录抽屉及相关演示数据。
- 修订后重新构建、刷新并检查；无新增 P0/P1/P2 问题。

## Follow-up polish

- P3：待业务确认资源尺寸、时长、文件大小和编码规范后，可把“待确认”替换为正式上传校验。
- P3：当前为前端原型，保存和上传使用演示数据，尚未接入真实接口与权限系统。

final result: passed
