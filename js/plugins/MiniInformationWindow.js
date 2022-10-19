//
//  ミニインフォメーションウィンドウ ver1.03
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

/*:
 * @plugindesc (v1.03)[v1.3] 主菜单 - 详细信息窗口
 * @author Yana （移植MZ飞天大胖喵）（Drill_up翻译+优化）
 * @target MZ
 * 
 * @param 是否初始启用
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default true
 *
 * @param 换列标准
 * @type number
 * @min 1
 * @desc 窗口最多两列，设置8，8行以内描述用1列，8行以上描述用2列。注意，列宽与你的描述文字长度有关。
 * @default 14
 *
 * @param 切换按钮
 * @type text[]
 * @desc 切换该窗口是否显示的按钮。tab的设置意思是，按tab会隐藏窗口，再按会显示。
 * @default ["tab","menu"]
 *
 * @param 是否显示窗口外框
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default false
 *
 * @param 是否将窗口背景设置全黑
 * @type boolean
 * @on 设置全黑
 * @off 设置原窗口样式
 * @desc true - 设置全黑，false - 设置原窗口样式
 * @default true
 *
 * @param 颜色-分隔符
 * @type number
 * @min 0
 * @desc 分隔符的颜色，设置的数字是对应的文本的颜色。
 * @default 0
 *
 * @param 颜色-基本文本
 * @type number
 * @min 0
 * @desc 窗口显示的基本文本的颜色。
 * @default 6
 *
 * @param 颜色-系统文本
 * @type number
 * @min 0
 * @desc 系统自动显示文本的颜色。
 * @default 4
 *
 * @param 颜色-能力上升
 * @type number
 * @min 0
 * @desc 表示能力上升的文本颜色。
 * @default 24
 *
 * @param 颜色-能力下降
 * @type number
 * @min 0
 * @desc 表示能力下降的文本颜色。
 * @default 2
 *
 * @param 是否应用于物品界面
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default true
 *
 * @param 是否固定物品界面坐标
 * @parent 是否应用于物品界面
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default true
 *
 * @param 平移-物品界面窗口 X
 * @parent 是否应用于物品界面
 * @desc x轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最左边。
 * @default 610
 *
 * @param 平移-物品界面窗口 Y
 * @parent 是否应用于物品界面
 * @desc y轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最上面。
 * @default 160
 *
 * @param 是否应用于技能界面
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default true
 *
 * @param 是否固定技能界面坐标
 * @parent 是否应用于技能界面
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default true
 *
 * @param 平移-技能界面窗口 X
 * @parent 是否应用于技能界面
 * @desc x轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最左边。
 * @default 0
 *
 * @param 平移-技能界面窗口 Y
 * @parent 是否应用于技能界面
 * @desc y轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最上面。
 * @default 0
 *
 * @param 是否应用于装备界面
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default true
 *
 * @param 是否固定装备界面坐标
 * @parent 是否应用于装备界面
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default true
 *
 * @param 平移-装备界面窗口 X
 * @parent 是否应用于装备界面
 * @desc x轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最左边。
 * @default 0
 *
 * @param 平移-装备界面窗口 Y
 * @parent 是否应用于装备界面
 * @desc y轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最上面。
 * @default 0
 *
 * @param 是否应用于商店界面
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default true
 *
 * @param 是否固定商店界面坐标
 * @parent 是否应用于商店界面
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default false
 *
 * @param 平移-商店界面窗口 X
 * @parent 是否应用于商店界面
 * @desc x轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最左边。
 * @default 0
 *
 * @param 平移-商店界面窗口 Y
 * @parent 是否应用于商店界面
 * @desc y轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最上面。
 * @default 0
 *
 * @param 是否应用于战斗界面
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭
 * @default true
 *
 * @param 是否固定战斗界面坐标
 * @parent 是否应用于战斗界面
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default false
 *
 * @param 平移-战斗界面窗口 X
 * @parent 是否应用于战斗界面
 * @desc x轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最左边。
 * @default 0
 *
 * @param 平移-战斗界面窗口 Y
 * @parent 是否应用于战斗界面
 * @desc y轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最上面。
 * @default 0
 *
 * @param 是否应用于FTKR技能树界面
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc true - 启用，false - 关闭，需要导入FTKR技能树插件。
 * @default true
 *
 * @param 是否固定FTKR技能树界面坐标
 * @parent 是否应用于FTKR技能树界面
 * @type boolean
 * @on 固定
 * @off 自适应
 * @desc true - 固定，false - 自适应。自适应会根据选项位置对xy坐标进行偏移。
 * @default false
 *
 * @param 平移-FTKR技能树界面窗口 X
 * @parent 是否应用于FTKR技能树界面
 * @desc x轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最左边。
 * @default 0
 *
 * @param 平移-FTKR技能树界面窗口 Y
 * @parent 是否应用于FTKR技能树界面
 * @desc y轴方向平移，单位像素。（可为负数）如果是自适应，就为偏移量，如果是固定，0为贴在最上面。
 * @default 0
 *
 * @param 用语-回合
 * @desc 描述 "回合" 的用语。
 * @default 回合
 *
 * @param 用语-逃跑
 * @desc 描述 "逃跑" 的用语。
 * @default 逃跑
 *
 * @param ---特性用语---
 * @default 
 *
 * @param 显示-属性有效度
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->抗性->属性有效度 情况。
 * @default true
 *
 * @param 用语-属性有效度
 * @parent ---特性用语---
 * @desc 武器->特性->抗性->属性有效度 情况。
 * @default 有效度
 *
 * @param 显示-弱化有效度
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->抗性->弱化有效度 情况。
 * @default true
 *
 * @param 用语-弱化有效度
 * @parent ---特性用语---
 * @desc 武器->特性->抗性->弱化有效度 情况。
 * @default 有效度
 *
 * @param 显示-状态有效度
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->抗性->状态有效度 情况。
 * @default true
 *
 * @param 用语-状态有效度
 * @parent ---特性用语---
 * @desc 武器->特性->抗性->状态有效度 情况。
 * @default 有效度
 *
 * @param 显示-状态免疫
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->抗性->状态免疫 情况。
 * @default true
 *
 * @param 用语-状态免疫
 * @parent ---特性用语---
 * @desc 武器->特性->抗性->状态免疫 情况。
 * @default 状态免疫
 *
 * @param 显示-通常能力值
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->通常能力值 情况。
 * @default true
 *
 * @param >>追加能力值
 * @parent ---特性用语---
 * @default 
 *
 * @param 显示-命中率
 * @parent >>追加能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default true
 *
 * @param 用语-命中率
 * @parent >>追加能力值
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default 命中率
 *
 * @param 显示-回避率
 * @parent >>追加能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default true
 *
 * @param 用语-回避率
 * @parent >>追加能力值
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default 物理闪避率
 *
 * @param 显示-暴击率
 * @parent >>追加能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default true
 *
 * @param 用语-暴击率
 * @parent >>追加能力值
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default 暴击率
 *
 * @param 显示-暴击回避
 * @parent >>追加能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default true
 *
 * @param 用语-暴击回避
 * @parent >>追加能力值
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default 暴击回避
 *
 * @param 显示-魔法回避
 * @parent >>追加能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default true
 *
 * @param 用语-魔法回避
 * @parent >>追加能力值
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default 魔法回避率
 *
 * @param 显示-魔法反射
 * @parent >>追加能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default true
 *
 * @param 用语-魔法反射
 * @parent >>追加能力值
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default 魔法反射
 *
 * @param 显示-反击
 * @parent >>追加能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default true
 *
 * @param 用语-反击
 * @parent >>追加能力值
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default 物理反击
 *
 * @param 显示-HP自动恢复
 * @parent >>追加能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default true
 *
 * @param 用语-HP自动恢复
 * @parent >>追加能力值
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default HP自动恢复
 *
 * @param 显示-MP自动恢复
 * @parent >>追加能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default true
 *
 * @param 用语-MP自动恢复
 * @parent >>追加能力值
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default MP自动恢复
 *
 * @param 显示-TP自动恢复
 * @parent >>追加能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default true
 *
 * @param 用语-TP自动恢复
 * @parent >>追加能力值
 * @desc 武器->特性->能力值->追加能力值 情况。
 * @default TP自动恢复
 *
 * @param >>特殊能力值
 * @parent ---特性用语---
 * @default 
 *
 * @param 显示-受到攻击几率
 * @parent >>特殊能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default true
 *
 * @param 用语-受到攻击几率
 * @parent >>特殊能力值
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default 受到攻击几率
 *
 * @param 显示-防御效果
 * @parent >>特殊能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default true
 *
 * @param 用语-防御效果
 * @parent >>特殊能力值
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default 防御效果
 *
 * @param 显示-恢复效果
 * @parent >>特殊能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default true
 *
 * @param 用语-恢复效果
 * @parent >>特殊能力值
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default 恢复效果
 *
 * @param 显示-药理知识
 * @parent >>特殊能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default true
 *
 * @param 用语-药理知识
 * @parent >>特殊能力值
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default 药理知识
 *
 * @param 显示-MP消耗率
 * @parent >>特殊能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default true
 *
 * @param 用语-MP消耗率
 * @parent >>特殊能力值
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default MP消耗率
 *
 * @param 显示-TP补充率
 * @parent >>特殊能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default true
 *
 * @param 用语-TP补充率
 * @parent >>特殊能力值
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default TP补充率
 *
 * @param 显示-物理伤害
 * @parent >>特殊能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default true
 *
 * @param 用语-物理伤害
 * @parent >>特殊能力值
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default 物理伤害
 *
 * @param 显示-魔法伤害
 * @parent >>特殊能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default true
 *
 * @param 用语-魔法伤害
 * @parent >>特殊能力值
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default 魔法伤害
 *
 * @param 显示-地形伤害
 * @parent >>特殊能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default true
 *
 * @param 用语-地形伤害
 * @parent >>特殊能力值
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default 地形伤害
 *
 * @param 显示-经验值
 * @parent >>特殊能力值
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default true
 *
 * @param 用语-经验值
 * @parent >>特殊能力值
 * @desc 武器->特性->能力值->特殊能力值 情况。
 * @default 经验获得率
 *
 * @param 显示-攻击时属性
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->攻击->攻击时属性 情况。
 * @default true
 *
 * @param 用语-攻击时属性
 * @parent ---特性用语---
 * @desc 武器->特性->攻击->攻击时属性 情况。
 * @default 攻击属性
 *
 * @param 显示-攻击时状态
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->攻击->攻击时状态 情况。
 * @default true
 *
 * @param 用语-攻击时状态
 * @parent ---特性用语---
 * @desc 武器->特性->攻击->攻击时状态 情况。
 * @default 附加状态
 *
 * @param 显示-攻击速度补正
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->攻击->攻击速度补正 情况。
 * @default true
 *
 * @param 用语-攻击速度补正
 * @parent ---特性用语---
 * @desc 武器->特性->攻击->攻击速度补正 情况。
 * @default 攻击速度补正
 *
 * @param 显示-攻击追加次数
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->攻击->攻击追加次数 情况。
 * @default true
 *
 * @param 用语-攻击追加次数
 * @parent ---特性用语---
 * @desc 武器->特性->攻击->攻击追加次数 情况。
 * @default 攻击追加次数
 *
 * @param 显示-添加技能类型
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->技能->添加技能类型 情况。
 * @default true
 *
 * @param 用语-添加技能类型
 * @parent ---特性用语---
 * @desc 武器->特性->技能->添加技能类型 情况。
 * @default 添加技能类型
 *
 * @param 显示-封印技能类型
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->技能->封印技能类型 情况。
 * @default true
 *
 * @param 用语-封印技能类型
 * @parent ---特性用语---
 * @desc 武器->特性->技能->封印技能类型 情况。
 * @default 封印技能类型
 *
 * @param 显示-添加技能
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->技能->添加技能 情况。
 * @default true
 *
 * @param 用语-添加技能
 * @parent ---特性用语---
 * @desc 武器->特性->技能->添加技能 情况。
 * @default 添加技能
 *
 * @param 显示-封印技能
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->技能->封印技能 情况。
 * @default true
 *
 * @param 用语-封印技能
 * @parent ---特性用语---
 * @desc 武器->特性->技能->封印技能 情况。
 * @default 封印技能
 *
 * @param 显示-装备武器类型
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->装备->装备武器类型 情况。
 * @default true
 *
 * @param 用语-装备武器类型
 * @parent ---特性用语---
 * @desc 武器->特性->装备->装备武器类型 情况。
 * @default 装备武器类型
 *
 * @param 显示-装备护甲类型
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->装备->装备护甲类型 情况。
 * @default true
 *
 * @param 用语-装备护甲类型
 * @parent ---特性用语---
 * @desc 武器->特性->装备->装备护甲类型 情况。
 * @default 装备护甲类型
 *
 * @param 显示-固定装备
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->装备->固定装备 情况。
 * @default true
 *
 * @param 用语-固定装备
 * @parent ---特性用语---
 * @desc 武器->特性->装备->固定装备 情况。
 * @default 固定装备
 *
 * @param 显示-封印装备
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->装备->封印装备 情况。
 * @default true
 *
 * @param 用语-封印装备
 * @parent ---特性用语---
 * @desc 武器->特性->装备->封印装备 情况。
 * @default 封印装备
 *
 * @param 显示-装备槽类型
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->装备->装备槽类型 情况。
 * @default true
 *
 * @param 用语-装备槽类型
 * @parent ---特性用语---
 * @desc 武器->特性->装备->装备槽类型 情况。
 * @default 二刀流
 *
 * @param 显示-增加行动次数
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->其他->增加行动次数 情况。
 * @default true
 *
 * @param 用语-增加行动次数
 * @parent ---特性用语---
 * @desc 武器->特性->其他->增加行动次数 情况。
 * @default 增加行动次数
 *
 * @param >>特殊标志
 * @parent ---特性用语---
 * @default 
 *
 * @param 显示-自动战斗
 * @parent >>特殊标志
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->其他->特殊标志 情况。
 * @default true
 *
 * @param 用语-自动战斗
 * @parent >>特殊标志
 * @desc 武器->特性->其他->特殊标志 情况。
 * @default 自动战斗
 *
 * @param 显示-防御
 * @parent >>特殊标志
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->其他->特殊标志 情况。
 * @default true
 *
 * @param 用语-防御
 * @parent >>特殊标志
 * @desc 武器->特性->其他->特殊标志 情况。
 * @default 启用防御
 *
 * @param 显示-掩护
 * @parent >>特殊标志
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->其他->特殊标志 情况。
 * @default true
 *
 * @param 用语-掩护
 * @parent >>特殊标志
 * @desc 武器->特性->其他->特殊标志 情况。
 * @default 可掩护
 *
 * @param 显示-保留TP
 * @parent >>特殊标志
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->其他->特殊标志 情况。
 * @default true
 *
 * @param 用语-保留TP
 * @parent >>特殊标志
 * @desc 武器->特性->其他->特殊标志 情况。
 * @default 保留TP
 *
 * @param 显示-消失效果
 * @parent ---特性用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->其他->消失效果 情况。
 * @default true
 *
 * @param 用语-消失效果
 * @parent ---特性用语---
 * @type text[]
 * @desc 武器->特性->其他->消失效果 情况。
 * @default ["正常消失","Boss消失","瞬间消失","不消失"]
 *
 * @param >>队伍能力
 * @parent ---特性用语---
 * @default 
 *
 * @param 显示-遇敌减半
 * @parent >>队伍能力
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->其他->队伍能力 情况。
 * @default true
 *
 * @param 用语-遇敌减半
 * @parent >>队伍能力
 * @desc 武器->特性->其他->队伍能力 情况。
 * @default 遇敌减半
 *
 * @param 显示-无遇敌
 * @parent >>队伍能力
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->其他->队伍能力 情况。
 * @default true
 *
 * @param 用语-无遇敌
 * @parent >>队伍能力
 * @desc 武器->特性->其他->队伍能力 情况。
 * @default 无遇敌
 *
 * @param 显示-取消偷袭
 * @parent >>队伍能力
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->其他->队伍能力 情况。
 * @default true
 *
 * @param 用语-取消偷袭
 * @parent >>队伍能力
 * @desc 武器->特性->其他->队伍能力 情况。
 * @default 取消偷袭
 *
 * @param 显示-增加先发制人率
 * @parent >>队伍能力
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->其他->队伍能力 情况。
 * @default true
 *
 * @param 用语-增加先发制人率
 * @parent >>队伍能力
 * @desc 武器->特性->其他->队伍能力 情况。
 * @default 增加先发制人率
 *
 * @param 显示-双倍金钱
 * @parent >>队伍能力
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->其他->队伍能力 情况。
 * @default true
 *
 * @param 用语-双倍金钱
 * @parent >>队伍能力
 * @desc 武器->特性->其他->队伍能力 情况。
 * @default 双倍金钱
 *
 * @param 显示-双倍掉落物品
 * @parent >>队伍能力
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 武器->特性->其他->队伍能力 情况。
 * @default true
 *
 * @param 用语-双倍掉落物品
 * @parent >>队伍能力
 * @desc 武器->特性->其他->队伍能力 情况。
 * @default 双倍掉落物品
 *
 * @param ---效果用语---
 * @default 
 *
 * @param 显示-恢复HP
 * @parent ---效果用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 物品->效果->恢复->恢复HP HP为正值情况。
 * @default true
 *
 * @param 用语-恢复HP
 * @parent ---效果用语---
 * @desc 物品->效果->恢复->恢复HP HP为正值情况。
 * @default 恢复HP
 *
 * @param 显示-消耗HP
 * @parent ---效果用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 物品->效果->恢复->恢复HP HP为负值情况。
 * @default true
 *
 * @param 用语-消耗HP
 * @parent ---效果用语---
 * @desc 物品->效果->恢复->恢复HP HP为负值情况。
 * @default 消耗HP
 *
 * @param 显示-恢复MP
 * @parent ---效果用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 物品->效果->恢复->恢复MP MP为正值情况。
 * @default true
 *
 * @param 用语-恢复MP
 * @parent ---效果用语---
 * @desc 物品->效果->恢复->恢复MP MP为正值情况。
 * @default 恢复MP
 *
 * @param 显示-消耗MP
 * @parent ---效果用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 物品->效果->恢复->恢复MP MP为负值情况。
 * @default true
 *
 * @param 用语-消耗MP
 * @parent ---效果用语---
 * @desc 物品->效果->恢复->恢复MP MP为负值情况。
 * @default 消耗MP
 *
 * @param 显示-恢复TP
 * @parent ---效果用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 物品->效果->恢复->恢复TP TP为正值情况。
 * @default true
 *
 * @param 用语-恢复TP
 * @parent ---效果用语---
 * @desc 物品->效果->恢复->恢复TP TP为正值情况。
 * @default 恢复TP
 *
 * @param 显示-消耗TP
 * @parent ---效果用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 物品->效果->恢复->恢复TP TP为负值情况。
 * @default true
 *
 * @param 用语-消耗TP
 * @parent ---效果用语---
 * @desc 物品->效果->恢复->恢复TP TP为负值情况。
 * @default 消耗TP
 *
 * @param 显示-附加状态
 * @parent ---效果用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 物品->效果->状态->附加状态 情况。
 * @default true
 *
 * @param 用语-附加状态
 * @parent ---效果用语---
 * @desc 物品->效果->状态->附加状态 情况。
 * @default 附加状态
 *
 * @param 显示-解除状态
 * @parent ---效果用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 物品->效果->状态->解除状态 情况。
 * @default true
 *
 * @param 用语-解除状态
 * @parent ---效果用语---
 * @desc 物品->效果->状态->解除状态 情况。
 * @default 解除状态
 *
 * @param 显示-强化
 * @parent ---效果用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 物品->效果->能力值->强化 情况。
 * @default true
 *
 * @param 用语-强化
 * @parent ---效果用语---
 * @desc 物品->效果->能力值->强化 情况。
 * @default 强化
 *
 * @param 显示-弱化
 * @parent ---效果用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 物品->效果->能力值->弱化 情况。
 * @default true
 *
 * @param 用语-弱化
 * @parent ---效果用语---
 * @desc 物品->效果->能力值->弱化 情况。
 * @default 弱化
 *
 * @param 显示-解除强化
 * @parent ---效果用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 物品->效果->能力值->解除强化 情况。
 * @default true
 *
 * @param 用语-解除强化
 * @parent ---效果用语---
 * @desc 物品->效果->能力值->解除强化 情况。
 * @default 解除强化
 *
 * @param 显示-解除弱化
 * @parent ---效果用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 物品->效果->能力值->解除弱化 情况。
 * @default true
 *
 * @param 用语-解除弱化
 * @parent ---效果用语---
 * @desc 物品->效果->能力值->解除弱化 情况。
 * @default 解除弱化
 *
 * @param 显示-特殊效果
 * @parent ---效果用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 物品->效果->其它->特殊效果 情况。
 * @default true
 *
 * @param 用语-特殊效果
 * @parent ---效果用语---
 * @desc 物品->效果->其它->特殊效果 情况。
 * @default 特殊效果
 *
 * @param 显示-成长
 * @parent ---效果用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 物品->效果->其它->成长 情况。
 * @default true
 *
 * @param 用语-成长
 * @parent ---效果用语---
 * @desc 物品->效果->其它->成长 情况。
 * @default 永久提升
 *
 * @param 显示-学会技能
 * @parent ---效果用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 物品->效果->其它->学会技能 情况。
 * @default true
 *
 * @param 用语-学会技能
 * @parent ---效果用语---
 * @desc 物品->效果->其它->学会技能 情况。
 * @default 学会技能
 *
 * @param 显示-公共事件
 * @parent ---效果用语---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc 物品->效果->其它->公共事件 情况。
 * @default true
 *
 * @param 用语-公共事件
 * @parent ---效果用语---
 * @desc 物品->效果->其它->公共事件 情况。
 * @default 特殊
 *
 *  @help 
 * =============================================================================
 * +++ MiniInformationWindow (v1.03) +++
 * By Yana
 * https://twitter.com/yanatsuki_
 * =============================================================================
 * 查看物品或装备时，会弹出窗口并对其详细介绍。
 * 这些介绍都是自动生成的，你也可以手动配置自动生成的方式。
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以在物品、装备中添加标签注释，以添加更多的内容：
 * <追加情报窗口前:>
 * (内容)
 * <追加情报窗口后:>
 * <描述P:xxx>
 * （自动生成的内容）
 * <描述A:xxx>
 * 
 * 或者：
 * <描述前:xxx>
 * （自动生成的内容）
 * <描述后:xxx>
 *
 * 注意，你填写的内容，是一整行，如果特别长，则窗口会被撑开特别宽。
 * 要另起一行，就加更多的标签就可以了：
 * <描述A:这是一句非常长的没有意>
 * <描述A:义的话。>
 * 追加的描述与文本框一样，都支持 \c[2]颜色 \i[1]图标 的设置。
 *
 * -----------------------------------------------------------------------------
 * 
 * ----关于Drill_up优化：
 * [v1.1]
 * 大幅度修改了插件的显示文本方式。
 * 将原本的配置参数修改至更精确。
 * rmmv的配置真的超级多╭(°A°`)╮真忍不住想吐槽……
 * [v1.2]
 * 使得战斗界面也可以显示窗口（感谢 林空鹿饮溪๑），添加了设置窗口外框是否显示。
 * 使得FTKR技能树界面也可以显示窗口。
 * 修复了技能添加去除显示出错的问题。
 *
 * ------------------------------------------------------
 * ----利用規約 （Yana）
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 */

