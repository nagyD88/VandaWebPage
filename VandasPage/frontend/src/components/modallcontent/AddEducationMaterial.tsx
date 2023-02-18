import React from "react";
import { useState } from "react";
import api from "../../hooks/api";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const AddEducationMaterial = ({ levelID, hideModal }) => {
  const [type, setType] = useState("text");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
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
    setFile(undefined)
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const config = {
  //     headers: { "content-type": "multipart/form-data" },
  //   };

  //   if (typeof file === undefined) {
  //     const response = await api.post("/education", {
  //       name: `${name}`,
  //       type: `${type}`,
  //       content: `${content}`,
  //     });
  //     console.log(response);
  //     PatchEducationMaterialMutation.mutate(response);
  //   } else {
  //     const formData = new FormData();
  //     formData.append("image", file!);

  //     const response = await api.post("/education/picture", formData);
  //     console.log("respons: ", response);
  //     PatchEducationMaterialMutation.mutate(response);
  //   }

  //   hideModal();
  // };

  const handleSubmit = async (e) => {
    e.PreventDefault();
    try {
      // const res = await axios.post(`/education/${}`);
      // console.log(res);
      console.log(file)
    } catch (err) {
      console.error(err.message);
    }
  };

  const fileHandler = (files: FileList | null) => {
    if (files) {
      const chosenFile = files.item(0)
      console.log(chosenFile)
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
              accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
          {/* {file! instanceof File && (
            <label hidden>
              tartalom:
              <input
              hidden
                id="Name"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
          )} */}
        </div>
        {!file ? <button type="submit" hidden>Hidden</button> : <button type="submit">Upload</button>}
      </form>
    </>
  );
};

export default AddEducationMaterial;
