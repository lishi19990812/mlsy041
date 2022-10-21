//=============================================================================
// RPG Maker MZ - 书信NPC
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<书信NPC>
 * @author FlyCat
 * 
 * @param npcData
 * @text npc设置
 * @type struct<npcData>[]
 * @default
 * 
 * @command openLetterNpcWindow
 * @text 打开书信Npc系统
 * @desc 打开书信Npc系统
 * 
 * @command addNpc
 * @text 添加指定的NPC
 * @desc 添加指定的NPC
 * 
 * @arg id
 * @type number
 * @default 
 * @min 1
 * @text npc数据库Id
 * @desc npc数据库Id
 * 
 * @command setText
 * @text Npc发送信息
 * @desc Npc发送信息
 *
 * @arg id
 * @type number
 * @min 1
 * @default 
 * @text npc数据库Id
 * @desc npc数据库Id
 * 
 * @arg text
 * @text 发送信息
 * @type string
 * @default 
 * 
 * @help
 */
/*~struct~npcData:
@param name
@text Npc名字
@type string
@default

@param img
@text Npc立绘
@require 1
@dir img/menu/
@type file 
*/
'use strict';
var Imported = Imported || {};
Imported.FlyCat_LetterNpc = true;

var FlyCat = FlyCat || {};
FlyCat.LetterNpc = {};
FlyCat.LetterNpc.parameters = PluginManager.parameters('FlyCat_LetterNpc');
FlyCat.LetterNpc.npcData = JSON.parse(FlyCat.LetterNpc.parameters['npcData'] || '[]');


if (FlyCat.LetterNpc.npcData) {
    const max = FlyCat.LetterNpc.npcData.length;
    for (let i = 0; i < max; i++) {
        FlyCat.LetterNpc.npcData[i] = JSON.parse(FlyCat.LetterNpc.npcData[i])
    }
};
PluginManager.registerCommand('FlyCat_LetterNpc', 'openLetterNpcWindow', args => {
    SceneManager.push(Scene_LetterNpc);
});
PluginManager.registerCommand('FlyCat_LetterNpc', 'addNpc', args => {
    if (!$gameSystem._LetterNpcData) {
        $gameSystem._LetterNpcData = [];
    };
    const id = Number(args.id) - 1;
    const npc = JsonEx.makeDeepCopy(FlyCat.LetterNpc.npcData[id]);
    npc.letterText = [];
    $gameSystem._LetterNpcData[id] = npc;
});

PluginManager.registerCommand('FlyCat_LetterNpc', 'setText', args => {
    const id = Number(args.id) - 1;
    const text = args.text;
    if ($gameSystem._LetterNpcData[id] && text) {
        $gameSystem.playLetterNpcMessage(text, $gameSystem._LetterNpcData[id], -1);
        $gameParty.ssLetter(true);
        $gameTemp._setNpcName = $gameSystem._LetterNpcData[id].name;
        $gameTemp._setNpcText = true;
    }
});
Game_System.prototype.playLetterNpcMessage = function (message, item, type) {
    var htime = new Date();
    var hour = htime.getHours();   //时
    var min = htime.getMinutes();  //分
    var ss = htime.getSeconds();   //秒
    var text = '';
    if (ss < 10) var text = '0';
    var time = hour + ':' + min + ':' + text + ss;
    if (type == 1) {
        item.letterText.push('\\C[0]' + time + ' ' + item.name + ':  ' + message);
        SceneManager._scene._infoWindow.refresh(item);
    } else if (type == -1) {
        item.letterText.push('\\C[0]' + time + ' ' + item.name + ':  \\C[14]' + message);
    }
    else {
        item.letterText.push('\\C[0]' + time + '\\C[3]' + '  ' + message);
        item.letterText.push('\\C[0]' + time + ' ' + item.name + ':  ' + $gameSystem.LetterNpcHd(message, item));
        SceneManager._scene._infoWindow.refresh(item);
    }
};
Game_System.prototype.LetterNpcHd = function (text, item) {//正常对话
    const name = item.name;
    if (name == '虫子') {//如果NPC姓名是虫子

        var data1 = ['你好', 'hello', 'hi', '好'];//你说的话术
        var data1_1 = ['大人安好', '大人好'];//NPC回复话术
        var include = data1.includes(text);
        if (include == true) return '\\C[14]' + data1_1[Math.floor((Math.random() * data1_1.length))];

        var data1 = ['名字', '你叫', '你是谁', '你是'];//你说的话术
        var data1_1 = ['我叫' + name, '我是你' + name + '大爷'];//NPC回复话术
        var include = data1.includes(text);
        if (include == true) return '\\C[14]' + data1_1[Math.floor((Math.random() * data1_1.length))];

    } else if (name == '梦辰') {//如果NPC姓名是梦辰


    } else if (name == '张三') {//如果NPC姓名是张三

    }
    else if (name == '李四') {//如果NPC姓名是李四

    }
};
Scene_Base.prototype.startLetterNpc = function () {
    if (!$gameSystem._LetterNpcData) {
        $gameSystem._LetterNpcData = [];
    };
};

