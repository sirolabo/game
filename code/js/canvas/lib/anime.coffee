###*
  @class canvas.anime
    レイヤーを操作します。
###
class anime
  ###*
    @method constructor
    初期化します。
    @param {PaperObj} target target
  ###
  constructor: (target) ->
    @target = target
    frameRate = 60
    getFrameIncVal = (val_data, val_param, allCount) ->
      (val_param - val_data) / allCount if val_param != undefined

    @target.onFrame = (e) =>
      for key, target of @target.animation
        if !target.startCount
          setCount = () =>
            allCount = Math.round(target.time * frameRate / 1000)
            allCount = 1 if allCount == 0
            target.startCount = e.count
            target.endCount = target.startCount + allCount
            allCount

          allCount = setCount()
          target.width = getFrameIncVal(target.item.bounds.size.width, target.param.shape.size.width, allCount)
          target.height = getFrameIncVal(target.item.bounds.size.height, target.param.shape.size.height, allCount)
          color = target.item.fillColor.components
          target.color = 
            red: getFrameIncVal(target.item.fillColor.red, target.param.style.fillColor.red, allCount)
            green: getFrameIncVal(target.item.fillColor.green, target.param.style.fillColor.green, allCount)
            blue: getFrameIncVal(target.item.fillColor.blue, target.param.style.fillColor.blue, allCount)

        target.item.bounds.size.width += target.width
        target.item.bounds.size.height += target.height
        target.item.fillColor = new Color(
            target.item.fillColor.red + target.color.red
            target.item.fillColor.green + target.color.green
            target.item.fillColor.blue + target.color.blue
          )

        if e.count >= target.endCount - 1
          target.item.bounds.size.width = Math.round(target.item.bounds.size.width)
          target.item.bounds.size.height = Math.round(target.item.bounds.size.height)
          target.item.fillColor.red = Math.round(target.item.fillColor.red * 100) / 100
          target.item.fillColor.green = Math.round(target.item.fillColor.green * 100) / 100
          target.item.fillColor.blue = Math.round(target.item.fillColor.blue * 100) / 100
          delete @target.animation[key]

module.exports = {
  anime: anime
}