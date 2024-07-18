import { Link, NavLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { useEffect, useState } from 'react'

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
			
			<nav>
				<div className="pages">
					<div className="logo">
						<Link className="link" to="/">
							<span className="text">Tenner</span>
						</Link>
						<span className="dot">.</span>
					</div>

					<div className="nav-links">
						<NavLink className="nav-link" to="about">About</NavLink>
						<NavLink className="nav-link" to="gig">Gigs</NavLink>
						<NavLink className="nav-link" to="chat">Chat</NavLink>
						<NavLink className="nav-link" to="review">Review</NavLink>

						{user?.isAdmin && <NavLink className="nav-link" to="/admin">Admin</NavLink>}

						{!user && (
							<>
								<NavLink className="nav-link" to="about">Become Seller</NavLink>
								<NavLink className="nav-link login-link" to="signIn">
									<button>Sign In</button>
								</NavLink>
								<NavLink className="nav-link login-link" to="login">
									<button>Join</button>
								</NavLink>
							</>
						)}
						{user && (
							<div className="user-info">
								<Link to={`user/${user._id}`}>
									{user.fullname}
								</Link>
								<button onClick={onLogout}>Logout</button>
							</div>
						)}
					</div>
				</div>
				{(active || pathname !== "/") && (
					<>
						<div className="menu">
							<Link className="link menuLink" to="/">Graphics & Design</Link>
							<Link className="link menuLink" to="/">Video & Animation</Link>
							<Link className="link menuLink" to="/">Writing & Translation</Link>
							<Link className="link menuLink" to="/">AI Services</Link>
							<Link className="link menuLink" to="/">Digital Marketing</Link>
							<Link className="link menuLink" to="/">Music & Audio</Link>
							<Link className="link menuLink" to="/">Programming & Tech</Link>
							<Link className="link menuLink" to="/">Business</Link>
							<Link className="link menuLink" to="/">Lifestyle</Link>
						</div>
					</>
				)}
			</nav>
		</header>






	)
}
