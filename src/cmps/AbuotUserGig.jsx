export function AboutUserGig({ user }) {
    const languages = Array.isArray(user.languages) ? user.languages.join(', ') : 'Not specified';

    return (
        <div className="about-user-gig">
            <h2>About User Gig</h2>
            <div className="about-user-img">
                <img src={user.imgUrl } />
            </div>
            <div className="about-user-info">
                <div className="about-user-name">{user.fullname }</div>
                <div className="about-user-level">{user.level }</div>
                <div className="about-user-rate">{'★' + user.rate}</div>
            </div>
        </div>
    );
}
