import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { loadGig } from '../store/actions/gig.actions'

export function GigDetails() {

  const { gigId } = useParams()
  const gig = useSelector(storeState => storeState.gigModule.gig)
  console.log(gig)

  useEffect(() => {
    loadGig(gigId)
  }, [gigId])

  return (
    <section className="gig-details">
      <h2>About this gig</h2>
      <span>{gig}</span>

      <p>Hello!</p>

    </section>
  )
}