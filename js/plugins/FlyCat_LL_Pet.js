//=============================================================================
// RPG Maker MZ - 琉璃岛宠物插件
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<琉璃岛宠物插件>
 * @author FlyCat
 * 
 * @command addPetActor
 * @text 添加宠物
 * @desc 添加宠物
 *
 * @arg actorId
 * @text 选择想要添加宠物
 * @type actor
 * 
 * @command upLevelPetActor
 * @text 选择进化宠物
 * @desc 选择进化宠物
 *
 * @arg actorId
 * @text 进化的宠物
 * @type actor
 * 
 * @arg actorUpId
 * @text 进化后的宠物
 * @type actor
 * 
 * @help
 * 2021.2.22
 * 1.UI布局处理
 * 2.可参战宠物为1只
 * 3.宠物装备只显示护甲
 * ==============================使用说明================================
 * 在img下创建pet文件夹
 * 宠物立绘放在img/pet下
 * 宠物最多参战2只
 * 宠物只能选择一个技能上场
 * ==============================角色备注================================
 * 在宠物角色备注中填写：
 * <颜色:x>   x为色号可改变宠物名字颜色
 * <宠物立绘:xxx> xxx为宠物立绘文件名
 * <宠物技能:x> 宠物可选择的技能Id
 * <宠物技能:x,x,x,x> 宠物可选择多个技能用‘,’号隔开
 * ==============================插件命令================================
 * 添加指定的宠物进入宠物窗口中
 * =====================================================================
 */
'use strict';
var Imported = Imported || {};
Imported.FlyCat_LL_Pet = true;

var FlyCat = FlyCat || {};
FlyCat.LL_Pet = {};
FlyCat.LL_Pet.parameters = PluginManager.parameters('FlyCat_LL_Pet');

PluginManager.registerCommand('FlyCat_LL_Pet', 'addPetActor', args => {
    if (!$gameSystem._petActorList) {
        $gameSystem._petActorList = [];
    }
    const pet = $dataActors[args.actorId];
    const index = $gameSystem._petActorList.indexOf(pet);
    if (index == -1) {
        $gameSystem._petActorList.push(pet)
    }
});
PluginManager.registerCommand('FlyCat_LL_Pet', 'upLevelPetActor', args => {
    const petId = Number(args.actorId);
    $gameParty.removeActor(petId)
    for (let i = 0; i < $gameSystem._petActorList.length; i++) {
        if ($gameSystem._petActorList[i].id == petId) {
            $gameSystem._petActorList.splice(i, 1);
            break;
        }
    }
    const newpet = $dataActors[args.actorUpId];
    const index = $gameSystem._petActorList.indexOf(newpet);
    if (index == -1) {
        $gameSystem._petActorList.push(newpet);
    }
});
FlyCat.LL_Pet.Scene_Item_onActorOk = Scene_Item.prototype.onActorOk
Scene_Item.prototype.onActorOk = function () {
    if (this.item() && this.item().meta.指定角色) {
        const index = this._actorWindow.index();
        if (index >= 0) {
            const actor = this._actorWindow.actor(index);
            if (actor) {
                const actorId = Number(this.item().meta.指定角色);
                if (actor._actorId != actorId) {
                    SoundManager.playBuzzer();
                    return;
                }
            }

        }
    }
    FlyCat.LL_Pet.Scene_Item_onActorOk.call(this)
};


Game_Party.prototype.maxBattleMembers = function () {
    return 2;
};

function Scene_LL_Pet() {
    this.initialize(...arguments);
}

Scene_LL_Pet.prototype = Object.create(Scene_MenuBase.prototype);
Scene_LL_Pet.prototype.constructor = Scene_Menu;

