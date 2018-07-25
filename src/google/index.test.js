/* global test expect */

import google from '.'
import language from '../language'

import fetch from 'node-fetch'

const TEST_LANG = 'en'
const TEST_QUESTION = 'hello'
const TEST_SRC = 'en'
const TEST_TARGET = 'vi'

test('getUserCountry', async () => {
    expect.assertions(2)

    const rq = google.getUserCountry()

    const res = await fetch(rq.url, {
        method: rq.method,
        headers: rq.headers,
    })

    const json = await res.json()
    // console.log('getUserCountry:', JSON.stringify(json, undefined, 2))

    expect(json).toHaveProperty('country')

    const lang = language.mapLangFromCode(json.country)
    expect(lang).toHaveLength(2)
})

test('getLanguages', async () => {
    expect.assertions(2)

    const rq = google.getLanguages(TEST_LANG)

    const res = await fetch(rq.url, {
        method: rq.method,
        headers: rq.headers,
    })

    const json = await res.json()
    // console.log('getLanguages:', JSON.stringify(json, undefined, 2))

    expect(json).toHaveProperty('sl')
    expect(json).toHaveProperty('tl')
})

test('translate', async () => {
    const rq = google.translate(TEST_LANG, TEST_QUESTION, TEST_SRC, TEST_TARGET)

    const res = await fetch(rq.url, {
        method: rq.method,
        headers: rq.headers,
    })

    const json = await res.json()
    // console.log('translate:', JSON.stringify(json, undefined, 2))

    expect(json).toHaveProperty('sentences')
    expect(json).toHaveProperty('dict')
    expect(json).toHaveProperty('src')
    expect(json).toHaveProperty('synsets')
    expect(json).toHaveProperty('definitions')
    expect(json).toHaveProperty('examples')
    expect(json).toHaveProperty('related_words')
})

test('tts', async () => {
    const rq = google.tts(TEST_LANG, TEST_QUESTION, 'input', TEST_SRC)

    const res = await fetch(rq.url, {
        method: rq.method,
        headers: rq.headers,
    })

    const data = await res.blob()
    expect(data.type).toBe('audio/mpeg')
})