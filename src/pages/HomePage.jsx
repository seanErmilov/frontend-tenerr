// react tools
import { useSelector, useDispatch } from 'react-redux'

// cmp
import { GigFilter } from '../cmps/GigFilter'
import { SearchBar } from '../cmps/SearchBar'
import { FilterPrimeCategories } from '../cmps/FilterPrimeCategories'

// store - actions
import { setFilter } from '../store/actions/gig.actions'

// costumhooks
import { useWindowDimensions } from '../customHooks/windowRisze'

export function HomePage() {
    const windowDims = useWindowDimensions()
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

    function onSetFilter(filterBy) {
        setFilter(filterBy)
    }

    return (
        <main className="gig-homepage">

            {/* home page hero */}
            <div className={`hero pos-relative ${windowDims.width < 900 ? 'hero-backgroud-gradient' : ''}`}>
                {windowDims.width >= 900 &&
                    <>
                        <img className="jenny pos-absolute" src="src/assets/img/home-page-hero/jenny.png" alt="" />
                        <img className="jordan pos-absolute" src="src/assets/img/home-page-hero/jordan.png" alt="" />
                        <img className="verinica pos-absolute" src="src/assets/img/home-page-hero/verinica.png" alt="" />
                        <img className="brurya pos-absolute" src="src/assets/img/home-page-hero/brurya.png" alt="" />
                        <img className="collin pos-absolute" src="src/assets/img/home-page-hero/collin.png" alt="" />
                    </>
                }
                {/* Hero inner text */}
                <h1 className='hero-inner-text'>Find the right
                    <em className='freelance'>freelance </em>
                    <br />service, right away</h1>
                {/* Search Bar */}
                <SearchBar
                    trackInViewport={true} />

                {/* Company logos */}
                {windowDims.width >= 900 &&
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


            <FilterPrimeCategories filterBy={filterBy} setFilterBy={onSetFilter} />
            <GigFilter filterBy={filterBy} setFilterBy={onSetFilter} />

            {/* for search bar dev */}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            {/* <video className="c4Ic0RB" autoPlay="" controls="" poster="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/ef51b45f79342925d5268e0b2377eae8-1704717764992/thumbnail.png" preload="auto" crossOrigin="anonymous" role="video" width="100%" playsInline=""><source role="source" src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/e0f330e4c8d6e3bf843a3bd3164fa275-1706087048062/How%20Fiverr%20Works%20EN%20Subs%2016x9" type="video/mp4"/></video> */}


        </main>
    )
}