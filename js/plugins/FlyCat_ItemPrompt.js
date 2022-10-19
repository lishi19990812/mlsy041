//=============================================================================
// RPG Maker MZ - 获得物品提示
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<获得物品提示>
 * @author FlyCat
 *
 * @param goldIcon
 * @text 金币Icon
 * @type number
 * @default 314
 * 
 * @param speed
 * @text 提示框切换速度（帧数）
 * @type number
 * @default 60
 * 
 * @param x
 * @text 提示框位置偏移X
 * @type number
 * @default 24
 * 
 * @param y
 * @text 提示框位置偏移Y
 * @type number
 * @default 120
 * 
 * @param showVariables
 * @text 显示变量设置
 * @type struct<setVariables>[]
 * 
 * @help
 * 图片放在：img/itemInfo/下
 * <获得显示:图片名> 
 */
/*~struct~setVariables:
@param name
@text 变量名字
@type string

@param id
@text 变量Id
@type variable
@default 
*/
'use strict';
var Imported = Imported || {};
Imported.FlyCat_ItemPrompt = true;

var FlyCat = FlyCat || {};
FlyCat.ItemPrompt = {};
FlyCat.ItemPrompt.parameters = PluginManager.parameters('FlyCat_ItemPrompt');
FlyCat.ItemPrompt.goldIcon = Number(FlyCat.ItemPrompt.parameters['goldIcon'] || 314);
FlyCat.ItemPrompt.x = Number(FlyCat.ItemPrompt.parameters['x'] || 24);
FlyCat.ItemPrompt.y = Number(FlyCat.ItemPrompt.parameters['y'] || 120);
FlyCat.ItemPrompt.speed = Number(FlyCat.ItemPrompt.parameters['speed'] || 60);
FlyCat.ItemPrompt.showVariables = JSON.parse(FlyCat.ItemPrompt.parameters['showVariables'] || []);
if (FlyCat.ItemPrompt.showVariables) {
    const max = FlyCat.ItemPrompt.showVariables.length;
    for (let i = 0; i < max; i++) {
        FlyCat.ItemPrompt.showVariables[i] = JSON.parse(FlyCat.ItemPrompt.showVariables[i]);
    }
}
Game_Interpreter.prototype.operateVariable = function (
    variableId,
    operationType,
    value
) {
    try {
        const oldValue = $gameVariables.value(variableId);

        switch (operationType) {
            case 0: // Set
                $gameVariables.setValue(variableId, value);
                if (variableId > 0) $gameVariables.getVariablePrompt(variableId, value, 0);
                break;
            case 1: // Add
                $gameVariables.setValue(variableId, oldValue + value);
                if (variableId > 0) $gameVariables.getVariablePrompt(variableId, value, 1);
                break;
            case 2: // Sub
                $gameVariables.setValue(variableId, oldValue - value);
                if (variableId > 0) $gameVariables.getVariablePrompt(variableId, value, 2);
                break;
            case 3: // Mul
                $gameVariables.setValue(variableId, oldValue * value);
                break;
            case 4: // Div
                $gameVariables.setValue(variableId, oldValue / value);
                break;
            case 5: // Mod
                $gameVariables.setValue(variableId, oldValue % value);
                break;
        }
    } catch (e) {
        $gameVariables.setValue(variableId, 0);
    }
};

Game_Variables.prototype.getVariablePrompt = function (variableId, value, type) {
    // console.log(variableId, value, type)
    if (FlyCat.ItemPrompt.showVariables) {
        const list = FlyCat.ItemPrompt.showVariables;
        for (let i = 0; i < list.length; i++) {
            const id = Number(list[i].id);
            if (id > 0 && id == variableId) {
                if (type == 0) {
                    Game_Interpreter.prototype.setVariablePrompt(list[i].name, value, 0);
                } else if (type == 1) {
                    Game_Interpreter.prototype.setVariablePrompt(list[i].name, value, 1);
                } else if (type == 2) {
                    Game_Interpreter.prototype.setVariablePrompt(list[i].name, value, 2);
                }
                return;
            }
        }
    }
};
FlyCat.ItemPrompt.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function () {
    FlyCat.ItemPrompt.Scene_Map_createAllWindows.call(this);
    this.createItemPromptWindow();
};

Scene_Map.prototype.createItemPromptWindow = function () {
    $gameTemp._startItemPrompt = [];
    const rect = this.itemPromptWindowRect();
    this._itemPromptWindow = new Window_ItemPromt(rect);
    this.addChild(this._itemPromptWindow);
    this._itemPromptWindow.hide();
};
Scene_Map.prototype.itemPromptWindowRect = function () {
    const ww = Graphics.width;
    const wh = Graphics.height;
    const wx = 0;//Graphics.boxWidth / 2 - ww / 2;
    const wy = 0;//Graphics.boxHeight / 2 - wh / 2;
    return new Rectangle(wx, wy, ww, wh);
};

