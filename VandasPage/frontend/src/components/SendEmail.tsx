import React, { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../hooks/api';
import { UserType } from '../model/UserType';


type Props = {}

const SendEmail = () => {
    let url = '/user';

    const getUsers = async () => {
        const response = await api.get<UserType[]>(url)
        return response.data
    }
    const { isLoading, isError, error , data } = useQuery('users', getUsers );
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const sendEmial = async ()=> await api.post('/email', {
        to: email,
        subject: subject,
        body: body
      });


      const handleSubmit = async (e) => {
        e.preventDefault();
          try{
          const emailResponse = await sendEmial();
          console.log(emailResponse);
        } catch (err) {
          console.log(err);
        } finally {
          console.log(`email send`);
        }
        }
      
  return (
    <>
    {isLoading && <p className="statusMsg">Loading ...</p>}
    {!isLoading && isError && (
      <p className="statusMsg err">{error instanceof Error && error.message}</p>
    )}
    {!isLoading && !isError && (
      <>
        <h2>
          email küldése
        </h2>
        
        <div className={`email`}>
          <form onSubmit={handleSubmit} className="siStart">
            <select
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              <option value={undefined}>
                válasz kinek küldesz emailt
              </option>
              {data?.map((user) => (
                <option key={user.id} value={user.email}>
                  {`${user.firstName} ${user.lastName}`}
                </option>
              ))}
            </select>
            <label>
              Tárgy
              <input
                id="subject"
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </label>

            <label>
              üzenet:
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                cols={50}
              />
            </label>
            <input type="submit" value="Submit" className="sub" />
          </form>
        </div>
      </>
    )}
  </>
  )
}

export default SendEmail

  
