import { useState, useEffect } from 'react'

import rightArrow from '../assets/img/svg/primeCategories/rightArrow.svg'; // Import the image
import leftArrow from '../assets/img/svg/primeCategories/leftArrow.svg'; // Import the image



export function CarouselImg({ imgUrls }) {
    const [carouselIndex, setCarouselIndex] = useState(0)
    const [showRightArrow, setShowRightArrow] = useState(true)
    const [showLeftArrow, setShowLeftArrow] = useState(false)

    function moveCarouse(dir) {
        setShowLeftArrow(dir + carouselIndex >= 0 ? false : true)
        setShowRightArrow(dir + carouselIndex <= -imgUrls.length + 1 ? false : true)
        setCarouselIndex(prev => prev + dir)
    }

    return (
        <>
            {/* <svg width="16" height="16" viewBox="0 0 8 15" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="m7.228.69.619.62a.375.375 0 0 1 0 .53L2.2 7.5l5.647 5.66a.375.375 0 0 1 0 .53l-.62.62a.375.375 0 0 1-.53 0L.154 7.764a.375.375 0 0 1 0-.53L6.698.69a.375.375 0 0 1 .53 0Z"></path></svg> */}
            {/* <svg width="16" height="16" viewBox="0 0 8 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="m.772 1.19-.619.62a.375.375 0 0 0 0 .53L5.8 8 .153 13.66a.375.375 0 0 0 0 .53l.62.62a.375.375 0 0 0 .53 0l6.544-6.545a.375.375 0 0 0 0-.53L1.302 1.19a.375.375 0 0 0-.53 0Z"></path></svg> */}
            <div className='carousel-img'>
                {
                    imgUrls.map((src, ind) =>
                        <div key={ind} className="container" style={{ left: `${(ind + carouselIndex) * 100}%` }}>
                            <img src={src} alt="" />
                        </div>
                    )
                }
                {showLeftArrow &&
                    <button className="arrow-prev" onClick={() => moveCarouse(1)}>
                        <img src={leftArrow} alt="" />
                    </button>}
                {showRightArrow &&
                    <button className="arrow-next" onClick={() => moveCarouse(-1)}>
                        <img src={rightArrow} alt="" />
                    </button>}

            </div>

        </>
    )
}

