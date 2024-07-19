export function AboutUserGig({ user }) {
    const languages = Array.isArray(user.languages) ? user.languages.join(', ') : 'Not specified';

    return (
        <div className="about-user-gig">
            <h2>About User Gig</h2>
            <div className="about-user-img">
                <img src={user.imgUrl || 'default-image-url.jpg'} alt={user.fullname || 'User'} />
            </div>
            <div className="about-user-info">
                <div className="about-user-name">{user.fullname || 'Name not available'}</div>
                <div className="about-user-location">From {user.location || 'Location not specified'}</div>
                <div className="about-user-member">Member since {user.memberSince || 'Date not specified'}</div>
                <div className="about-user-response">Avg. response time: {user.avgResponseTime || 'Not available'}</div>
                <div className="about-user-last-delivery">Last delivery: {user.lastDelivery || 'Not available'}</div>
                <div className="about-user-languages">Languages: {languages}</div>
                <div className="about-user-description">{user.description || 'Description not available'}</div>
            </div>
        </div>
    );
}
