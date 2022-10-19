//=============================================================================
// RPG Maker MZ - 战斗音效插件
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<战斗音效插件>
 * @author FlyCat
 * 
 * @param seVolume
 * @text 音效音量
 * @type number
 * @default 100
 * 
 * @param turnSe
 * @text 角色回合音效
 * @type struct<turnSe>[]
 * @default
 * 
 * @param attackSe
 * @text 角色攻击音效
 * @type struct<attackSe>[]
 * @default
 * 
 * @param guardSe
 * @text 角色防御音效
 * @type struct<guardSe>[]
 * @default
 * 
 * @param damageSe
 * @text 角色受伤音效
 * @type struct<damageSe>[]
 * @default
 * 
 * @param dieSe
 * @text 角色死亡音效
 * @type struct<dieSe>[]
 * @default
 * 
 * @param reviveSe
 * @text 角色复活音效
 * @type struct<reviveSe>[]
 * @default
 * 
 * @param itemSe
 * @text 使用物品音效
 * @type struct<itemSe>[]
 * @default
 * 
 * @param skillSe
 * @text 使用技能音效
 * @type struct<skillSe>[]
 * @default
 * 
 * @param victorySe
 * @text 战斗胜利音效
 * @type struct<victorySe>[]
 * @default
 * 
 * @help
 * ==============================使用说明==================================
 * 插件设置内设置好角色和音效即可
 * 超过两个音效开启自动随机模式
 * =======================================================================
 */
/*~struct~turnSe:

@param seActorId
@text 角色
@type actor

@param seName
@text 音效名称
@type file[]
@dir audio/se
@help
*/

/*~struct~attackSe:
@param seActorId
@text 角色
@type actor

@param seName
@text 音效名称
@type file[]
@dir audio/se
@help
*/

/*~struct~guardSe:
@param seActorId
@text 角色
@type actor

@param seName
@text 音效名称
@type file[]
@dir audio/se
@help
*/

/*~struct~damageSe:
@param seActorId
@text 角色
@type actor

@param seName
@text 音效名称
@type file[]
@dir audio/se
@help
*/

/*~struct~dieSe:
@param seActorId
@text 角色
@type actor

@param seName
@text 音效名称
@type file[]
@dir audio/se
@help
*/

/*~struct~reviveSe:
@param seActorId
@text 角色
@type actor

@param seName
@text 音效名称
@type file[]
@dir audio/se
@help
*/

/*~struct~itemSe:
@param seActorId
@text 角色
@type actor

@param seName
@text 音效名称
@type file[]
@dir audio/se
@help
*/

/*~struct~skillSe:
@param seActorId
@text 角色
@type actor

@param seSkillId
@text 技能Id
@type skill

@param seName
@text 音效名称
@type file[]
@dir audio/se
@help
*/
/*~struct~victorySe:
@param seActorId
@text 角色
@type actor

@param seName
@text 音效名称
@type file[]
@dir audio/se
@help
*/

'use strict';
var Imported = Imported || {};
Imported.FlyCat_BattleSe = true;

