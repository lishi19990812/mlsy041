
//=============================================================================
// RPG Maker MZ - 对话立绘
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<对话立绘>
 * @author FlyCat
 * 
 * @param talkPicture
 * @text 对话立绘基础图片
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @help
 * ==============================使用说明===============================
 * 设置对话立绘基础图片
 * 在对话中写入\F[X]就可显示立绘  X为表情图片序号
 * 例：\F[1] 显示立绘并显示第一个表情
 * ==============================物品备注===============================
 * 在防具备注中写如下指令：
 * <对话立绘换装:文件名>
 * 注意：对话图文件放置img/menu/下
 * =====================================================================
*/
'use strict';
var Imported = Imported || {};
Imported.FlyCat_LL_TalkPicture = true;

var FlyCat = FlyCat || {};
FlyCat.LL_TalkPicture = {};
FlyCat.LL_TalkPicture.parameters = PluginManager.parameters('FlyCat_LL_TalkPicture');
FlyCat.LL_TalkPicture.talkPicture = String(FlyCat.LL_TalkPicture.parameters['talkPicture']);
FlyCat.LL_TalkPicture.Window_Message_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function (rect) {
    FlyCat.LL_TalkPicture.Window_Message_initialize.call(this, rect);
    this.createLLTalkSprite();
};
Window_Message.prototype.createLLTalkSprite = function () {
    this._llTalkSprite = new Sprite();
    this.addChild(this._llTalkSprite);
    this._llTalkSprite_1 = new Sprite();
    this.addChild(this._llTalkSprite_1);
    this._llTalkSprite_2 = new Sprite();
    this.addChild(this._llTalkSprite_2);
};
FlyCat.LL_TalkPicture.Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function () {
    const faceEye = $gameMessage.allText().match(/\\F\[(\w+)\]/);
    this._llTalkSprite.bitmap = null;
    this._llTalkSprite_1.bitmap = null;
    this._llTalkSprite_2.bitmap = null;
    if (faceEye) {
        const faceId = faceEye[1];
        this._llTalkSprite_2.bitmap = ImageManager.loadBitmap('img/menu/', '对话立绘-表情' + faceId);
        var img = FlyCat.LL_TalkPicture.talkPicture;
        this._llTalkSprite.bitmap = ImageManager.loadBitmap('img/menu/', img);
        if ($gameSystem._talkPicture) {
            var img = $gameSystem._talkPicture;
            this._llTalkSprite_1.bitmap = ImageManager.loadBitmap('img/menu/', img);
        }
        const x = 1050;
        const y = -70;
        this._llTalkSprite.anchor.set(0.5);
        this._llTalkSprite_1.anchor.set(0.5);
        this._llTalkSprite_2.anchor.set(0.5);
        this._llTalkSprite.x = x;
        this._llTalkSprite.y = y;
        this._llTalkSprite_1.x = x;
        this._llTalkSprite_1.y = y;
        this._llTalkSprite_2.x = x;
        this._llTalkSprite_2.y = y;
    }
    FlyCat.LL_TalkPicture.Window_Message_startMessage.call(this)
};
FlyCat.LL_TalkPicture.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function (text) {
    text = text.replace(/\\F\[(\w+)\]/gi, "");
    return FlyCat.LL_TalkPicture.Window_Base_convertEscapeCharacters.call(this, text);
};
FlyCat.LL_TalkPicture.Window_Message_update = Window_Message.prototype.update;
Window_Message.prototype.update = function () {
    FlyCat.LL_TalkPicture.Window_Message_update.call(this);
    if (this._llTalkSprite && this._llTalkSprite_1 && this._llTalkSprite_2) {
        this._breatheCount++;
        if (this._breatheCount < 61) {
            this._llTalkSprite.scale.y += 0.0002;
            this._llTalkSprite_1.scale.y += 0.0002;
            this._llTalkSprite_2.scale.y += 0.0002;
        }
        else if (this._breatheCount > 60 && this._breatheCount <= 120) {
            this._llTalkSprite.scale.y -= 0.0002;
            this._llTalkSprite_1.scale.y -= 0.0002;
            this._llTalkSprite_2.scale.y -= 0.0002;
        }
        else {
            this._breatheCount = 0;
            this._llTalkSprite.scale.y = 1;
            this._llTalkSprite_1.scale.y = 1;
            this._llTalkSprite_2.scale.y = 1;
        }
    }
}