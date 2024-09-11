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
import { Container, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/admin/admin.layout";
import { category } from "../../constants/head_table";
import CloseIcon from "@mui/icons-material/Close";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../apis/category.api";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectedId } from "../../features/slices/select_id.slice";
import Loading from "../shared/loading.component";
import { useUpdateBrandMutation } from "../../apis/brand.api";
import { Toast } from "../../configs/sweetalert2.config";
import { resetName, setName } from "../../features/slices/name.slice";
import {
  resetDescription,
  setDescription,
} from "../../features/slices/description.slice";

const Category = () => {
  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(!addOpen);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");
  const selectedId = useSelector((state) => state.selectedId.value);

  const { data: categories, error, isLoading } = useGetCategoriesQuery();
  const [addCategory, { isLoading: isAdded, error: AddError }] =
    useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdated, error: updateError }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleted, error: deleteError }] =
    useDeleteCategoryMutation();

  useEffect(() => {
    if (selectedId !== -1) {
      setUpdateName(
        categories?.object.find((row) => row.id === selectedId)?.name
      );
      setUpdateDescription(
        categories?.object.find((row) => row.id === selectedId)?.description
      );
    }
  }, [selectedId, categories]);
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
      id: categories.object.find((category) => category.id === selectedId).id,
      name: updateName,
      description: updateDescription,
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
        headerUpdate={"Chỉnh sửa thương hiệu #" + selectedId}
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
              <TextField
                className="w-full"
                variant="outlined"
                autoComplete="off"
                placeholder="Quần tây"
                onChange={(e) => setUpdateName(e.target.value)}
                value={updateName}
              />
            </div>
            <Typography variant="h5" color="blue-gray" className="font-bold">
              Mô tả:
            </Typography>
            <TextField
              className="w-full !mt-2"
              size="lg"
              rows={4}
              maxRows={4}
              multiline
              variant="outlined"
              placeholder="Mô tả không quá 255 kí tự"
              autoComplete="off"
              onChange={(e) => setUpdateDescription(e.target.value)}
              value={updateDescription}
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
              <TextField
                className="w-full"
                variant="outlined"
                placeholder="Quần tây"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <Typography variant="h5" color="blue-gray" className="font-bold">
              Mô tả:
            </Typography>
            <TextField
              className="w-full !mt-2"
              size="lg"
              rows={4}
              maxRows={4}
              multiline
              placeholder="Mô tả không quá 255 kí tự"
              variant="outlined"
              autoComplete="off"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
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
