//=============================================================================
// RPG Maker MZ - 怪物呼吸效果
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<怪物呼吸效果>
 * @author FlyCat
 * 
 * @help
 * ==============================使用说明===============================
 * 在数据敌人备注：
 * <放大倍数:3>
 * <呼吸X倍数:0.12>
 * <呼吸Y倍数:0.18>
 * 数值自行调换
 * ====================================================================
*/
'use strict';
var Imported = Imported || {};
Imported.FlyCat_EnemyBreathing = true;

var FlyCat = FlyCat || {};
FlyCat.EnemyBreathing = {};
FlyCat.EnemyBreathing.parameters = PluginManager.parameters('FlyCat_EnemyBreathing');

FlyCat.EnemyBreathing.Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function () {
    FlyCat.EnemyBreathing.Sprite_Enemy_initMembers.call(this);
    this._breatheCount = Math.randomInt(255);
    this._breatheSpeed = 3;
    this._breatheStep = this._breatheSpeed;
    this._scaleMultiple = 1;
    this._breathingX = 0.06;
    this._breathingY = 0.09;
};

FlyCat.EnemyBreathing.Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function () {
    FlyCat.EnemyBreathing.Sprite_Enemy_update.call(this);
    if (this._enemy) {
        if (this._enemy.enemy().meta) {
            this._scaleMultiple = this._enemy.enemy().meta.放大倍数 ? Number(this._enemy.enemy().meta.放大倍数) : 1;
            this._breathingX = this._enemy.enemy().meta.呼吸X倍数 ? Number(this._enemy.enemy().meta.呼吸X倍数) : 0.06;
            this._breathingY = this._enemy.enemy().meta.呼吸Y倍数 ? Number(this._enemy.enemy().meta.呼吸Y倍数) : 0.09;
        }
        this.updateBreathing();
    }
};

Sprite_Enemy.prototype.updateBreathing = function () {
    if (this._breatheCount >= 255) {
        this._breatheStep = -this._breatheSpeed;
    }
    if (this._breatheCount <= 0) {
        this._breatheStep = this._breatheSpeed;
    }
    this._breatheCount += this._breatheStep;
    this.scale.x = this._scaleMultiple + this._breathingX * (this._breatheCount / 255);
    this.scale.y = this._scaleMultiple + this._breathingY * (this._breatheCount / 255);
}