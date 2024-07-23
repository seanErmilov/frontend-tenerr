
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadGigs, setFilter } from '../store/actions/gig.actions'

import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'
import { Inside } from '../cmps/Inside'

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
                <h2>Gigs</h2>
            </header>
            <GigFilter filterBy={filterBy} setFilterBy={onSetFilterBy} />
            <GigList
                gigs={gigs}
            />
        </main>
    )
}