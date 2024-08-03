import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadUser } from '../store/actions/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { getCmdAddOrder, loadOrders, updateOrderStatus } from '../store/actions/order.actions'
import { OrderList } from '../cmps/orderList'
import { ProfileProgress } from '../cmps/profileProgress'
import { Skeleton, ThemeProvider, createTheme } from '@mui/material'
import { SOCKET_EVENT_ORDER_ADDED, socketService } from '../socket.service'

export function Dashboard() {

  const params = useParams()
  const orders = useSelector(storeState => storeState.orderModule.orders)

  const dispatch = useDispatch()

  useEffect(() => {
    loadUser(params.id)
    loadOrders({ _userId: params.id })

    socketService.on(SOCKET_EVENT_ORDER_ADDED, order => {
      console.log('GOT from socket', order)
      dispatch(getCmdAddOrder(order))
    })

    return () => {
      socketService.off(SOCKET_EVENT_ORDER_ADDED)
    }
  }, [params.id])

  return (
      <main className="dashboard">
        <section className='seller-profil'>
              <ProfileProgress orders={orders} />
          </section>
        <OrderList orders={orders} />
      </main >
  )
}