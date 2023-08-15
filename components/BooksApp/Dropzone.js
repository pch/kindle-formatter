import React, { useState } from "react";
import styled from "styled-components";

const DropzoneWrapper = styled.div`
  position: relative;
  z-index: 0;
`;

const DropzoneAlert = styled.div`
  display: ${(props) => (props.$active ? "block" : "none")};
  background-color: rgba(52, 177, 235, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  pointer-events: none;
  z-index: 1000;
  border: 5px var(--light-indigo-4) solid;
`;

const DropzoneUploadingAlert = styled.div`
  display: ${(props) => (props.$uploading ? "block" : "none")};
  background-color: rgba(202, 100, 235, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  pointer-events: none;
  z-index: 1000;
`;

const DropzoneAlertMessage = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;

const Dropzone = ({
  children,
  onFileDrop,
  allowedMimeTypes,
  disallowedFileTypeMsg,
}) => {
  const [active, setActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!active) {
      setActive(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setActive(false);
    setUploading(true);

    const files = e.target.files || e.dataTransfer.files;
    const file = files[0];

    if (!allowedMimeTypes.includes(file.type)) {
      alert(disallowedFileTypeMsg);
      setUploading(false);
      return;
    }

    onFileDrop(file, handleFileUploaded);
  };

  const handleFileUploaded = () => setUploading(false);

  return (
    <DropzoneWrapper
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <DropzoneAlert $active={active}>
        <DropzoneAlertMessage>Drop file here</DropzoneAlertMessage>
      </DropzoneAlert>

      <DropzoneUploadingAlert $uploading={uploading}>
        <DropzoneAlertMessage>Processing file...</DropzoneAlertMessage>
      </DropzoneUploadingAlert>

      {children}
    </DropzoneWrapper>
  );
};

export default Dropzone;
