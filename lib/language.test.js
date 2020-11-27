'use strict';

var _language = require('./language');

var _language2 = _interopRequireDefault(_language);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global test expect */

test('mapLangFromCode', function () {
    var lang = _language2.default.mapLangFromCode('VN');
    expect(lang).toBe('vi');
});

test('mapLangFromCode default', function () {
    var lang = _language2.default.mapLangFromCode(_config2.default.DEFAULT_COUNTRY);
    expect(lang).toBe(_config2.default.DEFAULT_LANG);
});

test('getCountries', function () {
    var countries = _language2.default.getCountries();
    expect(Array.isArray(countries)).toBe(true);
    expect(countries).toContain('VN');
});