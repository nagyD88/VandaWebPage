import React from "react";
import EducationMaterial from "./EducationMaterial";
import { useParams } from "react-router";
import EducationUser from "./EducationUser";
import { useQuery } from "react-query";
import { LevelType } from "../model/LevelType";
import api from "../hooks/api";
import IsLoading from "./utility/isLoading";

const Level = () => {
  const { id } = useParams();
  const url = `/education/level/${id}`;

  const getLevel = async () => {
    const response = await api.get<LevelType>(url);
    return response.data;
  };

  const { isLoading, isError, error, data } = useQuery("level", getLevel);
  console.log(data);
  console.log(url);
  return (
    <IsLoading
      children={
        <>
          <div
            id="education-user-container"
            className="flex flex-row justify-start gap-16 w-screen"
          >
            <div
              id="education-user-sidebar-container"
              className="flex flex-col"
            >
              <EducationUser />
            </div>

            <div
              id="education-user-material-container"
              className="bg-[#003f5f] grow-[2]"
            >
              <h2>{data?.name}</h2>
              {data?.educationalMaterials?.map((material) => (
                <EducationMaterial
                  key={material.id}
                  material={material}
                  canDelete={false}
                />
              ))}
            </div>
          </div>
        </>
      }
      isError={isError}
      isLoading={isLoading}
      error={error as Error}
    />
  );
};

export default Level;
