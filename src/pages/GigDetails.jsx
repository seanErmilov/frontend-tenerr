import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CarouselImg } from '../cmps/CarouselImg'
import { SidebarPrice } from '../cmps/SidebarPrice'
import { gigService } from '../services/gig'
import { ReviewList } from '../cmps/ReviewList'
import { MiniuserGig } from '../cmps/MiniUserGig'
import { AboutGig } from '../cmps/AboutGig'
import { AboutUserGig } from '../cmps/AbuotUserGig'
import { GigPageReviews } from '../cmps/GigPageReviews'
import { ReviewFilter } from '../cmps/ReviewFilter'
import { ComparePackages } from '../cmps/ComparePackages'
import { ReviewCarousel } from '../cmps/ReviewCarousel'
import { setOrderToStore } from '../store/actions/order.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { orderService } from '../services/order'


const renderStars = (rate) => {
  const fullStars = Math.floor(rate)
  const halfStars = rate % 1 !== 0 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStars

  return (
    <div className="stars-container">
      {Array(fullStars).fill().map((_, idx) => <span key={`full-${idx}`} className="star full-star">★</span>)}
      {halfStars ? <span key="half" className="star half-star">☆</span> : null}
      {Array(emptyStars).fill().map((_, idx) => <span key={`empty-${idx}`} className="star empty-star">☆</span>)}
      <span style={{ marginLeft: '6px' }}>{rate}</span>
    </div>
  )
}

export function GigDetails() {
  const [gig, setGig] = useState(null)
  const [filteredReviews, setFilteredReviews] = useState([])
  const { gigId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadGig(gigId)
  }, [gigId])

  async function loadGig(gigId) {
    const fetchedGig = await gigService.getById(gigId)
    setGig(fetchedGig)
    setFilteredReviews(fetchedGig.reviews)
  }

  function handelcheckout() {
    const order = orderService.getOrder(gig)
    setOrderToStore(order)
      .then(() => {
        // showSuccessMsg('Order saved successfully')
        navigate(`/checkout/${gig._id}`)
      })
      .catch(err => {
        showErrorMsg('Cannot save gig')
        console.log('err :', err)
      })

  }

  if (!gig) return null

  return (
    <section className="gig-details">
      <div className='gig-overview'>
        <h1 className="text-display">{gig.title}</h1>
        <MiniuserGig user={gig.owner} />
        <div className="gig-carousel"><CarouselImg imgUrls={gig.imgUrls} /></div>
        <SidebarPrice handelcheckout={handelcheckout} price={gig.price} avgResponseTime={gig.avgResponseTime} onChange={() => { }} />
        <ReviewCarousel reviews={gig.reviews} loc={gig.loc} renderStars={renderStars} />
        <AboutGig description={gig.description} />
        <AboutUserGig user={gig.owner} loc={gig.loc} />
        <ComparePackages price={gig.price} avgResponseTime={gig.avgResponseTime} />
        <GigPageReviews reviews={gig.reviews} />
        <ReviewFilter reviews={filteredReviews} />
        <div className="gig-reviewList"><ReviewList reviews={gig.reviews} loc={gig.loc} /></div>
      </div>
    </section>
  )
}
