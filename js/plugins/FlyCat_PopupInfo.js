//=============================================================================
// RPG Maker MZ - 快捷键提示
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<快捷键提示>
 * @author FlyCat
 * 
 * @param infoImg
 * @text 选择信息图片
 * @desc 选择信息图片
 * @default
 * @require 1
 * @dir img/system/
 * @type file
 * 
 * @param curX
 * @text X位置
 * @type string
 * @default 
 * 
 * @param curY
 * @text Y位置
 * @type string
 * @default 
 * 
 */
var Imported = Imported || {};
Imported.FlyCat_PopupInfo = true;

var FlyCat = FlyCat || {};
FlyCat.PopupInfo = {};
FlyCat.PopupInfo.parameters = PluginManager.parameters('FlyCat_PopupInfo');
FlyCat.PopupInfo.infoImg = String(FlyCat.PopupInfo.parameters['infoImg']);
FlyCat.PopupInfo.curX = Number(FlyCat.PopupInfo.parameters['curX']) || 0;
FlyCat.PopupInfo.curY = Number(FlyCat.PopupInfo.parameters['curY']) || 650;

FlyCat.PopupInfo.Scene_Map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function () {
    FlyCat.PopupInfo.Scene_Map_initialize.call(this);
    this._onFkey = false;
    Input.keyMapper['70'] = 'f';
    Input.keyMapper['69'] = 'e';
};

FlyCat.PopupInfo.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function () {
    FlyCat.PopupInfo.Scene_Map_createAllWindows.call(this);
    this.createPopupInfoSprite();
};
Scene_Map.prototype.createPopupInfoSprite = function () {
    this._popupInfoSprite = new Sprite_PopupInfo();
    this.addChild(this._popupInfoSprite);
    this._popupInfoSprite.x = FlyCat.PopupInfo.curX - 384;
    this._popupInfoSprite.y = FlyCat.PopupInfo.curY;
    this._popupInfoSprite.bitmap = ImageManager.loadSystem(FlyCat.PopupInfo.infoImg);
};
FlyCat.PopupInfo.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function () {
    FlyCat.PopupInfo.Scene_Map_update.call(this);
    if (this._popupInfoSprite) {
        if (Input.isTriggered('f')) {
            SoundManager.playCursor();
            if (this._onFkey) {
                this._popupInfoSprite._onMouse = false;
                this._onFkey = false;
            } else {
                this._popupInfoSprite._onMouse = true;
                this._onFkey = true;
            }
        }
    }
    if (Input.isTriggered('e')) {
        SoundManager.playOk();
        SceneManager.push(Scene_Item)
    };
    if (Input.isTriggered('q')) {
        SoundManager.playOk();
        SceneManager.push(Scene_Quest)
    }
};

function Sprite_PopupInfo() {
    this.initialize(...arguments);
}
Sprite_PopupInfo.prototype = Object.create(Sprite_Clickable.prototype);
Sprite_PopupInfo.prototype.constructor = Sprite_PopupInfo;

Sprite_PopupInfo.prototype.initialize = function () {
    Sprite_Clickable.prototype.initialize.call(this);
    this._clickHandler = null;
    this._playAniCounts = 0;
    this._counts = 0;
    this._onMouse = false;
};
Sprite_PopupInfo.prototype.onClick = function () {

};
Sprite_PopupInfo.prototype.onMouseEnter = function () {
    SoundManager.playCursor();
    this._onMouse = true;
    SceneManager._scene._onFkey = true;
};
Sprite_PopupInfo.prototype.onMouseExit = function () {
    this._onMouse = false;
    SceneManager._scene._onFkey = false;
};
Sprite_PopupInfo.prototype.update = function () {
    Sprite_Clickable.prototype.update.call(this);
    if (this._onMouse) {
        this.x += 20;
        if (this.x >= 0) {
            this.x = 0;
        }
    } else {
        if (this.x > -384) {
            this.x -= 20;
        } else {
            this.x = -384;
        }
    }
    if ($gameMessage.isBusy() || $gameMap.isEventRunning()) {
        this.x = -1000;
        this.hide();
    } else {
        this.show();
    }
};
Sprite_PopupInfo.prototype.setClickHandler = function (method) {
};