import React, { useState, useRef } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from '../api.js';
import { loadModels, recognizeFaces, createLabeledFaceDescriptors } from '../faceRecognition';

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
        const labeledFaceDescriptors = await createLabeledFaceDescriptors([]);
        const results = await recognizeFaces(videoRef.current, labeledFaceDescriptors);

        // Assuming a single face is detected
        if (results.length > 0) {
            const faceData = Array.from(results[0]._descriptor);
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
        <Container>
            <Typography variant="h4">User Registration</Typography>
            <Box component="form" sx={{ mt: 3 }}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Employee ID"
                    value={employeeID}
                    onChange={(e) => setEmployeeID(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button onClick={startVideo} variant="contained" sx={{ mt: 2 }}>
                    Start Video
                </Button>
                <Button onClick={captureFaceData} variant="contained" sx={{ mt: 2, ml: 2 }}>
                    Register
                </Button>
            </Box>
            <video ref={videoRef} autoPlay muted width="720" height="560" />
        </Container>
    );
};

export default Register;
