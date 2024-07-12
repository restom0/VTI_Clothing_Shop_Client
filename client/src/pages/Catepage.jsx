import { useParams } from "react-router-dom";
import BreadcrumbsWithIcon from "../components/shared/BreadCrumbs";
import CategoryFilter from "../components/shared/shop/CategoryFilter";
import BrandFilter from "../components/shared/shop/BrandFilter";
import ProductFilter from "../components/shared/shop/ProductFilter";
import ShopList from "../components/shared/shop/ShopList";
const Catepage = () => {
  const { id } = useParams();
  const products = [
    {
      id: 0,
      colors: [
        { color: "#aaaaaa", label: "Màu xám" },
        { color: "#ffffaa", label: "Màu vàng" },
        { color: "#012345", label: "Màu xanh" },
        { color: "#777777", label: "Màu xám đen" },
      ],
      price: 155000,
      rating: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      title: "Abisko Trail Stretch Trousers M",
    },
    {
      id: 1,
      colors: [
        { color: "#aaaaaa", label: "Màu xám" },
        { color: "#ffffaa", label: "Màu vàng" },
        { color: "#012345", label: "Màu xanh" },
        { color: "#777777", label: "Màu xám đen" },
      ],
      price: 155000,
      rating: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      title: "Abisko Trail Stretch Trousers M",
    },
    {
      id: 2,
      colors: [
        { color: "#aaaaaa", label: "Màu xám" },
        { color: "#ffffaa", label: "Màu vàng" },
        { color: "#012345", label: "Màu xanh" },
        { color: "#777777", label: "Màu xám đen" },
      ],
      price: 155000,
      rating: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      title: "Abisko Trail Stretch Trousers M",
    },
    {
      id: 3,
      colors: [
        { color: "#aaaaaa", label: "Màu xám" },
        { color: "#ffffaa", label: "Màu vàng" },
        { color: "#012345", label: "Màu xanh" },
        { color: "#777777", label: "Màu xám đen" },
      ],
      price: 155000,
      rating: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      title: "Abisko Trail Stretch Trousers M",
    },
    {
      id: 4,
      colors: [
        { color: "#aaaaaa", label: "Màu xám" },
        { color: "#ffffaa", label: "Màu vàng" },
        { color: "#012345", label: "Màu xanh" },
        { color: "#777777", label: "Màu xám đen" },
      ],
      price: 155000,
      rating: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      title: "Abisko Trail Stretch Trousers M",
    },
    {
      id: 5,
      colors: [
        { color: "#aaaaaa", label: "Màu xám" },
        { color: "#ffffaa", label: "Màu vàng" },
        { color: "#012345", label: "Màu xanh" },
        { color: "#777777", label: "Màu xám đen" },
      ],
      price: 155.0,
      rating: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      title: "Abisko Trail Stretch Trousers M",
    },
    {
      id: 6,
      colors: [
        { color: "#aaaaaa", label: "Màu xám" },
        { color: "#ffffaa", label: "Màu vàng" },
        { color: "#012345", label: "Màu xanh" },
        { color: "#777777", label: "Màu xám đen" },
      ],
      price: 155.0,
      rating: 4,
      imageUrl:
        "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      title: "Abisko Trail Stretch Trousers M",
    },
  ];
  return (
    <>
      <div className="mb-5">
        <BreadcrumbsWithIcon name={id ? id : null} />
      </div>
      <div className="grid grid-cols-4 gap-8 mt-4">
        <div className="ms-10">
          {!id && <CategoryFilter />}
          <BrandFilter />
          <ProductFilter />
        </div>
        <ShopList products={products} />
      </div>
    </>
  );
};

export default Catepage;
