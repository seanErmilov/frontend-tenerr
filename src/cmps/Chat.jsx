import closeIcon from '../assets/icon/close-x-icon.svg';
import fileIcon from '../assets/icon/upload-file-icon.svg';
import emojiIcon from '../assets/icon/emoji-icon.svg';
import sendMessageIcon from '../assets/icon/send-message.svg';
import { useEffect, useState } from 'react';
import { addMessage, loadMessages } from '../store/actions/message.actions';
import { useSelector } from 'react-redux';
import { MessageList } from './MessageList';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { useNavigate } from 'react-router';
import { messageService } from '../services/message/message.service';

export function Chat({ messageRecipient, setIsChatActive }) {
    const [msgToEdit, setMsgToEdit] = useState(messageService.getEmptyMessage())
    const messages = useSelector(storeState => storeState.messageModule.messages)
    const user = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        loadMessages(messageRecipient._id)
    }, [])

    function clearState() {
        setMsgToEdit(messageService.getEmptyMessage())
    }

    async function onSend(ev = null) {
        if (ev) ev.preventDefault()
        const message = messageService.getMessage(messageRecipient, msgToEdit)
        try {
            const savedMessage = await addMessage(message)
            showSuccessMsg('Message saved successfully')
        } catch (err) {
            showErrorMsg('failed sending a message')
            console.log('Cannot save message', err)
            throw err
        }
        clearState()
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsgToEdit({ ...msgToEdit, [field]: value })
    }

    return <section className="chat-container">
        <div className="chat-header">
            <div className="seller-profile flex">
                <div className="img-container">
                    <img src={messageRecipient.imgUrl} className="profile-img" alt="logo" />
                </div>
                <div className="flex column ">
                    <div className="bold fs16 lh26 co-grey-1100">{messageRecipient.fullname}</div>
                    <div className="flex co-grey-1000 fs14 lh21">
                        <span>Online</span>
                        <span className="dot-separator"></span>
                        <p >Avg response time: <span className="response-time text-semi-bold">2 Hrs</span></p>
                    </div>
                </div>
            </div>
            <button className="close-btn"
                onClick={() => { setIsChatActive(false) }}>
                <img src={closeIcon} alt="Close" /></button>
        </div>
        <div className='chat-content'>
            <MessageList
                messageRecipient={messageRecipient}
                messages={messages}
                logedInUser={user}
            />
        </div>
        <form onSubmit={onSend} className='message-input-container'>
            <button className="icon emoji-keyboard"><img src={emojiIcon} alt="emoji keyboard" /></button>
            <button className="icon upload-file-icon">
                <img src={fileIcon} alt="upload file" /></button>
            <input className="message-input"
                name="content"
                onChange={handleChange}
                value={msgToEdit.content}
                type="text" placeholder="write a msg..." />
            <button className="icon send-message-icon"><img src={sendMessageIcon} alt="send message" /></button>
        </form>
    </section>
}