import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { hideDetails } from "../redux/postSlice";
import { useAppSelector,useAppDispatch } from "../hooks";
import {postType} from "../types";
const style : object = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function PostDetail() {
  const dispatch  = useAppDispatch();
  const show : boolean= useAppSelector((state) => state.post.showDetails);
  const postData : postType= useAppSelector((state) => state.post.postDetails);
  
  return (
    <div   onClick={()  => dispatch(hideDetails())} className="postDetail">
      <div >
        <Modal
          open={show}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Title
            </Typography>
            <Typography
              width="40vw"
              height="2.5vw"
              overflow="hidden !important"
              textOverflow="ellipsis"
              id="modal-modal-title"
              variant="body1"
            >
              {postData?.title}
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ mt: 2, marginTop: "5%" }}
            >
              Body
            </Typography>
            <Typography
              width="40vw"
              height="10vw"
              overflow="hidden !important"
              textOverflow="ellipsis"
              id="modal-modal-title"
              variant="body1"
              sx={{ mt: 2, marginTop: "1%" }}
            >
              {postData?.body}
            </Typography>
            <Button
              sx={{
                float: "right",
                margin: "10%",
                width: "50px",
              }}
              variant="text"
              onClick={()  => dispatch(hideDetails())}
            >
              close
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default PostDetail;