var Imported = Imported || {};
Imported.MiniInformationWindow = true;
var DrillUp = DrillUp || {};

DrillUp.parameters = PluginManager.parameters('MiniInformationWindow');

DrillUp.turnText = String(DrillUp.parameters['用语-回合'] || "回合");
DrillUp.escapeText = String(DrillUp.parameters['用语-逃跑'] || "逃跑");

DrillUp.m_effect_recoverHP_visible = String(DrillUp.parameters['显示-恢复HP'] || "true");
DrillUp.m_effect_recoverHP_text = String(DrillUp.parameters['用语-恢复HP'] || "");
DrillUp.m_effect_lostHP_visible = String(DrillUp.parameters['显示-消耗HP'] || "true");
DrillUp.m_effect_lostHP_text = String(DrillUp.parameters['用语-消耗HP'] || "");
DrillUp.m_effect_recoverMP_visible = String(DrillUp.parameters['显示-恢复MP'] || "true");
DrillUp.m_effect_recoverMP_text = String(DrillUp.parameters['用语-恢复MP'] || "");
DrillUp.m_effect_lostMP_visible = String(DrillUp.parameters['显示-消耗MP'] || "true");
DrillUp.m_effect_lostMP_text = String(DrillUp.parameters['用语-消耗MP'] || "");
DrillUp.m_effect_recoverTP_visible = String(DrillUp.parameters['显示-恢复TP'] || "true");
DrillUp.m_effect_recoverTP_text = String(DrillUp.parameters['用语-恢复TP'] || "");
DrillUp.m_effect_lostTP_visible = String(DrillUp.parameters['显示-消耗TP'] || "true");
DrillUp.m_effect_lostTP_text = String(DrillUp.parameters['用语-消耗TP'] || "");

