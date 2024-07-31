// react tools
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//hooks
import { useVisibility } from '../customHooks/useVisibility'
import { useWindowDimensions } from '../customHooks/windowRisze'


// store/reducers
import { SHOW_SEARCH_BAR } from '../store/reducers/system.reducer'
import { setFilter } from '../store/actions/gig.actions'
import { useNavigate } from 'react-router'

// imgs
import magnifyingGlass from '../assets/img/svg/searchBar/magnifyingGlass.svg'
import { convertObjectToQueryParams } from '../services/util.service'


export function SearchBar({ trackInViewport = false }) {

    const showTopSearchBar = useSelector(storeState => storeState.systemModule.showSearchBar)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const windowDims = useWindowDimensions()


    const dispatch = useDispatch()
    const ref = useRef()
    const navigate = useNavigate()

    // Use the useVisibility hook only if trackInViewport is true
    const isVisible = trackInViewport ? useVisibility(ref, { threshold: 0 }) : true

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

        const queryParams = convertObjectToQueryParams(filterBy)
        navigate(`/gig?${queryParams}`)
    }

    function handleChange(ev) {
        const { name, value } = ev.target

        onSetFilter({ ...filterBy, [name]: value })
    }

    return (
        <section className={`search-bar pos-relative ${!(trackInViewport || showTopSearchBar) ? 'transparent' : ''}`}  >
            <div ref={ref} className='out-of-vp-indicator'></div>
            <form onSubmit={onSubmit} className='grid-column fffff'>
                <input
                    className='search-input'
                    type="text"
                    name="title"
                    value={filterBy.title}
                    placeholder={windowDims.width <= 650 ? 'Find services' : 'What service are you looking for today?'}
                    onChange={handleChange}
                    required
                />
                <button className='btn-search'>
                    <img src={magnifyingGlass} alt="Search" />
                </button>
            </form>
        </section>
    )
}