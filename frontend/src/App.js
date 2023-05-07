import logo from './logo.svg';
import './App.css';
import { Container, AppBar, Typography, Box } from '@mui/material';
import Register from './components/Register';
import Attendance from './components/Attendance';
function App() {
  return (
    <Container>
      <AppBar position="static">
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">MERN Attendance System</Typography>
        </Box>
      </AppBar>
      <Register />
      <Attendance />
    </Container>
  );
}

export default App;
