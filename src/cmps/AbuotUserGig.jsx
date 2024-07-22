export function AboutUserGig({ user, loc }) {
    const languages = Array.isArray(user.languages) ? user.languages.join(', ') : 'Not specified'
    function renderDiamonds(count) {
        return '♦️'.repeat(count)
    }

    return (
        <div className="about-user-gig">
            <h2>Get to know {user.fullname}</h2>
            <div className="about-user-info">
                <div className="about-user-img">
                    <img src={user.imgUrl} alt={user.fullname} />
                </div>
                <p className="about-user-name">{user.fullname}</p>
                <p className="about-user-description">{user.description}</p>
                <p className="about-user-level">Level {user.level} {renderDiamonds(user.diamonds)}</p>
                <p className="about-user-rate">{'★' + user.rate} <span>|</span></p>
                <button className="about-user-contact">Contact me</button>
            </div>
            <div className="abuot-user-gig-info ">
                <div className="user-info">
                    <p className="about-user-loc">From <span>{loc}</span></p>
                    <p className="about-user-Member-since">Member since <span>Feb 2016</span></p>
                    <p className="about-user-last-delivery">Last delivery <span>about 1 hour</span></p>
                    <p className="about-user-response-time">Avg. response time <span>1 hour</span></p>
                    <p className="about-user-languages">Languages <span>{languages}</span></p>
                </div>
                <p className="about-user-aboutUser">I'm an IT geek, MacOS addict & I love what I do. I'm known for my kindness, friendliness & great communication skills, and also for taking my time to help people and answer to their needs. I'm a fast deliverer because I work 14hrs/day on Fiverr to support, provide & protect my family..</p>
            </div>
        </div>
    )
}
