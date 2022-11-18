import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {postType} from "../types"


type SliceState = {
  posts: postType[];
  favouritePosts: postType[];
  postToEdit: postType | null;
  open: boolean;
  postDetails: postType;
  showDetails: boolean;
};

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
    getPostsData: (state, action) => {
      state.posts = action.payload;
    },
    openForm: (state, action: PayloadAction<postType | null>) => {
      state.open = true;
      state.postToEdit = action.payload;
    },
    closeForm: (state) => {
      state.open = false;
    },
    addPosts: (
      state,
      action: PayloadAction<{ id: number; title: string; body: string }>
    ) => {
      state.posts = [...state.posts, action.payload];
    },
    addToFavourite: (state, action: PayloadAction<postType>) => {
      state.favouritePosts = [...state.favouritePosts, action.payload];
    },
    removeFromFavourite: (state, action: PayloadAction<postType[]>) => {
      state.favouritePosts = action.payload;
    },
    editPost: (state, action) => {
      state.posts = action.payload.newArray;
      state.favouritePosts = action.payload.editFavouriteList;
    },
    showPostDetails: (state, action) => {
      state.showDetails = true;
      state.postDetails = action.payload;
    },
    hideDetails: (state) => {
      state.showDetails = false;
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
