import { orderService } from "../services/order";
import { LinearWithValueLabel } from "./LinearProgressWithLabel";

export function ProfileProgress({ orders }) {

    const orderStatusSummary = orderService.getOrderStats(orders)
    if (!orders) return
    return (
        <div className="ProfileProgress">
            <div className="profile">
                <div className="img-container">
                    <img src={orders[0].seller.imgUrl} alt="" />
                </div>
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
            <ul className='profileStatusProgress'>
                <li>
                    <p>Response Rate</p>
                    <LinearWithValueLabel props={orderStatusSummary.responseRate} />
                </li>
                <li>
                    <p>Orders Completed</p>
                    <LinearWithValueLabel props={orderStatusSummary.ordersCompleted} />

                </li>

            </ul>
        </div>
    )
}