var FlyCat = FlyCat || {};
FlyCat.BattleSe = {};
FlyCat.BattleSe.parameters = PluginManager.parameters('FlyCat_BattleSe');
FlyCat.BattleSe.seVolume = Number(FlyCat.BattleSe.parameters['seVolume'] || 100);
FlyCat.BattleSe.turnSe = JSON.parse(FlyCat.BattleSe.parameters['turnSe'] || '[]');
FlyCat.BattleSe.attackSe = JSON.parse(FlyCat.BattleSe.parameters['attackSe'] || '[]');
FlyCat.BattleSe.guardSe = JSON.parse(FlyCat.BattleSe.parameters['guardSe'] || '[]');
FlyCat.BattleSe.itemSe = JSON.parse(FlyCat.BattleSe.parameters['itemSe'] || '[]');
FlyCat.BattleSe.skillSe = JSON.parse(FlyCat.BattleSe.parameters['skillSe'] || '[]');
FlyCat.BattleSe.damageSe = JSON.parse(FlyCat.BattleSe.parameters['damageSe'] || '[]');
FlyCat.BattleSe.dieSe = JSON.parse(FlyCat.BattleSe.parameters['dieSe'] || '[]');
FlyCat.BattleSe.reviveSe = JSON.parse(FlyCat.BattleSe.parameters['reviveSe'] || '[]');
FlyCat.BattleSe.victorySe = JSON.parse(FlyCat.BattleSe.parameters['victorySe'] || '[]');
if (FlyCat.BattleSe.turnSe) {
    const max = FlyCat.BattleSe.turnSe.length;
    for (let i = 0; i < max; i++) {
        FlyCat.BattleSe.turnSe[i] = JSON.parse(FlyCat.BattleSe.turnSe[i])
        FlyCat.BattleSe.turnSe[i].seName = JSON.parse(FlyCat.BattleSe.turnSe[i].seName)
    }
};
if (FlyCat.BattleSe.attackSe) {
    const max = FlyCat.BattleSe.attackSe.length;
    for (let i = 0; i < max; i++) {
        FlyCat.BattleSe.attackSe[i] = JSON.parse(FlyCat.BattleSe.attackSe[i])
        FlyCat.BattleSe.attackSe[i].seName = JSON.parse(FlyCat.BattleSe.attackSe[i].seName)
    }
};
if (FlyCat.BattleSe.guardSe) {
    const max = FlyCat.BattleSe.guardSe.length;
    for (let i = 0; i < max; i++) {
        FlyCat.BattleSe.guardSe[i] = JSON.parse(FlyCat.BattleSe.guardSe[i])
        FlyCat.BattleSe.guardSe[i].seName = JSON.parse(FlyCat.BattleSe.guardSe[i].seName)
    }
};
if (FlyCat.BattleSe.itemSe) {
    const max = FlyCat.BattleSe.itemSe.length;
    for (let i = 0; i < max; i++) {
        FlyCat.BattleSe.itemSe[i] = JSON.parse(FlyCat.BattleSe.itemSe[i])
        FlyCat.BattleSe.itemSe[i].seName = JSON.parse(FlyCat.BattleSe.itemSe[i].seName)
    }
};
if (FlyCat.BattleSe.skillSe) {
    const max = FlyCat.BattleSe.skillSe.length;
    for (let i = 0; i < max; i++) {
        FlyCat.BattleSe.skillSe[i] = JSON.parse(FlyCat.BattleSe.skillSe[i])
        FlyCat.BattleSe.skillSe[i].seName = JSON.parse(FlyCat.BattleSe.skillSe[i].seName)
    }
};
if (FlyCat.BattleSe.damageSe) {
    const max = FlyCat.BattleSe.damageSe.length;
    for (let i = 0; i < max; i++) {
        FlyCat.BattleSe.damageSe[i] = JSON.parse(FlyCat.BattleSe.damageSe[i])
        FlyCat.BattleSe.damageSe[i].seName = JSON.parse(FlyCat.BattleSe.damageSe[i].seName)
    }
};
if (FlyCat.BattleSe.dieSe) {
    const max = FlyCat.BattleSe.dieSe.length;
    for (let i = 0; i < max; i++) {
        FlyCat.BattleSe.dieSe[i] = JSON.parse(FlyCat.BattleSe.dieSe[i])
        FlyCat.BattleSe.dieSe[i].seName = JSON.parse(FlyCat.BattleSe.dieSe[i].seName)
    }
};
if (FlyCat.BattleSe.reviveSe) {
    const max = FlyCat.BattleSe.reviveSe.length;
    for (let i = 0; i < max; i++) {
        FlyCat.BattleSe.reviveSe[i] = JSON.parse(FlyCat.BattleSe.reviveSe[i])
        FlyCat.BattleSe.reviveSe[i].seName = JSON.parse(FlyCat.BattleSe.reviveSe[i].seName)
    }
};
if (FlyCat.BattleSe.victorySe) {
    const max = FlyCat.BattleSe.victorySe.length;
    for (let i = 0; i < max; i++) {
        FlyCat.BattleSe.victorySe[i] = JSON.parse(FlyCat.BattleSe.victorySe[i])
        FlyCat.BattleSe.victorySe[i].seName = JSON.parse(FlyCat.BattleSe.victorySe[i].seName)
    }
};

