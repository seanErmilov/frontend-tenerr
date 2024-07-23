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

// imgs
import tennerLogo from '../assets/img/logos/tenner-loggo.png' // Import the image
import arrow from '../assets/img/svg/explore-arrow.svg' // Import the image
import hamburger from '../assets/img/svg/hamburger.svg' // Import the image

export function AppHeader() {
	// hooks
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const active = true
	const pathName = '/'
	const mainNavRef = useRef()
	const [arrowTurnDeg, setarrowTurnDeg] = useState(0)

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

	return (
		<header className="app-header grid-column">
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
										<NavLink className="header-link sign-in-link" to="signIn">Sign In</NavLink>
									</li>

									<li>
										<NavLink className="header-link header-btn-style login-link" to="login">Join</NavLink>
									</li>
								</>
							}

							{user && (
								<>
									<li>
										<Link to={`user/${user._id}`}>
											{user.fullname}
										</Link>
									</li>

									<li>
										<button onClick={onLogout}>Logout</button>
									</li>
								</>
							)}
						</ul>
					</li>
				</ul>
			</nav>
		</header>
	)
}