DrillUp.m_effect_addState_visible = String(DrillUp.parameters['显示-附加状态'] || "true");
DrillUp.m_effect_addState_text = String(DrillUp.parameters['用语-附加状态'] || "");
DrillUp.m_effect_removeState_visible = String(DrillUp.parameters['显示-解除状态'] || "true");
DrillUp.m_effect_removeState_text = String(DrillUp.parameters['用语-解除状态'] || "");

DrillUp.m_effect_upParam_visible = String(DrillUp.parameters['显示-强化'] || "true");
DrillUp.m_effect_upParam_text = String(DrillUp.parameters['用语-强化'] || "");
DrillUp.m_effect_downParam_visible = String(DrillUp.parameters['显示-弱化'] || "true");
DrillUp.m_effect_downParam_text = String(DrillUp.parameters['用语-弱化'] || "");
DrillUp.m_effect_remove_upParam_visible = String(DrillUp.parameters['显示-解除强化'] || "true");
DrillUp.m_effect_remove_upParam_text = String(DrillUp.parameters['用语-解除强化'] || "");
DrillUp.m_effect_remove_downParam_visible = String(DrillUp.parameters['显示-解除弱化'] || "true");
DrillUp.m_effect_remove_downParam_text = String(DrillUp.parameters['用语-解除弱化'] || "");

DrillUp.m_effect_special_visible = String(DrillUp.parameters['显示-特殊效果'] || "true");
DrillUp.m_effect_special_text = String(DrillUp.parameters['用语-特殊效果'] || "");
DrillUp.m_effect_grow_visible = String(DrillUp.parameters['显示-成长'] || "true");
DrillUp.m_effect_grow_text = String(DrillUp.parameters['用语-成长'] || "");
DrillUp.m_effect_learnSkill_visible = String(DrillUp.parameters['显示-学会技能'] || "true");
DrillUp.m_effect_learnSkill_text = String(DrillUp.parameters['用语-学会技能'] || "");
DrillUp.m_effect_commonEvent_visible = String(DrillUp.parameters['显示-公共事件'] || "true");
DrillUp.m_effect_commonEvent_text = String(DrillUp.parameters['用语-公共事件'] || "");

DrillUp.m_window_defaultState = String(DrillUp.parameters['是否初始启用'] || "true");
DrillUp.m_window_black = String(DrillUp.parameters['是否将窗口背景设置全黑'] || "true");
DrillUp.m_window_frame_layout_visible = String(DrillUp.parameters['是否显示窗口外框'] || "true");
DrillUp.switchKey = JSON.parse(DrillUp.parameters['切换按钮'] || []);
DrillUp.twoColSize = Number(DrillUp.parameters['换列标准'] || 8);
DrillUp.iter_color = Number(DrillUp.parameters['颜色-分隔符'] || 0);
DrillUp.text_color_base = Number(DrillUp.parameters['颜色-基本文本'] || 0);
DrillUp.text_color_sys = Number(DrillUp.parameters['颜色-系统文本'] || 0);
DrillUp.text_color_up = Number(DrillUp.parameters['颜色-能力上升'] || 0);
DrillUp.text_color_down = Number(DrillUp.parameters['颜色-能力下降'] || 0);
DrillUp.useSceneItem = DrillUp.parameters['是否应用于物品界面'] === 'true';
DrillUp.m_window_item_offset_fix = String(DrillUp.parameters['是否固定物品界面坐标'] || "true");
DrillUp.m_window_item_offsetX = Number(DrillUp.parameters['平移-物品界面窗口 X'] || 0);
DrillUp.m_window_item_offsetY = Number(DrillUp.parameters['平移-物品界面窗口 Y'] || 0);
DrillUp.useSceneSkill = DrillUp.parameters['是否应用于技能界面'] === 'true';
DrillUp.m_window_skill_offset_fix = String(DrillUp.parameters['是否固定技能界面坐标'] || "true");
DrillUp.m_window_skill_offsetX = Number(DrillUp.parameters['平移-技能界面窗口 X'] || 0);
DrillUp.m_window_skill_offsetY = Number(DrillUp.parameters['平移-技能界面窗口 Y'] || 0);
DrillUp.useSceneEquip = DrillUp.parameters['是否应用于装备界面'] === 'true';
DrillUp.m_window_equip_offset_fix = String(DrillUp.parameters['是否固定装备界面坐标'] || "true");
DrillUp.m_window_equip_offsetX = Number(DrillUp.parameters['平移-装备界面窗口 X'] || 0);
DrillUp.m_window_equip_offsetY = Number(DrillUp.parameters['平移-装备界面窗口 Y'] || 0);
DrillUp.useSceneShop = DrillUp.parameters['是否应用于商店界面'] === 'true';
DrillUp.m_window_shop_offset_fix = String(DrillUp.parameters['是否固定商店界面坐标'] || "true");
DrillUp.m_window_shop_offsetX = Number(DrillUp.parameters['平移-商店界面窗口 X'] || 0);
DrillUp.m_window_shop_offsetY = Number(DrillUp.parameters['平移-商店界面窗口 Y'] || 0);
DrillUp.useSceneBattle = DrillUp.parameters['是否应用于战斗界面'] === 'true';
DrillUp.m_window_battle_offset_fix = String(DrillUp.parameters['是否固定战斗界面坐标'] || "true");
DrillUp.m_window_battle_offsetX = Number(DrillUp.parameters['平移-战斗界面窗口 X'] || 0);
DrillUp.m_window_battle_offsetY = Number(DrillUp.parameters['平移-战斗界面窗口 Y'] || 0);
DrillUp.useSceneFTKR = DrillUp.parameters['是否应用于FTKR技能树界面'] === 'true';
DrillUp.m_window_FTKR_offset_fix = String(DrillUp.parameters['是否固定FTKR技能树界面坐标'] || "true");
DrillUp.m_window_FTKR_offsetX = Number(DrillUp.parameters['平移-FTKR技能树界面窗口 X'] || 0);
DrillUp.m_window_FTKR_offsetY = Number(DrillUp.parameters['平移-FTKR技能树界面窗口 Y'] || 0);

