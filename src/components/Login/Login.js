import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../reducers/authentication";
import "./Login.css";

import { Form, Input, Row, Col } from "antd";
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};

function Login(props) {
	const token = useSelector((state) => state.authentication.token);
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
		<Row className="container" className="loginForm">
			<Col xs={2} sm={4} md={6} lg={8} xl={10}>
				<Form
					{...layout}
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Input
						label="Email"
						name="email"
						value={loginFields.email}
						onChange={onChangeInputFiels}
					/>

					<Input
						type="password"
						label="Password"
						name="password"
						value={loginFields.password}
						onChange={onChangeInputFiels}
					/>

					<button
						type="primary"
						className="ghost"
						id="signIn"
						onClick={onLogin}
					>
						Login
					</button>
				</Form>
			</Col>
			<Col xs={2} sm={4} md={6} lg={8} xl={10}>
				<div class="overlay-container">
					<div class="overlay">
						<div class="overlay-panel overlay-left">
							<h1>Welcome Back!</h1>
							<p>
								To keep connected with us please login with your personal info
							</p>
						</div>
						<div class="overlay-panel overlay-right">
							<h1>Hello, Friend!</h1>
							<p>Enter your personal details and start journey with us</p>
							<button class="ghost" id="signUp">
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</Col>
		</Row>
	);
}

export default Login;
