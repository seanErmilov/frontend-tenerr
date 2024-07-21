import { Link } from 'react-router-dom'
export function PrimeCategoriesSection({ filterBy, setFilterBy }) {


    return (
        <div className="prime-categories-section">
            <ul className='grid-column'>
                {/* Graphics & Design */}
                <li onClick={null}>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'graphics'] })} className="link menuLink" to="/gig">
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.3272c08.svg" alt="graphics_design" loading="lazy" />
                        </div>
                        <p>Graphics & Design</p>
                    </Link>
                </li>

                {/* Video & Animation */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'video'] })} className="link menuLink" to="/gig">
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation.21fb1d6.svg" alt="video_animation" loading="lazy" />
                        </div>
                        <p>Video & Animation</p>
                    </Link>
                </li>

                {/* Writing & Translation */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'writing'] })} className="link menuLink" to="/gig">
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation.dc66eb8.svg" alt="writing_translation" loading="lazy" />
                        </div>
                        <p>Writing & Translation</p>
                    </Link>
                </li>

                {/* AI Services */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'ai'] })} className="link menuLink" to="/gig">
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/ai-services.40511da.svg" alt="ai_services" loading="lazy" />
                        </div>
                        <p>AI Services</p>
                    </Link>

                </li>

                {/* Digital Marketing */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'digital'] })} className="link menuLink" to="/gig">
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/digital-marketing.85e8846.svg" alt="digital_marketing" loading="lazy" />
                        </div>
                        <p>Digital Marketing</p>
                    </Link>

                </li>

                {/* Music & Audio */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'music'] })} className="link menuLink" to="/gig">
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio.6a411f2.svg" alt="music_audio" loading="lazy" />
                        </div>
                        <p>Music & Audio</p>
                    </Link>
                </li>

                {/* Programming & Tech */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'programming'] })} className="link menuLink" to="/gig">
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/programming-tech.49dbf0d.svg" alt="programming_tech" loading="lazy" />
                        </div>
                        <p>Programming & Tech</p>
                    </Link>
                </li>

                {/* Business */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'business'] })} className="link menuLink" to="/gig">
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business.772c3c9.svg" alt="business" loading="lazy" />
                        </div>
                        <p>Business</p>
                    </Link>
                </li>

                {/* Lifestyle */}
                <li>
                    <Link onClick={() => setFilterBy({ ...filterBy, tags: [...filterBy.tags, 'lifestyle'] })} className="link menuLink" to="/gig">
                        <div>
                            <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/consulting.93989a4.svg" alt="consulting" loading="lazy" />
                        </div>
                        <p>Lifestyle</p>
                    </Link>
                </li>
            </ul>
        </div >
    )
}