//=============================================================================
// RPG Maker MZ - 琉璃岛私密日记
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<琉璃岛私密日记>
 * @author FlyCat
 * 
 * @param smPicture
 * @text 私密菜单立绘
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param mouthValue
 * @text 嘴巴开发度系统变量选择
 * @desc 嘴巴开发度系统变量选择
 * @type variable
 * 
 * @param thoraxValue
 * @text 胸部开发度系统变量选择
 * @desc 胸部开发度系统变量选择
 * @type variable
 * 
 * @param vaginaValue
 * @text 小穴开发度系统变量选择
 * @desc 小穴开发度系统变量选择
 * @type variable
 * 
 * @param bunsValue
 * @text 股开发度系统变量选择
 * @desc 股开发度系统变量选择
 * @type variable
 * 
 * @param peopleHValue
 * @text 与人类H次数系统变量选择
 * @desc 与人类H次数系统变量选择
 * @type variable
 * 
 * @param plantHValue
 * @text 与植物H次数系统变量选择
 * @desc 与植物H次数系统变量选择
 * @type variable
 * 
 * @param yzHValue
 * @text 与异种H次数系统变量选择
 * @desc 与异种H次数系统变量选择
 * @type variable
 * 
 * @param childrenValue
 * @text 孩子数量系统变量选择
 * @desc 孩子数量系统变量选择
 * @type variable
 * 
 * @param boyValue
 * @text 男孩数量系统变量选择
 * @desc 男孩数量系统变量选择
 * @type variable
 * 
 * @param girlValue
 * @text 女孩数量系统变量选择
 * @desc nv孩数量系统变量选择
 * @type variable
 * 
 * @help
 * ==============================使用说明================================
 * 在img文件夹下新建menu文件，所有立绘需要放到这里
 * 在插件设置内设置私密菜单立绘
 * 在插件设置内设置嘴巴开发度系统变量
 * 在插件设置内设置胸部开发度系统变量
 * 在插件设置内设置小穴开发度系统变量
 * 在插件设置内设置股开发度系统变量
 * 在插件设置内设置人类H次数
 * 在插件设置内设置植物H次数
 * 在插件设置内设置异种H次数
 * 在插件设置内设置孩子数量
 * 在插件设置内设置男孩子数量
 * 在插件设置内设置女孩子数量
 * ======================================================================
 */
'use strict';
var Imported = Imported || {};
Imported.FlyCat_LL_SM = true;

var FlyCat = FlyCat || {};
FlyCat.LL_Sm = {};
FlyCat.LL_Sm.parameters = PluginManager.parameters('FlyCat_LL_SM');
FlyCat.LL_Sm.smPicture = String(FlyCat.LL_Sm.parameters['smPicture']);
FlyCat.LL_Sm.mouthValue = Number(FlyCat.LL_Sm.parameters['mouthValue'] || 0);
FlyCat.LL_Sm.thoraxValue = Number(FlyCat.LL_Sm.parameters['thoraxValue'] || 0);
FlyCat.LL_Sm.vaginaValue = Number(FlyCat.LL_Sm.parameters['vaginaValue'] || 0);
FlyCat.LL_Sm.bunsValue = Number(FlyCat.LL_Sm.parameters['bunsValue'] || 0);
FlyCat.LL_Sm.peopleHValue = Number(FlyCat.LL_Sm.parameters['peopleHValue'] || 0);
FlyCat.LL_Sm.plantHValue = Number(FlyCat.LL_Sm.parameters['plantHValue'] || 0);
FlyCat.LL_Sm.yzHValue = Number(FlyCat.LL_Sm.parameters['yzHValue'] || 0);
FlyCat.LL_Sm.childrenValue = Number(FlyCat.LL_Sm.parameters['childrenValue'] || 0);
FlyCat.LL_Sm.boyValue = Number(FlyCat.LL_Sm.parameters['boyValue'] || 0);
FlyCat.LL_Sm.girlValue = Number(FlyCat.LL_Sm.parameters['girlValue'] || 0);
function Scene_LL_SM() {
    this.initialize(...arguments);
}

Scene_LL_SM.prototype = Object.create(Scene_MenuBase.prototype);
Scene_LL_SM.prototype.constructor = Scene_LL_SM;