/*回合音效*/
FlyCat.BattleSe.Scene_Battle_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function () {
    FlyCat.BattleSe.Scene_Battle_start.call(this);
    this._actorTurnSe = null;
    this._actorTurn_1 = 0;
};
FlyCat.BattleSe.Scene_Battle_updateBattleProcess = Scene_Battle.prototype.updateBattleProcess;
Scene_Battle.prototype.updateBattleProcess = function () {
    if (this._actorTurnSe != BattleManager.actor() || (this._actorTurn_1 == null && this._actorTurnSe == BattleManager.actor())) { this.playTurnActorSe(); }
    FlyCat.BattleSe.Scene_Battle_updateBattleProcess.call(this);
};
FlyCat.BattleSe.Scene_Battle_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
Scene_Battle.prototype.endCommandSelection = function () {
    FlyCat.BattleSe.Scene_Battle_endCommandSelection.call(this);
    if (this._actorTurn_1 == 0) { this._actorTurn_1 = null }
};
Scene_Battle.prototype.playTurnActorSe = function () {
    if (BattleManager.actor() == null) { return; }
    this._actorTurnSe = BattleManager.actor();
    const actorId = BattleManager.actor()._actorId;
    if (!actorId) { return; }
    if (!FlyCat.BattleSe.turnSe) { return; }
    const max = FlyCat.BattleSe.turnSe.length;
    for (let i = 0; i < max; i++) {
        if (FlyCat.BattleSe.turnSe[i].seActorId == actorId) {
            if (FlyCat.BattleSe.turnSe[i].seName.length > 0) {
                const random = Math.randomInt(FlyCat.BattleSe.turnSe[i].seName.length);
                const seName = FlyCat.BattleSe.turnSe[i].seName[random];
                AudioManager.stopSe();
                SoundManager.playActorSe(seName);
            }

        }
    }
    if (this._actorTurnSe == BattleManager.actor()) { this._actorTurn_1 = 0; }
};
/*攻击防御技能道具音效*/
FlyCat.BattleSe.Game_Battler_performActionStart = Game_Battler.prototype.performActionStart;
Game_Battler.prototype.performActionStart = function (action) {
    if (action) { this.playActionSe(action) };
    FlyCat.BattleSe.Game_Battler_performActionStart.call(this, action);
};
Game_Battler.prototype.playActionSe = function (action) {
    const actionId = action.item().id
    const actorId = this._actorId;
    if (this.isActor()) {
        if (action.isSkill()) {
            if (actionId == 1 && FlyCat.BattleSe.attackSe.length > 0) {//攻击
                const max = FlyCat.BattleSe.attackSe.length;
                for (let i = 0; i < max; i++) {
                    if (FlyCat.BattleSe.attackSe[i].seActorId == actorId) {
                        if (FlyCat.BattleSe.attackSe[i].seName.length > 0) {
                            const random = Math.randomInt(FlyCat.BattleSe.attackSe[i].seName.length);
                            const seName = FlyCat.BattleSe.attackSe[i].seName[random];
                            AudioManager.stopSe();
                            SoundManager.playActorSe(seName);
                        }

                    }
                }
            }
            else if (actionId == 2 && FlyCat.BattleSe.guardSe.length > 0) { //防御
                const max = FlyCat.BattleSe.guardSe.length;
                for (let i = 0; i < max; i++) {
                    if (FlyCat.BattleSe.guardSe[i].seActorId == actorId) {
                        if (FlyCat.BattleSe.guardSe[i].seName.length > 0) {
                            const random = Math.randomInt(FlyCat.BattleSe.guardSe[i].seName.length);
                            const seName = FlyCat.BattleSe.guardSe[i].seName[random];
                            AudioManager.stopSe();
                            SoundManager.playActorSe(seName);
                        }

                    }
                }
            }
            else { //技能
                const max = FlyCat.BattleSe.skillSe.length;
                for (let i = 0; i < max; i++) {
                    if (FlyCat.BattleSe.skillSe[i].seActorId == actorId && FlyCat.BattleSe.skillSe[i].seSkillId == actionId) {
                        if (FlyCat.BattleSe.skillSe[i].seName.length > 0) {
                            const random = Math.randomInt(FlyCat.BattleSe.skillSe[i].seName.length);
                            const seName = FlyCat.BattleSe.skillSe[i].seName[random];
                            AudioManager.stopSe();
                            SoundManager.playActorSe(seName);
                        }

                    }
                }
            }
        }
        else if (action.isItem() && FlyCat.BattleSe.itemSe.length > 0) {//道具
            const max = FlyCat.BattleSe.itemSe.length;
            for (let i = 0; i < max; i++) {
                if (FlyCat.BattleSe.itemSe[i].seActorId == actorId) {
                    if (FlyCat.BattleSe.itemSe[i].seName.length > 0) {
                        const random = Math.randomInt(FlyCat.BattleSe.itemSe[i].seName.length);
                        const seName = FlyCat.BattleSe.itemSe[i].seName[random];
                        AudioManager.stopSe();
                        SoundManager.playActorSe(seName);
                    }

                }
            }
        }
    }
};
/*受伤音效*/
FlyCat.BattleSe.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function (target) {
    const oldHp = target.hp;
    FlyCat.BattleSe.Game_Action_apply.call(this, target);
    if ($gameParty.inBattle()) {
        if (oldHp != target.hp || this.item().damage.type === 3) {
            this.playDamageSe(oldHp, target.hp, target)
        };
    };
}
Game_Action.prototype.playDamageSe = function (oldHp, nowHp, target) {
    const actorId = target._actorId;
    if (target.isDead() && FlyCat.BattleSe.dieSe.length > 0) {//死亡
        const max = FlyCat.BattleSe.dieSe.length;
        for (let i = 0; i < max; i++) {
            if (FlyCat.BattleSe.dieSe[i].seActorId == actorId) {
                if (FlyCat.BattleSe.dieSe[i].seName.length > 0) {
                    const random = Math.randomInt(FlyCat.BattleSe.dieSe[i].seName.length);
                    const seName = FlyCat.BattleSe.dieSe[i].seName[random];
                    AudioManager.stopSe();
                    SoundManager.playActorSe(seName);
                }

            }
        }
    } else if ((oldHp < nowHp || this.item().damage.type === 3) && FlyCat.BattleSe.reviveSe.length > 0) {//复活
        const max = FlyCat.BattleSe.reviveSe.length;
        for (let i = 0; i < max; i++) {
            if (FlyCat.BattleSe.reviveSe[i].seActorId == actorId) {
                if (FlyCat.BattleSe.reviveSe[i].seName.length > 0) {
                    const random = Math.randomInt(FlyCat.BattleSe.reviveSe[i].seName.length);
                    const seName = FlyCat.BattleSe.reviveSe[i].seName[random];
                    AudioManager.stopSe();
                    SoundManager.playActorSe(seName);
                }

            }
        }
    } else if (oldHp > nowHp && FlyCat.BattleSe.damageSe.length > 0) {//受伤
        const max = FlyCat.BattleSe.damageSe.length;
        for (let i = 0; i < max; i++) {
            if (FlyCat.BattleSe.damageSe[i].seActorId == actorId) {
                if (FlyCat.BattleSe.damageSe[i].seName.length > 0) {
                    const random = Math.randomInt(FlyCat.BattleSe.damageSe[i].seName.length);
                    const seName = FlyCat.BattleSe.damageSe[i].seName[random];
                    AudioManager.stopSe();
                    SoundManager.playActorSe(seName);
                }

            }
        }
    };
}
/*胜利音效*/
FlyCat.BattleSe.BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function () {
    const actor = this.randomActor();
    if (actor) { this.playVictorySe(actor) };
    FlyCat.BattleSe.BattleManager_processVictory.call(this);
};
BattleManager.playVictorySe = function (actor) {
    const actorId = actor._actorId;
    const max = FlyCat.BattleSe.victorySe.length;
    for (let i = 0; i < max; i++) {
        if (FlyCat.BattleSe.victorySe[i].seActorId == actorId) {
            if (FlyCat.BattleSe.victorySe[i].seName.length > 0) {
                const random = Math.randomInt(FlyCat.BattleSe.victorySe[i].seName.length);
                const seName = FlyCat.BattleSe.victorySe[i].seName[random];
                AudioManager.stopSe();
                SoundManager.playActorSe(seName);
            }

        }
    }
};
/*随机角色*/
BattleManager.randomActor = function () {
    const actorIndex = Math.randomInt($gameParty.aliveMembers().length);
    return $gameParty.aliveMembers()[actorIndex];
};
/*播放音效*/
SoundManager.playActorSe = function (fileName) {
    const se = {};
    se.name = fileName;
    se.pitch = 100;
    se.volume = FlyCat.BattleSe.seVolume;
    AudioManager.playSe(se);
}; 