//=============================================================================
// RPG Maker MZ - 多货币商店
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<多货币商店>
 * @author FlyCat
 * 
 * @param goldIcon
 * @text 金钱IconId
 * @type string
 * @default 314
 * 
 * @command openShop
 * @text 打开商店
 * @desc 打开商店
 *
 * @arg Id
 * @type number
 * @default
 * @text 商店编号
 * @desc 商店编号
 *
 * @command setItems
 * @text 设置商店内物品
 * @desc 设置商店内物品
 *
 * @arg Id
 * @type number
 * @default
 * @text 商店编号
 * @desc 商店编号
 *
 * @arg type
 * @text 是否使用金钱
 * @type boolean
 * @on 是
 * @off 不是
 * @default false
 *
 * @arg useItem
 * @type item
 * @default 
 * @text 该商店消耗的道具
 * @desc 该商店消耗的道具
 *
 * @arg item
 * @type struct<selectItem>[]
 * @default
 * @text 选择道具
 * @desc 选择道具

 * @arg weapon
 * @type struct<selectWeapon>[]
 * @default
 * @text 选择武器
 * @desc 选择武器
 *
 * @arg armor
 * @type struct<selectArmor>[]
 * @default
 * @text 选择武护具
 * @desc 选择武护具
 * 
 * @arg shopNote
 * @type note
 * @default
 * @text 商店简介
 * @desc 商店简介
 *
 * @help
 * 2021.3.30 修复不写简介报错问题
 * ==============================使用说明==================================
 * 插件设置商店商品即可
 * =======================================================================
 */
/*~struct~selectItem:
@param itemId
@text 选择道具
@type item

@param number
@text 消耗货币数量
@type number
*/
/*~struct~selectWeapon:
@param itemId
@text 选择武器
@type weapon

@param number
@text 消耗货币数量
@type number
*/
/*~struct~selectArmor:
@param itemId
@text 选择武器
@type armor

@param number
@text 消耗货币数量
@type number
*/
'use strict';
var Imported = Imported || {};
Imported.FlyCat_ItemGoldShop = true;

var FlyCat = FlyCat || {};
FlyCat.ItemGoldShop = {};
FlyCat.ItemGoldShop.parameters = PluginManager.parameters('FlyCat_ItemGoldShop');
FlyCat.ItemGoldShop.goldIcon = Number(FlyCat.ItemGoldShop.parameters['goldIcon'] || 314);

PluginManager.registerCommand('FlyCat_ItemGoldShop', 'openShop', args => {
    $gameTemp._ItemGoldShopId = args.Id;
    SceneManager.push(Scene_ItemGoldShop);
});

PluginManager.registerCommand('FlyCat_ItemGoldShop', 'setItems', args => {
    const Id = args.Id;
    if (!$gameSystem._ItemShop) $gameSystem._ItemShop = [];
    if (!$gameSystem._ItemShop[Id]) $gameSystem._ItemShop[Id] = {};
    const item = args.item ? $gameTemp.jsonParseDataShop(JSON.parse(args.item)) : [];
    const weapon = args.weapon ? $gameTemp.jsonParseDataShop(JSON.parse(args.weapon)) : [];
    const armor = args.armor ? $gameTemp.jsonParseDataShop(JSON.parse(args.armor)) : [];
    const useItem = $dataItems[Number(args.useItem)];
    const shopNote = args.shopNote;
    const type = eval(args.type);
    $gameSystem._ItemShop[Id] = { useItem: useItem, itemList: item, armorList: armor, weaponList: weapon, shopNote: shopNote, type: type }
});
Game_Temp.prototype.jsonParseDataShop = function (item) {
    for (let i = 0; i < item.length; i++) {
        item[i] = JSON.parse(item[i])
        item[i].itemId = Number(item[i].itemId)
        item[i].number = Number(item[i].number)
    }
    return item;
};

function Scene_ItemGoldShop() {
    this.initialize(...arguments);
}

Scene_ItemGoldShop.prototype = Object.create(Scene_MenuBase.prototype);
Scene_ItemGoldShop.prototype.constructor = Scene_ItemGoldShop;

