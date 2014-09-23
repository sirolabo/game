global.isLocalTest = true
# global.serverURL = "http://test1-sirolabo.rhcloud.com/"
# global.serverURL = "http://test2-sirolabo.rhcloud.com/"

paper.install(window)
window.onload = () ->
  paper.setup('viewport')
  game = require("game")
  game.core.start("#viewport")
