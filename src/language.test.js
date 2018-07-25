/* global test expect */

import language from './language'
import config from './config'

test('mapLangFromCode', () => {
    const lang = language.mapLangFromCode('VN')
    expect(lang).toBe('vi')
})

test('mapLangFromCode default', () => {
    const lang = language.mapLangFromCode(config.DEFAULT_COUNTRY)
    expect(lang).toBe(config.DEFAULT_LANG)
})