
//=============================================================================
// RPG Maker MZ - 对话立绘
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat<对话立绘>
 * @author FlyCat
*/
var old_Window_Message_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function (rect) {
    old_Window_Message_initialize.call(this, rect);
    this.createLLTalkSprite();

};
Window_Message.prototype.createLLTalkSprite = function () {
    this._llTalkSprite = new Sprite();
    this.addChild(this._llTalkSprite);
};
Window_Message.prototype.drawMessageFace = function () {
    if ($gameSystem._menuActorPicture) {
        var img = $gameSystem._menuActorPicture;
    }
    else {
        var img = FlyCat.LL_SceneMenu.sceneMenuPicture;
    }
    this._llTalkSprite.bitmap = ImageManager.loadBitmap('img/menu/', img);
    this._llTalkSprite.anchor.set(0.5)
    this._llTalkSprite.x = 300;
    this._llTalkSprite.y = -100;
};
Window_Message.prototype.startMessage = function () {
    const text = $gameMessage.allText();
    const textState = this.createTextState(text, 0, 0, 0);
    textState.x = this.newLineX(textState);
    textState.startX = textState.x;
    this._textState = textState;
    this.newPage(this._textState);
    this.updatePlacement();
    this.updateBackground();
    this.open();
    this._nameBoxWindow.start();
};