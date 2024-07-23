
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadGigs, setFilter } from '../store/actions/gig.actions'

import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'
import { FilterBtn } from '../cmps/FilterBtn'

export function GigIndex() {
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const gigs = useSelector(storeState => storeState.gigModule.gigs)

    useEffect(() => {
        console.log(filterBy)
        
        loadGigs(filterBy)
    }, [filterBy])

    function onSetFilterBy(filterBy) {
        setFilter(filterBy)
    }

    const innerText =  filterBy.title ? filterBy.title : filterBy.tags[0]
    return (
        <main className="gig-index">

            <Inside
            innerText={innerText}/>
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