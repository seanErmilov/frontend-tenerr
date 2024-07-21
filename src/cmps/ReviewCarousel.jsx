import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export function ReviewCarousel({ reviews, loc, renderStars }) {
  const fiveStarReviews = reviews.filter(review => review.rate === 5)

  return (
    <div className="gig-reviews-carousel">
      <h1>What people loved about this freelancer</h1>

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
              <div className="reviewer-carousell-img"><img src={review.by.imgUrl} /></div>
              <div className="reviewer-carousell-name">{review.by.fullname}</div>
              <div className="reviewer-carousell-loc">{loc} <span>|</span></div>
              <div className="review-carousell-rate">{renderStars(review.rate)}</div>
              <div className="review-carousell-txt">{review.txt}</div>
            </div>
          ))}
        </Carousel>
      )}
    </div>

  )
}
