import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signup } from "../../reducers/authentication";
import { Form, Input, Button } from "antd";

function Signup() {
	const token = useSelector((state) => state.authentication.token);
	const [signUpFields, setSignUpFields] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const dispatch = useDispatch();
	const onChangeSignUpFields = (e) => {
		e.persist();
		const { name, value } = e.target;
		setSignUpFields((prev) => ({ ...prev, [name]: e.target.value }));
	};
	const onSignUp = (e) => {
		e.preventDefault();
		dispatch(signup(signUpFields));
	};

	if (token) {
		return <Redirect to="/" />;
	}
	return (
		<div>
			<Form>
				<Form.Item
					name="username"
					label="User Name"
					value={signUpFields.username}
					onChange={onChangeSignUpFields}
					rules={[
						{
							required: true,
							message: "Please input your Username!",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="email"
					label="E-mail"
					value={signUpFields.email}
					onChange={onChangeSignUpFields}
					rules={[
						{
							type: "email",
							message: "The input is not valid E-mail!",
						},
						{
							required: true,
							message: "Please input your E-mail!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="password"
					label="Password"
					value={signUpFields.password}
					onChange={onChangeSignUpFields}
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
					hasFeedback
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="confirmPassword"
					label="Confirm Password"
					value={signUpFields.confirmPassword}
					onChange={onChangeSignUpFields}
					dependencies={["password"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please confirm your password!",
						},
						({ getFieldValue }) => ({
							validator(rule, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(
									"The two passwords that you entered do not match!"
								);
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" onClick={onSignUp}>
						Register
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default Signup;
