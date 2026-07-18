import { Typography } from "@material-tailwind/react/components/Typography";
import { Container, Rating } from "@mui/material";
import AdminLayout from "../../layouts/admin/admin.layout";
import { comment } from "../../constants/head_table.constant";
import { useDeleteCommentMutation, useGetCommentsQuery } from "../../apis/comment.api";
import Loading from "../shared/loading.component";

/** Handles comment. */
const Comment = () => {
  const { data: comments, error, isLoading } = useGetCommentsQuery();
  const [deleteComment] = useDeleteCommentMutation();
  // const [updateComment, { isLoading: isUpdated, error: updateError }] =
  //   useUpdateCommentMutation();
  // const [createComment, { isLoading: isAdded, error: addError }] =
  //   useAddCommentMutation();
  if (isLoading) return <Loading />;
  if (error) return <div>error</div>;
  /** Handles delete comment. */
  const handleDeleteComment = async (id) => {
    try {
      const message = await deleteComment(id);
      return message;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AdminLayout
      handleDeleteSubmit={handleDeleteComment}
      name="Lượt bình luận"
      TABLE_HEAD={comment}
      TABLE_ROWS={comments ?? []}
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
              <Typography variant="small">Áo thun đẹp, chất lượng tốt, giá hợp lý</Typography>
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
  );
};

export default Comment;
