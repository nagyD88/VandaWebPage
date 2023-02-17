import React from 'react';
import { Link } from 'react-router-dom';
import { LevelType } from '../model/LevelType';
import { useQuery } from 'react-query';
import api from '../hooks/api';

const EducationUser = () => {
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
    <div id='sidebar' className=''>
      {isLoading && <p className="statusMsg">Loading ...</p>}
      {!isLoading && isError && (
        <p className="statusMsg err">
          {error instanceof Error && error.message}
        </p>
      )}
      {!isLoading && !isError && (
        <div className="mt-20 mr-10">
          <ul className="flex flex-col justify-start gap-1 bg-[#003f5f] text-white w-fit pl-32 pr-32 overflow-visible">
            {data?.map((level) => (
              <li>
                  <Link key={level.id} to={`/EducationUser/${level.id}`}>
                    {level.name}
                  </Link>
              </li>
            ))}
          </ul>
          
        </div>
      )}
    </div>
  );
};

export default EducationUser;
