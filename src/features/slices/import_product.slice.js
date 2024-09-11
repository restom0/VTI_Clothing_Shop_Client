import { createSlice } from "@reduxjs/toolkit";
import { setProduct } from "./product.slice";

const initialState = {
  product: {},
  color_code: "",
  color_name: "",
  size: "",
  height: "",
  weight: "",
  material: "",
  gender: "",
  importPrice: 1000,
  importNumber: 1,
};

export const importedProductSlice = createSlice({
  name: "importedProduct",
  initialState,
  reducers: {
    setImportedProduct: (state, action) => {
      state.product = action.payload.product;
      state.color_code = action.payload.color_code;
      state.color_name = action.payload.color_name;
      state.size = action.payload.size;
      state.height = action.payload.height;
      state.weight = action.payload.weight;
      state.material = action.payload.material;
      state.importNumber = action.payload.importNumber;
      state.importPrice = action.payload.importPrice;
      state.gender = action.payload.gender;
    },
    setProductId: (state, action) => {
      state.product = action.payload;
    },
    setColorCode: (state, action) => {
      console.log(action.payload);
      state.color_code = action.payload;
    },
    setColorName: (state, action) => {
      state.color_name = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setWeight: (state, action) => {
      state.weight = action.payload;
    },
    setMaterial: (state, action) => {
      state.material = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setImportPrice: (state, action) => {
      state.importPrice = action.payload;
    },
    setImportNumber: (state, action) => {
      state.importNumber = action.payload;
    },
    resetImportedProduct: (state) => {
      state.product = {};
      state.color_code = "";
      state.color_name = "";
      state.size = "";
      state.height = "";
      state.weight = "";
      state.gender = "";
      state.material = "";
      state.importPrice = 1000;
      state.importNumber = 1;
    },
  },
});

export const {
  setImportedProduct,
  resetImportedProduct,
  setColorCode,
  setColorName,
  setGender,
  setHeight,
  setImportNumber,
  setImportPrice,
  setMaterial,
  setSize,
  setWeight,
  setProductId,
} = importedProductSlice.actions;

export default importedProductSlice.reducer;
