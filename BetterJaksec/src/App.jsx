import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import MainScreen from "./views/user/MainScreen";
import LogIn from "./views/LogIn";
import ProfilePage from "./views/user/ProfilePage";
import AttendanceView from "./views/user/AttendanceView";
import AttendanceTrackingView from "./views/user/AttendanceTrackingView";
import MainScreenAdmin from "./views/admin/MainScreenAdmin";
import ManageUsers from "./views/admin/ManageUsers";
import AdminView from "./views/admin/AdminView";
import AdminAttendanceTrackingView from "./views/admin/AdminAttendanceTrackingView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<MainScreen />} />
        <Route path="/profile_page" element={<ProfilePage />} />
        <Route path="/attendance_view" element={<AttendanceView />} />
        <Route
          path="/attendance_tracking"
          element={<AttendanceTrackingView />}
        />
        {/* Admin routing here */}
        <Route path="/admin" element={<AdminView />}>
          <Route index element={<MainScreenAdmin />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
        <Route
          path="/admin_attendance_tracking"
          element={<AdminAttendanceTrackingView />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
