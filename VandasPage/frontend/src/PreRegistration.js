import React from 'react';
import { useState } from 'react';
import api from './hooks/api';
import { useContext } from 'react';
import DataContext from './dataContext/dataContext';

const email_Regex = new RegExp(
  "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
);
const PreRegistration = () => {
  const { colorTheme } = useContext(DataContext);
  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [admin, setAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailValidation(email_Regex.test(email));
    if (!emailValidation) {
      console.log('Invalid Entry');
      return;
    }
    console.log('email', email);
    console.log('admin', admin);
    console.log('firstName', firstName);
    console.log('lastName', lastName);
    const response = await api.post('/user', {
      email: `${email}`,
      admin: admin,
      firstName: `${firstName}`,
      lastName: `${lastName}`,
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
              value={admin}
              onChange={(e) => setAdmin(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" className="sub" />
        </form>
      </div>
    </>
  );
};

export default PreRegistration;
