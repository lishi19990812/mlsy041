//=============================================================================
// RPG Maker MZ - 琉璃岛子嗣阁系统
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<琉璃岛子嗣阁系统>
 * @author FlyCat
 * 
 * @param boyPicture
 * @text 男孩立绘
 * @require 1
 * @dir img/menu/
 * @type file[]
 *
 * @param girlPicture
 * @text 女孩立绘
 * @require 1
 * @dir img/menu/
 * @type file
 * 
 * @param sxEvent
 * @text 双修公共事件
 * @type common_event
 * @default
 * 
 * @param nameVariable
 * @text 回传姓名变量
 * @type variable
 * @default 
 * 
 * @param xbVariable
 * @text 回传性别变量
 * @type variable
 * @default
 * 
 * @param xgVariable
 * @text 回传性格变量
 * @type variable
 * @default
 * 
 * @param workReward
 * @text 打工奖励设置
 * @type item[]
 * @default
 * 
 * @param sxReward
 * @text 双修奖励设置
 * @type item[]
 * @default
 * 
 * @param cjReward
 * @text 出嫁奖励设置
 * @type item[]
 * @default
 * 
 * @param hxzReward_1
 * @text 欢喜宗外门奖励设置
 * @type item[]
 * @default
 * 
 * @param hxzReward_2
 * @text 欢喜宗内门奖励设置
 * @type item[]
 * @default
 * 
 * @param hxzReward_3
 * @text 欢喜宗真传奖励设置
 * @type item[]
 * @default
 * 
 * @param xsgReward_1
 * @text 血神阁外门奖励设置
 * @type item[]
 * @default
 *
 * @param xsgReward_2
 * @text 血神阁内门奖励设置
 * @type item[]
 * @default
 *
 * @param xsgReward_3
 * @text 血神阁真传奖励设置
 * @type item[]
 * @default
 * 
 * @param atmReward_1
 * @text 傲天门外门奖励设置
 * @type item[]
 * @default
 *
 * @param atmReward_2
 * @text 傲天门内门奖励设置
 * @type item[]
 * @default
 *
 * @param atmReward_3
 * @text 傲天门真传奖励设置
 * @type item[]
 * @default
 * 
 * @param lszReward_1
 * @text 灵兽宗外门奖励设置
 * @type item[]
 * @default
 *
 * @param lszReward_2
 * @text 灵兽宗内门奖励设置
 * @type item[]
 * @default
 *
 * @param lszReward_3
 * @text 灵兽宗真传奖励设置
 * @type item[]
 * @default
 * 
 * @param xymReward_1
 * @text 雪月门外门奖励设置
 * @type item[]
 * @default
 *
 * @param xymReward_2
 * @text 雪月门内门奖励设置
 * @type item[]
 * @default
 *
 * @param xymReward_3
 * @text 雪月门真传奖励设置
 * @type item[]
 * @defaultle[]
 * 
 * @param lxgReward_1
 * @text 凌霄宫外门奖励设置
 * @type item[]
 * @default
 *
 * @param lxgReward_2
 * @text 凌霄宫内门奖励设置
 * @type item[]
 * @default
 *
 * @param lxgReward_3
 * @text 凌霄宫真传奖励设置
 * @type item[]
 * @default
 * 
 * @command addChildren
 * @text 添加孩子
 * @desc 添加孩子
 *
 * @command openHyWindow
 * @text 打开儿童屋
 * @desc 打开儿童屋
 * 
 * =====================================================================
 * @help
 * 插件指令：添加孩子
 * 物品备注：<培养:类型,数值,数值,数值>
 * 类型：外貌、技艺(meiLi)、悟性、体力(shenLi)、
 * 福源、胸围、长短、仙龄
 * 第一个数值：孩子喜欢的增加数值
 * 第二个数值：孩子一般喜欢的增加数值
 * 第三个数值：孩子讨厌的增加数值
 * 注意：仙龄只生效第一个<培养:仙龄,数值>
 */

'use strict';
var Imported = Imported || {};
Imported.FlyCat_LL_HY = true;

var FlyCat = FlyCat || {};
FlyCat.LL_Hy = {};
FlyCat.LL_Hy.parameters = PluginManager.parameters('FlyCat_LL_HY');
FlyCat.LL_Hy.workReward = JSON.parse(FlyCat.LL_Hy.parameters['workReward'] || '[]');
FlyCat.LL_Hy.sxReward = JSON.parse(FlyCat.LL_Hy.parameters['sxReward'] || '[]');
FlyCat.LL_Hy.cjReward = JSON.parse(FlyCat.LL_Hy.parameters['cjReward'] || '[]');
FlyCat.LL_Hy.girlPicture = JSON.parse(FlyCat.LL_Hy.parameters['girlPicture'] || '[]');
FlyCat.LL_Hy.boyPicture = JSON.parse(FlyCat.LL_Hy.parameters['boyPicture'] || '[]');
FlyCat.LL_Hy.sxEvent = Number(FlyCat.LL_Hy.parameters['sxEvent']);
FlyCat.LL_Hy.nameVariable = Number(FlyCat.LL_Hy.parameters['nameVariable']);
FlyCat.LL_Hy.xbVariable = Number(FlyCat.LL_Hy.parameters['xbVariable']);
FlyCat.LL_Hy.xgVariable = Number(FlyCat.LL_Hy.parameters['xgVariable']);
FlyCat.LL_Hy.hxzReward_1 = JSON.parse(FlyCat.LL_Hy.parameters['hxzReward_1'] || '[]');
FlyCat.LL_Hy.hxzReward_2 = JSON.parse(FlyCat.LL_Hy.parameters['hxzReward_2'] || '[]');
FlyCat.LL_Hy.hxzReward_3 = JSON.parse(FlyCat.LL_Hy.parameters['hxzReward_3'] || '[]');
FlyCat.LL_Hy.xsgReward_1 = JSON.parse(FlyCat.LL_Hy.parameters['xsgReward_1'] || '[]');
FlyCat.LL_Hy.xsgReward_2 = JSON.parse(FlyCat.LL_Hy.parameters['xsgReward_2'] || '[]');
FlyCat.LL_Hy.xsgReward_3 = JSON.parse(FlyCat.LL_Hy.parameters['xsgReward_3'] || '[]');
FlyCat.LL_Hy.atmReward_1 = JSON.parse(FlyCat.LL_Hy.parameters['atmReward_1'] || '[]');
FlyCat.LL_Hy.atmReward_2 = JSON.parse(FlyCat.LL_Hy.parameters['atmReward_2'] || '[]');
FlyCat.LL_Hy.atmReward_3 = JSON.parse(FlyCat.LL_Hy.parameters['atmReward_3'] || '[]');
FlyCat.LL_Hy.lszReward_1 = JSON.parse(FlyCat.LL_Hy.parameters['lszReward_1'] || '[]');
FlyCat.LL_Hy.lszReward_2 = JSON.parse(FlyCat.LL_Hy.parameters['lszReward_2'] || '[]');
FlyCat.LL_Hy.lszReward_3 = JSON.parse(FlyCat.LL_Hy.parameters['lszReward_3'] || '[]');
FlyCat.LL_Hy.xymReward_1 = JSON.parse(FlyCat.LL_Hy.parameters['xymReward_1'] || '[]');
FlyCat.LL_Hy.xymReward_2 = JSON.parse(FlyCat.LL_Hy.parameters['xymReward_2'] || '[]');
FlyCat.LL_Hy.xymReward_3 = JSON.parse(FlyCat.LL_Hy.parameters['xymReward_3'] || '[]');
FlyCat.LL_Hy.lxgReward_1 = JSON.parse(FlyCat.LL_Hy.parameters['lxgReward_1'] || '[]');
FlyCat.LL_Hy.lxgReward_2 = JSON.parse(FlyCat.LL_Hy.parameters['lxgReward_2'] || '[]');
FlyCat.LL_Hy.lxgReward_3 = JSON.parse(FlyCat.LL_Hy.parameters['lxgReward_3'] || '[]');