DrillUp.m_attr_element_visible = String(DrillUp.parameters['显示-属性有效度'] || "true");
DrillUp.m_attr_element_text = String(DrillUp.parameters['用语-属性有效度'] || "");
DrillUp.m_attr_weak_visible = String(DrillUp.parameters['显示-弱化有效度'] || "true");
DrillUp.m_attr_weak_text = String(DrillUp.parameters['用语-弱化有效度'] || "");
DrillUp.m_attr_state_visible = String(DrillUp.parameters['显示-状态有效度'] || "true");
DrillUp.m_attr_state_text = String(DrillUp.parameters['用语-状态有效度'] || "");
DrillUp.m_attr_immune_visible = String(DrillUp.parameters['显示-状态免疫'] || "true");
DrillUp.m_attr_immune_text = String(DrillUp.parameters['用语-状态免疫'] || "");
DrillUp.m_attr_common_visible = String(DrillUp.parameters['显示-通常能力值'] || "true");
DrillUp.m_attr_add0_visible = String(DrillUp.parameters['显示-命中率'] || "true");
DrillUp.m_attr_add0_text = String(DrillUp.parameters['用语-命中率'] || "");
DrillUp.m_attr_add1_visible = String(DrillUp.parameters['显示-回避率'] || "true");
DrillUp.m_attr_add1_text = String(DrillUp.parameters['用语-回避率'] || "");
DrillUp.m_attr_add2_visible = String(DrillUp.parameters['显示-暴击率'] || "true");
DrillUp.m_attr_add2_text = String(DrillUp.parameters['用语-暴击率'] || "");
DrillUp.m_attr_add3_visible = String(DrillUp.parameters['显示-暴击回避'] || "true");
DrillUp.m_attr_add3_text = String(DrillUp.parameters['用语-暴击回避'] || "");
DrillUp.m_attr_add4_visible = String(DrillUp.parameters['显示-魔法回避'] || "true");
DrillUp.m_attr_add4_text = String(DrillUp.parameters['用语-魔法回避'] || "");
DrillUp.m_attr_add5_visible = String(DrillUp.parameters['显示-魔法反射'] || "true");
DrillUp.m_attr_add5_text = String(DrillUp.parameters['用语-魔法反射'] || "");
DrillUp.m_attr_add6_visible = String(DrillUp.parameters['显示-反击'] || "true");
DrillUp.m_attr_add6_text = String(DrillUp.parameters['用语-反击'] || "");
DrillUp.m_attr_add7_visible = String(DrillUp.parameters['显示-HP自动恢复'] || "true");
DrillUp.m_attr_add7_text = String(DrillUp.parameters['用语-HP自动恢复'] || "");
DrillUp.m_attr_add8_visible = String(DrillUp.parameters['显示-MP自动恢复'] || "true");
DrillUp.m_attr_add8_text = String(DrillUp.parameters['用语-MP自动恢复'] || "");
DrillUp.m_attr_add9_visible = String(DrillUp.parameters['显示-TP自动恢复'] || "true");
DrillUp.m_attr_add9_text = String(DrillUp.parameters['用语-TP自动恢复'] || "");
DrillUp.m_attr_ext0_visible = String(DrillUp.parameters['显示-受到攻击几率'] || "true");
DrillUp.m_attr_ext0_text = String(DrillUp.parameters['用语-受到攻击几率'] || "");
DrillUp.m_attr_ext1_visible = String(DrillUp.parameters['显示-防御效果'] || "true");
DrillUp.m_attr_ext1_text = String(DrillUp.parameters['用语-防御效果'] || "");
DrillUp.m_attr_ext2_visible = String(DrillUp.parameters['显示-恢复效果'] || "true");
DrillUp.m_attr_ext2_text = String(DrillUp.parameters['用语-恢复效果'] || "");
DrillUp.m_attr_ext3_visible = String(DrillUp.parameters['显示-药理知识'] || "true");
DrillUp.m_attr_ext3_text = String(DrillUp.parameters['用语-药理知识'] || "");
DrillUp.m_attr_ext4_visible = String(DrillUp.parameters['显示-MP消耗率'] || "true");
DrillUp.m_attr_ext4_text = String(DrillUp.parameters['用语-MP消耗率'] || "");
DrillUp.m_attr_ext5_visible = String(DrillUp.parameters['显示-TP补充率'] || "true");
DrillUp.m_attr_ext5_text = String(DrillUp.parameters['用语-TP补充率'] || "");
DrillUp.m_attr_ext6_visible = String(DrillUp.parameters['显示-物理伤害'] || "true");
DrillUp.m_attr_ext6_text = String(DrillUp.parameters['用语-物理伤害'] || "");
DrillUp.m_attr_ext7_visible = String(DrillUp.parameters['显示-魔法伤害'] || "true");
DrillUp.m_attr_ext7_text = String(DrillUp.parameters['用语-魔法伤害'] || "");
DrillUp.m_attr_ext8_visible = String(DrillUp.parameters['显示-地形伤害'] || "true");
DrillUp.m_attr_ext8_text = String(DrillUp.parameters['用语-地形伤害'] || "");
DrillUp.m_attr_ext9_visible = String(DrillUp.parameters['显示-经验值'] || "true");
DrillUp.m_attr_ext9_text = String(DrillUp.parameters['用语-经验值'] || "");
DrillUp.m_attr_atk0_visible = String(DrillUp.parameters['显示-攻击时属性'] || "true");
DrillUp.m_attr_atk0_text = String(DrillUp.parameters['用语-攻击时属性'] || "");
DrillUp.m_attr_atk1_visible = String(DrillUp.parameters['显示-攻击时状态'] || "true");
DrillUp.m_attr_atk1_text = String(DrillUp.parameters['用语-攻击时状态'] || "");
DrillUp.m_attr_atk2_visible = String(DrillUp.parameters['显示-攻击速度补正'] || "true");
DrillUp.m_attr_atk2_text = String(DrillUp.parameters['用语-攻击速度补正'] || "");
DrillUp.m_attr_atk3_visible = String(DrillUp.parameters['显示-攻击追加次数'] || "true");
DrillUp.m_attr_atk3_text = String(DrillUp.parameters['用语-攻击追加次数'] || "");
DrillUp.m_attr_skill0_visible = String(DrillUp.parameters['显示-添加技能类型'] || "true");
DrillUp.m_attr_skill0_text = String(DrillUp.parameters['用语-添加技能类型'] || "");
DrillUp.m_attr_skill1_visible = String(DrillUp.parameters['显示-封印技能类型'] || "true");
DrillUp.m_attr_skill1_text = String(DrillUp.parameters['用语-封印技能类型'] || "");
DrillUp.m_attr_skill2_visible = String(DrillUp.parameters['显示-添加技能'] || "true");
DrillUp.m_attr_skill2_text = String(DrillUp.parameters['用语-添加技能'] || "");
DrillUp.m_attr_skill3_visible = String(DrillUp.parameters['显示-封印技能'] || "true");
DrillUp.m_attr_skill3_text = String(DrillUp.parameters['用语-封印技能'] || "");
DrillUp.m_attr_equip0_visible = String(DrillUp.parameters['显示-装备武器类型'] || "true");
DrillUp.m_attr_equip0_text = String(DrillUp.parameters['用语-装备武器类型'] || "");
DrillUp.m_attr_equip1_visible = String(DrillUp.parameters['显示-装备护甲类型'] || "true");
DrillUp.m_attr_equip1_text = String(DrillUp.parameters['用语-装备护甲类型'] || "");
DrillUp.m_attr_equip2_visible = String(DrillUp.parameters['显示-固定装备'] || "true");
DrillUp.m_attr_equip2_text = String(DrillUp.parameters['用语-固定装备'] || "");
DrillUp.m_attr_equip3_visible = String(DrillUp.parameters['显示-封印装备'] || "true");
DrillUp.m_attr_equip3_text = String(DrillUp.parameters['用语-封印装备'] || "");
DrillUp.m_attr_equip4_visible = String(DrillUp.parameters['显示-装备槽类型'] || "true");
DrillUp.m_attr_equip4_text = String(DrillUp.parameters['用语-装备槽类型'] || "");