Scene_LL_Pet.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
    FlyCat.LL_Pet._Scene_LL_Pet = this;
};
Scene_LL_Pet.prototype.create = function () {
    this.createBackground();
    this.createPetInfo();
    this.createPetListWindow();
    this.createPetSkillListWindow();
    this.createPetSkillWindow();
    this.createPetBattleCommandWindow();
};
Scene_LL_Pet.prototype.createPetBattleCommandWindow = function () {
    const rect = this.petBattleCommandWindowRect();
    const petBattleWindow = new Window_PetBattleCommand(rect);
    petBattleWindow.setHandler('addPet', this.addPet.bind(this));
    petBattleWindow.setHandler('removePet', this.removePet.bind(this));
    this.addChild(petBattleWindow);
    this._petBattleWindow = petBattleWindow;
    this._petListWindow.setPetBattle(this._petBattleWindow);
    this._petBattleWindow.deactivate();
    this._petBattleWindow.hide()
};
Scene_LL_Pet.prototype.addPet = function () {
    const index = this._petListWindow.index();
    const pets = $gameSystem._petActorList[index];
    const pet = $gameActors.actor(pets.id);
    const actorList = $gameParty.allMembers();
    const actorIndex = actorList.indexOf(pet)
    const actorLength = $gameParty.allMembers().length;
    const maxActor = $gameParty.maxBattleMembers();
    if (actorLength < maxActor && actorIndex == -1) {
        $gameParty.addActor(pets.id)
        SoundManager.playEquip();
    }
    else {
        SoundManager.playBuzzer();
    }
    this._petListWindow.refresh();

};
Scene_LL_Pet.prototype.removePet = function () {
    const index = this._petListWindow.index();
    const pets = $gameSystem._petActorList[index];
    const pet = $gameActors.actor(pets.id);
    const actorList = $gameParty.allMembers();
    const actorIndex = actorList.indexOf(pet)
    if (actorIndex == -1) {
        SoundManager.playBuzzer();
    }
    else {
        SoundManager.playEquip();
        $gameParty.removeActor(pets.id)
    }
    this._petListWindow.refresh();
};
Scene_LL_Pet.prototype.petBattleCommandWindowRect = function () {
    const ww = 140;
    const wh = 140;
    const wx = 630;
    const wy = 50;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_LL_Pet.prototype.createPetSkillListWindow = function () {
    const rect = this.petSkillListWindowRect();
    const petSkillListWindow = new Window_PetSkillList(rect);
    petSkillListWindow.setHandler('ok', this.okPetSkill.bind(this));
    petSkillListWindow.setHandler('cancel', this.cancelPetList.bind(this));
    this.addChild(petSkillListWindow);
    this._petSkillListWindow = petSkillListWindow;
    this._petSkillListWindow.setPetWindow(this._petListWindow);
    this._petSkillListWindow.hide();
};
Scene_LL_Pet.prototype.okPetSkill = function () {
    const pet = $gameActors.actor(this._pet.id);
    const index = this._petSkillListWindow.index();
    const skillId = this._petSkillListWindow._list[index];
    pet._skills = [];
    pet.learnSkill(skillId);
    this.cancelPetList();
};
Scene_LL_Pet.prototype.petSkillListWindowRect = function () {
    const ww = 200;
    const wh = 200;
    const wx = 400;
    const wy = 450;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_LL_Pet.prototype.cancelPetList = function () {
    this._petSkillListWindow.deactivate();
    this._petSkillListWindow.hide();
    this._petSkillListWindow.deselect();
    this._petSkillWindow.deactivate();
    this._petSkillWindow.deselect();
    this._petListWindow.activate();
    this._petInfoWindow.refresh(this._pet);
};
Scene_LL_Pet.prototype.createPetSkillWindow = function () {
    const rect = this.petSkillWindowRect();
    const petSkillWindow = new Window_PetSkill(rect);
    petSkillWindow.setHandler('petSkill', this.selectPetSkill.bind(this));
    //  petSkillWindow.setHandler('cancel', this.cancelPetSkill.bind(this));
    this.addChild(petSkillWindow);
    this._petSkillWindow = petSkillWindow;
    this._petListWindow.setPetSkill(this._petSkillWindow);
    this._petSkillWindow.deactivate();
    this._petSkillWindow.deselect();
    this._petSkillWindow.hide()
};
Scene_LL_Pet.prototype.cancelPetSkill = function () {
    this._petSkillWindow.deactivate();
    this._petSkillWindow.deselect();
    this._petListWindow.activate();
};
Scene_LL_Pet.prototype.petSkillWindowRect = function () {
    const ww = 200;
    const wh = 80;
    const wx = 400;
    const wy = 370;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_LL_Pet.prototype.selectPetSkill = function () {
    const index = this._petListWindow.index();
    if (index >= 0) {
        const pet = $gameSystem._petActorList[index];
        this._pet = pet;
        if (pet.meta.宠物技能) {
            this._petSkillWindow.deactivate();
            this._petSkillListWindow.activate();
            this._petSkillListWindow.show();
            this._petSkillListWindow.refresh();
            this._petSkillListWindow.select(0);
        } else {
            this._petSkillWindow.activate();
            SoundManager.playBuzzer();
        }
    }
    else {
        this._petListWindow.activate();
        SoundManager.playBuzzer();
    }
};
Scene_LL_Pet.prototype.createPetListWindow = function () {
    const rect = this.petListWindowRect();
    const petListWindow = new Window_PetList(rect);
    petListWindow.setHandler('cancel', this.popScene.bind(this));
    this.addChild(petListWindow);
    this._petListWindow = petListWindow;
    this._petListWindow.setPetInfoWindow(this._petInfoWindow);
    if ($gameSystem._petActorList) {
        this._petListWindow.select(0);
    }
};

Scene_LL_Pet.prototype.createPetInfo = function () {
    const rect = this.petInfoWindowRect();
    const petInfoWindow = new Window_PetInfo(rect);
    this.addChild(petInfoWindow);
    this._petInfoWindow = petInfoWindow;
};
Scene_LL_Pet.prototype.petListWindowRect = function () {
    const ww = 220;
    const wh = 600;
    const wx = 180;
    const wy = 50;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_LL_Pet.prototype.petInfoWindowRect = function () {
    const ww = 400;
    const wh = 600;
    const wx = 400;
    const wy = 50;
    return new Rectangle(wx, wy, ww, wh);
};
///////////////////////////宠物上场窗口////////////////////

function Window_PetBattleCommand() {
    this.initialize(...arguments);
}

Window_PetBattleCommand.prototype = Object.create(Window_Command.prototype);
Window_PetBattleCommand.prototype.constructor = Window_PetBattleCommand;

Window_PetBattleCommand.prototype.initialize = function (rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.opacity = 0;
    this.deselect();
};
Window_PetBattleCommand.prototype.makeCommandList = function () {
    this.contents.fontSize = 20;
    this.addCommand('参战', 'addPet', true);
    this.addCommand('休息', 'removePet', true);
};
Window_PetBattleCommand.prototype.drawItem = function (index) {
    const rect = this.itemLineRect(index);
    const align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};
Window_PetBattleCommand.prototype.maxItems = function () {
    return 2;
};
Window_PetBattleCommand.prototype.rowSpacing = function () {
    return 10;
};
Window_PetBattleCommand.prototype.numVisibleRows = function () {
    return 2;
};
Window_PetBattleCommand.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
Window_PetBattleCommand.prototype.maxCols = function () {
    return 1;
};
Window_PetBattleCommand.prototype.processTouch = function () {
    if (this.isOpenAndActive()) {
        if (this.isHoverEnabled() && TouchInput.isHovered()) {
            this.onTouchSelect(false);
        } else if (TouchInput.isTriggered()) {
            this.onTouchSelect(true);
        }
        if (TouchInput.isClicked()) {
            this.onTouchOk();
        } else if (TouchInput.isCancelled()) {
            this.onTouchCancel();
        }
    }
    else {
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            this.activate();
            this.onTouchSelect(true);
            if (this.index() >= 0) {
                this.processOk();
            }

        }
    }
};
///////////////////////////宠物技能列表//////////////////////////
function Window_PetSkillList() {
    this.initialize(...arguments);
}

Window_PetSkillList.prototype = Object.create(Window_Selectable.prototype);
Window_PetSkillList.prototype.constructor = Window_PetSkillList;

Window_PetSkillList.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
};
Window_PetSkillList.prototype.refresh = function () {
    this.contents.clear();
    this._list = [];
    const index = this._petListWindow.index();
    this._list = $gameSystem._petActorList[index].meta.宠物技能.split(',');
    this.drawAllItems();
};
Window_PetSkillList.prototype.setPetWindow = function (object) {
    this._petListWindow = object;
};
Window_PetSkillList.prototype.drawItem = function (index) {
    const rect = this.itemLineRect(index);
    const skill = $dataSkills[Number(this._list[index])];
    if (skill) {
        this.drawIcon(skill.iconIndex, rect.x, rect.y)
        this.drawText(skill.name, rect.x + 48, rect.y, this.width, 'left')
    }
}
Window_PetSkillList.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_PetSkillList.prototype.maxCols = function () {
    return 1;
};
Window_PetSkillList.prototype.numVisibleRows = function () {
    return 3;
};
Window_PetSkillList.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
///////////////////////////宠物技能选择//////////////////////////
function Window_PetSkill() {
    this.initialize(...arguments);
}

Window_PetSkill.prototype = Object.create(Window_Command.prototype);
Window_PetSkill.prototype.constructor = Window_PetSkill;

Window_PetSkill.prototype.initialize = function (rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.opacity = 0;
    this.deselect();
};
Window_PetSkill.prototype.makeCommandList = function () {
    this.contents.fontSize = 20;
    this.addCommand('选择技能', 'petSkill', true);
};
Window_PetSkill.prototype.maxItems = function () {
    return 1;
};
Window_PetSkill.prototype.rowSpacing = function () {
    return 10;
};
Window_PetSkill.prototype.numVisibleRows = function () {
    return 1;
};
Window_PetSkill.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
Window_PetSkill.prototype.maxCols = function () {
    return 1;
};
Window_PetSkill.prototype.processTouch = function () {
    if (this.isOpenAndActive()) {
        if (this.isHoverEnabled() && TouchInput.isHovered()) {
            this.onTouchSelect(false);
        } else if (TouchInput.isTriggered()) {
            this.onTouchSelect(true);
        }
        if (TouchInput.isClicked()) {
            this.onTouchOk();
        } else if (TouchInput.isCancelled()) {
            this.onTouchCancel();
        }
    }
    else {
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            FlyCat.LL_Pet._Scene_LL_Pet._petListWindow.deactivate();
            this.activate();
            this.onTouchSelect(true);
            if (this.index() >= 0) {
                this.processOk();
            }

        }
    }
};
///////////////////////////////////////宠物列表/////////////////////////////////
function Window_PetList() {
    this.initialize(...arguments);
}

Window_PetList.prototype = Object.create(Window_Selectable.prototype);
Window_PetList.prototype.constructor = Window_PetList;

Window_PetList.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.activate();
    this.refresh();
};
Window_PetList.prototype.refresh = function () {
    this.contents.clear();
    this.contents.fontSize = 20;
    this._list = [];
    this._list = $gameSystem._petActorList ? $gameSystem._petActorList : [];
    if (this._list.length > 0) {
        this.drawAllItems();
    } else {
        this.drawText('未获得宠物', -10, this.height / 2 - 20, this.width, 'center')
    }
};
Window_PetList.prototype.drawItem = function (index) {
    const rect = this.itemLineRect(index);
    const pet = this._list[index];
    if (pet) {
        const colorId = pet.meta.颜色 ? pet.meta.颜色 : 0;
        this.changeTextColor(ColorManager.textColor(Number(colorId)));
        this.drawText(pet.name, rect.x, rect.y, this.width, 'left')
        const pets = $gameActors.actor(pet.id)
        const petIndex = $gameParty.allMembers().indexOf(pets);
        if (petIndex != -1) {
            var note = '[已参战]';
        }
        else {
            var note = '[未参战]';
        }
        this.contents.fontSize = 16;
        this.changeTextColor(ColorManager.textColor(14));
        this.drawText(note, rect.x, rect.y, this.itemWidth() - 20, 'right')
        this.resetTextColor();
    }
}
Window_PetList.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_PetList.prototype.maxCols = function () {
    return 1;
};
Window_PetList.prototype.numVisibleRows = function () {
    return 10;
};
Window_PetList.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
Window_PetList.prototype.setPetInfoWindow = function (object) {
    this._petinfoWindow = object;
};
Window_PetList.prototype.setPetSkill = function (object) {
    this._PetSkillWindow = object;
};
Window_PetList.prototype.setPetBattle = function (object) {
    this._petBattleWindow = object;
};
FlyCat.LL_Pet.Window_PetList_select = Window_PetList.prototype.select;
Window_PetList.prototype.select = function (index) {
    FlyCat.LL_Pet.Window_PetList_select.call(this, index)
    if (index >= 0 && index < this.maxItems() && index != this.lastselect) {
        const pet = this._list[index];
        if (this._petinfoWindow && pet) {
            this._petinfoWindow.refresh(pet);
            this.lastselect = index;
        }
    }
};
FlyCat.LL_Pet.Window_PetList_update = Window_PetList.prototype.update;
Window_PetList.prototype.update = function () {
    FlyCat.LL_Pet.Window_PetList_update.call(this);
    if (this._PetSkillWindow && this._list.length > 0 && this._PetSkillWindow.visible == false) {
        this._PetSkillWindow.show()
    };
    if (this._petBattleWindow && this._list.length > 0 && this._petBattleWindow.visible == false) {
        this._petBattleWindow.show()
    };
};
////////////////////////宠物信息///////////////////////////
function Window_PetInfo() {
    this.initialize(...arguments);
}

