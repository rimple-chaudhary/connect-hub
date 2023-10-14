import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TOAST_MESSAGES } from "../../constants/Toastify";
import { selectLoginDataWithAll, setLoginData, setUsers } from "../../redux/slice/AuthSlice";
import AuthForm from "../authForm/AuthForm";

const SignUp = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { users } = useSelector(selectLoginDataWithAll);

	const handleFinish = (values) => {
		const { email, password } = values;

		if (email && password) {
			if (!users.some((user) => user.email === email)) {
				dispatch(setLoginData({ email, password }));
				dispatch(setUsers({ email, password }));
				toast.success(TOAST_MESSAGES.signupSuccessful);
				navigate("/signin");
			} else {
				toast.error(TOAST_MESSAGES.errorExistEmail);
			}
		} else {
			toast.error(TOAST_MESSAGES.errorFillInputs);
		}
	};

	return (
		<AuthForm 
		 isSignUpForm={true}
		 buttonTitle={"Register"}
		 headingTitle={"Sign up"}
		 onFinish={handleFinish}
		/>
	);
};
export default SignUp;
