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

test('getCountries', () => {
    const countries = language.getCountries()
    expect(Array.isArray(countries)).toBe(true)
    expect(countries).toContain('VN')
})