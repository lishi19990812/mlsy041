//=============================================================================
// RPG Maker MZ - 自动寻人系统
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<自动寻人系统>
 * @author FlyCat
 * 
 * @command closeLookNpc
 * @text 寻人显示/隐藏
 * @desc 寻人显示/隐藏
 *
 * @arg type
 * @type boolean
 * @default
 * @text 显示/隐藏
 * @desc 显示/隐藏
 * 
 * @command lockNpc
 * @text 锁定Npc
 * @desc 锁定Npc
 * 
 * @arg id
 * @type number
 * @default
 * @text 事件Id
 * @desc 事件Id
 * 
 * @arg type
 * @type boolean
 * @default
 * @text 锁定/解锁
 * @desc 锁定/解锁
 * 
 * @help
 * 图片放在img/pictures下
 * 
 * $gameSystem._lookNpcButtonVisible = false;//显示或隐藏寻路窗口
 * 也可用插件指令来进行隐藏和显示
 * 
 * 插件指令 锁定NPC 
 * 选择指定的事件进行锁定和解锁 
 * 锁定的事件将无法出现在寻路列表中
 * 
 * 事件备注：<npc> 即可出现在寻路列表中
 * 事件名称中增加\I[X]  可以在列表名字上显示小图标
 * 
 * 本插件必须获取授权才能使用，禁止出售，修改等行为，违者必究。
 */

var Imported = Imported || {};
Imported.FlyCat_AutoLookNpc = true;

var FlyCat = FlyCat || {};
FlyCat.AutoLookNpc = {};
FlyCat.AutoLookNpc.parameters = PluginManager.parameters('FlyCat_AutoLookNpc');

PluginManager.registerCommand('FlyCat_AutoLookNpc', 'closeLookNpc', args => {
    const TF = eval(args.type);
    $gameSystem._lookNpcButtonVisible = TF;
});
PluginManager.registerCommand('FlyCat_AutoLookNpc', 'lockNpc', args => {
    if (!$gameSystem._lockNpc) $gameSystem._lockNpc = [];
    const Id = Number(args.id);
    const TF = eval(args.type);
    if (!$gameSystem._lockNpc[$gameMap._mapId]) $gameSystem._lockNpc[$gameMap._mapId] = [];
    $gameSystem._lockNpc[$gameMap._mapId][Id] = TF;
});

FlyCat.AutoLookNpc.Scene_Map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function () {
    FlyCat.AutoLookNpc.Scene_Map_initialize.call(this);
    if (!$gameSystem._lockNpc) $gameSystem._lockNpc = [];
    if (!$gameSystem._lockNpc[$gameMap._mapId]) $gameSystem._lockNpc[$gameMap._mapId] = [];
    if ($gameSystem._lookNpcButtonVisible === undefined) {
        $gameSystem._lookNpcButtonVisible = true;
    }
    Input.keyMapper['82'] = 'r';
    FlyCat.AutoLookNpc._Scene_Map = this;
    this._moveLookNpcX = 0;
    this._moveLookNpcY = 0;
    this._pdX = 0;
    this._pdY = 0;
};

