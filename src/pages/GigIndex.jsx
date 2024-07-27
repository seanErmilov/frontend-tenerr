
import { useEffect} from 'react'
import { useSelector} from 'react-redux'

import { loadGigs, setFilter } from '../store/actions/gig.actions'
import { HEADER_STICKY } from '../store/reducers/system.reducer'

import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'
import { FilterBtn } from '../cmps/FilterBtn'
import { Inside } from '../cmps/Inside'
import { useLocation, useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'
import { gigService } from '../services/gig'




export function GigIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = gigService.getFilterFromSearchParams(searchParams)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)

    const gigs = useSelector(storeState => storeState.gigModule.gigs)

    useEffect(() => {
        setFilter(defaultFilter)
    }, [])


    useEffect(() => {
        loadGigs(filterBy)
        setSearchParams(filterBy)
    }, [filterBy])

    function onSetFilterBy(filterBy) {
        setFilter(filterBy)
    }

    if (!gigs.length) return
    const innerText = filterBy.title ? filterBy.title : filterBy.tags[0]
    return (
        <main className="gig-index">

            <Inside filterBy={filterBy}
                innerText={innerText} />
            <header>
            </header>
            <h1>Logo Design</h1>
            <h4>Stand out from the crowd with a logo that fits your brand personality</h4>
            <FilterBtn />
            <GigFilter filterBy={filterBy} setFilterBy={onSetFilterBy} />
            <GigList
                gigs={gigs}
            />
        </main>
    )
}