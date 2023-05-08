import React from 'react';
import { Button, Grid, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/Facial-Recognition.png';

const HomePage = () => {
    return (
        <Box
            sx={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '92vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
        >
            <Typography
                variant="h2"
                align="center"
                color="white"
                sx={{
                    textShadow: '2px 2px black',
                    marginBottom: '2rem',
                }}
            >
                FACIAL RECOGNITION SYSTEM
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                    <Button
                        component={Link}
                        to="/register"
                        size='large'
                        variant="contained"
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'white',
                                color: 'black',
                            },
                        }}
                    >
                        Register
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        component={Link}
                        to="/attendance"
                        variant="contained"
                        size='large'
                        sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'white',
                                color: 'black',
                            },
                        }}
                    >
                        Mark Attendance
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomePage;
