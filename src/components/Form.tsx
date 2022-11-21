import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppSelector, useAppDispatch } from "../hooks";
import { useEffect, useState } from "react";
import { closeForm, addPosts, editPost } from "../redux/postSlice";
import {postType} from "../types"
function Form() {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const open : boolean = useAppSelector((state) => state.post.open);
  const posts : postType[] = useAppSelector((state) => state.post.posts);
  const favouriteList : postType[] = useAppSelector((state) => state.post.favouritePosts);
  const post : postType | null = useAppSelector((state) => state.post.postToEdit);

  useEffect(() : void => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [post]);

  const submitForm = (title: string, body: string) : void  => {

    if (post) {  // to Edit post
      const newArray = posts.map((element: postType) => {
        if (element.id === post.id) {
          return { ...element, title: title, body: body };
        } else {
          return element;
        }
      });

      const editFavouriteList = favouriteList.map((element: postType) => {
        if (element.id === post.id) {
          return { ...element, title: title, body: body };
        } else {
          return element;
        }
      });
      dispatch(editPost({ newArray, editFavouriteList }));
      setTitle("");
      setBody("");
      dispatch(closeForm());
    } else { // to add Post
      const newPost: postType = {
        id: posts.length + 1,
        title: title,
        body: body,
      };
      dispatch(addPosts(newPost));
      setTitle("");
      setBody("");
      dispatch(closeForm());
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>{post ? "Edit Psot" : "Add Post"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Body"
            type="text"
            fullWidth
            variant="standard"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(closeForm())}>Cancel</Button>
          <Button onClick={() => submitForm(title, body)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Form;
