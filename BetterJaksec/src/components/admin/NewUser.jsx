import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStudentHook from "../../hooks/StudentHooks";
import useTeacherHook from "../../hooks/TeacherHooks";

const NewUser = () => {
  const navigate = useNavigate();
  const schoolEmail = "metropolia.fi";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("teacher");
  const { postStudent } = useStudentHook();
  const { postTeacher } = useTeacherHook();

  const handlePost = async () => {
    if (role === "teacher" || role === "admin") {
      const teacher = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        isAdmin: role === "admin" ? true : false,
      };
      const success = await postTeacher(teacher);
      return success;
    }
    const student = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    const success = await postStudent(student);
    return success;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const ok = await handlePost();
    if (ok) navigate("/admin/users");
  };

  useEffect(() => {
    const generateEmail = () => {
      if (firstName.trim() === "") {
        return;
      }
      if (lastName.trim() === "") {
        return;
      }
      //add email checking for DB here
      let email = `${firstName}.${lastName}@${schoolEmail}`;
      /* esim jtn tämmöstä (index voi tulla db esim tms)
        if (!validEmail) {
            email = `${firstName}${index}.${lastName}@${schoolEmail}`
            checkEmailMethod(email);
        }
        */
      setEmail(email);
    };
    generateEmail();
  }, [firstName, lastName]);

  return (
    <div>
      <h1>New user</h1>
      <form onSubmit={onSubmit}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="newUserFirstName">First name: </label>
          <input
            type="text"
            id="newUserFirstName"
            value={firstName}
            onChange={(evt) => {
              setFirstName(evt.target.value);
            }}
          />
          <label htmlFor="newUserLastName">Last name: </label>
          <input
            type="text"
            id="newUserLastName"
            value={lastName}
            onChange={(evt) => {
              setLastName(evt.target.value);
            }}
          />
          <label htmlFor="role">Select role: </label>
          <select
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          <label htmlFor="newUserEmail">Generated email: </label>
          <input
            type="email"
            id="newUserEmail"
            value={email}
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
          />
        </div>
        <button type="submit">Add user</button>
        <button
          onClick={() => {
            navigate("/admin/users");
          }}
        >
          Return
        </button>
      </form>
    </div>
  );
};

export default NewUser;