Scene_ItemGoldShop.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
    FlyCat.ItemGoldShop._SceneItemGoldShop = this;
    this._shopId = $gameTemp._ItemGoldShopId;
};
Scene_ItemGoldShop.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createItemGoldShopWindow();
    this.createItemGoldShopInfoWindow();
    this.createItemGoldShopCommandWindow()
    this.createNumberInputWindow();
};
Scene_ItemGoldShop.prototype.createNumberInputWindow = function () {
    const rect = this.newNumberInputRect();
    this._shopNumberInputWindow = new Window_ShopNumberInput(rect);
    this._shopNumberInputWindow.setHandler("cancel", this.closeShopNumberInputWindow.bind(this));
    this.addChild(this._shopNumberInputWindow);
    this._shopNumberInputWindow.deactivate();
    this._shopNumberInputWindow.hide();
};
Scene_ItemGoldShop.prototype.closeShopNumberInputWindow = function () {
    this._shopNumberInputWindow.deactivate();
    this._shopNumberInputWindow.hide();
    this._shopItemListWindow.activate();
};
Scene_ItemGoldShop.prototype.newNumberInputRect = function () {
    const ww = 320;
    const wh = 260;
    const wx = Graphics.width / 2 - ww / 2;
    const wy = Graphics.height / 2 - wh / 2;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_ItemGoldShop.prototype.createItemGoldShopCommandWindow = function () {
    const rect = this.itemGoldShopCommandWindowRect();
    this._shopItemCommandWindow = new Window_ShopItemCommand(rect);
    this._shopItemCommandWindow.setHandler("buy", this.okCommand.bind(this));
    this._shopItemCommandWindow.setHandler("noBuy", this.cancelCommand.bind(this));
    this._shopItemCommandWindow.setHandler("cancel", this.cancelCommand.bind(this));
    this.addChild(this._shopItemCommandWindow);
    this._shopItemCommandWindow.hide();
};
Scene_ItemGoldShop.prototype.itemGoldShopCommandWindowRect = function () {
    const ww = 200;
    const wh = 200;
    const wx = Graphics.width / 2 - ww / 2;
    const wy = Graphics.height / 2 - wh / 2;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_ItemGoldShop.prototype.createItemGoldShopWindow = function () {
    const rect = this.itemGoldShopWindowRect();
    this._shopItemListWindow = new Window_ShopItemList(rect);
    this._shopItemListWindow.setHandler("ok", this.onItem.bind(this));
    this._shopItemListWindow.setHandler("cancel", this.popScene.bind(this));
    this.addChild(this._shopItemListWindow);
};
Scene_ItemGoldShop.prototype.itemGoldShopWindowRect = function () {
    const ww = Graphics.width;
    const wh = Graphics.height * 0.6;
    const wx = 0;
    const wy = this.mainAreaTop() * 3;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_ItemGoldShop.prototype.createItemGoldShopInfoWindow = function () {
    const rect = this.itemGoldShopInfoWindowRect();
    this._shopItemInfoWindow = new Window_ShopItemInfo(rect);
    this.addChild(this._shopItemInfoWindow);
    const rects = this.goldInfoWindowRect();
    this._goldInfoWindow = new Window_GoldInfo(rects);
    this.addChild(this._goldInfoWindow);
    const rectss = this.itemInfoWindowRect();
    this._itemInfoWindow = new Window_ItemInfo(rectss);
    this.addChild(this._itemInfoWindow);
};
Scene_ItemGoldShop.prototype.itemGoldShopInfoWindowRect = function () {
    const ww = Graphics.width * 0.7;
    const wh = this.mainAreaTop() * 2;
    const wx = 0;
    const wy = this.mainAreaTop();
    return new Rectangle(wx, wy, ww, wh);
};
Scene_ItemGoldShop.prototype.goldInfoWindowRect = function () {
    const ww = Graphics.width * 0.3;
    const wh = this.mainAreaTop() * 2;
    const wx = Graphics.width * 0.7;
    const wy = this.mainAreaTop();
    return new Rectangle(wx, wy, ww, wh);
};
Scene_ItemGoldShop.prototype.itemInfoWindowRect = function () {
    const ww = Graphics.width;
    const wh = this.mainAreaTop() * 3 - 24;
    const wx = 0;
    const wy = Graphics.height - wh;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_ItemGoldShop.prototype.okCommand = function () {
    const data = $gameSystem._ItemShop[this._shopId];
    const item = this._shopItemListWindow.item();
    if (item) {
        this._shopNumberInputWindow.activate();
        this._shopCommandWindow.deactivate();
        this._shopNumberInputWindow.setup(item, Number(this._syListWindow._list[index].storyValue), Number(this._syListWindow._list[index].destinyValue));
        this._shopNumberInputWindow.show();
    }
    // var itemGold = this._shopItemListWindow.itemGold();
    // if ($gameSystem._ItemShop[this._shopId].type) {
    //     $gameParty.loseGold(itemGold);
    // } else {
    //     $gameParty.loseItem(data.useItem, itemGold);
    // }
    // $gameParty.gainItem(item, 1);
    // this._shopItemListWindow.activate();
    // this._shopItemListWindow.refresh();
    // this._shopItemCommandWindow.hide();
    // this._shopItemCommandWindow.deactivate();
    // SoundManager.playShop();
}
Scene_ItemGoldShop.prototype.cancelCommand = function () {
    this._shopItemCommandWindow.hide();
    this._shopItemCommandWindow.deactivate();
    this._shopItemListWindow.activate();
}
Scene_ItemGoldShop.prototype.onItem = function () {
    const data = $gameSystem._ItemShop[this._shopId];
    if ($gameSystem._ItemShop[this._shopId].type) {
        var useItemNumber = $gameParty.gold();
        var type = 0;
    } else {
        var useItemNumber = $gameParty.numItems(data.useItem);
        var type = 1;
    }
    var itemGold = this._shopItemListWindow.itemGold();
    //  if (itemGold >= 1 && useItemNumber >= itemGold) {
    this._shopItemListWindow.deactivate();
    const item = this._shopItemListWindow.item();
    this._shopNumberInputWindow.activate();
    this._shopNumberInputWindow.setup(item, itemGold, type, data.useItem);
    this._shopNumberInputWindow.show();
    // this._shopItemCommandWindow.show();
    // this._shopItemCommandWindow.activate();
    // } else {
    //     SoundManager.playBuzzer();
    //     this._shopItemListWindow.activate();
    // }
};
Scene_ItemGoldShop.prototype.update = function () {
    Scene_MenuBase.prototype.update.call(this);
    if (this._shopId && this._shopId >= 0) {
        if (this._goldInfoWindow) this._goldInfoWindow.refresh();
        if (this._itemInfoWindow && this._shopItemListWindow) {
            const index = this._shopItemListWindow.index();
            const item = this._shopItemListWindow._list[index];
            if (item) {
                this._itemInfoWindow.refresh(item);
            } else {
                this._itemInfoWindow.createContents();
            }
        }
    }
}
//////////////////////////////
function Window_ShopItemCommand() {
    this.initialize(...arguments);
};

Window_ShopItemCommand.prototype = Object.create(Window_Command.prototype);
Window_ShopItemCommand.prototype.constructor = Window_ShopItemCommand;

Window_ShopItemCommand.prototype.initialize = function (rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.select(0);
}
Window_ShopItemCommand.prototype.makeCommandList = function () {
    this.contents.fontSize = 20;
    this.addCommand('确定兑换', 'buy', true);
    this.addCommand('取消', 'noBuy', true);

};
Window_ShopItemCommand.prototype.maxItems = function () {
    return 2;
};
Window_ShopItemCommand.prototype.rowSpacing = function () {
    return 10;
};
Window_ShopItemCommand.prototype.numVisibleRows = function () {
    return 2;
};
Window_ShopItemCommand.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
Window_ShopItemCommand.prototype.maxCols = function () {
    return 1;
};
///////////////////////////////
function Window_ShopItemInfo() {
    this.initialize(...arguments);
}
Window_ShopItemInfo.prototype = Object.create(Window_Base.prototype);
Window_ShopItemInfo.prototype.constructor = Window_ShopItemInfo;

Window_ShopItemInfo.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._shopId = $gameTemp._ItemGoldShopId;
    this.refresh()
};
Window_ShopItemInfo.prototype.refresh = function () {
    const data = $gameSystem._ItemShop[this._shopId];
    this.createContents();
    const shopNote = eval(data.shopNote) || '';
    this.drawTextEx(shopNote, 0, 0, this.width, 'left');
};
Window_ShopItemInfo.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = 26;
    this.resetTextColor();
};

function Window_ItemInfo() {
    this.initialize(...arguments);
}
Window_ItemInfo.prototype = Object.create(Window_Base.prototype);
Window_ItemInfo.prototype.constructor = Window_ItemInfo;

Window_ItemInfo.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
};
Window_ItemInfo.prototype.refresh = function (item) {
    this.createContents();
    this.contents.fontSize = 24;
    const name = item.name;
    const number = $gameParty.numItems(item);
    const description = item.description;
    this.drawTextEx('\\I[' + item.iconIndex + ']' + name + '(携带数量：' + number + ')', 0, 5, this.width, 'left')
    this.contents.fontSize = 22;
    this.drawTextEx(description, 0, 40, this.width, 'left');
};
Window_ItemInfo.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.resetTextColor();
};

