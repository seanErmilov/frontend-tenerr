import { CarouselImg } from "../cmps/CarouselImg";

export function GigIndex() {
    return (
        <main className="gig-index">
            <header>
                <h2>Gigs</h2>
                {userService.getLoggedinUser() && <button onClick={onAddGig}>Add a Gig</button>}
            </header>
            <GigFilter filterBy={filterBy} setFilterBy={setFilterBy} />
            <GigList
                gigs={gigs}
                onRemoveGig={onRemoveGig}
                onUpdateGig={onUpdateGig} />
        </main>
    )
}