PluginManager.registerCommand('FlyCat_LL_HY', 'addChildren', args => {
    if (!$gameSystem._ChildrenList) {
        $gameSystem._ChildrenList = [];
    }
    if ($gameSystem._ChildrenList.length < 5) {
        $gameSystem.addChildren();
    } else {
        $gameMessage.add('已经没有精力养更多的孩子了！')
    }

});
PluginManager.registerCommand('FlyCat_LL_HY', 'openHyWindow', args => {
    SceneManager.push(Scene_LL_HY);
});
Game_System.prototype.childrenMC = function () {//卖春话术
    const message = ['啊，今天的客人太多了~~~嗯啊啊啊~~~', '母亲，这做爱很舒服吗？', '母亲，今天也要去吗？', '今天刘老爷真猛', '好想李公子啊', '听说王公子看上我了，嘻嘻', '隔壁突然说什么彬彬就是菜，我很勇，然后被我弄的哭了很久。', '有个吴姓公子忽然点了我，看外貌，以为能舒服，实在是失望至极。', '嘤嘤嘤，母亲打人，腰杆好疼啊~~', '母亲大人，她们都好丑，还不及母亲。', '母亲，我嗯啊~~~高潮停不下来了。', '母亲，母亲好想要再去，好想做，根本停不下来了。', '哎，今天遇到的姑娘远不及母亲大人。', '好想揉一揉母亲的胸。', '母亲，我难受的厉害，让我去，让我日，我会好过一些。'];
    return '\\C[23]' + message[Math.floor((Math.random() * message.length))];
};
Game_System.prototype.childrenWH = function () {//问候话术
    const message = ['母亲尝尝我酿的酒。', '我要长得及母亲一半就好了', '母亲这么好看，我都看不下去其他姑娘了。', '母亲真是越来越好看了。', '母亲多讲讲你以前的故事。', '母亲发钗别有韵味', '母亲这料子做成衣服肯定好看。', '母亲孩儿昨天被先生夸奖了。', '母亲孩儿做了桂花糕，您来尝尝。', '母亲早安', '母亲看看我给你买的新鲜玩意', '母亲，陪陪人家', '母亲孩儿有个小秘密要告诉你。'];
    return '\\C[23]' + message[Math.floor((Math.random() * message.length))];
};
Game_System.prototype.childrenSX = function () {//双修话术
    const message = ['母亲再多一点再多一点', '母亲你的双腿间是不是有什么东西流出来了？', '母亲睡了啊？啊啊~~就这样插进去，小穴还一颤一颤的', '床单该换了', '母亲昨晚真的哭的好惨', '母亲你的身体太棒了', '母亲乖吃下去', '母亲我才摸了摸你的小穴就湿了', '母亲是不是想肉棒想得紧，小穴吸得我好紧', '母亲的后庭也不错', '母亲你夹得我好紧啊', '好想看到满身精液的母亲', '母亲高潮的样子真美', '母亲我的技术如何？', '母亲的胸真软啊', '母亲的技术越来越厉害了', '母亲你下面好湿', '母亲的小穴好漂亮', '母亲你是再看我的肉棒吗？'];
    return '\\C[23]' + message[Math.floor((Math.random() * message.length))];
};
Game_System.prototype.childrenPyXh = function () {//培养话术喜欢
    const message = ['原来母亲还记得我最喜欢的东西', '很久以前就想要了', '这才是我最爱的东西', '我会好好回报母亲的'];
    return '\\C[23]' + message[Math.floor((Math.random() * message.length))];
};
Game_System.prototype.childrenPyBwbh = function () {//培养话术不温不火
    const message = ['这个东西还好啦', '虽然没大用，但我还是很喜欢', '谢谢母亲大人', '好像没什么用'];
    return '\\C[23]' + message[Math.floor((Math.random() * message.length))];
};
Game_System.prototype.childrenPyBxh = function () {//培养话术不喜欢
    const message = ['什么东西啊', '一点用没有', '我最讨厌这个东西了', '母亲心里没有我'];
    return '\\C[23]' + message[Math.floor((Math.random() * message.length))];
};
Game_System.prototype.childrenCj = function () {//出嫁话术
    const message = ['孩儿不想嫁给隔壁老王', '孩儿走了，母亲大人保重', '孩子即将远去，母亲珍重', '终于嫁人了，离开这个老妖精'];
    return '\\C[23]' + message[Math.floor((Math.random() * message.length))];
};
Game_System.prototype.childrenPlayerHd = function (text, name) {//玩家孩子互动
    const playerMessage = text;

    const helloMessage = ['你好', 'hello', 'hi', '好'];//打招呼类型
    const helloChildMessage = ['母亲大人安好', '母亲大人好'];//孩子回复话术
    var include = helloMessage.includes(playerMessage);
    if (include == true) return '\\C[23]' + helloChildMessage[Math.floor((Math.random() * helloChildMessage.length))];

    const whoMessage = ['名字', '你叫', '你是谁', '你是'];//你是谁类型
    const whoChildMessage = ['孩儿是' + name];//孩子回复话术
    var include = whoMessage.includes(playerMessage);
    if (include == true) return '\\C[23]' + whoChildMessage[Math.floor((Math.random() * whoChildMessage.length))];

    const babaMessage = ['爸爸', '叫爸爸', '爸'];//叫爸爸类型
    const babaChildMessage = ['爸爸爱我', '爸爸我要', '好想要你啊爸爸', '爸爸好厉害'];//孩子回复话术
    var include = babaMessage.includes(playerMessage);
    if (include == true) return '\\C[23]' + babaChildMessage[Math.floor((Math.random() * babaChildMessage.length))];

    const mamaMessage = ['妈妈', '叫妈妈', '妈'];//叫妈妈类型
    const mamaChildMessage = ['妈妈爱我', '妈妈我要', '好想要啊妈妈', '妈妈好厉害'];//孩子回复话术
    var include = mamaMessage.includes(playerMessage);
    if (include == true) return '\\C[23]' + mamaChildMessage[Math.floor((Math.random() * mamaChildMessage.length))];

    ////自行添加攻略////仿照下列各式只需修改xxx  yyy 名字相同即可  xxx yyy 自定义命名即可
    // const xxx = ['妈妈', '叫妈妈', '妈'];//玩家打字的概括，模糊搜索
    // const yyy = ['妈妈爱我', '妈妈我要', '好想要啊妈妈', '妈妈好厉害'];//孩子回复的话术
    // var include = xxx.includes(playerMessage);
    // if (include == true) return '\\C[23]' + yyy[Math.floor((Math.random() * yyy.length))];

    return '\\C[23]我没有听懂，请再说一遍！';

};
Game_System.prototype.addChildren = function () {
    this._children = { name: '', lingGen: '', xingGe: '', ziSe: '', xingBie: '', haoGanDu: '', xianLing: '', meiLi: '', wuXing: '', shenLi: '', fuYuan: '', xiongWei: '', changDuan: '', waiMao: '' };
    const lingGen = ['金', '木', '水', '火', '土', '雷', '冰', '天'];
    const xingGe = ['开朗', '阴险', '色情', '忠诚'];
    const xingBie = ['男', '女'];
    const boyPicture = FlyCat.LL_Hy.boyPicture;
    const girlPicture = FlyCat.LL_Hy.girlPicture;
    this._children.name = $gameTemp._childrenName || '无名';
    this._children.lingGen = lingGen[Math.floor((Math.random() * lingGen.length))];
    this._children.xingGe = xingGe[Math.floor((Math.random() * xingGe.length))];
    this._children.xingBie = xingBie[Math.floor((Math.random() * xingBie.length))];
    if (Imported.FlyCat_LL_SM) {
        if (this._children.xingBie == '男') {
            const number = $gameVariables.value(FlyCat.LL_Sm.boyValue) + 1;
            $gameVariables.setValue(FlyCat.LL_Sm.boyValue, number)
        } else {
            const number = $gameVariables.value(FlyCat.LL_Sm.girlValue) + 1;
            $gameVariables.setValue(FlyCat.LL_Sm.girlValue, number)
        }
    }
    this._children.haoGanDu = 0;
    this._children.xianLing = 0;
    this._children.waiMao = Math.floor((Math.random() * 500) + 1);
    this.setChildrenZiSe(this._children);
    this._children.meiLi = Math.floor((Math.random() * 100) + 1);
    this._children.wuXing = Math.floor((Math.random() * 80) + 1);
    this._children.shenLi = Math.floor((Math.random() * 50) + 1);
    this._children.fuYuan = Math.floor((Math.random() * 50) + 1);
    this._children.pyCounts = 0;
    //this._children.menPai = '无';
    if (this._children.xingBie === '男') {
        this._children.changDuan = Math.floor((Math.random() * 30) + 1)
        this._children.xiongWei = null;
        this._children.picture = boyPicture[Math.floor((Math.random() * boyPicture.length))];
    }
    else {
        this._children.changDuan = null;
        this._children.xiongWei = Math.floor((Math.random() * 300) + 1)
        this._children.picture = girlPicture[Math.floor((Math.random() * girlPicture.length))];
    }
    this._ChildrenList.push(this._children);
};
Game_System.prototype.setChildrenZiSe = function (actor) {
    this._children = actor;
    const ziSe = ['丑陋', '普通', '出众', '仙姿'];
    if (this._children.waiMao >= 0 && this._children.waiMao <= 100) {
        this._children.ziSe = ziSe[0];
    }
    if (this._children.waiMao > 100 && this._children.waiMao <= 200) {
        this._children.ziSe = ziSe[1];
    }
    if (this._children.waiMao > 200 && this._children.waiMao <= 300) {
        this._children.ziSe = ziSe[2];
    }
    if (this._children.waiMao > 300 && this._children.waiMao <= 400) {
        this._children.ziSe = ziSe[3];
    }
    if (this._children.waiMao > 400) this._children.ziSe = ziSe[3];
    // console.log(this._children)
};
Game_System.prototype.setChildrenPicture = function (children) {
    const xg = children.xingGe;
    const year = Number(children.xianLing);
    const xb = children.xingBie;
    if (year >= 13 && year < 18) {
        if (xb == '男') {
            children.picture = '男童' + xg;
        } else {
            children.picture = '女童' + xg;
        }
    }
    if (year >= 18) {
        if (xb == '男') {
            children.picture = '成男' + xg;
        } else {
            children.picture = '成女' + xg;
        }
    }

}
Game_System.prototype.removeChildren = function (children, type) {
    if (type === 'Cj') {
        $gameSystem.playChildrenMessage('\\C[0]系统: \\c[10]' + children.name + '\\C[14]出嫁了');
    } else if (type === 'Bs') {
        $gameSystem.playChildrenMessage('\\C[0]系统: \\c[10]' + children.name + '\\C[14]随宗门而去！');
    } else if (type === 'maxYear') {
        $gameSystem.playChildrenMessage('\\C[0]系统: \\c[10]' + children.name + '\\C[14]年龄大了，自己出门闯荡了！');
    }
    else {
        $gameSystem.playChildrenMessage('\\C[0]系统: \\C[14]你遗弃了\\C[10]' + children.name);
    }

    const list = $gameSystem._ChildrenList;
    const childrens = list.indexOf(children);
    list.splice(childrens, 1);
};

Game_System.prototype.playChildrenMessage = function (message) {
    var htime = new Date();
    // var year = htime.getFullYear();//年
    // var moth = htime.getMonth() + 1;   //月
    // var date = htime.getDate();    //日year + '年' + moth + '月' + date + '日' + 
    var hour = htime.getHours();   //时
    var min = htime.getMinutes();  //分
    var ss = htime.getSeconds();   //秒
    var text = '';
    if (ss < 10) var text = '0';
    var time = hour + ':' + min + ':' + text + ss;
    $gameSystem._ChildrenMessage.push('\\C[0]' + time + '  ' + message);
    FlyCat.LL_Hy.Window_ChildrenMessage.refresh();
};

function Scene_LL_HY() {
    this.initialize(...arguments);
}

Scene_LL_HY.prototype = Object.create(Scene_MenuBase.prototype);
Scene_LL_HY.prototype.constructor = Scene_LL_HY;

