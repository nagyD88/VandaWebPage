import React from 'react';
import { useState, useContext } from 'react';
import api from '../hooks/api';
import DataContext from '../context/dataContext';

const AddLevel = ({ hideModal }) => {
  const [name, setName] = useState('');
  const { setCounter, counter } = useContext(DataContext);



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      name: {name},
      users: [],
      educationalMaterials: []
    })
    const response = await api.post('/Education/level', {
      name: `${name}`,
      users: [],
      educationalMaterials: []
    })
    hideModal();
    console.log(response);
    setCounter(counter+1);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="siStart">
        <label>
            név:
            <input
              id="Name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>


        <input type="submit" value="feltölt" className="sub" />
      </form>
    </>
  );
};

export default AddLevel;
