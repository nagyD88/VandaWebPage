import React from "react";
import { useParams } from "react-router";
import AddEducationMaterial from "./modallContent/AddEducationMaterial";
import Dashboard from "./utility/Dashboard";
import api from "../hooks/api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import EducationAdmin from "./EducationAdmin";
import { LevelType } from "../model/LevelType";
import IsLoading from "./utility/isLoading";
import DragAndDrop from "./utility/DragAndDrop";

const LevelChanger = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const url = `/education/level/${id}`;

  const getLevel = async () => {
    const response = await api.get<LevelType>(`/education/level/${id}`);
    return response.data;
  };

  const { isLoading, isError, error, data } = useQuery("level", getLevel);

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const updateOrder = async (levelsJSON) =>
    await api.patch(
      "/Education/level/materials/changeorder",
      levelsJSON,
      config
    );

  const updateEduMaterialOrderMutation = useMutation(updateOrder, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries("level");
    },
  });

  const handleOnDragEnd = async (result) => {
    if (!result?.destination) return;
    const Materials = Array.from(data?.educationalMaterials!);
    const [reorderedItem] = Materials.splice(result.source.index, 1);
    Materials.splice(result.destination.index, 0, reorderedItem);

    const materialsJSON = JSON.stringify(Materials);
    updateEduMaterialOrderMutation.mutate(materialsJSON);
  };

  return (
    <IsLoading
      children={
        <>
          <div
            id="education-admin-container"
            className="flex flex-row justify-start gap-16 w-screen"
          >
            <div
              id="education-admin-sidebar-container"
              className="flex flex-col grow"
            >
              <EducationAdmin />
              <Dashboard
                children={<AddEducationMaterial levelID={id} hideModal={""} />}
              />
            </div>

            <div id="education-user-material-container" className="bg-[#003f5f] grow-[2] mt-8 flex flex-col justify-center items-center overflow-auto">
              <h2 className="text-white text-[2rem] capitalize">{data?.name}</h2>
              <DragAndDrop
                handleOnDragEnd={handleOnDragEnd}
                ListOfItems={data?.educationalMaterials}
                type={"level"}
              />
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

export default LevelChanger;
