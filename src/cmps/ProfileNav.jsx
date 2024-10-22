import { NavLink } from 'react-router-dom'
export function ProfileNav({ profileNavRef, onLogout, userId }) {
    return (
        <ul className='main-nav pos-absolute profile-nav' ref={profileNavRef}>
            <li>
                <NavLink className="main-nav-link" to="profile">Profile</NavLink>
            </li>
            <li>
                <NavLink className="main-nav-link" to={`user/Dashboard/${userId}`}>Dashboard</NavLink>
            </li>
            <li>
                <NavLink className="main-nav-link" to="inbox">Chat</NavLink>
            </li>
            <li>
                <span className="main-nav-link" onClick={onLogout}>logout</span>
            </li>
        </ul>
    )
}