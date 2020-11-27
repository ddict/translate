'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeURL = undefined;

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.makeURL = makeURL;


function makeURL() {
    var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return endpoint + '?' + _qs2.default.stringify(query, { arrayFormat: 'repeat' });
}