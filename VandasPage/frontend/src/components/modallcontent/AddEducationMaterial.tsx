import React from "react";
import { useState } from "react";
import api from "../../hooks/api";
import { useMutation, useQueryClient } from "react-query";

const AddEducationMaterial = ({ levelID, hideModal }) => {
  const [type, setType] = useState("text");
  const [name, setName] = useState("");
  const [file, setFile] = useState<File>();
  const queryClient = useQueryClient();

  const PatchEducationMaterial = async (response) =>
    await api.patch(
      `/education/level/${levelID}/material?MaterialId=${response.data.id}`
    );

  const PatchEducationMaterialMutation = useMutation(PatchEducationMaterial, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries("level");
    },
  });
  const onValueChange = (e) => {
    setType(e.target.value);
    setFile(undefined);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("file", new Blob([file!], { type: file?.type }));
      const res = await api.post(`/Education/${type}`, data);
      console.log(res);
      PatchEducationMaterialMutation.mutate(res);
    } catch (err) {
      console.error(err.message);
    } finally {
      hideModal();
    }
  };

  const fileHandler = (files: FileList | null) => {
    if (files) {
      const chosenFile = files.item(0);
      console.log(chosenFile);
      setFile(chosenFile!);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="siStart">
        <div className="radio">
          <label>
            szöveg:
            <input
              name="fileType"
              type="radio"
              value="text"
              checked={type === "text"}
              onChange={onValueChange}
            />
          </label>
        </div>
        <div className="radio">
          <label>
            kép:
            <input
              name="fileType"
              type="radio"
              value="picture"
              checked={type === "picture"}
              onChange={onValueChange}
            />
          </label>
        </div>
        <div className="radio">
          <label>
            videó:
            <input
              name="fileType"
              type="radio"
              value="video"
              checked={type === "video"}
              onChange={onValueChange}
            />
          </label>
          <br />
          <label>
            cím:
            <input
              className="text-black"
              id="Name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          {type === "picture" && (
            <input
              id="upload-picture"
              type="file"
              accept="image/*"
              onChange={(e) => fileHandler(e.target.files)}
            />
          )}

          {type === "text" && (
            <input
              id="upload-text"
              type="file"
              accept=".doc,.docx,.xml, .txt,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/css,text/html"
              onChange={(e) => fileHandler(e.target.files)}
            />
          )}

          {type === "video" && (
            <input
              id="upload-video"
              type="file"
              accept="video/*"
              onChange={(e) => fileHandler(e.target.files)}
            />
          )}
        </div>
        {!file ? (
          <button type="submit" hidden>
            Hidden
          </button>
        ) : (
          <button type="submit">Upload</button>
        )}
      </form>
    </>
  );
};

export default AddEducationMaterial;
