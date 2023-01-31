import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router';
import DataContext from '../context/dataContext';
import api from '../hooks/api';
import { LevelType } from '../model/LevelType';
import { UserType } from '../model/UserType';
import { useQuery, useMutation, useQueryClient } from "react-query"



const User = () => {
  const { id } = useParams();
  let url = `/user/${id}`;
  let levelUrl = '/Education/level';

  const queryClient = useQueryClient()

  const getLevels = async () => {
    const response = await api.get<LevelType[]>(levelUrl)
    return response.data
  }
  const getUsers = async () => {
    const response = await api.get<UserType>(url)
    return response.data
  }

  const { isLoading, isError, error , data } = useQuery('user', getUsers )
  const levelsResponse = useQuery("levels", getLevels)
  const { colorTheme } = useContext(DataContext);
  
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [communication, setCommunication] = useState<string>('');
  const [MBTI, setMBTI] = useState<string>('');
  const [levelId, setLevelId] = useState<number>();
  const [levelsToAdd, setLevelsToAdd] = useState<LevelType[] | undefined>([]);

  useEffect(() => {
    console.log('levels: ', levelsResponse?.data);
    console.log('userData: ', data);
    const filteredLevels = levelsResponse?.data?.filter(
      (x) => !data?.levels?.some((y) => y.id === x.id)
    );
    setLevelsToAdd(filteredLevels);
    console.log('filtered: ', filteredLevels);
    
    if (data!==undefined){
      console.log('alma')
      setFirstName(data!.firstName);
      setLastName(data!.lastName);
      setEmail(data!.email);
      setCommunication(data!.communication);
      setMBTI(data!.mbti);
  }}, [data, levelsResponse?.data]);


  const updateUser =async ()=> await api.put<UserType>('/user', {
    id: `${id}`,
    firstName: `${firstName}`,
    lastName: `${lastName}`,
    email: `${email}`,
    communication: `${communication}`,
    mbti: `${MBTI}`,
    levelId: levelId,
  });

  const updateUserMutation = useMutation(updateUser, {
    onSuccess: () => {
        // Invalidates cache and refetch 
        queryClient.invalidateQueries('user')
    }
})
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUserMutation.mutate()
  };


  return (
    <>
      {isLoading && <p className="statusMsg">Loading ...</p>}
      {!isLoading && isError && (
        <p className="statusMsg err">{error as string}</p>
      )}
      {!isLoading && !isError && (
        <>
          <h2>
            {data?.firstName} {data?.lastName}
          </h2>
          <div>{data?.email}</div>
          <div className={`time ${colorTheme}`}>
            <form onSubmit={handleSubmit} className="siStart">
              <select
                value={levelId}
                onChange={(e) => setLevelId(parseInt(e.target.value))}
              >
                <option value={undefined}>
                  válasz szintet amit megnézhet
                </option>
                {levelsToAdd?.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
              <label>
                First Name:
                <input
                  id="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label>
                Last Name:
                <input
                  id="lastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label>
                e-mail:
                <input
                  id="email"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                Communication:
                <textarea
                  value={communication}
                  onChange={(e) => setCommunication(e.target.value)}
                  rows={4}
                  cols={50}
                />
              </label>

              <label>
                MBTI:
                <input
                  id="MBTI"
                  type="text"
                  value={MBTI}
                  onChange={(e) => setMBTI(e.target.value)}
                />
              </label>
              <input type="submit" value="Submit" className="sub" />
            </form>
          </div>
        </>
      )}
    </>
  );
};
export default User;
