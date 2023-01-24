import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../hooks/api';
import decode from 'jwt-claims';

const Login = () => {
  const { setAuth, auth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [email, setUser] = useState('');
  const [password, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
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
      console.log(response);
      


      const admin = "True"==decode(response?.data)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      const id = decode(response?.data)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      const levels = JSON.parse(decode(response?.data)['http://schemas.xmlsoap.org/ws/2009/09/identity/claims/actor']);
      setAuth({ user: email, pwd: password, admin: admin, id: id, levels: levels});
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
      console.log(response.data)
      console.log(admin);
      console.log(id);
      console.log(levels);

      console.log(auth);
      
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
      errRef.current.focus();
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
            <label htmlFor="email">e-mail:</label>
            <input
              type="text"
              id="username"
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
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <a href="/Register">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
