import React from 'react';
import { getId } from '../utils/EmbedLinkCreator';
import Dashboard from './Dashboard';
import AreYouSure from './AreYouSure';
import api from '../hooks/api';
import { useContext } from 'react';
import DataContext from '../context/dataContext';
import AuthContext from '../context/AuthProvider';
import { EducationMaterialtype } from '../model/EducationMaterialType';
import { useParams } from 'react-router-dom';

type AppProps = {
  material: EducationMaterialtype;
  canDelete: boolean;
};
const EducationMaterial = ({ material, canDelete}:AppProps) => {
  const { setCounter, counter } = useContext(DataContext);
  const { auth } = useContext(AuthContext);
  console.log(material)
  const {id} = useParams();
  const handleOnClick = async () => {
    const response = await api.delete(`/education/${material.id}`);
    setCounter(counter+1);
    
  };
  return (
    <div className="education-material">
      <h3>{material.name}</h3>
      {auth.admin && canDelete && (<Dashboard
        children={
          <AreYouSure
            handleOnClick={handleOnClick}
            messege={'Biztos le akarod törölni?'}
            hideModal={''}
            levelID={id}
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
