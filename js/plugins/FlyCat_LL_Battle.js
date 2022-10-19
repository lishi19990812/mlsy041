//=============================================================================
// RPG Maker MZ - 琉璃岛战斗
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<琉璃岛战斗>
 * @author FlyCat
 * 
 * @param actorPictureSwitch
 * @text 战斗立绘开关选择
 * @desc 战斗立绘开关选择
 * @type switch
 * 
 * @param battleMainPicture
 * @text 战斗待机主体
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param battleSkillPicture
 * @text 战斗施法主体
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param battleDamagePicture
 * @text 战斗被打主体
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param battleAttackPicture
 * @text 战斗鞭子主体
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param bzFqState
 * @text 鞭子发情立绘状态
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param bzBzState
 * @text 鞭子白灼立绘状态
 * @require 1
 * @dir img/menu/
 * @type file
 *
 * @param bzZzState
 * @text 鞭子控制立绘状态
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param sfFqState
 * @text 施法发情立绘状态
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param sfBzState
 * @text 施法白灼立绘状态
 * @require 1
 * @dir img/menu/
 * @type file
 *
 * @param sfZzState
 * @text 施法控制立绘状态
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param djFqState
 * @text 待机发情立绘状态
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param djBzState
 * @text 待机白灼立绘状态
 * @require 1
 * @dir img/menu/
 * @type file
 *
 * @param djZzState
 * @text 待机控制立绘状态
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param bdFqState
 * @text 被打发情立绘状态
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param bdBzState
 * @text 被打白灼立绘状态
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param bdZzState
 * @text 被打控制立绘状态
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @command hideBattleImg
 * @text 隐藏战斗立绘
 * @desc 隐藏战斗立绘
 *
 * @arg type
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @text 显示/隐藏
 * @desc 显示/隐藏
 * 
 * @help
 * ==============================使用说明===============================
 * 图片均放在img/menu下
 * 图片名：
 * 战斗待机立绘X
 * 战斗攻击立绘X
 * 战斗受伤图X
 * ====================================================================
*/
'use strict';
var Imported = Imported || {};
Imported.FlyCat_LL_Battle = true;

var FlyCat = FlyCat || {};
FlyCat.LL_Battle = {};
FlyCat.LL_Battle.parameters = PluginManager.parameters('FlyCat_LL_Battle');
FlyCat.LL_Battle.battleMainPicture = String(FlyCat.LL_Battle.parameters['battleMainPicture']);
FlyCat.LL_Battle.battleSkillPicture = String(FlyCat.LL_Battle.parameters['battleSkillPicture']);
FlyCat.LL_Battle.battleDamagePicture = String(FlyCat.LL_Battle.parameters['battleDamagePicture']);
FlyCat.LL_Battle.battleAttackPicture = String(FlyCat.LL_Battle.parameters['battleAttackPicture']);
FlyCat.LL_Battle.bzBzState = String(FlyCat.LL_Battle.parameters['bzBzState']);
FlyCat.LL_Battle.bzZzState = String(FlyCat.LL_Battle.parameters['bzZzState']);
FlyCat.LL_Battle.bzFqState = String(FlyCat.LL_Battle.parameters['bzFqState']);

FlyCat.LL_Battle.sfBzState = String(FlyCat.LL_Battle.parameters['sfBzState']);
FlyCat.LL_Battle.sfZzState = String(FlyCat.LL_Battle.parameters['sfZzState']);
FlyCat.LL_Battle.sfFqState = String(FlyCat.LL_Battle.parameters['sfFqState']);

FlyCat.LL_Battle.djBzState = String(FlyCat.LL_Battle.parameters['djBzState']);
FlyCat.LL_Battle.djZzState = String(FlyCat.LL_Battle.parameters['djZzState']);
FlyCat.LL_Battle.djFqState = String(FlyCat.LL_Battle.parameters['djFqState']);

FlyCat.LL_Battle.bdBzState = String(FlyCat.LL_Battle.parameters['bdBzState']);
FlyCat.LL_Battle.bdZzState = String(FlyCat.LL_Battle.parameters['bdZzState']);
FlyCat.LL_Battle.bdFqState = String(FlyCat.LL_Battle.parameters['bdFqState']);

FlyCat.LL_Battle.actorPictureSwitch = Number(FlyCat.LL_Battle.parameters['actorPictureSwitch']);

PluginManager.registerCommand('FlyCat_LL_Battle', 'hideBattleImg', args => {
    if (FlyCat.LL_Battle._Scene_Battle._battleActorSprite && FlyCat.LL_Battle._Scene_Battle._battleActorStateSprite && FlyCat.LL_Battle._Scene_Battle._battleActorMainSprite) {
        FlyCat.LL_Battle._Scene_Battle._battleActorSprite.visible = eval(args.type);
        FlyCat.LL_Battle._Scene_Battle._battleActorMainSprite.visible = eval(args.type);
        FlyCat.LL_Battle._Scene_Battle._battleActorStateSprite.visible = eval(args.type);
        FlyCat.LL_Battle._Scene_Battle._actorBzSprite.visible = eval(args.type);
        FlyCat.LL_Battle._Scene_Battle._actorFqSprite.visible = eval(args.type);
        FlyCat.LL_Battle._Scene_Battle._actorKzSprite.visible = eval(args.type);
    }
});
/////////////////////////////Scene//////////////////////////////////
Scene_Battle.prototype.initialize = function () {
    Scene_Message.prototype.initialize.call(this);
    FlyCat.LL_Battle._Scene_Battle = this;
};
FlyCat.LL_Battle.Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function () {
    FlyCat.LL_Battle.Scene_Battle_createSpriteset.call(this)
    if (!$gameSystem._armorDurability) {
        $gameSystem._armorDurability = [];
        for (let i = 0; i < $dataArmors.length; i++) {
            if ($dataItems[i] && $dataArmors[i].meta.菜单立绘换装) {
                $gameSystem._armorDurability[i] = 0;
            }
            else {
                $gameSystem._armorDurability[i] = null;
            }
        };
    };
    const actor = $gameParty.allMembers()[0];
    this._actorArmor = null;
    if (actor._equips[1]._itemId) {
        const armor = $dataArmors[actor._equips[1]._itemId];
        this._actorArmor = armor;
    }
    // console.log(this._actorArmor)
    const x = 1000;
    const y = 400;
    /*主体*/
    this._battleActorMainSprite = new Sprite();
    this.addChild(this._battleActorMainSprite);
    this._battleActorMainSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_Battle.battleMainPicture);
    this._battleActorMainSprite.anchor.set(0.5);
    this._battleActorMainSprite.x = x;
    this._battleActorMainSprite.y = y;
    /*白浊*/
    this._actorBzSprite = new Sprite();//白浊
    this.addChild(this._actorBzSprite)
    this._actorBzSprite.anchor.set(0.5);
    this._actorBzSprite.x = x;
    this._actorBzSprite.y = y;
    /*衣服*/
    this._battleActorSprite = new Sprite();
    this.addChild(this._battleActorSprite);
    this._battleActorSprite.anchor.set(0.5);
    this._battleActorSprite.x = x;
    this._battleActorSprite.y = y;
    /*状态*/
    this._battleActorStateSprite = new Sprite();
    this.addChild(this._battleActorStateSprite);
    this._battleActorStateSprite.anchor.set(0.5);
    this._battleActorStateSprite.x = x;
    this._battleActorStateSprite.y = y;

    this._actorFqSprite = new Sprite();//发情
    this.addChild(this._actorFqSprite)
    this._actorFqSprite.anchor.set(0.5);
    this._actorFqSprite.x = x;
    this._actorFqSprite.y = y;

    this._actorKzSprite = new Sprite();//控制
    this.addChild(this._actorKzSprite)
    this._actorKzSprite.anchor.set(0.5);
    this._actorKzSprite.x = x;
    this._actorKzSprite.y = y;
    /*临时*/
    this._lastBattleWaitImg = null;
    this._lastBattleAtkImg = null;
    this._lastBattleSkillImg = null;
    this._lastBattleDamageImg = null;
    $gameTemp._onCommanding = this._onCommanding;
    if (!this._hudField) { this.createHudField() };
    this.createSpritesetBattleAnimation();
    this._spriteSetBatHud.anchor.set(0.5);
    this._spriteSetBatHud.x = 400;
    this._spriteSetBatHud.y = 200;
    this.sortMz();
};

