import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CarouselImg } from '../cmps/CarouselImg'
import { useState } from 'react'
import { SidebarPrice } from '../cmps/SidebarPrice'
import { gigService } from '../services/gig'

export function GigDetails() {
  const [expanded, setExpanded] = useState(false)
  const [gig, setGig] = useState(null)

  const { gigId } = useParams()

  useEffect(() => {
    loadGig(gigId)
  }, [gigId])

  async function loadGig(gigId) {
    setGig(await gigService.getById(gigId))
  }



  //  const gig = {
  //   title: 'I will design your logo',
  //   price: 12.16,
  //   owner: {
  //     _id: 'u101',
  //     fullname: 'Luna',
  //     imgUrl: 'data:image/jpeg;base64,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',
  //     level: 'basic',
  //     rate: 4,
  //   },
  //   daysToMake: 3,
  //   description: 'A visionary logo and branding expert, here to craft your logo that leaves a lasting impression. With 9 years of experience under my belt, I bring a wealth of expertise to every project I undertake with a unique blend of creativity, precision & client-centric focus. Having successfully delivered over 130,000 branding orders, I stand as a testament to my unwavering commitment to excellence and client satisfaction.',
  //   avgResponseTime: 1,
  //   loc: 'Ghana',
  //   imgUrls: ['/img/img1.jpg'],
  //   tags: ['Arts And Crafts', 'Logo Design'],
  //   likedByUsers: ['mini-user'],
  //   reviews: [
  //     {
  //       id: 'r101',
  //       txt: 'Did an amazing work',
  //       rate: 2,
  //       by: {
  //         _id: 'u102',
  //         fullname: 'Mansor',
  //         loc: 'Pakistan',
  //         imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTawW5vJVMOBUwlVWI-S1E_kwrNzilD1F-JeA&s',
  //       },
  //     },
  //     {
  //       id: 'r102',
  //       txt: 'Great response, highly recommend!',
  //       rate: 4,
  //       by: {
  //         _id: 'u103',
  //         fullname: 'miri',
  //         loc: 'Israel',
  //         imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9BjoBlvlTrMGWSnO9bkf4zmEh06uUYTu2aQ&s',
  //       },
  //     },
  //     {
  //       id: 'r103',
  //       txt: 'Kind and professional service, very satisfied',
  //       rate: 5,
  //       by: {
  //         _id: 'u104',
  //         fullname: 'Danny',
  //         loc: 'Israel',
  //         imgUrl: 'data:image/jpeg;base64,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',
  //       },
  //     },
  //     {
  //       id: 'r104',
  //       txt: 'Worked very well',
  //       rate: 3,
  //       by: {
  //         _id: 'u105',
  //         fullname: 'Orit',
  //         loc: 'Israel',
  //         imgUrl: 'data:image/jpeg;base64,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',
  //       },
  //     },

  //   ],
  // }


  const toggleExpandDescription = () => {
    setExpanded(!expanded)
  }
  const renderDescription = () => {
    const words = gig.description.split(' ')
    const wordLimit = 10

    if (words.length > wordLimit && !expanded) {
      const truncatedText = words.slice(0, wordLimit).join(' ')
      return (
        <>
          {truncatedText}... <span className="read-more" onClick={toggleExpandDescription}>Read More</span>
        </>
      )
    } else {
      return (
        <>
          {gig.description} {expanded && <span className="read-more" onClick={toggleExpandDescription}>Read Less</span>}
        </>
      )
    }
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
  if (!gig) return

  return (
    <section className="gig-details">
      {/* <pre>{JSON.stringify(gig)}</pre> */}

      <div className='gig-overview'>
        <h1 className="text-display">{gig.title} </h1>
        <div className="gig-owner-details">
          <div className="gig-owner-img"><img src={gig.owner.imgUrl} alt={gig.owner.fullname} /></div>
          <div className="gig-owner-name">{gig.owner.fullname}</div> <span>|</span>
          <div className="gig-owner-level">{gig.owner.level}</div>
          <div className="gig-owner-rate">{'★' + gig.owner.rate}</div>
          {/* <div className="gig-owner-loc">{gig.loc}</div> */}
        </div>
        <div className="gig-carousel"><CarouselImg imgUrls={gig.imgUrls} /></div>
        <div className="gig-SidebarPrice"><SidebarPrice price={gig.price} /></div>
        <h2>About this gig</h2>
        <div className="gig-description">{renderDescription()}</div>

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