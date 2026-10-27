# DSH Plugin Studio / 插件工作室

> v0.1.1 · 社区实验性项目（非 DeepSeek Harness 官方插件；已在用户的 DSH Desktop 上进行初步实测）

把 DeepSeek Harness 插件页的原版「已安装」列表**在界面上替换成卡片式插件工作室**。不卸载或改写官方插件管理服务；安装、刷新和插件详情仍沿用 DSH 原生能力。

> **v0.1.1 补丁：** 进入插件页自动切换到「插件工作室」，隐藏原版「已安装」标签与卡片列表；仅有工作室时连多余标签栏一起隐藏。若安装了「发现」等其他标签，它们仍然显示、可切换。打开任一原生插件详情后仍可正常操作，并能返回工作室。

## 功能

- **卡片网格：** 自适应 3～6 列、搜索、来源/状态筛选、自定义拖拽排序与置顶。
- **内置 / 实验性显示开关：** 两组互不干扰的显示过滤器，不改变实际启停状态。实验性识别依赖 Host 元信息和常见包名特征，部分插件可能未被准确分类。
- **不同的点击区域：** 点击头像 → 浮窗 → 编辑昵称/头像；点击头像之外的卡片 → DSH 原生插件详情。
- **编辑外观：** 每个包单独设置名称、PNG/JPEG/WebP 头像、简介、类别、置顶。原始包名始终不变，原插件升级不会覆盖这些设置。
- **导入 / 导出：** 设置页导出 JSON；导入时选「合并」或「替换」。导出文件包含自定义外观及 UI 偏好，不包含插件本体、密钥或版本历史。
- **主题与壁纸：** 深浅色自动跟随 DSH 主题变量；透明度和背景模糊滑块、高对比度实色卡片、系统减少动画 / 增强对比度适配。
- **更新：** 检查已安装 npm 第三方插件版本，逐个更新或一键批量更新；走 DSH 官方更新接口。
- **回退（实验性）：** 管理器记住它自己更新前的旧版本号，之后可尝试安装那个版本。仅对满足官方 `updatable` 条件的 npm 第三方包开放，涉及卸载 / 重装，请先备份重要配置。

## 安装（从 GitHub）

已提交可运行的 `dist/` 文件。**直接从 GitHub 安装，不需要下载 ZIP、手动解压，也不需要先运行 `npm run build`。**

> **安装前：** 如果此前已经用 `link:` 本地目录安装过旧版 `dsh-plugin-studio`，先在 DSH 的插件管理器里移除**旧的安装项**，避免同一个插件被加载两次。不要删除 `~/.dsh/plugin-studio/appearance.json`，那里保存着自定义外观数据。

### Desktop 桌面版（Windows）

如果已经在 Desktop 的 **Manage dsh Command…** 中安装了随桌面版提供的 `dsh` 命令：

1. 至少启动过一次 Desktop，以初始化 `desktop` profile。
2. **完全退出 DSH Desktop**（检查系统托盘并选择退出；仅关闭窗口可能仍在后台运行）。
3. 打开 PowerShell，执行：

```powershell
dsh plugin --profile desktop add "github:Karos44/dsh-plugin-studio#main"
```

4. 重新启动 Desktop，进入「插件」，确认「插件工作室」已启用并可打开。

**重要：** 只有桌面版自带的、支持管理 Desktop profile 的 `dsh` 命令适用于此方式；普通 npm 安装的 DSH CLI 可能无法修改由桌面程序独占的 `desktop` profile。若出现“找不到 `dsh`”或“不能管理 desktop profile”，请改用下面的桌面界面安装方式。参见 [DeepSeek Harness Desktop 官方说明](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/desktop/README.md)。

**不使用命令行：** 在 Desktop 的 **插件 → 添加插件 → 安装第三方插件** 中选择 Git / GitHub 来源（具体按钮名称随 DSH 版本变化），填入：

```text
github:Karos44/dsh-plugin-studio#main
```

如果界面只接受完整仓库地址，可尝试 `https://github.com/Karos44/dsh-plugin-studio.git`。安装后重启 Desktop。

### Web / 普通 CLI

确保系统已安装可用的 DSH CLI，且安装外部 Bundle 所需的 `pnpm` 可用。运行：

```bash
dsh plugin --profile web add "github:Karos44/dsh-plugin-studio#main"
```

然后重启 `web` profile，再到插件页检查是否生效。**此命令只安装到 `web`，不会替桌面版安装。**

### 开发者：克隆源码

只有计划修改源码时才需要以下命令：

```bash
git clone https://github.com/Karos44/dsh-plugin-studio.git
cd dsh-plugin-studio
npm run build
npm test
```

若需要让 DSH 直接读取这份工作目录，可以在对应 profile 使用 `link:` 本地包源；注意这个目录之后就成为插件实际运行的来源，**不要放在 Downloads 里，也不要随意移动**。

本插件最低目标 DSH 版本为 `0.2.1-rc.0`；其他版本尚未充分实测。安装后建议先验证卡片、外观修改及导入导出，再使用实验性的更新/回退功能。

