import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

export const intitialUserState = {
	email: "",
	password: "",
};

const initialState = {
	loggedInUser: intitialUserState,
	users: [],
};

 const AuthSlice = createSlice({
	name: "AuthSlice",
	initialState,
	reducers: {
		setLoginData: (state, action) => {
			state.loggedInUser = action.payload;
		},
		setUsers: (state, action) => {
			state.users = [...state.users, action.payload];
		},
	},
});

export const { setLoginData, setUsers } = AuthSlice.actions;

export const loggedInUser = (state) => state.AuthSlice.loggedInUser;
export const users = (state) => state.AuthSlice.users;

export const selectLoginDataWithAll = createSelector([loggedInUser,users], (loggedInUser, users) => ({
	loggedInUser,
	users,
}));

export default AuthSlice.reducer;
