/*:
 * @plugindesc wolfzq追加功能。
 * @author wolfzq  
 * @target MZ
 * @help 
 * wolfzq追加功能。
 */
 
 /*增加全局参数*/
var $we = null;

//-----------------局部位移----------------------
var _Game_Player_locate = Game_Player.prototype.locate;
Game_Player.prototype.locate = function(x, y) {
	this._tmpX = 0;
	this._tmpY = 0;
	_Game_Player_locate.call(this, x, y);
}

Game_CharacterBase.prototype.rotation = function() {
    return this._rotation;
};
Game_CharacterBase.prototype.setTempX = function(x) {
	this._tmpX += x;
	this._x += x;
};
Game_CharacterBase.prototype.setTempY = function(y) {
	this._tmpY += y;
	this._y += y;
};
Game_CharacterBase.prototype.setTemp = function(x, y) {
	this.setTempX(x);
	this.setTempY(y);
};
Game_CharacterBase.prototype.setFrontTemp = function(x) {
	var de = this.direction();
	switch (de) {
		case 2:
			this.setTempY(x);
		break;
		case 4:
			this.setTempX(-x);
		break;
		case 6:
			this.setTempX(x);
		break;
		case 8:
			this.setTempY(-x);
		break;
	}
};
Game_CharacterBase.prototype.clearTemp = function() {
	this._x = Math.round(this._x - this._tmpX);
	this._y = Math.round(this._y - this._tmpY);
	this._tmpX = 0;
	this._tmpY = 0;
};
//-----------------局部位移结束---------------

//-----------------战斗加速-------------------
Scene_Battle.prototype.isFastForward = function() {
    return (Input.isLongPressed('ok') || TouchInput.isLongPressed());
};

var _Wolfzq_Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function () {
	if (this.isFastForward()) {
		//2倍数
		_Wolfzq_Scene_Battle_update.call(this);
	}
	if (Input.isLongPressed('skip')) {
	//6倍速
		for (var i = 0; i < 5; i++) {
			_Wolfzq_Scene_Battle_update.call(this);
		}
	}
    _Wolfzq_Scene_Battle_update.call(this);
};
//-----------------战斗加速结束---------------

//-----------------场景加速-------------------
Scene_Map.prototype.isSkipForward = function() {
    return ($gameMap.isEventRunning() && !SceneManager.isSceneChanging() && Input.isLongPressed('skip'));
};

var _Wolfzq_Scene_Map_updateMainMultiply = Scene_Map.prototype.updateMainMultiply;
Scene_Map.prototype.updateMainMultiply = function () {
    if (this.isSkipForward()) {
		for (var i = 0; i < 9; i++) {
			_Wolfzq_Scene_Map_updateMainMultiply.call(this);
		}
    }
    _Wolfzq_Scene_Map_updateMainMultiply.call(this);
};
//-----------------场景加速结束---------------
//-----------------非战斗加速-----------------


Sprite_AnimationMV.prototype.isSkipForward = function() {
	return ($gameMap.isEventRunning() && !SceneManager.isSceneChanging() && Input.isLongPressed('skip'));
};

var _Wolfzq_Sprite_AnimationMV_update = Sprite_AnimationMV.prototype.update;
Sprite_AnimationMV.prototype.update = function () {
    if (this.isSkipForward()) {
		for (var i = 0; i < 9; i++) {
			_Wolfzq_Sprite_AnimationMV_update.call(this);
		}
    }
    _Wolfzq_Sprite_AnimationMV_update.call(this);
};

var _Wolfzq_Sprite_Animation_update = Sprite_Animation.prototype.update;
Sprite_Animation.prototype.update = function () {
    _Wolfzq_Sprite_Animation_update.call(this);
    if (this._handle) {
		if (Input.isLongPressed('skip'))
			this._handle.setSpeed(this._animation.speed / 10);
		else if (Input.isLongPressed('ok') || TouchInput.isLongPressed())
			this._handle.setSpeed(this._animation.speed / 50);
    }
};

Sprite_Balloon.prototype.isFastForward = function() {
	if (!BattleManager._phase) {
		return ($gameMap.isEventRunning() && !SceneManager.isSceneChanging() && (Input.isLongPressed('ok') || TouchInput.isLongPressed()));
	}
};
Sprite_Balloon.prototype.isSkipForward = function() {
	if (!BattleManager._phase) {
		return ($gameMap.isEventRunning() && !SceneManager.isSceneChanging() && Input.isLongPressed('skip'));
	}
};

var _Wolfzq_Sprite_Balloon_update = Sprite_Balloon.prototype.update;
Sprite_Balloon.prototype.update = function () {
    if (this.isSkipForward()) {
		for (var i = 0; i < 9; i++) {
			_Wolfzq_Sprite_Balloon_update.call(this);
		}
    } else if (this.isFastForward()) {
		_Wolfzq_Sprite_Balloon_update.call(this);
    } 
    _Wolfzq_Sprite_Balloon_update.call(this);
};
//-----------------非战斗加速结束-------------

//-----------------对话框加速-----------------
Window_Message.prototype.isSkip = function() {
    return (Input.isRepeated('skip') || TouchInput.isRepeated());
};

var _Wolfzq_Window_Message_startPause = Window_Message.prototype.startPause;
Window_Message.prototype.startPause = function() {
	if (this.isSkip()) {
		this.startWait(0);
		this.pause = true;
	} else {
		_Wolfzq_Window_Message_startPause.call(this);
	}
}
//-----------------对话框加速结束-------------
Window_Message.prototype.isTriggered = function () {
    return (
        Input.isRepeated("ok") || Input.isRepeated("cancel") ||
		Input.isRepeated('skip') || TouchInput.isRepeated()
    );
};

//-----------------------------------------------------------------------------
//-----------------随机点阵停止移动-------------
var _Wolfzq_Game_Event_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
	if ($gameSwitches.value(25)) {
		return;
	}
	_Wolfzq_Game_Event_updateSelfMovement.call(this);
};
//-----------------随机点阵停止移动结束-------------

// Wolfzq_Event
function Wolfzq_Event() {
    this.initialize.apply(this, arguments);
};

Wolfzq_Event.prototype.initialize = function() {
};

//改变一个事件的自动开关
Wolfzq_Event.prototype.changeSwitch = function(id, key, value) {
	var selfKey = [$gameMap.mapId(), id, key];
	$gameSelfSwitches.setValue(selfKey, value);
};
Wolfzq_Event.prototype.changeSwitchs = function(ids, key, value) {
	var len = ids.length;
	var mapId = $gameMap.mapId();
	for (var i = 0; i < len; i++) {
		var selfKey = [mapId, ids[i], key];
		$gameSelfSwitches.setValue(selfKey, value);
	}
};
Wolfzq_Event.prototype.getSwitch = function(id, key) {
	var selfKey = [$gameMap.mapId(), id, key];
	return $gameSelfSwitches.value(selfKey);
};
Wolfzq_Event.prototype.getEvent = function(eventId) {
	if (eventId > 0) {
		return $gameMap.event(eventId);
	} else {
		return $gamePlayer;
	}
};

(function() {
	$we = new Wolfzq_Event();
})();