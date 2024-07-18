import { Link } from 'react-router-dom'

export function PrimeCategoriesSection() {


    return (
        <div className="prime-categories-section">
            <ul>
                {/* Graphics & Design */}
                <li>
                    <Link className="link menuLink" to="/">Graphics & Design</Link>
                </li>

                {/* Video & Animation */}
                <li>
                    <Link className="link menuLink" to="/">Video & Animation</Link>
                </li>

                {/* Writing & Translation */}
                <li>
                    <Link className="link menuLink" to="/">Writing & Translation</Link>
                </li>

                {/* AI Services */}
                <li>
                    <Link className="link menuLink" to="/">AI Services</Link>

                </li>

                {/* Digital Marketing */}
                <li>
                    <Link className="link menuLink" to="/">Digital Marketing</Link>

                </li>

                {/* Music & Audio */}
                <li>
                    <Link className="link menuLink" to="/">Music & Audio</Link>
                </li>

                {/* Programming & Tech */}
                <li>
                    <Link className="link menuLink" to="/">Programming & Tech</Link>
                </li>

                {/* Business */}

                <li>
                    <Link className="link menuLink" to="/">Business</Link>
                </li>

                {/* Lifestyle */}
                <li>
                    <Link className="link menuLink" to="/">Lifestyle</Link>
                </li>
            </ul>
        </div >
    )
}