---
name: better-draw
description: 把文章里的关系转成 Mermaid 图。先判断关系类型，再选“场景 → 关键字”，最后照 Pele 示例写语法。用户要求画图、解释结构、整理笔记，或把一段话可视化时使用。
---

# better-draw

## 目标

把文章里的句子，翻译成一张能独立看懂的图。

图回答一个问题。
正文负责解释，图负责压缩关系。

## 什么时候画

同时满足两条才画：

- 段落里有至少 3 个对象，或 3 步以上的关系。
- 这些关系用文字读起来费劲。

只有一两个事实，不画。

## 三步法

1. 抽关系。把句子还原成骨架，只看连接词和动词。
2. 选图型。按下面的四大家族和场景表，选一个关键字。
3. 写图并验证。节点用短语，边写动词，图下写一句结论。

## 第一步：判断关系类型

先归到四类之一。选错家族，图画得再漂亮也没用。

| 家族 | 文章里的信号 | 图的职责 |
|---|---|---|
| 时间 / 顺序 | 先、再、然后、最后、之后、同时、第几阶段 | 谁在什么时候做了什么 |
| 结构 / 层级 | 包含、分为、由…组成、属于、是一种、部署在 | 东西由什么构成 |
| 因果 / 决策 | 因为、所以、导致、如果、否则、状态、卡住 | 为什么走到这一步 |
| 数量 / 比较 | 占比、分布、流向、高于、低于、两个维度、重叠 | 多少、大小、位置 |

归类的判断句：

- 能问“下一步是什么” → 时间。
- 能问“里面有什么” → 结构。
- 能问“为什么变成这样” → 因果。
- 能问“各占多少 / 谁更强” → 数量。

## 第二步：场景 → 关键字

链接都指向 Pele 的可运行示例。先看示例，再写自己的。

### 时间 / 顺序

