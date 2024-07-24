import { LinearWithValueLabel } from "./LinearProgressWithLabel";

export function ProfileProgress({ orders }) {

    const orderStatusSummary = orderService.getOrderStats(orders)
    if (!orders) return
    return (
        <div className="ProfileProgress">
            {console.log('orders :', orders)}
            {/* <img src={orders[0].seller.imgUrl} alt="" /> */}
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