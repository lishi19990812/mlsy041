
//=============================================================================
// RPG Maker MZ - 地图立绘
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<地图立绘>
 * @author FlyCat
 *
 * @param pictureAnchor
 * @text 立绘锚点
 * @desc 立绘锚点
 * @type string
 * @default 1
 * @desc 0为左上角，0.5为中，1为右下脚
 * 
 * @param pictureX
 * @text 地图立绘X
 * @desc 地图立绘X
 * @type number
 * @default 1270
 * @desc 锚点为0时780,
 * 为1时1270
 * 
 * @param pictureY
 * @text 地图立绘Y
 * @desc 地图立绘Y
 * @type number
 * @default 720
 * @desc 锚点为0时46
 * 为1时720
 * 
 * @param peopleStateZd
 * @text 地图控制立绘遮罩
 * @require 1
 * @dir img/menu/
 * @type file
 *
 *
 * @param peopleStateBz
 * @text 地图白浊立绘遮罩
 * @require 1
 * @dir img/menu/
 * @type file
 *
 * @param peopleStateFq
 * @text 地图发情立绘遮罩
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @command hideMapCg
 * @text 隐藏/打开地图立绘
 * @desc 隐藏/打开地图立绘
 * 
 * @arg type
 * @type boolean
 * @on 开启
 * @off 关闭
 * @default
 * @text 开启/关闭
 * @desc 
 * 
 * @help
 * ==============================使用说明===============================
 * 地图备注：<地图立绘背景:X>
 * 对话框中写：\Face[X]  X为表情id
 * =====================================================================
*/
'use strict';
var Imported = Imported || {};
Imported.FlyCat_LL_MapPicture = true;

var FlyCat = FlyCat || {};
FlyCat.LL_MapPicture = {};
FlyCat.LL_MapPicture.parameters = PluginManager.parameters('FlyCat_LL_MapPicture');
FlyCat.LL_MapPicture.faceVariable = Number(FlyCat.LL_MapPicture.parameters['faceVariable']);
FlyCat.LL_MapPicture.peopleStateZd = String(FlyCat.LL_MapPicture.parameters['peopleStateZd']);
// FlyCat.LL_MapPicture.peopleStateZz = String(FlyCat.LL_MapPicture.parameters['peopleStateZz']);
FlyCat.LL_MapPicture.peopleStateBz = String(FlyCat.LL_MapPicture.parameters['peopleStateBz']);
FlyCat.LL_MapPicture.peopleStateFq = String(FlyCat.LL_MapPicture.parameters['peopleStateFq']);
FlyCat.LL_MapPicture.pictureY = Number(FlyCat.LL_MapPicture.parameters['pictureY'] || 720);
FlyCat.LL_MapPicture.pictureX = Number(FlyCat.LL_MapPicture.parameters['pictureX'] || 1270);
FlyCat.LL_MapPicture.pictureAnchor = Number(FlyCat.LL_MapPicture.parameters['pictureAnchor'] || 1);

PluginManager.registerCommand('FlyCat_LL_MapPicture', 'hideMapCg', args => {
    $gameSystem._mapCgVisible = eval(args.type);
    ConfigManager.HideMapCg = eval(args.type);
});

