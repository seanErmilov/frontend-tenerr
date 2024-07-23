import React, { useEffect, useRef } from 'react';

export function HomeVideo() {
    const videoRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    videoRef.current.play();
                } else {
                    videoRef.current.pause();
                }
            },

            { // options
                threshold: 0.5,
            }
        )

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        }
    }, [])

    return (
        <video
            ref={videoRef}
            className="c4Ic0RB"
            controls
            poster="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/ef51b45f79342925d5268e0b2377eae8-1704717764992/thumbnail.png"
            preload="auto"
            crossOrigin="anonymous"
            width="100%"
            playsInline
            style={{ objectFit: 'cover' }}
            muted={true}
        >
            <source
                src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/e0f330e4c8d6e3bf843a3bd3164fa275-1706087048062/How%20Fiverr%20Works%20EN%20Subs%2016x9"
                type="video/mp4"
            />
        </video>
    )
}
