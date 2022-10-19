//==============================================================================================================
// LL_Scenes.js
//==============================================================================================================
/*:
 * @target MZ
 * @plugindesc 场景 <Liuli Island>
 * @author 芯☆淡茹水
 * @help 
 * 
 * 
*/
//==============================================================================================================
; var XdRsData = XdRsData || {};
XdRsData.ll = XdRsData.ll || {};
//==============================================================================================================
Scene_Base.prototype.createQTEsprite = function () {
    this.removeQTEsprite();
    this._QTEsprite = new Sprite_QTE();
    this.addChild(this._QTEsprite);
};
Scene_Base.prototype.removeQTEsprite = function () {
    if (this._QTEsprite) {
        this.removeChild(this._QTEsprite);
        this._QTEsprite.destroy();
        this._QTEsprite = null;
    }
};
//==============================================================================================================
Scene_Boot.prototype.startNormalGame = function () {
    this.checkPlayerLocation();
    DataManager.setupNewGame();
    SceneManager.goto(Scene_LL_Title);
    Window_TitleCommand.initCommandPosition();
};
//==============================================================================================================
function Scene_LL_Title() {
    this.initialize(...arguments);
}
Scene_LL_Title.prototype = Object.create(Scene_Base.prototype);
Scene_LL_Title.prototype.constructor = Scene_LL_Title;
Scene_LL_Title.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this._menuButtonSprite = [];
    this._isStatic = $gameTemp.isTitleStatic();
    $gameTemp.setTitleStatic(true);
    this._flyPlayBg = false;
    this._flyPlayBgCounts = 0;
    this._flyOnCommand = 0;
};
Scene_LL_Title.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this._bg = new Sprite_TitleBg(this._isStatic);
    this._log = new Sprite_GameLogo(this._isStatic);
    this.addChild(this._bg);
    this.addChild(this._log);
    this.createCommandWindow();
    this.createMenuButtons();
    this.createEffectMask();
    this.createExitInquiry();
};
Scene_LL_Title.prototype.createCommandWindow = function () {
    const background = $dataSystem.titleCommandWindow.background;
    const rect = this.commandWindowRect();
    this._commandWindow = new Window_TitleCommand(rect);
    this._commandWindow.setBackgroundType(background);
    // this._commandWindow = new LL_TitleCommand(this._isStatic);
    this._commandWindow.setHandler('newGame', this.commandNewGame.bind(this));
    this._commandWindow.setHandler('loadGame', this.commandContinue.bind(this));
    this._commandWindow.setHandler('reading', this.commandReading.bind(this));
    this._commandWindow.setHandler('exit', this.commandExitGame.bind(this));
    this.addChild(this._commandWindow);
    // this._commandWindow.open();
};
Window_TitleCommand.prototype.processCursorMove = function () {
    if (this.isCursorMovable()) {
        const lastIndex = this.index();
        if (Input.isRepeated("down")) {
            this.cursorDown(Input.isTriggered("down"));
        }
        if (Input.isRepeated("up")) {
            this.cursorUp(Input.isTriggered("up"));
        }
        if (Input.isRepeated("right")) {
            this.cursorRight(Input.isTriggered("right"));
            this.cursorDown(Input.isTriggered("down"));
        }
        if (Input.isRepeated("left")) {
            this.cursorLeft(Input.isTriggered("left"));
            this.cursorUp(Input.isTriggered("up"));
        }
        if (!this.isHandled("pagedown") && Input.isTriggered("pagedown")) {
            this.cursorPagedown();
        }
        if (!this.isHandled("pageup") && Input.isTriggered("pageup")) {
            this.cursorPageup();
        }
        if (this.index() !== lastIndex) {
            this.playCursorSound();
        }
    }
};
Scene_LL_Title.prototype.commandContinue = function () {
    // this._commandWindow.close();
    this._flyOnCommand = 1;
    SceneManager.push(Scene_Load);
    $gameSystem._onCommandLoad = true;
};
Scene_Load.prototype.popScene = function () {
    if ($gameSystem._onCommandLoad == true) {
        $gameSystem._onCommandLoad = false;
        $gameTemp.setTitleStatic(false);
        SceneManager.goto(Scene_LL_Title);
    }
    else {
        SceneManager.pop();
    }

};
Scene_LL_Title.prototype.commandWindowRect = function () {
    const offsetX = $dataSystem.titleCommandWindow.offsetX;
    const offsetY = $dataSystem.titleCommandWindow.offsetY;
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(3, true);
    const wx = (Graphics.boxWidth - ww) / 2 + offsetX + 2000;
    const wy = Graphics.boxHeight - wh - 96 + offsetY;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_LL_Title.prototype.createEffectMask = function () {
    this._effectMask = new Sprite_TitleMask();
    this._isStatic && this._effectMask.start();
    this.addChild(this._effectMask);
};
Scene_LL_Title.prototype.createExitInquiry = function () {
    this._exitInquiry = new LL_InquiryExit();
    this._exitInquiry.hide();
    this.addChild(this._exitInquiry);

};
Scene_LL_Title.prototype.terminate = function () {
    Scene_Base.prototype.terminate.call(this);
    SceneManager.snapForBackground();
    const index = this._commandWindow.index();
    $gameSystem.saveIndex('titleCmd', index);
};
Scene_LL_Title.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    if (this._isStatic) {
        Scene_Title.prototype.playTitleMusic.call(this);
    }
};
Scene_LL_Title.prototype.startDisplyOther = function () {
    this._bg.startShow();
    this._effectMask.start();
    this._commandWindow.show();
    this._commandWindow.activate();
    Scene_Title.prototype.playTitleMusic.call(this);
    this._flyPlayBg = true;
};
Scene_LL_Title.prototype.commandNewGame = function () {
    this._flyOnCommand = 1;
    DataManager.setupNewGame();
    // this._commandWindow.hide();
    this.fadeOutAll();
    SceneManager.goto(Scene_Map);
};
// Scene_LL_Title.prototype.commandLoadGame = function () {
//     SceneManager.push(Scene_LL_TitleLoad);
// };
Scene_LL_Title.prototype.commandReading = function () {
    this._flyOnCommand = 1;
    this.fadeOutAll();
    XdRsData.ll.gotoMemoriesHouse();
};
Scene_LL_Title.prototype.commandExitGame = function () {
    // this._exitInquiry.show();
    // this._exitInquiry.startRoll();
    SceneManager.exit();
};
Scene_LL_Title.prototype.activateCommand = function () {
    this._commandWindow.activate();
};

