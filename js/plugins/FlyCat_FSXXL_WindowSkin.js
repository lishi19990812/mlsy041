
//=============================================================================
// RPG Maker MZ - 对话框改变
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<对话框改变>
 * @author FlyCat
 * 
 * @command chanageWindowskin
 * @text 设置对话框
 * @desc 设置对话框
 *
 * @arg name
 * @type string
 * @text 选择对话框
 * @desc 选择对话框
 * @require 1
 * @dir img/system/
 * @type file
 * 
 * @command removeWindowskin
 * @text 还原对话框
 * @desc 还原对话框
 * 
 * @help
 */
'use strict';
var Imported = Imported || {};
Imported.FlyCat_FSXXL_WindowSkin = true;

var FlyCat = FlyCat || {};
FlyCat.FSXXL_WindowSkin = {};
FlyCat.FSXXL_WindowSkin.parameters = PluginManager.parameters('FlyCat_FSXXL_WindowSkin');

PluginManager.registerCommand('FlyCat_FSXXL_WindowSkin', 'chanageWindowskin', args => {
    $gameSystem._flyCatWindowSkin = String(args.name);
});
PluginManager.registerCommand('FlyCat_FSXXL_WindowSkin', 'removeWindowskin', args => {
    $gameSystem._flyCatWindowSkin = "Window";
});
FlyCat.FSXXL_WindowSkin.Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function () {
    if (!$gameSystem._flyCatWindowSkin) $gameSystem._flyCatWindowSkin = "Window";
    this.windowskin = ImageManager.loadSystem($gameSystem._flyCatWindowSkin);
    FlyCat.FSXXL_WindowSkin.Window_Message_startMessage.call(this);
};


Window_NameBox.prototype.refresh = function () {
    if (!$gameSystem._flyCatWindowSkin) $gameSystem._flyCatWindowSkin = "Window";
    this.windowskin = ImageManager.loadSystem($gameSystem._flyCatWindowSkin);
    const rect = this.baseTextRect();
    this.contents.clear();
    this.drawTextEx(this._name, rect.x, rect.y, rect.width);
};