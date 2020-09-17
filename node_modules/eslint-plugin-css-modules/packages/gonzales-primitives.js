(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gonzales-primitives"] = factory();
	else
		root["gonzales-primitives"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Node = __webpack_require__(1);
	var parse = __webpack_require__(7);

	module.exports = {
	  createNode: function (options) {
	    return new Node(options);
	  },
	  parse: parse
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @param {string} type
	 * @param {array|string} content
	 * @param {number} line
	 * @param {number} column
	 * @constructor
	 */

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Node = (function () {
	  function Node(options) {
	    _classCallCheck(this, Node);

	    this.type = options.type;
	    this.content = options.content;
	    this.syntax = options.syntax;

	    if (options.start) this.start = options.start;
	    if (options.end) this.end = options.end;
	  }

	  /**
	   * @param {String} type Node type
	   * @return {Boolean} Whether there is a child node of given type
	   */

	  Node.prototype.contains = function contains(type) {
	    return this.content.some(function (node) {
	      return node.type === type;
	    });
	  };

	  /**
	   * @param {String} type Node type
	   * @param {Function} callback Function to call for every found node
	   */

	  Node.prototype.eachFor = function eachFor(type, callback) {
	    if (!Array.isArray(this.content)) return;

	    if (typeof type !== 'string') {
	      callback = type;
	      type = null;
	    }

	    var l = this.content.length;
	    var breakLoop;

	    for (var i = l; i--;) {
	      if (breakLoop === null) break;

	      if (!type || this.content[i] && this.content[i].type === type) breakLoop = callback(this.content[i], i, this);
	    }

	    if (breakLoop === null) return null;
	  };

	  /**
	   * @param {String} type
	   * @return {?Node} First child node or `null` if nothing's been found.
	   */

	  Node.prototype.first = function first(type) {
	    if (!Array.isArray(this.content)) return null;

	    if (!type) return this.content[0];

	    var i = 0;
	    var l = this.content.length;

	    for (; i < l; i++) {
	      if (this.content[i].type === type) return this.content[i];
	    }

	    return null;
	  };

	  /**
	   * @param {String} type Node type
	   * @param {Function} callback Function to call for every found node
	   */

	  Node.prototype.forEach = function forEach(type, callback) {
	    if (!Array.isArray(this.content)) return;

	    if (typeof type !== 'string') {
	      callback = type;
	      type = null;
	    }

	    var i = 0;
	    var l = this.content.length;
	    var breakLoop;

	    for (; i < l; i++) {
	      if (breakLoop === null) break;

	      if (!type || this.content[i] && this.content[i].type === type) breakLoop = callback(this.content[i], i, this);
	    }

	    if (breakLoop === null) return null;
	  };

	  /**
	   * @param {Number} index
	   * @return {?Node}
	   */

	  Node.prototype.get = function get(index) {
	    if (!Array.isArray(this.content)) return null;

	    var node = this.content[index];
	    return node ? node : null;
	  };

	  /**
	   * @param {Number} index
	   * @param {Node} node
	   */

	  Node.prototype.insert = function insert(index, node) {
	    if (!Array.isArray(this.content)) return;

	    this.content.splice(index, 0, node);
	  };

	  /**
	   * @param {String} type
	   * @return {Boolean} Whether the node is of given type
	   */

	  Node.prototype.is = function is(type) {
	    return this.type === type;
	  };

	  /**
	   * @param {String} type
	   * @return {?Node} Last child node or `null` if nothing's been found.
	   */

	  Node.prototype.last = function last(type) {
	    if (!Array.isArray(this.content)) return null;

	    var i = this.content.length - 1;
	    if (!type) return this.content[i];

	    for (;; i--) {
	      if (this.content[i].type === type) return this.content[i];
	    }

	    return null;
	  };

	  /**
	   * Number of child nodes.
	   * @type {number}
	   */

	  /**
	   * @param {Number} index
	   * @return {Node}
	   */

	  Node.prototype.removeChild = function removeChild(index) {
	    if (!Array.isArray(this.content)) return;

	    var removedChild = this.content.splice(index, 1);

	    return removedChild;
	  };

	  Node.prototype.toJson = function toJson() {
	    return JSON.stringify(this, false, 2);
	  };

	  Node.prototype.toString = function toString() {
	    var stringify = undefined;

	    try {
	      stringify = __webpack_require__(2)("./" + this.syntax + '/stringify');
	    } catch (e) {
	      var message = 'Syntax "' + this.syntax + '" is not supported yet, sorry';
	      return console.error(message);
	    }

	    return stringify(this);
	  };

	  /**
	   * @param {Function} callback
	   */

	  Node.prototype.traverse = function traverse(callback, index) {
	    var level = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	    var parent = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

	    var breakLoop;
	    var x;

	    level++;

	    callback(this, index, parent, level);

	    if (!Array.isArray(this.content)) return;

	    for (var i = 0, l = this.content.length; i < l; i++) {
	      breakLoop = this.content[i].traverse(callback, i, level, this);
	      if (breakLoop === null) break;

	      // If some nodes were removed or added:
	      if (x = this.content.length - l) {
	        l += x;
	        i += x;
	      }
	    }

	    if (breakLoop === null) return null;
	  };

	  Node.prototype.traverseByType = function traverseByType(type, callback) {
	    this.traverse(function (node) {
	      if (node.type === type) callback.apply(node, arguments);
	    });
	  };

	  Node.prototype.traverseByTypes = function traverseByTypes(types, callback) {
	    this.traverse(function (node) {
	      if (types.indexOf(node.type) !== -1) callback.apply(node, arguments);
	    });
	  };

	  _createClass(Node, [{
	    key: 'length',
	    get: function () {
	      if (!Array.isArray(this.content)) return 0;
	      return this.content.length;
	    }
	  }]);

	  return Node;
	})();

	module.exports = Node;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./css/stringify": 3,
		"./less/stringify": 4,
		"./sass/stringify": 5,
		"./scss/stringify": 6
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 2;


/***/ },
/* 3 */
/***/ function(module, exports) {

	// jscs:disable maximumLineLength

	'use strict';

	module.exports = function stringify(tree) {
	  // TODO: Better error message
	  if (!tree) throw new Error('We need tree to translate');

	  function _t(tree) {
	    var type = tree.type;
	    if (_unique[type]) return _unique[type](tree);
	    if (typeof tree.content === 'string') return tree.content;
	    if (Array.isArray(tree.content)) return _composite(tree.content);
	    return '';
	  }

	  function _composite(t, i) {
	    if (!t) return '';

	    var s = '';
	    i = i || 0;
	    for (; i < t.length; i++) s += _t(t[i]);
	    return s;
	  }

	  var _unique = {
	    'arguments': function (t) {
	      return '(' + _composite(t.content) + ')';
	    },
	    'atkeyword': function (t) {
	      return '@' + _composite(t.content);
	    },
	    'attributeSelector': function (t) {
	      return '[' + _composite(t.content) + ']';
	    },
	    'block': function (t) {
	      return '{' + _composite(t.content) + '}';
	    },
	    'brackets': function (t) {
	      return '[' + _composite(t.content) + ']';
	    },
	    'class': function (t) {
	      return '.' + _composite(t.content);
	    },
	    'color': function (t) {
	      return '#' + t.content;
	    },
	    'expression': function (t) {
	      return 'expression(' + t.content + ')';
	    },
	    'id': function (t) {
	      return '#' + _composite(t.content);
	    },
	    'multilineComment': function (t) {
	      return '/*' + t.content + '*/';
	    },
	    'nthSelector': function (t) {
	      return ':' + _t(t.content[0]) + '(' + _composite(t.content.slice(1)) + ')';
	    },
	    'parentheses': function (t) {
	      return '(' + _composite(t.content) + ')';
	    },
	    'percentage': function (t) {
	      return _composite(t.content) + '%';
	    },
	    'pseudoClass': function (t) {
	      return ':' + _composite(t.content);
	    },
	    'pseudoElement': function (t) {
	      return '::' + _composite(t.content);
	    },
	    'uri': function (t) {
	      return 'url(' + _composite(t.content) + ')';
	    }
	  };

	  return _t(tree);
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	// jscs:disable maximumLineLength

	'use strict';

	module.exports = function stringify(tree) {
	  // TODO: Better error message
	  if (!tree) throw new Error('We need tree to translate');

	  function _t(tree) {
	    var type = tree.type;
	    if (_unique[type]) return _unique[type](tree);
	    if (typeof tree.content === 'string') return tree.content;
	    if (Array.isArray(tree.content)) return _composite(tree.content);
	    return '';
	  }

	  function _composite(t, i) {
	    if (!t) return '';

	    var s = '';
	    i = i || 0;
	    for (; i < t.length; i++) s += _t(t[i]);
	    return s;
	  }

	  var _unique = {
	    'arguments': function (t) {
	      return '(' + _composite(t.content) + ')';
	    },
	    'atkeyword': function (t) {
	      return '@' + _composite(t.content);
	    },
	    'attributeSelector': function (t) {
	      return '[' + _composite(t.content) + ']';
	    },
	    'block': function (t) {
	      return '{' + _composite(t.content) + '}';
	    },
	    'brackets': function (t) {
	      return '[' + _composite(t.content) + ']';
	    },
	    'class': function (t) {
	      return '.' + _composite(t.content);
	    },
	    'color': function (t) {
	      return '#' + t.content;
	    },
	    'escapedString': function (t) {
	      return '~' + t.content;
	    },
	    'expression': function (t) {
	      return 'expression(' + t.content + ')';
	    },
	    'id': function (t) {
	      return '#' + _composite(t.content);
	    },
	    'interpolatedVariable': function (t) {
	      return '@{' + _composite(t.content) + '}';
	    },
	    'multilineComment': function (t) {
	      return '/*' + t.content + '*/';
	    },
	    'nthSelector': function (t) {
	      return ':' + _t(t.content[0]) + '(' + _composite(t.content.slice(1)) + ')';
	    },
	    'parentheses': function (t) {
	      return '(' + _composite(t.content) + ')';
	    },
	    'percentage': function (t) {
	      return _composite(t.content) + '%';
	    },
	    'pseudoClass': function (t) {
	      return ':' + _composite(t.content);
	    },
	    'pseudoElement': function (t) {
	      return '::' + _composite(t.content);
	    },
	    'singlelineComment': function (t) {
	      return '/' + '/' + t.content;
	    },
	    'uri': function (t) {
	      return 'url(' + _composite(t.content) + ')';
	    },
	    'variable': function (t) {
	      return '@' + _composite(t.content);
	    },
	    'variablesList': function (t) {
	      return _composite(t.content) + '...';
	    }
	  };

	  return _t(tree);
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	// jscs:disable maximumLineLength

	'use strict';

	module.exports = function stringify(tree) {
	  // TODO: Better error message
	  if (!tree) throw new Error('We need tree to translate');

	  function _t(tree) {
	    var type = tree.type;
	    if (_unique[type]) return _unique[type](tree);
	    if (typeof tree.content === 'string') return tree.content;
	    if (Array.isArray(tree.content)) return _composite(tree.content);
	    return '';
	  }

	  function _composite(t, i) {
	    if (!t) return '';

	    var s = '';
	    i = i || 0;
	    for (; i < t.length; i++) s += _t(t[i]);
	    return s;
	  }

	  var _unique = {
	    'arguments': function (t) {
	      return '(' + _composite(t.content) + ')';
	    },
	    'atkeyword': function (t) {
	      return '@' + _composite(t.content);
	    },
	    'attributeSelector': function (t) {
	      return '[' + _composite(t.content) + ']';
	    },
	    'block': function (t) {
	      return _composite(t.content);
	    },
	    'brackets': function (t) {
	      return '[' + _composite(t.content) + ']';
	    },
	    'class': function (t) {
	      return '.' + _composite(t.content);
	    },
	    'color': function (t) {
	      return '#' + t.content;
	    },
	    'expression': function (t) {
	      return 'expression(' + t.content + ')';
	    },
	    'id': function (t) {
	      return '#' + _composite(t.content);
	    },
	    'interpolation': function (t) {
	      return '#{' + _composite(t.content) + '}';
	    },
	    'multilineComment': function (t) {
	      return '/*' + t.content;
	    },
	    'nthSelector': function (t) {
	      return ':' + _t(t.content[0]) + '(' + _composite(t.content.slice(1)) + ')';
	    },
	    'parentheses': function (t) {
	      return '(' + _composite(t.content) + ')';
	    },
	    'percentage': function (t) {
	      return _composite(t.content) + '%';
	    },
	    'placeholder': function (t) {
	      return '%' + _composite(t.content);
	    },
	    'pseudoClass': function (t) {
	      return ':' + _composite(t.content);
	    },
	    'pseudoElement': function (t) {
	      return '::' + _composite(t.content);
	    },
	    'singlelineComment': function (t) {
	      return '/' + '/' + t.content;
	    },
	    'uri': function (t) {
	      return 'url(' + _composite(t.content) + ')';
	    },
	    'variable': function (t) {
	      return '$' + _composite(t.content);
	    },
	    'variablesList': function (t) {
	      return _composite(t.content) + '...';
	    }
	  };

	  return _t(tree);
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	// jscs:disable maximumLineLength

	'use strict';

	module.exports = function stringify(tree) {
	  // TODO: Better error message
	  if (!tree) throw new Error('We need tree to translate');

	  function _t(tree) {
	    var type = tree.type;
	    if (_unique[type]) return _unique[type](tree);
	    if (typeof tree.content === 'string') return tree.content;
	    if (Array.isArray(tree.content)) return _composite(tree.content);
	    return '';
	  }

	  function _composite(t, i) {
	    if (!t) return '';

	    var s = '';
	    i = i || 0;
	    for (; i < t.length; i++) s += _t(t[i]);
	    return s;
	  }

	  var _unique = {
	    'arguments': function (t) {
	      return '(' + _composite(t.content) + ')';
	    },
	    'atkeyword': function (t) {
	      return '@' + _composite(t.content);
	    },
	    'attributeSelector': function (t) {
	      return '[' + _composite(t.content) + ']';
	    },
	    'block': function (t) {
	      return '{' + _composite(t.content) + '}';
	    },
	    'brackets': function (t) {
	      return '[' + _composite(t.content) + ']';
	    },
	    'class': function (t) {
	      return '.' + _composite(t.content);
	    },
	    'color': function (t) {
	      return '#' + t.content;
	    },
	    'expression': function (t) {
	      return 'expression(' + t.content + ')';
	    },
	    'id': function (t) {
	      return '#' + _composite(t.content);
	    },
	    'interpolation': function (t) {
	      return '#{' + _composite(t.content) + '}';
	    },
	    'multilineComment': function (t) {
	      return '/*' + t.content + '*/';
	    },
	    'nthSelector': function (t) {
	      return ':' + _t(t.content[0]) + '(' + _composite(t.content.slice(1)) + ')';
	    },
	    'parentheses': function (t) {
	      return '(' + _composite(t.content) + ')';
	    },
	    'percentage': function (t) {
	      return _composite(t.content) + '%';
	    },
	    'placeholder': function (t) {
	      return '%' + _composite(t.content);
	    },
	    'pseudoClass': function (t) {
	      return ':' + _composite(t.content);
	    },
	    'pseudoElement': function (t) {
	      return '::' + _composite(t.content);
	    },
	    'singlelineComment': function (t) {
	      return '/' + '/' + t.content;
	    },
	    'uri': function (t) {
	      return 'url(' + _composite(t.content) + ')';
	    },
	    'variable': function (t) {
	      return '$' + _composite(t.content);
	    },
	    'variablesList': function (t) {
	      return _composite(t.content) + '...';
	    }
	  };

	  return _t(tree);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ParsingError = __webpack_require__(8);
	var syntaxes = __webpack_require__(10);

	var isInteger = Number.isInteger || function (value) {
	  return typeof value === 'number' && Math.floor(value) === value;
	};

	/**
	 * @param {String} css
	 * @param {Object} options
	 * @return {Object} AST
	 */
	function parser(css, options) {
	  if (typeof css !== 'string') throw new Error('Please, pass a string to parse');else if (!css) return __webpack_require__(29)();

	  var syntax = options && options.syntax || 'css';
	  var context = options && options.context || 'stylesheet';
	  var tabSize = options && options.tabSize;
	  if (!isInteger(tabSize) || tabSize < 1) tabSize = 1;

	  var syntaxParser = undefined;
	  if (syntaxes[syntax]) {
	    syntaxParser = syntaxes[syntax];
	  } else {
	    syntaxParser = syntaxes;
	  }

	  if (!syntaxParser) {
	    var message = 'Syntax "' + syntax + '" is not supported yet, sorry';
	    return console.error(message);
	  }

	  var getTokens = syntaxParser.tokenizer;
	  var mark = syntaxParser.mark;
	  var parse = syntaxParser.parse;

	  var tokens = getTokens(css, tabSize);
	  mark(tokens);

	  var ast;
	  try {
	    ast = parse(tokens, context);
	  } catch (e) {
	    if (!e.syntax) throw e;
	    throw new ParsingError(e, css);
	  }

	  return ast;
	}

	module.exports = parser;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var parserPackage = __webpack_require__(9);

	/**
	 * @param {Error} e
	 * @param {String} css
	 */
	function ParsingError(e, css) {
	  this.line = e.line;
	  this.syntax = e.syntax;
	  this.css_ = css;
	}

	ParsingError.prototype = Object.defineProperties({
	  /**
	   * @type {String}
	   * @private
	   */
	  customMessage_: '',

	  /**
	   * @type {Number}
	   */
	  line: null,

	  /**
	   * @type {String}
	   */
	  name: 'Parsing error',

	  /**
	   * @type {String}
	   */
	  syntax: null,

	  /**
	   * @type {String}
	   */
	  version: parserPackage.version,

	  /**
	   * @return {String}
	   */
	  toString: function () {
	    return [this.name + ': ' + this.message, '', this.context, '', 'Syntax: ' + this.syntax, 'Gonzales PE version: ' + this.version].join('\n');
	  }
	}, {
	  context: { /**
	              * @type {String}
	              */

	    get: function () {
	      var LINES_AROUND = 2;

	      var result = [];
	      var currentLineNumber = this.line;
	      var start = currentLineNumber - 1 - LINES_AROUND;
	      var end = currentLineNumber + LINES_AROUND;
	      var lines = this.css_.split(/\r\n|\r|\n/);

	      for (var i = start; i < end; i++) {
	        var line = lines[i];
	        if (!line) continue;
	        var ln = i + 1;
	        var mark = ln === currentLineNumber ? '*' : ' ';
	        result.push(ln + mark + '| ' + line);
	      }

	      return result.join('\n');
	    },
	    configurable: true,
	    enumerable: true
	  },
	  message: {

	    /**
	     * @type {String}
	     */

	    get: function () {
	      if (this.customMessage_) {
	        return this.customMessage_;
	      } else {
	        var message = 'Please check validity of the block';
	        if (typeof this.line === 'number') message += ' starting from line #' + this.line;
	        return message;
	      }
	    },
	    set: function (message) {
	      this.customMessage_ = message;
	    },
	    configurable: true,
	    enumerable: true
	  }
	});

	module.exports = ParsingError;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = {
		"name": "gonzales-pe",
		"description": "Gonzales Preprocessor Edition (fast CSS parser)",
		"version": "3.3.0",
		"homepage": "http://github.com/tonyganch/gonzales-pe",
		"bugs": "http://github.com/tonyganch/gonzales-pe/issues",
		"license": "MIT",
		"author": {
			"name": "Tony Ganch",
			"email": "tonyganch+github@gmail.com",
			"url": "http://tonyganch.com"
		},
		"main": "./lib/gonzales",
		"repository": {
			"type": "git",
			"url": "http://github.com/tonyganch/gonzales-pe.git"
		},
		"scripts": {
			"autofix-tests": "./scripts/build.sh && ./scripts/autofix-tests.sh",
			"build": "./scripts/build.sh",
			"init": "./scripts/init.sh",
			"log": "./scripts/log.sh",
			"prepublish": "./scripts/prepublish.sh",
			"postpublish": "./scripts/postpublish.sh",
			"test": "./scripts/build.sh && ./scripts/test.sh",
			"watch": "./scripts/watch.sh"
		},
		"bin": {
			"gonzales": "./bin/gonzales.js"
		},
		"dependencies": {
			"minimist": "1.1.x"
		},
		"devDependencies": {
			"babel-loader": "^5.3.2",
			"coffee-script": "~1.7.1",
			"jscs": "2.1.0",
			"jshint": "2.8.0",
			"json-loader": "^0.5.3",
			"mocha": "2.2.x",
			"webpack": "^1.12.2"
		},
		"engines": {
			"node": ">=0.6.0"
		}
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  css: __webpack_require__(11),
	  less: __webpack_require__(16),
	  sass: __webpack_require__(21),
	  scss: __webpack_require__(25)
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = {
	  mark: __webpack_require__(12),
	  parse: __webpack_require__(14),
	  stringify: __webpack_require__(3),
	  tokenizer: __webpack_require__(15)
	};
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var NodeType = __webpack_require__(13);

	/**
	 * Mark whitespaces and comments
	 * @param {Array} tokens
	 */
	function markSpacesAndComments(tokens) {
	  var tokensLength = tokens.length;
	  var spaces = [-1, -1];
	  var type; // Current token's type

	  // For every token in the token list, mark spaces and line breaks
	  // as spaces (set both `ws` and `sc` flags). Mark multiline comments
	  // with `sc` flag.
	  // If there are several spaces or tabs or line breaks or multiline
	  // comments in a row, group them: take the last one's index number
	  // and save it to the first token in the group as a reference:
	  // e.g., `ws_last = 7` for a group of whitespaces or `sc_last = 9`
	  // for a group of whitespaces and comments.
	  for (var i = 0; i < tokensLength; i++) {
	    type = tokens[i].type;

	    if (type === NodeType.SPACE) {
	      markSpace(tokens, i, spaces);
	    } else if (type === NodeType.MULTILINE_COMMENT) {
	      markComment(tokens, i, spaces);
	    } else {
	      markEndOfSpacesAndComments(tokens, i, spaces);
	    }
	  }

	  markEndOfSpacesAndComments(tokens, i, spaces);
	}

	function markSpace(tokens, i, spaces) {
	  var token = tokens[i];
	  token.ws = true;
	  token.sc = true;

	  if (spaces[0] === -1) spaces[0] = i;
	  if (spaces[1] === -1) spaces[1] = i;
	}

	function markComment(tokens, i, spaces) {
	  var ws = spaces[0];
	  tokens[i].sc = true;

	  if (ws !== -1) {
	    tokens[ws].ws_last = i - 1;
	    spaces[0] = -1;
	  }
	}

	function markEndOfSpacesAndComments(tokens, i, spaces) {
	  var ws = spaces[0];
	  var sc = spaces[1];
	  if (ws !== -1) {
	    tokens[ws].ws_last = i - 1;
	    spaces[0] = -1;
	  }
	  if (sc !== -1) {
	    tokens[sc].sc_last = i - 1;
	    spaces[1] = -1;
	  }
	}

	/**
	 * Pair brackets
	 * @param {Array} tokens
	 */
	function markBrackets(tokens) {
	  var tokensLength = tokens.length;
	  var ps = []; // Parentheses
	  var sbs = []; // Square brackets
	  var cbs = []; // Curly brackets
	  var t = undefined; // Current token

	  // For every token in the token list, if we meet an opening (left)
	  // bracket, push its index number to a corresponding array.
	  // If we then meet a closing (right) bracket, look at the corresponding
	  // array. If there are any elements (records about previously met
	  // left brackets), take a token of the last left bracket (take
	  // the last index number from the array and find a token with
	  // this index number) and save right bracket's index as a reference:
	  for (var i = 0; i < tokensLength; i++) {
	    t = tokens[i];
	    var type = t.type;

	    if (type === NodeType.LEFT_PARENTHESIS) {
	      ps.push(i);
	    } else if (type === NodeType.RIGHT_PARENTHESIS) {
	      if (ps.length) {
	        t.left = ps.pop();
	        tokens[t.left].right = i;
	      }
	    } else if (type === NodeType.LEFT_SQUARE_BRACKET) {
	      sbs.push(i);
	    } else if (type === NodeType.RIGHT_SQUARE_BRACKET) {
	      if (sbs.length) {
	        t.left = sbs.pop();
	        tokens[t.left].right = i;
	      }
	    } else if (type === NodeType.LEFT_CURLY_BRACKET) {
	      cbs.push(i);
	    } else if (type === NodeType.RIGHT_CURLY_BRACKET) {
	      if (cbs.length) {
	        t.left = cbs.pop();
	        tokens[t.left].right = i;
	      }
	    }
	  }
	}

	/**
	 * @param {Array} tokens
	 */
	function markTokens(tokens) {
	  // Mark paired brackets:
	  markBrackets(tokens);
	  // Mark whitespaces and comments:
	  markSpacesAndComments(tokens);
	}

	module.exports = markTokens;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * List of all possible node types for all syntaxes.
	 * @enum {string}
	 */
	var NodeType = {
	  // Primitive nodes, can't be divided into smaller parts.
	  AMPERSAND: 'ampersand',
	  APOSTROPHE: 'apostrophe',
	  ASTERISK: 'asterisk',
	  CHARACTER: 'character',
	  CIRCUMFLEX_ACCENT: 'circumflexAccent',
	  COLON: 'colon',
	  COMMA: 'comma',
	  COMMERCIAL_AT: 'commercialAt',
	  DIGIT: 'digit',
	  EQUALS_SIGN: 'equalsSign',
	  EXCLAMATION_MARK: 'exclamationMark',
	  FULL_STOP: 'fullStop',
	  GREATER_THAN_SIGN: 'greaterThanSign',
	  HYPHEN_MINUS: 'hyphenMinus',
	  LEFT_CURLY_BRACKET: 'leftCurlyBracket',
	  LEFT_PARENTHESIS: 'leftParenthesis',
	  LEFT_SQUARE_BRACKET: 'leftSquareBracket',
	  LESS_THAN_SIGN: 'lessThanSign',
	  LOW_LINE: 'lowLine',
	  MULTILINE_COMMENT: 'multilineComment',
	  NEWLINE: 'newline',
	  NUMBER: 'number',
	  NUMBER_SIGN: 'numberSign',
	  PERCENT_SIGN: 'percentSign',
	  PLUS_SIGN: 'plusSign',
	  QUESTION_MARK: 'questionMark',
	  QUOTATION_MARK: 'quotationMark',
	  REVERSE_SOLIDUS: 'reverseSolidus',
	  RIGHT_CURLY_BRACKET: 'rightCurlyBracket',
	  RIGHT_PARENTHESIS: 'rightParenthesis',
	  RIGHT_SQUARE_BRACKET: 'rightSquareBracket',
	  SEMICOLON: 'semicolon',
	  SINGLELINE_COMMENT: 'singlelineComment',
	  SOLIDUS: 'solidus',
	  SPACE: 'space',
	  TILDE: 'tilde',
	  VERTICAL_LINE: 'verticalLine',

	  // Paired nodes, grouped by some trait.
	  BRACES: 'braces',
	  BRACKETS: 'brackets',
	  PARENTHESES: 'parentheses',
	  STRING: 'string',

	  // Compound nodes.
	  ARGUMENTS: 'arguments',
	  ATKEYWORD: 'atkeyword',
	  ATRULE: 'atrule',
	  ATTRIBUTE_SELECTOR: 'attributeSelector',
	  ATTRIBUTE_NAME: 'attributeName',
	  ATTRIBUTE_FLAGS: 'attributeFlags',
	  ATTRIBUTE_MATCH: 'attributeMatch',
	  ATTRIBUTE_VALUE: 'attributeValue',
	  BLOCK: 'block',
	  CLASS: 'class',
	  COLOR: 'color',
	  COMBINATOR: 'combinator',
	  CONDITION: 'condition',
	  CONDITIONAL_STATEMENT: 'conditionalStatement',
	  DECLARATION: 'declaration',
	  DECLARATION_DELIMITER: 'declarationDelimiter',
	  DEFAULT: 'default',
	  DELIMITER: 'delimiter',
	  DIMENSION: 'dimension',
	  ESCAPED_STRING: 'escapedString',
	  EXTEND: 'extend',
	  EXPRESSION: 'expression',
	  FUNCTION: 'function',
	  GLOBAL: 'global',
	  ID: 'id',
	  IDENT: 'ident',
	  IMPORTANT: 'important',
	  INCLUDE: 'include',
	  INTERPOLATION: 'interpolation',
	  INTERPOLATED_VARIABLE: 'interpolatedVariable',
	  KEYFRAMES_SELECTOR: 'keyframesSelector',
	  LOOP: 'loop',
	  MIXIN: 'mixin',
	  NAME_PREFIX: 'namePrefix',
	  NAMESPACE_PREFIX: 'namespacePrefix',
	  NAMESPACE_SEPARATOR: 'namespaceSeparator',
	  OPERATOR: 'operator',
	  OPTIONAL: 'optional',
	  PARENT_SELECTOR: 'parentSelector',
	  PARENT_SELECTOR_EXTENSION: 'parentSelectorExtension',
	  PERCENTAGE: 'percentage',
	  PLACEHOLDER: 'placeholder',
	  PROGID: 'progid',
	  PROPERTY: 'property',
	  PROPERTY_DELIMITER: 'propertyDelimiter',
	  PSEUDO_CLASS: 'pseudoClass',
	  PSEUDO_ELEMENT: 'pseudoElement',
	  RAW: 'raw',
	  RULESET: 'ruleset',
	  SELECTOR: 'selector',
	  STYLESHEET: 'stylesheet',
	  TYPE_SELECTOR: 'typeSelector',
	  URI: 'uri',
	  VALUE: 'value',
	  VARIABLE: 'variable',
	  VARIABLES_LIST: 'variablesList'
	};

	module.exports = NodeType;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// jscs:disable maximumLineLength

	'use strict';

	var Node = __webpack_require__(1);
	var NodeType = __webpack_require__(13);

	/**
	 * @type {Array}
	 */
	var tokens;

	/**
	 * @type {Number}
	 */
	var tokensLength;

	/**
	 * @type {Number}
	 */
	var pos;

	var contexts = {
	  'atkeyword': function () {
	    return checkAtkeyword(pos) && getAtkeyword();
	  },
	  'atrule': function () {
	    return checkAtrule(pos) && getAtrule();
	  },
	  'block': function () {
	    return checkBlock(pos) && getBlock();
	  },
	  'brackets': function () {
	    return checkBrackets(pos) && getBrackets();
	  },
	  'combinator': function () {
	    return checkCombinator(pos) && getCombinator();
	  },
	  'commentML': function () {
	    return checkCommentML(pos) && getCommentML();
	  },
	  'declaration': function () {
	    return checkDeclaration(pos) && getDeclaration();
	  },
	  'declDelim': function () {
	    return checkDeclDelim(pos) && getDeclDelim();
	  },
	  'delim': function () {
	    return checkDelim(pos) && getDelim();
	  },
	  'dimension': function () {
	    return checkDimension(pos) && getDimension();
	  },
	  'expression': function () {
	    return checkExpression(pos) && getExpression();
	  },
	  'function': function () {
	    return checkFunction(pos) && getFunction();
	  },
	  'ident': function () {
	    return checkIdent(pos) && getIdent();
	  },
	  'important': function () {
	    return checkImportant(pos) && getImportant();
	  },
	  'namespace': function () {
	    return checkNamespace(pos) && getNamespace();
	  },
	  'number': function () {
	    return checkNumber(pos) && getNumber();
	  },
	  'operator': function () {
	    return checkOperator(pos) && getOperator();
	  },
	  'parentheses': function () {
	    return checkParentheses(pos) && getParentheses();
	  },
	  'percentage': function () {
	    return checkPercentage(pos) && getPercentage();
	  },
	  'progid': function () {
	    return checkProgid(pos) && getProgid();
	  },
	  'property': function () {
	    return checkProperty(pos) && getProperty();
	  },
	  'propertyDelim': function () {
	    return checkPropertyDelim(pos) && getPropertyDelim();
	  },
	  'pseudoc': function () {
	    return checkPseudoc(pos) && getPseudoc();
	  },
	  'pseudoe': function () {
	    return checkPseudoe(pos) && getPseudoe();
	  },
	  'ruleset': function () {
	    return checkRuleset(pos) && getRuleset();
	  },
	  's': function () {
	    return checkS(pos) && getS();
	  },
	  'selector': function () {
	    return checkSelector(pos) && getSelector();
	  },
	  'shash': function () {
	    return checkShash(pos) && getShash();
	  },
	  'string': function () {
	    return checkString(pos) && getString();
	  },
	  'stylesheet': function () {
	    return checkStylesheet(pos) && getStylesheet();
	  },
	  'unary': function () {
	    return checkUnary(pos) && getUnary();
	  },
	  'uri': function () {
	    return checkUri(pos) && getUri();
	  },
	  'value': function () {
	    return checkValue(pos) && getValue();
	  },
	  'vhash': function () {
	    return checkVhash(pos) && getVhash();
	  }
	};

	/**
	 * @param {Object} exclude
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkExcluding(exclude, i) {
	  var start = i;

	  while (i < tokensLength) {
	    if (exclude[tokens[i++].type]) break;
	  }

	  return i - start - 2;
	}

	/**
	 * @param {Number} start
	 * @param {Number} finish
	 * @return {String}
	 */
	function joinValues(start, finish) {
	  var s = '';

	  for (var i = start; i < finish + 1; i++) {
	    s += tokens[i].toString();
	  }

	  return s;
	}

	/**
	 * @param {Number} start
	 * @param {Number} num
	 * @return {String}
	 */
	function joinValues2(start, num) {
	  if (start + num - 1 >= tokensLength) return;

	  var s = '';

	  for (var i = 0; i < num; i++) {
	    s += tokens[start + i].toString();
	  }

	  return s;
	}

	function getLastPosition(content, line, column, colOffset) {
	  return typeof content === 'string' ? getLastPositionForString(content, line, column, colOffset) : getLastPositionForArray(content, line, column, colOffset);
	}

	function getLastPositionForString(content, line, column, colOffset) {
	  var position = [];

	  if (!content) {
	    position = [line, column];
	    if (colOffset) position[1] += colOffset - 1;
	    return position;
	  }

	  var lastLinebreak = content.lastIndexOf('\n');
	  var endsWithLinebreak = lastLinebreak === content.length - 1;
	  var splitContent = content.split('\n');
	  var linebreaksCount = splitContent.length - 1;
	  var prevLinebreak = linebreaksCount === 0 || linebreaksCount === 1 ? -1 : content.length - splitContent[linebreaksCount - 1].length - 2;

	  // Line:
	  var offset = endsWithLinebreak ? linebreaksCount - 1 : linebreaksCount;
	  position[0] = line + offset;

	  // Column:
	  if (endsWithLinebreak) {
	    offset = prevLinebreak !== -1 ? content.length - prevLinebreak : content.length - 1;
	  } else {
	    offset = linebreaksCount !== 0 ? content.length - lastLinebreak - column - 1 : content.length - 1;
	  }
	  position[1] = column + offset;

	  if (!colOffset) return position;

	  if (endsWithLinebreak) {
	    position[0]++;
	    position[1] = colOffset;
	  } else {
	    position[1] += colOffset;
	  }

	  return position;
	}

	function getLastPositionForArray(content, line, column, colOffset) {
	  var position;

	  if (content.length === 0) {
	    position = [line, column];
	  } else {
	    var c = content[content.length - 1];
	    if (c.hasOwnProperty('end')) {
	      position = [c.end.line, c.end.column];
	    } else {
	      position = getLastPosition(c.content, line, column);
	    }
	  }

	  if (!colOffset) return position;

	  if (tokens[pos - 1].type !== 'Newline') {
	    position[1] += colOffset;
	  } else {
	    position[0]++;
	    position[1] = 1;
	  }

	  return position;
	}

	function newNode(type, content, line, column, end) {
	  if (!end) end = getLastPosition(content, line, column);
	  return new Node({
	    type: type,
	    content: content,
	    start: {
	      line: line,
	      column: column
	    },
	    end: {
	      line: end[0],
	      column: end[1]
	    },
	    syntax: 'css'
	  });
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkAny(i) {
	  var l;

	  if (l = checkBrackets(i)) tokens[i].any_child = 1;else if (l = checkParentheses(i)) tokens[i].any_child = 2;else if (l = checkString(i)) tokens[i].any_child = 3;else if (l = checkPercentage(i)) tokens[i].any_child = 4;else if (l = checkDimension(i)) tokens[i].any_child = 5;else if (l = checkNumber(i)) tokens[i].any_child = 6;else if (l = checkUri(i)) tokens[i].any_child = 7;else if (l = checkExpression(i)) tokens[i].any_child = 8;else if (l = checkFunction(i)) tokens[i].any_child = 9;else if (l = checkIdent(i)) tokens[i].any_child = 10;else if (l = checkClass(i)) tokens[i].any_child = 11;else if (l = checkUnary(i)) tokens[i].any_child = 12;

	  return l;
	}

	/**
	 * @return {Node}
	 */
	function getAny() {
	  var childType = tokens[pos].any_child;

	  if (childType === 1) return getBrackets();else if (childType === 2) return getParentheses();else if (childType === 3) return getString();else if (childType === 4) return getPercentage();else if (childType === 5) return getDimension();else if (childType === 6) return getNumber();else if (childType === 7) return getUri();else if (childType === 8) return getExpression();else if (childType === 9) return getFunction();else if (childType === 10) return getIdent();else if (childType === 11) return getClass();else if (childType === 12) return getUnary();
	}

	/**
	 * Check if token is part of an @-word (e.g. `@import`, `@include`)
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkAtkeyword(i) {
	  var l;

	  // Check that token is `@`:
	  if (i >= tokensLength || tokens[i++].type !== NodeType.COMMERCIAL_AT) return 0;

	  return (l = checkIdent(i)) ? l + 1 : 0;
	}

	/**
	 * Get node with @-word
	 * @return {Node}
	 */
	function getAtkeyword() {
	  var type = NodeType.ATKEYWORD;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  pos++;

	  content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a part of an @-rule
	 * @param {Number} i Token's index number
	 * @return {Number} Length of @-rule
	 */
	function checkAtrule(i) {
	  var l;

	  if (i >= tokensLength) return 0;

	  // If token already has a record of being part of an @-rule,
	  // return the @-rule's length:
	  if (tokens[i].atrule_l !== undefined) return tokens[i].atrule_l;

	  // If token is part of an @-rule, save the rule's type to token:
	  if (l = checkKeyframesRule(i)) tokens[i].atrule_type = 4;else if (l = checkAtruler(i)) tokens[i].atrule_type = 1; // @-rule with ruleset
	  else if (l = checkAtruleb(i)) tokens[i].atrule_type = 2; // Block @-rule
	    else if (l = checkAtrules(i)) tokens[i].atrule_type = 3; // Single-line @-rule
	      else return 0;

	  // If token is part of an @-rule, save the rule's length to token:
	  tokens[i].atrule_l = l;

	  return l;
	}

	/**
	 * Get node with @-rule
	 * @return {Node}
	 */
	function getAtrule() {
	  switch (tokens[pos].atrule_type) {
	    case 1:
	      return getAtruler(); // @-rule with ruleset
	    case 2:
	      return getAtruleb(); // Block @-rule
	    case 3:
	      return getAtrules(); // Single-line @-rule
	    case 4:
	      return getKeyframesRule();
	  }
	}

	/**
	 * Check if token is part of a block @-rule
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the @-rule
	 */
	function checkAtruleb(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkAtkeyword(i)) i += l;else return 0;

	  if (l = checkTsets(i)) i += l;

	  if (l = checkBlock(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * Get node with a block @-rule
	 * @return {Node}
	 */
	function getAtruleb() {
	  var type = NodeType.ATRULE;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [getAtkeyword()].concat(getTsets()).concat([getBlock()]);

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is part of an @-rule with ruleset
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the @-rule
	 */
	function checkAtruler(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkAtkeyword(i)) i += l;else return 0;

	  if (l = checkTsets(i)) i += l;

	  if (i < tokensLength && tokens[i].type === NodeType.LEFT_CURLY_BRACKET) i++;else return 0;

	  if (l = checkAtrulers(i)) i += l;

	  if (i < tokensLength && tokens[i].type === NodeType.RIGHT_CURLY_BRACKET) i++;else return 0;

	  return i - start;
	}

	/**
	 * Get node with an @-rule with ruleset
	 * @return {Node}
	 */
	function getAtruler() {
	  var type = NodeType.ATRULE;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [getAtkeyword()];

	  content = content.concat(getTsets());

	  content.push(getAtrulers());

	  return newNode(type, content, line, column);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkAtrulers(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkSC(i)) i += l;

	  while (i < tokensLength) {
	    if (l = checkSC(i)) tokens[i].atrulers_child = 1;else if (l = checkAtrule(i)) tokens[i].atrulers_child = 2;else if (l = checkRuleset(i)) tokens[i].atrulers_child = 3;else break;
	    i += l;
	  }

	  tokens[i].atrulers_end = 1;

	  if (l = checkSC(i)) i += l;

	  return i - start;
	}

	/**
	 * @return {Node}
	 */
	function getAtrulers() {
	  var type = NodeType.BLOCK;
	  var token = tokens[pos++];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = getSC();

	  while (!tokens[pos].atrulers_end) {
	    var childType = tokens[pos].atrulers_child;
	    if (childType === 1) content = content.concat(getSC());else if (childType === 2) content.push(getAtrule());else if (childType === 3) content.push(getRuleset());
	  }

	  content = content.concat(getSC());

	  var end = getLastPosition(content, line, column, 1);
	  pos++;

	  return newNode(type, content, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkAtrules(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkAtkeyword(i)) i += l;else return 0;

	  if (l = checkTsets(i)) i += l;

	  return i - start;
	}

	/**
	 * @return {Node}
	 */
	function getAtrules() {
	  var type = NodeType.ATRULE;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [getAtkeyword()].concat(getTsets());

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is part of a block (e.g. `{...}`).
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the block
	 */
	function checkBlock(i) {
	  return i < tokensLength && tokens[i].type === NodeType.LEFT_CURLY_BRACKET ? tokens[i].right - i + 1 : 0;
	}

	/**
	 * Get node with a block
	 * @return {Node}
	 */
	function getBlock() {
	  var type = NodeType.BLOCK;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var end = tokens[pos++].right;
	  var content = [];

	  while (pos < end) {
	    if (checkBlockdecl(pos)) content = content.concat(getBlockdecl());else content.push(tokens[pos++]);
	  }

	  var end_ = getLastPosition(content, line, column, 1);
	  pos = end + 1;

	  return newNode(type, content, line, column, end_);
	}

	/**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the declaration
	 */
	function checkBlockdecl(i) {
	  var l;

	  if (i >= tokensLength) return 0;

	  if (l = checkBlockdecl1(i)) tokens[i].bd_type = 1;else if (l = checkBlockdecl2(i)) tokens[i].bd_type = 2;else if (l = checkBlockdecl3(i)) tokens[i].bd_type = 3;else if (l = checkBlockdecl4(i)) tokens[i].bd_type = 4;else return 0;

	  return l;
	}

	/**
	 * @return {Array}
	 */
	function getBlockdecl() {
	  switch (tokens[pos].bd_type) {
	    case 1:
	      return getBlockdecl1();
	    case 2:
	      return getBlockdecl2();
	    case 3:
	      return getBlockdecl3();
	    case 4:
	      return getBlockdecl4();
	  }
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkBlockdecl1(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkSC(i)) i += l;

	  if (l = checkDeclaration(i)) tokens[i].bd_kind = 1;else if (l = checkAtrule(i)) tokens[i].bd_kind = 2;else return 0;

	  i += l;

	  if (l = checkSC(i)) i += l;

	  if (i < tokensLength && (l = checkDeclDelim(i))) i += l;else return 0;

	  if (l = checkSC(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * @return {Array}
	 */
	function getBlockdecl1() {
	  var sc = getSC();
	  var x = undefined;

	  switch (tokens[pos].bd_kind) {
	    case 1:
	      x = getDeclaration();
	      break;
	    case 2:
	      x = getAtrule();
	      break;
	  }

	  return sc.concat([x]).concat(getSC()).concat([getDeclDelim()]).concat(getSC());
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkBlockdecl2(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkSC(i)) i += l;

	  if (l = checkDeclaration(i)) tokens[i].bd_kind = 1;else if (l = checkAtrule(i)) tokens[i].bd_kind = 2;else return 0;

	  i += l;

	  if (l = checkSC(i)) i += l;

	  return i - start;
	}

	/**
	 * @return {Array}
	 */
	function getBlockdecl2() {
	  var sc = getSC();
	  var x = undefined;

	  switch (tokens[pos].bd_kind) {
	    case 1:
	      x = getDeclaration();
	      break;
	    case 2:
	      x = getAtrule();
	      break;
	  }

	  return sc.concat([x]).concat(getSC());
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkBlockdecl3(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkSC(i)) i += l;

	  if (l = checkDeclDelim(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  return i - start;
	}

	/**
	 * @return {Array}
	 */
	function getBlockdecl3() {
	  return getSC().concat([getDeclDelim()]).concat(getSC());
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkBlockdecl4(i) {
	  return checkSC(i);
	}

	/**
	 * @return {Array}
	 */
	function getBlockdecl4() {
	  return getSC();
	}

	/**
	 * Check if token is part of text inside square brackets, e.g. `[1]`
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkBrackets(i) {
	  if (i >= tokensLength || tokens[i].type !== NodeType.LEFT_SQUARE_BRACKET) return 0;

	  return tokens[i].right - i + 1;
	}

	/**
	 * Get node with text inside square brackets, e.g. `[1]`
	 * @return {Node}
	 */
	function getBrackets() {
	  var type = NodeType.BRACKETS;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;

	  pos++;

	  var tsets = getTsets();
	  var end = getLastPosition(tsets, line, column, 1);
	  pos++;

	  return newNode(type, tsets, line, column, end);
	}

	/**
	 * Check if token is part of a class selector (e.g. `.abc`)
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the class selector
	 */
	function checkClass(i) {
	  var l;

	  if (i >= tokensLength) return 0;

	  if (tokens[i].class_l) return tokens[i].class_l;

	  if (tokens[i++].type === NodeType.FULL_STOP && (l = checkIdent(i))) {
	    tokens[i].class_l = l + 1;
	    return l + 1;
	  }

	  return 0;
	}

	/**
	 * Get node with a class selector
	 * @return {Node}
	 */
	function getClass() {
	  var type = NodeType.CLASS;
	  var token = tokens[pos++];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [getIdent()];

	  return newNode(type, content, line, column);
	}

	function checkCombinator(i) {
	  if (i >= tokensLength) return 0;

	  var l = undefined;
	  if (l = checkCombinator1(i)) tokens[i].combinatorType = 1;else if (l = checkCombinator2(i)) tokens[i].combinatorType = 2;else if (l = checkCombinator3(i)) tokens[i].combinatorType = 3;

	  return l;
	}

	function getCombinator() {
	  var type = tokens[pos].combinatorType;
	  if (type === 1) return getCombinator1();
	  if (type === 2) return getCombinator2();
	  if (type === 3) return getCombinator3();
	}
	/**
	 * (1) `||`
	 */
	function checkCombinator1(i) {
	  if (tokens[i].type === NodeType.VERTICAL_LINE && tokens[i + 1].type === NodeType.VERTICAL_LINE) return 2;else return 0;
	}

	function getCombinator1() {
	  var type = NodeType.COMBINATOR;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = '||';

	  pos += 2;
	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `>`
	 * (2) `+`
	 * (3) `~`
	 */
	function checkCombinator2(i) {
	  var type = tokens[i].type;
	  if (type === NodeType.PLUS_SIGN || type === NodeType.GREATER_THAN_SIGN || type === NodeType.TILDE) return 1;else return 0;
	}

	function getCombinator2() {
	  var type = NodeType.COMBINATOR;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = tokens[pos++].toString();

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `/panda/`
	 */
	function checkCombinator3(i) {
	  var start = i;

	  if (tokens[i].type === NodeType.SOLIDUS) i++;else return 0;

	  var l = undefined;
	  if (l = checkIdent(i)) i += l;else return 0;

	  if (tokens[i].type === NodeType.SOLIDUS) i++;else return 0;

	  return i - start;
	}

	function getCombinator3() {
	  var type = NodeType.COMBINATOR;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;

	  // Skip `/`.
	  pos++;
	  var ident = getIdent();

	  // Skip `/`.
	  pos++;

	  var content = '/' + ident.content + '/';

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a multiline comment.
	 * @param {Number} i Token's index number
	 * @return {Number} `1` if token is a multiline comment, otherwise `0`
	 */
	function checkCommentML(i) {
	  return i < tokensLength && tokens[i].type === NodeType.MULTILINE_COMMENT ? 1 : 0;
	}

	/**
	 * Get node with a multiline comment
	 * @return {Node}
	 */
	function getCommentML() {
	  var type = NodeType.MULTILINE_COMMENT;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = tokens[pos].toString().substring(2);
	  var l = content.length;

	  if (content.charAt(l - 2) === '*' && content.charAt(l - 1) === '/') content = content.substring(0, l - 2);

	  var end = getLastPosition(content, line, column, 2);
	  if (end[0] === line) end[1] += 2;
	  pos++;

	  return newNode(type, content, line, column, end);
	}

	/**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the declaration
	 */
	function checkDeclaration(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkProperty(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkPropertyDelim(i)) i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkValue(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * Get node with a declaration
	 * @return {Node}
	 */
	function getDeclaration() {
	  var type = NodeType.DECLARATION;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;

	  var content = [getProperty()].concat(getSC()).concat([getPropertyDelim()]).concat(getSC()).concat([getValue()]);

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a semicolon
	 * @param {Number} i Token's index number
	 * @return {Number} `1` if token is a semicolon, otherwise `0`
	 */
	function checkDeclDelim(i) {
	  return i < tokensLength && tokens[i].type === NodeType.SEMICOLON ? 1 : 0;
	}

	/**
	 * Get node with a semicolon
	 * @return {Node}
	 */
	function getDeclDelim() {
	  var type = NodeType.DECLARATION_DELIMITER;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = ';';

	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a comma
	 * @param {Number} i Token's index number
	 * @return {Number} `1` if token is a comma, otherwise `0`
	 */
	function checkDelim(i) {
	  return i < tokensLength && tokens[i].type === NodeType.COMMA ? 1 : 0;
	}

	/**
	 * Get node with a comma
	 * @return {Node}
	 */
	function getDelim() {
	  var type = NodeType.DELIMITER;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = ',';

	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is part of a number with dimension unit (e.g. `10px`)
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkDimension(i) {
	  var ln = checkNumber(i);
	  var li = undefined;

	  if (i >= tokensLength || !ln || i + ln >= tokensLength) return 0;

	  return (li = checkNmName2(i + ln)) ? ln + li : 0;
	}

	/**
	 * Get node of a number with dimension unit
	 * @return {Node}
	 */
	function getDimension() {
	  var type = NodeType.DIMENSION;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [getNumber()];

	  token = tokens[pos];
	  var ident = newNode(NodeType.IDENT, getNmName2(), token.start.line, token.start.column);

	  content.push(ident);

	  return newNode(type, content, line, column);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkExpression(i) {
	  var start = i;

	  if (i >= tokensLength || tokens[i++].toString() !== 'expression' || i >= tokensLength || tokens[i].type !== NodeType.LEFT_PARENTHESIS) return 0;

	  return tokens[i].right - start + 1;
	}

	/**
	 * @return {Node}
	 */
	function getExpression() {
	  var type = NodeType.EXPRESSION;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;

	  pos++;

	  var content = joinValues(pos + 1, tokens[pos].right - 1);
	  var end = getLastPosition(content, line, column, 1);
	  if (end[0] === line) end[1] += 11;
	  pos = tokens[pos].right + 1;

	  return newNode(type, content, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkFunction(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  return i < tokensLength && tokens[i].type === NodeType.LEFT_PARENTHESIS ? tokens[i].right - start + 1 : 0;
	}

	/**
	 * @return {Node}
	 */
	function getFunction() {
	  var type = NodeType.FUNCTION;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var ident = getIdent();
	  var content = [ident];

	  content.push(getArguments());

	  return newNode(type, content, line, column);
	}

	/**
	 * @return {Node}
	 */
	function getArguments() {
	  var type = NodeType.ARGUMENTS;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];
	  var body = undefined;

	  pos++;

	  while (pos < tokensLength && tokens[pos].type !== NodeType.RIGHT_PARENTHESIS) {
	    if (checkDeclaration(pos)) content.push(getDeclaration());else if (checkArgument(pos)) {
	      body = getArgument();
	      if (typeof body.content === 'string') content.push(body);else content = content.concat(body);
	    } else if (checkClass(pos)) content.push(getClass());else pos++;
	  }

	  var end = getLastPosition(content, line, column, 1);
	  pos++;

	  return newNode(type, content, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkArgument(i) {
	  var l;

	  if (l = checkVhash(i)) tokens[i].argument_child = 1;else if (l = checkAny(i)) tokens[i].argument_child = 2;else if (l = checkSC(i)) tokens[i].argument_child = 3;else if (l = checkOperator(i)) tokens[i].argument_child = 4;

	  return l;
	}

	/**
	 * @return {Node}
	 */
	function getArgument() {
	  var childType = tokens[pos].argument_child;
	  if (childType === 1) return getVhash();else if (childType === 2) return getAny();else if (childType === 3) return getSC();else if (childType === 4) return getOperator();
	}

	/**
	 * Check if token is part of an identifier
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the identifier
	 */
	function checkIdent(i) {
	  var start = i;
	  var wasIdent = undefined;

	  if (i >= tokensLength) return 0;

	  // Check if token is part of an identifier starting with `_`:
	  if (tokens[i].type === NodeType.LOW_LINE) return checkIdentLowLine(i);

	  // If token is a character, `-`, `$` or `*`, skip it & continue:
	  if (tokens[i].type === NodeType.HYPHEN_MINUS || tokens[i].type === NodeType.CHARACTER || tokens[i].type === NodeType.DOLLAR_SIGN || tokens[i].type === NodeType.ASTERISK) i++;else return 0;

	  // Remember if previous token's type was identifier:
	  wasIdent = tokens[i - 1].type === NodeType.CHARACTER;

	  for (; i < tokensLength; i++) {
	    if (i >= tokensLength) break;

	    if (tokens[i].type !== NodeType.HYPHEN_MINUS && tokens[i].type !== NodeType.LOW_LINE) {
	      if (tokens[i].type !== NodeType.CHARACTER && (tokens[i].type !== NodeType.DIGIT || !wasIdent)) break;else wasIdent = true;
	    }
	  }

	  if (!wasIdent && tokens[start].type !== NodeType.ASTERISK) return 0;

	  tokens[start].ident_last = i - 1;

	  return i - start;
	}

	/**
	 * Check if token is part of an identifier starting with `_`
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the identifier
	 */
	function checkIdentLowLine(i) {
	  var start = i;

	  if (i++ >= tokensLength) return 0;

	  for (; i < tokensLength; i++) {
	    if (tokens[i].type !== NodeType.HYPHEN_MINUS && tokens[i].type !== NodeType.DIGIT && tokens[i].type !== NodeType.LOW_LINE && tokens[i].type !== NodeType.CHARACTER) break;
	  }

	  // Save index number of the last token of the identifier:
	  tokens[start].ident_last = i - 1;

	  return i - start;
	}

	/**
	 * Get node with an identifier
	 * @return {Node}
	 */
	function getIdent() {
	  var type = NodeType.IDENT;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = joinValues(pos, tokens[pos].ident_last);

	  pos = tokens[pos].ident_last + 1;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is part of `!important` word
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkImportant(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength || tokens[i++].type !== NodeType.EXCLAMATION_MARK) return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].toString() === 'important') {
	    tokens[start].importantEnd = i;
	    return i - start + 1;
	  } else {
	    return 0;
	  }
	}

	/**
	 * Get node with `!important` word
	 * @return {Node}
	 */
	function getImportant() {
	  var type = NodeType.IMPORTANT;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = joinValues(pos, token.importantEnd);

	  pos = token.importantEnd + 1;

	  return newNode(type, content, line, column);
	}

	function checkKeyframesBlock(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkKeyframesSelector(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkBlock(i)) i += l;else return 0;

	  return i - start;
	}

	function getKeyframesBlock() {
	  var type = NodeType.RULESET;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [].concat([getKeyframesSelector()], getSC(), [getBlock()]);

	  return newNode(type, content, line, column);
	}

	function checkKeyframesBlocks(i) {
	  var start = i;
	  var l = undefined;

	  if (i < tokensLength && tokens[i].type === NodeType.LEFT_CURLY_BRACKET) i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkKeyframesBlock(i)) i += l;else return 0;

	  while (tokens[i].type !== NodeType.RIGHT_CURLY_BRACKET) {
	    if (l = checkSC(i)) i += l;else if (l = checkKeyframesBlock(i)) i += l;else break;
	  }

	  if (i < tokensLength && tokens[i].type === NodeType.RIGHT_CURLY_BRACKET) i++;else return 0;

	  return i - start;
	}

	function getKeyframesBlocks() {
	  var type = NodeType.BLOCK;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];
	  var keyframesBlocksEnd = token.right;

	  // Skip `{`.
	  pos++;

	  while (pos < keyframesBlocksEnd) {
	    if (checkSC(pos)) content = content.concat(getSC());else if (checkKeyframesBlock(pos)) content.push(getKeyframesBlock());
	  }

	  var end = getLastPosition(content, line, column, 1);

	  // Skip `}`.
	  pos++;

	  return newNode(type, content, line, column, end);
	}

	/**
	 * Check if token is part of a @keyframes rule.
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the @keyframes rule
	 */
	function checkKeyframesRule(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkAtkeyword(i)) i += l;else return 0;

	  var atruleName = joinValues2(i - l, l);
	  if (atruleName.indexOf('keyframes') === -1) return 0;

	  if (l = checkSC(i)) i += l;else return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkKeyframesBlocks(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * @return {Node}
	 */
	function getKeyframesRule() {
	  var type = NodeType.ATRULE;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [].concat([getAtkeyword()], getSC(), [getIdent()], getSC(), [getKeyframesBlocks()]);

	  return newNode(type, content, line, column);
	}

	function checkKeyframesSelector(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) {
	    // Valid selectors are only `from` and `to`.
	    var selector = joinValues2(i, l);
	    if (selector !== 'from' && selector !== 'to') return 0;

	    i += l;
	    tokens[start].keyframesSelectorType = 1;
	  } else if (l = checkPercentage(i)) {
	    i += l;
	    tokens[start].keyframesSelectorType = 2;
	  } else {
	    return 0;
	  }

	  return i - start;
	}

	function getKeyframesSelector() {
	  var keyframesSelectorType = NodeType.KEYFRAMES_SELECTOR;
	  var selectorType = NodeType.SELECTOR;

	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  if (token.keyframesSelectorType === 1) {
	    content.push(getIdent());
	  } else {
	    content.push(getPercentage());
	  }

	  var keyframesSelector = newNode(keyframesSelectorType, content, line, column);
	  return newNode(selectorType, [keyframesSelector], line, column);
	}

	/**
	 * Check if token is a namespace sign (`|`)
	 * @param {Number} i Token's index number
	 * @return {Number} `1` if token is `|`, `0` if not
	 */
	function checkNamespace(i) {
	  return i < tokensLength && tokens[i].type === NodeType.VERTICAL_LINE ? 1 : 0;
	}

	/**
	 * Get node with a namespace sign
	 * @return {Node}
	 */
	function getNamespace() {
	  var type = NodeType.NAMESPACE_SEPARATOR;
	  var token = tokens[pos++];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = '|';

	  return newNode(type, content, line, column);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkNmName2(i) {
	  if (tokens[i].type === NodeType.CHARACTER) return 1;else if (tokens[i].type !== NodeType.DIGIT) return 0;

	  i++;

	  return i < tokensLength && tokens[i].type === NodeType.CHARACTER ? 2 : 1;
	}

	/**
	 * @return {String}
	 */
	function getNmName2() {
	  var s = tokens[pos].toString();

	  if (tokens[pos++].type === NodeType.DIGIT && pos < tokensLength && tokens[pos].type === NodeType.CHARACTER) s += tokens[pos++].toString();

	  return s;
	}

	/**
	 * Check if token is part of a number
	 * @param {Number} i Token's index number
	 * @return {Number} Length of number
	 */
	function checkNumber(i) {
	  if (i >= tokensLength) return 0;

	  if (tokens[i].number_l) return tokens[i].number_l;

	  // `10`:
	  if (i < tokensLength && tokens[i].type === NodeType.DIGIT && (!tokens[i + 1] || tokens[i + 1] && tokens[i + 1].type !== NodeType.FULL_STOP)) return tokens[i].number_l = 1, tokens[i].number_l;

	  // `10.`:
	  if (i < tokensLength && tokens[i].type === NodeType.DIGIT && tokens[i + 1] && tokens[i + 1].type === NodeType.FULL_STOP && (!tokens[i + 2] || tokens[i + 2].type !== NodeType.DIGIT)) return tokens[i].number_l = 2, tokens[i].number_l;

	  // `.10`:
	  if (i < tokensLength && tokens[i].type === NodeType.FULL_STOP && tokens[i + 1].type === NodeType.DIGIT) return tokens[i].number_l = 2, tokens[i].number_l;

	  // `10.10`:
	  if (i < tokensLength && tokens[i].type === NodeType.DIGIT && tokens[i + 1] && tokens[i + 1].type === NodeType.FULL_STOP && tokens[i + 2] && tokens[i + 2].type === NodeType.DIGIT) return tokens[i].number_l = 3, tokens[i].number_l;

	  return 0;
	}

	/**
	 * Get node with number
	 * @return {Node}
	 */
	function getNumber() {
	  var type = NodeType.NUMBER;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = '';
	  var l = tokens[pos].number_l;

	  for (var j = 0; j < l; j++) {
	    content += tokens[pos + j].toString();
	  }

	  pos += l;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is an operator (`/`, `,`, `:` or `=`).
	 * @param {Number} i Token's index number
	 * @return {Number} `1` if token is an operator, otherwise `0`
	 */
	function checkOperator(i) {
	  if (i >= tokensLength) return 0;

	  switch (tokens[i].type) {
	    case NodeType.SOLIDUS:
	    case NodeType.COMMA:
	    case NodeType.COLON:
	    case NodeType.EQUALS_SIGN:
	      return 1;
	  }

	  return 0;
	}

	/**
	 * Get node with an operator
	 * @return {Node}
	 */
	function getOperator() {
	  var type = NodeType.OPERATOR;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = token.toString();

	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is part of text inside parentheses, e.g. `(1)`
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkParentheses(i) {
	  if (i >= tokensLength || tokens[i].type !== NodeType.LEFT_PARENTHESIS) return 0;

	  return tokens[i].right - i + 1;
	}

	/**
	 * Get node with text inside parentheses, e.g. `(1)`
	 * @return {Node}
	 */
	function getParentheses() {
	  var type = NodeType.PARENTHESES;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;

	  pos++;

	  var tsets = getTsets();
	  var end = getLastPosition(tsets, line, column, 1);
	  pos++;

	  return newNode(type, tsets, line, column, end);
	}

	/**
	 * Check if token is part of a number with percent sign (e.g. `10%`)
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkPercentage(i) {
	  var x;

	  if (i >= tokensLength) return 0;

	  x = checkNumber(i);

	  if (!x || i + x >= tokensLength) return 0;

	  return tokens[i + x].type === NodeType.PERCENT_SIGN ? x + 1 : 0;
	}

	/**
	 * Get node of number with percent sign
	 * @return {Node}
	 */
	function getPercentage() {
	  var type = NodeType.PERCENTAGE;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [getNumber()];

	  var end = getLastPosition(content, line, column, 1);
	  pos++;

	  return newNode(type, content, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkProgid(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (joinValues2(i, 6) === 'progid:DXImageTransform.Microsoft.') i += 6;else return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].type === NodeType.LEFT_PARENTHESIS) {
	    tokens[start].progid_end = tokens[i].right;
	    i = tokens[i].right + 1;
	  } else return 0;

	  return i - start;
	}

	/**
	 * @return {Node}
	 */
	function getProgid() {
	  var type = NodeType.PROGID;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var progid_end = token.progid_end;
	  var content = joinValues(pos, progid_end);

	  pos = progid_end + 1;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is part of a property
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the property
	 */
	function checkProperty(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * Get node with a property
	 * @return {Node}
	 */
	function getProperty() {
	  var type = NodeType.PROPERTY;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [getIdent()];

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a colon
	 * @param {Number} i Token's index number
	 * @return {Number} `1` if token is a colon, otherwise `0`
	 */
	function checkPropertyDelim(i) {
	  return i < tokensLength && tokens[i].type === NodeType.COLON ? 1 : 0;
	}

	/**
	 * Get node with a colon
	 * @return {Node}
	 */
	function getPropertyDelim() {
	  var type = NodeType.PROPERTY_DELIMITER;
	  var token = tokens[pos++];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = ':';

	  return newNode(type, content, line, column);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkPseudo(i) {
	  return checkPseudoe(i) || checkPseudoc(i);
	}

	/**
	 * @return {Node}
	 */
	function getPseudo() {
	  if (checkPseudoe(pos)) return getPseudoe();
	  if (checkPseudoc(pos)) return getPseudoc();
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkPseudoe(i) {
	  var l;

	  if (i >= tokensLength || tokens[i++].type !== NodeType.COLON || i >= tokensLength || tokens[i++].type !== NodeType.COLON) return 0;

	  return (l = checkIdent(i)) ? l + 2 : 0;
	}

	/**
	 * @return {Node}
	 */
	function getPseudoe() {
	  var type = NodeType.PSEUDO_ELEMENT;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  pos += 2;

	  content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkPseudoc(i) {
	  var l;

	  if (i >= tokensLength || tokens[i].type !== NodeType.COLON) return 0;

	  if (l = checkPseudoClass1(i)) tokens[i].pseudoClassType = 1;else if (l = checkPseudoClass2(i)) tokens[i].pseudoClassType = 2;else if (l = checkPseudoClass3(i)) tokens[i].pseudoClassType = 3;else if (l = checkPseudoClass4(i)) tokens[i].pseudoClassType = 4;else if (l = checkPseudoClass5(i)) tokens[i].pseudoClassType = 5;else if (l = checkPseudoClass6(i)) tokens[i].pseudoClassType = 6;else return 0;

	  return l;
	}

	/**
	 * @return {Node}
	 */
	function getPseudoc() {
	  var childType = tokens[pos].pseudoClassType;
	  if (childType === 1) return getPseudoClass1();
	  if (childType === 2) return getPseudoClass2();
	  if (childType === 3) return getPseudoClass3();
	  if (childType === 4) return getPseudoClass4();
	  if (childType === 5) return getPseudoClass5();
	  if (childType === 6) return getPseudoClass6();
	}

	/**
	 * (1) `:panda(selector)`
	 * (2) `:panda(selector, selector)`
	 */
	function checkPseudoClass1(i) {
	  var start = i;

	  // Skip `:`.
	  i++;

	  var l = undefined;
	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength || tokens[i].type !== NodeType.LEFT_PARENTHESIS) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSelectorsGroup(i)) i += l;else return 0;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	/**
	 * (-) `:not(panda)`
	 */
	function getPseudoClass1() {
	  var type = NodeType.PSEUDO_CLASS;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  content.push(getIdent());

	  {
	    var _type = NodeType.ARGUMENTS;
	    var _token = tokens[pos];
	    var _line = _token.start.line;
	    var _column = _token.start.column;

	    // Skip `(`.
	    pos++;

	    var selectors = getSelectorsGroup();
	    var end = getLastPosition(selectors, _line, _column, 1);
	    var args = newNode(_type, selectors, _line, _column, end);
	    content.push(args);

	    // Skip `)`.
	    pos++;
	  }

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `:nth-child(odd)`
	 * (2) `:nth-child(even)`
	 * (3) `:lang(de-DE)`
	 */
	function checkPseudoClass2(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength || tokens[i].type !== NodeType.LEFT_PARENTHESIS) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSC(i)) i += l;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	function getPseudoClass2() {
	  var type = NodeType.PSEUDO_CLASS;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  // Skip `(`.
	  pos++;

	  var l = tokens[pos].ln;
	  var c = tokens[pos].col;
	  var value = [];

	  value = value.concat(getSC());
	  value.push(getIdent());
	  value = value.concat(getSC());

	  var end = getLastPosition(value, l, c, 1);
	  var args = newNode(NodeType.ARGUMENTS, value, l, c, end);
	  content.push(args);

	  // Skip `)`.
	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * (-) `:nth-child(-3n + 2)`
	 */
	function checkPseudoClass3(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength || tokens[i].type !== NodeType.LEFT_PARENTHESIS) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSC(i)) i += l;

	  if (l = checkUnary(i)) i += l;
	  if (i >= tokensLength) return 0;
	  if (tokens[i].type === NodeType.DIGIT) i++;

	  if (i >= tokensLength) return 0;
	  if (tokens[i].toString() === 'n') i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i >= tokensLength) return 0;
	  if (tokens[i].toString() === '+' || tokens[i].toString() === '-') i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].type === NodeType.DIGIT) i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	function getPseudoClass3() {
	  var type = NodeType.PSEUDO_CLASS;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  var l = tokens[pos].ln;
	  var c = tokens[pos].col;
	  var value = [];

	  // Skip `(`.
	  pos++;

	  if (checkUnary(pos)) value.push(getUnary());
	  if (checkNumber(pos)) value.push(getNumber());

	  {
	    var _l = tokens[pos].ln;
	    var _c = tokens[pos].col;
	    var _content = tokens[pos].toString();
	    var _ident = newNode(NodeType.IDENT, _content, _l, _c);
	    value.push(_ident);
	    pos++;
	  }

	  value = value.concat(getSC());
	  if (checkUnary(pos)) value.push(getUnary());
	  value = value.concat(getSC());
	  if (checkNumber(pos)) value.push(getNumber());
	  value = value.concat(getSC());

	  var end = getLastPosition(value, l, c, 1);
	  var args = newNode(NodeType.ARGUMENTS, value, l, c, end);
	  content.push(args);

	  // Skip `)`.
	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * (-) `:nth-child(-3n)`
	 */
	function checkPseudoClass4(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength) return 0;
	  if (tokens[i].type !== NodeType.LEFT_PARENTHESIS) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSC(i)) i += l;

	  if (l = checkUnary(i)) i += l;
	  if (tokens[i].type === NodeType.DIGIT) i++;

	  if (tokens[i].toString() === 'n') i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	function getPseudoClass4() {
	  var type = NodeType.PSEUDO_CLASS;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  // Skip `(`.
	  pos++;

	  var l = tokens[pos].ln;
	  var c = tokens[pos].col;
	  var value = [];

	  if (checkUnary(pos)) value.push(getUnary());
	  if (checkNumber(pos)) value.push(getNumber());
	  if (checkIdent(pos)) value.push(getIdent());
	  value = value.concat(getSC());

	  var end = getLastPosition(value, l, c, 1);
	  var args = newNode(NodeType.ARGUMENTS, value, l, c, end);
	  content.push(args);

	  // Skip `)`.
	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * (-) `:nth-child(+8)`
	 */
	function checkPseudoClass5(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength) return 0;
	  if (tokens[i].type !== NodeType.LEFT_PARENTHESIS) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSC(i)) i += l;

	  if (l = checkUnary(i)) i += l;
	  if (tokens[i].type === NodeType.DIGIT) i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	function getPseudoClass5() {
	  var type = NodeType.PSEUDO_CLASS;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  // Skip `(`.
	  pos++;

	  var l = tokens[pos].ln;
	  var c = tokens[pos].col;
	  var value = [];

	  if (checkUnary(pos)) value.push(getUnary());
	  if (checkNumber(pos)) value.push(getNumber());
	  value = value.concat(getSC());

	  var end = getLastPosition(value, l, c, 1);
	  var args = newNode(NodeType.ARGUMENTS, value, l, c, end);
	  content.push(args);

	  // Skip `)`.
	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * (-) `:checked`
	 */
	function checkPseudoClass6(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  return i - start;
	}

	function getPseudoClass6() {
	  var type = NodeType.PSEUDO_CLASS;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  return newNode(type, content, line, column);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkRuleset(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkSelectorsGroup(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkBlock(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * @return {Node}
	 */
	function getRuleset() {
	  var type = NodeType.RULESET;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  content = content.concat(getSelectorsGroup());
	  content = content.concat(getSC());
	  content.push(getBlock());

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is marked as a space (if it's a space or a tab
	 *      or a line break).
	 * @param {Number} i
	 * @return {Number} Number of spaces in a row starting with the given token.
	 */
	function checkS(i) {
	  return i < tokensLength && tokens[i].ws ? tokens[i].ws_last - i + 1 : 0;
	}

	/**
	 * Get node with spaces
	 * @return {Node}
	 */
	function getS() {
	  var type = NodeType.SPACE;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = joinValues(pos, tokens[pos].ws_last);

	  pos = tokens[pos].ws_last + 1;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a space or a comment.
	 * @param {Number} i Token's index number
	 * @return {Number} Number of similar (space or comment) tokens
	 *      in a row starting with the given token.
	 */
	function checkSC(i) {
	  var l = undefined;
	  var lsc = 0;

	  while (i < tokensLength) {
	    if (l = checkS(i)) tokens[i].sc_child = 1;else if (l = checkCommentML(i)) tokens[i].sc_child = 2;else break;
	    i += l;
	    lsc += l;
	  }

	  return lsc || 0;
	}

	/**
	 * Get node with spaces and comments
	 * @return {Array}
	 */
	function getSC() {
	  var sc = [];

	  if (pos >= tokensLength) return sc;

	  while (pos < tokensLength) {
	    var childType = tokens[pos].sc_child;
	    if (childType === 1) sc.push(getS());else if (childType === 2) sc.push(getCommentML());else break;
	  }

	  return sc;
	}

	/**
	 * Check if token is part of a hexadecimal number (e.g. `#fff`) inside
	 *      a simple selector
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkShash(i) {
	  var l;

	  if (i >= tokensLength || tokens[i].type !== NodeType.NUMBER_SIGN) return 0;

	  return (l = checkIdent(i + 1)) ? l + 1 : 0;
	}

	/**
	 * Get node with a hexadecimal number (e.g. `#fff`) inside a simple
	 *      selector
	 * @return {Node}
	 */
	function getShash() {
	  var type = NodeType.ID;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is part of a string (text wrapped in quotes)
	 * @param {Number} i Token's index number
	 * @return {Number} `1` if token is part of a string, `0` if not
	 */
	function checkString(i) {
	  return i < tokensLength && tokens[i].type === NodeType.STRING ? 1 : 0;
	}

	/**
	 * Get string's node
	 * @return {Array} `['string', x]` where `x` is a string (including
	 *      quotes).
	 */
	function getString() {
	  var type = NodeType.STRING;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = token.toString();

	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * Validate stylesheet: it should consist of any number (0 or more) of
	 * rulesets (sets of rules with selectors), @-rules, whitespaces or
	 * comments.
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkStylesheet(i) {
	  var start = i;
	  var l = undefined;

	  // Check every token:
	  while (i < tokensLength) {
	    if (l = checkSC(i)) tokens[i].stylesheet_child = 1;else if (l = checkRuleset(i)) tokens[i].stylesheet_child = 2;else if (l = checkAtrule(i)) tokens[i].stylesheet_child = 3;else if (l = checkDeclDelim(i)) tokens[i].stylesheet_child = 4;else l = 1;

	    i += l;
	  }

	  return i - start;
	}

	/**
	 * @return {Array} `['stylesheet', x]` where `x` is all stylesheet's
	 *      nodes.
	 */
	function getStylesheet() {
	  var type = NodeType.STYLESHEET;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];
	  var childType = undefined;

	  while (pos < tokensLength) {
	    childType = tokens[pos].stylesheet_child;
	    if (childType === 1) content = content.concat(getSC());else if (childType === 2) content.push(getRuleset());else if (childType === 3) content.push(getAtrule());else if (childType === 4) content.push(getDeclDelim());else content.push(tokens[pos++]);
	  }

	  return newNode(type, content, line, column);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkTset(i) {
	  var l;

	  if (l = checkVhash(i)) tokens[i].tset_child = 1;else if (l = checkAny(i)) tokens[i].tset_child = 2;else if (l = checkSC(i)) tokens[i].tset_child = 3;else if (l = checkOperator(i)) tokens[i].tset_child = 4;

	  return l;
	}

	/**
	 * @return {Array}
	 */
	function getTset() {
	  var childType = tokens[pos].tset_child;
	  if (childType === 1) return getVhash();else if (childType === 2) return getAny();else if (childType === 3) return getSC();else if (childType === 4) return getOperator();
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkTsets(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  while (l = checkTset(i)) {
	    i += l;
	  }

	  return i - start;
	}

	/**
	 * @return {Array}
	 */
	function getTsets() {
	  var x = [];
	  var t = undefined;

	  while (checkTset(pos)) {
	    t = getTset();
	    if (typeof t.content === 'string') x.push(t);else x = x.concat(t);
	  }

	  return x;
	}

	/**
	 * Check if token is an unary (arithmetical) sign (`+` or `-`)
	 * @param {Number} i Token's index number
	 * @return {Number} `1` if token is an unary sign, `0` if not
	 */
	function checkUnary(i) {
	  if (i >= tokensLength) return 0;
	  if (tokens[i].type === NodeType.HYPHEN_MINUS || tokens[i].type === NodeType.PLUS_SIGN) return 1;
	  return 0;
	}

	/**
	 * Get node with an unary (arithmetical) sign (`+` or `-`)
	 * @return {Array} `['unary', x]` where `x` is an unary sign
	 *      converted to string.
	 */
	function getUnary() {
	  var type = NodeType.OPERATOR;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = token.toString();

	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is part of URI (e.g. `url('/css/styles.css')`)
	 * @param {Number} i Token's index number
	 * @return {Number} Length of URI
	 */
	function checkUri(i) {
	  var start = i;

	  if (i >= tokensLength || tokens[i].toString() !== 'url') return 0;
	  i += 1;
	  if (i >= tokensLength || tokens[i].type !== NodeType.LEFT_PARENTHESIS) return 0;

	  return tokens[i].right - start + 1;
	}

	/**
	 * Get node with URI
	 * @return {Array} `['uri', x]` where `x` is URI's nodes (without `url`
	 *      and braces, e.g. `['string', ''/css/styles.css'']`).
	 */
	function getUri() {
	  var startPos = pos;
	  var uriExcluding = {};
	  var uri = undefined;
	  var l = undefined;
	  var raw = undefined;

	  var rawContent = undefined;
	  var t = undefined;

	  pos += 2;

	  uriExcluding[NodeType.SPACE] = 1;
	  uriExcluding[NodeType.LEFT_PARENTHESIS] = 1;
	  uriExcluding[NodeType.RIGHT_PARENTHESIS] = 1;

	  if (checkUri1(pos)) {
	    uri = [].concat(getSC()).concat([getString()]).concat(getSC());
	  } else {
	    uri = checkSC(pos) ? getSC() : [];
	    l = checkExcluding(uriExcluding, pos);
	    rawContent = joinValues(pos, pos + l);
	    t = tokens[pos];
	    raw = newNode(NodeType.RAW, rawContent, t.ln, t.col);

	    uri.push(raw);

	    pos += l + 1;

	    if (checkSC(pos)) uri = uri.concat(getSC());
	  }

	  t = tokens[startPos];
	  var line = t.ln;
	  var column = t.col;
	  var end = getLastPosition(uri, line, column, 1);
	  pos++;

	  return newNode(NodeType.URI, uri, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkUri1(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].type !== NodeType.STRING) return 0;

	  i++;

	  if (l = checkSC(i)) i += l;

	  return i - start;
	}

	/**
	 * Check if token is part of a value
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the value
	 */
	function checkValue(i) {
	  var start = i;
	  var l = undefined;
	  var s = undefined;
	  var _i = undefined;

	  while (i < tokensLength) {
	    s = checkSC(i);
	    _i = i + s;

	    if (l = _checkValue(_i)) i += l + s;else break;
	  }

	  tokens[start].value_end = i;
	  return i - start;
	}

	/**
	 * @return {Array}
	 */
	function getValue() {
	  var startPos = pos;
	  var end = tokens[pos].value_end;
	  var x = [];

	  while (pos < end) {
	    if (tokens[pos].value_child) x.push(_getValue());else x = x.concat(getSC());
	  }

	  var t = tokens[startPos];
	  return newNode(NodeType.VALUE, x, t.ln, t.col);
	}

	/**
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function _checkValue(i) {
	  var l;

	  if (l = checkProgid(i)) tokens[i].value_child = 1;else if (l = checkVhash(i)) tokens[i].value_child = 2;else if (l = checkAny(i)) tokens[i].value_child = 3;else if (l = checkOperator(i)) tokens[i].value_child = 4;else if (l = checkImportant(i)) tokens[i].value_child = 5;

	  return l;
	}

	/**
	 * @return {Array}
	 */
	function _getValue() {
	  var childType = tokens[pos].value_child;
	  if (childType === 1) return getProgid();else if (childType === 2) return getVhash();else if (childType === 3) return getAny();else if (childType === 4) return getOperator();else if (childType === 5) return getImportant();
	}

	/**
	 * Check if token is part of a hexadecimal number (e.g. `#fff`) inside
	 *      some value
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkVhash(i) {
	  var l;

	  if (i >= tokensLength || tokens[i].type !== NodeType.NUMBER_SIGN) return 0;

	  return (l = checkNmName2(i + 1)) ? l + 1 : 0;
	}

	/**
	 * Get node with a hexadecimal number (e.g. `#fff`) inside some value
	 * @return {Array} `['vhash', x]` where `x` is a hexadecimal number
	 *      converted to string (without `#`, e.g. `'fff'`).
	 */
	function getVhash() {
	  var type = NodeType.COLOR;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = undefined;

	  pos++;

	  content = getNmName2();
	  var end = getLastPosition(content, line, column + 1);
	  return newNode(type, content, line, column, end);
	}

	module.exports = function (_tokens, context) {
	  tokens = _tokens;
	  tokensLength = tokens.length;
	  pos = 0;

	  return contexts[context]();
	};

	function checkSelectorsGroup(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  if (l = checkSelector(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var sb = checkSC(i);
	    var c = checkDelim(i + sb);
	    if (!c) break;
	    var sa = checkSC(i + sb + c);
	    if (l = checkSelector(i + sb + c + sa)) i += sb + c + sa + l;else break;
	  }

	  tokens[start].selectorsGroupEnd = i;
	  return i - start;
	}

	function getSelectorsGroup() {
	  var selectorsGroup = [];
	  var selectorsGroupEnd = tokens[pos].selectorsGroupEnd;

	  selectorsGroup.push(getSelector());

	  while (pos < selectorsGroupEnd) {
	    selectorsGroup = selectorsGroup.concat(getSC());
	    selectorsGroup.push(getDelim());
	    selectorsGroup = selectorsGroup.concat(getSC());
	    selectorsGroup.push(getSelector());
	  }

	  return selectorsGroup;
	}

	function checkSelector(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  if (l = checkCompoundSelector(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var sb = checkSC(i);
	    var c = checkCombinator(i + sb);
	    if (!sb && !c) break;
	    var sa = checkSC(i + sb + c);
	    if (l = checkCompoundSelector(i + sb + c + sa)) i += sb + c + sa + l;else break;
	  }

	  tokens[start].selectorEnd = i;
	  return i - start;
	}

	function getSelector() {
	  var type = NodeType.SELECTOR;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var selectorEnd = token.selectorEnd;
	  var content = undefined;

	  content = getCompoundSelector();

	  while (pos < selectorEnd) {
	    content = content.concat(getSC());
	    if (checkCombinator(pos)) content.push(getCombinator());
	    content = content.concat(getSC());
	    content = content.concat(getCompoundSelector());
	  }

	  return newNode(type, content, line, column);
	}

	function checkCompoundSelector(i) {
	  var l = undefined;

	  if (l = checkCompoundSelector1(i)) {
	    tokens[i].compoundSelectorType = 1;
	  } else if (l = checkCompoundSelector2(i)) {
	    tokens[i].compoundSelectorType = 2;
	  }

	  return l;
	}

	function getCompoundSelector() {
	  var type = tokens[pos].compoundSelectorType;
	  if (type === 1) return getCompoundSelector1();
	  if (type === 2) return getCompoundSelector2();
	}

	function checkCompoundSelector1(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;

	  var l = undefined;
	  if (l = checkTypeSelector(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var _l2 = checkShash(i) || checkClass(i) || checkAttributeSelector(i) || checkPseudo(i);
	    if (_l2) i += _l2;else break;
	  }

	  tokens[start].compoundSelectorEnd = i;

	  return i - start;
	}

	function getCompoundSelector1() {
	  var sequence = [];
	  var compoundSelectorEnd = tokens[pos].compoundSelectorEnd;

	  sequence.push(getTypeSelector());

	  while (pos < compoundSelectorEnd) {
	    if (checkShash(pos)) sequence.push(getShash());else if (checkClass(pos)) sequence.push(getClass());else if (checkAttributeSelector(pos)) sequence.push(getAttributeSelector());else if (checkPseudo(pos)) sequence.push(getPseudo());
	  }

	  return sequence;
	}

	function checkCompoundSelector2(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;

	  while (i < tokensLength) {
	    var l = checkShash(i) || checkClass(i) || checkAttributeSelector(i) || checkPseudo(i);
	    if (l) i += l;else break;
	  }

	  tokens[start].compoundSelectorEnd = i;

	  return i - start;
	}

	function getCompoundSelector2() {
	  var sequence = [];
	  var compoundSelectorEnd = tokens[pos].compoundSelectorEnd;

	  while (pos < compoundSelectorEnd) {
	    if (checkShash(pos)) sequence.push(getShash());else if (checkClass(pos)) sequence.push(getClass());else if (checkAttributeSelector(pos)) sequence.push(getAttributeSelector());else if (checkPseudo(pos)) sequence.push(getPseudo());
	  }

	  return sequence;
	}

	function checkTypeSelector(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  if (l = checkNamePrefix(i)) i += l;

	  if (tokens[i].type === NodeType.ASTERISK) i++;else if (l = checkIdent(i)) i += l;else return 0;

	  return i - start;
	}

	function getTypeSelector() {
	  var type = NodeType.TYPE_SELECTOR;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  if (checkNamePrefix(pos)) content.push(getNamePrefix());
	  if (checkIdent(pos)) content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	function checkAttributeSelector(i) {
	  var l = undefined;
	  if (l = checkAttributeSelector1(i)) tokens[i].attributeSelectorType = 1;else if (l = checkAttributeSelector2(i)) tokens[i].attributeSelectorType = 2;

	  return l;
	}

	function getAttributeSelector() {
	  var type = tokens[pos].attributeSelectorType;
	  if (type === 1) return getAttributeSelector1();else return getAttributeSelector2();
	}

	/**
	 * (1) `[panda=nani]`
	 * (2) `[panda='nani']`
	 * (3) `[panda='nani' i]`
	 *
	 */
	function checkAttributeSelector1(i) {
	  var start = i;

	  if (tokens[i].type === NodeType.LEFT_SQUARE_BRACKET) i++;else return 0;

	  var l = undefined;
	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeName(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeMatch(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeValue(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeFlags(i)) {
	    i += l;
	    if (l = checkSC(i)) i += l;
	  }

	  if (tokens[i].type === NodeType.RIGHT_SQUARE_BRACKET) i++;else return 0;

	  return i - start;
	}

	function getAttributeSelector1() {
	  var type = NodeType.ATTRIBUTE_SELECTOR;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  // Skip `[`.
	  pos++;

	  content = content.concat(getSC());
	  content.push(getAttributeName());
	  content = content.concat(getSC());
	  content.push(getAttributeMatch());
	  content = content.concat(getSC());
	  content.push(getAttributeValue());
	  content = content.concat(getSC());

	  if (checkAttributeFlags(pos)) {
	    content.push(getAttributeFlags());
	    content = content.concat(getSC());
	  }

	  // Skip `]`.
	  pos++;

	  var end = getLastPosition(content, line, column, 1);
	  return newNode(type, content, line, column, end);
	}

	/**
	 * (1) `[panda]`
	 */
	function checkAttributeSelector2(i) {
	  var start = i;

	  if (tokens[i].type === NodeType.LEFT_SQUARE_BRACKET) i++;else return 0;

	  var l = undefined;
	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeName(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].type === NodeType.RIGHT_SQUARE_BRACKET) i++;else return 0;

	  return i - start;
	}

	function getAttributeSelector2() {
	  var type = NodeType.ATTRIBUTE_SELECTOR;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  // Skip `[`.
	  pos++;

	  content = content.concat(getSC());
	  content.push(getAttributeName());
	  content = content.concat(getSC());

	  // Skip `]`.
	  pos++;

	  var end = getLastPosition(content, line, column, 1);
	  return newNode(type, content, line, column, end);
	}

	function checkAttributeName(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkNamePrefix(i)) i += l;

	  if (l = checkIdent(i)) i += l;else return 0;

	  return i - start;
	}

	function getAttributeName() {
	  var type = NodeType.ATTRIBUTE_NAME;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  if (checkNamePrefix(pos)) content.push(getNamePrefix());
	  content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	function checkAttributeMatch(i) {
	  var l = undefined;
	  if (l = checkAttributeMatch1(i)) tokens[i].attributeMatchType = 1;else if (l = checkAttributeMatch2(i)) tokens[i].attributeMatchType = 2;

	  return l;
	}

	function getAttributeMatch() {
	  var type = tokens[pos].attributeMatchType;
	  if (type === 1) return getAttributeMatch1();else return getAttributeMatch2();
	}

	function checkAttributeMatch1(i) {
	  var start = i;

	  var type = tokens[i].type;
	  if (type === NodeType.TILDE || type === NodeType.VERTICAL_LINE || type === NodeType.CIRCUMFLEX_ACCENT || type === NodeType.DOLLAR_SIGN || type === NodeType.ASTERISK) i++;else return 0;

	  if (tokens[i].type === NodeType.EQUALS_SIGN) i++;else return 0;

	  return i - start;
	}

	function getAttributeMatch1() {
	  var type = NodeType.ATTRIBUTE_MATCH;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = tokens[pos].toString() + tokens[pos + 1].toString();
	  pos += 2;

	  return newNode(type, content, line, column);
	}

	function checkAttributeMatch2(i) {
	  if (tokens[i].type === NodeType.EQUALS_SIGN) return 1;else return 0;
	}

	function getAttributeMatch2() {
	  var type = NodeType.ATTRIBUTE_MATCH;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = '=';

	  pos++;
	  return newNode(type, content, line, column);
	}

	function checkAttributeValue(i) {
	  return checkString(i) || checkIdent(i);
	}

	function getAttributeValue() {
	  var type = NodeType.ATTRIBUTE_VALUE;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  if (checkString(pos)) content.push(getString());else content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	function checkAttributeFlags(i) {
	  return checkIdent(i);
	}

	function getAttributeFlags() {
	  var type = NodeType.ATTRIBUTE_FLAGS;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [getIdent()];

	  return newNode(type, content, line, column);
	}

	function checkNamePrefix(i) {
	  if (i >= tokensLength) return 0;

	  var l = undefined;
	  if (l = checkNamePrefix1(i)) tokens[i].namePrefixType = 1;else if (l = checkNamePrefix2(i)) tokens[i].namePrefixType = 2;

	  return l;
	}

	function getNamePrefix() {
	  var type = tokens[pos].namePrefixType;
	  if (type === 1) return getNamePrefix1();else return getNamePrefix2();
	}

	/**
	 * (1) `panda|`
	 * (2) `panda<comment>|`
	 */
	function checkNamePrefix1(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkNamespacePrefix(i)) i += l;else return 0;

	  if (l = checkCommentML(i)) i += l;

	  if (l = checkNamespaceSeparator(i)) i += l;else return 0;

	  return i - start;
	}

	function getNamePrefix1() {
	  var type = NodeType.NAME_PREFIX;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];

	  content.push(getNamespacePrefix());

	  if (checkCommentML(pos)) content.push(getCommentML());

	  content.push(getNamespaceSeparator());

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `|`
	 */
	function checkNamePrefix2(i) {
	  return checkNamespaceSeparator(i);
	}

	function getNamePrefix2() {
	  var type = NodeType.NAME_PREFIX;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [getNamespaceSeparator()];

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `*`
	 * (2) `panda`
	 */
	function checkNamespacePrefix(i) {
	  if (i >= tokensLength) return 0;

	  var l = undefined;

	  if (tokens[i].type === NodeType.ASTERISK) return 1;else if (l = checkIdent(i)) return l;else return 0;
	}

	function getNamespacePrefix() {
	  var type = NodeType.NAMESPACE_PREFIX;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = [];
	  if (checkIdent(pos)) content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `|`
	 */
	function checkNamespaceSeparator(i) {
	  if (i >= tokensLength) return 0;

	  if (tokens[i].type === NodeType.VERTICAL_LINE) return 1;else return 0;
	}

	function getNamespaceSeparator() {
	  var type = NodeType.NAMESPACE_SEPARATOR;
	  var token = tokens[pos];
	  var line = token.start.line;
	  var column = token.start.column;
	  var content = '|';

	  pos++;
	  return newNode(type, content, line, column);
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Node = __webpack_require__(1);
	var NodeType = __webpack_require__(13);

	var Space = {
	  ' ': NodeType.SPACE,
	  '\n': NodeType.SPACE,
	  '\r': NodeType.SPACE,
	  '\t': NodeType.SPACE
	};

	var Punctuation = {
	  '!': NodeType.EXCLAMATION_MARK,
	  '"': NodeType.QUOTATION_MARK,
	  '#': NodeType.NUMBER_SIGN,
	  '$': NodeType.DOLLAR_SIGN,
	  '%': NodeType.PERCENT_SIGN,
	  '&': NodeType.AMPERSAND,
	  '\'': NodeType.APOSTROPHE,
	  '(': NodeType.LEFT_PARENTHESIS,
	  ')': NodeType.RIGHT_PARENTHESIS,
	  '*': NodeType.ASTERISK,
	  '+': NodeType.PLUS_SIGN,
	  ',': NodeType.COMMA,
	  '-': NodeType.HYPHEN_MINUS,
	  '.': NodeType.FULL_STOP,
	  '/': NodeType.SOLIDUS,
	  ':': NodeType.COLON,
	  ';': NodeType.SEMICOLON,
	  '<': NodeType.LESS_THAN_SIGN,
	  '=': NodeType.EQUALS_SIGN,
	  '>': NodeType.GREATER_THAN_SIGN,
	  '?': NodeType.QUESTION_MARK,
	  '@': NodeType.COMMERCIAL_AT,
	  '[': NodeType.LEFT_SQUARE_BRACKET,
	  ']': NodeType.RIGHT_SQUARE_BRACKET,
	  '^': NodeType.CIRCUMFLEX_ACCENT,
	  '_': NodeType.LOW_LINE,
	  '{': NodeType.LEFT_CURLY_BRACKET,
	  '}': NodeType.RIGHT_CURLY_BRACKET,
	  '|': NodeType.VERTICAL_LINE,
	  '~': NodeType.TILDE
	};

	var tokens = [];
	var urlMode = false;
	var blockMode = 0;
	var pos = 0;
	var tn = 0;
	var ln = 1;
	var col = 1;
	var cssLength = 0;
	var syntax = 'css';

	function addNode(type, value, column) {
	  var line = arguments.length <= 3 || arguments[3] === undefined ? ln : arguments[3];

	  var node = new Node({
	    type: type,
	    content: value,
	    syntax: syntax,
	    start: {
	      line: line,
	      column: column
	    },
	    // TODO: Calculate real end position.
	    end: {
	      line: ln,
	      column: col
	    }
	  });

	  tokens.push(node);
	}

	function isDecimalDigit(c) {
	  return '0123456789'.indexOf(c) >= 0;
	}

	function buildPrimitiveNodes(css, tabSize) {
	  tokens = [];
	  urlMode = false;
	  blockMode = 0;
	  pos = 0;
	  tn = 0;
	  ln = 1;
	  col = 1;
	  cssLength = 0;

	  /**
	   * Parse spaces
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseSpaces(css) {
	    var start = pos;
	    var startCol = col;
	    var startLn = ln;

	    // Read the string until we meet a non-space character:
	    for (; pos < cssLength; pos++) {
	      var char = css.charAt(pos);
	      if (!Space[char]) break;
	      if (char === '\n' || char === '\r') {
	        ln++;
	        col = 0;
	      }
	    }

	    // Add a substring containing only spaces to tokens:
	    addNode(NodeType.SPACE, css.substring(start, pos--), startCol, startLn);
	    col += pos - start;
	  }

	  /**
	   * Parse a string within quotes
	   * @param {string} css Unparsed part of CSS string
	   * @param {string} q Quote (either `'` or `"`)
	   */
	  function parseString(css, q) {
	    var start = pos;

	    // Read the string until we meet a matching quote:
	    for (pos++; pos < cssLength; pos++) {
	      // Skip escaped quotes:
	      if (css.charAt(pos) === '\\') pos++;else if (css.charAt(pos) === q) break;
	    }

	    // Add the string (including quotes) to tokens:
	    addNode(NodeType.STRING, css.substring(start, pos + 1), col);
	    col += pos - start;
	  }

	  /**
	   * Parse numbers
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseDecimalNumber(css) {
	    var start = pos;

	    for (; pos < css.length; pos++) {
	      if (!isDecimalDigit(css.charAt(pos))) break;
	    }

	    // Add the number to tokens:
	    addNode(NodeType.DIGIT, css.substring(start, pos--), col);
	    col++;
	  }

	  /**
	   * Parse identifier
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseIdentifier(css) {
	    var start = pos;

	    // Skip all opening slashes:
	    while (css.charAt(pos) === '/') pos++;

	    // Read the string until we meet a punctuation mark:
	    for (; pos < cssLength; pos++) {
	      var char = css.charAt(pos);
	      // Skip all '\':
	      if (char === '\\') pos++;else if (Punctuation[char] || Space[char]) break;
	    }

	    var ident = css.substring(start, pos--);

	    // Enter url mode if parsed substring is `url`:
	    if (!urlMode && ident === 'url' && css.charAt(pos + 1) === '(') {
	      urlMode = true;
	    }

	    // Add identifier to tokens:
	    addNode(NodeType.CHARACTER, ident, col);
	    col += pos - start;
	  }

	  /**
	  * Parse a multiline comment
	  * @param {string} css Unparsed part of CSS string
	  */
	  function parseMLComment(css) {
	    var start = pos;

	    // Read the string until we meet `*/`.
	    // Since we already know first 2 characters (`/*`), start reading
	    // from `pos + 2`:
	    for (pos = pos + 2; pos < cssLength; pos++) {
	      if (css.charAt(pos) === '*' && css.charAt(pos + 1) === '/') {
	        pos++;
	        break;
	      }
	    }

	    // Add full comment (including `/*` and `*/`) to the list of tokens:
	    var comment = css.substring(start, pos + 1);
	    addNode(NodeType.MULTILINE_COMMENT, comment, col);

	    var newlines = comment.split('\n');
	    if (newlines.length > 1) {
	      ln += newlines.length - 1;
	      col = newlines[newlines.length - 1].length;
	    } else {
	      col += pos - start;
	    }
	  }

	  function parseSLComment(css) {
	    var start = pos;

	    // Read the string until we meet line break.
	    // Since we already know first 2 characters (`//`), start reading
	    // from `pos + 2`:
	    for (pos += 2; pos < cssLength; pos++) {
	      if (css.charAt(pos) === '\n' || css.charAt(pos) === '\r') {
	        break;
	      }
	    }

	    // Add comment (including `//` and line break) to the list of tokens:
	    addNode(NodeType.SINGLELINE_COMMENT, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Convert a CSS string to a list of tokens
	   * @param {string} css CSS string
	   * @returns {Array} List of tokens
	   * @private
	   */
	  function getTokens(css) {
	    var c; // Current character
	    var cn; // Next character

	    cssLength = css.length;

	    // Parse string, character by character:
	    for (pos = 0; pos < cssLength; col++, pos++) {
	      c = css.charAt(pos);
	      cn = css.charAt(pos + 1);

	      // If we meet `/*`, it's a start of a multiline comment.
	      // Parse following characters as a multiline comment:
	      if (c === '/' && cn === '*') {
	        parseMLComment(css);
	      }

	      // If we meet `//` and it is not a part of url:
	      else if (!urlMode && c === '/' && cn === '/') {
	          // If we're currently inside a block, treat `//` as a start
	          // of identifier. Else treat `//` as a start of a single-line
	          // comment:
	          if (blockMode > 0) parseIdentifier(css);else parseSLComment(css);
	        }

	        // If current character is a double or single quote, it's a start
	        // of a string:
	        else if (c === '"' || c === "'") {
	            parseString(css, c);
	          }

	          // If current character is a space:
	          else if (Space[c]) {
	              parseSpaces(css);
	            }

	            // If current character is a punctuation mark:
	            else if (Punctuation[c]) {
	                // Add it to the list of tokens:
	                addNode(Punctuation[c], c, col);
	                if (c === ')') urlMode = false; // Exit url mode
	                else if (c === '{') blockMode++; // Enter a block
	                  else if (c === '}') blockMode--; // Exit a block
	                    else if (c === '\t' && tabSize > 1) col += tabSize - 1;
	              }

	              // If current character is a decimal digit:
	              else if (isDecimalDigit(c)) {
	                  parseDecimalNumber(css);
	                }

	                // If current character is anything else:
	                else {
	                    parseIdentifier(css);
	                  }
	    }

	    return tokens;
	  }

	  return getTokens(css);
	}

	module.exports = buildPrimitiveNodes;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = {
	  mark: __webpack_require__(17),
	  parse: __webpack_require__(19),
	  stringify: __webpack_require__(4),
	  tokenizer: __webpack_require__(20)
	};
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TokenType = __webpack_require__(18);

	module.exports = (function () {
	  /**
	  * Mark whitespaces and comments
	  */
	  function markSC(tokens) {
	    var tokensLength = tokens.length;
	    var ws = -1; // Flag for whitespaces
	    var sc = -1; // Flag for whitespaces and comments
	    var t = undefined; // Current token

	    // For every token in the token list, mark spaces and line breaks
	    // as spaces (set both `ws` and `sc` flags). Mark multiline comments
	    // with `sc` flag.
	    // If there are several spaces or tabs or line breaks or multiline
	    // comments in a row, group them: take the last one's index number
	    // and save it to the first token in the group as a reference:
	    // e.g., `ws_last = 7` for a group of whitespaces or `sc_last = 9`
	    // for a group of whitespaces and comments.
	    for (var i = 0; i < tokensLength; i++) {
	      t = tokens[i];
	      switch (t.type) {
	        case TokenType.Space:
	        case TokenType.Tab:
	        case TokenType.Newline:
	          t.ws = true;
	          t.sc = true;

	          if (ws === -1) ws = i;
	          if (sc === -1) sc = i;

	          break;
	        case TokenType.CommentML:
	        case TokenType.CommentSL:
	          if (ws !== -1) {
	            tokens[ws].ws_last = i - 1;
	            ws = -1;
	          }

	          t.sc = true;

	          break;
	        default:
	          if (ws !== -1) {
	            tokens[ws].ws_last = i - 1;
	            ws = -1;
	          }

	          if (sc !== -1) {
	            tokens[sc].sc_last = i - 1;
	            sc = -1;
	          }
	      }
	    }

	    if (ws !== -1) tokens[ws].ws_last = i - 1;
	    if (sc !== -1) tokens[sc].sc_last = i - 1;
	  }

	  /**
	  * Pair brackets
	  */
	  function markBrackets(tokens) {
	    var tokensLength = tokens.length;
	    var ps = []; // Parentheses
	    var sbs = []; // Square brackets
	    var cbs = []; // Curly brackets
	    var t = undefined; // Current token

	    // For every token in the token list, if we meet an opening (left)
	    // bracket, push its index number to a corresponding array.
	    // If we then meet a closing (right) bracket, look at the corresponding
	    // array. If there are any elements (records about previously met
	    // left brackets), take a token of the last left bracket (take
	    // the last index number from the array and find a token with
	    // this index number) and save right bracket's index as a reference:
	    for (var i = 0; i < tokensLength; i++) {
	      t = tokens[i];
	      switch (t.type) {
	        case TokenType.LeftParenthesis:
	          ps.push(i);
	          break;
	        case TokenType.RightParenthesis:
	          if (ps.length) {
	            t.left = ps.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	        case TokenType.LeftSquareBracket:
	          sbs.push(i);
	          break;
	        case TokenType.RightSquareBracket:
	          if (sbs.length) {
	            t.left = sbs.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	        case TokenType.LeftCurlyBracket:
	          cbs.push(i);
	          break;
	        case TokenType.RightCurlyBracket:
	          if (cbs.length) {
	            t.left = cbs.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	      }
	    }
	  }

	  return function (tokens) {
	    markBrackets(tokens);
	    markSC(tokens);
	  };
	})();

/***/ },
/* 18 */
/***/ function(module, exports) {

	// jscs:disable

	'use strict';

	module.exports = {
	    StringSQ: 'StringSQ',
	    StringDQ: 'StringDQ',
	    CommentML: 'CommentML',
	    CommentSL: 'CommentSL',

	    Newline: 'Newline',
	    Space: 'Space',
	    Tab: 'Tab',

	    ExclamationMark: 'ExclamationMark', // !
	    QuotationMark: 'QuotationMark', // "
	    NumberSign: 'NumberSign', // #
	    DollarSign: 'DollarSign', // $
	    PercentSign: 'PercentSign', // %
	    Ampersand: 'Ampersand', // &
	    Apostrophe: 'Apostrophe', // '
	    LeftParenthesis: 'LeftParenthesis', // (
	    RightParenthesis: 'RightParenthesis', // )
	    Asterisk: 'Asterisk', // *
	    PlusSign: 'PlusSign', // +
	    Comma: 'Comma', // ,
	    HyphenMinus: 'HyphenMinus', // -
	    FullStop: 'FullStop', // .
	    Solidus: 'Solidus', // /
	    Colon: 'Colon', // :
	    Semicolon: 'Semicolon', // ;
	    LessThanSign: 'LessThanSign', // <
	    EqualsSign: 'EqualsSign', // =
	    EqualitySign: 'EqualitySign', // ==
	    InequalitySign: 'InequalitySign', // !=
	    GreaterThanSign: 'GreaterThanSign', // >
	    QuestionMark: 'QuestionMark', // ?
	    CommercialAt: 'CommercialAt', // @
	    LeftSquareBracket: 'LeftSquareBracket', // [
	    ReverseSolidus: 'ReverseSolidus', // \
	    RightSquareBracket: 'RightSquareBracket', // ]
	    CircumflexAccent: 'CircumflexAccent', // ^
	    LowLine: 'LowLine', // _
	    LeftCurlyBracket: 'LeftCurlyBracket', // {
	    VerticalLine: 'VerticalLine', // |
	    RightCurlyBracket: 'RightCurlyBracket', // }
	    Tilde: 'Tilde', // ~

	    Identifier: 'Identifier',
	    DecimalNumber: 'DecimalNumber'
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// jscs:disable maximumLineLength

	'use strict';

	var Node = __webpack_require__(1);
	var NodeType = __webpack_require__(13);
	var TokenType = __webpack_require__(18);

	var tokens = undefined;
	var tokensLength = undefined;
	var pos = undefined;

	var contexts = {
	  'arguments': function () {
	    return checkArguments(pos) && getArguments();
	  },
	  'atkeyword': function () {
	    return checkAtkeyword(pos) && getAtkeyword();
	  },
	  'atrule': function () {
	    return checkAtrule(pos) && getAtrule();
	  },
	  'block': function () {
	    return checkBlock(pos) && getBlock();
	  },
	  'brackets': function () {
	    return checkBrackets(pos) && getBrackets();
	  },
	  'class': function () {
	    return checkClass(pos) && getClass();
	  },
	  'combinator': function () {
	    return checkCombinator(pos) && getCombinator();
	  },
	  'commentML': function () {
	    return checkCommentML(pos) && getCommentML();
	  },
	  'commentSL': function () {
	    return checkCommentSL(pos) && getCommentSL();
	  },
	  'condition': function () {
	    return checkCondition(pos) && getCondition();
	  },
	  'declaration': function () {
	    return checkDeclaration(pos) && getDeclaration();
	  },
	  'declDelim': function () {
	    return checkDeclDelim(pos) && getDeclDelim();
	  },
	  'delim': function () {
	    return checkDelim(pos) && getDelim();
	  },
	  'dimension': function () {
	    return checkDimension(pos) && getDimension();
	  },
	  'escapedString': function () {
	    return checkEscapedString(pos) && getEscapedString();
	  },
	  'expression': function () {
	    return checkExpression(pos) && getExpression();
	  },
	  'extend': function () {
	    return checkExtend(pos) && getExtend();
	  },
	  'function': function () {
	    return checkFunction(pos) && getFunction();
	  },
	  'ident': function () {
	    return checkIdent(pos) && getIdent();
	  },
	  'important': function () {
	    return checkImportant(pos) && getImportant();
	  },
	  'include': function () {
	    return checkInclude(pos) && getInclude();
	  },
	  'interpolatedVariable': function () {
	    return checkInterpolatedVariable(pos) && getInterpolatedVariable();
	  },
	  'mixin': function () {
	    return checkMixin(pos) && getMixin();
	  },
	  'namespace': function () {
	    return checkNamespace(pos) && getNamespace();
	  },
	  'number': function () {
	    return checkNumber(pos) && getNumber();
	  },
	  'operator': function () {
	    return checkOperator(pos) && getOperator();
	  },
	  'parentheses': function () {
	    return checkParentheses(pos) && getParentheses();
	  },
	  'parentselector': function () {
	    return checkParentSelector(pos) && getParentSelector();
	  },
	  'percentage': function () {
	    return checkPercentage(pos) && getPercentage();
	  },
	  'progid': function () {
	    return checkProgid(pos) && getProgid();
	  },
	  'property': function () {
	    return checkProperty(pos) && getProperty();
	  },
	  'propertyDelim': function () {
	    return checkPropertyDelim(pos) && getPropertyDelim();
	  },
	  'pseudoc': function () {
	    return checkPseudoc(pos) && getPseudoc();
	  },
	  'pseudoe': function () {
	    return checkPseudoe(pos) && getPseudoe();
	  },
	  'ruleset': function () {
	    return checkRuleset(pos) && getRuleset();
	  },
	  's': function () {
	    return checkS(pos) && getS();
	  },
	  'selector': function () {
	    return checkSelector(pos) && getSelector();
	  },
	  'shash': function () {
	    return checkShash(pos) && getShash();
	  },
	  'string': function () {
	    return checkString(pos) && getString();
	  },
	  'stylesheet': function () {
	    return checkStylesheet(pos) && getStylesheet();
	  },
	  'unary': function () {
	    return checkUnary(pos) && getUnary();
	  },
	  'uri': function () {
	    return checkUri(pos) && getUri();
	  },
	  'value': function () {
	    return checkValue(pos) && getValue();
	  },
	  'variable': function () {
	    return checkVariable(pos) && getVariable();
	  },
	  'variableslist': function () {
	    return checkVariablesList(pos) && getVariablesList();
	  },
	  'vhash': function () {
	    return checkVhash(pos) && getVhash();
	  }
	};

	/**
	 * Stop parsing and display error
	 * @param {Number=} i Token's index number
	 */
	function throwError(i) {
	  var ln = tokens[i].ln;

	  throw { line: ln, syntax: 'less' };
	}

	/**
	 * @param {Object} exclude
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkExcluding(exclude, i) {
	  var start = i;

	  while (i < tokensLength) {
	    if (exclude[tokens[i++].type]) break;
	  }

	  return i - start - 2;
	}

	/**
	 * @param {Number} start
	 * @param {Number} finish
	 * @returns {String}
	 */
	function joinValues(start, finish) {
	  var s = '';

	  for (var i = start; i < finish + 1; i++) {
	    s += tokens[i].value;
	  }

	  return s;
	}

	/**
	 * @param {Number} start
	 * @param {Number} num
	 * @returns {String}
	 */
	function joinValues2(start, num) {
	  if (start + num - 1 >= tokensLength) return;

	  var s = '';

	  for (var i = 0; i < num; i++) {
	    s += tokens[start + i].value;
	  }

	  return s;
	}

	function getLastPosition(content, line, column, colOffset) {
	  return typeof content === 'string' ? getLastPositionForString(content, line, column, colOffset) : getLastPositionForArray(content, line, column, colOffset);
	}

	function getLastPositionForString(content, line, column, colOffset) {
	  var position = [];

	  if (!content) {
	    position = [line, column];
	    if (colOffset) position[1] += colOffset - 1;
	    return position;
	  }

	  var lastLinebreak = content.lastIndexOf('\n');
	  var endsWithLinebreak = lastLinebreak === content.length - 1;
	  var splitContent = content.split('\n');
	  var linebreaksCount = splitContent.length - 1;
	  var prevLinebreak = linebreaksCount === 0 || linebreaksCount === 1 ? -1 : content.length - splitContent[linebreaksCount - 1].length - 2;

	  // Line:
	  var offset = endsWithLinebreak ? linebreaksCount - 1 : linebreaksCount;
	  position[0] = line + offset;

	  // Column:
	  if (endsWithLinebreak) {
	    offset = prevLinebreak !== -1 ? content.length - prevLinebreak : content.length - 1;
	  } else {
	    offset = linebreaksCount !== 0 ? content.length - lastLinebreak - column - 1 : content.length - 1;
	  }
	  position[1] = column + offset;

	  if (!colOffset) return position;

	  if (endsWithLinebreak) {
	    position[0]++;
	    position[1] = colOffset;
	  } else {
	    position[1] += colOffset;
	  }

	  return position;
	}

	function getLastPositionForArray(content, line, column, colOffset) {
	  var position;

	  if (content.length === 0) {
	    position = [line, column];
	  } else {
	    var c = content[content.length - 1];
	    if (c.hasOwnProperty('end')) {
	      position = [c.end.line, c.end.column];
	    } else {
	      position = getLastPosition(c.content, line, column);
	    }
	  }

	  if (!colOffset) return position;

	  if (tokens[pos - 1].type !== 'Newline') {
	    position[1] += colOffset;
	  } else {
	    position[0]++;
	    position[1] = 1;
	  }

	  return position;
	}

	function newNode(type, content, line, column, end) {
	  if (!end) end = getLastPosition(content, line, column);
	  return new Node({
	    type: type,
	    content: content,
	    start: {
	      line: line,
	      column: column
	    },
	    end: {
	      line: end[0],
	      column: end[1]
	    },
	    syntax: 'less'
	  });
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkAny(i) {
	  var l;

	  if (l = checkBrackets(i)) tokens[i].any_child = 1;else if (l = checkParentheses(i)) tokens[i].any_child = 2;else if (l = checkString(i)) tokens[i].any_child = 3;else if (l = checkVariablesList(i)) tokens[i].any_child = 4;else if (l = checkVariable(i)) tokens[i].any_child = 5;else if (l = checkPercentage(i)) tokens[i].any_child = 6;else if (l = checkDimension(i)) tokens[i].any_child = 7;else if (l = checkNumber(i)) tokens[i].any_child = 8;else if (l = checkUri(i)) tokens[i].any_child = 9;else if (l = checkExpression(i)) tokens[i].any_child = 10;else if (l = checkFunction(i)) tokens[i].any_child = 11;else if (l = checkIdent(i)) tokens[i].any_child = 12;else if (l = checkClass(i)) tokens[i].any_child = 13;else if (l = checkUnary(i)) tokens[i].any_child = 14;

	  return l;
	}

	/**
	 * @returns {Array}
	 */
	function getAny() {
	  var childType = tokens[pos].any_child;

	  if (childType === 1) return getBrackets();
	  if (childType === 2) return getParentheses();
	  if (childType === 3) return getString();
	  if (childType === 4) return getVariablesList();
	  if (childType === 5) return getVariable();
	  if (childType === 6) return getPercentage();
	  if (childType === 7) return getDimension();
	  if (childType === 8) return getNumber();
	  if (childType === 9) return getUri();
	  if (childType === 10) return getExpression();
	  if (childType === 11) return getFunction();
	  if (childType === 12) return getIdent();
	  if (childType === 13) return getClass();
	  if (childType === 14) return getUnary();
	}

	/**
	 * Check if token is part of mixin's arguments.
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkArguments(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength || tokens[i++].type !== TokenType.LeftParenthesis) return 0;

	  while (i < tokens[start].right) {
	    if (l = checkArgument(i)) i += l;else return 0;
	  }

	  return tokens[start].right - start + 1;
	}

	/**
	 * Check if token is valid to be part of arguments list.
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkArgument(i) {
	  var l;

	  if (l = checkEscapedString(i)) tokens[i].argument_child = 1;else if (l = checkDeclaration(i)) tokens[i].argument_child = 2;else if (l = checkVariablesList(i)) tokens[i].argument_child = 3;else if (l = checkVariable(i)) tokens[i].argument_child = 4;else if (l = checkSC(i)) tokens[i].argument_child = 5;else if (l = checkUnary(i)) tokens[i].argument_child = 6;else if (l = checkOperator(i)) tokens[i].argument_child = 7;else if (l = checkDelim(i)) tokens[i].argument_child = 8;else if (l = checkDeclDelim(i)) tokens[i].argument_child = 9;else if (l = checkString(i)) tokens[i].argument_child = 10;else if (l = checkPercentage(i)) tokens[i].argument_child = 11;else if (l = checkDimension(i)) tokens[i].argument_child = 12;else if (l = checkNumber(i)) tokens[i].argument_child = 13;else if (l = checkUri(i)) tokens[i].argument_child = 14;else if (l = checkFunction(i)) tokens[i].argument_child = 15;else if (l = checkIdent(i)) tokens[i].argument_child = 16;else if (l = checkVhash(i)) tokens[i].argument_child = 17;else if (l = checkBlock(i)) tokens[i].argument_child = 18;else if (l = checkParentheses(i)) tokens[i].argument_child = 19;

	  return l;
	}

	/**
	 * @returns {Array} Node that is part of arguments list.
	 */
	function getArgument() {
	  var childType = tokens[pos].argument_child;

	  if (childType === 1) return getEscapedString();
	  if (childType === 2) return getDeclaration();
	  if (childType === 3) return getVariablesList();
	  if (childType === 4) return getVariable();
	  if (childType === 5) return getSC();
	  if (childType === 6) return getUnary();
	  if (childType === 7) return getOperator();
	  if (childType === 8) return getDelim();
	  if (childType === 9) return getDeclDelim();
	  if (childType === 10) return getString();
	  if (childType === 11) return getPercentage();
	  if (childType === 12) return getDimension();
	  if (childType === 13) return getNumber();
	  if (childType === 14) return getUri();
	  if (childType === 15) return getFunction();
	  if (childType === 16) return getIdent();
	  if (childType === 17) return getVhash();
	  if (childType === 18) return getBlock();
	  if (childType === 19) return getParentheses();
	}

	/**
	 * Check if token is part of an @-word (e.g. `@import`, `@include`)
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkAtkeyword(i) {
	  var l;

	  // Check that token is `@`:
	  if (i >= tokensLength || tokens[i++].type !== TokenType.CommercialAt) return 0;

	  return (l = checkIdent(i)) ? l + 1 : 0;
	}

	/**
	 * Get node with @-word
	 * @returns {Array} `['atkeyword', ['ident', x]]` where `x` is
	 *      an identifier without
	 *      `@` (e.g. `import`, `include`)
	 */
	function getAtkeyword() {
	  var token = tokens[pos++];
	  var content = [getIdent()];

	  return newNode(NodeType.AtkeywordType, content, token.ln, token.col);
	}

	/**
	 * Check if token is a part of an @-rule
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of @-rule
	 */
	function checkAtrule(i) {
	  var l;

	  if (i >= tokensLength) return 0;

	  // If token already has a record of being part of an @-rule,
	  // return the @-rule's length:
	  if (tokens[i].atrule_l !== undefined) return tokens[i].atrule_l;

	  // If token is part of an @-rule, save the rule's type to token:
	  if (l = checkKeyframesRule(i)) tokens[i].atrule_type = 4;else if (l = checkAtruler(i)) tokens[i].atrule_type = 1; // @-rule with ruleset
	  else if (l = checkAtruleb(i)) tokens[i].atrule_type = 2; // Block @-rule
	    else if (l = checkAtrules(i)) tokens[i].atrule_type = 3; // Single-line @-rule
	      else return 0;

	  // If token is part of an @-rule, save the rule's length to token:
	  tokens[i].atrule_l = l;

	  return l;
	}

	/**
	 * Get node with @-rule
	 * @returns {Array}
	 */
	function getAtrule() {
	  switch (tokens[pos].atrule_type) {
	    case 1:
	      return getAtruler(); // @-rule with ruleset
	    case 2:
	      return getAtruleb(); // Block @-rule
	    case 3:
	      return getAtrules(); // Single-line @-rule
	    case 4:
	      return getKeyframesRule();
	  }
	}

	/**
	 * Check if token is part of a block @-rule
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the @-rule
	 */
	function checkAtruleb(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkAtkeyword(i)) i += l;else return 0;

	  if (l = checkTsets(i)) i += l;

	  if (l = checkBlock(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * Get node with a block @-rule
	 * @returns {Array} `['atruleb', ['atkeyword', x], y, ['block', z]]`
	 */
	function getAtruleb() {
	  var startPos = pos;
	  var content = [getAtkeyword()].concat(getTsets()).concat([getBlock()]);

	  var token = tokens[startPos];
	  return newNode(NodeType.AtruleType, content, token.ln, token.col);
	}

	/**
	 * Check if token is part of an @-rule with ruleset
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the @-rule
	 */
	function checkAtruler(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkAtkeyword(i)) i += l;else return 0;

	  if (l = checkTsets(i)) i += l;

	  if (i < tokensLength && tokens[i].type === TokenType.LeftCurlyBracket) i++;else return 0;

	  if (l = checkAtrulers(i)) i += l;

	  if (i < tokensLength && tokens[i].type === TokenType.RightCurlyBracket) i++;else return 0;

	  return i - start;
	}

	/**
	 * Get node with an @-rule with ruleset
	 * @returns {Array} ['atruler', ['atkeyword', x], y, z]
	 */
	function getAtruler() {
	  var startPos = pos;
	  var content = [getAtkeyword()];
	  content = content.concat(getTsets());
	  content.push(getAtrulers());

	  var token = tokens[startPos];
	  return newNode(NodeType.AtruleType, content, token.ln, token.col);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkAtrulers(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkSC(i)) i += l;

	  while (i < tokensLength) {
	    if (l = checkSC(i)) tokens[i].atrulers_child = 1;else if (l = checkAtrule(i)) tokens[i].atrulers_child = 2;else if (l = checkRuleset(i)) tokens[i].atrulers_child = 3;else break;
	    i += l;
	  }

	  tokens[i].atrulers_end = 1;

	  if (l = checkSC(i)) i += l;

	  return i - start;
	}

	/**
	 * @returns {Array} `['atrulers', x]`
	 */
	function getAtrulers() {
	  var token = tokens[pos++];
	  var line = token.ln;
	  var column = token.col;
	  var content = getSC();

	  while (!tokens[pos].atrulers_end) {
	    var childType = tokens[pos].atrulers_child;
	    if (childType === 1) content = content.concat(getSC());else if (childType === 2) content.push(getAtrule());else if (childType === 3) content.push(getRuleset());
	  }

	  content = content.concat(getSC());

	  var end = getLastPosition(content, line, column, 1);
	  pos++;

	  return newNode(NodeType.BlockType, content, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkAtrules(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkAtkeyword(i)) i += l;else return 0;

	  if (l = checkTsets(i)) i += l;

	  return i - start;
	}

	/**
	 * @returns {Array} `['atrules', ['atkeyword', x], y]`
	 */
	function getAtrules() {
	  var startPos = pos;
	  var content = [getAtkeyword()].concat(getTsets());

	  var token = tokens[startPos];
	  return newNode(NodeType.AtruleType, content, token.ln, token.col);
	}

	/**
	 * Check if token is part of a block (e.g. `{...}`).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the block
	 */
	function checkBlock(i) {
	  return i < tokensLength && tokens[i].type === TokenType.LeftCurlyBracket ? tokens[i].right - i + 1 : 0;
	}

	/**
	 * Get node with a block
	 * @returns {Array} `['block', x]`
	 */
	function getBlock() {
	  var startPos = pos;
	  var end = tokens[pos++].right;
	  var content = [];
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  while (pos < end) {
	    if (checkBlockdecl(pos)) content = content.concat(getBlockdecl());else throwError(pos);
	  }

	  var end_ = getLastPosition(content, line, column, 1);
	  pos = end + 1;

	  return newNode(NodeType.BlockType, content, line, column, end_);
	}

	/**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the declaration
	 */
	function checkBlockdecl(i) {
	  var l;

	  if (i >= tokensLength) return 0;

	  if (l = checkBlockdecl1(i)) tokens[i].bd_type = 1;else if (l = checkBlockdecl2(i)) tokens[i].bd_type = 2;else if (l = checkBlockdecl3(i)) tokens[i].bd_type = 3;else if (l = checkBlockdecl4(i)) tokens[i].bd_type = 4;else return 0;

	  return l;
	}

	/**
	 * @returns {Array}
	 */
	function getBlockdecl() {
	  switch (tokens[pos].bd_type) {
	    case 1:
	      return getBlockdecl1();
	    case 2:
	      return getBlockdecl2();
	    case 3:
	      return getBlockdecl3();
	    case 4:
	      return getBlockdecl4();
	  }
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkBlockdecl1(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkSC(i)) i += l;

	  if (l = checkCondition(i)) tokens[i].bd_kind = 1;else if (l = checkExtend(i)) tokens[i].bd_kind = 6;else if (l = checkRuleset(i)) tokens[i].bd_kind = 2;else if (l = checkDeclaration(i)) tokens[i].bd_kind = 3;else if (l = checkAtrule(i)) tokens[i].bd_kind = 4;else if (l = checkInclude(i)) tokens[i].bd_kind = 5;else return 0;

	  i += l;

	  if (i < tokensLength && (l = checkDeclDelim(i))) i += l;else return 0;

	  if (l = checkSC(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * @returns {Array}
	 */
	function getBlockdecl1() {
	  var sc = getSC();
	  var x = undefined;

	  switch (tokens[pos].bd_kind) {
	    case 1:
	      x = getCondition();
	      break;
	    case 2:
	      x = getRuleset();
	      break;
	    case 3:
	      x = getDeclaration();
	      break;
	    case 4:
	      x = getAtrule();
	      break;
	    case 5:
	      x = getInclude();
	      break;
	    case 6:
	      x = getExtend();
	      break;
	  }

	  return sc.concat([x]).concat([getDeclDelim()]).concat(getSC());
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkBlockdecl2(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkSC(i)) i += l;

	  if (l = checkCondition(i)) tokens[i].bd_kind = 1;else if (l = checkExtend(i)) tokens[i].bd_kind = 3;else if (l = checkRuleset(i)) tokens[i].bd_kind = 6;else if (l = checkDeclaration(i)) tokens[i].bd_kind = 4;else if (l = checkAtrule(i)) tokens[i].bd_kind = 5;else if (l = checkInclude(i)) tokens[i].bd_kind = 2;else return 0;

	  i += l;

	  if (l = checkSC(i)) i += l;

	  return i - start;
	}

	/**
	 * @returns {Array}
	 */
	function getBlockdecl2() {
	  var sc = getSC();
	  var x = undefined;

	  switch (tokens[pos].bd_kind) {
	    case 1:
	      x = getCondition();
	      break;
	    case 2:
	      x = getInclude();
	      break;
	    case 3:
	      x = getExtend();
	      break;
	    case 4:
	      x = getDeclaration();
	      break;
	    case 5:
	      x = getAtrule();
	      break;
	    case 6:
	      x = getRuleset();
	      break;
	  }

	  return sc.concat([x]).concat(getSC());
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkBlockdecl3(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkSC(i)) i += l;

	  if (l = checkDeclDelim(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  return i - start;
	}

	/**
	 * @returns {Array} `[s0, ['declDelim'], s1]` where `s0` and `s1` are
	 *      are optional whitespaces.
	 */
	function getBlockdecl3() {
	  return getSC().concat([getDeclDelim()]).concat(getSC());
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkBlockdecl4(i) {
	  return checkSC(i);
	}

	/**
	 * @returns {Array}
	 */
	function getBlockdecl4() {
	  return getSC();
	}

	/**
	 * Check if token is part of text inside square brackets, e.g. `[1]`
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkBrackets(i) {
	  if (i >= tokensLength || tokens[i].type !== TokenType.LeftSquareBracket) return 0;

	  return tokens[i].right - i + 1;
	}

	/**
	 * Get node with text inside square brackets, e.g. `[1]`
	 * @returns {Node}
	 */
	function getBrackets() {
	  var startPos = pos++;
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;
	  var tsets = getTsets();

	  var end = getLastPosition(tsets, line, column, 1);
	  pos++;

	  return newNode(NodeType.BracketsType, tsets, line, column, end);
	}

	/**
	 * Check if token is part of a class selector (e.g. `.abc`)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the class selector
	 */
	function checkClass(i) {
	  var l;

	  if (i >= tokensLength) return 0;

	  if (tokens[i].class_l) return tokens[i].class_l;

	  if (tokens[i++].type === TokenType.FullStop) {
	    if (l = checkInterpolatedVariable(i)) tokens[i].class_child = 1;else if (l = checkIdent(i)) tokens[i].class_child = 2;else return 0;

	    tokens[i].class_l = l + 1;
	    return l + 1;
	  }

	  return 0;
	}

	/**
	 * Get node with a class selector
	 * @returns {Array} `['class', ['ident', x]]` where x is a class's
	 *      identifier (without `.`, e.g. `abc`).
	 */
	function getClass() {
	  var startPos = pos++;
	  var content = [];

	  var childType = tokens[pos].class_child;
	  if (childType === 1) content.push(getInterpolatedVariable());else content.push(getIdent());

	  var token = tokens[startPos];
	  return newNode(NodeType.ClassType, content, token.ln, token.col);
	}

	function checkCombinator(i) {
	  if (i >= tokensLength) return 0;

	  var l = undefined;
	  if (l = checkCombinator1(i)) tokens[i].combinatorType = 1;else if (l = checkCombinator2(i)) tokens[i].combinatorType = 2;else if (l = checkCombinator3(i)) tokens[i].combinatorType = 3;

	  return l;
	}

	function getCombinator() {
	  var type = tokens[pos].combinatorType;
	  if (type === 1) return getCombinator1();
	  if (type === 2) return getCombinator2();
	  if (type === 3) return getCombinator3();
	}
	/**
	 * (1) `||`
	 */
	function checkCombinator1(i) {
	  if (tokens[i].type === TokenType.VerticalLine && tokens[i + 1].type === TokenType.VerticalLine) return 2;else return 0;
	}

	function getCombinator1() {
	  var type = NodeType.CombinatorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = '||';

	  pos += 2;
	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `>`
	 * (2) `+`
	 * (3) `~`
	 */
	function checkCombinator2(i) {
	  var type = tokens[i].type;
	  if (type === TokenType.PlusSign || type === TokenType.GreaterThanSign || type === TokenType.Tilde) return 1;else return 0;
	}

	function getCombinator2() {
	  var type = NodeType.CombinatorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = tokens[pos++].value;

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `/panda/`
	 */
	function checkCombinator3(i) {
	  var start = i;

	  if (tokens[i].type === TokenType.Solidus) i++;else return 0;

	  var l = undefined;
	  if (l = checkIdent(i)) i += l;else return 0;

	  if (tokens[i].type === TokenType.Solidus) i++;else return 0;

	  return i - start;
	}

	function getCombinator3() {
	  var type = NodeType.CombinatorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;

	  // Skip `/`.
	  pos++;
	  var ident = getIdent();

	  // Skip `/`.
	  pos++;

	  var content = '/' + ident.content + '/';

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is a multiline comment.
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a multiline comment, otherwise `0`
	 */
	function checkCommentML(i) {
	  return i < tokensLength && tokens[i].type === TokenType.CommentML ? 1 : 0;
	}

	/**
	 * Get node with a multiline comment
	 * @returns {Array} `['commentML', x]` where `x`
	 *      is the comment's text (without `/*` and `* /`).
	 */
	function getCommentML() {
	  var startPos = pos;
	  var s = tokens[pos].value.substring(2);
	  var l = s.length;
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  if (s.charAt(l - 2) === '*' && s.charAt(l - 1) === '/') s = s.substring(0, l - 2);

	  var end = getLastPosition(s, line, column, 2);
	  if (end[0] === line) end[1] += 2;
	  pos++;

	  return newNode(NodeType.CommentMLType, s, line, column, end);
	}

	/**
	 * Check if token is part of a single-line comment.
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a single-line comment, otherwise `0`
	 */
	function checkCommentSL(i) {
	  return i < tokensLength && tokens[i].type === TokenType.CommentSL ? 1 : 0;
	}

	/**
	 * Get node with a single-line comment.
	 * @returns {Array}
	 */
	function getCommentSL() {
	  var startPos = pos;
	  var x = tokens[pos++].value.substring(2);
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  var end = getLastPosition(x, line, column + 2);
	  return newNode(NodeType.CommentSLType, x, line, column, end);
	}

	/**
	 * Check if token is part of a condition.
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the condition
	 */
	function checkCondition(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if ((l = checkIdent(i)) && tokens[i].value === 'when') i += l;else return 0;

	  while (i < tokensLength) {
	    if (l = checkBlock(i)) {
	      tokens[i].condition_child = 0;
	      break;
	    } else if (l = checkFunction(i)) tokens[i].condition_child = 1;else if (l = checkBrackets(i)) tokens[i].condition_child = 2;else if (l = checkParentheses(i)) tokens[i].condition_child = 3;else if (l = checkVariable(i)) tokens[i].condition_child = 4;else if (l = checkIdent(i)) tokens[i].condition_child = 5;else if (l = checkNumber(i)) tokens[i].condition_child = 6;else if (l = checkDelim(i)) tokens[i].condition_child = 7;else if (l = checkOperator(i)) tokens[i].condition_child = 8;else if (l = checkCombinator(i)) tokens[i].condition_child = 9;else if (l = checkSC(i)) tokens[i].condition_child = 10;else if (l = checkString(i)) tokens[i].condition_child = 11;else return 0;

	    i += l;
	  }

	  return i - start;
	}

	/**
	 * Get node with a condition.
	 * @returns {Array} `['condition', x]`
	 */
	function getCondition() {
	  var startPos = pos;
	  var x = [];

	  x.push(getIdent());

	  while (pos < tokensLength) {
	    var childType = tokens[pos].condition_child;

	    if (childType === 0) break;else if (childType === 1) x.push(getFunction());else if (childType === 2) x.push(getBrackets());else if (childType === 3) x.push(getParentheses());else if (childType === 4) x.push(getVariable());else if (childType === 5) x.push(getIdent());else if (childType === 6) x.push(getNumber());else if (childType === 7) x.push(getDelim());else if (childType === 8) x.push(getOperator());else if (childType === 9) x.push(getCombinator());else if (childType === 10) x = x.concat(getSC());else if (childType === 11) x.push(getString());
	  }

	  var token = tokens[startPos];
	  return newNode(NodeType.ConditionType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the declaration
	 */
	function checkDeclaration(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkProperty(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkPropertyDelim(i)) i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkValue(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * Get node with a declaration
	 * @returns {Array} `['declaration', ['property', x], ['propertyDelim'],
	 *       ['value', y]]`
	 */
	function getDeclaration() {
	  var startPos = pos;
	  var x = [getProperty()].concat(getSC()).concat([getPropertyDelim()]).concat(getSC()).concat([getValue()]);

	  var token = tokens[startPos];
	  return newNode(NodeType.DeclarationType, x, token.ln, token.col);
	}

	/**
	 * Check if token is a semicolon
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a semicolon, otherwise `0`
	 */
	function checkDeclDelim(i) {
	  return i < tokensLength && tokens[i].type === TokenType.Semicolon ? 1 : 0;
	}

	/**
	 * Get node with a semicolon
	 * @returns {Array} `['declDelim']`
	 */
	function getDeclDelim() {
	  var startPos = pos++;

	  var token = tokens[startPos];
	  return newNode(NodeType.DeclDelimType, ';', token.ln, token.col);
	}

	/**
	 * Check if token is a comma
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a comma, otherwise `0`
	 */
	function checkDelim(i) {
	  return i < tokensLength && tokens[i].type === TokenType.Comma ? 1 : 0;
	}

	/**
	 * Get node with a comma
	 * @returns {Array} `['delim']`
	 */
	function getDelim() {
	  var startPos = pos++;

	  var token = tokens[startPos];
	  return newNode(NodeType.DelimType, ',', token.ln, token.col);
	}

	/**
	 * Check if token is part of a number with dimension unit (e.g. `10px`)
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkDimension(i) {
	  var ln = checkNumber(i);
	  var li = undefined;

	  if (i >= tokensLength || !ln || i + ln >= tokensLength) return 0;

	  return (li = checkNmName2(i + ln)) ? ln + li : 0;
	}

	/**
	 * Get node of a number with dimension unit
	 * @returns {Array} `['dimension', ['number', x], ['ident', y]]` where
	 *      `x` is a number converted to string (e.g. `'10'`) and `y` is
	 *      a dimension unit (e.g. `'px'`).
	 */
	function getDimension() {
	  var startPos = pos;
	  var x = [getNumber()];
	  var token = tokens[pos];
	  var ident = newNode(NodeType.IdentType, getNmName2(), token.ln, token.col);

	  x.push(ident);

	  token = tokens[startPos];
	  return newNode(NodeType.DimensionType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of an escaped string (e.g. `~"ms:something"`).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the string (including `~` and quotes)
	 */
	function checkEscapedString(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (tokens[i].type === TokenType.Tilde && (l = checkString(i + 1))) return i + l - start;else return 0;
	}

	/**
	 * Get node with an escaped string
	 * @returns {Array} `['escapedString', ['string', x]]` where `x` is a string
	 *      without `~` but with quotes
	 */
	function getEscapedString() {
	  var startPos = pos++;
	  var x = tokens[pos++].value;
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  var end = getLastPosition(x, line, column + 1);
	  return newNode(NodeType.EscapedStringType, x, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkExpression(i) {
	  var start = i;

	  if (i >= tokensLength || tokens[i++].value !== 'expression' || i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  return tokens[i].right - start + 1;
	}

	/**
	 * @returns {Array}
	 */
	function getExpression() {
	  var startPos = pos++;
	  var x = undefined;
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  x = joinValues(pos + 1, tokens[pos].right - 1);
	  var end = getLastPosition(x, line, column, 1);
	  if (end[0] === line) end[1] += 11;
	  pos = tokens[pos].right + 1;

	  return newNode(NodeType.ExpressionType, x, token.ln, token.col, end);
	}

	function checkExtend(i) {
	  if (i >= tokensLength) return 0;

	  var l;
	  if (l = checkExtend1(i)) tokens[i].extendType = 1;else if (l = checkExtend2(i)) tokens[i].extendType = 2;else return 0;

	  return l;
	}

	function getExtend() {
	  var childType = tokens[pos].extendType;
	  if (childType === 1) return getExtend1();
	  if (childType === 2) return getExtend2();
	}

	/**
	 * (1) `selector:extend(selector) {...}`
	 */
	function checkExtend1(i) {
	  var start = i;
	  var l;

	  if (i >= tokensLength) return 0;

	  if (l = checkExtendSelector(i)) i += l;else return 0;

	  if (tokens[i + 1] && tokens[i + 1].value === 'extend' && (l = checkPseudoc(i))) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkBlock(i)) i += l;else return 0;

	  return i - start;
	}

	function getExtend1() {
	  var startPos = pos;
	  var x = [].concat(getExtendSelector(), [getPseudoc()], getSC(), [getBlock()]);

	  var token = tokens[startPos];
	  return newNode(NodeType.ExtendType, x, token.ln, token.col);
	}

	/**
	 * (1) `selector:extend(selector)`
	 */
	function checkExtend2(i) {
	  var start = i;
	  var l;

	  if (i >= tokensLength) return 0;

	  if (l = checkExtendSelector(i)) i += l;else return 0;

	  if (tokens[i + 1] && tokens[i + 1].value === 'extend' && (l = checkPseudoc(i))) i += l;else return 0;

	  return i - start;
	}

	function getExtend2() {
	  var startPos = pos;
	  var x = [].concat(getExtendSelector(), [getPseudoc()]);

	  var token = tokens[startPos];
	  return newNode(NodeType.ExtendType, x, token.ln, token.col);
	}

	function checkExtendSelector(i) {
	  var l;

	  if (l = checkParentSelectorWithExtension(i)) tokens[i].extend_type = 1;else if (l = checkIdent(i)) tokens[i].extend_type = 2;else if (l = checkClass(i)) tokens[i].extend_type = 3;else if (l = checkShash(i)) tokens[i].extend_type = 4;

	  return l;
	}

	function getExtendSelector() {
	  var childType = tokens[pos].extend_type;

	  if (childType === 1) return getParentSelectorWithExtension();
	  if (childType === 2) return [getIdent()];
	  if (childType === 3) return [getClass()];
	  if (childType === 4) return [getShash()];
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkFunction(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  return i < tokensLength && tokens[i].type === TokenType.LeftParenthesis ? tokens[i].right - start + 1 : 0;
	}

	/**
	 * @returns {Array}
	 */
	function getFunction() {
	  var token = tokens[pos];
	  var ident = getIdent();
	  var x = [ident];
	  var body;

	  body = getArguments();

	  x.push(body);

	  return newNode(NodeType.FunctionType, x, token.ln, token.col);
	}

	/**
	 * @returns {Array}
	 */
	function getArguments() {
	  var startPos = pos;
	  var x = [];
	  var body = undefined;
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  pos++;

	  while (pos < tokensLength && tokens[pos].type !== TokenType.RightParenthesis) {
	    if (checkDeclaration(pos)) x.push(getDeclaration());else if (checkArgument(pos)) {
	      body = getArgument();
	      if (typeof body.content === 'string') x.push(body);else x = x.concat(body);
	    } else if (checkClass(pos)) x.push(getClass());else throwError(pos);
	  }

	  var end = getLastPosition(x, line, column, 1);
	  pos++;

	  return newNode(NodeType.ArgumentsType, x, line, column, end);
	}

	/**
	 * Check if token is part of an identifier
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the identifier
	 */
	function checkIdent(i) {
	  var start = i;
	  var wasIdent = undefined;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  // Check if token is part of an identifier starting with `_`:
	  if (tokens[i].type === TokenType.LowLine) return checkIdentLowLine(i);

	  // If token is a character, `-`, `$` or `*`, skip it & continue:
	  if (tokens[i].type === TokenType.HyphenMinus || tokens[i].type === TokenType.Identifier || tokens[i].type === TokenType.DollarSign || tokens[i].type === TokenType.Asterisk) i++;else return 0;

	  // Remember if previous token's type was identifier:
	  wasIdent = tokens[i - 1].type === TokenType.Identifier;

	  for (; i < tokensLength; i++) {
	    if (l = checkInterpolatedVariable(i)) i += l;

	    if (i >= tokensLength) break;

	    if (tokens[i].type !== TokenType.HyphenMinus && tokens[i].type !== TokenType.LowLine) {
	      if (tokens[i].type !== TokenType.Identifier && (tokens[i].type !== TokenType.DecimalNumber || !wasIdent)) break;else wasIdent = true;
	    }
	  }

	  if (!wasIdent && tokens[start].type !== TokenType.Asterisk) return 0;

	  tokens[start].ident_last = i - 1;

	  return i - start;
	}

	/**
	 * Check if token is part of an identifier starting with `_`
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the identifier
	 */
	function checkIdentLowLine(i) {
	  var start = i;

	  if (i++ >= tokensLength) return 0;

	  for (; i < tokensLength; i++) {
	    if (tokens[i].type !== TokenType.HyphenMinus && tokens[i].type !== TokenType.DecimalNumber && tokens[i].type !== TokenType.LowLine && tokens[i].type !== TokenType.Identifier) break;
	  }

	  // Save index number of the last token of the identifier:
	  tokens[start].ident_last = i - 1;

	  return i - start;
	}

	/**
	 * Get node with an identifier
	 * @returns {Array} `['ident', x]` where `x` is identifier's name
	 */
	function getIdent() {
	  var startPos = pos;
	  var x = joinValues(pos, tokens[pos].ident_last);

	  pos = tokens[pos].ident_last + 1;

	  var token = tokens[startPos];
	  return newNode(NodeType.IdentType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of `!important` word
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkImportant(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength || tokens[i++].type !== TokenType.ExclamationMark) return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].value === 'important') {
	    tokens[start].importantEnd = i;
	    return i - start + 1;
	  } else {
	    return 0;
	  }
	}

	/**
	 * Get node with `!important` word
	 * @returns {Array} `['important', sc]` where `sc` is optional whitespace
	 */
	function getImportant() {
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = joinValues(pos, token.importantEnd);

	  pos = token.importantEnd + 1;

	  return newNode(NodeType.ImportantType, content, line, column);
	}

	/**
	 * Check if token is part of an include (`@include` or `@extend` directive).
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkInclude(i) {
	  var l;

	  if (i >= tokensLength) return 0;

	  if (l = checkInclude1(i)) tokens[i].include_type = 1;else if (l = checkInclude2(i)) tokens[i].include_type = 2;

	  return l;
	}

	/**
	 * Get node with included mixin
	 * @returns {Array} `['include', x]`
	 */
	function getInclude() {
	  switch (tokens[pos].include_type) {
	    case 1:
	      return getInclude1();
	    case 2:
	      return getInclude2();
	  }
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkInclude1(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkClass(i) || checkShash(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    if (l = checkClass(i) || checkShash(i) || checkSC(i)) i += l;else if (tokens[i].type === TokenType.GreaterThanSign) i++;else break;
	  }

	  if (l = checkArguments(i)) i += l;else return 0;

	  if (i < tokensLength && (l = checkSC(i))) i += l;

	  if (i < tokensLength && (l = checkImportant(i))) i += l;

	  return i - start;
	}

	/**
	 * @returns {Array} `['include', x]`
	 */
	function getInclude1() {
	  var startPos = pos;
	  var x = [];

	  x.push(checkClass(pos) ? getClass() : getShash());

	  while (pos < tokensLength) {
	    if (checkClass(pos)) x.push(getClass());else if (checkShash(pos)) x.push(getShash());else if (checkSC(pos)) x = x.concat(getSC());else if (checkOperator(pos)) x.push(getOperator());else break;
	  }

	  x.push(getArguments());

	  x = x.concat(getSC());

	  if (checkImportant(pos)) x.push(getImportant());

	  var token = tokens[startPos];
	  return newNode(NodeType.IncludeType, x, token.ln, token.col);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkInclude2(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkClass(i) || checkShash(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    if (l = checkClass(i) || checkShash(i) || checkSC(i)) i += l;else if (tokens[i].type === TokenType.GreaterThanSign) i++;else break;
	  }

	  return i - start;
	}

	/**
	 * @returns {Array} `['include', x]`
	 */
	function getInclude2() {
	  var startPos = pos;
	  var x = [];

	  x.push(checkClass(pos) ? getClass() : getShash());

	  while (pos < tokensLength) {
	    if (checkClass(pos)) x.push(getClass());else if (checkShash(pos)) x.push(getShash());else if (checkSC(pos)) x = x.concat(getSC());else if (checkOperator(pos)) x.push(getOperator());else break;
	  }

	  var token = tokens[startPos];
	  return newNode(NodeType.IncludeType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of LESS interpolated variable
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkInterpolatedVariable(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (tokens[i].type !== TokenType.CommercialAt || !tokens[i + 1] || tokens[i + 1].type !== TokenType.LeftCurlyBracket) return 0;

	  i += 2;

	  if (l = checkIdent(i)) i += l;else return 0;

	  return tokens[i].type === TokenType.RightCurlyBracket ? i - start + 1 : 0;
	}

	/**
	 * Get node with LESS interpolated variable
	 * @returns {Array} `['interpolatedVariable', x]`
	 */
	function getInterpolatedVariable() {
	  var startPos = pos;
	  var x = [];
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  // Skip `@{`:
	  pos += 2;

	  x.push(getIdent());

	  // Skip `}`:
	  var end = getLastPosition(x, line, column, 1);
	  pos++;

	  return newNode(NodeType.InterpolatedVariableType, x, line, column, end);
	}

	function checkKeyframesBlock(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkKeyframesSelector(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkBlock(i)) i += l;else return 0;

	  return i - start;
	}

	function getKeyframesBlock() {
	  var type = NodeType.RulesetType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [].concat([getKeyframesSelector()], getSC(), [getBlock()]);

	  return newNode(type, content, line, column);
	}

	function checkKeyframesBlocks(i) {
	  var start = i;
	  var l = undefined;

	  if (i < tokensLength && tokens[i].type === TokenType.LeftCurlyBracket) i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkKeyframesBlock(i)) i += l;else return 0;

	  while (tokens[i].type !== TokenType.RightCurlyBracket) {
	    if (l = checkSC(i)) i += l;else if (l = checkKeyframesBlock(i)) i += l;else break;
	  }

	  if (i < tokensLength && tokens[i].type === TokenType.RightCurlyBracket) i++;else return 0;

	  return i - start;
	}

	function getKeyframesBlocks() {
	  var type = NodeType.BlockType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];
	  var keyframesBlocksEnd = token.right;

	  // Skip `{`.
	  pos++;

	  while (pos < keyframesBlocksEnd) {
	    if (checkSC(pos)) content = content.concat(getSC());else if (checkKeyframesBlock(pos)) content.push(getKeyframesBlock());
	  }

	  var end = getLastPosition(content, line, column, 1);

	  // Skip `}`.
	  pos++;

	  return newNode(type, content, line, column, end);
	}

	/**
	 * Check if token is part of a @keyframes rule.
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the @keyframes rule
	 */
	function checkKeyframesRule(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkAtkeyword(i)) i += l;else return 0;

	  var atruleName = joinValues2(i - l, l);
	  if (atruleName.indexOf('keyframes') === -1) return 0;

	  if (l = checkSC(i)) i += l;else return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkKeyframesBlocks(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * @return {Node}
	 */
	function getKeyframesRule() {
	  var type = NodeType.AtruleType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [].concat([getAtkeyword()], getSC(), [getIdent()], getSC(), [getKeyframesBlocks()]);

	  return newNode(type, content, line, column);
	}

	function checkKeyframesSelector(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) {
	    // Valid selectors are only `from` and `to`.
	    var selector = joinValues2(i, l);
	    if (selector !== 'from' && selector !== 'to') return 0;

	    i += l;
	    tokens[start].keyframesSelectorType = 1;
	  } else if (l = checkPercentage(i)) {
	    i += l;
	    tokens[start].keyframesSelectorType = 2;
	  } else {
	    return 0;
	  }

	  return i - start;
	}

	function getKeyframesSelector() {
	  var keyframesSelectorType = NodeType.KeyframesSelectorType;
	  var selectorType = NodeType.SelectorType;

	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  if (token.keyframesSelectorType === 1) {
	    content.push(getIdent());
	  } else {
	    content.push(getPercentage());
	  }

	  var keyframesSelector = newNode(keyframesSelectorType, content, line, column);
	  return newNode(selectorType, [keyframesSelector], line, column);
	}

	/**
	 * Check if token is part of a LESS mixin
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the mixin
	 */
	function checkMixin(i) {
	  var l;

	  if (i >= tokensLength) return 0;

	  if (l = checkMixin1(i)) tokens[i].mixin_type = 1;else if (l = checkMixin2(i)) tokens[i].mixin_type = 2;else return 0;

	  return l;
	}

	/**
	 * @returns {Array}
	 */
	function getMixin() {
	  switch (tokens[pos].mixin_type) {
	    case 1:
	      return getMixin1();
	    case 2:
	      return getMixin2();
	  }
	}

	function checkMixin1(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkClass(i) || checkShash(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkArguments(i)) i += l;

	  if (l = checkSC(i)) i += l;

	  if (l = checkBlock(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * Get node with a mixin
	 * @returns {Array} `['mixin', x]`
	 */
	function getMixin1() {
	  var startPos = pos;
	  var x = [];

	  x.push(checkClass(pos) ? getClass() : getShash());

	  x = x.concat(getSC());

	  if (checkArguments(pos)) x.push(getArguments());

	  x = x.concat(getSC());

	  if (checkBlock(pos)) x.push(getBlock());

	  var token = tokens[startPos];
	  return newNode(NodeType.MixinType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of a LESS mixin
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the mixin
	 */
	function checkMixin2(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkClass(i) || checkShash(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkArguments(i)) i += l;

	  return i - start;
	}

	/**
	 * Get node with a mixin
	 * @returns {Array} `['mixin', x]`
	 */
	function getMixin2() {
	  var startPos = pos;
	  var x = [];

	  x.push(checkClass(pos) ? getClass() : getShash());

	  x = x.concat(getSC());

	  if (checkArguments(pos)) x.push(getArguments());

	  var token = tokens[startPos];
	  return newNode(NodeType.MixinType, x, token.ln, token.col);
	}

	/**
	 * Check if token is a namespace sign (`|`)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is `|`, `0` if not
	 */
	function checkNamespace(i) {
	  return i < tokensLength && tokens[i].type === TokenType.VerticalLine ? 1 : 0;
	}

	/**
	 * Get node with a namespace sign
	 * @returns {Array} `['namespace']`
	 */
	function getNamespace() {
	  var startPos = pos++;

	  var token = tokens[startPos];
	  return newNode(NodeType.NamespaceType, '|', token.ln, token.col);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkNmName2(i) {
	  if (tokens[i].type === TokenType.Identifier) return 1;else if (tokens[i].type !== TokenType.DecimalNumber) return 0;

	  i++;

	  return i < tokensLength && tokens[i].type === TokenType.Identifier ? 2 : 1;
	}

	/**
	 * @returns {String}
	 */
	function getNmName2() {
	  var s = tokens[pos].value;

	  if (tokens[pos++].type === TokenType.DecimalNumber && pos < tokensLength && tokens[pos].type === TokenType.Identifier) s += tokens[pos++].value;

	  return s;
	}

	/**
	 * Check if token is part of a number
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of number
	 */
	function checkNumber(i) {
	  if (i >= tokensLength) return 0;

	  if (tokens[i].number_l) return tokens[i].number_l;

	  // `10`:
	  if (i < tokensLength && tokens[i].type === TokenType.DecimalNumber && (!tokens[i + 1] || tokens[i + 1] && tokens[i + 1].type !== TokenType.FullStop)) return tokens[i].number_l = 1, tokens[i].number_l;

	  // `10.`:
	  if (i < tokensLength && tokens[i].type === TokenType.DecimalNumber && tokens[i + 1] && tokens[i + 1].type === TokenType.FullStop && (!tokens[i + 2] || tokens[i + 2].type !== TokenType.DecimalNumber)) return tokens[i].number_l = 2, tokens[i].number_l;

	  // `.10`:
	  if (i < tokensLength && tokens[i].type === TokenType.FullStop && tokens[i + 1].type === TokenType.DecimalNumber) return tokens[i].number_l = 2, tokens[i].number_l;

	  // `10.10`:
	  if (i < tokensLength && tokens[i].type === TokenType.DecimalNumber && tokens[i + 1] && tokens[i + 1].type === TokenType.FullStop && tokens[i + 2] && tokens[i + 2].type === TokenType.DecimalNumber) return tokens[i].number_l = 3, tokens[i].number_l;

	  return 0;
	}

	/**
	 * Get node with number
	 * @returns {Array} `['number', x]` where `x` is a number converted
	 *      to string.
	 */
	function getNumber() {
	  var x = '';
	  var startPos = pos;
	  var l = tokens[pos].number_l;

	  for (var j = 0; j < l; j++) {
	    x += tokens[pos + j].value;
	  }

	  pos += l;

	  var token = tokens[startPos];
	  return newNode(NodeType.NumberType, x, token.ln, token.col);
	}

	/**
	 * Check if token is an operator (`/`, `,`, `:`, `=`, `>`, `<` or `*`)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is an operator, otherwise `0`
	 */
	function checkOperator(i) {
	  if (i >= tokensLength) return 0;

	  switch (tokens[i].type) {
	    case TokenType.Solidus:
	    case TokenType.Comma:
	    case TokenType.Colon:
	    case TokenType.EqualsSign:
	    case TokenType.LessThanSign:
	    case TokenType.GreaterThanSign:
	    case TokenType.Asterisk:
	      return 1;
	  }

	  return 0;
	}

	/**
	 * Get node with an operator
	 * @returns {Array} `['operator', x]` where `x` is an operator converted
	 *      to string.
	 */
	function getOperator() {
	  var startPos = pos;
	  var x = tokens[pos++].value;

	  var token = tokens[startPos];
	  return newNode(NodeType.OperatorType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of text inside parentheses, e.g. `(1)`
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */
	function checkParentheses(i) {
	  if (i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  return tokens[i].right - i + 1;
	}

	/**
	 * Get node with text inside parentheses, e.g. `(1)`
	 * @return {Node}
	 */
	function getParentheses() {
	  var type = NodeType.ParenthesesType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;

	  pos++;

	  var tsets = getTsets();

	  var end = getLastPosition(tsets, line, column, 1);
	  pos++;

	  return newNode(type, tsets, line, column, end);
	}

	/**
	 * Check if token is a parent selector (`&`).
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkParentSelector(i) {
	  return i < tokensLength && tokens[i].type === TokenType.Ampersand ? 1 : 0;
	}

	/**
	 * Get node with a parent selector
	 * @returns {Array} `['parentSelector']`
	 */
	function getParentSelector() {
	  var startPos = pos++;

	  var token = tokens[startPos];
	  return newNode(NodeType.ParentSelectorType, '&', token.ln, token.col);
	}

	function checkParentSelectorExtension(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  while (i < tokensLength) {
	    if (l = checkNumber(i) || checkIdent(i)) i += l;else break;
	  }

	  return i - start;
	}

	function getParentSelectorExtension() {
	  var type = NodeType.ParentSelectorExtensionType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  while (pos < tokensLength) {
	    if (checkNumber(pos)) content.push(getNumber());else if (checkIdent(pos)) content.push(getIdent());else break;
	  }

	  return newNode(type, content, line, column);
	}

	function checkParentSelectorWithExtension(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  if (l = checkParentSelector(i)) i += l;else return 0;

	  if (l = checkParentSelectorExtension(i)) i += l;

	  return i - start;
	}

	function getParentSelectorWithExtension() {
	  var content = [getParentSelector()];

	  if (checkParentSelectorExtension(pos)) content.push(getParentSelectorExtension());

	  return content;
	}

	/**
	 * Check if token is part of a number with percent sign (e.g. `10%`)
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkPercentage(i) {
	  var x;

	  if (i >= tokensLength) return 0;

	  x = checkNumber(i);

	  if (!x || i + x >= tokensLength) return 0;

	  return tokens[i + x].type === TokenType.PercentSign ? x + 1 : 0;
	}

	/**
	 * Get node of number with percent sign
	 * @returns {Array} `['percentage', ['number', x]]` where `x` is a number
	 *      (without percent sign) converted to string.
	 */
	function getPercentage() {
	  var startPos = pos;
	  var x = [getNumber()];
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  var end = getLastPosition(x, line, column, 1);
	  pos++;

	  return newNode(NodeType.PercentageType, x, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkProgid(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (joinValues2(i, 6) === 'progid:DXImageTransform.Microsoft.') i += 6;else return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].type === TokenType.LeftParenthesis) {
	    tokens[start].progid_end = tokens[i].right;
	    i = tokens[i].right + 1;
	  } else return 0;

	  return i - start;
	}

	/**
	 * @returns {Array}
	 */
	function getProgid() {
	  var startPos = pos;
	  var progid_end = tokens[pos].progid_end;
	  var x = joinValues(pos, progid_end);

	  pos = progid_end + 1;
	  var token = tokens[startPos];
	  return newNode(NodeType.ProgidType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of a property
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the property
	 */
	function checkProperty(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkVariable(i) || checkIdent(i)) i += l;else return 0;

	  return i - start;
	}

	/**
	 * Get node with a property
	 * @returns {Array} `['property', x]`
	 */
	function getProperty() {
	  var startPos = pos;
	  var x = [];

	  if (checkVariable(pos)) x.push(getVariable());else x.push(getIdent());

	  var token = tokens[startPos];
	  return newNode(NodeType.PropertyType, x, token.ln, token.col);
	}

	/**
	 * Check if token is a colon
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a colon, otherwise `0`
	 */
	function checkPropertyDelim(i) {
	  return i < tokensLength && tokens[i].type === TokenType.Colon ? 1 : 0;
	}

	/**
	 * Get node with a colon
	 * @returns {Array} `['propertyDelim']`
	 */
	function getPropertyDelim() {
	  var startPos = pos++;

	  var token = tokens[startPos];
	  return newNode(NodeType.PropertyDelimType, ':', token.ln, token.col);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkPseudo(i) {
	  return checkPseudoe(i) || checkPseudoc(i);
	}

	/**
	 * @returns {Array}
	 */
	function getPseudo() {
	  if (checkPseudoe(pos)) return getPseudoe();
	  if (checkPseudoc(pos)) return getPseudoc();
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkPseudoe(i) {
	  var l;

	  if (i >= tokensLength || tokens[i++].type !== TokenType.Colon || i >= tokensLength || tokens[i++].type !== TokenType.Colon) return 0;

	  return (l = checkInterpolatedVariable(i) || checkIdent(i)) ? l + 2 : 0;
	}

	/**
	 * @returns {Array}
	 */
	function getPseudoe() {
	  var startPos = pos;
	  var x = [];

	  pos += 2;

	  x.push(checkInterpolatedVariable(pos) ? getInterpolatedVariable() : getIdent());

	  var token = tokens[startPos];
	  return newNode(NodeType.PseudoeType, x, token.ln, token.col);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkPseudoc(i) {
	  var l;

	  if (i >= tokensLength || tokens[i].type !== TokenType.Colon) return 0;

	  if (l = checkPseudoClass3(i)) tokens[i].pseudoClassType = 3;else if (l = checkPseudoClass4(i)) tokens[i].pseudoClassType = 4;else if (l = checkPseudoClass5(i)) tokens[i].pseudoClassType = 5;else if (l = checkPseudoClass1(i)) tokens[i].pseudoClassType = 1;else if (l = checkPseudoClass2(i)) tokens[i].pseudoClassType = 2;else if (l = checkPseudoClass6(i)) tokens[i].pseudoClassType = 6;else return 0;

	  return l;
	}

	function getPseudoc() {
	  var childType = tokens[pos].pseudoClassType;
	  if (childType === 1) return getPseudoClass1();
	  if (childType === 2) return getPseudoClass2();
	  if (childType === 3) return getPseudoClass3();
	  if (childType === 4) return getPseudoClass4();
	  if (childType === 5) return getPseudoClass5();
	  if (childType === 6) return getPseudoClass6();
	}

	/**
	 * (1) `:not(selector)`
	 * (2) `:extend(selector, selector)`
	 */
	function checkPseudoClass1(i) {
	  var start = i;

	  // Skip `:`.
	  i++;

	  var l = undefined;
	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSelectorsGroup(i)) i += l;else return 0;

	  if (i !== right) return 0;

	  return right - start + 1;
	}

	/**
	 * (-) `:not(panda)`
	 */
	function getPseudoClass1() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  content.push(getIdent());

	  {
	    var _type = NodeType.ArgumentsType;
	    var _token = tokens[pos];
	    var _line = _token.ln;
	    var _column = _token.col;

	    // Skip `(`.
	    pos++;

	    var selectors = getSelectorsGroup();
	    var end = getLastPosition(selectors, _line, _column, 1);
	    var args = newNode(_type, selectors, _line, _column, end);
	    content.push(args);

	    // Skip `)`.
	    pos++;
	  }

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `:nth-child(odd)`
	 * (2) `:nth-child(even)`
	 * (3) `:lang(de-DE)`
	 */
	function checkPseudoClass2(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSC(i)) i += l;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	function getPseudoClass2() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  {
	    // Skip `(`.
	    pos++;

	    var l = tokens[pos].ln;
	    var c = tokens[pos].col;
	    var value = [];

	    value = value.concat(getSC());
	    value.push(getIdent());
	    value = value.concat(getSC());

	    var end = getLastPosition(value, l, c, 1);
	    var args = newNode(NodeType.ArgumentsType, value, l, c, end);
	    content.push(args);

	    // Skip `)`.
	    pos++;
	  }

	  return newNode(type, content, line, column);
	}

	/**
	 * (-) `:nth-child(-3n + 2)`
	 */
	function checkPseudoClass3(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSC(i)) i += l;

	  if (l = checkUnary(i)) i += l;
	  if (i >= tokensLength) return 0;
	  if (tokens[i].type === TokenType.DecimalNumber) i++;

	  if (i >= tokensLength) return 0;
	  if (tokens[i].value === 'n') i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i >= tokensLength) return 0;
	  if (tokens[i].value === '+' || tokens[i].value === '-') i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].type === TokenType.DecimalNumber) i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	function getPseudoClass3() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  var l = tokens[pos].ln;
	  var c = tokens[pos].col;
	  var value = [];

	  // Skip `(`.
	  pos++;

	  if (checkUnary(pos)) value.push(getUnary());
	  if (checkNumber(pos)) value.push(getNumber());

	  {
	    var _l = tokens[pos].ln;
	    var _c = tokens[pos].col;
	    var _content = tokens[pos].value;
	    var _ident = newNode(NodeType.IdentType, _content, _l, _c);
	    value.push(_ident);
	    pos++;
	  }

	  value = value.concat(getSC());
	  if (checkUnary(pos)) value.push(getUnary());
	  value = value.concat(getSC());
	  if (checkNumber(pos)) value.push(getNumber());
	  value = value.concat(getSC());

	  var end = getLastPosition(value, l, c, 1);
	  var args = newNode(NodeType.ArgumentsType, value, l, c, end);
	  content.push(args);

	  // Skip `)`.
	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * (-) `:nth-child(-3n)`
	 */
	function checkPseudoClass4(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength) return 0;
	  if (tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSC(i)) i += l;

	  if (l = checkUnary(i)) i += l;
	  if (tokens[i].type === TokenType.DecimalNumber) i++;

	  if (tokens[i].value === 'n') i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	function getPseudoClass4() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  // Skip `(`.
	  pos++;

	  var l = tokens[pos].ln;
	  var c = tokens[pos].col;
	  var value = [];

	  if (checkUnary(pos)) value.push(getUnary());
	  if (checkNumber(pos)) value.push(getNumber());
	  if (checkIdent(pos)) value.push(getIdent());
	  value = value.concat(getSC());

	  var end = getLastPosition(value, l, c, 1);
	  var args = newNode(NodeType.ArgumentsType, value, l, c, end);
	  content.push(args);

	  // Skip `)`.
	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * (-) `:nth-child(+8)`
	 */
	function checkPseudoClass5(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkIdent(i)) i += l;else return 0;

	  if (i >= tokensLength) return 0;
	  if (tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  var right = tokens[i].right;

	  // Skip `(`.
	  i++;

	  if (l = checkSC(i)) i += l;

	  if (l = checkUnary(i)) i += l;
	  if (tokens[i].type === TokenType.DecimalNumber) i++;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (i !== right) return 0;

	  return i - start + 1;
	}

	function getPseudoClass5() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = getIdent();
	  content.push(ident);

	  // Skip `(`.
	  pos++;

	  var l = tokens[pos].ln;
	  var c = tokens[pos].col;
	  var value = [];

	  if (checkUnary(pos)) value.push(getUnary());
	  if (checkNumber(pos)) value.push(getNumber());
	  value = value.concat(getSC());

	  var end = getLastPosition(value, l, c, 1);
	  var args = newNode(NodeType.ArgumentsType, value, l, c, end);
	  content.push(args);

	  // Skip `)`.
	  pos++;

	  return newNode(type, content, line, column);
	}

	/**
	 * (-) `:checked`
	 */
	function checkPseudoClass6(i) {
	  var start = i;
	  var l = 0;

	  // Skip `:`.
	  i++;

	  if (i >= tokensLength) return 0;

	  if (l = checkInterpolatedVariable(i)) i += l;else if (l = checkIdent(i)) i += l;else return 0;

	  return i - start;
	}

	function getPseudoClass6() {
	  var type = NodeType.PseudocType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `:`.
	  pos++;

	  var ident = checkInterpolatedVariable(pos) ? getInterpolatedVariable() : getIdent();
	  content.push(ident);

	  return newNode(type, content, line, column);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkRuleset(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkSelectorsGroup(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkBlock(i)) i += l;else return 0;

	  return i - start;
	}

	function getRuleset() {
	  var type = NodeType.RulesetType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  content = content.concat(getSelectorsGroup());
	  content = content.concat(getSC());
	  content.push(getBlock());

	  return newNode(type, content, line, column);
	}

	/**
	 * Check if token is marked as a space (if it's a space or a tab
	 *      or a line break).
	 * @param {Number} i
	 * @returns {Number} Number of spaces in a row starting with the given token.
	 */
	function checkS(i) {
	  return i < tokensLength && tokens[i].ws ? tokens[i].ws_last - i + 1 : 0;
	}

	/**
	 * Get node with spaces
	 * @returns {Array} `['s', x]` where `x` is a string containing spaces
	 */
	function getS() {
	  var startPos = pos;
	  var x = joinValues(pos, tokens[pos].ws_last);

	  pos = tokens[pos].ws_last + 1;

	  var token = tokens[startPos];
	  return newNode(NodeType.SType, x, token.ln, token.col);
	}

	/**
	 * Check if token is a space or a comment.
	 * @param {Number} i Token's index number
	 * @returns {Number} Number of similar (space or comment) tokens
	 *      in a row starting with the given token.
	 */
	function checkSC(i) {
	  if (i >= tokensLength) return 0;

	  var l = undefined;
	  var lsc = 0;

	  while (i < tokensLength) {
	    if (!(l = checkS(i)) && !(l = checkCommentML(i)) && !(l = checkCommentSL(i))) break;
	    i += l;
	    lsc += l;
	  }

	  return lsc || 0;
	}

	/**
	 * Get node with spaces and comments
	 * @returns {Array} Array containing nodes with spaces (if there are any)
	 *      and nodes with comments (if there are any):
	 *      `[['s', x]*, ['comment', y]*]` where `x` is a string of spaces
	 *      and `y` is a comment's text (without `/*` and `* /`).
	 */
	function getSC() {
	  var sc = [];
	  var ln = undefined;

	  if (pos >= tokensLength) return sc;

	  ln = tokens[pos].ln;

	  while (pos < tokensLength) {
	    if (checkS(pos)) sc.push(getS());else if (checkCommentML(pos)) sc.push(getCommentML());else if (checkCommentSL(pos)) sc.push(getCommentSL());else break;
	  }

	  return sc;
	}

	/**
	 * Check if token is part of a hexadecimal number (e.g. `#fff`) inside
	 *      a simple selector
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkShash(i) {
	  var l;

	  if (i >= tokensLength || tokens[i].type !== TokenType.NumberSign) return 0;

	  if (l = checkInterpolatedVariable(i + 1) || checkIdent(i + 1)) return l + 1;else return 0;
	}

	/**
	 * Get node with a hexadecimal number (e.g. `#fff`) inside a simple
	 *      selector
	 * @returns {Array} `['shash', x]` where `x` is a hexadecimal number
	 *      converted to string (without `#`, e.g. `fff`)
	 */
	function getShash() {
	  var startPos = pos;
	  var x = [];

	  pos++;

	  if (checkInterpolatedVariable(pos)) x.push(getInterpolatedVariable());else x.push(getIdent());

	  var token = tokens[startPos];
	  return newNode(NodeType.ShashType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of a string (text wrapped in quotes)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is part of a string, `0` if not
	 */
	function checkString(i) {
	  return i < tokensLength && (tokens[i].type === TokenType.StringSQ || tokens[i].type === TokenType.StringDQ) ? 1 : 0;
	}

	/**
	 * Get string's node
	 * @returns {Array} `['string', x]` where `x` is a string (including
	 *      quotes).
	 */
	function getString() {
	  var startPos = pos;
	  var x = tokens[pos++].value;

	  var token = tokens[startPos];
	  return newNode(NodeType.StringType, x, token.ln, token.col);
	}

	/**
	 * Validate stylesheet: it should consist of any number (0 or more) of
	 * rulesets (sets of rules with selectors), @-rules, whitespaces or
	 * comments.
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkStylesheet(i) {
	  var start = i;
	  var l = undefined;

	  // Check every token:
	  while (i < tokensLength) {
	    if (l = checkSC(i) || checkAtrule(i) || checkRuleset(i) || checkMixin(i) || checkDeclaration(i) || checkDeclDelim(i)) i += l;else throwError(i);
	  }

	  return i - start;
	}

	/**
	 * @returns {Array} `['stylesheet', x]` where `x` is all stylesheet's
	 *      nodes.
	 */
	function getStylesheet() {
	  var startPos = pos;
	  var x = [];

	  while (pos < tokensLength) {
	    if (checkSC(pos)) x = x.concat(getSC());else if (checkAtrule(pos)) x.push(getAtrule());else if (checkRuleset(pos)) x.push(getRuleset());else if (checkMixin(pos)) x.push(getMixin());else if (checkDeclaration(pos)) x.push(getDeclaration());else if (checkDeclDelim(pos)) x.push(getDeclDelim());else throwError(pos);
	  }

	  var token = tokens[startPos];
	  return newNode(NodeType.StylesheetType, x, token.ln, token.col);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkTset(i) {
	  var l;

	  if (l = checkVhash(i)) tokens[i].tset_child = 1;else if (l = checkAny(i)) tokens[i].tset_child = 2;else if (l = checkSC(i)) tokens[i].tset_child = 3;else if (l = checkOperator(i)) tokens[i].tset_child = 4;

	  return l;
	}

	/**
	 * @returns {Array}
	 */
	function getTset() {
	  var childType = tokens[pos].tset_child;
	  if (childType === 1) return getVhash();else if (childType === 2) return getAny();else if (childType === 3) return getSC();else if (childType === 4) return getOperator();
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkTsets(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  while (l = checkTset(i)) {
	    i += l;
	  }

	  return i - start;
	}

	/**
	 * @returns {Array}
	 */
	function getTsets() {
	  var x = [];
	  var t = undefined;

	  while (checkTset(pos)) {
	    t = getTset();
	    if (typeof t.content === 'string') x.push(t);else x = x.concat(t);
	  }

	  return x;
	}

	/**
	 * Check if token is an unary (arithmetical) sign (`+` or `-`)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is an unary sign, `0` if not
	 */
	function checkUnary(i) {
	  return i < tokensLength && (tokens[i].type === TokenType.HyphenMinus || tokens[i].type === TokenType.PlusSign) ? 1 : 0;
	}

	/**
	 * Get node with an unary (arithmetical) sign (`+` or `-`)
	 * @returns {Array} `['unary', x]` where `x` is an unary sign
	 *      converted to string.
	 */
	function getUnary() {
	  var startPos = pos;
	  var x = tokens[pos++].value;

	  var token = tokens[startPos];
	  return newNode(NodeType.OperatorType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of URI (e.g. `url('/css/styles.css')`)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of URI
	 */
	function checkUri(i) {
	  var start = i;

	  if (i >= tokensLength || tokens[i++].value !== 'url' || i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis) return 0;

	  return tokens[i].right - start + 1;
	}

	/**
	 * Get node with URI
	 * @returns {Array} `['uri', x]` where `x` is URI's nodes (without `url`
	 *      and braces, e.g. `['string', ''/css/styles.css'']`).
	 */
	function getUri() {
	  var startPos = pos;
	  var uriExcluding = {};
	  var uri = undefined;
	  var token = undefined;
	  var l = undefined;
	  var raw = undefined;

	  pos += 2;

	  uriExcluding[TokenType.Space] = 1;
	  uriExcluding[TokenType.Tab] = 1;
	  uriExcluding[TokenType.Newline] = 1;
	  uriExcluding[TokenType.LeftParenthesis] = 1;
	  uriExcluding[TokenType.RightParenthesis] = 1;

	  if (checkUri1(pos)) {
	    uri = [].concat(getSC()).concat([getString()]).concat(getSC());
	  } else {
	    uri = getSC();
	    l = checkExcluding(uriExcluding, pos);
	    token = tokens[pos];
	    raw = newNode(NodeType.RawType, joinValues(pos, pos + l), token.ln, token.col);

	    uri.push(raw);

	    pos += l + 1;

	    uri = uri.concat(getSC());
	  }

	  token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;
	  var end = getLastPosition(uri, line, column, 1);
	  pos++;
	  return newNode(NodeType.UriType, uri, line, column, end);
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkUri1(i) {
	  var start = i;
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].type !== TokenType.StringDQ && tokens[i].type !== TokenType.StringSQ) return 0;

	  i++;

	  if (l = checkSC(i)) i += l;

	  return i - start;
	}

	/**
	 * Check if token is part of a value
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the value
	 */
	function checkValue(i) {
	  var start = i;
	  var l = undefined;
	  var s = undefined;
	  var _i = undefined;

	  while (i < tokensLength) {
	    s = checkSC(i);
	    _i = i + s;

	    if (l = _checkValue(_i)) i += l + s;
	    if (!l || checkBlock(_i)) break;
	  }

	  return i - start;
	}

	/**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function _checkValue(i) {
	  return checkEscapedString(i) || checkInterpolatedVariable(i) || checkVariable(i) || checkVhash(i) || checkBlock(i) || checkProgid(i) || checkAny(i) || checkAtkeyword(i) || checkOperator(i) || checkImportant(i);
	}

	/**
	 * @returns {Array}
	 */
	function getValue() {
	  var startPos = pos;
	  var x = [];
	  var s = undefined;
	  var _pos = undefined;

	  while (pos < tokensLength) {
	    s = checkSC(pos);
	    _pos = pos + s;

	    if (!_checkValue(_pos)) break;

	    if (s) x = x.concat(getSC());
	    x.push(_getValue());
	  }

	  var token = tokens[startPos];
	  return newNode(NodeType.ValueType, x, token.ln, token.col);
	}

	/**
	 * @returns {Array}
	 */
	function _getValue() {
	  if (checkEscapedString(pos)) return getEscapedString();else if (checkInterpolatedVariable(pos)) return getInterpolatedVariable();else if (checkVariable(pos)) return getVariable();else if (checkVhash(pos)) return getVhash();else if (checkBlock(pos)) return getBlock();else if (checkProgid(pos)) return getProgid();else if (checkAny(pos)) return getAny();else if (checkAtkeyword(pos)) return getAtkeyword();else if (checkOperator(pos)) return getOperator();else if (checkImportant(pos)) return getImportant();
	}

	/**
	 * Check if token is part of LESS variable
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the variable
	 */
	function checkVariable(i) {
	  var l;

	  if (i >= tokensLength || tokens[i].type !== TokenType.CommercialAt) return 0;

	  if (tokens[i - 1] && tokens[i - 1].type === TokenType.CommercialAt && tokens[i - 2] && tokens[i - 2].type === TokenType.CommercialAt) return 0;

	  return (l = checkVariable(i + 1) || checkIdent(i + 1)) ? l + 1 : 0;
	}

	/**
	 * Get node with a variable
	 * @returns {Array} `['variable', ['ident', x]]` where `x` is
	 *      a variable name.
	 */
	function getVariable() {
	  var startPos = pos;
	  var x = [];

	  pos++;

	  if (checkVariable(pos)) x.push(getVariable());else x.push(getIdent());

	  var token = tokens[startPos];
	  return newNode(NodeType.VariableType, x, token.ln, token.col);
	}

	/**
	 * Check if token is part of a variables list (e.g. `@rest...`).
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkVariablesList(i) {
	  var d = 0; // Number of dots
	  var l = undefined;

	  if (i >= tokensLength) return 0;

	  if (l = checkVariable(i)) i += l;else return 0;

	  while (tokens[i] && tokens[i].type === TokenType.FullStop) {
	    d++;
	    i++;
	  }

	  return d === 3 ? l + d : 0;
	}

	/**
	 * Get node with a variables list
	 * @returns {Array} `['variableslist', ['variable', ['ident', x]]]` where
	 *      `x` is a variable name.
	 */
	function getVariablesList() {
	  var startPos = pos;
	  var x = [getVariable()];
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  var end = getLastPosition(x, line, column, 3);
	  pos += 3;

	  return newNode(NodeType.VariablesListType, x, line, column, end);
	}

	/**
	 * Check if token is part of a hexadecimal number (e.g. `#fff`) inside
	 *      some value
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */
	function checkVhash(i) {
	  var l;

	  if (i >= tokensLength || tokens[i].type !== TokenType.NumberSign) return 0;

	  return (l = checkNmName2(i + 1)) ? l + 1 : 0;
	}

	/**
	 * Get node with a hexadecimal number (e.g. `#fff`) inside some value
	 * @returns {Array} `['vhash', x]` where `x` is a hexadecimal number
	 *      converted to string (without `#`, e.g. `'fff'`).
	 */
	function getVhash() {
	  var startPos = pos;
	  var x = undefined;
	  var token = tokens[startPos];
	  var line = token.ln;
	  var column = token.col;

	  pos++;

	  x = getNmName2();
	  var end = getLastPosition(x, line, column + 1);
	  return newNode(NodeType.VhashType, x, line, column, end);
	}

	module.exports = function (_tokens, context) {
	  tokens = _tokens;
	  tokensLength = tokens.length;
	  pos = 0;

	  return contexts[context]();
	};

	function checkSelectorsGroup(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  if (l = checkSelector(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var sb = checkSC(i);
	    var c = checkDelim(i + sb);
	    if (!c) break;
	    var sa = checkSC(i + sb + c);
	    if (l = checkSelector(i + sb + c + sa)) i += sb + c + sa + l;else break;
	  }

	  tokens[start].selectorsGroupEnd = i;
	  return i - start;
	}

	function getSelectorsGroup() {
	  var selectorsGroup = [];
	  var selectorsGroupEnd = tokens[pos].selectorsGroupEnd;

	  selectorsGroup.push(getSelector());

	  while (pos < selectorsGroupEnd) {
	    selectorsGroup = selectorsGroup.concat(getSC());
	    selectorsGroup.push(getDelim());
	    selectorsGroup = selectorsGroup.concat(getSC());
	    selectorsGroup.push(getSelector());
	  }

	  return selectorsGroup;
	}

	function checkSelector(i) {
	  var l;

	  if (l = checkSelector1(i)) tokens[i].selectorType = 1;else if (l = checkSelector2(i)) tokens[i].selectorType = 2;

	  return l;
	}

	function getSelector() {
	  var selectorType = tokens[pos].selectorType;
	  if (selectorType === 1) return getSelector1();else return getSelector2();
	}

	/**
	 * Checks for selector which starts with a compound selector.
	 */
	function checkSelector1(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  if (l = checkCompoundSelector(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var s = checkSC(i);
	    var c = checkCombinator(i + s);
	    if (!s && !c) break;
	    if (c) {
	      i += s + c;
	      s = checkSC(i);
	    }

	    if (l = checkCompoundSelector(i + s)) i += s + l;else break;
	  }

	  tokens[start].selectorEnd = i;
	  return i - start;
	}

	function getSelector1() {
	  var type = NodeType.SelectorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var selectorEnd = token.selectorEnd;
	  var content = getCompoundSelector();

	  while (pos < selectorEnd) {
	    if (checkSC(pos)) content = content.concat(getSC());else if (checkCombinator(pos)) content.push(getCombinator());else if (checkCompoundSelector(pos)) content = content.concat(getCompoundSelector());
	  }

	  return newNode(type, content, line, column);
	}

	/**
	 * Checks for a selector that starts with a combinator.
	 */
	function checkSelector2(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  if (l = checkCombinator(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var sb = checkSC(i);
	    if (l = checkCompoundSelector(i + sb)) i += sb + l;else break;

	    var sa = checkSC(i);
	    var c = checkCombinator(i + sa);
	    if (!sa && !c) break;
	    if (c) {
	      i += sa + c;
	    }
	  }

	  tokens[start].selectorEnd = i;
	  return i - start;
	}

	function getSelector2() {
	  var type = NodeType.SelectorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var selectorEnd = token.selectorEnd;
	  var content = [getCombinator()];

	  while (pos < selectorEnd) {
	    if (checkSC(pos)) content = content.concat(getSC());else if (checkCombinator(pos)) content.push(getCombinator());else if (checkCompoundSelector(pos)) content = content.concat(getCompoundSelector());
	  }

	  return newNode(type, content, line, column);
	}

	function checkCompoundSelector(i) {
	  var l = undefined;

	  if (l = checkCompoundSelector1(i)) {
	    tokens[i].compoundSelectorType = 1;
	  } else if (l = checkCompoundSelector2(i)) {
	    tokens[i].compoundSelectorType = 2;
	  }

	  return l;
	}

	function getCompoundSelector() {
	  var type = tokens[pos].compoundSelectorType;
	  if (type === 1) return getCompoundSelector1();
	  if (type === 2) return getCompoundSelector2();
	}

	function checkCompoundSelector1(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;

	  var l = undefined;
	  if (l = checkTypeSelector(i) || checkParentSelectorWithExtension(i)) i += l;else return 0;

	  while (i < tokensLength) {
	    var _l2 = checkShash(i) || checkClass(i) || checkAttributeSelector(i) || checkPseudo(i);
	    if (_l2) i += _l2;else break;
	  }

	  tokens[start].compoundSelectorEnd = i;

	  return i - start;
	}

	function getCompoundSelector1() {
	  var sequence = [];
	  var compoundSelectorEnd = tokens[pos].compoundSelectorEnd;

	  if (checkTypeSelector(pos)) sequence.push(getTypeSelector());else if (checkParentSelectorWithExtension(pos)) sequence = sequence.concat(getParentSelectorWithExtension());

	  while (pos < compoundSelectorEnd) {
	    if (checkShash(pos)) sequence.push(getShash());else if (checkClass(pos)) sequence.push(getClass());else if (checkAttributeSelector(pos)) sequence.push(getAttributeSelector());else if (checkPseudo(pos)) sequence.push(getPseudo());
	  }

	  return sequence;
	}

	function checkCompoundSelector2(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;

	  while (i < tokensLength) {
	    var l = checkShash(i) || checkClass(i) || checkAttributeSelector(i) || checkPseudo(i);
	    if (l) i += l;else break;
	  }

	  tokens[start].compoundSelectorEnd = i;

	  return i - start;
	}

	function getCompoundSelector2() {
	  var sequence = [];
	  var compoundSelectorEnd = tokens[pos].compoundSelectorEnd;

	  while (pos < compoundSelectorEnd) {
	    if (checkShash(pos)) sequence.push(getShash());else if (checkClass(pos)) sequence.push(getClass());else if (checkAttributeSelector(pos)) sequence.push(getAttributeSelector());else if (checkPseudo(pos)) sequence.push(getPseudo());
	  }

	  return sequence;
	}

	function checkTypeSelector(i) {
	  if (i >= tokensLength) return 0;

	  var start = i;
	  var l = undefined;

	  if (l = checkNamePrefix(i)) i += l;

	  if (tokens[i].type === TokenType.Asterisk) i++;else if (l = checkIdent(i)) i += l;else return 0;

	  return i - start;
	}

	function getTypeSelector() {
	  var type = NodeType.TypeSelectorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  if (checkNamePrefix(pos)) content.push(getNamePrefix());
	  if (checkIdent(pos)) content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	function checkAttributeSelector(i) {
	  var l = undefined;
	  if (l = checkAttributeSelector1(i)) tokens[i].attributeSelectorType = 1;else if (l = checkAttributeSelector2(i)) tokens[i].attributeSelectorType = 2;

	  return l;
	}

	function getAttributeSelector() {
	  var type = tokens[pos].attributeSelectorType;
	  if (type === 1) return getAttributeSelector1();else return getAttributeSelector2();
	}

	/**
	 * (1) `[panda=nani]`
	 * (2) `[panda='nani']`
	 * (3) `[panda='nani' i]`
	 *
	 */
	function checkAttributeSelector1(i) {
	  var start = i;

	  if (tokens[i].type === TokenType.LeftSquareBracket) i++;else return 0;

	  var l = undefined;
	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeName(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeMatch(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeValue(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeFlags(i)) {
	    i += l;
	    if (l = checkSC(i)) i += l;
	  }

	  if (tokens[i].type === TokenType.RightSquareBracket) i++;else return 0;

	  return i - start;
	}

	function getAttributeSelector1() {
	  var type = NodeType.AttributeSelectorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `[`.
	  pos++;

	  content = content.concat(getSC());
	  content.push(getAttributeName());
	  content = content.concat(getSC());
	  content.push(getAttributeMatch());
	  content = content.concat(getSC());
	  content.push(getAttributeValue());
	  content = content.concat(getSC());

	  if (checkAttributeFlags(pos)) {
	    content.push(getAttributeFlags());
	    content = content.concat(getSC());
	  }

	  // Skip `]`.
	  pos++;

	  var end = getLastPosition(content, line, column, 1);
	  return newNode(type, content, line, column, end);
	}

	/**
	 * (1) `[panda]`
	 */
	function checkAttributeSelector2(i) {
	  var start = i;

	  if (tokens[i].type === TokenType.LeftSquareBracket) i++;else return 0;

	  var l = undefined;
	  if (l = checkSC(i)) i += l;

	  if (l = checkAttributeName(i)) i += l;else return 0;

	  if (l = checkSC(i)) i += l;

	  if (tokens[i].type === TokenType.RightSquareBracket) i++;else return 0;

	  return i - start;
	}

	function getAttributeSelector2() {
	  var type = NodeType.AttributeSelectorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  // Skip `[`.
	  pos++;

	  content = content.concat(getSC());
	  content.push(getAttributeName());
	  content = content.concat(getSC());

	  // Skip `]`.
	  pos++;

	  var end = getLastPosition(content, line, column, 1);
	  return newNode(type, content, line, column, end);
	}

	function checkAttributeName(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkNamePrefix(i)) i += l;

	  if (l = checkIdent(i)) i += l;else return 0;

	  return i - start;
	}

	function getAttributeName() {
	  var type = NodeType.AttributeNameType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  if (checkNamePrefix(pos)) content.push(getNamePrefix());
	  content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	function checkAttributeMatch(i) {
	  var l = undefined;
	  if (l = checkAttributeMatch1(i)) tokens[i].attributeMatchType = 1;else if (l = checkAttributeMatch2(i)) tokens[i].attributeMatchType = 2;

	  return l;
	}

	function getAttributeMatch() {
	  var type = tokens[pos].attributeMatchType;
	  if (type === 1) return getAttributeMatch1();else return getAttributeMatch2();
	}

	function checkAttributeMatch1(i) {
	  var start = i;

	  var type = tokens[i].type;
	  if (type === TokenType.Tilde || type === TokenType.VerticalLine || type === TokenType.CircumflexAccent || type === TokenType.DollarSign || type === TokenType.Asterisk) i++;else return 0;

	  if (tokens[i].type === TokenType.EqualsSign) i++;else return 0;

	  return i - start;
	}

	function getAttributeMatch1() {
	  var type = NodeType.AttributeMatchType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = tokens[pos].value + tokens[pos + 1].value;
	  pos += 2;

	  return newNode(type, content, line, column);
	}

	function checkAttributeMatch2(i) {
	  if (tokens[i].type === TokenType.EqualsSign) return 1;else return 0;
	}

	function getAttributeMatch2() {
	  var type = NodeType.AttributeMatchType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = '=';

	  pos++;
	  return newNode(type, content, line, column);
	}

	function checkAttributeValue(i) {
	  return checkString(i) || checkIdent(i);
	}

	function getAttributeValue() {
	  var type = NodeType.AttributeValueType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  if (checkString(pos)) content.push(getString());else content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	function checkAttributeFlags(i) {
	  return checkIdent(i);
	}

	function getAttributeFlags() {
	  var type = NodeType.AttributeFlagsType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [getIdent()];

	  return newNode(type, content, line, column);
	}

	function checkNamePrefix(i) {
	  if (i >= tokensLength) return 0;

	  var l = undefined;
	  if (l = checkNamePrefix1(i)) tokens[i].namePrefixType = 1;else if (l = checkNamePrefix2(i)) tokens[i].namePrefixType = 2;

	  return l;
	}

	function getNamePrefix() {
	  var type = tokens[pos].namePrefixType;
	  if (type === 1) return getNamePrefix1();else return getNamePrefix2();
	}

	/**
	 * (1) `panda|`
	 * (2) `panda<comment>|`
	 */
	function checkNamePrefix1(i) {
	  var start = i;
	  var l = undefined;

	  if (l = checkNamespacePrefix(i)) i += l;else return 0;

	  if (l = checkCommentML(i)) i += l;

	  if (l = checkNamespaceSeparator(i)) i += l;else return 0;

	  return i - start;
	}

	function getNamePrefix1() {
	  var type = NodeType.NamePrefixType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];

	  content.push(getNamespacePrefix());

	  if (checkCommentML(pos)) content.push(getCommentML());

	  content.push(getNamespaceSeparator());

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `|`
	 */
	function checkNamePrefix2(i) {
	  return checkNamespaceSeparator(i);
	}

	function getNamePrefix2() {
	  var type = NodeType.NamePrefixType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [getNamespaceSeparator()];

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `*`
	 * (2) `panda`
	 */
	function checkNamespacePrefix(i) {
	  if (i >= tokensLength) return 0;

	  var l = undefined;

	  if (tokens[i].type === TokenType.Asterisk) return 1;else if (l = checkIdent(i)) return l;else return 0;
	}

	function getNamespacePrefix() {
	  var type = NodeType.NamespacePrefixType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = [];
	  if (checkIdent(pos)) content.push(getIdent());

	  return newNode(type, content, line, column);
	}

	/**
	 * (1) `|`
	 */
	function checkNamespaceSeparator(i) {
	  if (i >= tokensLength) return 0;

	  if (tokens[i].type === TokenType.VerticalLine) return 1;else return 0;
	}

	function getNamespaceSeparator() {
	  var type = NodeType.NamespaceSeparatorType;
	  var token = tokens[pos];
	  var line = token.ln;
	  var column = token.col;
	  var content = '|';

	  pos++;
	  return newNode(type, content, line, column);
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (css, tabSize) {
	  var TokenType = __webpack_require__(18);

	  var tokens = [];
	  var urlMode = false;
	  var blockMode = 0;
	  var c = undefined; // Current character
	  var cn = undefined; // Next character
	  var pos = 0;
	  var tn = 0;
	  var ln = 1;
	  var col = 1;

	  var Punctuation = {
	    ' ': TokenType.Space,
	    '\n': TokenType.Newline,
	    '\r': TokenType.Newline,
	    '\t': TokenType.Tab,
	    '!': TokenType.ExclamationMark,
	    '"': TokenType.QuotationMark,
	    '#': TokenType.NumberSign,
	    '$': TokenType.DollarSign,
	    '%': TokenType.PercentSign,
	    '&': TokenType.Ampersand,
	    '\'': TokenType.Apostrophe,
	    '(': TokenType.LeftParenthesis,
	    ')': TokenType.RightParenthesis,
	    '*': TokenType.Asterisk,
	    '+': TokenType.PlusSign,
	    ',': TokenType.Comma,
	    '-': TokenType.HyphenMinus,
	    '.': TokenType.FullStop,
	    '/': TokenType.Solidus,
	    ':': TokenType.Colon,
	    ';': TokenType.Semicolon,
	    '<': TokenType.LessThanSign,
	    '=': TokenType.EqualsSign,
	    '>': TokenType.GreaterThanSign,
	    '?': TokenType.QuestionMark,
	    '@': TokenType.CommercialAt,
	    '[': TokenType.LeftSquareBracket,
	    ']': TokenType.RightSquareBracket,
	    '^': TokenType.CircumflexAccent,
	    '_': TokenType.LowLine,
	    '{': TokenType.LeftCurlyBracket,
	    '|': TokenType.VerticalLine,
	    '}': TokenType.RightCurlyBracket,
	    '~': TokenType.Tilde
	  };

	  /**
	   * Add a token to the token list
	   * @param {string} type
	   * @param {string} value
	   */
	  function pushToken(type, value, column) {
	    tokens.push({
	      tn: tn++,
	      ln: ln,
	      col: column,
	      type: type,
	      value: value
	    });
	  }

	  /**
	   * Check if a character is a decimal digit
	   * @param {string} c Character
	   * @returns {boolean}
	   */
	  function isDecimalDigit(c) {
	    return '0123456789'.indexOf(c) >= 0;
	  }

	  /**
	   * Parse spaces
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseSpaces(css) {
	    var start = pos;

	    // Read the string until we meet a non-space character:
	    for (; pos < css.length; pos++) {
	      if (css.charAt(pos) !== ' ') break;
	    }

	    // Add a substring containing only spaces to tokens:
	    pushToken(TokenType.Space, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Parse a string within quotes
	   * @param {string} css Unparsed part of CSS string
	   * @param {string} q Quote (either `'` or `"`)
	   */
	  function parseString(css, q) {
	    var start = pos;

	    // Read the string until we meet a matching quote:
	    for (pos++; pos < css.length; pos++) {
	      // Skip escaped quotes:
	      if (css.charAt(pos) === '\\') pos++;else if (css.charAt(pos) === q) break;
	    }

	    // Add the string (including quotes) to tokens:
	    var type = q === '"' ? TokenType.StringDQ : TokenType.StringSQ;
	    pushToken(type, css.substring(start, pos + 1), col);
	    col += pos - start;
	  }

	  /**
	   * Parse numbers
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseDecimalNumber(css) {
	    var start = pos;

	    // Read the string until we meet a character that's not a digit:
	    for (; pos < css.length; pos++) {
	      if (!isDecimalDigit(css.charAt(pos))) break;
	    }

	    // Add the number to tokens:
	    pushToken(TokenType.DecimalNumber, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Parse identifier
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseIdentifier(css) {
	    var start = pos;

	    // Skip all opening slashes:
	    while (css.charAt(pos) === '/') pos++;

	    // Read the string until we meet a punctuation mark:
	    for (; pos < css.length; pos++) {
	      // Skip all '\':
	      if (css.charAt(pos) === '\\') pos++;else if (css.charAt(pos) in Punctuation) break;
	    }

	    var ident = css.substring(start, pos--);

	    // Enter url mode if parsed substring is `url`:
	    if (!urlMode && ident === 'url' && css.charAt(pos + 1) === '(') {
	      urlMode = true;
	    }

	    // Add identifier to tokens:
	    pushToken(TokenType.Identifier, ident, col);
	    col += pos - start;
	  }

	  /**
	  * Parse a multiline comment
	  * @param {string} css Unparsed part of CSS string
	  */
	  function parseMLComment(css) {
	    var start = pos;

	    // Read the string until we meet `*/`.
	    // Since we already know first 2 characters (`/*`), start reading
	    // from `pos + 2`:
	    for (pos = pos + 2; pos < css.length; pos++) {
	      if (css.charAt(pos) === '*' && css.charAt(pos + 1) === '/') {
	        pos++;
	        break;
	      }
	    }

	    // Add full comment (including `/*` and `*/`) to the list of tokens:
	    var comment = css.substring(start, pos + 1);
	    pushToken(TokenType.CommentML, comment, col);

	    var newlines = comment.split('\n');
	    if (newlines.length > 1) {
	      ln += newlines.length - 1;
	      col = newlines[newlines.length - 1].length;
	    } else {
	      col += pos - start;
	    }
	  }

	  /**
	  * Parse a single line comment
	  * @param {string} css Unparsed part of CSS string
	  */
	  function parseSLComment(css) {
	    var start = pos;

	    // Read the string until we meet line break.
	    // Since we already know first 2 characters (`//`), start reading
	    // from `pos + 2`:
	    for (pos += 2; pos < css.length; pos++) {
	      if (css.charAt(pos) === '\n' || css.charAt(pos) === '\r') {
	        break;
	      }
	    }

	    // Add comment (including `//` and line break) to the list of tokens:
	    pushToken(TokenType.CommentSL, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Convert a CSS string to a list of tokens
	   * @param {string} css CSS string
	   * @returns {Array} List of tokens
	   * @private
	   */
	  function getTokens(css) {
	    // Parse string, character by character:
	    for (pos = 0; pos < css.length; col++, pos++) {
	      c = css.charAt(pos);
	      cn = css.charAt(pos + 1);

	      // If we meet `/*`, it's a start of a multiline comment.
	      // Parse following characters as a multiline comment:
	      if (c === '/' && cn === '*') {
	        parseMLComment(css);
	      }

	      // If we meet `//` and it is not a part of url:
	      else if (!urlMode && c === '/' && cn === '/') {
	          // If we're currently inside a block, treat `//` as a start
	          // of identifier. Else treat `//` as a start of a single-line
	          // comment:
	          parseSLComment(css);
	        }

	        // If current character is a double or single quote, it's a start
	        // of a string:
	        else if (c === '"' || c === "'") {
	            parseString(css, c);
	          }

	          // If current character is a space:
	          else if (c === ' ') {
	              parseSpaces(css);
	            }

	            // If current character is a punctuation mark:
	            else if (c in Punctuation) {
	                // Add it to the list of tokens:
	                pushToken(Punctuation[c], c, col);
	                if (c === '\n' || c === '\r') {
	                  ln++;
	                  col = 0;
	                } // Go to next line
	                if (c === ')') urlMode = false; // Exit url mode
	                if (c === '{') blockMode++; // Enter a block
	                if (c === '}') blockMode--; // Exit a block
	                else if (c === '\t' && tabSize > 1) col += tabSize - 1;
	              }

	              // If current character is a decimal digit:
	              else if (isDecimalDigit(c)) {
	                  parseDecimalNumber(css);
	                }

	                // If current character is anything else:
	                else {
	                    parseIdentifier(css);
	                  }
	    }

	    return tokens;
	  }

	  return getTokens(css);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = {
	  mark: __webpack_require__(22),
	  parse: __webpack_require__(23),
	  stringify: __webpack_require__(5),
	  tokenizer: __webpack_require__(24)
	};
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TokenType = __webpack_require__(18);

	module.exports = (function () {
	  /**
	  * Mark whitespaces and comments
	  */
	  function markSC(tokens) {
	    var tokensLength = tokens.length;
	    var ws = -1; // Flag for whitespaces
	    var sc = -1; // Flag for whitespaces and comments
	    var t = undefined; // Current token

	    // For every token in the token list, mark spaces and line breaks
	    // as spaces (set both `ws` and `sc` flags). Mark multiline comments
	    // with `sc` flag.
	    // If there are several spaces or tabs or line breaks or multiline
	    // comments in a row, group them: take the last one's index number
	    // and save it to the first token in the group as a reference:
	    // e.g., `ws_last = 7` for a group of whitespaces or `sc_last = 9`
	    // for a group of whitespaces and comments.
	    for (var i = 0; i < tokensLength; i++) {
	      t = tokens[i];
	      switch (t.type) {
	        case TokenType.Space:
	        case TokenType.Tab:
	          t.ws = true;
	          t.sc = true;

	          if (ws === -1) ws = i;
	          if (sc === -1) sc = i;

	          break;
	        case TokenType.Newline:
	          t.ws = true;
	          t.sc = true;

	          ws = ws === -1 ? i : ws;
	          sc = sc === -1 ? i : ws;

	          tokens[ws].ws_last = i - 1;
	          tokens[sc].sc_last = i - 1;
	          tokens[i].ws_last = i;
	          tokens[i].sc_last = i;

	          ws = -1;
	          sc = -1;

	          break;
	        case TokenType.CommentML:
	        case TokenType.CommentSL:
	          if (ws !== -1) {
	            tokens[ws].ws_last = i - 1;
	            ws = -1;
	          }

	          t.sc = true;

	          break;
	        default:
	          if (ws !== -1) {
	            tokens[ws].ws_last = i - 1;
	            ws = -1;
	          }

	          if (sc !== -1) {
	            tokens[sc].sc_last = i - 1;
	            sc = -1;
	          }
	      }
	    }

	    if (ws !== -1) tokens[ws].ws_last = i - 1;
	    if (sc !== -1) tokens[sc].sc_last = i - 1;
	  }

	  /**
	  * Pair brackets
	  */
	  function markBrackets(tokens) {
	    var tokensLength = tokens.length;
	    var ps = []; // Parentheses
	    var sbs = []; // Square brackets
	    var cbs = []; // Curly brackets
	    var t = undefined; // Current token

	    // For every token in the token list, if we meet an opening (left)
	    // bracket, push its index number to a corresponding array.
	    // If we then meet a closing (right) bracket, look at the corresponding
	    // array. If there are any elements (records about previously met
	    // left brackets), take a token of the last left bracket (take
	    // the last index number from the array and find a token with
	    // this index number) and save right bracket's index as a reference:
	    for (var i = 0; i < tokensLength; i++) {
	      t = tokens[i];
	      switch (t.type) {
	        case TokenType.LeftParenthesis:
	          ps.push(i);
	          break;
	        case TokenType.RightParenthesis:
	          if (ps.length) {
	            t.left = ps.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	        case TokenType.LeftSquareBracket:
	          sbs.push(i);
	          break;
	        case TokenType.RightSquareBracket:
	          if (sbs.length) {
	            t.left = sbs.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	        case TokenType.LeftCurlyBracket:
	          cbs.push(i);
	          break;
	        case TokenType.RightCurlyBracket:
	          if (cbs.length) {
	            t.left = cbs.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	      }
	    }
	  }

	  function markBlocks(tokens) {
	    var blocks = {};
	    var currentIL = 0;
	    var i = 0;
	    var l = tokens.length;
	    var iw = undefined;

	    for (; i !== l; i++) {
	      if (!tokens[i - 1]) continue;

	      // Skip all tokens on current line:
	      if (tokens[i].type !== TokenType.Newline) continue;

	      var end = getBlockEnd(tokens, i + 1, currentIL, iw);
	      if (!iw) iw = end.iw;

	      if (end.indent && end.indent === currentIL) continue;

	      // Not found nested block.
	      if (end.end !== null) {
	        markBlocksWithIndent(tokens, blocks, end);

	        for (var z = end.end + 1; z < l; z++) {
	          if (tokens[z].type === TokenType.Space || tokens[z].type === TokenType.Tab || tokens[z].type === TokenType.CommentSL || tokens[z].type === TokenType.CommentML) continue;
	          if (tokens[z].type === TokenType.Newline) i = z;
	          break;
	        }
	      }

	      if (!blocks[end.indent]) blocks[end.indent] = [];
	      blocks[end.indent].push(i + 1);
	      currentIL = end.indent;
	    }

	    markBlocksWithIndent(tokens, blocks, { end: i - 1, indent: 0 });
	  }

	  function getBlockEnd(tokens, i, indent, iw, maybeEnd) {
	    var spaces = '';
	    if (!maybeEnd) maybeEnd = i - 1;

	    if (!tokens[i]) return { end: maybeEnd, indent: 0 };

	    for (var l = tokens.length; i < l; i++) {
	      if (tokens[i].type === TokenType.Space || tokens[i].type === TokenType.Tab || tokens[i].type === TokenType.CommentML || tokens[i].type === TokenType.CommentSL || tokens[i].type === TokenType.Newline) {
	        spaces += tokens[i].value;
	        continue;
	      }

	      // Got all spaces.
	      // Find trailing spaces.
	      var lastNewline = spaces.lastIndexOf('\n');
	      spaces = spaces.slice(lastNewline + 1);

	      // Mark previous node as block end.
	      if (!spaces) return { end: maybeEnd, indent: 0 };

	      if (!iw) iw = spaces.length;
	      var newIndent = spaces.length / iw;

	      if (newIndent < indent) return { end: maybeEnd, indent: newIndent, iw: iw };

	      if (newIndent === indent) {
	        // Look for line end
	        for (; i < l; i++) {
	          if (tokens[i].type !== TokenType.Newline) continue;
	          var end = getBlockEnd(tokens, i + 1, indent, iw, maybeEnd);
	          return { end: end.end, indent: indent, iw: iw };
	        }

	        return { end: i - 1, indent: newIndent, iw: iw };
	      } else {
	        // If newIndent > indent
	        return { end: null, indent: newIndent, iw: iw };
	      }
	    }

	    return { end: i - 1 };
	  }

	  function markBlocksWithIndent(tokens, blocks, end) {
	    for (var indent in blocks) {
	      if (indent < end.indent + 1) continue;
	      var block = blocks[indent];
	      if (!block) continue;

	      for (var x = 0; x < block.length; x++) {
	        var y = block[x];
	        tokens[y].block_end = end.end;
	      }
	      blocks[indent] = null;
	    }
	  }

	  return function (tokens) {
	    markBrackets(tokens);
	    markSC(tokens);
	    markBlocks(tokens);
	  };
	})();

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// jscs:disable maximumLineLength
	'use strict';var Node=__webpack_require__(1);var NodeType=__webpack_require__(13);var TokenType=__webpack_require__(18);var tokens=undefined;var tokensLength=undefined;var pos=undefined;var contexts={'arguments':function(){return checkArguments(pos) && getArguments();},'atkeyword':function(){return checkAtkeyword(pos) && getAtkeyword();},'atrule':function(){return checkAtrule(pos) && getAtrule();},'block':function(){return checkBlock(pos) && getBlock();},'brackets':function(){return checkBrackets(pos) && getBrackets();},'class':function(){return checkClass(pos) && getClass();},'combinator':function(){return checkCombinator(pos) && getCombinator();},'commentML':function(){return checkCommentML(pos) && getCommentML();},'commentSL':function(){return checkCommentSL(pos) && getCommentSL();},'condition':function(){return checkCondition(pos) && getCondition();},'conditionalStatement':function(){return checkConditionalStatement(pos) && getConditionalStatement();},'declaration':function(){return checkDeclaration(pos) && getDeclaration();},'declDelim':function(){return checkDeclDelim(pos) && getDeclDelim();},'default':function(){return checkDefault(pos) && getDefault();},'delim':function(){return checkDelim(pos) && getDelim();},'dimension':function(){return checkDimension(pos) && getDimension();},'expression':function(){return checkExpression(pos) && getExpression();},'extend':function(){return checkExtend(pos) && getExtend();},'function':function(){return checkFunction(pos) && getFunction();},'global':function(){return checkGlobal(pos) && getGlobal();},'ident':function(){return checkIdent(pos) && getIdent();},'important':function(){return checkImportant(pos) && getImportant();},'include':function(){return checkInclude(pos) && getInclude();},'interpolation':function(){return checkInterpolation(pos) && getInterpolation();},'loop':function(){return checkLoop(pos) && getLoop();},'mixin':function(){return checkMixin(pos) && getMixin();},'namespace':function(){return checkNamespace(pos) && getNamespace();},'number':function(){return checkNumber(pos) && getNumber();},'operator':function(){return checkOperator(pos) && getOperator();},'optional':function(){return checkOptional(pos) && getOptional();},'parentheses':function(){return checkParentheses(pos) && getParentheses();},'parentselector':function(){return checkParentSelector(pos) && getParentSelector();},'percentage':function(){return checkPercentage(pos) && getPercentage();},'placeholder':function(){return checkPlaceholder(pos) && getPlaceholder();},'progid':function(){return checkProgid(pos) && getProgid();},'property':function(){return checkProperty(pos) && getProperty();},'propertyDelim':function(){return checkPropertyDelim(pos) && getPropertyDelim();},'pseudoc':function(){return checkPseudoc(pos) && getPseudoc();},'pseudoe':function(){return checkPseudoe(pos) && getPseudoe();},'ruleset':function(){return checkRuleset(pos) && getRuleset();},'s':function(){return checkS(pos) && getS();},'selector':function(){return checkSelector(pos) && getSelector();},'shash':function(){return checkShash(pos) && getShash();},'string':function(){return checkString(pos) && getString();},'stylesheet':function(){return checkStylesheet(pos) && getStylesheet();},'unary':function(){return checkUnary(pos) && getUnary();},'uri':function(){return checkUri(pos) && getUri();},'value':function(){return checkValue(pos) && getValue();},'variable':function(){return checkVariable(pos) && getVariable();},'variableslist':function(){return checkVariablesList(pos) && getVariablesList();},'vhash':function(){return checkVhash(pos) && getVhash();}}; /**
	 * Stop parsing and display error
	 * @param {Number=} i Token's index number
	 */function throwError(i){var ln=i?tokens[i].ln:tokens[pos].ln;throw {line:ln,syntax:'sass'};} /**
	 * @param {Object} exclude
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkExcluding(exclude,i){var start=i;while(i < tokensLength) {if(exclude[tokens[i++].type])break;}return i - start - 2;} /**
	 * @param {Number} start
	 * @param {Number} finish
	 * @returns {String}
	 */function joinValues(start,finish){var s='';for(var i=start;i < finish + 1;i++) {s += tokens[i].value;}return s;} /**
	 * @param {Number} start
	 * @param {Number} num
	 * @returns {String}
	 */function joinValues2(start,num){if(start + num - 1 >= tokensLength)return;var s='';for(var i=0;i < num;i++) {s += tokens[start + i].value;}return s;}function getLastPosition(content,line,column,colOffset){return typeof content === 'string'?getLastPositionForString(content,line,column,colOffset):getLastPositionForArray(content,line,column,colOffset);}function getLastPositionForString(content,line,column,colOffset){var position=[];if(!content){position = [line,column];if(colOffset)position[1] += colOffset - 1;return position;}var lastLinebreak=content.lastIndexOf('\n');var endsWithLinebreak=lastLinebreak === content.length - 1;var splitContent=content.split('\n');var linebreaksCount=splitContent.length - 1;var prevLinebreak=linebreaksCount === 0 || linebreaksCount === 1?-1:content.length - splitContent[linebreaksCount - 1].length - 2; // Line:
	var offset=endsWithLinebreak?linebreaksCount - 1:linebreaksCount;position[0] = line + offset; // Column:
	if(endsWithLinebreak){offset = prevLinebreak !== -1?content.length - prevLinebreak:content.length - 1;}else {offset = linebreaksCount !== 0?content.length - lastLinebreak - column - 1:content.length - 1;}position[1] = column + offset;if(!colOffset)return position;if(endsWithLinebreak){position[0]++;position[1] = colOffset;}else {position[1] += colOffset;}return position;}function getLastPositionForArray(content,line,column,colOffset){var position;if(content.length === 0){position = [line,column];}else {var c=content[content.length - 1];if(c.hasOwnProperty('end')){position = [c.end.line,c.end.column];}else {position = getLastPosition(c.content,line,column);}}if(!colOffset)return position;if(tokens[pos - 1].type !== 'Newline'){position[1] += colOffset;}else {position[0]++;position[1] = 1;}return position;}function newNode(type,content,line,column,end){if(!end)end = getLastPosition(content,line,column);return new Node({type:type,content:content,start:{line:line,column:column},end:{line:end[0],column:end[1]},syntax:'sass'});} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkAny(i){var l;if(l = checkBrackets(i))tokens[i].any_child = 1;else if(l = checkParentheses(i))tokens[i].any_child = 2;else if(l = checkString(i))tokens[i].any_child = 3;else if(l = checkVariablesList(i))tokens[i].any_child = 4;else if(l = checkVariable(i))tokens[i].any_child = 5;else if(l = checkPlaceholder(i))tokens[i].any_child = 6;else if(l = checkPercentage(i))tokens[i].any_child = 7;else if(l = checkDimension(i))tokens[i].any_child = 8;else if(l = checkNumber(i))tokens[i].any_child = 9;else if(l = checkUri(i))tokens[i].any_child = 10;else if(l = checkExpression(i))tokens[i].any_child = 11;else if(l = checkFunction(i))tokens[i].any_child = 12;else if(l = checkInterpolation(i))tokens[i].any_child = 13;else if(l = checkIdent(i))tokens[i].any_child = 14;else if(l = checkClass(i))tokens[i].any_child = 15;else if(l = checkUnary(i))tokens[i].any_child = 16;return l;} /**
	 * @returns {Array}
	 */function getAny(){var childType=tokens[pos].any_child;if(childType === 1)return getBrackets();else if(childType === 2)return getParentheses();else if(childType === 3)return getString();else if(childType === 4)return getVariablesList();else if(childType === 5)return getVariable();else if(childType === 6)return getPlaceholder();else if(childType === 7)return getPercentage();else if(childType === 8)return getDimension();else if(childType === 9)return getNumber();else if(childType === 10)return getUri();else if(childType === 11)return getExpression();else if(childType === 12)return getFunction();else if(childType === 13)return getInterpolation();else if(childType === 14)return getIdent();else if(childType === 15)return getClass();else if(childType === 16)return getUnary();} /**
	 * Check if token is part of mixin's arguments.
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of arguments
	 */function checkArguments(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;i++;while(i < tokens[start].right) {if(l = checkArgument(i))i += l;else return 0;}return tokens[start].right - start + 1;} /**
	 * Check if token is valid to be part of arguments list
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of argument
	 */function checkArgument(i){var l;if(l = checkBrackets(i))tokens[i].argument_child = 1;else if(l = checkParentheses(i))tokens[i].argument_child = 2;else if(l = checkDeclaration(i))tokens[i].argument_child = 3;else if(l = checkFunction(i))tokens[i].argument_child = 4;else if(l = checkVariablesList(i))tokens[i].argument_child = 5;else if(l = checkVariable(i))tokens[i].argument_child = 6;else if(l = checkSC(i))tokens[i].argument_child = 7;else if(l = checkDelim(i))tokens[i].argument_child = 8;else if(l = checkDeclDelim(i))tokens[i].argument_child = 9;else if(l = checkString(i))tokens[i].argument_child = 10;else if(l = checkPercentage(i))tokens[i].argument_child = 11;else if(l = checkDimension(i))tokens[i].argument_child = 12;else if(l = checkNumber(i))tokens[i].argument_child = 13;else if(l = checkUri(i))tokens[i].argument_child = 14;else if(l = checkInterpolation(i))tokens[i].argument_child = 15;else if(l = checkIdent(i))tokens[i].argument_child = 16;else if(l = checkVhash(i))tokens[i].argument_child = 17;else if(l = checkOperator(i))tokens[i].argument_child = 18;else if(l = checkUnary(i))tokens[i].argument_child = 19;return l;} /**
	 * @returns {Array} Node that is part of arguments list
	 */function getArgument(){var childType=tokens[pos].argument_child;if(childType === 1)return getBrackets();else if(childType === 2)return getParentheses();else if(childType === 3)return getDeclaration();else if(childType === 4)return getFunction();else if(childType === 5)return getVariablesList();else if(childType === 6)return getVariable();else if(childType === 7)return getSC();else if(childType === 8)return getDelim();else if(childType === 9)return getDeclDelim();else if(childType === 10)return getString();else if(childType === 11)return getPercentage();else if(childType === 12)return getDimension();else if(childType === 13)return getNumber();else if(childType === 14)return getUri();else if(childType === 15)return getInterpolation();else if(childType === 16)return getIdent();else if(childType === 17)return getVhash();else if(childType === 18)return getOperator();else if(childType === 19)return getUnary();} /**
	 * Check if token is part of an @-word (e.g. `@import`, `@include`)
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkAtkeyword(i){var l; // Check that token is `@`:
	if(i >= tokensLength || tokens[i++].type !== TokenType.CommercialAt)return 0;return (l = checkIdentOrInterpolation(i))?l + 1:0;} /**
	 * Get node with @-word
	 * @returns {Array} `['atkeyword', ['ident', x]]` where `x` is
	 *      an identifier without
	 *      `@` (e.g. `import`, `include`)
	 */function getAtkeyword(){var startPos=pos++;var x=getIdentOrInterpolation();var token=tokens[startPos];return newNode(NodeType.AtkeywordType,x,token.ln,token.col);} /**
	 * Check if token is a part of an @-rule
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of @-rule
	 */function checkAtrule(i){var l;if(i >= tokensLength)return 0; // If token already has a record of being part of an @-rule,
	// return the @-rule's length:
	if(tokens[i].atrule_l !== undefined)return tokens[i].atrule_l; // If token is part of an @-rule, save the rule's type to token:
	if(l = checkKeyframesRule(i))tokens[i].atrule_type = 4;else if(l = checkAtruler(i))tokens[i].atrule_type = 1; // @-rule with ruleset
	else if(l = checkAtruleb(i))tokens[i].atrule_type = 2; // Block @-rule
	else if(l = checkAtrules(i))tokens[i].atrule_type = 3; // Single-line @-rule
	else return 0; // If token is part of an @-rule, save the rule's length to token:
	tokens[i].atrule_l = l;return l;} /**
	 * Get node with @-rule
	 * @returns {Array}
	 */function getAtrule(){switch(tokens[pos].atrule_type){case 1:return getAtruler(); // @-rule with ruleset
	case 2:return getAtruleb(); // Block @-rule
	case 3:return getAtrules(); // Single-line @-rule
	case 4:return getKeyframesRule();}} /**
	 * Check if token is part of a block @-rule
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the @-rule
	 */function checkAtruleb(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(l = checkTsets(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with a block @-rule
	 * @returns {Array} `['atruleb', ['atkeyword', x], y, ['block', z]]`
	 */function getAtruleb(){var startPos=pos;var x=undefined;x = [getAtkeyword()].concat(getTsets()).concat([getBlock()]);var token=tokens[startPos];return newNode(NodeType.AtruleType,x,token.ln,token.col);} /**
	 * Check if token is part of an @-rule with ruleset
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the @-rule
	 */function checkAtruler(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(l = checkTsets(i))i += l;if(l = checkAtrulers(i))i += l;else return 0;return i - start;} /**
	 * Get node with an @-rule with ruleset
	 * @returns {Array} ['atruler', ['atkeyword', x], y, z]
	 */function getAtruler(){var startPos=pos;var x=undefined;x = [getAtkeyword()].concat(getTsets());x.push(getAtrulers());var token=tokens[startPos];return newNode(NodeType.AtruleType,x,token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkAtrulers(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(!tokens[i].block_end)return 0;if(l = checkSC(i))i += l;if(l = checkRuleset(i) || checkAtrule(i))i += l;else return 0;while(l = checkRuleset(i) || checkAtrule(i) || checkSC(i)) {i += l;}if(i < tokensLength)tokens[i].atrulers_end = 1;return i - start;} /**
	 * @returns {Array} `['atrulers', x]`
	 */function getAtrulers(){var startPos=pos;var token=tokens[startPos];var line=token.ln;var column=token.col;var x=getSC();while(pos < tokensLength && !tokens[pos].atrulers_end) {if(checkSC(pos))x = x.concat(getSC());else if(checkAtrule(pos))x.push(getAtrule());else if(checkRuleset(pos))x.push(getRuleset());}var end=getLastPosition(x,line,column);return newNode(NodeType.BlockType,x,token.ln,token.col,end);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkAtrules(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(l = checkTsets(i))i += l;return i - start;} /**
	 * @returns {Array} `['atrules', ['atkeyword', x], y]`
	 */function getAtrules(){var startPos=pos;var x=undefined;x = [getAtkeyword()].concat(getTsets());var token=tokens[startPos];return newNode(NodeType.AtruleType,x,token.ln,token.col);} /**
	 * Check if token is part of a block (e.g. `{...}`).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the block
	 */function checkBlock(i){return i < tokensLength && tokens[i].block_end?tokens[i].block_end - i + 1:0;} /**
	 * Get node with a block
	 * @returns {Array} `['block', x]`
	 */function getBlock(){var startPos=pos;var end=tokens[pos].block_end;var x=[];var token=tokens[startPos];while(pos < end) {if(checkBlockdecl(pos))x = x.concat(getBlockdecl());else throwError();}return newNode(NodeType.BlockType,x,token.ln,token.col);} /**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the declaration
	 */function checkBlockdecl(i){var l;if(i >= tokensLength)return 0;if(l = checkBlockdecl7(i))tokens[i].bd_type = 7;else if(l = checkBlockdecl5(i))tokens[i].bd_type = 5;else if(l = checkBlockdecl6(i))tokens[i].bd_type = 6;else if(l = checkBlockdecl1(i))tokens[i].bd_type = 1;else if(l = checkBlockdecl2(i))tokens[i].bd_type = 2;else if(l = checkBlockdecl3(i))tokens[i].bd_type = 3;else if(l = checkBlockdecl4(i))tokens[i].bd_type = 4;else return 0;return l;} /**
	 * @returns {Array}
	 */function getBlockdecl(){switch(tokens[pos].bd_type){case 1:return getBlockdecl1();case 2:return getBlockdecl2();case 3:return getBlockdecl3();case 4:return getBlockdecl4();case 5:return getBlockdecl5();case 6:return getBlockdecl6();case 7:return getBlockdecl7();}} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBlockdecl1(i){var start=i;var l=undefined;if(l = checkInclude(i))tokens[i].bd_kind = 2;else if(l = checkDeclaration(i))tokens[i].bd_kind = 5;else if(l = checkAtrule(i))tokens[i].bd_kind = 6;else return 0;i += l;if(tokens[start].bd_kind === 2 && [2,4,6,8].indexOf(tokens[start].include_type) === -1)return 0;if(tokens[start].bd_kind === 6 && tokens[start].atrule_type === 3)return 0;while(i < tokensLength) {if(l = checkDeclDelim(i))return i + l - start;if(l = checkS(i))i += l;else if(l = checkCommentSL(i))i += l;else break;}return 0;} /**
	 * @returns {Array}
	 */function getBlockdecl1(){var x=[];var _x=[];var kind=tokens[pos].bd_kind;switch(kind){case 2:x.push(getInclude());break;case 5:x.push(getDeclaration());break;case 6:x.push(getAtrule());break;}while(pos < tokensLength) {var _pos=pos;if(checkDeclDelim(pos)){_x.push(getDeclDelim());x = x.concat(_x);break;}if(checkS(pos))_x.push(getS());else if(checkCommentSL(pos))_x.push(getCommentSL());else {pos = _pos;break;}}return x;} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBlockdecl2(i){var start=i;var l=undefined;if(l = checkConditionalStatement(i))tokens[i].bd_kind = 1;else if(l = checkInclude(i))tokens[i].bd_kind = 2;else if(l = checkExtend(i))tokens[i].bd_kind = 4;else if(l = checkMixin(i))tokens[i].bd_kind = 8;else if(l = checkLoop(i))tokens[i].bd_kind = 3;else if(l = checkRuleset(i))tokens[i].bd_kind = 7;else if(l = checkDeclaration(i))tokens[i].bd_kind = 5;else if(l = checkAtrule(i))tokens[i].bd_kind = 6;else return 0;i += l;while(i < tokensLength) {if(l = checkS(i))i += l;else if(l = checkCommentSL(i))i += l;else break;}return i - start;} /**
	 * @returns {Array}
	 */function getBlockdecl2(){var x=[];switch(tokens[pos].bd_kind){case 1:x.push(getConditionalStatement());break;case 2:x.push(getInclude());break;case 3:x.push(getLoop());break;case 4:x.push(getExtend());break;case 5:x.push(getDeclaration());break;case 6:x.push(getAtrule());break;case 7:x.push(getRuleset());break;case 8:x.push(getMixin());break;}while(pos < tokensLength) {if(checkS(pos))x.push(getS());else if(checkCommentSL(pos))x.push(getCommentSL());else break;}return x;} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBlockdecl3(i){var start=i;var l=undefined;if(l = checkConditionalStatement(i))tokens[i].bd_kind = 1;else if(l = checkInclude(i))tokens[i].bd_kind = 2;else if(l = checkExtend(i))tokens[i].bd_kind = 4;else if(l = checkLoop(i))tokens[i].bd_kind = 3;else if(l = checkRuleset(i))tokens[i].bd_kind = 7;else if(l = checkDeclaration(i))tokens[i].bd_kind = 5;else if(l = checkAtrule(i))tokens[i].bd_kind = 6;else return 0;i += l;return i - start;} /**
	 * @returns {Array}
	 */function getBlockdecl3(){var x=undefined;switch(tokens[pos].bd_kind){case 1:x = getConditionalStatement();break;case 2:x = getInclude();break;case 3:x = getLoop();break;case 4:x = getExtend();break;case 5:x = getDeclaration();break;case 6:x = getAtrule();break;case 7:x = getRuleset();break;}return [x];} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBlockdecl4(i){return checkSC(i);} /**
	 * @returns {Array}
	 */function getBlockdecl4(){return getSC();} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBlockdecl5(i){var start=i;var l=undefined;if(l = checkInclude(i))i += l;else if(l = checkRuleset(i))i += l;else return 0;while(i < tokensLength) {if(l = checkS(i))i += l;else if(l = checkCommentSL(i))i += l;else break;}return i - start;} /**
	 * @returns {Array}
	 */function getBlockdecl5(){var x=[];if(checkInclude(pos))x.push(getInclude());else x.push(getRuleset());while(pos < tokensLength) {if(checkS(pos))x.push(getS());else if(checkCommentSL(pos))x.push(getCommentSL());else break;}return x;} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBlockdecl6(i){var start=i;var l=undefined;if(l = checkInclude(i))i += l;else if(l = checkRuleset(i))i += l;else return 0;return i - start;} /**
	 * @returns {Array}
	 */function getBlockdecl6(){var x=undefined;if(checkInclude(pos))x = getInclude();else x = getRuleset();return [x];} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBlockdecl7(i){var start=i;var l=undefined;if(l = checkInclude(i))i += l;else return 0;if([2,4,6,8].indexOf(tokens[start].include_type) === -1)return 0;while(i < tokensLength) {if(l = checkDeclDelim(i))return i + l - start;if(l = checkS(i))i += l;else if(l = checkCommentSL(i))i += l;else break;}return 0;} /**
	 * @returns {Array}
	 */function getBlockdecl7(){var x=[];var _x=[];x.push(getInclude());while(pos < tokensLength) {var _pos=pos;if(checkDeclDelim(pos)){_x.push(getDeclDelim());x = x.concat(_x);break;}if(checkS(pos))_x.push(getS());else if(checkCommentSL(pos))_x.push(getCommentSL());else {pos = _pos;break;}}return x;} /**
	 * Check if token is part of text inside square brackets, e.g. `[1]`
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBrackets(i){if(i >= tokensLength || tokens[i].type !== TokenType.LeftSquareBracket)return 0;return tokens[i].right - i + 1;} /**
	 * Get node with text inside square brackets, e.g. `[1]`
	 * @returns {Node}
	 */function getBrackets(){var startPos=pos;var token=tokens[startPos];var line=token.ln;var column=token.col;pos++;var tsets=getTsets();var end=getLastPosition(tsets,line,column,1);pos++;return newNode(NodeType.BracketsType,tsets,token.ln,token.col,end);} /**
	 * Check if token is part of a class selector (e.g. `.abc`)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the class selector
	 */function checkClass(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(tokens[i].class_l)return tokens[i].class_l;if(tokens[i++].type !== TokenType.FullStop)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;} /**
	 * Get node with a class selector
	 * @returns {Array} `['class', ['ident', x]]` where x is a class's
	 *      identifier (without `.`, e.g. `abc`).
	 */function getClass(){var startPos=pos++;var x=getIdentOrInterpolation();var token=tokens[startPos];return newNode(NodeType.ClassType,x,token.ln,token.col);}function checkCombinator(i){if(i >= tokensLength)return 0;var l=undefined;if(l = checkCombinator1(i))tokens[i].combinatorType = 1;else if(l = checkCombinator2(i))tokens[i].combinatorType = 2;else if(l = checkCombinator3(i))tokens[i].combinatorType = 3;return l;}function getCombinator(){var type=tokens[pos].combinatorType;if(type === 1)return getCombinator1();if(type === 2)return getCombinator2();if(type === 3)return getCombinator3();} /**
	 * (1) `||`
	 */function checkCombinator1(i){if(tokens[i].type === TokenType.VerticalLine && tokens[i + 1].type === TokenType.VerticalLine)return 2;else return 0;}function getCombinator1(){var type=NodeType.CombinatorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content='||';pos += 2;return newNode(type,content,line,column);} /**
	 * (1) `>`
	 * (2) `+`
	 * (3) `~`
	 */function checkCombinator2(i){var type=tokens[i].type;if(type === TokenType.PlusSign || type === TokenType.GreaterThanSign || type === TokenType.Tilde)return 1;else return 0;}function getCombinator2(){var type=NodeType.CombinatorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=tokens[pos++].value;return newNode(type,content,line,column);} /**
	 * (1) `/panda/`
	 */function checkCombinator3(i){var start=i;if(tokens[i].type === TokenType.Solidus)i++;else return 0;var l=undefined;if(l = checkIdent(i))i += l;else return 0;if(tokens[i].type === TokenType.Solidus)i++;else return 0;return i - start;}function getCombinator3(){var type=NodeType.CombinatorType;var token=tokens[pos];var line=token.ln;var column=token.col; // Skip `/`.
	pos++;var ident=getIdent(); // Skip `/`.
	pos++;var content='/' + ident.content + '/';return newNode(type,content,line,column);} /**
	 * Check if token is a multiline comment.
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a multiline comment, otherwise `0`
	 */function checkCommentML(i){return i < tokensLength && tokens[i].type === TokenType.CommentML?1:0;} /**
	 * Get node with a multiline comment
	 * @returns {Array} `['commentML', x]` where `x`
	 *      is the comment's text (without `/*` and `* /`).
	 */function getCommentML(){var startPos=pos;var x=tokens[pos].value.substring(2);var token=tokens[startPos];var line=token.ln;var column=token.col;var end=getLastPosition(x,line,column + 2);pos++;return newNode(NodeType.CommentMLType,x,token.ln,token.col,end);} /**
	 * Check if token is part of a single-line comment.
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a single-line comment, otherwise `0`
	 */function checkCommentSL(i){return i < tokensLength && tokens[i].type === TokenType.CommentSL?1:0;} /**
	 * Get node with a single-line comment.
	 * @returns {Array} `['commentSL', x]` where `x` is comment's message
	 *      (without `//`)
	 */function getCommentSL(){var startPos=pos;var token=tokens[startPos];var line=token.ln;var column=token.col;var x=tokens[pos++].value.substring(2);var end=!x?[line,column + 1]:getLastPosition(x,line,column + 2);return newNode(NodeType.CommentSLType,x,token.ln,token.col,end);} /**
	 * Check if token is part of a condition
	 * (e.g. `@if ...`, `@else if ...` or `@else ...`).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the condition
	 */function checkCondition(i){var start=i;var l=undefined;var _i=undefined;var s=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(['if','else'].indexOf(tokens[start + 1].value) < 0)return 0;while(i < tokensLength) {if(l = checkBlock(i))break;s = checkSC(i);_i = i + s;if(l = _checkCondition(_i))i += l + s;else break;}return i - start;}function _checkCondition(i){return checkVariable(i) || checkNumber(i) || checkInterpolation(i) || checkIdent(i) || checkOperator(i) || checkCombinator(i) || checkString(i);} /**
	 * Get node with a condition.
	 * @returns {Array} `['condition', x]`
	 */function getCondition(){var startPos=pos;var x=[getAtkeyword()];while(pos < tokensLength) {if(checkBlock(pos))break;var s=checkSC(pos);var _pos=pos + s;if(!_checkCondition(_pos))break;if(s)x = x.concat(getSC());x.push(_getCondition());}var token=tokens[startPos];return newNode(NodeType.ConditionType,x,token.ln,token.col);}function _getCondition(){if(checkVariable(pos))return getVariable();if(checkNumber(pos))return getNumber();if(checkInterpolation(pos))return getInterpolation();if(checkIdent(pos))return getIdent();if(checkOperator(pos))return getOperator();if(checkCombinator(pos))return getCombinator();if(checkString(pos))return getString();} /**
	 * Check if token is part of a conditional statement
	 * (e.g. `@if ... {} @else if ... {} @else ... {}`).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the condition
	 */function checkConditionalStatement(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkCondition(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with a condition.
	 * @returns {Array} `['condition', x]`
	 */function getConditionalStatement(){var startPos=pos;var x=[];x.push(getCondition());x = x.concat(getSC());x.push(getBlock());var token=tokens[startPos];return newNode(NodeType.ConditionalStatementType,x,token.ln,token.col);} /**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the declaration
	 */function checkDeclaration(i){return checkDeclaration1(i) || checkDeclaration2(i);} /**
	 * Get node with a declaration
	 * @returns {Array} `['declaration', ['property', x], ['propertyDelim'],
	 *       ['value', y]]`
	 */function getDeclaration(){return checkDeclaration1(pos)?getDeclaration1():getDeclaration2();} /**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the declaration
	 */function checkDeclaration1(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkProperty(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkPropertyDelim(i))i++;else return 0;if(l = checkValue(i))return i + l - start;if(l = checkS(i))i += l;if(l = checkValue(i))i += l;else return 0;return i - start;} /**
	 * Get node with a declaration
	 * @returns {Array} `['declaration', ['property', x], ['propertyDelim'],
	 *       ['value', y]]`
	 */function getDeclaration1(){var startPos=pos;var x=[];x.push(getProperty());if(checkS(pos))x.push(getS());x.push(getPropertyDelim());if(checkS(pos))x.push(getS());x.push(getValue());var token=tokens[startPos];return newNode(NodeType.DeclarationType,x,token.ln,token.col);} /**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the declaration
	 */function checkDeclaration2(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkPropertyDelim(i))i++;else return 0;if(l = checkProperty(i))i += l;else return 0;if(l = checkValue(i))return i + l - start;if(l = checkSC(i))i += l;if(l = checkValue(i))i += l;else return 0;return i - start;} /**
	 * Get node with a declaration
	 * @returns {Array} `['declaration', ['propertyDelim'], ['property', x],
	 *       ['value', y]]`
	 */function getDeclaration2(){var startPos=pos;var x=[];x.push(getPropertyDelim());x.push(getProperty());x = x.concat(getSC());x.push(getValue());var token=tokens[startPos];return newNode(NodeType.DeclarationType,x,token.ln,token.col);} /**
	 * Check if token is a semicolon
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a semicolon, otherwise `0`
	 */function checkDeclDelim(i){if(i >= tokensLength)return 0;return tokens[i].type === TokenType.Newline || tokens[i].type === TokenType.Semicolon?1:0;} /**
	 * Get node with a semicolon
	 * @returns {Array} `['declDelim']`
	 */function getDeclDelim(){var startPos=pos++;var token=tokens[startPos];return newNode(NodeType.DeclDelimType,'\n',token.ln,token.col);} /**
	 * Check if token if part of `!default` word.
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the `!default` word
	 */function checkDefault(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i++].type !== TokenType.ExclamationMark)return 0;if(l = checkSC(i))i += l;if(tokens[i].value === 'default'){tokens[start].defaultEnd = i;return i - start + 1;}else {return 0;}} /**
	 * Get node with a `!default` word
	 * @returns {Array} `['default', sc]` where `sc` is optional whitespace
	 */function getDefault(){var token=tokens[pos];var line=token.ln;var column=token.col;var content=joinValues(pos,token.defaultEnd);pos = token.defaultEnd + 1;return newNode(NodeType.DefaultType,content,line,column);} /**
	 * Check if token is a comma
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a comma, otherwise `0`
	 */function checkDelim(i){return i < tokensLength && tokens[i].type === TokenType.Comma?1:0;} /**
	 * Get node with a comma
	 * @returns {Array} `['delim']`
	 */function getDelim(){var startPos=pos++;var token=tokens[startPos];return newNode(NodeType.DelimType,',',token.ln,token.col);} /**
	 * Check if token is part of a number with dimension unit (e.g. `10px`)
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkDimension(i){var ln=checkNumber(i);var li=undefined;if(i >= tokensLength || !ln || i + ln >= tokensLength)return 0;return (li = checkNmName2(i + ln))?ln + li:0;} /**
	 * Get node of a number with dimension unit
	 * @returns {Array} `['dimension', ['number', x], ['ident', y]]` where
	 *      `x` is a number converted to string (e.g. `'10'`) and `y` is
	 *      a dimension unit (e.g. `'px'`).
	 */function getDimension(){var startPos=pos;var x=[getNumber()];var token=tokens[pos];var ident=newNode(NodeType.IdentType,getNmName2(),token.ln,token.col);x.push(ident);token = tokens[startPos];return newNode(NodeType.DimensionType,x,token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkExpression(i){var start=i;if(i >= tokensLength || tokens[i++].value !== 'expression' || i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;return tokens[i].right - start + 1;} /**
	 * @returns {Array}
	 */function getExpression(){var startPos=pos;var x=undefined;var token=tokens[startPos];var line=token.ln;var column=token.col;pos++;x = joinValues(pos + 1,tokens[pos].right - 1);var end=getLastPosition(x,line,column,1);if(end[0] === line)end[1] += 11;pos = tokens[pos].right + 1;return newNode(NodeType.ExpressionType,x,token.ln,token.col,end);}function checkExtend(i){var l=0;if(l = checkExtend1(i))tokens[i].extend_child = 1;else if(l = checkExtend2(i))tokens[i].extend_child = 2;return l;}function getExtend(){var type=tokens[pos].extend_child;if(type === 1)return getExtend1();else if(type === 2)return getExtend2();} /**
	 * Checks if token is part of an extend with `!optional` flag.
	 * @param {Number} i
	 */function checkExtend1(i){var start=i;var l;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'extend')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkSelectorsGroup(i))i += l;else return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkOptional(i))i += l;else return 0;return i - start;}function getExtend1(){var startPos=pos;var x=[].concat([getAtkeyword()],getSC(),getSelectorsGroup(),getSC(),getOptional());var token=tokens[startPos];return newNode(NodeType.ExtendType,x,token.ln,token.col);} /**
	 * Checks if token is part of an extend without `!optional` flag.
	 * @param {Number} i
	 */function checkExtend2(i){var start=i;var l;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'extend')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkSelectorsGroup(i))i += l;else return 0;return i - start;}function getExtend2(){var startPos=pos;var x=[].concat([getAtkeyword()],getSC(),getSelectorsGroup());var token=tokens[startPos];return newNode(NodeType.ExtendType,x,token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkFunction(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i < tokensLength && tokens[i].type === TokenType.LeftParenthesis?tokens[i].right - start + 1:0;} /**
	 * @returns {Array}
	 */function getFunction(){var startPos=pos;var x=getIdentOrInterpolation();var body=undefined;body = getArguments();x.push(body);var token=tokens[startPos];return newNode(NodeType.FunctionType,x,token.ln,token.col);} /**
	 * @returns {Array}
	 */function getArguments(){var startPos=pos;var x=[];var body=undefined;var token=tokens[startPos];var line=token.ln;var column=token.col;pos++;while(pos < tokensLength && tokens[pos].type !== TokenType.RightParenthesis) {if(checkDeclaration(pos))x.push(getDeclaration());else if(checkArgument(pos)){body = getArgument();if(typeof body.content === 'string')x.push(body);else x = x.concat(body);}else if(checkClass(pos))x.push(getClass());else throwError();}var end=getLastPosition(x,line,column,1);pos++;return newNode(NodeType.ArgumentsType,x,token.ln,token.col,end);} /**
	 * Check if token is part of `!global` word
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkGlobal(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i++].type !== TokenType.ExclamationMark)return 0;if(l = checkSC(i))i += l;if(tokens[i].value === 'global'){tokens[start].globalEnd = i;return i - start + 1;}else {return 0;}} /**
	 * Get node with `!global` word
	 */function getGlobal(){var token=tokens[pos];var line=token.ln;var column=token.col;var content=joinValues(pos,token.globalEnd);pos = token.globalEnd + 1;return newNode(NodeType.GlobalType,content,line,column);} /**
	 * Check if token is part of an identifier
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the identifier
	 */function checkIdent(i){var start=i;var wasIdent=undefined;var wasInt=false;var l=undefined;if(i >= tokensLength)return 0; // Check if token is part of an identifier starting with `_`:
	if(tokens[i].type === TokenType.LowLine)return checkIdentLowLine(i);if(tokens[i].type === TokenType.HyphenMinus && tokens[i + 1].type === TokenType.DecimalNumber)return 0; // If token is a character, `-`, `$` or `*`, skip it & continue:
	if(l = _checkIdent(i))i += l;else return 0; // Remember if previous token's type was identifier:
	wasIdent = tokens[i - 1].type === TokenType.Identifier;while(i < tokensLength) {l = _checkIdent(i);if(!l)break;wasIdent = true;i += l;}if(!wasIdent && !wasInt && tokens[start].type !== TokenType.Asterisk)return 0;tokens[start].ident_last = i - 1;return i - start;}function _checkIdent(i){if(tokens[i].type === TokenType.HyphenMinus || tokens[i].type === TokenType.Identifier || tokens[i].type === TokenType.DollarSign || tokens[i].type === TokenType.LowLine || tokens[i].type === TokenType.DecimalNumber || tokens[i].type === TokenType.Asterisk)return 1;return 0;} /**
	 * Check if token is part of an identifier starting with `_`
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the identifier
	 */function checkIdentLowLine(i){var start=i;if(i++ >= tokensLength)return 0;for(;i < tokensLength;i++) {if(tokens[i].type !== TokenType.HyphenMinus && tokens[i].type !== TokenType.DecimalNumber && tokens[i].type !== TokenType.LowLine && tokens[i].type !== TokenType.Identifier)break;} // Save index number of the last token of the identifier:
	tokens[start].ident_last = i - 1;return i - start;} /**
	 * Get node with an identifier
	 * @returns {Array} `['ident', x]` where `x` is identifier's name
	 */function getIdent(){var startPos=pos;var x=joinValues(pos,tokens[pos].ident_last);pos = tokens[pos].ident_last + 1;var token=tokens[startPos];return newNode(NodeType.IdentType,x,token.ln,token.col);}function checkIdentOrInterpolation(i){var start=i;var l=undefined;while(i < tokensLength) {if(l = checkInterpolation(i) || checkIdent(i))i += l;else break;}return i - start;}function getIdentOrInterpolation(){var x=[];while(pos < tokensLength) {if(checkInterpolation(pos))x.push(getInterpolation());else if(checkIdent(pos))x.push(getIdent());else break;}return x;} /**
	 * Check if token is part of `!important` word
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkImportant(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i++].type !== TokenType.ExclamationMark)return 0;if(l = checkSC(i))i += l;if(tokens[i].value === 'important'){tokens[start].importantEnd = i;return i - start + 1;}else {return 0;}} /**
	 * Get node with `!important` word
	 * @returns {Array} `['important', sc]` where `sc` is optional whitespace
	 */function getImportant(){var token=tokens[pos];var line=token.ln;var column=token.col;var content=joinValues(pos,token.importantEnd);pos = token.importantEnd + 1;return newNode(NodeType.ImportantType,content,line,column);} /**
	 * Check if token is part of an included mixin (`@include` or `@extend`
	 *      directive).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the included mixin
	 */function checkInclude(i){var l;if(i >= tokensLength)return 0;if(l = checkInclude1(i))tokens[i].include_type = 1;else if(l = checkInclude2(i))tokens[i].include_type = 2;else if(l = checkInclude3(i))tokens[i].include_type = 3;else if(l = checkInclude4(i))tokens[i].include_type = 4;else if(l = checkInclude5(i))tokens[i].include_type = 5;else if(l = checkInclude6(i))tokens[i].include_type = 6;else if(l = checkInclude7(i))tokens[i].include_type = 7;else if(l = checkInclude8(i))tokens[i].include_type = 8;return l;} /**
	 * Get node with included mixin
	 * @returns {Array} `['include', x]`
	 */function getInclude(){switch(tokens[pos].include_type){case 1:return getInclude1();case 2:return getInclude2();case 3:return getInclude3();case 4:return getInclude4();case 5:return getInclude5();case 6:return getInclude6();case 7:return getInclude7();case 8:return getInclude8();}} /**
	 * Check if token is part of an included mixin like `@include nani(foo) {...}`
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the include
	 */function checkInclude1(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkArguments(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with included mixin like `@include nani(foo) {...}`
	 * @returns {Array} `['include', ['atkeyword', x], sc, ['selector', y], sc,
	 *      ['arguments', z], sc, ['block', q], sc` where `x` is `include` or
	 *      `extend`, `y` is mixin's identifier (selector), `z` are arguments
	 *      passed to the mixin, `q` is block passed to the mixin and `sc`
	 *      are optional whitespaces
	 */function getInclude1(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation(),getSC(),getArguments(),getSC(),getBlock());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an included mixin like `@include nani(foo)`
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the include
	 */function checkInclude2(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkArguments(i))i += l;else return 0;return i - start;} /**
	 * Get node with included mixin like `@include nani(foo)`
	 * @returns {Array} `['include', ['atkeyword', x], sc, ['selector', y], sc,
	 *      ['arguments', z], sc]` where `x` is `include` or `extend`, `y` is
	 *      mixin's identifier (selector), `z` are arguments passed to the
	 *      mixin and `sc` are optional whitespaces
	 */function getInclude2(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation(),getSC(),getArguments());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an included mixin with a content block passed
	 *      as an argument (e.g. `@include nani {...}`)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the mixin
	 */function checkInclude3(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with an included mixin with a content block passed
	 *      as an argument (e.g. `@include nani {...}`)
	 * @returns {Array} `['include', x]`
	 */function getInclude3(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation(),getSC(),getBlock());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkInclude4(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;} /**
	 * @returns {Array} `['include', x]`
	 */function getInclude4(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an included mixin like `+nani(foo) {...}`
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the include
	 */function checkInclude5(i){var start=i;var l=undefined;if(tokens[i].type === TokenType.PlusSign)i++;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkArguments(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with included mixin like `+nani(foo) {...}`
	 * @returns {Array} `['include', ['operator', '+'], ['selector', x], sc,
	 *      ['arguments', y], sc, ['block', z], sc` where `x` is
	 *      mixin's identifier (selector), `y` are arguments passed to the
	 *      mixin, `z` is block passed to mixin and `sc` are optional whitespaces
	 */function getInclude5(){var startPos=pos;var x=[].concat(getOperator(),getIdentOrInterpolation(),getSC(),getArguments(),getSC(),getBlock());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an included mixin like `+nani(foo)`
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the include
	 */function checkInclude6(i){var start=i;var l=undefined;if(tokens[i].type === TokenType.PlusSign)i++;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkArguments(i))i += l;else return 0;return i - start;} /**
	 * Get node with included mixin like `+nani(foo)`
	 * @returns {Array} `['include', ['operator', '+'], ['selector', y], sc,
	 *      ['arguments', z], sc]` where `y` is
	 *      mixin's identifier (selector), `z` are arguments passed to the
	 *      mixin and `sc` are optional whitespaces
	 */function getInclude6(){var startPos=pos;var x=[].concat(getOperator(),getIdentOrInterpolation(),getSC(),getArguments());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an included mixin with a content block passed
	 *      as an argument (e.g. `+nani {...}`)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the mixin
	 */function checkInclude7(i){var start=i;var l=undefined;if(tokens[i].type === TokenType.PlusSign)i++;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with an included mixin with a content block passed
	 *      as an argument (e.g. `+nani {...}`)
	 * @returns {Array} `['include', x]`
	 */function getInclude7(){var startPos=pos;var x=[].concat(getOperator(),getIdentOrInterpolation(),getSC(),getBlock());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkInclude8(i){var start=i;var l=undefined;if(tokens[i].type === TokenType.PlusSign)i++;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;} /**
	 * @returns {Array} `['include', x]`
	 */function getInclude8(){var startPos=pos;var x=[].concat(getOperator(),getIdentOrInterpolation());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an interpolated variable (e.g. `#{$nani}`).
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkInterpolation(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(tokens[i].type !== TokenType.NumberSign || !tokens[i + 1] || tokens[i + 1].type !== TokenType.LeftCurlyBracket)return 0;i += 2;while(tokens[i].type !== TokenType.RightCurlyBracket) {if(l = checkArgument(i))i += l;else return 0;}return tokens[i].type === TokenType.RightCurlyBracket?i - start + 1:0;} /**
	 * Get node with an interpolated variable
	 * @returns {Array} `['interpolation', x]`
	 */function getInterpolation(){var startPos=pos;var x=[];var token=tokens[startPos];var line=token.ln;var column=token.col; // Skip `#{`:
	pos += 2;while(pos < tokensLength && tokens[pos].type !== TokenType.RightCurlyBracket) {var body=getArgument();if(typeof body.content === 'string')x.push(body);else x = x.concat(body);}var end=getLastPosition(x,line,column,1); // Skip `}`:
	pos++;return newNode(NodeType.InterpolationType,x,token.ln,token.col,end);}function checkKeyframesBlock(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkKeyframesSelector(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;}function getKeyframesBlock(){var type=NodeType.RulesetType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[].concat([getKeyframesSelector()],getSC(),[getBlock()]);return newNode(type,content,line,column);}function checkKeyframesBlocks(i){return i < tokensLength && tokens[i].block_end?tokens[i].block_end - i + 1:0;}function getKeyframesBlocks(){var type=NodeType.BlockType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];var keyframesBlocksEnd=token.block_end;while(pos < keyframesBlocksEnd) {if(checkSC(pos))content = content.concat(getSC());else if(checkKeyframesBlock(pos))content.push(getKeyframesBlock());}return newNode(type,content,line,column);} /**
	 * Check if token is part of a @keyframes rule.
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the @keyframes rule
	 */function checkKeyframesRule(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;var atruleName=joinValues2(i - l,l);if(atruleName.indexOf('keyframes') === -1)return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkKeyframesBlocks(i))i += l;else return 0;return i - start;} /**
	 * @return {Node}
	 */function getKeyframesRule(){var type=NodeType.AtruleType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[].concat([getAtkeyword()],getSC(),getIdentOrInterpolation(),getSC(),[getKeyframesBlocks()]);return newNode(type,content,line,column);}function checkKeyframesSelector(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkIdent(i)){ // Valid selectors are only `from` and `to`.
	var selector=joinValues2(i,l);if(selector !== 'from' && selector !== 'to')return 0;i += l;tokens[start].keyframesSelectorType = 1;}else if(l = checkPercentage(i)){i += l;tokens[start].keyframesSelectorType = 2;}else if(l = checkInterpolation(i)){i += l;tokens[start].keyframesSelectorType = 3;}else {return 0;}return i - start;}function getKeyframesSelector(){var keyframesSelectorType=NodeType.KeyframesSelectorType;var selectorType=NodeType.SelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];if(token.keyframesSelectorType === 1){content.push(getIdent());}else if(token.keyframesSelectorType === 2){content.push(getPercentage());}else {content.push(getInterpolation());}var keyframesSelector=newNode(keyframesSelectorType,content,line,column);return newNode(selectorType,[keyframesSelector],line,column);} /**
	 * Check if token is part of a loop.
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the loop
	 */function checkLoop(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(['for','each','while'].indexOf(tokens[start + 1].value) < 0)return 0;while(i < tokensLength) {if(l = checkBlock(i)){i += l;break;}else if(l = checkVariable(i) || checkNumber(i) || checkInterpolation(i) || checkIdent(i) || checkSC(i) || checkOperator(i) || checkCombinator(i) || checkString(i))i += l;else return 0;}return i - start;} /**
	 * Get node with a loop.
	 * @returns {Array} `['loop', x]`
	 */function getLoop(){var startPos=pos;var x=[];x.push(getAtkeyword());while(pos < tokensLength) {if(checkBlock(pos)){x.push(getBlock());break;}else if(checkVariable(pos))x.push(getVariable());else if(checkNumber(pos))x.push(getNumber());else if(checkInterpolation(pos))x.push(getInterpolation());else if(checkIdent(pos))x.push(getIdent());else if(checkOperator(pos))x.push(getOperator());else if(checkCombinator(pos))x.push(getCombinator());else if(checkSC(pos))x = x.concat(getSC());else if(checkString(pos))x.push(getString());}var token=tokens[startPos];return newNode(NodeType.LoopType,x,token.ln,token.col);} /**
	 * Check if token is part of a mixin
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the mixin
	 */function checkMixin(i){return checkMixin1(i) || checkMixin2(i);} /**
	 * Get node with a mixin
	 * @returns {Array} `['mixin', x]`
	 */function getMixin(){return checkMixin1(pos)?getMixin1():getMixin2();} /**
	 * Check if token is part of a mixin
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the mixin
	 */function checkMixin1(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if((l = checkAtkeyword(i)) && tokens[i + 1].value === 'mixin')i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else {if(l = checkArguments(i))i += l;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;}return i - start;} /**
	 * Get node with a mixin
	 * @returns {Array} `['mixin', x]`
	 */function getMixin1(){var startPos=pos;var x=[getAtkeyword()];x = x.concat(getSC());if(checkIdentOrInterpolation(pos))x = x.concat(getIdentOrInterpolation());x = x.concat(getSC());if(checkBlock(pos))x.push(getBlock());else {if(checkArguments(pos))x.push(getArguments());x = x.concat(getSC());x.push(getBlock());}var token=tokens[startPos];return newNode(NodeType.MixinType,x,token.ln,token.col);} /**
	 * Check if token is part of a mixin
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the mixin
	 */function checkMixin2(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(tokens[i].type === TokenType.EqualsSign)i++;else return 0;if(l = checkSC(i))i += l;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else {if(l = checkArguments(i))i += l;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;}return i - start;} /**
	* Get node with a mixin
	* @returns {Array} `['mixin', x]`
	*/function getMixin2(){var startPos=pos;var x=[getOperator()];x = x.concat(getSC());if(checkIdentOrInterpolation(pos))x = x.concat(getIdentOrInterpolation());x = x.concat(getSC());if(checkBlock(pos))x.push(getBlock());else {if(checkArguments(pos))x.push(getArguments());x = x.concat(getSC());x.push(getBlock());}var token=tokens[startPos];return newNode(NodeType.MixinType,x,token.ln,token.col);} /**
	 * Check if token is a namespace sign (`|`)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is `|`, `0` if not
	 */function checkNamespace(i){return i < tokensLength && tokens[i].type === TokenType.VerticalLine?1:0;} /**
	 * Get node with a namespace sign
	 * @returns {Array} `['namespace']`
	 */function getNamespace(){var startPos=pos++;var token=tokens[startPos];return newNode(NodeType.NamespaceType,'|',token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkNmName2(i){if(tokens[i].type === TokenType.Identifier)return 1;else if(tokens[i].type !== TokenType.DecimalNumber)return 0;i++;return i < tokensLength && tokens[i].type === TokenType.Identifier?2:1;} /**
	 * @returns {String}
	 */function getNmName2(){var s=tokens[pos].value;if(tokens[pos++].type === TokenType.DecimalNumber && pos < tokensLength && tokens[pos].type === TokenType.Identifier)s += tokens[pos++].value;return s;} /**
	 * Check if token is part of a number
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of number
	 */function checkNumber(i){if(i >= tokensLength)return 0;if(tokens[i].number_l)return tokens[i].number_l; // `10`:
	if(i < tokensLength && tokens[i].type === TokenType.DecimalNumber && (!tokens[i + 1] || tokens[i + 1] && tokens[i + 1].type !== TokenType.FullStop))return tokens[i].number_l = 1,tokens[i].number_l; // `10.`:
	if(i < tokensLength && tokens[i].type === TokenType.DecimalNumber && tokens[i + 1] && tokens[i + 1].type === TokenType.FullStop && (!tokens[i + 2] || tokens[i + 2].type !== TokenType.DecimalNumber))return tokens[i].number_l = 2,tokens[i].number_l; // `.10`:
	if(i < tokensLength && tokens[i].type === TokenType.FullStop && tokens[i + 1].type === TokenType.DecimalNumber)return tokens[i].number_l = 2,tokens[i].number_l; // `10.10`:
	if(i < tokensLength && tokens[i].type === TokenType.DecimalNumber && tokens[i + 1] && tokens[i + 1].type === TokenType.FullStop && tokens[i + 2] && tokens[i + 2].type === TokenType.DecimalNumber)return tokens[i].number_l = 3,tokens[i].number_l;return 0;} /**
	 * Get node with number
	 * @returns {Array} `['number', x]` where `x` is a number converted
	 *      to string.
	 */function getNumber(){var s='';var startPos=pos;var l=tokens[pos].number_l;for(var j=0;j < l;j++) {s += tokens[pos + j].value;}pos += l;var token=tokens[startPos];return newNode(NodeType.NumberType,s,token.ln,token.col);} /**
	 * Check if token is an operator (`/`, `,`, `:` or `=`).
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is an operator, otherwise `0`
	 */function checkOperator(i){if(i >= tokensLength)return 0;switch(tokens[i].type){case TokenType.Solidus:case TokenType.Comma:case TokenType.Colon:case TokenType.EqualsSign:case TokenType.EqualitySign:case TokenType.InequalitySign:case TokenType.LessThanSign:case TokenType.GreaterThanSign:case TokenType.Asterisk:return 1;}return 0;} /**
	 * Get node with an operator
	 * @returns {Array} `['operator', x]` where `x` is an operator converted
	 *      to string.
	 */function getOperator(){var startPos=pos;var x=tokens[pos++].value;var token=tokens[startPos];return newNode(NodeType.OperatorType,x,token.ln,token.col);} /**
	 * Check if token is part of `!optional` word
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkOptional(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i++].type !== TokenType.ExclamationMark)return 0;if(l = checkSC(i))i += l;if(tokens[i].value === 'optional'){tokens[start].optionalEnd = i;return i - start + 1;}else {return 0;}} /**
	 * Get node with `!optional` word
	 */function getOptional(){var token=tokens[pos];var line=token.ln;var column=token.col;var content=joinValues(pos,token.optionalEnd);pos = token.optionalEnd + 1;return newNode(NodeType.OptionalType,content,line,column);} /**
	 * Check if token is part of text inside parentheses, e.g. `(1)`
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */function checkParentheses(i){if(i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;return tokens[i].right - i + 1;} /**
	 * Get node with text inside parentheses, e.g. `(1)`
	 * @return {Node}
	 */function getParentheses(){var type=NodeType.ParenthesesType;var token=tokens[pos];var line=token.ln;var column=token.col;pos++;var tsets=getTsets();var end=getLastPosition(tsets,line,column,1);pos++;return newNode(type,tsets,line,column,end);} /**
	 * Check if token is a parent selector (`&`).
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkParentSelector(i){return i < tokensLength && tokens[i].type === TokenType.Ampersand?1:0;} /**
	 * Get node with a parent selector
	 * @returns {Array} `['parentSelector']`
	 */function getParentSelector(){var startPos=pos++;var token=tokens[startPos];return newNode(NodeType.ParentSelectorType,'&',token.ln,token.col);}function checkParentSelectorExtension(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;while(i < tokensLength) {if(l = checkNumber(i) || checkIdentOrInterpolation(i))i += l;else break;}return i - start;}function getParentSelectorExtension(){var type=NodeType.ParentSelectorExtensionType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];while(pos < tokensLength) {if(checkNumber(pos))content.push(getNumber());else if(checkIdentOrInterpolation(pos))content = content.concat(getIdentOrInterpolation());else break;}return newNode(type,content,line,column);}function checkParentSelectorWithExtension(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkParentSelector(i))i += l;else return 0;if(l = checkParentSelectorExtension(i))i += l;return i - start;}function getParentSelectorWithExtension(){var content=[getParentSelector()];if(checkParentSelectorExtension(pos))content.push(getParentSelectorExtension());return content;} /**
	 * Check if token is part of a number with percent sign (e.g. `10%`)
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkPercentage(i){var x;if(i >= tokensLength)return 0;x = checkNumber(i);if(!x || i + x >= tokensLength)return 0;return tokens[i + x].type === TokenType.PercentSign?x + 1:0;} /**
	 * Get node of number with percent sign
	 * @returns {Array} `['percentage', ['number', x]]` where `x` is a number
	 *      (without percent sign) converted to string.
	 */function getPercentage(){var startPos=pos;var x=[getNumber()];var token=tokens[startPos];var line=token.ln;var column=token.col;var end=getLastPosition(x,line,column,1);pos++;return newNode(NodeType.PercentageType,x,token.ln,token.col,end);} /**
	 * Check if token is part of a placeholder selector (e.g. `%abc`).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the selector
	 */function checkPlaceholder(i){var l;if(i >= tokensLength)return 0;if(tokens[i].placeholder_l)return tokens[i].placeholder_l;if(tokens[i].type === TokenType.PercentSign && (l = checkIdentOrInterpolation(i + 1))){tokens[i].placeholder_l = l + 1;return l + 1;}else return 0;} /**
	 * Get node with a placeholder selector
	 * @returns {Array} `['placeholder', ['ident', x]]` where x is a placeholder's
	 *      identifier (without `%`, e.g. `abc`).
	 */function getPlaceholder(){var startPos=pos;pos++;var x=getIdentOrInterpolation();var token=tokens[startPos];return newNode(NodeType.PlaceholderType,x,token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkProgid(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(joinValues2(i,6) === 'progid:DXImageTransform.Microsoft.')i += 6;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(tokens[i].type === TokenType.LeftParenthesis){tokens[start].progid_end = tokens[i].right;i = tokens[i].right + 1;}else return 0;return i - start;} /**
	 * @returns {Array}
	 */function getProgid(){var startPos=pos;var progid_end=tokens[pos].progid_end;var x=joinValues(pos,progid_end);pos = progid_end + 1;var token=tokens[startPos];return newNode(NodeType.ProgidType,x,token.ln,token.col);} /**
	 * Check if token is part of a property
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the property
	 */function checkProperty(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkVariable(i) || checkIdentOrInterpolation(i))i += l;else return 0;return i - start;} /**
	 * Get node with a property
	 * @returns {Array} `['property', x]`
	 */function getProperty(){var startPos=pos;var x=[];if(checkVariable(pos)){x.push(getVariable());}else {x = x.concat(getIdentOrInterpolation());}var token=tokens[startPos];return newNode(NodeType.PropertyType,x,token.ln,token.col);} /**
	 * Check if token is a colon
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a colon, otherwise `0`
	 */function checkPropertyDelim(i){return i < tokensLength && tokens[i].type === TokenType.Colon?1:0;} /**
	 * Get node with a colon
	 * @returns {Array} `['propertyDelim']`
	 */function getPropertyDelim(){var startPos=pos++;var token=tokens[startPos];return newNode(NodeType.PropertyDelimType,':',token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkPseudo(i){return checkPseudoe(i) || checkPseudoc(i);} /**
	 * @returns {Array}
	 */function getPseudo(){if(checkPseudoe(pos))return getPseudoe();if(checkPseudoc(pos))return getPseudoc();} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkPseudoe(i){var l;if(i >= tokensLength || tokens[i++].type !== TokenType.Colon || i >= tokensLength || tokens[i++].type !== TokenType.Colon)return 0;return (l = checkIdentOrInterpolation(i))?l + 2:0;} /**
	 * @returns {Array}
	 */function getPseudoe(){var startPos=pos;pos += 2;var x=getIdentOrInterpolation();var token=tokens[startPos];return newNode(NodeType.PseudoeType,x,token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkPseudoc(i){var l;if(i >= tokensLength || tokens[i].type !== TokenType.Colon)return 0;if(l = checkPseudoClass3(i))tokens[i].pseudoClassType = 3;else if(l = checkPseudoClass4(i))tokens[i].pseudoClassType = 4;else if(l = checkPseudoClass5(i))tokens[i].pseudoClassType = 5;else if(l = checkPseudoClass1(i))tokens[i].pseudoClassType = 1;else if(l = checkPseudoClass2(i))tokens[i].pseudoClassType = 2;else if(l = checkPseudoClass6(i))tokens[i].pseudoClassType = 6;else return 0;return l;} /**
	 * @returns {Array}
	 */function getPseudoc(){var childType=tokens[pos].pseudoClassType;if(childType === 1)return getPseudoClass1();if(childType === 2)return getPseudoClass2();if(childType === 3)return getPseudoClass3();if(childType === 4)return getPseudoClass4();if(childType === 5)return getPseudoClass5();if(childType === 6)return getPseudoClass6();} /**
	 * (-) `:not(panda)`
	 */function checkPseudoClass1(i){var start=i; // Skip `:`.
	i++;if(i >= tokensLength)return 0;var l=undefined;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSelectorsGroup(i))i += l;else return 0;if(i !== right)return 0;return right - start + 1;} /**
	 * (-) `:not(panda)`
	 */function getPseudoClass1(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[]; // Skip `:`.
	pos++;content = content.concat(getIdentOrInterpolation());{var _type=NodeType.ArgumentsType;var _token=tokens[pos];var _line=_token.ln;var _column=_token.col; // Skip `(`.
	pos++;var selectors=getSelectorsGroup();var end=getLastPosition(selectors,_line,_column,1);var args=newNode(_type,selectors,_line,_column,end);content.push(args); // Skip `)`.
	pos++;}return newNode(type,content,line,column);} /**
	 * (1) `:nth-child(odd)`
	 * (2) `:nth-child(even)`
	 * (3) `:lang(de-DE)`
	 */function checkPseudoClass2(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSC(i))i += l;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(i !== right)return 0;return i - start + 1;}function getPseudoClass2(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[]; // Skip `:`.
	pos++;content = content.concat(getIdentOrInterpolation());var l=tokens[pos].ln;var c=tokens[pos].col;var value=[]; // Skip `(`.
	pos++;value = value.concat(getSC()).concat(getIdentOrInterpolation()).concat(getSC());var end=getLastPosition(value,l,c,1);var args=newNode(NodeType.ArgumentsType,value,l,c,end);content.push(args); // Skip `)`.
	pos++;return newNode(type,content,line,column);} /**
	 * (-) `:nth-child(-3n + 2)`
	 */function checkPseudoClass3(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSC(i))i += l;if(l = checkUnary(i))i += l;if(i >= tokensLength)return 0;if(tokens[i].type === TokenType.DecimalNumber)i++;if(i >= tokensLength)return 0;if(tokens[i].value === 'n')i++;else return 0;if(l = checkSC(i))i += l;if(i >= tokensLength)return 0;if(tokens[i].value === '+' || tokens[i].value === '-')i++;else return 0;if(l = checkSC(i))i += l;if(tokens[i].type === TokenType.DecimalNumber)i++;else return 0;if(l = checkSC(i))i += l;if(i !== right)return 0;return i - start + 1;}function getPseudoClass3(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col; // Skip `:`.
	pos++;var content=getIdentOrInterpolation();var l=tokens[pos].ln;var c=tokens[pos].col;var value=[]; // Skip `(`.
	pos++;if(checkUnary(pos))value.push(getUnary());if(checkNumber(pos))value.push(getNumber());{var _l=tokens[pos].ln;var _c=tokens[pos].col;var _content=tokens[pos].value;var ident=newNode(NodeType.IdentType,_content,_l,_c);value.push(ident);pos++;}value = value.concat(getSC());if(checkUnary(pos))value.push(getUnary());value = value.concat(getSC());if(checkNumber(pos))value.push(getNumber());value = value.concat(getSC());var end=getLastPosition(value,l,c,1);var args=newNode(NodeType.ArgumentsType,value,l,c,end);content.push(args); // Skip `)`.
	pos++;return newNode(type,content,line,column);} /**
	 * (-) `:nth-child(-3n)`
	 */function checkPseudoClass4(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength)return 0;if(tokens[i].type !== TokenType.LeftParenthesis)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSC(i))i += l;if(l = checkUnary(i))i += l;if(tokens[i].type === TokenType.DecimalNumber)i++;if(tokens[i].value === 'n')i++;else return 0;if(l = checkSC(i))i += l;if(i !== right)return 0;return i - start + 1;}function getPseudoClass4(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col; // Skip `:`.
	pos++;var content=getIdentOrInterpolation();var l=tokens[pos].ln;var c=tokens[pos].col;var value=[]; // Skip `(`.
	pos++;if(checkUnary(pos))value.push(getUnary());if(checkNumber(pos))value.push(getNumber());if(checkIdent(pos))value.push(getIdent());value = value.concat(getSC());var end=getLastPosition(value,l,c,1);var args=newNode(NodeType.ArgumentsType,value,l,c,end);content.push(args); // Skip `)`.
	pos++;return newNode(type,content,line,column);} /**
	 * (-) `:nth-child(+8)`
	 */function checkPseudoClass5(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength)return 0;if(tokens[i].type !== TokenType.LeftParenthesis)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSC(i))i += l;if(l = checkUnary(i))i += l;if(tokens[i].type === TokenType.DecimalNumber)i++;else return 0;if(l = checkSC(i))i += l;if(i !== right)return 0;return i - start + 1;}function getPseudoClass5(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col; // Skip `:`.
	pos++;var content=getIdentOrInterpolation();var l=tokens[pos].ln;var c=tokens[pos].col;var value=[]; // Skip `(`.
	pos++;if(checkUnary(pos))value.push(getUnary());if(checkNumber(pos))value.push(getNumber());value = value.concat(getSC());var end=getLastPosition(value,l,c,1);var args=newNode(NodeType.ArgumentsType,value,l,c,end);content.push(args); // Skip `)`.
	pos++;return newNode(type,content,line,column);} /**
	 * (-) `:checked`
	 */function checkPseudoClass6(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;}function getPseudoClass6(){var type=NodeType.PseudocType;var token=tokens[pos];var line=token.ln;var column=token.col; // Skip `:`.
	pos++;var content=getIdentOrInterpolation();return newNode(type,content,line,column);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkRuleset(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkSelectorsGroup(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i)){i += l;}else if(l = checkSC(i)){i += l;if(l = checkBlock(i))i += l;else return 0;}else return 0;return i - start;}function getRuleset(){var type=NodeType.RulesetType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];content = content.concat(getSelectorsGroup());content = content.concat(getSC());if(checkBlock(pos)){content.push(getBlock());}else {content = content.concat(getSC(),getBlock());}return newNode(type,content,line,column);} /**
	 * Check if token is marked as a space (if it's a space or a tab
	 *      or a line break).
	 * @param {Number} i
	 * @returns {Number} Number of spaces in a row starting with the given token.
	 */function checkS(i){return i < tokensLength && tokens[i].ws?tokens[i].ws_last - i + 1:0;} /**
	 * Get node with spaces
	 * @returns {Array} `['s', x]` where `x` is a string containing spaces
	 */function getS(){var startPos=pos;var x=joinValues(pos,tokens[pos].ws_last);pos = tokens[pos].ws_last + 1;var token=tokens[startPos];return newNode(NodeType.SType,x,token.ln,token.col);} /**
	 * Check if token is a space or a comment.
	 * @param {Number} i Token's index number
	 * @returns {Number} Number of similar (space or comment) tokens
	 *      in a row starting with the given token.
	 */function checkSC(i){if(!tokens[i])return 0;var l=undefined;var lsc=0;var ln=tokens[i].ln;while(i < tokensLength) {if(tokens[i].ln !== ln)break;if(!(l = checkS(i)) && !(l = checkCommentML(i)) && !(l = checkCommentSL(i)))break;i += l;lsc += l;if(tokens[i] && tokens[i].type === TokenType.Newline)break;}return lsc || 0;} /**
	 * Get node with spaces and comments
	 * @returns {Array} Array containing nodes with spaces (if there are any)
	 *      and nodes with comments (if there are any):
	 *      `[['s', x]*, ['comment', y]*]` where `x` is a string of spaces
	 *      and `y` is a comment's text (without `/*` and `* /`).
	 */function getSC(){var sc=[];var ln=undefined;if(pos >= tokensLength)return sc;ln = tokens[pos].ln;while(pos < tokensLength) {if(tokens[pos].ln !== ln)break;else if(checkS(pos))sc.push(getS());else if(checkCommentML(pos))sc.push(getCommentML());else if(checkCommentSL(pos))sc.push(getCommentSL());else break;if(tokens[pos] && tokens[pos].type === TokenType.Newline)break;}return sc;} /**
	 * Check if token is part of a hexadecimal number (e.g. `#fff`) inside
	 *      a simple selector
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkShash(i){var l;if(i >= tokensLength || tokens[i].type !== TokenType.NumberSign)return 0;return (l = checkIdentOrInterpolation(i + 1))?l + 1:0;} /**
	 * Get node with a hexadecimal number (e.g. `#fff`) inside a simple
	 *      selector
	 * @returns {Array} `['shash', x]` where `x` is a hexadecimal number
	 *      converted to string (without `#`, e.g. `fff`)
	 */function getShash(){var startPos=pos;var token=tokens[startPos];pos++;var x=getIdentOrInterpolation();return newNode(NodeType.ShashType,x,token.ln,token.col);} /**
	 * Check if token is part of a string (text wrapped in quotes)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is part of a string, `0` if not
	 */function checkString(i){return i < tokensLength && (tokens[i].type === TokenType.StringSQ || tokens[i].type === TokenType.StringDQ)?1:0;} /**
	 * Get string's node
	 * @returns {Array} `['string', x]` where `x` is a string (including
	 *      quotes).
	 */function getString(){var startPos=pos;var x=tokens[pos++].value;var token=tokens[startPos];return newNode(NodeType.StringType,x,token.ln,token.col);} /**
	 * Validate stylesheet: it should consist of any number (0 or more) of
	 * rulesets (sets of rules with selectors), @-rules, whitespaces or
	 * comments.
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkStylesheet(i){var start=i;var l=undefined;while(i < tokensLength) {if(l = checkSC(i) || checkDeclaration(i) || checkDeclDelim(i) || checkInclude(i) || checkExtend(i) || checkMixin(i) || checkLoop(i) || checkConditionalStatement(i) || checkAtrule(i) || checkRuleset(i))i += l;else throwError(i);}return i - start;} /**
	 * @returns {Array} `['stylesheet', x]` where `x` is all stylesheet's
	 *      nodes.
	 */function getStylesheet(){var startPos=pos;var x=[];var node;var wasDeclaration=false;while(pos < tokensLength) {if(wasDeclaration && checkDeclDelim(pos))node = getDeclDelim();else if(checkSC(pos))node = getSC();else if(checkRuleset(pos))node = getRuleset();else if(checkInclude(pos))node = getInclude();else if(checkExtend(pos))node = getExtend();else if(checkMixin(pos))node = getMixin();else if(checkLoop(pos))node = getLoop();else if(checkConditionalStatement(pos))node = getConditionalStatement();else if(checkAtrule(pos))node = getAtrule();else if(checkDeclaration(pos))node = getDeclaration();else throwError();wasDeclaration = node.type === NodeType.DeclarationType;if(Array.isArray(node))x = x.concat(node);else x.push(node);}var token=tokens[startPos];return newNode(NodeType.StylesheetType,x,token.ln,token.col);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkTset(i){return checkVhash(i) || checkOperator(i) || checkAny(i) || checkSC(i) || checkInterpolation(i);} /**
	 * @returns {Array}
	 */function getTset(){if(checkVhash(pos))return getVhash();else if(checkOperator(pos))return getOperator();else if(checkAny(pos))return getAny();else if(checkSC(pos))return getSC();else if(checkInterpolation(pos))return getInterpolation();} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkTsets(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;while(tokens[i - 1].type !== TokenType.Newline && (l = checkTset(i))) {i += l;}return i - start;} /**
	 * @returns {Array}
	 */function getTsets(){var x=[];var t=undefined;while(tokens[pos - 1].type !== TokenType.Newline && (t = getTset())) {if(typeof t.content === 'string')x.push(t);else x = x.concat(t);}return x;} /**
	 * Check if token is an unary (arithmetical) sign (`+` or `-`)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is an unary sign, `0` if not
	 */function checkUnary(i){return i < tokensLength && (tokens[i].type === TokenType.HyphenMinus || tokens[i].type === TokenType.PlusSign)?1:0;} /**
	 * Get node with an unary (arithmetical) sign (`+` or `-`)
	 * @returns {Array} `['unary', x]` where `x` is an unary sign
	 *      converted to string.
	 */function getUnary(){var startPos=pos;var x=tokens[pos++].value;var token=tokens[startPos];return newNode(NodeType.OperatorType,x,token.ln,token.col);} /**
	 * Check if token is part of URI (e.g. `url('/css/styles.css')`)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of URI
	 */function checkUri(i){var start=i;if(i >= tokensLength || tokens[i++].value !== 'url' || i >= tokensLength || tokens[i].type !== TokenType.LeftParenthesis)return 0;return tokens[i].right - start + 1;} /**
	 * Get node with URI
	 * @returns {Array} `['uri', x]` where `x` is URI's nodes (without `url`
	 *      and braces, e.g. `['string', ''/css/styles.css'']`).
	 */function getUri(){var startPos=pos;var uriExcluding={};var uri=undefined;var token=undefined;var l=undefined;var raw=undefined;pos += 2;uriExcluding[TokenType.Space] = 1;uriExcluding[TokenType.Tab] = 1;uriExcluding[TokenType.Newline] = 1;uriExcluding[TokenType.LeftParenthesis] = 1;uriExcluding[TokenType.RightParenthesis] = 1;if(checkUri1(pos)){uri = [].concat(getSC()).concat([getString()]).concat(getSC());}else {uri = [].concat(getSC());l = checkExcluding(uriExcluding,pos);token = tokens[pos];raw = newNode(NodeType.RawType,joinValues(pos,pos + l),token.ln,token.col);uri.push(raw);pos += l + 1;uri = uri.concat(getSC());}token = tokens[startPos];var line=token.ln;var column=token.col;var end=getLastPosition(uri,line,column,1);pos++;return newNode(NodeType.UriType,uri,token.ln,token.col,end);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkUri1(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkSC(i))i += l;if(tokens[i].type !== TokenType.StringDQ && tokens[i].type !== TokenType.StringSQ)return 0;i++;if(l = checkSC(i))i += l;return i - start;} /**
	 * Check if token is part of a value
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the value
	 */function checkValue(i){var start=i;var l=undefined;var s=undefined;var _i=undefined;while(i < tokensLength) {if(checkDeclDelim(i))break;if(l = checkBlock(i)){i += l;break;}s = checkS(i);_i = i + s;if(l = _checkValue(_i))i += l + s;if(!l || checkBlock(i - l))break;}return i - start;} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function _checkValue(i){return checkVhash(i) || checkOperator(i) || checkImportant(i) || checkGlobal(i) || checkDefault(i) || checkProgid(i) || checkAny(i) || checkInterpolation(i);} /**
	 * @returns {Array}
	 */function getValue(){var startPos=pos;var x=[];var _pos=undefined;var s=undefined;while(pos < tokensLength) {if(checkDeclDelim(pos))break;s = checkS(pos);_pos = pos + s;if(checkDeclDelim(_pos))break;if(checkBlock(pos)){x.push(getBlock());break;}if(!_checkValue(_pos))break;if(s)x.push(getS());x.push(_getValue());if(checkBlock(_pos))break;}var token=tokens[startPos];return newNode(NodeType.ValueType,x,token.ln,token.col);} /**
	 * @returns {Array}
	 */function _getValue(){if(checkVhash(pos))return getVhash();if(checkOperator(pos))return getOperator();if(checkImportant(pos))return getImportant();if(checkGlobal(pos))return getGlobal();if(checkDefault(pos))return getDefault();if(checkProgid(pos))return getProgid();if(checkAny(pos))return getAny();if(checkInterpolation(pos))return getInterpolation();} /**
	 * Check if token is part of a variable
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the variable
	 */function checkVariable(i){var l;if(i >= tokensLength || tokens[i].type !== TokenType.DollarSign)return 0;return (l = checkIdent(i + 1))?l + 1:0;} /**
	 * Get node with a variable
	 * @returns {Array} `['variable', ['ident', x]]` where `x` is
	 *      a variable name.
	 */function getVariable(){var startPos=pos;var x=[];pos++;x.push(getIdent());var token=tokens[startPos];return newNode(NodeType.VariableType,x,token.ln,token.col);} /**
	 * Check if token is part of a variables list (e.g. `$values...`).
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkVariablesList(i){var d=0; // Number of dots
	var l=undefined;if(i >= tokensLength)return 0;if(l = checkVariable(i))i += l;else return 0;while(i < tokensLength && tokens[i].type === TokenType.FullStop) {d++;i++;}return d === 3?l + d:0;} /**
	 * Get node with a variables list
	 * @returns {Array} `['variableslist', ['variable', ['ident', x]]]` where
	 *      `x` is a variable name.
	 */function getVariablesList(){var startPos=pos;var x=[getVariable()];var token=tokens[startPos];var line=token.ln;var column=token.col;var end=getLastPosition(x,line,column,3);pos += 3;return newNode(NodeType.VariablesListType,x,token.ln,token.col,end);} /**
	 * Check if token is part of a hexadecimal number (e.g. `#fff`) inside
	 *      some value
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkVhash(i){var l;if(i >= tokensLength || tokens[i].type !== TokenType.NumberSign)return 0;return (l = checkNmName2(i + 1))?l + 1:0;} /**
	 * Get node with a hexadecimal number (e.g. `#fff`) inside some value
	 * @returns {Array} `['vhash', x]` where `x` is a hexadecimal number
	 *      converted to string (without `#`, e.g. `'fff'`).
	 */function getVhash(){var startPos=pos;var x=undefined;var token=tokens[startPos];var line=token.ln;var column=token.col;pos++;x = getNmName2();var end=getLastPosition(x,line,column + 1);return newNode(NodeType.VhashType,x,token.ln,token.col,end);}module.exports = function(_tokens,context){tokens = _tokens;tokensLength = tokens.length;pos = 0;return contexts[context]();};function checkSelectorsGroup(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkSelector(i))i += l;else return 0;while(i < tokensLength) {var sb=checkSC(i);var c=checkDelim(i + sb);if(!c)break;var sa=checkSC(i + sb + c);var saa=sa?checkSC(i + sb + c + sa):0;if(l = checkSelector(i + sb + c + sa + saa))i += sb + c + sa + saa + l;else break;}tokens[start].selectorsGroupEnd = i;return i - start;}function getSelectorsGroup(){var selectorsGroup=[];var selectorsGroupEnd=tokens[pos].selectorsGroupEnd;selectorsGroup.push(getSelector());while(pos < selectorsGroupEnd) {selectorsGroup = selectorsGroup.concat(getSC());selectorsGroup.push(getDelim());selectorsGroup = selectorsGroup.concat(getSC());selectorsGroup = selectorsGroup.concat(getSC());selectorsGroup.push(getSelector());}return selectorsGroup;}function checkSelector(i){var l;if(l = checkSelector1(i))tokens[i].selectorType = 1;else if(l = checkSelector2(i))tokens[i].selectorType = 2;return l;}function getSelector(){var selectorType=tokens[pos].selectorType;if(selectorType === 1)return getSelector1();else return getSelector2();} /**
	 * Checks for selector which starts with a compound selector.
	 */function checkSelector1(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkCompoundSelector(i))i += l;else return 0;while(i < tokensLength) {var s=checkSC(i);var c=checkCombinator(i + s);if(!s && !c)break;if(c){i += s + c;s = checkSC(i);}if(l = checkCompoundSelector(i + s))i += s + l;else break;}tokens[start].selectorEnd = i;return i - start;}function getSelector1(){var type=NodeType.SelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var selectorEnd=token.selectorEnd;var content=getCompoundSelector();while(pos < selectorEnd) {if(checkSC(pos))content = content.concat(getSC());else if(checkCombinator(pos))content.push(getCombinator());else if(checkCompoundSelector(pos))content = content.concat(getCompoundSelector());}return newNode(type,content,line,column);} /**
	 * Checks for a selector that starts with a combinator.
	 */function checkSelector2(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkCombinator(i))i += l;else return 0;while(i < tokensLength) {var sb=checkSC(i);if(l = checkCompoundSelector(i + sb))i += sb + l;else break;var sa=checkSC(i);var c=checkCombinator(i + sa);if(!sa && !c)break;if(c){i += sa + c;}}tokens[start].selectorEnd = i;return i - start;}function getSelector2(){var type=NodeType.SelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var selectorEnd=token.selectorEnd;var content=[getCombinator()];while(pos < selectorEnd) {if(checkSC(pos))content = content.concat(getSC());else if(checkCombinator(pos))content.push(getCombinator());else if(checkCompoundSelector(pos))content = content.concat(getCompoundSelector());}return newNode(type,content,line,column);}function checkCompoundSelector(i){var l=undefined;if(l = checkCompoundSelector1(i)){tokens[i].compoundSelectorType = 1;}else if(l = checkCompoundSelector2(i)){tokens[i].compoundSelectorType = 2;}return l;}function getCompoundSelector(){var type=tokens[pos].compoundSelectorType;if(type === 1)return getCompoundSelector1();if(type === 2)return getCompoundSelector2();}function checkCompoundSelector1(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkTypeSelector(i) || checkPlaceholder(i) || checkParentSelectorWithExtension(i))i += l;else return 0;while(i < tokensLength) {var _l2=checkShash(i) || checkClass(i) || checkAttributeSelector(i) || checkPseudo(i) || checkPlaceholder(i);if(_l2)i += _l2;else break;}tokens[start].compoundSelectorEnd = i;return i - start;}function getCompoundSelector1(){var sequence=[];var compoundSelectorEnd=tokens[pos].compoundSelectorEnd;if(checkTypeSelector(pos))sequence.push(getTypeSelector());else if(checkPlaceholder(pos))sequence.push(getPlaceholder());else if(checkParentSelectorWithExtension(pos))sequence = sequence.concat(getParentSelectorWithExtension());while(pos < compoundSelectorEnd) {if(checkShash(pos))sequence.push(getShash());else if(checkClass(pos))sequence.push(getClass());else if(checkAttributeSelector(pos))sequence.push(getAttributeSelector());else if(checkPseudo(pos))sequence.push(getPseudo());else if(checkPlaceholder(pos))sequence.push(getPlaceholder());}return sequence;}function checkCompoundSelector2(i){if(i >= tokensLength)return 0;var start=i;while(i < tokensLength) {var l=checkShash(i) || checkClass(i) || checkAttributeSelector(i) || checkPseudo(i) || checkPlaceholder(i);if(l)i += l;else break;}if(i !== start)tokens[start].compoundSelectorEnd = i;return i - start;}function getCompoundSelector2(){var sequence=[];var compoundSelectorEnd=tokens[pos].compoundSelectorEnd;while(pos < compoundSelectorEnd) {if(checkShash(pos))sequence.push(getShash());else if(checkClass(pos))sequence.push(getClass());else if(checkAttributeSelector(pos))sequence.push(getAttributeSelector());else if(checkPseudo(pos))sequence.push(getPseudo());else if(checkPlaceholder(pos))sequence.push(getPlaceholder());}return sequence;}function checkTypeSelector(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkNamePrefix(i))i += l;if(tokens[i].type === TokenType.Asterisk)i++;else if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;}function getTypeSelector(){var type=NodeType.TypeSelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];if(checkNamePrefix(pos))content.push(getNamePrefix());if(checkIdentOrInterpolation(pos))content = content.concat(getIdentOrInterpolation());return newNode(type,content,line,column);}function checkAttributeSelector(i){var l=undefined;if(l = checkAttributeSelector1(i))tokens[i].attributeSelectorType = 1;else if(l = checkAttributeSelector2(i))tokens[i].attributeSelectorType = 2;return l;}function getAttributeSelector(){var type=tokens[pos].attributeSelectorType;if(type === 1)return getAttributeSelector1();else return getAttributeSelector2();} /**
	 * (1) `[panda=nani]`
	 * (2) `[panda='nani']`
	 * (3) `[panda='nani' i]`
	 *
	 */function checkAttributeSelector1(i){var start=i;if(tokens[i].type === TokenType.LeftSquareBracket)i++;else return 0;var l=undefined;if(l = checkSC(i))i += l;if(l = checkAttributeName(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkAttributeMatch(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkAttributeValue(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkAttributeFlags(i)){i += l;if(l = checkSC(i))i += l;}if(tokens[i].type === TokenType.RightSquareBracket)i++;else return 0;return i - start;}function getAttributeSelector1(){var type=NodeType.AttributeSelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[]; // Skip `[`.
	pos++;content = content.concat(getSC());content.push(getAttributeName());content = content.concat(getSC());content.push(getAttributeMatch());content = content.concat(getSC());content.push(getAttributeValue());content = content.concat(getSC());if(checkAttributeFlags(pos)){content.push(getAttributeFlags());content = content.concat(getSC());} // Skip `]`.
	pos++;var end=getLastPosition(content,line,column,1);return newNode(type,content,line,column,end);} /**
	 * (1) `[panda]`
	 */function checkAttributeSelector2(i){var start=i;if(tokens[i].type === TokenType.LeftSquareBracket)i++;else return 0;var l=undefined;if(l = checkSC(i))i += l;if(l = checkAttributeName(i))i += l;else return 0;if(l = checkSC(i))i += l;if(tokens[i].type === TokenType.RightSquareBracket)i++;else return 0;return i - start;}function getAttributeSelector2(){var type=NodeType.AttributeSelectorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[]; // Skip `[`.
	pos++;content = content.concat(getSC());content.push(getAttributeName());content = content.concat(getSC()); // Skip `]`.
	pos++;var end=getLastPosition(content,line,column,1);return newNode(type,content,line,column,end);}function checkAttributeName(i){var start=i;var l=undefined;if(l = checkNamePrefix(i))i += l;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;}function getAttributeName(){var type=NodeType.AttributeNameType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];if(checkNamePrefix(pos))content.push(getNamePrefix());content = content.concat(getIdentOrInterpolation());return newNode(type,content,line,column);}function checkAttributeMatch(i){var l=undefined;if(l = checkAttributeMatch1(i))tokens[i].attributeMatchType = 1;else if(l = checkAttributeMatch2(i))tokens[i].attributeMatchType = 2;return l;}function getAttributeMatch(){var type=tokens[pos].attributeMatchType;if(type === 1)return getAttributeMatch1();else return getAttributeMatch2();}function checkAttributeMatch1(i){var start=i;var type=tokens[i].type;if(type === TokenType.Tilde || type === TokenType.VerticalLine || type === TokenType.CircumflexAccent || type === TokenType.DollarSign || type === TokenType.Asterisk)i++;else return 0;if(tokens[i].type === TokenType.EqualsSign)i++;else return 0;return i - start;}function getAttributeMatch1(){var type=NodeType.AttributeMatchType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=tokens[pos].value + tokens[pos + 1].value;pos += 2;return newNode(type,content,line,column);}function checkAttributeMatch2(i){if(tokens[i].type === TokenType.EqualsSign)return 1;else return 0;}function getAttributeMatch2(){var type=NodeType.AttributeMatchType;var token=tokens[pos];var line=token.ln;var column=token.col;var content='=';pos++;return newNode(type,content,line,column);}function checkAttributeValue(i){return checkString(i) || checkIdentOrInterpolation(i);}function getAttributeValue(){var type=NodeType.AttributeValueType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];if(checkString(pos))content.push(getString());else content = content.concat(getIdentOrInterpolation());return newNode(type,content,line,column);}function checkAttributeFlags(i){return checkIdentOrInterpolation(i);}function getAttributeFlags(){var type=NodeType.AttributeFlagsType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=getIdentOrInterpolation();return newNode(type,content,line,column);}function checkNamePrefix(i){if(i >= tokensLength)return 0;var l=undefined;if(l = checkNamePrefix1(i))tokens[i].namePrefixType = 1;else if(l = checkNamePrefix2(i))tokens[i].namePrefixType = 2;return l;}function getNamePrefix(){var type=tokens[pos].namePrefixType;if(type === 1)return getNamePrefix1();else return getNamePrefix2();} /**
	 * (1) `panda|`
	 * (2) `panda<comment>|`
	 */function checkNamePrefix1(i){var start=i;var l=undefined;if(l = checkNamespacePrefix(i))i += l;else return 0;if(l = checkCommentML(i))i += l;if(l = checkNamespaceSeparator(i))i += l;else return 0;return i - start;}function getNamePrefix1(){var type=NodeType.NamePrefixType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];content.push(getNamespacePrefix());if(checkCommentML(pos))content.push(getCommentML());content.push(getNamespaceSeparator());return newNode(type,content,line,column);} /**
	 * (1) `|`
	 */function checkNamePrefix2(i){return checkNamespaceSeparator(i);}function getNamePrefix2(){var type=NodeType.NamePrefixType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[getNamespaceSeparator()];return newNode(type,content,line,column);} /**
	 * (1) `*`
	 * (2) `panda`
	 */function checkNamespacePrefix(i){if(i >= tokensLength)return 0;var l=undefined;if(tokens[i].type === TokenType.Asterisk)return 1;else if(l = checkIdentOrInterpolation(i))return l;else return 0;}function getNamespacePrefix(){var type=NodeType.NamespacePrefixType;var token=tokens[pos];var line=token.ln;var column=token.col;var content=[];if(checkIdentOrInterpolation(pos))content = content.concat(getIdentOrInterpolation());return newNode(type,content,line,column);} /**
	 * (1) `|`
	 */function checkNamespaceSeparator(i){if(i >= tokensLength)return 0;if(tokens[i].type === TokenType.VerticalLine)return 1;else return 0;}function getNamespaceSeparator(){var type=NodeType.NamespaceSeparatorType;var token=tokens[pos];var line=token.ln;var column=token.col;var content='|';pos++;return newNode(type,content,line,column);}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = function (css, tabSize) {
	  var TokenType = __webpack_require__(18);

	  var tokens = [];
	  var urlMode = false;
	  var blockMode = 0;
	  var c = undefined; // Current character
	  var cn = undefined; // Next character
	  var pos = 0;
	  var tn = 0;
	  var ln = 1;
	  var col = 1;

	  var Punctuation = {
	    ' ': TokenType.Space,
	    '\n': TokenType.Newline,
	    '\r': TokenType.Newline,
	    '\t': TokenType.Tab,
	    '!': TokenType.ExclamationMark,
	    '"': TokenType.QuotationMark,
	    '#': TokenType.NumberSign,
	    '$': TokenType.DollarSign,
	    '%': TokenType.PercentSign,
	    '&': TokenType.Ampersand,
	    '\'': TokenType.Apostrophe,
	    '(': TokenType.LeftParenthesis,
	    ')': TokenType.RightParenthesis,
	    '*': TokenType.Asterisk,
	    '+': TokenType.PlusSign,
	    ',': TokenType.Comma,
	    '-': TokenType.HyphenMinus,
	    '.': TokenType.FullStop,
	    '/': TokenType.Solidus,
	    ':': TokenType.Colon,
	    ';': TokenType.Semicolon,
	    '<': TokenType.LessThanSign,
	    '=': TokenType.EqualsSign,
	    '==': TokenType.EqualitySign,
	    '!=': TokenType.InequalitySign,
	    '>': TokenType.GreaterThanSign,
	    '?': TokenType.QuestionMark,
	    '@': TokenType.CommercialAt,
	    '[': TokenType.LeftSquareBracket,
	    ']': TokenType.RightSquareBracket,
	    '^': TokenType.CircumflexAccent,
	    '_': TokenType.LowLine,
	    '{': TokenType.LeftCurlyBracket,
	    '|': TokenType.VerticalLine,
	    '}': TokenType.RightCurlyBracket,
	    '~': TokenType.Tilde
	  };

	  /**
	   * Add a token to the token list
	   * @param {string} type
	   * @param {string} value
	   */
	  function pushToken(type, value, column) {
	    tokens.push({
	      tn: tn++,
	      ln: ln,
	      col: column,
	      type: type,
	      value: value
	    });
	  }

	  /**
	   * Check if a character is a decimal digit
	   * @param {string} c Character
	   * @returns {boolean}
	   */
	  function isDecimalDigit(c) {
	    return '0123456789'.indexOf(c) >= 0;
	  }

	  /**
	   * Parse spaces
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseSpaces(css) {
	    var start = pos;

	    // Read the string until we meet a non-space character:
	    for (; pos < css.length; pos++) {
	      if (css.charAt(pos) !== ' ') break;
	    }

	    // Add a substring containing only spaces to tokens:
	    pushToken(TokenType.Space, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Parse a string within quotes
	   * @param {string} css Unparsed part of CSS string
	   * @param {string} q Quote (either `'` or `"`)
	   */
	  function parseString(css, q) {
	    var start = pos;

	    // Read the string until we meet a matching quote:
	    for (pos++; pos < css.length; pos++) {
	      // Skip escaped quotes:
	      if (css.charAt(pos) === '\\') pos++;else if (css.charAt(pos) === q) break;
	    }

	    // Add the string (including quotes) to tokens:
	    var type = q === '"' ? TokenType.StringDQ : TokenType.StringSQ;
	    pushToken(type, css.substring(start, pos + 1), col);
	    col += pos - start;
	  }

	  /**
	   * Parse numbers
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseDecimalNumber(css) {
	    var start = pos;

	    // Read the string until we meet a character that's not a digit:
	    for (; pos < css.length; pos++) {
	      if (!isDecimalDigit(css.charAt(pos))) break;
	    }

	    // Add the number to tokens:
	    pushToken(TokenType.DecimalNumber, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Parse identifier
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseIdentifier(css) {
	    var start = pos;

	    // Skip all opening slashes:
	    while (css.charAt(pos) === '/') pos++;

	    // Read the string until we meet a punctuation mark:
	    for (; pos < css.length; pos++) {
	      // Skip all '\':
	      if (css.charAt(pos) === '\\') pos++;else if (css.charAt(pos) in Punctuation) break;
	    }

	    var ident = css.substring(start, pos--);

	    // Enter url mode if parsed substring is `url`:
	    if (!urlMode && ident === 'url' && css.charAt(pos + 1) === '(') {
	      urlMode = true;
	    }

	    // Add identifier to tokens:
	    pushToken(TokenType.Identifier, ident, col);
	    col += pos - start;
	  }

	  /**
	   * Parse equality sign
	   */
	  function parseEquality() {
	    pushToken(TokenType.EqualitySign, '==', col);
	    pos++;
	    col++;
	  }

	  /**
	   * Parse inequality sign
	   */
	  function parseInequality() {
	    pushToken(TokenType.InequalitySign, '!=', col);
	    pos++;
	    col++;
	  }

	  /**
	  * Parse a multiline comment
	  * @param {string} css Unparsed part of CSS string
	  */
	  function parseMLComment(css) {
	    var start = pos;
	    var col_ = col;

	    // Get current indent level:
	    var il = 0;
	    for (var _pos = pos - 1; _pos > -1; _pos--) {
	      // TODO: Can be tabs:
	      if (css.charAt(_pos) === ' ') il++;else break;
	    }

	    for (pos += 2; pos < css.length; pos++) {
	      if (css.charAt(pos) === '\n') {
	        var _pos = undefined;
	        // Get new line's indent level:
	        var _il = 0;
	        for (_pos = pos + 1; _pos < css.length; _pos++) {
	          if (css.charAt(_pos) === ' ') _il++;else break;
	        }

	        if (_il > il) {
	          col = 0;
	          pos += _pos - pos;
	        } else {
	          pos--;
	          break;
	        }
	      }
	    }

	    // Add full comment (including `/*`) to the list of tokens:
	    var comment = css.substring(start, pos + 1);
	    pushToken(TokenType.CommentML, comment, col_);

	    var newlines = comment.split('\n');
	    if (newlines.length > 1) {
	      ln += newlines.length - 1;
	      col = newlines[newlines.length - 1].length;
	    } else {
	      col += pos - start;
	    }
	  }

	  /**
	  * Parse a single line comment
	  * @param {string} css Unparsed part of CSS string
	  */
	  function parseSLComment(css) {
	    var start = pos;
	    var col_ = col;
	    var _pos;

	    // Check if comment is the only token on the line, and if so,
	    // get current indent level:
	    var il = 0;
	    var onlyToken = false;
	    for (_pos = pos - 1; _pos > -1; _pos--) {
	      // TODO: Can be tabs:
	      if (css.charAt(_pos) === ' ') il++;else if (css.charAt(_pos) === '\n') {
	        onlyToken = true;
	        break;
	      } else break;
	    }
	    if (_pos === -1) onlyToken = true;

	    // Read the string until we meet comment end.
	    // Since we already know first 2 characters (`//`), start reading
	    // from `pos + 2`:
	    if (!onlyToken) {
	      for (pos += 2; pos < css.length; pos++) {
	        if (css.charAt(pos) === '\n' || css.charAt(pos) === '\r') {
	          break;
	        }
	      }
	    } else {
	      for (pos += 2; pos < css.length; pos++) {
	        if (css.charAt(pos) === '\n') {
	          // Get new line's indent level:
	          var _il = 0;
	          for (_pos = pos + 1; _pos < css.length; _pos++) {
	            if (css.charAt(_pos) === ' ') _il++;else break;
	          }

	          if (_il > il) {
	            col = 0;
	            pos += _pos - pos;
	          } else {
	            break;
	          }
	        }
	      }
	    }

	    // Add comment (including `//` and line break) to the list of tokens:
	    var comment = css.substring(start, pos--);
	    pushToken(TokenType.CommentSL, comment, col_);

	    var newlines = comment.split('\n');
	    if (newlines.length > 1) {
	      ln += newlines.length - 1;
	      col = newlines[newlines.length - 1].length;
	    } else {
	      col += pos - start;
	    }
	  }

	  /**
	   * Convert a CSS string to a list of tokens
	   * @param {string} css CSS string
	   * @returns {Array} List of tokens
	   * @private
	   */
	  function getTokens(css) {
	    // Parse string, character by character:
	    for (pos = 0; pos < css.length; col++, pos++) {
	      c = css.charAt(pos);
	      cn = css.charAt(pos + 1);

	      // If we meet `/*`, it's a start of a multiline comment.
	      // Parse following characters as a multiline comment:
	      if (c === '/' && cn === '*') {
	        parseMLComment(css);
	      }

	      // If we meet `//` and it is not a part of url:
	      else if (!urlMode && c === '/' && cn === '/') {
	          // If we're currently inside a block, treat `//` as a start
	          // of identifier. Else treat `//` as a start of a single-line
	          // comment:
	          parseSLComment(css);
	        }

	        // If current character is a double or single quote, it's a start
	        // of a string:
	        else if (c === '"' || c === "'") {
	            parseString(css, c);
	          }

	          // If current character is a space:
	          else if (c === ' ') {
	              parseSpaces(css);
	            }

	            // If current character is `=`, it must be combined with next `=`
	            else if (c === '=' && cn === '=') {
	                parseEquality(css);
	              }

	              // If we meet `!=`, this must be inequality
	              else if (c === '!' && cn === '=') {
	                  parseInequality(css);
	                }

	                // If current character is a punctuation mark:
	                else if (c in Punctuation) {
	                    // Check for CRLF here or just LF
	                    if (c === '\r' && cn === '\n' || c === '\n') {
	                      // If \r we know the next character is \n due to statement above
	                      // so we push a CRLF token type to the token list and importantly
	                      // skip the next character so as not to double count newlines or
	                      // columns etc
	                      if (c === '\r') {
	                        pushToken(TokenType.Newline, '\r\n', col);
	                        pos++; // If CRLF skip the next character and push crlf token
	                      } else if (c === '\n') {
	                          // If just a LF newline and not part of CRLF newline we can just
	                          // push punctuation as usual
	                          pushToken(Punctuation[c], c, col);
	                        }

	                      ln++; // Go to next line
	                      col = 0; // Reset the column count
	                    } else if (c !== '\r' && c !== '\n') {
	                        // Handle all other punctuation and add to list of tokens
	                        pushToken(Punctuation[c], c, col);
	                      } // Go to next line
	                    if (c === ')') urlMode = false; // Exit url mode
	                    if (c === '{') blockMode++; // Enter a block
	                    if (c === '}') blockMode--; // Exit a block
	                    else if (c === '\t' && tabSize > 1) col += tabSize - 1;
	                  }

	                  // If current character is a decimal digit:
	                  else if (isDecimalDigit(c)) {
	                      parseDecimalNumber(css);
	                    }

	                    // If current character is anything else:
	                    else {
	                        parseIdentifier(css);
	                      }
	    }

	    return tokens;
	  }

	  return getTokens(css);
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = {
	  mark: __webpack_require__(26),
	  parse: __webpack_require__(27),
	  stringify: __webpack_require__(6),
	  tokenizer: __webpack_require__(28)
	};
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var NodeType = __webpack_require__(13);

	module.exports = (function () {
	  /**
	  * Mark whitespaces and comments
	  */
	  function markSC(tokens) {
	    var tokensLength = tokens.length;
	    var ws = -1; // Flag for whitespaces
	    var sc = -1; // Flag for whitespaces and comments
	    var t = undefined; // Current token

	    // For every token in the token list, mark spaces and line breaks
	    // as spaces (set both `ws` and `sc` flags). Mark multiline comments
	    // with `sc` flag.
	    // If there are several spaces or tabs or line breaks or multiline
	    // comments in a row, group them: take the last one's index number
	    // and save it to the first token in the group as a reference:
	    // e.g., `ws_last = 7` for a group of whitespaces or `sc_last = 9`
	    // for a group of whitespaces and comments.
	    for (var i = 0; i < tokensLength; i++) {
	      t = tokens[i];
	      switch (t.type) {
	        case NodeType.SPACE:
	        case NodeType.NEWLINE:
	          t.ws = true;
	          t.sc = true;

	          if (ws === -1) ws = i;
	          if (sc === -1) sc = i;

	          break;
	        case NodeType.MULTILINE_COMMENT:
	        case NodeType.SINGLELINE_COMMENT:
	          if (ws !== -1) {
	            tokens[ws].ws_last = i - 1;
	            ws = -1;
	          }

	          t.sc = true;

	          break;
	        default:
	          if (ws !== -1) {
	            tokens[ws].ws_last = i - 1;
	            ws = -1;
	          }

	          if (sc !== -1) {
	            tokens[sc].sc_last = i - 1;
	            sc = -1;
	          }
	      }
	    }

	    if (ws !== -1) tokens[ws].ws_last = i - 1;
	    if (sc !== -1) tokens[sc].sc_last = i - 1;
	  }

	  /**
	  * Pair brackets
	  */
	  function markBrackets(tokens) {
	    var tokensLength = tokens.length;
	    var ps = []; // Parentheses
	    var sbs = []; // Square brackets
	    var cbs = []; // Curly brackets
	    var t = undefined; // Current token

	    // For every token in the token list, if we meet an opening (left)
	    // bracket, push its index number to a corresponding array.
	    // If we then meet a closing (right) bracket, look at the corresponding
	    // array. If there are any elements (records about previously met
	    // left brackets), take a token of the last left bracket (take
	    // the last index number from the array and find a token with
	    // this index number) and save right bracket's index as a reference:
	    for (var i = 0; i < tokensLength; i++) {
	      t = tokens[i];
	      switch (t.type) {
	        case NodeType.LEFT_PARENTHESIS:
	          ps.push(i);
	          break;
	        case NodeType.RIGHT_PARENTHESIS:
	          if (ps.length) {
	            t.left = ps.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	        case NodeType.LEFT_SQUARE_BRACKET:
	          sbs.push(i);
	          break;
	        case NodeType.RIGHT_SQUARE_BRACKET:
	          if (sbs.length) {
	            t.left = sbs.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	        case NodeType.LEFT_CURLY_BRACKET:
	          cbs.push(i);
	          break;
	        case NodeType.RIGHT_CURLY_BRACKET:
	          if (cbs.length) {
	            t.left = cbs.pop();
	            tokens[t.left].right = i;
	          }
	          break;
	      }
	    }
	  }

	  return function (tokens) {
	    markBrackets(tokens);
	    markSC(tokens);
	  };
	})();

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// jscs:disable maximumLineLength
	'use strict';var Node=__webpack_require__(1);var NodeType=__webpack_require__(13);var tokens=undefined;var tokensLength=undefined;var pos=undefined;var contexts={'arguments':function(){return checkArguments(pos) && getArguments();},'atkeyword':function(){return checkAtkeyword(pos) && getAtkeyword();},'atrule':function(){return checkAtrule(pos) && getAtrule();},'block':function(){return checkBlock(pos) && getBlock();},'brackets':function(){return checkBrackets(pos) && getBrackets();},'combinator':function(){return checkCombinator(pos) && getCombinator();},'commentML':function(){return checkCommentML(pos) && getCommentML();},'commentSL':function(){return checkCommentSL(pos) && getCommentSL();},'condition':function(){return checkCondition(pos) && getCondition();},'conditionalStatement':function(){return checkConditionalStatement(pos) && getConditionalStatement();},'declaration':function(){return checkDeclaration(pos) && getDeclaration();},'declDelim':function(){return checkDeclDelim(pos) && getDeclDelim();},'default':function(){return checkDefault(pos) && getDefault();},'delim':function(){return checkDelim(pos) && getDelim();},'dimension':function(){return checkDimension(pos) && getDimension();},'expression':function(){return checkExpression(pos) && getExpression();},'extend':function(){return checkExtend(pos) && getExtend();},'function':function(){return checkFunction(pos) && getFunction();},'global':function(){return checkGlobal(pos) && getGlobal();},'ident':function(){return checkIdent(pos) && getIdent();},'important':function(){return checkImportant(pos) && getImportant();},'include':function(){return checkInclude(pos) && getInclude();},'interpolation':function(){return checkInterpolation(pos) && getInterpolation();},'loop':function(){return checkLoop(pos) && getLoop();},'mixin':function(){return checkMixin(pos) && getMixin();},'namespace':function(){return checkNamespace(pos) && getNamespace();},'number':function(){return checkNumber(pos) && getNumber();},'operator':function(){return checkOperator(pos) && getOperator();},'optional':function(){return checkOptional(pos) && getOptional();},'parentheses':function(){return checkParentheses(pos) && getParentheses();},'parentselector':function(){return checkParentSelector(pos) && getParentSelector();},'percentage':function(){return checkPercentage(pos) && getPercentage();},'placeholder':function(){return checkPlaceholder(pos) && getPlaceholder();},'progid':function(){return checkProgid(pos) && getProgid();},'property':function(){return checkProperty(pos) && getProperty();},'propertyDelim':function(){return checkPropertyDelim(pos) && getPropertyDelim();},'pseudoc':function(){return checkPseudoc(pos) && getPseudoc();},'pseudoe':function(){return checkPseudoe(pos) && getPseudoe();},'ruleset':function(){return checkRuleset(pos) && getRuleset();},'s':function(){return checkS(pos) && getS();},'selector':function(){return checkSelector(pos) && getSelector();},'shash':function(){return checkShash(pos) && getShash();},'string':function(){return checkString(pos) && getString();},'stylesheet':function(){return checkStylesheet(pos) && getStylesheet();},'unary':function(){return checkUnary(pos) && getUnary();},'uri':function(){return checkUri(pos) && getUri();},'value':function(){return checkValue(pos) && getValue();},'variable':function(){return checkVariable(pos) && getVariable();},'variableslist':function(){return checkVariablesList(pos) && getVariablesList();},'vhash':function(){return checkVhash(pos) && getVhash();}}; /**
	 * Stop parsing and display error
	 * @param {Number=} i Token's index number
	 */function throwError(i){var ln=i?tokens[i].ln:tokens[pos].ln;throw {line:ln,syntax:'scss'};} /**
	 * @param {Object} exclude
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkExcluding(exclude,i){var start=i;while(i < tokensLength) {if(exclude[tokens[i++].type])break;}return i - start - 2;} /**
	 * @param {Number} start
	 * @param {Number} finish
	 * @returns {String}
	 */function joinValues(start,finish){var s='';for(var i=start;i < finish + 1;i++) {s += tokens[i].toString();}return s;} /**
	 * @param {Number} start
	 * @param {Number} num
	 * @returns {String}
	 */function joinValues2(start,num){if(start + num - 1 >= tokensLength)return;var s='';for(var i=0;i < num;i++) {s += tokens[start + i].toString();}return s;}function getLastPosition(content,line,column,colOffset){return typeof content === 'string'?getLastPositionForString(content,line,column,colOffset):getLastPositionForArray(content,line,column,colOffset);}function getLastPositionForString(content,line,column,colOffset){var position=[];if(!content){position = [line,column];if(colOffset)position[1] += colOffset - 1;return position;}var lastLinebreak=content.lastIndexOf('\n');var endsWithLinebreak=lastLinebreak === content.length - 1;var splitContent=content.split('\n');var linebreaksCount=splitContent.length - 1;var prevLinebreak=linebreaksCount === 0 || linebreaksCount === 1?-1:content.length - splitContent[linebreaksCount - 1].length - 2; // Line:
	var offset=endsWithLinebreak?linebreaksCount - 1:linebreaksCount;position[0] = line + offset; // Column:
	if(endsWithLinebreak){offset = prevLinebreak !== -1?content.length - prevLinebreak:content.length - 1;}else {offset = linebreaksCount !== 0?content.length - lastLinebreak - column - 1:content.length - 1;}position[1] = column + offset;if(!colOffset)return position;if(endsWithLinebreak){position[0]++;position[1] = colOffset;}else {position[1] += colOffset;}return position;}function getLastPositionForArray(content,line,column,colOffset){var position;if(content.length === 0){position = [line,column];}else {var c=content[content.length - 1];if(c.hasOwnProperty('end')){position = [c.end.line,c.end.column];}else {position = getLastPosition(c.content,line,column);}}if(!colOffset)return position;if(tokens[pos - 1].type !== 'Newline'){position[1] += colOffset;}else {position[0]++;position[1] = 1;}return position;}function newNode(type,content,line,column,end){if(!end)end = getLastPosition(content,line,column);return new Node({type:type,content:content,start:{line:line,column:column},end:{line:end[0],column:end[1]},syntax:'scss'});} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkAny(i){return checkBrackets(i) || checkParentheses(i) || checkString(i) || checkVariablesList(i) || checkVariable(i) || checkPlaceholder(i) || checkPercentage(i) || checkDimension(i) || checkNumber(i) || checkUri(i) || checkExpression(i) || checkFunction(i) || checkInterpolation(i) || checkIdent(i) || checkClass(i) || checkUnary(i);} /**
	 * @returns {Array}
	 */function getAny(){if(checkBrackets(pos))return getBrackets();else if(checkParentheses(pos))return getParentheses();else if(checkString(pos))return getString();else if(checkVariablesList(pos))return getVariablesList();else if(checkVariable(pos))return getVariable();else if(checkPlaceholder(pos))return getPlaceholder();else if(checkPercentage(pos))return getPercentage();else if(checkDimension(pos))return getDimension();else if(checkNumber(pos))return getNumber();else if(checkUri(pos))return getUri();else if(checkExpression(pos))return getExpression();else if(checkFunction(pos))return getFunction();else if(checkInterpolation(pos))return getInterpolation();else if(checkIdent(pos))return getIdent();else if(checkClass(pos))return getClass();else if(checkUnary(pos))return getUnary();} /**
	 * Check if token is part of mixin's arguments.
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of arguments
	 */function checkArguments(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i].type !== NodeType.LEFT_PARENTHESIS)return 0;i++;while(i < tokens[start].right) {if(l = checkArgument(i))i += l;else return 0;}return tokens[start].right - start + 1;} /**
	 * Check if token is valid to be part of arguments list
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of argument
	 */function checkArgument(i){return checkBrackets(i) || checkParentheses(i) || checkDeclaration(i) || checkFunction(i) || checkVariablesList(i) || checkVariable(i) || checkSC(i) || checkDelim(i) || checkDeclDelim(i) || checkString(i) || checkPercentage(i) || checkDimension(i) || checkNumber(i) || checkUri(i) || checkInterpolation(i) || checkIdent(i) || checkVhash(i) || checkOperator(i) || checkUnary(i);} /**
	 * @returns {Array} Node that is part of arguments list
	 */function getArgument(){if(checkBrackets(pos))return getBrackets();else if(checkParentheses(pos))return getParentheses();else if(checkDeclaration(pos))return getDeclaration();else if(checkFunction(pos))return getFunction();else if(checkVariablesList(pos))return getVariablesList();else if(checkVariable(pos))return getVariable();else if(checkSC(pos))return getSC();else if(checkDelim(pos))return getDelim();else if(checkDeclDelim(pos))return getDeclDelim();else if(checkString(pos))return getString();else if(checkPercentage(pos))return getPercentage();else if(checkDimension(pos))return getDimension();else if(checkNumber(pos))return getNumber();else if(checkUri(pos))return getUri();else if(checkInterpolation(pos))return getInterpolation();else if(checkIdent(pos))return getIdent();else if(checkVhash(pos))return getVhash();else if(checkOperator(pos))return getOperator();else if(checkUnary(pos))return getUnary();} /**
	 * Check if token is part of an @-word (e.g. `@import`, `@include`)
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkAtkeyword(i){var l; // Check that token is `@`:
	if(i >= tokensLength || tokens[i++].type !== NodeType.COMMERCIAL_AT)return 0;return (l = checkIdentOrInterpolation(i))?l + 1:0;} /**
	 * Get node with @-word
	 * @returns {Array} `['atkeyword', ['ident', x]]` where `x` is
	 *      an identifier without
	 *      `@` (e.g. `import`, `include`)
	 */function getAtkeyword(){var startPos=pos;var x=undefined;pos++;x = getIdentOrInterpolation();var token=tokens[startPos];return newNode(NodeType.ATKEYWORD,x,token.start.line,token.start.column);} /**
	 * Check if token is a part of an @-rule
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of @-rule
	 */function checkAtrule(i){var l;if(i >= tokensLength)return 0; // If token already has a record of being part of an @-rule,
	// return the @-rule's length:
	if(tokens[i].atrule_l !== undefined)return tokens[i].atrule_l; // If token is part of an @-rule, save the rule's type to token:
	if(l = checkKeyframesRule(i))tokens[i].atrule_type = 4;else if(l = checkAtruler(i))tokens[i].atrule_type = 1; // @-rule with ruleset
	else if(l = checkAtruleb(i))tokens[i].atrule_type = 2; // Block @-rule
	else if(l = checkAtrules(i))tokens[i].atrule_type = 3; // Single-line @-rule
	else return 0; // If token is part of an @-rule, save the rule's length to token:
	tokens[i].atrule_l = l;return l;} /**
	 * Get node with @-rule
	 * @returns {Array}
	 */function getAtrule(){switch(tokens[pos].atrule_type){case 1:return getAtruler(); // @-rule with ruleset
	case 2:return getAtruleb(); // Block @-rule
	case 3:return getAtrules(); // Single-line @-rule
	case 4:return getKeyframesRule();}} /**
	 * Check if token is part of a block @-rule
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the @-rule
	 */function checkAtruleb(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(l = checkTsets(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with a block @-rule
	 * @returns {Array} `['atruleb', ['atkeyword', x], y, ['block', z]]`
	 */function getAtruleb(){var startPos=pos;var x=undefined;x = [getAtkeyword()].concat(getTsets()).concat([getBlock()]);var token=tokens[startPos];return newNode(NodeType.ATRULE,x,token.start.line,token.start.column);} /**
	 * Check if token is part of an @-rule with ruleset
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the @-rule
	 */function checkAtruler(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(l = checkTsets(i))i += l;if(i < tokensLength && tokens[i].type === NodeType.LEFT_CURLY_BRACKET)i++;else return 0;if(l = checkAtrulers(i))i += l;if(i < tokensLength && tokens[i].type === NodeType.RIGHT_CURLY_BRACKET)i++;else return 0;return i - start;} /**
	 * Get node with an @-rule with ruleset
	 * @returns {Array} ['atruler', ['atkeyword', x], y, z]
	 */function getAtruler(){var startPos=pos;var x=undefined;x = [getAtkeyword()].concat(getTsets());x.push(getAtrulers());var token=tokens[startPos];return newNode(NodeType.ATRULE,x,token.start.line,token.start.column);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkAtrulers(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;while(l = checkRuleset(i) || checkAtrule(i) || checkSC(i)) {i += l;}if(i < tokensLength)tokens[i].atrulers_end = 1;return i - start;} /**
	 * @returns {Array} `['atrulers', x]`
	 */function getAtrulers(){var startPos=pos;var x=undefined;var token=tokens[startPos];var line=token.start.line;var column=token.start.column;pos++;x = getSC();while(!tokens[pos].atrulers_end) {if(checkSC(pos))x = x.concat(getSC());else if(checkAtrule(pos))x.push(getAtrule());else if(checkRuleset(pos))x.push(getRuleset());}x = x.concat(getSC());var end=getLastPosition(x,line,column,1);pos++;return newNode(NodeType.BLOCK,x,token.start.line,token.start.column,end);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkAtrules(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(l = checkTsets(i))i += l;return i - start;} /**
	 * @returns {Array} `['atrules', ['atkeyword', x], y]`
	 */function getAtrules(){var startPos=pos;var x=undefined;x = [getAtkeyword()].concat(getTsets());var token=tokens[startPos];return newNode(NodeType.ATRULE,x,token.start.line,token.start.column);} /**
	 * Check if token is part of a block (e.g. `{...}`).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the block
	 */function checkBlock(i){return i < tokensLength && tokens[i].type === NodeType.LEFT_CURLY_BRACKET?tokens[i].right - i + 1:0;} /**
	 * Get node with a block
	 * @returns {Array} `['block', x]`
	 */function getBlock(){var startPos=pos;var end=tokens[pos].right;var x=[];var token=tokens[startPos];var line=token.start.line;var column=token.start.column;pos++;while(pos < end) {if(checkBlockdecl(pos))x = x.concat(getBlockdecl());else throwError();}var end_=getLastPosition(x,line,column,1);pos = end + 1;return newNode(NodeType.BLOCK,x,token.start.line,token.start.column,end_);} /**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the declaration
	 */function checkBlockdecl(i){var l;if(i >= tokensLength)return 0;if(l = checkBlockdecl1(i))tokens[i].bd_type = 1;else if(l = checkBlockdecl2(i))tokens[i].bd_type = 2;else if(l = checkBlockdecl3(i))tokens[i].bd_type = 3;else if(l = checkBlockdecl4(i))tokens[i].bd_type = 4;else return 0;return l;} /**
	 * @returns {Array}
	 */function getBlockdecl(){switch(tokens[pos].bd_type){case 1:return getBlockdecl1();case 2:return getBlockdecl2();case 3:return getBlockdecl3();case 4:return getBlockdecl4();}} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBlockdecl1(i){var start=i;var l=undefined;if(l = checkSC(i))i += l;if(l = checkConditionalStatement(i))tokens[i].bd_kind = 1;else if(l = checkInclude(i))tokens[i].bd_kind = 2;else if(l = checkExtend(i))tokens[i].bd_kind = 4;else if(l = checkLoop(i))tokens[i].bd_kind = 3;else if(l = checkAtrule(i))tokens[i].bd_kind = 6;else if(l = checkRuleset(i))tokens[i].bd_kind = 7;else if(l = checkDeclaration(i))tokens[i].bd_kind = 5;else return 0;i += l;if(i < tokensLength && (l = checkDeclDelim(i)))i += l;else return 0;if(l = checkSC(i))i += l;return i - start;} /**
	 * @returns {Array}
	 */function getBlockdecl1(){var sc=getSC();var x=undefined;switch(tokens[pos].bd_kind){case 1:x = getConditionalStatement();break;case 2:x = getInclude();break;case 3:x = getLoop();break;case 4:x = getExtend();break;case 5:x = getDeclaration();break;case 6:x = getAtrule();break;case 7:x = getRuleset();break;}return sc.concat([x]).concat([getDeclDelim()]).concat(getSC());} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBlockdecl2(i){var start=i;var l=undefined;if(l = checkSC(i))i += l;if(l = checkConditionalStatement(i))tokens[i].bd_kind = 1;else if(l = checkInclude(i))tokens[i].bd_kind = 2;else if(l = checkExtend(i))tokens[i].bd_kind = 4;else if(l = checkMixin(i))tokens[i].bd_kind = 8;else if(l = checkLoop(i))tokens[i].bd_kind = 3;else if(l = checkAtrule(i))tokens[i].bd_kind = 6;else if(l = checkRuleset(i))tokens[i].bd_kind = 7;else if(l = checkDeclaration(i))tokens[i].bd_kind = 5;else return 0;i += l;if(l = checkSC(i))i += l;return i - start;} /**
	 * @returns {Array}
	 */function getBlockdecl2(){var sc=getSC();var x=undefined;switch(tokens[pos].bd_kind){case 1:x = getConditionalStatement();break;case 2:x = getInclude();break;case 3:x = getLoop();break;case 4:x = getExtend();break;case 5:x = getDeclaration();break;case 6:x = getAtrule();break;case 7:x = getRuleset();break;case 8:x = getMixin();break;}return sc.concat([x]).concat(getSC());} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBlockdecl3(i){var start=i;var l=undefined;if(l = checkSC(i))i += l;if(l = checkDeclDelim(i))i += l;else return 0;if(l = checkSC(i))i += l;return i - start;} /**
	 * @returns {Array} `[s0, ['declDelim'], s1]` where `s0` and `s1` are
	 *      are optional whitespaces.
	 */function getBlockdecl3(){return getSC().concat([getDeclDelim()]).concat(getSC());} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBlockdecl4(i){return checkSC(i);} /**
	 * @returns {Array}
	 */function getBlockdecl4(){return getSC();} /**
	 * Check if token is part of text inside square brackets, e.g. `[1]`
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkBrackets(i){if(i >= tokensLength || tokens[i].type !== NodeType.LEFT_SQUARE_BRACKET)return 0;return tokens[i].right - i + 1;} /**
	 * Get node with text inside parentheses or square brackets (e.g. `(1)`)
	 * @return {Node}
	 */function getBrackets(){var startPos=pos;var token=tokens[startPos];var line=token.start.line;var column=token.start.column;pos++;var tsets=getTsets();var end=getLastPosition(tsets,line,column,1);pos++;return newNode(NodeType.BRACKETS,tsets,token.start.line,token.start.column,end);} /**
	 * Check if token is part of a class selector (e.g. `.abc`)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the class selector
	 */function checkClass(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(tokens[i].class_l)return tokens[i].class_l;if(tokens[i++].type !== NodeType.FULL_STOP)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;} /**
	 * Get node with a class selector
	 * @returns {Array} `['class', ['ident', x]]` where x is a class's
	 *      identifier (without `.`, e.g. `abc`).
	 */function getClass(){var startPos=pos;var x=[];pos++;x = x.concat(getIdentOrInterpolation());var token=tokens[startPos];return newNode(NodeType.CLASS,x,token.start.line,token.start.column);}function checkCombinator(i){if(i >= tokensLength)return 0;var l=undefined;if(l = checkCombinator1(i))tokens[i].combinatorType = 1;else if(l = checkCombinator2(i))tokens[i].combinatorType = 2;else if(l = checkCombinator3(i))tokens[i].combinatorType = 3;return l;}function getCombinator(){var type=tokens[pos].combinatorType;if(type === 1)return getCombinator1();if(type === 2)return getCombinator2();if(type === 3)return getCombinator3();} /**
	 * (1) `||`
	 */function checkCombinator1(i){if(tokens[i].type === NodeType.VERTICAL_LINE && tokens[i + 1].type === NodeType.VERTICAL_LINE)return 2;else return 0;}function getCombinator1(){var type=NodeType.COMBINATOR;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content='||';pos += 2;return newNode(type,content,line,column);} /**
	 * (1) `>`
	 * (2) `+`
	 * (3) `~`
	 */function checkCombinator2(i){var type=tokens[i].type;if(type === NodeType.PLUS_SIGN || type === NodeType.GREATER_THAN_SIGN || type === NodeType.TILDE)return 1;else return 0;}function getCombinator2(){var type=NodeType.COMBINATOR;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=tokens[pos++].toString();return newNode(type,content,line,column);} /**
	 * (1) `/panda/`
	 */function checkCombinator3(i){var start=i;if(tokens[i].type === NodeType.SOLIDUS)i++;else return 0;var l=undefined;if(l = checkIdent(i))i += l;else return 0;if(tokens[i].type === NodeType.SOLIDUS)i++;else return 0;return i - start;}function getCombinator3(){var type=NodeType.COMBINATOR;var token=tokens[pos];var line=token.start.line;var column=token.start.column; // Skip `/`.
	pos++;var ident=getIdent(); // Skip `/`.
	pos++;var content='/' + ident.content + '/';return newNode(type,content,line,column);} /**
	 * Check if token is a multiline comment.
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a multiline comment, otherwise `0`
	 */function checkCommentML(i){return i < tokensLength && tokens[i].type === NodeType.MULTILINE_COMMENT?1:0;} /**
	 * Get node with a multiline comment
	 * @returns {Array} `['commentML', x]` where `x`
	 *      is the comment's text (without `/*` and `* /`).
	 */function getCommentML(){var startPos=pos;var s=tokens[pos].toString().substring(2);var l=s.length;var token=tokens[startPos];var line=token.start.line;var column=token.start.column;if(s.charAt(l - 2) === '*' && s.charAt(l - 1) === '/')s = s.substring(0,l - 2);var end=getLastPosition(s,line,column,2);if(end[0] === line)end[1] += 2;pos++;return newNode(NodeType.MULTILINE_COMMENT,s,token.start.line,token.start.column,end);} /**
	 * Check if token is part of a single-line comment.
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a single-line comment, otherwise `0`
	 */function checkCommentSL(i){return i < tokensLength && tokens[i].type === NodeType.SINGLELINE_COMMENT?1:0;} /**
	 * Get node with a single-line comment.
	 * @returns {Array} `['commentSL', x]` where `x` is comment's message
	 *      (without `//`)
	 */function getCommentSL(){var startPos=pos;var x=undefined;var token=tokens[startPos];var line=token.start.line;var column=token.start.column;x = tokens[pos++].toString().substring(2);var end=getLastPosition(x,line,column + 2);return newNode(NodeType.SINGLELINE_COMMENT,x,token.start.line,token.start.column,end);} /**
	 * Check if token is part of a condition
	 * (e.g. `@if ...`, `@else if ...` or `@else ...`).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the condition
	 */function checkCondition(i){var start=i;var l=undefined;var _i=undefined;var s=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(['if','else'].indexOf(tokens[start + 1].toString()) < 0)return 0;while(i < tokensLength) {if(l = checkBlock(i))break;s = checkSC(i);_i = i + s;if(l = _checkCondition(_i))i += l + s;else break;}return i - start;}function _checkCondition(i){return checkVariable(i) || checkNumber(i) || checkInterpolation(i) || checkIdent(i) || checkOperator(i) || checkCombinator(i) || checkString(i);} /**
	 * Get node with a condition.
	 * @returns {Array} `['condition', x]`
	 */function getCondition(){var startPos=pos;var x=[];var s;var _pos;x.push(getAtkeyword());while(pos < tokensLength) {if(checkBlock(pos))break;s = checkSC(pos);_pos = pos + s;if(!_checkCondition(_pos))break;if(s)x = x.concat(getSC());x.push(_getCondition());}var token=tokens[startPos];return newNode(NodeType.CONDITION,x,token.start.line,token.start.column);}function _getCondition(){if(checkVariable(pos))return getVariable();if(checkNumber(pos))return getNumber();if(checkInterpolation(pos))return getInterpolation();if(checkIdent(pos))return getIdent();if(checkOperator(pos))return getOperator();if(checkCombinator(pos))return getCombinator();if(checkString(pos))return getString();} /**
	 * Check if token is part of a conditional statement
	 * (e.g. `@if ... {} @else if ... {} @else ... {}`).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the condition
	 */function checkConditionalStatement(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkCondition(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with a condition.
	 * @returns {Array} `['condition', x]`
	 */function getConditionalStatement(){var startPos=pos;var x=[];x.push(getCondition());x = x.concat(getSC());x.push(getBlock());var token=tokens[startPos];return newNode(NodeType.CONDITIONAL_STATEMENT,x,token.start.line,token.start.column);} /**
	 * Check if token is part of a declaration (property-value pair)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the declaration
	 */function checkDeclaration(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkProperty(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkPropertyDelim(i))i++;else return 0;if(l = checkSC(i))i += l;if(l = checkValue(i))i += l;else return 0;return i - start;} /**
	 * Get node with a declaration
	 * @returns {Array} `['declaration', ['property', x], ['propertyDelim'],
	 *       ['value', y]]`
	 */function getDeclaration(){var startPos=pos;var x=[];x.push(getProperty());x = x.concat(getSC());x.push(getPropertyDelim());x = x.concat(getSC());x.push(getValue());var token=tokens[startPos];return newNode(NodeType.DECLARATION,x,token.start.line,token.start.column);} /**
	 * Check if token is a semicolon
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a semicolon, otherwise `0`
	 */function checkDeclDelim(i){return i < tokensLength && tokens[i].type === NodeType.SEMICOLON?1:0;} /**
	 * Get node with a semicolon
	 * @returns {Array} `['declDelim']`
	 */function getDeclDelim(){var startPos=pos++;var token=tokens[startPos];return newNode(NodeType.DECLARATION_DELIMITER,';',token.start.line,token.start.column);} /**
	 * Check if token if part of `!default` word.
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the `!default` word
	 */function checkDefault(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i++].type !== NodeType.EXCLAMATION_MARK)return 0;if(l = checkSC(i))i += l;if(tokens[i].toString() === 'default'){tokens[start].defaultEnd = i;return i - start + 1;}else {return 0;}} /**
	 * Get node with a `!default` word
	 * @returns {Array} `['default', sc]` where `sc` is optional whitespace
	 */function getDefault(){var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=joinValues(pos,token.defaultEnd);pos = token.defaultEnd + 1;return newNode(NodeType.DEFAULT,content,line,column);} /**
	 * Check if token is a comma
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a comma, otherwise `0`
	 */function checkDelim(i){return i < tokensLength && tokens[i].type === NodeType.COMMA?1:0;} /**
	 * Get node with a comma
	 * @returns {Array} `['delim']`
	 */function getDelim(){var startPos=pos;pos++;var token=tokens[startPos];return newNode(NodeType.DELIMITER,',',token.start.line,token.start.column);} /**
	 * Check if token is part of a number with dimension unit (e.g. `10px`)
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkDimension(i){var ln=checkNumber(i);var li=undefined;if(i >= tokensLength || !ln || i + ln >= tokensLength)return 0;return (li = checkNmName2(i + ln))?ln + li:0;} /**
	 * Get node of a number with dimension unit
	 * @returns {Array} `['dimension', ['number', x], ['ident', y]]` where
	 *      `x` is a number converted to string (e.g. `'10'`) and `y` is
	 *      a dimension unit (e.g. `'px'`).
	 */function getDimension(){var startPos=pos;var x=[getNumber()];var token=tokens[pos];var ident=newNode(NodeType.IDENT,getNmName2(),token.start.line,token.start.column);x.push(ident);token = tokens[startPos];return newNode(NodeType.DIMENSION,x,token.start.line,token.start.column);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkExpression(i){var start=i;if(i >= tokensLength || tokens[i++].toString() !== 'expression' || i >= tokensLength || tokens[i].type !== NodeType.LEFT_PARENTHESIS)return 0;return tokens[i].right - start + 1;} /**
	 * @returns {Array}
	 */function getExpression(){var startPos=pos;var e;var token=tokens[startPos];var line=token.start.line;var column=token.start.column;pos++;e = joinValues(pos + 1,tokens[pos].right - 1);var end=getLastPosition(e,line,column,1);if(end[0] === line)end[1] += 11;pos = tokens[pos].right + 1;return newNode(NodeType.EXPRESSION,e,token.start.line,token.start.column,end);}function checkExtend(i){var l=0;if(l = checkExtend1(i))tokens[i].extend_child = 1;else if(l = checkExtend2(i))tokens[i].extend_child = 2;return l;}function getExtend(){var type=tokens[pos].extend_child;if(type === 1)return getExtend1();else if(type === 2)return getExtend2();} /**
	 * Checks if token is part of an extend with `!optional` flag.
	 * @param {Number} i
	 */function checkExtend1(i){var start=i;var l;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].toString() !== 'extend')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkSelectorsGroup(i))i += l;else return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkOptional(i))i += l;else return 0;return i - start;}function getExtend1(){var startPos=pos;var x=[].concat([getAtkeyword()],getSC(),getSelectorsGroup(),getSC(),[getOptional()]);var token=tokens[startPos];return newNode(NodeType.EXTEND,x,token.start.line,token.start.column);} /**
	 * Checks if token is part of an extend without `!optional` flag.
	 * @param {Number} i
	 */function checkExtend2(i){var start=i;var l;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].toString() !== 'extend')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkSelectorsGroup(i))i += l;else return 0;return i - start;}function getExtend2(){var startPos=pos;var x=[].concat([getAtkeyword()],getSC(),getSelectorsGroup());var token=tokens[startPos];return newNode(NodeType.EXTEND,x,token.start.line,token.start.column);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkFunction(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i < tokensLength && tokens[i].type === NodeType.LEFT_PARENTHESIS?tokens[i].right - start + 1:0;} /**
	 * @returns {Array}
	 */function getFunction(){var startPos=pos;var x=getIdentOrInterpolation();var body=undefined;body = getArguments();x.push(body);var token=tokens[startPos];return newNode(NodeType.FUNCTION,x,token.start.line,token.start.column);} /**
	 * @returns {Array}
	 */function getArguments(){var startPos=pos;var x=[];var body=undefined;var token=tokens[startPos];var line=token.start.line;var column=token.start.column;pos++;while(pos < tokensLength && tokens[pos].type !== NodeType.RIGHT_PARENTHESIS) {if(checkDeclaration(pos))x.push(getDeclaration());else if(checkArgument(pos)){body = getArgument();if(typeof body.content === 'string')x.push(body);else x = x.concat(body);}else if(checkClass(pos))x.push(getClass());else throwError();}var end=getLastPosition(x,line,column,1);pos++;return newNode(NodeType.ARGUMENTS,x,token.start.line,token.start.column,end);} /**
	 * Check if token is part of an identifier
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the identifier
	 */function checkIdent(i){var start=i;var interpolations=[];var wasIdent=undefined;var wasInt=false;var l=undefined;if(i >= tokensLength)return 0; // Check if token is part of an identifier starting with `_`:
	if(tokens[i].type === NodeType.LOW_LINE)return checkIdentLowLine(i);if(tokens[i].type === NodeType.HYPHEN_MINUS && tokens[i + 1].type === NodeType.DIGIT)return 0; // If token is a character, `-`, `$` or `*`, skip it & continue:
	if(l = _checkIdent(i))i += l;else return 0; // Remember if previous token's type was identifier:
	wasIdent = tokens[i - 1].type === NodeType.CHARACTER;while(i < tokensLength) {l = _checkIdent(i);if(!l)break;wasIdent = true;i += l;}if(!wasIdent && !wasInt && tokens[start].type !== NodeType.ASTERISK)return 0;tokens[start].ident_last = i - 1;if(interpolations.length)tokens[start].interpolations = interpolations;return i - start;}function _checkIdent(i){if(tokens[i].type === NodeType.HYPHEN_MINUS || tokens[i].type === NodeType.CHARACTER || tokens[i].type === NodeType.DOLLAR_SIGN || tokens[i].type === NodeType.LOW_LINE || tokens[i].type === NodeType.DIGIT || tokens[i].type === NodeType.ASTERISK)return 1;return 0;} /**
	 * Check if token is part of an identifier starting with `_`
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the identifier
	 */function checkIdentLowLine(i){var start=i;if(i++ >= tokensLength)return 0;for(;i < tokensLength;i++) {if(tokens[i].type !== NodeType.HYPHEN_MINUS && tokens[i].type !== NodeType.DIGIT && tokens[i].type !== NodeType.LOW_LINE && tokens[i].type !== NodeType.CHARACTER)break;} // Save index number of the last token of the identifier:
	tokens[start].ident_last = i - 1;return i - start;} /**
	 * Get node with an identifier
	 * @returns {Array} `['ident', x]` where `x` is identifier's name
	 */function getIdent(){var startPos=pos;var x=joinValues(pos,tokens[pos].ident_last);pos = tokens[pos].ident_last + 1;var token=tokens[startPos];return newNode(NodeType.IDENT,x,token.start.line,token.start.column);}function checkIdentOrInterpolation(i){var start=i;var l=undefined;while(i < tokensLength) {if(l = checkInterpolation(i) || checkIdent(i))i += l;else break;}return i - start;}function getIdentOrInterpolation(){var x=[];while(pos < tokensLength) {if(checkInterpolation(pos))x.push(getInterpolation());else if(checkIdent(pos))x.push(getIdent());else break;}return x;} /**
	 * Check if token is part of `!important` word
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkImportant(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i++].type !== NodeType.EXCLAMATION_MARK)return 0;if(l = checkSC(i))i += l;if(tokens[i].toString() === 'important'){tokens[start].importantEnd = i;return i - start + 1;}else {return 0;}} /**
	 * Get node with `!important` word
	 * @returns {Array} `['important', sc]` where `sc` is optional whitespace
	 */function getImportant(){var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=joinValues(pos,token.importantEnd);pos = token.importantEnd + 1;return newNode(NodeType.IMPORTANT,content,line,column);} /**
	 * Check if token is part of an included mixin (`@include` or `@extend`
	 *      directive).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the included mixin
	 */function checkInclude(i){var l;if(i >= tokensLength)return 0;if(l = checkInclude1(i))tokens[i].include_type = 1;else if(l = checkInclude2(i))tokens[i].include_type = 2;else if(l = checkInclude3(i))tokens[i].include_type = 3;else if(l = checkInclude4(i))tokens[i].include_type = 4;else if(l = checkInclude5(i))tokens[i].include_type = 5;return l;} /**
	 * Check if token is part of `!global` word
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkGlobal(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i++].type !== NodeType.EXCLAMATION_MARK)return 0;if(l = checkSC(i))i += l;if(tokens[i].toString() === 'global'){tokens[start].globalEnd = i;return i - start + 1;}else {return 0;}} /**
	 * Get node with `!global` word
	 */function getGlobal(){var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=joinValues(pos,token.globalEnd);pos = token.globalEnd + 1;return newNode(NodeType.GLOBAL,content,line,column);} /**
	 * Get node with included mixin
	 * @returns {Array} `['include', x]`
	 */function getInclude(){switch(tokens[pos].include_type){case 1:return getInclude1();case 2:return getInclude2();case 3:return getInclude3();case 4:return getInclude4();case 5:return getInclude5();}} /**
	 * Get node with included mixin with keyfames selector like
	 * `@include nani(foo) { 0% {}}`
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the include
	 */function checkInclude1(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].toString() !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkArguments(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkKeyframesBlocks(i))i += l;else return 0;return i - start;} /**
	 * Get node with included mixin with keyfames selector like
	 * `@include nani(foo) { 0% {}}`
	 * @returns {Array} `['include', ['atkeyword', x], sc, ['selector', y], sc,
	 *      ['arguments', z], sc, ['block', q], sc` where `x` is `include` or
	 *      `extend`, `y` is mixin's identifier (selector), `z` are arguments
	 *      passed to the mixin, `q` is block passed to the mixin containing a
	 *      ruleset > selector > keyframesSelector, and `sc` are optional
	 *      whitespaces
	 */function getInclude1(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation(),getSC(),getArguments(),getSC(),getKeyframesBlocks());var token=tokens[startPos];return newNode(NodeType.IncludeType,x,token.ln,token.col);} /**
	 * Check if token is part of an included mixin like `@include nani(foo) {...}`
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the include
	 */function checkInclude2(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].value !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkArguments(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with included mixin like `@include nani(foo) {...}`
	 * @returns {Array} `['include', ['atkeyword', x], sc, ['selector', y], sc,
	 *      ['arguments', z], sc, ['block', q], sc` where `x` is `include` or
	 *      `extend`, `y` is mixin's identifier (selector), `z` are arguments
	 *      passed to the mixin, `q` is block passed to the mixin and `sc`
	 *      are optional whitespaces
	 */function getInclude2(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation(),getSC(),getArguments(),getSC(),getBlock());var token=tokens[startPos];return newNode(NodeType.INCLUDE,x,token.start.line,token.start.column);} /**
	 * Check if token is part of an included mixin like `@include nani(foo)`
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the include
	 */function checkInclude3(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].toString() !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkArguments(i))i += l;else return 0;return i - start;} /**
	 * Get node with included mixin like `@include nani(foo)`
	 * @returns {Array} `['include', ['atkeyword', x], sc, ['selector', y], sc,
	 *      ['arguments', z], sc]` where `x` is `include` or `extend`, `y` is
	 *      mixin's identifier (selector), `z` are arguments passed to the
	 *      mixin and `sc` are optional whitespaces
	 */function getInclude3(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation(),getSC(),getArguments());var token=tokens[startPos];return newNode(NodeType.INCLUDE,x,token.start.line,token.start.column);} /**
	 * Check if token is part of an included mixin with a content block passed
	 *      as an argument (e.g. `@include nani {...}`)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the mixin
	 */function checkInclude4(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].toString() !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with an included mixin with a content block passed
	 *      as an argument (e.g. `@include nani {...}`)
	 * @returns {Array} `['include', x]`
	 */function getInclude4(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation(),getSC(),getBlock());var token=tokens[startPos];return newNode(NodeType.INCLUDE,x,token.start.line,token.start.column);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkInclude5(i){var start=i;var l=undefined;if(l = checkAtkeyword(i))i += l;else return 0;if(tokens[start + 1].toString() !== 'include')return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;} /**
	 * @returns {Array} `['include', x]`
	 */function getInclude5(){var startPos=pos;var x=[].concat(getAtkeyword(),getSC(),getIdentOrInterpolation());var token=tokens[startPos];return newNode(NodeType.INCLUDE,x,token.start.line,token.start.column);} /**
	 * Check if token is part of an interpolated variable (e.g. `#{$nani}`).
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkInterpolation(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(tokens[i].type !== NodeType.NUMBER_SIGN || !tokens[i + 1] || tokens[i + 1].type !== NodeType.LEFT_CURLY_BRACKET)return 0;i += 2;while(tokens[i].type !== TokenType.RightCurlyBracket) {if(l = checkArgument(i))i += l;else return 0;}return tokens[i].type === NodeType.RIGHT_CURLY_BRACKET?i - start + 1:0;} /**
	 * Get node with an interpolated variable
	 * @returns {Array} `['interpolation', x]`
	 */function getInterpolation(){var startPos=pos;var x=[];var token=tokens[startPos];var line=token.start.line;var column=token.start.column; // Skip `#{`:
	pos += 2;while(pos < tokensLength && tokens[pos].type !== TokenType.RightCurlyBracket) {var body=getArgument();if(typeof body.content === 'string')x.push(body);else x = x.concat(body);}var end=getLastPosition(x,line,column,1); // Skip `}`:
	pos++;return newNode(NodeType.INTERPOLATION,x,token.start.line,token.start.column,end);}function checkKeyframesBlock(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkKeyframesSelector(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;}function getKeyframesBlock(){var type=NodeType.RULESET;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=[].concat([getKeyframesSelector()],getSC(),[getBlock()]);return newNode(type,content,line,column);}function checkKeyframesBlocks(i){var start=i;var l=undefined;if(i < tokensLength && tokens[i].type === NodeType.LEFT_CURLY_BRACKET)i++;else return 0;if(l = checkSC(i))i += l;if(l = checkKeyframesBlock(i))i += l;else return 0;while(tokens[i].type !== NodeType.RIGHT_CURLY_BRACKET) {if(l = checkSC(i))i += l;else if(l = checkKeyframesBlock(i))i += l;else break;}if(i < tokensLength && tokens[i].type === NodeType.RIGHT_CURLY_BRACKET)i++;else return 0;return i - start;}function getKeyframesBlocks(){var type=NodeType.BLOCK;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=[];var keyframesBlocksEnd=token.right; // Skip `{`.
	pos++;while(pos < keyframesBlocksEnd) {if(checkSC(pos))content = content.concat(getSC());else if(checkKeyframesBlock(pos))content.push(getKeyframesBlock());}var end=getLastPosition(content,line,column,1); // Skip `}`.
	pos++;return newNode(type,content,line,column,end);} /**
	 * Check if token is part of a @keyframes rule.
	 * @param {Number} i Token's index number
	 * @return {Number} Length of the @keyframes rule
	 */function checkKeyframesRule(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;var atruleName=joinValues2(i - l,l);if(atruleName.indexOf('keyframes') === -1)return 0;if(l = checkSC(i))i += l;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkKeyframesBlocks(i))i += l;else return 0;return i - start;} /**
	 * @return {Node}
	 */function getKeyframesRule(){var type=NodeType.ATRULE;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=[].concat([getAtkeyword()],getSC(),getIdentOrInterpolation(),getSC(),[getKeyframesBlocks()]);return newNode(type,content,line,column);}function checkKeyframesSelector(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkIdent(i)){ // Valid selectors are only `from` and `to`.
	var selector=joinValues2(i,l);if(selector !== 'from' && selector !== 'to')return 0;i += l;tokens[start].keyframesSelectorType = 1;}else if(l = checkPercentage(i)){i += l;tokens[start].keyframesSelectorType = 2;}else if(l = checkInterpolation(i)){i += l;tokens[start].keyframesSelectorType = 3;}else {return 0;}return i - start;}function getKeyframesSelector(){var keyframesSelectorType=NodeType.KEYFRAMES_SELECTOR;var selectorType=NodeType.SELECTOR;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=[];if(token.keyframesSelectorType === 1){content.push(getIdent());}else if(token.keyframesSelectorType === 2){content.push(getPercentage());}else {content.push(getInterpolation());}var keyframesSelector=newNode(keyframesSelectorType,content,line,column);return newNode(selectorType,[keyframesSelector],line,column);} /**
	 * Check if token is part of a loop.
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the loop
	 */function checkLoop(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkAtkeyword(i))i += l;else return 0;if(['for','each','while'].indexOf(tokens[start + 1].toString()) < 0)return 0;while(i < tokensLength) {if(l = checkBlock(i)){i += l;break;}else if(l = checkVariable(i) || checkNumber(i) || checkInterpolation(i) || checkIdent(i) || checkSC(i) || checkOperator(i) || checkCombinator(i) || checkString(i))i += l;else return 0;}return i - start;} /**
	 * Get node with a loop.
	 * @returns {Array} `['loop', x]`
	 */function getLoop(){var startPos=pos;var x=[];x.push(getAtkeyword());while(pos < tokensLength) {if(checkBlock(pos)){x.push(getBlock());break;}else if(checkVariable(pos))x.push(getVariable());else if(checkNumber(pos))x.push(getNumber());else if(checkInterpolation(pos))x.push(getInterpolation());else if(checkIdent(pos))x.push(getIdent());else if(checkOperator(pos))x.push(getOperator());else if(checkCombinator(pos))x.push(getCombinator());else if(checkSC(pos))x = x.concat(getSC());else if(checkString(pos))x.push(getString());}var token=tokens[startPos];return newNode(NodeType.LOOP,x,token.start.line,token.start.column);} /**
	 * Check if token is part of a mixin
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the mixin
	 */function checkMixin(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if((l = checkAtkeyword(i)) && tokens[i + 1].toString() === 'mixin')i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkArguments(i))i += l;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;} /**
	 * Get node with a mixin
	 * @returns {Array} `['mixin', x]`
	 */function getMixin(){var startPos=pos;var x=[getAtkeyword()];x = x.concat(getSC());if(checkIdentOrInterpolation(pos))x = x.concat(getIdentOrInterpolation());x = x.concat(getSC());if(checkArguments(pos))x.push(getArguments());x = x.concat(getSC());if(checkBlock(pos))x.push(getBlock());var token=tokens[startPos];return newNode(NodeType.MIXIN,x,token.start.line,token.start.column);} /**
	 * Check if token is a namespace sign (`|`)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is `|`, `0` if not
	 */function checkNamespace(i){return i < tokensLength && tokens[i].type === NodeType.VERTICAL_LINE?1:0;} /**
	 * Get node with a namespace sign
	 * @returns {Array} `['namespace']`
	 */function getNamespace(){var startPos=pos;pos++;var token=tokens[startPos];return newNode(NodeType.NAMESPACE_SEPARATOR,'|',token.start.line,token.start.column);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkNmName2(i){if(tokens[i].type === NodeType.CHARACTER)return 1;else if(tokens[i].type !== NodeType.DIGIT)return 0;i++;return i < tokensLength && tokens[i].type === NodeType.CHARACTER?2:1;} /**
	 * @returns {String}
	 */function getNmName2(){var s=tokens[pos].toString();if(tokens[pos++].type === NodeType.DIGIT && pos < tokensLength && tokens[pos].type === NodeType.CHARACTER)s += tokens[pos++].toString();return s;} /**
	 * Check if token is part of a number
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of number
	 */function checkNumber(i){if(i >= tokensLength)return 0;if(tokens[i].number_l)return tokens[i].number_l; // `10`:
	if(i < tokensLength && tokens[i].type === NodeType.DIGIT && (!tokens[i + 1] || tokens[i + 1] && tokens[i + 1].type !== NodeType.FULL_STOP))return tokens[i].number_l = 1,tokens[i].number_l; // `10.`:
	if(i < tokensLength && tokens[i].type === NodeType.DIGIT && tokens[i + 1] && tokens[i + 1].type === NodeType.FULL_STOP && (!tokens[i + 2] || tokens[i + 2].type !== NodeType.DIGIT))return tokens[i].number_l = 2,tokens[i].number_l; // `.10`:
	if(i < tokensLength && tokens[i].type === NodeType.FULL_STOP && tokens[i + 1].type === NodeType.DIGIT)return tokens[i].number_l = 2,tokens[i].number_l; // `10.10`:
	if(i < tokensLength && tokens[i].type === NodeType.DIGIT && tokens[i + 1] && tokens[i + 1].type === NodeType.FULL_STOP && tokens[i + 2] && tokens[i + 2].type === NodeType.DIGIT)return tokens[i].number_l = 3,tokens[i].number_l;return 0;} /**
	 * Get node with number
	 * @returns {Array} `['number', x]` where `x` is a number converted
	 *      to string.
	 */function getNumber(){var s='';var startPos=pos;var l=tokens[pos].number_l;for(var j=0;j < l;j++) {s += tokens[pos + j].toString();}pos += l;var token=tokens[startPos];return newNode(NodeType.NUMBER,s,token.start.line,token.start.column);} /**
	 * Check if token is an operator (`/`, `%`, `,`, `:` or `=`).
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is an operator, otherwise `0`
	 */function checkOperator(i){if(i >= tokensLength)return 0;if(tokens[i].type === NodeType.EQUALS_SIGN && tokens[i + 1].type === NodeType.EQUALS_SIGN)return 2;if(tokens[i].type === NodeType.EXCLAMATION_MARK && tokens[i + 1].type === NodeType.EQUALS_SIGN)return 2;switch(tokens[i].type){case NodeType.SOLIDUS:case NodeType.PERCENT_SIGN:case NodeType.COMMA:case NodeType.COLON:case NodeType.EQUALS_SIGN:case NodeType.LESS_THAN_SIGN:case NodeType.GREATER_THAN_SIGN:case NodeType.ASTERISK:return 1;}return 0;} /**
	 * Get node with an operator
	 * @returns {Array} `['operator', x]` where `x` is an operator converted
	 *      to string.
	 */function getOperator(){var startPos=pos;var x=tokens[pos].toString();if(tokens[pos].type === NodeType.EQUALS_SIGN && tokens[pos + 1].type === NodeType.EQUALS_SIGN){x += tokens[pos + 1].toString();pos++;}else if(tokens[pos].type === NodeType.EXCLAMATION_MARK && tokens[pos + 1].type === NodeType.EQUALS_SIGN){x += tokens[pos + 1].toString();pos++;}pos++;var token=tokens[startPos];return newNode(NodeType.OPERATOR,x,token.start.line,token.start.column);} /**
	 * Check if token is part of `!optional` word
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkOptional(i){var start=i;var l=undefined;if(i >= tokensLength || tokens[i++].type !== NodeType.EXCLAMATION_MARK)return 0;if(l = checkSC(i))i += l;if(tokens[i].toString() === 'optional'){tokens[start].optionalEnd = i;return i - start + 1;}else {return 0;}} /**
	 * Get node with `!optional` word
	 */function getOptional(){var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=joinValues(pos,token.optionalEnd);pos = token.optionalEnd + 1;return newNode(NodeType.OPTIONAL,content,line,column);} /**
	 * Check if token is part of text inside parentheses, e.g. `(1)`
	 * @param {Number} i Token's index number
	 * @return {Number}
	 */function checkParentheses(i){if(i >= tokensLength || tokens[i].type !== NodeType.LEFT_PARENTHESIS)return 0;return tokens[i].right - i + 1;} /**
	 * Get node with text inside parentheses, e.g. `(1)`
	 * @return {Node}
	 */function getParentheses(){var type=NodeType.PARENTHESES;var token=tokens[pos];var line=token.start.line;var column=token.start.column;pos++;var tsets=getTsets();var end=getLastPosition(tsets,line,column,1);pos++;return newNode(type,tsets,line,column,end);} /**
	 * Check if token is a parent selector (`&`).
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkParentSelector(i){return i < tokensLength && tokens[i].type === NodeType.AMPERSAND?1:0;} /**
	 * Get node with a parent selector
	 */function getParentSelector(){var startPos=pos;pos++;var token=tokens[startPos];return newNode(NodeType.PARENT_SELECTOR,'&',token.start.line,token.start.column);}function checkParentSelectorExtension(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;while(i < tokensLength) {if(l = checkNumber(i) || checkIdentOrInterpolation(i))i += l;else break;}return i - start;}function getParentSelectorExtension(){var type=NodeType.PARENT_SELECTOR_EXTENSION;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=[];while(pos < tokensLength) {if(checkNumber(pos))content.push(getNumber());else if(checkIdentOrInterpolation(pos))content = content.concat(getIdentOrInterpolation());else break;}return newNode(type,content,line,column);}function checkParentSelectorWithExtension(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkParentSelector(i))i += l;else return 0;if(l = checkParentSelectorExtension(i))i += l;return i - start;}function getParentSelectorWithExtension(){var content=[getParentSelector()];if(checkParentSelectorExtension(pos))content.push(getParentSelectorExtension());return content;} /**
	 * Check if token is part of a number with percent sign (e.g. `10%`)
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkPercentage(i){var x;if(i >= tokensLength)return 0;x = checkNumber(i);if(!x || i + x >= tokensLength)return 0;return tokens[i + x].type === NodeType.PERCENT_SIGN?x + 1:0;} /**
	 * Get node of number with percent sign
	 * @returns {Array} `['percentage', ['number', x]]` where `x` is a number
	 *      (without percent sign) converted to string.
	 */function getPercentage(){var startPos=pos;var x=[getNumber()];var token=tokens[startPos];var line=token.start.line;var column=token.start.column;var end=getLastPosition(x,line,column,1);pos++;return newNode(NodeType.PERCENTAGE,x,token.start.line,token.start.column,end);} /**
	 * Check if token is part of a placeholder selector (e.g. `%abc`).
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the selector
	 */function checkPlaceholder(i){var l;if(i >= tokensLength)return 0;if(tokens[i].placeholder_l)return tokens[i].placeholder_l;if(tokens[i].type === NodeType.PERCENT_SIGN && (l = checkIdentOrInterpolation(i + 1))){tokens[i].placeholder_l = l + 1;return l + 1;}else return 0;} /**
	 * Get node with a placeholder selector
	 * @returns {Array} `['placeholder', ['ident', x]]` where x is a placeholder's
	 *      identifier (without `%`, e.g. `abc`).
	 */function getPlaceholder(){var startPos=pos;pos++;var x=getIdentOrInterpolation();var token=tokens[startPos];return newNode(NodeType.PLACEHOLDER,x,token.start.line,token.start.column);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkProgid(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(joinValues2(i,6) === 'progid:DXImageTransform.Microsoft.')i += 6;else return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(tokens[i].type === NodeType.LEFT_PARENTHESIS){tokens[start].progid_end = tokens[i].right;i = tokens[i].right + 1;}else return 0;return i - start;} /**
	 * @returns {Array}
	 */function getProgid(){var startPos=pos;var progid_end=tokens[pos].progid_end;var x=joinValues(pos,progid_end);pos = progid_end + 1;var token=tokens[startPos];return newNode(NodeType.PROGID,x,token.start.line,token.start.column);} /**
	 * Check if token is part of a property
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the property
	 */function checkProperty(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkVariable(i) || checkIdentOrInterpolation(i))i += l;else return 0;return i - start;} /**
	 * Get node with a property
	 * @returns {Array} `['property', x]`
	 */function getProperty(){var startPos=pos;var x=[];if(checkVariable(pos)){x.push(getVariable());}else {x = x.concat(getIdentOrInterpolation());}var token=tokens[startPos];return newNode(NodeType.PROPERTY,x,token.start.line,token.start.column);} /**
	 * Check if token is a colon
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is a colon, otherwise `0`
	 */function checkPropertyDelim(i){return i < tokensLength && tokens[i].type === NodeType.COLON?1:0;} /**
	 * Get node with a colon
	 * @returns {Array} `['propertyDelim']`
	 */function getPropertyDelim(){var startPos=pos;pos++;var token=tokens[startPos];return newNode(NodeType.PROPERTY_DELIMITER,':',token.start.line,token.start.column);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkPseudo(i){return checkPseudoe(i) || checkPseudoc(i);} /**
	 * @returns {Array}
	 */function getPseudo(){if(checkPseudoe(pos))return getPseudoe();if(checkPseudoc(pos))return getPseudoc();} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkPseudoe(i){var l;if(i >= tokensLength || tokens[i++].type !== NodeType.COLON || i >= tokensLength || tokens[i++].type !== NodeType.COLON)return 0;return (l = checkIdentOrInterpolation(i))?l + 2:0;} /**
	 * @returns {Array}
	 */function getPseudoe(){var startPos=pos;pos += 2;var x=getIdentOrInterpolation();var token=tokens[startPos];return newNode(NodeType.PSEUDO_ELEMENT,x,token.start.line,token.start.column);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkPseudoc(i){var l;if(i >= tokensLength || tokens[i].type !== NodeType.COLON)return 0;if(l = checkPseudoClass3(i))tokens[i].pseudoClassType = 3;else if(l = checkPseudoClass4(i))tokens[i].pseudoClassType = 4;else if(l = checkPseudoClass5(i))tokens[i].pseudoClassType = 5;else if(l = checkPseudoClass1(i))tokens[i].pseudoClassType = 1;else if(l = checkPseudoClass2(i))tokens[i].pseudoClassType = 2;else if(l = checkPseudoClass6(i))tokens[i].pseudoClassType = 6;else return 0;return l;} /**
	 * @returns {Array}
	 */function getPseudoc(){var childType=tokens[pos].pseudoClassType;if(childType === 1)return getPseudoClass1();if(childType === 2)return getPseudoClass2();if(childType === 3)return getPseudoClass3();if(childType === 4)return getPseudoClass4();if(childType === 5)return getPseudoClass5();if(childType === 6)return getPseudoClass6();} /**
	 * (-) `:not(panda)`
	 */function checkPseudoClass1(i){var start=i; // Skip `:`.
	i++;if(i >= tokensLength)return 0;var l=undefined;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength || tokens[i].type !== NodeType.LEFT_PARENTHESIS)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSelectorsGroup(i))i += l;else return 0;if(i !== right)return 0;return right - start + 1;} /**
	 * (-) `:not(panda)`
	 */function getPseudoClass1(){var type=NodeType.PSEUDO_CLASS;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=[]; // Skip `:`.
	pos++;content = content.concat(getIdentOrInterpolation());{var _type=NodeType.ARGUMENTS;var _token=tokens[pos];var _line=_token.start.line;var _column=_token.start.column; // Skip `(`.
	pos++;var selectors=getSelectorsGroup();var end=getLastPosition(selectors,_line,_column,1);var args=newNode(_type,selectors,_line,_column,end);content.push(args); // Skip `)`.
	pos++;}return newNode(type,content,line,column);} /**
	 * (1) `:nth-child(odd)`
	 * (2) `:nth-child(even)`
	 * (3) `:lang(de-DE)`
	 */function checkPseudoClass2(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength || tokens[i].type !== NodeType.LEFT_PARENTHESIS)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSC(i))i += l;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(l = checkSC(i))i += l;if(i !== right)return 0;return i - start + 1;}function getPseudoClass2(){var type=NodeType.PSEUDO_CLASS;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=[]; // Skip `:`.
	pos++;content = content.concat(getIdentOrInterpolation());var l=tokens[pos].ln;var c=tokens[pos].col;var value=[]; // Skip `(`.
	pos++;value = value.concat(getSC()).concat(getIdentOrInterpolation()).concat(getSC());var end=getLastPosition(value,l,c,1);var args=newNode(NodeType.ARGUMENTS,value,l,c,end);content.push(args); // Skip `)`.
	pos++;return newNode(type,content,line,column);} /**
	 * (-) `:nth-child(-3n + 2)`
	 */function checkPseudoClass3(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength || tokens[i].type !== NodeType.LEFT_PARENTHESIS)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSC(i))i += l;if(l = checkUnary(i))i += l;if(i >= tokensLength)return 0;if(tokens[i].type === NodeType.DIGIT)i++;if(i >= tokensLength)return 0;if(tokens[i].toString() === 'n')i++;else return 0;if(l = checkSC(i))i += l;if(i >= tokensLength)return 0;if(tokens[i].toString() === '+' || tokens[i].toString() === '-')i++;else return 0;if(l = checkSC(i))i += l;if(tokens[i].type === NodeType.DIGIT)i++;else return 0;if(l = checkSC(i))i += l;if(i !== right)return 0;return i - start + 1;}function getPseudoClass3(){var type=NodeType.PSEUDO_CLASS;var token=tokens[pos];var line=token.start.line;var column=token.start.column; // Skip `:`.
	pos++;var content=getIdentOrInterpolation();var l=tokens[pos].ln;var c=tokens[pos].col;var value=[]; // Skip `(`.
	pos++;if(checkUnary(pos))value.push(getUnary());if(checkNumber(pos))value.push(getNumber());{var _l=tokens[pos].ln;var _c=tokens[pos].col;var _content=tokens[pos].toString();var ident=newNode(NodeType.IDENT,_content,_l,_c);value.push(ident);pos++;}value = value.concat(getSC());if(checkUnary(pos))value.push(getUnary());value = value.concat(getSC());if(checkNumber(pos))value.push(getNumber());value = value.concat(getSC());var end=getLastPosition(value,l,c,1);var args=newNode(NodeType.ARGUMENTS,value,l,c,end);content.push(args); // Skip `)`.
	pos++;return newNode(type,content,line,column);} /**
	 * (-) `:nth-child(-3n)`
	 */function checkPseudoClass4(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength)return 0;if(tokens[i].type !== NodeType.LEFT_PARENTHESIS)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSC(i))i += l;if(l = checkUnary(i))i += l;if(tokens[i].type === NodeType.DIGIT)i++;if(tokens[i].toString() === 'n')i++;else return 0;if(l = checkSC(i))i += l;if(i !== right)return 0;return i - start + 1;}function getPseudoClass4(){var type=NodeType.PSEUDO_CLASS;var token=tokens[pos];var line=token.start.line;var column=token.start.column; // Skip `:`.
	pos++;var content=getIdentOrInterpolation();var l=tokens[pos].ln;var c=tokens[pos].col;var value=[]; // Skip `(`.
	pos++;value = value.concat(getSC());if(checkUnary(pos))value.push(getUnary());if(checkNumber(pos))value.push(getNumber());if(checkIdent(pos))value.push(getIdent());value = value.concat(getSC());var end=getLastPosition(value,l,c,1);var args=newNode(NodeType.ARGUMENTS,value,l,c,end);content.push(args); // Skip `)`.
	pos++;return newNode(type,content,line,column);} /**
	 * (-) `:nth-child(+8)`
	 */function checkPseudoClass5(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;if(i >= tokensLength)return 0;if(tokens[i].type !== NodeType.LEFT_PARENTHESIS)return 0;var right=tokens[i].right; // Skip `(`.
	i++;if(l = checkSC(i))i += l;if(l = checkUnary(i))i += l;if(tokens[i].type === NodeType.DIGIT)i++;else return 0;if(l = checkSC(i))i += l;if(i !== right)return 0;return i - start + 1;}function getPseudoClass5(){var type=NodeType.PSEUDO_CLASS;var token=tokens[pos];var line=token.start.line;var column=token.start.column; // Skip `:`.
	pos++;var content=getIdentOrInterpolation();var l=tokens[pos].ln;var c=tokens[pos].col;var value=[]; // Skip `(`.
	pos++;if(checkUnary(pos))value.push(getUnary());if(checkNumber(pos))value.push(getNumber());value = value.concat(getSC());var end=getLastPosition(value,l,c,1);var args=newNode(NodeType.ARGUMENTS,value,l,c,end);content.push(args); // Skip `)`.
	pos++;return newNode(type,content,line,column);} /**
	 * (-) `:checked`
	 */function checkPseudoClass6(i){var start=i;var l=0; // Skip `:`.
	i++;if(i >= tokensLength)return 0;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;}function getPseudoClass6(){var type=NodeType.PSEUDO_CLASS;var token=tokens[pos];var line=token.start.line;var column=token.start.column; // Skip `:`.
	pos++;var content=getIdentOrInterpolation();return newNode(type,content,line,column);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkRuleset(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkSelectorsGroup(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkBlock(i))i += l;else return 0;return i - start;}function getRuleset(){var type=NodeType.RULESET;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=[];content = content.concat(getSelectorsGroup());content = content.concat(getSC());content.push(getBlock());return newNode(type,content,line,column);} /**
	 * Check if token is marked as a space (if it's a space or a tab
	 *      or a line break).
	 * @param {Number} i
	 * @returns {Number} Number of spaces in a row starting with the given token.
	 */function checkS(i){return i < tokensLength && tokens[i].ws?tokens[i].ws_last - i + 1:0;} /**
	 * Get node with spaces
	 * @returns {Array} `['s', x]` where `x` is a string containing spaces
	 */function getS(){var startPos=pos;var x=joinValues(pos,tokens[pos].ws_last);pos = tokens[pos].ws_last + 1;var token=tokens[startPos];return newNode(NodeType.SPACE,x,token.start.line,token.start.column);} /**
	 * Check if token is a space or a comment.
	 * @param {Number} i Token's index number
	 * @returns {Number} Number of similar (space or comment) tokens
	 *      in a row starting with the given token.
	 */function checkSC(i){if(i >= tokensLength)return 0;var l=undefined;var lsc=0;while(i < tokensLength) {if(!(l = checkS(i)) && !(l = checkCommentML(i)) && !(l = checkCommentSL(i)))break;i += l;lsc += l;}return lsc || 0;} /**
	 * Get node with spaces and comments
	 * @returns {Array} Array containing nodes with spaces (if there are any)
	 *      and nodes with comments (if there are any):
	 *      `[['s', x]*, ['comment', y]*]` where `x` is a string of spaces
	 *      and `y` is a comment's text (without `/*` and `* /`).
	 */function getSC(){var sc=[];if(pos >= tokensLength)return sc;while(pos < tokensLength) {if(checkS(pos))sc.push(getS());else if(checkCommentML(pos))sc.push(getCommentML());else if(checkCommentSL(pos))sc.push(getCommentSL());else break;}return sc;} /**
	 * Check if token is part of a hexadecimal number (e.g. `#fff`) inside
	 *      a simple selector
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkShash(i){var l;if(i >= tokensLength || tokens[i].type !== NodeType.NUMBER_SIGN)return 0;return (l = checkIdentOrInterpolation(i + 1))?l + 1:0;} /**
	 * Get node with a hexadecimal number (e.g. `#fff`) inside a simple
	 *      selector
	 * @returns {Array} `['shash', x]` where `x` is a hexadecimal number
	 *      converted to string (without `#`, e.g. `fff`)
	 */function getShash(){var startPos=pos;var token=tokens[startPos];pos++;var x=getIdentOrInterpolation();return newNode(NodeType.ID,x,token.start.line,token.start.column);} /**
	 * Check if token is part of a string (text wrapped in quotes)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is part of a string, `0` if not
	 */function checkString(i){return i < tokensLength && tokens[i].type === NodeType.STRING?1:0;} /**
	 * Get string's node
	 * @returns {Array} `['string', x]` where `x` is a string (including
	 *      quotes).
	 */function getString(){var startPos=pos;var x=tokens[pos++].toString();var token=tokens[startPos];return newNode(NodeType.STRING,x,token.start.line,token.start.column);} /**
	 * Validate stylesheet: it should consist of any number (0 or more) of
	 * rulesets (sets of rules with selectors), @-rules, whitespaces or
	 * comments.
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkStylesheet(i){var start=i;var l=undefined;while(i < tokensLength) {if(l = checkSC(i) || checkDeclaration(i) || checkDeclDelim(i) || checkInclude(i) || checkExtend(i) || checkMixin(i) || checkLoop(i) || checkConditionalStatement(i) || checkAtrule(i) || checkRuleset(i))i += l;else throwError(i);}return i - start;} /**
	 * @returns {Array} `['stylesheet', x]` where `x` is all stylesheet's
	 *      nodes.
	 */function getStylesheet(){var startPos=pos;var x=[];while(pos < tokensLength) {if(checkSC(pos))x = x.concat(getSC());else if(checkRuleset(pos))x.push(getRuleset());else if(checkInclude(pos))x.push(getInclude());else if(checkExtend(pos))x.push(getExtend());else if(checkMixin(pos))x.push(getMixin());else if(checkLoop(pos))x.push(getLoop());else if(checkConditionalStatement(pos))x.push(getConditionalStatement());else if(checkAtrule(pos))x.push(getAtrule());else if(checkDeclaration(pos))x.push(getDeclaration());else if(checkDeclDelim(pos))x.push(getDeclDelim());else throwError();}var token=tokens[startPos];return newNode(NodeType.STYLESHEET,x,token.start.line,token.start.column);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkTset(i){return checkVhash(i) || checkOperator(i) || checkAny(i) || checkSC(i) || checkInterpolation(i);} /**
	 * @returns {Array}
	 */function getTset(){if(checkVhash(pos))return getVhash();else if(checkOperator(pos))return getOperator();else if(checkAny(pos))return getAny();else if(checkSC(pos))return getSC();else if(checkInterpolation(pos))return getInterpolation();} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkTsets(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;while(l = checkTset(i)) {i += l;}return i - start;} /**
	 * @returns {Array}
	 */function getTsets(){var x=[];var t=undefined;while(t = getTset()) {if(typeof t.content === 'string')x.push(t);else x = x.concat(t);}return x;} /**
	 * Check if token is an unary (arithmetical) sign (`+` or `-`)
	 * @param {Number} i Token's index number
	 * @returns {Number} `1` if token is an unary sign, `0` if not
	 */function checkUnary(i){if(i >= tokensLength)return 0;if(tokens[i].type === NodeType.HYPHEN_MINUS || tokens[i].type === NodeType.PLUS_SIGN)return 1;return 0;} /**
	 * Get node with an unary (arithmetical) sign (`+` or `-`)
	 * @returns {Array} `['unary', x]` where `x` is an unary sign
	 *      converted to string.
	 */function getUnary(){var startPos=pos;var x=tokens[pos++].toString();var token=tokens[startPos];return newNode(NodeType.OPERATOR,x,token.start.line,token.start.column);} /**
	 * Check if token is part of URI (e.g. `url('/css/styles.css')`)
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of URI
	 */function checkUri(i){var start=i;if(i >= tokensLength || tokens[i++].toString() !== 'url' || i >= tokensLength || tokens[i].type !== NodeType.LEFT_PARENTHESIS)return 0;return tokens[i].right - start + 1;} /**
	 * Get node with URI
	 * @returns {Array} `['uri', x]` where `x` is URI's nodes (without `url`
	 *      and braces, e.g. `['string', ''/css/styles.css'']`).
	 */function getUri(){var startPos=pos;var uriExcluding={};var uri=undefined;var token=undefined;var l=undefined;var raw=undefined;pos += 2;uriExcluding[NodeType.SPACE] = 1;uriExcluding[NodeType.NEWLINE] = 1;uriExcluding[NodeType.LEFT_PARENTHESIS] = 1;uriExcluding[NodeType.RIGHT_PARENTHESIS] = 1;if(checkUriContent(pos)){uri = [].concat(getSC()).concat(getUriContent()).concat(getSC());}else {uri = [].concat(getSC());l = checkExcluding(uriExcluding,pos);token = tokens[pos];raw = newNode(NodeType.RAW,joinValues(pos,pos + l),token.start.line,token.start.column);uri.push(raw);pos += l + 1;uri = uri.concat(getSC());}token = tokens[startPos];var line=token.start.line;var column=token.start.column;var end=getLastPosition(uri,line,column,1);pos++;return newNode(NodeType.URI,uri,token.start.line,token.start.column,end);} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkUriContent(i){return checkUri1(i) || checkFunction(i);} /**
	 * @returns {Array}
	 */function getUriContent(){if(checkUri1(pos))return getString();else if(checkFunction(pos))return getFunction();} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkUri1(i){var start=i;var l=undefined;if(i >= tokensLength)return 0;if(l = checkSC(i))i += l;if(tokens[i].type !== NodeType.STRING)return 0;i++;if(l = checkSC(i))i += l;return i - start;} /**
	 * Check if token is part of a value
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the value
	 */function checkValue(i){var start=i;var l=undefined;var s=undefined;var _i=undefined;while(i < tokensLength) {if(checkDeclDelim(i))break;s = checkSC(i);_i = i + s;if(l = _checkValue(_i))i += l + s;if(!l || checkBlock(i - l))break;}return i - start;} /**
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function _checkValue(i){return checkInterpolation(i) || checkVariable(i) || checkVhash(i) || checkBlock(i) || checkAtkeyword(i) || checkOperator(i) || checkImportant(i) || checkGlobal(i) || checkDefault(i) || checkProgid(i) || checkAny(i);} /**
	 * @returns {Array}
	 */function getValue(){var startPos=pos;var x=[];var _pos=undefined;var s=undefined;while(pos < tokensLength) {s = checkSC(pos);_pos = pos + s;if(checkDeclDelim(_pos))break;if(!_checkValue(_pos))break;if(s)x = x.concat(getSC());x.push(_getValue());if(checkBlock(_pos))break;}var token=tokens[startPos];return newNode(NodeType.VALUE,x,token.start.line,token.start.column);} /**
	 * @returns {Array}
	 */function _getValue(){if(checkInterpolation(pos))return getInterpolation();else if(checkVariable(pos))return getVariable();else if(checkVhash(pos))return getVhash();else if(checkBlock(pos))return getBlock();else if(checkAtkeyword(pos))return getAtkeyword();else if(checkOperator(pos))return getOperator();else if(checkImportant(pos))return getImportant();else if(checkGlobal(pos))return getGlobal();else if(checkDefault(pos))return getDefault();else if(checkProgid(pos))return getProgid();else if(checkAny(pos))return getAny();} /**
	 * Check if token is part of a variable
	 * @param {Number} i Token's index number
	 * @returns {Number} Length of the variable
	 */function checkVariable(i){var l;if(i >= tokensLength || tokens[i].type !== NodeType.DOLLAR_SIGN)return 0;return (l = checkIdent(i + 1))?l + 1:0;} /**
	 * Get node with a variable
	 * @returns {Array} `['variable', ['ident', x]]` where `x` is
	 *      a variable name.
	 */function getVariable(){var startPos=pos;var x=[];pos++;x.push(getIdent());var token=tokens[startPos];return newNode(NodeType.VARIABLE,x,token.start.line,token.start.column);} /**
	 * Check if token is part of a variables list (e.g. `$values...`).
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkVariablesList(i){var d=0; // Number of dots
	var l=undefined;if(i >= tokensLength)return 0;if(l = checkVariable(i))i += l;else return 0;while(i < tokensLength && tokens[i].type === NodeType.FULL_STOP) {d++;i++;}return d === 3?l + d:0;} /**
	 * Get node with a variables list
	 * @returns {Array} `['variableslist', ['variable', ['ident', x]]]` where
	 *      `x` is a variable name.
	 */function getVariablesList(){var startPos=pos;var x=getVariable();var token=tokens[startPos];var line=token.start.line;var column=token.start.column;var end=getLastPosition([x],line,column,3);pos += 3;return newNode(NodeType.VARIABLES_LIST,[x],token.start.line,token.start.column,end);} /**
	 * Check if token is part of a hexadecimal number (e.g. `#fff`) inside
	 *      some value
	 * @param {Number} i Token's index number
	 * @returns {Number}
	 */function checkVhash(i){var l;if(i >= tokensLength || tokens[i].type !== NodeType.NUMBER_SIGN)return 0;return (l = checkNmName2(i + 1))?l + 1:0;} /**
	 * Get node with a hexadecimal number (e.g. `#fff`) inside some value
	 * @returns {Array} `['vhash', x]` where `x` is a hexadecimal number
	 *      converted to string (without `#`, e.g. `'fff'`).
	 */function getVhash(){var startPos=pos;var x=undefined;var token=tokens[startPos];var line=token.start.line;var column=token.start.column;pos++;x = getNmName2();var end=getLastPosition(x,line,column + 1);return newNode(NodeType.COLOR,x,token.start.line,token.start.column,end);}module.exports = function(_tokens,context){tokens = _tokens;tokensLength = tokens.length;pos = 0;return contexts[context]();};function checkSelectorsGroup(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkSelector(i))i += l;else return 0;while(i < tokensLength) {var sb=checkSC(i);var c=checkDelim(i + sb);if(!c)break;var sa=checkSC(i + sb + c);if(l = checkSelector(i + sb + c + sa))i += sb + c + sa + l;else break;}tokens[start].selectorsGroupEnd = i;return i - start;}function getSelectorsGroup(){var selectorsGroup=[];var selectorsGroupEnd=tokens[pos].selectorsGroupEnd;selectorsGroup.push(getSelector());while(pos < selectorsGroupEnd) {selectorsGroup = selectorsGroup.concat(getSC());selectorsGroup.push(getDelim());selectorsGroup = selectorsGroup.concat(getSC());selectorsGroup.push(getSelector());}return selectorsGroup;}function checkSelector(i){var l;if(l = checkSelector1(i))tokens[i].selectorType = 1;else if(l = checkSelector2(i))tokens[i].selectorType = 2;return l;}function getSelector(){var selectorType=tokens[pos].selectorType;if(selectorType === 1)return getSelector1();else return getSelector2();} /**
	 * Checks for selector which starts with a compound selector.
	 */function checkSelector1(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkCompoundSelector(i))i += l;else return 0;while(i < tokensLength) {var s=checkSC(i);var c=checkCombinator(i + s);if(!s && !c)break;if(c){i += s + c;s = checkSC(i);}if(l = checkCompoundSelector(i + s))i += s + l;else break;}tokens[start].selectorEnd = i;return i - start;}function getSelector1(){var type=NodeType.SELECTOR;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var selectorEnd=token.selectorEnd;var content=getCompoundSelector();while(pos < selectorEnd) {if(checkSC(pos))content = content.concat(getSC());else if(checkCombinator(pos))content.push(getCombinator());else if(checkCompoundSelector(pos))content = content.concat(getCompoundSelector());}return newNode(type,content,line,column);} /**
	 * Checks for a selector that starts with a combinator.
	 */function checkSelector2(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkCombinator(i))i += l;else return 0;while(i < tokensLength) {var sb=checkSC(i);if(l = checkCompoundSelector(i + sb))i += sb + l;else break;var sa=checkSC(i);var c=checkCombinator(i + sa);if(!sa && !c)break;if(c){i += sa + c;}}tokens[start].selectorEnd = i;return i - start;}function getSelector2(){var type=NodeType.SELECTOR;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var selectorEnd=token.selectorEnd;var content=[getCombinator()];while(pos < selectorEnd) {if(checkSC(pos))content = content.concat(getSC());else if(checkCombinator(pos))content.push(getCombinator());else if(checkCompoundSelector(pos))content = content.concat(getCompoundSelector());}return newNode(type,content,line,column);}function checkCompoundSelector(i){var l=undefined;if(l = checkCompoundSelector1(i)){tokens[i].compoundSelectorType = 1;}else if(l = checkCompoundSelector2(i)){tokens[i].compoundSelectorType = 2;}return l;}function getCompoundSelector(){var type=tokens[pos].compoundSelectorType;if(type === 1)return getCompoundSelector1();if(type === 2)return getCompoundSelector2();}function checkCompoundSelector1(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkTypeSelector(i) || checkPlaceholder(i) || checkParentSelectorWithExtension(i))i += l;else return 0;while(i < tokensLength) {var _l2=checkShash(i) || checkClass(i) || checkAttributeSelector(i) || checkPseudo(i) || checkPlaceholder(i);if(_l2)i += _l2;else break;}tokens[start].compoundSelectorEnd = i;return i - start;}function getCompoundSelector1(){var sequence=[];var compoundSelectorEnd=tokens[pos].compoundSelectorEnd;if(checkTypeSelector(pos))sequence.push(getTypeSelector());else if(checkPlaceholder(pos))sequence.push(getPlaceholder());else if(checkParentSelectorWithExtension(pos))sequence = sequence.concat(getParentSelectorWithExtension());while(pos < compoundSelectorEnd) {if(checkShash(pos))sequence.push(getShash());else if(checkClass(pos))sequence.push(getClass());else if(checkAttributeSelector(pos))sequence.push(getAttributeSelector());else if(checkPseudo(pos))sequence.push(getPseudo());else if(checkPlaceholder(pos))sequence.push(getPlaceholder());}return sequence;}function checkCompoundSelector2(i){if(i >= tokensLength)return 0;var start=i;while(i < tokensLength) {var l=checkShash(i) || checkClass(i) || checkAttributeSelector(i) || checkPseudo(i) || checkPlaceholder(i);if(l)i += l;else break;}tokens[start].compoundSelectorEnd = i;return i - start;}function getCompoundSelector2(){var sequence=[];var compoundSelectorEnd=tokens[pos].compoundSelectorEnd;while(pos < compoundSelectorEnd) {if(checkShash(pos))sequence.push(getShash());else if(checkClass(pos))sequence.push(getClass());else if(checkAttributeSelector(pos))sequence.push(getAttributeSelector());else if(checkPseudo(pos))sequence.push(getPseudo());else if(checkPlaceholder(pos))sequence.push(getPlaceholder());}return sequence;}function checkTypeSelector(i){if(i >= tokensLength)return 0;var start=i;var l=undefined;if(l = checkNamePrefix(i))i += l;if(tokens[i].type === NodeType.ASTERISK)i++;else if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;}function getTypeSelector(){var type=NodeType.TYPE_SELECTOR;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=[];if(checkNamePrefix(pos))content.push(getNamePrefix());if(checkIdentOrInterpolation(pos))content = content.concat(getIdentOrInterpolation());return newNode(type,content,line,column);}function checkAttributeSelector(i){var l=undefined;if(l = checkAttributeSelector1(i))tokens[i].attributeSelectorType = 1;else if(l = checkAttributeSelector2(i))tokens[i].attributeSelectorType = 2;return l;}function getAttributeSelector(){var type=tokens[pos].attributeSelectorType;if(type === 1)return getAttributeSelector1();else return getAttributeSelector2();} /**
	 * (1) `[panda=nani]`
	 * (2) `[panda='nani']`
	 * (3) `[panda='nani' i]`
	 *
	 */function checkAttributeSelector1(i){var start=i;if(tokens[i].type === NodeType.LEFT_SQUARE_BRACKET)i++;else return 0;var l=undefined;if(l = checkSC(i))i += l;if(l = checkAttributeName(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkAttributeMatch(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkAttributeValue(i))i += l;else return 0;if(l = checkSC(i))i += l;if(l = checkAttributeFlags(i)){i += l;if(l = checkSC(i))i += l;}if(tokens[i].type === NodeType.RIGHT_SQUARE_BRACKET)i++;else return 0;return i - start;}function getAttributeSelector1(){var type=NodeType.ATTRIBUTE_SELECTOR;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=[]; // Skip `[`.
	pos++;content = content.concat(getSC());content.push(getAttributeName());content = content.concat(getSC());content.push(getAttributeMatch());content = content.concat(getSC());content.push(getAttributeValue());content = content.concat(getSC());if(checkAttributeFlags(pos)){content.push(getAttributeFlags());content = content.concat(getSC());} // Skip `]`.
	pos++;var end=getLastPosition(content,line,column,1);return newNode(type,content,line,column,end);} /**
	 * (1) `[panda]`
	 */function checkAttributeSelector2(i){var start=i;if(tokens[i].type === NodeType.LEFT_SQUARE_BRACKET)i++;else return 0;var l=undefined;if(l = checkSC(i))i += l;if(l = checkAttributeName(i))i += l;else return 0;if(l = checkSC(i))i += l;if(tokens[i].type === NodeType.RIGHT_SQUARE_BRACKET)i++;else return 0;return i - start;}function getAttributeSelector2(){var type=NodeType.ATTRIBUTE_SELECTOR;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=[]; // Skip `[`.
	pos++;content = content.concat(getSC());content.push(getAttributeName());content = content.concat(getSC()); // Skip `]`.
	pos++;var end=getLastPosition(content,line,column,1);return newNode(type,content,line,column,end);}function checkAttributeName(i){var start=i;var l=undefined;if(l = checkNamePrefix(i))i += l;if(l = checkIdentOrInterpolation(i))i += l;else return 0;return i - start;}function getAttributeName(){var type=NodeType.ATTRIBUTE_NAME;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=[];if(checkNamePrefix(pos))content.push(getNamePrefix());content = content.concat(getIdentOrInterpolation());return newNode(type,content,line,column);}function checkAttributeMatch(i){var l=undefined;if(l = checkAttributeMatch1(i))tokens[i].attributeMatchType = 1;else if(l = checkAttributeMatch2(i))tokens[i].attributeMatchType = 2;return l;}function getAttributeMatch(){var type=tokens[pos].attributeMatchType;if(type === 1)return getAttributeMatch1();else return getAttributeMatch2();}function checkAttributeMatch1(i){var start=i;var type=tokens[i].type;if(type === NodeType.TILDE || type === NodeType.VERTICAL_LINE || type === NodeType.CIRCUMFLEX_ACCENT || type === NodeType.DOLLAR_SIGN || type === NodeType.ASTERISK)i++;else return 0;if(tokens[i].type === NodeType.EQUALS_SIGN)i++;else return 0;return i - start;}function getAttributeMatch1(){var type=NodeType.ATTRIBUTE_MATCH;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=tokens[pos].toString() + tokens[pos + 1].toString();pos += 2;return newNode(type,content,line,column);}function checkAttributeMatch2(i){if(tokens[i].type === NodeType.EQUALS_SIGN)return 1;else return 0;}function getAttributeMatch2(){var type=NodeType.ATTRIBUTE_MATCH;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content='=';pos++;return newNode(type,content,line,column);}function checkAttributeValue(i){return checkString(i) || checkIdentOrInterpolation(i);}function getAttributeValue(){var type=NodeType.ATTRIBUTE_VALUE;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=[];if(checkString(pos))content.push(getString());else content = content.concat(getIdentOrInterpolation());return newNode(type,content,line,column);}function checkAttributeFlags(i){return checkIdentOrInterpolation(i);}function getAttributeFlags(){var type=NodeType.ATTRIBUTE_FLAGS;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=getIdentOrInterpolation();return newNode(type,content,line,column);}function checkNamePrefix(i){if(i >= tokensLength)return 0;var l=undefined;if(l = checkNamePrefix1(i))tokens[i].namePrefixType = 1;else if(l = checkNamePrefix2(i))tokens[i].namePrefixType = 2;return l;}function getNamePrefix(){var type=tokens[pos].namePrefixType;if(type === 1)return getNamePrefix1();else return getNamePrefix2();} /**
	 * (1) `panda|`
	 * (2) `panda<comment>|`
	 */function checkNamePrefix1(i){var start=i;var l=undefined;if(l = checkNamespacePrefix(i))i += l;else return 0;if(l = checkCommentML(i))i += l;if(l = checkNamespaceSeparator(i))i += l;else return 0;return i - start;}function getNamePrefix1(){var type=NodeType.NAME_PREFIX;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=[];content.push(getNamespacePrefix());if(checkCommentML(pos))content.push(getCommentML());content.push(getNamespaceSeparator());return newNode(type,content,line,column);} /**
	 * (1) `|`
	 */function checkNamePrefix2(i){return checkNamespaceSeparator(i);}function getNamePrefix2(){var type=NodeType.NAME_PREFIX;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=[getNamespaceSeparator()];return newNode(type,content,line,column);} /**
	 * (1) `*`
	 * (2) `panda`
	 */function checkNamespacePrefix(i){if(i >= tokensLength)return 0;var l=undefined;if(tokens[i].type === NodeType.ASTERISK)return 1;else if(l = checkIdentOrInterpolation(i))return l;else return 0;}function getNamespacePrefix(){var type=NodeType.NAMESPACE_PREFIX;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content=[];if(checkIdentOrInterpolation(pos))content = content.concat(getIdentOrInterpolation());return newNode(type,content,line,column);} /**
	 * (1) `|`
	 */function checkNamespaceSeparator(i){if(i >= tokensLength)return 0;if(tokens[i].type === NodeType.VERTICAL_LINE)return 1;else return 0;}function getNamespaceSeparator(){var type=NodeType.NAMESPACE_SEPARATOR;var token=tokens[pos];var line=token.start.line;var column=token.start.column;var content='|';pos++;return newNode(type,content,line,column);}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Node = __webpack_require__(1);
	var NodeType = __webpack_require__(13);

	var Space = {
	  ' ': NodeType.SPACE,
	  '\n': NodeType.SPACE,
	  '\r': NodeType.SPACE,
	  '\t': NodeType.SPACE
	};

	var Punctuation = {
	  '!': NodeType.EXCLAMATION_MARK,
	  '"': NodeType.QUOTATION_MARK,
	  '#': NodeType.NUMBER_SIGN,
	  '$': NodeType.DOLLAR_SIGN,
	  '%': NodeType.PERCENT_SIGN,
	  '&': NodeType.AMPERSAND,
	  '\'': NodeType.APOSTROPHE,
	  '(': NodeType.LEFT_PARENTHESIS,
	  ')': NodeType.RIGHT_PARENTHESIS,
	  '*': NodeType.ASTERISK,
	  '+': NodeType.PLUS_SIGN,
	  ',': NodeType.COMMA,
	  '-': NodeType.HYPHEN_MINUS,
	  '.': NodeType.FULL_STOP,
	  '/': NodeType.SOLIDUS,
	  ':': NodeType.COLON,
	  ';': NodeType.SEMICOLON,
	  '<': NodeType.LESS_THAN_SIGN,
	  '=': NodeType.EQUALS_SIGN,
	  '>': NodeType.GREATER_THAN_SIGN,
	  '?': NodeType.QUESTION_MARK,
	  '@': NodeType.COMMERCIAL_AT,
	  '[': NodeType.LEFT_SQUARE_BRACKET,
	  ']': NodeType.RIGHT_SQUARE_BRACKET,
	  '^': NodeType.CIRCUMFLEX_ACCENT,
	  '_': NodeType.LOW_LINE,
	  '{': NodeType.LEFT_CURLY_BRACKET,
	  '}': NodeType.RIGHT_CURLY_BRACKET,
	  '|': NodeType.VERTICAL_LINE,
	  '~': NodeType.TILDE
	};

	var tokens = [];
	var urlMode = false;
	var blockMode = 0;
	var pos = 0;
	var tn = 0;
	var ln = 1;
	var col = 1;
	var cssLength = 0;
	var syntax = 'scss';

	function addNode(type, value, column) {
	  var line = arguments.length <= 3 || arguments[3] === undefined ? ln : arguments[3];

	  var node = new Node({
	    type: type,
	    content: value,
	    syntax: syntax,
	    start: {
	      line: line,
	      column: column
	    },
	    // TODO: Calculate real end position.
	    end: {
	      line: ln,
	      column: col
	    }
	  });

	  tokens.push(node);
	}

	function isDecimalDigit(c) {
	  return '0123456789'.indexOf(c) >= 0;
	}

	function buildPrimitiveNodes(css, tabSize) {
	  tokens = [];
	  urlMode = false;
	  blockMode = 0;
	  pos = 0;
	  tn = 0;
	  ln = 1;
	  col = 1;
	  cssLength = 0;

	  /**
	   * Parse spaces
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseSpaces(css) {
	    var start = pos;
	    var startCol = col;
	    var startLn = ln;

	    // Read the string until we meet a non-space character:
	    for (; pos < cssLength; pos++) {
	      var char = css.charAt(pos);
	      if (!Space[char]) break;
	      if (char === '\n' || char === '\r') {
	        ln++;
	        col = 0;
	      }
	    }

	    // Add a substring containing only spaces to tokens:
	    addNode(NodeType.SPACE, css.substring(start, pos--), startCol, startLn);
	    col += pos - start;
	  }

	  /**
	   * Parse a string within quotes
	   * @param {string} css Unparsed part of CSS string
	   * @param {string} q Quote (either `'` or `"`)
	   */
	  function parseString(css, q) {
	    var start = pos;

	    // Read the string until we meet a matching quote:
	    for (pos++; pos < css.length; pos++) {
	      // Skip escaped quotes:
	      if (css.charAt(pos) === '\\') pos++;else if (css.charAt(pos) === q) break;
	    }

	    // Add the string (including quotes) to tokens:
	    addNode(NodeType.STRING, css.substring(start, pos + 1), col);
	    col += pos - start;
	  }

	  /**
	   * Parse numbers
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseDecimalNumber(css) {
	    var start = pos;

	    // Read the string until we meet a character that's not a digit:
	    for (; pos < css.length; pos++) {
	      if (!isDecimalDigit(css.charAt(pos))) break;
	    }

	    // Add the number to tokens:
	    addNode(NodeType.DIGIT, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Parse identifier
	   * @param {string} css Unparsed part of CSS string
	   */
	  function parseIdentifier(css) {
	    var start = pos;

	    // Skip all opening slashes:
	    while (css.charAt(pos) === '/') pos++;

	    // Read the string until we meet a punctuation mark:
	    for (; pos < css.length; pos++) {
	      // Skip all '\':
	      if (css.charAt(pos) === '\\') pos++;else if (css.charAt(pos) in Punctuation || css.charAt(pos) in Space) break;
	    }

	    var ident = css.substring(start, pos--);

	    // Enter url mode if parsed substring is `url`:
	    if (!urlMode && ident === 'url' && css.charAt(pos + 1) === '(') {
	      urlMode = true;
	    }

	    // Add identifier to tokens:
	    addNode(NodeType.CHARACTER, ident, col);
	    col += pos - start;
	  }

	  /**
	  * Parse a multiline comment
	  * @param {string} css Unparsed part of CSS string
	  */
	  function parseMLComment(css) {
	    var start = pos;

	    // Read the string until we meet `*/`.
	    // Since we already know first 2 characters (`/*`), start reading
	    // from `pos + 2`:
	    for (pos += 2; pos < css.length; pos++) {
	      if (css.charAt(pos) === '*' && css.charAt(pos + 1) === '/') {
	        pos++;
	        break;
	      }
	    }

	    // Add full comment (including `/*` and `*/`) to the list of tokens:
	    var comment = css.substring(start, pos + 1);
	    addNode(NodeType.MULTILINE_COMMENT, comment, col);

	    var newlines = comment.split('\n');
	    if (newlines.length > 1) {
	      ln += newlines.length - 1;
	      col = newlines[newlines.length - 1].length;
	    } else {
	      col += pos - start;
	    }
	  }

	  /**
	  * Parse a single line comment
	  * @param {string} css Unparsed part of CSS string
	  */
	  function parseSLComment(css) {
	    var start = pos;

	    // Read the string until we meet line break.
	    // Since we already know first 2 characters (`//`), start reading
	    // from `pos + 2`:
	    for (pos += 2; pos < css.length; pos++) {
	      if (css.charAt(pos) === '\n' || css.charAt(pos) === '\r') {
	        break;
	      }
	    }

	    // Add comment (including `//` and line break) to the list of tokens:
	    addNode(NodeType.SINGLELINE_COMMENT, css.substring(start, pos--), col);
	    col += pos - start;
	  }

	  /**
	   * Convert a CSS string to a list of tokens
	   * @param {string} css CSS string
	   * @returns {Array} List of tokens
	   * @private
	   */
	  function getTokens(css) {
	    var c; // Current character
	    var cn; // Next character

	    cssLength = css.length;

	    // Parse string, character by character:
	    for (pos = 0; pos < css.length; col++, pos++) {
	      c = css.charAt(pos);
	      cn = css.charAt(pos + 1);

	      // If we meet `/*`, it's a start of a multiline comment.
	      // Parse following characters as a multiline comment:
	      if (c === '/' && cn === '*') {
	        parseMLComment(css);
	      }

	      // If we meet `//` and it is not a part of url:
	      else if (!urlMode && c === '/' && cn === '/') {
	          // If we're currently inside a block, treat `//` as a start
	          // of identifier. Else treat `//` as a start of a single-line
	          // comment:
	          parseSLComment(css);
	        }

	        // If current character is a double or single quote, it's a start
	        // of a string:
	        else if (c === '"' || c === "'") {
	            parseString(css, c);
	          }

	          // If current character is a space:
	          else if (Space[c]) {
	              parseSpaces(css);
	            }

	            // If current character is a punctuation mark:
	            else if (c in Punctuation) {
	                // Check for CRLF here or just LF
	                if (c === '\r' && cn === '\n' || c === '\n') {
	                  // If \r we know the next character is \n due to statement above
	                  // so we push a CRLF token type to the token list and importantly
	                  // skip the next character so as not to double count newlines or
	                  // columns etc
	                  if (c === '\r') {
	                    addNode(TokenType.Newline, '\r\n', col);
	                    pos++; // If CRLF skip the next character and push crlf token
	                  } else if (c === '\n') {
	                      // If just a LF newline and not part of CRLF newline we can just
	                      // push punctuation as usual
	                      addNode(Punctuation[c], c, col);
	                    }

	                  ln++; // Go to next line
	                  col = 0; // Reset the column count
	                } else if (c !== '\r' && c !== '\n') {
	                    // Handle all other punctuation and add to list of tokens
	                    addNode(Punctuation[c], c, col);
	                  } // Go to next line
	                if (c === ')') urlMode = false; // Exit url mode
	                else if (c === '{') blockMode++; // Enter a block
	                  else if (c === '}') blockMode--; // Exit a block
	                    else if (c === '\t' && tabSize > 1) col += tabSize - 1;
	              }

	              // If current character is a decimal digit:
	              else if (isDecimalDigit(c)) {
	                  parseDecimalNumber(css);
	                }

	                // If current character is anything else:
	                else {
	                    parseIdentifier(css);
	                  }
	    }

	    return tokens;
	  }

	  return getTokens(css);
	}

	module.exports = buildPrimitiveNodes;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Node = __webpack_require__(1);
	var NodeTypes = __webpack_require__(13);

	module.exports = function () {
	  return new Node({
	    type: NodeTypes.StylesheetType,
	    content: [],
	    start: [0, 0],
	    end: [0, 0]
	  });
	};

/***/ }
/******/ ])
});
;