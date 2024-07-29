import { NavLink } from 'react-router-dom'
export function MainNav({ mainNavRef }) {
    return (
        <ul className='main-nav pos-absolute hidden' ref={mainNavRef}>
            {/* <li>
                <button className='hheader-link sign-in-l÷ink' onClick={handleOpen}>Sign In</button>
            </li> */}

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
    )
}