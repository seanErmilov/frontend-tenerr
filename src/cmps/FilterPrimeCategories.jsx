// react tools
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useLayoutEffect } from 'react'

// costumhooks
import { useWindowDimensions } from '../customHooks/windowRisze'

// services
import { gigService } from '../services/gig'

// imgs
import ai from '../assets/img/svg/primeCategories/ai.svg'; // Import the image
import business from '../assets/img/svg/primeCategories/business.svg'; // Import the image
import consulting from '../assets/img/svg/primeCategories/consulting.svg'; // Import the image
import digital from '../assets/img/svg/primeCategories/digital.svg'; // Import the image
import graphics from '../assets/img/svg/primeCategories/graphics.svg'; // Import the image
import music from '../assets/img/svg/primeCategories/music.svg'; // Import the image
import programming from '../assets/img/svg/primeCategories/programming.svg'; // Import the image
import video from '../assets/img/svg/primeCategories/video.svg'; // Import the image
import writing from '../assets/img/svg/primeCategories/writing.svg'; // Import the image
import rightArrow from '../assets/img/svg/primeCategories/rightArrow.svg'; // Import the image
import leftArrow from '../assets/img/svg/primeCategories/leftArrow.svg'; // Import the image


export function FilterPrimeCategories({ filterBy, setFilterBy }) {
    // hooks
    const windowDims = useWindowDimensions()
    const navigate = useNavigate()
    const [hiddenArrow, setHiddenArrow] = useState('left')
    const rightEdge = useRef()
    const leftEdge = useRef()

    //consts
    const primeCategories = gigService.getPrimeCategories()

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
                        <img src={rightArrow} alt="" />
                    </div>

                    {/* left arrow */}
                    <div
                        className={`left-arrow pos-absolute`}
                        onClick={() => onScrollTo(leftEdge)}>
                        <img src={leftArrow} alt="" />
                    </div>
                </>
            )}
            <ul className='grid-column'>
                {/* Programming & Tech */}
                <li onClick={() => onClickTag('programming')} ref={leftEdge} id="left">
                    <div>
                        <img src={programming} alt="" />
                    </div>
                    <p>Programming & Tech</p>
                </li>

                {/* Graphics & Design */}
                <li onClick={() => onClickTag('graphics')}>
                    <div>
                        <img src={graphics} alt="graphics_design" loading="lazy" />
                    </div>
                    <p>Graphics & Design</p>
                </li>

                {/* Digital Marketing */}
                <li onClick={() => onClickTag('digital')}>
                    <div>
                        <img src={digital} alt="digital_marketing" loading="lazy" />
                    </div>
                    <p>Digital Marketing</p>
                </li>

                {/* Writing & Translation */}
                <li onClick={() => onClickTag('writing')}>
                    <div>
                        <img src={writing} alt="writing_translation" loading="lazy" />
                    </div>
                    <p>Writing & Translation</p>
                </li>

                {/* Video & Animation */}
                <li onClick={() => onClickTag('video')}>
                    <div>
                        <img src={video} alt="video_animation" loading="lazy" />
                    </div>
                    <p>Video & Animation</p>
                </li>

                {/* AI Services */}
                <li onClick={() => onClickTag('ai')}>
                    <div>
                        <img src={ai} alt="ai_services" loading="lazy" />
                    </div>
                    <p>AI Services</p>
                </li>

                {/* Music & Audio */}
                <li onClick={() => onClickTag('music')}>
                    <div>
                        <img src={music} alt="music_audio" loading="lazy" />
                    </div>
                    <p>Music & Audio</p>
                </li>

                {/* Business */}
                <li onClick={() => onClickTag('business')}>
                    <div>
                        <img src={business} alt="business" loading="lazy" />
                    </div>
                    <p>Business</p>
                </li>

                {/* Lifestyle */}
                <li onClick={() => onClickTag('consulting')} ref={rightEdge}>
                    <div>
                        <img src={consulting} alt="consulting" loading="lazy" />
                    </div>
                    <p>Consulting</p>
                </li>
            </ul >
        </div >
    )
}