import React from "react";
const ImageUpload = ({ image, setPublicId, setAvatar }) => {
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dnv0lrysf");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dnv0lrysf/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    setAvatar(file.url);
    setPublicId(file.public_id);
  };

  return (
    <div>
      <input id={image} type="file" className="hidden" onChange={uploadImage} />
    </div>
  );
};

export default ImageUpload;
