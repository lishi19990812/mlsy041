//=============================================================================
// RPG Maker MZ - 琉璃岛主菜单
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<琉璃岛主菜单>
 * @author FlyCat
 * 
 * @param pictureAnchor
 * @text 立绘锚点
 * @desc 立绘锚点
 * @type string
 * @default 1
 * @desc 0为左上角，0.5为中，1为右下脚
 *
 * @param pictureX
 * @text 立绘X
 * @desc 立绘X
 * @type number
 * @default 1270
 * @desc 锚点为0时780,
 * 为1时1270
 *
 * @param pictureY
 * @text 立绘Y
 * @desc 立绘Y
 * @type number
 * @default 720
 * @desc 锚点为0时46
 * 为1时720
 * 
 * @param sceneMenuPicture
 * @text 主菜单初始默认立绘
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param sceneMapPicture
 * @text 地图初始默认立绘
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param smSwitchId
 * @text 私密日记开启系统开关设置
 * @desc 私密日记开启系统开关设置
 * @type switch
 * 
 * @param sceneMenuBackPicture
 * @text 堕落值一阶段立绘背景
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param sceneMenuBackPicture_1
 * @text 堕落值二阶段立绘背景
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param sceneMenuBackPicture_2
 * @text 堕落值三阶段立绘背景
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * 
 * @param kzSwitch
 * @text 人物控制状态开关
 * @desc 人物控制状态开关
 * @type switch
 * 
 * @param fqSwitch
 * @text 人物发情状态开关
 * @desc 人物发情状态开关
 * @type switch
 * 
 * @param bzSwitch
 * @text 人物白浊状态开关
 * @desc 人物白浊状态开关
 * @type switch
 * 
 * 
 * @param peopleStateZd
 * @text 人物控制立绘遮罩
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * 
 * @param peopleStateBz
 * @text 人物白浊立绘遮罩
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param peopleStateFq
 * @text 人物发情立绘遮罩
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param zxQuest
 * @text 主线任务设置
 * @desc 主线任务设置
 * @type note[]
 * 
 * @param goldItem
 * @text 灵石物品
 * @desc 灵石对应的物品
 * @type item
 * 
 * @param yearVariable
 * @text 年份变量
 * @desc 年份变量
 * @type variable
 * 
 * @param monthVariable
 * @text 月份变量
 * @desc 月份变量
 * @type variable
 * 
 * @param corruptValue
 * @text 堕落值变量选择
 * @desc 堕落值对应的系统变量
 * @type variable
 * 
 * @param dlSwitchId_1
 * @text 堕落值阶段1开关选择
 * @desc 堕落值阶段1开关选择
 * @type switch
 * 
 * @param dlSwitchId_2
 * @text 堕落值阶段2开关选择
 * @desc 堕落值阶段2开关选择
 * @type switch
 * 
 * @param pregnancyValue
 * @text 孕值变量选择
 * @desc 孕值变量对应的系统变量
 * @type variable
 * 
 * @param sexValue
 * @text 魅力值变量选择
 * @desc 魅力值变量对应的系统变量
 * @type variable
 * 
 * @param vitValue
 * @text 体力值变量选择
 * @desc 体力值变量对应的系统变量
 * @type variable
 * 
 * @param xmValue
 * @text 心魔值变量选择
 * @desc 心魔值变量对应的系统变量
 * @type variable
 * 
 * @command setZxQuest
 * @text 显示主线任务Id
 * @desc 显示主线任务Id
 *
 * @arg id
 * @type number
 * @min 1
 * @text 显示当前主线任务Id
 * @desc 任务Id从1开始
 * 
 * @command removeZxQuest
 * @text 清空主线任务
 * @desc 清空主线任务
 * 
 * @command setYear
 * @text 设置年份
 * @desc 设置年份
 * 
 * @arg year
 * @type number
 * @default 0
 * @text 年份
 * @desc 年份
 * 
 * @arg variablesId
 * @type variable
 * @default 0
 * @text 指定回传年份变量Id
 * @desc 用于变量判断年份
 * 
 * @command setMonth
 * @text 设置月份
 * @desc 设置月份
 * 
 * @arg month
 * @type number
 * @default 1
 * @min 1
 * @text 月份
 * @desc 月份
 * 
 * @arg variablesId
 * @type variable
 * @default 0
 * @text 指定回传月份变量Id
 * @desc 用于变量判断月份
 * 
 * @command setWeather
 * @text 设置天气
 * @desc 设置天气
 * 
 * @arg weather
 * @type string
 * @default 晴朗
 * @text 天气
 * @desc 天气
 * 
 * @arg variablesId
 * @type variable
 * @default 0
 * @text 指定回传天气变量Id
 * @desc 用于变量判断天气
 * 
 * @command setTearPeople
 * @text 设置破处者
 * @desc 设置破处者
 *
 * @arg name
 * @type string
 * @text 破处者姓名
 * @desc 破处者姓名
 * 
 * @arg variablesId
 * @type variable
 * @text 指定回传破处者姓名的变量
 * @desc 指定回传破处者姓名的变量
 * 
 * @command setActorPicture
 * @text 设置角色菜单立绘
 * @desc 设置角色菜单立绘
 * 
 * @arg picture
 * @text 选择角色图片
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @command resetActorPicture
 * @text 复原角色菜单立绘
 * @desc 复原角色菜单立绘
 * 
 * @param levelName
 * @text 称谓设置
 * @type struct<levelname>[]
 * @default 
 * 
 * @command setRemark
 * @text 设置风评
 * @desc 设置风评
 *
 * @arg text
 * @type string
 * @text 风评文字
 * @desc 风评文字
 * 
 * @arg variablesId
 * @type variable
 * @text 指定回传风评文字的变量
 * @desc 指定回传风评文字的变量
 * 
 * @command setReputation
 * @text 设置声望
 * @desc 设置声望
 *
 * @arg text
 * @type string
 * @text 声望文字
 * @desc 声望文字
 *
 * @arg variablesId
 * @type variable
 * @text 指定回传声望文字的变量
 * @desc 指定回传声望文字的变量
 * 
 * @help
 * 2021.4.14 
 * 新增时装耐久度脚本：
 * 获取当前时装耐久：$gameParty.gainDurability()
 * 修改当前时装耐久：$gameParty.setDurability(x) x为增减数值
 * 改版：<菜单立绘换装:X> X为衣服图片名称不要带数字
 * 范例：<菜单立绘换装:主菜单人物立绘肚兜>
 * 图片名字必须改成 主菜单人物立绘肚兜1 主菜单人物立绘肚兜2 主菜单人物立绘肚兜3
 * 2021.2.22
 * 1.宠物在装备页面只显示驭灵环
 * 2.兼容小窗口插件
 * 3.宠物模式下，装备列表最大值为1
 * 4.解决清空装备时造成的物品列表不显示
 * ==============================使用说明================================
 * 在img文件夹下新建menu文件，所有立绘需要放到这里
 * 在插件设置内设置初始菜单角色立绘
 * 在插件设置内设置灵石所对应的物品
 * 在插件设置内设置堕落值对应的系统变量
 * 在插件设置内设置孕值对应的系统变量
 * 在插件设置内设置获得称谓等级和称谓加成的属性
 * 人物状态变量数值：1-4 对应 中毒 正字 白浊 发情 四个阶段
 * ==============================物品备注================================
 * 在防具备注中写如下指令：
 * <行走图换装:文件名,对应的行走图序号> 
 * 注意：如果使用的是多图的行走图 需要自行指定行走图图号，默认为0-7
 * <行走图换装:文件名>
 * 注意：大图行走图可以直接文件名即可
 * <菜单立绘换装:文件名>
 * 注意：行走图文件放置img/characters/下
 * <战斗立绘换装:文件名>
 * 注意：图片名字必须按照以下格式
 * 范例：<战斗立绘换装:肚兜>
 * 待机图片：战斗肚兜1.png 战斗肚兜2.png 战斗肚兜3.png
 * 攻击图片：鞭子肚兜1.png 鞭子肚兜2.png 鞭子肚兜3.png
 * 施法图片：施法肚兜1.png 施法肚兜2.png 施法肚兜3.png
 * 被打图片：被打肚兜1.png 被打肚兜2.png 被打肚兜3.png
 * 状态类图片在各个插件内设置
 * ==============================插件命令================================
 * 设置年份：直接指定年份  可选择将数值返回到指定系统变量
 * 设置月份：直接指定月份  可选择将数值返回到指定系统变量
 * 设置天气：直接指定天气  可选择将数值返回到指定系统变量
 * 设置破处者：直接指定破处者  可选择将数值返回到指定系统变量
 * 设置角色菜单立绘：直接指定角色菜单立绘连同地图立绘一起变化
 * 复原角色菜单立绘：将角色菜单立绘变为初始设置立绘
 * 设置声望
 * 设置风评
 * 设置显示主线任务Id
 * 清空当前主线任务（类似于完成）
 * 主线任务可使用\C[X]\I[X]回车及换行
 * 主线任务不存在多线程，如果有多项提示，请按照顺序写好依次调用
 * =====================================================================
 */
