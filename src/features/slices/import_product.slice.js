import { createSlice } from "@reduxjs/toolkit";

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
    /** Sets imported product. */
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
    /** Sets product id. */
    setProductId: (state, action) => {
      state.product = action.payload;
    },
    /** Sets color code. */
    setColorCode: (state, action) => {
      state.color_code = action.payload;
    },
    /** Sets color name. */
    setColorName: (state, action) => {
      state.color_name = action.payload;
    },
    /** Sets size. */
    setSize: (state, action) => {
      state.size = action.payload;
    },
    /** Sets height. */
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    /** Sets weight. */
    setWeight: (state, action) => {
      state.weight = action.payload;
    },
    /** Sets material. */
    setMaterial: (state, action) => {
      state.material = action.payload;
    },
    /** Sets gender. */
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    /** Sets import price. */
    setImportPrice: (state, action) => {
      state.importPrice = action.payload;
    },
    /** Sets import number. */
    setImportNumber: (state, action) => {
      state.importNumber = action.payload;
    },
    /** Resets imported product. */
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