FlyCat.LL_MapPicture.Scene_Map_createWindowLayer = Scene_Map.prototype.createWindowLayer
Scene_Map.prototype.createWindowLayer = function () {
    this._mapBackSprite = new Sprite();//地图背景
    this.addChild(this._mapBackSprite);
    const mapMeta = $dataMap.meta.地图立绘背景 ? $dataMap.meta.地图立绘背景 : null;
    if (mapMeta) {
        this._mapBackSprite.bitmap = ImageManager.loadBitmap('img/menu/', mapMeta);
    }
    const x = FlyCat.LL_MapPicture.pictureX;//1270;//780
    const y = FlyCat.LL_MapPicture.pictureY;//720;//46
    const achor = Number(FlyCat.LL_MapPicture.pictureAnchor);
    var StateValue = $gameVariables.value(FlyCat.LL_SceneMenu.peopleStateVariable || 0);
    this._mapMainSprite = new Sprite();//主体
    this.addChild(this._mapMainSprite);
    this._mapMainSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_SceneMenu.sceneMapPicture);
    this._mapMainSprite.x = x;
    this._mapMainSprite.y = y;
    this._mapMainSprite.anchor.set(achor);

    // this._mapStateSprite = new Sprite();//状态
    // this.addChild(this._mapStateSprite);
    // this._mapStateSprite.x = x;
    // this._mapStateSprite.y = y;
    // this._mapStateSprite.anchor.set(achor);

    // this._mapStateSprite.bitmap = '';
    // if (StateValue == 1) this._mapStateSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_MapPicture.peopleStateZd);
    // if (StateValue == 2) this._mapStateSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_MapPicture.peopleStateZz);
    // if (StateValue == 3) this._mapStateSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_MapPicture.peopleStateBz);
    // if (StateValue == 4) this._mapStateSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_MapPicture.peopleStateFq);

    this._actorBzSprite = new Sprite();//白浊
    this.addChild(this._actorBzSprite)
    this._actorBzSprite.x = x;
    this._actorBzSprite.y = y;
    this._actorBzSprite.anchor.set(achor);
    if ($gameSwitches.value(FlyCat.LL_SceneMenu.bzSwitch)) {
        this._actorBzSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_MapPicture.peopleStateBz);
    } else {
        this._actorBzSprite.bitmap = '';
    }

    this._mapArmorSprite = new Sprite();//衣服
    this.addChild(this._mapArmorSprite);
    var img = '';
    if ($gameSystem._mapActorPicture) var img = $gameSystem._mapActorPicture;
    this._mapArmorSprite.bitmap = ImageManager.loadBitmap('img/menu/', img);
    this._mapArmorSprite.x = x;
    this._mapArmorSprite.y = y;
    this._mapArmorSprite.anchor.set(achor);

    this._mapFaceSprite = new Sprite();//表情
    this.addChild(this._mapFaceSprite);
    this._mapFaceSprite.bitmap = ImageManager.loadBitmap('img/menu/', '对话立绘-表情1');
    this._mapFaceSprite.x = x;
    this._mapFaceSprite.y = y;
    this._mapFaceSprite.anchor.set(achor);

    this._actorFqSprite = new Sprite();//发情
    this.addChild(this._actorFqSprite)
    this._actorFqSprite.anchor.set(achor);
    this._actorFqSprite.x = x;
    this._actorFqSprite.y = y;
    if ($gameSwitches.value(FlyCat.LL_SceneMenu.fqSwitch)) {
        this._actorFqSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_MapPicture.peopleStateFq);
    } else {
        this._actorFqSprite.bitmap = '';
    }

    this._actorKzSprite = new Sprite();//控制
    this.addChild(this._actorKzSprite)
    this._actorKzSprite.anchor.set(achor);
    this._actorKzSprite.x = x;
    this._actorKzSprite.y = y;
    if ($gameSwitches.value(FlyCat.LL_SceneMenu.kzSwitch)) {
        this._actorKzSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_MapPicture.peopleStateZd);
    } else {
        this._actorKzSprite.bitmap = '';
    }

    this._lastMapFaceId = 0;
    this._lastMapArmorImg = '';
    this._lastStateBitmap = '';

    if ($gameSystem._mapCgVisible == false || $gameSystem._mapCgVisible == true) {
        this._mapFaceSprite.visible = $gameSystem._mapCgVisible;
        this._mapArmorSprite.visible = $gameSystem._mapCgVisible;
        this._mapMainSprite.visible = $gameSystem._mapCgVisible;
        //this._mapStateSprite.visible = $gameSystem._mapCgVisible;
        this._actorBzSprite.visible = $gameSystem._mapCgVisible;
        this._actorFqSprite.visible = $gameSystem._mapCgVisible;
        this._actorKzSprite.visible = $gameSystem._mapCgVisible;

        this._mapBackSprite.visible = $gameSystem._mapCgVisible;
    };
    FlyCat.LL_MapPicture.Scene_Map_createWindowLayer.call(this);
};

