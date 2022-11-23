import React from 'react'
import { useContext } from 'react';
import { useParams } from 'react-router';
import DataContext from './dataContext/dataContext';
import useAxiosFetch from './hooks/useAxiosFetch';


const User = () => {
  const { id } = useParams();
  let url = `https://localhost:7168/api/user/${id}`;

  const {colorTheme } = useContext(DataContext);
  const { data, fetchError, isLoading } = useAxiosFetch(url);
  console.log(data);

  return (
  <>
    <h2>{data.firstName} {data.lastName}</h2>
    <div>{data.email}</div>
    <div className={`time ${colorTheme}`}>
      <form onSubmit={handleReviewTime} className='siStart'>
        <label>
          SI review start:
          <input 
            id="siStart"
            type="time"
            required
            value={siStart}
            onChange={(e) => setSiStart(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" className='sub' />
      </form>
      </div>
  </>
  )
}

export default User