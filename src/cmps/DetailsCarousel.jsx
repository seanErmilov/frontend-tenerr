import { colors } from "@mui/material"
import { useRef } from 'react'

import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

export function DetailsCarousel() {
  const ref = useRef()
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 0 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 4064, min: 0 },
      items: 1
    }
  }

  return (
    <>
      {/* <button className="check">left</button> */}
      <Carousel responsive={responsive}>
        <div className="item1"><img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/69345221/original/849da8ca5c0f44ed9418d1512ea8c1de385f9184/create-brand-logo-identity-and-website.jpg" alt="" /></div>
        <div className="item1"><img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs2/69345221/original/b3878b320b632c6346c6525ad64425b5bcd3f0f9/create-brand-logo-identity-and-website.jpg" alt="" /></div>
        <div className="item1"><img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/69345221/original/201e080f9127e65f1e46802b66143a8b4976c954/create-brand-logo-identity-and-website.jpg" alt="" /></div>
        <div className="item1"><img src="https://fiverr-res.cloudinary.com/images/t_gig_pdf_gallery_view_ver4,q_auto,f_auto/v1/attachments/delivery/asset/2661a7670ed14e8d709e050bd9abe374-1721309639/39W/create-brand-logo-identity-and-website.pdf" alt="" /></div>
        <div className="item1"><img src="https://fiverr-res.cloudinary.com/images/t_gig_pdf_gallery_view_ver4,q_auto,f_auto/v1/attachments/delivery/asset/7f04232df6362f4fdc6397d47e4b1f2f-1720979383/1W/create-brand-logo-identity-and-website.pdf" /></div>
        <div className="item1"><img src="https://fiverr-res.cloudinary.com/images/t_gig_pdf_gallery_view_ver4,q_auto,f_auto/v1/attachments/delivery/asset/3ee6589f643aa32986163a759bd7ee66-1720699697/5W/create-brand-logo-identity-and-website.pdf" /></div>
        <div className="item1"><img src="https://fiverr-res.cloudinary.com/images/t_gig_pdf_gallery_view_ver4,q_auto,f_auto/v1/attachments/delivery/asset/83a88be678968952285eccbb911827b5-1720793448/3W/create-brand-logo-identity-and-website.pdf" /></div>
        <div className="item1"><img src="https://fiverr-res.cloudinary.com/images/t_gig_pdf_gallery_view_ver4,q_auto,f_auto/v1/attachments/delivery/asset/8d40b19bd199611bc3ff60a8f8a1fcfc-1720615897/2W/create-brand-logo-identity-and-website.pdf" /></div>
      </Carousel>
    </>

  )
}
