//=============================================================================
// RPG Maker MZ - 存档核心
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v2.0.0 FlyCat-<存档核心>
 * @author FlyCat
 *
 * @param maxFileNumber
 * @text 最大存档数量
 * @type number
 * @desc 存档数量上限
 * @default 5
 * 
 * @param commandFontSize
 * @text 存档指令字体大小
 * @type number
 * @desc 存档指令字体大小
 * @default 20
 * 
 * @param saveFileName
 * @text 存档
 * @type string
 * @desc 存档指令名字设置
 * @default 存档
 * 
 * @param infoSaveFile
 * @text 帮助栏-存档提示语
 * @type string
 * @desc 帮助栏-存档提示语
 * @default 确定存档吗？
 * 
 * @param loadFileName
 * @text 读档
 * @type string
 * @desc 读档指令名字设置
 * @default 读取
 *
 * @param infoLoadFile
 * @text 帮助栏-读档提示语
 * @type string
 * @desc 帮助栏-读档提示语
 * @default 确定读取存档吗？
 * 
 * @param removeFileName
 * @text 删档
 * @type string
 * @desc 删档指令名字设置
 * @default 删除
 *
 * @param removeLoadFile
 * @text 帮助栏-删档提示语
 * @type string
 * @desc 帮助栏-删档提示语
 * @default 确定删除存档吗？
 * 
 * @help
 * 2021.2.22 v2.0.0
 * 1.解决标题界面点存档会消除存档的问题
 * 2.增加读档存档判断，方便连续点击。
 * ==============================使用说明==================================
 * 1.即插即用（主要增加存档、读档、删档按钮控制）
 * ==============================使用条件==================================
 * 1. 此插件免费使用，禁止二次出售。
 * ========================================================================
 */
'use strict';
var Imported = Imported || {};
Imported.FlyCat_SaveCore = true;

var FlyCat = FlyCat || {};
FlyCat.SaveCore = {};
FlyCat.SaveCore.parameters = PluginManager.parameters('FlyCat_SaveCore');
FlyCat.SaveCore.maxFileNumber = FlyCat.SaveCore.parameters['maxFileNumber'] || 5;
FlyCat.SaveCore.commandFontSize = FlyCat.SaveCore.parameters['commandFontSize'] || 20;
FlyCat.SaveCore.saveFileName = FlyCat.SaveCore.parameters['saveFileName'] || '存档';
FlyCat.SaveCore.infoSaveFile = FlyCat.SaveCore.parameters['infoSaveFile'] || '确定存档吗？';
FlyCat.SaveCore.loadFileName = FlyCat.SaveCore.parameters['loadFileName'] || '读取';
FlyCat.SaveCore.infoLoadFile = FlyCat.SaveCore.parameters['infoLoadFile'] || '确定读取存档吗？';
FlyCat.SaveCore.removeFileName = FlyCat.SaveCore.parameters['removeFileName'] || '删除';
FlyCat.SaveCore.removeLoadFile = FlyCat.SaveCore.parameters['removeLoadFile'] || '确定删除存档吗？';
Scene_Title.prototype.commandContinue = function () {
    $gameTemp._loadFile = false;
    this._commandWindow.close();
    SceneManager.push(Scene_File);
};
Scene_Menu.prototype.commandSave = function () {
    $gameTemp._loadFile = true;
    SceneManager.push(Scene_File);
};
Scene_Map.prototype.needsFadeIn = function () {
    return (
        SceneManager.isPreviousScene(Scene_Battle) ||
        SceneManager.isPreviousScene(Scene_File)
    );
};
FlyCat.SaveCore.Scene_Save_initialize = Scene_Save.prototype.initialize;
Scene_Save.prototype.initialize = function () {
    FlyCat.SaveCore.Scene_Save_initialize.call(this);
    $gameTemp._oldIndex = null;
};

Scene_File.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    DataManager.loadAllSavefileImages();
    this.createCommandButton();
    this.createHelpWindow();
    this.createListWindow();
};
Scene_File.prototype.createCommandButton = function () {
    const rect = this.CommandButtonWindowRect();
    this._commandButtonWindow = new Window_CommandButtonWindow(rect);
    this._commandButtonWindow.setHandler("save", this.saveFile.bind(this));
    this._commandButtonWindow.setHandler("load", this.loadFile.bind(this));
    this._commandButtonWindow.setHandler("remove", this.removeFile.bind(this));
    this._commandButtonWindow.setHandler("cancel", this.onCancel.bind(this));
    this.addWindow(this._commandButtonWindow);
    if ($gameTemp._loadFile == false) {
        this._commandButtonWindow.select(1)
    }
};
Scene_File.prototype.createListWindow = function () {
    const rect = this.listWindowRect();
    this._listWindow = new Window_SavefileList(rect);
    this._listWindow.setHandler("ok", this.onSave.bind(this));
    this._listWindow.setHandler("cancel", this.popScene.bind(this));
    this._listWindow.setMode(this.mode(), this.needsAutosave());
    this._listWindow.selectSavefile(this.firstSavefileId());
    this._listWindow.refresh();
    this.addWindow(this._listWindow);
    this._commandButtonWindow.setListWindow(this._listWindow);
};

