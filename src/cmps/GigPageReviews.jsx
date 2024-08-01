
export function GigPageReviews({ reviews }) {
    const reviewsLen = reviews.length
    const avgRating = (reviews.reduce((sum, review) => sum + review.rate, 0) / reviewsLen).toFixed(1)
    const starCounts = [5, 4, 3, 2, 1].map(star => reviews.filter(review => review.rate === star).length)

    function renderStars(rate) {
        return (
            <div className="stars-container">
                <span>{rate}<p>stars</p></span>
            </div>
        )
    }

    return (
        <section className="gig-page-reviews">
            <div className="reviews-summary">
                <h2>Reviews</h2>
                <div className="total-reviews">{reviewsLen.toLocaleString()} reviews for this Gig</div>
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
