const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { gigService as local } from './gig.service.local'
import { gigService as remote } from './gig.service.remote'

function getEmptyGig() {
    return {
        vendor: makeId(),
        speed: getRandomIntInclusive(80, 240),
        msgs: [],
    }
}

function getDefaultFilter() {
    return {
        title: '',
        price: null,
        tags: [],
        // sortDir: '',
    }
}
function getPrimeryTags() {
    return ['logo-design', 'wordpress', 'voice-over', 'artisitic', 'proffesional', 'accessible']
}

const service = VITE_LOCAL === 'true' ? local : remote
export const gigService = { getEmptyGig, getDefaultFilter, getPrimeryTags, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.gigService = gigService
