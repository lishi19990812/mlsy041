//==============================================================================================================
// LL_Windows.js
//==============================================================================================================
/*:
 * @target MZ
 * @plugindesc 窗口 <Liuli Island>
 * @author 芯☆淡茹水
 * @help 
 * 
 * 
*/
//==============================================================================================================
; var XdRsData = XdRsData || {};
XdRsData.ll = XdRsData.ll || {};
//==============================================================================================================
function TitleCommand_Item() {
    this.initialize(...arguments);
}
TitleCommand_Item.prototype = Object.create(Ui_Base.prototype);
TitleCommand_Item.prototype.constructor = TitleCommand_Item;
TitleCommand_Item.prototype.initialize = function (itemIndex) {
    this._itemIndex = itemIndex;
    Ui_Base.prototype.initialize.call(this, 'Ui_Title', new Rectangle(0, 0, 390, 50), new Point(1430, 270));
};
TitleCommand_Item.prototype.setupPosition = function () {
    this.y = this._itemIndex * 52;
};
TitleCommand_Item.prototype.currentSrcPoint = function () {
    const sx = this._itemIndex * 88 + (this._isSelected ? 1308 : 1310);
    const sy = this._isSelected ? 370 : 210;
    return new Point(sx, sy);
};
TitleCommand_Item.prototype.refreshImage = function () {
    if (this._isSelected !== this.parent.isItemSelect(this._itemIndex)) {
        this._isSelected = this.parent.isItemSelect(this._itemIndex);
        this._uiFace.visible = this._isSelected;
    }
};
TitleCommand_Item.prototype.isActive = function () {
    return this.parent && this.parent.isActive();
};
TitleCommand_Item.prototype.drawAll = function () {
    const ry = this._itemIndex * 48 + 70;
    const bitmap = this.loadUi('Ui_Title');
    bitmap.addLoadListener(function () {
        this.contents.blt(bitmap, 1430, ry, 150, 46, 230, 4);
    }.bind(this));
};
TitleCommand_Item.prototype.onTouchSelf = function () {
    if (this._itemIndex === this.parent.index()) this.parent.onInputOk();
    else this.parent.select(this._itemIndex);
};
TitleCommand_Item.prototype.updateOther = function () {
    if (this.parent.visible) {
        this._uiFace.opacity = this.parent._childOpacity;
    }
};
//==============================================================================================================
function LL_TitleCommand() {
    this.initialize(...arguments);
}
LL_TitleCommand.prototype = Object.create(Ui_Command.prototype);
LL_TitleCommand.prototype.constructor = LL_TitleCommand;
LL_TitleCommand.prototype.initialize = function (static) {
    this._childOpacity = 255;
    this._opacityCount = 0;
    Ui_Command.prototype.initialize.call(this, '', new Rectangle(0, 0, 325, 140));
    static ? this.activate() : this.hide();
};
LL_TitleCommand.prototype.needTouchWheel = function () {
    return true;
};
LL_TitleCommand.prototype.createParts = function () {
    for (var i = 0; i < 4; ++i) {
        this._parts[i] = new TitleCommand_Item(i);
        this.addChild(this._parts[i]);
    }
};
LL_TitleCommand.prototype.initialIndex = function () {
    return $gameSystem.mnemonicIndex('titleCmd');
};
LL_TitleCommand.prototype.setupPosition = function () {
    this.x = 860;
    this.y = 470;
};
LL_TitleCommand.prototype.show = function () {
    Ui_Command.prototype.show.call(this);
    this._childOpacity = 255;
    this._opacityCount = 0;
};
LL_TitleCommand.prototype.maxItems = function () {
    return 4;
};
LL_TitleCommand.prototype.isItemSelect = function (index) {
    return this.active && this._index === index;
};
LL_TitleCommand.prototype.refreshIndexChanged = function () {
    this._parts.forEach(p => p.refreshImage());
};
LL_TitleCommand.prototype.onInputUp = function () {
    this.roll(0);
};
LL_TitleCommand.prototype.onInputDown = function () {
    this.roll(1);
};
LL_TitleCommand.prototype.onInputOk = function () {
    const sym = ['newGame', 'loadGame', 'reading', 'exit'][this._index];
    if (sym) {
        this.playOkSe();
        this.deactivate();
        this.callHandler(sym);
    }
};
LL_TitleCommand.prototype.updateOther = function () {
    Ui_Command.prototype.updateOther.call(this);
    if (this.visible) {
        this._opacityCount = (this._opacityCount + 1) % 60;
        this._childOpacity += (this._opacityCount < 30 ? -3 : 3);
    }
};
//==============================================================================================================
function LL_InquiryExit() {
    this.initialize(...arguments);
}
LL_InquiryExit.prototype = Object.create(Ui_InquiryBase.prototype);
LL_InquiryExit.prototype.constructor = LL_InquiryExit;
LL_InquiryExit.prototype.setupPosition = function () {
    this.x = (Graphics.width - this.width) / 2;
    this.y = (Graphics.height - this.height) / 2;
};
LL_InquiryExit.prototype.initialIndex = function () {
    return 1;
};
LL_InquiryExit.prototype.uiName = function () {
    return 'Ui_Menu1';
};
LL_InquiryExit.prototype.uiSrcRect = function () {
    return new Rectangle(520, 170, 505, 254);
};
LL_InquiryExit.prototype.buttonsData = function () {
    return [{ 'x': 116, 'y': 160, 'sym': 'yes' }, { 'x': 280, 'y': 160, 'sym': 'no' }];
};
LL_InquiryExit.prototype.startRoll = function () {
    this.select(this.initialIndex(), true);
    Ui_InquiryBase.prototype.startRoll.call(this);
};
LL_InquiryExit.prototype.isSelectButton = function (sym) {
    if (!this.active) return false;
    return sym === this.buttonsData()[this._index].sym;
};
LL_InquiryExit.prototype.onButtonPress = function (sym) {
    this._isOnDefine = sym === 'yes';
    this.startUnRoll();
};
LL_InquiryExit.prototype.onAfterRoll = function (type) {
    Ui_InquiryBase.prototype.onAfterRoll.call(this, type);
    if (type === 1) {
        if (this._isOnDefine) SceneManager.exit();
        else this.parent.activateCommand();
    }
};
//==============================================================================================================
function LL_MenuBg() {
    this.initialize(...arguments);
}
LL_MenuBg.prototype = Object.create(Ui_Base.prototype);
LL_MenuBg.prototype.constructor = LL_MenuBg;
LL_MenuBg.prototype.initialize = function () {
    this._type = 0;
    Ui_Base.prototype.initialize.call(this, 'Ui_Menu4', new Rectangle(0, 0, 1280, 720), new Point(0, 0));
};
LL_MenuBg.prototype.changeType = function (index) {
    const type = index > 0 ? 1 : 0;
    if (this._type !== type) {
        this._type = type;
        const name = this._type ? 'Ui_Menu2' : 'Ui_Menu4';
        this._uiFace.bitmap = this.loadUi(name);
        this._uiFace.setFrame(0, 0, this.width, this.height);
    }
};
//==============================================================================================================
function LL_MenuTitle() {
    this.initialize(...arguments);
}
LL_MenuTitle.prototype = Object.create(Ui_Base.prototype);
LL_MenuTitle.prototype.constructor = LL_MenuTitle;
LL_MenuTitle.prototype.initialize = function (type) {
    this._type = type;
    Ui_Base.prototype.initialize.call(this, 'Ui_Menu2', new Rectangle(0, 0, 1280, 120), this.currentPoint());
    this.moveIn();
};
LL_MenuTitle.prototype.currentPoint = function () {
    const ry = this._type * 148 + (this._type < 6 ? 735 : 725);
    return new Point(0, ry);
};
LL_MenuTitle.prototype.moveIn = function () {
    this.startAction({ 'count': 10, 'my': 12, 'body': true });
};
LL_MenuTitle.prototype.moveOut = function () {
    this.startAction({ 'count': 10, 'my': -12, 'body': true });
};
LL_MenuTitle.prototype.setupPosition = function () {
    this.y = -120;
};
LL_MenuTitle.prototype.changeType = function (type) {
    if (this._type !== type) {
        this._type = type;
        const p = this.currentPoint();
        this._uiFace.setFrame(p.x, p.y, this.width, this.height);
    }
};
LL_MenuTitle.prototype.drawAll = function () {
    this._dataGold = $gameParty.gold();
    this.contents.fontSize = 30;
    this.contents.clearRect(850, 15, 260, 50);
    this.drawText(this._dataGold, 860, 18, 240, 'right');
};
LL_MenuTitle.prototype.updateOther = function () {
    this._dataGold !== $gameParty.gold() && this.refresh();
};
//==============================================================================================================
function LL_MenuHelp() {
    this.initialize(...arguments);
}
LL_MenuHelp.prototype = Object.create(Ui_Base.prototype);
LL_MenuHelp.prototype.constructor = LL_MenuHelp;
LL_MenuHelp.prototype.initialize = function () {
    const rect = new Rectangle(0, 0, 1280, 100);
    const point = new Point(0, 640);
    Ui_Base.prototype.initialize.call(this, 'Ui_Menu2', rect, point);
    this.moveIn();
};
LL_MenuHelp.prototype.moveIn = function () {
    this._isMoveIn = true;
    this.startAction({ 'count': 10, 'my': -8, 'body': true });
};
LL_MenuHelp.prototype.moveOut = function () {
    this._isMoveIn = false;
    this.startAction({ 'count': 10, 'my': 8, 'body': true });
};
LL_MenuHelp.prototype.onActionEnd = function () {
    this._isMoveIn && this.parent.displayButton();
};
LL_MenuHelp.prototype.setupPosition = function () {
    this.y = 720;
};
LL_MenuHelp.prototype.drawAll = function () {
    this._helpCount = Math.randomInt(120) + 300;
    this.contents.fontSize = 30;
    this.drawText(XdRsData.ll.helpText(), 50, 30, 1050);
};
LL_MenuHelp.prototype.updateOther = function () {
    if (this._helpCount) {
        this._helpCount--;
        !this._helpCount && this.refresh();
    }
};
//==============================================================================================================
function LL_MenuCommand() {
    this.initialize(...arguments);
}
LL_MenuCommand.prototype = Object.create(Ui_Command.prototype);
LL_MenuCommand.prototype.constructor = LL_MenuCommand;
LL_MenuCommand.prototype.initialize = function () {
    Ui_Command.prototype.initialize.call(this, '', new Rectangle(0, 0, 32, 32));
    this.moveIn();
};
LL_MenuCommand.prototype.needTouchActivate = function () {
    return true;
};
LL_MenuCommand.prototype.needTouchWheel = function () {
    return true;
};
LL_MenuCommand.prototype.buttonsData = function () {
    return [{ 'x': 0, 'y': 10, 'sym': 'item' },
    { 'x': 0, 'y': 100, 'sym': 'equip' },
    { 'x': 0, 'y': 190, 'sym': 'skill' },
    { 'x': 0, 'y': 280, 'sym': 'file' },
    { 'x': 0, 'y': 370, 'sym': 'setup' },
    { 'x': 0, 'y': 460, 'sym': 'intH' }];
};
LL_MenuCommand.prototype.moveIn = function () {
    this._childMoveData = { 'count': 16, 'type': 0 };
    this._buttons.forEach(b => b._uiFace.scale = new Point(0, 0));
};
LL_MenuCommand.prototype.moveOut = function () {
    this._childMoveData = { 'count': 16, 'type': 1 };
    this._buttons.forEach(b => b._uiFace.scale = new Point(1, 1));
};
LL_MenuCommand.prototype.setupPosition = function () {
    this.x = 20;
    this.y = 105;
};
LL_MenuCommand.prototype.setSelectedState = function (state) {
    this._isSelected = state;
};
LL_MenuCommand.prototype.activate = function () {
    if (this.parent) this.parent._onCancel = false;
    Ui_Command.prototype.activate.call(this);
};
LL_MenuCommand.prototype.isSelectButton = function (sym) {
    if (!this.active) return false;
    return sym === this.buttonsData()[this._index].sym;
};
LL_MenuCommand.prototype.maxItems = function () {
    return this.buttonsData() ? this.buttonsData().length : 0;
};
LL_MenuCommand.prototype.refreshIndexChanged = function () {
    this._buttons.forEach(b => b.refreshImage());
    this.callHandler('reset');
};
LL_MenuCommand.prototype.onButtonPress = function (sym) {
    this._isSelected = true;
    this.callOkHandler();
};
LL_MenuCommand.prototype.isChildenMoving = function () {
    return !!this._childMoveData;
};
LL_MenuCommand.prototype.onTouchActivate = function (sym) {
    if (this._isSelected || this.isChildenMoving()) return;
    const arr = this.buttonsData().map(d => d.sym);
    const index = Math.max(0, arr.indexOf(sym));
    SoundManager.playCursor();
    this.select(index, true);
    this.activate();
};
LL_MenuCommand.prototype.onChildMoveEnd = function () {
    const type = this._childMoveData.type;
    this._childMoveData = null;
    type === 1 && this.parent.popScene();
};
LL_MenuCommand.prototype.updateOther = function () {
    Ui_Command.prototype.updateOther.call(this);
    if (this._childMoveData) {
        if (this._childMoveData.count >= 4 && !(this._childMoveData.count % 2)) {
            const n = (16 - this._childMoveData.count) / 2;
            const s = this._childMoveData.type ? -0.2 : 0.2;
            const button = this._buttons[n];
            button && button.startAction({ 'count': 5, 'sx': s, 'sy': s, 'obj': '_uiFace' });
        }
        this._childMoveData.count--;
        !this._childMoveData.count && this.onChildMoveEnd();
    }
    this.updateUnActive();
};
LL_MenuCommand.prototype.updateUnActive = function () {
    if (this.isActive()) return;
    if (!this._isSelected && Input.isTriggered('ok')) {
        this.playOkSe();
        this.activate();
    }
};
LL_MenuCommand.prototype.onInputOk = function () {
    this._buttons[this._index].press();
};
LL_MenuCommand.prototype.onInputCancel = function () {
    this.playCancelSe();
    this.parent.onCommandCancel();
    this.deactivate();
};
LL_MenuCommand.prototype.onInputUp = function () {
    this.roll(0);
};
LL_MenuCommand.prototype.onInputDown = function () {
    this.roll(1);
};
//==============================================================================================================
function LL_MenuActorInfo() {
    this.initialize(...arguments);
}
LL_MenuActorInfo.prototype = Object.create(Ui_Base.prototype);
LL_MenuActorInfo.prototype.constructor = LL_MenuActorInfo;
LL_MenuActorInfo.prototype.initialize = function () {
    Ui_Base.prototype.initialize.call(this, 'Ui_Menu4', new Rectangle(0, 0, 1280, 720), new Point(0, 720));
};
LL_MenuActorInfo.prototype.drawAll = function () {
    for (var i = 0; i < 3; ++i) this['drawArea' + i]();
};
LL_MenuActorInfo.prototype.drawArea0 = function () {
    this.contents.fontSize = 22;
    const arr = ['' + this.actor().hp + '/' + this.actor().mhp];
    arr.push('' + this.actor().mp + '/' + this.actor().mmp);
    arr.push('' + this.actor().nowExp() + '/' + this.actor().nextExp());
    this.drawText(this.actor().name(), 474, 133, 118);
    this.drawText(this.actor().level, 654, 134, 118);
    const bitmap = this.loadUi('Ui_Menu2');
    bitmap.addLoadListener(function () {
        this.contents.fontSize = 16;
        for (var i = 0; i < 3; ++i) {
            var ry = i * 30 + 20, dy = i * 30 + 187, rw = 139 * eval(arr[i]);
            if (!!rw) {
                this.contents.blt(bitmap, 1710, ry, Math.min(5, rw), 14, 460, dy);
                if (rw > 5) {
                    var dw = rw - (rw > 10 ? 10 : 5);
                    this.contents.blt(bitmap, 1715, ry, 129, 14, 465, dy, dw);
                    if (rw > 10) this.contents.blt(bitmap, 1844, ry, 5, 14, 460 + dw + 5, dy);
                }
            }
            this.drawText(arr[i], 600, dy - 10, 140, 'center');
        }
    }.bind(this));
};
LL_MenuActorInfo.prototype.drawArea1 = function () {
    this.contents.fontSize = 22;
    const arr = ['atk', 'mat', 'def', 'mdf', 'agi'];
    for (var i = 0; i < 5; ++i) {
        var x = i % 2 * 240 + 395;
        var y = Math.floor(i / 2) * 37 + 350;
        this.drawText(this.actor()[arr[i]], x, y, 100);
    }
};
LL_MenuActorInfo.prototype.drawArea2 = function () {
    this.contents.fontSize = 22;
    const arr = ['TNC', 'EPN', '', 'OPS'];
    const breaker = this.actor().breaker() || '--';
    for (var i = 0; i < 4; ++i) {
        var x = i % 2 * 240 + 395;
        var y = Math.floor(i / 2) * 37 + 516;
        var text = !arr[i] ? breaker : XdRsData.ll.atbValue(arr[i])
        this.drawText(text, x, y, 100);
    }
};
//==============================================================================================================
function LL_MenuItemType() {
    this.initialize(...arguments);
}
LL_MenuItemType.prototype = Object.create(Ui_Command.prototype);
LL_MenuItemType.prototype.constructor = LL_MenuItemType;
LL_MenuItemType.prototype.initialize = function () {
    Ui_Command.prototype.initialize.call(this, '', new Rectangle(0, 0, 32, 32));
};
LL_MenuItemType.prototype.buttonsData = function () {
    return [{ 'x': 0, 'y': 0, 'sym': 'item0' },
    { 'x': 190, 'y': 0, 'sym': 'item1' },
    { 'x': 380, 'y': 0, 'sym': 'item2' }];
};
LL_MenuItemType.prototype.setupPosition = function () {
    this.x = 275;
    this.y = 105;
};
LL_MenuItemType.prototype.maxItems = function () {
    return this.buttonsData().length;
};
LL_MenuItemType.prototype.isSelectButton = function (sym) {
    if (!this.active) return false;
    return sym === this.buttonsData()[this._index].sym;
};
LL_MenuItemType.prototype.refreshIndexChanged = function () {
    this._buttons.forEach(b => b.refreshImage());
    this.callHandler('reset');
};
LL_MenuItemType.prototype.onInputLeft = function () {
    this.roll(0);
};
LL_MenuItemType.prototype.onInputRight = function () {
    this.roll(1);
};
//==============================================================================================================
function LL_MenuItemList() {
    this.initialize(...arguments);
}
LL_MenuItemList.prototype = Object.create(Ui_Selectable.prototype);
LL_MenuItemList.prototype.constructor = LL_MenuItemList;
LL_MenuItemList.prototype.initialize = function () {
    this._itemType = 0;
    Ui_Selectable.prototype.initialize.call(this, 'Ui_Menu5', new Rectangle(0, 0, 1280, 720), new Point(0, 0));
};
LL_MenuItemList.prototype.changeItemType = function (type) {
    if (this._itemType !== type) {
        this._itemType = type;
        this.resetup();
    }
};
LL_MenuItemList.prototype.resetup = function () {
    this._itemContents.select(0, true);
    this._itemContents.setTopY(0);
    this.refresh();
};
LL_MenuItemList.prototype.lineHeight = function () {
    return 48;
};
LL_MenuItemList.prototype.itemsArea = function () {
    return new Rectangle(270, 176, 558, 440);
};
LL_MenuItemList.prototype.cursorSize = function () {
    return new Point(534, 42);
};
LL_MenuItemList.prototype.cursorLocationPoint = function (index) {
    return new Point(14, index * this.lineHeight() + 14);
};
LL_MenuItemList.prototype.refreshIndexChanged = function () {
    Ui_Selectable.prototype.refreshIndexChanged.call(this);
    this.callHandler('reset');
};
LL_MenuItemList.prototype.items = function () {
    return $gameParty.itemsBy(this._itemType);
};
LL_MenuItemList.prototype.drawItemRect = function (index) {
    const rect = this.itemRect(index);
    const contents = this._itemContents.contents;
    contents.fillRoundRect(rect.x + 2, rect.y + 1, rect.width - 28, rect.height - 8, 10, 2, 'rgb(120,30,0)');
};
LL_MenuItemList.prototype.drawItem = function (index) {
    const item = this.items()[index];
    const rect = this.itemRect(index);
    if (item) {
        this._itemContents.drawItemName(item, rect.x + 10, rect.y + 3, rect.width - 20);
        this._itemContents.drawText($gameParty.numItems(item), rect.x + 10, rect.y + 3, rect.width - 50, 'right');
    }
};
//==============================================================================================================
function LL_MenuItemInfo() {
    this.initialize(...arguments);
}
LL_MenuItemInfo.prototype = Object.create(Ui_Base.prototype);
LL_MenuItemInfo.prototype.constructor = LL_MenuItemInfo;
LL_MenuItemInfo.prototype.initialize = function () {
    this._item = null;
    Ui_Base.prototype.initialize.call(this, 'Ui_Menu5', new Rectangle(0, 0, 378, 498), new Point(870, 110));
};
LL_MenuItemInfo.prototype.setItem = function (item) {
    if (this._item !== item) {
        this._item = item;
        this.refresh();
    }
};
LL_MenuItemInfo.prototype.maxExWidth = function () {
    return 360;
};
LL_MenuItemInfo.prototype.resetFontSettings = function () {
    this.resetTextColor();
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.outlineWidth = 0;
    this.contents.fontSize = 24;
};
LL_MenuItemInfo.prototype.setupPosition = function () {
    this.x = 870;
    this.y = 110;
};
LL_MenuItemInfo.prototype.drawAll = function () {
    if (this._item) {
        const words = ['名称:', '价格:', '材料:'];
        const arr = [this._item.name, Math.floor(this._item.price / 2), ''];
        for (var i = 0; i < 3; ++i) {
            var y = [70, 114, 200][i];
            this.drawText(words[i], 36, y, 300);
            this.drawText(arr[i], 96, y, 300);
        }
        this.drawTextEx(this._item.description, 36, 256);
    }
};
//==============================================================================================================
function LL_InquiryItem() {
    this.initialize(...arguments);
}
LL_InquiryItem.prototype = Object.create(LL_InquiryExit.prototype);
LL_InquiryItem.prototype.constructor = LL_InquiryItem;
LL_InquiryItem.prototype.initialIndex = function () {
    return 2;
};
LL_InquiryItem.prototype.uiName = function () {
    return 'Ui_Menu5';
};
LL_InquiryItem.prototype.uiSrcRect = function () {
    return new Rectangle(1294, 660, 546, 314);
};
LL_InquiryItem.prototype.rollWidth = function () {
    return 30;
};
LL_InquiryItem.prototype.buttonsData = function () {
    return [{ 'x': 80, 'y': 230, 'sym': 'usi0' },
    { 'x': 213, 'y': 230, 'sym': 'usi1' },
    { 'x': 343, 'y': 230, 'sym': 'usi2' }];
};
LL_InquiryItem.prototype.rollWidth = function () {
    return 30;
};
LL_InquiryItem.prototype.onButtonPress = function (sym) {
    this.parent.useItemBySelect(this._index);
    this.startUnRoll();
};
LL_InquiryItem.prototype.onAfterRoll = function (type) {
    Ui_InquiryBase.prototype.onAfterRoll.call(this, type);
    if (type === 1) this.parent.onCommandOk();
};
LL_InquiryItem.prototype.drawAll = function () {
    this.drawAtb();
    this.drawTips();
};
LL_InquiryItem.prototype.drawAtb = function () {
    const arr = ['' + this.actor().hp + '/' + this.actor().mhp];
    arr.push('' + this.actor().mp + '/' + this.actor().mmp);
    arr.push('' + this.actor().nowExp() + '/' + this.actor().nextExp());
    const bitmap = this.loadUi('Ui_Menu5');
    bitmap.addLoadListener(function () {
        this.contents.fontSize = 12;
        this.contents.textColor = 'white';
        for (var i = 0; i < 3; ++i) {
            var ry = i * 20 + 520, dy = i * 20 + 45, rw = 138 * eval(arr[i]);
            if (!!rw) {
                this.contents.blt(bitmap, 1570, ry, Math.min(5, rw), 12, 281, dy);
                if (rw > 5) {
                    var dw = rw - (rw > 10 ? 10 : 5);
                    this.contents.blt(bitmap, 1575, ry, 129, 12, 286, dy, dw);
                    if (rw > 10) this.contents.blt(bitmap, 1703, ry, 5, 12, 281 + dw + 5, dy);
                }
            }
            this.drawText(arr[i], 281, dy - 11, 138, 'center');
        }
    }.bind(this));
    var index = 0;
    const icons = this.actor().states().map(s => s.iconIndex);
    for (var i = 0; i < icons.length; ++i) {
        if (index > 3) break;
        if (!icons[i]) continue;
        this.drawIcon(icons[i], index * 47 + 244, 106);
        index++;
    }
};
LL_InquiryItem.prototype.drawTips = function () {
    this.resetFontSettings();
    this.drawText('是否确认使用物品？', 0, 172, 546, 'center');
};
//==============================================================================================================
function MenuEquips_Item() {
    this.initialize(...arguments);
}
MenuEquips_Item.prototype = Object.create(Ui_Base.prototype);
MenuEquips_Item.prototype.constructor = MenuEquips_Item;
MenuEquips_Item.prototype.initialize = function (itemIndex) {
    this._isSelected = false;
    this._itemIndex = itemIndex;
    Ui_Base.prototype.initialize.call(this, 'Ui_Menu6', new Rectangle(0, 0, 122, 64), this.currentPoint());
};
MenuEquips_Item.prototype.currentPoint = function () {
    const x = this._isSelected ? 108 : 296;
    return new Point(x, 1302);
};
MenuEquips_Item.prototype.equip = function () {
    return this.actor().equips()[this._itemIndex];
};
MenuEquips_Item.prototype.setupPosition = function () {
    this.x = [264, 452, 639, 358, 545][this._itemIndex];
    this.y = [167, 167, 167, 232, 232][this._itemIndex];
};
MenuEquips_Item.prototype.refreshImage = function () {
    if (this._isSelected !== this.parent.isSelectedChild(this._itemIndex)) {
        this._isSelected = this.parent.isSelectedChild(this._itemIndex);
        const p = this.currentPoint();
        this._uiFace.setFrame(p.x, p.y, this.width, this.height);
    }
};
MenuEquips_Item.prototype.isActive = function () {
    return this.parent && this.parent.isActive();
};
MenuEquips_Item.prototype.drawAll = function () {
    if (this.equip()) {
        const size = 42;
        const x = (this.width - size) / 2 + 2;
        const y = (this.height - size) / 2 - 1;
        const index = this.equip().iconIndex;
        const bitmap = ImageManager.loadSystem("IconSet");
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = (index % 16) * pw;
        const sy = Math.floor(index / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, size, size);
    }
};
MenuEquips_Item.prototype.onTouchSelf = function () {
    if (this._itemIndex === this.parent.index()) this.parent.onInputOk();
    else this.parent.select(this._itemIndex);
};
//==============================================================================================================
function LL_MenuEquips() {
    this.initialize(...arguments);
}
LL_MenuEquips.prototype = Object.create(Ui_Command.prototype);
LL_MenuEquips.prototype.constructor = LL_MenuEquips;
LL_MenuEquips.prototype.initialize = function () {
    Ui_Command.prototype.initialize.call(this, 'Ui_Menu6', new Rectangle(0, 0, 1280, 720), new Point(0, 0));
};
LL_MenuEquips.prototype.createParts = function () {
    Ui_Command.prototype.createParts.call(this);
    for (var i = 0; i < 5; ++i) {
        this._parts[i] = new MenuEquips_Item(i);
        this.addChild(this._parts[i]);
    }
};
LL_MenuEquips.prototype.maxItems = function () {
    return this._parts.length;
};
LL_MenuEquips.prototype.item = function () {
    return this._parts[this._index] ? this._parts[this._index].equip() : null;
};
LL_MenuEquips.prototype.isSelectedChild = function (index) {
    return this.active && this._index === index;
};
LL_MenuEquips.prototype.refreshIndexChanged = function () {
    this._parts.forEach(p => p.refreshImage());
    this.callHandler('reset');
};
LL_MenuEquips.prototype.refresh = function () {
    Ui_Command.prototype.refresh.call(this);
    this._parts.forEach(p => p.refresh());
};
LL_MenuEquips.prototype.drawAll = function () {
    this.contents.fontSize = 16;
    for (var i = 0; i < 5; ++i) {
        var equip = this._parts[i].equip();
        if (equip) {
            var x = [276, 465, 654, 372, 560][i];
            var y = [256, 256, 256, 320, 320][i];
            this.drawText(equip.name, x, y, 96, 'center');
        }
    }
};
LL_MenuEquips.prototype.onInputUp = function () {
    this._index >= 3 && this.select(this._index - 3);
};
LL_MenuEquips.prototype.onInputDown = function () {
    this._index < 3 && this.select(Math.min(4, this._index + 3));
};
LL_MenuEquips.prototype.onInputLeft = function () {
    const n = Math.floor(this._index / 3);
    const m = this._index % 3;
    const max = n > 0 ? 2 : 3;
    const index = (m + max - 1) % max + n * 3;
    this.select(index);
};
LL_MenuEquips.prototype.onInputRight = function () {
    const n = Math.floor(this._index / 3);
    const m = this._index % 3;
    const max = n > 0 ? 2 : 3;
    const index = (m + 1) % max + n * 3;
    this.select(index);
};
//==============================================================================================================
function LL_MenuEquipList() {
    this.initialize(...arguments);
}
LL_MenuEquipList.prototype = Object.create(Ui_Selectable.prototype);
LL_MenuEquipList.prototype.constructor = LL_MenuEquipList;
LL_MenuEquipList.prototype.initialize = function () {
    this._itemType = 0;
    this.setupEquips();
    Ui_Selectable.prototype.initialize.call(this, 'Ui_Menu6', new Rectangle(0, 0, 508, 232), new Point(257, 376));
};
LL_MenuEquipList.prototype.changeItemType = function (type) {
    if (this._itemType !== type) {
        this._itemType = type;
        this.resetup();
    }
};
LL_MenuEquipList.prototype.setupEquips = function () {
    this._equips = [null].concat($gameParty.equipsBy(this._itemType + 1));
};
LL_MenuEquipList.prototype.setupPosition = function () {
    this.x = 257;
    this.y = 376;
};
LL_MenuEquipList.prototype.resetup = function () {
    this.setupEquips();
    this._itemContents.select(0, true);
    this._itemContents.setTopY(0);
    this.refresh();
};
LL_MenuEquipList.prototype.lineHeight = function () {
    return 48;
};
LL_MenuEquipList.prototype.itemsArea = function () {
    return new Rectangle(0, -6, 480, 248);
};
LL_MenuEquipList.prototype.cursorSize = function () {
    return new Point(458, 42);
};
LL_MenuEquipList.prototype.playOkSe = function () {
    SoundManager.playEquip();
};
LL_MenuEquipList.prototype.cursorLocationPoint = function (index) {
    return new Point(14, index * this.lineHeight() + 14);
};
LL_MenuEquipList.prototype.refreshIndexChanged = function () {
    Ui_Selectable.prototype.refreshIndexChanged.call(this);
    this.callHandler('reset');
};
LL_MenuEquipList.prototype.items = function () {
    return this._equips;
};
LL_MenuEquipList.prototype.drawItemRect = function (index) {
    const rect = this.itemRect(index);
    const contents = this._itemContents.contents;
    contents.fillRoundRect(rect.x + 2, rect.y + 1, rect.width - 28, rect.height - 8, 10, 2, 'rgb(120,30,0)');
};
LL_MenuEquipList.prototype.drawItem = function (index) {
    const item = this.items()[index];
    const rect = this.itemRect(index);
    if (item) {
        this._itemContents.drawItemName(item, rect.x + 10, rect.y + 3, rect.width - 20);
        this._itemContents.drawText($gameParty.numItems(item), rect.x + 10, rect.y + 3, rect.width - 50, 'right');
    } else {
        this._itemContents.drawText('卸下', rect.x + 10, rect.y + 3, rect.width - 50, 'center');
    }
};
//==============================================================================================================
function LL_MenuEquipInfo() {
    this.initialize(...arguments);
}
LL_MenuEquipInfo.prototype = Object.create(Ui_Base.prototype);
LL_MenuEquipInfo.prototype.constructor = LL_MenuEquipInfo;
LL_MenuEquipInfo.prototype.initialize = function () {
    this._equip = null;
    this._slotId = 0;
    this._isContrast = false;
    Ui_Base.prototype.initialize.call(this, 'Ui_Menu6', new Rectangle(0, 0, 466, 498), new Point(782, 110));
};
LL_MenuEquipInfo.prototype.setupPosition = function () {
    this.x = 782;
    this.y = 110;
};
LL_MenuEquipInfo.prototype.resetFontSettings = function () {
    this.resetTextColor();
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.outlineWidth = 0;
    this.contents.fontSize = 24;
};
LL_MenuEquipInfo.prototype.setEquip = function (equip, slotId) {
    if (slotId !== undefined) {
        this._slotId = slotId;
    }
    if (this._equip !== equip) {
        this._equip = equip;
        this.refresh();
    }
};
LL_MenuEquipInfo.prototype.setContrast = function (state) {
    this._isContrast = state;
};
LL_MenuEquipInfo.prototype.maxExWidth = function () {
    return 430;
};
LL_MenuEquipInfo.prototype.drawAll = function () {
    if (this._equip) {
        this.drawBaseInfo();
        this.drawContrast();
    }
};
LL_MenuEquipInfo.prototype.drawBaseInfo = function () {
    this.resetTextColor();
    this.contents.fontSize = 28;
    this.drawText(this._equip.name, 0, 62, this.width, 'center');
    this.drawTextEx(this._equip.description, 46, 102);
    for (var i = 0; i < 5; ++i) {
        var y = i * 43.5 + 264;
        this.drawText(this.actor().param(i + 2), 94, y, 126);
    }
};
LL_MenuEquipInfo.prototype.drawContrast = function () {
    if (!this._isContrast) return;
    const copyActor = JsonEx.makeDeepCopy(this.actor());
    copyActor.forceChangeEquip(this._slotId, this._equip);
    for (var i = 0; i < 5; ++i) {
        var y = i * 43.5 + 264;
        this.drawAtb(290, y, this.actor().param(i + 2), copyActor.param(i + 2));
    }
};
LL_MenuEquipInfo.prototype.drawAtb = function (x, y, num1, num2) {
    const result = num1 === num2;
    const add = num2 > num1 ? '+' + (num2 - num1) : '-' + Math.abs(num2 - num1);
    const arr = result ? ['' + num2] : ['' + num2 + ' (', add, ')'];
    this.resetTextColor();
    for (var i = 0; i < arr.length; ++i) {
        this.resetTextColor();
        if (i === 1) {
            var n = num2 > num1 ? 11 : 18;
            this.changeTextColor(ColorManager.textColor(n));
        }
        var cw = this.textWidth(arr[i]);
        this.drawText(arr[i], x, y, cw);
        x += cw;
    }
    if (!result) {
        const bitmap = this.loadUi('Ui_Menu6');
        bitmap.addLoadListener(function () {
            const rx = num2 > num1 ? 1050 : 1143;
            this.contents.blt(bitmap, rx, 820, 20, 26, 435, y + 3);
        }.bind(this));
    }
};
//==============================================================================================================
function LL_MenuSkillList() {
    this.initialize(...arguments);
}
LL_MenuSkillList.prototype = Object.create(Ui_Selectable.prototype);
LL_MenuSkillList.prototype.constructor = LL_MenuSkillList;
LL_MenuSkillList.prototype.initialize = function () {
    Ui_Selectable.prototype.initialize.call(this, 'Ui_Menu7', new Rectangle(0, 0, 1280, 720), new Point(0, 0));
};
LL_MenuSkillList.prototype.resetup = function () {
    this._itemContents.select(0, true);
    this._itemContents.setTopY(0);
    this.refresh();
};
LL_MenuSkillList.prototype.lineHeight = function () {
    return 48;
};
LL_MenuSkillList.prototype.itemsArea = function () {
    return new Rectangle(260, 104, 568, 510);
};
LL_MenuSkillList.prototype.cursorSize = function () {
    return new Point(544, 42);
};
LL_MenuSkillList.prototype.cursorLocationPoint = function (index) {
    return new Point(14, index * this.lineHeight() + 14);
};
LL_MenuSkillList.prototype.refreshIndexChanged = function () {
    Ui_Selectable.prototype.refreshIndexChanged.call(this);
    this.callHandler('reset');
};
LL_MenuSkillList.prototype.items = function () {
    return this.actor().skills();
};
LL_MenuSkillList.prototype.drawItemRect = function (index) {
    const rect = this.itemRect(index);
    const contents = this._itemContents.contents;
    contents.fillRoundRect(rect.x + 2, rect.y + 1, rect.width - 28, rect.height - 8, 10, 2, 'rgb(120,30,0)');
};
LL_MenuSkillList.prototype.drawItem = function (index) {
    const item = this.items()[index];
    const rect = this.itemRect(index);
    if (item) {
        this._itemContents.drawItemName(item, rect.x + 10, rect.y + 3, rect.width - 20);
        this._itemContents.drawText(item.mpCost, rect.x + 10, rect.y + 4, rect.width - 70, 'right');
        const bitmap = this.loadUi('Ui_Menu8');
        bitmap.addLoadListener(function () {
            const contents = this._itemContents.contents;
            contents.blt(bitmap, 1048, 958, 16, 30, rect.x + 515, rect.y + 12);
        }.bind(this));
    }
};
//==============================================================================================================
function LL_MenuSkillInfo() {
    this.initialize(...arguments);
}
LL_MenuSkillInfo.prototype = Object.create(Ui_Base.prototype);
LL_MenuSkillInfo.prototype.constructor = LL_MenuSkillInfo;
LL_MenuSkillInfo.prototype.initialize = function () {
    this._skill = null;
    Ui_Base.prototype.initialize.call(this, 'Ui_Menu7', new Rectangle(0, 0, 380, 498), new Point(870, 110));
};
LL_MenuSkillInfo.prototype.setupPosition = function () {
    this.x = 870;
    this.y = 110;
};
LL_MenuSkillInfo.prototype.setSkill = function (skill) {
    if (this._skill !== skill) {
        this._skill = skill;
        this.refresh();
    }
};
LL_MenuSkillInfo.prototype.maxExWidth = function () {
    return 360;
};
LL_MenuSkillInfo.prototype.drawAll = function () {
    if (this._skill) {
        this.drawSkillIcon();
        this.contents.fontSize = 30;
        this.resetTextColor();
        this.drawText(this._skill.name, 80, 14, 276);
        const eId = this._skill.damage.elementId;
        var text = eId > 0 ? $dataSystem.elements[eId] : '--';
        this.contents.fontSize = 18;
        const fw1 = this.textWidth('[ ');
        this.drawText('[ ', 80, 42, fw1);
        if (text.match(/<c:(\d+)>/)) {
            this.changeTextColor(ColorManager.textColor(+RegExp.$1));
            text = text.replace(/<c:(\d+)>/, '');
        }
        const fw2 = this.textWidth(text);
        this.drawText(text, 80 + fw1, 42, fw2);
        this.resetTextColor();
        this.drawText(' ]', 80 + fw1 + fw2, 42, 56);
        this.contents.fontSize = 26;
        for (var i = 0; i < 2; ++i) {
            var word = '消耗' + (i === 0 ? 'MP:' : 'TP:');
            this.drawText(word, 20, i * 50 + 90, 296);
            var n = i === 0 ? this._skill.mpCost : this._skill.tpCost;
            var tx = n > 0 ? n : '--';
            this.drawText(tx, 20, i * 50 + 90, 180, 'right');
        }
        this.drawTextEx(this._skill.description, 20, 260);
    }
};
LL_MenuSkillInfo.prototype.drawSkillIcon = function () {
    const index = this._skill.iconIndex;
    const bitmap = ImageManager.loadSystem("IconSet");
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (index % 16) * pw;
    const sy = Math.floor(index / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, 20, 20, 48, 48);
};
//==============================================================================================================
function LL_InquirySkill() {
    this.initialize(...arguments);
}
LL_InquirySkill.prototype = Object.create(LL_InquiryItem.prototype);
LL_InquirySkill.prototype.constructor = LL_InquirySkill;
LL_InquirySkill.prototype.initialIndex = function () {
    return 1;
};
LL_InquirySkill.prototype.buttonsData = function () {
    return [{ 'x': 130, 'y': 230, 'sym': 'yes' }, { 'x': 300, 'y': 230, 'sym': 'no' }];
};
LL_InquirySkill.prototype.onButtonPress = function (sym) {
    this.parent.useSkillBySelect(this._index);
    this.startUnRoll();
};
LL_InquirySkill.prototype.drawTips = function () {
    this.resetFontSettings();
    this.drawText('是否确认使用技能？', 0, 172, 546, 'center');
};
//==============================================================================================================
function OptList_Item() {
    this.initialize(...arguments);
}
OptList_Item.prototype = Object.create(Ui_Base.prototype);
OptList_Item.prototype.constructor = OptList_Item;
OptList_Item.prototype.initialize = function (x, y, sym) {
    this._sym = sym;
    Ui_Base.prototype.initialize.call(this, 'Ui_Menu10', new Rectangle(x, y, 175, 34), this.scrPoint());
};
OptList_Item.prototype.scrPoint = function () {
    const sy = this.state() ? 275 : 188;
    return new Point(1295, sy);
};
OptList_Item.prototype.state = function () {
    if (this._sym === 'mapCg') return $gameSystem.isMapCgDisplay();
    if (this._sym === 'alwaysDash') return ConfigManager.alwaysDash;
    return ConfigManager[this._sym] > 0;
};
OptList_Item.prototype.operation = function () {
    const result = !this.state();
    if (this._sym === 'mapCg') $gameSystem.setMapCgDisplay(result);
    else if (this._sym === 'alwaysDash') ConfigManager.alwaysDash = result;
    else ConfigManager[this._sym] = result ? 100 : 0;
    this.refreshImage();
};
OptList_Item.prototype.refreshImage = function () {
    const p = this.scrPoint();
    this._uiFace.setFrame(p.x, p.y, this.width, this.height);
};
//==============================================================================================================
function LL_OptList() {
    this.initialize(...arguments);
}
LL_OptList.prototype = Object.create(Ui_Command.prototype);
LL_OptList.prototype.constructor = LL_OptList;
LL_OptList.prototype.initialize = function () {
    Ui_Command.prototype.initialize.call(this, 'Ui_Menu10', new Rectangle(0, 0, 1280, 720), new Point(0, 0));
};
LL_OptList.prototype.items = function () {
    return ['bgmVolume', 'bgsVolume', 'seVolume', 'meVolume', 'alwaysDash', 'mapCg', 'ExitGame'];
};
LL_OptList.prototype.maxItems = function () {
    return this.items().length;
};
LL_OptList.prototype.createParts = function () {
    Ui_Command.prototype.createParts.call(this);
    for (let i = 0; i < 6; ++i) {
        var x = Math.floor(i / 5) * 500 + 512;
        var y = i % 5 * 55 + 230;
        this._parts[i] = new OptList_Item(x, y, this.items()[i]);
        this.addChild(this._parts[i]);
    }
    this._cursor = new Sprite_OptionsCursor();
    this.refreshIndexChanged();
    this.addChild(this._cursor);
};
LL_OptList.prototype.itemRect = function (index) {
    const x = Math.floor(index / 5) * 500 + 300;
    const y = index % 5 * 53.5 + 240;
    return new Rectangle(x, y, 390, 32);
};
LL_OptList.prototype.refreshIndexChanged = function () {
    if (!this.active) this._cursor.hide();
    else {
        const rect = this.itemRect(this._index);
        this._cursor.move(rect.x, rect.y + rect.height / 2);
        this._cursor.show();
    }
};
LL_OptList.prototype.getTouchIndex = function () {
    const tx = TouchInput.x, ty = TouchInput.y;
    for (var i = 0; i < this.maxItems(); ++i) {
        const rect = this.itemRect(i);
        if (tx > rect.x && ty > rect.y && tx < (rect.x + rect.width) && ty < (rect.y + rect.height)) {
            return i;
        }
    }
    return null;
};
LL_OptList.prototype.drawAll = function () {
    const bitmap = this.loadUi('Ui_Menu10');
    bitmap.addLoadListener(function () {
        this.contents.fontSize = 22;
        this.contents.fontBold = true;
        this.contents.textColor = bitmap.getPixel(330, 160);
        const rect = this.itemRect(6);
        this.drawText('结束游戏', rect.x + 8, rect.y - 4, 240);
    }.bind(this));
};
LL_OptList.prototype.updateOther = function () {
    if (this.isActive() && TouchInput.isTriggered()) {
        const index = this.getTouchIndex();
        if (index !== null) {
            index === this._index ? this.onInputOk() : this.select(index);
        }
    }
};
LL_OptList.prototype.onInputOk = function () {
    SoundManager.playOk();
    if (this._index < 6) {
        this._index < 5 && this.parent.setOptioned();
        this._parts[this._index].operation();
    } else {
        this.deactivate();
        this.callHandler('exit');
    }
};
LL_OptList.prototype.onInputLeft = function () {
    const n = this._index % 5;
    const m = (Math.floor(this._index / 5) + 1) % 2;
    const index = m * 5 + n;
    index < this.maxItems() && this.select(index);
};
LL_OptList.prototype.onInputRight = function () {
    this.onInputLeft();
};
LL_OptList.prototype.onInputUp = function () {
    const n = this._index % 5;
    const m = Math.floor(this._index / 5);
    const c = m > 0 ? 1 : 4;
    const index = m * 5 + (n + c) % (m > 0 ? 2 : 5);
    this.select(index);
};
LL_OptList.prototype.onInputDown = function () {
    const n = this._index % 5;
    const m = Math.floor(this._index / 5);
    const index = m * 5 + (n + 1) % (m > 0 ? 2 : 5);
    this.select(index);
};
//==============================================================================================================
function LL_FileBg() {
    this.initialize(...arguments);
}
LL_FileBg.prototype = Object.create(Ui_Base.prototype);
LL_FileBg.prototype.constructor = LL_FileBg;
LL_FileBg.prototype.initialize = function (type, isTitle) {
    this._type = type;
    this._isTitle = isTitle;
    Ui_Base.prototype.initialize.call(this, 'Ui_Menu2', new Rectangle(0, 0, 1280, 720), new Point(0, 0));
};
LL_FileBg.prototype.createParts = function () {
    this._title = new Sprite(this.loadUi('Ui_Menu2'));
    this.refreshTitle();
    this.addChildToBack(this._title);
    Ui_Base.prototype.createParts.call(this);
};
LL_FileBg.prototype.refreshTitle = function () {
    const ry = this._type * 148 + (this._type < 6 ? 735 : 726);
    this._title.setFrame(0, ry, 1280, 120);
};
LL_FileBg.prototype.changeType = function (type) {
    if (this._type !== type) {
        this._type = type;
        this.refreshTitle();
        this.refreshTypeChenged();
    }
};
LL_FileBg.prototype.refreshTypeChenged = function () {

};
LL_FileBg.prototype.drawAll = function () {
    this.drawGold();
    this.drawGameHelp();
    this.refreshTypeChenged();
};
LL_FileBg.prototype.drawGold = function () {
    if (!this._isTitle) {
        this._dataGold = $gameParty.gold();
        this.contents.fontSize = 30;
        this.contents.clearRect(850, 15, 260, 50);
        this.drawText(this._dataGold, 860, 18, 240, 'right');
    }
};
LL_FileBg.prototype.drawGameHelp = function () {
    this._helpCount = Math.randomInt(120) + 300;
    this.contents.fontSize = 30;
    this.contents.clearRect(0, 646, 1110, 70);
    this.drawText(XdRsData.ll.helpText(), 50, 670, 1050);
};
LL_FileBg.prototype.updateOther = function () {
    if (!this._isTitle) {
        this._dataGold !== $gameParty.gold() && this.drawGold();
    }
    if (this._helpCount) {
        this._helpCount--;
        !this._helpCount && this.drawGameHelp();
    }
};
//==============================================================================================================
function Item_FileList() {
    this.initialize(...arguments);
}
Item_FileList.prototype = Object.create(Ui_Base.prototype);
Item_FileList.prototype.constructor = Item_FileList;
Item_FileList.prototype.initialize = function (itemIndex, mod) {
    this._mod = mod;
    this._isSelected = false;
    this._itemIndex = itemIndex;
    const data = this.currentSrcRect();
    const rect = new Rectangle(0, 0, data.width, data.height);
    Ui_Base.prototype.initialize.call(this, 'Ui_Menu2', rect, new Point(data.x, data.y));
};
Item_FileList.prototype.currentSrcRect = function () {
    const n1 = this.hasFile() ? 1 : 0;
    const n2 = this._isSelected ? 1 : 0;
    const x = [[21, 244], [557, 916]][n1][n2];
    return new Rectangle(x, 1760, 166, 166);
};
Item_FileList.prototype.changeMod = function (mod) {
    if (this._mod !== mod) {
        this._mod = mod;
        this.refresh();
    }
};
Item_FileList.prototype.fileId = function () {
    return this._itemIndex + 1;
};
Item_FileList.prototype.hasFile = function () {
    return !!DataManager.savefileInfo(this.fileId());
};
Item_FileList.prototype.refreshImage = function () {
    if (this._isSelected !== this.parent.selectedItem(this._itemIndex)) {
        this._isSelected = this.parent.selectedItem(this._itemIndex);
        const rect = this.currentSrcRect();
        this._uiFace.setFrame(rect.x, rect.y, rect.width, rect.height);
        this.refresh();
    }
};
Item_FileList.prototype.isActive = function () {
    return this.parent && this.parent.isActive();
};
Item_FileList.prototype.setupPosition = function () {
    this.x = this._itemIndex % 3 * 166;
    this.y = Math.floor(this._itemIndex / 3) * 166;
};
Item_FileList.prototype.onTouchSelf = function () {
    if (this._itemIndex === this.parent._index) this.parent.onInputOk();
    else this.parent.select(this._itemIndex);
};
Item_FileList.prototype.drawAll = function () {
    if (!this.hasFile()) return;
    this.contents.fontSize = 32;
    this.drawText(TextManager.file + ' ' + this.fileId(), 10, 65, 160, 'center');
};
//==============================================================================================================
function LL_FileList() {
    this.initialize(...arguments);
}
LL_FileList.prototype = Object.create(Ui_Command.prototype);
LL_FileList.prototype.constructor = LL_FileList;
LL_FileList.prototype.initialize = function (mod) {
    this._mod = mod;
    Ui_Command.prototype.initialize.call(this, '', new Rectangle(0, 0, 32, 32));
    this.activate();
};
LL_FileList.prototype.createParts = function () {
    Ui_Command.prototype.createParts.call(this);
    for (var i = 0; i < this.maxItems(); ++i) {
        this._parts[i] = new Item_FileList(i, this._mod);
        this.addChild(this._parts[i]);
    }
};
LL_FileList.prototype.setupPosition = function () {
    this.x = 300;
    this.y = 112;
};
LL_FileList.prototype.changeMod = function (mod) {
    if (this._mod !== mod) {
        this._parts.forEach(p => p.changeMod(mod));
    }
};
LL_FileList.prototype.maxItems = function () {
    return DataManager.maxSavefiles();
};
LL_FileList.prototype.selectedItem = function (itemIndex) {
    return this.active && this._index === itemIndex;
};
LL_FileList.prototype.refreshIndexChanged = function () {
    this._parts.forEach(w => w.refreshImage());
    this.callHandler('reset');
};
LL_FileList.prototype.isFileVaild = function () {
    if (this._mod === 'save') return true;
    return this._parts[this._index].hasFile();
};
LL_FileList.prototype.onInputLeft = function () {
    const n = Math.floor(this._index / 3);
    const m = this._index % 3;
    this.select(n * 3 + (m + 2) % 3);
};
LL_FileList.prototype.onInputRight = function () {
    const n = Math.floor(this._index / 3);
    const m = this._index % 3;
    this.select(n * 3 + (m + 1) % 3);
};
LL_FileList.prototype.onInputUp = function () {
    const n = Math.floor(this._index / 3);
    const m = this._index % 3;
    this.select((n + 2) % 3 * 3 + m);
};
LL_FileList.prototype.onInputDown = function () {
    const n = Math.floor(this._index / 3);
    const m = this._index % 3;
    this.select((n + 1) % 3 * 3 + m);
};
LL_FileList.prototype.onInputOk = function () {
    if (!this.isFileVaild()) return this.playBuzzerSe();
    this.playOkSe();
    this.deactivate();
    this.parent.displayFileInquiry();
};
//==============================================================================================================
function LL_FileInfo() {
    this.initialize(...arguments);
}
LL_FileInfo.prototype = Object.create(Ui_Base.prototype);
LL_FileInfo.prototype.constructor = LL_FileInfo;
LL_FileInfo.prototype.initialize = function () {
    Ui_Base.prototype.initialize.call(this, 'Ui_Menu3', new Rectangle(0, 0, 420, 498), new Point(826, 110));
};
LL_FileInfo.prototype.setupPosition = function () {
    this.x = 826;
    this.y = 110;
};
LL_FileInfo.prototype.refreshFile = function (fileId) {
    if (this._fileId !== fileId) {
        this._fileId = fileId;
        this.refresh();
    }
};
LL_FileInfo.prototype.drawAll = function () {
    this.contents.fontSize = 24;
    const info = DataManager.savefileInfo(this._fileId);
    if (info) {
        const words = ['所在地图:', '人物等级:', '游戏时间:', '存档时间:'];
        const arr = [info.mapName, 'Lv: ' + info.level, info.playtime, DataManager.getDateText(info.timestamp)];
        for (var i = 0; i < 4; ++i) {
            var y = [78, 110, 210, 240][i];
            this.drawEntry(y, words[i], arr[i]);
        }
    }
};
LL_FileInfo.prototype.drawEntry = function (y, word, text) {
    this.drawText(word, 45, y, 334);
    this.drawText(text, 45, y, 334, 'right');
};
//==============================================================================================================
function LL_InquiryFile() {
    this.initialize(...arguments);
}
LL_InquiryFile.prototype = Object.create(LL_InquiryExit.prototype);
LL_InquiryFile.prototype.constructor = LL_InquiryFile;
LL_InquiryFile.prototype.initialize = function (mod) {
    this._mod = mod;
    LL_InquiryExit.prototype.initialize.call(this);
};
LL_InquiryFile.prototype.uiName = function () {
    return 'Ui_Menu3';
};
LL_InquiryFile.prototype.uiSrcRect = function () {
    const ry = this._mod === 'load' ? 276 : 806;
    return new Rectangle(1294, ry, 496, 246);
};
LL_InquiryFile.prototype.onButtonPress = function (sym) {
    this._isSelectOk = sym === 'yes';
    this._isSelectOk && this.parent.onFileConfirm();;
    this.startUnRoll();
};
LL_InquiryFile.prototype.onAfterRoll = function (type) {
    Ui_InquiryBase.prototype.onAfterRoll.call(this, type);
    type === 1 && !this._isSelectOk && this.parent.activateFileList();
};
//==============================================================================================================
function LL_InquiryFileSelect() {
    this.initialize(...arguments);
}
LL_InquiryFileSelect.prototype = Object.create(LL_InquiryExit.prototype);
LL_InquiryFileSelect.prototype.constructor = LL_InquiryFileSelect;
LL_InquiryFileSelect.prototype.initialIndex = function () {
    return 2;
};
LL_InquiryFileSelect.prototype.uiName = function () {
    return 'Ui_Menu2';
};
LL_InquiryFileSelect.prototype.setFileId = function (id) {
    this._fileId = id;
};
LL_InquiryFileSelect.prototype.isButtonValid = function (sym) {
    if (!this._fileId || !sym) return false;
    return sym !== 'load' || !!DataManager.savefileInfo(this._fileId);
};
LL_InquiryFileSelect.prototype.uiSrcRect = function () {
    return new Rectangle(1305, 1552, 495, 242);
};
LL_InquiryFileSelect.prototype.rollWidth = function () {
    return 30;
};
LL_InquiryFileSelect.prototype.buttonsData = function () {
    return [{ 'x': 60, 'y': 150, 'sym': 'save' },
    { 'x': 192, 'y': 150, 'sym': 'load' },
    { 'x': 320, 'y': 150, 'sym': 'cacl' }];
};
LL_InquiryFileSelect.prototype.onButtonPress = function (sym) {
    this._isSelectOk = sym !== 'cacl';
    this._isSelectOk && this.parent.onFileConfirm(sym);
    this.startUnRoll();
};
LL_InquiryFileSelect.prototype.onAfterRoll = function (type) {
    Ui_InquiryBase.prototype.onAfterRoll.call(this, type);
    type === 1 && !this._isSelectOk && this.parent.activateFileList();
};
//==============================================================================================================
function LL_MenuSpecialInfo() {
    this.initialize(...arguments);
}
LL_MenuSpecialInfo.prototype = Object.create(Ui_Base.prototype);
LL_MenuSpecialInfo.prototype.constructor = LL_MenuSpecialInfo;
LL_MenuSpecialInfo.prototype.initialize = function () {
    Ui_Base.prototype.initialize.call(this, 'Ui_Menu9', new Rectangle(0, 0, 1280, 720), new Point(0, 0));
};
LL_MenuSpecialInfo.prototype.drawBar = function (x, y, sx, sy, sw, sh, nw, rate) {
    return LL_BattleActorStatus.prototype.drawBar.call(this, x, y, sx, sy, sw, sh, nw, rate, 'Ui_Menu9');
};
LL_MenuSpecialInfo.prototype.drawAll = function () {
    for (let i = 0; i < 3; ++i) this['drawArea' + i]();
};
LL_MenuSpecialInfo.prototype.drawArea0 = function () {
    for (let i = 0; i < 4; ++i) {
        var num = Math.min(100, XdRsData.ll.atbValue('RE' + i));
        this.drawBar(430, i * 38.5 + 177, 1312, 86, 202, 20, 4, num / 100);
        this.drawText(num, 630, i * 38.5 + 170, 76, 'right');
    }
};
LL_MenuSpecialInfo.prototype.drawArea1 = function () {
    const arr = ['PRG', 'CHR', 'CH0', 'CH1', 'MAS', 'SXH'];
    const num0 = $gameParty.childrenNums(0);
    const num1 = $gameParty.childrenNums(1);
    for (let i = 0; i < arr.length; ++i) {
        var sym = arr[i];
        var num = XdRsData.ll.atbValue(sym)
        if ([1, 2, 3].contains(i)) {
            num = [num0 + num1, num0, num1][i - 1];
        }
        this.drawText(num, 440, i * 38.5 + 362, 266, 'right');
    }
};
LL_MenuSpecialInfo.prototype.drawArea2 = function () {
    for (let i = 0; i < 11; ++i) {
        var num = XdRsData.ll.atbValue('HC' + i)
        this.drawText(num, 980, i * 38 + 175, 198, 'right');
    }
};
//==============================================================================================================
// function LL_BattleCommand() {
//     this.initialize(...arguments);
// }
// LL_BattleCommand.prototype = Object.create(LL_MenuCommand.prototype);
// LL_BattleCommand.prototype.constructor = LL_BattleCommand;
// LL_BattleCommand.prototype.initialize = function () {
//     Ui_Command.prototype.initialize.call(this, '', new Rectangle(0, 0, 32, 32));
//     this.hide();
// };
// LL_BattleCommand.prototype.needTouchActivate = function () {
//     return false;
// };
// LL_BattleCommand.prototype.buttonsData = function () {
//     return [{ 'x': 0, 'y': 0, 'sym': 'atk' },
//     { 'x': 0, 'y': 90, 'sym': 'skilB' },
//     { 'x': 0, 'y': 180, 'sym': 'itemB' },
//     { 'x': 0, 'y': 270, 'sym': 'flee' }];
// };
// LL_BattleCommand.prototype.moveIn = function () {
//     this.show();
//     LL_MenuCommand.prototype.moveIn.call(this);
// };
// LL_BattleCommand.prototype.setupPosition = function () {
//     this.x = 50;
//     this.y = 140;
// };
// LL_BattleCommand.prototype.activate = function () {
//     Ui_Command.prototype.activate.call(this);
// };
// LL_BattleCommand.prototype.onButtonPress = function (sym) {
//     this.deactivate();
//     this.callHandler(sym);
// };
// LL_BattleCommand.prototype.onChildMoveEnd = function () {
//     const type = this._childMoveData.type;
//     this._childMoveData = null;
//     type === 0 ? this.activate() : this.hide();
// };
// LL_BattleCommand.prototype.updateUnActive = function () {
// };
// LL_BattleCommand.prototype.onInputCancel = function () {
// };
//==============================================================================================================
// function LL_BattleActorStatus() {
//     this.initialize(...arguments);
// }
// LL_BattleActorStatus.prototype = Object.create(Ui_Base.prototype);
// LL_BattleActorStatus.prototype.constructor = LL_BattleActorStatus;
// LL_BattleActorStatus.prototype.initialize = function () {
//     Ui_Base.prototype.initialize.call(this, 'Ui_Menu8', new Rectangle(0, 0, 1280, 170), new Point(0, 550));
// };
// LL_BattleActorStatus.prototype.setupPosition = function () {
//     this.y = Graphics.height - this.height;
// };
// LL_BattleActorStatus.prototype.drawAll = function () {
//     this.contents.fontSize = 20;
//     this.contents.textColor = 'white';
//     this.refreshActorHp();
//     this.refreshActorMp();
//     this.refreshActorStates();
// };
// LL_BattleActorStatus.prototype.drawBar = function (x, y, sx, sy, sw, sh, nw, rate, uiName) {
//     uiName = uiName || 'Ui_Menu8';
//     const bw = sw * rate;
//     const bitmap = this.loadUi(uiName);
//     bitmap.addLoadListener(function () {
//         if (bw > 0) {
//             this.contents.blt(bitmap, sx, sy, Math.min(nw, bw), sh, x, y);
//             if (bw > nw) {
//                 const dw = bw - (bw > (nw * 2) ? nw * 2 : nw);
//                 this.contents.blt(bitmap, sx + nw, sy, sw - nw * 2, sh, x + nw, y, dw);
//                 if (bw > 10) this.contents.blt(bitmap, sx + sw - nw, sy, nw, sh, x + dw + nw, y);
//             }
//         }
//     }.bind(this));
// };
// LL_BattleActorStatus.prototype.refreshActorHp = function () {
//     this.contents.clearRect(330, 60, 420, 40);
//     this._dataHp = this.actor().hp;
//     this.drawBar(338, 78, 338, 444, 260, 18, 5, this._dataHp / this.actor().mhp);
//     const text = '' + this._dataHp + '/' + this.actor().mhp;
//     this.drawText(text, 600, 68, 150, 'center');
// };
// LL_BattleActorStatus.prototype.refreshActorMp = function () {
//     this.contents.clearRect(330, 100, 420, 40);
//     this._dataMp = this.actor().mp;
//     this.drawBar(338, 111, 338, 476, 260, 18, 5, this._dataMp / this.actor().mmp);
//     const text = '' + this._dataMp + '/' + this.actor().mmp;
//     this.drawText(text, 600, 102, 150, 'center');
// };
// LL_BattleActorStatus.prototype.refreshActorStates = function () {
//     this.contents.clearRect(752, 0, 198, 170);
//     this.actor().closeStateChenged();
//     var index = 0;
//     const arr = this.actor().allIcons();
//     const bitmap = ImageManager.loadSystem("IconSet");
//     const pw = ImageManager.iconWidth, ph = ImageManager.iconHeight;
//     for (var i = 0; i < arr.length; ++i) {
//         if (index > 2) break;
//         if (!arr[i]) continue;
//         const sx = (arr[i] % 16) * pw;
//         const sy = Math.floor(arr[i] / 16) * ph;
//         this.contents.blt(bitmap, sx, sy, pw, ph, index * 70 + 756, 78, 50, 50);
//         index++;
//     }
// };
// LL_BattleActorStatus.prototype.updateOther = function () {
//     this._dataHp !== this.actor().hp && this.refreshActorHp();
//     this._dataMp !== this.actor().mp && this.refreshActorMp();
//     this.actor().isStateChenged() && this.refreshActorStates();
// };
// //==============================================================================================================
// function LL_BattleSkillList() {
//     this.initialize(...arguments);
// }
// LL_BattleSkillList.prototype = Object.create(Ui_Selectable.prototype);
// LL_BattleSkillList.prototype.constructor = LL_BattleSkillList;
// LL_BattleSkillList.prototype.initialize = function () {
//     this._itemType = 0;
//     this.setupSkills();
//     Ui_Selectable.prototype.initialize.call(this, 'Ui_Menu8', new Rectangle(0, 0, 652, 496), new Point(0, 788));
//     this.hide();
// };
// LL_BattleSkillList.prototype.lineHeight = function () {
//     return 52;
// };
// LL_BattleSkillList.prototype.desLineHeight = function () {
//     return 32;
// };
// LL_BattleSkillList.prototype.onBeforSpread = function () {
//     this._uiFace.hide();
//     this._typeSign0.hide();
//     this._typeSign1.hide();
//     this._itemContents.hide();
//     this._contentsSprite.hide();
// };
// LL_BattleSkillList.prototype.startSpread = function () {
//     this.onBeforSpread();
//     const w = 36;
//     const bitmap = this._uiFace.bitmap;
//     const rect = this._uiFace._frame;
//     const cx = this.width / 2;
//     const ax = (cx - w / 2 - w) / 10;
//     this._spreadData = { 'count': 10, 'type': 0, 'ax': ax, 'as': 0.1 };
//     this._spreadSprites = [];
//     for (var i = 0; i < 3; ++i) {
//         this._spreadSprites[i] = new Sprite(bitmap);
//         var rx = [rect.x, rect.x + w, rect.x + this.width - w][i];
//         var rw = [w, this.width - w * 2, w][i];
//         this._spreadSprites[i].setFrame(rx, rect.y, rw, this.height);
//         this._spreadSprites[i].anchor = new Point(0.5, 0);
//         this._spreadSprites[i].x = [cx - w / 2, cx, cx + w / 2][i];
//         if (i === 1) this._spreadSprites[i].scale.x = 0;
//         this.addChildToBack(this._spreadSprites[i]);
//     }
//     this.show();
// };
// LL_BattleSkillList.prototype.startCollapse = function () {
//     if (this._spreadData) {
//         this.onBeforSpread();
//         this._spreadSprites.forEach(w => w.show());
//         this._spreadData.count = 10;
//         this._spreadData.type = 1;
//     }
// };
// LL_BattleSkillList.prototype.resetFontSettings = function () {
//     Ui_Selectable.prototype.resetFontSettings.call(this);
//     this.contents.fontSize = 22;
// };
// LL_BattleSkillList.prototype.setupPosition = function () {
//     this.x = (Graphics.width - this.width) / 2 - 60;
//     this.y = (Graphics.height - this.height) / 2 - 40;
// };
// LL_BattleSkillList.prototype.createParts = function () {
//     Ui_Selectable.prototype.createParts.call(this);
//     this._typeSign0 = new Ui_Base('Ui_Menu8', new Rectangle(0, 0, 84, 84), new Point(980, 1140));
//     this._typeSign1 = new Ui_Base('Ui_Menu8', new Rectangle(0, 0, 84, 84), new Point(980, 1252));
//     this._typeSign0.x = 48; this._typeSign0.y = 90;
//     this._typeSign1.x = 48; this._typeSign1.y = 202;
//     this.refreshTypeSign();
//     this.addChild(this._typeSign0);
//     this.addChild(this._typeSign1);
// };
// LL_BattleSkillList.prototype.refreshTypeSign = function () {
//     this._typeSign0.hide();
//     this._typeSign1.hide();
//     if (this._itemType === 0) this._typeSign0.show();
//     if (this._itemType === 1) this._typeSign1.show();
// };
// LL_BattleSkillList.prototype.itemsArea = function () {
//     return new Rectangle(150, 26, 440, 330);
// };
// LL_BattleSkillList.prototype.cursorSize = function () {
//     return new Point(430, 48);
// };
// LL_BattleSkillList.prototype.cursorLocationPoint = function (index) {
//     return new Point(8, index * this.lineHeight() + 11);
// };
// LL_BattleSkillList.prototype.changeItemType = function (type) {
//     if (this._itemType !== type) {
//         SoundManager.playOk();
//         this._itemType = type;
//         this.refreshTypeSign();
//         this.setupSkills();
//         this.resetup();
//         this.drawItemDes();
//     }
// };
// LL_BattleSkillList.prototype.resetup = function () {
//     this._itemContents.select(0, true);
//     this._itemContents.setTopY(0);
//     this.refresh();
// };
// LL_BattleSkillList.prototype.setupSkills = function () {
//     this._skills = this.actor().skills().filter(s => s.stypeId === this._itemType + 1);
// };
// LL_BattleSkillList.prototype.items = function () {
//     return this._skills;
// };
// LL_BattleSkillList.prototype.isActive = function () {
//     if (this._spreadData && this._spreadData.count > 0) return false;
//     return Ui_Selectable.prototype.isActive.call(this);
// };
// LL_BattleSkillList.prototype.calcTextHeight = function (textState) {
//     const lineSpacing = this.desLineHeight() - 22;
//     const lastFontSize = this.contents.fontSize;
//     const lines = textState.text.slice(textState.index).split("\n");
//     const textHeight = this.maxFontSizeInLine(lines[0]) + lineSpacing;
//     this.contents.fontSize = lastFontSize;
//     return textHeight;
// };
// LL_BattleSkillList.prototype.maxExWidth = function () {
//     return 580;
// };
// LL_BattleSkillList.prototype.refreshIndexChanged = function () {
//     Ui_Selectable.prototype.refreshIndexChanged.call(this);
//     this.drawItemDes();
// };
// LL_BattleSkillList.prototype.drawAll = function () {
//     this.drawListBg();
//     Ui_Selectable.prototype.drawAll.call(this);
// };
// LL_BattleSkillList.prototype.drawListBg = function () {
//     const bitmap = this.loadUi('Ui_Menu8');
//     bitmap.addLoadListener(function () {
//         this.contents.blt(bitmap, 158, 1148, 440, 100, 158, 50, 440, 295);
//     }.bind(this));
// };
// LL_BattleSkillList.prototype.drawItemRect = function (index) {
//     const rect = this.itemRect(index);
//     const bitmap = this.loadUi('Ui_Menu8');
//     const contents = this._itemContents.contents;
//     bitmap.addLoadListener(function () {
//         contents.blt(bitmap, 708, 782, 428, 38, rect.x, rect.y);
//         this.drawItem(index);
//     }.bind(this));
// };
// LL_BattleSkillList.prototype.drawItem = function (index) {
//     const item = this.items()[index];
//     const rect = this.itemRect(index);
//     if (item) {
//         this.contents.fontSize = 24;
//         this._itemContents.drawIcon(item.iconIndex, rect.x + 4, rect.y + 5);
//         this._itemContents.drawText(item.name, rect.x + 60, rect.y + 4);
//         this._itemContents.drawText(item.mpCost, rect.x + 60, rect.y + 4, 324, 'right');
//         const bitmap = this.loadUi('Ui_Menu8');
//         bitmap.addLoadListener(function () {
//             const contents = this._itemContents.contents;
//             contents.blt(bitmap, 1048, 958, 16, 30, rect.x + 390, rect.y + 12);
//         }.bind(this));
//     }
// };
// LL_BattleSkillList.prototype.drawItemDes = function () {
//     this.contents.clearRect(142, 356, 448, 120);
//     if (this.item()) {
//         this.drawTextEx(this.item().description, 160, 378);
//     }
// };
// LL_BattleSkillList.prototype.getTouchedType = function () {
//     const touchPos = new Point(TouchInput.x, TouchInput.y);
//     const localPos = this.worldTransform.applyInverse(touchPos);
//     for (let i = 0; i < 2; ++i) {
//         var rect = new Rectangle(54, i * 110 + 96, 70, 70);
//         if (rect.contains(localPos.x, localPos.y)) return i;
//     }
//     return null;
// };
// LL_BattleSkillList.prototype.onSpreadEnd = function () {
//     const type = this._spreadData.type;
//     if (type === 0) {
//         this._uiFace.show();
//         this._itemContents.show();
//         this._contentsSprite.show();
//         this.refreshTypeSign();
//         this.drawItemDes();
//         this.activate();
//     } else {
//         this.callHandler(this._isSelectOk ? 'ok' : 'cancel');
//         this._isSelectOk = false;
//         this.hide();
//     }
//     this._spreadSprites.forEach(w => w.hide());
// };
// LL_BattleSkillList.prototype.updateOther = function () {
//     this.updateSpread();
//     if (this.isActive()) {
//         if (TouchInput.isTriggered()) {
//             const n = this.getTouchedType();
//             if (n !== null && !this['_typeSign' + n].visible) {
//                 this.changeItemType(n);
//             }
//         }
//     }
// };
// LL_BattleSkillList.prototype.updateSpread = function () {
//     if (!this._spreadData || this._spreadData.count === 0) return;
//     const type = this._spreadData.type;
//     const ax = this._spreadData.ax;
//     const as = this._spreadData.as;
//     this._spreadSprites[0].x += !type ? -ax : ax;
//     this._spreadSprites[1].scale.x += !type ? as : -as;
//     this._spreadSprites[2].x += !type ? ax : -ax;
//     this._spreadData.count--;
//     !this._spreadData.count && this.onSpreadEnd();
// };
// LL_BattleSkillList.prototype.isValid = function () {
//     return this.actor().canUse(this.item());
// };
// LL_BattleSkillList.prototype.onInputOk = function () {
//     if (!this.isValid()) return this.playBuzzerSe();
//     this.playOkSe();
//     this._isSelectOk = true;
//     this.startCollapse();
// };
// LL_BattleSkillList.prototype.onInputCancel = function () {
//     this.playCancelSe();
//     this._isSelectOk = false;
//     this.startCollapse();
// };
// LL_BattleSkillList.prototype.onInputPageUp = function () {
//     this.changeItemType(0);
// };
// LL_BattleSkillList.prototype.onInputPageDown = function () {
//     this.changeItemType(1);
// };
// //==============================================================================================================
// function LL_BattleItemList() {
//     this.initialize(...arguments);
// }
// LL_BattleItemList.prototype = Object.create(LL_BattleSkillList.prototype);
// LL_BattleItemList.prototype.constructor = LL_BattleItemList;
// LL_BattleItemList.prototype.initialize = function () {
//     this.setupItems();
//     Ui_Selectable.prototype.initialize.call(this, 'Ui_Menu8', new Rectangle(0, 0, 652, 496), new Point(0, 1414));
//     this.drawItemDes();
//     this.hide();
// };
// LL_BattleItemList.prototype.setupItems = function () {
//     this._items = $gameParty.items().filter(item => {
//         return item.occasion < 2;
//     });
// };
// LL_BattleItemList.prototype.items = function () {
//     return this._items;
// };
// LL_BattleItemList.prototype.onBeforSpread = function () {
//     this.setupItems();
//     this.refresh();
//     var index = this.index();
//     while (index > 0 && !this.items()[index]) index--;
//     this._itemContents.select(index, true);
//     LL_BattleSkillList.prototype.onBeforSpread.call(this);
// };
// LL_BattleItemList.prototype.itemsArea = function () {
//     return new Rectangle(60, 26, 512, 330);
// };
// LL_BattleItemList.prototype.cursorSize = function () {
//     return new Point(504, 48);
// };
// LL_BattleItemList.prototype.drawListBg = function () {
//     const bitmap = this.loadUi('Ui_Menu8');
//     bitmap.addLoadListener(function () {
//         this.contents.blt(bitmap, 158, 1148, 440, 100, 60, 50, 520, 295);
//     }.bind(this));
// };
// LL_BattleItemList.prototype.drawItemRect = function (index) {
//     const rect = this.itemRect(index);
//     const bitmap = this.loadUi('Ui_Menu8');
//     const contents = this._itemContents.contents;
//     bitmap.addLoadListener(function () {
//         contents.blt(bitmap, 708, 1410, 36, 38, rect.x, rect.y + 2);
//         contents.blt(bitmap, 758, 1410, 378, 38, rect.x + 50, rect.y + 2, 462);
//         this.drawItem(index);
//     }.bind(this));
// };
// LL_BattleItemList.prototype.drawItem = function (index) {
//     const item = this.items()[index];
//     const rect = this.itemRect(index);
//     if (item) {
//         const text = 'x ' + $gameParty.numItems(item);
//         this.contents.fontSize = 24;
//         this._itemContents.drawIcon(item.iconIndex, rect.x + 2, rect.y + 5);
//         this._itemContents.drawText(item.name, rect.x + 60, rect.y + 2);
//         this._itemContents.drawText(text, rect.x + 60, rect.y + 3, 410, 'right');
//     }
// };
// LL_BattleItemList.prototype.onInputPageUp = function () {
// };
// LL_BattleItemList.prototype.onInputPageDown = function () {
// };
// //==============================================================================================================
// function LL_BattleEnemySelect() {
//     this.initialize(...arguments);
// }
// LL_BattleEnemySelect.prototype = Object.create(Ui_Command.prototype);
// LL_BattleEnemySelect.prototype.constructor = LL_BattleEnemySelect;
// LL_BattleEnemySelect.prototype.initialize = function () {
//     const w = Graphics.width, h = Graphics.height;
//     Ui_Command.prototype.initialize.call(this, '', new Rectangle(0, 0, w, h));
//     this.hide();
// };
// LL_BattleEnemySelect.prototype.initialIndex = function () {
//     return $gameTemp.battleEnemyIndex();
// };
// LL_BattleEnemySelect.prototype.createParts = function () {
//     this._actionCount = 0;
//     this._actionY = 20;
//     this._arrow = new Sprite(this.loadUi('Ui_Menu8'));
//     this._arrow.setFrame(982, 1852, 48, 38);
//     this._arrow.anchor = new Point(0.5, 1);
//     this.addChild(this._arrow);
// };
// LL_BattleEnemySelect.prototype.enemy = function () {
//     return this.enemies()[this._index];
// };
// LL_BattleEnemySelect.prototype.enemies = function () {
//     return $gameTroop.members();
// };
// LL_BattleEnemySelect.prototype.maxItems = function () {
//     return this.enemies().length;
// };
// LL_BattleEnemySelect.prototype.enemySprite = function () {
//     return this.getSprite ? this.getSprite(this.enemy()) : null;
// };
// LL_BattleEnemySelect.prototype.display = function () {
//     this.correct(this._index);
//     this.activate();
//     this.show();
// };
// LL_BattleEnemySelect.prototype.correct = function (index) {
//     this._index = index;
//     const max = this.maxItems();
//     while (!this.enemy().isAlive()) this._index = (this._index + 1) % max;
//     this.refreshIndexChanged();
// };
// LL_BattleEnemySelect.prototype.roll = function (type) {
//     const max = this.maxItems();
//     if (max) {
//         const add = type ? 1 : max - 1;
//         var index = (this._index + add) % max;
//         var enemy = this.enemies()[index];
//         while (!enemy.isAlive()) {
//             index = (index + add) % max;
//             enemy = this.enemies()[index];
//         }
//         this.select(index);
//     }
// };
// LL_BattleEnemySelect.prototype.refreshIndexChanged = function () {
//     $gameTemp.setBattleEnemyIndex(this._index);
//     this._sprite = this.enemySprite();
//     this.updateArrow();
// };
// LL_BattleEnemySelect.prototype.updateOther = function () {
//     if (!this.isActive()) return;
//     this.updateArrow();
//     if (this._index !== $gameTemp.battleEnemyIndex()) {
//         this.select($gameTemp.battleEnemyIndex());
//     }
//     this._actionCount = (this._actionCount + 1) % 60;
//     this._actionY += this._actionCount < 30 ? 0.2 : -0.2;
//     if ($gameTemp.isBattleEnemyOk()) {
//         this.onInputOk();
//         $gameTemp.setBattleEnemyOk(false);
//     }
// };
// LL_BattleEnemySelect.prototype.updateArrow = function () {
//     if (this._sprite) {
//         this._arrow.x = this._sprite.x;
//         this._arrow.y = this._sprite.y - this._sprite.height - this._actionY;
//     }
// };
// LL_BattleEnemySelect.prototype.onInputLeft = function () {
//     this.roll(0);
// };
// LL_BattleEnemySelect.prototype.onInputRight = function () {
//     this.roll(1);
// };
//==============================================================================================================
XdRsData.ll.Window_BattleLog_updateWaitMode = Window_BattleLog.prototype.updateWaitMode;
Window_BattleLog.prototype.updateWaitMode = function () {
    if (this._waitMode === 'qte') {
        if (QTE_Manager.isRuning()) return true;
        else this._waitMode = '';
    }
    return XdRsData.ll.Window_BattleLog_updateWaitMode.call(this);
};
//==============================================================================================================
// end
//==============================================================================================================