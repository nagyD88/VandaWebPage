import React from 'react';
import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../hooks/api';
import decode from 'jwt-claims';
import { LevelType } from '../model/LevelType';


const Login = () => {
  const { setAuth, auth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [email, setUser] = useState('');
  const [password, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/Auth/login', {
        password: password,
        email: email,
      });
      
      const admin: boolean =
        'True' ==
        decode(response?.data)[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];
      const id: number = decode(response?.data)[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];
      const levels: LevelType[] = JSON.parse(
        decode(response?.data)[
          'http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor'
        ]
      );
      setAuth({ user: email, admin: admin, id: id, levels: levels });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });


      
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current?.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="./">Go to Home</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className='text-[#faebd7]'>e-mail:</label>
            <input
              type="text"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={password}
              required
            />
            <button className='duration-500 hover:transition-colors hover:duration-500 hover:bg-slate-400 hover:text-white'>Sign In</button>
          </form>
          <p className='text-white'>
            Need an Account?</p>
            <span className="line">
              <a href="/Register" className='text-white font-semibold'>Sign Up</a>
            </span>
          
        </section>
      )}
    </>
  );
};

export default Login;
