import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { SendOutlined } from "@ant-design/icons";
import { Row, Col, Input } from "antd";
import { MakeAComment } from "../../reducers/commentManagement";

export default function CreateAComment(props) {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.authentication.user.id);
	const [comment_content, setCommentContent] = useState("");
	const { postId } = props;

	// const onSentComment = (e) => {
	// 	e.preventDefault();
	// 	dispatch(createAComment(comment_content, postId, user_id));
	// 	setCommentContent("");
	// };
	// const updateInputComment = (e) => {
	// 	e.persist();
	// 	setCommentContent(e.target.value);
	// };
	// return (
	// 	<div>
	// 		<Row className="mt-3">
	// 			<Col xl={4} md={4} sm={4}>
	// 				<img
	// 					style={{
	// 						heigth: 30,
	// 						width: 30,
	// 						borderRadius: 15,
	// 					}}
	// 				/>
	// 			</Col>
	// 			<Col
	// 				xl={19}
	// 				md={19}
	// 				sm={19}
	// 				className="self-center"
	// 				style={{ position: "relative" }}
	// 			>
	// 				<Input
	// 					onChange={updateInputComment}
	// 					name="comment_content"
	// 					value={comment_content}
	// 					style={{
	// 						heigth: 40,
	// 						width: "100%",
	// 						borderColor: "#111d2c",
	// 						borderStyle: "solid",
	// 						borderRadius: 5,
	// 					}}
	// 				/>
	// 				<SendOutlined
	// 					onClick={onSentComment}
	// 					style={{
	// 						position: "absolute",
	// 						top: "35%",
	// 						right: 10,
	// 						color: "#15395b",
	// 					}}
	// 				/>
	// 			</Col>
	// 		</Row>
	// 	</div>
	return <h1>HH</h1>;
}