FlyCat.ItemPrompt._Scene_Map_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
Scene_Map.prototype.isAnyButtonPressed = function () {
    if ($gameTemp._startItemPrompt && $gameTemp._startItemPrompt.length > 0) return true;
    return FlyCat.ItemPrompt._Scene_Map_isAnyButtonPressed.call(this);
};
FlyCat.ItemPrompt.Game_Player_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function () {
    if (SceneManager._scene instanceof Scene_Map && (($gameTemp._startItemPrompt && $gameTemp._startItemPrompt.length > 0) || SceneManager._scene._itemPromptWindow.visible)) {
        return false;
    } else {
        return FlyCat.ItemPrompt.Game_Player_canMove.call(this);
    }
};
Game_Interpreter.prototype.setVariablePrompt = function (name, value, type) {
    $gameTemp._startItemPrompt.push(['variable', value, name, type]);
    this.setWaitMode('itemPromt')
    return true;
};
Game_Interpreter.prototype.command125 = function (params) {
    const value = this.operateValue(params[0], params[1], params[2]);
    $gameParty.gainGold(value);
    $gameTemp._startItemPrompt.push(['gold', value]);
    this.setWaitMode('itemPromt')
    return true;
};
Game_Interpreter.prototype.command126 = function (params) {
    const value = this.operateValue(params[1], params[2], params[3]);
    $gameParty.gainItem($dataItems[params[0]], value);
    $gameTemp._startItemPrompt.push([$dataItems[params[0]], value]);
    this.setWaitMode('itemPromt')
    return true;
};

Game_Interpreter.prototype.command127 = function (params) {
    const value = this.operateValue(params[1], params[2], params[3]);
    $gameParty.gainItem($dataWeapons[params[0]], value, params[4]);
    $gameTemp._startItemPrompt.push([$dataWeapons[params[0]], value]);
    this.setWaitMode('itemPromt')
    return true;
};

Game_Interpreter.prototype.command128 = function (params) {
    const value = this.operateValue(params[1], params[2], params[3]);
    $gameParty.gainItem($dataArmors[params[0]], value, params[4]);
    $gameTemp._startItemPrompt.push([$dataArmors[params[0]], value]);
    this.setWaitMode('itemPromt')
    return true;
};
function Window_ItemPromt() {
    this.initialize(...arguments);
}

Window_ItemPromt.prototype = Object.create(Window_Base.prototype);
Window_ItemPromt.prototype.constructor = Window_ItemPromt;

Window_ItemPromt.prototype.initialize = function (rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.createItemPromptSprite();
    this._playItemPrompt = false;
    this._playItemPromptText = false;
    this._continuing = false;
    this.opacity = 0;
    this._startCount = 0;
    this._bcXy = 500;
    this._palySpeed = 40;
};

