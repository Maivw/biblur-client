import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../reducers/authentication";

import { Form, Input, Row, Col } from "antd";
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
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
		<Row
			className="container"
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
			}}
		>
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
						label="Password"
						name="password"
						value={loginFields.password}
						onChange={onChangeInputFiels}
					/>

					<button type="primary" onClick={onLogin}>
						Login
					</button>
				</Form>
			</Col>
		</Row>
	);
}

export default Login;
