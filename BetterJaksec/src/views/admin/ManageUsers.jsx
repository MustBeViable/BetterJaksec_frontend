import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserManageButtonAdmin from "../../components/admin/UserManageButtonAdmin";
import UserManageCard from "../../components/admin/UserManageCard";

const ManageUsers = () => {
  //dummy data
  const dummyProps = useMemo(() => {
    const arr = [];
    const length = 100;

    for (let i = 0; i < length; i++) {
      let user;

      if (i % 10 === 0) {
        user = { id: i, name: `filterTest${i}`, role: "admin" };
      } else if (i % 2 === 0 && i % 10 != 0) {
        user = { id: i, name: `name${i}`, role: "student" };
      } else {
        user = { id: i, name: `name${i}`, role: "teacher" };
      }
      arr.push(user);
    }
    return arr;
  }, []);

  const navigate = useNavigate();
  const [userList, setUserList] = useState(dummyProps);
  const [filteredUserList, setFilteredUserList] = useState(dummyProps);
  const [keyword, setKeyword] = useState("");
  const [selectedUser, setSelectedUser] = useState();

  const filterList = (list, keyword) => {
    const word = keyword.trim().toLowerCase();
    if (!word) return list;
    return list.filter((user) => user.name.toLowerCase().includes(word));
  };

  //initial render. API call here
  useEffect(() => {
    const handleList = async () => {
      setUserList(dummyProps);
      setFilteredUserList(dummyProps);
    };
    handleList();
  }, []);

  //filtering render
  useEffect(() => {
    const handleFiltering = () => {
      const newArray = filterList(userList, keyword);
      setFilteredUserList(newArray);
    };
    handleFiltering();
  }, [keyword]);

  useEffect(() => {}, [selectedUser]);

  return (
    <div>
      {selectedUser && (
        <UserManageCard user={selectedUser} setSelectedUser={setSelectedUser} />
      )}

      {!selectedUser && (
        <>
          <h1>ManageUsers</h1>
          <button onClick={() => {navigate("/admin/new_user")}}>Add users</button>
          <label htmlFor="usersearch">Search by name:</label>
          <input
            type="text"
            id="usersearch"
            value={keyword}
            onChange={(evt) => {
              setKeyword(evt.target.value);
            }}
          />
          <div
            style={{
              backgroundColor: "white",
              minHeight: "100px",
              minWidth: "100px",
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "12px",
            }}
          >
            {filteredUserList.map((user) => {
              return (
                <div
                  key={user.id}
                  style={{
                    borderRadius: 10,
                    backgroundColor: "yellow",
                    color: "black",
                    margin: 1,
                    padding: 1,
                  }}
                >
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