FlyCat.LL_Battle.Scene_Battle_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function () {
    FlyCat.LL_Battle.Scene_Battle_start.call(this);
    this.isHpBattleSprite();
};
FlyCat.LL_Battle.Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function () {
    FlyCat.LL_Battle.Scene_Battle_update.call(this);
    if ($gameTemp._onCommanding == false) {
        this.isHpBattleSprite();
    }
    const switchs = $gameSwitches.value(FlyCat.LL_Battle.actorPictureSwitch);
    if (switchs == false || switchs == true) {
        this._battleActorMainSprite.visible = !switchs;
        this._battleActorSprite.visible = !switchs;
        // this._battleActorStateSprite.visible = !switchs;
        this._actorBzSprite.visible = !switchs;
        this._actorFqSprite.visible = !switchs;
        this._actorKzSprite.visible = !switchs;
    }
};
Scene_Battle.prototype.isActorStates = function (type) {
    // if (FlyCat.LL_SceneMenu.peopleStateVariable) {
    //     var peopleStateValue = $gameVariables.value(FlyCat.LL_SceneMenu.peopleStateVariable);
    // }
    // else {
    //     var peopleStateValue = 0;
    // }
    var x = 1000;
    var value = '';
    var value_1 = '';
    var value_2 = '';
    if (type === '战斗') {
        var value = FlyCat.LL_Battle.bzZzState;
        var value_1 = FlyCat.LL_Battle.bzBzState;
        var value_2 = FlyCat.LL_Battle.bzFqState;
        var x = 800;
    };
    if (type === '施法') {
        var value = FlyCat.LL_Battle.sfZzState;
        var value_1 = FlyCat.LL_Battle.sfBzState;
        var value_2 = FlyCat.LL_Battle.sfFqState;
        var x = 800;
    };
    if (type === '待机') {
        var value = FlyCat.LL_Battle.djZzState;
        var value_1 = FlyCat.LL_Battle.djBzState;
        var value_2 = FlyCat.LL_Battle.djFqState;
        var x = 1000;
    };
    if (type === '被打') {
        var value = FlyCat.LL_Battle.bdZzState;
        var value_1 = FlyCat.LL_Battle.bdBzState;
        var value_2 = FlyCat.LL_Battle.bdFqState;
        var x = 1000;
    };
    if ($gameSwitches.value(FlyCat.LL_SceneMenu.bzSwitch)) {//白浊
        this._actorBzSprite.bitmap = ImageManager.loadBitmap('img/menu/', value_1);
    } else {
        this._actorBzSprite.bitmap = '';
    }
    if ($gameSwitches.value(FlyCat.LL_SceneMenu.fqSwitch)) {//发情
        this._actorFqSprite.bitmap = ImageManager.loadBitmap('img/menu/', value_2);
    } else {
        this._actorFqSprite.bitmap = '';
    }
    if ($gameSwitches.value(FlyCat.LL_SceneMenu.kzSwitch)) {//控制
        this._actorKzSprite.bitmap = ImageManager.loadBitmap('img/menu/', value);
    } else {
        this._actorKzSprite.bitmap = '';
    }
    // if (peopleStateValue == 1) var bitmap = ImageManager.loadBitmap('img/menu/', value);
    // if (peopleStateValue == 2) var bitmap = ImageManager.loadBitmap('img/menu/', value);
    // if (peopleStateValue == 3) var bitmap = ImageManager.loadBitmap('img/menu/', value_1);
    // if (peopleStateValue == 4) var bitmap = ImageManager.loadBitmap('img/menu/', value_1);
    //  this._battleActorStateSprite.x = x;
    this._actorBzSprite.x = x;
    this._actorFqSprite.x = x;
    this._actorKzSprite.x = x;
    //  this._battleActorStateSprite.bitmap = bitmap;
};
Scene_Battle.prototype.isHpBattleSprite = function () {
    this._lastBattleAtkImg = null;
    this._lastBattleSkillImg = null;
    this._lastBattleDamageImg = null;
    this._battleActorMainSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_Battle.battleMainPicture);
    this._battleActorMainSprite.x = 1000;
    var img = '';
    if (this._actorArmor) {
        const value = $gameParty.gainItemDurability(this._actorArmor);
        if (value < 30) {
            var id = 1
        }
        else if (value < 70) {
            var id = 2
        }
        else {
            var id = 3;
        }
        if (value >= 100) {
            var img = '';
            $gameSystem._battlePicture = '';
        }
        else {
            var img = '战斗' + String($gameSystem._battlePicture + id);
        };
    }
    if (this._lastBattleWaitImg != img || this._lastBattleWaitImg == null) {
        this._battleActorSprite.x = 1000;
        this._battleActorSprite.bitmap = ImageManager.loadBitmap('img/menu/', img);
    };
    this._lastBattleWaitImg = img;
    if (this._battleActorStateSprite) {
        this.isActorStates('待机');
    };
};
FlyCat.LL_Battle.Scene_Battle_commandAttack = Scene_Battle.prototype.commandAttack;
Scene_Battle.prototype.commandAttack = function () {
    if (BattleManager.actor()._actorId == 1) {
        this.isHpBattleAtkSprite();
    }
    FlyCat.LL_Battle.Scene_Battle_commandAttack.call(this)
};
FlyCat.LL_Battle.Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill
Scene_Battle.prototype.commandSkill = function () {
    if (BattleManager.actor()._actorId == 1) {
        this.isHpBattleSkillSprite();
    }
    FlyCat.LL_Battle.Scene_Battle_commandSkill.call(this);

};
Scene_Battle.prototype.isHpBattleSkillSprite = function () {
    $gameTemp._onCommanding = true;
    this._lastBattleWaitImg = null;
    this._battleActorMainSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_Battle.battleSkillPicture);
    this._battleActorMainSprite.x = 800;
    var img = '';
    if (this._actorArmor) {
        const value = $gameParty.gainItemDurability(this._actorArmor);
        if (value < 30) {
            var id = 1
        }
        else if (value < 70) {
            var id = 2
        }
        else {
            var id = 3;
        }
        if (value >= 100) {
            var img = '';
            $gameSystem._battlePicture = '';
        }
        else {
            var img = '施法' + String($gameSystem._battlePicture + id);
        };

    }
    if (this._lastBattleSkillImg != img || this._lastBattleSkillImg == null) {
        this._battleActorSprite.x = 800;
        this._battleActorSprite.bitmap = ImageManager.loadBitmap('img/menu/', img);
    }
    this._lastBattleSkillImg = img;
    if (this._battleActorStateSprite) {
        this.isActorStates('施法');
    };
};
Scene_Battle.prototype.isHpBattleAtkSprite = function () {
    $gameTemp._onCommanding = true;
    this._lastBattleWaitImg = null;
    // this._battleActorSprite.x = 800;
    this._battleActorMainSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_Battle.battleAttackPicture);
    this._battleActorMainSprite.x = 800;
    var img = '';
    if (this._actorArmor) {
        const value = $gameParty.gainItemDurability(this._actorArmor);
        if (value < 30) {
            var id = 1
        }
        else if (value < 70) {
            var id = 2
        }
        else {
            var id = 3;
        }
        if (value >= 100) {
            var img = '';
            $gameSystem._battlePicture = '';
        }
        else {
            var img = '鞭子' + String($gameSystem._battlePicture + id);
        };
    }
    if (this._lastBattleAtkImg != img || this._lastBattleAtkImg == null) {
        this._battleActorSprite.x = 800;
        this._battleActorSprite.bitmap = ImageManager.loadBitmap('img/menu/', img);
    }
    this._lastBattleAtkImg = img;
    if (this._battleActorStateSprite) {
        this.isActorStates('战斗');
    };
};
FlyCat.LL_Battle.Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function () {
    FlyCat.LL_Battle.Scene_Battle_onEnemyCancel.call(this)
    if (BattleManager.actor()._actorId == 1) {
        this.isHpBattleSprite();
    }
};
FlyCat.LL_Battle.Scene_Battle_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
Scene_Battle.prototype.onSkillCancel = function () {
    FlyCat.LL_Battle.Scene_Battle_onSkillCancel.call(this)
    if (BattleManager.actor()._actorId == 1) {
        this.isHpBattleSprite();
    }
};

