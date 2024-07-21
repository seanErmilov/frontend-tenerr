export function AboutUserGig({ user, loc }) {
    const languages = Array.isArray(user.languages) ? user.languages.join(', ') : 'Not specified';

    return (
        <div className="about-user-gig">
            <h2>Get to know {user.fullname} </h2>
            <div className="about-user-info">
                <div className="about-user-img">
                    <img src={user.imgUrl} />
                </div>
                <div className="about-user-name">{user.fullname}</div>
                <div className="about-user-description">{user.description}</div>
                <div className="about-user-level">{user.level}</div>
                <div className="about-user-rate">{'★' + user.rate} <span>|</span></div>
                <button className="about-user-contact">Contact me</button>
            </div>
            <div className="abuot-user-gig-info">
                <div>
                    <div className="user-info">
                        <div className="about-user-loc"> From<span>{loc}</span></div>
                        <div className="about-user-Member-since">Member since <span>Feb 2016</span> </div>
                        <div className="about-user-last-delivery">Last delivery <span>about 1 hour</span></div>
                        <div className="about-user-response-time">Avg. response time <span>1 hour</span></div>
                        <div className="about-user-languages">Languages <span>English</span></div>
                    </div>
                </div>
                <div className="about-user-abuotUser">{user.abuotUser}</div>
            </div>
        </div>
    )
}