DrillUp.m_attr_move_visible = String(DrillUp.parameters['显示-增加行动次数'] || "true");
DrillUp.m_attr_move_text = String(DrillUp.parameters['用语-增加行动次数'] || "");
DrillUp.m_attr_tag0_visible = String(DrillUp.parameters['显示-自动战斗'] || "true");
DrillUp.m_attr_tag0_text = String(DrillUp.parameters['用语-自动战斗'] || "");
DrillUp.m_attr_tag1_visible = String(DrillUp.parameters['显示-防御'] || "true");
DrillUp.m_attr_tag1_text = String(DrillUp.parameters['用语-防御'] || "");
DrillUp.m_attr_tag2_visible = String(DrillUp.parameters['显示-掩护'] || "true");
DrillUp.m_attr_tag2_text = String(DrillUp.parameters['用语-掩护'] || "");
DrillUp.m_attr_tag3_visible = String(DrillUp.parameters['显示-保留TP'] || "true");
DrillUp.m_attr_tag3_text = String(DrillUp.parameters['用语-保留TP'] || "");
DrillUp.m_attr_disappear_visible = String(DrillUp.parameters['显示-消失效果'] || "true");
DrillUp.m_attr_disappear_text = JSON.parse(DrillUp.parameters['用语-消失效果'] || []);
DrillUp.m_attr_party0_visible = String(DrillUp.parameters['显示-遇敌减半'] || "true");
DrillUp.m_attr_party0_text = String(DrillUp.parameters['用语-遇敌减半'] || "");
DrillUp.m_attr_party1_visible = String(DrillUp.parameters['显示-无遇敌'] || "true");
DrillUp.m_attr_party1_text = String(DrillUp.parameters['用语-无遇敌'] || "");
DrillUp.m_attr_party2_visible = String(DrillUp.parameters['显示-取消偷袭'] || "true");
DrillUp.m_attr_party2_text = String(DrillUp.parameters['用语-取消偷袭'] || "");
DrillUp.m_attr_party3_visible = String(DrillUp.parameters['显示-增加先发制人率'] || "true");
DrillUp.m_attr_party3_text = String(DrillUp.parameters['用语-增加先发制人率'] || "");
DrillUp.m_attr_party4_visible = String(DrillUp.parameters['显示-双倍金钱'] || "true");
DrillUp.m_attr_party4_text = String(DrillUp.parameters['用语-双倍金钱'] || "");
DrillUp.m_attr_party5_visible = String(DrillUp.parameters['显示-双倍掉落物品'] || "true");
DrillUp.m_attr_party5_text = String(DrillUp.parameters['用语-双倍掉落物品'] || "");

/*
var parameters = PluginManager.parameters('MiniInformationWindow');
	
var defeatText = parameters['Defeat Text'].split(',');
var paramVocab = [];

for (var i=1;i<=7;i++) {
    var key = 'Param Text' + i;
    paramVocab[i-1] = parameters[key].split(',');
}*/
DrillUp.is_in_window = 0;

////////////////////////////////////////////////////////////////////////////////////

DataManager.preInfoItem = function (item) {
    if (!item) return null;
    if (!item.note) return null;
    if (item._preInfos) return item._preInfos;
    this.makeInfoItem(item);
    return item._preInfos;
};

DataManager.afterInfoItem = function (item) {
    if (!item) return null;
    if (!item.note) return null;
    if (item._afterInfos) return item._afterInfos;
    this.makeInfoItem(item);
    return item._afterInfos;
};

