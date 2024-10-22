
export function ContactPreview({ contact }) {

    console.log('contacts :', contact)

    return (
        <div className="ContactPreview flex">
            <div className="img-container">
                <img src={contact.imgUrl} className="profile-img" alt="logo" />
            </div>
            <div className="flex">
                <div className="bold fs16 lh26 co-grey-1100">{contact.fullname}</div>

            </div>
        </div>
    )
}
