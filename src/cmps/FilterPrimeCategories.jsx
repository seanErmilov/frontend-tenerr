// react tools
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useLayoutEffect } from 'react'

// costumhooks
import { useWindowDimensions } from '../customHooks/windowRisze'

export function FilterPrimeCategories({ filterBy, setFilterBy }) {
    // hooks
    const windowDims = useWindowDimensions()
    const navigate = useNavigate()
    const [hiddenArrow, setHiddenArrow] = useState('left')
    const rightEdge = useRef()
    const leftEdge = useRef()


    // funcs
    function onClickTag(category) {
        setFilterBy({ ...filterBy, tags: [...filterBy.tags, category] })
        navigate('/gig')
    }

    function onScrollTo({ current: edge }) {
        edge.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        })
        setHiddenArrow(edge.id)
    }

    // .pos-absolute
    return (
        <div className="prime-categories-section  pos-relative">

            {windowDims.width > 900 && windowDims.width < 1250 && (

                <>
                    {/* right arrow */}

                    <div
                        className={`right-arrow pos-absolute hidden`}
                        onClick={() => onScrollTo(rightEdge)}>
                        <svg width="16" height="16" viewBox="0 0 8 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                            <path d="m.772 1.19-.619.62a.375.375 0 0 0 0 .53L5.8 8 .153 13.66a.375.375 0 0 0 0 .53l.62.62a.375.375 0 0 0 .53 0l6.544-6.545a.375.375 0 0 0 0-.53L1.302 1.19a.375.375 0 0 0-.53 0Z"></path>
                        </svg>
                    </div>

                    {/* left arrow */}
                    <div
                        className={`left-arrow pos-absolute`}
                        onClick={() => onScrollTo(leftEdge)}>
                        <svg width="16" height="16" viewBox="0 0 8 15" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                            <path d="m7.228.69.619.62a.375.375 0 0 1 0 .53L2.2 7.5l5.647 5.66a.375.375 0 0 1 0 .53l-.62.62a.375.375 0 0 1-.53 0L.154 7.764a.375.375 0 0 1 0-.53L6.698.69a.375.375 0 0 1 .53 0Z"></path>
                        </svg>
                    </div>
                </>
            )}

            <ul className='grid-column'>
                {/* Programming & Tech */}
                <li onClick={() => onClickTag('programming')} ref={leftEdge} id="left">
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/programming-tech.49dbf0d.svg" alt="programming_tech" loading="lazy" />
                    </div>
                    <p>Programming & Tech</p>
                </li>

                {/* Graphics & Design */}
                <li onClick={() => onClickTag('graphics')}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design.3272c08.svg" alt="graphics_design" loading="lazy" />
                    </div>
                    <p>Graphics & Design</p>
                </li>

                {/* Digital Marketing */}
                <li onClick={() => onClickTag('digital')}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/digital-marketing.85e8846.svg" alt="digital_marketing" loading="lazy" />
                    </div>
                    <p>Digital Marketing</p>
                </li>

                {/* Writing & Translation */}
                <li onClick={() => onClickTag('writing')}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation.dc66eb8.svg" alt="writing_translation" loading="lazy" />
                    </div>
                    <p>Writing & Translation</p>
                </li>

                {/* Video & Animation */}
                <li onClick={() => onClickTag('video')}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation.21fb1d6.svg" alt="video_animation" loading="lazy" />
                    </div>
                    <p>Video & Animation</p>
                </li>

                {/* AI Services */}
                <li onClick={() => onClickTag('ai')}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/ai-services.40511da.svg" alt="ai_services" loading="lazy" />
                    </div>
                    <p>AI Services</p>
                </li>

                {/* Music & Audio */}
                <li onClick={() => onClickTag('music')}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio.6a411f2.svg" alt="music_audio" loading="lazy" />
                    </div>
                    <p>Music & Audio</p>
                </li>

                {/* Business */}
                <li onClick={() => onClickTag('business')}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business.772c3c9.svg" alt="business" loading="lazy" />
                    </div>
                    <p>Business</p>
                </li>

                {/* Lifestyle */}
                <li onClick={() => onClickTag('consulting')} ref={rightEdge}>
                    <div>
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/consulting.93989a4.svg" alt="consulting" loading="lazy" />
                    </div>
                    <p>Consulting</p>
                </li>




            </ul >
        </div >
    )
}