Scene_LL_HY.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
};
Scene_LL_HY.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    if (!$gameSystem._ChildrenMessage) $gameSystem._ChildrenMessage = [];
    this.createChildrenInfo();
    this.createChlidrenMessageWindow();
    this.createChlidrenPyWindow();
    this.createChlidrenMenPaiWindow();
    this.createChlidrenItemWindow();
    this.createChlidrenListWindow();
    this.createOkWindow();
    if (Imported.MiniInformationWindow) {
        this.createMiniWindow();
        if (this._childrenItemWindow) this._childrenItemWindow._miniInfoWindow = this._miniWindow;
    };
};
Scene_LL_HY.prototype.createChlidrenMenPaiWindow = function () {
    const rect = this.chlidrenMenPaiWindowRect();
    this._childrenMenPaiWindow = new Window_ChildrenMenPai(rect);
    this._childrenMenPaiWindow.setHandler("ok", this.okChildrenMenPai.bind(this));
    this._childrenMenPaiWindow.setHandler("cancel", this.cancelChildrenMenPai.bind(this));
    this.addChild(this._childrenMenPaiWindow);
    this._childrenMenPaiWindow.hide();
    this._childrenMenPaiWindow.deactivate();
};
Scene_LL_HY.prototype.chlidrenMenPaiWindowRect = function () {
    const ww = 400;
    const wh = 400;
    const wx = Graphics.width / 2 - ww / 2;
    const wy = Graphics.height / 2 - wh / 2;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_LL_HY.prototype.okChildrenMenPai = function () {//确定门派
    const index = this._childrenMenPaiWindow.index();
    const menpai = ['傲天门', '灵兽宗', '欢喜宗', '血神阁', '雪月门', '凌霄宫']
    this._menPai = menpai[index];
    if (this._menPai) {
        const index = this._chListWindow.index();
        this._children = this._chListWindow._list[index];
        this._hdType = 'BS';
        this._childrenPyWindow.deactivate();
        this._childrenOkWindow.refresh('BS', this._children, this._menPai);
        this._childrenMenPaiWindow.hide();
        this._childrenMenPaiWindow.deactivate();
        this._childrenOkWindow.show();
        this._childrenOkWindow.activate();
    }
    else {
        SoundManager.playBuzzer();
        this._childrenMenPaiWindow.hide();
        this._childrenMenPaiWindow.deactivate();
        this._childrenPyWindow.activate();
    };
};
Scene_LL_HY.prototype.cancelChildrenMenPai = function () {
    this._childrenPyWindow.activate();
    this._childrenMenPaiWindow.hide();
    this._childrenMenPaiWindow.deactivate();
};
Scene_LL_HY.prototype.createChlidrenItemWindow = function () {
    const rect = this.chlidrenItemWindowRect();
    this._childrenItemWindow = new Window_ChildrenItem(rect);
    this._childrenItemWindow.setHandler("ok", this.okChildrenItem.bind(this));
    this._childrenItemWindow.setHandler("cancel", this.cancelChildrenItem.bind(this));
    this.addChild(this._childrenItemWindow);
    this._childrenItemWindow.hide();
    this._childrenItemWindow.deactivate();
};
Scene_LL_HY.prototype.chlidrenItemWindowRect = function () {
    const ww = 400;
    const wh = 400;
    const wx = Graphics.width / 2 - ww / 2;
    const wy = Graphics.height / 2 - wh / 2;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_LL_HY.prototype.update = function () {
    Scene_MenuBase.prototype.update.call(this);
    if (this._childrenItemWindow) {
        const indexItem = this._childrenItemWindow.index();
        const item = this._childrenItemWindow._list[indexItem];
        if (Imported.MiniInformationWindow && item) {
            this._childrenItemWindow.setMiniWindow(item);
        }
    }

};
Scene_LL_HY.prototype.okChildrenItem = function () {//确定培养物品
    const indexItem = this._childrenItemWindow.index();
    this._item = this._childrenItemWindow._list[indexItem];
    if (this._item) {
        const index = this._chListWindow.index();
        this._children = this._chListWindow._list[index];
        this._hdType = 'Item';
        this._childrenPyWindow.deactivate();
        this._childrenOkWindow.refresh('Item', this._children, this._item);
        this._childrenItemWindow.hide();
        this._childrenItemWindow.deactivate();
        this._childrenOkWindow.show();
        this._childrenOkWindow.activate();
    }
    else {
        SoundManager.playBuzzer();
        this._childrenItemWindow.hide();
        this._childrenItemWindow.deactivate();
        this._childrenPyWindow.activate();
    };
};
Scene_LL_HY.prototype.cancelChildrenItem = function () {
    this._childrenPyWindow.activate();
    this._childrenItemWindow.hide();
    this._childrenItemWindow.deactivate();
};
Scene_LL_HY.prototype.createChlidrenMessageWindow = function () {
    const rect = this.chMessageWindowRect();
    this._chMessageWindow = new Window_ChildrenMessage(rect);
    this.addChild(this._chMessageWindow);
};
Scene_LL_HY.prototype.chMessageWindowRect = function () {
    const ww = 600;
    const wh = 320;
    const wx = 603;
    const wy = 327;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_LL_HY.prototype.createOkWindow = function () {
    const rect = this.okWindowRect();
    this._childrenOkWindow = new Window_ChildrenOk(rect);
    this._childrenOkWindow.setHandler("QD", this.QdChildrenHd.bind(this));
    this._childrenOkWindow.setHandler("QX", this.QxChildrenHd.bind(this));
    this._childrenOkWindow.setHandler("cancel", this.QxChildrenHd.bind(this));
    this.addChild(this._childrenOkWindow);
    this._childrenOkWindow.hide();
    this._childrenOkWindow.deactivate();
};
Scene_LL_HY.prototype.okWindowRect = function () {
    const ww = 400;
    const wh = 320;
    const wx = Graphics.width / 2 - ww / 2;
    const wy = Graphics.height / 2 - wh / 2 - 50;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_LL_HY.prototype.createChlidrenPyWindow = function () {
    const rect = this.chlidrenPyWindowRect();
    this._childrenPyWindow = new Window_ChildrenPy(rect);
    this._childrenPyWindow.setHandler("PY", this.ItemChildren.bind(this));
    this._childrenPyWindow.setHandler("BS", this.BsChildren.bind(this));
    this._childrenPyWindow.setHandler("CJ", this.CjChildren.bind(this));
    this._childrenPyWindow.setHandler("MC", this.McChildren.bind(this));
    this._childrenPyWindow.setHandler("SX", this.SxChildren.bind(this));
    this._childrenPyWindow.setHandler("HD", this.HdChildren.bind(this));
    this._childrenPyWindow.setHandler("YQ", this.YqChildren.bind(this));
    this._childrenPyWindow.setHandler("cancel", this.cancelPy.bind(this));
    this.addChild(this._childrenPyWindow);
    this._childrenPyWindow.select(-1);
    this._childrenPyWindow.deactivate();

};
Scene_LL_HY.prototype.chlidrenPyWindowRect = function () {
    const ww = 260;
    const wh = 280;
    const wx = 940;
    const wy = this.mainAreaTop();
    return new Rectangle(wx, wy, ww, wh);
};
Scene_LL_HY.prototype.BsChildren = function () {//出嫁
    this._childrenPyWindow.deactivate();
    this._childrenMenPaiWindow.show();
    this._childrenMenPaiWindow.activate();
};

Scene_LL_HY.prototype.CjChildren = function () {//出嫁
    const index = this._chListWindow.index();
    this._children = this._chListWindow._list[index];
    this._hdType = 'CJ';
    this._childrenPyWindow.deactivate();
    this._childrenOkWindow.refresh('CJ', this._children);
    this._childrenOkWindow.show();
    this._childrenOkWindow.activate();
};
Scene_LL_HY.prototype.HdChildren = function () {//互动
    this._childrenPyWindow.deactivate();
    const index = this._chListWindow.index();
    this._children = this._chListWindow._list[index];
    const name = this._children.name;
    var sRst = prompt("说点什么？", "");
    if (sRst) {
        $gameSystem.playChildrenMessage('\\C[0]我: \\C[3]' + sRst);
        $gameSystem.playChildrenMessage(name + ': ' + $gameSystem.childrenPlayerHd(sRst, name));
    }
    else {

    }
    this._childrenPyWindow.activate();
};
Scene_LL_HY.prototype.ItemChildren = function () {//培养
    this._childrenPyWindow.deactivate();
    this._childrenItemWindow.refresh();
    this._childrenItemWindow.show();
    this._childrenItemWindow.activate();
};
Scene_LL_HY.prototype.createChildrenInfo = function () {
    const rect = this.childrenInfoWindowRect();
    this._childrenInfoWindow = new Window_ChildrenInfo(rect);
    this.addChild(this._childrenInfoWindow);
};
Scene_LL_HY.prototype.childrenInfoWindowRect = function () {
    const ww = 900;
    const wh = 600;
    const wx = 300;
    const wy = 50;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_LL_HY.prototype.createChlidrenListWindow = function () {
    const rect = this.chListWindowRect();
    this._chListWindow = new Window_ChildrenList(rect);
    this._chListWindow.setHandler("ok", this.okChildren.bind(this));
    this._chListWindow.setHandler("cancel", this.popScene.bind(this));
    this._chListWindow.setChildrenInfo(this._childrenInfoWindow);
    this._chListWindow.setChildrenPy(this._childrenPyWindow);
    this.addChild(this._chListWindow);
    if (this._chListWindow._list.length > 0) {
        this._chListWindow.select(0);
        this._childrenPyWindow.show();
    }
    else {
        this._chListWindow.select(-1);
        this._childrenPyWindow.hide();
    };
};
Scene_LL_HY.prototype.chListWindowRect = function () {
    const ww = 200;
    const wh = 600;
    const wx = 100;
    const wy = 50;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_LL_HY.prototype.okChildren = function () {//确定孩子
    const index = this._chListWindow.index();
    const children = this._chListWindow._list[index];
    if (index > -1 && children) {
        this._chListWindow.deactivate();
        this._childrenPyWindow.select(0);
        this._childrenPyWindow.activate();
    } else {
        SoundManager.playBuzzer();
        this._chListWindow.activate();
    };
};
Scene_LL_HY.prototype.cancelPy = function () {
    this._chListWindow.activate();
    this._childrenPyWindow.deactivate();
    this._childrenPyWindow.deselect();
};
Scene_LL_HY.prototype.YqChildren = function (type) {//遗弃
    const index = this._chListWindow.index();
    const children = this._chListWindow._list[index];
    if (children) {
        if (type === 'Cj') {
            $gameSystem.removeChildren(children, 'Cj');
        }
        else if (type === 'Bs') {
            $gameSystem.removeChildren(children, 'Bs');
        }
        else if (type === 'maxYear') {
            $gameSystem.removeChildren(children, 'maxYear');
        } else {
            $gameSystem.removeChildren(children);
        }

    }
    this._chListWindow.contentsBack.clear();
    this._childrenInfoWindow.contentsBack.clear();
    //  this._childrenInfoWindow._childrenSprite.bitmap = '';
    this._chListWindow.contents.clear();
    this._childrenInfoWindow.contents.clear();
    this._chListWindow.refresh();
    if ($gameSystem._ChildrenList.length == 0) {
        this._chListWindow.select(-1);
    }
    else {
        this._chListWindow.select(0);
    }
    const child = this._chListWindow._list[this._chListWindow.index()];
    if (child) this._childrenInfoWindow.refresh(child);
    this._chListWindow.activate();
    this._childrenPyWindow.deactivate();
    this._childrenPyWindow.deselect();
};
Scene_LL_HY.prototype.SxChildren = function () {//双修
    const index = this._chListWindow.index();
    this._children = this._chListWindow._list[index];
    this._hdType = 'SX';
    this._childrenPyWindow.deactivate();
    this._childrenOkWindow.refresh('SX', this._children);
    this._childrenOkWindow.show();
    this._childrenOkWindow.activate();
};

Scene_LL_HY.prototype.McChildren = function () {//卖春
    const index = this._chListWindow.index();
    this._children = this._chListWindow._list[index];
    this._hdType = 'MC';
    this._childrenPyWindow.deactivate();
    this._childrenOkWindow.refresh('MC', this._children);
    this._childrenOkWindow.show();
    this._childrenOkWindow.activate();
};
Scene_LL_HY.prototype.QdChildrenHd = function () {//确定互动
    if (this._hdType === 'MC') {//打工
        const meiLi = Number(this._children.meiLi);
        const tiLi = Number(this._children.shenLi);
        if (meiLi >= 120 && tiLi >= 10) {
            this._children.shenLi -= 10;
            SoundManager.playUseItem();
            this._childrenInfoWindow.refresh(this._children);
            this._childrenPyWindow.activate();
            this._childrenOkWindow.hide();
            this._childrenOkWindow.deactivate();
            $gameSystem.playChildrenMessage(this._children.name + ': ' + $gameSystem.childrenMC());
            const itemId = FlyCat.LL_Hy.workReward[Math.floor((Math.random() * FlyCat.LL_Hy.workReward.length))];
            const item = $dataItems[itemId];
            $gameParty.gainItem(item, 1);
            $gameSystem.playChildrenMessage('\\C[0]系统: \\C[14]打工获得物品\\C[3]' + item.name);

        } else {
            $gameSystem.playChildrenMessage('\\C[0]系统: \\C[10]你当前的状态不适合打工');
            SoundManager.playBuzzer();
            this._childrenPyWindow.activate();
            this._childrenOkWindow.hide();
            this._childrenOkWindow.deactivate();
        }
    }
    else if (this._hdType === 'SX') {//双修
        const haoGanDu = Number(this._children.haoGanDu);
        const tiLi = Number(this._children.shenLi);
        const xianLing = Number(this._children.xianLing);
        if (haoGanDu >= 50 && tiLi >= 20 && xianLing >= 18) {
            this._children.shenLi -= 20;
            SoundManager.playUseItem();
            this._childrenInfoWindow.refresh(this._children);
            this._childrenPyWindow.activate();
            this._childrenOkWindow.hide();
            this._childrenOkWindow.deactivate();
            $gameSystem.playChildrenMessage(this._children.name + ': ' + $gameSystem.childrenSX());
            const itemId = FlyCat.LL_Hy.sxReward[Math.floor((Math.random() * FlyCat.LL_Hy.sxReward.length))];
            const item = $dataItems[itemId];
            $gameParty.gainItem(item, 1);
            $gameSystem.playChildrenMessage('\\C[0]系统: \\C[14]双修获得物品\\C[3]' + item.name);
            if (FlyCat.LL_Hy.nameVariable) $gameVariables.setValue(Number(FlyCat.LL_Hy.nameVariable), this._children.name);
            if (FlyCat.LL_Hy.xbVariable) $gameVariables.setValue(Number(FlyCat.LL_Hy.xbVariable), this._children.xingBie);
            if (FlyCat.LL_Hy.xgVariable) $gameVariables.setValue(Number(FlyCat.LL_Hy.xgVariable), this._children.xingGe);
            $gameTemp.reserveCommonEvent(Number(FlyCat.LL_Hy.sxEvent))
            this.popScene();

        } else {
            $gameSystem.playChildrenMessage('\\C[0]系统: \\C[10]你当前的状态不适合双修或仙龄不足18岁');
            SoundManager.playBuzzer();
            this._childrenPyWindow.activate();
            this._childrenOkWindow.hide();
            this._childrenOkWindow.deactivate();
        }
    }
    else if (this._hdType === 'Item' && this._item) {//培养
        SoundManager.playUseItem();
        const itemRate = Math.floor((Math.random() * 100) + 1);
        if (itemRate < 10) {
            $gameSystem.playChildrenMessage(this._children.name + ': ' + $gameSystem.childrenPyXh());
            $gameSystem.playChildrenMessage('\\C[0]系统: \\C[14]' + this._children.name + '非常喜欢这个物品！');
            this.addChildrenParam();
            this.addChildrenParam();
            this.addChildrenItemParam(1);
        }
        else if (itemRate < 50) {
            $gameSystem.playChildrenMessage(this._children.name + ': ' + $gameSystem.childrenPyBwbh());
            $gameSystem.playChildrenMessage('\\C[0]系统: \\C[14]' + this._children.name + '对这个物品不温不火！');
            this.addChildrenParam();
            this.addChildrenItemParam(2);
        } else {
            $gameSystem.playChildrenMessage(this._children.name + ': ' + $gameSystem.childrenPyBxh());
            $gameSystem.playChildrenMessage('\\C[0]系统: \\C[14]' + this._children.name + '极其讨厌这个物品！但还是收下了！');
            this.addChildrenItemParam(3);
        };
        $gameParty.loseItem(this._item, 1);
        $gameSystem.playChildrenMessage('\\C[0]系统: \\C[14]失去物品\\C[3]' + this._item.name);
        this._children.pyCounts += 1;
        if (this._children.pyCounts == 20) {
            this._children.pyCounts = 0;
            this._children.xianLing++;
        }
        this._childrenInfoWindow.refresh(this._children);
        this._childrenPyWindow.activate();
        this._childrenOkWindow.hide();
        this._childrenOkWindow.deactivate();
        /*新增2021.12.2*/
        if (this._children.xianLing >= 25) {
            this.YqChildren('maxYear');
        }
    }
    else if (this._hdType === 'CJ') {//出嫁
        const meiLi = Number(this._children.meiLi);
        const xianLing = Number(this._children.xianLing);
        if (xianLing >= 18) {
            SoundManager.playUseItem();
            $gameSystem.playChildrenMessage(this._children.name + ': ' + $gameSystem.childrenCj());
            const x = Math.floor(meiLi / 50) < 1 ? 1 : Math.floor(meiLi / 50);
            for (let i = 0; i < x; i++) {
                const itemId = FlyCat.LL_Hy.cjReward[Math.floor((Math.random() * FlyCat.LL_Hy.cjReward.length))];
                const item = $dataItems[itemId];
                $gameParty.gainItem(item, 1);
                $gameSystem.playChildrenMessage('\\C[0]系统: \\C[14]出嫁获得物品\\C[3]' + item.name);
            };
            this._childrenPyWindow.activate();
            this._childrenOkWindow.hide();
            this._childrenOkWindow.deactivate();
            this.YqChildren('Cj');
        } else {
            $gameSystem.playChildrenMessage('\\C[0]系统: \\C[10]你当前的状态不适合出嫁');
            SoundManager.playBuzzer();
            this._childrenPyWindow.activate();
            this._childrenOkWindow.hide();
            this._childrenOkWindow.deactivate();
        }
    }
    else if (this._hdType === 'BS') {//拜师
        const menPaiId = $gameTemp._menPaiId;
        if (menPaiId == 1) var mp = '外门弟子';
        if (menPaiId == 2) var mp = '内门弟子';
        if (menPaiId == 3) var mp = '真传弟子';
        const menPai = this._menPai;
        if (menPaiId > 0) {
            SoundManager.playUseItem();
            $gameSystem.playChildrenMessage('\\C[0]系统: \\C[3]' + this._children.name + '\\C[14]加入了\\C[3]' + menPai + '\\C[14]成为了\\C[3]' + mp);
            var itemList = [];
            if (menPai === '欢喜宗') var itemList = eval('FlyCat.LL_Hy.hxzReward_' + menPaiId);
            const itemId = itemList[Math.floor((Math.random() * itemList.length))];
            const item = $dataItems[itemId];
            if (item) {
                $gameParty.gainItem(item, 1);
                $gameSystem.playChildrenMessage('\\C[0]系统: \\C[14]拜师获得物品\\C[3]' + item.name);
            }
            this._childrenPyWindow.activate();
            this._childrenOkWindow.hide();
            this._childrenOkWindow.deactivate();
            this.YqChildren('Bs');
        } else {
            $gameSystem.playChildrenMessage('\\C[0]系统: \\C[10]你的资质不够无法拜入宗门');
            SoundManager.playBuzzer();
            this._childrenPyWindow.activate();
            this._childrenOkWindow.hide();
            this._childrenOkWindow.deactivate();
        }
    }
};
Scene_LL_HY.prototype.addChildrenItemParam = function (type) {
    if (this._item && this._item.meta.培养) {
        const itemMeta = this._item.meta.培养.split(',');
        var text = '';
        if (itemMeta[0] == '仙龄') {
            this._children.xianLing += Number(itemMeta[1]);
            var text = this._children.name + '服用了' + this._item.name + '仙龄增加\\C[3]' + Number(itemMeta[1]) + '\\C[14]岁';
        }
        if (itemMeta[0] == '外貌') {
            this._children.waiMao += Number(itemMeta[type]);
            var text = this._children.name + '服用了' + this._item.name + '外貌值增加\\C[3]' + Number(itemMeta[type]) + '\\C[14]点';
        }
        if (itemMeta[0] == '技艺') {
            this._children.meiLi += Number(itemMeta[type]);
            var text = this._children.name + '服用了' + this._item.name + '技艺值增加\\C[3]' + Number(itemMeta[type]) + '\\C[14]点';
        }
        if (itemMeta[0] == '悟性') {
            this._children.wuXing += Number(itemMeta[type]);
            var text = this._children.name + '服用了' + this._item.name + '悟性值增加\\C[3]' + Number(itemMeta[type]) + '\\C[14]点';
        }
        if (itemMeta[0] == '体力') {
            this._children.shenLi += Number(itemMeta[type]);
            var text = this._children.name + '服用了' + this._item.name + '体力值增加\\C[3]' + Number(itemMeta[type]) + '\\C[14]点';
        }
        if (itemMeta[0] == '福源') {
            this._children.fuYuan += Number(itemMeta[type]);
            var text = this._children.name + '服用了' + this._item.name + '福源值增加\\C[3]' + Number(itemMeta[type]) + '\\C[14]点';
        }
        if (itemMeta[0] == '胸围' && this._children.xingBie == '女') {
            this._children.xiongWei += Number(itemMeta[type]);
            var text = this._children.name + '服用了' + this._item.name + '胸围增加\\C[3]' + Number(itemMeta[type]) + '\\C[14]点';
        } else if (itemMeta[0] == '胸围' && this._children.xingBie == '男') {
            var text = '男孩子哪来的胸，胡闹！';

        }
        if (itemMeta[0] == '长短' && this._children.xingBie == '男') {
            this._children.changDuan += Number(itemMeta[type]);
            var text = this._children.name + '服用了' + this._item.name + '长短增加\\C[3]' + Number(itemMeta[type]) + '\\C[14]点';
        } else if (itemMeta[0] == '长短' && this._children.xingBie == '女') {
            var text = '女孩子哪来的小鸡鸡，胡闹！';
        }
        $gameSystem.playChildrenMessage('\\C[0]系统: \\C[14]' + text);
    }
};
Scene_LL_HY.prototype.addChildrenParam = function () {
    const param = [0, 1, 2, 3];
    const paramRate = param[Math.floor((Math.random() * param.length))];
    if (paramRate == 0) { var text = '技艺值增加\\C[3]1\\C[14]点'; this._children.meiLi += 1 };
    if (paramRate == 1) { var text = '悟性值增加\\C[3]1\\C[14]点'; this._children.wuXing += 1 };
    if (paramRate == 2) { var text = '体力值增加\\C[3]1\\C[14]点'; this._children.shenLi += 1 };
    if (paramRate == 3) { var text = '福源值增加\\C[3]1\\C[14]点'; this._children.fuYuan += 1 };
    $gameSystem.playChildrenMessage('\\C[0]系统: \\C[14]' + this._children.name + text);
    var text = '好感值增加\\C[3]1\\C[14]点';
    this._children.haoGanDu += 1;
    $gameSystem.playChildrenMessage('\\C[0]系统: \\C[14]' + this._children.name + text);
};
Scene_LL_HY.prototype.QxChildrenHd = function () {//取消互动
    this._childrenPyWindow.activate();
    this._childrenOkWindow.hide();
    this._childrenOkWindow.deactivate();
};
//////////////////////////////////////
function Window_ChildrenMenPai() {
    this.initialize(...arguments);
}

Window_ChildrenMenPai.prototype = Object.create(Window_Selectable.prototype);
Window_ChildrenMenPai.prototype.constructor = Window_ChildrenMenPai;

Window_ChildrenMenPai.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
};
Window_ChildrenMenPai.prototype.refresh = function () {
    this.contents.clear();
    this.contentsBack.clear();
    this.contents.fontSize = 20;
    this._list = ['\\C[23]【正派】\\C[0]傲天门', '\\C[23]【正派】\\C[0]灵兽宗', '\\C[10]【邪派】\\C[0]欢喜宗', '\\C[10]【邪派】\\C[0]血神阁', '\\C[24]【中立】\\C[0]雪月门', '\\C[24]【中立】\\C[0]凌霄宫'];
    if (this._list.length > 0) {
        this.drawAllItems();
    };
};
Window_ChildrenMenPai.prototype.drawItem = function (index) {
    const rect = this.itemLineRect(index);
    const menPai = this._list[index];
    if (menPai) {
        this.drawTextEx(menPai, rect.x, rect.y, this.width);
    }
};
Window_ChildrenMenPai.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_ChildrenMenPai.prototype.maxCols = function () {
    return 1;
};
Window_ChildrenMenPai.prototype.numVisibleRows = function () {
    return 6;
};
Window_ChildrenMenPai.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
///////////////////////////////////////
function Window_ChildrenItem() {
    this.initialize(...arguments);
}

Window_ChildrenItem.prototype = Object.create(Window_Selectable.prototype);
Window_ChildrenItem.prototype.constructor = Window_ChildrenItem;

Window_ChildrenItem.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
};
Window_ChildrenItem.prototype.refresh = function () {
    this.contents.clear();
    this.contentsBack.clear();
    this.contents.fontSize = 20;
    this._list = [];
    for (let i = 0; i < $gameParty.allItems().length; i++) {
        if ($gameParty.allItems()[i] && $gameParty.allItems()[i].meta.培养) {
            this._list.push($gameParty.allItems()[i])
        }
    }
    // this._list = $gameParty.allItems();
    if (this._list.length > 0) {
        this.drawAllItems();
    } else {
        this.select(-1);
        this.drawText('你身上空空如也', -10, this.height / 2 - 40, this.width, 'center')
    }
};
Window_ChildrenItem.prototype.drawItem = function (index) {
    const rect = this.itemLineRect(index);
    const item = this._list[index];
    if (item) {
        const iconIndex = item.iconIndex;
        const number = $gameParty.numItems(item);
        this.drawIcon(iconIndex, rect.x, rect.y, 36, 36);
        this.drawText(item.name, rect.x + 40, rect.y, this.width, 'left');
        this.drawText('X' + number, rect.x, rect.y, this.width - 50, 'right');
    }
};
Window_ChildrenItem.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_ChildrenItem.prototype.maxCols = function () {
    return 1;
};
Window_ChildrenItem.prototype.numVisibleRows = function () {
    return 6;
};
Window_ChildrenItem.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};

//////////////////////////////////////
function Window_ChildrenMessage() {
    this.initialize(...arguments);
}

Window_ChildrenMessage.prototype = Object.create(Window_Selectable.prototype);
Window_ChildrenMessage.prototype.constructor = Window_ChildrenMessage;

Window_ChildrenMessage.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    FlyCat.LL_Hy.Window_ChildrenMessage = this;
    this.opacity = 0;
};
Window_ChildrenMessage.prototype.refresh = function () {
    this.contents.clear();
    this.contentsBack.clear();
    this.contents.fontSize = 20;
    this._list = [];
    this._list = $gameSystem._ChildrenMessage;
    if (this._list.length >= 9) {
        this._list.splice(0, 1)
    }
    if (this._list.length > 0) {
        this.drawAllItems();
    };
};

Window_ChildrenMessage.prototype.drawItem = function (index) {
    const rect = this.itemLineRect(index);
    const message = this._list[index];
    if (message) {
        this.drawTextEx(message, rect.x, rect.y, this.width)
    };
};
Window_ChildrenMessage.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = 20;
    this.resetTextColor();
};
Window_ChildrenMessage.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_ChildrenMessage.prototype.maxCols = function () {
    return 1;
};
Window_ChildrenMessage.prototype.numVisibleRows = function () {
    return 8;
};
Window_ChildrenMessage.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};

