import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import MainScreen from "./views/MainScreen";
import LogIn from "./views/LogIn";
import ProfilePage from "./views/ProfilePage";
import AttendanceView from "./views/AttendanceView";
import AttendanceTrackingView from "./views/AttendanceTrackingView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<MainScreen />} />
        <Route path="/profile_page" element={<ProfilePage />} />
        <Route path="/attemdance_view" element={<AttendanceView />} />
        <Route
          path="/attendance_tracking"
          element={<AttendanceTrackingView />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
