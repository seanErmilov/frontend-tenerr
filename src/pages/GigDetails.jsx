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
import { showErrorMsg } from '../services/event-bus.service'
import { orderService } from '../services/order'
import { CheckoutModal } from '../cmps/CheckoutModal'

import { DetailsCarousel } from '../cmps/DetailsCarousel'
import { SidebarOptions } from '../cmps/SidebarOptions'
import { Breadcrumbs } from '../cmps/Breadcrumbs'
import { Chat } from '../cmps/chat'

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
  const [isChatActive, setIsChatActive] = useState(false)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const navigate = useNavigate()

  useEffect(() => {
    loadGig(gigId)
  }, [gigId])

  async function loadGig(gigId) {
    const fetchedGig = await gigService.getById(gigId)
    setGig(fetchedGig)
    setFilteredReviews(fetchedGig.reviews)
  }

  function handelcheckout(price) {
    const order = orderService.getOrder(gig)
    setOrderToStore(order)
      .then(() => {
        // showSuccessMsg('Order saved successfully')
        navigate(`/checkout/${gig._id}/${price}`)
      })
      .catch(err => {
        showErrorMsg('Cannot save gig')
        console.log('err :', err)
      })

  }

  if (!gig) return null

  return (
    <section className="gig-details">
      {/* right side */}
      <div className='gig-details-side'>
        <SidebarOptions />
        <SidebarPrice handleOpen={handleOpen} handelcheckout={handelcheckout} price={gig.price} avgResponseTime={gig.daysToMake} onChange={() => { }} />
      </div>

      {/* left side */}
      <div className='gig-overview'>
        <Breadcrumbs />
        <h1 className="text-display">{gig.title}</h1>
        <MiniuserGig user={gig.owner} />
        <div className='carousel-container'>
          <DetailsCarousel images={gig.imgUrls} />
        </div>
        <SidebarPrice handleOpen={handleOpen} handelcheckout={handelcheckout} price={gig.price} avgResponseTime={gig.daysToMake} onChange={() => { }} />
        <div className='carousel-container'>
          <ReviewCarousel
            reviews={gig.reviews}
            loc={gig.loc}
            renderStars={renderStars} />
        </div>
        <AboutGig
          description={gig.description}
          name={gig.owner.fullname} />
        <AboutUserGig user={gig.owner} setIsChatActive={setIsChatActive} />
        <ComparePackages price={gig.price} avgResponseTime={gig.avgResponseTime} />
        <GigPageReviews reviews={gig.reviews} />
        <ReviewFilter reviews={filteredReviews} />
        <div className="gig-reviewList"><ReviewList reviews={gig.reviews} loc={gig.loc} /></div>
        <CheckoutModal open={open} handleClose={handleClose} />
      </div>

      {isChatActive && <Chat gigOwner={gig.owner} />}

    </section>
  )
}
