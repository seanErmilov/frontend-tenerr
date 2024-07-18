// react tools
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// services
import { gigService } from '../services/gig'

//hooks
import { useVisibility } from '../customHooks/useVisibility'

// store/reducers
import { SHOW_SEARCH_BAR } from '../store/reducers/system.reducer'

export function SearchBar({ filterToEdit, handleChange, trackInViewport = false }) {
    const showTopSearchBar = useSelector(storeState => storeState.systemModule.showSearchBar)
    const dispatch = useDispatch()
    //const  [trackVisibilty, setTrackVisibilty] = useState(trackInViewport)

    const ref = useRef();
    // Use the useVisibility hook only if trackInViewport is true
    const isVisible = trackInViewport ? useVisibility(ref, { threshold: 0 }) : true;


    useEffect(() => {
        if (trackInViewport) {
            const action = {
                type: SHOW_SEARCH_BAR,
                showSearchBar: !isVisible,
            }
            dispatch(action)
        }
    }, [isVisible])

    return ( 
        <section className={`search-bar pos-relative ${!(trackInViewport || showTopSearchBar) ? 'transparent' : ''}`}  >
            <div ref={ref} className='out-of-vp-indicator'>check</div>
            <input
                className='search-input'
                type="text"
                name="txt"
                // value={filterToEdit.txt}
                placeholder="Search for any service..."
                onChange={handleChange}
                required
            />
            <button className='btn-search'>
                <img src="src/assets/icon/search white.svg" alt="Search" />
            </button>
        </section>
    );
}