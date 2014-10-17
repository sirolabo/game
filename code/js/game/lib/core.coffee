###*
  @class game.core
  基本となるメソッドを扱います。
###
r = {}
r.core = require('core')
r.data = require("./data")
r.config = require("./config").config
r.canvas = require("canvas")
debug = true

#==============================================================================
# method
#==============================================================================
###*
  @method start
  ゲームを開始します。
###
exports.start = () ->
  # rect = new Path.Rectangle( [0,0,100,100])
  # rect.fillColor = "blue"
  # rect.add(new Point(0, 0))

  # path = new Path.Circle(
  #   center: view.center,
  #   radius: 30,
  #   strokeColor: 'red'
  # )

  #パラメータ初期化
  # data.layer["bg"] = new Layer({name: "bg"})
  # data.layer["bg"] = new layer({id:"bg"})
  # data.layer["bg"] = new layer.layer({id:"bg"})
  # data.layer["bg"].setColor("#333")
  # data.layer["map1"] = new layer.layer({id:"map1"})
  # data.layer["map1"].setColor("#c00")
  # data.layer["bg"].show()

  # #デバックモード起動
  # if debug
  #   r.data.layer["debug"] = new Layer({name: "debug"})
    # data.layer["debug"] = new layer.layer({id:"debug"})
    # data.layer["debug"].show()
    # editor = require("../systemEditor")
  
  #開始画面表示
  #@title()

# view.onFrame = () ->
#   console.log "test"

###*
  @method title
  タイトル画面を表示します。
###
exports.title = () ->
  titleInputCtr = (input) ->
    console.log input
  #@inputCtr("title", titleInputCtr)
  #背景画面表示
  #コントロール受付
  #require("webCustomizer")

###*
  @method inputCtr
  入力情報を制御します。
  @param {String} process 現在のゲームプロセス
  @param {String} callback 入力されたキー情報を渡す関数
###
exports.inputCtr = (process, callback) ->
  $(window).keydown (e) =>
    callback e.keyCode
    return false