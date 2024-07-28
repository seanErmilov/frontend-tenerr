import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { Await, useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig'
import { ImgUploader } from '../cmps/ImgUploader'
import { addGig } from '../store/actions/gig.actions'
import { addOrder } from '../store/actions/order.actions'
import { orderService } from '../services/order'

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
            <div className="card-number">
              <h2>Card Number</h2>
              <input
                type="text"
                onChange={handleChange}
                value="4580 5926 2262 7546"
                name="cardnumber"
                className={`input ${touched.cardnumber && errors.cardnumber ? 'error' : ''}`}
              />
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
                placeholder='cvv'
                name="cardnumber"
                className={`input ${touched.cardnumber && errors.cardnumber ? 'error' : ''}`}
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

          </Form>
        )}
      </Formik>
    </section>
  )
}
