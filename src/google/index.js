export {
    getUserCountry,
    getLanguages,
    translate,
    tts
}

import config from '../config'
import {
    makeURL
} from '../helper'

function getUserCountry() {
    const endpoint = 'https://translate.googleapis.com/translate_a/w'
    const qs = {
        client: 'it',
    }
    return {
        url: makeURL(endpoint, qs),
        method: 'GET',
        headers: {
            'User-Agent': config.user_agent,
        },
    }
}

function getLanguages(lang = 'en') {
    const endpoint = 'https://translate.google.com/translate_a/l'
    const qs = {
        hl: lang,
        client: 'it',
        oe: config.DEFAULT_ENCODING,
        ie: config.DEFAULT_ENCODING,
    }
    return {
        url: makeURL(endpoint, qs),
        method: 'GET',
        headers: {
            'User-Agent': config.user_agent,
        },
    }
}

function translate(lang = config.DEFAULT_LANG, question, src, target) {
    const endpoint = 'https://translate.google.com/translate_a/single'
    const qs = {
        q: question,
        sl: src,
        tl: target,
        hl: lang,
        client: 'it',
        dt: ['t', 'rmt', 'bd', 'rms', 'qca', 'ss', 'md', 'ld', 'ex', 'rw'],
        otf: '2', // ?
        dj: '1', // json object instead of array
        ie: config.DEFAULT_ENCODING,
        oe: config.DEFAULT_ENCODING,
    }

    return {
        url: makeURL(endpoint, qs),
        method: 'GET',
        headers: {
            'User-Agent': config.user_agent,
        },
    }
}

// src: input or target
function tts(lang = config.DEFAULT_LANG, question, src = 'input', target) {
    const endpoint = 'https://translate.google.com/translate_tts'
    // const endpoint = 'https://httpbin.org/get'
    const qs = {
        q: question,
        tl: target,
        hl: lang,
        client: 'it',
        total: '1', // 1 or 2
        idx: '0',
        textlen: question.length,
        prev: src,
        ie: config.DEFAULT_ENCODING,
    }

    return {
        url: makeURL(endpoint, qs),
        method: 'GET',
        headers: {
            'User-Agent': config.user_agent,
            Connection: 'keep-alive',
            'Accept-Language': 'en-us',
        },
    }
}