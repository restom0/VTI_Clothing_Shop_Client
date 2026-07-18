import { describe, expect, it, vi } from "vitest";

import activeReducer, { decrement, increment, setActive } from "./active.slice";
import avatarReducer, { deleteAvatar, resetAvatar, setAvatar } from "./avatar_url.slice";
import brandReducer, { resetBrand, setBrand } from "./brand.slice";
import categoryReducer, { resetCategory, setCategory } from "./category.slice";
import descriptionReducer, { resetDescription, setDescription } from "./description.slice";
import filterReducer, { setFilter } from "./filter.slice";
import importedProductReducer, {
  resetImportedProduct,
  setColorCode,
  setColorName,
  setGender,
  setHeight,
  setImportedProduct,
  setImportNumber,
  setImportPrice,
  setMaterial,
  setProductId,
  setSize,
  setWeight,
} from "./import_product.slice";
import nameReducer, { resetName, setName } from "./name.slice";
import productReducer, { resetProduct, setProduct } from "./product.slice";
import selectedIdReducer, { resetSelectedId, setSelectedId } from "./select_id.slice";
import slidersReducer, {
  deleteSlider,
  resetAllSliders,
  resetSlider,
  setSlider,
} from "./sliders.slice";
import sortReducer, { setSort } from "./sort.slice";

vi.mock("../../utils/delete_image.util", () => ({
  handleDelete: vi.fn(),
}));

describe("basic Redux slices", () => {
  it("updates numeric and scalar slices", () => {
    expect(activeReducer(undefined, increment()).value).toBe(2);
    expect(activeReducer({ value: 2 }, decrement()).value).toBe(1);
    expect(activeReducer(undefined, setActive(7)).value).toBe(7);
    expect(descriptionReducer(undefined, setDescription("details")).value).toBe("details");
    expect(descriptionReducer({ value: "details" }, resetDescription()).value).toBe("");
    expect(filterReducer(undefined, setFilter("ACTIVE")).value).toBe("ACTIVE");
    expect(nameReducer(undefined, setName("Ada")).value).toBe("Ada");
    expect(nameReducer({ value: "Ada" }, resetName()).value).toBe("");
    expect(sortReducer(undefined, setSort({ column: 3, order: "ASC" }))).toEqual({
      id: 3,
      type: "ASC",
    });
  });

  it("sets and resets entity slices", () => {
    expect(brandReducer(undefined, setBrand({ id: 1 })).value).toEqual({ id: 1 });
    expect(brandReducer({ value: { id: 1 } }, resetBrand()).value).toEqual({});
    expect(categoryReducer(undefined, setCategory({ id: 2 })).value).toEqual({ id: 2 });
    expect(categoryReducer({ value: { id: 2 } }, resetCategory()).value).toEqual({});
    expect(productReducer(undefined, setProduct({ id: 3 })).value).toEqual({ id: 3 });
    expect(productReducer({ value: { id: 3 } }, resetProduct()).value).toEqual({});
  });

  it("updates imported product draft fields", () => {
    const draft = importedProductReducer(
      undefined,
      setImportedProduct({
        product: { id: 1 },
        color_code: "#fff",
        color_name: "White",
        size: "M",
        height: "170",
        weight: "65",
        material: "Cotton",
        importNumber: 20,
        importPrice: 100000,
        gender: "UNISEX",
      })
    );

    expect(draft).toMatchObject({ color_code: "#fff", importNumber: 20, product: { id: 1 } });
    expect(importedProductReducer(draft, setColorCode("#000")).color_code).toBe("#000");
    expect(importedProductReducer(draft, setColorName("Black")).color_name).toBe("Black");
    expect(importedProductReducer(draft, setSize("XL")).size).toBe("XL");
    expect(importedProductReducer(draft, setHeight("180")).height).toBe("180");
    expect(importedProductReducer(draft, setWeight("80")).weight).toBe("80");
    expect(importedProductReducer(draft, setMaterial("Linen")).material).toBe("Linen");
    expect(importedProductReducer(draft, setGender("MALE")).gender).toBe("MALE");
    expect(importedProductReducer(draft, setImportPrice(200000)).importPrice).toBe(200000);
    expect(importedProductReducer(draft, setProductId({ id: 9 })).product).toEqual({ id: 9 });
    expect(importedProductReducer(draft, setImportNumber(30)).importNumber).toBe(30);
    expect(importedProductReducer(draft, resetImportedProduct())).toMatchObject({
      product: {},
      color_code: "",
      importNumber: 1,
    });
  });

  it("updates avatar and slider image state", () => {
    const avatar = avatarReducer(
      undefined,
      setAvatar({ value: "avatar.png", publicId: "avatar-id" })
    );
    expect(avatar).toEqual({ value: "avatar.png", publicId: "avatar-id" });
    expect(avatarReducer(avatar, resetAvatar())).toEqual({ value: "", publicId: "" });
    expect(avatarReducer(avatar, deleteAvatar())).toEqual({ value: "", publicId: "" });

    const withSlider = slidersReducer(
      undefined,
      setSlider({ index: 2, value: "slide.png", publicId: "slide-id" })
    );
    expect(withSlider.slider2).toEqual({ value: "slide.png", publicId: "slide-id" });
    expect(slidersReducer(withSlider, resetSlider(2)).slider2).toEqual({ value: "", publicId: "" });
    expect(slidersReducer(withSlider, deleteSlider(2)).slider2).toEqual({
      value: "",
      publicId: "",
    });
    expect(slidersReducer(withSlider, resetAllSliders()).slider1).toEqual({
      value: "",
      publicId: "",
    });
  });

  it("updates selected id state", () => {
    expect(selectedIdReducer(undefined, setSelectedId(5))).toEqual({
      change: false,
      value: 5,
    });
    expect(selectedIdReducer({ change: true, value: 5 }, resetSelectedId())).toEqual({
      change: false,
      value: -1,
    });
  });
});