Scene_File.prototype.createHelpWindow = function () {
    const rect = this.helpWindowRect();
    this._helpWindow = new Window_Help(rect);
    this.addWindow(this._helpWindow);
    this._commandButtonWindow.setHelpWindow(this._helpWindow);
    if ($gameTemp._loadFile == false) {
        this._helpWindow.setText(this._commandButtonWindow.helpWindowText(1))
    }
    else {
        this._helpWindow.setText(this._commandButtonWindow.helpWindowText(0));
    }
};

Scene_File.prototype.removeFile = function () {
    const savefileId = this.savefileId();
    const saveName = "file" + savefileId;
    StorageManager.remove(saveName);
    DataManager._globalInfo[savefileId] = null;
    SoundManager.playSave();
    this._listWindow.refresh();
    this._listWindow.activate();
    this._commandButtonWindow.deactivate();
}

Scene_File.prototype.saveFile = function () {
    if ($gameTemp._loadFile != true) {
        SoundManager.playBuzzer();
        this._listWindow.activate();
        this._commandButtonWindow.deactivate();
        return;
    }
    if (this._listWindow.index() == 0) {
        SoundManager.playBuzzer();
        this._listWindow.activate();
        this._commandButtonWindow.deactivate();
        return;
    }
    const savefileId = this.savefileId();
    if (this.isSavefileEnabled(savefileId)) {
        this.executeSave(savefileId);
    } else {
        this.onSaveFailure();
    }
}
Scene_File.prototype.firstSavefileId = function () {
    return 0;
};
Scene_File.prototype.loadFile = function () {
    const savefileId = this.savefileId();
    if (this.isSavefileEnabled(savefileId)) {
        this.executeLoad(savefileId);
    } else {
        this.onLoadFailure();
    }
}
Scene_File.prototype.modeSelect = function (mode) {
    this._listWindow.setMode(mode, this.needsAutosave());
    this._listWindow.selectSavefile(this.firstSavefileId(mode));
}

Scene_File.prototype.onSave = function () {
    SoundManager.playOk();
    $gameTemp._oldIndex = this._listWindow.index();
    this._listWindow.deactivate();
    this._commandButtonWindow.activate();
    if ($gameTemp._loadFile == true) {
        this._commandButtonWindow.select(0);
    }
    else {
        this._commandButtonWindow.select(1);
    }
};
Scene_File.prototype.onCancel = function () {
    this._listWindow.activate();
    this._commandButtonWindow.deactivate();
};

Scene_File.prototype.executeSave = function (savefileId) {
    $gameSystem.setSavefileId(savefileId);
    $gameSystem.onBeforeSave();
    DataManager.saveGame(savefileId)
        .then(() => this.onSaveSuccess())
        .catch(() => this.onSaveFailure());
};

Scene_File.prototype.onSaveSuccess = function () {
    SoundManager.playSave();
    this._listWindow.refresh();
    this._listWindow.activate();
    this._commandButtonWindow.deactivate();
};

Scene_File.prototype.onSaveFailure = function () {
    SoundManager.playBuzzer();
    this.activateListWindow();
};
Scene_File.prototype.activateListWindow = function () {
    this._listWindow.activate();
    this._commandButtonWindow.deactivate();
};
/////////////////////Load////////////////////
Scene_File.prototype.terminate = function () {
    if (this._loadSuccess) {
        $gameSystem.onAfterLoad();
    }
};
Scene_File.prototype.executeLoad = function (savefileId) {
    DataManager.loadGame(savefileId)
        .then(() => this.onLoadSuccess())
        .catch(() => this.onLoadFailure());
};
Scene_File.prototype.onLoadSuccess = function () {
    SoundManager.playLoad();
    this.fadeOutAll();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
    this._loadSuccess = true;
};
Scene_File.prototype.onLoadFailure = function () {
    SoundManager.playBuzzer();
    this.activateListWindow();
};