/*~struct~levelname:
@param level
@text 获得等级
@type number
@min 1

@param name
@text 名称
@type text

@param atk
@text 提升攻击
@type number

@param def
@text 提升防御
@type number

@param mat
@text 提升魔法攻击
@type number

@param mdf
@text 提升魔法防御
@type number

@param luk
@text 提升幸运
@type number

@param agi
@text 提升速度
@type number
*/
'use strict';
var Imported = Imported || {};
Imported.FlyCat_LL_SceneMenu = true;

var FlyCat = FlyCat || {};
FlyCat.LL_SceneMenu = {};
FlyCat.LL_SceneMenu.parameters = PluginManager.parameters('FlyCat_LL_SceneMenu');
FlyCat.LL_SceneMenu.levelNames = JSON.parse(FlyCat.LL_SceneMenu.parameters['levelName'] || '[]');
FlyCat.LL_SceneMenu.sceneMapPicture = String(FlyCat.LL_SceneMenu.parameters['sceneMapPicture']);
FlyCat.LL_SceneMenu.sceneMenuPicture = String(FlyCat.LL_SceneMenu.parameters['sceneMenuPicture']);
FlyCat.LL_SceneMenu.sceneMenuBackPicture = String(FlyCat.LL_SceneMenu.parameters['sceneMenuBackPicture']);
FlyCat.LL_SceneMenu.sceneMenuBackPicture_1 = String(FlyCat.LL_SceneMenu.parameters['sceneMenuBackPicture_1']);
FlyCat.LL_SceneMenu.sceneMenuBackPicture_2 = String(FlyCat.LL_SceneMenu.parameters['sceneMenuBackPicture_2']);
FlyCat.LL_SceneMenu.peopleStateZd = String(FlyCat.LL_SceneMenu.parameters['peopleStateZd']);
//FlyCat.LL_SceneMenu.peopleStateZz = String(FlyCat.LL_SceneMenu.parameters['peopleStateZz']);
FlyCat.LL_SceneMenu.peopleStateBz = String(FlyCat.LL_SceneMenu.parameters['peopleStateBz']);
FlyCat.LL_SceneMenu.peopleStateFq = String(FlyCat.LL_SceneMenu.parameters['peopleStateFq']);
FlyCat.LL_SceneMenu.kzSwitch = Number(FlyCat.LL_SceneMenu.parameters['kzSwitch']);
FlyCat.LL_SceneMenu.fqSwitch = Number(FlyCat.LL_SceneMenu.parameters['fqSwitch']);
FlyCat.LL_SceneMenu.bzSwitch = Number(FlyCat.LL_SceneMenu.parameters['bzSwitch']);
FlyCat.LL_SceneMenu.goldItem = Number(FlyCat.LL_SceneMenu.parameters['goldItem']);
FlyCat.LL_SceneMenu.corruptValue = Number(FlyCat.LL_SceneMenu.parameters['corruptValue']);
FlyCat.LL_SceneMenu.pregnancyValue = Number(FlyCat.LL_SceneMenu.parameters['pregnancyValue']);
FlyCat.LL_SceneMenu.yearVariable = Number(FlyCat.LL_SceneMenu.parameters['yearVariable']);
FlyCat.LL_SceneMenu.monthVariable = Number(FlyCat.LL_SceneMenu.parameters['monthVariable']);
FlyCat.LL_SceneMenu.sexValue = Number(FlyCat.LL_SceneMenu.parameters['sexValue']);
FlyCat.LL_SceneMenu.vitValue = Number(FlyCat.LL_SceneMenu.parameters['vitValue']);
FlyCat.LL_SceneMenu.xmValue = Number(FlyCat.LL_SceneMenu.parameters['xmValue']);
FlyCat.LL_SceneMenu.dlSwitchId_1 = Number(FlyCat.LL_SceneMenu.parameters['dlSwitchId_1']);
FlyCat.LL_SceneMenu.dlSwitchId_2 = Number(FlyCat.LL_SceneMenu.parameters['dlSwitchId_2']);
FlyCat.LL_SceneMenu.smSwitchId = Number(FlyCat.LL_SceneMenu.parameters['smSwitchId']);
//FlyCat.LL_SceneMenu.peopleStateVariable = Number(FlyCat.LL_SceneMenu.parameters['peopleStateVariable']);
FlyCat.LL_SceneMenu.pictureY = Number(FlyCat.LL_SceneMenu.parameters['pictureY'] || 720);
FlyCat.LL_SceneMenu.pictureX = Number(FlyCat.LL_SceneMenu.parameters['pictureX'] || 1270);
FlyCat.LL_SceneMenu.pictureAnchor = Number(FlyCat.LL_SceneMenu.parameters['pictureAnchor'] || 1);
FlyCat.LL_SceneMenu.zxQuest = eval(FlyCat.LL_SceneMenu.parameters['zxQuest']);
if (FlyCat.LL_SceneMenu.levelNames) {
    const max = FlyCat.LL_SceneMenu.levelNames.length;
    for (let i = 0; i < max; i++) {
        FlyCat.LL_SceneMenu.levelNames[i] = JSON.parse(FlyCat.LL_SceneMenu.levelNames[i])
    }
    FlyCat.LL_SceneMenu.levelNames.sort((a, b) => { return b.level - a.level })
};
Scene_GameEnd.prototype.commandToTitle = function () {
    this.fadeOutAll();
    SceneManager.goto(Scene_LL_Title);
    Window_TitleCommand.initCommandPosition();
};
/////////////////////////////获取耐久度///////////////////////////
Game_Party.prototype.gainDurability = function () {
    const actor = $gameParty.allMembers()[0];
    const armorId = Number(actor._equips[1]._itemId);
    return $gameSystem._armorDurability[armorId]
};
Game_Party.prototype.gainItemDurability = function (item) {
    const armorId = Number(item.id);
    return $gameSystem._armorDurability[armorId]
};
Game_Party.prototype.setDurability = function (value) {
    const actor = $gameParty.allMembers()[0];
    const armorId = Number(actor._equips[1]._itemId);
    if ($gameSystem._armorDurability[armorId] != null) {
        $gameSystem._armorDurability[armorId] += value;
        if ($gameSystem._armorDurability[armorId] < 0) $gameSystem._armorDurability[armorId] = 0;
        if ($gameSystem._armorDurability[armorId] > 99) $gameSystem._armorDurability[armorId] = 100;
        const actor = $gameParty.allMembers()[0];
        const armor = $dataArmors[actor._equips[1]._itemId];
        if (armor) {
            $gameParty.changeEquipPicture(armor, actor);
        }
    };
};
/////////////////////////////装备栏修改///////////////////////////
Game_Actor.prototype.optimizeEquipments = function () {
    const maxSlots = this.equipSlots().length;
    this.clearEquipments();
    if (this.actor().meta.宠物立绘) {
        if (this.isEquipChangeOk(7)) {
            this.changeEquip(7, this.bestEquipItem(7));
        }
    }
    else {
        for (let i = 0; i < maxSlots; i++) {
            if (this.isEquipChangeOk(i)) {
                this.changeEquip(i, this.bestEquipItem(i));
            }
        }
    };
};

