// react tools
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useRef, useState } from 'react'

// services
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig'

// store- actions
import { logout } from '../store/actions/user.actions'
import { setFilter } from '../store/actions/gig.actions'

// cmps
import { SearchBar } from '../cmps/SearchBar'
import { MainNav } from '../cmps/MainNav.jsx'
import { FilterPrimeCategories } from '../cmps/FilterPrimeCategories'


// imgs
import tennerLogo from '../assets/img/logos/tenner-loggo.png' // Import the image
import arrow from '../assets/img/svg/explore-arrow.svg' // Import the image
import hamburger from '../assets/img/svg/hamburger.svg' // Import the image
import { SignupLoginModal } from './SignupLoginModal.jsx'
import { ProfileNav } from './profileNav.jsx'

export function AppHeader() {
	// hooks
	// system states
	const showCatBar = useSelector(storeState => storeState.systemModule.showCategoriesBar)
	const headerSticky = useSelector(storeState => storeState.systemModule.headerSticky)

	//gig states
	const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

	//oreder states
	const orders = useSelector((storeState) => storeState.orderModule.orders)

	console.log(orders)
	// use states
	const user = useSelector(storeState => storeState.userModule.user)

	const navigate = useNavigate()
	const mainNavRef = useRef()
	const profileNavRef = useRef()
	const [arrowTurnDeg, setarrowTurnDeg] = useState(0)
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)


	// functions
	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	function toggleExplore({ current }) {
		current.classList.toggle("hidden")
		setarrowTurnDeg(prev => (prev + 0.5) % 1)
	}

	function toggleProfileNav({ current }) {
		current.classList.toggle("hidden")
	}

	function onSetFilter(filterBy) {
		setFilter(filterBy)
	}

	return (
		<>
			<div className={`filler left ${headerSticky ? 'header-sticky' : ''}`}></div>
			<header className={`app-header grid-column ${headerSticky ? 'header-sticky' : ''}`}>
				{/* hamburger */}
				<div className="hamburger" >
					<img src={hamburger} alt="" />
				</div>

				{/* Logo */}
				<div className="logo grid-column">
					<Link className="link" to="/" onClick={() => setFilter(gigService.getDefaultFilter())}>
						<img src={tennerLogo} alt="" />
					</Link>
				</div>

				{/* Search bar */}
				<SearchBar
					trackInViewport={false}
				/>

				<nav >
					<ul className="nav-links grid-column">
						<li>
							<button className="header-btn-style grid-column pos-relative" onClick={() => toggleExplore(mainNavRef)}>
								Explore
								<img className='arrow' src={arrow} alt="" style={{ transform: `rotate(${arrowTurnDeg}turn)` }} />
								<MainNav
									mainNavRef={mainNavRef} />
							</button>
						</li>

						<li>
							<ul className='grid-column user-nav'>
								{!user &&
									<>
										<li>
											<NavLink className="header-link" to="about">Become a Seller</NavLink>
										</li>

										<li>
											<button className='hheader-link sign-in-l÷ink' onClick={handleOpen}>Sign In</button>
										</li>

										<li>
											<button className='header-link header-btn-style login-link' onClick={handleOpen}>Join</button>
										</li>
									</>
								}

								{user && (
									<>
										<li>
											<button className="header-btn-style grid-column pos-relative" onClick={() => toggleProfileNav(profileNavRef)}>
												<img className='img-user' src={user.imgUrl} alt="" />
												<ProfileNav
													profileNavRef={profileNavRef} onLogout={onLogout} userId={user._id} />
											</button>
										</li>
									</>
								)}
							</ul>
						</li>
					</ul>
				</nav>
				<SignupLoginModal open={open} handleClose={handleClose} />
				<FilterPrimeCategories
					filterBy={filterBy}
					setFilterBy={onSetFilter}
					avoidHiding={!headerSticky}
				/>
			</header>
			<div className={`filler right ${headerSticky ? 'header-sticky' : ''}`}></div>
			{(showCatBar || !headerSticky) &&
				<div className={`full-liner full ${headerSticky ? 'header-sticky' : ''}`}></div>
			}
		</>
	)
}
