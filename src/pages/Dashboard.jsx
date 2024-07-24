import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { loadUser } from '../store/actions/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { loadOrders, updateOrderStatus } from '../store/actions/order.actions'
import { OrderList } from '../cmps/orderList'
import { ProfileProgress } from '../cmps/profileProgress'
import { Skeleton, ThemeProvider, createTheme } from '@mui/material'

export function Dashboard() {

  const params = useParams()
  const user = useSelector(storeState => storeState.userModule.watchedUser)
  const orders = useSelector(storeState => storeState.orderModule.orders)

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4caf50', // Corrected primary color
      },
      secondary: {
        main: '#76ff03', // Corrected secondary color
      },
    },
  })


  useEffect(() => {
    loadUser(params.id)
    loadOrders({ _userId: params.id })
  }, [params.id, orders])

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