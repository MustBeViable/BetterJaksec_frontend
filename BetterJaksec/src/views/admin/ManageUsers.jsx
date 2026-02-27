import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserManageButtonAdmin from "../../components/admin/UserManageButtonAdmin";
import UserManageCard from "../../components/admin/UserManageCard";
import useTeacherHook from "../../hooks/TeacherHooks";
import useStudentHook from "../../hooks/StudentHooks";

const ManageUsers = () => {
  const {getTeacher} = useTeacherHook();
  const {getStudent} = useStudentHook();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [change, setChange] = useState(false);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedUser, setSelectedUser] = useState();

  const filterList = (list, keyword) => {
    const word = keyword.trim().toLowerCase();
    if (!word) return list;
    return list.filter((user) => user.name.toLowerCase().includes(word));
  };

  useEffect(() => {
    const handleList = async () => {
      const teachers = await getTeacher();
      const students = await getStudent();
      if (!teachers && !students) {
        window.alert("No teacher/student found")
      }
      const combined = [...teachers, ...students]
      setUserList(combined);
      setFilteredUserList(combined);
      if (change) setChange(false);
    };
    handleList();
  }, [change]);

  useEffect(() => {
    const handleFiltering = () => {
      const newArray = filterList(userList, keyword);
      setFilteredUserList(newArray);
    };
    handleFiltering();
  }, [keyword]);

  useEffect(() => {}, [selectedUser]);

  return (
    <div className="inner-card inner-card--stack">
      {selectedUser && (
        <UserManageCard user={selectedUser} setSelectedUser={setSelectedUser} setChange={setChange} />
      )}

      {!selectedUser && (
        <>
          <h1>ManageUsers</h1>
          <button className="btn btn--primary" onClick={() => {navigate("/admin/new_user")}}>Add users</button>
          <label htmlFor="usersearch">Search by name:</label>
          <input
            type="text"
            id="usersearch"
            value={keyword}
            onChange={(evt) => {
              setKeyword(evt.target.value);
            }}
          />
          <div className="inner-card inner-card--wrap">
            {filteredUserList?.map((user) => {
              return (
                <div key={user.firstName + user.id} className="inner-card">
                  <UserManageButtonAdmin
                    setSelectedUser={setSelectedUser}
                    user={user}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageUsers;