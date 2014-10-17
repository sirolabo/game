(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var canvasEditor;

global.isLocalTest = true;

canvasEditor = require("canvasEditor");

window.onload = function() {
  return canvasEditor.core.init();
};



}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"canvasEditor":2}],2:[function(require,module,exports){
module.exports = {
  core: require('./lib/core')
};



},{"./lib/core":3}],3:[function(require,module,exports){

/**
  @class canvasEditor.core
    canvasEditorのコアを制御します。
 */
var canvas;

canvas = require("canvas");


/**
  @method init
  初期定義を行います。。
 */

exports.init = function() {
  var layer;
  return layer = new canvas.layer({
    name: "canvasEditor",
    width: 1000,
    height: 800
  });
};



},{"canvas":4}],4:[function(require,module,exports){
module.exports = {
  core: require('./lib/core'),
  layer: require('./lib/layer').layer,
  gui: require('./lib/gui'),
  item: require('./lib/item'),
  anime: require('./lib/anime')
};



},{"./lib/anime":5,"./lib/core":6,"./lib/gui":7,"./lib/item":8,"./lib/layer":9}],5:[function(require,module,exports){

/**
  @class canvas.anime
    レイヤーを操作します。
 */
var anime;

anime = (function() {

  /**
    @method constructor
    初期化します。
    @param {PaperObj} target target
   */
  function anime(target) {
    var frameRate, getFrameIncVal;
    this.target = target;
    frameRate = 60;
    getFrameIncVal = function(val_data, val_param, allCount) {
      if (val_param !== void 0) {
        return (val_param - val_data) / allCount;
      }
    };
    this.target.onFrame = (function(_this) {
      return function(e) {
        var allCount, color, key, setCount, _ref, _results;
        _ref = _this.target.animation;
        _results = [];
        for (key in _ref) {
          target = _ref[key];
          if (!target.startCount) {
            setCount = function() {
              var allCount;
              allCount = Math.round(target.time * frameRate / 1000);
              if (allCount === 0) {
                allCount = 1;
              }
              target.startCount = e.count;
              target.endCount = target.startCount + allCount;
              return allCount;
            };
            allCount = setCount();
            target.width = getFrameIncVal(target.item.bounds.size.width, target.param.shape.size.width, allCount);
            target.height = getFrameIncVal(target.item.bounds.size.height, target.param.shape.size.height, allCount);
            color = target.item.fillColor.components;
            target.color = {
              red: getFrameIncVal(target.item.fillColor.red, target.param.style.fillColor.red, allCount),
              green: getFrameIncVal(target.item.fillColor.green, target.param.style.fillColor.green, allCount),
              blue: getFrameIncVal(target.item.fillColor.blue, target.param.style.fillColor.blue, allCount)
            };
          }
          target.item.bounds.size.width += target.width;
          target.item.bounds.size.height += target.height;
          target.item.fillColor = new Color(target.item.fillColor.red + target.color.red, target.item.fillColor.green + target.color.green, target.item.fillColor.blue + target.color.blue);
          if (e.count >= target.endCount - 1) {
            target.item.bounds.size.width = Math.round(target.item.bounds.size.width);
            target.item.bounds.size.height = Math.round(target.item.bounds.size.height);
            target.item.fillColor.red = Math.round(target.item.fillColor.red * 100) / 100;
            target.item.fillColor.green = Math.round(target.item.fillColor.green * 100) / 100;
            target.item.fillColor.blue = Math.round(target.item.fillColor.blue * 100) / 100;
            _results.push(delete _this.target.animation[key]);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
    })(this);
  }

  return anime;

})();

module.exports = {
  anime: anime
};



},{}],6:[function(require,module,exports){

/**
  @class canvas.core
    canvasのコアを制御します。
 */

/**
  @method init
  canvasの初期定義を行います。
  @param {String} id canvasID
 */
exports.init = function(id) {};



},{}],7:[function(require,module,exports){

/**
  @class canvas.gui
    gui周りの共通クラスです。
 */
var button, gui, r, slider,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

r = {};

r.item = require("./item");

gui = (function(_super) {
  __extends(gui, _super);


  /**
    @method constructor
    初期化します。
    @param {Object} param
   */

  function gui(param) {
    var initBody;
    initBody = (function(_this) {
      return function() {
        var key, _ref, _results;
        _ref = _this.bodyParam;
        _results = [];
        for (key in _ref) {
          param = _ref[key];
          _results.push(_this.setBody(key, _this.bodyParam[key].normal));
        }
        return _results;
      };
    })(this);
    this.body = new Group({
      name: param.name
    });
    if (param.width) {
      this.width = param.width;
    } else {
      this.width = 150;
    }
    if (param.height) {
      this.height = param.height;
    } else {
      this.height = 50;
    }
    if (param.bodyParam) {
      this.bodyParam = param.bodyParam;
    } else {
      this.bodyParam = param.defaultBodyParam;
    }
    initBody();
  }


  /**
    @method setBody
    bodyにpathを追加します。
    @param {String} name
    @param {Object} body param
   */

  gui.prototype.setBody = function(name, param) {
    var path, shape;
    shape = param.shape;
    switch (shape.type) {
      case "rect":
        path = new Path.Rectangle(shape.point, shape.size);
        break;
      default:
        console.log("shape.type error:" + shape.type);
    }
    console.log(path);
    path.style = param.style;
    path.name = name;
    return this.body.addChild(path);
  };

  return gui;

})(Item);


/**
  @class canvas.gui.button
 */

button = (function(_super) {
  __extends(button, _super);


  /**
    @method constructor
    @param {Object} param
   */

  function button(param) {
    param.defaultBodyParam = {
      bg2: {
        normal: {
          shape: {
            type: "rect",
            point: new Point(0, 0),
            size: new Size(150, 50)
          },
          style: {
            fillColor: "#d00"
          }
        }
      },
      bg: {
        normal: {
          shape: {
            type: "rect",
            point: new Point(0, 0),
            size: new Size(150, 50)
          },
          style: {
            fillColor: new Color(0.9, 0.9, 0.9)
          }
        },
        onMouseDown: {
          shape: {
            type: "rect",
            point: new Point(0, 0),
            size: new Size(145, 45)
          },
          style: {
            fillColor: new Color(0.8, 0.8, 0.8)
          }
        }
      }
    };
    button.__super__.constructor.call(this, param);
    this.body.onMouseDown = (function(_this) {
      return function(e) {};
    })(this);
    this.body.onMouseUp = (function(_this) {
      return function(e) {
        r.item.setParam(_this.body.children["bg"], _this.bodyParam["bg"].normal);
        if (param.event.onMouseUp) {
          return param.event.onMouseUp();
        }
      };
    })(this);
    this.body.on("mousedown", (function(_this) {
      return function(e) {
        return console.log(e);
      };
    })(this));
    this.body.on("mouseenter", (function(_this) {
      return function(e) {};
    })(this));
    this.body.on("mouseleave", (function(_this) {
      return function(e) {
        return r.item.setParam(_this.body.children["bg"], _this.bodyParam["bg"].normal);
      };
    })(this));
  }

  return button;

})(gui);


/**
  @class canvas.gui.slider
 */

slider = (function(_super) {
  __extends(slider, _super);


  /**
    @method constructor
    @param {Object} param
   */

  function slider(param) {
    if (param.width) {
      this.width = param.width;
    } else {
      this.width = 150;
    }
    param.defaultBodyParam = {
      line: {
        normal: {
          shape: {
            type: "rect",
            point: new Point(0, 7.5),
            size: new Size(150, 5)
          },
          style: {
            fillColor: new Color(0, 0, 0)
          }
        }
      },
      control: {
        normal: {
          shape: {
            type: "rect",
            point: new Point(20, 0),
            size: new Size(15, 20)
          },
          style: {
            fillColor: new Color(0.9, 0.9, 0.9)
          }
        }
      }
    };
    slider.__super__.constructor.call(this, param);
    this.body.children["control"].onMouseDown = (function(_this) {
      return function(e) {
        return console.log("hit");
      };
    })(this);
    this.body.children["control"].onMouseDrag = (function(_this) {
      return function(e) {};
    })(this);
  }

  return slider;

})(gui);

module.exports = {
  gui: gui,
  button: button,
  slider: slider
};



},{"./item":8}],8:[function(require,module,exports){

/**
  @class canvas.item
    paper item を操作します。
 */

/**
  @method setParam
  itemにパラメータを一括で設定します。
  @param {Item} item 
  @param {Object} param itemParam
 */
exports.setParam = function(item, param) {
  item.style = param.style;
  if (param.shape.point) {
    item.bounds.point = param.shape.point;
  }
  if (param.shape.size) {
    return item.bounds.size = param.shape.size;
  }
};



},{}],9:[function(require,module,exports){
var layer, r,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

r = {
  anime: require("./anime").anime
};


/**
  @class canvas.layer
    レイヤーを操作します。
 */

layer = (function(_super) {
  __extends(layer, _super);


  /**
    @method constructor
    layerを初期化します。
    @param {Object} param id
   */

  function layer(param) {
    layer.__super__.constructor.call(this, param);
    if (param.width) {
      this.width = param.width;
    } else {
      this.width = 1920;
    }
    if (param.height) {
      this.height = param.height;
    } else {
      this.height = 1080;
    }
    this.animation = {};
    new r.anime(this);
  }


  /**
    @method setBG
    layerの背景を設定します。
    @param {Object} param id
   */

  layer.prototype.setBG = function() {
    var bg;
    this.activate();
    bg = new Path.Rectangle(new Point(0, 0), new Size(this.width, this.height));
    bg.fillColor = "blue";
    return bg.name = "BG";
  };

  return layer;

})(Layer);

module.exports = {
  layer: layer
};



},{"./anime":5}]},{},[1])