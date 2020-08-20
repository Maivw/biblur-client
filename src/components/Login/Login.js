import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../reducers/authentication";

import { Form, Input, Button, Checkbox } from "antd";
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

function Login(props) {
	const token = useSelector((state) => state.authentication.token);
	console.log("AAA", token);
	const dispatch = useDispatch();
	const [loginFields, setLoginFields] = useState({
		email: "demo@gmail.com",
		password: "password",
	});

	const onChangeInputFiels = (e) => {
		e.persist();
		const { value, name } = e.target;
		setLoginFields((prev) => ({ ...prev, [name]: e.target.value }));
	};
	const onLogin = (e) => {
		e.preventDefault();
		dispatch(login(loginFields));
	};

	const onFinish = (values) => {
		console.log("Success:", values);
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	if (token) {
		return <Redirect to="/" />;
	}
	return (
		<div className="container">
			<Form
				{...layout}
				name="basic"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label="Email"
					name="email"
					value={loginFields.email}
					onChange={onChangeInputFiels}
					rules={[{ required: true, message: "Please input your username!" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					value={loginFields.password}
					onChange={onChangeInputFiels}
					rules={[{ required: true, message: "Please input your password!" }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item {...tailLayout} name="remember" valuePropName="checked">
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="Login" onClick={onLogin}>
						Login
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

export default Login;
