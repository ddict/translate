export { makeURL }

import qs from 'qs'

function makeURL(endpoint = '', query = {}) {
    return `${endpoint}?${qs.stringify(query, { arrayFormat: 'repeat' })}`
}
