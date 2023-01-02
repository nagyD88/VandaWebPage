import React from 'react';
import { useState } from 'react';
import api from '../hooks/api';
import { useContext } from 'react';
import DataContext from '../dataContext/dataContext';


  var email_Regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const PreRegistration = () => {
  const { colorTheme } = useContext(DataContext);
  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [admin, setAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('email', email);
    console.log('admin', admin);
    console.log('firstName', firstName);
    console.log('lastName', lastName);
    const response = await api.post('/user', {
      email: email,
      admin: admin,
      firstName: firstName,
      lastName: lastName
    });
    console.log(response);
    
  };
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
