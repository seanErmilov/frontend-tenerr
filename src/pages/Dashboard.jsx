import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadUser } from '../store/actions/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { getCmdAddOrder, getCmdUpdateOrder, loadOrders, updateOrderStatus } from '../store/actions/order.actions'
import { OrderList } from '../cmps/orderList'
import { ProfileProgress } from '../cmps/profileProgress'
import { Skeleton, ThemeProvider, createTheme } from '@mui/material'
import { SOCKET_EVENT_ORDER_ADDED, socketService } from '../socket.service'

export function Dashboard() {

  const params = useParams()
  const orders = useSelector(storeState => storeState.orderModule.orders)
  const dispatch = useDispatch()

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4caf50', 
      },
      secondary: {
        main: '#76ff03',
      },
    },
  })


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

  function onStatusSelect(status, orderId) {
    updateOrderStatus(orderId, status)
  }

  function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch({ type: 'SET_WATCHED_USER', user })
  }

  return (
    <main className="Dashboard main-container-side-by-sidy">
      <ThemeProvider theme={theme}>
        <section className='seller-profile'>
          {orders.length ?
            <ProfileProgress orders={orders} /> :
            <Skeleton variant="rounded" />
          }
        </section>

        <section className='seller-orders'>
          <h3>Manage Orders</h3>
          <OrderList orders={orders} onStatusSelect={onStatusSelect} />
        </section>

      </ThemeProvider >
    </main >
  )
}