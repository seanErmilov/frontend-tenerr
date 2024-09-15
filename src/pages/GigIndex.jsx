// react tools
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'


// store
import { loadGigs, setFilter } from '../store/actions/gig.actions'

// cmps
import { GigList } from '../cmps/GigList'
import { GigFilter } from '../cmps/GigFilter'
import { Inside } from '../cmps/Inside'
import { gigService } from '../services/gig'


// libraries
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

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


    const categoriesMap = {
        programming: ["Programming & Tech", "Let us manage your Programming & Tech project"],
        graphics: ["Graphics & Design", "Stand out from the crowd with a logo that fits your brand personality"],
        digital: ["Digital Marketing", "Find a comprehensive digital marketing agency to handle it all."],
        writing: ["Writing & Translation", "Most Popular in Writing & Translation"],
        video: ["Video & Animation", "Let us manage your Video & Animation project"],
        ai: ["AI Services", "Add AI with the help of experts who get it"],
        music: ["Music & Audio", "Most Popular in Music & Audio"],
        business: ["Business", "Most popular in Business"],
        consulting: ["Consulting", "Access experts to accelerate your business."]
    }

    if (!gigs.length) return (
        <SkeletonTheme baseColor="#f5f5f5" highlightColor="#94d4b4">

            <h1>{0 || <Skeleton />}</h1>
        </SkeletonTheme>

    )


    return (
        <main className="gig-index">
            {
                filterBy.title ?
                    // search by title 
                    <h1 className='results-for'>Results for <span>{filterBy.title}</span></h1> :

                    // all results
                    !filterBy.tags.length ? <h1 className='results-for'>All Results</h1> :
                        // search by tag categorie
                        <>
                            {/* bread crums */}

                            <Inside
                                filterBy={filterBy}
                                innerText={categoriesMap[filterBy.tags[0]][0]}
                            />
                            {/* filter title */}
                            <h1>{categoriesMap[filterBy.tags[0]][0]}</h1>

                            {/* filter description short sentance */}
                            <h4>{categoriesMap[filterBy.tags[0]][1]}</h4>
                        </>
            }

            {/* <FilterBtn /> */}
            <GigFilter filterBy={filterBy} setFilterBy={onSetFilterBy} />

            <div className='results'>{gigs.length} results</div>

            {/* main - gigs previews */}
            <GigList
                gigs={gigs}
            />
        </main>
    )
}