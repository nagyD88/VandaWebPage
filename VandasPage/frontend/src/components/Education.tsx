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
    'levels',
    getLevels
  );

  const { colorTheme } = useContext(DataContext);
  console.log('eduLevel: ', data);

  return (
    <IsLoading
      children={
        <>
          <ul className="course-list">
            {data?.map((level) => (
              <li>
                <>
                  {console.log('level Id: ', level.id)}
                  <Link key={level.id} to={`/Education/${level.id}`}>
                    {level.name}
                  </Link>
                </>
              </li>
            ))}
          </ul>
          <button className="btn">New course</button>
          <button className="btn">New lesson</button>
        </>
      }
      isError={isError}
      isLoading={isLoading}
      error={error as Error}
    />
  );
};

export default Education;
