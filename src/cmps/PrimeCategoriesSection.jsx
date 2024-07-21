import { Link, useNavigate } from 'react-router-dom'

export function PrimeCategoriesSection({ filterBy, setFilterBy }) {
    const navigate = useNavigate()

    function linkMessege(category) {
        setFilterBy({ ...filterBy, tags: [...filterBy.tags, category] })
        navigate('/gig')
    }
    return (
        <div className="prime-categories-section">
            <ul className='grid-column'>
                {/* Graphics & Design */}
                <li onClick={() => linkMessege('graphics')}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.3272c08.svg" alt="graphics_design" loading="lazy" />
                    </div>
                    <p>Graphics & Design</p>
                </li>

                {/* Video & Animation */}
                <li onClick={() => linkMessege('video')}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation.21fb1d6.svg" alt="video_animation" loading="lazy" />
                    </div>
                    <p>Video & Animation</p>
                </li>

                {/* Writing & Translation */}
                <li onClick={() => linkMessege('writing')}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation.dc66eb8.svg" alt="writing_translation" loading="lazy" />
                    </div>
                    <p>Writing & Translation</p>
                </li>

                {/* AI Services */}
                <li onClick={() => linkMessege('ai')}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/ai-services.40511da.svg" alt="ai_services" loading="lazy" />
                    </div>
                    <p>AI Services</p>
                </li>

                {/* Digital Marketing */}
                <li onClick={() => linkMessege('digital')}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/digital-marketing.85e8846.svg" alt="digital_marketing" loading="lazy" />
                    </div>
                    <p>Digital Marketing</p>
                </li>

                {/* Music & Audio */}
                <li onClick={() => linkMessege('music')}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio.6a411f2.svg" alt="music_audio" loading="lazy" />
                    </div>
                    <p>Music & Audio</p>
                </li>

                {/* Programming & Tech */}
                <li onClick={() => linkMessege('programming')}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/programming-tech.49dbf0d.svg" alt="programming_tech" loading="lazy" />
                    </div>
                    <p>Programming & Tech</p>
                </li>

                {/* Business */}
                <li onClick={() => linkMessege('business')}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business.772c3c9.svg" alt="business" loading="lazy" />
                    </div>
                    <p>Business</p>
                </li>

                {/* Lifestyle */}
                <li onClick={() => linkMessege('lifestyle')}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/consulting.93989a4.svg" alt="consulting" loading="lazy" />
                    </div>
                    <p>Lifestyle</p>
                </li>
            </ul>
        </div >
    )
}