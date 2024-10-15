import { useEffect, useState } from "react";
import { Chat } from "../cmps/chat";
import { loadMessages } from "../store/actions/message.actions";
import { useSelector } from "react-redux";
import { userService } from "../services/user";


export function Inbox() {

    const messages = useSelector(storeState => storeState.messageModule.messages)
    const [watchedUser, setWatchedUser] = useState(null)


    useEffect(() => {
        loadMessages()
    }, [])

    useEffect(() => {
        if (messages.length > 0) {
            setWatchedUser(messages[0].recipient)
        }
    }, [messages])

    return (
        <section className="Inbox">
            {watchedUser && <Chat messageRecipient={watchedUser} />}
        </section>
    );
}