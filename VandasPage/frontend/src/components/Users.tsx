import React from 'react';
import { useQuery } from "react-query"
import { useContext } from 'react';
import DataContext from '../context/dataContext';
import { Link } from 'react-router-dom';
import api from '../hooks/api';
import { UserType } from '../model/UserType';
import { AxiosError } from 'axios';

const Users = () => {
  let url = '/user';
  
  const getUsers = async () => {
    const response = await api.get<UserType[]>(url)
    return response.data
}
  const { isLoading, isError, error , data } = useQuery('users', getUsers )
  
  const { colorTheme } = useContext(DataContext);
  console.log(isError);
  if(error instanceof Error){
    console.log(error.message);
  }
  return (
    <>
      {isLoading && <p className="statusMsg">Loading ...</p>}
      {!isLoading && isError && (
        <p className="statusMsg err">{error instanceof Error && error.message}</p>
      )}
      {!isLoading && !isError && (
        <>
          <div className={`design ${colorTheme}`}></div>
          <div className={`teamContainer ${colorTheme}`}>
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
      )}
    </>
  );
};

export default Users;
