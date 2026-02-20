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
import NewUser from "./components/admin/NewUser";
import AdminAttendanceTrackingView from "./views/admin/AdminAttendanceTrackingView";
import CoursesView from "./views/user/CoursesView";
import ManageCourses from "./views/user/ManageCourses";
import { UserProvider } from "./contexts/UserContext.jsx";
import ManageLessons from "./views/user/ManageLessons";

function App() {
  return (
    <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<MainScreen />} />
        <Route path="/profile_page" element={<ProfilePage />} />
        <Route path="/attendance_view" element={<AttendanceView />} />
        <Route
          path="/attendance_tracking"
          element={<AttendanceTrackingView />}
        />
        <Route path="/courses" element={<CoursesView />} />
        <Route path="/courses/manage" element={<ManageCourses />} />
        <Route path="/courses/manage/manage_lessons" element={<ManageLessons />} />
        {/* Admin routing here */}
        <Route path="/admin" element={<AdminView />}>
          <Route index element={<MainScreenAdmin />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="new_user" element={<NewUser />} />
        </Route>
        <Route
          path="/admin_attendance_tracking"
          element={<AdminAttendanceTrackingView />}
        />
      </Routes>
      </UserProvider>
    </BrowserRouter>

  );
}

export default App;
