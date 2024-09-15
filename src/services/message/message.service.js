import { httpService } from '../http.service'

export const messageService = {
    query,
    getById,
    save,
    remove,
    addMessageMsg,
    getMessage,
    getEmptyMessage,
    getDefaultFilter,
    getMessageStats,

}

async function query() {
    return httpService.get(`message`)
}

function getById(messageId) {
    return httpService.get(`message/${messageId}`)
}

async function remove(messageId) {
    return httpService.delete(`message/${messageId}`)
}

async function save(message) {
    var savedMessage
    if (message._id) {
        savedMessage = await httpService.put(`message/${message._id}`, message)
    } else {
        savedMessage = await httpService.post('message', message)
    }
    return savedMessage
}

async function addMessageMsg(messageId, txt) {
    const savedMsg = await httpService.post(`message/${messageId}/msg`, { txt })
    return savedMsg
}

function getEmptyMessage() {
    return {
        vendor: makeId(),
        price: getRandomIntInclusive(1000, 9000),
        speed: getRandomIntInclusive(80, 240),
        msgs: [],
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        maxPrice: '',
        minSpeed: '',
        sortField: '',
        sortDir: '',
        // pageIdx: 0
    }
}

function _countMessageStatuses(messages) {
    return messages.reduce((accumulator, message) => {
        if (message.status in accumulator) {
            accumulator[message.status]++
        } else {
            accumulator[message.status] = 1
        }
        return accumulator
    }, { pending: 0, rejected: 0, completed: 0 })
}

function getMessageStats(messages) {
    const messageStatusSummary = _countMessageStatuses(messages)

    const responseRate = ((messageStatusSummary.pending + messageStatusSummary.completed) / messages.length) * 100
    const messagesCompleted = (messageStatusSummary.completed / (messages.length - messageStatusSummary.rejected)) * 100

    return {
        responseRate: responseRate,
        messagesCompleted: messagesCompleted
    }
}


function getMessage(gig) {
    const message = {
        seller: {
            _id: gig.owner._id,
            fullname: gig.owner.fullname,
            imgUrl: gig.owner.imgUrl
        },
        gig: {
            _id: gig._id,
            name: gig.title,
            imgUrl: gig.imgUrls[0],
            price: gig.price
        },
        status: 'pending',
    }
    return message
}