FlyCat.LL_Battle.BattleManager_startInput = BattleManager.startInput;
BattleManager.startInput = function () {
    $gameTemp._onCommanding = false;
    FlyCat.LL_Battle.BattleManager_startInput.call(this);
};
FlyCat.LL_Battle.Game_Actor_performDamage = Game_Actor.prototype.performDamage
Game_Actor.prototype.performDamage = function () {
    FlyCat.LL_Battle.Game_Actor_performDamage.call(this);
    if (this._actorId == 1) {
        FlyCat.LL_Battle._Scene_Battle.isHpBattleDamageSprite();
    }
};
Scene_Battle.prototype.isHpBattleDamageSprite = function () {
    $gameTemp._onCommanding = true;
    this._lastBattleWaitImg = null;
    this._lastBattleAtkImg = null;
    this._lastBattleSkillImg = null;
    this._battleActorMainSprite.x = 1000;
    this._battleActorMainSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_Battle.battleDamagePicture);
    var img = '';
    if (this._actorArmor) {
        const value = $gameParty.gainItemDurability(this._actorArmor);
        if (value < 30) {
            var id = 1
        }
        else if (value < 70) {
            var id = 2
        }
        else {
            var id = 3;
        }
        if (value >= 100) {
            var img = '';
            $gameSystem._battlePicture = '';
        }
        else {
            var img = '被打' + String($gameSystem._battlePicture + id);
        };
    }
    if (this._lastBattleDamageImg != img || this._lastBattleDamageImg == null) {
        this._battleActorSprite.x = 1000;
        this._battleActorSprite.bitmap = ImageManager.loadBitmap('img/menu/', img);
    }
    this._lastBattleDamageImg = img;
    if (this._battleActorStateSprite) {
        this.isActorStates('被打');
    };
};
Scene_Battle.prototype.createActorCommandWindow = function () {
    const rect = this.actorCommandWindowRect();
    const commandWindow = new Window_ActorCommand(rect);
    commandWindow.setHandler("attack", this.commandAttack.bind(this));
    commandWindow.setHandler("skill", this.commandSkill.bind(this));
    commandWindow.setHandler("guard", this.commandGuard.bind(this));
    commandWindow.setHandler("item", this.commandItem.bind(this));
    commandWindow.setHandler("cancel", this.commandCancel.bind(this));
    this.addWindow(commandWindow);
    this._actorCommandWindow = commandWindow;
};

