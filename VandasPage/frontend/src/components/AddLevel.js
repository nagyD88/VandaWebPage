import React from 'react';
import { useState, useContext } from 'react';
import api from '../hooks/api';
import DataContext from '../context/dataContext';

const AddLevel = ({ levelID, hideModal }) => {
  const [type, setType] = useState('text');
  const [categoryName, setCategoryName] = useState('');
  const [name, setName] = useState('');
  const { setCounter, counter } = useContext(DataContext);

  const onValueChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      categoryName: {categoryName},
      name: {name},
      users: [],
      educationalMaterials: []
    })
    const response = await api.post('/Education/level', {
      categoryName: `${categoryName}`,
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

          <label>
            téma:
            <input
              id="categoryName"
              type="text"
              required
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </label>
        <input type="submit" value="feltölt" className="sub" />
      </form>
    </>
  );
};

export default AddLevel;