DataManager.makeInfoItem = function (item) {
    item._preInfos = [];
    item._afterInfos = [];
    var texts = item.note.split('\n');
    for (var i = 0, max = texts.length; i < max; i++) {
        if (texts[i].match(/<(?:追加情报窗口|AddInfoWindow|描述)([前后PA]):(.+)>/)) {
            if (RegExp.$1 === '前' || RegExp.$1 === 'P') item._preInfos.push(RegExp.$2);
            if (RegExp.$1 === '后' || RegExp.$1 === 'A') item._afterInfos.push(RegExp.$2);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////

function Window_MiniInfo() {
    this.initialize(...arguments);
}

Window_MiniInfo.prototype = Object.create(Window_Base.prototype);
Window_MiniInfo.prototype.constructor = Window_MiniInfo;

Window_MiniInfo.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._showInfo = DrillUp.m_window_defaultState === "true";
    this.openness = 0;
    this._maxCols = 1;
};
Window_MiniInfo.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = 18;
    this.resetTextColor();
};
Window_MiniInfo.prototype.standardFontSize = function () {
    return 28;
};

Window_MiniInfo.prototype.standardPadding = function () {
    return 6;
};

Window_MiniInfo.prototype.processDrawIcon = function (iconIndex, textState) {
    this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
    textState.x += this.standardFontSize() + 8;
};

Window_MiniInfo.prototype.exRow = function () {
    if (this._item && this._item.name) return 1;
    return 0;
};

Window_MiniInfo.prototype.setItem = function (item, rect, maxCols) {
    this._item = item;
    this._maxCols = maxCols ? maxCols : 1;
    this.makeContents();
    if (!maxCols && this._maxCols === 1 && this._data.length > DrillUp.twoColSize) this._maxCols = 2;
    if (this._data.length > 0 && this._showInfo) {
        this.width = this.calcWidth();
        this.height = this.calcHeight() + 10;
        this.refresh();
        this.updatePosition(rect, rect.padding);
        this.open();
    } else {
        this.close();
    }
};

Window_MiniInfo.prototype.updatePosition = function (rect, padding) {
    this.x = Math.min(Math.max(0, rect.width - this.width) + rect.x, Graphics.boxWidth - this.width);
    this.y = rect.y;
    if ((this.y + this.height) > Graphics.boxHeight) {
        this.y = Math.max(rect.y - this.height - padding - rect.height, 0);
    }
    if (DrillUp.is_in_window === 1) {
        if (DrillUp.m_window_item_offset_fix === "true") {
            this.x = DrillUp.m_window_item_offsetX;
            this.y = DrillUp.m_window_item_offsetY;
        } else {
            this.x += DrillUp.m_window_item_offsetX;
            this.y += DrillUp.m_window_item_offsetY;
        }
    } else if (DrillUp.is_in_window === 2) {
        if (DrillUp.m_window_skill_offset_fix === "true") {
            this.x = DrillUp.m_window_skill_offsetX;
            this.y = DrillUp.m_window_skill_offsetY;
        } else {
            this.x += DrillUp.m_window_skill_offsetX;
            this.y += DrillUp.m_window_skill_offsetY;
        }
    } else if (DrillUp.is_in_window === 3) {
        if (DrillUp.m_window_equip_offset_fix === "true") {
            this.x = DrillUp.m_window_equip_offsetX;
            this.y = DrillUp.m_window_equip_offsetY;
        } else {
            this.x += DrillUp.m_window_equip_offsetX;
            this.y += DrillUp.m_window_equip_offsetY;
        }
    } else if (DrillUp.is_in_window === 4) {
        if (DrillUp.m_window_shop_offset_fix === "true") {
            this.x = DrillUp.m_window_shop_offsetX;
            this.y = DrillUp.m_window_shop_offsetY;
        } else {
            this.x += DrillUp.m_window_shop_offsetX;
            this.y += DrillUp.m_window_shop_offsetY;
        }
    } else if (DrillUp.is_in_window === 5) {
        if (DrillUp.m_window_battle_offset_fix === "true") {
            this.x = DrillUp.m_window_battle_offsetX;
            this.y = DrillUp.m_window_battle_offsetY;
        } else {
            this.x += DrillUp.m_window_battle_offsetX;
            this.y += DrillUp.m_window_battle_offsetY;
        }
    } else if (DrillUp.is_in_window === 6) {
        if (DrillUp.m_window_FTKR_offset_fix === "true") {
            this.x = DrillUp.m_window_FTKR_offsetX;
            this.y = DrillUp.m_window_FTKR_offsetY;
        } else {
            this.x += DrillUp.m_window_FTKR_offsetX;
            this.y += DrillUp.m_window_FTKR_offsetY;
        }
    }

};

Window_MiniInfo.prototype.makeContents = function () {
    var item = this._item;
    this._data = [];
    var c = '\\C[' + DrillUp.text_color_base + ']';
    var s = '\\C[' + DrillUp.text_color_sys + ']';
    var g = '\\C[' + DrillUp.text_color_up + ']';
    var r = '\\C[' + DrillUp.text_color_down + ']';
    var text = '';
    var preInfos = DataManager.preInfoItem(item);
    var afterInfos = DataManager.afterInfoItem(item);
    if (preInfos) this._data = this._data.concat(preInfos);
    if (item.effects) {
        for (var i = 0, max = item.effects.length; i < max; i++) {
            var e = item.effects[i];
            // var value = e.value;
            text = '';
            switch (e.code) {
                case 11:
                    if (DrillUp.m_effect_recoverHP_visible === "true") {
                        text = s + DrillUp.m_effect_recoverHP_text + ':';
                        if (e.value1 > 0 && e.value2 > 0) {
                            text += g + e.value1 * 100 + '%' + "+" + e.value2;
                        } else if (e.value1 > 0 && e.value2 == 0) {
                            text += g + e.value1 * 100 + '%';
                        } else if (e.value2 > 0 && e.value1 == 0) {
                            text += g + e.value2;
                        } else {
                            text += c + e.value1 * 100 + '%' + "+" + e.value2;
                        }
                    };
                    if (DrillUp.m_effect_lostHP_visible === "true") {
                        if (e.value1 < 0 && e.value2 < 0) {
                            text = s + DrillUp.m_effect_lostHP_text + ':';
                            text += r + Math.abs(e.value1 * 100) + '%' + "+" + Math.abs(e.value2);
                        } else if (e.value1 < 0 && e.value2 == 0) {
                            text = s + DrillUp.m_effect_lostHP_text + ':';
                            text += r + Math.abs(e.value1 * 100) + '%';
                        } else if (e.value2 < 0 && e.value1 == 0) {
                            text = s + DrillUp.m_effect_lostHP_text + ':';
                            text += r + Math.abs(e.value2);
                        }
                    };
                    break;
                case 12:
                    if (DrillUp.m_effect_recoverMP_visible === "true") {
                        text = s + DrillUp.m_effect_recoverMP_text + ':';
                        if (e.value1 > 0 && e.value2 > 0) {
                            text += g + e.value1 * 100 + '%' + "+" + e.value2;
                        } else if (e.value1 > 0 && e.value2 == 0) {
                            text += g + e.value1 * 100 + '%';
                        } else if (e.value2 > 0 && e.value1 == 0) {
                            text += g + e.value2;
                        } else {
                            text += c + e.value1 * 100 + '%' + "+" + e.value2;
                        }
                    }
                    if (DrillUp.m_effect_lostMP_visible === "true") {
                        if (e.value1 < 0 && e.value2 < 0) {
                            text = s + DrillUp.m_effect_lostMP_text + ':';
                            text += r + Math.abs(e.value1 * 100) + '%' + "+" + Math.abs(e.value2);
                        } else if (e.value1 < 0 && e.value2 == 0) {
                            text = s + DrillUp.m_effect_lostMP_text + ':';
                            text += r + Math.abs(e.value1 * 100) + '%';
                        } else if (e.value2 < 0 && e.value1 == 0) {
                            text = s + DrillUp.m_effect_lostMP_text + ':';
                            text += r + Math.abs(e.value2);
                        }
                    }
                    break;
                case 13:
                    if (DrillUp.m_effect_recoverTP_visible === "true" && e.value1 < 0) {
                        text = s + DrillUp.m_effect_recoverTP_text + ':';
                        text += g + e.value1 * 100 + "+" + e.value1;
                    }
                    if (DrillUp.m_effect_lostTP_visible === "true" && e.value1 < 0) {
                        text = s + DrillUp.m_effect_lostTP_text + ':';
                        text += r + Math.abs(e.value1 * 100) + "+" + Math.abs(e.value1);
                    }
                    break;
                case 21:
                    if (DrillUp.m_effect_addState_visible === "true") {
                        var state = $dataStates[e.dataId];
                        if (state) {
                            var name = state.name;
                            if (e.value1 > 0) text = s + DrillUp.m_effect_addState_text + ':' + c + name + ' ' + Math.abs(e.value1 * 100) + '%';
                        }
                    }
                    break;
                case 22:
                    if (DrillUp.m_effect_removeState_visible === "true") {
                        var state = $dataStates[e.dataId];
                        if (state) {
                            var name = state.name;
                            if (e.value1 > 0) text = s + DrillUp.m_effect_removeState_text + ':' + c + name + ' ' + Math.abs(e.value1 * 100) + '%';
                        }
                        break;
                    }
                case 31:
                    if (DrillUp.m_effect_upParam_visible === "true") {
                        var name = TextManager.param(e.dataId);
                        if (e.value1 > 0) text = s + DrillUp.m_effect_upParam_text + ':' + c + name + ' ' + e.value1 + DrillUp.turnText;
                    }
                    break;
                case 32:
                    if (DrillUp.m_effect_downParam_visible === "true") {
                        var name = TextManager.param(e.dataId);
                        if (e.value1 > 0) text = s + DrillUp.m_effect_downParam_text + ':' + c + name + ' ' + e.value1 + DrillUp.turnText;
                    }
                    break;
                case 33:
                    if (DrillUp.m_effect_remove_upParam_visible === "true") {
                        var name = TextManager.param(e.dataId);
                        text = s + DrillUp.m_effect_remove_upParam_text + ':' + c + name;
                    }
                    break;
                case 34:
                    if (DrillUp.m_effect_remove_downParam_visible === "true") {
                        var name = TextManager.param(e.dataId);
                        text = s + DrillUp.m_effect_remove_downParam_text + ':' + c + name;
                    }
                    break;
                case 41:
                    if (DrillUp.m_effect_special_visible === "true") {
                        text = s + DrillUp.m_effect_special_text + ':' + c + DrillUp.escapeText;
                    }
                    break;
                case 42:
                    if (DrillUp.m_effect_grow_visible === "true") {
                        var name = TextManager.param(e.dataId);
                        text = s + DrillUp.m_effect_grow_text + ':' + c + name + '+' + e.value1;
                    }
                    break;
                case 43:
                    if (DrillUp.m_effect_learnSkill_visible === "true") {
                        var name = $dataSkills[e.dataId].name;
                        if (name) text = s + DrillUp.m_effect_learnSkill_text + ':' + c + name;
                    }
                    break;
                case 44:
                    if (DrillUp.m_effect_commonEvent_visible === "true") {
                        var name = $dataCommonEvents[e.dataId].name;
                        if (name) text = s + DrillUp.m_effect_commonEvent_text + ':' + c + name;
                    }
                    break;
            }
            if (text) this._data.push(text);
        }
    }
    if (item.params) {
        for (var i = 0; i < 8; i++) {
            var value = item.params[i];
            if (value !== 0) {
                var ud = value > 0 ? g : r;
                var sym = value > 0 ? '+' : '';
                this._data.push(s + TextManager.param(i) + ud + sym + value);
            }
        }
    }
    if (item.traits) {
        for (var i = 0, max = item.traits.length; i < max; i++) {
            var trait = item.traits[i];
            //var vocab = paramVocab;
            var dataId = trait.dataId;
            var value = trait.value;
            var ud = value >= 1.0 ? g : r;
            var du = value < 1.0 ? g : r;
            var sym = value > 0 ? '+' : '';
            //针对抵抗几率反向显示
            var tm = value < 1.0 ? ' +' : ' -';
            var mt = value > 1.0 ? ' +' : ' -';
            //针对命中率
            var mud = value > 0 ? g : r;
            var msym = value > 0 ? ' +' : ' ';
            //TAGOST，修改百分比显示字符串，替换所有Math.floor(value * 100)
            var is100Plus = Math.abs(value < 0 || value == 1 ? value * 1000 / 10 : (1000 - value * 1000) / 10);
            text = '';
            switch (trait.code) {
                case 111:
                case 11:
                    if (DrillUp.m_attr_element_visible === "true") {
                        var ele = $dataSystem.elements[dataId];
                        text = c + ele + s + DrillUp.m_attr_element_text + du + tm + is100Plus + '%';
                    }
                    break;
                case 112:
                case 12:
                    if (DrillUp.m_attr_weak_visible === "true") {
                        var param = TextManager.param(dataId);
                        text = c + param + s + DrillUp.m_attr_weak_text + du + sym + is100Plus + '%';
                    }
                    break;
                case 113:
                case 13:
                    if (DrillUp.m_attr_state_visible === "true") {
                        var state = $dataStates[dataId].name;
                        text = c + state + s + DrillUp.m_attr_state_text + du + tm + is100Plus + '%';
                    }
                    break;
                case 114:
                case 14:
                    if (DrillUp.m_attr_immune_visible === "true") {
                        var state = $dataStates[dataId].name;
                        text = c + state + s + DrillUp.m_attr_immune_text;
                    }
                    break;
                case 121:
                case 21:
                    if (value !== 1.0) {//DrillUp.m_attr_common_visible === "true" &&
                        var param = TextManager.param(dataId);
                        sym = mt;
                        text = s + param + ud + sym + is100Plus + '%';
                    }
                    break;
                case 122:
                case 22:	//追加能力值
                    if (DrillUp.m_attr_add0_visible === "true" && dataId === 0 && value !== 0) {
                        text = s + DrillUp.m_attr_add0_text + du + sym + value * 100 + '%';
                    }
                    if (DrillUp.m_attr_add1_visible === "true" && dataId === 1 && value !== 0) {
                        text = s + DrillUp.m_attr_add1_text + du + sym + value * 100 + '%';
                    }
                    if (DrillUp.m_attr_add2_visible === "true" && dataId === 2 && value !== 0) {
                        text = s + DrillUp.m_attr_add2_text + du + sym + value * 100 + '%';
                    }
                    if (DrillUp.m_attr_add3_visible === "true" && dataId === 3 && value !== 0) {
                        text = s + DrillUp.m_attr_add3_text + du + sym + value * 100 + '%';
                    }
                    if (DrillUp.m_attr_add4_visible === "true" && dataId === 4 && value !== 0) {
                        text = s + DrillUp.m_attr_add4_text + du + sym + value * 100 + '%';
                    }
                    if (DrillUp.m_attr_add5_visible === "true" && dataId === 5 && value !== 0) {
                        text = s + DrillUp.m_attr_add5_text + du + sym + value * 100 + '%';
                    }
                    if (DrillUp.m_attr_add6_visible === "true" && dataId === 6 && value !== 0) {
                        text = s + DrillUp.m_attr_add6_text + du + sym + value * 100 + '%';
                    }
                    if (DrillUp.m_attr_add7_visible === "true" && dataId === 7 && value !== 0) {
                        text = s + DrillUp.m_attr_add7_text + du + sym + value * 100 + '%';
                    }
                    if (DrillUp.m_attr_add8_visible === "true" && dataId === 8 && value !== 0) {
                        text = s + DrillUp.m_attr_add8_text + du + sym + value * 100 + '%';
                    }
                    if (DrillUp.m_attr_add9_visible === "true" && dataId === 9 && value !== 0) {
                        text = s + DrillUp.m_attr_add9_text + du + sym + value * 100 + '%';
                    }
                    break;
                case 123:
                case 23:	//特殊能力值
                    if (DrillUp.m_attr_ext0_visible === "true" && dataId === 0 && value !== 0) {
                        text = s + DrillUp.m_attr_ext0_text + c + sym + is100Plus + '%';
                    }
                    if (DrillUp.m_attr_ext1_visible === "true" && dataId === 1 && value !== 0) {
                        text = s + DrillUp.m_attr_ext1_text + ud + sym + is100Plus + '%';
                    }
                    if (DrillUp.m_attr_ext2_visible === "true" && dataId === 2 && value !== 0) {
                        text = s + DrillUp.m_attr_ext2_text + ud + sym + is100Plus + '%';
                    }
                    if (DrillUp.m_attr_ext3_visible === "true" && dataId === 3 && value !== 0) {
                        text = s + DrillUp.m_attr_ext3_text + ud + sym + is100Plus + '%';
                    }
                    if (DrillUp.m_attr_ext4_visible === "true" && dataId === 4 && value !== 0) {
                        text = s + DrillUp.m_attr_ext4_text + du + sym + is100Plus + '%';
                    }
                    if (DrillUp.m_attr_ext5_visible === "true" && dataId === 5 && value !== 0) {
                        text = s + DrillUp.m_attr_ext5_text + ud + sym + is100Plus + '%';
                    }
                    if (DrillUp.m_attr_ext6_visible === "true" && dataId === 6 && value !== 0) {
                        text = s + DrillUp.m_attr_ext6_text + du + sym + is100Plus + '%';
                    }
                    if (DrillUp.m_attr_ext7_visible === "true" && dataId === 7 && value !== 0) {
                        text = s + DrillUp.m_attr_ext7_text + du + sym + is100Plus + '%';
                    }
                    if (DrillUp.m_attr_ext8_visible === "true" && dataId === 8 && value !== 0) {
                        text = s + DrillUp.m_attr_ext8_text + du + sym + is100Plus + '%';
                    }
                    if (DrillUp.m_attr_ext9_visible === "true" && dataId === 9 && value !== 0) {
                        text = s + DrillUp.m_attr_ext9_text + ud + sym + is100Plus + '%';
                    }
                    break;
                case 31:
                    if (DrillUp.m_attr_atk0_visible === "true") {
                        var ele = $dataSystem.elements[dataId];
                        text = s + DrillUp.m_attr_atk0_text + c + ele;
                    }
                    break;
                case 32:
                    if (DrillUp.m_attr_atk1_visible === "true" && value > 0) {
                        var state = $dataStates[dataId].name;
                        text = s + DrillUp.m_attr_atk1_text + c + state + ' ' + Math.floor(value * 100) + '%';
                    }
                    break;
                case 33:
                    if (DrillUp.m_attr_atk2_visible === "true" && value !== 0) {
                        text = s + DrillUp.m_attr_atk2_text + ud + sym + value;
                    }
                    break;
                case 34:
                    if (DrillUp.m_attr_atk3_visible === "true" && value !== 0) {
                        var ud = value > 0 ? g : r;
                        text = s + DrillUp.m_attr_atk3_text + ud + sym + value + DrillUp.turnText;
                    }
                    break;
                case 41:
                    var stype = $dataSystem.skillTypes[dataId];
                    if (DrillUp.m_attr_skill0_visible === "true") {
                        text = s + DrillUp.m_attr_skill0_text + c + stype;
                    }
                    break;
                case 42:
                    var stype = $dataSystem.skillTypes[dataId];
                    if (DrillUp.m_attr_skill1_visible === "true") {
                        text = s + DrillUp.m_attr_skill1_text + c + stype;
                    }
                    break;
                case 43:
                    if (DrillUp.m_attr_skill2_visible === "true") {
                        text = s + DrillUp.m_attr_skill2_text + c + $dataSkills[dataId].name;
                    }
                    break;
                case 44:
                    if (DrillUp.m_attr_skill3_visible === "true") {
                        text = s + DrillUp.m_attr_skill3_text + c + $dataSkills[dataId].name;
                    }
                    break;
                case 51:
                    var type = $dataSystem.weaponTypes[dataId];
                    if (DrillUp.m_attr_equip0_visible === "true" && type) {
                        text = s + DrillUp.m_attr_equip0_text + c + type;
                    }
                    break;
                case 52:
                    var type = $dataSystem.armorTypes[dataId];
                    if (DrillUp.m_attr_equip1_visible === "true" && type) {
                        text = s + DrillUp.m_attr_equip1_text + c + type;
                    }
                    break;
                case 53:
                    var etype = $dataSystem.equipTypes[dataId];
                    if (DrillUp.m_attr_equip2_visible === "true" && etype) {
                        text = s + DrillUp.m_attr_equip2_text + c + etype;
                    }
                    break;
                case 54:
                    var etype = $dataSystem.equipTypes[dataId];
                    if (DrillUp.m_attr_equip3_visible === "true" && etype) {
                        text = s + DrillUp.m_attr_equip3_text + c + etype;
                    }
                    break;
                case 55:
                    if (DrillUp.m_attr_equip4_visible === "true") {
                        text = s + DrillUp.m_attr_equip4_text;
                    }	//装备槽类型（这里选项没有区分，直接二刀流）
                    break;
                case 61:
                    if (DrillUp.m_attr_move_visible === "true" && value > 0) {
                        text = s + DrillUp.m_attr_move_text + du + sym + (value * 100) + '%';
                    }
                    break;
                case 62:	//特殊标志
                    if (DrillUp.m_attr_tag0_visible === "true" && dataId === 0) {
                        text = s + DrillUp.m_attr_tag0_text;
                    }
                    if (DrillUp.m_attr_tag1_visible === "true" && dataId === 1) {
                        text = s + DrillUp.m_attr_tag1_text;
                    }
                    if (DrillUp.m_attr_tag2_visible === "true" && dataId === 2) {
                        text = s + DrillUp.m_attr_tag2_text;
                    }
                    if (DrillUp.m_attr_tag3_visible === "true" && dataId === 3) {
                        text = s + DrillUp.m_attr_tag3_text;
                    }
                    break;
                case 63:
                    if (DrillUp.m_attr_disappear_visible === "true" && value > 0) {
                        text = s + DrillUp.m_attr_disappear_text[dataId];
                    }
                    break;
                case 64:	//队伍能力
                    if (DrillUp.m_attr_party0_visible === "true" && dataId === 0) {
                        text = s + DrillUp.m_attr_party0_text;
                    }
                    if (DrillUp.m_attr_party1_visible === "true" && dataId === 1) {
                        text = s + DrillUp.m_attr_party1_text;
                    }
                    if (DrillUp.m_attr_party2_visible === "true" && dataId === 2) {
                        text = s + DrillUp.m_attr_party2_text;
                    }
                    if (DrillUp.m_attr_party3_visible === "true" && dataId === 3) {
                        text = s + DrillUp.m_attr_party3_text;
                    }
                    if (DrillUp.m_attr_party4_visible === "true" && dataId === 4) {
                        text = s + DrillUp.m_attr_party4_text;
                    }
                    if (DrillUp.m_attr_party5_visible === "true" && dataId === 5) {
                        text = s + DrillUp.m_attr_party5_text;
                    }
                    break;
                /*
            case 111:	//属性有效度（第二次情况，不明白为什么有两个）
                if (vocab[0][0] && value !== 0) {
                    var ele = $dataSystem.elements[dataId];
                    du = value < 0 ? g : r;
                    text = c + ele + s + vocab[0][0] + du + sym + Math.floor(value * 100) + '%';
                }
                break;
            case 112:
                if (vocab[0][1]  && value !== 0) {
                    var param = TextManager.param(dataId);
                    du = value < 0 ? g : r;
                    text = c + param + s + vocab[0][1] + du + sym + Math.floor(value * 100) + '%';
                }
                break;
            case 113:
                if (vocab[0][0]  && value !== 0) {
                    var state = $dataStates[dataId].name;
                    du = value < 0 ? g : r;
                    text = c + state + s + vocab[0][0] + du + sym + Math.floor(value * 100) + '%';
                }
                break;
            case 121:
                if (value !== 0) {
                    var param = TextManager.param(dataId);
                    text = s + param + ud + sym + value;
                }
                break;
            case 123:
                var sparam = vocab[2][dataId];
                if (sparam && value !== 0) {
                    ud = value > 0 ? g : r;
                    du = value < 0 ? g : r;
                    if (dataId === 0) ud = c;
                    if (dataId === 4) { sparam = TextManager.mpA + sparam; ud = du; }
                    if (dataId === 5) TextManager.tpA + sparam;
                    if (dataId === 6 || dataId === 7 || dataId === 8) ud = du;
                    text = s + sparam + ud + sym + Math.floor(value * 100) + '%';
                }
                break;
                */
            }

            if (text) this._data.push(text);
        }
    }
    //TAGOST，修改套装效果显示
    if (item != null && ((item._cusquip != undefined && item._cusquip._itemId != 0) || item._cusquip_1)) {
        if (this.isequip) {
            if (item._cusquip != undefined && item._cusquip._itemId != 0) {
                if (hascus(this._actor._cusequips, item._cusquip)) {
                    this._data.push(g + item._cusquip.object().name);
                } else {
                    this._data.push(item._cusquip.object().name);
                }
            } else {
                for (var l = 0; l < item._cusquip2.length; l++) {
                    if (item._cusquip2[l]._itemId > 0) {

                        if (hascus(this._actor._cusequips, item._cusquip2[l])) {
                            this._data.push("\\C[24]" + item._cusquip2[l].object().name + g + l + g + '件套:' + g + item._cusquip2[l].object().description);
                        } else {
                            this._data.push("\\C[24]" + item._cusquip2[l].object().name + l + '件套:' + item._cusquip2[l].object().description);
                        }

                    }
                }
            }

        } else {

            if (item._cusquip != undefined && item._cusquip._itemId != 0) {

                this._data.push(item._cusquip.object().name);

            } else {
                var counter = 0;
                var _cusequips = SceneManager._scene._actor._cusequips;
                /*for(var l = 0;l<item._cusquip2.length;l++){
                    
                    //console.log(_cusequips)
                    var ll = ll || 0;
                    if(item._cusquip2[l]._itemId > 0){	
                    
                    if(_cusequips[ll]){
                        //console.log(_cusequips[ll])
                        //console.log(1)
                        //this._data.push("\\C[24]"+item._cusquip2[l].object().name+l+'件套:\n'+item._cusquip2[l].object().description)+'\n';		
                        this._data.push("\\C[24]"+item._cusquip2[l].object().name+l+'件套:');
                        eval(item._cusquip2[l].object().description);
                        var len = this._data.length;
                        for(var k=0;k<len;k++){
                            this._data[k]="\\C[24]"+this._data[k];
                        }
                    }else{
                        //console.log(_cusequips[ll])
                        //console.log(2)
                        //this._data.push("\\C[7]"+item._cusquip2[l].object().name+l+'件套:\n'+item._cusquip2[l].object().description)+'\n';		
                        this._data.push("\\C[7]"+item._cusquip2[l].object().name+l+'件套:');
                        eval(item._cusquip2[l].object().description);
                        var len = this._data.length;
                        for(var k=0;k<len;k++){
                            this._data[k]="\\C[7]"+this._data[k];
                        }
                    }
                    ll++;
                }	
                    }*/
                this._data.push("");
                if (item.cusequipneed) {
                    var actor = SceneManager._scene._actor;
                    var suit = item.cusequipneed;
                    //var suitName;
                    //console.log(suit[0])
                    var itm = suit[0].object();
                    //console.log(itm)
                    for (var kkk = 0; kkk < itm._cusquip2.length; kkk++) {
                        if (itm._cusquip2[kkk]._itemId > 0) {
                            var suitName = itm._cusquip2[kkk].object().name;
                            //console.log(suitName)
                            this._data.push("\\C[20]" + '套装：' + suitName);
                            this._data.push('');
                            break;
                        }
                    }

                    for (var kk = 0; kk < suit.length; kk++) {
                        var n = suit[kk].object().name;
                        if (actor.isEquipped(suit[kk].object())) {
                            counter++;
                            this._data.push("\\C[24]" + n);
                        } else {
                            this._data.push("\\C[7]" + n);
                        }
                    }
                }
                this._data.push("");
                for (var l = 0; l < item._cusquip2.length; l++) {

                    //console.log(_cusequips)
                    var ll = ll || 0;
                    if (item._cusquip2[l]._itemId > 0) {

                        //if(_cusequips[ll]){
                        if (counter >= l) {
                            //console.log(_cusequips[ll])
                            //console.log(1)
                            //this._data.push("\\C[24]"+item._cusquip2[l].object().name+l+'件套:\n'+item._cusquip2[l].object().description)+'\n';		
                            this._data.push("\\C[24]"/*+item._cusquip2[l].object().name*/ + '[' + l + ']' + '件 套装效果:');
                            var params = item._cusquip2[l].object().description.split('#');
                            for (var k = 0; k < params.length; k++) {
                                this._data.push("\\C[14]" + params[k]);
                            }
                        } else {
                            //console.log(_cusequips[ll])
                            //console.log(2)
                            //this._data.push("\\C[7]"+item._cusquip2[l].object().name+l+'件套:\n'+item._cusquip2[l].object().description)+'\n';		
                            this._data.push("\\C[7]"/*+item._cusquip2[l].object().name*/ + '[' + l + ']' + '件 套装效果:');
                            var params = item._cusquip2[l].object().description.split('#');
                            for (var k = 0; k < params.length; k++) {
                                this._data.push("\\C[7]" + params[k]);
                            }
                        }
                        ll++;
                    }
                }

            }
        }
    }
    if (item.data) this._data = this._data.concat(item.data);
    if (afterInfos) this._data = this._data.concat(afterInfos);
};

Window_MiniInfo.prototype.calcWidth = function () {
    var w = 32;
    var ic = 0;
    var nw = 0;
    if (this._item && this._item.name) {
        var name = this._item.name;
        if (this._item.iconIndex) name = '\\I[' + this._item.iconIndex + ']' + name;
        name = name.replace(/\\C\[\d+\]/gi, '');
        name = name.replace(/\\I\[\d+\]/gi, function () {
            ic += 1;
            return '';
        }.bind(this));
        nw = this.textWidth(name) + ic * (this.standardFontSize() + 8);
    }
    for (var i = 0, max = this._data.length; i < max; i++) {
        var text = this._data[i];
        text = text.replace(/\\C\[\d+\]/gi, '');
        text = text.replace(/\\I\[\d+\]/gi, function () {
            ic += 1;
            return '';
        }.bind(this));
        var n = this.textWidth(text) + ic * (this.standardFontSize() + 8);
        if (n > w) w = n;
    }
    w = w * this._maxCols;
    w = nw > w ? nw : w;
    return w + 32;
};

Window_MiniInfo.prototype.calcHeight = function () {
    return (Math.ceil(this._data.length / this._maxCols) + this.exRow()) * (this.standardFontSize() + 2) + this.standardPadding() * 2 + 24;
};

Window_MiniInfo.prototype.refresh = function () {
    this.createContents();
    if (DrillUp.m_window_frame_layout_visible != "true") {
        this.opacity = 0;
    }
    this.contents.clear();
    var fs = this.standardFontSize() + 2;
    var oy = 8;
    if (this.exRow()) {
        oy += 10;
        var name = this._item.name;
        if (this._item.iconIndex) name = '\\I[' + this._item.iconIndex + ']' + name;
        if (DrillUp.m_window_black === "true") {
            this.contents.fillRect(0, 0, this.contentsWidth(), this.contentsHeight(), ColorManager.textColor(15));//背景黑框
        }
        this.drawItemName(this._item, 8, 4);
        //this.drawTextEx(name, 8, 4);
        this.contents.paintOpacity = 128;
        //this.contents.fillRect(4, fs + 12, this.contentsWidth() - 8, 2, this.normalColor());
        this.contents.fillRect(4, fs + 15, this.contentsWidth() - 8, 2, ColorManager.textColor(DrillUp.iter_color));
        this.contents.paintOpacity = 255;
    }
    for (var i = 0, max = this._data.length; i < max; i++) {
        var x = 6 + Math.floor(i / (max / this._maxCols)) * Math.floor(this.contentsWidth() / 2);
        var y = ((i % Math.ceil(max / this._maxCols)) + this.exRow()) * fs + oy;
        this.drawTextEx(this._data[i], x, y);
    }
};

////////////////////////////////////////////////////////////////////////////////////

var __WSelectable_setHelpWindowItem = Window_Selectable.prototype.setHelpWindowItem;
Window_Selectable.prototype.setHelpWindowItem = function (item) {
    __WSelectable_setHelpWindowItem.call(this, item);
    this.setMiniWindow(item);
};

var __WSelectable_deactivate = Window_Selectable.prototype.deactivate;
Window_Selectable.prototype.deactivate = function () {
    __WSelectable_deactivate.call(this);
    if (this._miniInfoWindow) this._miniInfoWindow.close();
};

var __WSelectable_processHandling = Window_Selectable.prototype.processHandling;
Window_Selectable.prototype.processHandling = function () {
    __WSelectable_processHandling.call(this);
    if (this.isOpenAndActive() && this._miniInfoWindow && this.isIwSwitchTriggered()) {
        this._miniInfoWindow._showInfo = !this._miniInfoWindow._showInfo;
        if (this._miniInfoWindow._showInfo) {
            this._miniInfoWindow.open();
        }
        if (!this._miniInfoWindow._showInfo) this._miniInfoWindow.close();
    }
};

Window_Selectable.prototype.isIwSwitchTriggered = function () {
    for (var i = 0, max = DrillUp.switchKey.length; i < max; i++) {
        var key = DrillUp.switchKey[i];
        if (Input.isTriggered(key)) return true;
    }
    return false;
};

Window_Selectable.prototype.setMiniWindow = function (item) {
    if (this._miniInfoWindow) {
        if (this.active && item) {
            var rect = this.itemRect(this.index());
            rect.x = rect.x + this.x;
            rect.y = rect.y + rect.height + this.y + this.standardPadding() + 4;
            rect.padding = this.standardPadding();
            this._miniInfoWindow.setItem(item, rect);
        } else {
            this._miniInfoWindow.close();
        }
    }
};
Window_Base.prototype.standardPadding = function () {
    return 18;
};
////////////////////////////////////////////////////////////////////////////////////


Scene_Base.prototype.createMiniWindow = function () {
    const rect = this.MiniInfoWindow();
    this._miniWindow = new Window_MiniInfo(rect);
    if (this._buyWindow) this._buyWindow._miniInfoWindow = this._miniWindow;
    if (this._sellWindow) this._sellWindow._miniInfoWindow = this._miniWindow;
    if (this._slotWindow) this._slotWindow._miniInfoWindow = this._miniWindow;
    if (this._itemWindow) this._itemWindow._miniInfoWindow = this._miniWindow;
    if (this._skillWindow) this._skillWindow._miniInfoWindow = this._miniWindow;
    this.addChild(this._miniWindow);
};
Scene_Base.prototype.MiniInfoWindow = function () {
    const ww = 32;
    const wh = 32;
    const wx = 0;
    const wy = 0;
    return new Rectangle(wx, wy, ww, wh);
}
////////////////////////////////////////////////////////////////////////////////////

var __SItem_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function () {
    __SItem_create.call(this);
    if (DrillUp.useSceneItem) this.createMiniWindow();
    DrillUp.is_in_window = 1;
};

////////////////////////////////////////////////////////////////////////////////////

var __SSkill_create = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function () {
    __SSkill_create.call(this);
    if (DrillUp.useSceneSkill) this.createMiniWindow();
    DrillUp.is_in_window = 2;
};

////////////////////////////////////////////////////////////////////////////////////

var __SEquip_create = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function () {
    __SEquip_create.call(this);
    if (DrillUp.useSceneEquip) this.createMiniWindow();
    DrillUp.is_in_window = 3;
};

////////////////////////////////////////////////////////////////////////////////////

var __SShop_create = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function () {
    __SShop_create.call(this);
    if (DrillUp.useSceneShop) this.createMiniWindow();
    DrillUp.is_in_window = 4;
};

////////////////////////////////////////////////////////////////////////////////////

var __SBattle_create = Scene_Battle.prototype.create;
Scene_Battle.prototype.create = function () {
    __SBattle_create.call(this);
    if (DrillUp.useSceneBattle) this.createMiniWindow();
    DrillUp.is_in_window = 5;
};
