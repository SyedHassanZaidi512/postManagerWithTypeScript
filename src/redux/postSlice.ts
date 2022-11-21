import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {postType} from "../types"
import {SliceState} from "../types"

const initialState: SliceState = {
  posts: [],
  favouritePosts: [],
  postToEdit: {id:0, title: "", body: "" },
  open: false,
  postDetails: {id:0, title: "", body: "" },
  showDetails: false,
};

const postSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    getPostsData: (state, action):void => {
      state.posts = action.payload;
      console.log(state.posts,"what posts have")
    },
    openForm: (state, action: PayloadAction<postType | null>):void => {
      state.open = true;
      state.postToEdit = action.payload;
    },
    closeForm: (state):void => {
      state.open = false;
    },
    addPosts: (
      state,
      action: PayloadAction<{ id: number; title: string; body: string }>
    ) : void => {
      state.posts = [...state.posts, action.payload];
    },
    addToFavourite: (state, action: PayloadAction<postType>) : void => {
      state.favouritePosts = [...state.favouritePosts, action.payload];
    },
    removeFromFavourite: (state, action: PayloadAction<postType[]>) => {
      state.favouritePosts = action.payload;
    },
    editPost: (state, action) : void => {
      state.posts = action.payload.newArray;
      state.favouritePosts = action.payload.editFavouriteList;
    },
    showPostDetails: (state, action) : void => {
      state.showDetails = true;
      state.postDetails = action.payload;
    },
    hideDetails: (state) : void => {
      state.showDetails = false ;
    },
  },
});

export const {
  getPostsData,
  addToFavourite,
  addPosts,
  openForm,
  closeForm,
  editPost,
  showPostDetails,
  hideDetails,
  removeFromFavourite,
} = postSlice.actions;
export default postSlice.reducer;
