import { useSelector } from "react-redux";
import { orderService } from "../services/order";

export function ProfileProgress({ orders }) {
    const user = useSelector(storeState => storeState.userModule.user)

    const orderStatusSummary = orderService.getOrderStats(orders)
    if (!orders || !orders.length) return
    console.log(orders.length)

    return (
        <div className="ProfileProgress">
            <div className="profile">


                <div className="img-container">
                    <img src={orders[0].seller.imgUrl} alt="" />
                    <div className="online-status"></div>
                </div>

                {/* aka green dot */}
                <div className="user-desc">
                    <div className="profile-item">
                        <p>Positive Rating</p>
                        <div>100%</div>
                    </div>

                    <div className="profile-item">
                        <p>Response Time</p>
                        <div>1 Hrs.</div>
                    </div>
                </div>
            </div>

            <LinearProgressionLabel
                header={'Response Rate'}
                progression={Math.floor(orderStatusSummary.responseRate)} />

            <LinearProgressionLabel
                header={'Completed Orders'}
                progression={Math.ceil(orderStatusSummary.ordersCompleted)} />
        </div>
    )
}



function LinearProgressionLabel({ header, progression }) {

    return (
        <section className="statistics-container" 
        style={(() => {
            if (progression === 0) {

                return {"--left-clr": "#40414500"};
            } else if (progression === 100) {
                return {"--right-clr": "#dadbdd00"};
            } else {
                return {};  // Return an empty object if none of the conditions match
            }
        })()}
    >
            <h2>{header}</h2>
            <span>{progression}%</span>

            <div className="progress-bar"

                style={{
                    "--progress": `${progression}%`,
                }}>
                <div className="left-handside"></div>
                <div className="right-handside"></div>
                <div className="upright-bar">
                    <div className='left'></div>
                    <div className='right'></div>
                </div>

            </div>
        </section>

    )
}