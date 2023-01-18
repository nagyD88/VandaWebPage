import React from 'react';
import { getId } from '../utils/EmbedLinkCreator';
import Dashboard from './Dashboard';
import AreYouSure from './AreYouSure';
import api from '../hooks/api';
import { useContext } from 'react';
import DataContext from '../context/dataContext';
import AuthContext from '../context/AuthProvider';


const EducationMaterial = ({ material, canDelete}) => {
  const { setCounter, counter } = useContext(DataContext);
  const { auth } = useContext(AuthContext);
  
  const handleOnClick = async () => {
    const response = await api.delete(`/education/${material.id}`);
    setCounter(counter+1);
    
  };
  return (
    <div className="education-material">
      <h3>{material.name}</h3>
      {auth.roles && canDelete && (<Dashboard
        children={
          <AreYouSure
            handleOnClick={handleOnClick}
            messege={'Biztos le akarod törölni?'}
          />
        }
      />)}
      {material.type == 'text' && (
        <article>{material.content}</article>
      )}
      {material.type == 'picture' && (
        <img src={material.content}></img>
      )}
      {material.type == 'video' && (
        <div className="video">
          <div className="ratio ratio-16x9">
            <iframe
              src={
                'https://www.youtube.com/embed/' +
                getId(material.content)
              }
              title="YouTube video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationMaterial;
