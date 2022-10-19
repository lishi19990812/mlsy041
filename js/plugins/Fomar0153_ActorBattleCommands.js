//=============================================================================
// RPG Maker MZ - Actor Battle Commands
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Allows you to setup battle commands for your characters.
 * @author Fomar0153
 *
 * @param Default Commands
 * @type string
 * @desc This is the default list of battle commands if none are set in the database.
 * @default attack,guard,item
 *
 * @help Fomar0153_ActorBattleCommands.js
 *
 * Please use the notebox on the actor tab to set their default commands e.g.
 * <battlecommands: attack, skilltype 2, guard, item>
 * <battlecommands: attack, skill 10, guard, item>
 *
 * This plugin provides the following commands
 * attack - use the basic attack skill
 * guard - use the basic guard skill
 * item - use the basic item command
 * skilltype n - where n is the database id of the skilltype (check your Types tab in the database)
 * skill n - where n is the database id of the skill you wish to use
 *
 * Further commands are available in additional plugins.
 *
 */

var Fomar = Fomar || {};
Fomar.ActorBattleCommands = {};

Fomar.ActorBattleCommands.parameters = PluginManager.parameters('Fomar0153_ActorBattleCommands');

Fomar.ActorBattleCommands.defaultBattleCommands = Fomar.ActorBattleCommands.parameters["Default Commands"] || "attack,guard,item";
Fomar.ActorBattleCommands.customCommands = ["skillId"];

(() => {

  Fomar.ActorBattleCommands.Game_Actor_setup = Game_Actor.prototype.setup;
  Game_Actor.prototype.setup = function(actorId) {
    Fomar.ActorBattleCommands.Game_Actor_setup.call(this, actorId);
    this._battleCommands = [];
    this.setupBattleCommands();
  };

  Game_Actor.prototype.setupBattleCommands = function() {
    this._battleCommands = [];
    var commandStr = "";
    if ($dataActors[this._actorId].meta['battlecommands']) {
      commandStr = $dataActors[this._actorId].meta['battlecommands'].split(",");
    } else {
      commandStr = Fomar.ActorBattleCommands.defaultBattleCommands.split(",");
    }
    for (var i = 0; i < commandStr.length; i++) {
      this._battleCommands.push(commandStr[i].trim());
    }
  };

  Window_ActorCommand.prototype.makeCommandList = function() {
    if (this._actor) {
      if (!this._actor._battleCommands) {
        this._actor.setupBattleCommands();
      }
      for (var i = 0; i < this._actor._battleCommands.length; i++) {
        var command = this._actor._battleCommands[i].split(" ")[0].toLowerCase();
        switch (command) {
          case "attack":
            this.addAttackCommand();
            break;
          case "skilltype":
            this.addSkillTypeCommand(parseInt(this._actor._battleCommands[i].split(" ")[1]));
            break;
          case "skill":
            this.addSkillCommand(parseInt(this._actor._battleCommands[i].split(" ")[1]));
            break;
          case "guard":
            this.addGuardCommand();
            break;
          case "item":
            this.addItemCommand();
            break;
          default:
            this.addCustomCommand(command);
        }
      }
    }
  };

  Window_ActorCommand.prototype.addSkillTypeCommand = function(stypeId) {
    this.addCommand($dataSystem.skillTypes[stypeId], "skill", true, stypeId);
  };

  Window_ActorCommand.prototype.addSkillCommand = function(skillId) {
    this.addCommand($dataSkills[skillId].name, "skillId", this._actor.canUse($dataSkills[skillId]), skillId);
  };

  Window_ActorCommand.prototype.addCustomCommand = function(command) {
    // for future plugins
  };

  Fomar.ActorBattleCommands.Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
  Scene_Battle.prototype.createActorCommandWindow = function() {
    Fomar.ActorBattleCommands.Scene_Battle_createActorCommandWindow.call(this);
    this._actorCommandWindow.setHandler("skillId", this.commandSkillId.bind(this));
  };

  Scene_Battle.prototype.commandSkillId = function() {
    const skill = $dataSkills[this._actorCommandWindow.currentExt()];
    const action = BattleManager.inputtingAction();
    action.setSkill(skill.id);
    BattleManager.actor().setLastBattleSkill(skill);
    this.onSelectAction();
  };

  Fomar.ActorBattleCommands.Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
  Scene_Battle.prototype.onActorCancel = function() {
    Fomar.ActorBattleCommands.Scene_Battle_onActorCancel.call(this);
    if (Fomar.ActorBattleCommands.customCommands.includes(this._actorCommandWindow.currentSymbol())) {
      this._statusWindow.show();
      this._actorCommandWindow.activate();
    }
  };

  Fomar.ActorBattleCommands.Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
  Scene_Battle.prototype.onEnemyCancel = function() {
    Fomar.ActorBattleCommands.Scene_Battle_onEnemyCancel.call(this);
    if (Fomar.ActorBattleCommands.customCommands.includes(this._actorCommandWindow.currentSymbol())) {
      this._statusWindow.show();
      this._actorCommandWindow.activate();
    }
  };

})();
