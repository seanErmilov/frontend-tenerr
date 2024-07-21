import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { gigService } from '../services/gig';
import { showSuccessMsg } from '../services/event-bus.service';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export function GigEdit() {
    const navigate = useNavigate()

    function onAddGig() {
        const title = prompt('Add title to gig')
        const price = +prompt('Add price to gig')
        const daystomake = +prompt('Add days to make')
        const tags = prompt('Add tags sperated by ,').split(',')

        const gigToEdit = { title, price, daystomake, tags }
        gigService.save(gigToEdit)
        navigate('/gig');
        showSuccessMsg('saved gig')
    }

    return (
        <main className="GigEdit">

            <Button onClick={onAddGig} variant="contained">
                Add gig</Button>
        </main>
    );
}