function Window_GoldInfo() {
    this.initialize(...arguments);
}
Window_GoldInfo.prototype = Object.create(Window_Base.prototype);
Window_GoldInfo.prototype.constructor = Window_GoldInfo;

Window_GoldInfo.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._shopId = $gameTemp._ItemGoldShopId;
};
Window_GoldInfo.prototype.refresh = function () {
    const data = $gameSystem._ItemShop[this._shopId];
    const type = $gameSystem._ItemShop[this._shopId].type;
    const useItems = data.useItem;
    this.createContents();
    this.contents.fontSize = 22;
    if (type) {
        const text_1 = '当前商店使用货币为：' + '\\I[' + FlyCat.ItemGoldShop.goldIcon + ']' + TextManager.currencyUnit;
        this.drawTextEx(text_1, 0, 0, this.width, 'left');
        this.drawTextEx(' 当前拥有货币数量：' + $gameParty.gold(), 0, 40, this.width);
    } else {
        const text_1 = '当前商店使用货币为：';
        this.drawTextEx(text_1 + '\\I[' + useItems.iconIndex + ']' + useItems.name, 0, 0, this.width, 'left');
        this.drawTextEx(' 当前拥有货币数量：' + $gameParty.numItems(useItems), 0, 40, this.width);
    }
};
Window_GoldInfo.prototype.drawShopIcon = function (iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem("IconSet");
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    const scw = pw * 5;
    const sch = ph * 5;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, scw, sch);
};
Window_GoldInfo.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = 22;
    this.resetTextColor();
};
/////////////////////////////////
function Window_ShopItemList() {
    this.initialize(...arguments);
}
Window_ShopItemList.prototype = Object.create(Window_Selectable.prototype);
Window_ShopItemList.prototype.constructor = Window_ShopItemList;

