import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialUserFriendState = {
  userFriends: [],
};

const userFriendSlice = createSlice({
  name: "userFriend",
  initialState: initialUserFriendState,
  reducers: {
    sendFriendRequest(state, action) {
      const { user_email, friend_email } = action.payload;

      state.userFriends.push({
        user_email,
        friend_email,
        status: false,
      });
    },
    acceptFriendRequest(state, action) {
      const { friendEmail, loggedInUserEmail } = action.payload;
      const friendRequest = state.userFriends.find(
        (friend) =>
          friend.friend_email === loggedInUserEmail &&
          friend.user_email === friendEmail
      );
      if (friendRequest) {
        friendRequest.status = true;
      }
    },
    rejectFriendRequest(state, action) {
      const { friendEmail, loggedInUserEmail } = action.payload;
      state.userFriends = state.userFriends.filter(
        (friend) =>
          !(
            friend.friend_email === loggedInUserEmail &&
            friend.user_email === friendEmail
          )
      );
    },
  },
});

export const { sendFriendRequest, acceptFriendRequest, rejectFriendRequest } =
  userFriendSlice.actions;

const selectUserFriendSlice = (state) => state.userFriend;

export const selectLoggedInUserFriends = createSelector(
  [selectUserFriendSlice, (state, loggedInUserEmail) => loggedInUserEmail],
  (userFriendSlice, loggedInUserEmail) => {
    return userFriendSlice.userFriends.filter(
      (friend) => friend.user_email === loggedInUserEmail
    );
  }
);

export default userFriendSlice.reducer;
