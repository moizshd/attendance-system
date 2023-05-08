import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Register from './components/Register';
import Attendance from './components/Attendance';
import CustomAppBar from './components/CustomAppBar';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div>
        <CustomAppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
