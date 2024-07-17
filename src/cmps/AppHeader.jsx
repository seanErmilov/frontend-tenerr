import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'

export function AppHeader() {
	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()

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
		<header className="app-header full">
			<nav>
				<div className="logo">
					<Link className="link" to="/">
						<span className="text">Tenner</span>
					</Link>
					<span className="dot">.</span>
				</div>

				<NavLink to="about">About</NavLink>
				<NavLink to="gig">Gigs</NavLink>
				<NavLink to="chat">Chat</NavLink>
				<NavLink to="review">Review</NavLink>

				{user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

				{!user &&
					<>
						<NavLink to="about">become seller</NavLink>
						<NavLink to="signIn" className="login-link">
							<button>sign In</button>
						</NavLink>
						<NavLink to="login" className="login-link">
							<button>join</button>
						</NavLink>
					</>
				}
				{user && (
					<div className="user-info">
						<Link to={`user/${user._id}`}>
							{/* {user.imgUrl && <img src={user.imgUrl} />} */}
							{user.fullname}
						</Link>
						{/* <span className="score">{user.score?.toLocaleString()}</span> */}
						<button onClick={onLogout}>logout</button>
					</div>
				)}
			</nav>
		</header>
	)
}
