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
import { ImgUploader } from '../cmps/ImgUploader'
import { addGig } from '../store/actions/gig.actions'

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
        addGig(values)
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
        <section className='main-container'>
            <div className="gig-edit">
                {/* <h2>{gigToEdit._id ? 'Edit' : 'Add'} Gig</h2> */}
                <Formik
                    enableReinitialize
                    initialValues={gigToEdit}
                    validationSchema={GigSchema}
                    onSubmit={onSaveGig}
                >
                    {({ errors, touched, values, handleChange, setFieldValue }) => (
                        <Form>
                            <div className='top-from'>
                                <label className='title'>
                                    <div>
                                        <h2>Gig Title</h2>
                                        <p>As your Gig storefront, your title is the most important place to include keywords that buyers would likely use to search for a service like yours.</p>
                                    </div>
                                    <Field
                                        as={TextField}
                                        label="Title"
                                        variant="outlined"
                                        name="title"
                                        required
                                        margin="normal"
                                        error={touched.title && !!errors.title}
                                        // helperText={touched.title && errors.title}
                                        onChange={handleChange}
                                        value={values.title}
                                    />
                                </label>

                                <label className='description'>
                                    <div>
                                        <h2>Description</h2>
                                        <p>Briefly Describe Your Gig</p>
                                    </div>
                                    <Field
                                        as={TextField}
                                        label="Description"
                                        variant="outlined"
                                        type="number"
                                        name="daysToMake"
                                        margin="normal"
                                        inputProps={{ min: 1 }}
                                        error={touched.daysToMake && !!errors.daysToMake}
                                        helperText={touched.daysToMake && errors.daysToMake}
                                        onChange={handleChange}
                                        value={values.daysToMake}
                                        multiline
                                        rows={8}
                                    />
                                </label>
                            </div>
                            <div className='bottom-form'>


                                <label className='day-to-complete'>
                                    <span>Days to Make
                                        <p>Days it will take you on average to finish this gig</p></span>
                                    <Field
                                        as={TextField}
                                        label="Day To complete"
                                        variant="outlined"
                                        type="number"
                                        name="daysToMake"
                                        margin="normal"
                                        inputProps={{ min: 1 }}
                                        error={touched.daysToMake && !!errors.daysToMake}
                                        helperText={touched.daysToMake && errors.daysToMake}
                                        onChange={handleChange}
                                        value={values.daysToMake}
                                    />
                                </label>

                                <label className='price'>
                                    <span>Price <p>Price you're offering for this gig</p>
                                    </span>
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
                                </label>

                                <label className='location'>
                                    <span>Location <p>What country are you from?</p></span>
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
                                </label>



                                <label className='categort'>
                                    <span>Category <p>Choose the category most suitable for your Gig.</p></span>
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
                                </label>

                                <div className='upload-images'>
                                    <span>Upload Images <p>Encourage buyers to choose your Gig by featuring a variety of your work.</p>
                                    </span>
                                    <label className='up-image'>
                                        <ImgUploader onUploaded={(url) => { values.imgUrls.unshift(url) }} />
                                    </label>
                                </div>
                            </div>


                        </Form>
                    )}
                </Formik>
                <div className='btn-form'>
                    <Button variant="contained" color="primary" type="submit">
                        cancel
                    </Button>

                    <Button variant="contained" color="primary" type="submit">
                        {gigToEdit._id ? 'Save' : 'Add'}
                    </Button>
                </div>
            </div>
        </section>
    )
}
