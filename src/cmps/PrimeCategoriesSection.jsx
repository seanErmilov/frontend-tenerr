import { Link } from 'react-router-dom'

export function PrimeCategoriesSection({ filterBy, setFilterBy }) {

    return (
        <div className="prime-categories-section">
            <ul className='grid-column'>
                {/* Graphics & Design */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'graphics'] })} className="link menuLink" to="/gig">
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.3272c08.svg" alt="graphics_design" loading="lazy" />
                        </div>
                        <p>Graphics & DesignF</p>
                    </Link>
                </li>

                {/* Video & Animation */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'video'] })} className="link menuLink" to="/gig"><p>Video & Animation</p>
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation.21fb1d6.svg" alt="video_animation" loading="lazy" />
                        </div>
                    </Link>
                </li>

                {/* Writing & Translation */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'writing'] })} className="link menuLink" to="/gig"><p>Writing & Translation</p>
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation.dc66eb8.svg" alt="writing_translation" loading="lazy" />
                        </div>
                    </Link>
                </li>

                {/* AI Services */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'ai'] })} className="link menuLink" to="/gig"><p>AI Services</p>
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/ai-services.40511da.svg" alt="ai_services" loading="lazy" />
                        </div>
                    </Link>

                </li>

                {/* Digital Marketing */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'digital'] })} className="link menuLink" to="/gig"><p>Digital Marketing</p>
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/digital-marketing.85e8846.svg" alt="digital_marketing" loading="lazy" />
                        </div>
                    </Link>

                </li>

                {/* Music & Audio */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'music'] })} className="link menuLink" to="/gig"><p>Music & Audio</p>
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio.6a411f2.svg" alt="music_audio" loading="lazy" />
                        </div>
                    </Link>
                </li>

                {/* Programming & Tech */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'programming'] })} className="link menuLink" to="/gig"><p>Programming & Tech</p>
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/programming-tech.49dbf0d.svg" alt="programming_tech" loading="lazy" />
                        </div>
                    </Link>
                </li>

                {/* Business */}

                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'business'] })} className="link menuLink" to="/gig"><p>Business</p>
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business.772c3c9.svg" alt="business" loading="lazy" />
                        </div>
                    </Link>
                </li>

                {/* Lifestyle */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'lifestyle'] })} className="link menuLink" to="/gig"><p>Lifestyl</p>
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/consulting.93989a4.svg" alt="consulting" loading="lazy" />
                        </div>
                    </Link>
                </li>
            </ul>
        </div >
    )
}