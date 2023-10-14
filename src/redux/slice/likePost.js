import { createSlice } from "@reduxjs/toolkit";
import { compareDesc } from "date-fns";
import { createSelector } from "reselect";

export const initialPostState = {
    postId : "", 
    friend_email: ""
};

const initialState = {
likes: [],
};

const LikesSlice = createSlice({
  name: "LikesSlice",
  initialState,
  reducers: {
   setLikes: (state, action) => {
        state.likes = action.payload

    },
  },
});

export const {setLikes} = LikesSlice.actions;

export const likes = (state) => state.LikesSlice.likes;

export const selectLikesOfAll = createSelector(
  [ likes],
  ( likes) => ({
    likes,
  })
);

export default LikesSlice.reducer;
