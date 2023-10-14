import { Button, Form, Image, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { VALIDATION_MESSAGES } from "../../constants/Message";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { REGEX_PATTERN } from "../../constants/Pattern";
import "./AuthForm.scss";

const AuthForm = ({ isSignUpForm, buttonTitle, headingTitle, onFinish }) => {
  return (
    <div >
      <div className="form-img-container" >
        <Image
          src="https://img.freepik.com/premium-vector/hands-with-beer-mugs-illustration_176516-940.jpg?w=740"
          style={{ width: "62%", height: "60%" }}
          preview={false}
        />{" "}
        <div className="form-container">
          <span>
            <h1 className="heading-name"> {headingTitle}</h1>{" "}
          </span>
          <Form name="login" onFinish={onFinish}>
            <Form.Item
              name="email"
              label="Email"
              colon={false}
              required={false}
              rules={[
                {
                  type: "email",
                  message: VALIDATION_MESSAGES.EMAIL_VALID_MESSAGE,
                },
                {
                  required: true,
                  message: VALIDATION_MESSAGES.EMAIL_INPUT_MESSAGE,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              required={false}
              colon={false}
              shouldUpdate={
                isSignUpForm
                  ? (prevValues, currentValues) =>
                      prevValues.email !== currentValues.email ||
                      prevValues.password !== currentValues.password
                  : null
              }
              rules={
                isSignUpForm
                  ? [
                      {
                        required: true,
                        type: "password",
                        message: VALIDATION_MESSAGES.PASSWORD_VALID_MESSAGE,
                      },
                      {
                        pattern: new RegExp(REGEX_PATTERN),
                        message: VALIDATION_MESSAGES.PASSWORD_PATTERN_MESSAGE,
                      },
                    ]
                  : [
                      {
                        required: true,
                        message: VALIDATION_MESSAGES.PASSWORD_VALID_MESSAGE,
                      },
                    ]
              }
            >
              <Input type="password" placeholder="Enter your password"  />
            </Form.Item>
            {isSignUpForm && (
              <Form.Item
                name="confirm"
                label="Confirm Password"
                colon={false}
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: false,
                    message: VALIDATION_MESSAGES.CONFIRM_PASSWORD_MESSAGE,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          VALIDATION_MESSAGES.CONFIRM_PASSWORD_ERROR_MESSAGE
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input
				type="password"
                  placeholder="Confirm password"
                />
              </Form.Item>
            )}
            {isSignUpForm ? (
              <p>
                If you already have an account,{" "}
                <Link to={"/signin"}>click here to sign in</Link>.
              </p>
            ) : (
              <p>
                If you don't have an account,{" "}
                <Link to={"/signup"}>click here to sign up</Link>.
              </p>
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#dbce43" }}
              >
                {buttonTitle}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>{" "}
    </div>
  );
};

export default AuthForm;
