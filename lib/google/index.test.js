'use strict';

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _ = require('.');

var _2 = _interopRequireDefault(_);

var _language = require('../language');

var _language2 = _interopRequireDefault(_language);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* global test expect */


var TEST_LANG = 'en';
var TEST_QUESTION = 'hello';
var TEST_SRC = 'en';
var TEST_TARGET = 'vi';

// global agent
var agent = new _https2.default.Agent({
    keepAlive: true
});

test('getUserCountry', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var rq, res, json, lang;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    expect.assertions(2);

                    rq = _2.default.getUserCountry();
                    _context.next = 4;
                    return (0, _nodeFetch2.default)(rq.url, {
                        method: rq.method,
                        headers: rq.headers,
                        agent: agent
                    });

                case 4:
                    res = _context.sent;
                    _context.next = 7;
                    return res.json();

                case 7:
                    json = _context.sent;

                    // console.log('getUserCountry:', JSON.stringify(json, undefined, 2))

                    expect(json).toHaveProperty('country');

                    lang = _language2.default.mapLangFromCode(json.country);

                    expect(lang).toHaveLength(2);

                case 11:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, undefined);
})));

test('getLanguages', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var rq, res, json;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    expect.assertions(2);

                    rq = _2.default.getLanguages(TEST_LANG);
                    _context2.next = 4;
                    return (0, _nodeFetch2.default)(rq.url, {
                        method: rq.method,
                        headers: rq.headers,
                        agent: agent
                    });

                case 4:
                    res = _context2.sent;
                    _context2.next = 7;
                    return res.json();

                case 7:
                    json = _context2.sent;

                    // console.log('getLanguages:', JSON.stringify(json, undefined, 2))

                    expect(json).toHaveProperty('sl');
                    expect(json).toHaveProperty('tl');

                case 10:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, undefined);
})));

test('translate', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var rq, res, json;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    rq = _2.default.translate(TEST_LANG, TEST_QUESTION, TEST_SRC, TEST_TARGET);
                    _context3.next = 3;
                    return (0, _nodeFetch2.default)(rq.url, {
                        method: rq.method,
                        headers: rq.headers,
                        agent: agent
                    });

                case 3:
                    res = _context3.sent;
                    _context3.next = 6;
                    return res.json();

                case 6:
                    json = _context3.sent;

                    // console.log('translate:', JSON.stringify(json, undefined, 2))

                    expect(json).toHaveProperty('sentences');
                    expect(json).toHaveProperty('dict');
                    expect(json).toHaveProperty('src');
                    // expect(json).toHaveProperty('synsets')
                    expect(json).toHaveProperty('definitions');
                    expect(json).toHaveProperty('examples');
                    // expect(json).toHaveProperty('related_words')

                case 12:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _callee3, undefined);
})));

test('tts', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var rq, res, data;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    rq = _2.default.tts(TEST_LANG, TEST_QUESTION, 'input', TEST_SRC);
                    _context4.next = 3;
                    return (0, _nodeFetch2.default)(rq.url, {
                        method: rq.method,
                        headers: rq.headers,
                        agent: agent
                    });

                case 3:
                    res = _context4.sent;
                    _context4.next = 6;
                    return res.blob();

                case 6:
                    data = _context4.sent;

                    expect(data.type).toBe('audio/mpeg');

                case 8:
                case 'end':
                    return _context4.stop();
            }
        }
    }, _callee4, undefined);
})));