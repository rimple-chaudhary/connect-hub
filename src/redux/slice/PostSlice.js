import { createSlice } from "@reduxjs/toolkit";
import { compareDesc } from "date-fns";
import { createSelector } from "reselect";

export const initialPostState = {
  title: "",
  createdAtValue: "",
  createdAt: "",
  description: "",
  createdBy: "",
  images: [],
};

const initialState = {
  posts: [],
  likes: [],
};

const PostSlice = createSlice({
  name: "PostSlice",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      const data = [...state.posts, action.payload];
      state.posts = [...data].sort((a, b) =>
        compareDesc(new Date(a.createdAt), new Date(b.createdAt))
      );
    },
  },
});

export const { setPosts, setLikes } = PostSlice.actions;

export const posts = (state) => state.PostSlice.posts;

export const selectPostDataWithAll = createSelector([posts], (posts) => ({
  posts,
}));

export default PostSlice.reducer;
