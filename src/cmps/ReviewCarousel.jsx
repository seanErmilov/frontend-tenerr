import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export function ReviewCarousel({ reviews, loc, renderStars }) {
  return (
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
      {reviews.map(review => (
        <div key={review.id} className="review-carousel-item">
          <div className="reviewer-img">
            <img src={review.by.imgUrl} alt={review.by.fullname} />
          </div>
          <div className="reviewer-name">{review.by.fullname}</div>
          <div className="reviewer-loc">{loc}</div>
          <div className="review-rate">{renderStars(review.rate)}</div>
          <div className="review-txt">{review.txt}</div>
        </div>
      ))}
    </Carousel>
  )
}
