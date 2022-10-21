//=============================================================================
// RPG Maker MZ - FlyCat-标题网页图片
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<标题网页图片>
 * @author FlyCat
 * 
 * @param pictureDate
 * @text 图片设置
 * @type struct<pictureDate>[]
 * @default
 * 
 */

/*~struct~pictureDate:
@param picture
@text 绑定图片
@desc 选择绑定图片
@require 1
@dir img/system/
@type file

@param x
@text 图片X
@desc 图片X
@default 0

@param y
@text 图片Y
@desc 图片Y
@default 0

@param URL
@text 网址
@desc 网址
@default 
 * 
*/

'use strict';
var Imported = Imported || {};
Imported.FlyCat_PictureTitle = true;

var FlyCat = FlyCat || {};
FlyCat.PictureTitle = {};
FlyCat.PictureTitle.parameters = PluginManager.parameters('FlyCat_PictureTitle');
FlyCat.PictureTitle.pictureDate = JSON.parse(FlyCat.PictureTitle.parameters['pictureDate'] || '[]');

if (FlyCat.PictureTitle.pictureDate) {
    const max = FlyCat.PictureTitle.pictureDate.length;
    for (let i = 0; i < max; i++) {
        FlyCat.PictureTitle.pictureDate[i] = JSON.parse(FlyCat.PictureTitle.pictureDate[i]);
        FlyCat.PictureTitle.pictureDate[i].id = i;
        FlyCat.PictureTitle.pictureDate[i].x = JSON.parse(FlyCat.PictureTitle.pictureDate[i].x);
        FlyCat.PictureTitle.pictureDate[i].y = JSON.parse(FlyCat.PictureTitle.pictureDate[i].y);
    }
};

FlyCat.PictureTitle.Scene_LL_Title_createMenuButtons = Scene_LL_Title.prototype.createMenuButtons;
Scene_LL_Title.prototype.createMenuButtons = function () {
    FlyCat.PictureTitle.Scene_LL_Title_createMenuButtons.call(this);
    this._pictureTitle = [];
    for (let i = 0; i < FlyCat.PictureTitle.pictureDate.length; i++) {
        this._pictureTitle[i] = new Sprite_TitleButtons();
        this._pictureTitle[i].hide();
        this._pictureTitle[i].bitmap = ImageManager.loadSystem(FlyCat.PictureTitle.pictureDate[i].picture);
        this._pictureTitle[i].x = FlyCat.PictureTitle.pictureDate[i].x;
        this._pictureTitle[i].y = FlyCat.PictureTitle.pictureDate[i].y;
        this._pictureTitle[i].setClickHandler(this.onButton.bind(this, i));
        this.addChild(this._pictureTitle[i]);
    }
};
Scene_LL_Title.prototype.onButton = function (i) {
    const data = FlyCat.PictureTitle.pictureDate[i];
    var url = data.URL;
    SoundManager.playOk();
    if (!Utils.isNwjs()) {
        window.open(url, '_blank');
    } else {
        var type = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
        require('child_process').exec(type + ' ' + url);
    };
};

/*按钮精灵*/
function Sprite_TitleButtons() {
    this.initialize(...arguments);
}
Sprite_TitleButtons.prototype = Object.create(Sprite_Clickable.prototype);
Sprite_TitleButtons.prototype.constructor = Sprite_TitleButtons;

Sprite_TitleButtons.prototype.initialize = function () {
    Sprite_Clickable.prototype.initialize.call(this);
    this._clickHandler = null;
    this._buttonId = -1;
};

Sprite_TitleButtons.prototype.onMouseEnter = function () {
    this._colorTone = [50, 50, 50, 0]
    this._updateColorFilter();
    SoundManager.playCursor();
};

Sprite_TitleButtons.prototype.setClickHandler = function (method) {
    this._clickHandler = method;
};

Sprite_TitleButtons.prototype.onMouseExit = function () {
    this._colorTone = [0, 0, 0, 0]
    this._updateColorFilter();
};

Sprite_TitleButtons.prototype.onClick = function () {
    if (this._clickHandler) {
        this._clickHandler();
    }
};