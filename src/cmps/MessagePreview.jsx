export function MessagePreview({ message, logedInUser, messageRecipient }) {

    const isCurrentUser = message.sender._id === logedInUser._id

    return (
        <div className={`basic-chat-msg ${isCurrentUser ? 'current-user' : 'recipient'}`}>
            <div className="message-content">
                {message.content}
            </div>
            {!isCurrentUser && (
                <div className="recipient-info">
                    <img src={messageRecipient.imgUrl} alt="Recipient" />
                </div>
            )}
        </div>
    );
}
