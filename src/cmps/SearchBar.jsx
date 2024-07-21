// react tools
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//hooks
import { useVisibility } from '../customHooks/useVisibility'

// store/reducers
import { SHOW_SEARCH_BAR } from '../store/reducers/system.reducer'
import { setFilter } from '../store/actions/gig.actions'
import { useNavigate } from 'react-router'

export function SearchBar({ trackInViewport = false }) {
    const showTopSearchBar = useSelector(storeState => storeState.systemModule.showSearchBar)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

    const dispatch = useDispatch()
    const ref = useRef();
    const navigate = useNavigate()


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


    function onSetFilter(filterBy) {
        setFilter(filterBy)
    }

    function onSubmit(ev) {
        ev.preventDefault()
        if (!filterBy.title) return

        onSetFilter(filterBy)
        navigate('/gig')
    }

    function handleChange(ev) {
        const { name, value } = ev.target
        onSetFilter({ ...filterBy, [name]: value })
    }

    return (
        <section className={`search-bar pos-relative ${!(trackInViewport || showTopSearchBar) ? 'transparent' : ''}`}  >
            <div ref={ref} className='out-of-vp-indicator'></div>
            <form onSubmit={onSubmit}>
                <input
                    className='search-input'
                    type="text"
                    name="title"
                    value={filterBy.title}
                    placeholder="Search for any service..."
                    onChange={handleChange}
                    required
                />
                <button className='btn-search'>
                    <img src="src/assets/icon/search white.svg" alt="Search" />
                </button>
            </form>
        </section>
    );
}