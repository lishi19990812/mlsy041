//==============================================================================================================
// LL_Core.js
//==============================================================================================================
/*:
 * @target MZ
 * @plugindesc 核心 <Liuli Island>
 * @author 芯☆淡茹水
 * @help 
 * 
 * 〓 插件命令 〓
 * 
 * 1， 设置地图立绘的可视状态。
 * 2， 更改角色的 破处者名字 。
 * 3， 开始QTE。
 * 
 * 〓 技能属性文字颜色备注 〓
 * 
 * 在 数据库 - 类型 - 属性 里，取 属性名时，备注 <c:n>
 * 在技能信息介绍的描绘 属性文字 时，就会是 n 号颜色。
 * 
 * 〓 QTE 〓
 * 
 *  插件命令开始QTE时需要 3 个参数：
 *     A: 该次QTE显示在上方的文本。
 *     B：QTE时间(秒 ，支持小数)
 *     C：该次QTE的按键(详见 QTE按键参数的编写)
 * 
 *  需要QTE闪避的技能，备注以下 2 项：
 *     A: QTE 时间 => 备注：<QTE_Sec:s>  (s 秒数)
 *     B：QTE 按键(详见 QTE按键参数的编写)
 * 
 * 〓 QTE按键参数的编写 〓
 *     
 *     QTE 按键参数有 2 种， 按键个数 和 按键队列，实际运用时选择其中一种就行了。
 *     1，按键个数，只是一个数值，表示该次QTE有多少个按键。
 *        具体的按键将会在该插件设置项设置的所有按键里随机。
 *        插件命令时直接写数字，
 *        技能备注时，备注：<QTE_Num:n>  (n 个数)
 * 
 *     2, 按键队列，表示依次序的一组按键。
 *        编写格式为：key1,key2,key3...   (key1 ~ keyn  该插件设置项设置的对应按键名称)
 *        插件命令时直接依照上面格式写，
 *        技能备注时，备注：<QTE_Keys:key1,key2,key3...>
 * 
 *     3，若需要设置 小键盘方向键 按键，请依照规定格式命名，以便脚本自动判断来绘制箭头。
 *        小键盘 左键  => 命名：LEFT
 *        小键盘 右键  => 命名：RIGHT
 *        小键盘 上键  => 命名：UP
 *        小键盘 下键  => 命名：DOWN
 * 
 * 
 * @param colorIndex
 * @type number
 * @text 界面普通文字色号
 * @desc 界面普通文字色号。
 * @default 20
 * 
 *
 * @param MHouseId
 * @type number
 * @text 回忆屋的地图ID
 * @desc 回忆屋的地图ID。
 * @default 2
 * 
 * @param MHousePos
 * @text 回忆屋地图的传送坐标
 * @desc 格式： x,y
 * @default 18,13
 * 
 * 
 * @param helpEventId
 * @type number
 * @text 记录 菜单小提示 文本的公共事件ID
 * @desc 记录 菜单小提示 文本的公共事件ID。
 * @default 1
 * 
 * @param childEventId
 * @type number
 * @text 生孩子的公共事件ID
 * @desc 生孩子的公共事件ID。
 * @default 2
 * 
 * @param childStep
 * @type number
 * @text 怀孕 到 生孩子 的步数
 * @desc 怀孕 到 生孩子 的步数。
 * @default 3000
 * 
 * @param childItemId0
 * @type number
 * @text 男孩子的物品ID
 * @desc 男孩子的物品ID。
 * @default 3
 * 
 * @param childItemId1
 * @type number
 * @text 女孩子的物品ID
 * @desc 女孩子的物品ID。
 * @default 4
 * 
 * @param peStateId
 * @type number
 * @text 怀孕时自动附加的状态ID
 * @desc 怀孕时自动附加的状态ID。
 * @default 11
 * 
 * 
 * @param valTNC
 * @type number
 * @text 记录 坚韧 值的变量ID
 * @desc 记录 坚韧 值的变量ID。
 * @default 10
 * 
 * @param valEPN
 * @type number
 * @text 记录 忍耐 值的变量ID
 * @desc 记录 忍耐 值的变量ID。
 * @default 11
 * 
 * @param valOPS
 * @type number
 * @text 记录 开放度 值的变量ID
 * @desc 记录 开放度 值的变量ID。
 * @default 12
 * 
 * 
 * @param valRE0
 * @type number
 * @text 记录 嘴开发度 的变量ID
 * @desc 记录 嘴开发度 的变量ID（变量值最大 100）。
 * @default 13
 * 
 * @param valRE1
 * @type number
 * @text 记录 胸开发度 的变量ID
 * @desc 记录 胸开发度 的变量ID（变量值最大 100）。
 * @default 14
 * 
 * @param valRE2
 * @type number
 * @text 记录 穴开发度 的变量ID
 * @desc 记录 穴开发度 的变量ID（变量值最大 100）。
 * @default 15
 * 
 * @param valRE3
 * @type number
 * @text 记录 股开发度 的变量ID
 * @desc 记录 股开发度 的变量ID（变量值最大 100）。
 * @default 16
 * 
 * 
 * @param valPRG
 * @type number
 * @text 记录 孕值 的变量ID
 * @desc 记录 孕值 的变量ID。
 * @default 17
 * 
 * @param valMAS
 * @type number
 * @text 记录 自慰次数 的变量ID
 * @desc 记录 自慰次数 的变量ID。
 * @default 18
 * 
 * @param valSXH
 * @type number
 * @text 记录 性骚扰次数 的变量ID
 * @desc 记录 性骚扰次数 的变量ID。
 * @default 19
 * 
 * 
 * @param valHC0
 * @type number
 * @text 记录 与人类H次数 的变量ID
 * @desc 记录 与人类H次数 的变量ID。
 * @default 20
 * 
 * @param valHC1
 * @type number
 * @text 记录 与鸟类H次数 的变量ID
 * @desc 记录 与鸟类H次数 的变量ID。
 * @default 21
 * 
 * @param valHC2
 * @type number
 * @text 记录 与兽类H次数 的变量ID
 * @desc 记录 与兽类H次数 的变量ID。
 * @default 22
 * 
 * @param valHC3
 * @type number
 * @text 记录 与鱼类H次数 的变量ID
 * @desc 记录 与鱼类H次数 的变量ID。
 * @default 23
 * 
 * @param valHC4
 * @type number
 * @text 记录 与虫类H次数 的变量ID
 * @desc 记录 与虫类H次数 的变量ID。
 * @default 24
 * 
 * @param valHC5
 * @type number
 * @text 记录 与蛇类H次数 的变量ID
 * @desc 记录 与蛇类H次数 的变量ID。
 * @default 25
 * 
 * @param valHC6
 * @type number
 * @text 记录 与神类H次数 的变量ID
 * @desc 记录 与神类H次数 的变量ID。
 * @default 26
 * 
 * @param valHC7
 * @type number
 * @text 记录 与鬼类H次数 的变量ID
 * @desc 记录 与鬼类H次数 的变量ID。
 * @default 27
 * 
 * @param valHC8
 * @type number
 * @text 记录 与植物类H次数 的变量ID
 * @desc 记录 与植物类H次数 的变量ID。
 * @default 28
 * 
 * @param valHC9
 * @type number
 * @text 记录 强势H次数 的变量ID
 * @desc 记录 强势H次数 的变量ID。
 * @default 29
 * 
 * @param valHC10
 * @type number
 * @text 记录 被强H次数 的变量ID
 * @desc 记录 被强H次数 的变量ID。
 * @default 30
 * 
 * 
 * @param anm0
 * @type number
 * @text QTE 按键点击时播放的动画ID
 * @desc QTE 按键点击时播放的动画ID。
 * @default 4
 * 
 * @param anm1
 * @type number
 * @text QTE 成功时播放的动画ID
 * @desc QTE 成功时播放的动画ID。
 * @default 53
 * 
 * @param anm2
 * @type number
 * @text QTE 失败时播放的动画ID
 * @desc QTE 失败时播放的动画ID。
 * @default 56
 * 
 * @param anm3
 * @type number
 * @text QTE 时间到时播放的动画ID
 * @desc QTE 时间到时播放的动画ID。
 * @default 58
 * 
 * 
 * @param key1
 * @text QTE 按键1设置
 * @type struct<Key>
 * @default 
 * 
 * @param key2
 * @text QTE 按键2设置
 * @type struct<Key>
 * @default
 * 
 * @param key3
 * @text QTE 按键3设置
 * @type struct<Key>
 * @default
 * 
 * @param key4
 * @text QTE 按键4设置
 * @type struct<Key>
 * @default
 * 
 * @param key5
 * @text QTE 按键5设置
 * @type struct<Key>
 * @default
 * 
 * @param key6
 * @text QTE 按键6设置
 * @type struct<Key>
 * @default
 * 
 * @param key7
 * @text QTE 按键7设置
 * @type struct<Key>
 * @default
 * 
 * @param key8
 * @text QTE 按键8设置
 * @type struct<Key>
 * @default
 * 
 * @param key9
 * @text QTE 按键9设置
 * @type struct<Key>
 * @default
 * 
 * @param key10
 * @text QTE 按键10设置
 * @type struct<Key>
 * @default
 * 
 * @param key11
 * @text QTE 按键11设置
 * @type struct<Key>
 * @default
 * 
 * @param key12
 * @text QTE 按键12设置
 * @type struct<Key>
 * @default
 * 
 * @param key13
 * @text QTE 按键13设置
 * @type struct<Key>
 * @default
 * 
 * @param key14
 * @text QTE 按键14设置
 * @type struct<Key>
 * @default
 * 
 * @param key15
 * @text QTE 按键15设置
 * @type struct<Key>
 * @default
 * 
 * @param key16
 * @text QTE 按键16设置
 * @type struct<Key>
 * @default
 * 
 * @param key17
 * @text QTE 按键17设置
 * @type struct<Key>
 * @default
 * 
 * @param key18
 * @text QTE 按键18设置
 * @type struct<Key>
 * @default
 * 
 * @param key19
 * @text QTE 按键19设置
 * @type struct<Key>
 * @default
 * 
 * @param key20
 * @text QTE 按键20设置
 * @type struct<Key>
 * @default
 * 
 * @command SetCgVisible
 * @text 设置地图CG的可视状态
 * @desc 用于剧情什么的暂时隐藏CG，以免遮挡。
 * 
 * @arg state
 * @type boolean
 * @default true
 * @text CG是否显示
 * @desc CG是否显示。
 * 
 * @command SetBreakThrough
 * @text 设置破处者的名字
 * @desc 设置破处者的名字。
 * 
 * @arg name
 * @default
 * @text 破处者的名字
 * @desc 破处者的名字文本，不写留空就清除破处者名字。
 * 
 * @command StartQTE
 * @text 开始QTE
 * @desc 开始QTE。
 *
 * @arg titleText
 * @default
 * @text QTE 标题文字
 * @desc QTE 标题文字。
 * 
 * @arg sec
 * @type number
 * @min 1
 * @default 1
 * @text QTE 时间
 * @desc QTE 时间(秒)。
 * 
 * @arg keys
 * @default
 * @text QTE 按键
 * @desc 格式：按键名1,按键名2,按键名3,....  (若写一个数字，则随机这个数的按键)。
 */
