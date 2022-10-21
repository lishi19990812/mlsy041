//=============================================================================
// RPG Maker MZ - 多货币商店-卖
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-< 多货币商店-卖>
 * @author FlyCat
 * 
 * @command openShop
 * @text 打开商店
 * @desc 打开商店
 * 
 * @help
 * 插件指令：打开商店
 * 物品备注：<卖出材料:物品id,卖出后数量>
 *范例： <卖出材料:1,2>  卖出该物品后，可以获得数据库1号物品2个
 * 
 */
'use strict';
var Imported = Imported || {};
Imported.FlyCat_GoldCore = true;

var FlyCat = FlyCat || {};
FlyCat.ShopCore = {};
FlyCat.ShopCore.parameters = PluginManager.parameters('FlyCat_GoldCore');

PluginManager.registerCommand('FlyCat_GoldCore', 'openShop', args => {
    SceneManager.push(Scene_SellShop)
});

function Scene_SellShop() {
    this.initialize(...arguments);
}

Scene_SellShop.prototype = Object.create(Scene_MenuBase.prototype);
Scene_SellShop.prototype.constructor = Scene_SellShop;

Scene_SellShop.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
    this._lastSellItem = null;
};
Scene_SellShop.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this.addChild(this._backgroundSprite);
};
Scene_SellShop.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createButItemInfoWindow();
    this.createBuyItemListWindow();
    this.createNumberInputWindow();
    if (Imported.MiniInformationWindow) {
        this.createMiniWindow();
        if (this._buyItemListWindow) this._buyItemListWindow._miniInfoWindow = this._miniWindow;
    };
};

