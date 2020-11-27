'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _countryData = require('country-data');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mapLangFromCode: mapLangFromCode,
    getCountries: getCountries
};


function mapLangFromCode() {
    var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config2.default.DEFAULT_COUNTRY;

    var country = _countryData.countries[code];
    if (!country) {
        return _config2.default.DEFAULT_LANG;
    }

    var language = _countryData.languages[country.languages];
    if (!language) {
        return _config2.default.DEFAULT_LANG;
    }

    return language.alpha2 || _config2.default.DEFAULT_LANG;
}

function getCountries() {
    return _countryData.countries.all.map(function (c) {
        return c.alpha2;
    });
}