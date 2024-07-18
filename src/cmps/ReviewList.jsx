import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export function ReviewList({ reviews, loc }) {
  const fiveStarReviews = reviews.filter(review => review.rate === 5)

  const renderStars = (rate) => {
    const fullStars = Math.floor(rate)
    const halfStars = rate % 1 !== 0 ? 1 : 0
    const emptyStars = 5 - fullStars - halfStars

    return (
      <>
        {Array(fullStars).fill().map((_, idx) => <span key={`full-${idx}`} className="star full-star">★</span>)}
        {halfStars ? <span key="half" className="star half-star">☆</span> : null}
        {Array(emptyStars).fill().map((_, idx) => <span key={`empty-${idx}`} className="star empty-star">☆</span>)}
      </>
    )
  }

  return (
    <section>
        <div className="gig-reviews">
        {fiveStarReviews.length > 0 ? (
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
                <div className="reviewer-carousell-img"><img src={review.by.imgUrl} alt={review.by.fullname} /></div>
                  <div className="reviewer-carousell-name">{review.by.fullname}</div>
                  <div className="reviewer-carousell-loc">{loc}</div>
                
                <div className="review-carousell-rate">{renderStars(review.rate)}</div>
                <div className="review-carousell-txt">{review.txt}</div>
              </div>
            ))}
          </Carousel>
        ) : (
          <p>No reviews with 5-star rating found</p>
        )}

        <h3>All Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="review">
              <div className="reviewer-img"><img src={review.by.imgUrl} alt={review.by.fullname} /></div>
              <div className='name-and-loc'>
                <div className="reviewer-name">{review.by.fullname}</div>
                <div className="reviewer-loc">{loc}</div>
              </div>
              <div className="review-rate">{renderStars(review.rate)}</div>
              <div className="review-txt">{review.txt}</div>
            </div>
          ))
        ) : (
          <p>No reviews found</p>
        )}
      </div>
    </section>
  )
}
