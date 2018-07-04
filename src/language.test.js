/* global test expect */

import { mapLangFromCode } from './language'

import config from './config'

test('mapLangFromCode', () => {
    const lang = mapLangFromCode('VN')
    expect(lang).toBe('vi')
})

test('mapLangFromCode default', () => {
    const lang = mapLangFromCode(config.DEFAULT_COUNTRY)
    expect(lang).toBe(config.DEFAULT_LANG)
})
