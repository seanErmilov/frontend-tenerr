import { ContactPreview } from "./ContactPreview"

export function ContactList({ contacts, setWatchedUser }) {
    function test() {
        console.log('clg')
    }
    return (
        <section>
            <ul className="contactList">
                {contacts.map((contact) =>
                    <li key={contact._id} onClick={() => { setWatchedUser(contact) }}>
                        <ContactPreview contact={contact} />
                    </li>)
                }
            </ul>
        </section>
    )
}
