// react tools
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// costumhooks
import { useWindowDimensions } from '../customHooks/windowRisze'

// services
import { gigService } from '../services/gig'

//hooks
import { useVisibility } from '../customHooks/useVisibility'

// store/reducers
import { SHOW_CATEGORIES_BAR } from '../store/reducers/system.reducer'

// imgs
import ai from '../assets/img/svg/primeCategories/ai.svg' // Import the image
import business from '../assets/img/svg/primeCategories/business.svg' // Import the image
import consulting from '../assets/img/svg/primeCategories/consulting.svg' // Import the image
import digital from '../assets/img/svg/primeCategories/digital.svg' // Import the image
import graphics from '../assets/img/svg/primeCategories/graphics.svg' // Import the image
import music from '../assets/img/svg/primeCategories/music.svg' // Import the image
import programming from '../assets/img/svg/primeCategories/programming.svg' // Import the image
import video from '../assets/img/svg/primeCategories/video.svg' // Import the image
import writing from '../assets/img/svg/primeCategories/writing.svg' // Import the image
import rightArrow from '../assets/img/svg/primeCategories/rightArrow.svg' // Import the image
import leftArrow from '../assets/img/svg/primeCategories/leftArrow.svg' // Import the image
import { convertObjectToQueryParams } from '../services/util.service'



// case SHOW_CATEGORIES_BAR:
//     return { ...state, showCategoriesBar: action.showCategoriesBar }

export function FilterPrimeCategories({ filterBy, setFilterBy, trackInViewport = false, avoidHiding = false }) {

    const showCatBar = useSelector(storeState => storeState.systemModule.showCategoriesBar)
    const dispatch = useDispatch()
    const dref = useRef()

    // Use the useVisibility hook only if trackInViewport is true
    const isVisible = trackInViewport ? useVisibility(dref, { threshold: 0 }) : true

    useEffect(() => {
        if (trackInViewport) {
            const action = {
                type: SHOW_CATEGORIES_BAR,
                showCategoriesBar: !isVisible,
            }
            dispatch(action)
        }
    }, [isVisible])


    // hooks
    const windowDims = useWindowDimensions()
    const navigate = useNavigate()
    const [hiddenArrow, setHiddenArrow] = useState('left')
    const rightEdge = useRef()
    const leftEdge = useRef()

    //consts
    const primeCategories = gigService.getPrimeCategories()

    // funcs
    function onClickTag(categorys) {
        const filterByToEdit = { ...filterBy, tags: [...filterBy.tags, categorys] }
        setFilterBy(filterByToEdit)

        const queryParams = convertObjectToQueryParams(filterByToEdit)
        navigate(`/gig?${queryParams}`)
    }

    function onScrollTo({ current: edge }) {
        edge.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        })
        setHiddenArrow(edge.id)
    }

    const noHight = avoidHiding ? '' : 'no-height'

    return (
        <div className={`prime-categories-section  pos-relative ${!(trackInViewport || showCatBar) ? avoidHiding ? '' : 'no-height' : ''}`}>
            <div ref={dref} className='out-of-vp-indicator'></div>

            {windowDims.width > 900 && windowDims.width < 1250 && (
                <>
                    {/* right arrow */}
                    <div
                        className={`right-arrow pos-absolute ${!(trackInViewport || showCatBar) ? avoidHiding ? '' : 'no-height' : ''}`}
                        onClick={() => onScrollTo(rightEdge)}>
                        <img className="img-right-arrow" src={rightArrow} alt="" />
                    </div>

                    {/* left arrow */}
                    <div
                        className={`left-arrow pos-absolute ${!(trackInViewport || showCatBar) ? avoidHiding ? '' : 'no-height' : ''}`}
                        onClick={() => onScrollTo(leftEdge)}>
                        <img className="img-left-arrow" src={leftArrow} alt="" />
                    </div>
                </>
            )}
            <ul className='grid-column'>
                {/* Programming & Tech */}
                <li onClick={() => onClickTag('programming')} ref={leftEdge} id="left">
                    <div className="cat-img">
                        <img src={programming} alt="" />
                    </div>
                    <div>Programming & Tech</div>
                </li>

                {/* Graphics & Design */}
                <li onClick={() => onClickTag('graphics')}>
                    <div className="cat-img">
                        <img src={graphics} alt="graphics_design" loading="lazy" />
                    </div>
                    <div>Graphics & Design</div>
                </li>

                {/* Digital Marketing */}
                <li onClick={() => onClickTag('digital')}>
                    <div className="cat-img">
                        <img src={digital} alt="digital_marketing" loading="lazy" />
                    </div>
                    <div>Digital Marketing</div>
                </li>

                {/* Writing & Translation */}
                <li onClick={() => onClickTag('writing')}>
                    <div className="cat-img">
                        <img src={writing} alt="writing_translation" loading="lazy" />
                    </div>
                    <div>Writing & Translation</div>
                </li>

                {/* Video & Animation */}
                <li onClick={() => onClickTag('video')}>
                    <div className="cat-img">
                        <img src={video} alt="video_animation" loading="lazy" />
                    </div>
                    <div>Video & Animation</div>
                </li>

                {/* AI Services */}
                <li onClick={() => onClickTag('ai')}>
                    <div className="cat-img">
                        <img src={ai} alt="ai_services" loading="lazy" />
                    </div>
                    <div>AI Services</div>
                </li>

                {/* Music & Audio */}
                <li onClick={() => onClickTag('music')}>
                    <div className="cat-img">
                        <img src={music} alt="music_audio" loading="lazy" />
                    </div>
                    <div>Music & Audio</div>
                </li>

                {/* Business */}
                <li onClick={() => onClickTag('business')}>
                    <div className="cat-img">
                        <img src={business} alt="business" loading="lazy" />
                    </div>
                    <div>Business</div>
                </li>

                {/* Lifestyle */}
                <li onClick={() => onClickTag('consulting')} ref={rightEdge}>
                    <div className="cat-img">
                        <img src={consulting} alt="consulting" loading="lazy" />
                    </div>
                    <div>Consulting</div>
                </li>
            </ul >
        </div >
    )
}