Scene_Map.prototype.createLookNpcWindow = function () {
    const rect = this.lookNpcWindowRect();
    this._lookNpcWindow = new Window_LookNpc(rect);
    this._lookNpcWindow.setHandler("ok", this.okNpcWindow.bind(this));
    this._lookNpcWindow.setHandler("cancel", this.closeNpcWindow.bind(this));
    this.addChild(this._lookNpcWindow);
    this._lookNpcWindow.hide();
    this._lookNpcWindow.close();
    this._lookNpcWindow.deactivate();
    this._openLook = false;
};
Scene_Map.prototype.lookNpcWindowRect = function () {
    const ww = 200;
    const wh = 530;
    const wx = 600;
    const wy = 150;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_Map.prototype.okNpcWindow = function () {
    const index = this._lookNpcWindow.index();
    const events = this._lookNpcWindow._list[index];
    //   console.log(events)
    if (events) {
        //  const event = $gameMap.events()[events.id - 1];
        //  if (event) {
        $gameSystem.moveToCharacter(events)
        //  }
    }
    this._openLook = false;
    this._timeSprite_2.visible = false;
    this._lookNpcWindow.hide();
    this._lookNpcWindow.close();
    this._lookNpcWindow.deactivate();
};
FlyCat.AutoLookNpc.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function () {
    FlyCat.AutoLookNpc.Scene_Map_update.call(this);
    if ($gameSystem._lookNpcButtonVisible == false) {
        this._timeSprite_1.visible = false;
        this._timeSprite.visible = false;
        this._timeWindow.visible = false;
    }
    if ($gameSystem._lookNpcButtonVisible == true) {
        this._timeSprite_1.visible = true;
        this._timeSprite.visible = true;
        this._timeWindow.visible = true
        if (Input.isTriggered('r')) {
            this.openLookNpc();
        }
    }
};
Scene_Map.prototype.closeNpcWindow = function () {
    this._timeSprite_2.visible = false;
    this._openLook = false;
    this._lookNpcWindow.hide();
    this._lookNpcWindow.close();
    this._lookNpcWindow.deactivate();
};
//////////////////////时间显示//////////////////////////
FlyCat.AutoLookNpc.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function () {
    FlyCat.AutoLookNpc.Scene_Map_createAllWindows.call(this);
    if ($gameSystem._lookNpcButtonVisible != false) {
        $gameSystem._lookNpcButtonVisible = true;
    }
    this._timeSprite = new Sprite();
    this.addChild(this._timeSprite)
    this._timeSprite.bitmap = ImageManager.loadPicture('time');
    this._timeSprite_1 = new Sprite_AutoLookButton();
    this._timeSprite_1.setClickHandler(this.openLookNpc.bind(this));
    this.addChild(this._timeSprite_1)
    this._timeSprite_1.bitmap = ImageManager.loadPicture('xunlu');
    this._timeSprite_1.x = 10;
    this._timeSprite_1.y = 106;
    this._timeSprite_2 = new Sprite();
    this.addChild(this._timeSprite_2)
    this._timeSprite_2.bitmap = ImageManager.loadPicture('autolook');
    this._timeSprite_2.x = 350;
    this._timeSprite_2.y = 0;
    this._timeSprite_2.visible = false;
    this.createLookNpcWindow();
    this.createTimeWindow();
};
Scene_Map.prototype.createTimeWindow = function () {
    const rect = this.timeWindowRect();
    this._timeWindow = new Window_TitleTimeWindow(rect);
    this.addChild(this._timeWindow)
};
Scene_Map.prototype.openLookNpc = function () {
    if (this._openLook == true) {
        SoundManager.playCancel();
        this._timeSprite_2.visible = false;
        this._lookNpcWindow.hide();
        this._lookNpcWindow.close();
        this._lookNpcWindow.deactivate();
        this._openLook = false;
    } else {
        SoundManager.playOk();
        this._lookNpcWindow.open();
        this._lookNpcWindow.show();
        this._lookNpcWindow.activate();
        this._lookNpcWindow.refresh();
        if (this._lookNpcWindow._list.length > 0) this._lookNpcWindow.select(0);
        this._timeSprite_2.visible = true;
        this._openLook = true;
    }
};
FlyCat.AutoLookNpc.Scene_Map_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
Scene_Map.prototype.isAnyButtonPressed = function () {
    return this._lookNpcWindow && this._lookNpcWindow.isTouchedInsideFrame() && this._openLook == true ||
        this._timeSprite_1 && this._timeSprite_1.isPressed() ||
        FlyCat.AutoLookNpc.Scene_Map_isAnyButtonPressed.call(this);
};
Scene_Map.prototype.timeWindowRect = function () {
    const ww = 200;
    const wh = 200;
    const wx = 10;
    const wy = 6;
    return new Rectangle(wx, wy, ww, wh);
};

FlyCat.AutoLookNpc.Scene_Map_callMenu = Scene_Map.prototype.callMenu;
Scene_Map.prototype.callMenu = function () {
    if (this._lookNpcWindow.active) { return; }
    FlyCat.AutoLookNpc.Scene_Map_callMenu.call(this);
};
FlyCat.AutoLookNpc.Game_Player_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function () {
    if (FlyCat.AutoLookNpc._Scene_Map._lookNpcWindow && FlyCat.AutoLookNpc._Scene_Map._lookNpcWindow.active) {
        return false;
    } else {
        return FlyCat.AutoLookNpc.Game_Player_canMove.call(this);
    }
};
function Window_LookNpc() {
    this.initialize(...arguments);
}

Window_LookNpc.prototype = Object.create(Window_Selectable.prototype);
Window_LookNpc.prototype.constructor = Window_LookNpc;

Window_LookNpc.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.opacity = 255;
    this.refresh();
};
Window_LookNpc.prototype.refresh = function () {
    this._list = [];
    const events = $dataMap.events;
    for (let i = 1; i < events.length; i++) {
        if (events[i] && events[i].meta.npc && this.lockEvents(i)) {
            this._list.push(events[i]);
        }
    };
    this.createContents();
    this.drawAllItems();
};
Window_LookNpc.prototype.lockEvents = function (i) {
    if (!$gameSystem._lockNpc[$gameMap._mapId]) $gameSystem._lockNpc[$gameMap._mapId] = [];
    const id = i;
    const data = $gameSystem._lockNpc[$gameMap._mapId];
    if (!data[id]) {
        return true;
    }
    if (data[id] == true) {
        return false;
    }
    return true;
};
Window_LookNpc.prototype.drawItem = function (index) {
    this.contents.fontSize = 24;
    const rect = this.itemLineRect(index);
    const event = this._list[index];
    if (event) {
        const name = event.name;
        this.changeTextColor(ColorManager.textColor(0));
        this.drawTextEx(name, rect.x, rect.y, this.itemWidth(), 'left');
        this.resetTextColor();
    }
};
Window_LookNpc.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_LookNpc.prototype.maxCols = function () {
    return 1;
};
Window_LookNpc.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
Window_LookNpc.prototype.numVisibleRows = function () {
    return 11;
};
Window_LookNpc.prototype.rowSpacing = function () {
    return 4;
};
Window_LookNpc.prototype.drawBackgroundRect = function (rect) {
    const c1 = ColorManager.itemBackColor1();
    const c2 = ColorManager.itemBackColor2();
    const x = rect.x;
    const y = rect.y;
    const w = rect.width;
    const h = rect.height;
    this.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);
    this.contentsBack.strokeRect(x, y, w, h, c1);
    this.contentsBack.strokeRect(x, y, w, h, ColorManager.textColor(8));
};

