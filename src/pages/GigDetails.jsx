import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { CarouselImg } from '../cmps/CarouselImg'
import { useState } from 'react'
import { SidebarPrice } from '../cmps/SidebarPrice'
import { gigService } from '../services/gig'
import { ReviewList } from '../cmps/ReviewList'
import { MiniuserGig } from '../cmps/MiniUserGig'
import { AboutGig } from '../cmps/AboutGig'
import { AboutUserGig } from '../cmps/AbuotUserGig'

export function GigDetails() {
  const [expanded, setExpanded] = useState(false)
  const [gig, setGig] = useState(null)

  const { gigId } = useParams()

  useEffect(() => {
    loadGig(gigId)
  }, [gigId])

  async function loadGig(gigId)
  {
    setGig(await gigService.getById(gigId))
  }
  if (!gig) return

    return (
      <section className="gig-details">
      <div className='gig-overview'>
        <h1 className="text-display">{gig.title}</h1>
        <MiniuserGig user={gig.owner} />
        <div className="gig-carousel">
          <CarouselImg imgUrls={gig.imgUrls} />
        </div>
        <SidebarPrice price={gig.price} avgResponseTime={gig.avgResponseTime} onChange={() => {}} />
        <AboutGig description={gig.description} />
        <div className="gig-reviewList">
          <ReviewList reviews={gig.reviews} loc={gig.loc} />
        </div>
        <AboutUserGig user={gig.owner} />
      </div>
    </section>
    )
}