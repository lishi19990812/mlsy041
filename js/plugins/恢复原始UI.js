//=============================================================================
// RPG Maker MZ - 恢复原始UI等
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<恢复原始UI>
 * @author FlyCat
 *
 * @help
 * 必须放到LL_Scenes.js下
 */
Scene_Map.prototype.callMenu = function () {
    SoundManager.playOk();
    SceneManager.push(Scene_Menu);
    Window_MenuCommand.initCommandPosition();
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
};
Scene_LL_Title.prototype.commandLoadGame = function () {
    SceneManager.push(Scene_Load);
};

