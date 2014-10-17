r =
  anime: require("./anime").anime

###*
  @class canvas.layer
    レイヤーを操作します。
###
class layer extends Layer
  ###*
    @method constructor
    layerを初期化します。
    @param {Object} param id
  ###
  constructor: (param) ->
    super(param)
    if param.width then @width= param.width else @width = 1920
    if param.height then @height= param.height else @height = 1080
    @animation = {}
    new r.anime(@)

  ###*
    @method setBG
    layerの背景を設定します。
    @param {Object} param id
  ###
  setBG:() ->
    @activate()
    bg = new Path.Rectangle(new Point(0, 0), new Size(@width, @height))
    bg.fillColor = "blue"
    bg.name = "BG"

module.exports = {
  layer: layer
}
