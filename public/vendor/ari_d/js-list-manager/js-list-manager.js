(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],4:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":3,"_process":2,"inherits":1}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("../../Data/Collections/Collection");
var ListerAPI = /** @class */ (function () {
    function ListerAPI(lister, option, pagination, dataCenter, view) {
        this.lister = lister;
        this.option = option;
        this.pagination = pagination;
        this.dataCenter = dataCenter;
        this.view = view;
    }
    /**
     * Returns the Collection object.
     */
    ListerAPI.prototype.getCollection = function () {
        return this.dataCenter.getCollection();
    };
    /**
     * Returns the Collection object.
     */
    ListerAPI.prototype.getOriginalData = function () {
        var collection = this.getCollection();
        if (collection instanceof Collection_1.Collection) {
            return collection.getOriginalData();
        }
        return [];
    };
    /**
     * Checks to see whether or not the data has been set into received.
     */
    ListerAPI.prototype.isDataReady = function () {
        var collection = this.getCollection();
        if (collection instanceof Collection_1.Collection) {
            return true;
        }
        return false;
    };
    /**
     * Returns the option object.
     */
    ListerAPI.prototype.getOptions = function () {
        return this.option.all();
    };
    /**
     * Returns the current data object.
     */
    ListerAPI.prototype.getData = function () {
        var collection = this.getCollection();
        if (collection instanceof Collection_1.Collection) {
            return collection.all();
        }
        return this.throwNoCollectionSetError("getData");
    };
    ListerAPI.prototype.getCurrentPage = function () {
        if (this.getCollection() instanceof Collection_1.Collection) {
            var page = this.pagination.currentPage();
            this.pagination.setPage(1, this.getCollection().getTotal());
            if (this.pagination.hasPage(page)) {
                return page;
            }
        }
        return 1;
    };
    /**
     * Loads the app with the data.
     */
    ListerAPI.prototype.load = function (data) {
        this.dataCenter.setData(data);
        this.lister.showPage(this.getCurrentPage());
    };
    /**
     * Appends a row into the app`s data, and updates the app.
     *
     * @param row A row of data, a model.
     */
    ListerAPI.prototype.append = function (row) {
        var collection = this.getCollection();
        if (collection instanceof Collection_1.Collection && this.option.hasData()) {
            var data = collection.getOriginalData();
            data.push(row);
            return this.load(data);
        }
        return this.throwNoCollectionSetError("append");
    };
    /**
     * Prepends a row into the app`s data, and updates the app.
     *
     * @param row A row of data, a model.
     */
    ListerAPI.prototype.prepend = function (row) {
        var collection = this.getCollection();
        if (collection instanceof Collection_1.Collection && this.option.hasData()) {
            var data = collection.getOriginalData();
            data.unshift(row);
            return this.load(data);
        }
        return this.throwNoCollectionSetError("prepend");
    };
    /**
     * Inserts a row to the app`s data at the index of "index".
     *
     * @param row A row of data, a model.
     * @param index The index at which we want to place the row.
     */
    ListerAPI.prototype.insert = function (row, index) {
        if (this.getCollection() instanceof Collection_1.Collection && this.option.hasData()) {
            var data = this.getOriginalData();
            if (index > data.length) {
                index = data.length;
            }
            var slice1 = data.slice(0, index);
            var slice2 = data.slice(index);
            data = slice1.concat([row]).concat(slice2);
            return this.load(data);
        }
        return this.throwNoCollectionSetError("insert");
    };
    /**
     * Updates a row in the table that matches the filters in "where".
     *
     * @param where An object containing a set of filters to match against the rows.
     * @param row The row`s new values and attributes.
     */
    ListerAPI.prototype.update = function (where, attrs) {
        var collection = this.getCollection();
        if (collection instanceof Collection_1.Collection && this.option.hasData()) {
            if (collection.copy().where(where).all().length > 0) {
                collection.update(where, attrs);
                this.load(collection.all());
            }
            return this;
        }
        this.throwNoCollectionSetError("update");
    };
    /**
     * Refreshes the app with the local | remote data.
     */
    ListerAPI.prototype.refresh = function () {
        this.option.fire("reload.before");
    };
    /**
     * Refreshes the app with the local | remote data.
     */
    ListerAPI.prototype.reload = function () {
        var collection = this.getCollection();
        if (collection instanceof Collection_1.Collection && this.option.hasData()) {
            var data = collection.getOriginalData();
            if (collection.hasSearchQuery()) {
                this.resetSearch();
            }
            this.dataCenter.setCollection(new Collection_1.Collection(data));
            this.load(data);
            return this;
        }
        this.throwNoCollectionSetError("reload");
    };
    /**
     * Searches for a row matching the query string and shows the results.
     */
    ListerAPI.prototype.resetSearch = function () {
        this.view.components.search.setSearchQuery();
    };
    /**
     * Searches for a row matching the query string and shows the results.
     */
    ListerAPI.prototype.search = function (query) {
        this.view.components.search.setSearchQuery(query);
    };
    /**
     * Removes all the filters from collection`s data..
     */
    ListerAPI.prototype.removeFilters = function () {
        var collection = this.getCollection();
        if (collection instanceof Collection_1.Collection && this.option.hasData()) {
            var data = collection.getOriginalData();
            collection.removeFilters();
            this.load(data);
            return this;
        }
        this.throwNoCollectionSetError("removeFilters");
    };
    /**
     * Removes sorter settings from collection`s data..
     */
    ListerAPI.prototype.removeSorter = function () {
        var collection = this.getCollection();
        if (collection instanceof Collection_1.Collection && this.option.hasData()) {
            var data = collection.getOriginalData();
            collection.removeSorter();
            this.load(data);
            return this;
        }
        this.throwNoCollectionSetError("removeSorter");
    };
    /**
     * Puts the app in loading mode.
     */
    ListerAPI.prototype.showLoading = function () {
        this.lister.loadingMode(true);
    };
    /**
     * Deactivates the loading mode.
     */
    ListerAPI.prototype.hideLoading = function () {
        this.lister.loadingMode(false);
    };
    /**
     * Destroys the lister instance.
     */
    ListerAPI.prototype.destroy = function () {
        this.lister.destroy();
        this.lister = undefined;
        this.option = undefined;
        this.pagination = undefined;
        this.view = undefined;
        this.dataCenter = undefined;
    };
    /**
     * Filters the app`s data by the set of filters in the "filters" object.
     *
     * @param filters The object containing the filters we want to apply to data.
     */
    ListerAPI.prototype.filterBy = function (filters) {
        var collection = this.getCollection();
        if (collection instanceof Collection_1.Collection && this.option.hasData()) {
            collection.removeFilters();
            this.dataCenter.setFilters(filters);
            this.load(collection.getOriginalData());
            return this;
        }
        this.throwNoCollectionSetError("filterBy");
    };
    ListerAPI.prototype.sortBy = function (column, direction) {
        var collection = this.getCollection();
        if (collection instanceof Collection_1.Collection && this.option.hasData()) {
            this.dataCenter.setSorter(column, direction);
            this.load(collection.getOriginalData());
            return this;
        }
        this.throwNoCollectionSetError("sortBy");
    };
    /**
     * Filters the app`s data by the set of filters in the "filters" object.
     *
     * @param filters The object containing the filters we want to apply to data.
     */
    ListerAPI.prototype.pluck = function (column) {
        var collection = this.getCollection();
        if (collection) {
            return collection.pluck(column);
        }
        this.throwNoCollectionSetError("pluck");
    };
    /**
     * Changes one of the app`s option, and then refreshes the app with that option.
     *
     * @param name The option name / index.
     * @param value The option`s new value.
     */
    ListerAPI.prototype.updateOption = function (name, value) {
        this.option.set(name, value);
    };
    ListerAPI.prototype.pageExists = function (page) {
        return this.pagination.hasPage(page);
    };
    /**
     * Moves the app to the page specified. This only works if the option pagination
     * is active.
     *
     * @param page The destination page number.
     */
    ListerAPI.prototype.goToPage = function (page) {
        if (this.pageExists(page)) {
            this.lister.showPage(page);
        }
        return this;
    };
    /**
     * Moves the app to the previous page.
     */
    ListerAPI.prototype.prevPage = function (loop) {
        if (loop === void 0) { loop = true; }
        var page = this.pagination.currentPage();
        if (!this.pagination.onFirstPage()) {
            page--;
        }
        else if (loop) {
            page = this.pagination.totalPages();
        }
        this.lister.showPage(page);
        return this;
    };
    /**
     * Moves the app to the next page.
     */
    ListerAPI.prototype.nextPage = function (loop) {
        if (loop === void 0) { loop = true; }
        var page = this.pagination.currentPage();
        if (this.pagination.hasMorePages()) {
            page++;
        }
        else if (loop) {
            page = 1;
        }
        this.lister.showPage(page);
        return this;
    };
    ListerAPI.prototype.throwNoCollectionSetError = function (method_name) {
        throw new Error("The data has not yet been set, you should put the method " + method_name + " in an event listener for the event \"listerjs.data.ready\".");
    };
    return ListerAPI;
}());
exports.ListerAPI = ListerAPI;

},{"../../Data/Collections/Collection":12}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Functions_1 = require("../../Utilities/Functions");
var AlgoliaAPI = /** @class */ (function () {
    function AlgoliaAPI(option, pagination) {
        this.option = option;
        this.pagination = pagination;
    }
    /**
     * Calls the neccessary XMLHttpRequest methods and fetches the resulting data.
     *
     * @param data The requested data to be sent.
     * @param method Request method : "GET", "POST", ... .
     * @param url Destination server url.
     * @param successCallback Callback in case of success.
     * @param errorCallback Callback in case of error.
     */
    AlgoliaAPI.prototype.call = function (data, method, url, successCallback, errorCallback) {
        if (method === void 0) { method = "GET"; }
        var self = this;
        data = this.option.hooks.call("algoliaRequestData", function (query, limit, offset) {
            return {
                query: query,
                hitsPerPage: limit,
                page: offset / limit,
                analytics: false,
                attributesToRetrieve: "*",
                getRankingInfo: true,
                responseFields: "*",
                facets: [],
            };
        }, [data.query, data.limit, data.offset]);
        if (window.index) {
            return window.index.search(data, function (error, response) {
                if (error && errorCallback) {
                    self.option.fire("algolia.load.error", [error]);
                    return errorCallback(error, response);
                }
                else if (!error) {
                    if (Functions_1.isUndef(response) || Functions_1.isUndef(response.hits) || Functions_1.isUndef(response.nbHits)) {
                        console.error("ListerJS Error : The data structure returned from server is not correct, the json response should have at least 2 properties : \"hits\" and \"nbHits\".");
                        throw new Error("Wrong data structure!");
                    }
                    self.option.fire("algolia.load.successful", [response]);
                    return successCallback(response.hits, response.nbHits);
                }
            });
        }
        return this.sendAjaxRequest(data, method, url, successCallback, errorCallback);
    };
    /**
     * Sends the request via algoliaAjaxRequest hook, if no such hook exists, sends it
     * via available ajax methods, again if no method found, it will throw an error.
     *
     * @param data The requested data to be sent.
     * @param method Request method : "GET", "POST", ... .
     * @param url Destination server url.
     * @param successCallback Callback in case of success.
     * @param errorCallback Callback in case of error.
     */
    AlgoliaAPI.prototype.sendAjaxRequest = function (data, method, url, successCallback, errorCallback) {
        if (method === void 0) { method = "GET"; }
        var self = this;
        return this.option.hooks.call("algoliaAjaxRequest", function (data, method, url, success, error) {
            if (method === void 0) { method = "GET"; }
            if (window.jQuery) {
                return self.requestViaJquery(data, method, url, success, error);
            }
            else if (window.axios) {
                return self.requestViaAxios(data, method, url, success, error);
            }
            else {
                throw new Error("Please either provide one of Algolia API, jQuery or Axios ajax libraries, or create a hook named ajaxRequest and handle the requests manually.");
            }
        }, [data, method, url, successCallback, errorCallback]);
    };
    /**
     * Sends the ajax request via jQuery`s ajax method.
     *
     * @param data The requested data to be sent.
     * @param method Request method : "GET", "POST", ... .
     * @param url Destination server url.
     * @param successCallback Callback in case of success.
     * @param errorCallback Callback in case of error.
     */
    AlgoliaAPI.prototype.requestViaJquery = function (data, method, url, success, error) {
        if (method === void 0) { method = "GET"; }
        var self = this;
        return $.ajax({
            method: method,
            data: data,
            url: url,
            headers: {
                "X-Algolia-API-Key": this.option.get("algolia.api_key"),
                "X-Algolia-Application-Id": this.option.get("algolia.app_key"),
            },
        })
            .done(function (response) {
            if (Functions_1.isUndef(response) || Functions_1.isUndef(response.hits) || Functions_1.isUndef(response.nbHits)) {
                console.error("ListerJS Error : The data structure returned from server is not correct, the json response from Algolia should have at least 2 properties : \"hits\" and \"nbHits\".");
                throw new Error("Wrong data structure!");
            }
            self.option.fire("algolia.load.successful", [response]);
            return success(response.hits, response.nbHits);
        })
            .fail(function (err) {
            self.option.fire("algolia.load.error", [error]);
            if (error) {
                error(err);
            }
        });
    };
    /**
     * Sends the ajax request via axios`s ajax methods.
     *
     * @param data The requested data to be sent.
     * @param method Request method : "GET", "POST", ... .
     * @param url Destination server url.
     * @param successCallback Callback in case of success.
     * @param errorCallback Callback in case of error.
     */
    AlgoliaAPI.prototype.requestViaAxios = function (data, method, url, success, error) {
        if (method === void 0) { method = "GET"; }
        var self = this;
        var instance = window.axios.create({
            headers: {
                "X-Algolia-API-Key": this.option.get("algolia.api_key"),
                "X-Algolia-Application-Id": this.option.get("algolia.app_key"),
            },
        });
        return instance.request({
            method: method,
            url: url,
            params: ["post", "put", "patch"].includes(method.toLowerCase()) ? {} : data,
            data: ["post", "put", "patch"].includes(method.toLowerCase()) ? data : {},
        })
            .then(function (response) {
            if (Functions_1.isUndef(response) || Functions_1.isUndef(response.hits) || Functions_1.isUndef(response.nbHits)) {
                console.error("ListerJS Error : The data structure returned from server is not correct, the json from Algolia response should have at least 2 properties : \"hits\" and \"nbHits\".");
                throw new Error("Wrong data structure!");
            }
            self.option.fire("algolia.load.successful", [response]);
            return success(response.data.hits, response.data.nbHits);
        })
            .catch(function (err) {
            self.option.fire("algolia.load.error", [err]);
            if (error) {
                error(err);
            }
        });
    };
    return AlgoliaAPI;
}());
exports.AlgoliaAPI = AlgoliaAPI;

},{"../../Utilities/Functions":19}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AlgoliaAPI_1 = require("./AlgoliaAPI");
var ServerAPI_1 = require("./ServerAPI");
var Functions_1 = require("../../Utilities/Functions");
var Connector = /** @class */ (function () {
    function Connector(option, pagination) {
        this.option = option;
        this.pagination = pagination;
        if (this.option.get("algolia")) {
            this.algoliaConnector = new AlgoliaAPI_1.AlgoliaAPI(this.option, this.pagination);
        }
        else if (this.option.get("url")) {
            this.connector = new ServerAPI_1.ServerAPI(this.option, this.pagination);
        }
    }
    Connector.prototype.fetchData = function (query, sort_info, successCallback, errorCallback) {
        var data = {
            query: query,
            limit: this.pagination.getLimit(),
            offset: this.pagination.getOffset(),
        };
        if (sort_info.length) {
            data["orderBy"] = sort_info[0];
            data["order"] = sort_info[1];
        }
        var self = this;
        if (this.algoliaConnector) {
            this.algoliaConnector.call(data, this.option.get("api_method"), this.option.get("url"), successCallback, errorCallback);
        }
        else if (this.connector) {
            this.connector.call(data, this.option.get("api_method"), this.option.get("url"), function (response) {
                if (Functions_1.isUndef(response) || Functions_1.isUndef(response.data) || Functions_1.isUndef(response.total)) {
                    self.option.fire("error", [{
                            short_message: "Processing data failed.",
                            message: "The data structure returned from server is not correct, the json response should have at least 2 properties : \"data\" and \"total\".",
                            url: self.option.get("url"),
                            method: self.option.get("api_method"),
                            response: response,
                        }]);
                    throw new Error("Wrong data structure!");
                }
                successCallback(response.data, response.total);
            }, function (err) {
                errorCallback(err);
            });
        }
    };
    Connector.prototype.prefetchData = function (successCallback, errorCallback) {
        var data = {
            query: "",
            limit: this.option.get("max_per_page", 1000),
            offset: 0,
        };
        var self = this;
        if (this.algoliaConnector) {
            this.algoliaConnector.call(data, this.option.get("api_method"), this.option.get("url"), successCallback, errorCallback);
        }
        else if (this.connector) {
            this.connector.call(data, this.option.get("api_method"), this.option.get("url"), function (response) {
                if (Functions_1.isUndef(response) || Functions_1.isUndef(response.data) || Functions_1.isUndef(response.total)) {
                    self.option.fire("error", [{
                            short_message: "Processing data failed.",
                            message: "The data structure returned from server is not correct, the json response should have at least 2 properties : \"data\" and \"total\".",
                            url: self.option.get("url"),
                            method: self.option.get("api_method"),
                            response: response,
                        }]);
                    throw new Error("Wrong data structure!");
                }
                successCallback(response.data, response.total);
            }, function (err) {
                errorCallback(err);
            });
        }
    };
    return Connector;
}());
exports.Connector = Connector;

},{"../../Utilities/Functions":19,"./AlgoliaAPI":6,"./ServerAPI":8}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerAPI = /** @class */ (function () {
    function ServerAPI(option, pagination) {
        this.option = option;
        this.pagination = pagination;
    }
    ServerAPI.prototype.call = function (data, method, url, success, error) {
        if (method === void 0) { method = "GET"; }
        var self = this;
        return this.option.hooks.call("ajaxRequest", function (data, method, url, success, error) {
            if (method === void 0) { method = "GET"; }
            if (window.jQuery) {
                return self.requestViaJquery(data, method, url, success, error);
            }
            else if (window.axios) {
                return self.requestViaAxios(data, method, url, success, error);
            }
            else {
                throw new Error("Please either provide one of jQuery or Axios ajax libraries, or create a hook named ajaxRequest and handle the requests manually.");
            }
        }, [data, method, url, success, error]);
    };
    ServerAPI.prototype.requestViaJquery = function (data, method, url, success, error) {
        if (method === void 0) { method = "GET"; }
        var self = this;
        return $.ajax({
            method: method,
            data: data,
            url: url,
        })
            .done(function (response) {
            self.option.fire("load.successful", [response]);
            success(response);
        })
            .fail(function (err) {
            self.option.fire("load.error", [err]);
            if (error) {
                error(err);
            }
        });
    };
    ServerAPI.prototype.requestViaAxios = function (data, method, url, success, error) {
        if (method === void 0) { method = "GET"; }
        var self = this;
        return window.axios({
            method: method,
            url: url,
            params: ["post", "put", "patch"].includes(method.toLowerCase()) ? {} : data,
            data: ["post", "put", "patch"].includes(method.toLowerCase()) ? data : {},
        })
            .then(function (response) {
            self.option.fire("load.successful", [response]);
            success(response.data);
        })
            .catch(function (err) {
            self.option.fire("load.error", [err]);
            if (error) {
                error(err);
            }
        });
    };
    return ServerAPI;
}());
exports.ServerAPI = ServerAPI;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultTemplates_1 = require("./DefaultTemplates");
exports.DefaultOptions = {
    el: ".table-1",
    data: [{ id: 1 }, { id: 2 }],
    pagination: true,
    per_page: 10,
    max_per_page: 1000,
    search: true,
    searchables: ["name", "title"],
    url: "",
    loading_class: "is-loading",
    lazy_load: false,
    search_input_selector: "#lister-search-query",
    filters: false,
    sort: false,
    sorters: false,
    prefetch: false,
    algolia: false,
    table: false,
    debug: false,
    table_headers: {},
    api_method: "GET",
    templates: {
        row: DefaultTemplates_1.DefaultTemplates.row,
        tableRow: DefaultTemplates_1.DefaultTemplates.tableRow,
        table: DefaultTemplates_1.DefaultTemplates.table,
        pagination: DefaultTemplates_1.DefaultTemplates.pagination,
        search: DefaultTemplates_1.DefaultTemplates.search,
        notFound: DefaultTemplates_1.DefaultTemplates.notFound,
        lazyLoader: DefaultTemplates_1.DefaultTemplates.lazyLoader,
        wrapper: DefaultTemplates_1.DefaultTemplates.wrapper,
    },
    searchParams: function (limit, offset, query) {
        if (this.algolia) {
            return {
                query: query,
                hitsPerPage: limit,
                page: offset / limit,
                analytics: false,
                attributesToRetrieve: "*",
                getRankingInfo: true,
                responseFields: "*",
                facets: [],
            };
        }
        return {
            query: query,
            limit: limit,
            offset: offset / limit,
        };
    },
    hooks: {},
    events: {},
};

},{"./DefaultTemplates":10}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var windowWidth = $(window).width();
exports.DefaultTemplates = {
    row: function (row, index) {
        return "\n        <li class=\"list-group-item\" data-user=\"" + row.user_id + "\" id=\"lister-item-" + row.id + "\">\n            <div class=\"media\">\n                <div class=\"media-right\">\n                    <a class=\"avatar avatar-off\" href=\"" + row.profile_url + "\">\n                        <img src=\"" + row.image + "\" alt=\"\">\n                        <i></i>\n                    </a>\n                </div>\n                <div class=\"media-body\">\n\n                    <div class=\"row-top\">\n                        <h4 class=\"media-heading\">\n                            <a href=\"" + row.profile_url + "\">\n                                " + row.name + "\n                            </a>\n                        </h4>\n                    </div> <!-- / .row-top -->\n\n                    <div class=\"row-top\">\n                        <small class=\"author_info\"> " + row.subjects + " </small>\n                    </div> <!-- / .row-top -->\n\n                </div>\n            </div>\n        </li>";
    },
    table: function (headers) {
        return "\n\t\t\t<div class=\"table-responsive\">\n\t\t\t\t<table class=\"table table-bordered table-sort lister-table\" style=\"margin: 0; \">\n\t\t\t\t\t<thead>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t" + headers + "\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t</thead>\n\t\t\t\t\t<tbody>\n\t\t\t\t\t</tbody>\n\t\t\t\t</table>\n\t\t\t</div>";
    },
    tableRow: function (headers, row, index) {
        if (index === void 0) { index = 0; }
        var htmlArr = [];
        htmlArr.push("<tr>");
        for (var column in headers) {
            var val = row[column];
            htmlArr.push("<td>" + val + "</td>");
        }
        htmlArr.push("</tr>");
        return htmlArr.join("\n");
    },
    pagination: function (pagination) {
        var html = [];
        var maxPaginationSize = 7;
        if (!pagination.hasPages()) {
            return "";
        }
        html.push("\n\t\t<nav aria-label=\"Page navigation example\">\n\t\t\t<ul class=\"pagination pagination-round pagination-hard-square justify-content-end mt-4\">\n\t\t");
        if (pagination.onFirstPage()) {
            html.push("\n\t\t\t\t\t\t<li class=\"page-item disabled\">\n\t\t\t\t\t\t\t<span class=\"page-link\" aria-label=\"Previous\">\n\t\t\t\t\t\t\t\t<i class=\"fas fa-angle-left\"></i>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t");
        }
        else {
            var previousPage = pagination.currentPage() - 1;
            html.push("\n\t\t\t\t\t\t<li class=\"page-item\">\n\t\t\t\t\t\t\t<a class=\"page-link\" data-page=\"" + previousPage + "\" href=\"javascript:void(0)\" rel=\"prev\" aria-label=\"Previous\">\n\t\t\t\t\t\t\t\t<i class=\"fas fa-angle-left\"></i>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t");
        }
        var createPaginationLink = function (paginationInstance, page_number) {
            if (page_number == paginationInstance.currentPage()) {
                return "\n\t\t\t\t\t\t<li class=\"page-item active\" aria-current=\"page\"><span class=\"page-link\">" + page_number + "</span></li>\n\t\t\t\t";
            }
            else {
                return "\n\t\t\t\t\t\t<li class=\"page-item\" aria-current=\"page\"><a data-page=\"" + page_number + "\" href=\"javascript:void(0)\" class=\"page-link\">" + page_number + "</a></li>\n\t\t\t\t";
            }
        };
        if (windowWidth < 500) {
            maxPaginationSize = 5;
        }
        if (pagination.totalPages() > maxPaginationSize) {
            html.push(createPaginationLink(pagination, 1));
            var paginationFrom = 2;
            var paginationTo = pagination.totalPages() - 1;
            if (windowWidth < 500) {
                if (pagination.currentPage() <= 3) {
                    paginationFrom = 2;
                    paginationTo = 3;
                }
                else {
                    paginationFrom = paginationTo = pagination.currentPage();
                }
                if (pagination.currentPage() > pagination.totalPages() - 3) {
                    paginationFrom = pagination.totalPages() - 2;
                    paginationTo = pagination.totalPages() - 1;
                }
            }
            else {
                if (pagination.currentPage() < 5) {
                    paginationFrom = 2;
                    paginationTo = 5;
                }
                else {
                    paginationFrom = pagination.currentPage() - 1;
                    paginationTo = pagination.currentPage() + 1;
                }
                if (pagination.totalPages() - pagination.currentPage() < 5) {
                    paginationFrom = pagination.totalPages() - 4;
                    paginationTo = pagination.totalPages() - 1;
                }
            }
            if (paginationFrom > 2) {
                html.push("<li class=\"page-item disabled\" aria-current=\"page\"><span class=\"page-link\">...</span></li>");
            }
            for (var page_number = paginationFrom; page_number <= paginationTo; page_number++) {
                html.push(createPaginationLink(pagination, page_number));
            }
            if (pagination.totalPages() - paginationTo > 2) {
                html.push("<li class=\"page-item disabled\" aria-current=\"page\"><span class=\"page-link\">...</span></li>");
            }
            html.push(createPaginationLink(pagination, pagination.totalPages()));
        }
        else {
            for (var page_number = 1; page_number <= pagination.totalPages(); page_number++) {
                html.push(createPaginationLink(pagination, page_number));
            }
        }
        if (pagination.hasMorePages()) {
            var nextPage = pagination.currentPage() + 1;
            html.push("\n\t\t\t\t\t\t<li class=\"page-item\">\n\t\t\t\t\t\t\t<a class=\"page-link\" data-page=\"" + nextPage + "\" href=\"javascript:void(0)\" rel=\"next\" aria-label=\"Next\">\n\t\t\t\t\t\t\t\t<i class=\"fas fa-angle-right\"></i>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t");
        }
        else {
            html.push("\n\t\t\t\t\t\t<li class=\"page-item disabled\" aria-disabled=\"true\" aria-label=\"Next\">\n\t\t\t\t\t\t\t<span class=\"page-link\">\n\t\t\t\t\t\t\t\t<i class=\"fas fa-angle-right\"></i>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t");
        }
        html.push("\n\t\t\t</ul>\n\t\t</nav>\n\t\t");
        return html.join("\n");
    },
    lazyLoader: function (pagination) {
        if (!pagination.hasPages() || !pagination.hasMorePages()) {
            return "";
        }
        return "<div class=\"load-more\">\n                    <button class=\"btn btn-default load-more-btn\" data-page=\"" + (pagination.currentPage() + 1) + "\">\n                        <i class=\"fa fa-refresh\"></i>\n                    </button>\n                </div>";
    },
    search: function () {
        return "\n\t\t<div class=\"search-group\">\n\n\t\t\t<div class=\"form-group mb-3\" style=\"max-width: 300px;\">\n\t\t\t\t<div class=\"input-group input-group-merged\">\n\t\t\t\t\t<input type=\"search\" id=\"lister-search-query\" class=\"form-control lister-search-input\" placeholder=\"Search table...\">\n\t\t\t\t\t<div class=\"input-group-append\">\n\t\t\t\t\t\t<div class=\"input-group-text bg-white\">\n\t\t\t\t\t\t\t<svg viewBox=\"0 0 1024 1024\"><path class=\"path1\" d=\"M966.070 981.101l-304.302-331.965c68.573-71.754 106.232-165.549 106.232-265.136 0-102.57-39.942-199-112.47-271.53s-168.96-112.47-271.53-112.47-199 39.942-271.53 112.47-112.47 168.96-112.47 271.53 39.942 199.002 112.47 271.53 168.96 112.47 271.53 112.47c88.362 0 172.152-29.667 240.043-84.248l304.285 331.947c5.050 5.507 11.954 8.301 18.878 8.301 6.179 0 12.378-2.226 17.293-6.728 10.421-9.555 11.126-25.749 1.571-36.171zM51.2 384c0-183.506 149.294-332.8 332.8-332.8s332.8 149.294 332.8 332.8-149.294 332.8-332.8 332.8-332.8-149.294-332.8-332.8z\"></path></svg>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\n\t\t</div> <!-- / .search-group -->";
    },
    notFound: function (reloadBtn) {
        if (reloadBtn === void 0) { reloadBtn = true; }
        return "\n\t\t\t<div class=\"table-empty\">\n\t\t\t\t<img src=\"/assets/svg/undraw/undraw_empty_xct9.svg\" alt=\"\">\n\t\t\t\t<h4 class=\"status\">Nothing Found!</h4>\n\t\t\t</div>";
    },
    wrapper: function () {
        return "<div class=\"list-group lister-template-root\"></div>";
    },
};

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Helper_1 = require("../../Utilities/Helper");
var windowObj = window;
var AbstractCollection = /** @class */ (function () {
    /**
     * Sets class properties with initial values.
     *
     * @return {void}
     */
    function AbstractCollection(data) {
        /**
         * App`s Sorter.
         */
        this.sorter = {};
        /**
         * App`s filters.
         */
        this.filters = {};
        /**
         * Search query.
         */
        this.query = "";
        /**
         * Searchable columns ( attributes ).
         */
        this.searchables = ["id", "title", "name"];
        this.items = data;
        this.setCollected(this.items);
    }
    /**
     * Check to see whether the collection has any data in it or not.
     */
    AbstractCollection.prototype.hasData = function () {
        return this.items.length > 0;
    };
    // Searching
    /**
     * Sets the string we want to search for in collection`s items.
     *
     * @param query Search query string.
     */
    AbstractCollection.prototype.setSearchQuery = function (query) {
        if (query === void 0) { query = ""; }
        this.query = query;
        // this.resetData() ;
        return this;
    };
    /**
     * Checks to see whether or not the data has been filtered by a search query..
     */
    AbstractCollection.prototype.hasSearchQuery = function () {
        return this.query ? (this.query.length ? true : false) : false;
    };
    /**
     * Sets the string we want to search for in collection`s items.
     *
     * @param query Search query string.
     */
    AbstractCollection.prototype.setSearchables = function (searchables) {
        this.searchables = searchables;
        return this;
    };
    AbstractCollection.prototype.search = function () {
        var results = [];
        for (var i = 0; i < this.items.length; i++) {
            var row = this.items[i];
            for (var j = 0; j < this.searchables.length; j++) {
                var attribute = this.searchables[j];
                if (this.doesItemMatches(row, attribute, this.query)) {
                    results.push(row);
                    break;
                }
            }
        }
        return results;
    };
    /**
     * Checks to see whether the value of a property of one of collection`s
     * items matches the string value.
     *
     * @param item An item of collection items.
     * @param attribute The attribute we want to get the value for.
     * @param value the value we want to match against.
     */
    AbstractCollection.prototype.doesItemMatches = function (item, attribute, value) {
        var originalValue = this.getVal(item, attribute);
        if (typeof originalValue === "undefined") {
            return false;
        }
        return ((typeof originalValue === "string" || typeof originalValue === "number") && originalValue.toString().toLowerCase().includes(value.toLowerCase()));
    };
    /**
     * Searches class`es collected items for an item where its property
     * of "property" has the value of "value".
     *
     * @param value {string|number|boolean|...}
     * @param whereAttrs {object|string}
     * @return {this}
     */
    AbstractCollection.prototype.where = function (whereAttrs, value) {
        var collected = [];
        if (typeof whereAttrs == "string") {
            var where = {};
            where[whereAttrs] = value;
            whereAttrs = where;
        }
        var collection = this;
        for (var attr_name in whereAttrs) {
            var attr_value = whereAttrs[attr_name];
            collection = collection.whereOne(attr_name, attr_value);
        }
        this.setCollected(collection.collected_items);
        return collection;
    };
    /**
     * Searches class`es collected items for an item where its property
     * of "property" has the value of "value".
     *
     * @return {this}
     */
    AbstractCollection.prototype.whereOne = function (property, value) {
        if (value === void 0) { value = null; }
        var collected = [];
        for (var i = 0; i < this.collected_items.length; i++) {
            var item = this.collected_items[i];
            if (item[property] == value) {
                collected.push(item);
            }
        }
        this.setCollected(collected);
        return this;
    };
    /**
     * Searches collection`s items for ones matching the "where" attributes and values.
     * If any found, their indexes will be returned in an array.
     *
     * @param where {plain object}
     * @return any[]
     */
    AbstractCollection.prototype.getIndexesWhere = function (where) {
        var indexes = [];
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            var matched = true;
            for (var attr_name in where) {
                var attr_value = where[attr_name];
                if (item[attr_name] != attr_value) {
                    matched = false;
                    break;
                }
            }
            if (matched) {
                indexes.push(i);
            }
        }
        return indexes;
    };
    // Sorting
    /**
     * Sets the sorter for the collection.
     *
     * @param column The column ( attribute ) we want our data to be sorted by.
     * @param direction The direction of the sorting, can be either "ASC" for
     * ascending or "DESC" for descending.
     */
    AbstractCollection.prototype.setSorter = function (column, direction) {
        if (direction === void 0) { direction = "ASC"; }
        this.sorter = {};
        this.sorter.column = column;
        this.sorter.direction = direction;
        // this.resetData() ;
        return this;
    };
    /**
     * Sorts all class`es collected items by an attribute.
     *
     * @return {this}
     */
    AbstractCollection.prototype.sortBy = function (attribute, order, fallbackAttribute, fallbackAttributeOrder) {
        if (order === void 0) { order = "ASC"; }
        var resultIfFirstIsBigger = order.toLowerCase() === "asc" ? 1 : -1, resultIfSecondIsBigger = order.toLowerCase() === "asc" ? -1 : +1;
        var fallbackResultIfFirstIsBigger = resultIfFirstIsBigger, fallbackResultIfSecondIsBigger = resultIfSecondIsBigger;
        this.collected_items = this.collected_items.sort(function (first, second) {
            var fallbackFirst, fallbackSecond;
            if (fallbackAttribute) {
                fallbackFirst = first[fallbackAttribute];
                fallbackSecond = second[fallbackAttribute];
                if (fallbackAttributeOrder) {
                    fallbackResultIfFirstIsBigger = fallbackAttributeOrder.toLowerCase() == "asc" ? 1 : -1;
                    fallbackResultIfSecondIsBigger = fallbackAttributeOrder.toLowerCase() == "asc" ? -1 : +1;
                }
            }
            first = first[attribute];
            second = second[attribute];
            if (typeof first == "string") {
                first = first.toLowerCase();
                if (typeof second == "string") {
                    second = second.toLowerCase();
                }
            }
            if (Number(first) == first) {
                first = Number(first);
            }
            if (Number(second) == second) {
                second = Number(second);
            }
            if (second == first) // Means should put the nulls above all.
             {
                if (fallbackAttribute) // We check the fallback attribute.
                 {
                    if (fallbackFirst >= fallbackSecond) {
                        return fallbackResultIfFirstIsBigger;
                    }
                    else {
                        return fallbackResultIfSecondIsBigger;
                    }
                }
                else {
                    return resultIfFirstIsBigger; // Either way is fine for here.
                }
            }
            else if (first == null) // Means should put the nulls above all.
             {
                return resultIfFirstIsBigger;
            }
            else if (second == null) // Means should put the nulls above all.
             {
                return resultIfSecondIsBigger;
            }
            else if (first > second) //sort string ascending
             {
                return resultIfFirstIsBigger;
            }
            else if (first < second) {
                return resultIfSecondIsBigger;
            }
            return 0; //default return value (no sorting)
        });
        this.setCollected(this.collected_items);
        return this;
    };
    /**
     * Removes the app`s sorter.
     */
    AbstractCollection.prototype.removeSorter = function () {
        this.sorter = {};
        this.setCollected(this.items);
        return this;
    };
    // Filtering
    /**
     * Setting the filters for the app.
     *
     * @param filters The filters we want to implement to the data.
     */
    AbstractCollection.prototype.setFilters = function (filters) {
        this.filters = filters;
        // this.resetData() ;
        return this;
    };
    /**
     * Resets the collection`s data with the new filters.
     * @param filters The filters we want to apply to the data.
     */
    AbstractCollection.prototype.applyFilters = function (data, filters) {
        data = Helper_1.Helper.cloneObjects(data);
        for (var column in filters) {
            var values = filters[column], like = false;
            if (Array.isArray(values.values)) {
                like = values.like;
                values = values.values;
            }
            data = this.applyOneFilter(data, column, values, like ? true : false);
        }
        this.setCollected(data);
        return this;
    };
    /**
     * Apply in a filter on an array of data..
     * @param filters The filter we want to apply.
     */
    AbstractCollection.prototype.applyOneFilter = function (data, column, values, like) {
        if (like === void 0) { like = false; }
        var filteredData = [];
        data = Helper_1.Helper.cloneObjects(data);
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            if (Array.isArray(values)) {
                for (var j = 0; j < values.length; j++) {
                    var value = values[j];
                    if (!like && row[column] == value) {
                        filteredData.push(row);
                        break;
                    }
                    else if (like && row[column].toString().includes(value)) {
                        filteredData.push(row);
                        break;
                    }
                }
            }
            else {
                if (row[column] == values) {
                    filteredData.push(row);
                }
            }
        }
        return filteredData;
    };
    /**
     * Checks to see whether there are any filters set for this collection.
     */
    AbstractCollection.prototype.hasFilters = function () {
        for (var i in this.filters) {
            return true;
        }
        return false;
    };
    /**
     * Removes the app`s sorter.
     */
    AbstractCollection.prototype.removeFilters = function () {
        this.filters = {};
        return this;
    };
    // Getters and Aggregations
    /**
     * Gets the collection this.items based on the limit and offset passed.
     *
     * @param limit Count of items it should return.
     * @param offset The number of items from start of data array it should skip.
     */
    AbstractCollection.prototype.get = function (pagination) {
        var limit = pagination.getLimit(), offset = pagination.getOffset();
        return this.sliceData(offset, limit);
    };
    /**
     * Returns collection`s collected items.
     *
     * @return {array}
     */
    AbstractCollection.prototype.all = function () {
        return this.collected_items;
    };
    /**
     * Returns collection`s original items.
     *
     * @return {array}
     */
    AbstractCollection.prototype.getOriginalData = function () {
        return this.items;
    };
    /**
     * Returns a new array of items from slicing the collecion items
     * between two indexes, start( offset ) and end( offset + limit ).
     *
     * @param offset Number of items in the data we want to skip.
     * @param limit Count of data we want to include in our slice.
     */
    AbstractCollection.prototype.sliceData = function (offset, limit) {
        return this.collected_items.slice(offset, offset + limit);
    };
    /**
     * Gets the collection data count.
     */
    AbstractCollection.prototype.getTotal = function () {
        return this.collected_items.length;
    };
    /**
     * Gets the collection data count.
     */
    AbstractCollection.prototype.count = function () {
        return this.getTotal();
    };
    /**
     * Checks to see if the collected items array has any members.
     *
     * @return {boolean}
     */
    AbstractCollection.prototype.isEmpty = function () {
        return this.collected_items.length == 0;
    };
    /**
     * Go through collection`s data and returns an array filled with the values
     * of each item of data for the specified column.
     *
     * @param column The column of request.
     */
    AbstractCollection.prototype.pluck = function (column) {
        var plucked_values = [];
        for (var i = 0; i < this.collected_items.length; i++) {
            plucked_values.push(this.collected_items[i][column]);
        }
        return plucked_values.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });
    };
    /**
     * Returns the first item in collected items.
     *
     * @return {any}
     */
    AbstractCollection.prototype.first = function () {
        if (!this.isEmpty()) {
            return this.collected_items[0];
        }
        return undefined;
    };
    /**
     * Returns the last item in collected items.
     *
     * @return {any}
     */
    AbstractCollection.prototype.last = function () {
        if (!this.isEmpty()) {
            return this.collected_items[this.collected_items.length - 1];
        }
        return undefined;
    };
    /**
     * Gets a value of an item of the collection with support of dot notations.
     *
     * @param item An item of collection items.
     * @param attribute The attribute we want to get the value for.
     */
    AbstractCollection.prototype.getVal = function (item, attribute) {
        var attrs = attribute.split(".");
        for (var i = 0; i < attrs.length; i++) {
            var attr = attrs[i];
            if (typeof item !== "undefined") {
                item = item[attr];
            }
        }
        return item;
    };
    // Setters and Modifiers 
    /**
     * Reset the data and implement the filters/sorters and ... .
     */
    AbstractCollection.prototype.resetData = function () {
        if (this.query.trim().length > 0 || this.items.length > this.collected_items.length) {
            this.setCollected(this.search());
        }
        if (this.sorter.column) {
            this.sortBy(this.sorter.column, this.sorter.direction);
        }
        if (this.hasFilters()) {
            this.applyFilters(this.collected_items, this.filters);
        }
        return this;
    };
    /**
     * Sets collection`s data.
     */
    AbstractCollection.prototype.setData = function (data) {
        this.items = data;
        this.setCollected(this.items);
        return this;
    };
    /**
     * Resets classes collected items with original items.
     *
     * @return {this}
     */
    AbstractCollection.prototype.reset = function () {
        var items = [];
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (!windowObj.isUndef(item)) {
                items.push(item);
            }
        }
        this.items = items;
        this.setCollected(this.items);
        return this;
    };
    /**
     * Reset the data and implement the filters/sorters and ... .
     */
    AbstractCollection.prototype.resetAll = function () {
        this.query = "";
        this.filters = [];
        this.filters = [];
        this.setCollected(this.items);
        return this;
    };
    /**
     * Update a collection attributes.
     *
     * @return {void}
     */
    AbstractCollection.prototype.update = function (where, row) {
        var indexes = this.clone(this.items).getIndexesWhere(where);
        for (var i = 0; i < indexes.length; i++) {
            var index = indexes[i];
            this.items[index] = this.updateAttributes(this.items[index], row);
            if (this.collected_items[index]) {
                this.collected_items[index] = this.updateAttributes(this.collected_items[index], row);
            }
        }
        return this;
    };
    /**
     * Update certain attributes in the item object with values of the same
     * attributes in updates object.
     *
     * @param item The original item.
     * @param updates The updated attributes and their values.
     */
    AbstractCollection.prototype.updateAttributes = function (item, updates) {
        for (var i in updates) {
            item[i] = updates[i];
        }
        return item;
    };
    /**
     * Sets the value of the class`es collected_items property, and updates
     * the property total with the count of items in the new collected_items.
     *
     * @param array The desired value of the collected_items property.
     */
    AbstractCollection.prototype.setCollected = function (array) {
        this.collected_items = array == this.items ? Helper_1.Helper.cloneObjects(array) : array;
    };
    // Etc
    AbstractCollection.prototype.clone = function (data) {
        return new this.constructor(data);
    };
    AbstractCollection.prototype.copy = function () {
        var collection = this.clone(this.items);
        collection.setCollected(this.collected_items);
        collection.setFilters(this.filters);
        collection.setSorter(this.sorter);
        collection.setSearchQuery(this.query);
        collection.setSearchables(this.searchables);
        return collection;
    };
    return AbstractCollection;
}());
exports.AbstractCollection = AbstractCollection;

},{"../../Utilities/Helper":20}],12:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractCollection_1 = require("./AbstractCollection");
var Collection = /** @class */ (function (_super) {
    __extends(Collection, _super);
    /**
     * Sets class properties with initial values.
     *
     * @return {void}
     */
    function Collection(data) {
        return _super.call(this, data) || this;
    }
    return Collection;
}(AbstractCollection_1.AbstractCollection));
exports.Collection = Collection;

},{"./AbstractCollection":11}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerDataCollection = /** @class */ (function () {
    /**
     * Sets class properties with initial values.
     *
     * @return {void}
     */
    function ServerDataCollection(data, total) {
        /**
         * An array containing collection`s data.
         *
         * @type {object}
         */
        this.items = [];
        /**
         * Total number of items there are on the server side.
         *
         * @type {object}
         */
        this.total = 0;
        this.items = data;
        this.total = total;
    }
    /**
     * Gets the collection data count.
     */
    ServerDataCollection.prototype.getTotal = function () {
        return this.total;
    };
    /**
     * Gets the collection`s items.
     *
     * @param pagination Count of items it should return.
     */
    ServerDataCollection.prototype.get = function (pagination) {
        return this.items;
    };
    /**
     * Go through collection`s data and returns an array filled with the values
     * of each item of data for the specified column.
     *
     * @param column The column of request.
     */
    ServerDataCollection.prototype.pluck = function (column) {
        var plucked_values = [];
        for (var i = 0; i < this.items.length; i++) {
            plucked_values.push(this.items[i][column]);
        }
        return plucked_values.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });
    };
    /**
     * Returns collection`s collected items.
     *
     * @return {array}
     */
    ServerDataCollection.prototype.all = function () {
        return this.items;
    };
    return ServerDataCollection;
}());
exports.ServerDataCollection = ServerDataCollection;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Connector_1 = require("../API/Server/Connector");
var Collection_1 = require("./Collections/Collection");
var ServerDataCollection_1 = require("./Collections/ServerDataCollection");
var Functions_1 = require("../Utilities/Functions");
var DataCenter = /** @class */ (function () {
    function DataCenter(option, pagination) {
        /**
         * Sorted column and order.
         * Example : ["id", "asc"]
         *
         * @type {Array}
         */
        this.sort_info = [];
        this.option = option;
        this.pagination = pagination;
        this.connector = new Connector_1.Connector(this.option, this.pagination);
        this.setSearchQuery();
        if (this.option.exists("data")) {
            this.data = this.option.get("data");
            this.option.fire("data.fetched", [this.data]);
        }
    }
    DataCenter.prototype.getCollection = function () {
        return this.collection;
    };
    DataCenter.prototype.getData = function (callback, errorCallback) {
        var self = this;
        if (this.data) {
            this.collection = this.newCollection(this.data);
            callback(this.collection);
        }
        else if (this.option.get("prefetch")) {
            this.connector.prefetchData(function (data) {
                self.option.set("data", data);
                self.data = self.option.hooks.call("beforeDataProcess", function (data) {
                    return data;
                }, [data]);
                self.collection = self.newCollection(self.data);
                callback(self.collection);
                self.option.fire("data.fetched", [self.data]);
            });
        }
        else {
            self.getDataFromServer(function (response, total) {
                self.option.fire("data.fetched", [response]);
                callback(response, total);
            }, errorCallback);
        }
    };
    DataCenter.prototype.newCollection = function (data) {
        if (!this.collection) {
            this.collection = new Collection_1.Collection(data);
            this.filter.setCollection(this.collection);
            this.option.fire("data.before.modifiers", [this.collection]);
        }
        else {
            this.collection.setData(data);
        }
        this.setCollectionProperties();
        this.collection.resetData();
        this.option.fire("data.ready", [this.collection]);
        return this.collection;
    };
    DataCenter.prototype.setSearchQuery = function (query) {
        if (query === void 0) { query = ""; }
        this.search_query = query;
    };
    DataCenter.prototype.getSearchQuery = function () {
        return this.search_query;
    };
    /**
     * Compares a new search query to the last query and returns true if
     * they are different.
     *
     * @param newQuery The new search query for comparison.
     */
    DataCenter.prototype.searchQueryHasChanged = function (newQuery) {
        if (newQuery === void 0) { newQuery = ""; }
        return this.search_query !== newQuery;
    };
    /**
     * Sets the sorter for the collection.
     *
     * @param column The column ( attribute ) we want our data to be sorted by.
     * @param direction The direction of the sorting, can be either "ASC" for
     * ascending or "DESC" for descending.
     */
    DataCenter.prototype.setSorter = function (column, direction) {
        if (this.data && (this.option.hasData() || this.option.get("prefetch"))) {
            if (Functions_1.isUndef(column) || Functions_1.isUndef(direction)) {
                return this.collection.removeSorter();
            }
            return this.collection.setSorter(column, direction);
        }
        else {
            if (Functions_1.isUndef(column) || Functions_1.isUndef(direction)) {
                this.sort_info = [];
            }
            else {
                this.sort_info = [column, direction];
            }
        }
        return this.collection;
    };
    /**
     * Sets the collection.
     *
     * @param collection instace of collection we want to replace the
     * collection property with..
     */
    DataCenter.prototype.setCollection = function (collection) {
        return this.collection = collection;
    };
    /**
     * Sets the data property.
     *
     * @param data An array of rows of data.
     */
    DataCenter.prototype.setData = function (data) {
        this.data = data;
        return this;
    };
    DataCenter.prototype.setFilter = function (filter) {
        this.filter = filter;
    };
    DataCenter.prototype.setFilters = function (filters) {
        for (var i in filters) {
            // Just one filter.
            return this.collection.setFilters(filters);
        }
        return this.collection.removeFilters();
    };
    /**
     * Gets the data from server through an ajax call.
     * And then fills the ServerDataCollection with the response data.
     *
     * @param callback The callback in case the request has been sent successfully.
     * @param errorCallback The callback to be called in case of error.
     */
    DataCenter.prototype.getDataFromServer = function (callback, errorCallback) {
        var self = this;
        this.connector.fetchData(this.search_query, this.sort_info, function (data, total) {
            data = self.option.hooks.call("beforeDataProcess", function (data) {
                return data;
            }, [data]);
            self.collection = new ServerDataCollection_1.ServerDataCollection(data, total);
            callback(self.collection);
        }, errorCallback);
    };
    DataCenter.prototype.setCollectionProperties = function () {
        this.collection.setSearchables(this.option.get("searchables"));
        this.collection.setSearchQuery(this.search_query);
        // this.collection.setFilters( this.option.get("filters") ) ;
        var sorter = this.option.get("sort");
        if (sorter) {
            for (var column in sorter) {
                var direction = sorter[column];
                this.collection.setSorter(column, direction);
                break;
            }
        }
    };
    return DataCenter;
}());
exports.DataCenter = DataCenter;

},{"../API/Server/Connector":7,"../Utilities/Functions":19,"./Collections/Collection":12,"./Collections/ServerDataCollection":13}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Filter = /** @class */ (function () {
    function Filter(option) {
        this.option = option;
    }
    Filter.prototype.setCollection = function (collection) {
        this.collection = collection;
    };
    Filter.prototype.pluck = function (column) {
        return this.collection.pluck(column);
    };
    Filter.prototype.filterBy = function (filters) {
        this.collection.setFilters(filters);
        this.collection.resetData();
    };
    return Filter;
}());
exports.Filter = Filter;

},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Pagination = /** @class */ (function () {
    function Pagination(option) {
        /**
         * Number of items to show.
         */
        this.limit = 10;
        /**
         * Pagination offset value. offset = ( page - 1 ) * limit ;
         */
        this.offset = 0;
        /**
         * Current page`s number.
         */
        this.page = 0;
        /**
         * Total items`s count.
         */
        this.total_items = 1;
        /**
         * Total pages`s count.
         */
        this.total_pages = 1;
        this.option = option;
        this.per_page = this.option.get("per_page");
        this.setLimit(this.per_page);
    }
    Pagination.prototype.setLimit = function (limit) {
        this.limit = limit;
    };
    Pagination.prototype.getLimit = function () {
        if (this.option.get("pagination")) {
            return this.limit;
        }
        return this.option.get("max_per_page", 1000);
    };
    Pagination.prototype.getOffset = function () {
        return this.offset;
    };
    /**
     * Whether or not the app has any pages.
     */
    Pagination.prototype.hasPages = function () {
        return this.total_items > this.limit;
    };
    /**
     * Whether or not there are any pages left after current page.
     */
    Pagination.prototype.onFirstPage = function () {
        return this.page == 1;
    };
    /**
     * Returns the current page number.
     */
    Pagination.prototype.currentPage = function () {
        return this.page;
    };
    /**
     * Whether or not there are any pages left after current page.
     */
    Pagination.prototype.hasMorePages = function () {
        return this.page < this.total_pages;
    };
    /**
     * Return total number of pages there are.
     */
    Pagination.prototype.totalPages = function () {
        return this.total_pages;
    };
    Pagination.prototype.countOfShownItems = function () {
        return (this.page - 1) * this.getLimit();
    };
    /**
     * Sets the main pagination parameters, current page and page count.
     *
     * @param page Current page`s number.
     * @param total_pages count of all pages.
     */
    Pagination.prototype.setPage = function (page, total_items) {
        this.page = page;
        this.setOffset(page);
        this.total_items = total_items;
        this.total_pages = Math.ceil(this.total_items / this.per_page);
    };
    /**
     * Compares a new page number to the last page and returns true if
     * they are different.
     *
     * @param newPage The new page number for comparison.
     */
    Pagination.prototype.pageHasChanged = function (newPage) {
        return this.page !== newPage;
    };
    Pagination.prototype.hasPage = function (page) {
        return page <= this.total_pages;
    };
    Pagination.prototype.setOffset = function (page) {
        if (this.option.get("lazy_load")) {
            this.offset = 0;
            this.setLimit(page * this.per_page);
        }
        else {
            this.offset = (page - 1) * this.per_page;
            this.setLimit(this.per_page);
        }
    };
    return Pagination;
}());
exports.Pagination = Pagination;

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Option_1 = require("./Utilities/Option");
var View_1 = require("./View/View");
var DataCenter_1 = require("./Data/DataCenter");
var ListerAPI_1 = require("./API/App/ListerAPI");
var Pagination_1 = require("./Data/Pagination/Pagination");
var Filter_1 = require("./Data/Filters/Filter");
var Lister = /** @class */ (function () {
    /**
     * Creates a new instance of Lister.
     *
     * @param options App`s options.
     */
    function Lister(options) {
        Lister.instance_no++;
        this.option = new Option_1.Option(options, Lister.instance_no);
        this.handleErrors();
        this.pagination = new Pagination_1.Pagination(this.option);
        var filter = new Filter_1.Filter(this.option);
        this.view = new View_1.View(this.option, this.pagination, filter);
        this.dataCenter = new DataCenter_1.DataCenter(this.option, this.pagination);
        this.dataCenter.setFilter(filter);
        this.showPage(1);
        this.listenForPaginationEvents();
        this.listenForSearchEvents();
        this.listenForSortEvents();
        this.listenForFilterChange();
        this.listenForReloadOrder();
        var API = new ListerAPI_1.ListerAPI(this, this.option, this.pagination, this.dataCenter, this.view);
        return API;
    }
    /**
     * Shows the list with all the components specified in options.
     *
     * @param page The page of list we want to show.
     */
    Lister.prototype.showPage = function (page, callback) {
        var self = this;
        this.loadingMode(true);
        this.pagination.setPage(page, 0);
        this.dataCenter.getData(function (collection) {
            self.pagination.setPage(page, collection.getTotal());
            self.view.insert(collection.get(self.pagination));
            self.loadingMode(false);
            if (callback) {
                callback(collection);
            }
        }, function (err) {
            self.view.insert([]);
            self.loadingMode(false);
            console.log("An error occured!");
            console.log(err);
        });
    };
    /**
     * Listens for page change event and change the page accordingly.
     */
    Lister.prototype.listenForPaginationEvents = function () {
        var self = this;
        this.option.listen("page.change.before", function (e, page) {
            if (self.pagination.pageHasChanged(page)) {
                self.showPage(page, function (collection) {
                    self.option.fire("page.changed", [page]);
                });
            }
        });
    };
    /**
     * Listens for search event and request the new data accordingly.
     */
    Lister.prototype.listenForSearchEvents = function () {
        var self = this;
        var callback = function (e, query) {
            if (self.dataCenter.searchQueryHasChanged(query) || self.pagination.pageHasChanged(1)) {
                self.dataCenter.setSearchQuery(query);
                self.showPage(1, function (collection) {
                    self.option.fire("search.perfomed", [query, collection.all()]);
                });
            }
        };
        this.option.listen("search.requested", callback);
    };
    /**
     * Listens for sorting event and request the data accordingly.
     */
    Lister.prototype.listenForSortEvents = function () {
        var self = this;
        this.option.listen("sorter.before", function (e, column, desc) {
            if (desc === void 0) { desc = false; }
            self.dataCenter.setSorter(column, desc ? "DESC" : "ASC");
            self.showPage(1);
        });
    };
    Lister.prototype.listenForFilterChange = function () {
        var self = this;
        this.option.listen("fitlers.changed", function (e, filters) {
            self.dataCenter.setFilters(filters);
            self.showPage(1);
        });
    };
    Lister.prototype.listenForReloadOrder = function () {
        var self = this;
        this.option.listen("reload.before", function (e) {
            self.showPage(self.pagination.currentPage(), function (collection) {
                self.option.fire("reload.after");
            });
        });
    };
    /**
     * Sets the app mode in out of loading.
     */
    Lister.prototype.loadingMode = function (on) {
        if (on === void 0) { on = false; }
        if (on) {
            return this.view.showLoading();
        }
        return this.view.hideLoading();
    };
    Lister.prototype.destroy = function () {
        this.option.fire("destroyed");
        this.option.destroy();
        this.view.destroy();
    };
    /**
     * Listens for errors and print out the message, also adds the "has-error" class
     * to the root element.
     */
    Lister.prototype.handleErrors = function () {
        var self = this;
        this.option.listen("error", function (e, errorObj) {
            if (self.option.get("debug")) {
                errorObj.message && console.error("ListerJS Error: " + errorObj.message);
                console.warn(errorObj);
                self.option.getRootElement().addClass("has-error");
            }
            else {
                if (errorObj.short_message) {
                    console.error("ListerJS Error: " + errorObj.short_message);
                }
            }
        });
    };
    /**
     * Lister instance number.
     *
     * @type {Option}
     */
    Lister.instance_no = 0;
    return Lister;
}());
exports.Lister = Lister;

},{"./API/App/ListerAPI":5,"./Data/DataCenter":14,"./Data/Filters/Filter":15,"./Data/Pagination/Pagination":16,"./Utilities/Option":22,"./View/View":30}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var Functions_1 = require("./Functions");
var DOM = /** @class */ (function () {
    function DOM(selector) {
        /**
         * Events set with this.on method and their corresponding callbacks.
         */
        this.events_callbacks = {};
        if (typeof jQuery === "function") {
            return $(selector);
        }
        if (this.isNodeList(selector)) {
            this.setElements(selector);
        }
        else if (this.isNode(selector) || this.isElement(selector)) {
            this.setElements([selector]);
        }
        else if (util_1.isArray(selector)) {
            this.setElements(selector);
        }
        else if (/<[a-z][\s\S]*>/i.test(selector)) {
            this.setElements(this.htmlStringToNodes(selector));
        }
        else {
            this.setElements(document.querySelectorAll(selector));
        }
        this.length = this.elements.length;
    }
    /**
     * Adds a class name to the elements in the object.
     *
     * @param className The class string we want to add.
     */
    DOM.prototype.addClass = function (className) {
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            if (el.classList) {
                el.classList.add(className);
            }
            else if (!el.className.includes(className)) {
                el.className += " " + className;
            }
        }
        return this;
    };
    DOM.prototype.find = function (selector) {
        return new DOM(this.elements[0].querySelectorAll(selector));
    };
    /**
     * Removes a class name from the elements class list.
     *
     * @param className The class string we want to remove.
     */
    DOM.prototype.removeClass = function (className) {
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            if (el.classList) {
                el.classList.remove(className);
            }
            else if (el.className.includes(className)) {
                el.className = el.className
                    .replace(className, "");
            }
        }
        return this;
    };
    /**
     * Checks to whether an element has a certain class in its class list.
     *
     * @param className The class string we want to check against.
     */
    DOM.prototype.hasClass = function (className) {
        return this.elements[0].className.includes(className);
    };
    /**
     * Sets an elements html content with the html string passed.
     *
     * @param html html string we want to fill the element`s content with.
     */
    DOM.prototype.html = function (html) {
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            el.innerHTML = html;
        }
        return this;
    };
    /**
     * Prepends an html string to the elements html content.
     *
     * @param html html string we want to prepend to the element`s content.
     */
    DOM.prototype.prepend = function (element) {
        if (!this.isElement(element)) {
            element = this.simpleHtmlToNode(element);
        }
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            el.insertBefore(element, el.childNodes[0] || null);
        }
        return this;
    };
    /**
     * Insert an html string to the elements html content at a specific index.
     *
     * @param html html string we want to prepend to the element`s content.
     */
    DOM.prototype.insert = function (element, index) {
        if (!this.isElement(element)) {
            element = this.simpleHtmlToNode(element);
        }
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            el.insertBefore(element, el.childNodes[index] || null);
        }
        return this;
    };
    /**
     * Appends an html string to the elements html content.
     *
     * @param html html string we want to append to the element`s content.
     */
    DOM.prototype.append = function (element) {
        if (!this.isElement(element)) {
            element = this.simpleHtmlToNode(element);
        }
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            el.appendChild(element);
        }
        return this;
    };
    DOM.prototype.on = function (event_name, query, callback) {
        if (event_name.split(" ").length > 1) {
            var event_names = event_name.split(" ");
            for (var j = 0; j < event_names.length; j++) {
                var event_name_1 = event_names[j];
                this.on(event_name_1, query, callback);
            }
            return this;
        }
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            var callableCallback = this.createCalableCallbackForEventListeners(query, callback);
            var event_1 = void 0;
            if (callback) {
                event_1 = this.addEventListener(el, event_name, query, callableCallback);
            }
            else {
                event_1 = this.addEventListener(el, event_name, callableCallback);
            }
            if (el.addEventListener) {
                this.test = event_1.callback;
                el.addEventListener(event_1.event, event_1.callback);
            }
        }
        return this;
    };
    DOM.prototype.off = function (event_name, query, callback) {
        if (event_name.split(" ").length > 1) {
            var event_names = event_name.split(" ");
            for (var j = 0; j < event_names.length; j++) {
                var event_name_2 = event_names[j];
                this.off(event_name_2, query, callback);
            }
            return this;
        }
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            var callableCallback = this.createCalableCallbackForEventListeners(query, callback);
            var event_2 = void 0;
            if (callback) {
                event_2 = this.addEventListener(el, event_name, query, callableCallback);
            }
            else {
                event_2 = this.addEventListener(el, event_name, callableCallback);
            }
            if (el.removeEventListener) {
                el.removeEventListener(event_2.event, event_2.callback);
            }
        }
        return this;
    };
    DOM.prototype.createCalableCallbackForEventListeners = function (query, callback) {
        return function (e) {
            if (!callback) {
                callback = query;
            }
            if (e.detail && e.detail.customEventParameters) {
                var params = [].concat([e]).concat(e.detail.customEventParameters);
                callback.apply(this, Array.prototype.slice.call(params, 0));
            }
            else {
                callback.bind(this)(e);
            }
        };
    };
    /**
     * Get the closest matching element up the DOM tree.
     *
     * @param  {String}  selector Selector to match against.
     */
    DOM.prototype.closest = function (selector) {
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            var element = el;
            // Get closest match
            for (; element && element !== document; element = element.parentNode) {
                if (element.matches(selector))
                    return new DOM(element);
            }
            ;
        }
        return null;
    };
    ;
    DOM.prototype.parent = function () {
        var parent = new DOM(this.elements[0].parentNode);
        return parent;
    };
    DOM.prototype.val = function (value) {
        if (typeof value == "undefined") {
            return this.elements[0].value;
        }
        else {
            for (var i = 0; i < this.elements.length; i++) {
                var el = this.elements[i];
                el.value = value;
            }
        }
        return this;
    };
    DOM.prototype.trigger = function (event_name, event_data) {
        if (event_data) {
            return this.triggerCustomEvents(event_name, event_data);
        }
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            var event_3 = null;
            if (document.createEvent) {
                event_3 = document.createEvent("Event");
                event_3.initEvent(event_name, true, true);
            }
            else if (document.createEventObject) {
                event_3 = document.createEventObject();
                event_3.eventType = event_name;
            }
            event_3["eventName"] = event_name;
            if (document.createEvent) {
                el.dispatchEvent(event_3);
            }
            else {
                el.fireEvent("on" + event_3.eventType, event_3);
            }
        }
        return this;
    };
    DOM.prototype.focus = function () {
        this.elements[0].focus();
    };
    DOM.prototype.each = function (callback) {
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            callback(i, el);
        }
        return this;
    };
    DOM.prototype.map = function (callback) {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i] = callback(i, this.elements[i]);
        }
        return this;
    };
    DOM.prototype.detach = function () {
        var el = this.elements[0];
        el.parentNode.removeChild(el);
    };
    DOM.prototype.data = function (attr, value) {
        if (this.elements[0] && this.elements[0].dataset) {
            if (typeof value !== "undefined") {
                for (var i = 0; i < this.elements.length; i++) {
                    var el = this.elements[i];
                    el.dataset[attr] = value;
                }
                return value;
            }
            else {
                return this.elements[0].dataset[attr];
            }
        }
        else {
            if (typeof value !== "undefined") {
                this.setAttribute("data-" + attr, value);
                return value;
            }
            else {
                return this.getAttribute("data-" + attr);
            }
        }
    };
    DOM.prototype.attr = function (attr, value) {
        if (typeof value !== "undefined") {
            this.setAttribute("" + attr, value);
            return value;
        }
        else {
            return this.getAttribute("" + attr);
        }
    };
    DOM.prototype.children = function (selector) {
        var children = this.elements[0].childNodes;
        if (Functions_1.isUndef(selector)) {
            return (new DOM(children)).filterElements();
        }
        var matchingChildren = [];
        for (var i = 0; i < children.length; i++) {
            var child = new DOM(children[i]);
            if (child.matches(selector)) {
                matchingChildren.push(child[0]);
            }
        }
        return (new DOM(matchingChildren)).filterElements();
    };
    DOM.prototype.filter = function (callback) {
        var filteredEls = [];
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            if (callback(el)) {
                filteredEls.push(el);
            }
        }
        return new DOM(filteredEls);
    };
    DOM.prototype.filterElements = function () {
        return this.filter(function (node) {
            return node.nodeType == 1;
        });
    };
    DOM.prototype.matches = function (query) {
        var self = this;
        var list = ['matchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector', 'webkitMatchesSelector'];
        for (var i = 0; i < list.length; i++) {
            for (var i_1 = 0; i_1 < this.elements.length; i_1++) {
                var el = this.elements[i_1];
                if (el[list[i_1]]) {
                    return el[list[i_1]](query);
                }
            }
        }
        return (function (query) {
            for (var i = 0; i < self.elements.length; i++) {
                var el = self.elements[i];
                var matches = (el.document || el.ownerDocument).querySelectorAll(query), j = matches.length;
                while (--j >= 0 && matches.item(j) !== el) { }
                return j > -1;
            }
        })(query);
    };
    ;
    DOM.prototype.css = function (styleObject) {
        return this.map(function (k, el) {
            if (el.style) {
                for (var cssProperty in styleObject) {
                    var cssValue = styleObject[cssProperty];
                    el.style[cssProperty] = cssValue;
                }
            }
            return el;
        });
    };
    ;
    DOM.prototype.show = function () {
        return this.css({
            display: "block",
        });
    };
    ;
    DOM.prototype.hide = function () {
        return this.css({
            display: "none",
        });
    };
    ;
    DOM.prototype.first = function () {
        return this.nth(0);
    };
    ;
    DOM.prototype.last = function () {
        return this.nth(this.elements.length - 1);
    };
    ;
    DOM.prototype.nth = function (index) {
        return new DOM(this.elements[index]);
    };
    ;
    DOM.prototype.eq = function (index) {
        return this.nth(index);
    };
    ;
    DOM.prototype.delay = function (callback, delay) {
        setTimeout(callback.bind(this[0]), delay);
        return this;
    };
    DOM.prototype.transitionEnd = function (callback) {
        this.each(function (k, v) {
            var self = Functions_1.$$(this);
            self.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function (e) {
                var callbackBinded = callback.bind(self);
                callbackBinded(e);
            });
        });
    };
    DOM.prototype.animationEnd = function (callback) {
        this.each(function (k, v) {
            var self = Functions_1.$$(this);
            self.on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function (e) {
                var callbackBinded = callback.bind(self);
                callbackBinded(e);
            });
        });
    };
    DOM.prototype.setElements = function (elements) {
        this.elements = elements;
        var self = this;
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            self[i] = el;
        }
    };
    DOM.prototype.setAttribute = function (name, value) {
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            el.setAttribute(name, value);
        }
    };
    DOM.prototype.getAttribute = function (name) {
        return this.elements[0].getAttribute(name);
    };
    /**
     * Creates HTMLElements from a HTML string.
     *
     * @param html HTML string we want to convert to HTMLElement.
     */
    DOM.prototype.htmlStringToNodes = function (html) {
        html = html.trim();
        if (/<tr[\s\S]*>/i.test(html)) {
            var tbody = document.createElement('tbody');
            tbody.innerHTML += html;
            return tbody.childNodes;
        }
        else if (/<td[\s\S]*>/i.test(html)) {
            var tbody = document.createElement('tbody');
            tbody.insertRow(0);
            tbody.rows[0].innerHTML += html;
            return tbody.rows[0].cells;
        }
        else if (/<[a-z][\s\S]*>/i.test(html)) {
            var el = document.createElement('div');
            el.innerHTML += html;
            return el.childNodes;
        }
    };
    /**
     * Creates HTMLElements from a HTML string.
     *
     * @param html HTML string we want to convert to HTMLElement.
     * @param closure The callback we want to be called on each elements created from the
     * html string.
     */
    DOM.prototype.htmlToNode = function (html, closure, tag) {
        var el = document.createElement(tag || 'div');
        el.innerHTML += html;
        var results = [];
        for (var i = 0; i < el.childNodes.length; i++) {
            var node = el.childNodes[i];
            if (Functions_1.isUndef(closure) && node.nodeType === 1) {
                results.push(node);
            }
            else if (!Functions_1.isUndef(closure)) {
                results.push(closure(node));
            }
        }
        return results;
    };
    /**
     * Creates HTMLElements from a HTML tr string.
     *
     * @param html HTML string we want to convert to HTMLElement.
     * @param closure The callback we want to be called on each elements created from the
     * html string.
     */
    DOM.prototype.tableRowHtmlToNode = function (html, closure) {
        var el = document.createElement('table');
        el.innerHTML += html;
        var results = [];
        for (var i = 0; i < el.childNodes.length; i++) {
            var node = el.childNodes[i];
            if (Functions_1.isUndef(closure) && node.nodeType === 1) {
                results.push(node);
            }
            else if (!Functions_1.isUndef(closure)) {
                results.push(closure(node));
            }
        }
        return results;
    };
    /**
     * Creates HTMLElements from a HTML string.
     *
     * @param html HTML string we want to convert to HTMLElement.
     */
    DOM.prototype.simpleHtmlToNode = function (html) {
        var div = document.createElement('div');
        div.innerHTML = html.trim();
        // Change this to div.el.childNodes[ i ]Nodes to support multiple top-level nodes
        return div.firstChild;
    };
    /**
     * Checks to see whether a object is of type HTMLElement or not.
     */
    DOM.prototype.isElement = function (object) {
        return (typeof HTMLElement === "object" ? object instanceof HTMLElement : //DOM2
            object && typeof object === "object" && object !== null && object.nodeType === 1 && typeof object.nodeName === "string");
    };
    /**
     * Checks to see whether a object is of type Node or not.
     */
    DOM.prototype.isNode = function (object) {
        // DOM, Level2
        if (typeof Node === 'function') {
            return object instanceof Node;
        }
        // Older browsers, check if it looks like a Node instance)
        return object &&
            typeof object === "object" &&
            object.nodeName &&
            object.nodeType >= 1 &&
            object.nodeType <= 12;
    };
    /**
     * Checks to see whether a object is of type Node or not.
     */
    DOM.prototype.isNodeList = function (object) {
        return NodeList.prototype.isPrototypeOf(object) || HTMLCollection.prototype.isPrototypeOf(object);
    };
    DOM.prototype.addEventListener = function (el, event_name, query, callback) {
        if (event_name === 'mouseup' || event_name === 'mousedown' || event_name === 'touchstart' || event_name === 'touchdown') {
            event_name = (('on' + event_name) in window) ? event_name : 'click';
        }
        if (event_name === 'click' && !('onclick' in window)) {
            event_name = 'mouseup';
        }
        if (typeof query == "string") {
            return {
                event: event_name,
                callback: function (e) {
                    var target = new DOM(e.target);
                    if (target.matches(query)) {
                        callback.bind(target[0])(e);
                    }
                    else {
                        var parent_1 = target.closest(query);
                        if (parent_1) {
                            (callback).bind(parent_1[0])(e);
                        }
                    }
                }
            };
        }
        else {
            return {
                event: event_name,
                callback: query,
            };
        }
    };
    DOM.prototype.triggerCustomEvents = function (name, parameters) {
        // var event = document.createEvent('MyEvent') ;
        var event = new CustomEvent(name, { 'detail': { customEventParameters: parameters, }, });
        this.each(function (k, el) {
            el.dispatchEvent(event);
        });
    };
    return DOM;
}());
exports.DOM = DOM;

},{"./Functions":19,"util":4}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOM_1 = require("./DOM");
exports.$$ = function (selector) {
    return new DOM_1.DOM(selector);
};
exports.isUndef = function (variable) {
    return typeof variable === "undefined";
};

},{"./DOM":18}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Functions_1 = require("./Functions");
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.cloneObjects = function (object) {
        var copy = null;
        if (Array.isArray(object)) {
            copy = [];
            for (var i = 0; i < object.length; i++) {
                copy[i] = this.cloneObjects(object[i]);
            }
        }
        else if (typeof object == 'object' && object.constructor == Object) {
            copy = {};
            for (var i in object) {
                if (object.hasOwnProperty(i)) {
                    copy[i] = this.cloneObjects(object[i]);
                }
            }
        }
        else {
            copy = object;
        }
        return copy;
    };
    Helper.resetObject = function (obj) {
        var newObj = {};
        for (var i in obj) {
            if (!Functions_1.isUndef(obj[i])) {
                newObj[i] = obj[i];
            }
        }
        return newObj;
    };
    return Helper;
}());
exports.Helper = Helper;

},{"./Functions":19}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hookable = /** @class */ (function () {
    function Hookable(option) {
        this.option = option;
    }
    /**
     * Checks to see if a hook exists on the options, if exists, it will call the
     * hook and pass the parameters to it.
     * If not, it will call the default function with the parameters.
     *
     * @param hook_name The hook name.
     * @param default_closure The function to call if no hook found.
     * @param parameters The parameters to pass to the final callable function.
     */
    Hookable.prototype.call = function (hook_name, default_closure, parameters) {
        var hook = this.option.get("hooks." + hook_name);
        if (hook && typeof hook == "function") {
            return this.callAMethod(hook, parameters);
        }
        return this.callAMethod(default_closure, parameters);
    };
    /**
     * Calls an anonymous functions with its parameters.
     *
     * @param closure The anonymous function to call.
     * @param parameters The arguments of the function to pass.
     */
    Hookable.prototype.callAMethod = function (closure, parameters) {
        if (parameters === void 0) { parameters = []; }
        if (Array.isArray(parameters) && parameters.length > 0) {
            return closure.apply(null, Array.prototype.slice.call(parameters, 0));
        }
        return closure();
    };
    return Hookable;
}());
exports.Hookable = Hookable;

},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefaultOptions_1 = require("../Config/DefaultOptions");
var Functions_1 = require("./Functions");
var DOM_1 = require("./DOM");
var Hookable_1 = require("./Hookable");
var Helper_1 = require("./Helper");
var Option = /** @class */ (function () {
    function Option(options, instance_no) {
        /**
         * Event listeners bound to original root element.
         *
         * @type {any[]}
         */
        this.original_root_el_event_listeners = [];
        this.client_options = options;
        this.instance_no = instance_no;
        this.default_options = DefaultOptions_1.DefaultOptions;
        this.options = this.fillEmptyOptions(options);
        this.hooks = new Hookable_1.Hookable(this);
        this.original_root_el = this.getRootElement();
    }
    /**
     * Retuens the Lister instance number sent by the constructor.
     */
    Option.prototype.instanceNo = function () {
        return this.instance_no;
    };
    /**
     * Retuens the root element from options.
     */
    Option.prototype.getRootElement = function () {
        if (this.options.el) {
            if (typeof this.options.el == "string") {
                this.options.el = new DOM_1.DOM(this.options.el);
            }
            return this.options.el;
        }
        throw new Error("No root element found! Please specify one in app`s options.");
    };
    /**
     * Checks to see whether a specific option exists on the client input list or not.
     *
     * @param option_name The specified key to the option we want to check its existence.
     *                    ( Taking advantage of dot notation capacity ).
     */
    Option.prototype.exists = function (option_name) {
        var option_names = option_name.split(".");
        var option = this.client_options;
        for (var i = 0; i < option_names.length; i++) {
            if (!Functions_1.isUndef(option)) {
                var option_key = option_names[i];
                option = option[option_key];
            }
        }
        return !Functions_1.isUndef(option);
    };
    Option.prototype.hasData = function () {
        return !Functions_1.isUndef(this.options.data) && this.options.data.length > 0;
    };
    /**
     * Gets the value of an option key ( if exists ), using dot notation strings,
     * or return undefined if not.
     *
     * @param option_name Option key which can use the dot notation capability.
     *                    Example: get("templates.pagination")
     */
    Option.prototype.get = function (option_name, default_val) {
        if (option_name === void 0) { option_name = ""; }
        if (option_name == "" || Functions_1.isUndef(option_name)) {
            return this.options;
        }
        var option_names = option_name.split(".");
        var option = this.options;
        for (var i = 0; i < option_names.length; i++) {
            if (!Functions_1.isUndef(option)) {
                var option_key = option_names[i];
                option = option[option_key];
            }
        }
        if (Functions_1.isUndef(option) && !Functions_1.isUndef(default_val)) {
            return default_val;
        }
        return option;
    };
    /**
     * Returns the options object.
     */
    Option.prototype.all = function () {
        return this.options;
    };
    /**
     * Sets the value of an option key, using dot notation strings.
     *
     * @param option_name Option key which can use the dot notation capability.
     *                    Example: set("templates.pagination")
     * @param value       The value we want to assing to the option.
     *
     */
    Option.prototype.set = function (option_name, value) {
        var option_names = option_name.split(".");
        var option = this.options;
        for (var i = 0; i < option_names.length; i++) {
            var option_key = option_names[i];
            if (i == option_names.length - 1) {
                option[option_key] = value;
                break;
            }
            else if (!Functions_1.isUndef(option)) {
                option = option[option_key];
            }
            else {
                option = {};
            }
        }
        return this;
    };
    /**
     * Fires an event set from options, in other words, calls the functions
     * set for this event name.
     *
     * @param event_name Name of the event we want to call.
     * @param parameters Parameters to pass to the anonymous function.
     */
    Option.prototype.fire = function (event_name, parameters) {
        var eventNamesArr = event_name.split(".");
        if (eventNamesArr.length > 1) {
            for (var i = 1; i < eventNamesArr.length; i++) {
                var word = eventNamesArr[i];
                eventNamesArr[i] = word.charAt(0).toUpperCase() + word.slice(1);
            }
        }
        var eventNameCamelCased = eventNamesArr.join("");
        if (this.exists("events." + eventNameCamelCased)) {
            var closure = this.get("events." + eventNameCamelCased);
            if (typeof closure == "function") {
                if (Array.isArray(parameters) && parameters.length > 0) {
                    closure.apply(null, Array.prototype.slice.call(parameters, 0));
                }
                else {
                    closure();
                }
            }
        }
        this.getRootElement().trigger("listerjs." + event_name, parameters);
    };
    /**
     * Listens for app`s predefined events event on the root element.
     *
     * @param event_name Name of the event we want to call.
     * @param callback Event`s callback.
     */
    Option.prototype.listen = function (event_name, callback) {
        this.original_root_el_event_listeners.push({
            event: "listerjs." + event_name,
            callback: callback,
        });
        var event = this.original_root_el_event_listeners[this.original_root_el_event_listeners.length - 1];
        this.getRootElement().on(event.event, event.callback);
    };
    Option.prototype.destroy = function () {
        for (var i = 0; i < this.original_root_el_event_listeners.length; i++) {
            var eventListener = this.original_root_el_event_listeners[i];
            this.getRootElement().off(eventListener.event, eventListener.callback);
        }
    };
    Option.prototype.fillEmptyOptions = function (client_options) {
        var specialOptionsKeys = [
            "templates",
        ], finalOptions = {};
        var defaultOptions = Helper_1.Helper.cloneObjects(this.default_options);
        for (var i = 0; i < specialOptionsKeys.length; i++) {
            var key = specialOptionsKeys[i];
            finalOptions[key] = defaultOptions[key];
        }
        finalOptions = this.setSpecialOptions(finalOptions, client_options);
        for (var key in defaultOptions) {
            if (!specialOptionsKeys.includes(key)) {
                finalOptions[key] = Functions_1.isUndef(client_options[key]) ? defaultOptions[key] : client_options[key];
            }
        }
        return finalOptions;
    };
    /**
     * Setting special options that cant be set via the setOptions way.
     *
     * @param defaultOptions
     * @param client_options
     */
    Option.prototype.setSpecialOptions = function (default_options, client_options) {
        for (var key in default_options) {
            var client_option = client_options[key];
            var default_option = default_options[key];
            if (!Functions_1.isUndef(client_option) && !Functions_1.isUndef(default_option)) {
                for (var inner_key in default_option) {
                    var client_option_child = client_option[inner_key];
                    if (!Functions_1.isUndef(client_option_child)) {
                        default_options[key][inner_key] = client_option_child;
                    }
                }
            }
        }
        return default_options;
    };
    return Option;
}());
exports.Option = Option;

},{"../Config/DefaultOptions":9,"./DOM":18,"./Functions":19,"./Helper":20,"./Hookable":21}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component = /** @class */ (function () {
    function Component() {
    }
    return Component;
}());
exports.Component = Component;

},{}],24:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("./Component");
var Functions_1 = require("../../Utilities/Functions");
var Helper_1 = require("../../Utilities/Helper");
var FilterComponent = /** @class */ (function (_super) {
    __extends(FilterComponent, _super);
    function FilterComponent(option, rootEl, pagination, filter) {
        var _this = _super.call(this) || this;
        /**
         * Filters object.
         *
         * @type {object}
         */
        _this.filters = {};
        _this.option = option;
        _this.rootEl = rootEl;
        _this.pagination = pagination;
        _this.filter = filter;
        rootEl = _this.addContainer(_this.rootEl);
        _this.listenForDataSet(rootEl);
        return _this;
    }
    FilterComponent.prototype.render = function (rootEl) {
        var filters = this.gatherFiltersValues();
        var boxes = [];
        for (var i = 0; i < filters.length; i++) {
            var filter = filters[i], values = filter.values, rows = [];
            for (var j = 0; j < values.length; j++) {
                var val = values[j];
                rows.push("\n                <li>\n                    <label for=\"filters-checkboxes-" + filter.column + "-" + j + "\">" + val + "</label>\n                    <span class=\"left\">\n                        <input type=\"checkbox\" class=\"filters-checkboxes\" id=\"filters-checkboxes-" + filter.column + "-" + j + "\" name=\"filters[names][" + j + "]\" value=\"" + val + "\">\n                    </span>\n                </li>\n                ");
            }
            boxes.push(this.renderAFilterBox(filter.label, rows.join("\n")));
        }
        rootEl.html(boxes.join("\n"));
        this.listenForFilterBoxesToggle(rootEl);
        this.listenForFilterValueChange(rootEl);
    };
    /**
     * Appeinding container element for rows to the root element.
     */
    FilterComponent.prototype.addContainer = function (rootEl) {
        rootEl.append("\n        <div class=\"filters-wrapper\">\n            <div class=\"filters\">\n            </div> <!-- / .filters -->\n        </div> <!-- / .filters-wrapper -->");
        return rootEl.find(".filters-wrapper>.filters");
    };
    FilterComponent.prototype.listenForFilterBoxesToggle = function (rootEl) {
        rootEl.find(".panel-action.btn-toggle").on("click", function (e) {
            var panel = Functions_1.$$(this).closest(".panel");
            if (panel.hasClass("collapsed")) {
                panel.removeClass("collapsed");
            }
            else {
                panel.addClass("collapsed");
            }
        });
    };
    FilterComponent.prototype.listenForFilterValueChange = function (rootEl) {
        var self = this;
        rootEl.find(".filters-checkboxes").on("change", function (e) {
            var filters = [];
            var el = Functions_1.$$(this);
            var column = el.attr("id").split("-")[2];
            if (el[0].checked) {
                self.addToFilters(column, el.val());
            }
            else {
                self.removeFromFilters(column, el.val());
            }
            self.option.fire("filters.changed", [self.filters]);
        });
    };
    FilterComponent.prototype.addToFilters = function (column, value) {
        if (Functions_1.isUndef(this.filters[column])) {
            this.filters[column] = [];
        }
        this.filters[column].push(value);
    };
    FilterComponent.prototype.removeFromFilters = function (column, value) {
        if (Functions_1.isUndef(this.filters[column])) {
            return;
        }
        var newFiltersForColumn = [];
        for (var i = 0; i < this.filters[column].length; i++) {
            var val = this.filters[column][i];
            if (val != value) {
                newFiltersForColumn.push(val);
            }
        }
        if (newFiltersForColumn.length == 0) {
            this.filters[column] = undefined;
            this.filters = Helper_1.Helper.resetObject(this.filters);
            return;
        }
        this.filters[column] = newFiltersForColumn;
    };
    FilterComponent.prototype.gatherFiltersValues = function () {
        var filters = this.option.get("filters");
        var filtersWithValues = [];
        if (filters) {
            for (var column in filters) {
                var label = filters[column];
                filtersWithValues.push({
                    column: column,
                    label: label,
                    values: this.filter.pluck(column),
                });
            }
        }
        return filtersWithValues;
    };
    FilterComponent.prototype.listenForDataSet = function (rootEl) {
        var self = this;
        this.option.listen("data.before.modifiers", function (e, collection) {
            self.render(rootEl);
        });
    };
    FilterComponent.prototype.renderAFilterBox = function (label, rows) {
        return "\n        <div class=\"panel panel-bordered\">\n            <div class=\"panel-heading\">\n                <h3 class=\"panel-title\">" + label + " :</h3>\n                <div class=\"panel-actions\">\n                    <a class=\"panel-action btn-toggle\" data-toggle=\"panel-collapse\" aria-expanded=\"true\" aria-hidden=\"true\">\n                        <i class=\"fa fa-plus\"></i>\n                    </a>\n                </div>\n            </div>\n            <div class=\"panel-body\">\n                <ul class=\"filter-values\">\n                    " + rows + "\n                </ul>\n            </div>\n        </div> <!-- / .panel.panel-bordered -->\n        ";
    };
    return FilterComponent;
}(Component_1.Component));
exports.FilterComponent = FilterComponent;

},{"../../Utilities/Functions":19,"../../Utilities/Helper":20,"./Component":23}],25:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Functions_1 = require("../../Utilities/Functions");
var Component_1 = require("./Component");
var ListComponent = /** @class */ (function (_super) {
    __extends(ListComponent, _super);
    function ListComponent(option, rootEl, pagination) {
        var _this = _super.call(this) || this;
        /**
         * Array keeping the result of passing the row to its template.
         *
         * @type {array}
         */
        _this.nodesHTML = [];
        _this.option = option;
        _this.pagination = pagination;
        _this.templates = option.get("templates");
        _this.rootEl = _this.addContainer(rootEl);
        return _this;
    }
    ListComponent.prototype.render = function (data, page) {
        if (page === void 0) { page = 1; }
        if (data.length == 0) {
            this.rootEl.html(this.templates.notFound());
            this.listenForReloadOrder();
            this.nodesHTML = [];
            this.option.fire("list.empty", [this.rootEl]);
        }
        else {
            var rowsTemplates = [];
            for (var i = 0; i < data.length; i++) {
                var row = data[i];
                rowsTemplates.push(this.templates.row(row, i));
            }
            this.insert(rowsTemplates);
            this.option.fire("list.mounted", [this.rootEl]);
        }
    };
    /**
     * Appeinding container element for rows to the root element.
     */
    ListComponent.prototype.addContainer = function (rootEl) {
        rootEl.append("\n        <div class=\"dynamic-content\" style=\"position: relative; \">\n            <div class=\"list-wrapper\">\n\t\t\t\t" + this.templates.wrapper() + "\n            </div> <!-- / .list-wrapper -->\n            " + this.getLoading() + "\n\t\t</div> <!-- / .dynamic-content -->");
        return rootEl.find(".dynamic-content>.list-wrapper .lister-template-root");
    };
    ListComponent.prototype.getLoading = function () {
        return "\n            <div class=\"table-loading loading-wrapper\">\n                <div class=\"load-wrapp status\">\n                    <div class=\"load-6\">\n                        <div class=\"letter-holder\">\n                            <div class=\"l-1 letter\">L</div>\n                            <div class=\"l-2 letter\">o</div>\n                            <div class=\"l-3 letter\">a</div>\n                            <div class=\"l-4 letter\">d</div>\n                            <div class=\"l-5 letter\">i</div>\n                            <div class=\"l-6 letter\">n</div>\n                            <div class=\"l-7 letter\">g</div>\n                            <div class=\"l-8 letter\">.</div>\n                            <div class=\"l-9 letter\">.</div>\n                            <div class=\"l-10 letter\">.</div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
    };
    ListComponent.prototype.insert = function (rowsInHTML) {
        this.updateList(this.rootEl, rowsInHTML);
    };
    ListComponent.prototype.listenForReloadOrder = function () {
        var self = this;
        Functions_1.$$(".btn-loading").on("click", function (e) {
            Functions_1.$$(this).addClass(".loading");
            // self.rootEl.html("") ;
            self.option.fire("reload.before");
        });
    };
    /**
     * Compares the list item and updates the list items in DOM.
     *
     * @param parent Parent element holding the list nodes.
     * @param newNodesHTML New row items in form of html strings.
     */
    ListComponent.prototype.updateList = function (parent, newNodesHTML) {
        if (this.nodesHTML.length == 0) {
            parent.html(newNodesHTML.join("\n"));
        }
        else {
            for (var i = 0; i < Math.max(newNodesHTML.length, this.nodesHTML.length); i++) {
                var oldNode = this.nodesHTML[i];
                var newNode = newNodesHTML[i];
                if (Functions_1.isUndef(newNode)) {
                    continue;
                }
                else if (Functions_1.isUndef(oldNode)) {
                    parent.append(newNode);
                }
                else if (oldNode != newNode) {
                    parent[0].replaceChild(Functions_1.$$(newNode)[0], this.childNodes(parent[0])[i]);
                }
            }
            for (var i = Math.max(newNodesHTML.length, this.nodesHTML.length) - 1; i >= 0; i--) {
                if (Functions_1.isUndef(newNodesHTML[i])) {
                    parent.children().eq(i).detach();
                }
            }
        }
        this.nodesHTML = newNodesHTML;
    };
    ListComponent.prototype.childNodes = function (parent) {
        var elements = [];
        var children = parent.childNodes;
        for (var i = 0; i < children.length; i++) {
            var node = children[i];
            if (node.nodeType === 1) {
                elements.push(node);
            }
        }
        return elements;
    };
    return ListComponent;
}(Component_1.Component));
exports.ListComponent = ListComponent;

},{"../../Utilities/Functions":19,"./Component":23}],26:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DOM_1 = require("../../Utilities/DOM");
var Component_1 = require("./Component");
var PaginationComponent = /** @class */ (function (_super) {
    __extends(PaginationComponent, _super);
    function PaginationComponent(option, rootEl, pagination) {
        var _this = _super.call(this) || this;
        _this.option = option;
        _this.pagination = pagination;
        if (_this.option.get("lazy_load")) {
            _this.paginationTemplate = _this.option.get("templates.lazyLoader");
        }
        else {
            _this.paginationTemplate = _this.option.get("templates.pagination");
        }
        var paginationEl = _this.addContainer(rootEl);
        _this.listenForPaginationEvent(rootEl, paginationEl);
        _this.rootEl = paginationEl;
        return _this;
    }
    /**
     */
    PaginationComponent.prototype.render = function (data, page) {
        this.rootEl.html(this.paginationTemplate(this.pagination));
    };
    PaginationComponent.prototype.listenForPaginationEvent = function (rootEl, paginationEl) {
        var self = this;
        paginationEl.on("click", ".pagination li a", function (e) {
            e.stopPropagation();
            e.preventDefault();
            var pageLinkEl = new DOM_1.DOM(this);
            var page = parseInt(pageLinkEl.data("page"));
            if (!isNaN(page) && page >= 1) {
                self.option.fire("page.change.before", [page]);
            }
        });
        if (this.option.get("lazy_load")) {
            paginationEl.on("click", "button.load-more-btn", function (e) {
                e.stopPropagation();
                e.preventDefault();
                var pageLinkEl = new DOM_1.DOM(this);
                var page = parseInt(pageLinkEl.data("page"));
                pageLinkEl.addClass("is-loading");
                if (!isNaN(page) && page >= 1) {
                    self.option.fire("page.change.before", [page]);
                }
            });
        }
    };
    /**
     * Appeinding container element for search field to the root element.
     */
    PaginationComponent.prototype.addContainer = function (rootEl) {
        rootEl.append("<div class=\"pagination-wrapper\"></div> <!-- / .pagination-wrapper -->");
        return rootEl.find(".pagination-wrapper");
    };
    return PaginationComponent;
}(Component_1.Component));
exports.PaginationComponent = PaginationComponent;

},{"../../Utilities/DOM":18,"./Component":23}],27:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DOM_1 = require("../../Utilities/DOM");
var Functions_1 = require("../../Utilities/Functions");
var Component_1 = require("./Component");
var SearchComponent = /** @class */ (function (_super) {
    __extends(SearchComponent, _super);
    function SearchComponent(option, rootEl, pagination) {
        var _this = _super.call(this) || this;
        _this.option = option;
        _this.pagination = pagination;
        _this.searchTemplate = _this.option.get("templates.search");
        _this.rootEl = rootEl;
        _this.inputEl = _this.addContainer(rootEl);
        _this.listenForInputChange();
        return _this;
    }
    SearchComponent.prototype.render = function (data, page) {
    };
    SearchComponent.prototype.setSearchQuery = function (query) {
        if (query === void 0) { query = ""; }
        this.inputEl.val(query).trigger("input").focus();
    };
    /**
     * Appending container element for search field to the root element.
     */
    SearchComponent.prototype.addContainer = function (rootEl) {
        rootEl.prepend(this.searchTemplate());
        if (!this.option.exists("search_input_selector")) {
            var rootElUniqueID = "lister-component-" + this.option.instanceNo();
            this.option.set("search_input_selector", "#" + rootElUniqueID + " " + this.option.get("search_input_selector"));
        }
        return new DOM_1.DOM(this.option.get("search_input_selector"));
    };
    SearchComponent.prototype.listenForInputChange = function () {
        var self = this, inputGroupEl = this.inputEl.parent();
        this.inputEl.on("input", function (e) {
            var query = Functions_1.$$(this).val().toString();
            if (query.length > 0) {
                inputGroupEl.removeClass("empty");
            }
            else if (!inputGroupEl.hasClass("empty")) {
                inputGroupEl.addClass("empty");
            }
            self.option.fire("search.requested", [query]);
        });
        inputGroupEl.on("click", ".btn.lister-search-input-clear-btn", function (e) {
            e.stopPropagation();
            self.setSearchQuery("");
        });
    };
    return SearchComponent;
}(Component_1.Component));
exports.SearchComponent = SearchComponent;

},{"../../Utilities/DOM":18,"../../Utilities/Functions":19,"./Component":23}],28:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("./Component");
var Functions_1 = require("../../Utilities/Functions");
var SorterComponent = /** @class */ (function (_super) {
    __extends(SorterComponent, _super);
    function SorterComponent(option, rootEl, pagination) {
        var _this = _super.call(this) || this;
        _this.option = option;
        _this.pagination = pagination;
        _this.templates = option.get("templates");
        _this.rootEl = rootEl;
        rootEl = _this.addContainer(rootEl);
        _this.render(rootEl);
        _this.listenForSorterEvents(rootEl);
        return _this;
    }
    /**
     */
    SorterComponent.prototype.render = function (rootEl) {
        var sorters = this.option.get("sorters");
        var html = ["\n        <select class=\"form-control\">\n            <option value=\"none\">None</option>"];
        var directions = {
            asc: "Ascending",
            desc: "Descending",
        };
        for (var column in sorters) {
            var label = sorters[column];
            var sorterObj = {};
            for (var key in directions) {
                sorterObj["column"] = column;
                sorterObj["direction"] = key;
                html.push("\n                <option value='" + JSON.stringify(sorterObj) + "'>" + label + " - " + directions[key] + "</option>");
            }
        }
        html.push("\n        </select>");
        rootEl.html(html.join("\n"));
    };
    SorterComponent.prototype.listenForSorterEvents = function (rootEl) {
        var self = this, sorters = this.option.get("sorters");
        rootEl.children("select").first().on("change", function (e) {
            var value = Functions_1.$$(this).val();
            var sorterObj;
            try {
                sorterObj = JSON.parse(value);
            }
            catch (err) {
                return;
                return self.option.fire("sorter.before");
            }
            var column = sorterObj.column;
            if (!Functions_1.isUndef(column) && !Functions_1.isUndef(sorters[column])) {
                self.option.fire("sorter.before", [column, sorterObj.direction.toLowerCase().trim() == "desc"]);
            }
        });
    };
    SorterComponent.prototype.addContainer = function (rootEl) {
        rootEl.append("\n        <div class=\"sorters-wrapper\">\n            <div class=\"sorters\">\n            </div> <!-- / .sorters -->\n        </div> <!-- / .sorters-wrapper -->");
        return rootEl.find(".sorters-wrapper>.sorters");
    };
    return SorterComponent;
}(Component_1.Component));
exports.SorterComponent = SorterComponent;

},{"../../Utilities/Functions":19,"./Component":23}],29:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Functions_1 = require("../../Utilities/Functions");
var Component_1 = require("./Component");
var TableComponent = /** @class */ (function (_super) {
    __extends(TableComponent, _super);
    function TableComponent(option, rootEl, pagination) {
        var _this = _super.call(this) || this;
        /**
         * Table headers.
         *
         * @type {Array}
         */
        _this.headers = [];
        /**
         * Indicates whether or not the app is in 404 not found error state.
         * Other words, shows whether or not the not found template is currently
         * in the view or not.
         *
         * @type {DOM|JQuery}
         */
        _this.isIn404State = false;
        /**
         * Array keeping the result of passing the row to its template.
         *
         * @type {array}
         */
        _this.nodesHTML = [];
        _this.option = option;
        _this.pagination = pagination;
        _this.templates = option.get("templates");
        _this.rootEl = _this.addContainer(rootEl);
        // if( this.option.hasData() || this.option.get("prefetch") )
        // {
        //     this.listenForSorterEvents( rootEl ) ;
        // }
        _this.listenForSorterEvents(rootEl);
        return _this;
    }
    TableComponent.prototype.render = function (data, page) {
        if (page === void 0) { page = 1; }
        if (data.length == 0) {
            this.rootEl.html("\n\t\t\t<tr>\n\t\t\t\t<td colspan=\"" + this.headers.length + "\">\n\t\t\t\t\t" + this.templates.notFound(false) + "\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t");
            this.isIn404State = true;
            // this.listenForReloadOrder() ;
            this.nodesHTML = [];
            this.option.fire("list.empty", [this.rootEl]);
        }
        else {
            var headers = this.option.get("table_headers");
            var itemsShown = this.pagination.countOfShownItems();
            var rowsTemplates = [];
            for (var i = 0; i < data.length; i++) {
                var row = data[i];
                var tableRow = this.templates.tableRow(headers, row, itemsShown + i);
                rowsTemplates.push(tableRow);
            }
            this.updateList(this.rootEl, rowsTemplates);
            //this.rootEl.html( rowsTemplates.join("") ) ;
            this.option.fire("list.mounted", [this.rootEl]);
            if (this.isIn404State) {
                // this.notFoundRootEl.html("") ;
                this.isIn404State = false;
            }
        }
    };
    /**
     * Compares the list item and updates the list items in DOM.
     *
     * @param parent Parent element holding the list nodes.
     * @param newNodesHTML New row items in form of html strings.
     */
    TableComponent.prototype.updateList = function (parent, newNodesHTML) {
        if (this.nodesHTML.length == 0) {
            parent.html(newNodesHTML.join("\n"));
        }
        else {
            for (var i = 0; i < Math.max(newNodesHTML.length, this.nodesHTML.length); i++) {
                var oldNode = this.nodesHTML[i];
                var newNode = newNodesHTML[i];
                if (Functions_1.isUndef(newNode)) {
                    continue;
                }
                else if (Functions_1.isUndef(oldNode)) {
                    parent.append(Functions_1.$$(newNode)[0]);
                }
                else if (oldNode != newNode) {
                    parent[0].replaceChild(Functions_1.$$(newNode)[0], this.childNodes(parent[0])[i]);
                }
            }
            for (var i = Math.max(newNodesHTML.length, this.nodesHTML.length) - 1; i >= 0; i--) {
                if (Functions_1.isUndef(newNodesHTML[i])) {
                    parent.children().eq(i).detach();
                }
            }
        }
        this.nodesHTML = newNodesHTML;
    };
    TableComponent.prototype.childNodes = function (parent) {
        var elements = [];
        var children = parent.childNodes;
        for (var i = 0; i < children.length; i++) {
            var node = children[i];
            if (node.nodeType === 1) {
                elements.push(node);
            }
        }
        return elements;
    };
    /**
     * Creates HTMLElements from a HTML string.
     *
     * @param html HTML string we want to convert to HTMLElement.
     */
    TableComponent.prototype.simpleHtmlToNode = function (html) {
        var div = document.createElement('div');
        div.innerHTML = html.trim();
        // Change this to div.el.childNodes[ i ]Nodes to support multiple top-level nodes
        return div.firstChild;
    };
    TableComponent.prototype.setUpHeaders = function () {
        var headers = this.option.get("table_headers");
        var htmlArr = [];
        for (var index in headers) {
            var header = headers[index];
            var classes = "", label = index, sorterBtn = "", attrs = "";
            // if( header.sorter && ( this.option.hasData() || this.option.get("prefetch") ) )
            if (header.sorter) {
                classes += " has-sorter";
                sorterBtn = "\n\t\t\t\t<div class=\"btn-group-vertical btn-group-sort\">\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-sm btn-secondary\"><i class=\"fas fa-caret-up\"></i></button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-sm btn-secondary\"><i class=\"fas fa-caret-down\"></i></button>\n\t\t\t\t</div>";
            }
            if (header.label) {
                label = header.label;
            }
            if (header.attrs) {
                for (var i in header.attrs) {
                    var attr = header.attrs[i];
                    if (i == "class") {
                        classes += " " + attr;
                    }
                    else {
                        attrs += " " + i + "=\"" + attr + "\"";
                    }
                }
            }
            htmlArr.push("\n\t\t\t<th data-column=\"" + index + "\" class=\"" + classes + "\" " + attrs + ">\n\t\t\t\t" + label + "\n\t\t\t\t" + sorterBtn + "\n\t\t\t</th>");
            this.headers.push({
                index: index,
                label: label,
                sorter: header.sorter,
            });
        }
        return htmlArr.join("\n");
    };
    /**
     * Appeinding container element for rows to the root element.
     */
    TableComponent.prototype.addContainer = function (rootEl) {
        var headers = this.setUpHeaders();
        rootEl.append("\n        <div class=\"dynamic-content\" style=\"position: relative;\">\n            <div class=\"list-wrapper\">\n\t\t\t\t" + this.templates.wrapper() + "\n            </div> <!-- / .list-wrapper -->\n\t\t\t" + this.getLoading() + "\n\t\t</div> <!-- / .dynamic-content -->");
        rootEl.find(".dynamic-content>.list-wrapper .lister-template-root").html(this.templates.table(headers));
        return rootEl.find(".list-wrapper .table>tbody");
    };
    TableComponent.prototype.getLoading = function () {
        return "\n\t\t\t<div class=\"table-loading loading-wrapper\">\n\t\t\t\t<div class=\"load-wrapp status\">\n\t\t\t\t\t<div class=\"load-6\">\n\t\t\t\t\t\t<div class=\"letter-holder\">\n\t\t\t\t\t\t\t<div class=\"l-1 letter\">L</div>\n\t\t\t\t\t\t\t<div class=\"l-2 letter\">o</div>\n\t\t\t\t\t\t\t<div class=\"l-3 letter\">a</div>\n\t\t\t\t\t\t\t<div class=\"l-4 letter\">d</div>\n\t\t\t\t\t\t\t<div class=\"l-5 letter\">i</div>\n\t\t\t\t\t\t\t<div class=\"l-6 letter\">n</div>\n\t\t\t\t\t\t\t<div class=\"l-7 letter\">g</div>\n\t\t\t\t\t\t\t<div class=\"l-8 letter\">.</div>\n\t\t\t\t\t\t\t<div class=\"l-9 letter\">.</div>\n\t\t\t\t\t\t\t<div class=\"l-10 letter\">.</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t";
    };
    TableComponent.prototype.listenForSorterEvents = function (rootEl) {
        var self = this;
        rootEl.find("th.has-sorter").on("click", function (e) {
            // if( ! self.option.hasData() )
            // {
            // 	return ;
            // }
            $(this).parent().find(".sort-asc, .sort-desc").not(this).removeClass("sort-desc sort-asc");
            var order;
            if ($(this).hasClass("sort-asc")) {
                $(this).removeClass("sort-asc").addClass("sort-desc");
                order = "desc";
            }
            else {
                $(this).removeClass("sort-desc").addClass("sort-asc");
                order = "asc";
            }
            $(this).closest("table").trigger("changed.sort", [$(this).data("column"), order]);
        });
        rootEl.find(".table-sort").on("changed.sort", function (e, columnName, sortOrder) {
            $(this).addClass("sorted").data("sort-by", columnName).data("sort-order", sortOrder);
        });
        rootEl.find(".table-sort").on("changed.sort", function (e, columnName, sortOrder) {
            self.option.fire("sorter.before", [columnName, sortOrder === "desc"]);
        });
    };
    TableComponent.prototype.listenForReloadOrder = function () {
        var self = this;
        Functions_1.$$(".btn-loading").on("click", function (e) {
            Functions_1.$$(this).addClass(".loading");
            // self.rootEl.html("") ;
            self.option.fire("reload.before");
        });
    };
    return TableComponent;
}(Component_1.Component));
exports.TableComponent = TableComponent;

},{"../../Utilities/Functions":19,"./Component":23}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FilterComponent_1 = require("./Components/FilterComponent");
var ListComponent_1 = require("./Components/ListComponent");
var SearchComponent_1 = require("./Components/SearchComponent");
var SorterComponent_1 = require("./Components/SorterComponent");
var TableComponent_1 = require("./Components/TableComponent");
var PaginationComponent_1 = require("./Components/PaginationComponent");
var View = /** @class */ (function () {
    function View(option, pagination, filter) {
        /**
         * View`s components.
         *
         * @type {object}
         */
        this.components = {};
        this.option = option;
        this.pagination = pagination;
        this.filter = filter;
        this.setRootEl(this.option.getRootElement());
        this.option.set("el", this.rootEl);
        this.showLoading();
        this.setUpComponents();
        this.listenForPaginationEvents();
        this.listenForListsRenderingEvents();
    }
    /**
     * Gets the collection of data and inserts it to the any.
     *
     * @param collection Collection of data.
     */
    View.prototype.insert = function (data) {
        this.components.list.render(data, this.pagination.currentPage());
        if (this.components.pagination) {
            this.components.pagination.render(this.pagination);
        }
        this.option.fire("all.mounted", [this.rootEl]);
        this.hideLoading();
    };
    /**
     * Shows the loading by adding the loading class to the root element.
     */
    View.prototype.showLoading = function () {
        if (this.option.get("lazy_load")) {
            this.rootEl.find("button.load-more-btn i").addClass("fa-spin");
            this.option.fire("lazy-loading.shown", [this.rootEl]);
        }
        this.rootEl.addClass(this.option.get("loading_class"));
        this.option.fire("loading.shown", [this.rootEl]);
        return this;
    };
    /**
     * Hiding the loading by removing the loading class of the root element.
     */
    View.prototype.hideLoading = function () {
        if (this.option.get("lazy_load")) {
            this.rootEl.find("button.load-more-btn i").removeClass("fa-spin");
            this.option.fire("lazy-loading.hidden", [this.rootEl]);
        }
        this.rootEl.removeClass(this.option.get("loading_class"));
        this.option.fire("loading.hidden", [this.rootEl]);
        return this;
    };
    View.prototype.setUpComponents = function () {
        if (this.option.get("search")) {
            this.components.search = new SearchComponent_1.SearchComponent(this.option, this.rootEl, this.pagination);
        }
        if (this.option.hasData() && this.option.get("filters")) {
            this.components.filters = new FilterComponent_1.FilterComponent(this.option, this.rootEl, this.pagination, this.filter);
        }
        if (this.option.hasData() && this.option.get("sorters")) {
            this.components.sorters = new SorterComponent_1.SorterComponent(this.option, this.rootEl, this.pagination);
        }
        if (this.option.get("table")) {
            this.components.list = new TableComponent_1.TableComponent(this.option, this.rootEl, this.pagination);
        }
        else {
            this.components.list = new ListComponent_1.ListComponent(this.option, this.rootEl, this.pagination);
        }
        if (this.option.get("pagination")) {
            this.components.pagination = new PaginationComponent_1.PaginationComponent(this.option, this.rootEl, this.pagination);
        }
    };
    View.prototype.setRootEl = function (rootEl) {
        rootEl.html("<div class=\"lister-component\" id=\"lister-component-" + this.option.instanceNo() + "\"></div> <!-- .lister-component -->");
        rootEl = rootEl.find(".lister-component");
        this.rootEl = rootEl;
        return this;
    };
    View.prototype.listenForPaginationEvents = function () {
        var self = this;
        this.option.listen("page.change.before", function () {
            if (self.option.get("lazy_load")) {
                self.rootEl.find("button.load-more-btn i").addClass("fa-spin");
            }
        });
    };
    View.prototype.listenForListsRenderingEvents = function () {
        var self = this;
        this.option.listen("list.empty", function (containerEl) {
            self.rootEl.addClass("filled");
        });
        this.option.listen("list.mounted", function (containerEl) {
            self.rootEl.addClass("filled");
        });
        this.option.listen("list.cleared", function (containerEl) {
            self.rootEl.removeClass("filled");
        });
    };
    View.prototype.destroy = function () {
        this.rootEl.detach();
    };
    return View;
}());
exports.View = View;

},{"./Components/FilterComponent":24,"./Components/ListComponent":25,"./Components/PaginationComponent":26,"./Components/SearchComponent":27,"./Components/SorterComponent":28,"./Components/TableComponent":29}],31:[function(require,module,exports){

},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var windowObj = window;
// Interfaces and prototypes.
require("./Types/types");
var Lister_1 = require("./Lister/Lister");
windowObj.Lister = Lister_1.Lister;

},{"./Lister/Lister":17,"./Types/types":31}]},{},[32]);
