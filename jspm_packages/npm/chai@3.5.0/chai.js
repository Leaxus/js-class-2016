/* */ 
"format cjs";
(function(Buffer) {
  (function(f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = f();
    } else if (typeof define === "function" && define.amd) {
      define([], f);
    } else {
      var g;
      if (typeof window !== "undefined") {
        g = window;
      } else if (typeof global !== "undefined") {
        g = global;
      } else if (typeof self !== "undefined") {
        g = self;
      } else {
        g = this;
      }
      g.chai = f();
    }
  })(function() {
    var define,
        module,
        exports;
    return (function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof require == "function" && require;
            if (!u && a)
              return a(o, !0);
            if (i)
              return i(o, !0);
            var f = new Error("Cannot find module '" + o + "'");
            throw f.code = "MODULE_NOT_FOUND", f;
          }
          var l = n[o] = {exports: {}};
          t[o][0].call(l.exports, function(e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
      }
      var i = typeof require == "function" && require;
      for (var o = 0; o < r.length; o++)
        s(r[o]);
      return s;
    })({
      1: [function(require, module, exports) {
        module.exports = require('./lib/chai');
      }, {"./lib/chai": 2}],
      2: [function(require, module, exports) {
        var used = [],
            exports = module.exports = {};
        exports.version = '3.5.0';
        exports.AssertionError = require('assertion-error');
        var util = require('./chai/utils');
        exports.use = function(fn) {
          if (!~used.indexOf(fn)) {
            fn(this, util);
            used.push(fn);
          }
          return this;
        };
        exports.util = util;
        var config = require('./chai/config');
        exports.config = config;
        var assertion = require('./chai/assertion');
        exports.use(assertion);
        var core = require('./chai/core/assertions');
        exports.use(core);
        var expect = require('./chai/interface/expect');
        exports.use(expect);
        var should = require('./chai/interface/should');
        exports.use(should);
        var assert = require('./chai/interface/assert');
        exports.use(assert);
      }, {
        "./chai/assertion": 3,
        "./chai/config": 4,
        "./chai/core/assertions": 5,
        "./chai/interface/assert": 6,
        "./chai/interface/expect": 7,
        "./chai/interface/should": 8,
        "./chai/utils": 22,
        "assertion-error": 30
      }],
      3: [function(require, module, exports) {
        var config = require('./config');
        module.exports = function(_chai, util) {
          var AssertionError = _chai.AssertionError,
              flag = util.flag;
          _chai.Assertion = Assertion;
          function Assertion(obj, msg, stack) {
            flag(this, 'ssfi', stack || arguments.callee);
            flag(this, 'object', obj);
            flag(this, 'message', msg);
          }
          Object.defineProperty(Assertion, 'includeStack', {
            get: function() {
              console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
              return config.includeStack;
            },
            set: function(value) {
              console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
              config.includeStack = value;
            }
          });
          Object.defineProperty(Assertion, 'showDiff', {
            get: function() {
              console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
              return config.showDiff;
            },
            set: function(value) {
              console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
              config.showDiff = value;
            }
          });
          Assertion.addProperty = function(name, fn) {
            util.addProperty(this.prototype, name, fn);
          };
          Assertion.addMethod = function(name, fn) {
            util.addMethod(this.prototype, name, fn);
          };
          Assertion.addChainableMethod = function(name, fn, chainingBehavior) {
            util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
          };
          Assertion.overwriteProperty = function(name, fn) {
            util.overwriteProperty(this.prototype, name, fn);
          };
          Assertion.overwriteMethod = function(name, fn) {
            util.overwriteMethod(this.prototype, name, fn);
          };
          Assertion.overwriteChainableMethod = function(name, fn, chainingBehavior) {
            util.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
          };
          Assertion.prototype.assert = function(expr, msg, negateMsg, expected, _actual, showDiff) {
            var ok = util.test(this, arguments);
            if (true !== showDiff)
              showDiff = false;
            if (true !== config.showDiff)
              showDiff = false;
            if (!ok) {
              var msg = util.getMessage(this, arguments),
                  actual = util.getActual(this, arguments);
              throw new AssertionError(msg, {
                actual: actual,
                expected: expected,
                showDiff: showDiff
              }, (config.includeStack) ? this.assert : flag(this, 'ssfi'));
            }
          };
          Object.defineProperty(Assertion.prototype, '_obj', {
            get: function() {
              return flag(this, 'object');
            },
            set: function(val) {
              flag(this, 'object', val);
            }
          });
        };
      }, {"./config": 4}],
      4: [function(require, module, exports) {
        module.exports = {
          includeStack: false,
          showDiff: true,
          truncateThreshold: 40
        };
      }, {}],
      5: [function(require, module, exports) {
        module.exports = function(chai, _) {
          var Assertion = chai.Assertion,
              toString = Object.prototype.toString,
              flag = _.flag;
          ['to', 'be', 'been', 'is', 'and', 'has', 'have', 'with', 'that', 'which', 'at', 'of', 'same'].forEach(function(chain) {
            Assertion.addProperty(chain, function() {
              return this;
            });
          });
          Assertion.addProperty('not', function() {
            flag(this, 'negate', true);
          });
          Assertion.addProperty('deep', function() {
            flag(this, 'deep', true);
          });
          Assertion.addProperty('any', function() {
            flag(this, 'any', true);
            flag(this, 'all', false);
          });
          Assertion.addProperty('all', function() {
            flag(this, 'all', true);
            flag(this, 'any', false);
          });
          function an(type, msg) {
            if (msg)
              flag(this, 'message', msg);
            type = type.toLowerCase();
            var obj = flag(this, 'object'),
                article = ~['a', 'e', 'i', 'o', 'u'].indexOf(type.charAt(0)) ? 'an ' : 'a ';
            this.assert(type === _.type(obj), 'expected #{this} to be ' + article + type, 'expected #{this} not to be ' + article + type);
          }
          Assertion.addChainableMethod('an', an);
          Assertion.addChainableMethod('a', an);
          function includeChainingBehavior() {
            flag(this, 'contains', true);
          }
          function include(val, msg) {
            _.expectTypes(this, ['array', 'object', 'string']);
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            var expected = false;
            if (_.type(obj) === 'array' && _.type(val) === 'object') {
              for (var i in obj) {
                if (_.eql(obj[i], val)) {
                  expected = true;
                  break;
                }
              }
            } else if (_.type(val) === 'object') {
              if (!flag(this, 'negate')) {
                for (var k in val)
                  new Assertion(obj).property(k, val[k]);
                return;
              }
              var subset = {};
              for (var k in val)
                subset[k] = obj[k];
              expected = _.eql(subset, val);
            } else {
              expected = (obj != undefined) && ~obj.indexOf(val);
            }
            this.assert(expected, 'expected #{this} to include ' + _.inspect(val), 'expected #{this} to not include ' + _.inspect(val));
          }
          Assertion.addChainableMethod('include', include, includeChainingBehavior);
          Assertion.addChainableMethod('contain', include, includeChainingBehavior);
          Assertion.addChainableMethod('contains', include, includeChainingBehavior);
          Assertion.addChainableMethod('includes', include, includeChainingBehavior);
          Assertion.addProperty('ok', function() {
            this.assert(flag(this, 'object'), 'expected #{this} to be truthy', 'expected #{this} to be falsy');
          });
          Assertion.addProperty('true', function() {
            this.assert(true === flag(this, 'object'), 'expected #{this} to be true', 'expected #{this} to be false', this.negate ? false : true);
          });
          Assertion.addProperty('false', function() {
            this.assert(false === flag(this, 'object'), 'expected #{this} to be false', 'expected #{this} to be true', this.negate ? true : false);
          });
          Assertion.addProperty('null', function() {
            this.assert(null === flag(this, 'object'), 'expected #{this} to be null', 'expected #{this} not to be null');
          });
          Assertion.addProperty('undefined', function() {
            this.assert(undefined === flag(this, 'object'), 'expected #{this} to be undefined', 'expected #{this} not to be undefined');
          });
          Assertion.addProperty('NaN', function() {
            this.assert(isNaN(flag(this, 'object')), 'expected #{this} to be NaN', 'expected #{this} not to be NaN');
          });
          Assertion.addProperty('exist', function() {
            this.assert(null != flag(this, 'object'), 'expected #{this} to exist', 'expected #{this} to not exist');
          });
          Assertion.addProperty('empty', function() {
            var obj = flag(this, 'object'),
                expected = obj;
            if (Array.isArray(obj) || 'string' === typeof object) {
              expected = obj.length;
            } else if (typeof obj === 'object') {
              expected = Object.keys(obj).length;
            }
            this.assert(!expected, 'expected #{this} to be empty', 'expected #{this} not to be empty');
          });
          function checkArguments() {
            var obj = flag(this, 'object'),
                type = Object.prototype.toString.call(obj);
            this.assert('[object Arguments]' === type, 'expected #{this} to be arguments but got ' + type, 'expected #{this} to not be arguments');
          }
          Assertion.addProperty('arguments', checkArguments);
          Assertion.addProperty('Arguments', checkArguments);
          function assertEqual(val, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            if (flag(this, 'deep')) {
              return this.eql(val);
            } else {
              this.assert(val === obj, 'expected #{this} to equal #{exp}', 'expected #{this} to not equal #{exp}', val, this._obj, true);
            }
          }
          Assertion.addMethod('equal', assertEqual);
          Assertion.addMethod('equals', assertEqual);
          Assertion.addMethod('eq', assertEqual);
          function assertEql(obj, msg) {
            if (msg)
              flag(this, 'message', msg);
            this.assert(_.eql(obj, flag(this, 'object')), 'expected #{this} to deeply equal #{exp}', 'expected #{this} to not deeply equal #{exp}', obj, this._obj, true);
          }
          Assertion.addMethod('eql', assertEql);
          Assertion.addMethod('eqls', assertEql);
          function assertAbove(n, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            if (flag(this, 'doLength')) {
              new Assertion(obj, msg).to.have.property('length');
              var len = obj.length;
              this.assert(len > n, 'expected #{this} to have a length above #{exp} but got #{act}', 'expected #{this} to not have a length above #{exp}', n, len);
            } else {
              this.assert(obj > n, 'expected #{this} to be above ' + n, 'expected #{this} to be at most ' + n);
            }
          }
          Assertion.addMethod('above', assertAbove);
          Assertion.addMethod('gt', assertAbove);
          Assertion.addMethod('greaterThan', assertAbove);
          function assertLeast(n, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            if (flag(this, 'doLength')) {
              new Assertion(obj, msg).to.have.property('length');
              var len = obj.length;
              this.assert(len >= n, 'expected #{this} to have a length at least #{exp} but got #{act}', 'expected #{this} to have a length below #{exp}', n, len);
            } else {
              this.assert(obj >= n, 'expected #{this} to be at least ' + n, 'expected #{this} to be below ' + n);
            }
          }
          Assertion.addMethod('least', assertLeast);
          Assertion.addMethod('gte', assertLeast);
          function assertBelow(n, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            if (flag(this, 'doLength')) {
              new Assertion(obj, msg).to.have.property('length');
              var len = obj.length;
              this.assert(len < n, 'expected #{this} to have a length below #{exp} but got #{act}', 'expected #{this} to not have a length below #{exp}', n, len);
            } else {
              this.assert(obj < n, 'expected #{this} to be below ' + n, 'expected #{this} to be at least ' + n);
            }
          }
          Assertion.addMethod('below', assertBelow);
          Assertion.addMethod('lt', assertBelow);
          Assertion.addMethod('lessThan', assertBelow);
          function assertMost(n, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            if (flag(this, 'doLength')) {
              new Assertion(obj, msg).to.have.property('length');
              var len = obj.length;
              this.assert(len <= n, 'expected #{this} to have a length at most #{exp} but got #{act}', 'expected #{this} to have a length above #{exp}', n, len);
            } else {
              this.assert(obj <= n, 'expected #{this} to be at most ' + n, 'expected #{this} to be above ' + n);
            }
          }
          Assertion.addMethod('most', assertMost);
          Assertion.addMethod('lte', assertMost);
          Assertion.addMethod('within', function(start, finish, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object'),
                range = start + '..' + finish;
            if (flag(this, 'doLength')) {
              new Assertion(obj, msg).to.have.property('length');
              var len = obj.length;
              this.assert(len >= start && len <= finish, 'expected #{this} to have a length within ' + range, 'expected #{this} to not have a length within ' + range);
            } else {
              this.assert(obj >= start && obj <= finish, 'expected #{this} to be within ' + range, 'expected #{this} to not be within ' + range);
            }
          });
          function assertInstanceOf(constructor, msg) {
            if (msg)
              flag(this, 'message', msg);
            var name = _.getName(constructor);
            this.assert(flag(this, 'object') instanceof constructor, 'expected #{this} to be an instance of ' + name, 'expected #{this} to not be an instance of ' + name);
          }
          ;
          Assertion.addMethod('instanceof', assertInstanceOf);
          Assertion.addMethod('instanceOf', assertInstanceOf);
          Assertion.addMethod('property', function(name, val, msg) {
            if (msg)
              flag(this, 'message', msg);
            var isDeep = !!flag(this, 'deep'),
                descriptor = isDeep ? 'deep property ' : 'property ',
                negate = flag(this, 'negate'),
                obj = flag(this, 'object'),
                pathInfo = isDeep ? _.getPathInfo(name, obj) : null,
                hasProperty = isDeep ? pathInfo.exists : _.hasProperty(name, obj),
                value = isDeep ? pathInfo.value : obj[name];
            if (negate && arguments.length > 1) {
              if (undefined === value) {
                msg = (msg != null) ? msg + ': ' : '';
                throw new Error(msg + _.inspect(obj) + ' has no ' + descriptor + _.inspect(name));
              }
            } else {
              this.assert(hasProperty, 'expected #{this} to have a ' + descriptor + _.inspect(name), 'expected #{this} to not have ' + descriptor + _.inspect(name));
            }
            if (arguments.length > 1) {
              this.assert(val === value, 'expected #{this} to have a ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}', 'expected #{this} to not have a ' + descriptor + _.inspect(name) + ' of #{act}', val, value);
            }
            flag(this, 'object', value);
          });
          function assertOwnProperty(name, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            this.assert(obj.hasOwnProperty(name), 'expected #{this} to have own property ' + _.inspect(name), 'expected #{this} to not have own property ' + _.inspect(name));
          }
          Assertion.addMethod('ownProperty', assertOwnProperty);
          Assertion.addMethod('haveOwnProperty', assertOwnProperty);
          function assertOwnPropertyDescriptor(name, descriptor, msg) {
            if (typeof descriptor === 'string') {
              msg = descriptor;
              descriptor = null;
            }
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
            if (actualDescriptor && descriptor) {
              this.assert(_.eql(descriptor, actualDescriptor), 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to match ' + _.inspect(descriptor) + ', got ' + _.inspect(actualDescriptor), 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to not match ' + _.inspect(descriptor), descriptor, actualDescriptor, true);
            } else {
              this.assert(actualDescriptor, 'expected #{this} to have an own property descriptor for ' + _.inspect(name), 'expected #{this} to not have an own property descriptor for ' + _.inspect(name));
            }
            flag(this, 'object', actualDescriptor);
          }
          Assertion.addMethod('ownPropertyDescriptor', assertOwnPropertyDescriptor);
          Assertion.addMethod('haveOwnPropertyDescriptor', assertOwnPropertyDescriptor);
          function assertLengthChain() {
            flag(this, 'doLength', true);
          }
          function assertLength(n, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            new Assertion(obj, msg).to.have.property('length');
            var len = obj.length;
            this.assert(len == n, 'expected #{this} to have a length of #{exp} but got #{act}', 'expected #{this} to not have a length of #{act}', n, len);
          }
          Assertion.addChainableMethod('length', assertLength, assertLengthChain);
          Assertion.addMethod('lengthOf', assertLength);
          function assertMatch(re, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            this.assert(re.exec(obj), 'expected #{this} to match ' + re, 'expected #{this} not to match ' + re);
          }
          Assertion.addMethod('match', assertMatch);
          Assertion.addMethod('matches', assertMatch);
          Assertion.addMethod('string', function(str, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            new Assertion(obj, msg).is.a('string');
            this.assert(~obj.indexOf(str), 'expected #{this} to contain ' + _.inspect(str), 'expected #{this} to not contain ' + _.inspect(str));
          });
          function assertKeys(keys) {
            var obj = flag(this, 'object'),
                str,
                ok = true,
                mixedArgsMsg = 'keys must be given single argument of Array|Object|String, or multiple String arguments';
            switch (_.type(keys)) {
              case "array":
                if (arguments.length > 1)
                  throw (new Error(mixedArgsMsg));
                break;
              case "object":
                if (arguments.length > 1)
                  throw (new Error(mixedArgsMsg));
                keys = Object.keys(keys);
                break;
              default:
                keys = Array.prototype.slice.call(arguments);
            }
            if (!keys.length)
              throw new Error('keys required');
            var actual = Object.keys(obj),
                expected = keys,
                len = keys.length,
                any = flag(this, 'any'),
                all = flag(this, 'all');
            if (!any && !all) {
              all = true;
            }
            if (any) {
              var intersection = expected.filter(function(key) {
                return ~actual.indexOf(key);
              });
              ok = intersection.length > 0;
            }
            if (all) {
              ok = keys.every(function(key) {
                return ~actual.indexOf(key);
              });
              if (!flag(this, 'negate') && !flag(this, 'contains')) {
                ok = ok && keys.length == actual.length;
              }
            }
            if (len > 1) {
              keys = keys.map(function(key) {
                return _.inspect(key);
              });
              var last = keys.pop();
              if (all) {
                str = keys.join(', ') + ', and ' + last;
              }
              if (any) {
                str = keys.join(', ') + ', or ' + last;
              }
            } else {
              str = _.inspect(keys[0]);
            }
            str = (len > 1 ? 'keys ' : 'key ') + str;
            str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;
            this.assert(ok, 'expected #{this} to ' + str, 'expected #{this} to not ' + str, expected.slice(0).sort(), actual.sort(), true);
          }
          Assertion.addMethod('keys', assertKeys);
          Assertion.addMethod('key', assertKeys);
          function assertThrows(constructor, errMsg, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            new Assertion(obj, msg).is.a('function');
            var thrown = false,
                desiredError = null,
                name = null,
                thrownError = null;
            if (arguments.length === 0) {
              errMsg = null;
              constructor = null;
            } else if (constructor && (constructor instanceof RegExp || 'string' === typeof constructor)) {
              errMsg = constructor;
              constructor = null;
            } else if (constructor && constructor instanceof Error) {
              desiredError = constructor;
              constructor = null;
              errMsg = null;
            } else if (typeof constructor === 'function') {
              name = constructor.prototype.name;
              if (!name || (name === 'Error' && constructor !== Error)) {
                name = constructor.name || (new constructor()).name;
              }
            } else {
              constructor = null;
            }
            try {
              obj();
            } catch (err) {
              if (desiredError) {
                this.assert(err === desiredError, 'expected #{this} to throw #{exp} but #{act} was thrown', 'expected #{this} to not throw #{exp}', (desiredError instanceof Error ? desiredError.toString() : desiredError), (err instanceof Error ? err.toString() : err));
                flag(this, 'object', err);
                return this;
              }
              if (constructor) {
                this.assert(err instanceof constructor, 'expected #{this} to throw #{exp} but #{act} was thrown', 'expected #{this} to not throw #{exp} but #{act} was thrown', name, (err instanceof Error ? err.toString() : err));
                if (!errMsg) {
                  flag(this, 'object', err);
                  return this;
                }
              }
              var message = 'error' === _.type(err) && "message" in err ? err.message : '' + err;
              if ((message != null) && errMsg && errMsg instanceof RegExp) {
                this.assert(errMsg.exec(message), 'expected #{this} to throw error matching #{exp} but got #{act}', 'expected #{this} to throw error not matching #{exp}', errMsg, message);
                flag(this, 'object', err);
                return this;
              } else if ((message != null) && errMsg && 'string' === typeof errMsg) {
                this.assert(~message.indexOf(errMsg), 'expected #{this} to throw error including #{exp} but got #{act}', 'expected #{this} to throw error not including #{act}', errMsg, message);
                flag(this, 'object', err);
                return this;
              } else {
                thrown = true;
                thrownError = err;
              }
            }
            var actuallyGot = '',
                expectedThrown = name !== null ? name : desiredError ? '#{exp}' : 'an error';
            if (thrown) {
              actuallyGot = ' but #{act} was thrown';
            }
            this.assert(thrown === true, 'expected #{this} to throw ' + expectedThrown + actuallyGot, 'expected #{this} to not throw ' + expectedThrown + actuallyGot, (desiredError instanceof Error ? desiredError.toString() : desiredError), (thrownError instanceof Error ? thrownError.toString() : thrownError));
            flag(this, 'object', thrownError);
          }
          ;
          Assertion.addMethod('throw', assertThrows);
          Assertion.addMethod('throws', assertThrows);
          Assertion.addMethod('Throw', assertThrows);
          function respondTo(method, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object'),
                itself = flag(this, 'itself'),
                context = ('function' === _.type(obj) && !itself) ? obj.prototype[method] : obj[method];
            this.assert('function' === typeof context, 'expected #{this} to respond to ' + _.inspect(method), 'expected #{this} to not respond to ' + _.inspect(method));
          }
          Assertion.addMethod('respondTo', respondTo);
          Assertion.addMethod('respondsTo', respondTo);
          Assertion.addProperty('itself', function() {
            flag(this, 'itself', true);
          });
          function satisfy(matcher, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            var result = matcher(obj);
            this.assert(result, 'expected #{this} to satisfy ' + _.objDisplay(matcher), 'expected #{this} to not satisfy' + _.objDisplay(matcher), this.negate ? false : true, result);
          }
          Assertion.addMethod('satisfy', satisfy);
          Assertion.addMethod('satisfies', satisfy);
          function closeTo(expected, delta, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            new Assertion(obj, msg).is.a('number');
            if (_.type(expected) !== 'number' || _.type(delta) !== 'number') {
              throw new Error('the arguments to closeTo or approximately must be numbers');
            }
            this.assert(Math.abs(obj - expected) <= delta, 'expected #{this} to be close to ' + expected + ' +/- ' + delta, 'expected #{this} not to be close to ' + expected + ' +/- ' + delta);
          }
          Assertion.addMethod('closeTo', closeTo);
          Assertion.addMethod('approximately', closeTo);
          function isSubsetOf(subset, superset, cmp) {
            return subset.every(function(elem) {
              if (!cmp)
                return superset.indexOf(elem) !== -1;
              return superset.some(function(elem2) {
                return cmp(elem, elem2);
              });
            });
          }
          Assertion.addMethod('members', function(subset, msg) {
            if (msg)
              flag(this, 'message', msg);
            var obj = flag(this, 'object');
            new Assertion(obj).to.be.an('array');
            new Assertion(subset).to.be.an('array');
            var cmp = flag(this, 'deep') ? _.eql : undefined;
            if (flag(this, 'contains')) {
              return this.assert(isSubsetOf(subset, obj, cmp), 'expected #{this} to be a superset of #{act}', 'expected #{this} to not be a superset of #{act}', obj, subset);
            }
            this.assert(isSubsetOf(obj, subset, cmp) && isSubsetOf(subset, obj, cmp), 'expected #{this} to have the same members as #{act}', 'expected #{this} to not have the same members as #{act}', obj, subset);
          });
          function oneOf(list, msg) {
            if (msg)
              flag(this, 'message', msg);
            var expected = flag(this, 'object');
            new Assertion(list).to.be.an('array');
            this.assert(list.indexOf(expected) > -1, 'expected #{this} to be one of #{exp}', 'expected #{this} to not be one of #{exp}', list, expected);
          }
          Assertion.addMethod('oneOf', oneOf);
          function assertChanges(object, prop, msg) {
            if (msg)
              flag(this, 'message', msg);
            var fn = flag(this, 'object');
            new Assertion(object, msg).to.have.property(prop);
            new Assertion(fn).is.a('function');
            var initial = object[prop];
            fn();
            this.assert(initial !== object[prop], 'expected .' + prop + ' to change', 'expected .' + prop + ' to not change');
          }
          Assertion.addChainableMethod('change', assertChanges);
          Assertion.addChainableMethod('changes', assertChanges);
          function assertIncreases(object, prop, msg) {
            if (msg)
              flag(this, 'message', msg);
            var fn = flag(this, 'object');
            new Assertion(object, msg).to.have.property(prop);
            new Assertion(fn).is.a('function');
            var initial = object[prop];
            fn();
            this.assert(object[prop] - initial > 0, 'expected .' + prop + ' to increase', 'expected .' + prop + ' to not increase');
          }
          Assertion.addChainableMethod('increase', assertIncreases);
          Assertion.addChainableMethod('increases', assertIncreases);
          function assertDecreases(object, prop, msg) {
            if (msg)
              flag(this, 'message', msg);
            var fn = flag(this, 'object');
            new Assertion(object, msg).to.have.property(prop);
            new Assertion(fn).is.a('function');
            var initial = object[prop];
            fn();
            this.assert(object[prop] - initial < 0, 'expected .' + prop + ' to decrease', 'expected .' + prop + ' to not decrease');
          }
          Assertion.addChainableMethod('decrease', assertDecreases);
          Assertion.addChainableMethod('decreases', assertDecreases);
          Assertion.addProperty('extensible', function() {
            var obj = flag(this, 'object');
            var isExtensible;
            try {
              isExtensible = Object.isExtensible(obj);
            } catch (err) {
              if (err instanceof TypeError)
                isExtensible = false;
              else
                throw err;
            }
            this.assert(isExtensible, 'expected #{this} to be extensible', 'expected #{this} to not be extensible');
          });
          Assertion.addProperty('sealed', function() {
            var obj = flag(this, 'object');
            var isSealed;
            try {
              isSealed = Object.isSealed(obj);
            } catch (err) {
              if (err instanceof TypeError)
                isSealed = true;
              else
                throw err;
            }
            this.assert(isSealed, 'expected #{this} to be sealed', 'expected #{this} to not be sealed');
          });
          Assertion.addProperty('frozen', function() {
            var obj = flag(this, 'object');
            var isFrozen;
            try {
              isFrozen = Object.isFrozen(obj);
            } catch (err) {
              if (err instanceof TypeError)
                isFrozen = true;
              else
                throw err;
            }
            this.assert(isFrozen, 'expected #{this} to be frozen', 'expected #{this} to not be frozen');
          });
        };
      }, {}],
      6: [function(require, module, exports) {
        module.exports = function(chai, util) {
          var Assertion = chai.Assertion,
              flag = util.flag;
          var assert = chai.assert = function(express, errmsg) {
            var test = new Assertion(null, null, chai.assert);
            test.assert(express, errmsg, '[ negation message unavailable ]');
          };
          assert.fail = function(actual, expected, message, operator) {
            message = message || 'assert.fail()';
            throw new chai.AssertionError(message, {
              actual: actual,
              expected: expected,
              operator: operator
            }, assert.fail);
          };
          assert.isOk = function(val, msg) {
            new Assertion(val, msg).is.ok;
          };
          assert.isNotOk = function(val, msg) {
            new Assertion(val, msg).is.not.ok;
          };
          assert.equal = function(act, exp, msg) {
            var test = new Assertion(act, msg, assert.equal);
            test.assert(exp == flag(test, 'object'), 'expected #{this} to equal #{exp}', 'expected #{this} to not equal #{act}', exp, act);
          };
          assert.notEqual = function(act, exp, msg) {
            var test = new Assertion(act, msg, assert.notEqual);
            test.assert(exp != flag(test, 'object'), 'expected #{this} to not equal #{exp}', 'expected #{this} to equal #{act}', exp, act);
          };
          assert.strictEqual = function(act, exp, msg) {
            new Assertion(act, msg).to.equal(exp);
          };
          assert.notStrictEqual = function(act, exp, msg) {
            new Assertion(act, msg).to.not.equal(exp);
          };
          assert.deepEqual = function(act, exp, msg) {
            new Assertion(act, msg).to.eql(exp);
          };
          assert.notDeepEqual = function(act, exp, msg) {
            new Assertion(act, msg).to.not.eql(exp);
          };
          assert.isAbove = function(val, abv, msg) {
            new Assertion(val, msg).to.be.above(abv);
          };
          assert.isAtLeast = function(val, atlst, msg) {
            new Assertion(val, msg).to.be.least(atlst);
          };
          assert.isBelow = function(val, blw, msg) {
            new Assertion(val, msg).to.be.below(blw);
          };
          assert.isAtMost = function(val, atmst, msg) {
            new Assertion(val, msg).to.be.most(atmst);
          };
          assert.isTrue = function(val, msg) {
            new Assertion(val, msg).is['true'];
          };
          assert.isNotTrue = function(val, msg) {
            new Assertion(val, msg).to.not.equal(true);
          };
          assert.isFalse = function(val, msg) {
            new Assertion(val, msg).is['false'];
          };
          assert.isNotFalse = function(val, msg) {
            new Assertion(val, msg).to.not.equal(false);
          };
          assert.isNull = function(val, msg) {
            new Assertion(val, msg).to.equal(null);
          };
          assert.isNotNull = function(val, msg) {
            new Assertion(val, msg).to.not.equal(null);
          };
          assert.isNaN = function(val, msg) {
            new Assertion(val, msg).to.be.NaN;
          };
          assert.isNotNaN = function(val, msg) {
            new Assertion(val, msg).not.to.be.NaN;
          };
          assert.isUndefined = function(val, msg) {
            new Assertion(val, msg).to.equal(undefined);
          };
          assert.isDefined = function(val, msg) {
            new Assertion(val, msg).to.not.equal(undefined);
          };
          assert.isFunction = function(val, msg) {
            new Assertion(val, msg).to.be.a('function');
          };
          assert.isNotFunction = function(val, msg) {
            new Assertion(val, msg).to.not.be.a('function');
          };
          assert.isObject = function(val, msg) {
            new Assertion(val, msg).to.be.a('object');
          };
          assert.isNotObject = function(val, msg) {
            new Assertion(val, msg).to.not.be.a('object');
          };
          assert.isArray = function(val, msg) {
            new Assertion(val, msg).to.be.an('array');
          };
          assert.isNotArray = function(val, msg) {
            new Assertion(val, msg).to.not.be.an('array');
          };
          assert.isString = function(val, msg) {
            new Assertion(val, msg).to.be.a('string');
          };
          assert.isNotString = function(val, msg) {
            new Assertion(val, msg).to.not.be.a('string');
          };
          assert.isNumber = function(val, msg) {
            new Assertion(val, msg).to.be.a('number');
          };
          assert.isNotNumber = function(val, msg) {
            new Assertion(val, msg).to.not.be.a('number');
          };
          assert.isBoolean = function(val, msg) {
            new Assertion(val, msg).to.be.a('boolean');
          };
          assert.isNotBoolean = function(val, msg) {
            new Assertion(val, msg).to.not.be.a('boolean');
          };
          assert.typeOf = function(val, type, msg) {
            new Assertion(val, msg).to.be.a(type);
          };
          assert.notTypeOf = function(val, type, msg) {
            new Assertion(val, msg).to.not.be.a(type);
          };
          assert.instanceOf = function(val, type, msg) {
            new Assertion(val, msg).to.be.instanceOf(type);
          };
          assert.notInstanceOf = function(val, type, msg) {
            new Assertion(val, msg).to.not.be.instanceOf(type);
          };
          assert.include = function(exp, inc, msg) {
            new Assertion(exp, msg, assert.include).include(inc);
          };
          assert.notInclude = function(exp, inc, msg) {
            new Assertion(exp, msg, assert.notInclude).not.include(inc);
          };
          assert.match = function(exp, re, msg) {
            new Assertion(exp, msg).to.match(re);
          };
          assert.notMatch = function(exp, re, msg) {
            new Assertion(exp, msg).to.not.match(re);
          };
          assert.property = function(obj, prop, msg) {
            new Assertion(obj, msg).to.have.property(prop);
          };
          assert.notProperty = function(obj, prop, msg) {
            new Assertion(obj, msg).to.not.have.property(prop);
          };
          assert.deepProperty = function(obj, prop, msg) {
            new Assertion(obj, msg).to.have.deep.property(prop);
          };
          assert.notDeepProperty = function(obj, prop, msg) {
            new Assertion(obj, msg).to.not.have.deep.property(prop);
          };
          assert.propertyVal = function(obj, prop, val, msg) {
            new Assertion(obj, msg).to.have.property(prop, val);
          };
          assert.propertyNotVal = function(obj, prop, val, msg) {
            new Assertion(obj, msg).to.not.have.property(prop, val);
          };
          assert.deepPropertyVal = function(obj, prop, val, msg) {
            new Assertion(obj, msg).to.have.deep.property(prop, val);
          };
          assert.deepPropertyNotVal = function(obj, prop, val, msg) {
            new Assertion(obj, msg).to.not.have.deep.property(prop, val);
          };
          assert.lengthOf = function(exp, len, msg) {
            new Assertion(exp, msg).to.have.length(len);
          };
          assert.throws = function(fn, errt, errs, msg) {
            if ('string' === typeof errt || errt instanceof RegExp) {
              errs = errt;
              errt = null;
            }
            var assertErr = new Assertion(fn, msg).to.throw(errt, errs);
            return flag(assertErr, 'object');
          };
          assert.doesNotThrow = function(fn, type, msg) {
            if ('string' === typeof type) {
              msg = type;
              type = null;
            }
            new Assertion(fn, msg).to.not.Throw(type);
          };
          assert.operator = function(val, operator, val2, msg) {
            var ok;
            switch (operator) {
              case '==':
                ok = val == val2;
                break;
              case '===':
                ok = val === val2;
                break;
              case '>':
                ok = val > val2;
                break;
              case '>=':
                ok = val >= val2;
                break;
              case '<':
                ok = val < val2;
                break;
              case '<=':
                ok = val <= val2;
                break;
              case '!=':
                ok = val != val2;
                break;
              case '!==':
                ok = val !== val2;
                break;
              default:
                throw new Error('Invalid operator "' + operator + '"');
            }
            var test = new Assertion(ok, msg);
            test.assert(true === flag(test, 'object'), 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2), 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2));
          };
          assert.closeTo = function(act, exp, delta, msg) {
            new Assertion(act, msg).to.be.closeTo(exp, delta);
          };
          assert.approximately = function(act, exp, delta, msg) {
            new Assertion(act, msg).to.be.approximately(exp, delta);
          };
          assert.sameMembers = function(set1, set2, msg) {
            new Assertion(set1, msg).to.have.same.members(set2);
          };
          assert.sameDeepMembers = function(set1, set2, msg) {
            new Assertion(set1, msg).to.have.same.deep.members(set2);
          };
          assert.includeMembers = function(superset, subset, msg) {
            new Assertion(superset, msg).to.include.members(subset);
          };
          assert.includeDeepMembers = function(superset, subset, msg) {
            new Assertion(superset, msg).to.include.deep.members(subset);
          };
          assert.oneOf = function(inList, list, msg) {
            new Assertion(inList, msg).to.be.oneOf(list);
          };
          assert.changes = function(fn, obj, prop) {
            new Assertion(fn).to.change(obj, prop);
          };
          assert.doesNotChange = function(fn, obj, prop) {
            new Assertion(fn).to.not.change(obj, prop);
          };
          assert.increases = function(fn, obj, prop) {
            new Assertion(fn).to.increase(obj, prop);
          };
          assert.doesNotIncrease = function(fn, obj, prop) {
            new Assertion(fn).to.not.increase(obj, prop);
          };
          assert.decreases = function(fn, obj, prop) {
            new Assertion(fn).to.decrease(obj, prop);
          };
          assert.doesNotDecrease = function(fn, obj, prop) {
            new Assertion(fn).to.not.decrease(obj, prop);
          };
          assert.ifError = function(val) {
            if (val) {
              throw (val);
            }
          };
          assert.isExtensible = function(obj, msg) {
            new Assertion(obj, msg).to.be.extensible;
          };
          assert.isNotExtensible = function(obj, msg) {
            new Assertion(obj, msg).to.not.be.extensible;
          };
          assert.isSealed = function(obj, msg) {
            new Assertion(obj, msg).to.be.sealed;
          };
          assert.isNotSealed = function(obj, msg) {
            new Assertion(obj, msg).to.not.be.sealed;
          };
          assert.isFrozen = function(obj, msg) {
            new Assertion(obj, msg).to.be.frozen;
          };
          assert.isNotFrozen = function(obj, msg) {
            new Assertion(obj, msg).to.not.be.frozen;
          };
          (function alias(name, as) {
            assert[as] = assert[name];
            return alias;
          })('isOk', 'ok')('isNotOk', 'notOk')('throws', 'throw')('throws', 'Throw')('isExtensible', 'extensible')('isNotExtensible', 'notExtensible')('isSealed', 'sealed')('isNotSealed', 'notSealed')('isFrozen', 'frozen')('isNotFrozen', 'notFrozen');
        };
      }, {}],
      7: [function(require, module, exports) {
        module.exports = function(chai, util) {
          chai.expect = function(val, message) {
            return new chai.Assertion(val, message);
          };
          chai.expect.fail = function(actual, expected, message, operator) {
            message = message || 'expect.fail()';
            throw new chai.AssertionError(message, {
              actual: actual,
              expected: expected,
              operator: operator
            }, chai.expect.fail);
          };
        };
      }, {}],
      8: [function(require, module, exports) {
        module.exports = function(chai, util) {
          var Assertion = chai.Assertion;
          function loadShould() {
            function shouldGetter() {
              if (this instanceof String || this instanceof Number || this instanceof Boolean) {
                return new Assertion(this.valueOf(), null, shouldGetter);
              }
              return new Assertion(this, null, shouldGetter);
            }
            function shouldSetter(value) {
              Object.defineProperty(this, 'should', {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
              });
            }
            Object.defineProperty(Object.prototype, 'should', {
              set: shouldSetter,
              get: shouldGetter,
              configurable: true
            });
            var should = {};
            should.fail = function(actual, expected, message, operator) {
              message = message || 'should.fail()';
              throw new chai.AssertionError(message, {
                actual: actual,
                expected: expected,
                operator: operator
              }, should.fail);
            };
            should.equal = function(val1, val2, msg) {
              new Assertion(val1, msg).to.equal(val2);
            };
            should.Throw = function(fn, errt, errs, msg) {
              new Assertion(fn, msg).to.Throw(errt, errs);
            };
            should.exist = function(val, msg) {
              new Assertion(val, msg).to.exist;
            };
            should.not = {};
            should.not.equal = function(val1, val2, msg) {
              new Assertion(val1, msg).to.not.equal(val2);
            };
            should.not.Throw = function(fn, errt, errs, msg) {
              new Assertion(fn, msg).to.not.Throw(errt, errs);
            };
            should.not.exist = function(val, msg) {
              new Assertion(val, msg).to.not.exist;
            };
            should['throw'] = should['Throw'];
            should.not['throw'] = should.not['Throw'];
            return should;
          }
          ;
          chai.should = loadShould;
          chai.Should = loadShould;
        };
      }, {}],
      9: [function(require, module, exports) {
        var transferFlags = require('./transferFlags');
        var flag = require('./flag');
        var config = require('../config');
        var hasProtoSupport = '__proto__' in Object;
        var excludeNames = /^(?:length|name|arguments|caller)$/;
        var call = Function.prototype.call,
            apply = Function.prototype.apply;
        module.exports = function(ctx, name, method, chainingBehavior) {
          if (typeof chainingBehavior !== 'function') {
            chainingBehavior = function() {};
          }
          var chainableBehavior = {
            method: method,
            chainingBehavior: chainingBehavior
          };
          if (!ctx.__methods) {
            ctx.__methods = {};
          }
          ctx.__methods[name] = chainableBehavior;
          Object.defineProperty(ctx, name, {
            get: function() {
              chainableBehavior.chainingBehavior.call(this);
              var assert = function assert() {
                var old_ssfi = flag(this, 'ssfi');
                if (old_ssfi && config.includeStack === false)
                  flag(this, 'ssfi', assert);
                var result = chainableBehavior.method.apply(this, arguments);
                return result === undefined ? this : result;
              };
              if (hasProtoSupport) {
                var prototype = assert.__proto__ = Object.create(this);
                prototype.call = call;
                prototype.apply = apply;
              } else {
                var asserterNames = Object.getOwnPropertyNames(ctx);
                asserterNames.forEach(function(asserterName) {
                  if (!excludeNames.test(asserterName)) {
                    var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
                    Object.defineProperty(assert, asserterName, pd);
                  }
                });
              }
              transferFlags(this, assert);
              return assert;
            },
            configurable: true
          });
        };
      }, {
        "../config": 4,
        "./flag": 13,
        "./transferFlags": 29
      }],
      10: [function(require, module, exports) {
        var config = require('../config');
        var flag = require('./flag');
        module.exports = function(ctx, name, method) {
          ctx[name] = function() {
            var old_ssfi = flag(this, 'ssfi');
            if (old_ssfi && config.includeStack === false)
              flag(this, 'ssfi', ctx[name]);
            var result = method.apply(this, arguments);
            return result === undefined ? this : result;
          };
        };
      }, {
        "../config": 4,
        "./flag": 13
      }],
      11: [function(require, module, exports) {
        var config = require('../config');
        var flag = require('./flag');
        module.exports = function(ctx, name, getter) {
          Object.defineProperty(ctx, name, {
            get: function addProperty() {
              var old_ssfi = flag(this, 'ssfi');
              if (old_ssfi && config.includeStack === false)
                flag(this, 'ssfi', addProperty);
              var result = getter.call(this);
              return result === undefined ? this : result;
            },
            configurable: true
          });
        };
      }, {
        "../config": 4,
        "./flag": 13
      }],
      12: [function(require, module, exports) {
        var AssertionError = require('assertion-error');
        var flag = require('./flag');
        var type = require('type-detect');
        module.exports = function(obj, types) {
          var obj = flag(obj, 'object');
          types = types.map(function(t) {
            return t.toLowerCase();
          });
          types.sort();
          var str = types.map(function(t, index) {
            var art = ~['a', 'e', 'i', 'o', 'u'].indexOf(t.charAt(0)) ? 'an' : 'a';
            var or = types.length > 1 && index === types.length - 1 ? 'or ' : '';
            return or + art + ' ' + t;
          }).join(', ');
          if (!types.some(function(expected) {
            return type(obj) === expected;
          })) {
            throw new AssertionError('object tested must be ' + str + ', but ' + type(obj) + ' given');
          }
        };
      }, {
        "./flag": 13,
        "assertion-error": 30,
        "type-detect": 35
      }],
      13: [function(require, module, exports) {
        module.exports = function(obj, key, value) {
          var flags = obj.__flags || (obj.__flags = Object.create(null));
          if (arguments.length === 3) {
            flags[key] = value;
          } else {
            return flags[key];
          }
        };
      }, {}],
      14: [function(require, module, exports) {
        module.exports = function(obj, args) {
          return args.length > 4 ? args[4] : obj._obj;
        };
      }, {}],
      15: [function(require, module, exports) {
        module.exports = function getEnumerableProperties(object) {
          var result = [];
          for (var name in object) {
            result.push(name);
          }
          return result;
        };
      }, {}],
      16: [function(require, module, exports) {
        var flag = require('./flag'),
            getActual = require('./getActual'),
            inspect = require('./inspect'),
            objDisplay = require('./objDisplay');
        module.exports = function(obj, args) {
          var negate = flag(obj, 'negate'),
              val = flag(obj, 'object'),
              expected = args[3],
              actual = getActual(obj, args),
              msg = negate ? args[2] : args[1],
              flagMsg = flag(obj, 'message');
          if (typeof msg === "function")
            msg = msg();
          msg = msg || '';
          msg = msg.replace(/#\{this\}/g, function() {
            return objDisplay(val);
          }).replace(/#\{act\}/g, function() {
            return objDisplay(actual);
          }).replace(/#\{exp\}/g, function() {
            return objDisplay(expected);
          });
          return flagMsg ? flagMsg + ': ' + msg : msg;
        };
      }, {
        "./flag": 13,
        "./getActual": 14,
        "./inspect": 23,
        "./objDisplay": 24
      }],
      17: [function(require, module, exports) {
        module.exports = function(func) {
          if (func.name)
            return func.name;
          var match = /^\s?function ([^(]*)\(/.exec(func);
          return match && match[1] ? match[1] : "";
        };
      }, {}],
      18: [function(require, module, exports) {
        var hasProperty = require('./hasProperty');
        module.exports = function getPathInfo(path, obj) {
          var parsed = parsePath(path),
              last = parsed[parsed.length - 1];
          var info = {
            parent: parsed.length > 1 ? _getPathValue(parsed, obj, parsed.length - 1) : obj,
            name: last.p || last.i,
            value: _getPathValue(parsed, obj)
          };
          info.exists = hasProperty(info.name, info.parent);
          return info;
        };
        function parsePath(path) {
          var str = path.replace(/([^\\])\[/g, '$1.['),
              parts = str.match(/(\\\.|[^.]+?)+/g);
          return parts.map(function(value) {
            var re = /^\[(\d+)\]$/,
                mArr = re.exec(value);
            if (mArr)
              return {i: parseFloat(mArr[1])};
            else
              return {p: value.replace(/\\([.\[\]])/g, '$1')};
          });
        }
        function _getPathValue(parsed, obj, index) {
          var tmp = obj,
              res;
          index = (index === undefined ? parsed.length : index);
          for (var i = 0,
              l = index; i < l; i++) {
            var part = parsed[i];
            if (tmp) {
              if ('undefined' !== typeof part.p)
                tmp = tmp[part.p];
              else if ('undefined' !== typeof part.i)
                tmp = tmp[part.i];
              if (i == (l - 1))
                res = tmp;
            } else {
              res = undefined;
            }
          }
          return res;
        }
      }, {"./hasProperty": 21}],
      19: [function(require, module, exports) {
        var getPathInfo = require('./getPathInfo');
        module.exports = function(path, obj) {
          var info = getPathInfo(path, obj);
          return info.value;
        };
      }, {"./getPathInfo": 18}],
      20: [function(require, module, exports) {
        module.exports = function getProperties(object) {
          var result = Object.getOwnPropertyNames(object);
          function addProperty(property) {
            if (result.indexOf(property) === -1) {
              result.push(property);
            }
          }
          var proto = Object.getPrototypeOf(object);
          while (proto !== null) {
            Object.getOwnPropertyNames(proto).forEach(addProperty);
            proto = Object.getPrototypeOf(proto);
          }
          return result;
        };
      }, {}],
      21: [function(require, module, exports) {
        var type = require('type-detect');
        var literals = {
          'number': Number,
          'string': String
        };
        module.exports = function hasProperty(name, obj) {
          var ot = type(obj);
          if (ot === 'null' || ot === 'undefined')
            return false;
          if (literals[ot] && typeof obj !== 'object')
            obj = new literals[ot](obj);
          return name in obj;
        };
      }, {"type-detect": 35}],
      22: [function(require, module, exports) {
        var exports = module.exports = {};
        exports.test = require('./test');
        exports.type = require('type-detect');
        exports.expectTypes = require('./expectTypes');
        exports.getMessage = require('./getMessage');
        exports.getActual = require('./getActual');
        exports.inspect = require('./inspect');
        exports.objDisplay = require('./objDisplay');
        exports.flag = require('./flag');
        exports.transferFlags = require('./transferFlags');
        exports.eql = require('deep-eql');
        exports.getPathValue = require('./getPathValue');
        exports.getPathInfo = require('./getPathInfo');
        exports.hasProperty = require('./hasProperty');
        exports.getName = require('./getName');
        exports.addProperty = require('./addProperty');
        exports.addMethod = require('./addMethod');
        exports.overwriteProperty = require('./overwriteProperty');
        exports.overwriteMethod = require('./overwriteMethod');
        exports.addChainableMethod = require('./addChainableMethod');
        exports.overwriteChainableMethod = require('./overwriteChainableMethod');
      }, {
        "./addChainableMethod": 9,
        "./addMethod": 10,
        "./addProperty": 11,
        "./expectTypes": 12,
        "./flag": 13,
        "./getActual": 14,
        "./getMessage": 16,
        "./getName": 17,
        "./getPathInfo": 18,
        "./getPathValue": 19,
        "./hasProperty": 21,
        "./inspect": 23,
        "./objDisplay": 24,
        "./overwriteChainableMethod": 25,
        "./overwriteMethod": 26,
        "./overwriteProperty": 27,
        "./test": 28,
        "./transferFlags": 29,
        "deep-eql": 31,
        "type-detect": 35
      }],
      23: [function(require, module, exports) {
        var getName = require('./getName');
        var getProperties = require('./getProperties');
        var getEnumerableProperties = require('./getEnumerableProperties');
        module.exports = inspect;
        function inspect(obj, showHidden, depth, colors) {
          var ctx = {
            showHidden: showHidden,
            seen: [],
            stylize: function(str) {
              return str;
            }
          };
          return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
        }
        var isDOMElement = function(object) {
          if (typeof HTMLElement === 'object') {
            return object instanceof HTMLElement;
          } else {
            return object && typeof object === 'object' && object.nodeType === 1 && typeof object.nodeName === 'string';
          }
        };
        function formatValue(ctx, value, recurseTimes) {
          if (value && typeof value.inspect === 'function' && value.inspect !== exports.inspect && !(value.constructor && value.constructor.prototype === value)) {
            var ret = value.inspect(recurseTimes);
            if (typeof ret !== 'string') {
              ret = formatValue(ctx, ret, recurseTimes);
            }
            return ret;
          }
          var primitive = formatPrimitive(ctx, value);
          if (primitive) {
            return primitive;
          }
          if (isDOMElement(value)) {
            if ('outerHTML' in value) {
              return value.outerHTML;
            } else {
              try {
                if (document.xmlVersion) {
                  var xmlSerializer = new XMLSerializer();
                  return xmlSerializer.serializeToString(value);
                } else {
                  var ns = "http://www.w3.org/1999/xhtml";
                  var container = document.createElementNS(ns, '_');
                  container.appendChild(value.cloneNode(false));
                  html = container.innerHTML.replace('><', '>' + value.innerHTML + '<');
                  container.innerHTML = '';
                  return html;
                }
              } catch (err) {}
            }
          }
          var visibleKeys = getEnumerableProperties(value);
          var keys = ctx.showHidden ? getProperties(value) : visibleKeys;
          if (keys.length === 0 || (isError(value) && ((keys.length === 1 && keys[0] === 'stack') || (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')))) {
            if (typeof value === 'function') {
              var name = getName(value);
              var nameSuffix = name ? ': ' + name : '';
              return ctx.stylize('[Function' + nameSuffix + ']', 'special');
            }
            if (isRegExp(value)) {
              return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
            }
            if (isDate(value)) {
              return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
            }
            if (isError(value)) {
              return formatError(value);
            }
          }
          var base = '',
              array = false,
              braces = ['{', '}'];
          if (isArray(value)) {
            array = true;
            braces = ['[', ']'];
          }
          if (typeof value === 'function') {
            var name = getName(value);
            var nameSuffix = name ? ': ' + name : '';
            base = ' [Function' + nameSuffix + ']';
          }
          if (isRegExp(value)) {
            base = ' ' + RegExp.prototype.toString.call(value);
          }
          if (isDate(value)) {
            base = ' ' + Date.prototype.toUTCString.call(value);
          }
          if (isError(value)) {
            return formatError(value);
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
          switch (typeof value) {
            case 'undefined':
              return ctx.stylize('undefined', 'undefined');
            case 'string':
              var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
              return ctx.stylize(simple, 'string');
            case 'number':
              if (value === 0 && (1 / value) === -Infinity) {
                return ctx.stylize('-0', 'number');
              }
              return ctx.stylize('' + value, 'number');
            case 'boolean':
              return ctx.stylize('' + value, 'boolean');
          }
          if (value === null) {
            return ctx.stylize('null', 'null');
          }
        }
        function formatError(value) {
          return '[' + Error.prototype.toString.call(value) + ']';
        }
        function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
          var output = [];
          for (var i = 0,
              l = value.length; i < l; ++i) {
            if (Object.prototype.hasOwnProperty.call(value, String(i))) {
              output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
            } else {
              output.push('');
            }
          }
          keys.forEach(function(key) {
            if (!key.match(/^\d+$/)) {
              output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
            }
          });
          return output;
        }
        function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
          var name,
              str;
          if (value.__lookupGetter__) {
            if (value.__lookupGetter__(key)) {
              if (value.__lookupSetter__(key)) {
                str = ctx.stylize('[Getter/Setter]', 'special');
              } else {
                str = ctx.stylize('[Getter]', 'special');
              }
            } else {
              if (value.__lookupSetter__(key)) {
                str = ctx.stylize('[Setter]', 'special');
              }
            }
          }
          if (visibleKeys.indexOf(key) < 0) {
            name = '[' + key + ']';
          }
          if (!str) {
            if (ctx.seen.indexOf(value[key]) < 0) {
              if (recurseTimes === null) {
                str = formatValue(ctx, value[key], null);
              } else {
                str = formatValue(ctx, value[key], recurseTimes - 1);
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
          if (typeof name === 'undefined') {
            if (array && key.match(/^\d+$/)) {
              return str;
            }
            name = JSON.stringify('' + key);
            if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
              name = name.substr(1, name.length - 2);
              name = ctx.stylize(name, 'name');
            } else {
              name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
              name = ctx.stylize(name, 'string');
            }
          }
          return name + ': ' + str;
        }
        function reduceToSingleString(output, base, braces) {
          var numLinesEst = 0;
          var length = output.reduce(function(prev, cur) {
            numLinesEst++;
            if (cur.indexOf('\n') >= 0)
              numLinesEst++;
            return prev + cur.length + 1;
          }, 0);
          if (length > 60) {
            return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
          }
          return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
        }
        function isArray(ar) {
          return Array.isArray(ar) || (typeof ar === 'object' && objectToString(ar) === '[object Array]');
        }
        function isRegExp(re) {
          return typeof re === 'object' && objectToString(re) === '[object RegExp]';
        }
        function isDate(d) {
          return typeof d === 'object' && objectToString(d) === '[object Date]';
        }
        function isError(e) {
          return typeof e === 'object' && objectToString(e) === '[object Error]';
        }
        function objectToString(o) {
          return Object.prototype.toString.call(o);
        }
      }, {
        "./getEnumerableProperties": 15,
        "./getName": 17,
        "./getProperties": 20
      }],
      24: [function(require, module, exports) {
        var inspect = require('./inspect');
        var config = require('../config');
        module.exports = function(obj) {
          var str = inspect(obj),
              type = Object.prototype.toString.call(obj);
          if (config.truncateThreshold && str.length >= config.truncateThreshold) {
            if (type === '[object Function]') {
              return !obj.name || obj.name === '' ? '[Function]' : '[Function: ' + obj.name + ']';
            } else if (type === '[object Array]') {
              return '[ Array(' + obj.length + ') ]';
            } else if (type === '[object Object]') {
              var keys = Object.keys(obj),
                  kstr = keys.length > 2 ? keys.splice(0, 2).join(', ') + ', ...' : keys.join(', ');
              return '{ Object (' + kstr + ') }';
            } else {
              return str;
            }
          } else {
            return str;
          }
        };
      }, {
        "../config": 4,
        "./inspect": 23
      }],
      25: [function(require, module, exports) {
        module.exports = function(ctx, name, method, chainingBehavior) {
          var chainableBehavior = ctx.__methods[name];
          var _chainingBehavior = chainableBehavior.chainingBehavior;
          chainableBehavior.chainingBehavior = function() {
            var result = chainingBehavior(_chainingBehavior).call(this);
            return result === undefined ? this : result;
          };
          var _method = chainableBehavior.method;
          chainableBehavior.method = function() {
            var result = method(_method).apply(this, arguments);
            return result === undefined ? this : result;
          };
        };
      }, {}],
      26: [function(require, module, exports) {
        module.exports = function(ctx, name, method) {
          var _method = ctx[name],
              _super = function() {
                return this;
              };
          if (_method && 'function' === typeof _method)
            _super = _method;
          ctx[name] = function() {
            var result = method(_super).apply(this, arguments);
            return result === undefined ? this : result;
          };
        };
      }, {}],
      27: [function(require, module, exports) {
        module.exports = function(ctx, name, getter) {
          var _get = Object.getOwnPropertyDescriptor(ctx, name),
              _super = function() {};
          if (_get && 'function' === typeof _get.get)
            _super = _get.get;
          Object.defineProperty(ctx, name, {
            get: function() {
              var result = getter(_super).call(this);
              return result === undefined ? this : result;
            },
            configurable: true
          });
        };
      }, {}],
      28: [function(require, module, exports) {
        var flag = require('./flag');
        module.exports = function(obj, args) {
          var negate = flag(obj, 'negate'),
              expr = args[0];
          return negate ? !expr : expr;
        };
      }, {"./flag": 13}],
      29: [function(require, module, exports) {
        module.exports = function(assertion, object, includeAll) {
          var flags = assertion.__flags || (assertion.__flags = Object.create(null));
          if (!object.__flags) {
            object.__flags = Object.create(null);
          }
          includeAll = arguments.length === 3 ? includeAll : true;
          for (var flag in flags) {
            if (includeAll || (flag !== 'object' && flag !== 'ssfi' && flag != 'message')) {
              object.__flags[flag] = flags[flag];
            }
          }
        };
      }, {}],
      30: [function(require, module, exports) {
        function exclude() {
          var excludes = [].slice.call(arguments);
          function excludeProps(res, obj) {
            Object.keys(obj).forEach(function(key) {
              if (!~excludes.indexOf(key))
                res[key] = obj[key];
            });
          }
          return function extendExclude() {
            var args = [].slice.call(arguments),
                i = 0,
                res = {};
            for (; i < args.length; i++) {
              excludeProps(res, args[i]);
            }
            return res;
          };
        }
        ;
        module.exports = AssertionError;
        function AssertionError(message, _props, ssf) {
          var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON'),
              props = extend(_props || {});
          this.message = message || 'Unspecified AssertionError';
          this.showDiff = false;
          for (var key in props) {
            this[key] = props[key];
          }
          ssf = ssf || arguments.callee;
          if (ssf && Error.captureStackTrace) {
            Error.captureStackTrace(this, ssf);
          } else {
            this.stack = new Error().stack;
          }
        }
        AssertionError.prototype = Object.create(Error.prototype);
        AssertionError.prototype.name = 'AssertionError';
        AssertionError.prototype.constructor = AssertionError;
        AssertionError.prototype.toJSON = function(stack) {
          var extend = exclude('constructor', 'toJSON', 'stack'),
              props = extend({name: this.name}, this);
          if (false !== stack && this.stack) {
            props.stack = this.stack;
          }
          return props;
        };
      }, {}],
      31: [function(require, module, exports) {
        module.exports = require('./lib/eql');
      }, {"./lib/eql": 32}],
      32: [function(require, module, exports) {
        var type = require('type-detect');
        var Buffer;
        try {
          Buffer = require('buffer').Buffer;
        } catch (ex) {
          Buffer = {};
          Buffer.isBuffer = function() {
            return false;
          };
        }
        module.exports = deepEqual;
        function deepEqual(a, b, m) {
          if (sameValue(a, b)) {
            return true;
          } else if ('date' === type(a)) {
            return dateEqual(a, b);
          } else if ('regexp' === type(a)) {
            return regexpEqual(a, b);
          } else if (Buffer.isBuffer(a)) {
            return bufferEqual(a, b);
          } else if ('arguments' === type(a)) {
            return argumentsEqual(a, b, m);
          } else if (!typeEqual(a, b)) {
            return false;
          } else if (('object' !== type(a) && 'object' !== type(b)) && ('array' !== type(a) && 'array' !== type(b))) {
            return sameValue(a, b);
          } else {
            return objectEqual(a, b, m);
          }
        }
        function sameValue(a, b) {
          if (a === b)
            return a !== 0 || 1 / a === 1 / b;
          return a !== a && b !== b;
        }
        function typeEqual(a, b) {
          return type(a) === type(b);
        }
        function dateEqual(a, b) {
          if ('date' !== type(b))
            return false;
          return sameValue(a.getTime(), b.getTime());
        }
        function regexpEqual(a, b) {
          if ('regexp' !== type(b))
            return false;
          return sameValue(a.toString(), b.toString());
        }
        function argumentsEqual(a, b, m) {
          if ('arguments' !== type(b))
            return false;
          a = [].slice.call(a);
          b = [].slice.call(b);
          return deepEqual(a, b, m);
        }
        function enumerable(a) {
          var res = [];
          for (var key in a)
            res.push(key);
          return res;
        }
        function iterableEqual(a, b) {
          if (a.length !== b.length)
            return false;
          var i = 0;
          var match = true;
          for (; i < a.length; i++) {
            if (a[i] !== b[i]) {
              match = false;
              break;
            }
          }
          return match;
        }
        function bufferEqual(a, b) {
          if (!Buffer.isBuffer(b))
            return false;
          return iterableEqual(a, b);
        }
        function isValue(a) {
          return a !== null && a !== undefined;
        }
        function objectEqual(a, b, m) {
          if (!isValue(a) || !isValue(b)) {
            return false;
          }
          if (a.prototype !== b.prototype) {
            return false;
          }
          var i;
          if (m) {
            for (i = 0; i < m.length; i++) {
              if ((m[i][0] === a && m[i][1] === b) || (m[i][0] === b && m[i][1] === a)) {
                return true;
              }
            }
          } else {
            m = [];
          }
          try {
            var ka = enumerable(a);
            var kb = enumerable(b);
          } catch (ex) {
            return false;
          }
          ka.sort();
          kb.sort();
          if (!iterableEqual(ka, kb)) {
            return false;
          }
          m.push([a, b]);
          var key;
          for (i = ka.length - 1; i >= 0; i--) {
            key = ka[i];
            if (!deepEqual(a[key], b[key], m)) {
              return false;
            }
          }
          return true;
        }
      }, {
        "buffer": undefined,
        "type-detect": 33
      }],
      33: [function(require, module, exports) {
        module.exports = require('./lib/type');
      }, {"./lib/type": 34}],
      34: [function(require, module, exports) {
        var exports = module.exports = getType;
        var natives = {
          '[object Array]': 'array',
          '[object RegExp]': 'regexp',
          '[object Function]': 'function',
          '[object Arguments]': 'arguments',
          '[object Date]': 'date'
        };
        function getType(obj) {
          var str = Object.prototype.toString.call(obj);
          if (natives[str])
            return natives[str];
          if (obj === null)
            return 'null';
          if (obj === undefined)
            return 'undefined';
          if (obj === Object(obj))
            return 'object';
          return typeof obj;
        }
        exports.Library = Library;
        function Library() {
          this.tests = {};
        }
        Library.prototype.of = getType;
        Library.prototype.define = function(type, test) {
          if (arguments.length === 1)
            return this.tests[type];
          this.tests[type] = test;
          return this;
        };
        Library.prototype.test = function(obj, type) {
          if (type === getType(obj))
            return true;
          var test = this.tests[type];
          if (test && 'regexp' === getType(test)) {
            return test.test(obj);
          } else if (test && 'function' === getType(test)) {
            return test(obj);
          } else {
            throw new ReferenceError('Type test "' + type + '" not defined or invalid.');
          }
        };
      }, {}],
      35: [function(require, module, exports) {
        arguments[4][33][0].apply(exports, arguments);
      }, {
        "./lib/type": 36,
        "dup": 33
      }],
      36: [function(require, module, exports) {
        var exports = module.exports = getType;
        var objectTypeRegexp = /^\[object (.*)\]$/;
        function getType(obj) {
          var type = Object.prototype.toString.call(obj).match(objectTypeRegexp)[1].toLowerCase();
          if (typeof Promise === 'function' && obj instanceof Promise)
            return 'promise';
          if (obj === null)
            return 'null';
          if (obj === undefined)
            return 'undefined';
          return type;
        }
        exports.Library = Library;
        function Library() {
          if (!(this instanceof Library))
            return new Library();
          this.tests = {};
        }
        Library.prototype.of = getType;
        Library.prototype.define = function(type, test) {
          if (arguments.length === 1)
            return this.tests[type];
          this.tests[type] = test;
          return this;
        };
        Library.prototype.test = function(obj, type) {
          if (type === getType(obj))
            return true;
          var test = this.tests[type];
          if (test && 'regexp' === getType(test)) {
            return test.test(obj);
          } else if (test && 'function' === getType(test)) {
            return test(obj);
          } else {
            throw new ReferenceError('Type test "' + type + '" not defined or invalid.');
          }
        };
      }, {}]
    }, {}, [1])(1);
  });
})(require('buffer').Buffer);
