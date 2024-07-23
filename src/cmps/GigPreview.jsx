// cmps
import { CarouselImg } from './CarouselImg'

// temporary
const demoProfilePic = "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/9e8702d529c8f21bb17f512459008a37-1677794942899/0970a995-f617-40ac-b337-46afa40c339b.png"

// react tools
import { Link, useNavigate } from 'react-router-dom'

export function GigPreview({ gig }) {
    const navigate = useNavigate()

    function calcAverageRating() {
        const rating = gig.reviews.reduce((acc, review) => {
            acc += review.rate
            return acc
        }, 0) / gig.reviews.length
        return rating.toFixed(1)
    }

    return <article className="preview">

        {/* Tooltip in dev */}
        {/* <div role="tooltip" className="">This freelancer has been vetted for quality and expertise by the Fiverr Pro team.</div> */}
        <CarouselImg
            imgUrls={gig.imgUrls} />


        <div className='preview-header'>
            {/* ad-by */}
            <div className='ad-by'>
                <img src={demoProfilePic} alt="" className='owner-profile-pic' />
                Ad by &nbsp;<span className='owner-name bold'>{gig.owner.fullname}</span>
            </div>

            {/* is pro in dev*/}
            {/* <div className="is-pro">
                <svg width="12" height="12" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.203.432a1.891 1.891 0 0 0-2.406 0l-1.113.912a1.904 1.904 0 0 1-.783.384l-1.395.318c-.88.2-1.503.997-1.5 1.915l.007 1.456c0 .299-.065.594-.194.863L.194 7.59a1.978 1.978 0 0 0 .535 2.388l1.12.903c.231.185.417.422.543.692l.615 1.314a1.908 1.908 0 0 0 2.166 1.063l1.392-.33c.286-.068.584-.068.87 0l1.392.33a1.908 1.908 0 0 0 2.166-1.063l.615-1.314c.126-.27.312-.507.542-.692l1.121-.903c.707-.57.93-1.563.535-2.388l-.625-1.309a1.983 1.983 0 0 1-.194-.863l.006-1.456a1.947 1.947 0 0 0-1.5-1.915L10.1 1.728a1.904 1.904 0 0 1-.784-.384L8.203.432Zm2.184 5.883a.742.742 0 0 0 0-1.036.71.71 0 0 0-1.018 0L6.565 8.135 5.095 6.73a.71.71 0 0 0-1.018.032.742.742 0 0 0 .032 1.036L6.088 9.69a.71.71 0 0 0 1.001-.016l3.297-3.359Z"></path>
                </svg>
                <div>Pro</div>
            </div> */}
            <div>
                Level
            </div>
        </div>

        {/* title */}
        <Link to={`${gig._id}`} target="_blank" className='title'>
            {gig.title}
        </Link>

        {/* rating */}
        <div className='average-rating'>
            <span className="bold star" aria-hidden="true">
                <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"></path>
                </svg>
            </span>
            <span className='rating bold'>{calcAverageRating()}</span>
            <span className='reviewers-count'>({gig.reviews.length})</span>
        </div>

        {/* from price */}

        <Link to={`${gig._id}`} target="_blank" className="from-price bold">
            ${gig.price}
        </Link>

    </article>
}