Scene_SellShop.prototype.createBuyItemListWindow = function () {
    const rect = this.buyItemListWindowRect();
    this._buyItemListWindow = new Window_SellItemList(rect);
    this._buyItemListWindow.setHandler("ok", this.onBuyItem.bind(this));
    this._buyItemListWindow.setHandler("cancel", this.popScene.bind(this));
    this.addChild(this._buyItemListWindow);
    FlyCat.ShopCore._sellItemListWindow = this._buyItemListWindow;
    this._buyItemListWindow.select(0);
    if (this._buyItemListWindow._list.length > 0) this._buyItemListWindow.select(0);
};
Scene_SellShop.prototype.buyItemListWindowRect = function () {
    const ww = 310;
    const wh = 470;
    const wx = Graphics.width / 2 - ww + 10;
    const wy = Graphics.height / 2 - wh / 2 + 5;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_SellShop.prototype.createNumberInputWindow = function () {
    const rect = this.newNumberInputRect();
    this._shopNumberInputWindow = new Window_ShopSellNumberInput(rect);
    this._shopNumberInputWindow.setHandler("cancel", this.closeShopNumberInputWindow.bind(this));
    this.addChild(this._shopNumberInputWindow);
    this._shopNumberInputWindow.deactivate();
};

Scene_SellShop.prototype.closeShopNumberInputWindow = function () {
    this._shopNumberInputWindow.deactivate();
    this._buyItemListWindow.activate();
};
Scene_SellShop.prototype.newNumberInputRect = function () {
    const ww = 320;
    const wh = 470;
    const wx = 640;
    const wy = 260;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_SellShop.prototype.createButItemInfoWindow = function () {
    const rect = this.buyItemInfoWindowRect();
    this._buyItemInfoWindow = new Window_SellItemInfo(rect);
    this.addChild(this._buyItemInfoWindow);
};
Scene_SellShop.prototype.buyItemInfoWindowRect = function () {
    const ww = 620;
    const wh = 520;
    const wx = Graphics.width / 2 - 310 + 6;
    const wy = Graphics.height / 2 - wh / 2 - 15;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_SellShop.prototype.onBuyItem = function () {
    this._buyItemListWindow.deactivate();
    this._shopNumberInputWindow.activate();
    const index = this._buyItemListWindow.index();
    const item = this._buyItemListWindow._list[index];
    if (item) this._shopNumberInputWindow.setup(item);
};
Scene_SellShop.prototype.update = function () {
    Scene_MenuBase.prototype.update.call(this);
    if (this._buyItemListWindow && this._buyItemListWindow.index() >= 0) {
        const index = this._buyItemListWindow.index();
        const item = this._buyItemListWindow._list[index];
        if (Imported.MiniInformationWindow) {
            this._buyItemListWindow.setMiniWindow(item ? item : null, $gameParty.menuActor());
        }
        if (this._buyItemInfoWindow) this._buyItemInfoWindow.refresh(item);
        if (this._shopNumberInputWindow && this._lastSellItem != item) {
            this._shopNumberInputWindow.setItem(item);
            this._lastSellItem = item;
        }
    }
    if (this._buyItemListWindow && this._buyItemListWindow.index() == -1) {
        if (Imported.MiniInformationWindow) {
            this._buyItemListWindow.setMiniWindow(null);
        }
        if (this._buyItemInfoWindow) this._buyItemInfoWindow.refresh(null);
    };
};
function Window_SellItemInfo() {
    this.initialize(...arguments);
};

Window_SellItemInfo.prototype = Object.create(Window_Base.prototype);
Window_SellItemInfo.prototype.constructor = Window_SellItemInfo;

Window_SellItemInfo.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.opacity = 255;
    this.refresh(null);
};
Window_SellItemInfo.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = 24;
    this.resetTextColor();
};
Window_SellItemInfo.prototype.refresh = function (item) {
    this.createContents();
    this.contents.fontSize = 26;
    this.changeTextColor(ColorManager.textColor(0));
    this.drawText('当前出售物品', 66, 4, this.width, 'left')
    this.contents.fontSize = 20;
    this.drawText('所持金钱：' + $gameParty.gold(), 0, 8, this.width - 36, 'right')
    this.contentsBack.fillRect(3, 40, this.width, 1, ColorManager.textColor(15));
    this.contentsBack.fillRect(294, 40, 1, 450, ColorManager.textColor(15));
    this._item = item;
    if (this._item) {
        const meta = item.meta.卖出材料.split(',');
        const itemId = Number(meta[0]);
        if (SceneManager._scene._shopNumberInputWindow._number > 0) {
            this._number = SceneManager._scene._shopNumberInputWindow._number;
        } else {
            this._number = 1;
        }
        const itemNumber = Number(meta[1]) * this._number;
        const newItem = $dataItems[itemId];
        this.drawTextEx('当前持有数量：' + $gameParty.numItems(this._item), 300, 50, this.width, 'left');
        this.drawTextEx('可换取：' + itemNumber + '\\I[' + newItem.iconIndex + ']' + newItem.name, 300, 100)
    }
};
function Window_SellItemList() {
    this.initialize(...arguments);
};

Window_SellItemList.prototype = Object.create(Window_Selectable.prototype);
Window_SellItemList.prototype.constructor = Window_SellItemList;

Window_SellItemList.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.opacity = 0;
    this._list = [];
    this.select(0);
    this.activate();
    this.refresh();
};

Window_SellItemList.prototype.refresh = function () {
    this.createContents();
    this._list = $gameParty.allItems().filter(item => item.meta.卖出材料);
    this.drawAllItems();
};
Window_SellItemList.prototype.drawItem = function (index) {
    this.contents.fontSize = 20;
    const rect = this.itemLineRect(index);
    const item = this._list[index];
    if (item) {
        const meta = item.meta.卖出材料.split(',');
        const itemId = Number(meta[0]);
        const itemNumber = Number(meta[1]);
        const newItem = $dataItems[itemId];
        this.changeTextColor(ColorManager.textColor(0));
        this.drawIcon(item.iconIndex, rect.x, rect.y + 1)
        this.drawText(item.name, rect.x + 36, rect.y);
        this.drawIcon(newItem.iconIndex, rect.x + this.itemWidth() - 50, rect.y + 1)
        this.drawText(itemNumber, rect.x, rect.y, this.itemWidth() - 50, 'right');
        this.resetTextColor();
    }
};
Window_SellItemList.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_SellItemList.prototype.maxCols = function () {
    return 1;
};
Window_SellItemList.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows()) + 0.7;
};

