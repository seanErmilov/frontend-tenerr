import { messageService } from '../../services/message/message.service'
import { store } from '../store'
import { ADD_MESSAGE, REMOVE_MESSAGE, SET_MESSAGES, SET_MESSAGE, SET_FILTER, UPDATE_MESSAGE, ADD_MESSAGE_MSG } from '../reducers/message.reducer'

export async function loadMessages(chatPartnerId) {
    try {
        const messages = await messageService.query({ chatPartnerId: chatPartnerId })
        store.dispatch(getCmdSetMessages(messages))
    } catch (err) {
        console.log('Cannot load messages', err)
        throw err
    }
}

export async function loadMessage(messageId) {
    try {
        const message = await messageService.getById(messageId)
        store.dispatch(getCmdSetMessage(message))
    } catch (err) {
        console.log('Cannot load message', err)
        throw err
    }
}


export async function removeMessage(messageId) {
    try {
        await messageService.remove(messageId)
        store.dispatch(getCmdRemoveMessage(messageId))
    } catch (err) {
        console.log('Cannot remove message', err)
        throw err
    }
}

export async function addMessage(message) {
    try {
        const savedMessage = await messageService.save(message)
        store.dispatch(getCmdAddMessage(savedMessage))
        return savedMessage
    } catch (err) {
        console.log('Cannot add message', err)
        throw err
    }
}

export async function setMessageToStore(message) {
    try {
        store.dispatch(getCmdSetMessage(message))
        return message
    } catch (err) {
        console.log('Cannot add message', err)
        throw err
    }
}

export async function updateMessage(message) {
    try {
        const savedMessage = await messageService.save(message)
        store.dispatch(getCmdUpdateMessage(savedMessage))
        return savedMessage
    } catch (err) {
        console.log('Cannot save message', err)
        throw err
    }
}

export async function updateMessageStatus(messageId, status) {
    try {
        const message = await messageService.getById(messageId)
        message.status = status
        const savedMessage = await messageService.save(message)
        store.dispatch(getCmdSetMessage(savedMessage))
    } catch (err) {
        console.log('Cannot load message', err)
        throw err
    }
}

export async function addMessageMsg(messageId, txt) {
    try {
        const msg = await messageService.addMessageMsg(messageId, txt)
        store.dispatch(getCmdAddMessageMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add message msg', err)
        throw err
    }
}
export function setFilter(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
}

// Command Creators:
export function getCmdSetMessages(messages) {
    return {
        type: SET_MESSAGES,
        messages
    }
}
export function getCmdSetMessage(message) {
    return {
        type: SET_MESSAGE,
        message
    }
}
export function getCmdRemoveMessage(messageId) {
    return {
        type: REMOVE_MESSAGE,
        messageId
    }
}
export function getCmdAddMessage(message) {
    return {
        type: ADD_MESSAGE,
        message
    }
}
export function getCmdUpdateMessage(message) {
    return {
        type: UPDATE_MESSAGE,
        message
    }
}
export function getCmdAddMessageMsg(msg) {
    return {
        type: ADD_MESSAGE_MSG,
        msg
    }
}

// unitTestActions()
async function unitTestActions() {
    await loadMessages()
    await addMessage(messageService.getEmptyMessage())
    await updateMessage({
        _id: 'm1oC7',
        title: 'Message-Good',
    })
    await removeMessage('m1oC7')
    // TODO unit test addMessageMsg
}