Window_ItemPromt.prototype.refresh = function (item) {
    this._itemPromptBackSprite.x = -this._bcXy;
    this._itemPromptSprite.x = -this._bcXy;
    this._continuing = true;
    this.createContents();
    this._item = item[0];
    this._itemNumber = item[1];
    var x = $gamePlayer.screenX() - FlyCat.ItemPrompt.x;
    var y = $gamePlayer.screenY() - FlyCat.ItemPrompt.y;
    if (x + 200 > Graphics.width) {
        var x = Graphics.width - 200;
    } else if (x < 200) {
        var x = 200;
    }
    if (y + 35 > Graphics.height) {
        var y = Graphics.height - 35;
    } else if (y < 35) {
        var y = 35;
    }
    this.drawBack(x, y);
    if (this._item != 'gold' && this._item != 'variable' && this._item.meta.获得显示) {
        this._itemPromptBackSprite.bitmap = ImageManager.loadBitmap('img/itemInfo/', '获得物品提示')
        this._itemPromptSprite.bitmap = ImageManager.loadBitmap('img/itemInfo/', this._item.meta.获得显示)
        this._playItemPrompt = true;
    }
    if (!this._playItemPrompt) this._playItemPromptText = true;
    if (this._playItemPrompt) this._playItemPromptText = false;
    if (this._item == 'gold') {
        if (this._itemNumber > 0) {
            var text = '\\C[14]获得金钱:';
            SoundManager.playItemPromtSe('Coin')
            this.changeTextColor(ColorManager.textColor(14));
        } else {
            var text = '\\C[3]失去金钱:';
            SoundManager.playItemPromtSe('Shop2')
            this.changeTextColor(ColorManager.textColor(3));
        }
        this.drawTextEx(text + '\\I[' + Number(FlyCat.ItemPrompt.goldIcon) + ']' + this._itemNumber, x - this.textWidth(text + this._itemNumber) / 2 + 16, y);
    } else {
        if (this._item == 'variable') {
            const value = this._itemNumber;
            const name = item[2];
            const type = item[3];
            //   console.log(type)
            if (type == 0) {
                var text = '+'
            } else if (type == 1) {
                var text = '+'
            } else if (type == 2) {
                var text = '-';
            } else {
                var text = '';
            }
            if (value >= 0) {
                var c = '\\C[14]';
            } else {
                var c = '\\C[3]';
            }
            SoundManager.playItemPromtSe('Chime2')
            this.drawTextEx(c + name + ':' + text + value, x - this.textWidth(name + ':' + text + value) / 2 + 16, y);
        } else {
            if (this._itemNumber > 0) {
                var text = '\\C[14]获得物品:';
                var text_1 = 'x';
                SoundManager.playItemPromtSe('Chime2')
                this.drawTextEx(text + '\\I[' + this._item.iconIndex + ']' + this._item.name + text_1 + this._itemNumber, x - this.textWidth(text + this._item.name + text_1 + this._itemNumber) / 2 + 16, y);
            } else {
                var text = '\\C[3]失去物品:';
                var text_1 = '';
                SoundManager.playItemPromtSe('Equip1')
                this.drawTextEx(text + text_1 + '\\I[' + this._item.iconIndex + ']' + this._item.name + 'x' + Math.abs(this._itemNumber), x - this.textWidth(text + this._item.name + 'x' + Math.abs(this._itemNumber)) / 2 + 16, y);
            }
        }
    }
    this.show();
};
Window_ItemPromt.prototype.drawBack = function (x, y) {
    const c1 = ColorManager.itemBackColor1();
    const c2 = ColorManager.itemBackColor2();
    const w = 400;
    const h = 70;
    const wx = x - w / 2;
    const wy = y - h / 2 + 18;
    this.contents.gradientFillRect(wx, wy, w, h, c1, c2, true);
    this.contents.strokeRect(wx, wy, w, h, c1);
};
Window_ItemPromt.prototype.createItemPromptSprite = function () {
    this._itemPromptBackSprite = new Sprite();
    this.addChild(this._itemPromptBackSprite);
    this._itemPromptSprite = new Sprite();
    this.addChild(this._itemPromptSprite);
    this._itemPromptBackSprite.anchor.set(0.5);
    this._itemPromptSprite.anchor.set(0.5);
    this._itemPromptSprite.y = this.y + 50;
    this._itemPromptBackSprite.y = this.y + 50;
    this._itemPromptBackSprite.x = -this._bcXy;
    this._itemPromptSprite.x = -this._bcXy;
};

Window_ItemPromt.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if ($gameTemp._startItemPrompt && $gameTemp._startItemPrompt.length > 0 && !this._continuing) {
        const item = $gameTemp._startItemPrompt.shift();
        this.refresh(item);
    }
    if (this._playItemPrompt) {
        if (this.visible && this._item) {
            if (this._itemPromptSprite.x < this.x - 20) {
                this._itemPromptSprite.x += this._palySpeed;
                this._itemPromptBackSprite.x += this._palySpeed;
            } else {
                this._itemPromptSprite.x = this.x - 20;
                this._itemPromptBackSprite.x = this.x - 20;
                this._startCount++
                if (this._startCount > 90) {//
                    this._item = null;
                    this._startCount = 0;
                }
            }
        }
        else if (this.visible && this._item == null && this._itemPromptBackSprite.x != -300) {
            if (this._itemPromptSprite.x < 1580) {
                this._itemPromptSprite.x += this._palySpeed;
                this._itemPromptBackSprite.x += this._palySpeed;
            } else {
                if ($gameTemp._startItemPrompt.length > 0) {
                    this._continuing = false;
                    this._playItemPrompt = false;
                    this._itemPromptBackSprite.x = -this._bcXy;
                    this._itemPromptSprite.x = -this._bcXy;
                } else {
                    this._itemPromptBackSprite.x = -this._bcXy;
                    this._itemPromptSprite.x = -this._bcXy;
                    this._playItemPrompt = false;
                    this._continuing = false;
                    this.hide();
                }

            }

        }
    }
    if (this._playItemPromptText) {
        this._startCount++;
        if (this._startCount > FlyCat.ItemPrompt.speed) {
            this._item = null;
            if ($gameTemp._startItemPrompt.length > 0) {
                this._continuing = false;
            } else {
                this._continuing = false;
                this.hide();
            }
            this._startCount = 0;
        }
    }
};

/*播放音效*/
SoundManager.playItemPromtSe = function (fileName) {
    const se = {};
    se.name = fileName;
    se.pitch = 100;
    se.volume = 100;
    AudioManager.playSe(se);
};

FlyCat.ItemPrompt.Game_Interpret_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function () {
    if (this._waitMode == 'itemPromt') {
        if ($gameTemp._startItemPrompt.length > 0) {
            return true;
        }
    }
    return FlyCat.ItemPrompt.Game_Interpret_updateWaitMode.call(this);
};