Scene_Battle.prototype.partyCommandWindowRect = function () {
    const ww = 192;
    const wh = this.windowAreaHeight();
    const wx = Graphics.boxWidth / 2 - ww / 2;
    const wy = Graphics.boxHeight / 2 - wh / 2;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_Battle.prototype.enemyWindowRect = function () {
    const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - this._statusWindow.width;
    const ww = this._statusWindow.width;
    const wh = this.windowAreaHeight();
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_Battle.prototype.actorCommandWindowRect = function () {
    const ww = 192;
    const wh = this.windowAreaHeight();
    const wx = Graphics.boxWidth / 2 - ww / 2;
    const wy = Graphics.boxHeight / 2 - wh / 2;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_Battle.prototype.statusWindowRect = function () {
    const extra = 10;
    const ww = Graphics.boxWidth - 192;
    const wh = this.windowAreaHeight() + extra;
    const wy = Graphics.boxHeight - wh + extra - 4;
    var wx = 535;
    if ($gameParty.allMembers().length > 1) {
        var wx = 535 - ($gameParty.allMembers().length - 1) * 85
    }
    return new Rectangle(wx, wy, ww, wh);
};

//////////////////////////////////Window///////////////////////////////////
FlyCat.LL_Battle.Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
Window_BattleStatus.prototype.initialize = function (rect) {
    FlyCat.LL_Battle.Window_BattleStatus_initialize.call(this, rect)
    this.opacity = 0;
};
Window_BattleStatus.prototype.numVisibleRows = function () {
    return 2;
};
Window_BattleStatus.prototype.maxCols = function () {
    return 6;
};
Window_BattleStatus.prototype.gaugeLineHeight = function () {
    return 40;
};
Window_BattleStatus.prototype.placeBasicGauges = function (actor, x, y) {
    this.placeGauge(actor, "hp", x, y);
    this.placeGauge(actor, "mp", x, y + this.gaugeLineHeight());
    if ($dataSystem.optDisplayTp && actor._actorId == 1) {
        this.placeGauge(actor, "tp", x, y + this.gaugeLineHeight() * 2);
    }
};




///////////////////////
Sprite_Actor.prototype.setupWeaponAnimation = function () {
    // if (this._actor.isWeaponAnimationRequested()) {
    //     this._weaponSprite.setup(this._actor.weaponImageId());
    //     this._actor.clearWeaponAnimation();
    // }
};
Sprite_Actor.prototype.stepForward = function () {
    // this.startMove(-48, 0, 12);
    this.startMove(0, 0, 12);
};
Sprite_Actor.prototype.updateShadow = function () {
    this._shadowSprite.visible = false;//!!this._actor;
};
FlyCat.LL_Battle.Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function () {//初始化
    FlyCat.LL_Battle.Game_Temp_initialize.call(this);
    this._newAnimationBattle = null;
};

FlyCat.LL_Battle.Spriteset_Base_createAnimation = Spriteset_Base.prototype.createAnimation;
Spriteset_Base.prototype.createAnimation = function (request) {//获取动画
    $gameTemp._newAnimationBattle = request;
    FlyCat.LL_Battle.Spriteset_Base_createAnimation.call(this, request)
};

//==============================
// ** create Hud Field
//==============================
Scene_Base.prototype.createHudField = function () {
    this._hudField = new Sprite();
    this._hudField.z = 10;
    this.addChild(this._hudField);
};

//==============================
// ** sort MZ
//==============================
Scene_Base.prototype.sortMz = function () {
    this._hudField.children.sort((a, b) => a.z - b.z);
};

Scene_Battle.prototype.createSpritesetBattleAnimation = function () {
    this._spriteSetBatHud = new (Spriteset_BattleAnimation);
    this._spriteSetBatHud.z = 10;
    this._hudField.addChild(this._spriteSetBatHud);
    this.sortMz()
};

function Spriteset_BattleAnimationBase() {
    this.initialize.apply(this, arguments);
};

Spriteset_BattleAnimationBase.prototype = Object.create(Sprite.prototype);
Spriteset_BattleAnimationBase.prototype.constructor = Spriteset_BattleAnimationBase;

//==============================
// ♦ Initialize ♦
//==============================
Spriteset_BattleAnimationBase.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this.createSprites();
    this.sortMz();
};

//==============================
// * sort MZ
//==============================
Spriteset_BattleAnimationBase.prototype.sortMz = function () {
    this.children.sort((a, b) => a.z - b.z);
};

//==============================
// * need Create Actors
//==============================
Spriteset_BattleAnimationBase.prototype.needCreateActors = function () {
    if (!$gameSystem.isSideView()) { return true };
    return false
};

//==============================
// * create Sprites
//==============================
Spriteset_BattleAnimationBase.prototype.createSprites = function () {

};

Spriteset_BattleAnimationBase.prototype.createAnimationBase = function () {
    this._animationSprites = [];
    this._effectsContainer = new Sprite();
    this._effectsContainer.z = 80;
    this.addChild(this._effectsContainer);
};

Spriteset_BattleAnimationBase.prototype.createActors = function () {
    this._actorSprites = [];
    for (let i = 0; i < $gameParty.maxBattleMembers(); i++) {
        const sprite = new Sprite_Actor();
        sprite.z = 50 + i;
        this._actorSprites.push(sprite);
        this.addChild(sprite);
    }
};

Spriteset_BattleAnimationBase.prototype.updateAnimations = function () {
    for (const sprite of this._animationSprites) {
        if (!sprite.isPlaying()) {
            this.removeAnimation(sprite);
        };
    };
    this.processAnimationRequests();
};

Spriteset_BattleAnimationBase.prototype.processAnimationRequests = function () {
    if ($gameTemp._newAnimationBattle) {
        this.createAnimation($gameTemp._newAnimationBattle);
    };
    $gameTemp._newAnimationBattle = null;
};

Spriteset_BattleAnimationBase.prototype.createAnimation = function (request) {
    const animation = $dataAnimations[request.animationId];
    const targets = request.targets;
    const mirror = request.mirror;
    let delay = this.animationBaseDelay();
    const nextDelay = this.animationNextDelay();
    if (this.isAnimationForEach(animation)) {
        for (const target of targets) {
            this.createAnimationSprite([target], animation, mirror, delay);
            delay += nextDelay;
        }
    } else {
        this.createAnimationSprite(targets, animation, mirror, delay);
    }
};

Spriteset_BattleAnimationBase.prototype.createAnimationSprite = function (targets, animation, mirror, delay) {
    const mv = this.isMVAnimation(animation);
    const sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
    const targetSprites = this.makeTargetSprites(targets);
    const baseDelay = this.animationBaseDelay();
    const previous = delay > baseDelay ? this.lastAnimationSprite() : null;
    if (this.animationShouldMirror(targets[0])) {
        mirror = !mirror;
    }
    sprite.targetObjects = targets;
    sprite.setup(targetSprites, animation, mirror, delay, previous);
    this._effectsContainer.addChild(sprite);
    this._animationSprites.push(sprite);
};

//==============================
// ♣♣ findTargetSprite ♣♣
//==============================
Spriteset_BattleAnimationBase.prototype.findTargetSprite = function (target) {
    return this._actorSprites.find(sprite => sprite.checkBattler(target));
};

//==============================
// ♣♣ isMVAnimation ♣♣
//==============================
Spriteset_BattleAnimationBase.prototype.isMVAnimation = function (animation) {
    return !!animation.frames;
};

//==============================
// ♣♣ makeTargetSprites ♣♣
//==============================
Spriteset_BattleAnimationBase.prototype.makeTargetSprites = function (targets) {
    const targetSprites = [];
    for (const target of targets) {
        const targetSprite = this.findTargetSprite(target);
        if (targetSprite) {
            targetSprites.push(targetSprite);
        }
    }
    return targetSprites;
};

//==============================
// ♣♣ lastAnimationSprite ♣♣
//==============================
Spriteset_BattleAnimationBase.prototype.lastAnimationSprite = function () {
    return this._animationSprites[this._animationSprites.length - 1];
};

//==============================
// ♣♣ is AnimationFor Each ♣♣
//==============================
Spriteset_BattleAnimationBase.prototype.isAnimationForEach = function (animation) {
    const mv = this.isMVAnimation(animation);
    return mv ? animation.position !== 3 : animation.displayType === 0;
};

//==============================
// ♣♣ animationBaseDelay ♣♣
//==============================
Spriteset_BattleAnimationBase.prototype.animationBaseDelay = function () {
    return 8;
};

//==============================
// ♣♣ animationNextDelay ♣♣
//==============================
Spriteset_BattleAnimationBase.prototype.animationNextDelay = function () {
    return 12;
};

//==============================
// ♣♣ animationShouldMirror ♣♣
//==============================
Spriteset_BattleAnimationBase.prototype.animationShouldMirror = function (target) {
    return target && target.isActor && target.isActor();
};

Spriteset_BattleAnimationBase.prototype.removeAnimation = function (sprite) {
    this._animationSprites.remove(sprite);
    this._effectsContainer.removeChild(sprite);
    for (const target of sprite.targetObjects) {
        if (target.endAnimation) {
            target.endAnimation();
        }
    }
    sprite.destroy();
};

//==============================
// ♣♣ removeAllAnimations ♣♣
//==============================
Spriteset_BattleAnimationBase.prototype.removeAllAnimations = function () {
    for (const sprite of this._animationSprites) {
        this.removeAnimation(sprite);
    }
};

//==============================
// ♣♣ isAnimationPlaying ♣♣
//==============================
Spriteset_BattleAnimationBase.prototype.isAnimationPlaying = function () {
    return this._animationSprites.length > 0;
};

//==============================
// ♣♣ update Actors ♣♣
//==============================
Spriteset_BattleAnimationBase.prototype.updateActors = function () {
    const members = $gameParty.battleMembers();
    for (let i = 0; i < this._actorSprites.length; i++) {
        this._actorSprites[i].setBattler(members[i]);
    }
};

//=============================================================================
// * Spriteset_BattleAnimation
//=============================================================================
function Spriteset_BattleAnimation() {
    this.initialize.apply(this, arguments);
};

Spriteset_BattleAnimation.prototype = Object.create(Spriteset_BattleAnimationBase.prototype);
Spriteset_BattleAnimation.prototype.constructor = Spriteset_BattleAnimation;

//==============================
// ♦ Initialize ♦
//==============================
Spriteset_BattleAnimation.prototype.initialize = function () {
    Spriteset_BattleAnimationBase.prototype.initialize.call(this);
};

//==============================
// ♦ createSprites ♦
//==============================
Spriteset_BattleAnimation.prototype.createSprites = function () {
    Spriteset_BattleAnimationBase.prototype.createSprites.call(this);
    if (this.needCreateActors()) {
        this.createActors();
        this.createAnimationBase();
    };
};

//==============================
// ♦ Update ♦
//==============================
Spriteset_BattleAnimation.prototype.update = function () {
    Spriteset_BattleAnimationBase.prototype.update.call(this);
    if (this._actorSprites) { this.updateActors() };
    if (this._animationSprites) { this.updateAnimations() };
};