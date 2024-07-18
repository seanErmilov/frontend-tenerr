// import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'

import { CarouselImg } from '../cmps/CarouselImg'

export function GigDetails() {

  const { gigId } = useParams()
  // const gig = useSelector(storeState => storeState.gigModule.gig)
  // console.log(gig)

  // useEffect(() => {
  //   loadGig(gigId)
  // }, [gigId])
  const gig =
  {
    title: 'I will design your logo',
    price: 12.16,
    owner: {
      _id: 'u101',
      fullname: 'luna',
      imgUrl: 'data:image/jpeg;base64,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',
      level: 'basic',
      rate: 4,
    },
    daysToMake: 3,
    description: 'Make unique logo...',
    avgResponseTime: 1,
    loc: 'Ghana',
    imgUrls: ['/img/img1.jpg'],
    tags: ['Arts And Crafts', 'Logo Design'],
    likedByUsers: ['mini-user'],
    reviews: [
      {
        id: 'r101',
        txt: 'Did an amazing work',
        rate: 2,
        by: {
          _id: 'u102',
          fullname: 'mansor',
          loc: 'pacistan',
          imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTawW5vJVMOBUwlVWI-S1E_kwrNzilD1F-JeA&s',
        },
      },
    ],
  }
  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    const halfStars = rate % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {Array(fullStars).fill(<span className="star full-star">★</span>)}
        {halfStars ? <span className="star half-star">☆</span> : null}
        {Array(emptyStars).fill(<span className="star empty-star">☆</span>)}
      </>
    );
  }
  return (
    <section className="gig-details">
      {/* <pre>{JSON.stringify(gig)}</pre> */}

      <div className='gig-overview'>
        <h1 className="text-display">{gig.title} </h1>
        <div className="gig-owner-details">
          <div className="gig-owner-img"><img src={gig.owner.imgUrl} alt={gig.owner.fullname} /></div>
          <div className="gig-owner-name">{gig.owner.fullname}</div>
          <div className="gig-owner-level">{gig.owner.level}</div>
          <div className="gig-owner-rate">{'★' + gig.owner.rate}</div>
          <div className="gig-owner-loc">{gig.loc}</div>
        </div>
        <div className="gig-carousel"><CarouselImg imgUrls={gig.imgUrls} /></div>
        <h2>About this gig</h2>

        <div className="gig-description">{gig.description}</div>
        <div className="gig-reviews">
          <h3>Reviews</h3>
          {gig.reviews.map(review => (
            <div key={review.id} className="review">
              <div className="reviewer-img"><img src={review.by.imgUrl} alt={review.by.fullname} /></div>
              <div className='name-and-loc'>
                <div className="reviewer-name">{review.by.fullname}</div>
                <div className="reviewer-loc">{review.by.loc}</div>
              </div>
              <div className="review-rate">{renderStars(review.rate)}{review.rate}</div>
              <div className="review-txt">{review.txt}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}