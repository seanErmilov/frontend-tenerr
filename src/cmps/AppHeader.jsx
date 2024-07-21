// react tools
import { Link, NavLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'

// services
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

// store- actions
import { logout } from '../store/actions/user.actions'

// cmps
import { SearchBar } from '../cmps/SearchBar'
import { setFilter } from '../store/actions/gig.actions'
import { gigService } from '../services/gig'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const active = true
	const pathName = '/'

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<header className="app-header">
			{/* Logo */}
			<div className="logo">
				<Link className="link" to="/" onClick={() => setFilter(gigService.getDefaultFilter())}>
					<span className="text">Tenner</span>
				</Link>
				<span className="dot">.</span>
			</div>

			{/* Search bar */}
			<SearchBar
				trackInViewport={false}
			/>

			<nav className="nav-links">
				<ul className='main-nav'>
					<li>
						<NavLink className="nav-link" to="about">About</NavLink>
					</li>
					<li>
						<NavLink className="nav-link" to="gig">Gigs</NavLink>
					</li>
					<li>
						<NavLink className="nav-link" to="chat">Chat</NavLink>
					</li>
					<li>
						<NavLink className="nav-link" to="review">Review</NavLink>
					</li>
					{!user &&
						<>
							<li>
								<NavLink className="nav-link" to="about">Become a Seller</NavLink>
							</li>

							<li>
								<NavLink className="nav-link login-link" to="signIn">
									<button>Sign In</button>
								</NavLink>
							</li>

							<li>
								<NavLink className="nav-link login-link" to="login">
									<button>Join</button>
								</NavLink>
							</li>
							{user && (
								<li>
									<Link to={`user/${user._id}`}>
										{user.fullname}
									</Link>
									<button onClick={onLogout}>Logout</button>
								</li>
							)}
						</>
					}

				</ul>
			</nav>
		</header>






	)
}
