import { NavLink } from 'react-router-dom'
export function ProfileNav({ profileNavRef, onLogout }) {
    return (
        <ul className='main-nav pos-absolute hidden' ref={profileNavRef}>
            <li>
                <NavLink className="main-nav-link" to="gig/edit">Profile</NavLink>
            </li>
            <li>
                <NavLink className="main-nav-link" to="Dashboard/">Dashboard</NavLink>
            </li>
            <li>
                <button className="main-nav-link" onClick={onLogout}>logout</button>
            </li>
        </ul>
    )
}