function Window_TitleTimeWindow() {
    this.initialize(...arguments);
}

Window_TitleTimeWindow.prototype = Object.create(Window_Base.prototype);
Window_TitleTimeWindow.prototype.constructor = Window_TitleTimeWindow;

Window_TitleTimeWindow.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.opacity = 0;
    this.refresh();
};
Window_TitleTimeWindow.prototype.refresh = function () {
    this.contents.clear();
    // const date = new Date();
    // const hour = date.getHours();
    // const min = date.getMinutes();
    // const ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    const year = $gameVariables.value(FlyCat.LL_SceneMenu.yearVariable);
    const month = $gameVariables.value(FlyCat.LL_SceneMenu.monthVariable);
    const weather = $gameSystem._menuWeather ? $gameSystem._menuWeather : '';
    this.contents.fontSize = 20;
    this.contents.outlineWidth = 3;
    this.contents.outlineColor = ColorManager.textColor(15);
    this.changeTextColor(ColorManager.textColor(0));
    this.drawText(year + '年 ' + month + '月 ' + weather, 0, 0, 300, 'left');
    //   this.drawText("时间：" + hour + ':' + min + ':' + ss, 0, 0, 300, 'left')
    const x = $gamePlayer.x;
    const y = $gamePlayer.y;
    this.contents.fontSize = 20;
    this.drawText("坐标：" + x + "," + y, 0, 30, 300, 'left')
    this.drawText("地点：" + $gameMap.displayName(), 0, 60, 300, 'left')
};
Window_TitleTimeWindow.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    this.refresh();
};


//////////////////////////////Sprite_questButton/////////////////////////////
function Sprite_AutoLookButton() {
    this.initialize(...arguments);
}
Sprite_AutoLookButton.prototype = Object.create(Sprite_Clickable.prototype);
Sprite_AutoLookButton.prototype.constructor = Sprite_AutoLookButton;

Sprite_AutoLookButton.prototype.initialize = function () {
    Sprite_Clickable.prototype.initialize.call(this);
    this._clickHandler = null;
    this._lastBimap = null;
    this._pressCounts = 0;
};

