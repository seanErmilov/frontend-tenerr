import { attachment } from '@cloudinary/url-gen/qualifiers/flag'
import { httpService } from '../http.service'
import { userService } from '../user'

export const messageService = {
    query,
    getById,
    save,
    remove,
    addMessageMsg,
    getMessage,
    getEmptyMessage,
    getDefaultFilter,

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
        console.log('message in post :', message)
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
        senderId: '',
        recipientId: '',
        content: '',
        messageType: '',
        attachments: [],
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


function getMessage(recipientId, partialMessage) {
    const loginUser = userService.getLoggedinUser()
    const message = {
        senderId: loginUser._id,
        recipientId: recipientId,
        content: partialMessage.content,
        attachments: partialMessage.attachments,
    }
    return message
}
