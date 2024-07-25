import React from "react";
import { useDispatch } from "react-redux";
import { setAvatar } from "../features/slices/avatar_urlSlice";
import { setSlider1 } from "../features/slices/slider1Slice";
import { setSlider2 } from "../features/slices/slider2Slice";
import { setSlider3 } from "../features/slices/slider3Slice";
import { setSlider4 } from "../features/slices/slider4Slice";

function ImageUpload({ image }) {
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
    if (image === "avatar_url")
      dispatch(setAvatar({ value: file.url, publicId: file.public_id }));
    else if (image === "slider_url_1")
      dispatch(setSlider1({ value: file.url, publicId: file.public_id }));
    else if (image === "slider_url_2")
      dispatch(setSlider2({ value: file.url, publicId: file.public_id }));
    else if (image === "slider_url_3")
      dispatch(setSlider3({ value: file.url, publicId: file.public_id }));
    else if (image === "slider_url_4")
      dispatch(setSlider4({ value: file.url, publicId: file.public_id }));
  };

  return (
    <div>
      <input id={image} type="file" className="hidden" onChange={uploadImage} />
    </div>
  );
}

export default ImageUpload;
