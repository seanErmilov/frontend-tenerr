import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import rightArrow from '../assets/img/svg/primeCategories/rightArrow.svg'; // Import the image
import leftArrow from '../assets/img/svg/primeCategories/leftArrow.svg'; // Import the image



export function CarouselImg({gig}) {
    const navigate = useNavigate()

    function onClick() {
        navigate(gig._id)
     }

    const [carouselIndex, setCarouselIndex] = useState(0)
    const [showRightArrow, setShowRightArrow] = useState(true)
    const [showLeftArrow, setShowLeftArrow] = useState(false)

    function moveCarouse(ev, dir) {
        
        ev.stopPropagation()
        setShowLeftArrow(dir + carouselIndex >= 0 ? false : true)
        setShowRightArrow(dir + carouselIndex <= -gig.imgUrls.length + 1 ? false : true)
        setCarouselIndex(prev => prev + dir)
    }

    return (
        <>
            <div className='carousel-img' onClick={onClick}>
                {
                    gig.imgUrls.map((src, ind) =>
                        <div key={ind} className="container" style={{ left: `${(ind + carouselIndex) * 100}%` }}>
                            <img src={src} alt="" />
                        </div>
                    )
                }

                {showLeftArrow &&
                    <button className="arrow-prev" onClick={(ev) => moveCarouse(ev, 1)}>
                        <img src={leftArrow} alt="" />
                    </button>}
                {showRightArrow &&
                    <button className="arrow-next" onClick={(ev) => moveCarouse(ev, -1)}>
                        <img src={rightArrow} alt="" />
                    </button>}

            </div>
        </>
    )
}

