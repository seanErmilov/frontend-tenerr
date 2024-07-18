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
					<Link className="link" to="/">
						<span className="text">Tenner</span>
					</Link>
					<span className="dot">.</span>
				</div>

				{/* Search bar */}
				<SearchBar
					trackInViewport={false}
				/>

				<div className="nav-links">
					<nav>
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
						</ul>
					</nav>

					{user?.isAdmin && <NavLink className="nav-link" to="/admin">Admin</NavLink>}

					{!user &&
						<ul className='join-bar'>
							{/* TODO LINK to ABOUT */}
							<li>
								<NavLink className="nav-link" to="about">Become Seller</NavLink>
							</li>

							{/* TODO LINK to ABOUT */}
							<li>
								<NavLink className="nav-link login-link" to="signIn">
									<button>Sign In</button>
								</NavLink>
							</li>

							{/* TODO LINK to ABOUT */}
							<li>
								<NavLink className="nav-link login-link" to="login">
									<button>Join</button>
								</NavLink>
							</li>
						</ul>
					}

					{user && (
						<div className="user-info">
							<Link to={`user/${user._id}`}>
								{user.fullname}
							</Link>
							<button onClick={onLogout}>Logout</button>
						</div>
					)}
				</div>
		</header>






	)
}
