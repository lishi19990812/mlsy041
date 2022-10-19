//==============================================================================================================
// LL_Sprites.js
//==============================================================================================================
/*:
 * @target MZ
 * @plugindesc 精灵 <Liuli Island>
 * @author 芯☆淡茹水
 * @help 
 * 
 * 
*/
//==============================================================================================================
; var XdRsData = XdRsData || {};
XdRsData.ll = XdRsData.ll || {};
//==============================================================================================================
function Sprite_QTE_Base() {
    this.initialize(...arguments);
}
Sprite_QTE_Base.prototype = Object.create(Sprite.prototype);
Sprite_QTE_Base.prototype.constructor = Sprite_QTE_Base;
Sprite_QTE_Base.prototype.initialize = function (bitmap) {
    Sprite.prototype.initialize.call(this, bitmap);
    this._animationSprites = [];
};
Sprite_QTE_Base.prototype.playAnm = function (anmId) {
    const anm = $dataAnimations[anmId];
    if (anm) {
        const mv = !!anm.frames;
        const sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
        sprite.setup([this], anm, false, 0, false);
        this.parent.addChild(sprite);
        this._animationSprites.push(sprite);
    }
};
Sprite_QTE_Base.prototype.removeAnimation = function (sprite) {
    this._animationSprites.remove(sprite);
    this.parent.removeChild(sprite);
    sprite.destroy();
};
Sprite_QTE_Base.prototype.isAnimationPlaying = function () {
    return this._animationSprites.length > 0;
};
Sprite_QTE_Base.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updateAnimations();
};
Sprite_QTE_Base.prototype.updateAnimations = function () {
    for (const sprite of this._animationSprites) {
        !sprite.isPlaying() && this.removeAnimation(sprite);
    }
};
//==============================================================================================================
function Sprite_QTE_Button() {
    this.initialize(...arguments);
}
Sprite_QTE_Button.prototype = Object.create(Sprite_QTE_Base.prototype);
Sprite_QTE_Button.prototype.constructor = Sprite_QTE_Button;
Sprite_QTE_Button.prototype.initialize = function (keyName) {
    Sprite_QTE_Base.prototype.initialize.call(this, new Bitmap(68, 42));
    this.anchor = new Point(0.5, 0.5);
    this.drawButton(keyName);
};
Sprite_QTE_Button.prototype.drawButton = function (keyName) {
    const result = ['UP', 'DOWN', 'LEFT', 'RIGHT'].contains(keyName);
    const color = result ? 'rgb(200, 200, 200)' : 'rgb(0,120,120)';
    this.bitmap.fillRoundRect(3, 3, 62, 36, 8, 4, 'rgba(0,0,0,0.5)', color);
    this.bitmap.fillRoundRect(2, 2, 63, 34, 8, 2, 'rgba(0,0,0,0.5)', color);
    if (!result) {
        this.bitmap.fontSize = 28;
        this.bitmap.drawText(keyName, 0, 0, 68, 36, 'center');
    } else {
        const color1 = 'rgb(255,0,255)', color2 = 'black';
        if (keyName === 'UP') this.bitmap.drawArrow(34, 5, 44, 30, 24, 30, 34, 24, color1, color2);
        if (keyName === 'DOWN') this.bitmap.drawArrow(34, 32, 44, 8, 24, 8, 34, 14, color1, color2);
        if (keyName === 'LEFT') this.bitmap.drawArrow(20, 18, 44, 8, 44, 28, 38, 18, color1, color2);
        if (keyName === 'RIGHT') this.bitmap.drawArrow(46, 18, 22, 8, 22, 28, 26, 18, color1, color2);
    }
};
Sprite_QTE_Button.prototype.moveRight = function () {
    this.startAction({ 'count': 5, 'mx': 16, 'body': true });
};
//==============================================================================================================
function Sprite_QTE_Arrow() {
    this.initialize(...arguments);
}
Sprite_QTE_Arrow.prototype = Object.create(Sprite.prototype);
Sprite_QTE_Arrow.prototype.constructor = Sprite_QTE_Arrow;
Sprite_QTE_Arrow.prototype.initialize = function (type) {
    this._type = type;
    Sprite.prototype.initialize.call(this, new Bitmap(32, 32));
    this._actionCount = 0;
    this.anchor = new Point(0.5, 0.5);
    if (this._type === 0) this.bitmap.drawArrow(16, 32, 30, 0, 2, 0, 16, 4, 'white');
    if (this._type === 1) this.bitmap.drawArrow(16, 0, 30, 32, 2, 32, 16, 28, 'white');
    this.move(0, this._type * 100 - 24);
};
Sprite_QTE_Arrow.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this._actionCount = (this._actionCount + 1) % 60;
    var my = this._type ? -0.1 : 0.1;
    this.y += this._actionCount < 30 ? my : -my;
};
//==============================================================================================================
function Sprite_QTE() {
    this.initialize(...arguments);
}
Sprite_QTE.prototype = Object.create(Sprite_QTE_Base.prototype);
Sprite_QTE.prototype.constructor = Sprite_QTE;
Sprite_QTE.prototype.initialize = function () {
    Sprite_QTE_Base.prototype.initialize.call(this, new Bitmap(Graphics.width, 240));
    this.move(Graphics.width / 2, Graphics.height / 2 - 50);
    this.anchor = new Point(0.5, 0.5);
    this._isFinish = false;
    this.setupListeners();
    this.createParts();
    this.drawBackground();
    this.drawTitle();
    this.refreshTime();
};
Sprite_QTE.prototype.setupListeners = function () {
    QTE_Manager.addTempListener('prepare', this.moveButtons.bind(this));
    QTE_Manager.addTempListener('onClick', this.onClickButton.bind(this));
    QTE_Manager.addTempListener('duration', this.refreshTime.bind(this));
    QTE_Manager.addTempListener('finish', this.onFinish.bind(this));
};
Sprite_QTE.prototype.createParts = function () {
    this._arrows = [];
    this._buttons = [];
    for (var i = 0; i < 2; ++i) {
        this._arrows[i] = new Sprite_QTE_Arrow(i);
        this.addChild(this._arrows[i]);
    }
    const arr = QTE_Manager.keysQueue();
    for (var i = 0; i < arr.length; ++i) {
        this._buttons[i] = new Sprite_QTE_Button(arr[i]);
        this._buttons[i].move((i + 1) * -80, 27);
        this.addChild(this._buttons[i]);
    }
};
Sprite_QTE.prototype.isBusy = function () {
    if (this.isAnimationPlaying()) return true;
    return this._buttons.some(b => b.isAnimationPlaying());
};
Sprite_QTE.prototype.drawBackground = function () {
    this.bitmap.gradientFillRect(0, 96, this.width, 52, 'rgb(120,80,0)', 'rgba(0,0,0,0)', true);
    this.bitmap.gradientFillRect(0, 144, this.width, 52, 'rgba(0,0,0,0)', 'rgb(120,80,0)', true);
    this.bitmap.fillRoundRect(605, 124, 68, 44, 5, 3, 'red');
};
Sprite_QTE.prototype.drawTitle = function () {
    const text = QTE_Manager.titleText();
    if (text) {
        this.bitmap.fontSize = 32;
        const tw = this.bitmap.measureTextWidth(text) + 32;
        const x = (this.width - tw) / 2;
        this.bitmap.fillRoundRect(x, 10, tw, 56, 5, 3, 'red', 'black');
        this.bitmap.drawText(text, 0, 10, this.width, 56, 'center');
    }
};
Sprite_QTE.prototype.refreshTime = function () {
    this.bitmap.clearRect(0, 196, this.width, 44);
    const color = 'rgb(0,160,0)';
    const rw = 718 * QTE_Manager.durationRate();
    this.bitmap.fontSize = 26;
    this.bitmap.textColor = color;
    this.bitmap.drawText('Time：', 200, 200, 126, 32);
    this.bitmap.fillRoundRect(280, 210, 720, 16, 8, 2, 'black');
    this.bitmap.fillRoundRect(281, 211, rw, 14, 7, 2, 'rgba(0,0,0,0)', color);
};
Sprite_QTE.prototype.moveButtons = function () {
    this._buttons.forEach(b => b.moveRight());
};
Sprite_QTE.prototype.onClickButton = function () {
    const button = this._buttons[QTE_Manager.index()];
    const id = XdRsData.ll.getAnmId(0);
    button && button.playAnm(id);
};
Sprite_QTE.prototype.onFinish = function () {
    this._isFinish = true;
    const result = QTE_Manager.result();
    this.playAnm(XdRsData.ll.getAnmId(result + 1));
};
Sprite_QTE.prototype.update = function () {
    Sprite_QTE_Base.prototype.update.call(this);
    if (this._isFinish) {
        !this.isBusy() && QTE_Manager.exit();
    }
};
//==============================================================================================================
function Sprite_ListCursor() {
    this.initialize(...arguments);
}
Sprite_ListCursor.prototype = Object.create(Sprite.prototype);
Sprite_ListCursor.prototype.constructor = Sprite_ListCursor;
Sprite_ListCursor.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this._actionCount = 0;
};
Sprite_ListCursor.prototype.setup = function (width, height) {
    this.bitmap = new Bitmap(width, height);
    this.bitmap.fillRoundRect(0, 0, width - 4, height - 4, 10, 2, 'rgba(0,0,0,0)', 'rgba(100,80,0,0.6)');
};
Sprite_ListCursor.prototype.refreshPosition = function (x, y) {
    this.move(x, y);
    this._isOutside = false;
    const h = this.parent._contentsSprite.height;
    const bh = this.bitmap.height;
    if (this.y < -bh || this.y > (h + 12)) this._isOutside = true;
    else {
        const fy = this.y < 12 ? Math.abs(12 - this.y) : 0;
        const fh = Math.min(bh, h - this.y + 12);
        this.setFrame(0, fy, this.bitmap.width, fh);
        this.y += fy;
    }
};
Sprite_ListCursor.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updateSate();
    this.updateAction();
};
Sprite_ListCursor.prototype.updateSate = function () {
    this.visible = !this._isOutside && this.parent.isActive();
};
Sprite_ListCursor.prototype.updateAction = function () {
    if (this.visible && this.bitmap) {
        this._actionCount = (this._actionCount + 1) % 60;
        this.opacity += this._actionCount < 30 ? -3 : 3;
    }
};
//==============================================================================================================
function Sprite_OptionsCursor() {
    this.initialize(...arguments);
}
Sprite_OptionsCursor.prototype = Object.create(Sprite.prototype);
Sprite_OptionsCursor.prototype.constructor = Sprite_OptionsCursor;
Sprite_OptionsCursor.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this, ImageManager.loadUi('Options_Cursor'));
    this.anchor = new Point(1, 0.5);
    this._actionCount = 0;
};
Sprite_OptionsCursor.prototype.move = function (x, y) {
    Sprite.prototype.move.call(this, x, y);
    this._actionCount = 0;
};
Sprite_OptionsCursor.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if (this.parent.isActive() && this.visible) {
        this._actionCount = (this._actionCount + 1) % 60;
        this.x += this._actionCount < 30 ? 0.2 : -0.2;
    }
};
//==============================================================================================================
function Sprite_GameLogo() {
    this.initialize(...arguments);
}
Sprite_GameLogo.prototype = Object.create(Sprite.prototype);
Sprite_GameLogo.prototype.constructor = Sprite_GameLogo;
Sprite_GameLogo.prototype.initialize = function (static) {
    Sprite.prototype.initialize.call(this, ImageManager.loadUi('Ui_Title'));
    this.setFrame(1300, 6, 144, 470);
    this.setup(static);
};
Sprite_GameLogo.prototype.setup = function (static) {
    this.opacity = static ? 255 : 0;
    if (static) this.move(1108, 0);
    else {
        this.startAction({ 'count': 60, 'op': 5, 'body': true });
        this.startAction({ 'count': 30, 'mx': 18, 'my': -5, 'body': true });
        this.move(568, 150);
    }
};
Sprite_GameLogo.prototype.onActionEnd = function () {
    this.parent.startDisplyOther();
};
//==============================================================================================================
function Sprite_TitleBg() {
    this.initialize(...arguments);
}
Sprite_TitleBg.prototype = Object.create(Sprite.prototype);
Sprite_TitleBg.prototype.constructor = Sprite_TitleBg;
Sprite_TitleBg.prototype.initialize = function (static) {
    Sprite.prototype.initialize.call(this, ImageManager.loadUi('Ui_Title'));
    this.opacity = static ? 255 : 0;
    this.setFrame(0, 0, 1280, 720);
};
Sprite_TitleBg.prototype.startShow = function () {
    this.startAction({ 'count': 30, 'op': 8.5, 'body': true });
};
//==============================================================================================================
function TitleMask_Item() {
    this.initialize(...arguments);
}
TitleMask_Item.prototype = Object.create(Sprite.prototype);
TitleMask_Item.prototype.constructor = TitleMask_Item;
TitleMask_Item.prototype.initialize = function (type) {
    Sprite.prototype.initialize.call(this, ImageManager.loadUi('Ui_Title'));
    const s = Math.min(1, Math.random() + 0.4);
    this.anchor = new Point(0.5, 0.5);
    this.scale = new Point(s, s);
    this.setup();
};
TitleMask_Item.prototype.setup = function () {
    this._twinkleCount = 0;
    this._type = Math.randomInt(2);
    this._twinkleSpeed = Math.randomInt(40) + 20;
    this.refreshFrame(this._type);
    this.x = Math.randomInt(Graphics.width);
    this.y = Math.randomInt(Graphics.height);
    this._step = Math.randomInt(3) + 2;
    this.opacity = 0;
    const op = (Math.randomInt(80) + 100) / 20;
    this.startAction({ 'count': 20, 'op': op, 'body': true });
};
TitleMask_Item.prototype.getFrameRect = function (type) {
    return type ? new Rectangle(1448, 343, 28, 28) : new Rectangle(1508, 337, 38, 38);
};
TitleMask_Item.prototype.refreshFrame = function (type) {
    const rect = this.getFrameRect(type);
    this.setFrame(rect.x, rect.y, rect.width, rect.height);
};
TitleMask_Item.prototype.isEffective = function () {
    if (!this._step) return false;
    if (this.x < -20 || this.y < -20) return false;
    return this.x < Graphics.width && this.y < Graphics.height;
};
TitleMask_Item.prototype.checkEffective = function () {
    const result = this.isEffective();
    !result && this.parent.removeItem(this);
    return result;
};
TitleMask_Item.prototype.onActionEnd = function () {
    if (!this.checkEffective()) return;
    if (this._step === 1) {
        const op = -this.opacity / 20;
        this.startAction({ 'count': 20, 'op': op, 'body': true });
    } else {
        const tx = Math.randomInt(Graphics.width);
        const ty = Math.randomInt(Graphics.height);
        const speed = Math.randomInt(2) + 0.5;
        const dx = tx - this.x, dy = ty - this.y;
        const des = Math.abs(dx) + Math.abs(dy);
        var mx = speed * (Math.abs(dx) / des);
        var my = speed * (Math.abs(dy) / des);
        mx = dx > 0 ? mx : -mx;
        my = dy > 0 ? my : -my;
        const count = Math.ceil(Math.min(Math.abs(dx) / mx, Math.abs(dy) / my));
        this.startAction({ 'count': count, 'mx': mx, 'my': my, 'body': true });
    }
    this._step--;
};
TitleMask_Item.prototype.update = function () {
    Sprite.prototype.update.call(this);
    if (this.checkEffective()) {
        this._twinkleCount++;
        if (!(this._twinkleCount % this._twinkleSpeed)) {
            this._type = (this._type + 1) % 2;
            this.refreshFrame(this._type);
        }
    }
};
//==============================================================================================================
function Sprite_TitleMask() {
    this.initialize(...arguments);
}
Sprite_TitleMask.prototype = Object.create(Sprite.prototype);
Sprite_TitleMask.prototype.constructor = Sprite_TitleMask;
Sprite_TitleMask.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this._isRuning = false;
    this._parts = [];
};
Sprite_TitleMask.prototype.start = function () {
    this._isRuning = true;
    var size = Math.randomInt(8) + 10;
    while (size--) this.createNewItem();
};
Sprite_TitleMask.prototype.createNewItem = function () {
    const item = new TitleMask_Item(this._type);
    this._parts.push(item);
    this.addChild(item);
};
Sprite_TitleMask.prototype.removeItem = function (item) {
    const index = this._parts.indexOf(item);
    if (index >= 0) {
        this._parts.remove(item);
        this.removeChild(item);
        item.destroy();
        this.createNewItem();
    }
};
//==============================================================================================================
function Sprite_GameCG() {
    this.initialize(...arguments);
}
Sprite_GameCG.prototype = Object.create(Sprite_Clickable.prototype);
Sprite_GameCG.prototype.constructor = Sprite_GameCG;
Sprite_GameCG.prototype.initialize = function (isMenu) {
    Sprite_Clickable.prototype.initialize.call(this);
    this._isMenu = isMenu;
    if ($gameSystem._mapActorPicture) {
        var img = $gameSystem._mapActorPicture;
    }
    else {
        var img = FlyCat.LL_SceneMenu.sceneMapPicture;
    }
    this.bitmap = ImageManager.loadBitmap('img/menu/', img);//ImageManager.loadPicture('CG_Body');
    this.bitmap.addLoadListener(this.setupPosition.bind(this));
    this.anchor = new Point(0.5, 1);
    // this.createClothes();
    this._actionCount = 0;
    this._waitCount = 0;
};
Sprite_GameCG.prototype.moveIn = function () {
    const width = this.bitmap.width;
    const mx = (1280 + width / 2 - 1100) / 10;
    this.startAction({ 'count': 10, 'mx': -mx, 'body': true });
};
Sprite_GameCG.prototype.moveOut = function () {
    const width = this.bitmap.width;
    const mx = (1280 + width / 2 - 1100) / 10;
    this.startAction({ 'count': 10, 'mx': mx, 'body': true });
};
Sprite_GameCG.prototype.setupPosition = function () {
    const y = Graphics.height;
    if (this._isMenu) {
        const width = this.bitmap.width;
        this.move(1280 + width / 2, y);
        this.moveIn();
    } else this.move(this.targetPointX(), y + 25);
};
Sprite_GameCG.prototype.targetPointX = function () {
    const type = $gameSystem.mapCgType();
    const width = this.bitmap.width;
    return type === 0 ? width / 2 : Graphics.width - width / 2;
};
Sprite_GameCG.prototype.isInPlace = function () {
    return this.x === this.targetPointX();
};
Sprite_GameCG.prototype.moveSpeed = function () {
    return 10;
};
Sprite_GameCG.prototype.createClothes = function () {
    this._clothes = new Sprite();
    this._clothes.anchor = new Point(0.5, 1);
    this.refreshMask();
    this.addChild(this._clothes);
};
Sprite_GameCG.prototype.refreshMask = function () {
    this._dataId = $gameParty.currentActor().getClothesId();
    this._clothes.bitmap = null;
    const name = 'CG_Clothes_' + this._dataId;
    this._clothes.bitmap = ImageManager.loadPicture(name);
};
Sprite_GameCG.prototype.onPress = function () {
    if (this._isMenu || !this.visible) return false;
    const ox = TouchInput.x - (this.x - this.width * this.anchor.x);
    const oy = TouchInput.y - (this.y - this.height * this.anchor.y);
    var result = this.bitmap.getAlphaPixel(ox, oy) > 0;
    // if (!result && this._clothes.bitmap) {
    //     result = this._clothes.bitmap.getAlphaPixel(ox, oy) > 0;
    // }
    if (result && this._waitCount === 0) {
        const type = ($gameSystem.mapCgType() + 1) % 2;
        $gameSystem.setMapCgType(type);
        this._waitCount = 8;
    }
    return result;
};
Sprite_GameCG.prototype.update = function () {
    Sprite_Clickable.prototype.update.call(this);
    if (this._dataId !== $gameParty.currentActor().getClothesId()) {
        // this.refreshMask();
    }
    this.updateWaitCount();
    this.updateOnMap();
};
Sprite_GameCG.prototype.updateWaitCount = function () {
    if (this._waitCount > 0) this._waitCount--;
};
Sprite_GameCG.prototype.updateOnMap = function () {
    if (!this._isMenu) {
        this.updateState();
        this.updateMove();
        this.updateAction();
    }
};
Sprite_GameCG.prototype.updateState = function () {
    this.visible = $gameSystem.isMapCgVisible();
};
Sprite_GameCG.prototype.updateMove = function () {
    if (!this.isInPlace()) {
        const tx = this.targetPointX();
        const dec = Math.abs(this.x - tx);
        const speed = Math.min(this.moveSpeed(), dec);
        this.x += this.x > tx ? -speed : speed;
    }
};
Sprite_GameCG.prototype.updateAction = function () {
    if (this.visible) {
        this._actionCount = (this._actionCount + 1) % 240;
        this.y += this._actionCount < 120 ? -0.2 : 0.2;
    }
};
//==============================================================================================================
function Sprite_LL_ActorEye() {
    this.initialize(...arguments);
}
Sprite_LL_ActorEye.prototype = Object.create(Sprite.prototype);
Sprite_LL_ActorEye.prototype.constructor = Sprite_LL_ActorEye;
Sprite_LL_ActorEye.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this, ImageManager.loadUi('Ui_Menu8'));
    this._actor = $gameParty.currentActor();
    this.move(0, -614);
    this._hitCount = 0;
    this.refresh();
};
Sprite_LL_ActorEye.prototype.hpIndex = function () {
    const rate = this._actor.hp * 100 / this._actor.mhp;
    return Math.max(0, 3 - Math.floor(rate / 25));
};
Sprite_LL_ActorEye.prototype.displayHit = function () {
    this._hitCount = 60;
    this.refresh();
};
Sprite_LL_ActorEye.prototype.refresh = function () {
    this._dataIndex = this.hpIndex();
    const index = this._hitCount > 0 ? 4 : this._dataIndex;
    this.setFrame(1874, index * 80 + 76, 105, 70);
};
Sprite_LL_ActorEye.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updateHit();
    this.updateIndex();
};
Sprite_LL_ActorEye.prototype.updateHit = function () {
    if (this._hitCount) {
        this._hitCount--;
        !this._hitCount && this.refresh();
    }
};
Sprite_LL_ActorEye.prototype.updateIndex = function () {
    this._dataIndex !== this.hpIndex() && this.refresh();
};
//==============================================================================================================
function Sprite_LL_ActorClothes() {
    this.initialize(...arguments);
}
Sprite_LL_ActorClothes.prototype = Object.create(Sprite.prototype);
Sprite_LL_ActorClothes.prototype.constructor = Sprite_LL_ActorClothes;
Sprite_LL_ActorClothes.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this, ImageManager.loadUi('Ui_Clothes'));
    this._actor = $gameParty.currentActor();
    this.anchor = new Point(0.5, 1);
    this.move(60, 6);
    this.refresh();
};
Sprite_LL_ActorClothes.prototype.hpIndex = function () {
    return Sprite_LL_ActorEye.prototype.hpIndex.call(this);
};
Sprite_LL_ActorClothes.prototype.refresh = function () {
    this._dataIndex = this.hpIndex();
    this.setFrame(this._dataIndex * 375, 0, 375, 720);
};
Sprite_LL_ActorClothes.prototype.update = function () {
    Sprite.prototype.update.call(this);
    this.updateIndex();
};
Sprite_LL_ActorClothes.prototype.updateIndex = function () {
    this._dataIndex !== this.hpIndex() && this.refresh();
};
//==============================================================================================================
// function Sprite_LL_BattleActor() {
//     this.initialize(...arguments);
// }
// Sprite_LL_BattleActor.prototype = Object.create(Sprite_Battler.prototype);
// Sprite_LL_BattleActor.prototype.constructor = Sprite_LL_BattleActor;
// Sprite_LL_BattleActor.prototype.initialize = function() {
//     Sprite_Battler.prototype.initialize.call(this, $gameParty.currentActor());
//     this.bitmap = ImageManager.loadUi('Ui_Menu8');
//     this.setFrame(1340, 0, 446, 722);
//     this.setHome(1680, 786);
//     this.createParts();
//     this.startMove(-630, 0, 10);
// };
// Sprite_LL_BattleActor.prototype.createParts = function() {
//     this._eye = new Sprite_LL_ActorEye();
//     this._clothes = new Sprite_LL_ActorClothes();
//     this.addChild(this._eye);
//     this.addChild(this._clothes);
// };
// Sprite_LL_BattleActor.prototype.updateFrame = function() {
//     if (this._battler.isMotionRequested()) {
//         if (this._battler.motionType() === 'damage') {
//             this._eye.displayHit();
//         }
//         this._battler.clearMotion();
//     }
// };
// Sprite_LL_BattleActor.prototype.damageOffsetY = function() {
//     return -300;
// };
// //==============================================================================================================
// Sprite_Enemy.prototype.onPress = function() {
//     if (this._enemy.isAlive()) {
//         const result = $gameTemp.setBattleEnemyIndex(this._enemy.index());
//         result && $gameTemp.setBattleEnemyOk(true);
//     }
// };
// //==============================================================================================================
// XdRsData.ll.Spriteset_Battle_createActors = Spriteset_Battle.prototype.createActors;
// Spriteset_Battle.prototype.createActors = function() {
//     if (!$gameSystem.isSideView()) return this.createDrawingActors();
//     XdRsData.ll.Spriteset_Battle_createActors.call(this);
// };
// Spriteset_Battle.prototype.createDrawingActors = function() {
//     this._actorSprites = [new Sprite_LL_BattleActor()];
// };
//==============================================================================================================
// end
//==============================================================================================================