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
            <div className='item'>
              <h2>Card Number</h2>
              <Field
                as={TextField}
                // label="CardNumber"
                variant="outlined"
                type="number"
                name="cardnumber"
                margin="normal"
                inputProps={{ min: 1 }}
                error={touched.cardnumber && !!errors.cardnumber}
                helperText={touched.cardnumber && errors.cardnumber}
                onChange={handleChange}
                value={values.cardnumber}
              />
            </div>
            <div className='form-center'>
            <div className='item'>                <h2>Expiration Date</h2>
                <Field
                  as={TextField}
                  // label="ExpirationDate"
                  variant="outlined"
                  type="number"
                  name="expirationdate"
                  margin="normal"
                  inputProps={{ min: 1 }}
                  error={touched.expirationdate && !!errors.expirationdate}
                  helperText={touched.expirationdate && errors.expirationdate}
                  onChange={handleChange}
                  value={values.expirationdate}
                />
              </div>


              <div className='item'>                <h2>Security Code</h2>
                <Field
                  as={TextField}
                  // label="SecurityCode"
                  variant="outlined"
                  type="number"
                  name="securitycode"
                  margin="normal"
                  inputProps={{ min: 1 }}
                  error={touched.securitycode && !!errors.securitycode}
                  helperText={touched.securitycode && errors.securitycode}
                  onChange={handleChange}
                  value={values.securitycode}
                />
              </div>

            </div>
            <div className='item'>              <h2>Card holder's name</h2>
              <Field
                as={TextField}
                // label="Cardholder's name"
                variant="outlined"
                name="name"
                margin="normal"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                onChange={handleChange}
                value={values.name}
              />
            </div>

          </Form>
        )}
      </Formik>
    </section>
  )
}
