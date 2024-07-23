import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadUser } from '../store/actions/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { loadOrders, updateOrder, updateOrderStatus } from '../store/actions/order.actions'
import { OrderList } from '../cmps/orderList'

export function Dashboard() {

  const params = useParams()
  const user = useSelector(storeState => storeState.userModule.watchedUser)
  const orders = useSelector(storeState => storeState.orderModule.orders)

  useEffect(() => {
    loadUser(params.id)
    loadOrders({ _userId: params.id })
  }, [params.id])

  function onStatusSelect(status, orderId) {
    updateOrderStatus(orderId, status)
  }

  function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch({ type: 'SET_WATCHED_USER', user })
  }

  return (
    <main className="Dashboard">

      <h3>Manage Orders</h3>
      <OrderList orders={orders} onStatusSelect={onStatusSelect} />
    </main>
  )
}