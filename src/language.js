import {
    countries,
    languages
} from 'country-data'

import config from './config'

export default {
    mapLangFromCode
}

function mapLangFromCode(code = config.DEFAULT_COUNTRY) {
    const country = countries[code]
    if (!country) {
        return config.DEFAULT_LANG
    }

    const language = languages[country.languages]
    if (!language) {
        return config.DEFAULT_LANG
    }

    return language.alpha2 || config.DEFAULT_LANG
}