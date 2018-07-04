export { getUserCountry, getLanguages, translate }

import config from '../config'
import { makeURL } from '../helper'

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
        oe: 'UTF-8',
        ie: 'UTF-8',
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
        dt: ['t', 'rmt', 'bd', 'rms', 'qca', 'ss', 'md', 'ld', 'ex'],
        otf: '2', // ?
        dj: '1', // json object instead of array
        ie: 'UTF-8',
        oe: 'UTF-8',
    }

    return {
        url: makeURL(endpoint, qs),
        method: 'GET',
        headers: {
            'User-Agent': config.user_agent,
        },
    }
}
