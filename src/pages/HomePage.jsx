// react tools
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'


// cmp
import { SearchBar } from '../cmps/SearchBar'
import { FilterPrimeCategories } from '../cmps/FilterPrimeCategories'
import { HomeVideo } from '../cmps/HomeVideo.jsx'
import { FreelanceTalent } from '../cmps/FreelanceTalent.jsx'

//img
import jenny from '../assets/img/home-page-hero/jenny.png'
import jordan from '../assets/img/home-page-hero/jordan.png'
import verinica from '../assets/img/home-page-hero/verinica.png'
import brurya from '../assets/img/home-page-hero/brurya.png'
import collin from '../assets/img/home-page-hero/collin.png'


// store - actions
import { setFilter } from '../store/actions/gig.actions'
import { HEADER_STICKY, SHOW_SEARCH_BAR } from '../store/reducers/system.reducer'

// costumhooks
import { useWindowDimensions } from '../customHooks/windowRisze'

export function HomePage() {
    const windowDims = useWindowDimensions()
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const dispatch = useDispatch()


    function onSetFilter(filterBy) {
        setFilter(filterBy)
    }

    useEffect(() => {
        const onMount = {
            type: HEADER_STICKY,
            headerSticky: true,
        }
        dispatch(onMount)

        return () => {
            const onDemount1 = {
                type: HEADER_STICKY,
                headerSticky: false,
            }

            const onDemount2 = {
                type: SHOW_SEARCH_BAR,
                showSearchBar: true,
            }
            dispatch(onDemount1)
            dispatch(onDemount2)
        }
    }, [])

    return (
        <main className="gig-homepage">

            {/* home page hero */}
            <div className='hero pos-relative'>
                {windowDims.width >= 900 &&
                    <>
                        <img className="jenny pos-absolute" src={jenny} alt="" />
                        <img className="jordan pos-absolute" src={jordan} alt="" />
                        <img className="verinica pos-absolute" src={verinica} alt="" />
                        <img className="brurya pos-absolute" src={brurya} alt="" />
                        <img className="collin pos-absolute" src={collin} alt="" />
                    </>
                }

                <div className='hero-center'>
                    {/* Hero inner text */}
                    <h1 className='hero-inner-text'>Find the right
                        <em className='freelance'>freelance </em>
                        <br />service, right away</h1>
                    {/* Search Bar */}
                    <SearchBar
                        trackInViewport={true} />
                </div>


                {/* Company logos */}
                <div className='company-logos pos-absolute'>
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
            </div>

            {/* filters  categories*/}
            <FilterPrimeCategories
                filterBy={filterBy}
                setFilterBy={onSetFilter}
                trackInViewport={true} />

            <FreelanceTalent />

            {/* video */}
            <HomeVideo />
        </main>
    )
}