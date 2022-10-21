//=============================================================================
// RPG Maker MZ - 书信
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<书信>
 * @author FlyCat
 * 
 * @param x
 * @type number
 * @default 200
 * @text 通讯图标X位置
 * @desc 通讯图标X位置
 * 
 * @param y
 * @type number
 * @default 100
 * @text 通讯图标Y位置
 * @desc 通讯图标Y位置
 * 
 * @command openLetterWindow
 * @text 打开书信系统
 * @desc 打开书信系统
 * 
 * @command hideLetterImg
 * @text 隐藏通讯图标
 * @desc 隐藏通讯图标
 *
 * @arg type
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @default 
 * @text 显示/隐藏
 * @desc true/false
 * 
 * @command ssLetterImg
 * @text 闪烁通讯图标
 * @desc 闪烁通讯图标
 *
 * @arg type
 * @type boolean
 * @on 闪烁
 * @off 不闪烁
 * @default 
 * @text 闪烁/不闪烁
 * @desc true/false
 * 
 * @help
 */
'use strict';
var Imported = Imported || {};
Imported.FlyCat_Letter = true;

var FlyCat = FlyCat || {};
FlyCat.Letter = {};
FlyCat.Letter.parameters = PluginManager.parameters('FlyCat_Letter');
FlyCat.Letter.x = Number(FlyCat.Letter.parameters['x'] || 200);
FlyCat.Letter.y = Number(FlyCat.Letter.parameters['y'] || 100);

PluginManager.registerCommand('FlyCat_Letter', 'openLetterWindow', args => {
    SceneManager.push(Scene_Letter);
});
PluginManager.registerCommand('FlyCat_Letter', 'hideLetterImg', args => {
    $gameParty.hideLetter(args.type);
});
PluginManager.registerCommand('FlyCat_Letter', 'ssLetterImg', args => {
    $gameParty.ssLetter(args.type);
});
Game_Party.prototype.hideLetter = function (type) {
    const TF = eval(type);
    $gameSystem._letterButtonVisible = TF;
};
Game_Party.prototype.ssLetter = function (type) {
    const TF = eval(type);
    $gameSystem._letterButtonSs = TF;
};
Scene_Base.prototype.startLetter = function () {
    if (!$gameSystem._LetterData) {
        $gameSystem._LetterData = [];
    };
};
FlyCat.Letter.Scene_Map_initialize = Scene_Map.prototype.initialize;
Scene_Map.prototype.initialize = function () {
    FlyCat.Letter.Scene_Map_initialize.call(this);
    this.startLetter();
};
FlyCat.Letter.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function () {
    FlyCat.Letter.Scene_Map_start.call(this);
    Input.keyMapper['86'] = 'v';
    this.createLetterWindows();
}
FlyCat.Letter.Scene_Map_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
Scene_Map.prototype.isAnyButtonPressed = function () {
    return this._letterButton && this._letterButton.isPressed() ||
        FlyCat.Letter.Scene_Map_isAnyButtonPressed.call(this);
};
Scene_Map.prototype.createLetterWindows = function () {
    if ($gameSystem._letterButtonVisible != false) {
        $gameSystem._letterButtonVisible = true;
    }
    this._letterButton = new Sprite_letterButton();
    this.addChild(this._letterButton)
    this._letterButton.bitmap = ImageManager.loadSystem("CY");
    this._letterButton.setClickHandler(this.openLetter.bind(this));
    this._letterButton.x = FlyCat.Letter.x;
    this._letterButton.y = FlyCat.Letter.y;
};
Scene_Map.prototype.openLetter = function () {
    SoundManager.playOk();
    if ($gameTemp._setNpcText) {
        SceneManager.push(Scene_LetterNpc);
    } else {
        SceneManager.push(Scene_Letter);
    }

};
FlyCat.Letter.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function () {
    FlyCat.Letter.Scene_Map_update.call(this);
    if (this._letterButton && this._letterButton.visible == true) {
        if (Input.isTriggered('v')) {
            this.openLetter();
        };
    }
    if (this._letterButton) {
        if ($gameSystem._letterButtonVisible == true) {
            this._letterButton.visible = true;
        } else if ($gameSystem._letterButtonVisible == false) {
            this._letterButton.visible = false;
        }
        if ($gameSystem._letterButtonSs == true) {
            if (this._letterUp) {
                this._letterButton.opacity += 10;
                if (this._letterButton.opacity >= 255) {
                    this._letterUp = false;
                }
            } else {
                this._letterButton.opacity -= 10;
                if (this._letterButton.opacity <= 0) {
                    this._letterUp = true;
                }
            }
        } else {
            this._letterButton.opacity = 255;
        }
    }
};
FlyCat.Letter.Scene_LL_HY_initialize = Scene_LL_HY.prototype.initialize;
Scene_LL_HY.prototype.initialize = function () {
    FlyCat.Letter.Scene_LL_HY_initialize.call(this);
    this.startLetter();
};
FlyCat.Letter.Game_System_removeChildren = Game_System.prototype.removeChildren;
Game_System.prototype.removeChildren = function (children, type) {
    if (type === 'Cj' || type === 'Bs' || type === 'maxYear') {
        const actor = JsonEx.makeDeepCopy(children);
        actor.letterText = [];
        $gameSystem._LetterData.push(actor);
    };
    FlyCat.Letter.Game_System_removeChildren.call(this, children, type);
};
Game_System.prototype.playLetterMessage = function (message, item, type) {
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
        item.letterText.push('\\C[0]' + time + ' ' + item.name + ':  ' + $gameSystem.LetterPlayerHd(message, item));
        SceneManager._scene._infoWindow.refresh(item);
    }
};

