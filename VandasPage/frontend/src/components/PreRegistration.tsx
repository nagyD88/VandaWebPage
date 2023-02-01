import React from "react";
import { useState } from "react";
import api from "../hooks/api";
import { useContext } from "react";
import DataContext from "../context/dataContext";
import { useQuery, useMutation, useQueryClient } from "react-query"


const EMAIL_REGEX =
  /^[a-zA-Z0-9][a-zA-Z0-9!#$%&'*+-/=?^_`{|]{0,63}@[a-zA-Z0-9-.]{0,253}.(com|net|org|hu)$/;

const PreRegistration = () => {
  const { colorTheme } = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [emailValidation, setEmailValidation] = useState(true);
  const [registered, setRegistered] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [admin, setAdmin] = useState(false);
  const queryClient = useQueryClient()

  const postUser = async () => 
    await api.post("/user", {
      email: email,
      admin: admin,
      firstName: firstName,
      lastName: lastName,
    });

  const postUserMutation = useMutation(postUser, {
    onSuccess: () => {
        // Invalidates cache and refetch 
        queryClient.invalidateQueries('Users')
    }
})
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(EMAIL_REGEX.test(email)){
      setEmailValidation(true);
      postUserMutation.mutate();
      setRegistered(true);
    }
  }


  return (
    <>
      <div className={`preReg ${colorTheme}`}>
        <form onSubmit={handleSubmit} className="preRegForm">
          <label>
            Vezeték Név:
            <input
              id="lastName"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          <label>
            Kereszt Név:
            <input
              id="firstName"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <label>
            e-mail:
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {!registered && <p>This email is already registered.</p>}
          {!emailValidation && <p>Invalid email</p>}

          <label>
            Admin:
            <input
              id="admin"
              type="checkbox"
              checked={admin}
              onChange={(e) => setAdmin(e.target.checked)}
            />
          </label>
          <input type="submit" value="Submit" className="sub" />
        </form>
      </div>
    </>
  );
};

export default PreRegistration;
