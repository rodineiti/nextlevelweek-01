import React, { useCallback, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import "./styles.css";
import { Props } from "../../interfaces";

const Dropzone: React.FC<Props> = ({ onFileUpload }) => {
  const [fileUrl, setFileUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);
      setFileUrl(fileUrl);
      onFileUpload(file);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {fileUrl ? (
        <img src={fileUrl} alt="Thumbnail Point" title="Thumbnail Point" />
      ) : (
        <p>
          <FiUpload /> Imagem do estabelecimento
        </p>
      )}
    </div>
  );
};

export default Dropzone;
