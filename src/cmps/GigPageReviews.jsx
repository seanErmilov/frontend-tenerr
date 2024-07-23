
export function GigPageReviews({ reviews }) {
    const reviewsLen = reviews.length
    const avgRating = (reviews.reduce((sum, review) => sum + review.rate, 0) / reviewsLen).toFixed(1)
    const starCounts = [1, 2, 3, 4, 5].map(star => reviews.filter(review => review.rate === star).length)

    function renderStars(rate) {
        const fullStars = Math.floor(rate)
        const halfStars = rate % 1 !== 0 ? 1 : 0
        const emptyStars = 5 - fullStars - halfStars

        return (
            <div className="stars-container">
                {/* {Array(fullStars).fill().map((_, idx) => (
                    <span key={`full-${idx}`} className="star full-star">★</span>
                ))}
                {halfStars ? <span key="half" className="star half-star">☆</span> : null}
                {Array(emptyStars).fill().map((_, idx) => (
                    <span key={`empty-${idx}`} className="star empty-star">☆</span>
                ))} */}
                <span>{rate}<p>stars</p></span>
            </div>
        )
    }

    return (
        <section className="gig-page-reviews">
            <div className="reviews-summary">
                <h2>Reviews</h2>
                <div className="total-reviews">{reviewsLen.toLocaleString()} reviews for this Gig</div>
                {/* <div className="average-rating">
                    {renderStars(avgRating)}
                </div> */}
            </div>
            <div className="breakdown">
                <div className="rating-breakdown">
                    <ul>
                        {starCounts.map((count, idx) => (
                            <li key={idx}>
                                <div className="rating-row">
                                    {renderStars(5 - idx)}
                                    <div className="progress-bar-container">
                                        <div
                                            className="progress-bar"
                                            style={{ width: `${(count / reviewsLen) * 100}%` }}
                                        />
                                    </div>
                                    <span>({count})</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="detailed-breakdown">
                    <p>Rating Breakdown</p>
                    <ul>
                        <li>Seller communication level <span>{'★' + avgRating}</span> </li>
                        <li>Recommend to a friend <span>{'★' + avgRating}</span></li>
                        <li>Service as described <span>{'★' + avgRating}</span></li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
