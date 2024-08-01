import { Carousel } from 'react-responsive-carousel'
import { countries } from 'country-data';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import star from '../assets/img/svg/star.svg' // Import the image
import ReactCountryFlag from "react-country-flag"


export function ReviewCarousel({ reviews}) {
  const fiveStarReviews = reviews.filter(review => review.rate === 5)
  return (
    <div className="gig-reviews-carousel">

      <h2>What people loved about this freelancer</h2>

      {fiveStarReviews.length > 0 && (
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          autoPlay={false}
          interval={5000}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button type="button" onClick={onClickHandler} title={label} className="carousel-arrow prev">
                <span aria-hidden="true">&lt;</span>
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button type="button" onClick={onClickHandler} title={label} className="carousel-arrow next">
                <span aria-hidden="true">&gt;</span>
              </button>
            )
          }
        >
          {fiveStarReviews.map(review => (

            <div key={review.id} className="review-carousell">
              {/* 1 */}
              <img className="reviewer-img" src={review.by.imgUrl} />

              <div className='first-row'>

                {/* 2 */}
                <div className="reviewer-carousell-name">{review.by.fullname}</div>

                {/* 3 */}
                <div className="reviewer-carousell-loc">
                  <ReactCountryFlag
                    countryCode={review.loc}
                    svg
                    title={review.loc}
                  /> {countries[review.loc].name}
                </div>

                {/* 4 */}
                <div className="review-carousell-rate">
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <div>5</div>
                </div>
              </div>

              {/* 5 */}
              <div className="review-carousell-txt">{review.txt}</div>

              <div className="review-carousell-time">1 year ago</div>


            </div>
          ))}
        </Carousel>
      )}
    </div>

  )
}



