import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { addOrder } from '../store/actions/order.actions'

export function CheckoutForm({ order }) {
  const navigate = useNavigate()
  const GigSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(30, 'Too Long!'),
  })

  async function onSubmit(values, { setSubmitting }) {
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

  return (
    <section className="card-pay">

      <Formik
        enableReinitialize
        initialValues={order.gig}
        validationSchema={GigSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, values, handleChange, setFieldValue }) => (
          <Form>


            <h2>Card Number</h2>
            <div className="card-number">
              <span><img src="https://thenorthface.co.il/wp-content/uploads/2023/02/payment-icon.png" style={{ width: '26px', height: '28px' }} /></span>
              <input
                type="text"
                onChange={handleChange}
                value="4580 5926 2262 7546"
                name="cardnumber"
                className={`input ${touched.cardnumber && errors.cardnumber ? 'error' : ''}`}
              />
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNCAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuNSA3QzEyLjkwNjIgNyAxMy4yNSA3LjE1NjI1IDEzLjU2MjUgNy40Mzc1QzEzLjg0MzggNy43NSAxNCA4LjA5Mzc1IDE0IDguNVYxNC41QzE0IDE0LjkzNzUgMTMuODQzOCAxNS4yODEyIDEzLjU2MjUgMTUuNTYyNUMxMy4yNSAxNS44NzUgMTIuOTA2MiAxNiAxMi41IDE2SDEuNUMxLjA2MjUgMTYgMC43MTg3NSAxNS44NzUgMC40Mzc1IDE1LjU2MjVDMC4xMjUgMTUuMjgxMiAwIDE0LjkzNzUgMCAxNC41VjguNUMwIDguMDkzNzUgMC4xMjUgNy43NSAwLjQzNzUgNy40Mzc1QzAuNzE4NzUgNy4xNTYyNSAxLjA2MjUgNyAxLjUgN0gyLjI1VjQuNzVDMi4yNSAzLjkwNjI1IDIuNDM3NSAzLjEyNSAyLjg3NSAyLjM3NUMzLjMxMjUgMS42NTYyNSAzLjg3NSAxLjA5Mzc1IDQuNjI1IDAuNjU2MjVDNS4zNDM3NSAwLjIxODc1IDYuMTI1IDAgNyAwQzcuODQzNzUgMCA4LjYyNSAwLjIxODc1IDkuMzc1IDAuNjU2MjVDMTAuMDkzOCAxLjA5Mzc1IDEwLjY1NjIgMS42NTYyNSAxMS4wOTM4IDIuMzc1QzExLjUzMTIgMy4xMjUgMTEuNzUgMy45MDYyNSAxMS43NSA0Ljc1VjdIMTIuNVpNOC4yNSAxMi4yNVYxMC43NUM4LjI1IDEwLjQwNjIgOC4xMjUgMTAuMTI1IDcuODc1IDkuODc1QzcuNjI1IDkuNjI1IDcuMzQzNzUgOS41IDcgOS41QzYuNjI1IDkuNSA2LjM0Mzc1IDkuNjI1IDYuMDkzNzUgOS44NzVDNS44NDM3NSAxMC4xMjUgNS43NSAxMC40MDYyIDUuNzUgMTAuNzVWMTIuMjVDNS43NSAxMi42MjUgNS44NDM3NSAxMi45MDYyIDYuMDkzNzUgMTMuMTU2MkM2LjM0Mzc1IDEzLjQwNjIgNi42MjUgMTMuNSA3IDEzLjVDNy4zNDM3NSAxMy41IDcuNjI1IDEzLjQwNjIgNy44NzUgMTMuMTU2MkM4LjEyNSAxMi45MDYyIDguMjUgMTIuNjI1IDguMjUgMTIuMjVaTTkuMjUgN1Y0Ljc1QzkuMjUgNC4xMjUgOS4wMzEyNSAzLjU5Mzc1IDguNTkzNzUgMy4xNTYyNUM4LjE1NjI1IDIuNzE4NzUgNy42MjUgMi41IDcgMi41QzYuMzc1IDIuNSA1Ljg0Mzc1IDIuNzE4NzUgNS40MDYyNSAzLjE1NjI1QzQuOTY4NzUgMy41OTM3NSA0Ljc1IDQuMTI1IDQuNzUgNC43NVY3SDkuMjVaIi8+PC9zdmc+" alt="" />
            </div>

            <div className='form-center'>
              <div className='item'>
                <h2>Expiration Date</h2>
                <input
                  type="text"
                  onChange={handleChange}
                  value="12 / 26"
                  name="cardnumber"
                  className={`input ${touched.cardnumber && errors.cardnumber ? 'error' : ''}`}
                />
              </div>

              <div className='item'>
                <h2>Security Code</h2>
                <input
                  type="text"
                  onChange={handleChange}
                  placeholder="CVV"
                  name="securityCode"
                  className={`input ${touched.securityCode && errors.securityCode ? 'error' : ''}`}
                  maxLength="3"
                  pattern="\d{3}"
                />
              </div>

            </div>


            <div className='item'>
              <h2>Card holder's name</h2>
              <input
                type="text"
                onChange={handleChange}
                placeholder='full name'
                name="cardnumber"
                className={`input ${touched.cardnumber && errors.cardnumber ? 'error' : ''}`}
              />
            </div>
            <div>
              <input className='saveCardCheckbox' type="checkbox" id="saveCardCheckbox" name="saveCardCheckbox" />
              <label htmlFor="saveCardCheckbox">Save this card for future payments</label>
            </div>

          </Form>
        )}
      </Formik>
    </section>
  )
}
