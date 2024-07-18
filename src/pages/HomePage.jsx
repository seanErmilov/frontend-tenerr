

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadGigs, addGig, updateGig, removeGig, addGigMsg } from '../store/actions/gig.actions'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig'
import { userService } from '../services/user'

import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'
import { CarouselImg } from '../cmps/CarouselImg'

export function HomePage() {
    const [filterBy, setFilterBy] = useState(gigService.getDefaultFilter())



    return (
        <main className="gig-index">
            <GigFilter filterBy={filterBy} setFilterBy={setFilterBy} />
        </main>
    )
}