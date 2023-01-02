import React from 'react'
import useAxiosFetch from '../hooks/useAxiosFetch'
import { useContext } from 'react';
import DataContext from '../dataContext/dataContext';
import { Link } from 'react-router-dom';
const Users = () => {

  let url = 'https://localhost:7168/api/user';
  const { data, fetchError, isLoading } = useAxiosFetch(url);
  const {colorTheme } = useContext(DataContext);

  console.log(data);

  return (
    <>
    
      {isLoading && <p className="statusMsg">Loading ...</p>}
      {!isLoading && fetchError && (
        <p className="statusMsg err">
          {fetchError}
        </p>
      )}
      {!isLoading && !fetchError && (
        <>
        <div className={`design ${colorTheme}`}></div>
        <div className={`teamContainer ${colorTheme}`}>
          <h2>Felhasználók:</h2>
          {data?.map((user) => (
            <Link key={user.id} to={`/user/${user.id}`}>
              <div  className='user' >
                <p>{user.firstName} {user.lastName}</p>
              </div>
            </Link>
          ))}
          </div>
        </>
      )}
    </>
  );
}

export default Users

