###*
  @class canvasEditor.core
    canvasEditorのコアを制御します。
###
canvas = require("canvas")

#==============================================================================
# method
#==============================================================================
###*
  @method init
  初期定義を行います。。
###
exports.init = () ->
  layer = new canvas.layer({name:"canvasEditor", width:1000, height:800})
  # layer.setBG()
  # button = new canvas.gui.button(
  #   name:"testButton"
  #   event:
  #     onMouseDown:() ->
  #       console.log("test")
  # )

  # slider = new canvas.gui.slider(
  #   name:"testSlider"
  # )