//==============================================================================================================
XdRsData.ll.Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function () {
    XdRsData.ll.Scene_Map_createDisplayObjects.call(this);
    this.createGameCg();
};
Scene_Map.prototype.createGameCg = function () {
    // if ($gameSystem.isMapCgDisplay()) {
    //     this._gameCg = new Sprite_GameCG();
    //     this.addChild(this._gameCg);
    // }
};
Scene_Map.prototype.isTouchGameCg = function () {
    return this._gameCg && this._gameCg.onPress();
};
XdRsData.ll.Scene_Map_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
Scene_Map.prototype.isAnyButtonPressed = function () {
    return this.isTouchGameCg() || XdRsData.ll.Scene_Map_isAnyButtonPressed.call(this);
};
Scene_Map.prototype.callMenu = function () {
    SoundManager.playOk();
    SceneManager.push(Scene_LL_IntegrateMenu);
    Window_MenuCommand.initCommandPosition();
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
};
//==============================================================================================================
function Scene_LL_IntegrateMenu() {
    this.initialize(...arguments);
}
Scene_LL_IntegrateMenu.prototype = Object.create(Scene_Base.prototype);
Scene_LL_IntegrateMenu.prototype.constructor = Scene_LL_IntegrateMenu;
Scene_LL_IntegrateMenu.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this._windows = [{}, {}, {}, {}, {}, {}, {}];
    this._loadSuccess = false;
    this._isOptioned = false;
    this._onCancel = true;
};
Scene_LL_IntegrateMenu.prototype.terminate = function () {
    Scene_Base.prototype.terminate.call(this);
    this._loadSuccess && $gameSystem.onAfterLoad();
    this._isOptioned && ConfigManager.save();
};
Scene_LL_IntegrateMenu.prototype.setOptioned = function () {
    this._isOptioned = true;
};
Scene_LL_IntegrateMenu.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createMenuBg();

    for (var i = 0; i < 7; ++i) {
        this['createWindowsKind' + i]();
        this.windows(i).forEach(w => this.addChild(w));
    }

    this.createCommandWindow();
    this.createTopWindows();
    this.createBackButton();
    this.createInquirys();

    this.refreshWindows();

};
Scene_LL_IntegrateMenu.prototype.createMenuBg = function () {
    this._menuBg = new LL_MenuBg();
    this.addChild(this._menuBg);
};
Scene_LL_IntegrateMenu.prototype.createCommandWindow = function () {
    this._commandWindow = new LL_MenuCommand();
    this._commandWindow.setHandler('ok', this.onCommandOk.bind(this));
    this._commandWindow.setHandler('reset', this.refreshWindows.bind(this));
    this.addChild(this._commandWindow);
};
Scene_LL_IntegrateMenu.prototype.createTopWindows = function () {
    this._titleWindow = new LL_MenuTitle();
    //  this._helpWindow = new LL_MenuHelp();
    this.addChild(this._titleWindow);
    //  this.addChild(this._helpWindow);
};
Scene_LL_IntegrateMenu.prototype.createBackButton = function () {
    this._backButton = new Ui_Button(1200, 8, 'back');
    this._backButton.hide();
    this.addChild(this._backButton);
};
Scene_LL_IntegrateMenu.prototype.createInquirys = function () {
    this._inquirys = {};
    this._inquirys.item = new LL_InquiryItem();
    this._inquirys.skill = new LL_InquirySkill();
    this._inquirys.file = new LL_InquiryFileSelect();
    this._inquirys.exit = new LL_InquiryExit();
    this._inquirys.item.hide();
    this._inquirys.skill.hide();
    this._inquirys.file.hide();
    this._inquirys.exit.hide();
    const keys = Object.keys(this._inquirys);
    keys.forEach(k => this.addChild(this._inquirys[k]));
};
Scene_LL_IntegrateMenu.prototype.createWindowsKind0 = function () {
    this._windows[0].cg = new Sprite_GameCG(true);
    this._windows[0].info = new LL_MenuActorInfo();
};
Scene_LL_IntegrateMenu.prototype.createWindowsKind1 = function () {
    this._windows[1].list = new LL_MenuItemList();
    this._windows[1].type = new LL_MenuItemType();
    this._windows[1].info = new LL_MenuItemInfo();
    this._windows[1].type.setHandler('cancel', this.backToCommand.bind(this));
    this._windows[1].type.setHandler('reset', this.refreshItemType.bind(this));
    this._windows[1].list.setHandler('ok', this.onItemListOk.bind(this));
    this._windows[1].list.setHandler('valid', this.isItemListValid.bind(this));
    this._windows[1].list.setHandler('reset', this.refreshItemInfo.bind(this));
    this.refreshItemType();
    this.refreshItemInfo();
};
Scene_LL_IntegrateMenu.prototype.createWindowsKind2 = function () {
    this._windows[2].type = new LL_MenuEquips();
    this._windows[2].list = new LL_MenuEquipList();
    this._windows[2].info = new LL_MenuEquipInfo();
    this._windows[2].type.setHandler('ok', this.onEquipTypeOk.bind(this));
    this._windows[2].type.setHandler('cancel', this.backToCommand.bind(this));
    this._windows[2].type.setHandler('reset', this.refreshEquipType.bind(this));
    this._windows[2].list.setHandler('ok', this.onEquipListOk.bind(this));
    this._windows[2].list.setHandler('valid', this.isEquipListValid.bind(this));
    this._windows[2].list.setHandler('reset', this.refreshEquipInfo.bind(this));
    this._windows[2].list.setHandler('cancel', this.onEquipListCancel.bind(this));
    this.refreshEquipType();
};
Scene_LL_IntegrateMenu.prototype.createWindowsKind3 = function () {
    this._windows[3].list = new LL_MenuSkillList();
    this._windows[3].info = new LL_MenuSkillInfo();
    this._windows[3].list.setHandler('ok', this.onSkillListOk.bind(this));
    this._windows[3].list.setHandler('valid', this.isSkillListValid.bind(this));
    this._windows[3].list.setHandler('reset', this.refreshSkillInfo.bind(this));
    this._windows[3].list.setHandler('cancel', this.backToCommand.bind(this));
    this.refreshSkillInfo();
};
Scene_LL_IntegrateMenu.prototype.createWindowsKind4 = function () {
    this._windows[4].list = new LL_FileList('save');
    this._windows[4].info = new LL_FileInfo();
    this._windows[4].list.deactivate();
    this._windows[4].list.setHandler('reset', this.refreshFileInfo.bind(this));
    this._windows[4].list.setHandler('cancel', this.backToCommand.bind(this));
    this.refreshFileInfo();
};
Scene_LL_IntegrateMenu.prototype.createWindowsKind5 = function () {
    this._windows[5].list = new LL_OptList();
    this._windows[5].list.setHandler('exit', this.onInquirysExit.bind(this));
    this._windows[5].list.setHandler('cancel', this.backToCommand.bind(this));
};
Scene_LL_IntegrateMenu.prototype.createWindowsKind6 = function () {
    this._windows[6].info = new LL_MenuSpecialInfo();
};
Scene_LL_IntegrateMenu.prototype.windows = function (index) {
    if (!this._windows[index]) return [];
    const keys = Object.keys(this._windows[index]);
    return keys.map(k => this._windows[index][k]);
};
Scene_LL_IntegrateMenu.prototype.onButtonPress = function () {
    const keys = Object.keys(this._inquirys);
    keys.forEach(k => this._inquirys[k].deactivate());
    const size = this._windows.length;
    for (let i = 0; i < size; ++i) {
        var windows = this.windows(i);
        windows.forEach(w => w.deactivate && w.deactivate());
    }
    this.moveOutAll();
};
Scene_LL_IntegrateMenu.prototype.displayButton = function () {
    this._backButton.show();
};
Scene_LL_IntegrateMenu.prototype.currentIndex = function () {
    return this._onCancel ? 0 : this._commandWindow.index() + 1;
};
Scene_LL_IntegrateMenu.prototype.refreshWindows = function () {
    const index = this.currentIndex();
    this._menuBg.changeType(index);
    this._titleWindow.changeType(index);
    if (index === 0) this._windows[0].info.refresh();
    for (var i = 0; i < 7; ++i) {
        var result = index === i;
        this.windows(i).forEach(w => result ? w.show() : w.hide());
        if (i === 6) this._windows[6].info.refresh();
    }
};
Scene_LL_IntegrateMenu.prototype.onCommandOk = function () {
    const n = this.currentIndex();
    switch (n) {
        case 1: this._windows[1].type.activate();
            this._windows[1].list.activate(); break;
        case 2: this._windows[2].type.activate(); break;
        case 3: this._windows[3].list.activate(); break;
        case 4: this._windows[4].list.activate(); break;
        case 5: this._windows[5].list.activate(); break;
        case 6: this._commandWindow.activate();
            this._commandWindow.setSelectedState(false);
            break;
    }
};
Scene_LL_IntegrateMenu.prototype.onCommandCancel = function () {
    this._onCancel = true;
    this._cancelCooling = 8;
};
Scene_LL_IntegrateMenu.prototype.backToCommand = function () {
    const index = this.currentIndex();
    if (index > 0) {
        this.windows(index).forEach(w => w.deactivate());
    }
    this._commandWindow.activate();
    this._commandWindow.setSelectedState(false);
};
Scene_LL_IntegrateMenu.prototype.isItemListValid = function () {
    const item = this._windows[1].list.item();
    return this.itemCanUse(item);
};
Scene_LL_IntegrateMenu.prototype.onItemListOk = function () {
    this._windows[1].type.deactivate();
    this._inquirys.item.startRoll();
};
Scene_LL_IntegrateMenu.prototype.refreshItemType = function () {
    const type = this._windows[1].type.index();
    this._windows[1].list.changeItemType(type);
};
Scene_LL_IntegrateMenu.prototype.refreshItemInfo = function () {
    const item = this._windows[1].list.item();
    this._windows[1].info.setItem(item);
};
Scene_LL_IntegrateMenu.prototype.onEquipTypeOk = function () {
    this._windows[2].info.setContrast(true);
    this.refreshEquipInfo();
    this._windows[2].list.activate();
};
Scene_LL_IntegrateMenu.prototype.isEquipListValid = function () {
    const equip1 = this._windows[2].type.item();
    const equip2 = this._windows[2].list.item();
    return equip1 || equip2;
};
Scene_LL_IntegrateMenu.prototype.onEquipListOk = function () {
    const slotId = this._windows[2].type.index();
    const equip = this._windows[2].list.item();
    $gameParty.currentActor().changeEquip(slotId, equip);
    this._windows[2].info.setContrast(false);
    this._windows[2].list.resetup();
    this._windows[2].type.refresh();
    this._windows[2].type.activate();
};
Scene_LL_IntegrateMenu.prototype.onEquipListCancel = function () {
    this._windows[2].info.setContrast(false);
    this._windows[2].type.activate();
};
Scene_LL_IntegrateMenu.prototype.refreshEquipType = function () {
    const type = this._windows[2].type.index();
    const equip = this._windows[2].type.item();
    this._windows[2].list.changeItemType(type);
    this._windows[2].info.setEquip(equip, type);
};
Scene_LL_IntegrateMenu.prototype.refreshEquipInfo = function () {
    const equip = this._windows[2].list.item();
    this._windows[2].info.setEquip(equip);
};
Scene_LL_IntegrateMenu.prototype.refreshSkillInfo = function () {
    const skill = this._windows[3].list.item();
    this._windows[3].info.setSkill(skill);
};
Scene_LL_IntegrateMenu.prototype.isSkillListValid = function () {
    const skill = this._windows[3].list.item();
    return this.itemCanUse(skill);
};
Scene_LL_IntegrateMenu.prototype.onSkillListOk = function () {
    this._inquirys.skill.startRoll();
};
Scene_LL_IntegrateMenu.prototype.refreshFileInfo = function () {
    const fileId = this._windows[4].list.index() + 1;
    this._windows[4].info.refreshFile(fileId);
};
Scene_LL_IntegrateMenu.prototype.displayFileInquiry = function () {
    const fileId = this._windows[4].list.index() + 1;
    this._inquirys.file.setFileId(fileId);
    this._inquirys.file.startRoll();
};
Scene_LL_IntegrateMenu.prototype.onFileConfirm = function (sym) {
    const fileId = this._windows[4].list.index() + 1;
    if (sym === 'save') {
        $gameSystem.setSavefileId(fileId);
        $gameSystem.onBeforeSave();
        DataManager.saveGame(fileId)
            .then(() => this.onSaveSuccess())
            .catch(() => this.onSaveFailure());
    }
    if (sym === 'load') {
        DataManager.loadGame(fileId)
            .then(() => this.onLoadSuccess())
            .catch(() => this.onLoadFailure());
    }
};
Scene_LL_IntegrateMenu.prototype.activateFileList = function () {
    this._windows[4].list.activate();
};
Scene_LL_IntegrateMenu.prototype.onInquirysExit = function () {
    this._inquirys.exit.startRoll();
};
Scene_LL_IntegrateMenu.prototype.activateCommand = function () {
    this._windows[5].list.activate();
};
Scene_LL_IntegrateMenu.prototype.itemCanUse = function (item) {
    return item && $gameParty.currentActor().canUse(item);
};
Scene_LL_IntegrateMenu.prototype.useItem = function (item) {
    const actor = $gameParty.currentActor();
    actor.useItem(item);
    const action = new Game_Action(actor);
    action.setItemObject(item);
    action.apply(actor);
    action.applyGlobal();
    if ($gameTemp.isCommonEventReserved()) {
        SceneManager.goto(Scene_Map);
    }
    this.checkGameover();
};
Scene_LL_IntegrateMenu.prototype.useItemBySelect = function (index) {
    if (index < 2) {
        SoundManager.playUseItem()
        const item = this._windows[1].list.item();
        const n = index === 0 ? 1 : $gameParty.numItems(item);
        const result = $gameParty.numItems(item) === n;
        for (var i = 0; i < n; ++i) this.useItem(item);
        this._inquirys.item.refresh();
        if (result) this._windows[1].list.resetup();
        else this._windows[1].list.redrawItem();
        this.refreshItemInfo();
    }
};
Scene_LL_IntegrateMenu.prototype.useSkillBySelect = function (index) {
    if (index === 0) {
        SoundManager.playUseSkill()
        const item = this._windows[3].list.item();
        this.useItem(item);
        this._inquirys.skill.refresh();
        this._windows[3].list.redrawItem();
    }
};
Scene_LL_IntegrateMenu.prototype.moveOutAll = function () {
    this._backButton.hide();
    this._commandWindow.moveOut();
    this._windows[0].cg.moveOut();
    this._titleWindow.moveOut();
    //  this._helpWindow.moveOut();
};
Scene_LL_IntegrateMenu.prototype.update = function () {
    Scene_Base.prototype.update.call(this);
    if (this._commandWindow.isChildenMoving()) return;
    if (this._cancelCooling) this._cancelCooling--;
    if (this._onCancel) {
        if (!this._cancelCooling) {
            const result = Ui_Base.prototype.isInputedCancel.call(this);
            if (result) {
                SoundManager.playCancel();
                return this.moveOutAll();
            }
        }
        if (Input.isTriggered('up') || Input.isTriggered('down')) {
            SoundManager.playCursor();
            this._commandWindow.activate();
        }
    }
};
Scene_LL_IntegrateMenu.prototype.onSaveSuccess = function () {
    SoundManager.playSave();
    this._windows[4].info.refresh();
    this.activateFileList();
};
Scene_LL_IntegrateMenu.prototype.onSaveFailure = function () {
    SoundManager.playBuzzer();
    this.activateFileList();
};
Scene_LL_IntegrateMenu.prototype.onLoadSuccess = function () {
    SoundManager.playLoad();
    this.fadeOutAll();
    Scene_Load.prototype.reloadMapIfUpdated.call(this);
    SceneManager.goto(Scene_Map);
    this._loadSuccess = true;
};
Scene_LL_IntegrateMenu.prototype.onLoadFailure = function () {
    SoundManager.playBuzzer();
    this.activateFileList();
};
//==============================================================================================================
function Scene_LL_TitleLoad() {
    this.initialize(...arguments);
}
Scene_LL_TitleLoad.prototype = Object.create(Scene_Base.prototype);
Scene_LL_TitleLoad.prototype.constructor = Scene_LL_TitleLoad;
Scene_LL_TitleLoad.prototype.terminate = function () {
    Scene_Base.prototype.terminate.call(this);
    this._loadSuccess && $gameSystem.onAfterLoad();
};
Scene_LL_TitleLoad.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createFileBg();
    this.createListWindow();
    this.createInfoWindow();
    this.createInquiryWindow();
};
Scene_LL_TitleLoad.prototype.createFileBg = function () {
    this._fileBg = new LL_FileBg(4);
    this.addChild(this._fileBg);
};
Scene_LL_TitleLoad.prototype.createListWindow = function () {
    this._listWindow = new LL_FileList('load');
    this._listWindow.setHandler('reset', this.refreshInfo.bind(this));
    this._listWindow.setHandler('cancel', this.popScene.bind(this));
    this.addChild(this._listWindow);
};
Scene_LL_TitleLoad.prototype.createInfoWindow = function () {
    this._infoWindow = new LL_FileInfo();
    this.refreshInfo();
    this.addChild(this._infoWindow);
};
Scene_LL_TitleLoad.prototype.createInquiryWindow = function () {
    this._inquiryWindow = new LL_InquiryFile('load');
    this._inquiryWindow.hide();
    this.addChild(this._inquiryWindow);
};
Scene_LL_TitleLoad.prototype.fileId = function () {
    return this._listWindow.index() + 1;
};
Scene_LL_TitleLoad.prototype.refreshInfo = function () {
    this._infoWindow.refreshFile(this.fileId());
};
Scene_LL_TitleLoad.prototype.displayFileInquiry = function () {
    this._inquiryWindow.select(1, true);
    this._inquiryWindow.startRoll();
};
Scene_LL_TitleLoad.prototype.activateFileList = function () {
    this._listWindow.activate();
};
Scene_LL_TitleLoad.prototype.onFileConfirm = function () {
    DataManager.loadGame(this.fileId())
        .then(() => this.onLoadSuccess())
        .catch(() => this.onLoadFailure());
};
Scene_LL_TitleLoad.prototype.onLoadSuccess = function () {
    Scene_Load.prototype.onLoadSuccess.call(this);
};
Scene_LL_TitleLoad.prototype.onLoadFailure = function () {
    SoundManager.playBuzzer();
    this.activateFileList();
};
Scene_LL_TitleLoad.prototype.reloadMapIfUpdated = function () {
    Scene_Load.prototype.reloadMapIfUpdated.call(this);
};
//==============================================================================================================
// Scene_Battle.prototype.isDrawingBattle = function () {
//     return !$gameSystem.isSideView();
// };
// XdRsData.ll.Scene_Battle_stop = Scene_Battle.prototype.stop;
// Scene_Battle.prototype.stop = function () {
//     if (!this.isDrawingBattle()) return XdRsData.ll.Scene_Battle_stop.call(this);
//     Scene_Message.prototype.stop.call(this);
//     if (this.needsSlowFadeOut()) {
//         this.startFadeOut(this.slowFadeSpeed(), false);
//     } else {
//         this.startFadeOut(this.fadeSpeed(), false);
//     }
// };
// XdRsData.ll.Scene_Battle_createWindowLayer = Scene_Battle.prototype.createWindowLayer;
// Scene_Battle.prototype.createWindowLayer = function () {
//     this.createUiLayer();
//     XdRsData.ll.Scene_Battle_createWindowLayer.call(this);
// };
// Scene_Battle.prototype.createUiLayer = function () {
//     this._uiLayer = new Sprite();
//     this.addChild(this._uiLayer);
// };
// XdRsData.ll.Scene_Battle_createCancelButton = Scene_Battle.prototype.createCancelButton;
// Scene_Battle.prototype.createCancelButton = function () {
//     !this.isDrawingBattle() && XdRsData.ll.Scene_Battle_createCancelButton.call(this);
// };
// XdRsData.ll.Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
// Scene_Battle.prototype.createAllWindows = function () {
//     if (this.isDrawingBattle()) return this.createDrawingWindows();
//     XdRsData.ll.Scene_Battle_createAllWindows.call(this);
// };
// Scene_Battle.prototype.createDrawingWindows = function () {
//     this._spriteset._effectsContainer = this;
//     this.createLogWindow();
//     this.createDrawingStatusWindow();
//     this.createDrawingActorCommandWindow();
//     this.createDrawingSkillWindow();
//     this.createDrawingItemWindow();
//     this.createDrawingEnemyWindow();
//     this._uiLayer.addChild(this._spriteset._actorSprites[0]);
//     Scene_Message.prototype.createAllWindows.call(this);
// };
// Scene_Battle.prototype.createDrawingStatusWindow = function () {
//     this._statusWindow = new LL_BattleActorStatus();
//     this._uiLayer.addChild(this._statusWindow);
// };
// Scene_Battle.prototype.createDrawingActorCommandWindow = function () {
//     this._actorCommandWindow = new LL_BattleCommand();
//     this._actorCommandWindow.setHandler('atk', this.commandAttack.bind(this));
//     this._actorCommandWindow.setHandler('skilB', this.commandSkill.bind(this));
//     this._actorCommandWindow.setHandler('itemB', this.commandItem.bind(this));
//     this._actorCommandWindow.setHandler('flee', this.commandEscape.bind(this));
//     this._uiLayer.addChild(this._actorCommandWindow);
// };
// Scene_Battle.prototype.createDrawingSkillWindow = function () {
//     this._skillWindow = new LL_BattleSkillList();
//     this._skillWindow.setHandler('ok', this.onSkillOk.bind(this));
//     this._skillWindow.setHandler('cancel', this.onSkillCancel.bind(this));
//     this._uiLayer.addChild(this._skillWindow);
// };
// Scene_Battle.prototype.createDrawingItemWindow = function () {
//     this._itemWindow = new LL_BattleItemList();
//     this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
//     this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
//     this._uiLayer.addChild(this._itemWindow);
// };
// Scene_Battle.prototype.createDrawingEnemyWindow = function () {
//     this._enemyDrawingWindow = new LL_BattleEnemySelect();
//     this._enemyDrawingWindow.setHandler('ok', this.onEnemyOk.bind(this));
//     this._enemyDrawingWindow.setHandler('cancel', this.onEnemyCancel.bind(this));
//     this._enemyDrawingWindow.getSprite = this._spriteset.findTargetSprite.bind(this._spriteset);
//     this._uiLayer.addChild(this._enemyDrawingWindow);
// };
// XdRsData.ll.Scene_Battle_commandEscape = Scene_Battle.prototype.commandEscape;
// Scene_Battle.prototype.commandEscape = function () {
//     if (!this.isDrawingBattle()) return XdRsData.ll.Scene_Battle_commandEscape.call(this);
//     BattleManager.processEscape();
//     this._actorCommandWindow.moveOut();
// };
// XdRsData.ll.Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
// Scene_Battle.prototype.commandSkill = function () {
//     if (!this.isDrawingBattle()) return XdRsData.ll.Scene_Battle_commandSkill.call(this);
//     this._skillWindow.startSpread();
// };
// XdRsData.ll.Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
// Scene_Battle.prototype.commandItem = function () {
//     if (!this.isDrawingBattle()) return XdRsData.ll.Scene_Battle_commandItem.call(this);
//     this._itemWindow.startSpread();
// };
// XdRsData.ll.Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
// Scene_Battle.prototype.isAnyInputWindowActive = function () {
//     if (this.isDrawingBattle()) {
//         return (this._actorCommandWindow.active ||
//             this._skillWindow.active ||
//             this._itemWindow.active);
//     }
//     return XdRsData.ll.Scene_Battle_isAnyInputWindowActive.call(this);
// };
// XdRsData.ll.Scene_Battle_statusWindowX = Scene_Battle.prototype.statusWindowX;
// Scene_Battle.prototype.statusWindowX = function () {
//     if (this.isDrawingBattle()) return 0;
//     return XdRsData.ll.Scene_Battle_statusWindowX.call(this);
// };
// XdRsData.ll.Scene_Battle_updateLogWindowVisibility = Scene_Battle.prototype.updateLogWindowVisibility;
// Scene_Battle.prototype.updateLogWindowVisibility = function () {
//     if (this.isDrawingBattle()) this._logWindow.visible = true;
//     else XdRsData.ll.Scene_Battle_updateLogWindowVisibility.call(this);
// };
// XdRsData.ll.Scene_Battle_closeCommandWindows = Scene_Battle.prototype.closeCommandWindows;
// Scene_Battle.prototype.closeCommandWindows = function () {
//     if (this.isDrawingBattle()) {
//         this._actorCommandWindow.deactivate();
//         this._actorCommandWindow.hide();
//     } else XdRsData.ll.Scene_Battle_closeCommandWindows.call(this);
// };
// XdRsData.ll.Scene_Battle_hideSubInputWindows = Scene_Battle.prototype.hideSubInputWindows;
// Scene_Battle.prototype.hideSubInputWindows = function () {
//     !this.isDrawingBattle() && XdRsData.ll.Scene_Battle_hideSubInputWindows.call(this);
// };
// XdRsData.ll.Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
// Scene_Battle.prototype.startPartyCommandSelection = function () {
//     if (this.isDrawingBattle()) {
//         BattleManager.selectNextCommand();
//         this._actorCommandWindow.moveIn();
//     } else XdRsData.ll.Scene_Battle_startPartyCommandSelection.call(this);
// };
// XdRsData.ll.Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
// Scene_Battle.prototype.startActorCommandSelection = function () {
//     !this.isDrawingBattle() && XdRsData.ll.Scene_Battle_startActorCommandSelection.call(this);
// };
// XdRsData.ll.Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
// Scene_Battle.prototype.startEnemySelection = function () {
//     if (!this.isDrawingBattle()) return XdRsData.ll.Scene_Battle_startEnemySelection.call(this);
//     $gameTemp.setBattleEnemyOk(false);
//     this._enemyDrawingWindow.display();
// };
// XdRsData.ll.Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
// Scene_Battle.prototype.startActorSelection = function () {
//     if (!this.isDrawingBattle()) return XdRsData.ll.Scene_Battle_startActorSelection.call(this);
//     BattleManager.inputtingAction().setTarget(0);
//     this.selectNextCommand();
// };
// XdRsData.ll.Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
// Scene_Battle.prototype.onEnemyOk = function () {
//     if (!this.isDrawingBattle()) return XdRsData.ll.Scene_Battle_onEnemyOk.call(this);
//     this._enemyDrawingWindow.hide();
//     const action = BattleManager.inputtingAction();
//     action.setTarget(this._enemyDrawingWindow.index());
//     this.selectNextCommand();
// };
// XdRsData.ll.Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
// Scene_Battle.prototype.onEnemyCancel = function () {
//     if (!this.isDrawingBattle()) return XdRsData.ll.Scene_Battle_onEnemyCancel.call(this);
//     this._enemyDrawingWindow.hide();
//     switch (this._actorCommandWindow.index()) {
//         case 0: return this._actorCommandWindow.activate();
//         case 1: return this._skillWindow.startSpread();
//         case 2: return this._itemWindow.startSpread();
//     }
// };
// XdRsData.ll.Scene_Battle_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
// Scene_Battle.prototype.endCommandSelection = function () {
//     !this.isDrawingBattle() && XdRsData.ll.Scene_Battle_endCommandSelection.call(this);
// };
// XdRsData.ll.Scene_Battle_selectNextCommand = Scene_Battle.prototype.selectNextCommand;
// Scene_Battle.prototype.selectNextCommand = function () {
//     if (!this.isDrawingBattle()) return XdRsData.ll.Scene_Battle_selectNextCommand.call(this);
//     BattleManager.selectNextCommand();
//     !BattleManager.isInputting() && this._actorCommandWindow.moveOut();
// };
//==============================================================================================================
// end
//==============================================================================================================