FlyCat.LL_MapPicture.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function () {
    FlyCat.LL_MapPicture.Scene_Map_update.call(this);
    /*表情*/
    // if (this._mapFaceSprite) {
    //     this._mapFaceSprite.bitmap = ImageManager.loadBitmap('img/menu/', '对话立绘-表情' + faceId);
    // };
    /*状态*/
    // if (FlyCat.LL_SceneMenu.peopleStateVariable) {
    //     var StateValue = $gameVariables.value(FlyCat.LL_SceneMenu.peopleStateVariable);
    // }
    // else {
    //     var StateValue = 0;
    // }
    // if (StateValue == 0) this._mapStateSprite.bitmap = '';
    // if (this._mapStateSprite && StateValue > 0) {
    //     if (StateValue == 1) this._mapStateSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_MapPicture.peopleStateZd);
    //     if (StateValue == 2) this._mapStateSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_MapPicture.peopleStateZz);
    //     if (StateValue == 3) this._mapStateSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_MapPicture.peopleStateBz);
    //     if (StateValue == 4) this._mapStateSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_MapPicture.peopleStateFq);
    // }
    if ($gameSwitches.value(FlyCat.LL_SceneMenu.bzSwitch)) {//白浊
        this._actorBzSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_MapPicture.peopleStateBz);
    } else {
        this._actorBzSprite.bitmap = '';
    }
    if ($gameSwitches.value(FlyCat.LL_SceneMenu.fqSwitch)) {//发情
        this._actorFqSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_MapPicture.peopleStateFq);
    } else {
        this._actorFqSprite.bitmap = '';
    }
    if ($gameSwitches.value(FlyCat.LL_SceneMenu.kzSwitch)) {//控制
        this._actorKzSprite.bitmap = ImageManager.loadBitmap('img/menu/', FlyCat.LL_MapPicture.peopleStateZd);
    } else {
        this._actorKzSprite.bitmap = '';
    }
    /*衣服*/
    if ($gameSystem._mapActorPicture && this._lastMapArmorImg != $gameSystem._mapActorPicture) {
        var img = $gameSystem._mapActorPicture;
        this._mapArmorSprite.bitmap = ImageManager.loadBitmap('img/menu/', img);
        this._lastMapArmorImg = img;
    }
    if ($gameSystem._mapActorPicture == '') {
        this._mapArmorSprite.bitmap = $gameSystem._mapActorPicture;
        this._lastMapArmorImg = '';
    }

    /*呼吸*/
    if (this._mapFaceSprite && this._mapArmorSprite && this._mapMainSprite) {
        this._breatheCount++;
        if (this._breatheCount < 61) {
            this._mapFaceSprite.scale.y += 0.0002;
            this._mapArmorSprite.scale.y += 0.0002;
            this._mapMainSprite.scale.y += 0.0002;
            this._actorBzSprite.scale.y += 0.0002;
            this._actorFqSprite.scale.y += 0.0002;
            this._actorKzSprite.scale.y += 0.0002;
            // this._mapStateSprite.scale.y += 0.0002;
        }
        else if (this._breatheCount > 60 && this._breatheCount <= 120) {
            this._mapFaceSprite.scale.y -= 0.0002;
            this._mapArmorSprite.scale.y -= 0.0002;
            this._mapMainSprite.scale.y -= 0.0002;
            this._actorBzSprite.scale.y -= 0.0002;
            this._actorFqSprite.scale.y -= 0.0002;
            this._actorKzSprite.scale.y -= 0.0002;
            //  this._mapStateSprite.scale.y -= 0.0002;
        }
        else {
            this._breatheCount = 0;
            this._mapFaceSprite.scale.y = 1;
            this._mapArmorSprite.scale.y = 1;
            this._mapMainSprite.scale.y = 1;
            this._actorBzSprite.scale.y = 1;
            this._actorFqSprite.scale.y = 1;
            this._actorKzSprite.scale.y = 1;
            // this._mapStateSprite.scale.y = 1;
        };
    };
    /*隐藏*/
    if ($gameSystem._mapCgVisible == false || $gameSystem._mapCgVisible == true) {
        this._mapFaceSprite.visible = $gameSystem._mapCgVisible;
        this._mapArmorSprite.visible = $gameSystem._mapCgVisible;
        this._mapMainSprite.visible = $gameSystem._mapCgVisible;
        //  this._mapStateSprite.visible = $gameSystem._mapCgVisible;
        this._actorBzSprite.visible = $gameSystem._mapCgVisible;
        this._actorFqSprite.visible = $gameSystem._mapCgVisible;
        this._actorKzSprite.visible = $gameSystem._mapCgVisible;
        this._mapBackSprite.visible = $gameSystem._mapCgVisible;
    }
    const actor = $gameParty.allMembers()[0];
    if (actor) {
        const armor = $dataArmors[actor._equips[1]._itemId];
        if (armor) {
            const value = $gameParty.gainItemDurability(armor);
            const hzList = armor.meta.行走图换装.split(',');
            if (value >= 100) {
                actor.setCharacterImage('$N-8', 0);
            } else {
                if (hzList.length >= 2) {
                    const hzImg = hzList[0];
                    const hzIndex = hzList[1];
                    actor.setCharacterImage(hzImg, hzIndex);
                } else {
                    const hzImg = hzList[0];
                    actor.setCharacterImage(hzImg, 0);
                }
            }
        } else {
            actor.setCharacterImage(actor._lastCharacterName, actor._lastCharacterIndex);
        }
    }
};
FlyCat.LL_SceneMenu.Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function () {
    if (SceneManager._scene instanceof Scene_Map) {
        const faceEye = $gameMessage.allText().match(/\\Face\[(\w+)\]/);
        if (faceEye) {
            const faceId = faceEye[1];
            SceneManager._scene._mapFaceSprite.bitmap = ImageManager.loadBitmap('img/menu/', '对话立绘-表情' + faceId);
        }
    }
    FlyCat.LL_SceneMenu.Window_Message_startMessage.call(this)
};
FlyCat.LL_SceneMenu.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function (text) {
    text = text.replace(/\\Face\[(\w+)\]/gi, "");
    return FlyCat.LL_SceneMenu.Window_Base_convertEscapeCharacters.call(this, text);
};
FlyCat.LL_SceneMenu.Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function () {
    FlyCat.LL_SceneMenu.Window_Message_terminateMessage.call(this);
    if (SceneManager._scene instanceof Scene_Map) {
        SceneManager._scene._mapFaceSprite.bitmap = ImageManager.loadBitmap('img/menu/', '对话立绘-表情1');
    };
};