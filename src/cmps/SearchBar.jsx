// react tools
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//////////////////////////////////////////
import { useSearchParams } from 'react-router-dom'
////////////////////////////////////////////////////

//hooks
import { useVisibility } from '../customHooks/useVisibility'

// store/reducers
import { SHOW_SEARCH_BAR } from '../store/reducers/system.reducer'
import { setFilter } from '../store/actions/gig.actions'
import { useNavigate } from 'react-router'

// imgs
import magnifyingGlass from '../assets/img/svg/searchBar/magnifyingGlass.svg'


export function SearchBar({ trackInViewport = false }) {
    /////////////////////////////////////
    const [searchParams, setSearchParams] = useSearchParams()
    ///////////////////////////////
    const showTopSearchBar = useSelector(storeState => storeState.systemModule.showSearchBar)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

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
        navigate('/gig')
    }

    function handleChange(ev) {
        const { name, value } = ev.target
        setSearchParams({[name]: value })
        console.log(searchParams.get({name}))

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
                    placeholder="What service are you looking for today?"
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