Window_ShopItemList.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._shopId = $gameTemp._ItemGoldShopId;
    this.activate();
    this.refresh();
    this.select(0);
};
Window_ShopItemList.prototype.refresh = function () {
    this._list = [];
    this._listNubmer = [];
    this.makeItemList();
    this.createContents();
    if (this._list.length > 0) {
        this.drawAllItems();
    }
    else {
        this.deselect();
        this.drawText('-没有物品-', 0, this.height / 2 - $gameSystem.mainFontSize(), this.width - $gameSystem.mainFontSize(), 'center');
    }
}
Window_ShopItemList.prototype.makeItemList = function () {
    const data = $gameSystem._ItemShop[this._shopId];
    const dataItem = data.itemList;
    const dataWeapon = data.weaponList;
    const dataArmor = data.armorList;
    if (dataItem) {
        for (var i = 0; i < dataItem.length; i++) {
            const item = $dataItems[dataItem[i].itemId];
            const itemNumber = dataItem[i].number;
            this._list.push(item);
            this._listNubmer.push(itemNumber);
        }
    }
    if (dataWeapon) {
        for (var i = 0; i < dataWeapon.length; i++) {
            const item = $dataWeapons[dataWeapon[i].itemId];
            const itemNumber = dataWeapon[i].number;
            this._list.push(item);
            this._listNubmer.push(itemNumber);
        }
    }
    if (dataArmor) {
        for (var i = 0; i < dataArmor.length; i++) {
            const item = $dataArmors[dataArmor[i].itemId];
            const itemNumber = dataArmor[i].number;
            this._list.push(item);
            this._listNubmer.push(itemNumber);
        }
    }
}
Window_ShopItemList.prototype.drawItem = function (index) {
    if ($gameSystem._ItemShop[this._shopId].type) {
        var useItemNumber = $gameParty.gold();
        var useItems = null;
    } else {
        var useItems = $gameSystem._ItemShop[this._shopId].useItem;
        var useItemNumber = $gameParty.numItems(useItems);
    }
    const rect = this.itemLineRect(index);
    const item = this._list[index];
    const itemColor = 0;
    const itemNumber = this._listNubmer[index]
    if (useItemNumber < itemNumber) {
        this.changeTextColor(ColorManager.textColor(8))
    }
    else if (Imported.FlyCat_CoreEngine) {
        this.changeTextColor(ColorManager.textColor(item.color))
    }
    else {
        this.changeTextColor(ColorManager.textColor(itemColor));
    }
    if (item) {
        this.drawIcon(item.iconIndex, rect.x, rect.y - 6);
        this.contents.fontSize = 22;
        this.drawText(item.name, rect.x + 36, rect.y - 10, this.width / this.maxCols(), 'left');
        this.contents.fontSize = 18;
        this.resetTextColor();
        if (useItemNumber < itemNumber) {
            this.changeTextColor(ColorManager.textColor(8))
        }
        if (useItems) {
            this.drawShopIcon(useItems.iconIndex, rect.x + this.itemWidth() - 48, rect.y + 16, itemNumber);
        } else {
            this.drawShopIcon(FlyCat.ItemGoldShop.goldIcon, rect.x + this.itemWidth() - 48, rect.y + 16, itemNumber);
        }
        this.resetFontSettings();
    }
    this.resetTextColor();
};

