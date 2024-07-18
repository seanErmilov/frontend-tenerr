import { Link } from 'react-router-dom'

export function PrimeCategoriesSection({ filterBy, setFilterBy }) {

    return (
        <div className="prime-categories-section">
            <ul>
                {/* Graphics & Design */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'graphics'] })} className="link menuLink" to="/gig">Graphics & Design</Link>
                </li>

                {/* Video & Animation */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'video'] })} className="link menuLink" to="/gig">Video & Animation</Link>
                </li>

                {/* Writing & Translation */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'writing'] })} className="link menuLink" to="/gig">Writing & Translation</Link>
                </li>

                {/* AI Services */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'ai'] })} className="link menuLink" to="/gig">AI Services</Link>

                </li>

                {/* Digital Marketing */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'digital'] })} className="link menuLink" to="/gig">Digital Marketing</Link>

                </li>

                {/* Music & Audio */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'music'] })} className="link menuLink" to="/gig">Music & Audio</Link>
                </li>

                {/* Programming & Tech */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'programming'] })} className="link menuLink" to="/gig">Programming & Tech</Link>
                </li>

                {/* Business */}

                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'business'] })} className="link menuLink" to="/gig">Business</Link>
                </li>

                {/* Lifestyle */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'lifestyle'] })} className="link menuLink" to="/gig">Lifestyle</Link>
                </li>
            </ul>
        </div >
    )
}