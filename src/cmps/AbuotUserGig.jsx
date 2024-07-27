import level3 from '../assets/img/levels/level3.png' // Import the image


import star from '../assets/img/svg/star.svg' // Import the image


export function AboutUserGig({ user, loc }) {

    const languages = Array.isArray(user.languages) ? user.languages.join(', ') : 'Not specified'

    const randomReviewers1 = Math.floor(Math.random() * (100)) + 1
    const randomReviewers2 = Math.floor(Math.random() * (1000)) + 100

    function renderDiamonds(count) {
        return '♦️'.repeat(count)
    }

    return (
        <>
            <h2>Get to know {user.fullname}</h2>
            <div className="about-user-gig">

                <div className='general-info'>

                    {/* img */}
                    <div className="about-user-img">
                        <div className='green-circle'></div>
                        <div className="padding"> </div>
                        <img src={user.imgUrl} alt={user.fullname} />
                    </div>

                    <div className="about-user-info">
                        {/* first row */}
                        <div className="about-user-name">{user.fullname}</div>

                        {/* second row */}
                        <div className="about-user-description">{user.description}</div>

                        {/* third row */}
                        <div className='lowwer-row'>
                            <div className="gig-owner-rate"><img src={star} alt="" /><div>{user.rate}</div></div>
                            <div className="review-count">({randomReviewers1},{randomReviewers2})</div>
                            <img src={level3} className="gig-owner-level" />
                        </div>
                    </div>

                </div>

                {/* contact button */}
                <button className="about-user-contact">Contact me</button>

                <div className="abuot-user-gig-info ">
                    <div className="user-info">
                        <p className="about-user-loc">From <span>{loc}</span></p>
                        <p className="about-user-Member-since">Member since <span>Feb 2016</span></p>
                        <p className="about-user-last-delivery">Last delivery <span>about 1 hour</span></p>
                        <p className="about-user-response-time">Avg. response time <span>1 hour</span></p>
                        <p className="about-user-languages">Languages <span>{languages}</span></p>
                    </div>
                    <p className="about-user-aboutUser">HelloI'm an IT geek, MacOS addict & I love what I do. I'm known for my kindness, friendliness & great communication skills, and also for taking my time to help people and answer to their needs. I'm a fast deliverer because I work 14hrs/day on Fiverr to support, provide & protect my family..</p>
                </div>
            </div>




        </>

    )
}