| 场景 | 关键字 | 示例 |
|---|---|---|
| 多个角色来回交互、调用顺序 | `sequenceDiagram` | [#sequence](https://pele.run/examples#sequence) |
| 一条主线的阶段、年代、演化 | `timeline` | [#timeline](https://pele.run/examples#timeline) |
| 排期、工期、并行任务 | `gantt` | [#gantt](https://pele.run/examples#gantt) |
| 用户旅程、每一步的情绪 | `journey` | [#user-journey](https://pele.run/examples#user-journey) |
| 分支、合并、发布节奏 | `gitGraph` | [#git-graph](https://pele.run/examples#git-graph) |
| 任务在看板上的流动 | `kanban` | [#kanban](https://pele.run/examples#kanban) |

### 结构 / 层级

| 场景 | 关键字 | 示例 |
|---|---|---|
| 主题拆成子主题，继续往下分 | `mindmap` | [#mindmap](https://pele.run/examples#mindmap) |
| 模块并排、块与块之间有箭头 | `block` | [#block](https://pele.run/examples#block) |
| 类、字段、方法、继承 | `classDiagram` | [#class](https://pele.run/examples#class) |
| 实体、字段、一对多关系 | `erDiagram` | [#entity-relationship](https://pele.run/examples#entity-relationship) |
| 系统部署、服务与连线 | `architecture-beta` | [#architecture](https://pele.run/examples#architecture) |
| 系统上下文、容器、组件 | `C4Component` | [#c4](https://pele.run/examples#c4) |
| 目录、文件树 | `treeView-beta` | [#tree-view](https://pele.run/examples#tree-view) |
| 参与者与用例 | `usecase-beta` | [#use-case](https://pele.run/examples#use-case) |
| 跨角色分工的流程 | `swimlane-beta` | [#swimlane](https://pele.run/examples#swimlane) |
| Agent 的输入、任务、分支 | `agentflow-beta` | [#agentflow](https://pele.run/examples#agentflow) |
| 命令、事件、读模型 | `eventmodeling` | [#event-modeling](https://pele.run/examples#event-modeling) |

### 因果 / 决策

| 场景 | 关键字 | 示例 |
|---|---|---|
| 条件分支、因果链、汇合 | `flowchart` | [#flowchart](https://pele.run/examples#flowchart) |
| 状态迁移、生命周期 | `stateDiagram-v2` | [#state](https://pele.run/examples#state) |
| 根因分析、鱼骨图 | `ishikawa-beta` | [#ishikawa](https://pele.run/examples#ishikawa) |
| 按简单 / 复杂 / 混沌分类 | `cynefin-beta` | [#cynefin](https://pele.run/examples#cynefin) |
| 需求、验证、追溯关系 | `requirementDiagram` | [#requirement](https://pele.run/examples#requirement) |

### 数量 / 比较

| 场景 | 关键字 | 示例 |
|---|---|---|
| 份额、比例 | `pie` | [#pie](https://pele.run/examples#pie) |
| 流量怎么分配、从哪来到哪去 | `sankey` | [#sankey](https://pele.run/examples#sankey) |
| 多指标对比、能力雷达 | `radar-beta` | [#radar](https://pele.run/examples#radar) |
| 层级占比、预算拆分 | `treemap-beta` | [#treemap](https://pele.run/examples#treemap) |
| 集合重叠 | `venn-beta` | [#venn](https://pele.run/examples#venn) |
| 两个维度上的位置、优先级 | `quadrantChart` | [#quadrant-chart](https://pele.run/examples#quadrant-chart) |
| 数值趋势、柱线组合 | `xychart` | [#xy-chart](https://pele.run/examples#xy-chart) |
| 协议字段、字节布局 | `packet` | [#packet](https://pele.run/examples#packet) |
| 语法规则、格式定义 | `railroad-ebnf-beta` | [#railroad](https://pele.run/examples#railroad) |
| 战略演进、价值链 | `wardley-beta` | [#wardley-map](https://pele.run/examples#wardley-map) |

## 第三步：句子 → 图元素

### 节点

- 节点用名词短语或动词短语，2–6 个词。
- 不把整句塞进节点。细节留在正文。
- 同一层级的节点，长度尽量接近。

### 边

- 边上写动词或条件，不写“是”“有”这类空词。
- 因果用实线箭头；补充说明用虚线。
- 双向关系画两条边，或写清方向。

### 常见句式对照

| 句子 | 图元素 |
|---|---|
| A 导致 B / 因为 A，所以 B | `A --> B` |
| A 先做，再做 B | 时间家族，顺序边 |
| A 包含 B 和 C | 结构家族，父子关系 |
| A 有 X、Y 两个状态 | `stateDiagram`，状态节点 |
| A 调用 B，B 返回 C | `sequenceDiagram`，消息箭头 |
| A 由三部分组成，分别占 50/30/20 | `pie` 或 `treemap` |
| A 从 B 流向 C | `sankey` |
| A 在“收益高、成本低”的位置 | `quadrantChart` |
| A 卡在某个条件上 | `flowchart` 的判断菱形 |

## 写作规则

- 一张图只回答一个问题。第二个问题另起一张。
- 3–12 个节点。超过 12 个，拆成两张，或把细节移回正文。
- 图里的词，和正文用同一套术语。
- 图下写一句图注，格式 `图 N：结论`。图注写结论，不写“如图所示”。
- 图不重复正文的每一句；图压缩关系，正文展开理由。
- 不为凑图而画。没有关系，就写段落。

### 泳道图

- 用 `swimlane-beta TB`。泳道是列，步骤向下走。
- 泳道名用角色：`人` / `Agent` / `产物`。
- 同一泳道里放多个产物节点会把图撑宽；合成一个多行节点。
- 节点标签控制在 6–10 个字，长说明放正文。

## 选型优先级

同一段话能画多种图时，按这个顺序选更专门的：

1. 有角色交互 → `sequenceDiagram`，不用 `flowchart`。
2. 有状态名和迁移 → `stateDiagram-v2`。
3. 有实体和字段 → `erDiagram`。
4. 有层级 → `mindmap` 或 `block`。
5. 有占比 → `pie`、`sankey`、`treemap`。
6. 只剩条件和步骤 → `flowchart`。

## 常见错误

| 错误 | 后果 | 改法 |
|---|---|---|
| 用 `flowchart` 画时序 | 角色和先后混在一起 | 换 `sequenceDiagram` |
| 节点里写整句 | 图变得比正文还长 | 压成 2–6 个词，细节回正文 |
| 一张图塞三个问题 | 读者找不到主线 | 拆图，每张一个结论 |
| 图没有图注 | 读者不知道要看什么 | 补一句结论 |
| 只画名词，不画动词 | 看不出关系 | 边写动词或条件 |
| 超过 12 个节点 | 手机上看不清 | 拆图或删层 |

## 验证

本仓库的图用 ```mermaid 围栏，渲染器是 Pele。

- Pele 对齐 Mermaid 12.1。`-beta` 类型能渲染，但语法可能变。
- 中文标签正常。
- 例外：`eventmodeling` 只接受 ASCII 标识符，中文会报错。要画事件流，节点用英文，或换 `flowchart`。
- 写完先本地渲染一次：

```sh
node --input-type=module -e "
import { render } from 'pele';
const src = \`flowchart LR
  A[输入] --> B[处理]\`;
console.log(render(src).width);
"
```

- 报错就降级到最接近的稳定类型，别硬凑语法。
- 站点里的图放在相关段落后，紧跟图注。

## 输出模板

````
场景：<时间 / 结构 / 因果 / 数量>
关键字：<keyword>
理由：<一句话，说明为什么不是相邻的图型>

```mermaid
<图>
```

图 N：<一句结论>
````

## 相关

- 示例总目录：https://pele.run/examples
- 主题变量：https://pele.run/theming
- 本仓库图表规则：`src/content/docs/meta/conventions.mdx` §9.6
