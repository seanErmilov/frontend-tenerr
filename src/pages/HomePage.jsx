// react tools
import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'

// cmp
import { GigFilter } from '../cmps/GigFilter'
import { SearchBar } from '../cmps/SearchBar'
import {PrimeCategoriesSection} from '../cmps/PrimeCategoriesSection'

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

    return (
        <main className="gig-homepage">

            {/* Hero Picture */}
            <img src="src/assets/img/hero-xl-x1.webp" alt="" />

            {/* Hero inner text */}
            <h1 className='hero-inner-text'>Find the right
                <span className='bold'> freelance</span>
                <br />
                service, right away</h1>

            {/* Search Bar */}
            <SearchBar
            // handleChange={handleChange}
            // filterToEdit={filterBy} 
            />


            {/* Company logos */}
            <div className='company-logos'>
                <span>Trusted by:</span>
                <ul className='company-logos-img'>
                    <li><img src="src/assets/img/meta.svg" /></li>
                    <li><img src="src/assets/img/google.svg" /></li>
                    <li><img src="src/assets/img/netflix.svg" /></li>
                    <li><img src="src/assets/img/pg.svg" /></li>
                    <li><img src="src/assets/img/paypal.svg" /></li>
                    <li><img src="src/assets/img/payoneer.svg" alt="payonner" />sdsds</li>
                </ul>
            </div>
            

            <PrimeCategoriesSection />
            <GigFilter filterBy={filterBy} setFilterBy={setFilterBy} />
        </main>
    )
}