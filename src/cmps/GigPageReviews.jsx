
export function GigPageReviews({ reviews }) {
    const totalReviews = reviews.length
    const avgRating = (reviews.reduce((sum, review) => sum + review.rate, 0) / totalReviews).toFixed(1)
    const starCounts = [1, 2, 3, 4, 5].map(star => reviews.filter(review => review.rate === star).length)

    const renderStars = (rate) => {
        const fullStars = Math.floor(rate)
        const halfStars = rate % 1 !== 0 ? 1 : 0
        const emptyStars = 5 - fullStars - halfStars;

        return (
            <div className="stars-container">
                {Array(fullStars).fill().map((_, idx) => (
                    <span key={`full-${idx}`} className="star full-star">★</span>
                ))}
                {halfStars ? <span key="half" className="star half-star">☆</span> : null}
                {Array(emptyStars).fill().map((_, idx) => (
                    <span key={`empty-${idx}`} className="star empty-star">☆</span>
                ))}
                <span style={{ marginLeft: '6px' }}>{rate}</span>
            </div>
        )
    }

    return (
        <section className="gig-page-reviews">
            <div className="reviews-summary">
                <h2>Reviews</h2>
                <div className="average-rating">
                    <div className="total-reviews">{totalReviews.toLocaleString()} reviews for this Gig</div>
                    {renderStars(avgRating)}</div>
            </div>
            <div className="brekdown">
                <div className="rating-breakdown">
                    <ul>
                        {starCounts.map((count, idx) => (
                            <li key={idx}>
                                {renderStars(5 - idx)} ({count})
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="detailed-breakdown">
                    <ul>
                        <li>Seller communication level: {avgRating}</li>
                        <li>Recommend to a friend: {avgRating}</li>
                        <li>Service as described: {avgRating}</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
