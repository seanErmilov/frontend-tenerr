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
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { gigService } from '../services/gig'

export function GigEdit() {
    const [gigToEdit, setGigToEdit] = useState(gigService.getEmptyGig())

    const { gigId } = useParams()
    const navigate = useNavigate()

    const tags = gigService.getPrimeryTags()

    useEffect(() => {
        if (!gigId) return
        loadGig()
    }, [])

    function loadGig() {
        gigService
            .getById(gigId)
            .then(setGigToEdit)
            .catch(err => {
                console.log('Had issued in gig edit:', err)
                navigate('/gig')
                showErrorMsg('Gig not found!')
            })
    }

    const GigSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required')
            .min(2, 'Too Short!')
            .max(30, 'Too Long!'),
        description: Yup.string()
            .min(2, 'Too Short!')
            .max(200, 'Too Long!'),
        loc: Yup.string()
            .min(2, 'Too Short!')
            .max(15, 'Too Long!'),
        price: Yup.number()
            .min(1, 'Price must be at least 1'),
        dayToMake: Yup.number()
            .min(1, 'Day To Make must be at least 1'),
        tags: Yup.array().of(Yup.string()),
    })

    function onSaveGig(values, { setSubmitting }) {
        gigService.save(values)
            .then(() => {
                showSuccessMsg('Gig saved successfully')
                navigate('/gig')
            })
            .catch(err => {
                showErrorMsg('Cannot save gig')
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    return (
        <section className="gig-edit">
            <h2>{gigToEdit._id ? 'Edit' : 'Add'} Gig</h2>

            <Formik
                enableReinitialize
                initialValues={gigToEdit}
                validationSchema={GigSchema}
                onSubmit={onSaveGig}
            >
                {({ errors, touched, values, handleChange, setFieldValue }) => (
                    <Form>
                        <Field
                            as={TextField}
                            label="Title"
                            variant="outlined"
                            name="title"
                            required
                            margin="normal"
                            error={touched.title && !!errors.title}
                            helperText={touched.title && errors.title}
                            onChange={handleChange}
                            value={values.title}
                        />


                        <Field
                            as={TextField}
                            label="Price"
                            variant="outlined"
                            type="number"
                            name="price"
                            margin="normal"
                            inputProps={{ min: 1 }}
                            error={touched.price && !!errors.price}
                            helperText={touched.price && errors.price}
                            onChange={handleChange}
                            value={values.price}
                        />

                        <Field
                            as={TextField}
                            label="DayToMake"
                            variant="outlined"
                            type="number"
                            name="daytomake"
                            margin="normal"
                            inputProps={{ min: 1 }}
                            error={touched.daytomake && !!errors.daytomake}
                            helperText={touched.daytomake && errors.daytomake}
                            onChange={handleChange}
                            value={values.daytomake}
                        />

                        <Field
                            as={TextField}
                            label="Description"
                            variant="outlined"
                            name="description"
                            margin="normal"
                            error={touched.description && !!errors.description}
                            helperText={touched.description && errors.description}
                            onChange={handleChange}
                            value={values.description}
                        />

                        <Field
                            as={TextField}
                            label="Location"
                            variant="outlined"
                            name="loc"
                            margin="normal"
                            error={touched.loc && !!errors.loc}
                            helperText={touched.loc && errors.loc}
                            onChange={handleChange}
                            value={values.loc}
                        />

                        <FormControl margin="normal">
                            <InputLabel id="tags-tag">Tags</InputLabel>
                            <Select
                                multiple
                                labelId="tags-tag"
                                id="tags"
                                name="tags"
                                value={values.tags}
                                onChange={event => {
                                    setFieldValue('tags', event.target.value)
                                }}
                                renderValue={selected => selected.join(', ')}
                                style={{ minWidth: '250px' }}
                            >
                                {tags.map(tag => (
                                    <MenuItem key={tag} value={tag}>
                                        <Checkbox checked={values.tags.includes(tag)} />
                                        <ListItemText primary={tag} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button variant="contained" color="primary" type="submit">
                            {gigToEdit._id ? 'Save' : 'Add'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </section>
    )
}
