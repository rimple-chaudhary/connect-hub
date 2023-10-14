import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import DashBoard from "../components/dashBoard/DashBoard";
import SignIn from "../components/signIn/SignIn";
import SignUp from "../components/signUp/SignUp";
import { selectLoginDataWithAll } from "../redux/slice/AuthSlice";

function RoutesData() {
	const { loggedInUser } = useSelector(selectLoginDataWithAll);

	return (
		<Routes>
			{/* Check if the user is logged in */}
			{loggedInUser.email && loggedInUser?.password ? (
				<Route path="/" element={<DashBoard />} />
			) : (
				// Redirect to '/signin' if the user is not logged in
				<Route path="/" element={<Navigate to="/signin" />} />
			)}

			<Route path="/signin" element={<SignIn />} />
			<Route path="/signup" element={<SignUp />} />
		</Routes>
	);
}

export default RoutesData;