FlyCat.LetterNpc.Scene_Map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function () {
    FlyCat.LetterNpc.Scene_Map_initialize.call(this);
    this.startLetterNpc();
};

function Scene_LetterNpc() {
    this.initialize(...arguments);
}

Scene_LetterNpc.prototype = Object.create(Scene_Letter.prototype);
Scene_LetterNpc.prototype.constructor = Scene_LetterNpc;

Scene_LetterNpc.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
    $gameTemp._setNpcText = false;
    this._sceneType = 1;
    $gameParty.ssLetter(false);
    this.startLetterNpc();
    $gameSystem._letterButtonSs = false;
    this._lastIndex = null;
};
Scene_LetterNpc.prototype.createChlidrenListWindow = function () {
    const rect = this.chListWindowRect();
    this._chListWindow = new Window_LetterNpcList(rect);
    this._chListWindow.setHandler("ok", this.okChildren.bind(this));
    this._chListWindow.setHandler("cancel", this.cancelChildren.bind(this));
    this.addChild(this._chListWindow);
    if (this._chListWindow._list.length > 0) {
        if ($gameTemp._setNpcName) {
            for (let i = 0; i < this._chListWindow._list.length; i++) {
                if (this._chListWindow._list[i].name == $gameTemp._setNpcName) {
                    this._chListWindow.select(i);
                    const pagination = Math.floor((i + 1) / 8);
                    this._chListWindow.smoothScrollDown(pagination * 8);
                    $gameTemp._setNpcName = null;
                    break;
                }
            }
        } else {
            this._chListWindow.select(0);
        }
        this._chListWindow.activate();
        this._typeListWindow.deactivate();
    } else {
        this._chListWindow.deactivate();
        this._chListWindow.deselect();
    }
};
Scene_LetterNpc.prototype.selectCommand = function () {
    const index = this._commandWindow.index();
    if (index == 0) {
        const text = Graphics._textarea.value;
        const indexs = this._chListWindow.index();
        const people = this._chListWindow._list[indexs];
        $gameSystem.playLetterNpcMessage(text, people, 0)
        this._commandWindow.activate();
        Graphics._textarea.value = '';
        const pagination = Math.floor((people.letterText.length + 1) / 8);
        this._infoWindow.smoothScrollDown(pagination * 8);
    } else {
        this.cancelCommand();
    }
};
Scene_LetterNpc.prototype.createInfoWindow = function () {
    const rect = this.infoWindowRect();
    this._infoWindow = new Window_LetterNpcInfo(rect);
    this.addChild(this._infoWindow);
};
Scene_LetterNpc.prototype.update = function () {
    Scene_MenuBase.prototype.update.call(this);
    if (this._chListWindow) {
        const index = this._chListWindow.index();
        const people = this._chListWindow._list[index];
        if (people && this._lastIndex != index) {
            // const rate = Math.floor(Math.random() * (100 - 1) + 1);//1-100 概率
            // if (rate < 10) {//10%自动说话
            //     var text = $gameSystem.LetterPeopleLastText(people);
            //     $gameSystem.playLetterMessage(text[0], people, 1)
            //     if (text[1] && text[1].length > 0) {
            //         const item = text[1][Math.floor((Math.random() * text[1].length))];
            //         var text1 = '\\C[14]孩儿给母亲送了一些\\C[3]' + item.name + '\\C[14]希望母亲喜欢';
            //         $gameParty.gainItem(item, 1);//给予该物品1个
            //         $gameSystem.playLetterMessage(text1, people, 1);
            //     }
            // }
            this._infoWindow.refresh(people);
            const pagination = Math.floor((people.letterText.length + 1) / 8);
            this._infoWindow.smoothScrollDown(pagination * 8);
            this._childrenSprite.bitmap = ImageManager.loadBitmap('img/menu/', people.img);
            this._lastIndex = index;
        } else if (!people) {
            this._childrenSprite.bitmap = '';
        }
    }
};
function Window_LetterNpcList() {
    this.initialize(...arguments);
}

