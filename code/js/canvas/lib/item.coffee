###*
  @class canvas.item
    paper item を操作します。
###

###*
  @method setParam
  itemにパラメータを一括で設定します。
  @param {Item} item 
  @param {Object} param itemParam
###
exports.setParam = (item, param) ->
  item.style = param.style
  item.bounds.point = param.shape.point if param.shape.point
  item.bounds.size = param.shape.size if param.shape.size
