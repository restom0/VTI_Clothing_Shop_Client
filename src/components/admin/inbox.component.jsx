import { Typography } from "@material-tailwind/react/components/Typography";
import { Textarea } from "@material-tailwind/react/components/Textarea";
import { Select, Option } from "@material-tailwind/react/components/Select";
import { Container } from "@mui/material";
import { inbox } from "../../constants/head_table.constant";
import AdminLayout from "../../layouts/admin/admin.layout";
const TABLE_ROWS = [
  {
    name: "001",
    role: "USER",
    date: "23/04/18",
  },
];
/** Handles inbox. */
const Inbox = () => {
  return (
    <AdminLayout
      name="Phản hồi của người dùng"
      TABLE_HEAD={inbox}
      TABLE_ROWS={TABLE_ROWS}
      updateContent="Phản hồi"
      deleteContent="Báo cáo vi phạm"
      size="md"
      headerDetail={"Phản hồi của #" + "001"}
      bodyDetail={
        <Container>
          <Typography variant="h6" color="blue-gray" className="font-bold">
            Nội dung:
          </Typography>
          <Typography color="blue-gray" className="font-normal mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, nunc nec
            ultricies tincidunt, nunc nec ultricies tincidunt, nunc nec ultricies?
          </Typography>
          <Typography variant="h6" color="blue-gray" className="font-bold">
            Trả lời:
          </Typography>
          <Typography color="blue-gray" className="font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, nunc nec
            ultricies tincidunt, nunc nec ultricies tincidunt, nunc nec ultricies?
          </Typography>
        </Container>
      }
      headerUpdate={"Phản hồi của #" + "001"}
      bodyUpdate={
        <Container>
          <Typography variant="h6" color="blue-gray" className="font-bold">
            Nội dung:
          </Typography>
          <Typography color="blue-gray" className="font-normal mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, nunc nec
            ultricies tincidunt, nunc nec ultricies tincidunt, nunc nec ultricies?
          </Typography>
          <Typography variant="h6" color="blue-gray" className="font-bold">
            Trả lời:
          </Typography>
          <Textarea color="lightBlue" size="regular" placeholder="Trả lời">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt, nunc nec
            ultricies tincidunt, nunc nec ultricies tincidunt, nunc nec ultricies?
          </Textarea>
        </Container>
      }
    >
      <div className="flex items-center justify-between gap-4">
        <Select label="Phân loại theo" value="Tất cả">
          <Option value="Tất cả">Tất cả</Option>
          <Option value="Chưa phản hồi">Chưa phản hồi</Option>
          <Option value="Đã phản hồi">Đã phản hồi</Option>
        </Select>
      </div>
    </AdminLayout>
  );
};

export default Inbox;
