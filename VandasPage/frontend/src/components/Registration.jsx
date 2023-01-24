import {
    useRef as UseRef,
    useState as UseState,
    useEffect as UseEffect,
  } from 'react';
  import {
    faCheck,
    faTimes,
    faInfoCircle,
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './register.css';
  
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  
  const register = () => {
    const UserRef = UseRef();
    const errRef = UseRef();
  
    const [user, setUser] = UseState('');
    const [validName, setValidName] = UseState(false);
    const [userFocus, setUserFocus] = UseState(false);
  
    const [pwd, setPwd] = UseState('');
    const [validPwd, setValidPwd] = UseState(false);
    const [pwdFocus, setPwdFocus] = UseState(false);
  
    const [matchPwd, setMatchPwd] = UseState('');
    const [validMatch, setValidMatch] = UseState(false);
    const [matchFocus, setMatchFocus] = UseState(false);
  
    const [errMsg, setErrMsg] = UseState('');
    const [success, setSuccess] = UseState(false);
  
    UseEffect(() => {
      UserRef.current.focus();
    }, []);
  
    UseEffect(() => {
      const result = USER_REGEX.test(user);
      console.log(result);
      console.log(user);
      setValidName(result);
    }, [user]);
  
    UseEffect(() => {
      const result = PWD_REGEX.test(pwd);
      console.log(result);
      console.log(pwd);
      setValidPwd(result);
      const match = pwd === matchPwd;
      setValidMatch(match);
    }, [pwd, matchPwd]);
  
    UseEffect(() => {
      setErrMsg('');
    }, [user, pwd, matchPwd]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const v1 = USER_REGEX.test(user);
      const v2 = PWD_REGEX.test(pwd);
      if (!v1 || !v2) {
        setErrMsg('Invalid Entry');
        return;
      }
      console.log(user, pwd);
      setSuccess(true);
    };
  
    return (
      <>
        {success ? (
          <section>
            <h1>Succes!</h1>
            <p>
              <a href="/login">Sing In</a>
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
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">
                Username:
                <span className={validName ? 'valid' : 'hide'}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={validName || !user ? 'hide' : 'invalid'}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="username"
                ref={UserRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName
                    ? 'instructions'
                    : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
  
              <label htmlFor="password">
                Password:
                <span className={validPwd ? 'valid' : 'hide'}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? 'false' : 'true'}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id="pwdnote"
                className={
                  pwdFocus && !validPwd ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number
                and a special character.
                <br />
                Allowed special characters:{' '}
                <span aria-label="exclamation mark">!</span>{' '}
                <span aria-label="at symbol">@</span>{' '}
                <span aria-label="hashtag">#</span>{' '}
                <span aria-label="dollar sign">$</span>{' '}
                <span aria-label="percent">%</span>
              </p>
  
              <label htmlFor="confirm_pwd">
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPwd ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    validMatch || !matchPwd ? 'hide' : 'invalid'
                  }
                />
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                aria-invalid={validMatch ? 'false' : 'true'}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch
                    ? 'instructions'
                    : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
  
              <button
                disabled={
                  !validName || !validPwd || !validMatch ? true : false
                }
              >
                Sign Up
              </button>
  
              <p>
                Already registered?
                <br />
                <span className="line">
                  <a href="Login">Sign In</a>
                </span>
              </p>
            </form>
          </section>
        )}
      </>
    );
  };
  
  export default register;