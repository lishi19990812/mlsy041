//=============================================================================
// RPG Maker MZ - 文字居中
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 飞天大胖喵-<文字居中>
 * @author 飞天大胖喵
 * 
 * 
 * @help
 * \CT[1] 居中
 */
var Imported = Imported || {};
Imported.FlyCat_TextCenter = true;

var FlyCat = FlyCat || {};
FlyCat.TextCenter = {};
FlyCat.TextCenter.parameters = PluginManager.parameters('FlyCat_TextCenter');

FlyCat.TextCenter.Game_Message_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function () {
    FlyCat.TextCenter.Game_Message_clear.call(this);
    this._align = 0;
};

Game_Message.prototype.setAlign = function (n) {
    this._align = n;
};

Game_Message.prototype.getAlign = function (n) {
    return this._align;
};

FlyCat.TextCenter.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function (text) {
    text = FlyCat.TextCenter.Window_Base_convertEscapeCharacters.call(this, text);
    text = text.replace(/\x1bCT\[(\d+)\]/gi, function () {
        $gameMessage.setAlign(Number(arguments[1] || 0));
        return "";
    }.bind(this));
    return text;
};

Window_Base.prototype.processAlign = function () {
    switch ($gameMessage.getAlign()) {
        case 1:
            this.setAlignCenter(this._textState);
            break;
        case 2:
            this.setAlignRight(this._textState);
            break;
    }
}

FlyCat.TextCenter.Window_Base_processNewLine = Window_Base.prototype.processNewLine;
Window_Base.prototype.processNewLine = function (textState) {
    FlyCat.TextCenter.Window_Base_processNewLine.call(this, textState);
    this.processAlign();
};

Window_Base.prototype.textWidthEx = function (text) {
    return this.drawTextEx(text, 0, this.contents.height + this.lineHeight());
};

Window_Base.prototype.calcTextWidth = function (text) {
    var tempText = text; tempText = tempText.split(/[\n]+/);
    return this.textWidthEx(tempText[0]);
};

Window_Base.prototype.setAlignCenter = function (textState) {
    var padding = this.itemPadding();
    textState.tx = this.calcTextWidth(textState.text.slice(textState.index));
    textState.x = (this.newLineX(textState) + this.contentsWidth() + padding) / 2 - textState.tx / 2;
    textState.left = textState.x;
};

Window_Base.prototype.setAlignRight = function (textState) {
    var padding = this.itemPadding();
    textState.tx = this.calcTextWidth(textState.text.slice(textState.index));
    textState.x = (this.contentsWidth() - padding) - textState.tx;
    textState.left = textState.x;
};

//============================================================================
// Window_Message
//============================================================================    

FlyCat.TextCenter.Window_Message_startMessage_setAlignCenter = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function () {
    FlyCat.TextCenter.Window_Message_startMessage_setAlignCenter.call(this);
    this.processAlign();
}