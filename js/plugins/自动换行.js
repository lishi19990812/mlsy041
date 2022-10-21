/*:
 * @plugindesc 自动换行
 * @author FlyRoc
 * @target MZ
 * @help
 * 实现自动换行小功能。
 */
Window_Base.prototype.processCharacter = function (textState) {
    const c = textState.text[textState.index++];
    if (c.charCodeAt(0) < 0x20) {
        this.flushTextState(textState);
        this.processControlCharacter(textState, c);
    } else {
        textState.buffer += c;
        if (textState.text) {
            var jc = textState.text.match(/RE/i);
        } else {
            var jc = null;
        }
        if (textState.x + this.textWidth(c) >= this.innerWidth && jc == null) {
            this.processNewLine(textState);
        }
    }
};

