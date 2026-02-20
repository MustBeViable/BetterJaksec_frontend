import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStudentHook from "../../hooks/StudentHooks";
import useTeacherHook from "../../hooks/TeacherHooks";
import useEmailHook from "../../hooks/EmailHooks";

const NewUser = () => {
  const navigate = useNavigate();
  const schoolEmail = "metropolia.fi";
  const [newEmailChange, setNewEmailChange] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("teacher");
  const { postStudent } = useStudentHook();
  const { postTeacher } = useTeacherHook();
  const { checkEmail } = useEmailHook();

  const handlePost = async () => {
    let emailAvailable = await checkEmail(email);
    if (!emailAvailable) return console.log("API connection error");
    if (!emailAvailable.isAvailable) {
      let newEmail;
      let index = 1;
      do {
        newEmail = `${firstName}${index}.${lastName}@${schoolEmail}`;
        emailAvailable = await checkEmail(newEmail);
        if (emailAvailable.isAvailable) {
          setEmail(newEmail);
          setNewEmailChange(!setNewEmailChange);
          window.alert(`User new email: ${newEmail}`);
          return;
        }
      } while (!emailAvailable.isAvailable);
    }
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
      let email = `${firstName}.${lastName}@${schoolEmail}`;
      setEmail(email);
    };
    generateEmail();
  }, [firstName, lastName, newEmailChange]);

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
