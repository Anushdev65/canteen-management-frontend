import React, { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadImageMutation } from "../services/api/imageUpload";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function DropZoneComp({ handleImageUpload, value }) {
  const [uploadImage, { data, isSuccess }] = useUploadImageMutation();

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },

      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append("file", file);
        uploadImage(formData);
      },
    });

  useEffect(() => {
    if (isSuccess) {
      handleImageUpload(data.data.path);
    }
  }, [data, isSuccess, handleImageUpload]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop your image here, or click to select image</p>
      </div>
      {value && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={`${value}`}
            alt="Dropped"
            style={{ maxWidth: "100%", height: "10rem" }}
          />
        </div>
      )}
    </div>
  );
}

export default DropZoneComp;