Scene_Equip.prototype.commandClear = function () {
    SoundManager.playEquip();
    this.actor().clearEquipments();
    this._statusWindow.refresh();
    this._slotWindow.refresh();
    this._itemWindow.refresh();
    this._commandWindow.activate();

};
Window_EquipSlot.prototype.item = function () {
    if (this._actor.actor().meta.宠物立绘) {
        return this.itemAt(7);
    }
    else {
        return this.itemAt(this.index());
    }

};
Window_EquipSlot.prototype.update = function () {
    Window_StatusBase.prototype.update.call(this);
    if (this._itemWindow) {
        if (this._actor.actor().meta.宠物立绘) {
            this._itemWindow.setSlotId(7);
        } else {
            this._itemWindow.setSlotId(this.index());
        }
    }
};
Scene_Equip.prototype.executeEquipChange = function () {
    const actor = this.actor();
    if (actor.actor().meta.宠物立绘) {
        var slotId = 7;
    }
    else {
        var slotId = this._slotWindow.index();
    }
    const item = this._itemWindow.item();
    actor.changeEquip(slotId, item);
};
Window_EquipSlot.prototype.drawItem = function (index, index_1) {
    if (this._actor) {
        const slotName = this.actorSlotName(this._actor, index);
        const item = this.itemAt(index);
        const slotNameWidth = this.slotNameWidth();
        if (index_1 == 1) {
            var index = 0;
        }
        const rect = this.itemLineRect(index);
        const itemWidth = rect.width - slotNameWidth;
        this.changeTextColor(ColorManager.systemColor());
        this.changePaintOpacity(this.isEnabled(index));
        this.drawText(slotName, rect.x, rect.y, slotNameWidth, rect.height);
        this.drawItemName(item, rect.x + slotNameWidth, rect.y, itemWidth);
        this.changePaintOpacity(true);
    }
};
Window_EquipSlot.prototype.maxItems = function () {
    if (this._actor && this._actor.actor().meta.宠物立绘) {
        return 1;
    }
    else {
        return this._actor ? this._actor.equipSlots().length : 0;
    }
};
Window_EquipSlot.prototype.drawAllItems = function () {
    const topIndex = this.topIndex();
    if (this._actor && this._actor.actor().meta.宠物立绘) {
        this.drawItemBackground(0);
        this.drawItem(7, 1);
    }
    else {
        for (let i = 0; i < this.maxVisibleItems(); i++) {
            const index = topIndex + i;
            if (index < this.maxItems()) {
                this.drawItemBackground(index);
                this.drawItem(index);
            }
        }
    }
};
/////////////////////////////PluginManager//////////////////////////
PluginManager.registerCommand('FlyCat_LL_SceneMenu', 'setZxQuest', args => {
    $gameSystem._zxQuest = Number(args.id);
});
PluginManager.registerCommand('FlyCat_LL_SceneMenu', 'removeZxQuest', args => {
    $gameSystem._zxQuest = 0;
});
PluginManager.registerCommand('FlyCat_LL_SceneMenu', 'setYear', args => {
    $gameSystem._menuYear = args.year;
    const variablesId = args.variablesId;
    if (variablesId > 0) {
        $gameVariables.setValue(variablesId, args.year)
    }
});
PluginManager.registerCommand('FlyCat_LL_SceneMenu', 'setMonth', args => {
    $gameSystem._menuMonth = args.month;
    const variablesId = args.variablesId;
    if (variablesId > 0) {
        $gameVariables.setValue(variablesId, args.month)
    }
});
PluginManager.registerCommand('FlyCat_LL_SceneMenu', 'setWeather', args => {
    $gameSystem._menuWeather = args.weather;
    const variablesId = args.variablesId;
    if (variablesId > 0) {
        $gameVariables.setValue(variablesId, args.weather)
    }
});
PluginManager.registerCommand('FlyCat_LL_SceneMenu', 'setTearPeople', args => {
    $gameSystem._menuTearPeopleName = args.name;
    const variablesId = args.variablesId;
    if (variablesId > 0) {
        $gameVariables.setValue(variablesId, args.name)
    }
});
PluginManager.registerCommand('FlyCat_LL_SceneMenu', 'setRemark', args => {
    $gameSystem._menuRemarkText = args.text;
    const variablesId = args.variablesId;
    if (variablesId > 0) {
        $gameVariables.setValue(variablesId, args.text)
    }
});
PluginManager.registerCommand('FlyCat_LL_SceneMenu', 'setReputation', args => {
    $gameSystem._menuReputationText = args.text;
    const variablesId = args.variablesId;
    if (variablesId > 0) {
        $gameVariables.setValue(variablesId, args.text)
    }
});
PluginManager.registerCommand('FlyCat_LL_SceneMenu', 'setActorPicture', args => {
    $gameSystem._menuActorPicture = args.picture;
});
PluginManager.registerCommand('FlyCat_LL_SceneMenu', 'resetActorPicture', args => {
    $gameSystem._menuActorPicture = FlyCat.LL_SceneMenu.sceneMenuPicture;
});
/////////////////////称谓检测///////////////////////
Game_System.prototype.LLlevelName = function (level) {
    const levelName = FlyCat.LL_SceneMenu.levelNames;
    const max = levelName.length;
    for (let i = 0; i < max; i++) {
        if (level >= levelName[i].level) {
            return levelName[i].name;
        }
    };
    return String(level);
};
///////////////////称谓检测///////////////////////
Game_System.prototype.LLlevelUpName = function (level) {
    this._nowAddParam = [];
    const levelName = FlyCat.LL_SceneMenu.levelNames;
    const max = levelName.length;
    for (let i = 0; i < max; i++) {
        if (level == levelName[i].level) {
            const param = levelName[i];
            if (!this._lastAddParam) {
                this._lastAddParam = [];
                this._lastAddParam.push(param.atk)
                this._lastAddParam.push(param.def)
                this._lastAddParam.push(param.mat)
                this._lastAddParam.push(param.mdf)
                this._lastAddParam.push(param.luk)
                this._lastAddParam.push(param.agi)
                this._firstAddParam = true;
            }
            this._nowAddParam.push(param.atk)
            this._nowAddParam.push(param.def)
            this._nowAddParam.push(param.mat)
            this._nowAddParam.push(param.mdf)
            this._nowAddParam.push(param.luk)
            this._nowAddParam.push(param.agi)
            if (this._firstAddParam == false) {
                this.addLLParam(0)
            }
            else {
                this.addLLParam(1)
                this._firstAddParam = false;
            }
            break;
        }
    };

};
Game_System.prototype.addLLParam = function (type) {
    const actor = $gameParty.allMembers()[0];
    if (actor) {
        if (type == 1) {
            for (let i = 2; i < 8; i++) {
                const value = this._nowAddParam[i - 2] ? Number(this._nowAddParam[i - 2]) : 0;
                actor.addParam(i, value)
            }
        }
        else {
            for (let i = 2; i < 8; i++) {
                const value = Number(this._nowAddParam[i - 2] ? this._nowAddParam[i - 2] : 0) - Number(this._lastAddParam[i - 2] ? this._lastAddParam[i - 2] : 0);
                actor.addParam(i, value ? value : 0)
            }
        }
    }
}
////////////////////称谓属性加成//////////////////////
Game_Actor.prototype.levelUp = function () {
    this._level++;
    for (const learning of this.currentClass().learnings) {
        if (learning.level === this._level) {
            this.learnSkill(learning.skillId);
        }
    }
    $gameSystem.LLlevelUpName(this._level)
};
////////////////////换装//////////////////
FlyCat.LL_SceneMenu.Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function () {
    if (!$gameSystem._armorDurability) {
        $gameSystem._armorDurability = [];
        for (let i = 0; i < $dataArmors.length; i++) {
            if ($dataItems[i] && $dataArmors[i].meta.菜单立绘换装) {
                $gameSystem._armorDurability[i] = 0;
            }
            else {
                $gameSystem._armorDurability[i] = null;
            }
        };
    };
    const actor = $gameParty.allMembers()[0];
    const armor = $dataArmors[actor._equips[1]._itemId];
    if (armor) {
        $gameParty.changeEquipPicture(armor, actor);
    }
    FlyCat.LL_SceneMenu.Scene_Map_createDisplayObjects.call(this)
}
Game_Party.prototype.changeEquipPicture = function (item, actor) {
    const hzItem = item;
    if (hzItem && hzItem.meta.行走图换装) {
        const hzList = hzItem.meta.行走图换装.split(',');
        const value = $gameParty.gainItemDurability(hzItem);
        if (value < 100) {
            if (hzList.length >= 2) {
                const hzImg = hzList[0];
                const hzIndex = hzList[1];
                actor.setCharacterImage(hzImg, hzIndex);
            } else {
                const hzImg = hzList[0];
                actor.setCharacterImage(hzImg, 0);
            }
        } else {
            actor.setCharacterImage('$N-8', 0);
        }
    }
    else {
        actor.setCharacterImage(actor._lastCharacterName, actor._lastCharacterIndex);
    }
    if (hzItem && hzItem.meta.菜单立绘换装) {
        const value = $gameParty.gainItemDurability(hzItem);
        if (value < 30) {
            var id = 1
        }
        else if (value < 70) {
            var id = 2
        }
        else {
            var id = 3;
        }
        if (value >= 100) {
            $gameSystem._menuActorPicture = '';
        }
        else {
            const hzImg = hzItem.meta.菜单立绘换装 + id;
            $gameSystem._menuActorPicture = hzImg;
        };
    }
    else {
        $gameSystem._menuActorPicture = '';
    };
    if (hzItem && hzItem.meta.战斗立绘换装) {
        const hzImg = hzItem.meta.战斗立绘换装;
        $gameSystem._battlePicture = hzImg;
    }
    else {
        $gameSystem._battlePicture = '';
    }
    // if (hzItem && hzItem.meta.对话立绘换装) {
    //     const hzImg = hzItem.meta.对话立绘换装;
    //     $gameSystem._talkPicture = hzImg;
    // }
    // else {
    //     $gameSystem._talkPicture = FlyCat.LL_TalkPicture.talkPicture;
    // }
    if (hzItem && hzItem.meta.地图立绘换装) {
        const value = $gameParty.gainItemDurability(hzItem);
        if (value < 30) {
            var id = 1
        }
        else if (value < 70) {
            var id = 2
        }
        else {
            var id = 3;
        }
        if (value >= 100) {
            $gameSystem._mapActorPicture = '';
        }
        else {
            const dthzImg = hzItem.meta.地图立绘换装 + id;
            $gameSystem._mapActorPicture = dthzImg;
        };
    }
    else {
        $gameSystem._mapActorPicture = '';
    }
    $gamePlayer.refresh();
}

