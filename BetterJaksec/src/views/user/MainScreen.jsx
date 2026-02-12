import React from 'react'
import { useNavigate } from 'react-router-dom'

const MainScreen = () => {
  const navigate = useNavigate();

  return (
  
    <div>
      <h1>MainScreen</h1>
      <button onClick={()=> {navigate("/login")}}>log out</button>
      <button onClick={()=> {navigate("/profile_page")}}>Profile</button>
      <button >Courses user (ei mitään vielä) </button>
      <button onClick={()=> {navigate("/courses")}}>Courses teacher</button>
      <button onClick={()=> {navigate("/admin")}}>Admin sivut tää poistuu</button>
      <button onClick={()=> {navigate("/admin_attendance_tracking")}}>Attendance stats</button>
      <button onClick={()=> {navigate("/attendance_view")}}>Attendance marking</button>
    </div>
  )
}

export default MainScreen