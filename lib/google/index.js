'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _helper = require('../helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    getUserCountry: getUserCountry,
    getLanguages: getLanguages,
    translate: translate,
    tts: tts
};


var MAX_LENGTH = 5000;
var MAX_TTS_LENGTH = 200;

// support client side only
function getUserCountry() {
    var endpoint = 'https://translate.googleapis.com/translate_a/w';
    var qs = {
        client: 'it'
    };
    return {
        url: (0, _helper.makeURL)(endpoint, qs),
        method: 'GET',
        headers: {
            'User-Agent': _config2.default.user_agent
        }
    };
}

function getLanguages() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';

    var endpoint = 'https://translate.google.com/translate_a/l';
    var qs = {
        hl: lang,
        client: 'it',
        oe: _config2.default.DEFAULT_ENCODING,
        ie: _config2.default.DEFAULT_ENCODING
    };
    return {
        url: (0, _helper.makeURL)(endpoint, qs),
        method: 'GET',
        headers: {
            'User-Agent': _config2.default.user_agent
        }
    };
}

function translate() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config2.default.DEFAULT_LANG;
    var question = arguments[1];
    var src = arguments[2];
    var target = arguments[3];
    var simple = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    if (question.length > MAX_LENGTH) {
        throw new Error('Maximum text length exceeded: ' + MAX_LENGTH);
    }

    var endpoint = 'https://translate.google.com/translate_a/single';
    var qs = {
        q: question,
        sl: src,
        tl: target,
        hl: lang,
        client: 'it',
        dt: ['t', 'rmt', 'bd', 'rms', 'qca', 'ss', 'md', 'ld', 'ex', 'rw'],
        otf: '2', // ?
        dj: '1', // json object instead of array
        ie: _config2.default.DEFAULT_ENCODING,
        oe: _config2.default.DEFAULT_ENCODING

        // simple
    };if (simple) qs.dt = 't';

    return {
        url: (0, _helper.makeURL)(endpoint, qs),
        method: 'GET',
        headers: {
            'User-Agent': _config2.default.user_agent
        }
    };
}

// src: input or target
// need http agent as keep-alive
function tts() {
    var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config2.default.DEFAULT_LANG;
    var question = arguments[1];
    var src = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'input';
    var target = arguments[3];

    // TODO: break by \n \r\n . ,

    // cap by MAX_TTS_LENGTH
    question = question.substring(0, MAX_TTS_LENGTH);

    // src can be 'input' or 'target'
    if (src !== 'input' && src !== 'target') {
        src = 'input';
    }

    var endpoint = 'https://translate.google.com/translate_tts';
    var qs = {
        q: question,
        tl: target,
        hl: lang,
        client: 'it',
        total: '1', // 1 or 2
        idx: '0',
        textlen: question.length,
        prev: src,
        ie: _config2.default.DEFAULT_ENCODING
    };

    return {
        url: (0, _helper.makeURL)(endpoint, qs),
        method: 'GET',
        headers: {
            'User-Agent': _config2.default.user_agent,
            Connection: 'keep-alive'
        }
    };
}