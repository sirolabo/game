###*
  @class canvas.gui
    gui周りの共通クラスです。
###
r = {}
r.item = require("./item")

class gui extends Item
  ###*
    @method constructor
    初期化します。
    @param {Object} param
  ###
  constructor: (param) ->
    initBody = () =>
      for key, param of @bodyParam
        @setBody(key, @bodyParam[key].normal)

    @body = new Group({name:param.name})
    if param.width then @width = param.width else @width = 150
    if param.height then @height = param.height else @height = 50
    if param.bodyParam then @bodyParam = param.bodyParam else @bodyParam = param.defaultBodyParam
    initBody()

    # @body.onMouseDown = (e) =>
    #   param.event.onMouseDown() if param.event.onMouseDown
    # @body.onMouseUp = (e) =>
    #   param.event.onMouseUp() if param.event.onMouseUp
    # @body.onMouseMove = (e) =>
    #   param.event.onMouseMove() if param.event.onMouseMove
    # @body.onMouseDrag = (e) =>
    #   param.event.onMouseDrag() if param.event.onMouseDrag
    # @body.on("mouseenter", (e) =>
    # )
    # @body.on("mouseleave", (e) =>
    # )
    # @body.onKeyDown = (e) =>
    #   param.event.onKeyDown() if param.event.onKeyDown
    # @body.onKeyUp = (e) =>
    #   param.event.onKeyUp() if param.event.onKeyUp

  ###*
    @method setBody
    bodyにpathを追加します。
    @param {String} name
    @param {Object} body param
  ###
  setBody: (name, param) ->
    shape = param.shape
    switch shape.type
      when "rect"
        path = new Path.Rectangle(shape.point, shape.size)
      else
        console.log "shape.type error:" + shape.type
    console.log path
    path.style = param.style
    path.name = name
    @body.addChild(path)

###*
  @class canvas.gui.button
###
class button extends gui
  ###*
    @method constructor
    @param {Object} param
  ###
  constructor: (param) ->
    param.defaultBodyParam =
      bg2:
        normal:
          shape:
            type: "rect"
            point: new Point(0, 0)
            size: new Size(150, 50)
          style:
            fillColor: "#d00"
      bg:
        normal:
          shape:
            type: "rect"
            point: new Point(0, 0)
            size: new Size(150, 50)
          style:
            fillColor: new Color(0.9, 0.9, 0.9)
        onMouseDown:
          shape:
            type: "rect"
            point: new Point(0, 0)
            size: new Size(145, 45)
          style:
            fillColor: new Color(0.8, 0.8, 0.8)

    super(param)

    @body.onMouseDown = (e) =>
      # @body.layer.animation["test"] =
      #   item: @body.children["bg"]
      #   param: @bodyParam["bg"].onMouseDown
      #   time: 200
      # r.item.setParam(@body.children["bg"], @bodyParam["bg"].onMouseDown)
      # param.event.onMouseDown() if param.event.onMouseDown

    @body.onMouseUp = (e) =>
      # @body.layer.animation["test"] =
      #   item: @body.children["bg"]
      #   param: @bodyParam["bg"].normal
      #   time: 200
      r.item.setParam(@body.children["bg"], @bodyParam["bg"].normal)
      param.event.onMouseUp() if param.event.onMouseUp

    @body.on("mousedown", (e) =>
      console.log e
    )
    @body.on("mouseenter", (e) =>
    )

    @body.on("mouseleave", (e) =>
      r.item.setParam(@body.children["bg"], @bodyParam["bg"].normal)
    )

###*
  @class canvas.gui.slider
###
class slider extends gui
  ###*
    @method constructor
    @param {Object} param
  ###
  constructor: (param) ->
    if param.width then @width = param.width else @width = 150

    param.defaultBodyParam =
      line:
        normal:
          shape:
            type: "rect"
            point: new Point(0, 7.5)
            size: new Size(150, 5)
          style:
            fillColor: new Color(0, 0, 0)
      control:
        normal:
          shape:
            type: "rect"
            point: new Point(20, 0)
            size: new Size(15, 20)
          style:
            fillColor: new Color(0.9, 0.9, 0.9)

    super(param)

    @body.children["control"].onMouseDown = (e) =>
      console.log "hit"

    @body.children["control"].onMouseDrag = (e) =>
      # console.log e
      # if e.point.x >= @width
      #   point_x = @width
      # else if e.point.x <= 0
      #   point_x = 0
      # else
      #   point_x = e.point.x
      # console.log point_x
      # @body.children["control"].position.x = point_x
      # param.event.onMouseDrag() if param.event.onMouseDrag


module.exports = {
  gui: gui
  button: button
  slider: slider
}