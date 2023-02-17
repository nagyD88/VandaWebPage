import React from 'react';
import { getId } from '../utils/EmbedLinkCreator';
import Dashboard from './utility/Dashboard';
import AreYouSure from './modallContent/AreYouSure';
import api from '../hooks/api';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { EducationMaterialtype } from '../model/EducationMaterialType';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';

type AppProps = {
  material: EducationMaterialtype;
  canDelete: boolean;
};
const EducationMaterial = ({ material, canDelete }: AppProps) => {
  const queryClient = useQueryClient();

  const { auth } = useContext(AuthContext);

  const { id } = useParams();

  const deleteEducationMaterial = async () =>
    await api.delete(`/education/${material.id}`);

  const deleteEducationMaterialMutation = useMutation(
    deleteEducationMaterial,
    {
      onSuccess: () => {
        // Invalidates cache and refetch
        queryClient.invalidateQueries('level');
      },
    }
  );

  const handleOnClick = async () => {
    deleteEducationMaterialMutation.mutate();
  };
  return (
    <div className=" w-80 object-center text-[#f5f5f5] default-text-shadow">
      <h3>{material.name}</h3>
      {auth.admin && canDelete && (
        <Dashboard
          children={
            <AreYouSure
              handleOnClick={handleOnClick}
              message={'Biztos le akarod törölni?'}
              hideModal={''}
              levelID={id}
            />
          }
        />
      )}
      {material.type == 'text' && (
        <article>{material.content}</article>
      )}
      {material.type == 'picture' && (
        <img src={material.content} alt={material.name} ></img>
      )}
      {material.type == 'video' && (
        <div className="video">
          {/* <div className="video-content"> */}
            <iframe
              src={
                'https://www.youtube.com/embed/' +
                getId(material.content)
              }
              title="YouTube video"
              height="100%"
              width="100%"
              allowFullScreen
            ></iframe>
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default EducationMaterial;
