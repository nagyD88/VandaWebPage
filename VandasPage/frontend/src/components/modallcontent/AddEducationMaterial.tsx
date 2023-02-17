import React from 'react';
import { useState } from 'react';
import api from '../../hooks/api';
import { useMutation, useQueryClient } from 'react-query';

const AddEducationMaterial = ({ levelID, hideModal }) => {
  const [type, setType] = useState('text');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile]=useState<File>();
  const queryClient = useQueryClient();

  const PatchEducationMaterial = async (response) =>
    await api.patch(
      `/education/level/${levelID}/material?MaterialId=${response.data.id}`
    );

  const PatchEducationMaterialMutation = useMutation(
    PatchEducationMaterial,
    {
      onSuccess: () => {
        // Invalidates cache and refetch
        queryClient.invalidateQueries('level');
      },
    }
  );
  const onValueChange = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    const config = {
      headers: {  'content-type': 'multipart/form-data' },
    };
    e.preventDefault();
    if (typeof file === undefined){
      const response = await api.post('/education', {
        name: `${name}`,
        type: `${type}`,
        content: `${content}`
      });
      console.log(response);
      PatchEducationMaterialMutation.mutate(response);
    }else{
      
        const formData = new FormData();
        formData.append("image", file!);
    
      const response =await api.post('/education/picture',
       formData
      )
      console.log("respons: ", response);
      PatchEducationMaterialMutation.mutate(response);
    }

    hideModal();
  };

  const fileHandler=(files:FileList|null)=>{
    if (files){
    let fileArrey = Array.from(files);
    setFile(fileArrey[0])
    }
  }

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
          {type==="picture" && 
          <input 
          id="upload"
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e)=>fileHandler(e.target.files)}
          />
          }
          {file !instanceof File &&
          <label>
            tartalom:
            <input
              id="Name"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
}
        </div>
        <input type="submit" value="feltölt" className="sub" />
      </form>
    </>
  );
};

export default AddEducationMaterial;
