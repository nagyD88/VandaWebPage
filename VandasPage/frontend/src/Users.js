import React from 'react'
import useAxiosFetch from './hooks/useAxiosFetch'
import { useContext } from 'react';
import DataContext from './dataContext/dataContext';
import { Link } from 'react-router-dom';
const Users = () => {

  let url = 'https://localhost:7086/api/teams';
  const { data, fetchError, isLoading } = useAxiosFetch(url);
  const {colorTheme } = useContext(DataContext);

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
            <Link to={`/user/${user.id}`}>
              <div key={user.id} className='user' >
                <p>{user.name}</p>
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

