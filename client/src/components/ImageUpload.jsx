import React from "react";
import { useDispatch } from "react-redux";
import { setAvatar } from "../features/slices/avatar_urlSlice";
import { setSlider1 } from "../features/slices/slider1Slice";
import { setSlider2 } from "../features/slices/slider2Slice";
import { setSlider3 } from "../features/slices/slider3Slice";
import { setSlider4 } from "../features/slices/slider4Slice";

function ImageUpload({ image, setPublicId, setAvatar }) {
  const dispatch = useDispatch();

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
}

export default ImageUpload;
