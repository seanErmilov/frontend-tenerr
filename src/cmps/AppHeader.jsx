// react tools
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useRef, useState, useEffect } from 'react'

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


	// use states
	const user = useSelector(storeState => storeState.userModule.user)

	const navigate = useNavigate()

	const mainNavRef = useRef()
	const orderListRef = useRef()
	const profileNavRef = useRef()

	const [arrowTurnDegExplore, setArrowTurnDegExplore] = useState(0)


	const [orderListVisible, setOrderListVisible] = useState(false)



	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)


	useEffect(() => {
		if (orderListRef.current && orderListVisible) orderListRef.current.focus()

	}, [orderListVisible])

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
		setArrowTurnDegExplore(prev => (prev + 0.5) % 1)
	}

	function toggleOrderList() {
		setOrderListVisible(prev => !prev)
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
							<button className="header-btn-style grid-column pos-relative explore" onClick={() => toggleExplore(mainNavRef)}>
								Explore
								<img className='arrow' src={arrow} alt="" style={{ transform: `rotate(${arrowTurnDegExplore}turn)` }} />
								<ul className='main-nav pos-absolute hidden' ref={mainNavRef}>

									{!user &&
										<li>
											<div className='hheader-link sign-in-l÷ink' onClick={handleOpen}>Sign In</div>
										</li>
									}

									<li>
										<NavLink className="header-link" to="about">Become a Seller</NavLink>
									</li>
									<li>
										<NavLink className="main-nav-link" to="gig/edit">Add gig</NavLink>
									</li>
									<li>
										<NavLink className="main-nav-link" to="gig">Gigs</NavLink>
									</li>
									<li>
										<NavLink className="main-nav-link" to="chat">Chat</NavLink>
									</li>
									<li>
										<NavLink className="main-nav-link" to="review">Review</NavLink>
									</li>
								</ul>
							</button>
						</li>

						<li>
							<ul className='grid-column user-nav'>
								{!user &&
									<>
										<li>
											<NavLink className="header-link become-a-seller" to="about">Become a Seller</NavLink>
										</li>

										<li>
											<button className='header-link sign-in-link' onClick={handleOpen}>Sign In</button>
										</li>

										<li>
											<button className='header-link header-btn-stle login-link' onClick={handleOpen}>Join</button>
										</li>
									</>
								}

								{user && (
									<>
										<li >
											<button className="grid-column pos-relative orders" onClick={toggleOrderList}>
												Orders
												{
													orders.length > 0 && orderListVisible &&
													<ul className='pos-absolute user-orders' ref={orderListRef} tabIndex="-1" onBlur={toggleOrderList}>
														{orders.map((order, idx) =>
															<li key={idx}>
																<Link to={`gig/${order.gig._id}`} title={order.gig.name}>
																	<img src={order.gig.imgUrl} alt="" />
																	<div>
																		<div className='status'>{order.status}</div>
																		<div className='by'>by: {order.seller.fullname}</div>
																	</div>
																</Link>
															</li>
														)}

													</ul>
												}

											</button>
										</li>
										<li>
											<button className="grid-column pos-relative user-btn" onClick={() => toggleProfileNav(profileNavRef)}>
												<img className='img-user' src={user.imgUrl} alt="" />
												<div className="online-status"></div>
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