Window_LetterNpcList.prototype = Object.create(Window_Selectable.prototype);
Window_LetterNpcList.prototype.constructor = Window_LetterNpcList;

Window_LetterNpcList.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.activate();
    this.refresh();
};
Window_LetterNpcList.prototype.refresh = function () {
    this.contents.clear();
    this.contentsBack.clear();
    this.contents.fontSize = 24;
    this._list = [];
    this._list = $gameSystem._LetterNpcData;
    if (this._list.length > 0) {
        this.drawAllItems();
    } else {
        this.drawText('目前没有联系人', -10, this.height / 2 - 40, this.width, 'center')
        this.select(-1);
    }
};
Window_LetterNpcList.prototype.drawItem = function (index) {
    const rect = this.itemLineRect(index);
    const npc = this._list[index];
    if (npc) {
        this.drawText(npc.name, rect.x, rect.y, this.width, 'left')
    }
}

Window_LetterNpcList.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_LetterNpcList.prototype.maxCols = function () {
    return 1;
};
Window_LetterNpcList.prototype.numVisibleRows = function () {
    return 8;
};
Window_LetterNpcList.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
Window_LetterNpcList.prototype.callHandler = function (symbol) {
    if (symbol == "ok" && Graphics._textarea._onWindow) {
        AudioManager.stopSe();
        this.activate();
    }
    else {
        if (this.isHandled(symbol)) {
            this._handlers[symbol]();
        }
    }
};
Window_LetterNpcList.prototype.isOpenAndActive = function () {
    return this.isOpen() && this.visible && this.active && !Graphics._textarea._onWindow;
};

function Window_LetterNpcInfo() {
    this.initialize(...arguments);
}

Window_LetterNpcInfo.prototype = Object.create(Window_Selectable.prototype);
Window_LetterNpcInfo.prototype.constructor = Window_LetterNpcInfo;

Window_LetterNpcInfo.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
};

Window_LetterNpcInfo.prototype.refresh = function (item) {
    this.contents.clear();
    this.contentsBack.clear();
    this.contents.fontSize = 18;
    this._list = [];
    this._list = item.letterText;
    if (this._list.length >= 100) {
        this._list.splice(0, 1)
    }
    if (this._list.length > 0) {
        this.drawAllItems();
    };
};
Window_LetterNpcInfo.prototype.drawItem = function (index) {
    const rect = this.itemLineRect(index);
    const message = this._list[index];
    if (message) {
        this.drawTextEx(message, rect.x, rect.y, this.width)
    };
};
Window_LetterNpcInfo.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = 20;
    this.resetTextColor();
};
Window_LetterNpcInfo.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_LetterNpcInfo.prototype.maxCols = function () {
    return 1;
};
Window_LetterNpcInfo.prototype.numVisibleRows = function () {
    return 8;
};
Window_LetterNpcInfo.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};