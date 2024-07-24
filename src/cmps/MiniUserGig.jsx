import level3 from '../assets/img/levels/level3.png' // Import the image


import star from '../assets/img/svg/star.svg' // Import the image



export function MiniuserGig({ user }) {
  const randomOrders = Math.floor(Math.random() * (300 - 20 + 1)) + 20

  function renderDiamonds(count) {
    return '♦️'.repeat(count)
  }

  return (
    <div className="gig-owner-brief">

      <img className="gig-owner-img" src={user.imgUrl} alt={user.fullname} />

      <div className='right-cell'>
        <div className='upper-row'>
          <div className="gig-owner-name">{user.fullname}</div>
          <img src={level3} className="gig-owner-level" />
          {/* <div className="gig-owner-level">Level {user.level} {renderDiamonds(user.diamonds)}</div>     */}
        </div>
        {/* <span className='seperator'>|</span> */}
        <div className='lowwer-row'>
          <div className="gig-owner-rate"><img src={star} alt="" /><div>{user.rate}</div></div>
          <div className="orders-in-queue">{randomOrders} orders in queue</div>
        </div>
      </div>
    </div>
  )
}
