import React, { useState } from 'react'
import api from '../hooks/api';
type Props = {}

const uploadfile = (props: Props) => {

    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();

    const uploadFile = function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("image", selectedFile, name);
        }
    };
  return (
    <div className={'fileUpload'}>
          <label htmlFor="photo">
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="photo"
              name="photo"
              type="file"
              multiple={false}
              onChange={handleImageChange}
            />

            <button
              className={"button"}
              onClick={uploadFile}
            >
              Choose Picture
            </button>
          </label>
        </div>
  )
}

export default uploadfile