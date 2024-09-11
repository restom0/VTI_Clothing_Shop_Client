import {
  Button,
  Card,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
  Dialog,
  Tooltip,
  Input,
  Tabs,
  TabsHeader,
  Tab,
  Select,
  Option,
  CardFooter,
  useSelect,
} from "@material-tailwind/react";
import { Container, Rating, TableHead } from "@mui/material";
import React from "react";
import useOpen from "../../hooks/useOpen.hook";
import AdminLayout from "../../layouts/admin/admin.layout";
import { comment } from "../../constants/table_head";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useUpdateCommentMutation,
} from "../../apis/comment.api";
import Loading from "../shared/loading.component";

const Comment = () => {
  const TABLE_ROWS = [
    {
      name: "001",
      role: "USER",
      action: "Tạo tài khoản",
      date: "23/04/18",
    },
  ];
  const navigate = useNavigate();
  const selectId = useSelector((state) => state.selectId);
  const { data: comments, error, isLoading } = useGetCommentsQuery();
  const [deleteComment, { isLoading: isDeleted, error: deleteError }] =
    useDeleteCommentMutation();
  // const [updateComment, { isLoading: isUpdated, error: updateError }] =
  //   useUpdateCommentMutation();
  // const [createComment, { isLoading: isAdded, error: addError }] =
  //   useAddCommentMutation();
  if (isLoading) return <Loading />;
  if (error) return <div>error</div>;
  const handleDeleteComment = async (id) => {
    try {
      const message = await deleteComment(id);
      return message;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AdminLayout
        handleDeleteSubmit={handleDeleteComment}
        name="Lượt bình luận"
        TABLE_HEAD={comment}
        TABLE_ROWS={comments ? comments : []}
        deleteContent="Khóa bình luận"
        noUpdate
        size="lg"
        headerDetail="Chi tiết bình luận #001"
        bodyDetail={
          <Container>
            <div className="grid grid-cols-3 gap-4 ">
              <div className="my-auto">
                <div className="flex items-center gap-4">
                  <Typography variant="h6">Người bình luận: </Typography>
                  <Typography variant="small">Nguyễn Văn A</Typography>
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="h6">Sản phẩm: </Typography>
                  <Typography variant="small">Áo thun nam</Typography>
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="h6">Đánh giá: </Typography>
                  <Rating value={4} readOnly />
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="h6">Nội dung: </Typography>
                </div>
                <Typography variant="small">
                  Áo thun đẹp, chất lượng tốt, giá hợp lý
                </Typography>
              </div>
              <div className="mx-auto col-span-2">
                <img
                  src="https://media3.coolmate.me/cdn-cgi/image/format=auto/uploads/April2024/QKK.EC.xamden4.jpg"
                  alt=""
                  className="w-56 h-56 object-cover"
                />
              </div>
            </div>
          </Container>
        }
      ></AdminLayout>
    </>
  );
};

export default Comment;
