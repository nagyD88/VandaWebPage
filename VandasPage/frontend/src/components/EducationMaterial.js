import React from 'react';
import { getId } from '../utils/EmbedLinkCreator';


const EducationMaterial = ({ material }) => {
    return (
    <div className="education-material">
      <h2>{material.name}</h2>
      {material.type == 'text' && (
        <article>{material.content}</article>
      )}
      {material.type == 'picture' && (
        <img src={material.content}></img>
      )}
      {material.type == 'video' && (
        <div class="ratio ratio-16x9">
          <iframe
            src={"https://www.youtube.com/embed/"+getId(material.content)}
            title="YouTube video"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default EducationMaterial;
