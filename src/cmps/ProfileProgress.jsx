import { LinearWithValueLabel } from "./LinearProgressWithLabel";

export function ProfileProgress({ orders }) {

    const orderStatusSummary = orderService.getOrderStats(orders)
    if (!orders) return
    return (
        <div className="ProfileProgress">
            <div className="profile">
                <img src={orders[0].seller.imgUrl} alt="" />
                <div>
                    <div>Positive Rating</div>
                    <div>100%</div>
                </div>
                <div>
                    <div>Response Time</div>
                    <div>1 Hrs.</div>
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