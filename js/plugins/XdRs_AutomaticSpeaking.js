//=================================================================================================
// Automatic_Speaking.js
//=================================================================================================
/*:
* @target MZ
* @plugindesc 靠近事件说话
* @author 芯☆淡茹水
* @help
*
* 〓 功能 〓 
* 靠近事件说话，事件 - 注释 备注: <AS><WS:Window2>今天天气真好啊！
* 可照格式备注多条注释，实际的泡泡窗口内容就在这些里面随机。
*
*
* @param windowskins
* @text 窗口皮肤图片文件名登记
* @desc 格式：皮肤1,皮肤2,皮肤3....。（只有写入这里的窗口皮肤，随机皮肤或更改皮肤时才生效）。
* @default
*
*
*/
//=================================================================================================
; var XdRsData = XdRsData || {};
XdRsData.as = XdRsData.as || {};
XdRsData.as.parameters = PluginManager.parameters('XdRs_AutomaticSpeaking');
//=================================================================================================
XdRsData.as.isMz = function () {
    return Utils.RPGMAKER_NAME === 'MZ';
};
XdRsData.as.setup = function () {
    this.reserveWindowskins();
};
XdRsData.as.setupAllWindowskins = function () {
    var note = this.parameters['windowskins'] || '';
    this._windowskins = note.split(',');
};
XdRsData.as.isWindowskinEnabled = function (name) {
    if (!name) return false;
    if (name === 'Window') return true;
    return this._windowskins && this._windowskins.contains(name);
};
XdRsData.as.reserveWindowskins = function () {
    this.setupAllWindowskins();
    for (var i = 0; i < this._windowskins.length; ++i) {
        var name = this._windowskins[i];
        ImageManager[this.isMz() ? 'loadSystem' : 'reserveSystem'](name);
    }
};
XdRsData.as.getRandomWindowskin = function () {
    var arr = ['Window'].concat(this._windowskins || []);
    return arr[Math.randomInt(arr.length)];
};
//=================================================================================================
XdRsData.as.SceneManager_initialize = SceneManager.initialize;
SceneManager.initialize = function () {
    XdRsData.as.SceneManager_initialize.call(this);
    XdRsData.as.setup();
};
//=================================================================================================
Game_Character.prototype.speakingText = function () {
    return this._speakingText || '';
};
Game_Character.prototype.changeSpeakingText = function (text) {
    this._speakingText = text;
};
Game_Character.prototype.isForbiddenSpeaking = function () {
    return this._forbiddenSpeakingSign;
};
Game_Character.prototype.setForbiddenSpeakingSign = function (state) {
    this._forbiddenSpeakingSign = state;
};
//=================================================================================================
Game_Event.prototype.isNearPlayer = function () {
    return $gameMap.distance(this._x, this._y, $gamePlayer.x, $gamePlayer.y) === 1;
};
Game_Event.prototype.isForbiddenSpeaking = function () {
    return this._pageIndex < 0 || this._locked ||
        Game_Character.prototype.isForbiddenSpeaking.call(this);
};
XdRsData.as.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function () {
    XdRsData.as.Game_Event_setupPage.call(this);
    this.setupAutomaticSpeakingData();
};
Game_Event.prototype.setupAutomaticSpeakingData = function () {
    this.setForbiddenSpeakingSign(true);
    this._automaticSpeakingData = [];
    if (this._pageIndex < 0) return;
    var list = this.list();
    if (list && list.length > 1) {
        for (var i = 0; i < list.length; ++i) {
            if (list[i].code === 108 && /<AS>/.test(list[i].parameters[0])) {
                this._automaticSpeakingData.push(i);
            }
        }
    }
};
XdRsData.as.Game_Event_start = Game_Event.prototype.start;
Game_Event.prototype.start = function () {
    this.setForbiddenSpeakingSign(true);
    XdRsData.as.Game_Event_start.call(this);
};
XdRsData.as.Game_Event_erase = Game_Event.prototype.erase;
Game_Event.prototype.erase = function () {
    this.setForbiddenSpeakingSign(true);
    XdRsData.as.Game_Event_erase.call(this);
};
Game_Event.prototype.isOnScreen = function () {
    var ax = $gameMap.adjustX(this._x), ay = $gameMap.adjustY(this._y);
    if (ax < 0 || ay < 0) return false;
    var tx = $gameMap.screenTileX(), ty = $gameMap.screenTileY();
    return ax <= tx && ay <= ty;
};
Game_Event.prototype.canAutomaticSpeaking = function () {
    if (this.isForbiddenSpeaking() || !this._automaticSpeakingData) return false;
    if (this._automaticSpeakingData.length === 0) return false;
    return this.isNearPlayer();
};
Game_Event.prototype.setupAutomaticSpeaking = function () {
    var len = this._automaticSpeakingData.length;
    var index = this._automaticSpeakingData[Math.randomInt(len)];
    var list = this.list();
    if (list[index].code === 108) {
        var text = list[index].parameters[0];
        while (list[index + 1].code === 408) {
            index++;
            text += '\n' + list[index].parameters[0];
        }

        this.changeSpeakingText(text.replace(/<AS>/, ''));
    }
};
XdRsData.as.Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function () {
    XdRsData.as.Game_Event_update.call(this);
    this.updateAutomaticSpeaking();
};
Game_Event.prototype.updateAutomaticSpeaking = function () {
    if (this._wasNear !== this.canAutomaticSpeaking()) {
        this._wasNear = this.canAutomaticSpeaking();
        if (this._wasNear) this.setupAutomaticSpeaking();
        else this.setForbiddenSpeakingSign(true);
    }
};
//=================================================================================================
function Window_AutomaticSpeaking() {
    this.initialize.apply(this, arguments);
}
Window_AutomaticSpeaking.prototype = Object.create(Window_Base.prototype);
Window_AutomaticSpeaking.prototype.constructor = Window_AutomaticSpeaking;
Window_AutomaticSpeaking.prototype.initialize = function (text, objSprite) {
    text = this.analysisNote(text);
    this.callSuperInitialize(0, 0, 32, 32);
    this._objSprite = objSprite;
    this.resetWindow(text);
    text = text.replace(/RE/, '')
    console.log(text)
    this.drawTextEx(text, 0, 0);
    this.pause = true;
    this.z = 9;
    this.hide();
};
Window_AutomaticSpeaking.prototype.callSuperInitialize = function (x, y, w, h) {
    var args = XdRsData.as.isMz() ? [new Rectangle(x, y, w, h)] : [x, y, w, h];
    Window_Base.prototype.initialize.apply(this, args);
};
Window_AutomaticSpeaking.prototype.analysisNote = function (text) {
    text = text.replace(/<WT:(\d+)>/g, '');
    text = text.replace(/<WS:(\S+)>/g, function (tx) {
        tx.match(/<WS:(\S+)>/);
        this._windowskinName = RegExp.$1;
        return '';
    }.bind(this));
    text = text.replace(/<DR:(\d+)>/g, function (tx) {
        tx.match(/<DR:(\d+)>/);
        this._duration = Math.max(+RegExp.$1, 60);
        return '';
    }.bind(this));
    if (!this._windowskinName) {
        this._windowskinName = XdRsData.as.getRandomWindowskin();
    }
    return text;
};
Window_AutomaticSpeaking.prototype.resetWindow = function (text) {
    var data = this.getTextSizeExData(text);
    this.width = data.width + this._padding * 2;
    this.height = data.height + this._padding * 2;
    // if (this.height > 128) {
    //     this.height = 128
    // }
    this.createContents();
    var sprite = XdRsData.as.isMz() ? this._pauseSignSprite : this._windowPauseSignSprite;
    sprite && sprite.move(this.width / 2, this.height + 24);
};
Window_AutomaticSpeaking.prototype.getTextSizeExData = function (text) {
    if (XdRsData.as.isMz()) return this.textSizeEx(text);
    else {
        var test = new Window_Base(0, 0, 32, 32);
        test.drawTextEx(text, 0, 0);
        return test.getTextExData(0, 0);
    };
};
Window_AutomaticSpeaking.prototype.loadWindowskin = function () {
    const result = XdRsData.as.isWindowskinEnabled(this._windowskinName);
    const name = result ? this._windowskinName : 'Window';
    this.windowskin = ImageManager.loadSystem(name);
};
Window_AutomaticSpeaking.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (this._objSprite) {
        this.updatePosition();
    }
};
Window_AutomaticSpeaking.prototype.updatePosition = function () {
    const sprite = this._objSprite;
    this.x = sprite.x - this.width / 2;
    this.y = sprite.y - sprite.patternHeight() - this.height - 24;
    if (!this.visible) this.show();
};
//=================================================================================================
Sprite_Character.prototype.isAutomaticSpeaking = function () {
    return !!this._speakingWindow;
};
Sprite_Character.prototype.createSpeakingWindow = function (text) {
    this.removeSpeakingWindow();
    this._speakingWindow = new Window_AutomaticSpeaking(text, this);
    this.parent.addChild(this._speakingWindow);
};
Sprite_Character.prototype.removeSpeakingWindow = function () {
    if (this.isAutomaticSpeaking()) {
        this.parent.removeChild(this._speakingWindow);
        if (XdRsData.as.isMz()) this._speakingWindow.destroy();
        this._speakingWindow = null;
    }
};
XdRsData.as.Sprite_Character_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function () {
    XdRsData.as.Sprite_Character_update.call(this);
    this.updateAutomaticSpeaking();
};
Sprite_Character.prototype.updateAutomaticSpeaking = function () {
    if (!(this._character instanceof Game_Event)) return;
    if (this._character.isForbiddenSpeaking()) {
        this._character.setForbiddenSpeakingSign(false);
        this.isAutomaticSpeaking() && this.removeSpeakingWindow();
    } else {
        if (this._character.speakingText()) {
            this.createSpeakingWindow(this._character.speakingText());
            this._character.changeSpeakingText('');
        }
    }
};
//=================================================================================================
// end
//=================================================================================================