Scene_LL_SM.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
};
Scene_LL_SM.prototype.create = function () {
    this.createBackground();
    this.createSmInfoWindow();
    this.createSmSptrie();
    this.createHyBookWindow();
};
Scene_LL_SM.prototype.createHyBookWindow = function () {
    const rect = this.hyBookWindowRect();
    this._hyBookWindows = new Window_HyBookCommand(rect);
    this._hyBookWindows.setHandler("openhY", this.onHyBook.bind(this));
    this._hyBookWindows.setHandler("cancel", this.popScene.bind(this));
    this.addChild(this._hyBookWindows);
    this._hyBookWindows.select(0);
};
Scene_LL_SM.prototype.hyBookWindowRect = function () {
    const ww = 280;
    const wh = 140;
    const wx = 0;
    const wy = 0;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_LL_SM.prototype.onHyBook = function () {
    SceneManager.push(Scene_LL_HyBook);
};
Scene_LL_SM.prototype.createSmInfoWindow = function () {
    const rect = this.smWindowRect();
    const smWindow = new Window_SmInfo(rect);
    // smWindow.setHandler("cancel", this.popScene.bind(this));
    this.addChild(smWindow);
    this._smWindow = smWindow;
};
Scene_LL_SM.prototype.smWindowRect = function () {
    const ww = 600;
    const wh = 400;
    const wx = 600;
    const wy = 65;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_LL_SM.prototype.createSmSptrie = function () {
    this._smSptrie = new Sprite();
    this.addChild(this._smSptrie);
    this._smSptrie.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_Sm.smPicture);
    this._smSptrie.x = 300;
    this._smSptrie.y = 0;
    this._smSptries = [];
    for (let i = 0; i < 4; i++) {
        this._smSptries[i] = new Sprite();
        this.addChild(this._smSptries[i]);
        this.smValue(i);
    }
};
Scene_LL_SM.prototype.smValue = function (i) {
    switch (i) {
        case 0:
            const mouthValue = $gameVariables.value(FlyCat.LL_Sm.mouthValue) || 0;
            var id = this.smValueImg(mouthValue);
            this._smSptries[i].x = 260;
            this._smSptries[i].y = 20;
            this._smSptries[i].bitmap = ImageManager.loadBitmap('img/menu/', 'zui' + id);
            break;
        case 1:
            const thoraxValue = $gameVariables.value(FlyCat.LL_Sm.thoraxValue) || 0;
            var id = this.smValueImg(thoraxValue);
            this._smSptries[i].x = 120;
            this._smSptries[i].y = 160;
            this._smSptries[i].bitmap = ImageManager.loadBitmap('img/menu/', 'xiong' + id);
            break;
        case 2:
            const vaginaValue = $gameVariables.value(FlyCat.LL_Sm.vaginaValue) || 0;
            var id = this.smValueImg(vaginaValue);
            this._smSptries[i].x = 70;
            this._smSptries[i].y = 335;
            this._smSptries[i].bitmap = ImageManager.loadBitmap('img/menu/', 'xue' + id);
            break;
        case 3:
            const bunsValue = $gameVariables.value(FlyCat.LL_Sm.bunsValue) || 0;
            var id = this.smValueImg(bunsValue);
            this._smSptries[i].x = 70;
            this._smSptries[i].y = 510;
            this._smSptries[i].bitmap = ImageManager.loadBitmap('img/menu/', 'pi' + id);
            break;
    }
}
Scene_LL_SM.prototype.smValueImg = function (number) {
    if (number < 30) return 1;
    if (number < 60) return 2;
    if (number < 90) return 3;
    return 4;
};

////////////////////////
function Window_HyBookCommand() {
    this.initialize(...arguments);
}

Window_HyBookCommand.prototype = Object.create(Window_Command.prototype);
Window_HyBookCommand.prototype.constructor = Window_HyBookCommand;

Window_HyBookCommand.prototype.initialize = function (rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.opacity = 0;
    this.deselect();
};
Window_HyBookCommand.prototype.makeCommandList = function () {
    this.contents.fontSize = 26;
    this.addCommand('打开怀孕状态', 'openhY', true);
};
Window_HyBookCommand.prototype.maxItems = function () {
    return 1;
};
Window_HyBookCommand.prototype.rowSpacing = function () {
    return 10;
};
Window_HyBookCommand.prototype.numVisibleRows = function () {
    return 1;
};
Window_HyBookCommand.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
Window_HyBookCommand.prototype.maxCols = function () {
    return 1;
};


/////////////////////
function Window_SmInfo() {
    this.initialize(...arguments);
};

Window_SmInfo.prototype = Object.create(Window_Selectable.prototype);
Window_SmInfo.prototype.constructor = Window_SmInfo;

Window_SmInfo.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.activate();
    this.refresh();
};
Window_SmInfo.prototype.refresh = function () {
    this.drawBaseInfo();
};
Window_SmInfo.prototype.drawBaseInfo = function () {
    this.contents.clear();
    this.contents.fontSize = 20;
    var x = 100;
    var y = 5;
    const mouthValue = ($gameVariables.value(FlyCat.LL_Sm.mouthValue) / 100) * 300;
    const thoraxValue = ($gameVariables.value(FlyCat.LL_Sm.thoraxValue) / 100) * 300;
    const vaginaValue = ($gameVariables.value(FlyCat.LL_Sm.vaginaValue) / 100) * 300;
    const bunsValue = ($gameVariables.value(FlyCat.LL_Sm.bunsValue) / 100) * 300;
    var textW = this.textWidth('嘴巴开发度：');
    this.drawText('嘴巴开发度：', x, y, this.width, 'left')
    this.textFillRect(x, y, textW, mouthValue >= 300 ? 300 : mouthValue, $gameVariables.value(FlyCat.LL_Sm.mouthValue) >= 100 ? 100 : $gameVariables.value(FlyCat.LL_Sm.mouthValue))
    y += 24;
    this.drawText('胸部开发度：', x, y, this.width, 'left')
    this.textFillRect(x, y, textW, thoraxValue >= 300 ? 300 : thoraxValue, $gameVariables.value(FlyCat.LL_Sm.thoraxValue) >= 100 ? 100 : $gameVariables.value(FlyCat.LL_Sm.thoraxValue))
    y += 24;
    this.drawText('小穴开发度：', x, y, this.width, 'left')
    this.textFillRect(x, y, textW, vaginaValue >= 300 ? 300 : vaginaValue, $gameVariables.value(FlyCat.LL_Sm.vaginaValue) >= 100 ? 100 : $gameVariables.value(FlyCat.LL_Sm.vaginaValue))
    y += 24;
    this.drawText('股开发度：', x, y, this.width, 'left')
    this.textFillRect(x, y, textW, bunsValue >= 300 ? 300 : bunsValue, $gameVariables.value(FlyCat.LL_Sm.bunsValue) >= 100 ? 100 : $gameVariables.value(FlyCat.LL_Sm.bunsValue))
    y += 48;
    x += 80;
    this.drawText('与人类H次数：' + $gameVariables.value(FlyCat.LL_Sm.peopleHValue), x, y, this.width, 'left')
    y += 36;
    this.drawText('与植物H次数：' + $gameVariables.value(FlyCat.LL_Sm.plantHValue), x, y, this.width, 'left')
    y += 36;
    this.drawText('与异种H次数：' + $gameVariables.value(FlyCat.LL_Sm.yzHValue), x, y, this.width, 'left')
    y += 36;
    this.drawText('孩子个数：' + $gameVariables.value(FlyCat.LL_Sm.childrenValue), x, y, this.width, 'left')
    y += 36;
    this.drawText('男孩个数：' + $gameVariables.value(FlyCat.LL_Sm.boyValue), x, y, this.width, 'left')
    y += 36;
    this.drawText('女孩个数：' + $gameVariables.value(FlyCat.LL_Sm.girlValue), x, y, this.width, 'left')
    y += 36;
};
Window_SmInfo.prototype.textSet = function () {
    this.changeTextColor(ColorManager.textColor(15));
    this.contents.outlineWidth = 0;
};
Window_SmInfo.prototype.textReset = function () {
    this.resetTextColor();
    this.contents.outlineWidth = 3;
};
Window_SmInfo.prototype.textFillRect = function (x, y, textW, value, value2) {
    this.contents.fillRect(x + textW, y + 8, 300, 20, ColorManager.textColor(0));
    this.contents.fillRect(x + textW, y + 8, value, 20, ColorManager.textColor(14));
    this.textSet();
    this.drawText(value2 + '%', x + textW, y + 1, 300, 'center')
    this.textReset();
};