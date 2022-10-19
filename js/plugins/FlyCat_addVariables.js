//=============================================================================
// RPG Maker MZ - 装备状态变量
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<装备状态变量>
 * @author FlyCat
 * 
 * 
 * @command addVariables
 * @text 初始化装备变量
 * @desc 初始化装备变量
 * 
 * @help
 * 装备备注：
 * <增减变量:X,Y>  X为变量id  Y为增减数值
 * <增减变量:X,Y,X,Y>  该组合适用于多个变量控制
 * 穿装备后变量增加，脱装备后变量自动返回。
 * ======================================================================
 */

'use strict';
var Imported = Imported || {};
Imported.FlyCat_addVariables = true;

var FlyCat = FlyCat || {};
FlyCat.AddVariable = {};
FlyCat.AddVariable.parameters = PluginManager.parameters('FlyCat_addVariables');


PluginManager.registerCommand('FlyCat_MHDS_addVariables', 'addVariables', args => {
    const actor = $gameParty.allMembers()[0];
    if (actor && !$gameSystem._addVariable) {
        for (let i = 0; i < actor._equips.length; i++) {
            if (actor._equips[i] && actor._equips[i]._dataClass == 'armor' && actor._equips[i]._itemId > 0) {
                const armor = $dataArmors[actor._equips[i]._itemId];
                actor._equipVariables[i] = armor;
                actor.addVariableValue(armor);
            }
        }
        $gameSystem._addVariable = true;
    }
});

FlyCat.AddVariable.Game_Actor_addState = Game_Actor.prototype.addState;
Game_Actor.prototype.addState = function (stateId) {
    if (this.isStateAddable(stateId)) {
        const state = $dataStates[stateId];
        if (state && state.meta.增减变量 && !this._stateVariables[stateId]) {
            const meta = state.meta.增减变量.split(',');
            for (let i = 0; i < meta.length; i += 2) {
                if (Number(meta[i]) > 0) {
                    const value = $gameVariables.value(Number(meta[i]));
                    $gameVariables.setValue(Number(meta[i]), value + Number(meta[i + 1]));
                }
            };
            this._stateVariables[stateId] = state;
        }
    }
    FlyCat.AddVariable.Game_Actor_addState.call(this, stateId);
};

FlyCat.AddVariable.Game_Actor_removeState = Game_Actor.prototype.removeState;
Game_Actor.prototype.removeState = function (stateId) {
    if (this.isStateAffected(stateId)) {
        const state = $dataStates[stateId];
        if (state && state.meta.增减变量 && this._stateVariables[stateId]) {
            const meta = state.meta.增减变量.split(',');
            for (let i = 0; i < meta.length; i += 2) {
                if (Number(meta[i]) > 0) {
                    const value = $gameVariables.value(Number(meta[i]));
                    $gameVariables.setValue(Number(meta[i]), value - Number(meta[i + 1]));
                }
            };
            this._stateVariables[stateId] = null;
        }
    }
    FlyCat.AddVariable.Game_Actor_removeState.call(this, stateId)
};

FlyCat.AddVariable.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function () {
    FlyCat.AddVariable.Game_Actor_initMembers.call(this);
    this._equipVariables = [];
    this._stateVariables = [];
};

FlyCat.AddVariable.Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function (slotId, item) {
    if (this._actorId == 1) {
        if (!this._equipVariables) this._equipVariables = [];
        if (!this._stateVariables) this._stateVariables = [];
        if (item) {
            if (this._equipVariables[slotId]) {
                this.removeVariableValue(this._equipVariables[slotId])
            }
            this.addVariableValue(item);
            this._equipVariables[slotId] = item;
        } else if (this._equipVariables[slotId]) {
            this.removeVariableValue(this._equipVariables[slotId]);
            this._equipVariables[slotId] = null;
        }
    }
    FlyCat.AddVariable.Game_Actor_changeEquip.call(this, slotId, item)
};


Game_Actor.prototype.addVariableValue = function (item) {
    if (item && item.meta.增减变量) {
        const meta = item.meta.增减变量.split(',');
        for (let i = 0; i < meta.length; i += 2) {
            if (Number(meta[i]) > 0) {
                const value = $gameVariables.value(Number(meta[i]));
                $gameVariables.setValue(Number(meta[i]), value + Number(meta[i + 1]));
            }
        }
    }
};
Game_Actor.prototype.removeVariableValue = function (item) {
    if (item && item.meta.增减变量) {
        const meta = item.meta.增减变量.split(',');
        for (let i = 0; i < meta.length; i += 2) {
            if (Number(meta[i]) > 0) {
                const value = $gameVariables.value(Number(meta[i]));
                $gameVariables.setValue(Number(meta[i]), value - Number(meta[i + 1]));
            }
        }
    }
};