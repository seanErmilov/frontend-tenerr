import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useState } from 'react'

export function StatusSelect({ status, onStatusSelect, orderId }) {
    const [statusToEdit, setStatusToEdit] = useState(status)

    function handleChange(event) {
        setStatusToEdit(event.target.value)
        if (handleChange) {
            onStatusSelect(event.target.value, orderId)
        }
    }

    const statusColors = {
        pending: '#efab00',  // Soft yellow
        completed: '#007313', // Soft green
        rejected: '#ef2000'  // Soft red
    }

    const selectColor = statusColors[statusToEdit]

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                {/* <InputLabel id="status-select-label">Status</InputLabel> */}
                <Select
                    labelId="status-select-label"
                    id="status-select"
                    value={statusToEdit}
                    // label="Status"
                    onChange={handleChange}
                    sx={{ color: selectColor }} // Dynamic color
                >
                    <MenuItem sx={{ color: '#efab00' }} value={'pending'}>In progress</MenuItem>
                    <MenuItem sx={{ color: '#007313' }} value={'completed'}>Completed</MenuItem>
                    <MenuItem sx={{ color: '#ef2000' }} value={'rejected'}>Rejected</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