Game_System.prototype.LetterPlayerHd = function (text, item) {//正常对话
    const playerMessage = text;

    /*通用类型*/
    const data1 = ['你好', 'hello', 'hi', '好'];//打招呼类型
    const data1_1 = ['母亲大人安好', '母亲大人好', '母亲，有什么要事吗？', '母亲大人，难得找孩儿。'];//孩子回复话术
    var include = data1.includes(playerMessage);
    if (include == true) return '\\C[14]' + data1_1[Math.floor((Math.random() * data1_1.length))];

    const data2 = ['名字', '你叫', '你是谁', '你是'];//你是谁类型
    const data2_1 = ['孩儿是' + item.name];//孩子回复话术
    var include = data2.includes(playerMessage);
    if (include == true) return '\\C[14]' + data2_1[Math.floor((Math.random() * data2_1.length))];

    const data5 = ['性格'];//性格类型
    const data5_1 = ['我的性格是' + item.xingGe];//孩子回复话术
    var include = data5.includes(playerMessage);
    if (include == true) return '\\C[14]' + data5_1[Math.floor((Math.random() * data5_1.length))];

    const data6 = ['年龄', '几岁', '多大', '你几岁了', '你多大'];//年龄类型
    const data6_1 = ['我今年' + item.xianLing + '岁'];//孩子回复话术
    var include = data6.includes(playerMessage);
    if (include == true) return '\\C[14]' + data6_1[Math.floor((Math.random() * data6_1.length))];

    const data7 = ['男女', '性别', '你是男是女', '你的性别是什么', '你女的'];//性别类型
    const data7_1 = ['我的性别是' + item.xingBie];//孩子回复话术
    var include = data7.includes(playerMessage);
    if (include == true) return '\\C[14]' + data7_1[Math.floor((Math.random() * data7_1.length))];

    /*男女性格类型*/
    if (item.xingBie == "男") {
        /*男通用*/
        const data4 = ['妈妈', '叫妈妈', '妈'];//叫妈妈类型
        const data4_1 = ['妈妈爱我', '妈妈我要', '好想要啊妈妈', '妈妈好厉害'];//孩子回复话术
        var include = data4.includes(playerMessage);
        if (include == true) return '\\C[14]' + data4_1[Math.floor((Math.random() * data4_1.length))];

        /*男性格区分*/
        if (item.xingGe == "开朗") {


        } else if (item.xingGe == "阴险") {

        }
        else if (item.xingGe == "色情") {

        } else {//忠诚

        }
    } else {

        /*女通用*/
        const data3 = ['爸爸', '叫爸爸', '爸'];//叫爸爸类型
        const data3_1 = ['爸爸爱我', '爸爸我要', '好想要你啊爸爸', '爸爸好厉害'];//孩子回复话术
        var include = data3.includes(playerMessage);
        if (include == true) return '\\C[14]' + data3_1[Math.floor((Math.random() * data3_1.length))];

        /*女性格区分*/
        if (item.xingGe == "开朗") {

        } else if (item.xingGe == "阴险") {

        }
        else if (item.xingGe == "色情") {

        } else {//忠诚

        }
    }


    ////自行添加攻略////仿照下列各式只需修改xxx  yyy 名字相同即可  xxx yyy 自定义命名即可
    // const xxx = ['妈妈', '叫妈妈', '妈'];//玩家打字的概括，模糊搜索
    // const yyy = ['妈妈爱我', '妈妈我要', '好想要啊妈妈', '妈妈好厉害'];//孩子回复的话术
    // var include = xxx.includes(playerMessage);
    // if (include == true) return '\\C[23]' + yyy[Math.floor((Math.random() * yyy.length))];

    return '\\C[14]我没有听懂，请再说一遍！';

};
Game_System.prototype.LetterPeopleLastText = function (item) {//
    const xingGe = item.xingGe;
    const xingBie = item.xingBie;
    const haogandu = item.haoGanDu;
    var reward = [];
    /*寄信*/
    if (xingBie == "男") {
        /*男性格区分*/
        if (xingGe == "开朗") {
            if (haogandu < 50) {//好感度小于50
                var data = ['忽然想起母亲，离家多日，给母亲送个小礼物。', '母亲，许久未见，也不曾来找孩儿，怕已经忘记孩儿。', '好久不见，赠与母亲。', '母亲可曾想念过孩儿？', '母亲，外面那么大，却无人会等待孩儿，好寂寞。', '母亲，这可能是最后一次...不知孩儿能不能福大命大逃离秘境。'];//自动联系话术
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else if (haogandu < 100) {//好感度小于100
                var data = ['母亲，我在桃花村，这里漫天桃花飘荡真是美不胜收。', '母亲，师傅允许我下山了。', '母亲，鬼蜮这地方甚至怪异，常人很难继续待着。', '母亲，师傅说我进度很快。', '母亲，想念你的手艺了。', '母亲，什么时候能再次见到您？']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 20;//20%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else if (haogandu < 150) {//好感度小于150
                var data = ['母亲，我总忍不住想念您。', '母亲，小师妹今天送给我很多糕点。', '母亲，师母带我极好。', '母亲，最近有异象，师傅总算离开师门出去了。', '母亲，师母的胸真柔软。', '母亲，小师妹的身体真舒服，而且还见红了，我心情不错。', '母亲，今天和小师妹在一起的时候被师兄看到了，他表情好奇怪。', '母亲，...母亲也应该很舒服吧... ...']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 30;//30%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else { //好感度大于等于150
                var data = ['母亲，你会想念我吗？', '母亲，我总会想起你那时候的声音。', '母亲， 我不在家的时间你想我吗？', '母亲，小师妹最近都缠着我，但是更想念你。', '母亲，今天师母抱着我的时候，我总忍不住想起你。', '母亲，想回到你身边，抱紧你。']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 40;//40%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            }

        } else if (xingGe == "阴险") {
            if (haogandu < 50) {//好感度小于50
                var data = ['母亲，可安好。', '母亲，终究是孩子太多了，我可有可无。', '母亲，你好狠。','母亲，好想看到你伤心的样子是不是和想象中一样美。', '母亲，好想紧紧的掐着你的脖子。', '母亲，再见了... ...']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else if (haogandu < 100) {//好感度小于100
                var data = ['母亲，最近也还好吗？', '母亲，孩儿所在的门派盛产某些灵果，孩儿得空寄给你一些。','母亲，掌门对我很好。','母亲，哈，掌门的秘密我知道了。','母亲，你不知道掌门现在门派里孤立无援的样子真好看。']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 20;//20%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else if (haogandu < 150) {//好感度小于150
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 30;//30%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else { //好感度大于等于150
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 40;//40%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            }
        }
        else if (xingGe == "色情") {
            if (haogandu < 50) {//好感度小于50
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else if (haogandu < 100) {//好感度小于100
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else if (haogandu < 150) {//好感度小于150
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else { //好感度大于等于150
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            }
        } else {//忠诚
            if (haogandu < 50) {//好感度小于50
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else if (haogandu < 100) {//好感度小于100
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else if (haogandu < 150) {//好感度小于150
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else { //好感度大于等于150
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            }
        }
    } else {
        /*女性格区分*/
        if (xingGe == "开朗") {
            if (haogandu < 50) {//好感度小于50
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else if (haogandu < 100) {//好感度小于100
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else if (haogandu < 150) {//好感度小于150
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else { //好感度大于等于150
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            }

        } else if (xingGe == "阴险") {
            if (haogandu < 50) {//好感度小于50
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else if (haogandu < 100) {//好感度小于100
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else if (haogandu < 150) {//好感度小于150
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else { //好感度大于等于150
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            }
        }
        else if (xingGe == "色情") {
            if (haogandu < 50) {//好感度小于50
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else if (haogandu < 100) {//好感度小于100
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else if (haogandu < 150) {//好感度小于150
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else { //好感度大于等于150
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            }
        } else {//忠诚
            if (haogandu < 50) {//好感度小于50
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else if (haogandu < 100) {//好感度小于100
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else if (haogandu < 150) {//好感度小于150
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            } else { //好感度大于等于150
                var data = ['今日心情好就给母亲回个信', '母亲这么久也不给孩儿来信，怕是已经忘了孩儿']
                /*奖励设置↓*/
                var rate = Math.floor(Math.random() * (100 - 1) + 1);
                var itemRate = 10;//10%出现物品奖励概率
                var itemReward = [$dataItems[2]/*止血草*/, $dataItems[3]/*活血散*/, $dataItems[5]/*活血散*/];//奖励物品
                var weaponReward = [$dataWeapons[1]/*刺猬鞭*/, $dataWeapons[2]/*流金鞭*/, $dataWeapons[3]/*幻金鞭*/];//奖励武器
                var armorReward = [$dataArmors[2]/*肚兜*/, $dataArmors[3]/*凌霄宫道服*/, $dataArmors[4]/*红旗袍*/];//奖励护甲
                /*如果是单独奖励的话，就直接 var armorReward =[]即可不设置该类别奖励*/
                if (rate <= itemRate) { //满足奖励条件
                    var reward = itemReward.concat(weaponReward).concat(armorReward);//当前奖池
                }
                /*奖励设置↑*/
            }
        }
    }

    return ['\\C[14]' + data[Math.floor((Math.random() * data.length))], reward];
};
function Scene_Letter() {
    this.initialize(...arguments);
}

Scene_Letter.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Letter.prototype.constructor = Scene_Letter;

Scene_Letter.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
    $gameTemp._setNpcText = false;
    this._sceneType = 0;
    this.startLetter();
    $gameSystem._letterButtonSs = false;
    this._lastIndex = null;
};
//开始

Scene_Letter.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createtypeListWindow();
    this.createChlidrenListWindow();
    this.createBackWindow();
    this.createInfoWindow();
    this.createCommandWindow();
    this._childrenSprite = new Sprite();
    this.addChild(this._childrenSprite);
    this._childrenSprite.anchor.set(0.5);
    this._childrenSprite.x = 1087;
    this._childrenSprite.y = 348;
    const width = 490;
    const height = 140;
    const x = 308;
    const y = 503;
    Graphics._addInput("text", x, y, width, height, 22);
    Graphics._textarea.value = '再此输入内容';
};
Scene_Letter.prototype.createtypeListWindow = function () {
    const rect = this.typeListWindowRect();
    this._typeListWindow = new Window_TypeListCommand(rect);
    this._typeListWindow.setHandler('ok', this.onTypelist.bind(this));
    this._typeListWindow.setHandler("cancel", this.cancelTypeList.bind(this));
    this.addChild(this._typeListWindow);
    this._typeListWindow.activate();
    if (this._sceneType == 0) {
        this._typeListWindow.select(0);
    } else {
        this._typeListWindow.select(1);
    }
};
Scene_Letter.prototype.onTypelist = function () {
    const index = this._typeListWindow.index();
    if (index == 0) {
        if (this._sceneType == 0) {
            if (this._chListWindow._list.length > 0) {
                this._typeListWindow.deactivate();
                this._chListWindow.activate();
                this._chListWindow.select(0);
            } else {
                this._typeListWindow.activate();
                SoundManager.playBuzzer();
            }

        } else {
            SceneManager.goto(Scene_Letter)
        }
    } else {
        if (this._sceneType == 1) {
            if (this._chListWindow._list.length > 0) {
                this._typeListWindow.deactivate();
                this._chListWindow.activate();
                this._chListWindow.select(0);
            } else {
                this._typeListWindow.activate();
                SoundManager.playBuzzer();
            }
        } else {
            SceneManager.goto(Scene_LetterNpc)
        };
    }
};
Scene_Letter.prototype.cancelTypeList = function () {
    Graphics._removeInput();
    SceneManager.goto(Scene_Map);
};
Scene_Letter.prototype.typeListWindowRect = function () {
    const ww = 300;
    const wh = 55;
    const wx = 0;
    const wy = 0;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_Letter.prototype.createCommandWindow = function () {
    const rect = this.CommandWindowRect();
    this._commandWindow = new Window_LetterCommand(rect);
    this._commandWindow.setHandler('ok', this.selectCommand.bind(this));
    this._commandWindow.setHandler("cancel", this.cancelCommand.bind(this));
    this.addChild(this._commandWindow);
};
Scene_Letter.prototype.selectCommand = function () {
    const index = this._commandWindow.index();
    if (index == 0) {
        const text = Graphics._textarea.value;
        const indexs = this._chListWindow.index();
        const people = this._chListWindow._list[indexs];
        $gameSystem.playLetterMessage(text, people, 0)
        this._commandWindow.activate();
        Graphics._textarea.value = '';
        const pagination = Math.floor((people.letterText.length + 1) / 8);
        this._infoWindow.smoothScrollDown(pagination * 8);
    } else {
        this.cancelCommand();
    }
};
Scene_Letter.prototype.cancelCommand = function () {
    this._commandWindow.deactivate();
    this._commandWindow.deselect();
    this._chListWindow.activate();
    Graphics._textarea.blur();
};
Scene_Letter.prototype.CommandWindowRect = function () {
    const ww = 130;
    const wh = 160;
    const wx = 800;
    const wy = 495;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_Letter.prototype.createInfoWindow = function () {
    const rect = this.infoWindowRect();
    this._infoWindow = new Window_LetterInfo(rect);
    this.addChild(this._infoWindow);
};
Scene_Letter.prototype.infoWindowRect = function () {
    const ww = 630;
    const wh = 440;
    const wx = 300;
    const wy = 55;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_Letter.prototype.createBackWindow = function () {
    const rect = this.backWindowRect();
    this._backWindow = new Window_InputBack(rect);
    this.addChild(this._backWindow);
    const rects = this.back1WindowRect();
    this._back1Window = new Window_InputBack(rects);
    this.addChild(this._back1Window);
};
Scene_Letter.prototype.backWindowRect = function () {
    const ww = 630;
    const wh = 160;
    const wx = 300;
    const wy = 495;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_Letter.prototype.back1WindowRect = function () {
    const ww = 314;
    const wh = 600;
    const wx = 930;
    const wy = 55;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_Letter.prototype.createChlidrenListWindow = function () {
    const rect = this.chListWindowRect();
    this._chListWindow = new Window_LetterChildrenList(rect);
    this._chListWindow.setHandler("ok", this.okChildren.bind(this));
    this._chListWindow.setHandler("cancel", this.cancelChildren.bind(this));
    this.addChild(this._chListWindow);
    this._chListWindow.deactivate();
    if (this._chListWindow._list.length > 0) {
        this._chListWindow.select(0);
        this._chListWindow.activate();
        this._typeListWindow.deactivate();
    } else {
        this._chListWindow.deactivate();
        this._chListWindow.deselect();
    }
};
Scene_Letter.prototype.cancelChildren = function () {
    this._chListWindow.deactivate();
    this._chListWindow.deselect();
    this._typeListWindow.activate();
    this._typeListWindow.select(this._sceneType)
};
Scene_Letter.prototype.popScene = function () {
    Graphics._removeInput();
    SceneManager.pop();
};
Scene_Letter.prototype.chListWindowRect = function () {
    const ww = 300;
    const wh = 600;
    const wx = 0;
    const wy = 55;
    return new Rectangle(wx, wy, ww, wh);
};
Scene_Letter.prototype.okChildren = function () {
    const index = this._chListWindow.index();
    const people = this._chListWindow._list[index];
    if (people) {
        this._typeListWindow.deactivate();
        this._commandWindow.activate();
        this._commandWindow.select(0);
        this._chListWindow.deactivate();
        this._infoWindow.refresh(people);
        Graphics._textarea.select();
    } else {
        this._chListWindow.activate();
        SoundManager.playBuzzer();
    }
};
Scene_Letter.prototype.update = function () {
    Scene_MenuBase.prototype.update.call(this);
    if (this._chListWindow) {
        const index = this._chListWindow.index();
        const people = this._chListWindow._list[index];
        if (people && this._lastIndex != index) {
            const rate = Math.floor(Math.random() * (100 - 1) + 1);//1-100 概率
            if (rate < 10) {//10%自动说话
                var text = $gameSystem.LetterPeopleLastText(people);
                $gameSystem.playLetterMessage(text[0], people, 1)
                if (text[1] && text[1].length > 0) {
                    const item = text[1][Math.floor((Math.random() * text[1].length))];
                    var text1 = '\\C[14]孩儿给母亲送了一些\\C[3]' + item.name + '\\C[14]希望母亲喜欢';
                    $gameParty.gainItem(item, 1);//给予该物品1个
                    $gameSystem.playLetterMessage(text1, people, 1);
                }
            }
            this._infoWindow.refresh(people);
            const pagination = Math.floor((people.letterText.length + 1) / 8);
            this._infoWindow.smoothScrollDown(pagination * 8);
            this._childrenSprite.bitmap = ImageManager.loadBitmap('img/menu/', people.picture);
            this._lastIndex = index;
        } else if (!people) {
            this._childrenSprite.bitmap = '';
        }
    }
};
function Window_TypeListCommand() {
    this.initialize(...arguments);
}

Window_TypeListCommand.prototype = Object.create(Window_Selectable.prototype);
Window_TypeListCommand.prototype.constructor = Window_TypeListCommand;

Window_TypeListCommand.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._list = [];
    this.opacity = 255;
    this.refresh();
};
Window_TypeListCommand.prototype.refresh = function () {
    this.createContents();
    this._list = [];
    this._list = ['孩子', 'Npc'];
    this.drawAllItems();
};
Window_TypeListCommand.prototype.drawItem = function (index) {
    this.contents.fontSize = 22;
    const rect = this.itemLineRect(index);
    const type = this._list[index];
    if (type) {
        this.resetTextColor();
        this.drawText(type, rect.x, rect.y, this.itemWidth() - this.contents.fontSize, 'center');
    };
};
Window_TypeListCommand.prototype.maxCols = function () {
    return 2;
};
Window_TypeListCommand.prototype.numVisibleRows = function () {
    return 1;
};
Window_TypeListCommand.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_TypeListCommand.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
function Window_LetterCommand() {
    this.initialize(...arguments);
}

Window_LetterCommand.prototype = Object.create(Window_Selectable.prototype);
Window_LetterCommand.prototype.constructor = Window_LetterCommand;

Window_LetterCommand.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._list = [];
    this.opacity = 255;
    this.refresh();
};
Window_LetterCommand.prototype.refresh = function () {
    this.createContents();
    this._list = [];
    this._list = ['发送', '返回'];
    this.drawAllItems();
};
Window_LetterCommand.prototype.drawItem = function (index) {
    this.contents.fontSize = 26;
    const rect = this.itemLineRect(index);
    const type = this._list[index];
    if (type) {
        this.resetTextColor();
        this.drawText(type, rect.x, rect.y, this.itemWidth() - this.contents.fontSize, 'center');
    };
};
Window_LetterCommand.prototype.maxCols = function () {
    return 1;
};
Window_LetterCommand.prototype.numVisibleRows = function () {
    return 2;
};
Window_LetterCommand.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_LetterCommand.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
Window_LetterCommand.prototype.processCursorMove = function () {
    if (this.isCursorMovable()) {
        const lastIndex = this.index();
        if (Input.isRepeated("down")) {
            if (Graphics._textarea._onWindow) return;
            this.cursorDown(Input.isTriggered("down"));
        }
        if (Input.isRepeated("up")) {
            if (Graphics._textarea._onWindow) return;
            this.cursorUp(Input.isTriggered("up"));
        }
        if (Input.isRepeated("right")) {
            if (Graphics._textarea._onWindow) return;
            this.cursorRight(Input.isTriggered("right"));
        }
        if (Input.isRepeated("left")) {
            if (Graphics._textarea._onWindow) return;
            this.cursorLeft(Input.isTriggered("left"));
        }
        if (!this.isHandled("pagedown") && Input.isTriggered("pagedown")) {
            if (Graphics._textarea._onWindow) return;
            this.cursorPagedown();
        }
        if (!this.isHandled("pageup") && Input.isTriggered("pageup")) {
            if (Graphics._textarea._onWindow) return;
            this.cursorPageup();
        }
        if (this.index() !== lastIndex) {
            if (Graphics._textarea._onWindow) return;
            this.playCursorSound();
        }
    }
};
function Window_LetterInfo() {
    this.initialize(...arguments);
}

Window_LetterInfo.prototype = Object.create(Window_Selectable.prototype);
Window_LetterInfo.prototype.constructor = Window_LetterInfo;

Window_LetterInfo.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
};

Window_LetterInfo.prototype.refresh = function (item) {
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
Window_LetterInfo.prototype.drawItem = function (index) {
    const rect = this.itemLineRect(index);
    const message = this._list[index];
    if (message) {
        this.drawTextEx(message, rect.x, rect.y, this.width)
    };
};
Window_LetterInfo.prototype.resetFontSettings = function () {
    this.contents.fontFace = $gameSystem.mainFontFace();
    this.contents.fontSize = 20;
    this.resetTextColor();
};
Window_LetterInfo.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_LetterInfo.prototype.maxCols = function () {
    return 1;
};
Window_LetterInfo.prototype.numVisibleRows = function () {
    return 8;
};
Window_LetterInfo.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};

function Window_InputBack() {
    this.initialize(...arguments);
}

Window_InputBack.prototype = Object.create(Window_Selectable.prototype);
Window_InputBack.prototype.constructor = Window_InputBack;

Window_InputBack.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
};

function Window_LetterChildrenList() {
    this.initialize(...arguments);
}

Window_LetterChildrenList.prototype = Object.create(Window_Selectable.prototype);
Window_LetterChildrenList.prototype.constructor = Window_LetterChildrenList;

Window_LetterChildrenList.prototype.initialize = function (rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this.refresh();
};
Window_LetterChildrenList.prototype.refresh = function () {
    // if (!$gameSystem._LetterData) {
    //     $gameSystem._LetterData = [];
    // }
    this.contents.clear();
    this.contentsBack.clear();
    this.contents.fontSize = 24;
    this._list = [];
    this._list = $gameSystem._LetterData;
    if (this._list.length > 0) {
        this.drawAllItems();
    } else {
        this.drawText('目前没有离家的孩子', -10, this.height / 2 - 40, this.width, 'center')
        this.select(-1);
    }
};
Window_LetterChildrenList.prototype.drawItem = function (index) {
    const rect = this.itemLineRect(index);
    const children = this._list[index];
    if (children) {
        this.drawText(children.name, rect.x, rect.y, this.width, 'left')
    }
}

Window_LetterChildrenList.prototype.maxItems = function () {
    return this._list ? this._list.length : 0;
};
Window_LetterChildrenList.prototype.maxCols = function () {
    return 1;
};
Window_LetterChildrenList.prototype.numVisibleRows = function () {
    return 8;
};
Window_LetterChildrenList.prototype.itemHeight = function () {
    return Math.floor(this.innerHeight / this.numVisibleRows());
};
Window_LetterChildrenList.prototype.callHandler = function (symbol) {
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
Window_LetterChildrenList.prototype.isOpenAndActive = function () {
    return this.isOpen() && this.visible && this.active && !Graphics._textarea._onWindow;
};
// Window_LetterChildrenList.prototype.processOk = function () {
//     if (!Graphics._textarea._onWindow) {
//         if (this.isCurrentItemEnabled()) {
//             this.playOkSound();
//             this.updateInputData();
//             this.deactivate();
//             this.callOkHandler();
//         } else {
//             this.playBuzzerSound();
//         }
//     }
// };
FlyCat.Letter.Graphics_createAllElements = Graphics._createAllElements;
Graphics._createAllElements = function () {
    FlyCat.Letter.Graphics_createAllElements.call(this);
    this._createPeopleInput();
};

FlyCat.Letter.Graphics_updateAllElements = Graphics._updateAllElements;
Graphics._updateAllElements = function () {
    FlyCat.Letter.Graphics_updateAllElements.call(this);
    this._updatePeopleInput();
};

//创建输入
Graphics._createPeopleInput = function () {
    this._textarea = document.createElement("input"); //area
    this._textarea.type = "text";//area
    this._textarea.cols = "25";
    this._textarea.rows = "2";
    this._textarea.name = 'text'
    this._textarea._param = {}
    this._textarea.id = 'Cat'
    this._textarea._onWindow = false;
    const sx = this._textarea._param;
    sx.xs = false;
    sx.x = 0;
    sx.y = 0;
    sx.width = 100;
    sx.height = 20;
    sx.fontSize = 18;
};
Graphics._addInput = function (type, x, y, width, height, fontSize) {
    // this._textarea.type = type || "textarea";
    const sx = this._textarea._param;
    sx.x = x;
    sx.y = y;
    sx.width = width || 100;
    sx.height = height || 20;
    sx.fontSize = fontSize || 18;
    this._updatePeopleInput();
    sx.xs = true;
    document.body.appendChild(this._textarea);
};

Graphics._removeInput = function () {
    this._textarea.remove();
    this._textarea.value = null;
    this._textarea._xs = false;
};

Graphics._updatePeopleInput = function () {
    this._textarea.style.zIndex = 12;
    const sx = this._textarea._param;
    const x = sx.x * this._realScale + (window.innerWidth - this._width * this._realScale) / 2;
    const y = sx.y * this._realScale + (window.innerHeight - this._height * this._realScale) / 2;
    const width = sx.width * this._realScale;
    const height = sx.height * this._realScale;
    const fontSize = sx.fontSize * this._realScale;
    this._textarea.style.position = 'absolute';
    this._textarea.style.margin = 'auto';
    this._textarea.style.top = y + 'px';
    this._textarea.style.left = x + 'px';
    this._textarea.style.width = width + 'px';
    this._textarea.style.height = height + 'px';
    this._textarea.style.fontSize = fontSize + 'px';
    this._textarea.style.resize = 'none';
    this._textarea.style.background = 'transparent';
    this._textarea.style.border = '1px';
    this._textarea.style.solid = '#ffffff';
    this._textarea.style.color = '#ffffff';
    this._textarea.onfocus = function () {
        SoundManager.playCursor();
        this.value = '';
        SceneManager._scene.okChildren();
        this._onWindow = true;
    }
    this._textarea.onblur = function () {
        if (this.value == '') {
            this.value = '再此输入内容';
        }
        this._onWindow = false;
    }
}
Input._onKeyDown = function (event) {
    if (this._shouldPreventDefault(event.keyCode)) {
        if (Graphics && Graphics._textarea && Graphics._textarea._param && Graphics._textarea._param.xs && Graphics._textarea._onWindow) {

        } else {
            event.preventDefault();
        }
    }
    if (event.keyCode === 144) {
        this.clear();
    }

    var buttonName = this.keyMapper[event.keyCode];
    if (buttonName) {
        this._currentState[buttonName] = true;
    }
};


function Sprite_letterButton() {
    this.initialize(...arguments);
}
Sprite_letterButton.prototype = Object.create(Sprite_Clickable.prototype);
Sprite_letterButton.prototype.constructor = Sprite_letterButton;

Sprite_letterButton.prototype.initialize = function () {
    Sprite_Clickable.prototype.initialize.call(this);
    this._clickHandler = null;
    this._lastBimap = null;
    this._pressCounts = 0;
};

Sprite_letterButton.prototype.onClick = function () {
    SoundManager.playOk()
    if (this._clickHandler) {
        this._clickHandler();
    }

};
Sprite_letterButton.prototype.setClickHandler = function (method) {
    this._clickHandler = method;
};
Sprite_letterButton.prototype.onMouseEnter = function () {
    SoundManager.playCursor();
    this._colorTone = [50, 50, 50, 0]
    this._updateColorFilter();
};
Sprite_letterButton.prototype.onMouseExit = function () {
    this._colorTone = [0, 0, 0, 0]
    this._updateColorFilter();
};