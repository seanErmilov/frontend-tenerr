const { DEV, VITE_LOCAL } = import.meta.env

import { getArrayFromSearchParams, getRandomIntInclusive, makeId } from '../util.service'

import { gigService as local } from './gig.service.local'
import { gigService as remote } from './gig.service.remote'

function getEmptyGig() {
    return {
        title: '',
        price: '',
        daysToMake: '',
        loc: '',
        description: '',
        tags: [],
        imgUrls: [],
    }
}

function getDefaultFilter() {
    return {
        title: '',
        price: '',
        tags: [],
        daysToMake: '',
        loc: '',
        descrption: '',
        // sortDir: '',
    }
}
function getPrimeryTags() {
    return ['logo-design', 'wordpress', 'voice-over', 'artisitic', 'proffesional', 'accessible']
}

function getPrimeCategories() {
    return ['programming', 'graphics', 'digital', 'writing', 'video', 'ai', 'music', 'business', 'consulting']
}

function getFilterFromSearchParams(searchParams) {
    const filterBy = {
        title: searchParams.get('title') || '',
        price: +searchParams.get('price') || '',
        daysToMake: +searchParams.get('daysToMake') || '',
        descrption: searchParams.get('descrption') || '',
        tags: getArrayFromSearchParams(searchParams, 'tags'),
        // sort: searchParams.get('sort') || ''
    }
    return filterBy

}

const service = VITE_LOCAL === 'true' ? local : remote
export const gigService = {
    getEmptyGig,
    getDefaultFilter,
    getPrimeryTags,
    getPrimeCategories,
    getFilterFromSearchParams,
    ...service
}

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.gigService = gigService
