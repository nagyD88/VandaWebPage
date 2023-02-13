import React from 'react';
import DataContext from '../context/dataContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LevelType } from '../model/LevelType';
import { useQuery } from 'react-query';
import api from '../hooks/api';
import IsLoading from './utility/isLoading';

const Education = () => {
  let url = 'https://localhost:7168/api/Education/level';

  const getLevels = async () => {
    const response = await api.get<LevelType[]>(url);
    return response.data;
  };
  const { isLoading, isError, error, data } = useQuery(
    'user',
    getLevels
  );

  console.log("eduLevel: ", data);

  return (
    <>
      {isLoading && <p className="statusMsg">Loading ...</p>}
      {!isLoading && isError && (
        <p className="statusMsg err">
          {error instanceof Error && error.message}
        </p>
      )}
      {!isLoading && !isError && (
        <div className="mt-6">
          <ul className="flex justify-start gap-6 bg-neutral-100 w-fit pl-32 pr-32 overflow-visible">
            {data?.map((level) => (
              <li>
                  <Link key={level.id} to={`/Education/${level.id}`}>
                    {level.name}
                  </Link>
              </li>
            ))}
          </ul>
          <button className="btn">New course</button>
          <button className="btn">New lesson</button>
        </div>
      )}
    </>
  );
};

export default Education;
