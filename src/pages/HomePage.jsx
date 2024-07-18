// react tools
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

// cmp
import { GigFilter } from '../cmps/GigFilter'

// store - actions
import { loadGigs, addGig, updateGig, removeGig, addGigMsg } from '../store/actions/gig.actions'

// services
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig'
import { userService } from '../services/user'

//hooks
import { useIntersectionObserver } from '../customHooks/useIntersectionObserver'


export function HomePage() {
    const [filterBy, setFilterBy] = useState(gigService.getDefaultFilter())

    // for determemning when component is out of  viewport
    const ref = useRef();
    const isVisible = useIntersectionObserver(ref, { threshold: 0.1 });

    useEffect(() => {
        if (!isVisible) {
            console.log('Component is out of the viewport');
        } else {
            console.log('Component is in the viewport');
        }
    }, [isVisible]);

    return (
        <main className="gig-index">
            <GigFilter filterBy={filterBy} setFilterBy={setFilterBy} />
        </main>
    )
}