/* ---------------------------------------------------------------------------
 * struct<Key>
 * ---------------------------------------------------------------------------
*/
/*~struct~Key: 
*
* @param KeyName
* @text 键名
* @type text
* @desc 按键名称。
* @default 
* 
* @param KeyValue
* @text 键值
* @type number
* @desc 按键的十进制值。
* @default 0
*/
//==============================================================================================================
; var XdRsData = XdRsData || {};
XdRsData.ll = XdRsData.ll || {};
XdRsData.ll.parameters = PluginManager.parameters('XdRs_LL_Core');
//==============================================================================================================
(() => {
    PluginManager.registerCommand('XdRs_LL_Core', 'SetCgVisible', args => {
        $gameSystem.setMapCgVisible(eval(args.state));
    });
    PluginManager.registerCommand('XdRs_LL_Core', 'SetBreakThrough', args => {
        $gameParty.currentActor().setBreaker(args.name);
    });
    PluginManager.registerCommand('XdRs_LL_Core', 'StartQTE', args => {
        QTE_Manager.setTitleText(args.titleText);
        const sec = parseInt(args.sec);
        const temp = args.keys;
        var keys = parseInt(temp);
        if (typeof keys !== 'number') {
            keys = temp.split(',');
        }
        QTE_Manager.start(sec, keys);
    });
})();
//==============================================================================================================
XdRsData.ll.buttonData = function (sym) {
    switch (sym) {
        case 'yes': return { 'name': 'Ui_Menu1', 'rect0': [532, 58, 118, 40], 'rect1': [532, 108, 118, 40] };
        case 'no': return { 'name': 'Ui_Menu1', 'rect0': [658, 58, 118, 40], 'rect1': [658, 108, 118, 40] };
        case 'item': return { 'name': 'Ui_Menu2', 'rect0': [1300, 192, 180, 62], 'rect1': [1510, 192, 180, 62] };
        case 'equip': return { 'name': 'Ui_Menu2', 'rect0': [1300, 272, 180, 62], 'rect1': [1510, 272, 180, 62] };
        case 'skill': return { 'name': 'Ui_Menu2', 'rect0': [1300, 352, 180, 62], 'rect1': [1510, 352, 180, 62] };
        case 'file': return { 'name': 'Ui_Menu2', 'rect0': [1300, 432, 180, 62], 'rect1': [1510, 432, 180, 62] };
        case 'setup': return { 'name': 'Ui_Menu2', 'rect0': [1300, 512, 180, 62], 'rect1': [1510, 512, 180, 62] };
        case 'intH': return { 'name': 'Ui_Menu2', 'rect0': [1302, 16, 180, 62], 'rect1': [1305, 103, 180, 62] };
        case 'item0': return { 'name': 'Ui_Menu2', 'rect0': [1306, 788, 180, 62], 'rect1': [1306, 708, 180, 62] };
        case 'item1': return { 'name': 'Ui_Menu2', 'rect0': [1496, 788, 180, 62], 'rect1': [1496, 708, 180, 62] };
        case 'item2': return { 'name': 'Ui_Menu2', 'rect0': [1686, 788, 180, 62], 'rect1': [1686, 708, 180, 62] };
        case 'usi0': return { 'name': 'Ui_Menu5', 'rect0': [1380, 1086, 120, 40], 'rect1': [1380, 1146, 120, 40] };
        case 'usi1': return { 'name': 'Ui_Menu5', 'rect0': [1510, 1086, 120, 40], 'rect1': [1510, 1146, 120, 40] };
        case 'usi2': return { 'name': 'Ui_Menu5', 'rect0': [1636, 1086, 120, 40], 'rect1': [1636, 1146, 120, 40] };
        case 'atk': return { 'name': 'Ui_Menu8', 'rect0': [705, 120, 180, 62], 'rect1': [902, 120, 180, 62] };
        case 'skilB': return { 'name': 'Ui_Menu8', 'rect0': [705, 200, 180, 62], 'rect1': [902, 200, 180, 62] };
        case 'itemB': return { 'name': 'Ui_Menu8', 'rect0': [705, 280, 180, 62], 'rect1': [902, 280, 180, 62] };
        case 'flee': return { 'name': 'Ui_Menu8', 'rect0': [705, 360, 180, 62], 'rect1': [902, 360, 180, 62] };
        case 'back': return { 'name': 'Ui_Menu2', 'rect0': [1716, 208, 54, 54], 'rect1': [1716, 208, 54, 54] };
        case 'load': return { 'name': 'Ui_Menu2', 'rect0': [1298, 1836, 118, 40], 'rect1': [1298, 1904, 118, 40] };
        case 'save': return { 'name': 'Ui_Menu2', 'rect0': [1422, 1836, 118, 40], 'rect1': [1422, 1904, 118, 40] };
        case 'cacl': return { 'name': 'Ui_Menu2', 'rect0': [1550, 1836, 118, 40], 'rect1': [1550, 1904, 118, 40] };
    }
    return null;
};
XdRsData.ll.helpText = function () {
    var text = '小提示：  ';
    const event = $dataCommonEvents[+this.parameters['helpEventId']];
    if (event) {
        const max = event.list.length;
        var index = Math.randomInt(max);
        while (event.list[index].code !== 108) {
            index = Math.randomInt(max);
        }
        text += event.list[index].parameters[0];
        while (event.list[index++].code === 408) {
            text += event.list[index].parameters[0];
        }
    }
    return text;
};
XdRsData.ll.isPrgVal = function (valId) {
    const id = +this.parameters['valPRG'];
    return id === valId;
};
XdRsData.ll.atbValue = function (sym) {
    const id = +this.parameters['val' + sym] || 0;
    return $gameVariables.value(id);
};
XdRsData.ll.getAnmId = function (index) {
    return +this.parameters['anm' + index] || 0;
};
XdRsData.ll.isQteItem = function (item) {
    return this.qteItemSec(item) > 0 && this.qteItemKeys(item);
};
XdRsData.ll.qteItemSec = function (item) {
    if (!item || !item.note) return 0;
    return item.note.match(/<QTE_Sec:(\d+)>/) ? parseInt(RegExp.$1) : 0;
};
XdRsData.ll.qteItemKeys = function (item) {
    if (!item || !item.note) return null;
    if (item.note.match(/<QTE_Num:(\d+)>/)) {
        return Math.max(1, parseInt(RegExp.$1));
    }
    if (item.note.match(/<QTE_Keys:(\S+)>/)) {
        return RegExp.$1.split(',');
    }
    return null;
};
XdRsData.ll.checkPregnancy = function () {
    const actor = $gameParty.currentActor();
    if (actor.isPregnant()) {
        const max = Math.max(1, +this.parameters['childStep']);
        const step = $gameParty.steps();
        $gameSystem._actorStepNumber = step - actor.pregnantStep();
        if ((step - actor.pregnantStep()) >= max) {
            const eventId = +this.parameters['childEventId'];
            $gameTemp.reserveCommonEvent(eventId);
            actor.setPregnant(false);
            $gameSystem._actorStepNumber = 0;
        }
    }
};
XdRsData.ll.gotoMemoriesHouse = function () {
    const id = +this.parameters['MHouseId'] || 1;
    const arr = this.parameters['MHousePos'].split(',').map(n => parseInt(n));
    $gamePlayer.reserveTransfer(id, arr[0] || 0, arr[1] || 0, 2, 0);
    SceneManager.goto(Scene_Map);
};
//==============================================================================================================
DataManager.maxSavefiles = function () {
    return 9;
};
XdRsData.ll.DataManager_makeSavefileInfo = DataManager.makeSavefileInfo
DataManager.makeSavefileInfo = function () {
    const info = XdRsData.ll.DataManager_makeSavefileInfo.call(this);
    info.level = $gameParty.leader().level;
    info.mapName = $gameMap.displayName();
    return info;
};
DataManager.getDateText = function (timestamp) {
    const d = new Date(timestamp);
    return '' + d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日';
};
//==============================================================================================================
ImageManager.loadUi = function (filename) {
    return this.loadBitmap("img/pictures/", filename);
};
//==============================================================================================================
XdRsData.ll.Bitmap_drawTextOutline = Bitmap.prototype._drawTextOutline;
Bitmap.prototype._drawTextOutline = function (text, tx, ty, maxWidth) {
    this.outlineWidth > 0 && XdRsData.ll.Bitmap_drawTextOutline.call(this, text, tx, ty, maxWidth);
};
Bitmap.setRoundRectPath = function (context, width, height, radius) {
    context.beginPath(0);
    context.arc(width - radius, height - radius, radius, 0, Math.PI / 2);
    context.lineTo(radius, height);
    context.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);
    context.lineTo(0, radius);
    context.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);
    context.lineTo(width - radius, 0);
    context.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);
    context.lineTo(width, height - radius);
    context.closePath();
};
Bitmap.prototype.fillRoundRect = function (x, y, width, height, radius, lineWidth, strokeColor, fillColor) {
    if (2 * radius > width || 2 * radius > height) return;
    var context = this._context;
    context.save();
    context.translate(x, y);
    Bitmap.setRoundRectPath(context, width, height, radius);
    context.lineWidth = lineWidth || 2;
    context.strokeStyle = strokeColor || 'black';
    if (fillColor) {
        context.fillStyle = fillColor;
        context.fill();
    }
    context.stroke();
    context.restore();
    this._baseTexture.update();
};
Bitmap.prototype.drawArrow = function (ox, oy, x1, y1, x2, y2, mx, my, color1, color2) {
    const context = this._context;
    context.save();
    context.beginPath();
    context.moveTo(ox, oy);
    context.lineTo(x1, y1);
    context.lineTo(mx, my);
    context.lineTo(x2, y2);
    context.lineTo(ox, oy);
    if (color2) {
        context.strokeStyle = color2;
        context.lineWidth = 2;
        context.stroke();
    }
    if (color1) {
        context.fillStyle = color1;
        context.fill();
    }
    context.restore();
    this._baseTexture.update();
};
//==============================================================================================================
XdRsData.ll.Sprite_initialize = Sprite.prototype.initialize;
Sprite.prototype.initialize = function (bitmap) {
    XdRsData.ll.Sprite_initialize.call(this, bitmap);
    this.createActionMaster();
};
Sprite.prototype.createActionMaster = function () {
    this._actionMaster = new XR_ActionMaster(this);
};
XdRsData.ll.Sprite_update = Sprite.prototype.update;
Sprite.prototype.update = function () {
    XdRsData.ll.Sprite_update.call(this);
    this._actionMaster.update();
};
Sprite.prototype.localPoint = function () {
    var x = this.x, y = this.y, obj = this;
    while (obj.parent) {
        obj = obj.parent;
        x += obj.x;
        y += obj.y;
    }
    return new Point(x, y);
};
Sprite.prototype.isTouch = function () {
    if (!this.visible || !this.bitmap) return false;
    const p = this.localPoint();
    const w = this.width, h = this.height;
    const x = p.x - w * this.anchor.x;
    const y = p.y - w * this.anchor.y;
    if (TouchInput.x < x || TouchInput.y < y) return false;
    return TouchInput.x < (x + w) && TouchInput.y < (y + h);
};
//==============================================================================================================
function QTE_Manager() {
    throw new Error("This is a static class");
}
QTE_Manager.setup = function () {
    document.addEventListener('keydown', this.onInputKeyDown.bind(this));
    this._listeners = {};
    this.setupAllKeys();
    this.clearResult();
    this.clear();
};
QTE_Manager.setupAllKeys = function () {
    this._keysData = {};
    for (var i = 1; i < 21; ++i) {
        if (!XdRsData.ll.parameters['key' + i]) continue;
        var data = JSON.parse(XdRsData.ll.parameters['key' + i]);
        if (data.KeyName && data.KeyValue) {
            this._keysData[data.KeyName] = parseInt(data.KeyValue);
        }
    }
};
QTE_Manager.clear = function () {
    this._runing = false;
    this._beReady = false;
    this._isFinished = false;
    this._index = -1;
    this._duration = 0;
    this._waitCount = 0;
    this._maxDuration = 1;
    this._titleText = '';
    this._keysQueue = [];
    this._tempListeners = {};
};
QTE_Manager.isRuning = function () {
    return this._runing || this._waitCount > 0;
};
QTE_Manager.index = function () {
    return this._index;
};
QTE_Manager.result = function () {
    return this._result;
};
QTE_Manager.clearResult = function () {
    this._result = 3;
};
QTE_Manager.titleText = function () {
    return this._titleText;
};
QTE_Manager.setTitleText = function (text) {
    this._titleText = text;
};
QTE_Manager.keysQueue = function () {
    return this._keysQueue;
};
QTE_Manager.wait = function (count) {
    this._waitCount = count;
};
QTE_Manager.addListener = function (sym, fun) {
    this._listeners[sym] = this._listeners[sym] || [];
    this._listeners[sym].push(fun);
};
QTE_Manager.addTempListener = function (sym, fun) {
    this._tempListeners[sym] = this._tempListeners[sym] || [];
    this._tempListeners[sym].push(fun);
};
QTE_Manager.callListener = function (sym) {
    if (this._listeners[sym]) {
        this._listeners[sym].forEach(fun => fun());
    }
    if (this._tempListeners[sym]) {
        this._tempListeners[sym].forEach(fun => fun());
    }
};
QTE_Manager.durationRate = function () {
    return this._duration / this._maxDuration;
};
QTE_Manager.singleOutKeys = function (keys) {
    const temp = Object.keys(this._keysData);
    if (typeof keys === 'number' && !isNaN(keys)) {
        const arr = [];
        while (arr.length < keys) arr.push(temp[Math.randomInt(temp.length)]);
        return arr;
    }
    if (Array.isArray(keys)) {
        return keys.filter(k => temp.contains(k));
    }
    return [];
};
QTE_Manager.isValidParameters = function (sec, keys) {
    return sec > 0 && keys.length > 0;
};
QTE_Manager.start = function (sec, keys) {
    keys = this.singleOutKeys(keys);
    if (!this.isValidParameters(sec, keys)) {
        this.clear();
        return false;
    }
    this._maxDuration = Math.round(sec * 60);
    this._duration = this._maxDuration;
    this._keysQueue = keys;
    this._runing = true;
    this.clearResult();
    this.callListener('start');
    this.wait(60);
    return true;
};
QTE_Manager.finish = function (result) {
    this._result = result;
    this._isFinished = true;
    this.callListener('finish');
};
QTE_Manager.exit = function () {
    this.callListener('exit');
    this.clear();
};
QTE_Manager.prepareNextKey = function () {
    this._index++;
    this._beReady = true;
    this.callListener('prepare');
    if (this._index >= this._keysQueue.length) {
        this.finish(0);
    } else this.wait(5);
};
QTE_Manager.onInputKeyDown = function (event) {
    if (!this._runing || this._isFinished || this._waitCount > 0 || !this._beReady) return;
    const keyName = this._keysQueue[this._index];
    if (keyName) {
        const KeyValue = this._keysData[keyName];
        if (event.keyCode === KeyValue) {
            this.callListener('onClick');
            this._beReady = false;
        } else this.finish(1);
    }
};
QTE_Manager.update = function () {
    this.updateWait();
    if (this.isRuning() && !this._isFinished) {
        this.updateDuration();
        this.updateQueue();
    }
};
QTE_Manager.updateWait = function () {
    if (this._waitCount > 0) this._waitCount--;
};
QTE_Manager.updateDuration = function () {
    if (this._waitCount === 0) {
        if (this._duration > 0) {
            this._duration--;
            this.callListener('duration');
        } else this.finish(2);
    }
};
QTE_Manager.updateQueue = function () {
    if (this._waitCount === 0) {
        !this._beReady && this.prepareNextKey();
    }
};
//==============================================================================================================
XdRsData.ll.SceneManager_initialize = SceneManager.initialize;
SceneManager.initialize = function () {
    QTE_Manager.setup();
    QTE_Manager.addListener('start', this.onQteStart.bind(this));
    QTE_Manager.addListener('exit', this.onQteExit.bind(this));
    XdRsData.ll.SceneManager_initialize.call(this);
};
SceneManager.onQteStart = function () {
    this._scene && this._scene.createQTEsprite();
};
SceneManager.onQteExit = function () {
    this._scene && this._scene.removeQTEsprite();
};
XdRsData.ll.SceneManager_updateMain = SceneManager.updateMain;
SceneManager.updateMain = function () {
    XdRsData.ll.SceneManager_updateMain.call(this);
    QTE_Manager.update();
};
//==============================================================================================================
XdRsData.ll.BattleManager_isBusy = BattleManager.isBusy;
BattleManager.isBusy = function () {
    return QTE_Manager.isRuning() || XdRsData.ll.BattleManager_isBusy.call(this);
};
XdRsData.ll.BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function () {
    this.prepareQTE();
    XdRsData.ll.BattleManager_startAction.call(this);
};
BattleManager.prepareQTE = function () {
    const action = this._subject.currentAction();
    const item = action.item();
    if (this._subject.isEnemy() && action.isForOpponent()) {
        if (XdRsData.ll.isQteItem(item)) {
            const word = action.isItem() ? '使用' : '施放';
            const sec = XdRsData.ll.qteItemSec(item);
            const keys = XdRsData.ll.qteItemKeys(item);
            this._logWindow.setWaitMode('qte');
            QTE_Manager.setTitleText(this._subject.name() + ' 准备' + word + ' ' + item.name);
            QTE_Manager.addTempListener('finish', this.onQteFinish.bind(this));
            QTE_Manager.start(sec, keys);
        }
    }
};
BattleManager.onQteFinish = function () {
    if (this._action && QTE_Manager.result() === 0) {
        this._action.setQteEffect('evade');
    }
};
//==============================================================================================================
function XR_ActionMaster() {
    this.initialize(...arguments);
}
XR_ActionMaster.prototype.initialize = function (parent) {
    this._data = [];
    this._action = null;
    this._actionAngle = 0;
    this._parent = parent;
    this._effectObjects = [];
    this._parent.startAction = this.add.bind(this);
    if (this._parent.setupActionObjects) {
        this._parent.setupActionObjects();
    }
};
XR_ActionMaster.prototype.isRuning = function () {
    return this._action || this._data.length > 0;
};
XR_ActionMaster.prototype.addEffectObject = function (obj) {
    this._effectObjects.push(obj);
};
XR_ActionMaster.prototype.add = function (action) {
    this._data.push(action);
};
XR_ActionMaster.prototype.getEffectObject = function (action) {
    if (!action) return null;
    if (action.body) return [this._parent];
    if (action.obj) return [this._parent[action.obj]];
    return this._effectObjects;
};
XR_ActionMaster.prototype.refreshObjectAngle = function (object) {
    if (object) object.rotation = this._actionAngle * Math.PI / 180;
};
XR_ActionMaster.prototype.applyAction = function (action) {
    const objects = this.getEffectObject(action);
    if (!objects || !objects.length) return false;
    if (action.ma) this._actionAngle += action.ma;
    for (var i = 0; i < objects.length; ++i) {
        var obj = objects[i];
        if (!obj) continue;
        if (action.mx) obj.x += action.mx;
        if (action.my) obj.y += action.my;
        if (action.sx) obj.scale.x += action.sx;
        if (action.sy) obj.scale.y += action.sy;
        if (action.op) obj.opacity += action.op;
        if (action.ma) this.refreshObjectAngle(obj);
    }
    if (action.count) action.count--;
    return !!action.count;
};
XR_ActionMaster.prototype.refresh = function () {
    if (this._action && this._parent.onActionChenged) {
        this._parent.onActionChenged(this._action.sym);
    }
    this._action = this._data.shift();
    if (!this._action && this._parent.onActionEnd) {
        this._parent.onActionEnd();
    }
};
XR_ActionMaster.prototype.update = function () {
    if (this.isRuning()) {
        !this.applyAction(this._action) && this.refresh();
    }
};
//==============================================================================================================
function Ui_Base() {
    this.initialize(...arguments);
}
Ui_Base.prototype = Object.create(Window_Base.prototype);
Ui_Base.prototype.constructor = Ui_Base;
Ui_Base.prototype.initialize = function (uiName, rect, srcPoint) {
    Window_Base.prototype.initialize.call(this, rect);
    this.initBaseData();
    this.setupUiFace(uiName, srcPoint);
    this.createActionMaster();
    this.deactivate();
    this.refresh();
};
Ui_Base.prototype.initBaseData = function () {
    this._parts = [];
    this._buttons = [];
    this._handlers = {};
    this._waitCount = 0;
    this.createParts();
    this.callMethod('setupPosition');
    this.callMethod('onBeforeCreate');
};
Ui_Base.prototype.close = function () {
};
Ui_Base.prototype.buttonsData = function () {
    return null;
};
Ui_Base.prototype.needTouchActivate = function () {
    return false;
};
Ui_Base.prototype.actor = function () {
    return $gameParty.currentActor();
};
Ui_Base.prototype.createParts = function () {
    this.buttonsData() && this.createButtons();
};
Ui_Base.prototype.createButtons = function () {
    const arr = this.buttonsData();
    for (var i = 0; i < arr.length; ++i) {
        var d = arr[i];
        this._buttons[i] = new Ui_Button(d.x, d.y, d.sym);
        this.addChild(this._buttons[i]);
    }
};
Ui_Base.prototype.wait = function (count) {
    this._waitCount = count;
};
Ui_Base.prototype.callMethod = function (keySym) {
    this[keySym] && this[keySym]();
};
Ui_Base.prototype.updatePadding = function () {
    this.padding = 0;
};
Ui_Base.prototype.startingTextColor = function () {
    const index = +XdRsData.ll.parameters['colorIndex'] || 0;
    return ColorManager.textColor(index);
};
Ui_Base.prototype.resetFontSettings = function () {
    Window_Base.prototype.resetFontSettings.call(this);
    this.contents.outlineWidth = 0;
};
Ui_Base.prototype.resetTextColor = function () {
    this.changeTextColor(this.startingTextColor());
};
Ui_Base.prototype.processCharacter = function (textState) {
    const c = textState.text[textState.index + 1];
    if (c && c.charCodeAt(0) >= 0x20) {
        textState.dataX = textState.dataX || textState.startX;
        const cw = this.textWidth(c);
        var mw = this.contents.width;
        if (this.maxExWidth()) {
            mw = Math.min(this.contents.width, this.maxExWidth());
        }
        if ((textState.dataX + cw) > mw) {
            this.flushTextState(textState);
            this.processNewLine(textState);
        }
        textState.dataX += cw;
    }
    Window_Base.prototype.processCharacter.call(this, textState);
};
Ui_Base.prototype.processNewLine = function (textState) {
    textState.dataX = textState.startX;
    Window_Base.prototype.processNewLine.call(this, textState);
};
Ui_Base.prototype.maxExWidth = function () {
    return 0;
};
Ui_Base.prototype.activate = function () {
    Window_Base.prototype.activate.call(this);
    this.wait(5);
};
Ui_Base.prototype.loadUi = function (uiName) {
    return ImageManager.loadUi(uiName);
};
Ui_Base.prototype.setupUiFace = function (uiName, srcPoint) {
    this.opacity = 0;
    this._uiFace = new Sprite();
    if (uiName) {
        this._uiFace.bitmap = this.loadUi(uiName);
        if (srcPoint) {
            this._uiFace.setFrame(srcPoint.x, srcPoint.y, this.width, this.height);
        }
    } else {
        this._uiFace.bitmap = new Bitmap(this.width, this.height);
        this.callMethod('drawUiFace');
    }
    this.initUiFace();
    this.addChildToBack(this._uiFace);
};
Ui_Base.prototype.initUiFace = function () {
    const x = this.width / 2, y = this.height / 2;
    this._uiFace.anchor = new Point(0.5, 0.5);
    this._uiFace.move(x, y);
    this.setupContentsSprite();
};
Ui_Base.prototype.setupContentsSprite = function () {
    const x = this.width / 2, y = this.height / 2;
    this._contentsSprite.anchor = new Point(0.5, 0.5);
    this._contentsSprite.move(x, y);
};
Ui_Base.prototype.createActionMaster = function () {
    this._actionMaster = new XR_ActionMaster(this);
};
Ui_Base.prototype.setupActionObjects = function () {
    if (!this._actionMaster) return;
    this._actionMaster.addEffectObject(this._uiFace);
    this._actionMaster.addEffectObject(this._contentsSprite);
};
Ui_Base.prototype.refresh = function () {
    this.contents.clear();
    this.callMethod('drawAll');
};
Ui_Base.prototype.isActive = function () {
    if (!this.visible || !this.active) return false;
    if (this._actionMaster.isRuning()) return false;
    return !this._waitCount;
};
Ui_Base.prototype.setHandler = function (sym, method) {
    this._handlers[sym] = method;
};
Ui_Base.prototype.isHandled = function (sym) {
    return !!this._handlers[sym];
};
Ui_Base.prototype.callHandler = function (sym) {
    this.isHandled(sym) && this._handlers[sym]();
};
Ui_Base.prototype.isValid = function () {
    return !this.isHandled('valid') || this._handlers['valid']();
};
Ui_Base.prototype.playOkSe = function () {
    SoundManager.playOk();
};
Ui_Base.prototype.playCancelSe = function () {
    SoundManager.playCancel();
};
Ui_Base.prototype.playBuzzerSe = function () {
    SoundManager.playBuzzer();
};
Ui_Base.prototype.callOkHandler = function () {
    if (this.isHandled('ok')) {
        if (!this.isValid()) return this.playBuzzerSe();
        this.playOkSe();
        this.deactivate();
        this.callHandler('ok');
    }
};
Ui_Base.prototype.callCancelHandler = function () {
    if (this.isHandled('cancel')) {
        this.playCancelSe();
        this.deactivate();
        this.callHandler('cancel');
    }
};
Ui_Base.prototype.onActionEnd = function () {
    this.callHandler('actionEnd');
};
Ui_Base.prototype.iskeyActivated = function (keyName) {
    return Input.isTriggered(keyName) || Input.isRepeated(keyName);
};
Ui_Base.prototype.isInputedCancel = function () {
    return Input.isTriggered('escape') || TouchInput.isCancelled();
};
Ui_Base.prototype.isTouch = function () {
    return Window_Scrollable.prototype.isTouchedInsideFrame.call(this);
};
Ui_Base.prototype.callInputMethod = function (keySym) {
    this.callMethod('onInput' + keySym);
};
Ui_Base.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    this._actionMaster.update();
    this.updateWaitCount();
    this.updateInput();
    this.updateTouchInput();
    this.callMethod('updateOther');
};
Ui_Base.prototype.updateWaitCount = function () {
    if (this._waitCount) this._waitCount--;
};
Ui_Base.prototype.updateInput = function () {
    if (!this.isActive()) return;
    if (this.isInputedCancel()) return this.callInputMethod('Cancel');
    if (this.iskeyActivated('ok')) return this.callInputMethod('Ok');
    if (this.iskeyActivated('up')) return this.callInputMethod('Up');
    if (this.iskeyActivated('down')) return this.callInputMethod('Down');
    if (this.iskeyActivated('left')) return this.callInputMethod('Left');
    if (this.iskeyActivated('right')) return this.callInputMethod('Right');
    if (this.iskeyActivated('pageup')) return this.callInputMethod('PageUp');
    if (this.iskeyActivated('pagedown')) return this.callInputMethod('PageDown');
};
Ui_Base.prototype.updateTouchInput = function () {
    if (!this.isActive() || !TouchInput.isTriggered()) return;
    this.isTouch() && this.callMethod('onTouchSelf');
};
Ui_Base.prototype.onTouchActivate = function () {
};
Ui_Base.prototype.onInputOk = function () {
    this.callOkHandler();
};
Ui_Base.prototype.onInputCancel = function () {
    this.callCancelHandler();
};
//==============================================================================================================
function Ui_Button() {
    this.initialize(...arguments);
}
Ui_Button.prototype = Object.create(Ui_Base.prototype);
Ui_Button.prototype.constructor = Ui_Button;
Ui_Button.prototype.initialize = function (x, y, sym) {
    this._sym = sym;
    this._pressCount = 0;
    this._isSelected = false;
    const data = XdRsData.ll.buttonData(sym);
    const arr = this.currentRect();
    const rect = new Rectangle(x, y, arr[2], arr[3]);
    const point = new Point(arr[0], arr[1]);
    Ui_Base.prototype.initialize.call(this, data.name, rect, point);
};
Ui_Button.prototype.currentRect = function () {
    const data = XdRsData.ll.buttonData(this._sym);
    const type = this._isSelected ? 'rect1' : 'rect0';
    return data[type];
};
Ui_Button.prototype.refreshImage = function () {
    if (this._isSelected !== this.isParentSelect()) {
        this._isSelected = this.isParentSelect();
        const rect = this.currentRect();
        this._uiFace.setFrame(rect[0], rect[1], rect[2], rect[3]);
    }
};
Ui_Button.prototype.isParentSelect = function () {
    if (!this.parent || !this.parent.isSelectButton) return false;
    return this.parent.isSelectButton(this._sym);
};
Ui_Button.prototype.isActive = function () {
    if (!this.parent || !this.parent.isActive) return true;
    return this.parent.isActive() && this.visible;
};
Ui_Button.prototype.isValid = function () {
    if (!this.parent || !this.parent.isButtonValid) return true;
    return this.parent.isButtonValid(this._sym);
};
Ui_Button.prototype.isParentSelectByButton = function () {
    if (!this.parent || !this.parent.isCommandtion) return false;
    if (!this.parent.isCommandtion()) return false;
    return this.parent.selectByButton(this._sym);
};
Ui_Button.prototype.press = function () {
    if (!this.isActive()) return;
    const result = this.isParentSelectByButton();
    if (result || this._pressCount > 0) return;
    if (!this.isValid()) return this.playBuzzerSe();
    this.playOkSe();
    this._pressCount = 8;
    this._uiFace.scale = new Point(0.98, 0.96);
};
Ui_Button.prototype.application = function () {
    if (!this.parent || !this.parent.onButtonPress) return;
    this.parent.onButtonPress(this._sym);
};
Ui_Button.prototype.reduction = function () {
    this._uiFace.scale = new Point(1, 1);
};
Ui_Button.prototype.onTouchSelf = function () {
    this.press();
};
Ui_Button.prototype.updateOther = function () {
    if (this.parent.isActive) {
        !this.parent.isActive() && this.updateUnActive();
    }
    if (this._pressCount > 0) {
        this._pressCount--;
        this._pressCount === 4 && this.application();
        this._pressCount === 0 && this.reduction();
    }
};
Ui_Button.prototype.updateUnActive = function () {
    if (this.parent.needTouchActivate && this.parent.needTouchActivate()) {
        if (TouchInput.isTriggered() && this.isTouch()) {
            this.parent.onTouchActivate(this._sym);
        }
    }
};
//==============================================================================================================
function Ui_RollBase() {
    this.initialize(...arguments);
}
Ui_RollBase.prototype = Object.create(Ui_Base.prototype);
Ui_RollBase.prototype.constructor = Ui_RollBase;
Ui_RollBase.prototype.rollWidth = function () {
    return null;
};
Ui_RollBase.prototype.maxRollCount = function () {
    return 20;
};
Ui_RollBase.prototype.onBeforRoll = function () {
    this._uiFace.hide();
    this._contentsSprite.hide();
};
Ui_RollBase.prototype.startRoll = function () {
    const w = this.rollWidth();
    if (w) {
        this.onBeforRoll();
        this._rollCount = this.maxRollCount();
        const bitmap = this._uiFace.bitmap;
        const rect = this._uiFace._frame;
        const cx = this.width / 2;
        const ax = (cx - w / 2 - w) / this._rollCount;
        this._rollDate = { 'type': 0, 'ax': ax, 'as': 1 / this._rollCount };
        this._rollSprites = [];
        for (var i = 0; i < 3; ++i) {
            this._rollSprites[i] = new Sprite(bitmap);
            var rx = [rect.x, rect.x + w, rect.x + this.width - w][i];
            var rw = [w, this.width - w * 2, w][i];
            this._rollSprites[i].setFrame(rx, rect.y, rw, this.height);
            this._rollSprites[i].anchor = new Point(0.5, 0);
            this._rollSprites[i].x = [cx - w / 2, cx, cx + w / 2][i];
            if (i === 1) this._rollSprites[i].scale.x = 0;
            this.addChildToBack(this._rollSprites[i]);
        }
        this.show();
    }
};
Ui_RollBase.prototype.startUnRoll = function () {
    if (this._rollDate) {
        this.onBeforRoll();
        this._rollSprites.forEach(w => w.show());
        this._rollCount = this.maxRollCount();
        this._rollDate.type = 1;
    }
};
Ui_RollBase.prototype.isRolling = function () {
    return !!this._rollCount;
};
Ui_RollBase.prototype.isActive = function () {
    return !this.isRolling() && Ui_Base.prototype.isActive.call(this);
};
Ui_RollBase.prototype.onRollEnd = function () {
    const type = this._rollDate.type;
    if (!type) {
        this._uiFace.show();
        this._contentsSprite.show();
    }
    this._rollSprites.forEach(w => w.hide());
    this.onAfterRoll(type);
};
Ui_RollBase.prototype.onAfterRoll = function (type) {
};
Ui_RollBase.prototype.updateOther = function () {
    if (this.isRolling()) {
        const type = this._rollDate.type;
        const ax = this._rollDate.ax;
        const as = this._rollDate.as;
        this._rollSprites[0].x += !type ? -ax : ax;
        this._rollSprites[1].scale.x += !type ? as : -as;
        this._rollSprites[2].x += !type ? ax : -ax;
        this._rollCount--;
        !this._rollCount && this.onRollEnd();
    }
};
//==============================================================================================================
function Ui_Command() {
    this.initialize(...arguments);
}
Ui_Command.prototype = Object.create(Ui_RollBase.prototype);
Ui_Command.prototype.constructor = Ui_Command;
Ui_Command.prototype.initBaseData = function () {
    Ui_RollBase.prototype.initBaseData.call(this);
    this._rollCooling = 0;
    this._index = this.initialIndex();
    this.callMethod('refreshIndexChanged');
};
Ui_Command.prototype.isCommandtion = function () {
    return true;
};
Ui_Command.prototype.index = function () {
    return this._index;
};
Ui_Command.prototype.initialIndex = function () {
    return 0;
};
Ui_Command.prototype.needTouchWheel = function () {
    return false;
};
Ui_Command.prototype.select = function (index, mute) {
    if (this._index !== index) {
        this._index = index;
        !mute && SoundManager.playCursor();
        this.callMethod('refreshIndexChanged');
    }
};
Ui_Command.prototype.roll = function (type) {
    if (this._rollCooling > 0 && this.needTouchWheel()) return;
    const max = this.maxItems();
    if (max) {
        const add = type ? 1 : max - 1;
        this.select((this._index + add) % max);
        this._rollCooling = 5;
    }
};
Ui_Command.prototype.selectByButton = function (sym) {
    const arr = this.buttonsData();
    if (arr) {
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i].sym === sym) {
                if (this._index === i) return false;
                else {
                    this.select(i);
                    return true;
                }
            }
        }
    }
    return false;
};
Ui_Command.prototype.maxItems = function () {
    return 0;
};
Ui_Command.prototype.activate = function () {
    Ui_Base.prototype.activate.call(this);
    this.callMethod('refreshIndexChanged');
};
Ui_Command.prototype.deactivate = function () {
    Ui_Base.prototype.deactivate.call(this);
    this.callMethod('refreshIndexChanged');
};
Ui_Command.prototype.updateOther = function () {
    Ui_RollBase.prototype.updateOther.call(this);
    if (this._rollCooling > 0) this._rollCooling--;
    if (this.isActive() && this.needTouchWheel()) {
        if (TouchInput.wheelY !== 0) {
            this.roll(TouchInput.wheelY > 0 ? 1 : 0);
        }
    }
};
//==============================================================================================================
function Ui_InquiryBase() {
    this.initialize(...arguments);
}
Ui_InquiryBase.prototype = Object.create(Ui_Command.prototype);
Ui_InquiryBase.prototype.constructor = Ui_InquiryBase;
Ui_InquiryBase.prototype.initialize = function () {
    const rect = this.uiSrcRect();
    const size = new Rectangle(0, 0, rect.width, rect.height);
    Ui_Command.prototype.initialize.call(this, this.uiName(), size, new Point(rect.x, rect.y));
};
Ui_InquiryBase.prototype.uiName = function () {
    return '';
};
Ui_InquiryBase.prototype.uiSrcRect = function () {
    return new Rectangle();
};
Ui_InquiryBase.prototype.rollWidth = function () {
    return 38;
};
Ui_InquiryBase.prototype.onBeforRoll = function () {
    if (this.rollWidth()) this._buttons.forEach(b => b.hide());
    Ui_Command.prototype.onBeforRoll.call(this);
};
Ui_InquiryBase.prototype.onAfterRoll = function (type) {
    if (!type) {
        this.activate();
        this._buttons.forEach(b => b.show());
    }
};
Ui_InquiryBase.prototype.maxItems = function () {
    return this.buttonsData() ? this.buttonsData().length : 0;
};
Ui_InquiryBase.prototype.refreshIndexChanged = function () {
    this._buttons.forEach(b => b.refreshImage());
};
Ui_InquiryBase.prototype.onInputOk = function () {
    this._buttons[this._index].press();
};
Ui_InquiryBase.prototype.onInputLeft = function () {
    this.roll(0);
};
Ui_InquiryBase.prototype.onInputRight = function () {
    this.roll(1);
};
//==============================================================================================================
function Ui_ListScrollBar() {
    this.initialize(...arguments);
}
Ui_ListScrollBar.prototype = Object.create(Sprite.prototype);
Ui_ListScrollBar.prototype.constructor = Ui_ListScrollBar;
Ui_ListScrollBar.prototype.initialize = function (x, y) {
    document.addEventListener("mousemove", this.onMouseMove.bind(this));
    Sprite.prototype.initialize.call(this);
    this.anchor = new Point(0.5, 0);
    this.createBlock();
    this.move(x, y);
};
Ui_ListScrollBar.prototype.createBlock = function () {
    this._block = new Sprite();
    this._block.anchor = new Point(0.5, 0);
    this.addChild(this._block);
};
Ui_ListScrollBar.prototype.barWidth = function () {
    return 18;
};
Ui_ListScrollBar.prototype.destroy = function () {
    this._block.destroy();
    Sprite.prototype.destroy.call(this);
};
Ui_ListScrollBar.prototype.refresh = function () {
    this.bitmap && this.bitmap.destroy();
    this._block.bitmap && this._block.bitmap.destroy();
    const width = this.barWidth();
    const height = this.parent.height - 24;
    const blockHeight = Math.max(15, this.parent.scrollBlockHeight());
    this.bitmap = new Bitmap(width, height);
    this.bitmap.fillRoundRect(2, 2, width - 4, height - 4, 7, 2, 'rgb(150,60,30)');
    this._block.bitmap = new Bitmap(width, blockHeight);
    this._block.bitmap.fillRoundRect(3, 0, width - 6, blockHeight - 5, 5, 2, 'rgba(0,0,0,0)', 'rgb(120,80,0)');
};
Ui_ListScrollBar.prototype.refreshBlockPosition = function (y) {
    const max = this.height - this._block.height + 3;
    this._block.y = Math.max(3, Math.min(max, y + 3));
};
Ui_ListScrollBar.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updateTouchInput();
};
Ui_ListScrollBar.prototype.updateTouchInput = function () {
    if (!this.parent.isActive()) return;
    if (TouchInput.isTriggered()) {
        if (this._block.isTouch()) return this.onBlockTouch();
        if (this.isTouch()) {
            this.setBlockY(this._block.height / 2);
        }
    }
    if (this._isBlockTouched) {
        if (!TouchInput.isPressed()) {
            this._isBlockTouched = false;
            this._blockTouchY = null;
        }
    }
};
Ui_ListScrollBar.prototype.onBlockTouch = function () {
    if (!this._isBlockTouched) {
        this._isBlockTouched = true;
        const p = this._block.localPoint();
        this._blockTouchY = TouchInput.y - p.y;
    }
};
Ui_ListScrollBar.prototype.onMouseMove = function () {
    if (!this._isBlockTouched || !this._blockTouchY) return;
    this.setBlockY(this._blockTouchY);
};
Ui_ListScrollBar.prototype.setBlockY = function (sy) {
    const lastY = this._block.y;
    const p = this.localPoint();
    const y = TouchInput.y - p.y - sy;
    const max = this.height - this._block.height + 2;
    this._block.y = Math.max(3, Math.min(max, y));
    if (lastY !== this._block.y) {
        const r = (this._block.y - 3) / (this.height - this._block.height - 6);
        const ry = (this.parent.contents.height - this.parent.height) * r;
        this.parent.setTopY(ry);
    }
};
//==============================================================================================================
function Ui_ItemContents() {
    this.initialize(...arguments);
}
Ui_ItemContents.prototype = Object.create(Window_Base.prototype);
Ui_ItemContents.prototype.constructor = Ui_ItemContents;
Ui_ItemContents.prototype.initialize = function (rect, index) {
    Window_Base.prototype.initialize.call(this, rect);
    this.opacity = 0;
    this._wheelY = 0;
    this._index = index;
    this.createCursor();
    this.createScrollBar();
};
Ui_ItemContents.prototype.destroy = function () {
    this._cursor && this._cursor.destroy();
    Window_Base.prototype.destroy.call(this);
};
Ui_ItemContents.prototype.resetTextColor = function () {
    Window_Base.prototype.resetTextColor.call(this);
    this.contents.textColor = Ui_Base.prototype.startingTextColor.call(this);
};
Ui_ItemContents.prototype.createCursor = function () {
    this._cursor = new Sprite_ListCursor();
    this.addChildToBack(this._cursor);
};
Ui_ItemContents.prototype.createScrollBar = function () {
    this._scrollBar = new Ui_ListScrollBar(this.width + 10, 12);
    this.addChild(this._scrollBar);
    this._scrollBar.refresh();
};
Ui_ItemContents.prototype.setup = function () {
    const size = this.parent.cursorSize();
    this._cursor.setup(size.x, size.y);
    this._topY = this._index * this.parent.lineHeight();
    this.refreshCursorPosition();
    this.reset();
};
Ui_ItemContents.prototype.reset = function () {
    if (!this.parent.itemsArea()) return;
    const now = this.parent.maxRows() * this.parent.lineHeight() + 24;
    const height = Math.max(now, this.height - 24);
    this.contents && this.contents.destroy();
    this.contents = new Bitmap(this.width, height);
    this.checkTopY();
    this.resetFontSettings();
    this._scrollBar.refresh();
    this.refreshFrameByTopY();
};
Ui_ItemContents.prototype.resetFontSettings = function () {
    Window_Base.prototype.resetFontSettings.call(this);
    this.contents.outlineWidth = 0;
};
Ui_ItemContents.prototype.checkTopY = function () {
    const max = this.contents.height - this.height;
    this._topY = Math.max(0, Math.min(this._topY, max));
};
Ui_ItemContents.prototype.refreshFrameByTopY = function () {
    this._contentsSprite.setFrame(0, this._topY, this.width, this.height - 24);
    this.refreshScrollBar();
};
Ui_ItemContents.prototype.refreshScrollBar = function () {
    const r = this._topY / this.contents.height;
    const ry = (this.height - this.scrollBlockHeight()) * r;
    const rh = this.scrollBlockHeight() * r;
    this._scrollBar.refreshBlockPosition(ry + rh);
};
Ui_ItemContents.prototype.isActive = function () {
    return this.parent.isActive();
};
Ui_ItemContents.prototype.itemRect = function (index) {
    const w = this.width / this.parent.columns();
    const h = this.parent.lineHeight();
    const x = index % this.parent.columns() * w;
    const y = Math.floor(index / this.parent.columns()) * h;
    return new Rectangle(x, y, w, h);
};
Ui_ItemContents.prototype.setTopY = function (y) {
    const lastY = this._topY;
    const fh = this._contentsSprite.height;
    const ch = this.contents.height;
    this._topY = Math.max(0, Math.min(ch - fh, y));
    this.checkTopY();
    if (lastY !== this._topY) {
        this.refreshFrameByTopY();
        this.refreshCursorPosition();
    }
};
Ui_ItemContents.prototype.canMoveTopY = function (n) {
    if (n < 0) return this._topY > 0;
    else {
        const fh = this._contentsSprite.height;
        const ch = this.contents.height;
        return this._topY < (ch - fh);
    }
};
Ui_ItemContents.prototype.moveTopY = function (n) {
    this.setTopY(this._topY + n);
};
Ui_ItemContents.prototype.select = function (index, mute) {
    const lastIndex = this._index;
    const max = this.parent.items().length - 1;
    this._index = Math.max(Math.min(max, index), 0);
    if (lastIndex !== this._index) {
        !mute && SoundManager.playCursor();
        this.refreshIndexChanged();
    }
};
Ui_ItemContents.prototype.rollIndex = function (type, mute) {
    const lh = this.parent.lineHeight();
    const mh = type === 'up' ? -lh : lh;
    const max = this.parent.items().length;
    const n = type === 'up' ? max - 1 : 1;
    const index = (this._index + n) % max;
    if (index === 0) this.setTopY(0);
    else if (index === (max - 1)) {
        const fh = this._contentsSprite.height;
        const ch = this.contents.height;
        this.setTopY(ch - fh);
    } else {
        var state = this.indexDisplayState(index);
        while (state !== 0 && this.canMoveTopY(mh)) {
            this.moveTopY(mh);
            state = this.indexDisplayState(index);
        }
    }
    this.select(index, mute);
};
Ui_ItemContents.prototype.indexDisplayState = function (index) {
    const lh = this.parent.lineHeight();
    const cy = index * lh - this._topY;
    const fh = this._contentsSprite.height;
    if (cy >= 0 && (cy + lh) <= fh) return 0;
    if (cy < 0) return cy < -lh ? 3 : 1;
    return cy > fh ? 4 : 2;
};
Ui_ItemContents.prototype.refreshRoll = function () {
    const state = this.indexDisplayState(this._index);
    if (state > 0 && state < 3) this.correctIndex(state);
};
Ui_ItemContents.prototype.correctIndex = function (state) {
    const lh = this.parent.lineHeight();
    var y = this._index * lh;
    if (state !== 1) {
        y = (this._index + 1) * lh - this._contentsSprite.height;
    }
    this.setTopY(y);
};
Ui_ItemContents.prototype.refreshIndexChanged = function () {
    this.refreshRoll();
    this.refreshCursorPosition();
    this.parent && this.parent.refreshIndexChanged();
};
Ui_ItemContents.prototype.refreshCursorPosition = function () {
    if (this._cursor) {
        const point = this.parent.cursorLocationPoint(this._index);
        this._cursor.refreshPosition(point.x, point.y - this._topY);
    }
};
Ui_ItemContents.prototype.scrollBlockHeight = function () {
    const h = this.height - 24;
    return Math.min(h, h * (h / (this.contents.height - 24)));
};
Ui_ItemContents.prototype.isTouch = function () {
    return Ui_Base.prototype.isTouch.call(this);
};
Ui_ItemContents.prototype.getTouchIndex = function () {
    const touchPos = new Point(TouchInput.x, TouchInput.y);
    const localPos = this._contentsSprite.worldTransform.applyInverse(touchPos);
    const len = this.parent.items().length;
    const fh = this._contentsSprite.height;
    const ph = this.parent.lineHeight();
    for (var i = 0; i < len; ++i) {
        var ry = i * ph - this._topY;
        if (ry < -ph || ry > fh) continue;
        var y = ry < 0 ? 0 : ry;
        var h = ry < 0 ? ph + ry : ph;
        h = Math.min(h, fh - y);
        var rect = new Rectangle(0, y, this.contents.width - 30, h);
        if (rect.contains(localPos.x, localPos.y)) return i;
    }
    return null;
};
Ui_ItemContents.prototype.onTouchList = function (index) {
    if (this._index !== index) this.select(index);
    else this.parent.onInputOk();
};
Ui_ItemContents.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    this.updateInput();
};
Ui_ItemContents.prototype.updateInput = function () {
    if (!this.isActive()) return;
    this.updateWheelY();
    this.updateTouchInput();
};
Ui_ItemContents.prototype.updateWheelY = function () {
    if (TouchInput.wheelY !== 0) this._wheelY = TouchInput.wheelY;
    if (TouchInput.isTriggered()) {
        if (this.isTouch()) this._wheelY = 0;
    }
    if (this._wheelY !== 0) {
        const speed = Math.max(1, Math.abs(this._wheelY / 10));
        const my = this._wheelY < 0 ? -speed : speed;
        const ny = Math.min(speed, Math.abs(this._wheelY));
        this._wheelY -= this._wheelY > 0 ? ny : -ny;
        this.moveTopY(my);
    }
};
Ui_ItemContents.prototype.updateTouchInput = function () {
    if (TouchInput.isTriggered()) {
        const index = this.getTouchIndex();
        index !== null && this.onTouchList(index);
    }
};
Ui_ItemContents.prototype._updateContents = function () {
};
//==============================================================================================================
function Ui_Selectable() {
    this.initialize(...arguments);
}
Ui_Selectable.prototype = Object.create(Ui_Base.prototype);
Ui_Selectable.prototype.constructor = Ui_Selectable;
Ui_Selectable.prototype.initBaseData = function () {
    Ui_Base.prototype.initBaseData.call(this);
    this.createItemContents();
};
Ui_Selectable.prototype.destroy = function () {
    this._itemContents.destroy();
    Ui_Base.prototype.destroy.call(this);
};
Ui_Selectable.prototype.deactivate = function () {
    Ui_Base.prototype.deactivate.call(this);
    if (this._itemContents) {
        this._itemContents._wheelY = 0;
    }
};
Ui_Selectable.prototype.initialIndex = function () {
    return 0;
};
Ui_Selectable.prototype.createItemContents = function () {
    this._lastLength = this.items().length;
    const rect = this.itemsArea() || new Rectangle(0, 0, this.width, this.height);
    const index = this.initialIndex();
    this._itemContents = new Ui_ItemContents(rect, index);
    this.addChild(this._itemContents);
    this._itemContents.setup();
};
Ui_Selectable.prototype.resetItemContents = function () {
    this._lastLength = this.items().length;
    this._itemContents && this._itemContents.reset();
};
Ui_Selectable.prototype.index = function () {
    return this._itemContents._index;
};
Ui_Selectable.prototype.columns = function () {
    return 1;
};
Ui_Selectable.prototype.maxRows = function () {
    return Math.ceil(this.items().length / this.columns());
};
Ui_Selectable.prototype.itemsArea = function () {
    return null;
};
Ui_Selectable.prototype.cursorSize = function () {
    return new Point(this._itemContents.width, this.lineHeight());
};
Ui_Selectable.prototype.cursorLocationPoint = function (index) {
    return new Point(0, index * this.lineHeight() + 8);
};
Ui_Selectable.prototype.items = function () {
    return [];
};
Ui_Selectable.prototype.item = function () {
    return this.items()[this.index()];
};
Ui_Selectable.prototype.itemRect = function (index) {
    return this._itemContents.itemRect(index);
};
Ui_Selectable.prototype.refreshIndexChanged = function () {
};
Ui_Selectable.prototype.refresh = function () {
    if (this._lastLength !== this.items().length) {
        this.resetItemContents();
    } else this._itemContents.contents.clear();
    Ui_Base.prototype.refresh.call(this);
};
Ui_Selectable.prototype.drawAll = function () {
    this.drawItems();
    this.callMethod('drawOther');
};
Ui_Selectable.prototype.drawItems = function () {
    this._itemContents.contents.clear();
    const len = Math.max(this.items().length, 1);
    for (var i = 0; i < len; ++i) {
        this.drawItemRect(i);
        this.drawItem(i);
    }
};
Ui_Selectable.prototype.drawItemRect = function (index) {
};
Ui_Selectable.prototype.drawItem = function (index) {
};
Ui_Selectable.prototype.redrawItem = function (index) {
    index = index || this.index();
    const rect = this.itemRect(index);
    this._itemContents.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
    this.drawItemRect(index);
    this.drawItem(index);
};
Ui_Selectable.prototype.onInputUp = function () {
    this._itemContents.rollIndex('up');
};
Ui_Selectable.prototype.onInputDown = function () {
    this._itemContents.rollIndex('down');
};
//==============================================================================================================
// end
//==============================================================================================================