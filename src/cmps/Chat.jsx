import closeIcon from '../assets/icon/close-x-icon.svg';
import fileIcon from '../assets/icon/upload-file-icon.svg';
import emojiIcon from '../assets/icon/emoji-icon.svg';
import sendMessageIcon from '../assets/icon/send-message.svg';
import { useEffect, useState } from 'react';
import { loadMessages } from '../store/actions/message.actions';
import { useSelector } from 'react-redux';

export function Chat({ gigOwner, setIsChatActive }) {

    const [msgToEdit, setMsgToEdit] = useState('')
    const messages = useSelector(storeState => storeState.gigModule.messages)
    useEffect(() => {
        loadMessages()
    }, [])


    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsgToEdit(value)
    }

    return <section className="chat-container">
        <div className="chat-header">
            <div className="seller-profile flex">
                <div className="img-container">
                    <img src={gigOwner.imgUrl} className="profile-img" alt="logo" />
                </div>
                <div className="flex column ">
                    <div className="bold fs16 lh26 co-grey-1100">Message {gigOwner.fullname}</div>
                    <div className="flex co-grey-1000 fs14 lh21">
                        <span>Online</span>
                        <span className="dot-separator"></span>
                        <p >Avg response time: <span className="response-time text-semi-bold">2 Hrs</span></p>
                    </div>
                </div>
            </div>
            <button className="close-btn" onClick={() => { setIsChatActive(false) }}><img src={closeIcon} alt="Close" /></button>
        </div>
        <div className='chat-content'>
            <div>{msgToEdit}</div>
            <div>2 msg</div>
        </div>
        <div className='message-input-container'>
            <button className="icon emoji-keyboard"><img src={emojiIcon} alt="emoji keyboard" /></button>
            <button className="icon upload-file-icon"><img src={fileIcon} alt="upload file" /></button>
            <input className="message-input" name="fullname"
                onChange={handleChange}
                value={msgToEdit}
                type="text" placeholder="write a msg..." />
            <button className="icon send-message-icon"><img src={sendMessageIcon} alt="send message" /></button>
        </div>
    </section>
}