Window_SellItemList.prototype.itemWidth = function () {
    return Math.floor(this.innerWidth / this.maxCols());
};

Window_SellItemList.prototype.numVisibleRows = function () {
    return 8;
};

Window_SellItemList.prototype.drawBackgroundRect = function (rect) {
    const c1 = ColorManager.textColor(15);
    const x = rect.x;
    const y = rect.y;
    const w = rect.width;
    const h = rect.height;
    this.contentsBack.strokeRect(x, y, w, h, c1);
};
function Window_ShopSellNumberInput() {
    this.initialize(...arguments);
}

Window_ShopSellNumberInput.prototype = Object.create(Window_Selectable.prototype);
Window_ShopSellNumberInput.prototype.constructor = Window_ShopSellNumberInput;

Window_ShopSellNumberInput.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.opacity = 0;
    this._item = null;
    this._max = $gameParty.maxItems();
    this._number = 1;
    this.createButtons();
    this.refresh();
    this.select(0);
};
Window_ShopSellNumberInput.prototype.refresh = function () {
    Window_Selectable.prototype.refresh.call(this);
    this.contents.fontSize = 20;
    this.drawItemBackground(0);
    this.drawCurrentItemName();
    this.drawNumber();
};
Window_ShopSellNumberInput.prototype.setItem = function (item) {
    this._item = item;
    this._max = $gameParty.numItems(item);
    this.refresh();
};
Window_ShopSellNumberInput.prototype.setup = function (item) {
    this._item = item;
    this._number = 1;
    this._max = $gameParty.numItems(item);
    this.refresh();
};
Window_ShopSellNumberInput.prototype.drawNumber = function () {
    const x = this.cursorX();
    const y = this.itemNameY();
    const width = this.cursorWidth() - this.itemPadding();
    this.resetTextColor();
    this.drawText('数量', -100, y, this.width, "right");
    this.drawText(this._number, x + 2, y, width, "right");
};
Window_ShopSellNumberInput.prototype.drawCurrentItemName = function () {
    const padding = this.itemPadding();
    const x = padding * 2;
    const y = this.itemNameY();
    const width = this.multiplicationSignX() - padding * 3;
    if (this._item) this.drawItemName(this._item, x - 20, y, width);
};
Window_ShopSellNumberInput.prototype.drawItemName = function (item, x, y, width) {
    if (item) {
        const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        const textMargin = ImageManager.iconWidth + 4;
        const itemWidth = Math.max(0, width - textMargin);
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x, iconY);
        if (item.color) { this.changeTextColor(ColorManager.textColor(item.color)); }
        this.drawText(item.name, x + textMargin, y, itemWidth);
    }
};
Window_ShopSellNumberInput.prototype.multiplicationSignX = function () {
    const sign = this.multiplicationSign();
    const width = this.textWidth(sign);
    return this.cursorX() - width * 2;
};
Window_ShopSellNumberInput.prototype.multiplicationSign = function () {
    return "\u00d7";
};
Window_ShopSellNumberInput.prototype.itemNameY = function () {
    return Math.floor(this.innerHeight / 2 - this.lineHeight() * 1.5);
};
Window_ShopSellNumberInput.prototype.cursorX = function () {
    const padding = this.itemPadding();
    return this.innerWidth - this.cursorWidth() - padding * 2;
};
Window_ShopSellNumberInput.prototype.maxDigits = function () {
    return 2;
};
Window_ShopSellNumberInput.prototype.cursorWidth = function () {
    const padding = this.itemPadding();
    const digitWidth = this.textWidth("0");
    return this.maxDigits() * digitWidth + padding * 2;
};
Window_ShopSellNumberInput.prototype.number = function () {
    return this._number;
};
Window_ShopSellNumberInput.prototype.createButtons = function () {
    this._buttons = [];
    if (ConfigManager.touchUI) {
        for (const type of ["down2", "down", "up", "up2", "ok"]) {
            const button = new Sprite_Button(type);
            this._buttons.push(button);
            this.addInnerChild(button);
        }
        this._buttons[0].setClickHandler(this.onButtonDown2.bind(this));
        this._buttons[0].x = 150;
        this._buttons[0].y = 250;
        this._buttons[1].setClickHandler(this.onButtonDown.bind(this));
        this._buttons[1].x = 50;
        this._buttons[1].y = 250;
        this._buttons[2].setClickHandler(this.onButtonUp.bind(this));
        this._buttons[2].y = 250;
        this._buttons[3].setClickHandler(this.onButtonUp2.bind(this));
        this._buttons[3].x = 100;
        this._buttons[3].y = 250;
        this._buttons[4].setClickHandler(this.onButtonOk.bind(this));
        this._buttons[4].x = 200;
        this._buttons[4].y = 250;
    }
};
Window_ShopSellNumberInput.prototype.update = function () {
    Window_Selectable.prototype.update.call(this);
    this.processNumberChange();
};
Window_ShopSellNumberInput.prototype.playOkSound = function () {
    //
};
Window_ShopSellNumberInput.prototype.processNumberChange = function () {
    if (this.isOpenAndActive()) {
        if (Input.isRepeated("right")) {
            this.changeNumber(1);
        }
        if (Input.isRepeated("left")) {
            this.changeNumber(-1);
        }
        if (Input.isRepeated("up")) {
            this.changeNumber(10);
        }
        if (Input.isRepeated("down")) {
            this.changeNumber(-10);
        }
        if (Input.isRepeated("ok")) {
            this.onButtonOk();
        }
    }
};
Window_ShopSellNumberInput.prototype.changeNumber = function (amount) {
    const lastNumber = this._number;
    this._number = (this._number + amount).clamp(1, this._max);
    if (this._number !== lastNumber) {
        this.playCursorSound();
        this.refresh();
    }
};
Window_ShopSellNumberInput.prototype.itemRect = function () {
    const rect = new Rectangle();
    rect.x = this.cursorX();
    rect.y = this.itemNameY();
    rect.width = this.cursorWidth();
    rect.height = this.lineHeight();
    return rect;
};
Window_ShopSellNumberInput.prototype.isTouchOkEnabled = function () {
    return false;
};

