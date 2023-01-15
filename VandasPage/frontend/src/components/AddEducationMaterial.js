import React from 'react';
import { useState } from 'react';
import api from '../hooks/api';

const AddEducationMaterial = ({ levelID, hideModal }) => {
  const [type, setType] = useState('text');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const onValueChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await api.post('/education', {
      name: `${name}`,
      type: `${type}`,
      content: `${content}`
    })
    hideModal();

    ;

    console.log(response);
    console.log(response.data.id);
    const patchResponse = await api.patch(
      `/education/level/${levelID}/material?MaterialId=${response.data.id}`
    );
    console.log(patchResponse);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="siStart">
        <div className="radio">
          <label>
            szöveg:
            <input
              name="type"
              type="radio"
              value="text"
              checked={type === 'text'}
              onChange={onValueChange}
            />
          </label>
        </div>
        <div className="radio">
          <label>
            kép:
            <input
              name="type"
              type="radio"
              value="picture"
              checked={type === 'picture'}
              onChange={onValueChange}
            />
          </label>
        </div>
        <div className="radio">
          <label>
            videó:
            <input
              name="type"
              type="radio"
              value="video"
              checked={type === 'video'}
              onChange={onValueChange}
            />
          </label>
          <br />
          <label>
            cím:
            <input
              id="Name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            tartalom:
            <input
              id="Name"
              type="text"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
        </div>
        <input type="submit" value="Submit" className="sub" />
      </form>
    </>
  );
};

export default AddEducationMaterial;
