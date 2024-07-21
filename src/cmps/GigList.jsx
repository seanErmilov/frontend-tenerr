import { GigPreview } from './GigPreview'


export function GigList({ gigs }) {
    return <section>
        <ul className="gig-list">
            {gigs.map((gig, idx) =>
                <li key={idx}>
                    <GigPreview gig={gig} />
                </li>)
            }
        </ul>
    </section>
}