Window_ShopItemList.prototype.drawShopIcon = function (iconIndex, x, y, itemNumber) {
    const bitmap = ImageManager.loadSystem("IconSet");
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    const scw = pw * 0.8;
    const sch = ph * 0.8;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, scw, sch);
    this.drawText(itemNumber, x - 62, y - 3, 100, 'center');
};

Window_ShopItemList.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_ShopItemList.prototype.maxCols = function () {
    return 3;
};
Window_ShopItemList.prototype.itemWidth = function () {
    return Math.floor(this.innerWidth / this.maxCols());
};
Window_ShopItemList.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
Window_ShopItemList.prototype.numVisibleRows = function () {
    return 6;
};
FlyCat.ItemGoldShop.Window_ShopItemList_select = Window_ShopItemList.prototype.select;
Window_ShopItemList.prototype.select = function (index) {///小窗口
    FlyCat.ItemGoldShop.Window_ShopItemList_select.call(this, index)
    if (index >= 0 && Imported.MiniInformationWindow) {
        this.setMiniWindow(this.item());
    }

};
Window_ShopItemList.prototype.item = function () {
    return this.itemAt(this.index());
};

Window_ShopItemList.prototype.itemAt = function (index) {
    return this._list && index >= 0 ? this._list[index] : null;
};
Window_ShopItemList.prototype.itemGold = function () {
    return this.itemAtGold(this.index());
};

