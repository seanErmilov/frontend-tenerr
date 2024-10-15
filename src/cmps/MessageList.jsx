import { MessagePreview } from './MessagePreview.jsx'


export function MessageList({ messages, logedInUser, messageRecipient }) {
    return <section>
        <ul className="message-list">
            {messages.map((message) =>
                <li key={message._id}>
                    <MessagePreview message={message} logedInUser={logedInUser} messageRecipient={messageRecipient} />
                </li>)
            }
        </ul>
    </section>
}