//=============================================================================
// RPG Maker MZ - 标题场景修改
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<标题场景修改>
 * @author FlyCat
 * 
 * @param URL
 * @text 网址
 * @desc 网址
 * @default 

 * @help
 */
var Imported = Imported || {};
Imported.FlyCat_SceneTitle = true;

var FlyCat = FlyCat || {};
FlyCat.SceneTitle = {};
FlyCat.SceneTitle.parameters = PluginManager.parameters('FlyCat_SceneTitle');
FlyCat.SceneTitle.URL = String(FlyCat.SceneTitle.parameters['URL']);


Scene_GameEnd.prototype.commandToTitle = function () {
    this.fadeOutAll();
    $gameTemp.setTitleStatic(false);
    SceneManager.goto(Scene_LL_Title);
    Window_TitleCommand.initCommandPosition();
};

Scene_LL_Title.prototype.createMenuButtons = function () {
    var x = 1000;
    var y = 330;
    for (let i = 0; i < 5; i++) {
        this._menuButtonSprite[i] = new Sprite_menuButtons();
        this.addChild(this._menuButtonSprite[i]);
        this._menuButtonSprite[i]._buttonId = i;
        this._menuButtonSprite[i].bitmap = ImageManager.loadBitmap('img/menu/', "button_" + i)
        var ofx = 0;
        if (i == 1 || i == 3) var ofx = 30;
        this._menuButtonSprite[i].x = x + ofx;
        this._menuButtonSprite[i].y = y;
        this._menuButtonSprite[i].hide();
        y += 80;
    }
    this._cursorSprtie = new Sprite();
    this.addChild(this._cursorSprtie);
    this._cursorSprtie.bitmap = ImageManager.loadBitmap('img/menu/', '按键箭头');
    this._cursorSprtie.hide();
};
var old_Scene_LL_Title_update = Scene_LL_Title.prototype.update;
Scene_LL_Title.prototype.update = function () {
    old_Scene_LL_Title_update.call(this);
    if (this._commandWindow && this._commandWindow.index() >= 0 && this._cursorSprtie && this._menuButtonSprite[this._commandWindow.index()]) {
        this._cursorSprtie.x = this._menuButtonSprite[this._commandWindow.index()].x - 80;
        this._cursorSprtie.y = this._menuButtonSprite[this._commandWindow.index()].y - 10;
    }
    if (this._flyPlayBg == true) {
        this._flyPlayBgCounts++;
        if (this._flyPlayBgCounts >= 40) {
            if (this._menuButtonSprite) {
                for (let i = 0; i < 5; i++) {
                    this._menuButtonSprite[i].show();
                }
            }
            this._cursorSprtie.show();
            this._flyPlayBg = false;
            this._commandWindow.open();
            this._commandWindow.activate();
            if (Imported.FlyCat_PictureTitle) {
                for (let i = 0; i < this._pictureTitle.length; i++) {
                    this._pictureTitle[i].show();
                };
            }
            if (DataManager.isAnySavefileExists()) {
                this._commandWindow.select(1);
            }
            else {
                this._commandWindow.select(0);
            }
            this._flyPlayBgCounts = 0;
        }
    }
};
var old_Scene_LL_Title_createCommandWindow = Scene_LL_Title.prototype.createCommandWindow;
Scene_LL_Title.prototype.createCommandWindow = function () {
    old_Scene_LL_Title_createCommandWindow.call(this);
    this._commandWindow.setHandler('url', this.gotoUrl.bind(this));
};
Scene_LL_Title.prototype.gotoUrl = function () {
    const url = FlyCat.SceneTitle.URL;
    if (!Utils.isNwjs()) {
        window.open(url, '_blank');
    } else {
        var type = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
        require('child_process').exec(type + ' ' + url);
    };
    this._commandWindow.activate();
};
Window_TitleCommand.prototype.makeCommandList = function () {
    const continueEnabled = this.isContinueEnabled();
    this.addCommand(TextManager.newGame, "newGame");
    this.addCommand(TextManager.continue_, "loadGame", continueEnabled);
    // this.addCommand(TextManager.options, "options");
    this.addCommand('回忆录', "reading", true);
    this.addCommand('网站', "url", true);
    this.addCommand('退出', "exit", true);
};
/*LOGO精灵等*/
Sprite_TitleBg.prototype.initialize = function (static) {
    var img = '封面1';
    if (ConfigManager._saveVariables && ConfigManager._saveVariables[15]) {
        const value = Number(ConfigManager._saveVariables[15])
        if (value >= 99) var img = '封面2';
        if (value >= 500) var img = '封面3';
    }
    Sprite.prototype.initialize.call(this, ImageManager.loadUi(img));
    this.opacity = static ? 255 : 0;
};

Sprite_GameLogo.prototype.initialize = function (static) {
    Sprite.prototype.initialize.call(this, ImageManager.loadUi('标题'));
    this.setup(static);
};
Sprite_GameLogo.prototype.setup = function (static) {
    this.opacity = static ? 255 : 0;
    if (static) this.move(1108, 0);
    else {
        this.startAction({ 'count': 60, 'op': 5, 'body': true });
        this.startAction({ 'count': 29, 'mx': 16, 'my': -6, 'body': true });
        this.move(505, 180);
    }
};
Sprite_GameLogo.prototype.onActionEnd = function () {
    this.parent.startDisplyOther();
};

/*粒子*/
TitleMask_Item.prototype.initialize = function (type) {
    Sprite.prototype.initialize.call(this, ImageManager.loadUi('花瓣'));
    const s = Math.min(1, Math.random() + 0.4);
    this.anchor = new Point(0.5, 0.5);
    this.scale = new Point(s, s);
    this.setup();
};
TitleMask_Item.prototype.refreshFrame = function (type) {
    // const rect = this.getFrameRect(type);
    // this.setFrame(rect.x, rect.y, rect.width, rect.height);
};
/*按钮精灵*/
function Sprite_menuButtons() {
    this.initialize(...arguments);
}
Sprite_menuButtons.prototype = Object.create(Sprite_Clickable.prototype);
Sprite_menuButtons.prototype.constructor = Sprite_menuButtons;

Sprite_menuButtons.prototype.initialize = function () {
    Sprite_Clickable.prototype.initialize.call(this);
    this._clickHandler = null;
    this._buttonId = -1;
};

Sprite_menuButtons.prototype.onClick = function () {
    SceneManager._scene._commandWindow.select(this._buttonId);
    SceneManager._scene._commandWindow.processOk();
};

Sprite_menuButtons.prototype.onMouseEnter = function () {
    if (SceneManager._scene._flyOnCommand == 0) {
        SoundManager.playCursor();
        SceneManager._scene._commandWindow.select(this._buttonId);
    }
};

Sprite_menuButtons.prototype.update = function () {
    Sprite_Clickable.prototype.update.call(this);
};
Sprite_menuButtons.prototype.onMouseExit = function () {
};
Sprite_menuButtons.prototype.setClickHandler = function (method) {
    this._clickHandler = method;
};