## 替换「已安装」界面与原生按钮

官方 `plugins.tab` 只能新增标签，不能正式删除「已安装」。本插件使用限定于插件页的 CSS 与 DOM 观察器，让原生「已安装」标签不可见，并在进入原生列表时自动切到工作室；它**不删除任何原生列表、插件数据、详情组件或安装逻辑**。原生详情页仍通过官方 `openPackage` 进入，返回时使用官方的 `returnTab` 返回工作室。「发现」及其他外部扩展标签保持可用。

官方页面默认会隐藏自定义标签下的「添加插件」和「刷新」，因此本插件仅以 CSS 让原控件显示，**不替换它们的行为或菜单项**。它们仍处于 DSH 页眉的位置，而搜索筛选在下方。此隐藏策略优先按标签文字（「已安装」/「插件工作室」）定位原生与工作室两个标签，并兼容 DSH 0.2.1 的 `data-plugin-header-part` 与 `*-installed` / `*-plugin-studio` 标签 ID；两者都对不上时不会误伤其他标签，官方将来重排 DOM 可能需要再适配。若界面失常，先停用本插件或回退 0.1.0，原生插件管理器仍然完整保留。

## 数据文件与导入导出

所有外观覆盖项独立存于：

```
$DSH_HOME/plugin-studio/appearance.json
```

默认 `DSH_HOME` 未设置时为 `~/.dsh/plugin-studio/appearance.json`。例如 Windows 默认通常是：

```
C:\Users\<你的账户>\.dsh\plugin-studio\appearance.json
```

存储包含显示名称、头像（压缩为 256px 以下的 WebP 或 PNG）、简介、分类、置顶、顺序、偏好，以及由管理器自己记录的旧版本信息。版本记录**不**放进外观导出文件。采用修订号、先写临时文件再替换的保存方式；并发窗口写入会拒绝旧修订，避免默默覆盖。

图片来自本地文件（PNG/JPEG/WebP，自动压缩）或 HTTPS URL；本版编辑窗口目前仅提供**本地文件选择**，不会显示 URL 输入框。

## 版本管理范围和风险

- DSH 官方 `listVersions` / `updateBundle` **仅针对特定可更新的第三方 npm Bundle**，不更新内置、Git、本地目录、Repository 机制、别名和管理器本身。
- **批量更新依次进行、用户确认后执行**。一些包需要重启。
- **回退是有风险的实验功能，不等于官方的事务回滚**。它使用原生 `removeBundle` 再 `installBundle(name@oldVersion)`。中途失败会尝试安装回当前版本；即使恢复，也不保证第三方插件配置/数据完全一致。
- 旧版本可能与当前 DSH 不兼容。本插件不会绕过 `engines.dsh` / peer 检查。
- 版本历史仅记录经本插件执行的更新或回退，**不**自动识别 DSH 外部发生的版本变化，也没有完全的 npm 历史版本浏览器。
- 插件源码和 DSH 源码均可继续迭代，先拿一个不重要的 npm 插件验证这些操作，再用于常用插件。

## 已知限制

1. **兼容性依赖 DSH 版本。** 本版已由用户在其 DSH Desktop 上初步验证插件界面替换可正常运行，并通过 Node 语法检查及自动化测试；其他 DSH 版本尚未充分测试。
2. **原版「已安装」列表已隐藏。** 卡片数据来自 `pluginManager.listBundles`，针对的是 **Bundle**；官方单独注册的 `plugins.item` 页面和 Bundle 内部的每条 **row** 尚未拆成独立卡片。当前工作室尚不提供这些独立页面的完整入口；需要配置时，可从 **设置 → 导入导出 / 背景 → 临时打开原版插件配置** 返回官方列表。点击「插件工作室」标签后会重新隐藏原版；此切换不改变插件运行状态。
3. 实验性分类是近似判断；DSH 部分实验性项目依赖官方内部列表，不一定有公开元信息。
4. 因为复用官方 `plugins.tab`，原生添加/刷新控件与工作室工具栏仍处于上下两行；未强行 DOM 搬迁。界面取代仅为前端显示调整，不是重写官方管理器。
5. 自定义背景必须由 DSH 或其他壁纸插件提供，本插件负责在其上提高可读性，不管理壁纸本体。

## 开发 / 校验

依赖 Node.js 18 或更新版本；本项目没有第三方 npm 安装依赖。

```sh
npm run build
npm test
npm run check
```

GitHub 仓库已提交 `dist/`，直接安装的用户**无需构建**。

- `src/host.js`：Host 的外观数据 HTTP 端点。
- `src/store.js`：JSON 输入验证、CAS、原子持久化。
- `src/client.template.js`：插件工作室的界面、点击行为、筛选、版本操作。
- `src/studio.css`：深浅色与壁纸适配、卡片样式、响应式。
- `dist/`：生成好的安装入口。

本插件没有接入 Agent 对话、记忆或模型推理能力。
