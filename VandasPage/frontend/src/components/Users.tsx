import React from 'react';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import DataContext from '../context/dataContext';
import { Link } from 'react-router-dom';
import api from '../hooks/api';
import { UserType } from '../model/UserType';
import { AxiosError } from 'axios';
import IsLoading from './utility/isLoading';

const Users = () => {
  let url = '/user';

  const getUsers = async () => {
    const response = await api.get<UserType[]>(url);
    return response.data;
  };
  const { isLoading, isError, error, data } = useQuery(
    'users',
    getUsers
  );

  const { colorTheme } = useContext(DataContext);
  console.log(isError);
  if (error instanceof Error) {
    console.log(error.message);
  }
  return (
    <IsLoading
      children={
        <>
          <div className={`design ${colorTheme}`}></div>
          <div className=" bg-[#003f5f] w-80 object-center rounded-xl shadow-2xl mt-16 text-slate-100 default-text-shadow">
            <h2>Felhasználók:</h2>
            {data?.map((user: UserType) => (
              <Link key={user.id} to={`/user/${user.id}`}>
                <div className="user">
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      }
      isError={isError}
      isLoading={isLoading}
      error={error as Error}
    />
  );
};

export default Users;
