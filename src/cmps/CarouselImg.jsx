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
        {/* <svg width="16" height="16" viewBox="0 0 8 15" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="m7.228.69.619.62a.375.375 0 0 1 0 .53L2.2 7.5l5.647 5.66a.375.375 0 0 1 0 .53l-.62.62a.375.375 0 0 1-.53 0L.154 7.764a.375.375 0 0 1 0-.53L6.698.69a.375.375 0 0 1 .53 0Z"></path></svg> */}
        {/* <svg width="16" height="16" viewBox="0 0 8 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="m.772 1.19-.619.62a.375.375 0 0 0 0 .53L5.8 8 .153 13.66a.375.375 0 0 0 0 .53l.62.62a.375.375 0 0 0 .53 0l6.544-6.545a.375.375 0 0 0 0-.53L1.302 1.19a.375.375 0 0 0-.53 0Z"></path></svg> */}
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

