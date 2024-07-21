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
import { GigPageReviews } from '../cmps/GigPageReviews'
import { ReviewFilter } from '../cmps/ReviewFilter'
import { ComparePackages } from '../cmps/ComparePackages'

export function GigDetails() {
  const [gig, setGig] = useState(null);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const { gigId } = useParams();

  useEffect(() => {
    loadGig(gigId);
  }, [gigId]);

  async function loadGig(gigId) {
    const fetchedGig = await gigService.getById(gigId);
    setGig(fetchedGig)
    setFilteredReviews(fetchedGig.reviews)
  }

  const handleFilterChange = (filterText) => {
    if (gig) {
      const newFilteredReviews = gig.reviews.filter(review =>
        review.txt.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredReviews(newFilteredReviews);
    }
  }
  
  if (!gig) return null;


  return (
    <section className="gig-details">
      <div className='gig-overview'>
        <h1 className="text-display">{gig.title}</h1>
        <MiniuserGig user={gig.owner} />
        <div className="gig-carousel"><CarouselImg imgUrls={gig.imgUrls} /></div>
        <SidebarPrice price={gig.price} avgResponseTime={gig.avgResponseTime} onChange={() => { }} />

        <AboutGig description={gig.description} />
        <div className="gig-reviewList">
          <ReviewList reviews={gig.reviews} loc={gig.loc} />
        </div>
        <AboutUserGig user={gig.owner} loc={gig.loc} />
        <GigPageReviews reviews={gig.reviews} />
        <ReviewFilter  reviews={filteredReviews}  />
        <ComparePackages price={gig.price} avgResponseTime={gig.avgResponseTime} />
      </div>
    </section>
  )
}