// react tools
import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// cmp
import { GigFilter } from '../cmps/GigFilter'
import { SearchBar } from '../cmps/SearchBar'
import { PrimeCategoriesSection } from '../cmps/PrimeCategoriesSection'

// store - actions
import { loadGigs, addGig, updateGig, removeGig, addGigMsg, setFilter } from '../store/actions/gig.actions'

// services
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig'
import { userService } from '../services/user'

// costumhooks
import { useWindowDimensions } from '../customHooks/windowRisze'


export function HomePage() {
    const windowSide = useWindowDimensions()

    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

    function onSetFilter(filterBy) {
        setFilter(filterBy)
    }



    return (
        <main className="gig-homepage">

            {/* home page hero */}
            <div className={`hero pos-relative ${windowSide.width < 900 ? 'hero-backgroud-gradient' : ''}`}>
                {windowSide.width >= 900 &&
                    <>
                        <img className="jenny pos-absolute" src="src/assets/img/home-page-hero/jenny.png" alt="" />
                        <img className="jordan pos-absolute" src="src/assets/img/home-page-hero/jordan.png" alt="" />
                        <img className="verinica pos-absolute" src="src/assets/img/home-page-hero/verinica.png" alt="" />
                        <img className="brurya pos-absolute" src="src/assets/img/home-page-hero/brurya.png" alt="" />
                        <img className="collin pos-absolute" src="src/assets/img/home-page-hero/collin.png" alt="" />
                    </>
                }
                {/* Hero inner text */}
                <h1 className='hero-inner-text'>"Find the right
                    <em className='freelance'>freelance</em>
                    <br />
                    service, right away</h1>

                {/* Search Bar */}
                <SearchBar
                    trackInViewport={true} />

                {/* Company logos */}
                {windowSide.width >= 900 &&
                    <div className='company-logos'>

                        <ul className='company-logos grid-column'>
                            <li><span>Trusted by:</span></li>
                            <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.398bc1c.svg" alt="meta" /></li>
                            <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.129f8ec.svg" alt="Google" /></li>
                            <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.e1b0070.svg" alt="NETFLIX" /></li>
                            <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pg.a47f1ab.svg" alt="P&amp;G" /></li>
                            <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.0520267.svg" alt="PayPal" /></li>
                            <li><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/payoneer.67915a0.svg" alt="Payoneer" /></li>
                        </ul>
                    </div>
                }
            </div>

            <PrimeCategoriesSection filterBy={filterBy} setFilterBy={onSetFilter} />
            <GigFilter filterBy={filterBy} setFilterBy={onSetFilter} />
        </main>
    )
}