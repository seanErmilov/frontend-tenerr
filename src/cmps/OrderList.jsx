// react tools
import { useEffect, useState, useRef } from 'react'

//store
import { updateOrderStatus } from '../store/actions/order.actions'


export function OrderList({ orders }) {
    const [showStatusOptions, setShowStatusOptions] = useState(null)

    function onOpenStatusOptions(orderId) {
        if (!showStatusOptions) {
            setShowStatusOptions(orderId)
        }

        else {
            setShowStatusOptions(null)
        }
    }

    function openChangeStatus(e) {
        updateOrderStatus(e.currentTarget.dataset.orderid, e.currentTarget.dataset.value)

    }

    // }

    // function createData(fullname, buyerImg, title, price, status, _id) {
    //     return { fullname, buyerImg, title, price, status, _id }
    // }
    // console.log("Orders: ", orders)
    // const rows = orders.map(order => {
    //     return createData(order.buyer.fullname, order.buyer.imgUrl, order.gig.name, order.gig.price, order.status, order._id)
    // })

    // const muiTheme = {
    //     text: {
    //         '& .MuiOutlinedInput-root': {
    //             '&.Mui-focused fieldset': {
    //                 borderColor: '#52b69a',
    //             },
    //         },
    //         '& .MuiInputLabel-root.Mui-focused': {
    //             color: '#ffd56b',
    //         },
    //     },
    //     select: {
    //         '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    //             borderColor: '#52b69a',
    //         },
    //     },
    //     button: {
    //         color: 'black',
    //         backgroundColor: '#ffd56b',
    //         '&:hover': {
    //             backgroundColor: '#52b69a',
    //         },
    //     },
    //     checkbox: {
    //         color: '#52b69a',
    //         '&.Mui-checked': {
    //             color: '#52b69a',
    //         },
    //     },
    // }

    return (
        <section className='dashboard-orders'>
            <h3>Manage Orders</h3>

            {/* main table of orders */}
            <ul className='orders-list'>
                <li key="buyer" className='list-header'>BUYER</li>
                <li key="gig" className='list-header'>GIG</li>
                <li key="total" className='list-header'>TOTAL</li>
                <li key="status" className='list-header'>STATUS</li>
                {orders.map(order =>
                    [<li className="buyer-img" key={`img-${order._id}`} title={order.buyer.fullname}><img src={order.buyer.imgUrl} alt="" /></li>,
                    <li className="gig-name" key={`name-${order._id}`}>{order.gig.name}</li>,
                    <li className="gig-price" key={`price-${order._id}`}>${order.gig.price}</li>,
                    <li
                        className="gig-status"
                        title='Click to change'
                        key={`status-${order._id}`}
                        onClick={() => onOpenStatusOptions(order._id)}>
                        <button className={`${order.status} btn-like selected`}>{order.status}
                            <div className={`change-status ${showStatusOptions === order._id ? 'full-width' : ''}`}>
                                {['pending', 'completed', 'rejected'].map(status => {
                                    if (order.status !== status) {
                                        return (
                                            <div key={status} className={`${status} btn-like`} data-value={status} data-orderid={order._id} onClick={openChangeStatus}>
                                                {status}
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </button>
                    </li>
                    ]
                )}
            </ul>

            {/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Buyer</TableCell>
                            <TableCell align="left" className="title-column" >Gig</TableCell>
                            <TableCell align="left">Total</TableCell>
                            <TableCell align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align='left'>
                                    <Avatar alt="Remy Sharp" src={row.buyerImg} />
                                    {row.fullname}
                                </TableCell>
                                <td className="title-column" style={{ borderBottom: '1px solid #ddd', padding: '8px' }} align="left">{row.title}</td>
                                <TableCell className='total' align="left">${row.price}</TableCell>
                                <TableCell className='status' align="left"><StatusSelect sx={muiTheme} onStatusSelect={onStatusSelect} status={row.status} orderId={row._id} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </section>


    )
}