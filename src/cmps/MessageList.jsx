import { MessagePreview } from './MessagePreview.jsx'


export function MessageList({ messages }) {
    return <section>
        <ul className="message-list">
            {messages.map((message) =>
                <li key={message._id}>
                    <MessagePreview message={message} />
                </li>)
            }
        </ul>
    </section>
}