import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./drop-file-input.css";
import { ReactComponent as VectorEdit } from "../../utils/assets/Vector_Edit.svg";
import axiosInstance from "utils/lib/axios";

const DropFileInput = (props) => {
  const wrapperRef = useRef(null);
  DropFileInput.propTypes = {
    onFileChange: PropTypes.func,
  };
  const [fileList, setFileList] = useState(null);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = async (e) => {
    const image = e.target.files[0]; // image
    const formData = new FormData();
    formData.append("image", image);

    const { data } = await axiosInstance.post('/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setFileList(data?.imagePath)
  };

  useEffect(() => {
    props.onFileChange(fileList);
    // eslint-disable-next-line
  }, [fileList]);

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <VectorEdit style={{ width: "1rem", height: "1rem", cursor: "pointer" }} />
        <input type="file" value="" accept="image/*" onChange={onFileDrop} />
      </div>
    </>
  );
};

export default DropFileInput;