Window_ShopItemList.prototype.itemAtGold = function (index) {
    return this._listNubmer && index >= 0 ? this._listNubmer[index] : null;
};
Window_ShopItemList.prototype.drawIcon = function (iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem("IconSet");
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
};

function Window_ShopNumberInput() {
    this.initialize(...arguments);
}

Window_ShopNumberInput.prototype = Object.create(Window_Selectable.prototype);
Window_ShopNumberInput.prototype.constructor = Window_ShopNumberInput;

Window_ShopNumberInput.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.opacity = 255;
    this._item = null;
    this._sell = false;
    this._max = 99;
    this._number = 1;
    this.createButtons();
    this.refresh();
    this.select(0);
};
Window_ShopNumberInput.prototype.updateBackOpacity = function () {
    this.backOpacity = 255;
};
Window_ShopNumberInput.prototype.setup = function (item, value, value1, useItem) {
    this._max = 99;
    this._item = item;
    this._number = 1;
    this._itemGold = value;
    this._goldType = value1;
    this._sell = false;
    this._useItem = useItem;
    this.refresh();
};
Window_ShopNumberInput.prototype.setItem = function (item) {
    this._item = item;
    this._number = 1;
    this._max = $gameParty.numItems(item);
    this._sell = true;
    this.refresh();
};
Window_ShopNumberInput.prototype.refresh = function () {
    Window_Selectable.prototype.refresh.call(this);
    this.contents.fontSize = 20;
    this.drawItemBackground(0);
    this.drawGoldItem();
    this.drawCurrentItemName();
    this.drawNumber();
};
Window_ShopNumberInput.prototype.drawGoldItem = function () {
    const padding = this.itemPadding();
    const x = padding * 2;
    const y = this.itemNameY() - 80;
    const width = this.width - 25;
    if (this._item) {
        this.contents.fontSize = 22;
        const number = this._number;
        if (this._goldType == 0) {
            var gold = $gameParty.gold();
            var price = this._item.price * number;
            // this.drawTextEx('当前携带\\[' + FlyCat.ItemGoldShop.goldIcon + ']银两:  ' + gold, 0, 0, this.width, 'left');
            this.drawTextEx('所需' + '\\I[' + FlyCat.ItemGoldShop.goldIcon + ']银两:  ' + price, 0, 40, this.width, 'left')
        } else {
            var price = this._itemGold * number;
            var useItemNumber = $gameParty.numItems(this._useItem);
            //   this.drawTextEx('当前携带' + this._useItem.name + '数量:' + useItemNumber, 0, 0, this.width, 'left');
            this.drawTextEx('所需' + '\\I[' + this._useItem.iconIndex + ']' + this._useItem.name + ':  ' + price, 0, 40, this.width, 'left')
        }

        this.drawItemName()
    };
    this.contents.fontSize = 22;
};
Window_ShopNumberInput.prototype.drawCurrentItemName = function () {
    const padding = this.itemPadding();
    const x = padding * 2;
    const y = this.itemNameY() + 42;
    const width = this.multiplicationSignX() - padding * 3;
    if (this._item) this.drawItemName(this._item, x - 16, y, width);
};
Window_ShopNumberInput.prototype.drawItemName = function (item, x, y, width) {
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
Window_ShopNumberInput.prototype.multiplicationSignX = function () {
    const sign = this.multiplicationSign();
    const width = this.textWidth(sign);
    return this.cursorX() - width * 2;
};
Window_ShopNumberInput.prototype.multiplicationSign = function () {
    return "\u00d7";
};
Window_ShopNumberInput.prototype.itemNameY = function () {
    return Math.floor(this.innerHeight / 2 - this.lineHeight() * 1.5);
};
Window_ShopNumberInput.prototype.cursorX = function () {
    const padding = this.itemPadding();
    return this.innerWidth - this.cursorWidth() - padding * 2;
};
Window_ShopNumberInput.prototype.maxDigits = function () {
    return 2;
};
Window_ShopNumberInput.prototype.cursorWidth = function () {
    const padding = this.itemPadding();
    const digitWidth = this.textWidth("0");
    return this.maxDigits() * digitWidth + padding * 2;
};
Window_ShopNumberInput.prototype.drawNumber = function () {
    const x = this.cursorX();
    const y = this.itemNameY();
    const width = this.cursorWidth() - this.itemPadding();
    this.resetTextColor();
    this.drawText('数量', -100, y + 42, this.width, "right");
    this.drawText(this._number, x, y + 42, width, "right");
};
Window_ShopNumberInput.prototype.number = function () {
    return this._number;
};
Window_ShopNumberInput.prototype.createButtons = function () {
    this._buttons = [];
    if (ConfigManager.touchUI) {
        for (const type of ["down2", "down", "up", "up2", "ok"]) {
            const button = new Sprite_Button(type);
            this._buttons.push(button);
            this.addInnerChild(button);
        }
        this._buttons[0].setClickHandler(this.onButtonDown2.bind(this));
        this._buttons[0].x = 150;
        this._buttons[0].y = 160;
        this._buttons[1].setClickHandler(this.onButtonDown.bind(this));
        this._buttons[1].x = 50;
        this._buttons[1].y = 160;
        this._buttons[2].setClickHandler(this.onButtonUp.bind(this));
        this._buttons[2].y = 160;
        this._buttons[3].setClickHandler(this.onButtonUp2.bind(this));
        this._buttons[3].x = 100;
        this._buttons[3].y = 160;
        this._buttons[4].setClickHandler(this.onButtonOk.bind(this));
        this._buttons[4].x = 200;
        this._buttons[4].y = 160;
    }
};
Window_ShopNumberInput.prototype.update = function () {
    Window_Selectable.prototype.update.call(this);
    this.processNumberChange();
};
Window_ShopNumberInput.prototype.playOkSound = function () {
    //
};

Window_ShopNumberInput.prototype.processNumberChange = function () {
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
Window_ShopNumberInput.prototype.changeNumber = function (amount) {
    const lastNumber = this._number;
    this._number = (this._number + amount).clamp(1, this._max);
    if (this._number !== lastNumber) {
        this.playCursorSound();
        this.refresh();
    }
};
Window_ShopNumberInput.prototype.itemRect = function () {
    const rect = new Rectangle();
    rect.x = this.cursorX();
    rect.y = this.itemNameY() + 42;
    rect.width = this.cursorWidth();
    rect.height = this.lineHeight();
    return rect;
};
Window_ShopNumberInput.prototype.isTouchOkEnabled = function () {
    return false;
};

Window_ShopNumberInput.prototype.onButtonUp = function () {
    this.changeNumber(1);
};

Window_ShopNumberInput.prototype.onButtonUp2 = function () {
    this.changeNumber(99);
};

Window_ShopNumberInput.prototype.onButtonDown = function () {
    this.changeNumber(-1);
};

Window_ShopNumberInput.prototype.onButtonDown2 = function () {
    this.changeNumber(-999);
};

Window_ShopNumberInput.prototype.onButtonOk = function () {
    this.processOk();
};
Window_ShopNumberInput.prototype.processOk = function () {
    if (this._item) {
        var item = this._item;
    }
    if (!item) {
        SoundManager.playBuzzer();
    } else {
        var number = this._number;
        if (this._goldType == 0) {
            var price = item.price * number;
            var gold = $gameParty.gold();
            if (gold < price) {
                this._item = null;
                SoundManager.playBuzzer();
            } else {
                $gameParty.loseGold(price);
                $gameParty.gainItem(item, number);
                SoundManager.playShop();
            }
        } else {
            var price = this._itemGold * number;
            var useItemNumber = $gameParty.numItems(this._useItem);
            if (useItemNumber < price) {
                this._item = null;
                SoundManager.playBuzzer();
            } else {
                $gameParty.loseItem(this._useItem, price);
                $gameParty.gainItem(item, number);
                SoundManager.playShop();
            }
        }

    };
    this.refresh();
    this.deactivate();
    this.hide();
    SceneManager._scene._shopItemListWindow.activate();
    SceneManager._scene._shopItemListWindow.refresh();
};
