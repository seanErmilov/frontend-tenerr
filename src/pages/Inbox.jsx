import { useEffect, useState } from "react";
import { Chat } from "../cmps/chat";
import { loadMessages } from "../store/actions/message.actions";
import { useSelector } from "react-redux";
import { userService } from "../services/user";
import { messageService } from "../services/message/message.service";
import { ContactList } from "../cmps/ContactList";


export function Inbox() {

    const messages = useSelector(storeState => storeState.messageModule.messages)
    const [watchedUser, setWatchedUser] = useState(null)
    const [contacts, setContacts] = useState(null)


    useEffect(() => {
        loadMessages()
    }, [])

    useEffect(() => {
        if (messages.length > 0) {
            const newContacts = messageService.getContacts(messages)
            setWatchedUser(newContacts[0])
            setContacts(newContacts)
        }
    }, [messages])

    return (
        <section className="Inbox">
            {contacts && <ContactList contacts={contacts} setWatchedUser={setWatchedUser} />}
            {watchedUser && <Chat messageRecipient={watchedUser} />}
        </section>
    );
}