import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetComments } from "../../reducers/commentManagement";
import { SendOutlined, MoreOutlined, EyeOutlined } from "@ant-design/icons";
import { Row, Col, Input, Popover } from "antd";
import { Collapse } from "react-collapse";
import CreateAComment from "./CreateAComment";
// import DeleteSingleComment from "./DeleteAComment";

const theme = {
	collapse: "ReactCollapse--collapse",
	content: "ReactCollapse--content",
};
export default function AllComments(props) {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.authentication.user.id);
	const comments = useSelector((state) => state.commentManagement.comments);
	const { postId, isOpened } = props;

	useEffect(() => {
		if (postId === isOpened) {
			onShowComments();
		}
	}, [isOpened]);

	const onShowComments = () => {
		dispatch(GetComments({ postId }));
	};

	return (
		<div>
			<Collapse
				isOpened={isOpened === postId}
				theme={theme}
				style={{ marginTop: 20 }}
			>
				{comments &&
					comments.map((comment) => (
						<Row>
							{/* <Col>
								<img
									src={comment.User.imageUrl}
									alt={comment.User.username}
									style={{
										heigth: 30,
										width: 30,
										borderRadius: "50%",
										marginBottom: 10,
									}}
								/>
							</Col> */}
							<Col>{comment.commentContent}</Col>
						</Row>
					))}
				<CreateAComment postId={postId} />
			</Collapse>
		</div>
	);
}
