import React, { useState, useEffect, useRef } from 'react';
import { Button, Container, Typography } from '@mui/material';
import axios from "../api.js";
import { loadModels, recognizeFaces, createLabeledFaceDescriptors } from '../faceRecognition';

const Attendance = () => {
    const [users, setUsers] = useState([]);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        axios.get('/users/face-data')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(error);
                alert('Error fetching face data');
            });
    }, []);

    const startVideo = async () => {
        await loadModels();
        navigator.getUserMedia(
            { video: {} },
            (stream) => (videoRef.current.srcObject = stream),
            (error) => console.error(error)
        );
    };

    const markAttendance = async () => {
        const labeledFaceDescriptors = createLabeledFaceDescriptors(users);
        const results = await recognizeFaces(videoRef.current, labeledFaceDescriptors);

        // Assuming a single face is detected
        if (results.length > 0 && results[0].toString() !== 'unknown') {
            const employeeID = results[0].label;
            const status = 'present';
            axios.post('/users/attendance', { employeeID, status })
                .then(() => {
                    alert(`Attendance marked for Employee ID: ${employeeID}`);
                })
                .catch((error) => {
                    console.error(error);
                    alert('Error marking attendance');
                });
        } else {
            alert('No face detected or face not recognized. Please try again');
        }
    };

    return (
        <Container>
            <Typography variant="h4">Mark Attendance</Typography>
            <Button onClick={startVideo} variant="contained" sx={{ mt: 2 }}>
                Start Video
            </Button>
            <Button onClick={markAttendance} variant="contained" sx={{ mt: 2, ml: 2 }}>
                Mark Attendance
            </Button>
            <video ref={videoRef} autoPlay muted width="720" height="560" />
        </Container>
    );
};

export default Attendance;

