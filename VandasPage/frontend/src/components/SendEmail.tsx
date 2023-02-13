import React, { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../hooks/api';
import { UserType } from '../model/UserType';
import IsLoading from './utility/isLoading';

type Props = {};

const SendEmail = () => {
  let url = '/user';

  const getUsers = async () => {
    const response = await api.get<UserType[]>(url);
    return response.data;
  };
  const { isLoading, isError, error, data } = useQuery(
    'users',
    getUsers
  );
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const sendEmial = async () =>
    await api.post('/email', {
      to: email,
      subject: subject,
      body: body,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const emailResponse = await sendEmial();
      console.log(emailResponse);
    } catch (err) {
      console.log(err);
    } finally {
      console.log(`email send`);
    }
  };

  return (
    <IsLoading
      children={
        <>
          <h2 className='text-[2rem] capitalize'>email küldése</h2>

          <div className={`email`}>
            <form onSubmit={handleSubmit} className="bg-blue-600 w-[30rem] h-auto object-center rounded-xl shadow-2xl mt-16 ml-10 pr-10  pl-10 pt-10">
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
                  className='ml-3 shadow-md'
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
                  className='pl-4 shadow-md'
                  onChange={(e) => setBody(e.target.value)}
                  rows={4}
                  cols={45}
                />
              </label>
              <button type="submit" className="bg-[#f5f5f5;] ml-[7.5rem]">Submit</button>
            </form>
          </div>
        </>
      }
      isError={isError}
      isLoading={isLoading}
      error={error as Error}
    />
  );
};

export default SendEmail;
