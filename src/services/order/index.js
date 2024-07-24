const { DEV, VITE_LOCAL } = import.meta.env
import { getRandomIntInclusive, makeId } from '../util.service'

import { orderService as local } from './order.service.local'
import { orderService as remote } from './order.service.remote'

function getEmptyOrder() {
    return {
        vendor: makeId(),
        price: getRandomIntInclusive(1000, 9000),
        speed: getRandomIntInclusive(80, 240),
        msgs: [],
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        maxPrice: '',
        minSpeed: '',
        sortField: '',
        sortDir: '',
        // pageIdx: 0
    }
}

function _countOrderStatuses(orders) {
    return orders.reduce((accumulator, order) => {
        if (order.status in accumulator) {
            accumulator[order.status]++
        } else {
            accumulator[order.status] = 1
        }
        return accumulator
    }, { pending: 0, rejected: 0, completed: 0 })
}

function getOrderStats(orders) {
    const orderStatusSummary = _countOrderStatuses(orders)

    const responseRate = ((orderStatusSummary.pending + orderStatusSummary.completed) / orders.length) * 100
    const ordersCompleted = (orderStatusSummary.completed / (orders.length - orderStatusSummary.rejected)) * 100

    return {
        responseRate: responseRate,
        ordersCompleted: ordersCompleted
    }
}


function getOrder(gig) {
    const order = {
        seller: {
            _id: gig.owner._id,
            fullname: gig.owner.fullname,
            imgUrl: gig.owner.imgUrl
        },
        gig: {
            _id: gig._id,
            name: gig.title,
            imgUrl: gig.imgUrls[0],
            price: gig.price
        },
        status: 'pending',
    }
    return order
}

const service = VITE_LOCAL === 'true' ? local : remote
export const orderService = { getEmptyOrder, getDefaultFilter, getOrder, getOrderStats, ...service }






























//* Easy access to this service from the dev tools console
//* when using script - dev / dev:local

if (DEV) window.orderService = orderService
