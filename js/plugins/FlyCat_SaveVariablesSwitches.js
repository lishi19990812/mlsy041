//=============================================================================
// RPG Maker MZ - 跨存档变量/开关
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 飞天大胖喵-<跨存档变量/开关>
 * @author 飞天大胖喵
 * 
 * @param saveVariables
 * @text 变量设置
 * @type struct<saveVariables>[]
 * @default
 * 
 * @param saveSwitches
 * @text 开关设置
 * @type struct<saveSwitches>[]
 * @default
 * 
 * @help
 * ==============================使用说明==================================
 * 在插件配置内配置夸存档变量
 * ========================================================================
 * 1.以兼容飞猫存档核心 FlyCat_SaveCore.js
 * 2.定制MZ/MV插件联系 QQ：903516931 飞天大胖喵
 */
/*~struct~saveVariables:
* @param variablesId
* @text 设置跨存档变量Id
* @desc 设置跨存档变量Id
* @type variable
*/
/*~struct~saveSwitches:
* @param switchesId
* @text 设置跨存档开关Id
* @desc 设置跨存档开关Id
* @type switch
*/
var Imported = Imported || {};
Imported.FlyCat_SaveVariablesSwitches = true;

var FlyCat = FlyCat || {};
FlyCat.SaveVariables = {};
FlyCat.SaveVariables.parameters = PluginManager.parameters('FlyCat_SaveVariablesSwitches');
FlyCat.SaveVariables.saveVariables = JSON.parse(FlyCat.SaveVariables.parameters['saveVariables'] || '[]');
FlyCat.SaveVariables.saveSwitches = JSON.parse(FlyCat.SaveVariables.parameters['saveSwitches'] || '[]');
if (FlyCat.SaveVariables.saveVariables) {
    const max = FlyCat.SaveVariables.saveVariables.length;
    for (let i = 0; i < max; i++) {
        FlyCat.SaveVariables.saveVariables[i] = JSON.parse(FlyCat.SaveVariables.saveVariables[i])
    }
};
if (FlyCat.SaveVariables.saveSwitches) {
    const max = FlyCat.SaveVariables.saveSwitches.length;
    for (let i = 0; i < max; i++) {
        FlyCat.SaveVariables.saveSwitches[i] = JSON.parse(FlyCat.SaveVariables.saveSwitches[i])
    }
};

FlyCat.SaveVariables.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function () {
    const config = FlyCat.SaveVariables.ConfigManager_makeData.call(this);
    config.saveVariables = this._saveVariables;
    config.saveSwitches = this._saveSwitches;
    return config;
};
FlyCat.SaveVariables.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function (config) {
    FlyCat.SaveVariables.ConfigManager_applyData.call(this, config)
    this._saveVariables = this.readSaveVariables(config, "saveVariables");
    this._saveSwitches = this.readSaveVariables(config, "saveSwitches");
};
ConfigManager.readSaveVariables = function (config, name) {
    if (name in config) {
        return config[name];
    } else {
        return null;
    }
};

if (Imported.FlyCat_SaveCore) {
    FlyCat.SaveVariables.Scene_File_executeSave = Scene_File.prototype.executeSave;
    Scene_File.prototype.executeSave = function (savefileId) {
        DataManager.SaveVariables();
        DataManager.SaveSwitches();
        FlyCat.SaveVariables.Scene_File_executeSave.call(this, savefileId)
    };
    FlyCat.SaveVariables.Scene_File_onLoadSuccess = Scene_File.prototype.onLoadSuccess;
    Scene_File.prototype.onLoadSuccess = function () {
        DataManager.LoadVariables();
        DataManager.LoadSwitches();
        FlyCat.SaveVariables.Scene_File_onLoadSuccess.call(this);
    };
}
else {
    FlyCat.SaveVariables.Scene_Save_executeSave = Scene_Save.prototype.executeSave;
    Scene_Save.prototype.executeSave = function (savefileId) {
        DataManager.SaveVariables();
        DataManager.SaveSwitches();
        FlyCat.SaveVariables.Scene_Save_executeSave.call(this, savefileId)
    };

    FlyCat.SaveVariables.Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
    Scene_Load.prototype.onLoadSuccess = function () {
        DataManager.LoadVariables();
        DataManager.LoadSwitches();
        FlyCat.SaveVariables.Scene_Load_onLoadSuccess.call(this);
    };
}
FlyCat.SaveVariables.DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function () {
    FlyCat.SaveVariables.DataManager_setupNewGame.call(this);
    DataManager.LoadVariables();
    DataManager.LoadSwitches();
};

DataManager.SaveVariables = function () {
    $gameVariables.setValue(15, 0);
    $gameVariables.setValue(15, $gameVariables.value(FlyCat.LL_SceneMenu.corruptValue))
    if (FlyCat.SaveVariables.saveVariables) {
        const max = FlyCat.SaveVariables.saveVariables.length;
        const list = [];
        for (let i = 0; i < max; i++) {
            const id = Number(FlyCat.SaveVariables.saveVariables[i].variablesId);
            const value = $gameVariables.value(id);
            list[id] = value;
        }
        ConfigManager._saveVariables = list;
        ConfigManager.save();
    }
};

DataManager.LoadVariables = function () {
    if (ConfigManager._saveVariables) {
        const max = FlyCat.SaveVariables.saveVariables.length;
        for (let i = 0; i < max; i++) {
            const id = Number(FlyCat.SaveVariables.saveVariables[i].variablesId);
            const value = Number(ConfigManager._saveVariables[id]);
            $gameVariables.setValue(id, value);
        }
    }
}

DataManager.SaveSwitches = function () {
    if (FlyCat.SaveVariables.saveSwitches) {
        const max = FlyCat.SaveVariables.saveSwitches.length;
        const list = [];
        for (let i = 0; i < max; i++) {
            const id = Number(FlyCat.SaveVariables.saveSwitches[i].switchesId);
            const value = $gameSwitches.value(id);
            list[id] = value;
        }
        ConfigManager._saveSwitches = list;
        ConfigManager.save();
    }
};

DataManager.LoadSwitches = function () {
    if (ConfigManager._saveSwitches) {
        const max = FlyCat.SaveVariables.saveSwitches.length;
        for (let i = 0; i < max; i++) {
            const id = Number(FlyCat.SaveVariables.saveSwitches[i].switchesId);
            const value = ConfigManager._saveSwitches[id];
            $gameSwitches.setValue(id, value);
        }
    }
}