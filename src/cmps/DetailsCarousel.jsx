import { useRef } from 'react'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

export function DetailsCarousel({ images }) { 
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
    <Carousel responsive={responsive}>
      {images.map((src, index) => (
        <div key={index} className="item1">
          <img src={src} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </Carousel>
  )
}
