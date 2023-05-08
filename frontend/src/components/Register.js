import React, { useState, useRef } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Paper,
    Grid
} from '@mui/material';
import axios from '../api.js';
import * as faceapi from 'face-api.js';
import { loadModels, recognizeFaces, createLabeledFaceDescriptors } from '../faceRecognition';
import backgroundImage from '../assets/Blackk.jpg';

const Register = () => {
    const [name, setName] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const startVideo = async () => {
        await loadModels();
        navigator.getUserMedia(
            { video: {} },
            (stream) => (videoRef.current.srcObject = stream),
            (error) => console.error(error)
        );
    };

    const captureFaceData = async () => {
        const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.4 });
        const detections = await faceapi.detectAllFaces(videoRef.current, options).withFaceLandmarks().withFaceDescriptors();

        console.log('Face detection results:', detections);
        console.log('Video element:', videoRef.current);

        if (detections.length > 0) {
            const faceData = Array.from(detections[0].descriptor);
            axios.post('/users/register', { employeeID, name, faceData })
                .then(() => {
                    alert('User registered successfully');
                })
                .catch((error) => {
                    console.error(error);
                    alert('Error registering user');
                });
        } else {
            alert('No face detected. Please try again');
        }
    };

    return (
        <Box
            sx={{
                height: '90vh',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                background: ` url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                    marginLeft: 'auto',
                }}
            >
                <Typography variant="h4" gutterBottom color="white" sx={{
                    textShadow: '2px 2px black',
                    marginBottom: '2rem',
                }}>
                    User Registration
                </Typography>
                <Box component="form">
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                margin="normal"
                                sx={{
                                    mt: 0,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                }}
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{ style: { color: 'white' } }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                label="Employee ID"
                                value={employeeID}
                                onChange={(e) => setEmployeeID(e.target.value)}
                                fullWidth
                                margin="normal"

                                sx={{
                                    mt: 0,
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                }}
                                InputLabelProps={{ style: { color: 'white' } }}
                                InputProps={{ style: { color: 'white' } }}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>

                    <Box
                        sx={{
                            mt: 1,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            onClick={startVideo}
                            variant="contained"
                            sx={{
                                backgroundColor: 'white',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    color: 'black',
                                },
                            }}
                        >
                            Start Video
                        </Button>
                        <Button
                            onClick={captureFaceData}
                            variant="contained"
                            sx={{
                                ml: 2, backgroundColor: 'white',
                                color: 'black',
                                '&:hover': {
                                    backgroundColor: 'white',
                                    color: 'black',
                                },
                            }}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 2,

                    }}
                >
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        width="530"
                        height="370"
                        style={{ border: '1px dashed white' }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Register;