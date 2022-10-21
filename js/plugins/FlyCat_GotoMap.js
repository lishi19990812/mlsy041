//=============================================================================
// RPG Maker MZ - 大地图传送
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<大地图传送>
 * @author FlyCat
 * 
 * @param back
 * @text 背景图片
 * @desc 选择背景图片
 * @default
 * @require 1
 * @dir img/map/
 * @type file
 * 
 * @param mapData
 * @text 大地图设置
 * @type struct<mapData>[]
 * @default
 * 
 * @command openBigMap
 * @text 打开大地图
 * @desc 打开大地图
 * 
 * @command addMap
 * @text 解锁大地图
 * @desc 解锁大地图
 * 
 * @arg id
 * @type number
 * @default
 * @text 地图Id
 * @desc 插件库里的Id
 * 
 * @help
 * 图片放在img/map/下
 */
/*~struct~mapData:
@param name
@text 地图名称
@type string

@param id
@text 地图Id
@type number

@param x
@text 进入地图x
@type number

@param y
@text 进入地图y
@type number

@param text
@text 地图介绍
@type note

@param mapName
@text 地图图片
@desc 地图图片
@default
@require 1
@dir img/map/
@type file
*/
var Imported = Imported || {};
Imported.FlyCat_GotoMap = true;

var FlyCat = FlyCat || {};
FlyCat.GotoMap = {};
FlyCat.GotoMap.parameters = PluginManager.parameters('FlyCat_GotoMap');
FlyCat.GotoMap.backGround = String(FlyCat.GotoMap.parameters['back']);
FlyCat.GotoMap.mapData = JSON.parse(FlyCat.GotoMap.parameters['mapData'] || '[]');

PluginManager.registerCommand('FlyCat_GotoMap', 'openBigMap', args => {
    SceneManager.push(Scene_BigMap)
});
PluginManager.registerCommand('FlyCat_GotoMap', 'addMap', args => {
    if (!$gameSystem._bigMapData) {
        $gameSystem._bigMapData = [];
    }
    const id = Number(args.id) - 1;
    $gameSystem._bigMapData.push(FlyCat.GotoMap.mapData[id]);
});

if (FlyCat.GotoMap.mapData) {
    const max = FlyCat.GotoMap.mapData.length;
    for (let i = 0; i < max; i++) {
        FlyCat.GotoMap.mapData[i] = JSON.parse(FlyCat.GotoMap.mapData[i]);
        FlyCat.GotoMap.mapData[i].text = JSON.parse(FlyCat.GotoMap.mapData[i].text);
        FlyCat.GotoMap.mapData[i].id = JSON.parse(FlyCat.GotoMap.mapData[i].id);
        FlyCat.GotoMap.mapData[i].x = JSON.parse(FlyCat.GotoMap.mapData[i].x);
        FlyCat.GotoMap.mapData[i].y = JSON.parse(FlyCat.GotoMap.mapData[i].y);
    }
    //  console.log(FlyCat.GotoMap.mapData)
};

Game_Interpreter.prototype.GotoMap = function (mapId, x, y, destination, fadeType) {
    if ($gameParty.inBattle() || $gameMessage.isBusy()) {
        return false;
    }
    $gamePlayer.reserveTransfer(mapId, x, y, destination, fadeType);
    this.setWaitMode("transfer");
    return true;
};

function Scene_BigMap() {
    this.initialize(...arguments);
}

Scene_BigMap.prototype = Object.create(Scene_MenuBase.prototype);
Scene_BigMap.prototype.constructor = Scene_BigMap;

Scene_BigMap.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    if (!$gameSystem._bigMapData) {
        $gameSystem._bigMapData = [];
    }
};
Scene_BigMap.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadBitmap('img/map/', FlyCat.GotoMap.backGround);
    this.addChild(this._backgroundSprite);
};