Window_PetInfo.prototype = Object.create(Window_Base.prototype);
Window_PetInfo.prototype.constructor = Window_PetInfo;

Window_PetInfo.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.createPetSprite();
};
Window_PetInfo.prototype.createPetSprite = function () {
    this._petSprite = new Sprite()
    this.addChild(this._petSprite)
    this._petSprite.anchor.set(0.5);
    this._petSprite.x = 600;
    this._petSprite.y = 300;
    this._breatheCount = 0;
};
FlyCat.LL_Pet.Window_PetInfo_update = Window_PetInfo.prototype.update;
Window_PetInfo.prototype.update = function () {
    FlyCat.LL_Pet.Window_PetInfo_update.call(this);
    if (this._petSprite) {
        this._breatheCount++;
        if (this._breatheCount < 61) {
            this._petSprite.scale.y += 0.0002;
            this._petSprite.scale.x += 0.0002;
        }
        else if (this._breatheCount > 60 && this._breatheCount <= 120) {
            this._petSprite.scale.y -= 0.0002;
            this._petSprite.scale.x -= 0.0002;
        }
        else {
            this._breatheCount = 0;
            this._petSprite.scale.y = 1;
            this._petSprite.scale.x = 1;
        }
    }
}
Window_PetInfo.prototype.refresh = function (actor) {
    this.contents.clear();
    this.resetTextColor();
    this.contents.fontSize = 20;
    if (actor.meta.宠物立绘) {
        var img = actor.meta.宠物立绘;
    }
    else {
        var img = '';
    }
    this._petSprite.bitmap = ImageManager.loadBitmap('img/pet/', img);
    const pet = $gameActors.actor(actor.id);
    var x = 0;
    var y = 5;
    this.drawText('宠物名称：' + pet.name(), x, y, this.width, 'left')
    y += 30;
    for (let i = 0; i < 8; i++) {
        const text = TextManager.param(i);
        const value = pet.param(i);
        if (i == 0) {
            var value1 = pet.hp + '/';
        }
        else if (i == 1) {
            var value1 = pet.mp + '/';
        }
        else {
            var value1 = '';
        }
        this.drawText(text + '：' + value1 + value, x, y, this.width, 'left')
        y += 30;
    }
    const equips = pet.equips();
    const item = equips[7];
    const slotName = this.actorSlotName(pet, 7);
    const sw = this.width;
    this.changeTextColor(ColorManager.textColor(14));
    this.drawText(slotName, x, y + 5, sw, 'left');
    this.drawItemName(item, x + 140, y + 5, sw, 'left');
    // for (let i = 0; i < equips.length; i++) {
    //     const item = equips[i];
    //     const slotName = this.actorSlotName(pet, i);
    //     const sw = this.width;
    //     this.changeTextColor(ColorManager.textColor(14));
    //     this.drawText(slotName, x, y, sw, 'left');
    //     this.drawItemName(item, x + 140, y, sw, 'left');
    //     y += 30;
    // }
    y += 57;
    x = this.width / 2;
    if (pet._skills.length > 0) {
        const skill = $dataSkills[Number(pet._skills[0])];
        this.drawIcon(skill.iconIndex, x, y)
        this.drawText(skill.name, x + 48, y, this.width, 'left');
    }
    this.resetTextColor();
};
Window_PetInfo.prototype.actorSlotName = function (actor, index) {
    const slots = actor.equipSlots();
    return $dataSystem.equipTypes[slots[index]];
};

