
export function MiniuserGig({ user }) {
  const randomOrders = Math.floor(Math.random() * (300 - 20 + 1)) + 20
  function renderDiamonds(count) {
    return '♦️'.repeat(count)
  }
  return (
    <div className="gig-owner-details">
      <div className="gig-owner-img">
        <img src={user.imgUrl} alt={user.fullname} />
      </div>
      <div className="gig-owner-name">{user.fullname} <span>|</span></div> 
      <div className="gig-owner-level">Level {user.level} {renderDiamonds(user.diamonds)}</div>    
        <div className="gig-owner-rate">{'★' + user.rate }<span>|</span></div>
      <p className="orders-in-queue">{randomOrders} orders in queue</p>
    </div>
  )
}