Window_ShopSellNumberInput.prototype.onButtonUp = function () {
    this.changeNumber(1);
};

Window_ShopSellNumberInput.prototype.onButtonUp2 = function () {
    this.changeNumber(10);
};

Window_ShopSellNumberInput.prototype.onButtonDown = function () {
    this.changeNumber(-1);
};

Window_ShopSellNumberInput.prototype.onButtonDown2 = function () {
    this.changeNumber(-10);
};

Window_ShopSellNumberInput.prototype.onButtonOk = function () {
    this.processOk();
};
Window_ShopSellNumberInput.prototype.processOk = function () {
    if (this._item) {
        var item = this._item;
    }
    else {
        const index = FlyCat.ShopCore._sellItemListWindow.index();
        var item = FlyCat.ShopCore._sellItemListWindow._list[index];
    }
    if (!item) {
        SoundManager.playBuzzer();
    } else {
        const number = this._number;
        if (number > this._max) {
            this._item = null;
            SoundManager.playBuzzer();
        } else {
            const meta = item.meta.卖出材料.split(',');
            const itemId = Number(meta[0]);
            const newItem = $dataItems[itemId];
            const itemNumber = Number(meta[1]) * number;
            $gameParty.gainItem(item, -number);
            $gameParty.gainItem(newItem, itemNumber);
            SoundManager.playShop();
            this._item = null;
        }
    }
    this.refresh();
    this.deactivate()
    FlyCat.ShopCore._sellItemListWindow.activate();
    FlyCat.ShopCore._sellItemListWindow.refresh();
    const index = FlyCat.ShopCore._sellItemListWindow.index();
    const list = FlyCat.ShopCore._sellItemListWindow._list;
    const items = list[index];
    if (!items) {
        if (list.length > 0) {
            FlyCat.ShopCore._sellItemListWindow.select(0);
        } else {
            FlyCat.ShopCore._sellItemListWindow.deselect();
        }
    }
    SceneManager._scene._lastSellItem = null;
};