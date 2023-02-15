import React from "react";
import { useState } from "react";
import api from "../../hooks/api";
import { useMutation, useQueryClient } from "react-query";

const AddLevel = ({ hideModal }) => {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  const PostLevel = async () =>
    await api.post("/Education/level", {
      name: `${name}`,
      users: [],
      educationalMaterials: [],
    });

  const PostLevelMutation = useMutation(PostLevel, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries("levels");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    PostLevelMutation.mutate();
    hideModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <label htmlFor="Name">Név:</label>
        <input
          id="Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="bg-[#f5f5f5] ml-4">
          Submit
        </button>
      </form>
    </>
  );
};

export default AddLevel;
