// cmps
import { CarouselImg } from './CarouselImg'

// react tools
import { Link, useNavigate } from 'react-router-dom'

export function GigPreview({ gig }) {

    function calcAverageRating() {
        if (!gig.reviews) return "no reviews"
        const rating = gig.reviews.reduce((acc, review) => {
            acc += review.rate
            return acc
        }, 0) / gig.reviews.length
        return rating.toFixed(1)
    }

    return <article className="preview">
        <CarouselImg
            gig={gig} />

        <div className='preview-header'>
            {/* ad-by */}
            <div className='ad-by'>
                <img className='owner-profile-pic' src={gig.owner.imgUrl} alt="" />
                <span className='owner-name bold'>{gig.owner.fullname}</span>
            </div>
            <img className="level" src={`../assets/img/levels/level${gig.owner.level}.png`} alt="" />
        </div>

        {/* title */}
        <Link to={`${gig._id}`} className='title'>
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
            <span className='reviewers-count'>({gig.reviews ? gig.reviews.length : 0})</span>
        </div>

        {/* from price */}
        <Link to={`${gig._id}`} className="from-price bold">
            From ${gig.price}
        </Link>

    </article>
}

