
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'order'

export const orderService = {
    query,
    getById,
    save,
    remove,
    addOrderMsg
}
window.cs = orderService


async function query(filterBy = { txt: '', _userId: '' }) {
    var orders = await storageService.query(STORAGE_KEY)
    const { txt, _userId } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        orders = orders.filter(order => regex.test(order.txt) || regex.test(order.txt))
    }
    if (_userId) {
        orders = orders.filter(order => order.seller._id === _userId)
    }

    return orders
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await storageService.put(STORAGE_KEY, order)
    } else {
        const orderToSave = {
            // buyer: userService.getLoggedinUser(),
            seller: order.seller,
            gig: order.gig,
            status: order.status,
            // Later, owner is set by the backend

        }
        savedOrder = await storageService.post(STORAGE_KEY, orderToSave)
    }
    return savedOrder
}

async function addOrderMsg(orderId, txt) {
    // Later, this is all done by the backend
    const order = await getById(orderId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    order.msgs.push(msg)
    await storageService.put(STORAGE_KEY, order)

    return msg
}