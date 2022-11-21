import "../App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PostDetail from "./PostDetail";
import Form from "./Form";
import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../hooks";
import { addToFavourite, showPostDetails } from "../redux/postSlice";
import { useState, useEffect } from "react";
import { postType } from "../types";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  height: "6rem",
  color: theme.palette.text.secondary,
}));

const IsEmptyList = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  justifyContent: "center",
  paddingTop: "90px",
  height: "15rem",
  width: "50rem",
}));

function PostList() {
  const dispatch = useAppDispatch();
  const [checkList, setCheckList] = useState<number[]>([]);
  const posts: postType[] = useAppSelector((state) => state.post.posts);
  const favouritePosts: postType[] = useAppSelector(
    (state) => state.post.favouritePosts
  );

  useEffect((): void => {
    filterIds();
  }, [favouritePosts]);

  const filterIds = (): void => {
    const postIds: number[] = favouritePosts?.map((element: postType) => {
      return element.id;
    });
    setCheckList(postIds);
  };

  const showDetail = (id: number): void => {
    const filterPost = posts.filter((element: any) => {
      return element.id === id;
    });
    dispatch(showPostDetails(filterPost[0]));
  };

  if (posts.length <= 0) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div>
      <Form />
      <PostDetail />
      <div className="postsList">
        {posts?.map((post: any) => (
          <Box
            key={post.id}
            sx={{
              width: "25%",
              padding: "2%",
              cursor: "pointer",
            }}
          >
            <Box>
              <Tooltip title="view details">
                <Item
                  sx={{ fontWeight: "bold" }}
                  onClick={() => showDetail(post.id)}
                >
                  <Typography
                    height="50%"
                    width="90%"
                    padding="2%"
                    fontWeight="bold"
                    overflow="hidden !important"
                    textOverflow="ellipsis"
                  >
                    {post?.title}
                  </Typography>
                  <Divider />
                </Item>
              </Tooltip>
              <Tooltip title="Add to favourite">
                <Button
                  disabled={checkList?.includes(post.id)}
                  type="button"
                  variant="contained"
                  sx={{
                    width: "5vw",
                    position: "relative",
                    bottom: "2.2rem",
                    left: "10vw",
                    height: "1.5 vw",
                    fontSize: "60%",
                    backgroundColor: "blue",
                    marginTop: "2px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => dispatch(addToFavourite(post))}
                >
                  {checkList?.includes(post.id) ? "Added" : "favourite"}
                </Button>
              </Tooltip>
            </Box>
          </Box>
        ))}
      </div>
    </div>
  );
}

export default PostList;
