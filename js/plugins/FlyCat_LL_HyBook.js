
//=============================================================================
// RPG Maker MZ - 怀孕笔记
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<怀孕笔记>
 * @author FlyCat
 * 
 * @param hyBookPicture
 * @text 怀孕笔记初始图
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param hyStageVariable
 * @text 怀孕月份变量Id
 * @desc 
 * @type variable
 * 
 * @help
*/
'use strict';
var Imported = Imported || {};
Imported.FlyCat_LL_HyBook = true;

var FlyCat = FlyCat || {};
FlyCat.LL_HyBook = {};
FlyCat.LL_HyBook.parameters = PluginManager.parameters('FlyCat_LL_HyBook');
FlyCat.LL_HyBook.hyBookPicture = String(FlyCat.LL_HyBook.parameters['hyBookPicture']);
FlyCat.LL_HyBook.hyStageVariable = Number(FlyCat.LL_HyBook.parameters['hyStageVariable']);

function Scene_LL_HyBook() {
    this.initialize(...arguments);
}

Scene_LL_HyBook.prototype = Object.create(Scene_MenuBase.prototype);
Scene_LL_HyBook.prototype.constructor = Scene_LL_HyBook;

Scene_LL_HyBook.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
};
Scene_LL_HyBook.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createHyBookWindow();
};
Scene_LL_HyBook.prototype.createHyBookWindow = function () {
    const rect = this.hyBookWindowRect();
    this._hyBookWindow = new Window_HyBook(rect);
    this._hyBookWindow.setHandler("cancel", this.popScene.bind(this));
    this.addChild(this._hyBookWindow);
};
Scene_LL_HyBook.prototype.hyBookWindowRect = function () {
    const wx = 0;
    const wy = 0;
    const ww = Graphics.boxWidth;
    const wh = Graphics.boxHeight;
    return new Rectangle(wx, wy, ww, wh);
};
function Window_HyBook() {
    this.initialize(...arguments);
}

Window_HyBook.prototype = Object.create(Window_Selectable.prototype);
Window_HyBook.prototype.constructor = Window_HyBook;

Window_HyBook.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.activate();
    this.opacity = 0;
    this._bookHySprite = new Sprite();
    this.addChild(this._bookHySprite);
    this.refresh();
};
Window_HyBook.prototype.refresh = function () {
    var value = FlyCat.LL_HyBook.hyStageVariable ? $gameVariables.value(FlyCat.LL_HyBook.hyStageVariable) : 0;
    if (value <= 2) {
        var img = '子宫横切面1'
    }
    else if (value <= 4) {
        var img = '子宫横切面3';
    }
    else if (value <= 6) {
        var img = '子宫横切面4'
    }
    else if (value <= 8) {
        var img = '子宫横切面5'
    }
    else if (value <= 10) {
        var img = '子宫横切面6'
    }
    else if (value <= 12) {
        var img = '子宫横切面6'
    }
    this._bookHySprite.bitmap = ImageManager.loadBitmap('img/menu/', img);
    this._bookHySprite.x = 0;
    this._bookHySprite.y = 0;
};
Window_HyBook.prototype.update = function () {
    Window_Selectable.prototype.update.call(this);
    this.refresh();
    /*呼吸*/
    if (this._bookHySprite) {
        this._breatheCount++;
        if (this._breatheCount < 61) {
            this._bookHySprite.scale.y += 0.0002;
        }
        else if (this._breatheCount > 60 && this._breatheCount <= 120) {
            this._bookHySprite.scale.y -= 0.0002;
        }
        else {
            this._breatheCount = 0;
            this._bookHySprite.scale.y = 1;
        };
    };
};