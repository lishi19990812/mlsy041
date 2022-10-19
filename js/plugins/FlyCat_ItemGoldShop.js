//=============================================================================
// RPG Maker MZ - 道具货币商店
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<道具货币商店>
 * @author FlyCat
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
 * ==============================使用说明==================================
 * 插件设置商店商品即可
 * 本插件适配1280*720分辨率，其他分辨率自行修改
 * =======================================================================
 * 本插件免费用于商业或非商业游戏
 * 禁止二次销售
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
    $gameSystem._ItemShop[Id] = { useItem: useItem, itemList: item, armorList: armor, weaponList: weapon, shopNote: shopNote }
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

Scene_ItemGoldShop.prototype = Object.create(Scene_Base.prototype);
Scene_ItemGoldShop.prototype.constructor = Scene_ItemGoldShop;

Scene_ItemGoldShop.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    FlyCat.ItemGoldShop._SceneItemGoldShop = this;
    this._shopId = $gameTemp._ItemGoldShopId;
};
Scene_ItemGoldShop.prototype.create = function () {
    this.createItemGoldShopWindow();
    Scene_Base.prototype.create.call(this);
    if (Imported.MiniInformationWindow) {
        this.createMiniWindow();
        if (this._shopItemListWindow) this._shopItemListWindow._miniInfoWindow = this._miniWindow;
        DrillUp.is_in_window = 8;
        this._shopItemListWindow.select(0);
    }
    this.createItemGoldShopInfoWindow();
    this.createItemGoldShopCommandWindow()
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
    const ww = Graphics.width * 0.7;
    const wh = Graphics.height;
    const wx = 0;
    const wy = 0;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_ItemGoldShop.prototype.createItemGoldShopInfoWindow = function () {
    const rect = this.itemGoldShopInfoWindowRect();
    this._shopItemInfoWindow = new Window_ShopItemInfo(rect);
    this.addChild(this._shopItemInfoWindow);
};
Scene_ItemGoldShop.prototype.itemGoldShopInfoWindowRect = function () {
    const ww = Graphics.width * 0.3;
    const wh = Graphics.height;
    const wx = Graphics.width * 0.7;
    const wy = 0;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_ItemGoldShop.prototype.okCommand = function () {
    const data = $gameSystem._ItemShop[this._shopId];
    const item = this._shopItemListWindow.item();
    const itemGold = this._shopItemListWindow.itemGold();
    $gameParty.loseItem(data.useItem, itemGold);
    $gameParty.gainItem(item, 1);
    this._shopItemListWindow.activate();
    this._shopItemListWindow.refresh();
    this._shopItemInfoWindow.refresh();
    this._shopItemCommandWindow.hide();
    this._shopItemCommandWindow.deactivate();
    SoundManager.playShop();
}
Scene_ItemGoldShop.prototype.cancelCommand = function () {
    this._shopItemCommandWindow.hide();
    this._shopItemCommandWindow.deactivate();
    this._shopItemListWindow.activate();
    this._shopItemInfoWindow.refresh();
}
Scene_ItemGoldShop.prototype.onItem = function () {
    const data = $gameSystem._ItemShop[this._shopId];
    const useItemNumber = $gameParty.numItems(data.useItem);
    const itemGold = this._shopItemListWindow.itemGold();
    if (itemGold >= 1 && useItemNumber >= itemGold) {
        this._shopItemListWindow.deactivate();
        this._shopItemCommandWindow.show();
        this._shopItemCommandWindow.activate();
    } else {
        SoundManager.playBuzzer();
        this._shopItemListWindow.activate();
    }

};
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
    this.addCommand('确定', 'buy', true);
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
    const useItems = data.useItem;
    const text = '奇怪的商店';
    this.createContents();
    this.contents.fontSize = 28;
    this.drawText(text, 0, 20, this.width - $gameSystem.mainFontSize(), 'center');
    const shopNote = eval(data.shopNote);
    this.drawTextEx(shopNote, 0, 80, this.width, 'left');
    this.drawShopIcon(useItems.iconIndex, this.width / 2 - 96, 200)
    this.resetTextColor();
    this.contents.fontSize = 20;
    const text_1 = '本商店使用的兑换物品为：' + useItems.name;
    this.drawText(text_1, 0, 400, this.width, 'left');
    const text_2 = '你当前所拥有的' + useItems.name + '数量：' + $gameParty.numItems(useItems);
    this.drawText(text_2, 0, 450, this.width, 'left');
    this.contents.fontSize = $gameSystem.mainFontSize();
};
Window_ShopItemInfo.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = 18;
    this.resetTextColor();
};
Window_ShopItemInfo.prototype.drawShopIcon = function (iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem("IconSet");
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    const scw = pw * 5;
    const sch = ph * 5;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, scw, sch);
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
    const useItems = $gameSystem._ItemShop[this._shopId].useItem;
    const useItemNumber = $gameParty.numItems(useItems);
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
        this.drawIcon(item.iconIndex, rect.x, rect.y - 10);
        this.contents.fontSize = 22;
        this.drawText(item.name, rect.x + 36, rect.y - 10, this.width / this.maxCols(), 'left');
        this.contents.fontSize = 18;
        this.drawShopIcon(useItems.iconIndex, rect.x + this.itemWidth() - 48, rect.y + 18);
        this.resetTextColor();
        if (useItemNumber < itemNumber) {
            this.changeTextColor(ColorManager.textColor(8))
        }
        this.drawText('售价：' + itemNumber, rect.x - 20, rect.y + 15, this.itemWidth() - $gameSystem.mainFontSize(), 'right');
        this.resetFontSettings();
    }
    this.resetTextColor();
};

Window_ShopItemList.prototype.drawShopIcon = function (iconIndex, x, y) {
    const bitmap = ImageManager.loadSystem("IconSet");
    const pw = ImageManager.iconWidth;
    const ph = ImageManager.iconHeight;
    const sx = (iconIndex % 16) * pw;
    const sy = Math.floor(iconIndex / 16) * ph;
    const scw = pw * 0.8;
    const sch = ph * 0.8;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, scw, sch);
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
    return 10;
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