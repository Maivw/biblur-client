import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetComments } from "../../reducers/commentManagement";
import { SendOutlined, MoreOutlined, EyeOutlined } from "@ant-design/icons";
import { Row, Col, Input, Popover } from "antd";
import { Collapse } from "react-collapse";
import CreateAComment from "./CreateAComment";
import DeleteSingleComment from "./DeleteAComment";

const theme = {
	collapse: "ReactCollapse--collapse",
	content: "ReactCollapse--content",
};
export default function AllComments(props) {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.authentication.user.id);
	const comments = useSelector((state) => state.commentManagement.comments);
	const { postId, isOpened } = props;
	const [visibleShowmore, setVisibleShowmore] = useState(false);

	useEffect(() => {
		if (postId === isOpened) {
			onShowComments();
		}
	}, [isOpened]);

	const onShowComments = () => {
		dispatch(GetComments({ postId }));
	};
	const onShowDeleteSingleComment = () => {};
	const onShowEditSingleComment = () => {};
	const onShowMore = (commentId) => () => {
		setVisibleShowmore(commentId);
	};
	const closeShowmore = (e) => {};
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
							<Col style={{ border: "1px solid gray", width: "100%" }}>
								{comment.commentContent}
								<Popover
									content={
										<div>
											<button
												onClick={onShowEditSingleComment(comment.id)}
												style={{ marginLeft: 15 }}
											>
												<EyeOutlined style={{ color: "#177ddc" }} />
											</button>
											<br></br>
											<button onClick={onShowDeleteSingleComment(comment.id)}>
												<DeleteSingleComment
													postId={postId}
													commentId={comment.id}
												/>
											</button>

											<p
												onClick={closeShowmore}
												style={{ marginLeft: 15, color: "#177ddc" }}
											>
												Close
											</p>
										</div>
									}
									title=""
									trigger="click"
									visible={visibleShowmore === comment.id}
								></Popover>
								<MoreOutlined
									style={{
										display: "flex",
										justifyContent: "flex-end",
										marginTop: -10,
									}}
									onClick={onShowMore(comment.id)}
								/>
							</Col>
						</Row>
					))}
				<CreateAComment postId={postId} />
			</Collapse>
		</div>
	);
}
