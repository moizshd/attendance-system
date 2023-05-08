import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Attendance from "./components/Attendance";
import CustomAppBar from "./components/CustomAppBar";
import HomePage from "./components/HomePage";
import ViewAttendance from "./components/ViewAttendance";

function App() {
  return (
    <Router>
      <div>
        <CustomAppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/view-attendance" element={<ViewAttendance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
