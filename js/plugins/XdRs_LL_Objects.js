//==============================================================================================================
// LL_Objects.js
//==============================================================================================================
/*:
 * @target MZ
 * @plugindesc 数据 <Liuli Island>
 * @author 芯☆淡茹水
 * @help 
 * 
 * 
*/
//==============================================================================================================
; var XdRsData = XdRsData || {};
XdRsData.ll = XdRsData.ll || {};
//==============================================================================================================
Game_Temp.prototype.isTitleStatic = function () {
    return !!this._isTitleStatic;
};
Game_Temp.prototype.setTitleStatic = function (state) {
    this._isTitleStatic = state;
};
Game_Temp.prototype.battleEnemyIndex = function () {
    return this._battleEnemyIndex || 0;
};
Game_Temp.prototype.setBattleEnemyIndex = function (index) {
    const result = this.battleEnemyIndex() === index;
    this._battleEnemyIndex = index;
    return result;
};
Game_Temp.prototype.isBattleEnemyOk = function () {
    return this._battleEnemyOk;
};
Game_Temp.prototype.setBattleEnemyOk = function (state) {
    this._battleEnemyOk = state;
};
//==============================================================================================================
XdRsData.ll.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
    XdRsData.ll.Game_System_initialize.call(this);
    this._mapCgVisible = true;
    this._mapCgDisplay = { 'state': true, 'type': 0 };
};
Game_System.prototype.isMapCgVisible = function () {
    return this._mapCgVisible;
};
Game_System.prototype.setMapCgVisible = function (state) {
    this._mapCgVisible = state;
};
Game_System.prototype.isMapCgDisplay = function () {
    return this._mapCgDisplay.state;
};
Game_System.prototype.mapCgType = function () {
    return this._mapCgDisplay.type;
};
Game_System.prototype.setMapCgDisplay = function (state) {
    this._mapCgDisplay.state = state;
};
Game_System.prototype.setMapCgType = function (type) {
    this._mapCgDisplay.type = type;
};
Game_System.prototype.mnemonicIndex = function (sym) {
    return this._mnemonicData ? this._mnemonicData[sym] || 0 : 0;
};
Game_System.prototype.saveIndex = function (sym, index) {
    this._mnemonicData = this._mnemonicData || {};
    this._mnemonicData[sym] = index;
};
//==============================================================================================================
XdRsData.ll.Game_Variables_setValue = Game_Variables.prototype.setValue;
Game_Variables.prototype.setValue = function (variableId, value) {
    XdRsData.ll.Game_Variables_setValue.call(this, variableId, value);
    //  this.checkPregnancy(variableId);
};
Game_Variables.prototype.checkPregnancy = function (variableId) {
    if (!XdRsData.ll.isPrgVal(variableId)) return;
    const num = this.value(variableId);
    const actor = $gameParty.currentActor();
    if (num >= 100) {
        !actor.isPregnant() && actor.setPregnant(true);
        this._data[variableId] = 0;
    }
};
//==============================================================================================================
// Game_Action.prototype.qteEffect = function (sym) {
//     if (!this._qteEffect) return false;
//     return !!this._qteEffect[sym];
// };
// Game_Action.prototype.setQteEffect = function (sym) {
//     this._qteEffect = this._qteEffect || {};
//     this._qteEffect[sym] = true;
// };
// XdRsData.ll.Game_Action_itemHit = Game_Action.prototype.itemHit;
// Game_Action.prototype.itemHit = function (/*target*/) {
//     if (this.qteEffect('evade')) return 0;
//     return XdRsData.ll.Game_Action_itemHit.call(this);
// };
//==============================================================================================================
XdRsData.ll.Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function (actorId) {
    this._pregnantStep = null;
    XdRsData.ll.Game_Actor_setup.call(this, actorId);
};
Game_Actor.prototype.isPregnant = function () {
    return this._pregnantStep !== null;
};
Game_Actor.prototype.pregnantStep = function () {
    return this._pregnantStep;
};
Game_Actor.prototype.setPregnant = function (state) {
    const result = this.isPregnant() !== state;
    this._pregnantStep = state ? $gameParty.steps() : null;
    const id = +XdRsData.ll.parameters['peStateId'] || 0;
    if (id > 0) state ? this.addState(id) : this.eraseState(id);
    result && $gamePlayer.refresh();
};
Game_Actor.prototype.breaker = function () {
    return this._breaker;
};
Game_Actor.prototype.setBreaker = function (name) {
    this._breaker = name;
};
Game_Actor.prototype.getClothesId = function () {
    const armor = this._equips[2].object();
    return armor ? armor.id : 0;
};
Game_Actor.prototype.nowExp = function () {
    return this.currentExp() - this.currentLevelExp();
};
Game_Actor.prototype.nextExp = function () {
    return this.nextLevelExp() - this.currentLevelExp();
};
Game_Actor.prototype.isSpriteVisible = function () {
    return true;
};
Game_Actor.prototype.isStateChenged = function () {
    return this._stateChenged;
};
Game_Actor.prototype.closeStateChenged = function () {
    this._stateChenged = false;
};
XdRsData.ll.Game_Actor_eraseState = Game_Actor.prototype.eraseState;
Game_Actor.prototype.eraseState = function (stateId) {
    this._stateChenged = this.isStateAffected(stateId);
    XdRsData.ll.Game_Actor_eraseState.call(this, stateId);
};
XdRsData.ll.Game_Actor_addNewState = Game_Actor.prototype.addNewState;
Game_Actor.prototype.addNewState = function (stateId) {
    XdRsData.ll.Game_Actor_addNewState.call(this, stateId);
    this._stateChenged = this.isStateAffected(stateId);
};
// //==============================================================================================================
Game_Party.prototype.currentActor = function () {
    const id = this._actors[0] || 1;
    return $gameActors.actor(id);
};
Game_Party.prototype.childrenNums = function (type) {
    const id = +XdRsData.ll.parameters['childItemId' + type] || 0;
    return this.numItems($dataItems[id]);
};
Game_Party.prototype.itemsBy = function (type) {
    if (type === 1) return this.equipItems();
    return this.items().filter(item => !type ? item.itypeId < 2 : item.itypeId >= 2);
};
Game_Party.prototype.equipsBy = function (type) {
    return this.equipItems().filter(equip => equip.etypeId === type);
};
XdRsData.ll.Game_Party_onBattleStart = Game_Party.prototype.onBattleStart;
Game_Party.prototype.onBattleStart = function () {
    $gameTemp.setBattleEnemyIndex(0);
    XdRsData.ll.Game_Party_onBattleStart.call(this);
};
XdRsData.ll.Game_Party_increaseSteps = Game_Party.prototype.increaseSteps;
Game_Party.prototype.increaseSteps = function () {
    XdRsData.ll.Game_Party_increaseSteps.call(this);
    XdRsData.ll.checkPregnancy();
};
// //==============================================================================================================
// XdRsData.ll.Game_Player_refresh = Game_Player.prototype.refresh;
// Game_Player.prototype.refresh = function () {
//     const result = $gameParty.currentActor().isPregnant();
//     this.setMoveSpeed(result ? 3 : 4);
//     if (result) {
//         this.setImage('$A-HY', 0);
//         this._followers.refresh();
//     } else XdRsData.ll.Game_Player_refresh.call(this);
// };
// //==============================================================================================================
// XdRsData.ll.Game_Interpreter_updateWait = Game_Interpreter.prototype.updateWait;
// Game_Interpreter.prototype.updateWait = function () {
//     return QTE_Manager.isRuning() || XdRsData.ll.Game_Interpreter_updateWait.call(this);
// };
//==============================================================================================================
// end
//==============================================================================================================