import { useEffect, useState } from 'react';

export function useVisibility(ref, options) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            options
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        }
    }, [ref, options]);

    // useEffect(() => {
    //     if (isVisible) {
    //         console.log('Component is in the viewport');
    //     } else {
    //         console.log('Component is out of the viewport');
    //     }
    // }, [isVisible]);

    return isVisible;
}
