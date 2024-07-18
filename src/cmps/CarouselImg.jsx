import { useState, useEffect } from 'react'

const demoSrc1 = "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/c138cfdf4859bb497ff904beeb4be5f8-1717583961/Creative_self_new/design-unique-cover-art.jpg"
const demoSrc2 = "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/415283989e317d946dad85b8efed8f7b-1717284806/Halloween_leaves_moon/design-unique-cover-art.jpg"
const demoSrc3 = "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/18f0ed6d24c12557a40244aadbe6c572-1720003890/Lost_love_final/design-unique-cover-art.jpg"
const demoSrc4 = "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/207529273/original/dc28efc7d364e1ecf281be7580c666829dc8279f/design-unique-cover-art.png"
const demoSrc5 = " https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/207529273/original/784113fba7abe525b05a0f1a3889e09716bb39e5/design-unique-cover-art.png"


const srcs = [demoSrc1, demoSrc2, demoSrc3, demoSrc4, demoSrc5]

export function CarouselImg({ imgsSrcs }) {
    const [carouselIndex, setCarouselIndex] = useState(0)
    const [showRightArrow, setShowRightArrow] = useState(true)
    const [showLeftArrow, setShowLeftArrow] = useState(false)

    function moveCarouse(dir) {
        setShowLeftArrow(dir + carouselIndex >= 0 ? false : true)
        setShowRightArrow(dir + carouselIndex <= -srcs.length + 1 ? false : true)
        setCarouselIndex(prev => prev + dir)
    }

    return (
        <>
            <div className='carousel-img'>
                {
                    srcs.map((src, ind) =>
                        <div key={ind} className="container" style={{ left: `${(ind + carouselIndex) * 100}%` }}>
                            <img src={src} alt="" />
                        </div>
                    )
                }
                {showLeftArrow && <button className="arrow-prev" onClick={() => moveCarouse(1)}>left</button>}
                {showRightArrow && <button className="arrow-next" onClick={() => moveCarouse(-1)}>Right</button>}

            </div>

        </>
    )
}

