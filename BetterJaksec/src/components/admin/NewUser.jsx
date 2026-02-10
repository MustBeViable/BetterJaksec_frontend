import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const navigate = useNavigate();
  const schoolEmail = "metropolia.fi";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(()=> {
    /*
    api call here and add it to the submit button down
    */
  })

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
      <form action="">
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