//////////////////////////////////////
function Window_ChildrenOk() {
    this.initialize(...arguments);
}

Window_ChildrenOk.prototype = Object.create(Window_Command.prototype);
Window_ChildrenOk.prototype.constructor = Window_ChildrenOk;

Window_ChildrenOk.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
};
Window_ChildrenOk.prototype.refresh = function (type, children, item) {
    this._children = children;
    this._hdType = type;
    this._item = item ? item : null;
    this._offY = 0;
    this.height = 320;
    this._drawBackHeight = 150;
    this._numRow = 1;
    if (this._hdType === 'BS') {
        this._offY = 220;
        this.height = 510;
        this._numRow = 2;
        this._drawBackHeight = 370;
    }
    this.clearCommandList();
    this.makeCommandList();
    Window_Selectable.prototype.refresh.call(this);
    this.drawTextType();
};
// Window_ChildrenOk.prototype.drawBackgroundRect = function (rect) {
//     const c1 = ColorManager.textColor(8)//ColorManager.itemBackColor1();
//     const c2 = ColorManager.itemBackColor2();
//     const x = rect.x;
//     const y = rect.y;
//     const w = rect.width;
//     const h = rect.height;
//     this.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);
//     this.contentsBack.strokeRect(x, y, w, h, c1);
// };
Window_ChildrenOk.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = 20;
    this.resetTextColor();
};
Window_ChildrenOk.prototype.drawTextType = function () {
    this.drawBack(0, 0, this.width, this._drawBackHeight);
    const tili = Number(this._children.shenLi);
    const meili = Number(this._children.meiLi);
    const haogandu = Number(this._children.haoGanDu);
    const xianLing = Number(this._children.xianLing);
    var text = '';
    var text1 = '';
    var text2 = '';
    if (this._hdType === 'MC') {
        if (tili < 10) var text = '\\C[10]（体力值不够）'
        if (meili < 120) var text1 = '\\C[10]（技艺值不够）'
        this.drawTextEx('\\C[14]打工需要技艺值\\C[3]120\\C[14]点', 2, 2, this.width, 'left')
        this.drawTextEx('\\C[14]打工需消耗体力值\\C[3]10\\C[14]点', 2, 32, this.width, 'left')
        this.drawTextEx('\\C[14]当前技艺值: \\C[3]' + meili + '\\C[0]' + text1, 2, 62, this.width, 'left')
        this.drawTextEx('\\C[14]当前体力值: \\C[3]' + tili + '\\C[0]' + text, 2, 92, this.width, 'left')
    }
    else if (this._hdType === 'SX') {
        if (xianLing < 18) var text2 = '\\C[10]（仙龄不足18岁）';
        if (haogandu < 90) var text1 = '\\C[10]（好感度不够）';
        if (tili < 20) var text = '\\C[10]（体力值不够）'
        this.drawTextEx('\\C[14]需要仙龄:\\C[3]18\\C[14]岁\\C[0]' + text2, 2, 0, this.width, 'left')
        this.drawTextEx('\\C[14]双修需要好感度\\C[3]90\\C[14]点', 2, 32, this.width, 'left')
        this.drawTextEx('\\C[14]双修需消耗体力值\\C[3]20\\C[14]点', 2, 62, this.width, 'left')
        this.drawTextEx('\\C[14]当前好感度: \\C[3]' + haogandu + '\\C[0]' + text1, 2, 92, this.width, 'left')
        this.drawTextEx('\\C[14]当前体力值: \\C[3]' + tili + '\\C[0]' + text, 2, 122, this.width, 'left')

    }
    else if (this._hdType === 'Item' && this._item) {
        const name = this._item.name;
        this.drawTextEx('\\C[14]是否将\\C[3]' + name + '\\C[14]给予' + this._children.name, 2, 2, this.width, 'left')
        this.drawTextEx('\\C[10]注意：给予物品后有概率增加孩子属性', 2, 32, this.width, 'left')
        this.drawTextEx('\\C[10]注意：给予的物品无法收回！', 2, 62, this.width, 'left')
    }
    else if (this._hdType === 'CJ') {
        if (xianLing < 18) var text1 = '\\C[10]（仙龄不足18岁）';
        this.drawTextEx('\\C[14]出嫁需要仙龄\\C[3]18\\C[14]岁', 2, 2, this.width, 'left')
        this.drawTextEx('\\C[10]注意：出嫁后孩子将消失', 2, 32, this.width, 'left')
        this.drawTextEx('\\C[10]注意：出嫁奖励每50技艺值增加1种', 2, 62, this.width, 'left')
        this.drawTextEx('\\C[14]当前仙龄: \\C[3]' + xianLing + '\\C[0]' + text1, 2, 92, this.width, 'left')
    }
    else if (this._hdType === 'BS' && this._item) {
        this.contents.fillRect(0, 97, this.width, 3, ColorManager.textColor(4));
        this.contents.fillRect(0, 228, this.width, 3, ColorManager.textColor(4));
        this.contents.fillRect(0, 363, this.width, 3, ColorManager.textColor(4));
        this.zongMen(this._item)
    }
};
Window_ChildrenOk.prototype.zongMen = function (menPai) {
    $gameTemp._menPaiId = 0;
    const tiLi = Number(this._children.shenLi);
    const meiLi = Number(this._children.meiLi);
    const xingGe = this._children.xingGe;
    const ziSe = this._children.ziSe;
    const changDuan = this._children.changDuan;
    const lingGen = this._children.lingGen;
    const wuXing = this._children.wuXing;
    const fuYuan = this._children.fuYuan;
    const ziSeList = ['丑陋', '普通', '出众', '仙姿'];
    const xingGeList = ['开朗', '阴险', '色情', '忠诚'];
    switch (menPai) {
        case '欢喜宗':
            /*外门*/
            var text = ' \\C[14]√';
            var text1 = ' \\C[14]√';
            var text2 = ' \\C[14]√';
            this.drawTextEx('\\C[10]【邪】\\C[0]欢喜宗外门收徒标准：', 2, 2, this.width, 'left');
            const index = ziSeList.indexOf(ziSe);
            if (index < 2) var text = '\\C[10](姿色未达标)';
            if (meiLi < 50) var text1 = '\\C[10](技艺值不足50点)';
            this.drawTextEx('\\C[14]姿色要求：\\C[3]出众' + text, 2, 32, this.width, 'left');
            this.drawTextEx('\\C[14]技艺要求：\\C[3]50' + text1, 2, 62, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√') $gameTemp._menPaiId = 1;
            /*内门*/
            this.drawTextEx('\\C[10]【邪】\\C[0]欢喜宗内门收徒标准：', 2, 104, this.width, 'left');
            if (meiLi < 100) var text1 = '\\C[10](技艺值不足100点)';
            if (lingGen != '水') var text2 = '\\C[10](灵根不符合要求)';
            this.drawTextEx('\\C[14]姿色要求：\\C[3]出众' + text, 2, 134, this.width, 'left');
            this.drawTextEx('\\C[14]技艺要求：\\C[3]100' + text1, 2, 164, this.width, 'left');
            this.drawTextEx('\\C[14]灵根要求：\\C[3]水灵根' + text2, 2, 194, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√' && text2 === ' \\C[14]√') $gameTemp._menPaiId = 2;
            /*真传*/
            if (index < 3) var text = '\\C[10](姿色未达标)';
            if (meiLi < 200) var text1 = '\\C[10](技艺值不足200点)';
            this.drawTextEx('\\C[10]【邪】\\C[0]欢喜宗真传弟子收徒标准：', 2, 235, this.width, 'left');
            this.drawTextEx('\\C[14]姿色要求：\\C[3]仙姿' + text, 2, 265, this.width, 'left');
            this.drawTextEx('\\C[14]技艺要求：\\C[3]200' + text1, 2, 295, this.width, 'left');
            this.drawTextEx('\\C[14]灵根要求：\\C[3]水灵根' + text2, 2, 325, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√' && text2 === ' \\C[14]√') $gameTemp._menPaiId = 3;
            break;
        case '血神阁':
            /*外门*/
            var text = ' \\C[14]√';
            var text1 = ' \\C[14]√';
            var text2 = ' \\C[14]√';
            this.drawTextEx('\\C[10]【邪】\\C[0]血神阁外门收徒标准：', 2, 2, this.width, 'left');
            if (xingGe != '阴险') var text = '\\C[10](性格未达标)';
            if (changDuan == null) {
                var text1 = '\\C[10](性别不符合标准)';
            } else if (changDuan < 10) {
                var text1 = '\\C[10](长短不足10点)';
            }
            this.drawTextEx('\\C[14]性格要求：\\C[3]阴险' + text, 2, 32, this.width, 'left');
            this.drawTextEx('\\C[14]长短要求：\\C[3]10' + text1, 2, 62, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√') $gameTemp._menPaiId = 1;
            /*内门*/
            this.drawTextEx('\\C[10]【邪】\\C[0]血神阁内门收徒标准：', 2, 104, this.width, 'left');
            if (changDuan == null) {
                var text1 = '\\C[10](性别不符合标准)';
            } else if (changDuan < 20) {
                var text1 = '\\C[10](长短不足20点)';
            };
            if (lingGen != '火') var text2 = '\\C[10](灵根不符合要求)';
            this.drawTextEx('\\C[14]性格要求：\\C[3]阴险' + text, 2, 134, this.width, 'left');
            this.drawTextEx('\\C[14]长短要求：\\C[3]20' + text1, 2, 164, this.width, 'left');
            this.drawTextEx('\\C[14]灵根要求：\\C[3]火灵根' + text2, 2, 194, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√' && text2 === ' \\C[14]√') $gameTemp._menPaiId = 2;
            /*真传*/
            if (changDuan == null) {
                var text1 = '\\C[10](性别不符合标准)';
            } else if (changDuan < 30) {
                var text1 = '\\C[10](长短不足30点)';
            };
            var text2 = ' \\C[14]√';
            const htLingGen = ['火', '土'];
            if (htLingGen.indexOf(lingGen) == -1) var text2 = '\\C[10](灵根不符合要求)';
            this.drawTextEx('\\C[10]【邪】\\C[0]血神阁真传弟子收徒标准：', 2, 235, this.width, 'left');
            this.drawTextEx('\\C[14]性格要求：\\C[3]阴险' + text, 2, 265, this.width, 'left');
            this.drawTextEx('\\C[14]长短要求：\\C[3]30' + text1, 2, 295, this.width, 'left');
            this.drawTextEx('\\C[14]灵根要求：\\C[3]火/土灵根' + text2, 2, 325, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√' && text2 === ' \\C[14]√') $gameTemp._menPaiId = 3;
            break;
        case '傲天门':
            /*外门*/
            var text = ' \\C[14]√';
            var text1 = ' \\C[14]√';
            var text2 = ' \\C[14]√';
            this.drawTextEx('\\C[23]【正】\\C[0]傲天门外门收徒标准：', 2, 2, this.width, 'left');
            if (xingGe != '忠诚') var text = '\\C[10](性格未达标)';
            if (wuXing < 50) var text1 = '\\C[10](悟性不足50点)';
            this.drawTextEx('\\C[14]性格要求：\\C[3]忠诚' + text, 2, 32, this.width, 'left');
            this.drawTextEx('\\C[14]悟性要求：\\C[3]50' + text1, 2, 62, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√') $gameTemp._menPaiId = 1;
            /*内门*/
            var text2 = ' \\C[14]√'
            const htLingGen1 = ['金', '土']
            if (htLingGen1.indexOf(lingGen) == -1) var text2 = '\\C[10](灵根不符合要求)';
            if (wuXing < 70) var text1 = '\\C[10](悟性不足70点)';
            this.drawTextEx('\\C[23]【正】\\C[0]傲天门内门收徒标准：', 2, 104, this.width, 'left');
            this.drawTextEx('\\C[14]性格要求：\\C[3]忠诚' + text, 2, 134, this.width, 'left');
            this.drawTextEx('\\C[14]悟性要求：\\C[3]70' + text1, 2, 164, this.width, 'left');
            this.drawTextEx('\\C[14]灵根要求：\\C[3]金/土灵根' + text2, 2, 194, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√' && text2 === ' \\C[14]√') $gameTemp._menPaiId = 2;
            /*真传*/
            var text2 = ' \\C[14]√'
            const htLingGen2 = ['金', '天']
            if (htLingGen2.indexOf(lingGen) == -1) var text2 = '\\C[10](灵根不符合要求)';
            if (wuXing < 100) var text1 = '\\C[10](悟性不足100点)';
            this.drawTextEx('\\C[23]【正】\\C[0]傲天门真传弟子收徒标准：', 2, 235, this.width, 'left');
            this.drawTextEx('\\C[14]性格要求：\\C[3]忠诚' + text, 2, 265, this.width, 'left');
            this.drawTextEx('\\C[14]悟性要求：\\C[3]100' + text1, 2, 295, this.width, 'left');
            this.drawTextEx('\\C[14]灵根要求：\\C[3]天/金灵根' + text2, 2, 325, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√' && text2 === ' \\C[14]√') $gameTemp._menPaiId = 3;
            break;
        case '灵兽宗':
            /*外门*/
            var text = ' \\C[14]√'
            var text1 = ' \\C[14]√'
            var text2 = ' \\C[14]√'
            this.drawTextEx('\\C[23]【正】\\C[0]灵兽宗外门收徒标准：', 2, 2, this.width, 'left');
            if (xingGe != '开朗') var text = '\\C[10](性格未达标)';
            if (fuYuan < 50) var text1 = '\\C[10](福源不足50点)';
            this.drawTextEx('\\C[14]性格要求：\\C[3]开朗' + text, 2, 32, this.width, 'left');
            this.drawTextEx('\\C[14]福源要求：\\C[3]50' + text1, 2, 62, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√') $gameTemp._menPaiId = 1;
            /*内门*/
            this.drawTextEx('\\C[23]【正】\\C[0]灵兽宗内门收徒标准：', 2, 104, this.width, 'left');
            if (fuYuan < 70) var text1 = '\\C[10](福源不足70点)';
            if (lingGen != '木') var text2 = '\\C[10](灵根不符合要求)';
            this.drawTextEx('\\C[14]性格要求：\\C[3]开朗' + text, 2, 134, this.width, 'left');
            this.drawTextEx('\\C[14]福源要求：\\C[3]70' + text1, 2, 164, this.width, 'left');
            this.drawTextEx('\\C[14]灵根要求：\\C[3]木灵根' + text2, 2, 194, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√' && text2 === ' \\C[14]√') $gameTemp._menPaiId = 2;
            /*真传*/
            var text2 = ' \\C[14]√'
            const htLingGen3 = ['天', '木']
            if (fuYuan < 100) var text1 = '\\C[10](福源不100点)';
            if (htLingGen3.indexOf(lingGen) == -1) var text2 = '\\C[10](灵根不符合要求)';
            this.drawTextEx('\\C[23]【正】\\C[0]灵兽宗真传弟子收徒标准：', 2, 235, this.width, 'left');
            this.drawTextEx('\\C[14]性格要求：\\C[3]开朗' + text, 2, 265, this.width, 'left');
            this.drawTextEx('\\C[14]福源要求：\\C[3]100' + text1, 2, 295, this.width, 'left');
            this.drawTextEx('\\C[14]灵根要求：\\C[3]天/木灵根' + text2, 2, 325, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√' && text2 === ' \\C[14]√') $gameTemp._menPaiId = 3;
            break;
        case '雪月门':
            /*外门*/
            var text = ' \\C[14]√';
            var text1 = ' \\C[14]√';
            var text2 = ' \\C[14]√';
            this.drawTextEx('\\C[24]【中】\\C[0]雪月门外门收徒标准：', 2, 2, this.width, 'left');
            if (wuXing < 30) var text = '\\C[10](悟性不足30点)';
            if (fuYuan < 50) var text1 = '\\C[10](福源不足50点)';
            this.drawTextEx('\\C[14]悟性要求：\\C[3]30' + text, 2, 32, this.width, 'left');
            this.drawTextEx('\\C[14]福源要求：\\C[3]50' + text1, 2, 62, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√') $gameTemp._menPaiId = 1;
            /*内门*/
            this.drawTextEx('\\C[24]【中】\\C[0]雪月门内门收徒标准：', 2, 104, this.width, 'left');
            if (wuXing < 60) var text = '\\C[10](悟性不足60点)';
            if (fuYuan < 70) var text1 = '\\C[10](福源不足70点)';
            if (lingGen != '冰') var text2 = '\\C[10](灵根不符合要求)';
            this.drawTextEx('\\C[14]悟性要求：\\C[3]60' + text, 2, 134, this.width, 'left');
            this.drawTextEx('\\C[14]福源要求：\\C[3]70' + text1, 2, 164, this.width, 'left');
            this.drawTextEx('\\C[14]灵根要求：\\C[3]冰灵根' + text2, 2, 194, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√' && text2 === ' \\C[14]√') $gameTemp._menPaiId = 2;
            /*真传*/
            var text2 = ' \\C[14]√'
            const htLingGen4 = ['天', '冰']
            if (wuXing < 90) var text = '\\C[10](悟性不足90点)';
            if (fuYuan < 100) var text1 = '\\C[10](福源不100点)';
            if (htLingGen4.indexOf(lingGen) == -1) var text2 = '\\C[10](灵根不符合要求)';
            this.drawTextEx('\\C[24]【中】\\C[0]雪月门真传弟子收徒标准：', 2, 235, this.width, 'left');
            this.drawTextEx('\\C[14]悟性要求：\\C[3]90' + text, 2, 265, this.width, 'left');
            this.drawTextEx('\\C[14]福源要求：\\C[3]100' + text1, 2, 295, this.width, 'left');
            this.drawTextEx('\\C[14]灵根要求：\\C[3]天/冰灵根' + text2, 2, 325, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√' && text2 === ' \\C[14]√') $gameTemp._menPaiId = 3;
            break;
        case '凌霄宫':
            /*外门*/
            var text = ' \\C[14]√';
            var text1 = ' \\C[14]√';
            var text2 = ' \\C[14]√';
            this.drawTextEx('\\C[24]【中】\\C[0]凌霄宫外门收徒标准：', 2, 2, this.width, 'left');
            if (xingGe != '忠诚') var text = '\\C[10](性格未达标)';
            const index1 = ziSeList.indexOf(ziSe);
            if (index1 < 1) var text1 = '\\C[10](姿色未达标)';
            this.drawTextEx('\\C[14]性格要求：\\C[3]忠诚' + text, 2, 32, this.width, 'left');
            this.drawTextEx('\\C[14]姿色要求：\\C[3]普通' + text1, 2, 62, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√') $gameTemp._menPaiId = 1;
            /*内门*/
            this.drawTextEx('\\C[24]【中】\\C[0]凌霄宫内门收徒标准：', 2, 104, this.width, 'left');
            if (index1 < 2) var text1 = '\\C[10](姿色未达标)';
            if (lingGen != '水') var text2 = '\\C[10](灵根不符合要求)';
            this.drawTextEx('\\C[14]性格要求：\\C[3]忠诚' + text, 2, 134, this.width, 'left');
            this.drawTextEx('\\C[14]姿色要求：\\C[3]出众' + text1, 2, 164, this.width, 'left');
            this.drawTextEx('\\C[14]灵根要求：\\C[3]水灵根' + text2, 2, 194, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√' && text2 === ' \\C[14]√') $gameTemp._menPaiId = 2;
            /*真传*/
            var text2 = ' \\C[14]√';
            const htLingGen5 = ['天', '水'];
            if (index1 < 3) var text1 = '\\C[10](姿色未达标)';
            if (htLingGen5.indexOf(lingGen) == -1) var text2 = '\\C[10](灵根不符合要求)';
            this.drawTextEx('\\C[24]【中】\\C[0]凌霄宫真传弟子收徒标准：', 2, 235, this.width, 'left');
            this.drawTextEx('\\C[14]性格要求：\\C[3]忠诚' + text, 2, 265, this.width, 'left');
            this.drawTextEx('\\C[14]姿色要求：\\C[3]仙姿' + text1, 2, 295, this.width, 'left');
            this.drawTextEx('\\C[14]灵根要求：\\C[3]天/水灵根' + text2, 2, 325, this.width, 'left');
            if (text === ' \\C[14]√' && text1 === ' \\C[14]√' && text2 === ' \\C[14]√') $gameTemp._menPaiId = 3;
            break;
    }

};
Window_ChildrenOk.prototype.drawBack = function (x, y, w, h) {
    const c1 = ColorManager.textColor(15)//ColorManager.itemBackColor1();
    const c2 = ColorManager.itemBackColor2();
    this.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);
    this.contentsBack.strokeRect(x, y, w, h, c1);
};
Window_ChildrenOk.prototype.makeCommandList = function () {
    this.createContents();
    this.contents.fontSize = 24;
    this.addCommand('确定', 'QD', true);
    this.addCommand('取消', 'QX', true);
};
Window_ChildrenOk.prototype.maxItems = function () {
    return 2;
};
Window_ChildrenOk.prototype.rowSpacing = function () {
    return 10;
};
Window_ChildrenOk.prototype.numVisibleRows = function () {
    return 2;
};
Window_ChildrenOk.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / 4) / this._numRow;
};
Window_ChildrenOk.prototype.maxCols = function () {
    return 1;
};
Window_ChildrenOk.prototype.drawItem = function (index) {
    const rect = this.itemLineRect(index);
    const align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};
Window_ChildrenOk.prototype.itemRect = function (index) {
    const maxCols = this.maxCols();
    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight();
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const col = index % maxCols;
    const row = Math.floor(index / maxCols);
    const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
    const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY() + 150 + this._offY;
    const width = itemWidth - colSpacing;
    const height = itemHeight - rowSpacing;
    return new Rectangle(x, y, width, height);
};
//////////////////////////////////////
function Window_ChildrenPy() {
    this.initialize(...arguments);
}

Window_ChildrenPy.prototype = Object.create(Window_Command.prototype);
Window_ChildrenPy.prototype.constructor = Window_ChildrenPy;

Window_ChildrenPy.prototype.initialize = function (rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.opacity = 0;
};
Window_ChildrenPy.prototype.makeCommandList = function () {
    this.contents.fontSize = 20;
    this.addCommand('培养', 'PY', true);
    this.addCommand('拜师', 'BS', true);
    this.addCommand('出嫁', 'CJ', true);
    this.addCommand('打工', 'MC', true);
    this.addCommand('双修', 'SX', true);
    this.addCommand('互动', 'HD', true);
    this.addCommand('遗弃', 'YQ', true);
};
Window_ChildrenPy.prototype.maxItems = function () {
    return 7;
};
Window_ChildrenPy.prototype.rowSpacing = function () {
    return 10;
};
Window_ChildrenPy.prototype.numVisibleRows = function () {
    return 4;
};
Window_ChildrenPy.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
Window_ChildrenPy.prototype.maxCols = function () {
    return 2;
};


///////////////////////////孩子列表///////////////////////
function Window_ChildrenList() {
    this.initialize(...arguments);
}

Window_ChildrenList.prototype = Object.create(Window_Selectable.prototype);
Window_ChildrenList.prototype.constructor = Window_ChildrenList;

Window_ChildrenList.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    FlyCat.LL_Hy.Window_ChildrenList = this;
    this.activate();
    this.refresh();
};
Window_ChildrenList.prototype.refresh = function () {
    if (!$gameSystem._ChildrenList) {
        $gameSystem._ChildrenList = [];
    }
    this.contents.clear();
    this.contentsBack.clear();
    this.contents.fontSize = 20;
    this._list = [];
    this._list = $gameSystem._ChildrenList;
    if (this._list.length > 0) {
        this.drawAllItems();
    } else {
        if (this._childrenPyWindow) this._childrenPyWindow.hide();
        if (FlyCat.LL_Hy.Window_ChildrenMessage) FlyCat.LL_Hy.Window_ChildrenMessage.hide();
        this.drawText('你还没有孩子呢！', -10, this.height / 2 - 40, this.width, 'center')
        this.select(-1);
    }
};

Window_ChildrenList.prototype.drawItem = function (index) {
    const rect = this.itemLineRect(index);
    const children = this._list[index];
    if (children) {
        this.drawText(children.name, rect.x, rect.y, this.width, 'left')
    }
}

Window_ChildrenList.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_ChildrenList.prototype.maxCols = function () {
    return 1;
};
Window_ChildrenList.prototype.numVisibleRows = function () {
    return 10;
};
Window_ChildrenList.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
Window_ChildrenList.prototype.setChildrenInfo = function (object) {
    this._childrenInfoWindow = object;
};
Window_ChildrenList.prototype.setChildrenPy = function (object) {
    this._childrenPyWindow = object;
};

FlyCat.LL_Hy.Window_ChildrenList_select = Window_ChildrenList.prototype.select;
Window_ChildrenList.prototype.select = function (index) {
    FlyCat.LL_Hy.Window_ChildrenList_select.call(this, index)
    if (index >= 0 && index < this.maxItems() && index != this.lastselect) {
        const children = this._list[index];
        if (this._childrenInfoWindow && children) {
            this._childrenInfoWindow.refresh(children);
            $gameSystem.playChildrenMessage(children.name + ': ' + $gameSystem.childrenWH());

            this.lastselect = index;
        }
    }
};

function Window_ChildrenInfo() {
    this.initialize(...arguments);
}

Window_ChildrenInfo.prototype = Object.create(Window_Base.prototype);
Window_ChildrenInfo.prototype.constructor = Window_ChildrenInfo;

Window_ChildrenInfo.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._childrenBitmap = null;
    this._childrenLoading = false;
    // this._childrenSprite = new Sprite();
    // this.addChild(this._childrenSprite);
};
Window_ChildrenInfo.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (this._children && !this._childrenLoading) {
        this._childrenBitmap = ImageManager.loadBitmap('img/menu/', this._children.picture);
        while (!this._childrenLoading) {
            if (!this.updateLoading()) {
                return;
            } else {
                this._childrenLoading = true;
            }
        }
    }
    if (this._childrenLoading) {
        this.refresh_1();
    }
};
Window_Base.prototype.drawChildrenPicture = function (
    bitmaps, x, y, width, height
) {
    var scale = 1;
    var ofx = 0
    var ofy = 0;
    if (this._children.picture == '男孩' || this._children.picture == '女孩') {
        var scale = 0.56;
        var ofx = -50;
        var ofy = 50;
    }
    const bitmap = bitmaps;
    const pw = width;
    const ph = height;
    const dx = x + ofx;
    const dy = y + ofy;
    const sx = 0;
    const sy = 0;
    const scw = pw * scale;
    const sch = ph * scale;
    this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy, scw, sch);
};
Window_ChildrenInfo.prototype.updateLoading = function () {
    if (this._childrenBitmap && !this._childrenBitmap.isReady()) {
        return false;
    }
    return true;
}
Window_ChildrenInfo.prototype.refresh = function (children) {
    this._children = children;
    $gameSystem.setChildrenPicture(this._children);
    $gameSystem.setChildrenZiSe(this._children);
    this._childrenLoading = false;
};
Window_ChildrenInfo.prototype.refresh_1 = function () {
    var children = this._children;
    this.createContents();
    this.resetTextColor();
    if (this._childrenLoading) {
        this.drawChildrenPicture(this._childrenBitmap, 0, 0, this._childrenBitmap.width, this._childrenBitmap.height)
        // this._childrenSprite.bitmap = ImageManager.loadBitmap('img/menu/', this._children.picture);
        // this._childrenSprite.anchor.x = 0.5;
        // this._childrenSprite.anchor.y = 1;
        // // this._childrenSprite.scale.set(0.56);//0.38
        // this._childrenSprite.scale.x = 0.96;
        // this._childrenSprite.scale.y = 1;
        // this._childrenSprite.x = 152;
        // this._childrenSprite.y = 593;
        var x = 5;
        var y = 5;
        var w = 260;
        var h = 456;
        // this.contentsBack.strokeRect(x, y, w, h, ColorManager.textColor(4));
        const name = children.name;
        const xingBie = children.xingBie;
        const xingGe = children.xingGe;
        const ziSe = children.ziSe;
        const lingGen = children.lingGen;
        const haoGanDu = children.haoGanDu;
        const xianLing = children.xianLing;
        const meiLi = children.meiLi;
        const wuXing = children.wuXing;
        const shenLi = children.shenLi;
        const fuYuan = children.fuYuan;
        const changDuan = children.changDuan;
        const xiongWei = children.xiongWei;
        const waiMao = children.waiMao;
        // const menPai = children.menPai;
        x = x + 200 + 15 + 84 + 3;
        const textW = this.textWidth('好感：');
        this.changeTextColor(ColorManager.textColor(0));
        this.drawText('姓名：', x, y, this.width, 'left')
        this.changeTextColor(ColorManager.textColor(14));
        this.drawText(name, x + textW, y, this.width, 'left')

        this.changeTextColor(ColorManager.textColor(0));
        this.drawText('技艺：', x + 200, y, this.width, 'left')
        this.changeTextColor(ColorManager.textColor(14));
        this.drawText(meiLi, x + textW + 200, y, this.width, 'left')

        y += 36;
        this.changeTextColor(ColorManager.textColor(0));
        this.drawText('性别：', x, y, this.width, 'left')
        this.changeTextColor(ColorManager.textColor(14));
        this.drawText(xingBie, x + textW, y, this.width, 'left')

        this.changeTextColor(ColorManager.textColor(0));
        this.drawText('悟性：', x + 200, y, this.width, 'left')
        this.changeTextColor(ColorManager.textColor(14));
        this.drawText(wuXing, x + textW + 200, y, this.width, 'left')

        y += 36;
        this.changeTextColor(ColorManager.textColor(0));
        this.drawText('性格：', x, y, this.width, 'left')
        this.changeTextColor(ColorManager.textColor(14));
        this.drawText(xingGe, x + textW, y, this.width, 'left')

        this.changeTextColor(ColorManager.textColor(0));
        this.drawText('体力：', x + 200, y, this.width, 'left')
        this.changeTextColor(ColorManager.textColor(14));
        this.drawText(shenLi, x + textW + 200, y, this.width, 'left')

        y += 36;
        this.changeTextColor(ColorManager.textColor(0));
        this.drawText('姿色：', x, y, this.width, 'left')
        this.changeTextColor(ColorManager.textColor(14));
        this.drawText(ziSe, x + textW, y, this.width, 'left')

        this.changeTextColor(ColorManager.textColor(0));
        this.drawText('福源：', x + 200, y, this.width, 'left')
        this.changeTextColor(ColorManager.textColor(14));
        this.drawText(fuYuan, x + textW + 200, y, this.width, 'left')

        y += 36;
        this.changeTextColor(ColorManager.textColor(0));
        this.drawText('灵根：', x, y, this.width, 'left')
        this.changeTextColor(ColorManager.textColor(14));
        this.drawText(lingGen + '灵根', x + textW, y, this.width, 'left')

        this.changeTextColor(ColorManager.textColor(0));
        if (xiongWei != null) {
            this.drawText('胸围：', x + 200, y, this.width, 'left')
            this.changeTextColor(ColorManager.textColor(14));
            this.drawText(xiongWei, x + textW + 200, y, this.width, 'left');
        }
        else {
            this.drawText('长短：', x + 200, y, this.width, 'left')
            this.changeTextColor(ColorManager.textColor(14));
            this.drawText(changDuan, x + textW + 200, y, this.width, 'left');
        }
        y += 36;
        this.changeTextColor(ColorManager.textColor(0));
        this.drawText('仙龄：', x, y, this.width, 'left')
        this.changeTextColor(ColorManager.textColor(14));
        this.drawText(xianLing, x + textW, y, this.width, 'left');

        this.changeTextColor(ColorManager.textColor(0));
        this.drawText('好感：', x + 200, y, this.width, 'left')
        this.changeTextColor(ColorManager.textColor(14));
        this.drawText(haoGanDu, x + textW + 200, y, this.width, 'left')
        y += 36;
        this.changeTextColor(ColorManager.textColor(0));
        this.drawText('外貌：', x, y, this.width, 'left')
        this.changeTextColor(ColorManager.textColor(14));
        this.drawText(waiMao, x + textW, y, this.width, 'left');
        // this.changeTextColor(ColorManager.textColor(0));
        // this.drawText('门派：', x, y, this.width, 'left')
        // this.changeTextColor(ColorManager.textColor(14));
        // this.drawText(menPai, x + textW, y, this.width, 'left');
        y += 44;
        var x = 0;
        this.contents.fillRect(x + 298, y, this.width - 298, 3, ColorManager.textColor(4));
        // this.contents.fillRect(x + 285, y, 3, this.height / 2 + 30, ColorManager.textColor(4));
        this.contents.fillRect(x + 298, 0, 3, this.height, ColorManager.textColor(4));
        this.contents.fillRect(0, 0, 298, 3, ColorManager.textColor(4));
        this.contents.fillRect(0, 0, 3, this.height, ColorManager.textColor(4));
        this.contents.fillRect(0, this.height - 27, 298, 3, ColorManager.textColor(4));
    }
}