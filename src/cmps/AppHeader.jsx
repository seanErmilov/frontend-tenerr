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
import hamburger from '../assets/img/svg/hamburger.svg' // Impo
import { SignupLoginModal } from './SignupLoginModal.jsx'
import { ProfileNav } from './profileNav.jsx'


//socket ServiceWorkerRegistration
import { SOCKET_EVENT_ORDER_STATUS_UPDATE, socketService } from '../socket.service'

export function AppHeader() {
	// hooks
	// system states
	const showCatBar = useSelector(storeState => storeState.systemModule.showCategoriesBar)
	const headerSticky = useSelector(storeState => storeState.systemModule.headerSticky)

	//gig states
	const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

	//oreder states
	const orders = useSelector((storeState) => storeState.orderModule.orders)

	// user states
	const user = useSelector(storeState => storeState.userModule.user)

	const navigate = useNavigate()

	const mainNavRef = useRef()
	const orderListRef = useRef()
	const profileNavRef = useRef()


	// lists rendering states
	const [arrowTurnDegExplore, setArrowTurnDegExplore] = useState(0)
	const [orderListVisible, setOrderListVisible] = useState(false)
	const [exploreListVisible, setExploreListVisible] = useState(false)
	const [profileListVisible, setProfileListVisible] = useState(false)



	const [open, setOpen] = useState(false)
	const [signUp, setSignUp] = useState(false)

	function handleOpen() {
		return setOpen(true)
	}

	function handleClose() {
		return setOpen(false)
	}

	//use effects
	useEffect(() => {
		socketService.on(SOCKET_EVENT_ORDER_STATUS_UPDATE, order => {
			console.log('order :', 'text from header ok')
		})

		return () => {
			socketService.off(SOCKET_EVENT_ORDER_STATUS_UPDATE)
		}
	}, [])

	useEffect(() => {
		if (orderListRef.current && orderListVisible) orderListRef.current.focus()

	}, [orderListVisible])

	useEffect(() => {
		if (mainNavRef.current && exploreListVisible) mainNavRef.current.focus()

	}, [exploreListVisible])

	useEffect(() => {
		if (profileNavRef.current && profileListVisible) profileNavRef.current.focus()

	}, [profileListVisible])

	// 



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

	function toggleExplore() {
		setExploreListVisible(prev => !prev)
		setArrowTurnDegExplore(prev => (prev + 0.5) % 1)
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
							<button className="header-btn-style grid-column pos-relative explore" onClick={toggleExplore} data-preventchildblur="explore">
								Explore
								<img className='arrow' src={arrow} alt="" style={{ transform: `rotate(${arrowTurnDegExplore}turn)` }} />
								{exploreListVisible &&

									<HideOnBlur
										jsx={
											<ul className='main-nav pos-absolute' ref={mainNavRef} tabIndex="-1" >
												{!user &&
													<li>
														<div className='hheader-link sign-in-l÷ink'
															onClick={() => {
																handleOpen()
																setSignUp(true)
															}
															}>Sign In</div>
													</li>
												}
												<li>
													<NavLink className="header-link" to="seller/register">Become a Seller</NavLink>
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
											</ul>}

										setVisibility={setExploreListVisible}
										reference={mainNavRef}
										ignoreId={'explore'}
									/>
								}
							</button>
						</li>

						<li>
							<ul className='grid-column user-nav'>
								{!user &&
									<>
										<li>
											<NavLink className="header-link become-a-seller" to="seller/register">Become a Seller</NavLink>
										</li>

										<li>
											<button className='header-link sign-in-link'
												onClick={() => {
													handleOpen()
													setSignUp(true)
												}}>Sign In</button>
										</li>

										<li>
											<button className='header-link header-btn-stle login-link'
												onClick={() => {
													handleOpen()
													setSignUp(false)
												}}>Join</button>
										</li>
									</>
								}

								{user && (
									<>
										<li >
											<button className="grid-column pos-relative orders" onClick={() => setOrderListVisible(prev => !prev)} data-preventchildblur="user-orders">
												Orders
												{
													orders.length > 0 && orderListVisible &&
													<HideOnBlur
														jsx={<ul className='pos-absolute user-orders' ref={orderListRef} tabIndex="-1">
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
														</ul>}
														setVisibility={setOrderListVisible}
														reference={orderListRef}
														ignoreId={'user-orders'}
													/>
												}
											</button>
										</li>
										<li>
											<button className="grid-column pos-relative user-btn" onClick={() => setProfileListVisible(prev => !prev)} data-preventchildblur="user-profile">
												<img className='img-user' src={user.imgUrl} alt="" />
												<div className="online-status"></div>

												{profileListVisible &&
													<HideOnBlur
														jsx={< ProfileNav
															profileNavRef={profileNavRef} onLogout={onLogout} userId={user._id} />}

														setVisibility={setProfileListVisible}
														reference={profileNavRef}
														ignoreId={'user-profile'}
													/>

												}
											</button>
										</li>
									</>
								)}
							</ul>
						</li>
					</ul>
				</nav>
				<SignupLoginModal open={open} handleClose={handleClose} signUp={signUp} />
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


function HideOnBlur({ jsx, setVisibility, reference, ignoreId }) {
	useEffect(() => {
		const handleBlur = (event) => {
			if (event.relatedTarget && event.relatedTarget.dataset.preventchildblur === ignoreId) return
			setVisibility(false)
		}

		const el = reference.current
		el.addEventListener('blur', handleBlur, true)

		return () => {
			el.removeEventListener('blur', handleBlur, true)
		}
	}, [])

	return jsx
}