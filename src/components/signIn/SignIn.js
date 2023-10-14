import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TOAST_MESSAGES } from "../../constants/Toastify";
import {
  intitialUserState,
  selectLoginDataWithAll,
  setLoginData,
} from "../../redux/slice/AuthSlice";
import AuthForm from "../authForm/AuthForm";


const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector(selectLoginDataWithAll);

  const handleFinish = (values) => {
	console.log("values",values);
    if (values.email && values.password) {
      dispatch(setLoginData(intitialUserState));
      const { email, password } = values;
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        dispatch(setLoginData({ email: user.email, password: user.password }));
        toast.success(TOAST_MESSAGES.loginSuccessful);
        navigate("/");
      } else {
        toast.error(TOAST_MESSAGES.incorrectInputs);
      }
    } else {
      toast.error(TOAST_MESSAGES.errorFillInputs);
    }
  };

  return (
    <AuthForm
      isSignUpForm={false}
      buttonTitle={"Sign in"}
      headingTitle={"Sign in"}
      onFinish={handleFinish}
    />
  );
};

export default SignIn;
