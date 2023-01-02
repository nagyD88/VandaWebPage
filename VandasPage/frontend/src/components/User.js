import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useParams } from 'react-router';
import DataContext from '../context/dataContext';
import useAxiosFetch from '../hooks/useAxiosFetch';
import api from '../hooks/api';


const User = () => {
  const { id } = useParams();
  let url = `https://localhost:7168/api/user/${id}`;

  const {colorTheme } = useContext(DataContext);
  const { data, fetchError, isLoading } = useAxiosFetch(url);
  console.log(data);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [communication, setCommunication] = useState("")
  const [MBTI, setMBTI]=useState("")

  const handleSubmit =async(e)=>{ 
    e.preventDefault();
    const response = await api.put('/user', {
      id: `${id}`,
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      email: `${email}`,
      communication: `${communication}`,
      mbti:`${MBTI}`,
      
    })
    console.log(response);
  }

  useEffect(()=>{
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
    setCommunication(data.communication);
    setMBTI(data.mbti);
  },[data])
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
    <h2>{data.firstName} {data.lastName}</h2>
    <div>{data.email}</div>
    <div className={`time ${colorTheme}`}>
      <form onSubmit={handleSubmit} className='siStart'>
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
          onChange={(e)=> setCommunication(e.target.value)} 
          rows="4" 
          cols="50"
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
        <input type="submit" value="Submit" className='sub' />
      </form>
      </div>
      </>
  
  )}</>
)
}
export default User