FlyCat.LL_SceneMenu.Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function (slotId, item) {
    if (slotId == 1 && this._actorId == 1) {
        $gameParty.changeEquipPicture(item, this);
    }
    FlyCat.LL_SceneMenu.Game_Actor_changeEquip.call(this, slotId, item)
};
FlyCat.LL_SceneMenu.Game_Party_maxItems = Game_Party.prototype.maxItems;
Game_Party.prototype.maxItems = function (item) {
    if (item && item.meta.物品上限) {
        return Number(item.meta.物品上限)
    }
    else {
        return FlyCat.LL_SceneMenu.Game_Party_maxItems.call(this, item)
    }
};
////////////////////////////Scene//////////////////////////
FlyCat.LL_SceneMenu.Scene_MenuBase_initialize = Scene_Menu.prototype.initialize;
Scene_Menu.prototype.initialize = function () {
    FlyCat.LL_SceneMenu.Scene_MenuBase_initialize.call(this);
    this._breatheCount = 0;
    if (!FlyCat.LL_SceneMenu._lastCharacterName) {
        for (let i = 1; i < $dataActors.length; i++) {
            if ($dataActors[i]) {
                $gameActors.actor(i)._lastCharacterName = $dataActors[i].characterName;
                $gameActors.actor(i)._lastCharacterIndex = $dataActors[i].characterIndex;
            }
        }
        FlyCat.LL_SceneMenu._lastCharacterName = true;
    }
};
Scene_Menu.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createActorsSprite();
    this.createTimeWindow();
    this.createCommandWindow();
    this.createStatusWindow();
    this.createZxQuestWindow();
};
Scene_Menu.prototype.createActorsSprite = function () {
    Scene_MenuBase.prototype.create.call(this);
    const x = FlyCat.LL_SceneMenu.pictureX;
    const y = FlyCat.LL_SceneMenu.pictureY;
    const anchor = FlyCat.LL_SceneMenu.pictureAnchor;
    /*立绘背景*/
    this._actorMenuSpriteBackSprite = new Sprite();
    this.addChild(this._actorMenuSpriteBackSprite)
    var bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_SceneMenu.sceneMenuBackPicture);
    if (FlyCat.LL_SceneMenu.corruptValue) {
        var dl_1 = $gameSwitches.value(FlyCat.LL_SceneMenu.dlSwitchId_1);
        var dl_2 = $gameSwitches.value(FlyCat.LL_SceneMenu.dlSwitchId_2);
        if (dl_1 == true) var bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_SceneMenu.sceneMenuBackPicture_1);
        if (dl_2 == true) var bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_SceneMenu.sceneMenuBackPicture_2);
    }
    this._actorMenuSpriteBackSprite.bitmap = bitmap;
    /*主体立绘*/
    this._actorMenuMainSprite = new Sprite();
    this.addChild(this._actorMenuMainSprite)
    this._actorMenuMainSprite.x = x;
    this._actorMenuMainSprite.y = y;
    this._actorMenuMainSprite.anchor.set(anchor);
    this._actorMenuMainSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_SceneMenu.sceneMenuPicture);
    /*主体状态遮罩*/
    this._actorBzSprite = new Sprite();//白浊
    this.addChild(this._actorBzSprite)
    this._actorBzSprite.x = x;
    this._actorBzSprite.y = y;
    this._actorBzSprite.anchor.set(anchor);
    if ($gameSwitches.value(FlyCat.LL_SceneMenu.bzSwitch)) {
        this._actorBzSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_SceneMenu.peopleStateBz);
    } else {
        this._actorBzSprite.bitmap = '';
    }
    // var bitmap = '';
    // if (peopleStateValue == 1) var bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_SceneMenu.peopleStateZd);
    // if (peopleStateValue == 2) var bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_SceneMenu.peopleStateZz);
    // if (peopleStateValue == 3) var bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_SceneMenu.peopleStateBz);
    // if (peopleStateValue == 4) var bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_SceneMenu.peopleStateFq);
    // this._actorMenuSpriteForSprite.bitmap = bitmap;
    /*衣服*/
    this._actorMenuSprite = new Sprite();
    this.addChild(this._actorMenuSprite)
    if ($gameSystem._menuActorPicture) {
        var img = $gameSystem._menuActorPicture;
    }
    else {
        var img = '';
    }
    this._actorMenuSprite.bitmap = ImageManager.loadBitmap('img/menu/', img)

    this._actorMenuSprite.x = x;
    this._actorMenuSprite.y = y;
    this._actorMenuSprite.anchor.set(anchor);
    this._breatheCount = 0;

    this._actorFqSprite = new Sprite();//发情
    this.addChild(this._actorFqSprite)
    this._actorFqSprite.anchor.set(anchor);
    this._actorFqSprite.x = x;
    this._actorFqSprite.y = y;
    if ($gameSwitches.value(FlyCat.LL_SceneMenu.fqSwitch)) {
        this._actorFqSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_SceneMenu.peopleStateFq);
    } else {
        this._actorFqSprite.bitmap = '';
    }

    this._actorKzSprite = new Sprite();//控制
    this.addChild(this._actorKzSprite)
    this._actorKzSprite.anchor.set(anchor);
    this._actorKzSprite.x = x;
    this._actorKzSprite.y = y;
    if ($gameSwitches.value(FlyCat.LL_SceneMenu.kzSwitch)) {
        this._actorKzSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_SceneMenu.peopleStateZd);
    } else {
        this._actorKzSprite.bitmap = '';
    }

};
FlyCat.LL_SceneMenu.Scene_Menu_update = Scene_Menu.prototype.update;
Scene_Menu.prototype.update = function () {
    FlyCat.LL_SceneMenu.Scene_Menu_update.call(this);
    if (this._actorMenuSprite) {
        this._breatheCount++;
        if (this._breatheCount < 61) {
            this._actorMenuSprite.scale.y += 0.0002;
            this._actorMenuMainSprite.scale.y += 0.0002;
            this._actorBzSprite.scale.y += 0.0002;
            this._actorFqSprite.scale.y += 0.0002;
            this._actorKzSprite.scale.y += 0.0002;
        }
        else if (this._breatheCount > 60 && this._breatheCount <= 120) {
            this._actorMenuSprite.scale.y -= 0.0002;
            this._actorMenuMainSprite.scale.y -= 0.0002;
            this._actorBzSprite.scale.y -= 0.0002;
            this._actorFqSprite.scale.y -= 0.0002;
            this._actorKzSprite.scale.y -= 0.0002;
        }
        else {
            this._breatheCount = 0;
            this._actorMenuSprite.scale.y = 1;
            this._actorMenuMainSprite.scale.y = 1;
            this._actorBzSprite.scale.y = 1;
            this._actorFqSprite.scale.y = 1;
            this._actorKzSprite.scale.y = 1;
        }
    }
};
Scene_Menu.prototype.createCommandWindow = function () {
    const rect = this.commandWindowRect();
    const commandWindow = new Window_MenuCommand(rect);
    commandWindow.setHandler("item", this.commandItem.bind(this));
    commandWindow.setHandler("skill", this.commandPersonal.bind(this));
    commandWindow.setHandler("equip", this.commandPersonal.bind(this));
    commandWindow.setHandler("status", this.commandPersonal.bind(this));
    commandWindow.setHandler("formation", this.commandFormation.bind(this));
    commandWindow.setHandler("options", this.commandOptions.bind(this));
    commandWindow.setHandler("load", this.commandLoad.bind(this));
    commandWindow.setHandler("save", this.commandSave.bind(this));
    commandWindow.setHandler("gameEnd", this.commandGameEnd.bind(this));
    commandWindow.setHandler("sm", this.commandSm.bind(this));
    commandWindow.setHandler("pet", this.commandPet.bind(this));
    commandWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(commandWindow);
    this._commandWindow = commandWindow;
};
Scene_Menu.prototype.commandLoad = function () {
    SceneManager.push(Scene_Load);
};
Scene_Menu.prototype.commandWindowRect = function () {
    const ww = 200;
    const wh = 460;
    const wx = 100;
    const wy = 190;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Menu.prototype.createStatusWindow = function () {
    const rect = this.statusWindowRect();
    this._statusLLWindow = new Window_MenuLLStatus(rect);
    this.addWindow(this._statusLLWindow);
};

Scene_Menu.prototype.statusWindowRect = function () {
    const ww = 600;
    const wh = 400;
    const wx = 300;
    const wy = 250;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_Menu.prototype.createTimeWindow = function () {
    const rect = this.timesWindowRect();
    this._statusWindow = new Window_MenuTime(rect);
    this.addWindow(this._statusWindow);
};

Scene_Menu.prototype.timesWindowRect = function () {
    const ww = 200;
    const wh = 140;
    const wx = 100;
    const wy = 50;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_Menu.prototype.commandPersonal = function () {
    this.onPersonalOk();
};
Scene_Menu.prototype.commandSm = function () {
    if ($gameSwitches.value(FlyCat.LL_SceneMenu.smSwitchId) == false) {
        SceneManager.push(Scene_LL_SM);
    } else {
        SoundManager.playBuzzer();
        this._commandWindow.activate();
    }
};
Scene_Menu.prototype.commandPet = function () {
    SceneManager.push(Scene_LL_Pet);
};
Scene_Menu.prototype.commandHY = function () {
    SceneManager.push(Scene_LL_HY);
};
Scene_Menu.prototype.commandHYBook = function () {
    SceneManager.push(Scene_LL_HyBook);
};
Scene_Menu.prototype.createZxQuestWindow = function () {
    const rect = this.zxQuestsWindowRect();
    this._statusWindow = new Window_ZxQuest(rect);
    this.addWindow(this._statusWindow);
};

Scene_Menu.prototype.zxQuestsWindowRect = function () {
    const ww = 600;
    const wh = 200;
    const wx = 300;
    const wy = 50;
    return new Rectangle(wx, wy, ww, wh);
};
////////////////////////////////////////////////////
Window_ItemList.prototype.drawItemNumber = function (item, x, y, width) {
    if (this.needsNumber()) {
        //   this.drawText(":", x, y, width - this.textWidth("00"), "right");
        this.drawText(":" + $gameParty.numItems(item), x, y, width, "right");
    }
};
/////////////////////主线//////////////////////////

function Window_ZxQuest() {
    this.initialize(...arguments);
}

Window_ZxQuest.prototype = Object.create(Window_Base.prototype);
Window_ZxQuest.prototype.constructor = Window_ZxQuest;

Window_ZxQuest.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.refresh();
};
Window_ZxQuest.prototype.refresh = function () {
    this.contents.clear();
    const id = $gameSystem._zxQuest || 0;
    var x = 0;
    var y = 0;
    const width = this.width;
    const height = this.height;
    this.contents.fontSize = 20;
    if (id > 0) {
        var quest = eval(FlyCat.LL_SceneMenu.zxQuest[id - 1]);
        this.drawTextEx(quest, x, y, width);
    }
    else {
        var quest = '还未领取主线任务！';
        this.drawText(quest, x, y + height / 2 - 24, width, "center");
    }

};
/////////////////////状态窗口//////////////////////

function Window_MenuLLStatus() {
    this.initialize(...arguments);
}

Window_MenuLLStatus.prototype = Object.create(Window_Base.prototype);
Window_MenuLLStatus.prototype.constructor = Window_MenuLLStatus;

Window_MenuLLStatus.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._actor = $gameParty.allMembers()[0]
    this.refresh();
};
Window_MenuLLStatus.prototype.refresh = function () {
    this.contents.clear();
    this.contents.fontSize = 20;
    const actor = this._actor;
    const width = this.width;
    var x = 0;
    var y = -5;
    var textW = this.textWidth('体力值：');
    this.drawText("姓名：" + actor.name(), x, y, width, 'left');
    this.drawText("等级：" + actor.level, x + 155, y, width, "left");
    const llLevelName = $gameSystem.LLlevelName(actor.level);
    this.changeTextColor(ColorManager.textColor(24));
    this.drawText("境界：" + llLevelName, x + 260, y, width, "left");
    y += 28;
    const nowHp = actor.hp;
    const maxHp = actor.mhp;
    this._valueColor = [2, 10, 15];
    this.changeTextColor(ColorManager.textColor(0));
    this.drawText("生命力：", x, y, width, "left");
    this.textFillRect(x, y, textW, nowHp, maxHp, 2)
    y += 30;
    const nowMp = actor.mp;
    const maxMp = actor.mmp;
    this._valueColor = [1, 4, 15];
    this.changeTextColor(ColorManager.textColor(0));
    this.drawText("灵力：", x, y, width, "left");
    this.textFillRect(x, y, textW, nowMp, maxMp, 2)
    y += 30;
    const nowTp = actor.tp;
    const maxTp = 100;
    this._valueColor = [6, 14, 15];
    this.changeTextColor(ColorManager.textColor(0));
    this.drawText("怒气：", x, y, width, "left");
    this.textFillRect(x, y, textW, nowTp, maxTp, 2)
    y += 30;
    this._valueColor = [3, 24, 15];
    const nowExp = actor.currentExp() - actor.currentLevelExp();
    const maxExp = actor.nextLevelExp() - actor.currentLevelExp();
    this.drawText("经验值：", x, y, width, "left");
    this.textFillRect(x, y, textW, nowExp, maxExp, 2)
    y += 40;
    this.contents.fillRect(0, y, width, 3, ColorManager.textColor(1));
    y += 7;
    if (FlyCat.LL_SceneMenu.vitValue) {
        var vitValue = $gameVariables.value(FlyCat.LL_SceneMenu.vitValue);
        if (vitValue < 0) var vitValue = 0;
        if (vitValue > 99) var vitValue = 100;
    }
    else {
        var vitValue = 0;
    }
    this._valueColor = [];
    this._valueColor = [4, 5, 15];
    var textW = this.textWidth('体力值：');
    this.changeTextColor(ColorManager.textColor(this._valueColor[0]));
    this.drawText("体力值：", x, y, width, "left");
    this.textFillRect(x, y, textW, vitValue, 100)

    if (FlyCat.LL_SceneMenu.corruptValue) {
        var corruptValue = $gameVariables.value(FlyCat.LL_SceneMenu.corruptValue);
        var dl_1 = $gameSwitches.value(FlyCat.LL_SceneMenu.dlSwitchId_1);
        var dl_2 = $gameSwitches.value(FlyCat.LL_SceneMenu.dlSwitchId_2);
        if (corruptValue < 0) var corruptValue = 0;
        if (corruptValue >= 99 && dl_1 == false) var corruptValue = 99;
        if (corruptValue >= 500 && dl_2 == false) var corruptValue = 500;
        if (corruptValue >= 1000) var corruptValue = 1000;
    }
    else {
        var corruptValue = 0;
    }
    y += 28;
    this._valueColor = [2, 10, 15];
    this.changeTextColor(ColorManager.textColor(this._valueColor[0]));
    this.drawText("堕落值：", x, y, width, "left");
    this.textFillRect(x, y, textW, corruptValue, 1000, 1)

    if (FlyCat.LL_SceneMenu.xmValue) {
        var xmValue = $gameVariables.value(FlyCat.LL_SceneMenu.xmValue);
        if (xmValue < 0) var xmValue = 0;
        if (xmValue >= 1000) var xmValue = 1000;
    }
    else {
        var xmValue = 0;
    }
    y += 28;
    this._valueColor = [10, 18, 15];
    this.changeTextColor(ColorManager.textColor(this._valueColor[0]));
    this.drawText("心魔值：", x, y, width, "left");
    this.textFillRect(x, y, textW, xmValue, 1000)
    y += 28;
    if (FlyCat.LL_SceneMenu.sexValue) {
        var sexValue = $gameVariables.value(FlyCat.LL_SceneMenu.sexValue);
        if (sexValue < 0) var sexValue = 0;
        if (sexValue >= 1000) var sexValue = 1000;
    }
    else {
        var sexValue = 0;
    }
    this.changeTextColor(ColorManager.textColor(27));
    this.drawText("魅力值：" + sexValue, x, y, width, "left");
    if (FlyCat.LL_SceneMenu.pregnancyValue) {
        var pregnancyValue = $gameVariables.value(FlyCat.LL_SceneMenu.pregnancyValue);
        if (pregnancyValue < 0) var pregnancyValue = 0;
        if (pregnancyValue > 99) var pregnancyValue = 100;
    }
    else {
        var pregnancyValue = 0;
    }
    this.changeTextColor(ColorManager.textColor(17));
    this.drawText("孕值：" + pregnancyValue, x + 140, y, width, "left");
    this.changeTextColor(ColorManager.textColor(0));
    // if (FlyCat.LL_SceneMenu.peopleStateVariable) {
    //     var peopleStateValue = $gameVariables.value(FlyCat.LL_SceneMenu.peopleStateVariable);
    // }
    // else {
    //     var peopleStateValue = 0;
    // }
    if ($gameSwitches.value(FlyCat.LL_SceneMenu.bzSwitch)) {
        var text = '白浊 ';
    } else {
        var text = ' ';
    }
    if ($gameSwitches.value(FlyCat.LL_SceneMenu.fqSwitch)) {
        var text1 = '发情 ';
    } else {
        var text1 = ' ';
    }
    if ($gameSwitches.value(FlyCat.LL_SceneMenu.kzSwitch)) {
        var text2 = '控制 ';
    } else {
        var text2 = ' ';
    }
    // if (peopleStateValue == 1) var text = '中毒';
    // if (peopleStateValue == 2) var text = '正字';
    // if (peopleStateValue == 3) var text = '白浊';
    // if (peopleStateValue == 4) var text = '发情';
    this.drawText("人物状态：" + text + text1 + text2, x + 260, y, width, "left");
    y += 30;
    if (FlyCat.LL_SceneMenu.goldItem) {
        var goldItem = $dataItems[FlyCat.LL_SceneMenu.goldItem]
        var goldItemNumber = $gameParty.numItems(goldItem);
    }
    else {
        var goldItemNumber = 0;
    }
    this.changeTextColor(ColorManager.textColor(12));
    this.drawText("灵石：" + goldItemNumber, x, y, width, "left");
    this.changeTextColor(ColorManager.textColor(0));
    this.changeTextColor(ColorManager.textColor(14));
    this.drawText("金钱：" + $gameParty.gold(), x + 200, y, width, "left");
    y += 30;
    const reputationText = $gameSystem._menuReputationText || "无";
    this.changeTextColor(ColorManager.textColor(3));
    this.drawText("声望：" + reputationText, x, y, width, "left");
    const remarkText = $gameSystem._menuRemarkText || "无";
    this.changeTextColor(ColorManager.textColor(14));
    this.drawText("风评：" + remarkText, x + 200, y, width, "left");
    y += 30;
    this.changeTextColor(ColorManager.textColor(27));
    if ($gameSystem._menuTearPeopleName) {
        var name = $gameSystem._menuTearPeopleName;
    }
    else {
        var name = '未破处';
    }
    this.drawText("破处者：" + name, x, y, width, "left");
    // for (let i = 2; i < 8; i++) {
    //     const paramValue = actor.param(i);
    //     const paramName = TextManager.param(i);
    //     this.drawText(paramName + '：' + paramValue, x + 260, y - 150, width, "left");
    //     y = y + 30;
    // }

};
Window_MenuLLStatus.prototype.textFillRect = function (x, y, textW, value, value1, jd) {
    var text = '';
    var cd = 350;
    if (jd == 1) {
        if (value <= 99) var text = "（一阶）";
        if (value > 99) var text = "（二阶）";
        if (value > 500) var text = "（三阶）";
    };
    if (jd == 2) { var cd = 350; }
    this.contents.fillRect(x + textW, y + 8, cd, 20, ColorManager.textColor(this._valueColor[0]));
    this.contents.fillRect(x + textW, y + 8, value / value1 * cd, 20, ColorManager.textColor(this._valueColor[1]));
    this.changeTextColor(ColorManager.textColor(this._valueColor[2]));
    this.contents.outlineWidth = 0;
    this.drawText(value + text, x + textW, y, cd, 'center')
    this.resetTextColor();
    this.contents.outlineWidth = 3;
};
/////////////////////时间窗口//////////////////////
function Window_MenuTime() {
    this.initialize(...arguments);
}

Window_MenuTime.prototype = Object.create(Window_Base.prototype);
Window_MenuTime.prototype.constructor = Window_MenuTime;

Window_MenuTime.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.refresh();
};
Window_MenuTime.prototype.refresh = function () {
    this.drawTimeText();
};
Window_MenuTime.prototype.drawTimeText = function () {
    this.contents.clear();
    this.contents.fontSize = 18;
    const year = $gameVariables.value(FlyCat.LL_SceneMenu.yearVariable);//$gameSystem._menuYear ? $gameSystem._menuYear : 0;
    const month = $gameVariables.value(FlyCat.LL_SceneMenu.monthVariable)//$gameSystem._menuMonth ? $gameSystem._menuMonth : 1;
    const weather = $gameSystem._menuWeather ? $gameSystem._menuWeather : '无';
    this.drawText("修仙纪元", 0, 0, this.width - 20, 'center');
    this.drawText(year + " 年 " + month + " 月", 0, 36, this.width - 20, 'center');
    this.drawText("季节 : " + weather, 0, 72, this.width - 20, 'center');
};
/////////////////////命令窗口///////////////////////
Window_MenuCommand.prototype.numVisibleRows = function () {
    return 10;
};
Window_MenuCommand.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
Window_MenuCommand.prototype.makeCommandList = function () {
    this.addMainCommands();
    this.addFormationCommand();
    this.addOriginalCommands();
    this.addSaveCommand();
    this.addOptionsCommand();
    this.addGameEndCommand();
};
Window_MenuCommand.prototype.addMainCommands = function () {
    const enabled = this.areMainCommandsEnabled();
    if (this.needsCommand("item")) {
        this.addCommand('空间戒指', "item", enabled);
    }
    if (this.needsCommand("equip")) {
        this.addCommand("装备", "equip", enabled);
    }
    if (this.needsCommand("skill")) {
        this.addCommand("技能玉石", "skill", enabled);
    }
    this.addCommand("任务玉简", '任务', true);
    if (this.needsCommand("status")) {
        this.addCommand(TextManager.status, "status", enabled);
    }
    this.addCommand("灵宠", "pet", true);
    // this.addCommand("炼丹炉", "alchemy", true);
    const smEnabled = !$gameSwitches.value(FlyCat.LL_SceneMenu.smSwitchId);
    this.addCommand("私密日记", "sm", smEnabled);
    // this.addCommand("孕笔记", "hyBook", true);
    // this.addCommand("子嗣阁", "hy", true);
};
Window_MenuCommand.prototype.addSaveCommand = function () {
    if (this.needsCommand("save")) {
        const enabled = this.isSaveEnabled();
        this.addCommand('存档', "save", enabled);
    }
    this.addCommand('读档', "load", true);
};
Window_MenuCommand.prototype.addOptionsCommand = function () {
    if (this.needsCommand("options")) {
        const enabled = this.isOptionsEnabled();
        this.addCommand("系统设置", "options", enabled);
    }
};