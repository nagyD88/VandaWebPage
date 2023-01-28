import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useParams } from 'react-router';
import DataContext from '../context/dataContext';
import useAxiosFetch from '../hooks/useAxiosFetch';
import api from '../hooks/api';
import { Level } from '../model/Level';
import { User } from '../model/User';

const User = () => {
  const { id } = useParams();
  let url = `https://localhost:7168/api/user/${id}`;

  const { colorTheme } = useContext(DataContext);
  const { data, fetchError, isLoading } = useAxiosFetch(url);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [communication, setCommunication] = useState<string>('');
  const [MBTI, setMBTI] = useState<string>('');
  const [levelId, setLevelId] = useState<number>();
  const [levels, setLevels] = useState<Level[]>([]);
  const [userData, setUserData] = useState<User|undefined>();
  const [levelsToAdd, setLevelsToAdd] =useState<Level[]>([])

  useEffect(() => {
    console.log('levels: ', levels);
    console.log('userData: ', userData);
    const filteredLevels = levels.filter(x => !(userData?.levels?.some(y=>y.id === x.id)));
    setLevelsToAdd(filteredLevels);
    console.log("filtered: ",filteredLevels);
  }, [levels, userData]);


  useEffect(() => {
    let isMounted = true;
    let levelUrl = '/Education/level';
    let userUrl = `/user/${id}`;
    const fetchLevel = async (url:string) => {
      try {
        const response = await api.get<Level[]>(url);
        if (isMounted) {
          setLevels(response.data);
          console.log(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setLevels([]);
        }
      } finally {
      }
    };

    const fetchUser = async (url:string) => {
      try {
        const response = await api.get<User>(url);
        if (isMounted) {
          setUserData(response.data);
          console.log(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setUserData(undefined);
        }
      } finally {
      }
    };
    fetchUser(userUrl);
    fetchLevel(levelUrl);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.put('/user', {
      id: `${id}`,
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      email: `${email}`,
      communication: `${communication}`,
      mbti: `${MBTI}`,
      levelId: levelId
    });
    console.log(response.data);
  };

  useEffect(() => {
    let user= data as unknown as User;//erre rákérdezni hogy lehetne jobban!!
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setCommunication(user.communication);
    setMBTI(user.mbti);
  }, [data]);
  return (
    <>
      {isLoading && <p className="statusMsg">Loading ...</p>}
      {!isLoading && fetchError && (
        <p className="statusMsg err">{fetchError}</p>
      )}
      {!isLoading && !fetchError && (
        <>
          <h2>
            {userData?.firstName} {userData?.lastName}
          </h2>
          <div>{userData?.email}</div>
          <div className={`time ${colorTheme}`}>
            <form onSubmit={handleSubmit} className="siStart">
              <select
                value={levelId}
                onChange={(e) => setLevelId(parseInt(e.target.value))}
              >
                <option value={undefined}>válasz szintet amit megnézhet</option>
                {levelsToAdd?.map((level) => (
                  <option key={level.id} value={level.id}>{level.name}</option>
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
