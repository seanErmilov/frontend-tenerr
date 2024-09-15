import { messageService } from "../../services/message/message.service"

export const SET_MESSAGES = 'SET_MESSAGES'
export const SET_MESSAGE = 'SET_MESSAGE'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
export const ADD_MESSAGE_MSG = 'ADD_MESSAGE_MSG'
export const SET_FILTER = 'SET_FILTERBY'

const initialState = {
    messages: [],
    message: null
}

export function messageReducer(state = initialState, action) {
    var newState = state
    var messages
    switch (action.type) {
        case SET_MESSAGES:
            newState = { ...state, messages: action.messages }
            break
        case SET_MESSAGE:
            // newState = { ...state, message: action.message }
            messages = state.messages.map(message => {
                return message._id !== action.message._id ? message : action.message
            })
            newState = { ...state, messages, message: action.message }
            break
        case REMOVE_MESSAGE:
            const lastRemovedMessage = state.messages.find(message => message._id === action.messageId)
            messages = state.messages.filter(message => message._id !== action.messageId)
            newState = { ...state, messages, lastRemovedMessage }
            break
        case ADD_MESSAGE:
            newState = { ...state, messages: [action.message, ...state.messages] }
            break
        case UPDATE_MESSAGE:
            messages = state.messages.map(message => (message._id === action.message._id) ? action.message : message)
            newState = { ...state, messages }
            break
        case ADD_MESSAGE_MSG:
            newState = { ...state, message: { ...state.message, msgs: [...state.message.msgs || [], action.msg] } }
            break
        case SET_FILTER:
            newState = { ...state, filterBy: { ...action.filterBy } }
            break
        default:
    }
    return newState
}

