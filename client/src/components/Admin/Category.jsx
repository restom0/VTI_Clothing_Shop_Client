import {
  Button,
  Card,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
  IconButton,
  Tooltip,
  Input,
  Textarea,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import { category } from "../../constants/table_head";
import CloseIcon from "@mui/icons-material/Close";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../apis/CategoryApi";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectedId } from "../../features/slices/selectIdSlice";
import Loading from "../shared/Loading";
import { useUpdateBrandMutation } from "../../apis/BrandApi";
import { Toast } from "../../configs/SweetAlert2";
import { resetName, setName } from "../../features/slices/nameSlice";
import {
  resetDescription,
  setDescription,
} from "../../features/slices/descriptionSlice";

const Category = () => {
  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(!addOpen);
  const dispatch = useDispatch();
  const name = useSelector((state) => state.name.value);
  const description = useSelector((state) => state.description.value);
  const selectedId = useSelector((state) => state.selectedId.value);

  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const [addCategory, { isLoading: isAdded, error: AddError }] =
    useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdated, error: updateError }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleted, error: deleteError }] =
    useDeleteCategoryMutation();

  const handleAddSubmit = async () => {
    try {
      await addCategory({ name, description })
        .unwrap()
        .then(() => {
          Toast.fire({
            icon: "success",
            title: "Thêm danh mục thành công",
          }).then(() => {
            handleAddOpen();
          });
        });
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Thêm danh mục thất bại",
      }).then(() => {
        // if (err.originalStatus === 401) {
        //   localStorage.clear();
        //   navigate("/login");
        // }
      });
    }
  };
  const updateSubmit = async () => {
    const message = await updateCategory({
      id: categories.object[selectedId].id,
      name: name === "" ? categories.object[selectedId].name : name,
      description:
        description === ""
          ? categories.object[selectedId].description
          : description,
    });
    return message;
  };

  const handleDeleteSubmit = async () => {
    try {
      const message = await deleteCategory(categories.object[selectedId].id);
      if (message.data.statusCode === 200) {
        Toast.fire({
          icon: "success",
          title: "Xóa thành công",
        }).then(() => {
          dispatch(resetSelectedId());
        });
      }
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: "Xóa thất bại",
      });
    }
  };
  if (isLoading) return <Loading />;
  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <AdminLayout
        name="Danh sách danh mục"
        TABLE_HEAD={category}
        TABLE_ROWS={categories.object ? categories.object : []}
        updateContent="Chỉnh sửa"
        deleteContent="Xóa"
        size="md"
        headerDetail={"Chi tiết danh mục #" + selectedId}
        bodyDetail={
          <Container>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Typography variant="h5" color="blue-gray" className="font-bold">
                Tên danh mục:
              </Typography>
              <Typography variant="medium" className="my-auto">
                {(selectedId !== -1 &&
                  categories.object.find((row) => row.id === selectedId)
                    ?.name) ||
                  ""}
              </Typography>
            </div>
            <Typography variant="h5" color="blue-gray" className="font-bold">
              Mô tả:
            </Typography>
            <Typography variant="medium">
              {(selectedId !== -1 &&
                categories.object.find((row) => row.id === selectedId)
                  ?.description) ||
                ""}
            </Typography>
          </Container>
        }
        headerUpdate="Chỉnh sửa thương hiệu"
        bodyUpdate={
          <Container>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold my-auto"
              >
                Tên danh mục:
              </Typography>
              <Input
                value={
                  selectedId === -1
                    ? ""
                    : name === ""
                    ? categories.object.find((row) => row.id === selectedId)
                        ?.name || ""
                    : name
                }
                placeholder="Nike"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => dispatch(setName(e.target.value))}
              />
            </div>
            <Typography variant="h5" color="blue-gray" className="font-bold">
              Mô tả:
            </Typography>
            <Textarea
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={
                selectedId === -1
                  ? ""
                  : description === ""
                  ? categories.object.find((row) => row.id === selectedId)
                      ?.description || ""
                  : description
              }
              onChange={(e) => dispatch(setDescription(e.target.value))}
              placeholder="Thương hiệu thể thao hàng đầu thế giới"
            />
          </Container>
        }
        updateSubmit={updateSubmit}
        handleDeleteSubmit={handleDeleteSubmit}
        isUpdated={isUpdated}
        isDeleted={isDeleted}
      >
        <div className="flex items-center justify-between gap-4">
          <Button
            className=" !border-gray-300"
            color="gray"
            variant="outlined"
            onClick={handleAddOpen}
          >
            Thêm mới
          </Button>
        </div>
      </AdminLayout>
      <Dialog open={addOpen} handler={handleAddOpen} size="md">
        <DialogHeader className="pb-0 flex justify-between">
          <Typography variant="h4">Thêm danh mục</Typography>
          <IconButton
            className="border-none"
            variant="outlined"
            onClick={handleAddOpen}
          >
            <CloseIcon />
          </IconButton>
        </DialogHeader>
        <DialogBody>
          <Container>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-bold my-auto"
              >
                Tên danh mục:
              </Typography>
              <Input
                placeholder="Nike"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => dispatch(setName(e.target.value))}
              />
            </div>
            <Typography variant="h5" color="blue-gray" className="font-bold">
              Mô tả:
            </Typography>
            <Textarea
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => dispatch(setDescription(e.target.value))}
              placeholder="Thương hiệu thể thao hàng đầu thế giới"
            />
          </Container>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={handleAddSubmit}
            loading={isAdded}
          >
            {!isAdded && <span>Thêm mới</span>}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default Category;
