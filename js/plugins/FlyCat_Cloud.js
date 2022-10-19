//=============================================================================
// RPG Maker MZ - 地图云层
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.0.0 FlyCat-<地图云层>
 * @author FlyCat
 * 
 * @command hideMap
 * @text 地图遮罩显示/隐藏
 * @desc 地图遮罩显示/隐藏
 *
 * @arg type
 * @type boolean
 * @default
 * @text 显示/隐藏
 * @desc 显示/隐藏
 * 
 * @help
 * 
 * 【地图备注】
 * 
 * 图片放在img/parallaxes/下
 * 
 * 范例：<地图遮罩:云,150,1,1>
 * 
 * 讲解：‘云’是图片名,‘150’透明度,第一个‘1’是X移动速度,第二个‘1’是Y移动速度
 * 
 * 【插件指令】
 * 
 * 地图遮罩显示隐藏 true显示 false不显示
 * 
 * 【脚本】
 * 
 * $gameSystem._mapVisible = true 显示
 * 
 * $gameSystem._mapVisible = false 不显示
 * 
 */
var Imported = Imported || {};
Imported.FlyCat_Cloud = true;

var FlyCat = FlyCat || {};
FlyCat.Cloud = {};
FlyCat.Cloud.parameters = PluginManager.parameters('FlyCat_Cloud');
FlyCat.Cloud.cloudImg = String(FlyCat.Cloud.parameters['cloudImg']);


PluginManager.registerCommand('FlyCat_Cloud', 'hideMap', args => {
    const TF = eval(args.type);
    $gameSystem._mapVisible = TF;
});


FlyCat.Cloud.Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function () {
    FlyCat.Cloud.Scene_Map_createDisplayObjects.call(this);
    if ($gameSystem._mapVisible === undefined) {
        $gameSystem._mapVisible = true;
    }
    this.createCloudSprite();
};
Scene_Map.prototype.createCloudSprite = function () {
    this._cloudSprite = new TilingSprite();
    this._cloudSprite.move(0, 0, Graphics.width, Graphics.height);
    const mapMeta = $dataMap.meta.地图遮罩 ? $dataMap.meta.地图遮罩.split(',') : null;
    if (mapMeta) {
        this._mapMeta = mapMeta;
        this._cloudSprite.bitmap = ImageManager.loadParallax(this._mapMeta[0]);
        this.addChild(this._cloudSprite);
        this._cloudSprite.opacity = Number(this._mapMeta[1]);
        this._cloudSprite.visible = $gameSystem._mapVisible ? true : false;
    }
};
FlyCat.Cloud.Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function () {
    FlyCat.Cloud.Scene_Map_update.call(this);
    if (this._cloudSprite) {
        $gameSystem._mapVisible ? this._cloudSprite.visible = true : this._cloudSprite.visible = false;
    }

    if (this._mapMeta) {
        this._cloudSprite.origin.x += Number(this._mapMeta[2]);
        this._cloudSprite.origin.y += Number(this._mapMeta[3]);
    }
};