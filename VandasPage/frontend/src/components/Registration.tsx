import React from 'react';
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
import api from '../hooks/api';
import { useMutation, useQueryClient } from 'react-query';
  
  const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;
  
  const register = () => {
    const UserRef = UseRef<HTMLInputElement>(null);
    const errRef = UseRef<HTMLInputElement>(null);
    const [pwd, setPwd] = UseState('');
    const [validPwd, setValidPwd] = UseState(false);
    const [pwdFocus, setPwdFocus] = UseState(false);
  
    const [matchPwd, setMatchPwd] = UseState('');
    const [validMatch, setValidMatch] = UseState(false);
    const [matchFocus, setMatchFocus] = UseState(false);
  
    const [errMsg, setErrMsg] = UseState('');
    const [success, setSuccess] = UseState(false);
    const queryClient = useQueryClient()
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get("id")
    const email = queryParams.get("email")
  

    UseEffect(() => {
      UserRef.current?.focus();
    }, []);
  
 
  
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
    }, [pwd, matchPwd]);
    
    const postPwdUser = async () => 
      await api.post("/Auth/register", {
        id: id,
        password: pwd
      });

  const postUserMutation = useMutation(postPwdUser, {
    onSuccess: () => {
        // Invalidates cache and refetch 
        queryClient.invalidateQueries('PWD')
    }
})



    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validMatch && validPwd ){
        const response = postUserMutation.mutateAsync()
        console.log(response);
      }
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
                  !validPwd || !validMatch ? true : false
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