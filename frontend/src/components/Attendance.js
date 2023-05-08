import React, { useState, useEffect, useRef } from 'react';
import { Button, Typography, Box } from '@mui/material';
import axios from "../api.js";
import { loadModels, recognizeFaces, createLabeledFaceDescriptors } from '../faceRecognition';
import backgroundImage from '../assets/Register.jpg';

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
    const findUserById = (id) => {
        return users.find(user => user.employeeID === id);
    };
    const markAttendance = async () => {
        const labeledFaceDescriptors = createLabeledFaceDescriptors(users);
        const results = await recognizeFaces(videoRef.current, labeledFaceDescriptors);
        console.log('Face detection results:', results);
        console.log('Video element:', videoRef.current);
        // Assuming a single face is detected
        if (results.length > 0 && results[0].toString() !== 'unknown') {
            const employeeID = results[0].label;
            const status = 'present';
            const user = findUserById(employeeID);
            axios.post('/users/attendance', { employeeID, status })
                .then(() => {
                    alert(`Attendance marked for Employee ID: ${employeeID}, Name: ${user.name}`);
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
        <Box
            sx={{
                height: '90vh',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                }}
            >
                <Typography variant="h4" gutterBottom color="white" sx={{
                    textShadow: '2px 2px black',
                    marginBottom: '1rem',
                }}>
                    Mark Attendance
                </Typography>
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
                        onClick={markAttendance}
                        variant="contained"
                        sx={{
                            ml: 2,
                            backgroundColor: 'white',
                            color: 'black',
                            '&:hover': {
                                backgroundColor: 'white',
                                color: 'black',
                            },
                        }}
                    >
                        Mark Attendance
                    </Button>
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
                        width="630"
                        height="430"
                        style={{ border: '1px dashed white' }}
                    />
                </Box>
            </Box>
            <Box
                component="img"
                src={backgroundImage}
                alt="Background"
                sx={{
                    width: '50%',
                    objectFit: 'cover',
                    height: '90vh',
                }}
            />
        </Box>
    );
};

export default Attendance;


