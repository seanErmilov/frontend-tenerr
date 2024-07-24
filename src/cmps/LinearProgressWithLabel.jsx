import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

function LinearProgressWithLabel(props) {
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


    return (
        // <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} sx={{ color: '#1dbf73' }} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
        // </ThemeProvider >
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

export function LinearWithValueLabel({ props }) {


    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={props} />
        </Box>
    );
}