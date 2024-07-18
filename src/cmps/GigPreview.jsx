import { Link } from 'react-router-dom'
import { CarouselImg } from './CarouselImg'

const demoProfilePic = "https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/9e8702d529c8f21bb17f512459008a37-1677794942899/0970a995-f617-40ac-b337-46afa40c339b.png"


const d = "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/301b9669da5ac1a5363a4d9a79693646-1633947435052/648c5f7b-b9f7-4758-a20b-0ebceaca7ca7.jpeg"
export function GigPreview({ gig }) {

    function calcAverageRating() {
        return gig.reviews.reduce((acc, review) => {
            acc += review.rate
            return acc
        }, 0) / gig.reviews.length
    }
    console.log(gig)
    return <article className="preview">
        {/* carousel */}
        <CarouselImg
            imgsSrcs={null} />

        {/* ad-by */}
        <div className='ad-by'>
            <img src={demoProfilePic} alt="" className='owner-profile-pic' />
            Ad by <span className='owner-name'>{gig.owner.fullname}</span>
        </div>

        {/* description */}
        <div className='description'>
            {gig.description}
        </div>

        {/* rating */}
        <div className='average-rating'>
            <span className='rating'>{calcAverageRating()}</span>
            <span className='revioers-count'>({gig.reviews.length})</span>
        </div>

        {/* description */}
        <div className='description'>
            <span className='from-price'>From ${gig.price}</span> <span className="response-time">/ 5 minutes</span>
        </div>


    </article>
}

