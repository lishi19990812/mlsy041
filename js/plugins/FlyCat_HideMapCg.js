//=============================================================================
// RPG Maker MZ - 隐藏地图CG
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<隐藏地图CG>
 * @author FlyCat
 * @help
 * 
 */
'use strict';
var Imported = Imported || {};
Imported.FlyCat_AnimationOptions = true;

var FlyCat = FlyCat || {};
FlyCat.HideMapCg = {};
FlyCat.HideMapCg.parameters = PluginManager.parameters('FlyCat_HideMapCg');

ConfigManager.HideMapCg = true;
FlyCat.HideMapCg.Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function () {
    FlyCat.HideMapCg.Window_Options_addGeneralOptions.call(this);
    //   this.addCommand('地图CG开关', "HideMapCg", true);
};
FlyCat.HideMapCg.Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function () {
    const indexs = this.index();
    const symbols = String(this.commandSymbol(indexs));
    if (symbols == 'HideMapCg') {
        $gameSystem._mapCgVisible = $gameSystem._mapCgVisible ? false : true;
    }
    FlyCat.HideMapCg.Window_Options_processOk.call(this)

};
FlyCat.HideMapCg.Window_Options_cursorRight = Window_Options.prototype.cursorRight
Window_Options.prototype.cursorRight = function () {
    const indexs = this.index();
    const symbols = String(this.commandSymbol(indexs));
    if (symbols == 'HideMapCg') {
        $gameSystem._mapCgVisible = $gameSystem._mapCgVisible ? false : true;
    }
    FlyCat.HideMapCg.Window_Options_cursorRight.call(this)
};
FlyCat.HideMapCg.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function () {
    const indexs = this.index();
    const symbols = String(this.commandSymbol(indexs));
    if (symbols == 'HideMapCg') {
        $gameSystem._mapCgVisible = $gameSystem._mapCgVisible ? false : true;
    }
    FlyCat.HideMapCg.Window_Options_cursorLeft.call(this)
};
Window_Options.prototype.booleanStatusText = function (value) {
    return value ? "开启" : "关闭";
};
Scene_Options.prototype.maxCommands = function () {
    // Increase this value when adding option items.
    return 7;
};