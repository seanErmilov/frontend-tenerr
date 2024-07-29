
export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomElement(arr) {
    return arr[getRandomInt(0, arr.length - 1)]
}


export function getRandomElements(arr, numElements) {
    if (numElements > arr.length) {
        throw new Error('Number of elements to pick is greater than the array length')
    }

    const result = []
    const usedIndices = new Set()

    while (result.length < numElements) {
        const randomIndex = getRandomInt(0, arr.length - 1)
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex)
            result.push(arr[randomIndex])
        }
    }

    return result
}

export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function convertObjectToQueryParams(obj) {
    const queryParams = new URLSearchParams()

    Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
            // Convert array items to `key=value` format
            obj[key].forEach(value => {
                queryParams.append(`${key}`, value)
            })
        } else {
            queryParams.set(key, obj[key])
        }
    })

    return queryParams.toString()
}



export function getArrayFromSearchParams(searchParams, key) {
    const values = searchParams.getAll(key); // Retrieve all values for the given key
    return values.length > 0 ? values : []; // Return array of values or empty array if none
}
