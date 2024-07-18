
export function MiniuserGig({ user }) {
    return (
        <div className="gig-owner-details">
        <div className="gig-owner-img">
          <img src={user.imgUrl} alt={user.fullname} />
        </div>
        <div className="gig-owner-name">{user.fullname}</div> <span>|</span>
        <div className="gig-owner-level">{user.level}</div>
        <div className="gig-owner-rate">{'★' + user.rate}</div>
      </div>
    )
  }
  