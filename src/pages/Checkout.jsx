import { useNavigate, useParams } from "react-router"
import { useSelector } from "react-redux"
import { Button } from "@mui/material"
import { CheckoutForm } from "../cmps/CheckoutForm"
import { addOrder } from "../store/actions/order.actions"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function Checkout() {
    const order = useSelector(storeState => storeState.orderModule.order)
    const navigate = useNavigate()
    const features = [
        "1 concept included",
        "Logo transparency",
        "Printable file",
        "Include 3D mockup",
    ]

    async function handelcheckout() {
        try {
            const savedOrder = await addOrder(order)
            showSuccessMsg('Order saved successfully')
            navigate('/gig')
        } catch {
            showErrorMsg('Cannot save order')
            console.log('Cannot save order', err)
            throw err
        }

    }

    // async function loadOrder(orderId) {
    //     const fetchedOrder = await orderService.getById(orderId)
    //     setOrder(fetchedOrder)
    //     setFilteredReviews(fetchedOrder.reviews)
    // }

    if (!order) return
    return (
        <main className="checkout">
            <div className="main-content">
                <section className="billing-info">
                    <header className="section-header">
                        <h6>Billing information</h6>
                    </header>
                    <div>
                        <p>Your invoice will be issued according to the details listed here.</p>
                        <Button>Add details
                        </Button>
                    </div>
                </section>
                <section className="payment-methods">
                    <header className="section-header">
                        <h6>Payment Options</h6>
                    </header>

                    <CheckoutForm order={order} />
                </section>
            </div>
            {/* <div className="side-content">
                <section className="order-details-container">
                    <header className="order-details-header">
                        <span className="img-container">
                            <img src={order.gig.imgUrl} alt="" />
                        </span>
                        <div>{order.gig.name}</div>
                    </header>
                    <div className="order-details-general-pricing">
                        <h3>{order.gig.price}$</h3>
                        <p>1 custom logo+high resolution file+3d mockup+logo transparency+ 300dpi</p>
                    </div>
                    <ul className="features clean-list">
                        {features.map((feature, index) => (
                            <li className="regular" key={index}>
                                <div className="v-svg-container">
                                    <span>
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 11 9"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#000000"
                                        >
                                            <path d="M3.645 8.102.158 4.615a.536.536 0 0 1 0-.759l.759-.758c.21-.21.549-.21.758 0l2.35 2.349L9.054.416c.21-.21.55-.21.759 0l.758.758c.21.21.21.55 0 .759L4.403 8.102c-.209.21-.549.21-.758 0Z"></path>
                                        </svg>
                                    </span>
                                </div>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="summary">
                    <div className="service">
                        <p>Service fee</p>
                        <p>{(order.gig.price * 0.17).toFixed(2)}$</p>
                    </div>
                    <div className="vat">
                        <p>VAT</p>
                        <p>{(order.gig.price * 0.16).toFixed(2)}$</p>
                    </div>
                    <div className="Total">
                        <h1>Total</h1>
                        <h1>{(order.gig.price + (order.gig.price * 0.16) + (order.gig.price * 0.17)).toFixed(2)}$</h1>
                    </div>
                    <div>
                        <p>Total delivery time</p>
                        <p>{order.gig.daysToMake}</p>
                    </div>
                    <button className="sidebar-btn-price" onClick={handelcheckout}>Confirm & Pay</button>
                    <div className="secure-payment flex flex-center">
                        <span className="+T4qqMV co-grey-800" aria-hidden="true" >
                            <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.5 7C12.9062 7 13.25 7.15625 13.5625 7.4375C13.8438 7.75 14 8.09375 14 8.5V14.5C14 14.9375 13.8438 15.2812 13.5625 15.5625C13.25 15.875 12.9062 16 12.5 16H1.5C1.0625 16 0.71875 15.875 0.4375 15.5625C0.125 15.2812 0 14.9375 0 14.5V8.5C0 8.09375 0.125 7.75 0.4375 7.4375C0.71875 7.15625 1.0625 7 1.5 7H2.25V4.75C2.25 3.90625 2.4375 3.125 2.875 2.375C3.3125 1.65625 3.875 1.09375 4.625 0.65625C5.34375 0.21875 6.125 0 7 0C7.84375 0 8.625 0.21875 9.375 0.65625C10.0938 1.09375 10.6562 1.65625 11.0938 2.375C11.5312 3.125 11.75 3.90625 11.75 4.75V7H12.5ZM8.25 12.25V10.75C8.25 10.4062 8.125 10.125 7.875 9.875C7.625 9.625 7.34375 9.5 7 9.5C6.625 9.5 6.34375 9.625 6.09375 9.875C5.84375 10.125 5.75 10.4062 5.75 10.75V12.25C5.75 12.625 5.84375 12.9062 6.09375 13.1562C6.34375 13.4062 6.625 13.5 7 13.5C7.34375 13.5 7.625 13.4062 7.875 13.1562C8.125 12.9062 8.25 12.625 8.25 12.25ZM9.25 7V4.75C9.25 4.125 9.03125 3.59375 8.59375 3.15625C8.15625 2.71875 7.625 2.5 7 2.5C6.375 2.5 5.84375 2.71875 5.40625 3.15625C4.96875 3.59375 4.75 4.125 4.75 4.75V7H9.25Z"></path>
                            </svg>
                        </span>
                        <span>SSL Secure Payment</span>
                    </div>
                    <div>
                        You will be charged <p>{order.gig.price}$</p>. Total amount includes currency conversion fees.
                    </div>

                </section>
            </div> */}
        </main>
    )
}