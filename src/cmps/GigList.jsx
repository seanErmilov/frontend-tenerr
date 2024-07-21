import { userService } from '../services/user'
import { GigPreview } from './GigPreview'
import { gigService } from '../services/gig/gig.service.local.js'


export function GigList({ gigs, onRemoveGig, onUpdateGig }) {
    // let  gigs = gigService._createGigs()

    // function shouldShowActionBtns(gig) {
    //     const user = userService.getLoggedinUser()

    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return gig.owner?._id === user._id
    // }

    return <section>
        <ul className="gig-list">
            {gigs.map((gig, idx) =>
                <li key={idx}>
                    <GigPreview gig={gig} />
                    {/* {shouldShowActionBtns(gig) && <div className="actions">
                        <button onClick={() => onUpdateGig(gig)}>Edit</button>
                        <button onClick={() => onRemoveGig(gig._id)}>x</button>
                    </div>} */}
                </li>)
            }
        </ul>
    </section>
}