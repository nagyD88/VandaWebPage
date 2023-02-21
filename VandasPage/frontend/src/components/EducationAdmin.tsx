import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "../hooks/api";
import AddLevel from "./modallContent/AddLevel";
import Dashboard from "./utility/Dashboard";
import { LevelType } from "../model/LevelType";
import DragAndDrop from "./utility/DragAndDrop";
import IsLoading from "./utility/isLoading";

const EducationAdmin = () => {
  let url = `/education/level`;

  const getLevels = async () => {
    const response = await api.get<LevelType[]>(url);
    return response.data;
  };

  const queryClient = useQueryClient();

  const { isLoading, isError, error, data } = useQuery("levels", getLevels);

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const updateOrder = async (levelsJSON: string) =>
    await api.patch("/Education/level/changeorder", levelsJSON, config);

  const deleteLevel = async (levelID) =>
    await api.delete(`/Education/level/${levelID}`);

  const deleteLevelMutation = useMutation(deleteLevel, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries("levels");
    },
  });

  const updateLevelOrderMutation = useMutation(updateOrder, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries("levels");
    },
  });

  const handleOnDragEnd = async (result) => {
    if (!result?.destination) return;
    const Levels: LevelType[] = Array.from(data!);
    const [reorderedItem] = Levels.splice(result.source.index, 1);
    Levels.splice(result.destination.index, 0, reorderedItem);
    const iDs = new Array();
    Levels.map((level) => iDs.push({ id: level.id }));
    const levelsJSON = JSON.stringify(iDs);
    updateLevelOrderMutation.mutate(levelsJSON);
  };

  const handleOnClick = async (levelID) => {
    deleteLevelMutation.mutate(levelID);
  };

  return (
    <IsLoading
      children={
    <>
      <Dashboard 
          children={<AddLevel hideModal={undefined}
            />}
            buttonContent ={"Adj hozzá új Témát"} /> 
      <DragAndDrop handleOnDragEnd={handleOnDragEnd} 
      ListOfItems={data} 
      type={'education'}
      handleOnClick={handleOnClick}
      />
    </>
      }
      isError={isError}
      isLoading={isLoading}
      error={error as Error}
    />
  );
};
export default EducationAdmin;