Sprite_AutoLookButton.prototype.onClick = function () {
    SoundManager.playOk()
    if (this._clickHandler) {
        this._clickHandler();
    }

};
Sprite_AutoLookButton.prototype.setClickHandler = function (method) {
    this._clickHandler = method;
};
Sprite_AutoLookButton.prototype.onMouseEnter = function () {
    SoundManager.playCursor();
    this._colorTone = [50, 50, 50, 0]
    this._updateColorFilter();
};
Sprite_AutoLookButton.prototype.onMouseExit = function () {
    this._colorTone = [0, 0, 0, 0]
    this._updateColorFilter();
};

Game_System.prototype.moveToCharacter = function (npcEvent) {
    let max = 100;
    let min = max;
    let bestCharacter = null;
    $gamePlayer._searchLimit = max;
    if (npcEvent) {
        min = $gamePlayer.getPathLength(npcEvent);
        bestCharacter = npcEvent;
    } else {
        for (let i = 0; i < $gameMap.events().length; i++) {
            let character = $gameMap.events()[i]
            let event = character.event();
            if (event.meta.enemy) {
                let length = $gamePlayer.getPathLength(character);
                if (length < min) {
                    min = length;
                    bestCharacter = character;
                }
            }
        }
    }
    $gamePlayer._searchLimit = null;
    if (bestCharacter) {
        $gamePlayer._searchLimit = min;
        $gameTemp.setDestination(bestCharacter.x, bestCharacter.y);
    }
}

Game_Character.prototype.getPathLength = function (character) {
    goalX = character.x;
    goalY = character.y;
    const searchLimit = this.searchLimit();
    const mapWidth = $gameMap.width();
    const nodeList = [];
    const openList = [];
    const closedList = [];
    const start = {};
    let best = start;

    if (this.x === goalX && this.y === goalY) {
        return 0;
    }

    start.parent = null;
    start.x = this.x;
    start.y = this.y;
    start.g = 0;
    start.f = $gameMap.distance(start.x, start.y, goalX, goalY);
    nodeList.push(start);
    openList.push(start.y * mapWidth + start.x);

    while (nodeList.length > 0) {
        let bestIndex = 0;
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].f < nodeList[bestIndex].f) {
                bestIndex = i;
            }
        }

        const current = nodeList[bestIndex];
        const x1 = current.x;
        const y1 = current.y;
        const pos1 = y1 * mapWidth + x1;
        const g1 = current.g;

        nodeList.splice(bestIndex, 1);
        openList.splice(openList.indexOf(pos1), 1);
        closedList.push(pos1);

        if (current.x === goalX && current.y === goalY) {
            best = current;
            break;
        }

        if (g1 >= searchLimit) {
            continue;
        }

        for (let j = 0; j < 4; j++) {
            const direction = 2 + j * 2;
            const x2 = $gameMap.roundXWithDirection(x1, direction);
            const y2 = $gameMap.roundYWithDirection(y1, direction);
            const pos2 = y2 * mapWidth + x2;

            if (closedList.includes(pos2)) {
                continue;
            }
            if (!this.canPass(x1, y1, direction)) {
                continue;
            }

            const g2 = g1 + 1;
            const index2 = openList.indexOf(pos2);

            if (index2 < 0 || g2 < nodeList[index2].g) {
                let neighbor = {};
                if (index2 >= 0) {
                    neighbor = nodeList[index2];
                } else {
                    nodeList.push(neighbor);
                    openList.push(pos2);
                }
                neighbor.parent = current;
                neighbor.x = x2;
                neighbor.y = y2;
                neighbor.g = g2;
                neighbor.f = g2 + $gameMap.distance(x2, y2, goalX, goalY);
                if (!best || neighbor.f - neighbor.g < best.f - best.g) {
                    best = neighbor;
                }
            }
        }
    }

    let node = best;
    let length = 0;
    while (node.parent && node.parent !== start) {
        node = node.parent;
        length++;
    }
    return length;
};

Game_Character.prototype.searchLimit = function () {
    return this._searchLimit ? this._searchLimit : 12;
};
var old_Scene_Map_onMapTouch = Scene_Map.prototype.onMapTouch;
Scene_Map.prototype.onMapTouch = function () {
    $gamePlayer._searchLimit = null;
    old_Scene_Map_onMapTouch.call(this);
};