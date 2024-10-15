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
        sender: {
            _id: '',
            imgUrl: '',
            fullname: ''
        },
        recipient: {
            _id: '',
            imgUrl: '',
            fullname: ''
        },
        content: '',
        messageType: '',
        attachments: [],
    };
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


function getMessage(recipient, partialMessage) {
    const loginUser = userService.getLoggedinUser();

    const message = {
        sender: {
            _id: loginUser._id,
            imgUrl: loginUser.imgUrl,
            fullname: loginUser.fullname
        },
        recipient: {
            _id: recipient._id,
            imgUrl: recipient.imgUrl,
            fullname: recipient.fullname
        },
        content: partialMessage.content || '',
        messageType: partialMessage.messageType || '',
        attachments: partialMessage.attachments || []
    };

    return message;
}

