global.isLocalTest = true
# global.serverURL = "http://test1-sirolabo.rhcloud.com/"
# global.serverURL = "http://test2-sirolabo.rhcloud.com/"

# canvas = require("canvas")
canvasEditor = require("canvasEditor")

window.onload = () ->
  canvasEditor.core.init()
  # canvas.core.init('viewport')
  # game = require("game")
  # game.core.start()
