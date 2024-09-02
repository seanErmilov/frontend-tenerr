import closeIcon from '../assets/icon/close-x-icon.svg';
import fileIcon from '../assets/icon/upload-file-icon.svg';
import emojiIcon from '../assets/icon/emoji-icon.svg';

export function Chat({ gigOwner }) {
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
            <button className="close-btn"><img src={closeIcon} alt="Close" /></button>
        </div>
        <div className='chat-content'>
            <div>1 msg</div>
            <div>2 msg</div>
        </div>
        <div className='message-input-container'>
            <button className=""><img src={fileIcon} alt="upload file" /></button>
            <button className=""><img src={emojiIcon} alt="emoji keyboard" /></button>
            <input type="text" placeholder="write a msg..." />
        </div>
    </section>
}