Scene_File.prototype.reloadMapIfUpdated = function () {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        const mapId = $gameMap.mapId();
        const x = $gamePlayer.x;
        const y = $gamePlayer.y;
        $gamePlayer.reserveTransfer(mapId, x, y);
        $gamePlayer.requestMapReload();
    }
};
/////////////////////////////////////////
Scene_File.prototype.CommandButtonWindowRect = function () {
    const wx = 0;
    const wy = this.mainAreaTop();
    const ww = Graphics.boxWidth;
    const wh = 100;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_File.prototype.listWindowRect = function () {
    const wx = 0;
    const wy = this.mainAreaTop() + this._helpWindow.height + this._commandButtonWindow.height;
    const ww = Graphics.boxWidth;
    const wh = this.mainAreaHeight() - this._helpWindow.height - this._commandButtonWindow.height;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_File.prototype.helpWindowRect = function () {
    const wx = 0;
    const wy = this.mainAreaTop() + this._commandButtonWindow.height;
    const ww = Graphics.boxWidth;
    const wh = this.calcWindowHeight(1, false);
    return new Rectangle(wx, wy, ww, wh);
};
/////////////////////////////////帮助/////////////////////////////
Window_Help.prototype.refresh = function () {
    this.contents.fontSize = 20;
    const rect = this.baseTextRect();
    this.contents.clear();
    this.drawText(this._text, rect.x, rect.y, rect.width);
    this.contents.fontSize = 14;
};
////////////////////////////////////命令//////////////////////////////
function Window_CommandButtonWindow() {
    this.initialize(...arguments);
}
Window_CommandButtonWindow.prototype = Object.create(Window_Command.prototype);
Window_CommandButtonWindow.prototype.constructor = Window_CommandButtonWindow;

Window_CommandButtonWindow.prototype.initialize = function (rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this._lastIndexCom = -2;
    this.deactivate();

};
Window_CommandButtonWindow.prototype.makeCommandList = function () {
    this.contents.fontSize = FlyCat.SaveCore.commandFontSize;
    this.addCommand(FlyCat.SaveCore.saveFileName, "save", $gameTemp._loadFile);
    this.addCommand(FlyCat.SaveCore.loadFileName, "load", true);
    this.addCommand(FlyCat.SaveCore.removeFileName, "remove", true);
}
Window_CommandButtonWindow.prototype.maxItems = function () {
    return 3;
};
Window_CommandButtonWindow.prototype.numVisibleRows = function () {
    return 1;
};
Window_CommandButtonWindow.prototype.maxCols = function () {
    return 3;
};
Window_CommandButtonWindow.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
Window_CommandButtonWindow.prototype.helpWindowText = function (index) {
    if (index == 0) {
        return FlyCat.SaveCore.infoSaveFile;
    }
    if (index == 1) {
        return FlyCat.SaveCore.infoLoadFile;
    }
    if (index == 2) {
        return FlyCat.SaveCore.removeLoadFile;
    }
};
Window_CommandButtonWindow.prototype.setListWindow = function (object) {
    this._setListWindow = object;
};
Window_CommandButtonWindow.prototype.setHelpWindow = function (object) {
    this._setHelpWindow = object;
};

FlyCat.SaveCore.Window_CommandButtonWindow_select = Window_CommandButtonWindow.prototype.select;
Window_CommandButtonWindow.prototype.select = function (index) {
    FlyCat.SaveCore.Window_CommandButtonWindow_select.call(this, index)
    if (index >= 0 && index != this._lastIndexCom && this._setListWindow) {
        this._fileIndex = index;
        this._lastIndexCom = index;
        if (index == 0) {
            this._setHelpWindow.setText(this.helpWindowText(0));
            this._setListWindow.setMode("save", $gameSystem.isAutosaveEnabled());
            this._setListWindow.selectSavefile($gameTemp._oldIndex);
            this._setListWindow.refresh();
        }
        if (index == 1) {
            this._setHelpWindow.setText(this.helpWindowText(1));
            this._setListWindow.setMode("load", $gameSystem.isAutosaveEnabled())
            this._setListWindow.selectSavefile($gameTemp._oldIndex);
            this._setListWindow.refresh();
        }
        if (index == 2) {
            this._setHelpWindow.setText(this.helpWindowText(2));
            this._setListWindow.setMode("remove", $gameSystem.isAutosaveEnabled())
            this._setListWindow.selectSavefile($gameTemp._oldIndex);
            this._setListWindow.refresh();
        }
    }
};
//////////////////////////////////Data///////////////////////////
DataManager.maxSavefiles = function () {
    return FlyCat.SaveCore.maxFileNumber;
};