Scene_BigMap.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createMapInfoWindow();
    this.createMapCommandWindow();
    this.createMapListWindow();
};
Scene_BigMap.prototype.createMapCommandWindow = function () {
    const rect = this.commandWindowRect();
    this._commandWindow = new Window_MapCommand(rect);
    this._commandWindow.setHandler("qd", this.onCommandOk.bind(this));
    this._commandWindow.setHandler("qx", this.cancelCommand.bind(this));
    this._commandWindow.setHandler("cancel", this.cancelCommand.bind(this));
    this.addChild(this._commandWindow);
    this._commandWindow.hide();
};
Scene_BigMap.prototype.onCommandOk = function () {
    const index = this._mapListWindow.index();
    const map = this._mapListWindow._list[index];
    const id = map.id;
    const x = map.x;
    const y = map.y;
    Game_Interpreter.prototype.GotoMap(id, x, y, 0, 0);
    SceneManager.goto(Scene_Map)
};
Scene_BigMap.prototype.cancelCommand = function () {
    this._commandWindow.deactivate();
    this._commandWindow.hide();
    this._mapListWindow.activate();
};
Scene_BigMap.prototype.commandWindowRect = function () {
    const ww = 300;
    const wh = 140;
    const wx = Graphics.width / 2 - ww / 2;
    const wy = Graphics.height / 2 - wh / 2;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_BigMap.prototype.createMapInfoWindow = function () {
    const rect = this.mapInfoWindowRect();
    this._mapInfoWindow = new Window_MapInfo(rect);
    this.addChild(this._mapInfoWindow);
};
Scene_BigMap.prototype.mapInfoWindowRect = function () {
    const wx = 660;
    const wy = 20;
    const ww = 580;
    const wh = 670;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_BigMap.prototype.createMapListWindow = function () {
    const rect = this.mapListWindowRect();
    this._mapListWindow = new Window_MapList(rect);
    this._mapListWindow.setHandler('ok', this.onCommand.bind(this));
    this._mapListWindow.setHandler('cancel', this.popScene.bind(this));
    this.addChild(this._mapListWindow);
    this._mapListWindow.activate();
    if (this._mapListWindow._list.length > 0) {
        this._mapListWindow.select(0);
    }
};
Scene_BigMap.prototype.mapListWindowRect = function () {
    const wx = 50;
    const wy = 80;
    const ww = 580
    const wh = 580;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_BigMap.prototype.onCommand = function () {
    const index = this._mapListWindow.index();
    const map = this._mapListWindow._list[index];
    if (!map) {
        SoundManager.playBuzzer();
        this._mapListWindow.activate();
        return;
    };
    this._mapListWindow.deactivate();
    this._commandWindow.activate();
    this._commandWindow.show();
};
Scene_BigMap.prototype.update = function () {
    Scene_MenuBase.prototype.update.call(this);
    if (this._mapListWindow && this._mapInfoWindow) {
        const index = this._mapListWindow.index();
        const map = this._mapListWindow._list[index];
        if (map) {
            this._mapInfoWindow.refresh(map);
        } else {
            this._mapInfoWindow._mapSprite.bitmap = '';
            this._mapInfoWindow.createContents();
        }
    }
};

function Window_MapInfo() {
    this.initialize(...arguments);
};

Window_MapInfo.prototype = Object.create(Window_Selectable.prototype);
Window_MapInfo.prototype.constructor = Window_MapInfo;

Window_MapInfo.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.opacity = 0;
    this._mapSprite = new Sprite();
    this.addChild(this._mapSprite);
};
Window_MapInfo.prototype.scaleSprite = function (sprite) {
    const ratioX = 530 / sprite.bitmap.width;
    const ratioY = 400 / sprite.bitmap.height;
    sprite.scale.x = ratioX;
    sprite.scale.y = ratioY;
};
Window_MapInfo.prototype.centerSprite = function (sprite) {
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.x = 290;
    sprite.y = 240;
};
Window_MapInfo.prototype.refresh = function (map) {
    this.createContents();
    this._bitmap = ImageManager.loadBitmap('img/map/', map.mapName);
    this._bitmap.addLoadListener(this.onBitmapLoad.bind(this));
    const text = map.text;
    const x = 11;
    const y = 26;
    const w = 534;
    const h = 404;
    this.contentsBack.strokeRect(x, y, w, h, ColorManager.textColor(15));
    this.contentsBack.strokeRect(x, y, w, h, ColorManager.textColor(15));
    this.contentsBack.strokeRect(x, y, w, h, ColorManager.textColor(15));
    this.drawTextEx(text, 11, 450, this.width)
};
Window_MapInfo.prototype.onBitmapLoad = function (bitmap) {
    if (bitmap.isReady() && this._bitmap == bitmap) {
        this._mapSprite.bitmap = this._bitmap;
        this.scaleSprite(this._mapSprite);
        this.centerSprite(this._mapSprite);
    }
};

function Window_MapList() {
    this.initialize(...arguments);
};

Window_MapList.prototype = Object.create(Window_Selectable.prototype);
Window_MapList.prototype.constructor = Window_MapList;

Window_MapList.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.opacity = 0;
    this._list = [];
    this.refresh();
}
Window_MapList.prototype.refresh = function () {
    this._list = []
    this.createContents();
    this._list = $gameSystem._bigMapData;
    if (this._list.length > 0) {
        this.drawAllItems();
    }
};
Window_MapList.prototype.drawItem = function (index) {
    this.contents.fontSize = 26;
    const rect = this.itemLineRect(index);
    const item = this._list[index];
    if (item) {
        this.resetTextColor();
        this.drawTextEx('\\C[0]' + item.name, rect.x, rect.y, this.width);
    }
};
Window_MapList.prototype.drawBackgroundRect = function () {
};
Window_MapList.prototype.maxItems = function () {
    return this._list ? this._list.length : 1;
};
Window_MapList.prototype.maxCols = function () {
    return 1;
};
Window_MapList.prototype.numVisibleRows = function () {
    return 10;
};
Window_MapList.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
var old_Sprite_Button_updateOpacity = Sprite_Button.prototype.updateOpacity;
Sprite_Button.prototype.updateOpacity = function () {
    if (SceneManager._scene instanceof Scene_BigMap) {
        this.opacity = 0;
    } else {
        old_Sprite_Button_updateOpacity.call(this);
    }
};


function Window_MapCommand() {
    this.initialize(...arguments);
};

Window_MapCommand.prototype = Object.create(Window_Command.prototype);
Window_MapCommand.prototype.constructor = Window_MapCommand;

Window_MapCommand.prototype.initialize = function (rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.opacity = 255;
}
Window_MapCommand.prototype.updateBackOpacity = function () {
    this.backOpacity = 255;
};
Window_MapCommand.prototype.makeCommandList = function () {
    this.contents.fontSize = 20;
    this.addCommand('确定', 'qd', true);
    this.addCommand('返回', 'qx', true);
};
var old_Window_MapCommand_refresh = Window_MapCommand.prototype.refresh;
Window_MapCommand.prototype.refresh = function () {
    old_Window_MapCommand_refresh.call(this);
    this.drawText('是否传送该地点？', 0, 5, this.width, 'center')
};
Window_MapCommand.prototype.maxItems = function () {
    return 2;
};
Window_MapCommand.prototype.numVisibleRows = function () {
    return 1;
};
Window_MapCommand.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
Window_MapCommand.prototype.maxCols = function () {
    return 2;
};
Window_MapCommand.prototype.itemRect = function (index) {
    const maxCols = this.maxCols();
    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight() / 2;
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const col = index % maxCols;
    const row = Math.floor(index / maxCols);
    const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
    const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY() + itemHeight;
    const width = itemWidth - colSpacing;
    const height = itemHeight - rowSpacing;
    return new Rectangle(x, y, width, height);
};