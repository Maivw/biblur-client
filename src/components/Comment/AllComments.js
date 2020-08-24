import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetComments } from "../../reducers/commentManagement";
import { LikeComment } from "../../reducers/postManagement";
import { MoreOutlined, HeartFilled } from "@ant-design/icons";
import { Row, Col, Popover } from "antd";
import { Collapse } from "react-collapse";
import CreateAComment from "./CreateAComment";
import DeleteSingleComment from "./DeleteAComment";
import EditSingleComment from "./EditSingleComment";

const imageUrlDefault =
	"https://www.pngkey.com/png/detail/52-522921_kathrine-vangen-profile-pic-empty-png.png";

const theme = {
	collapse: "ReactCollapse--collapse",
	content: "ReactCollapse--content",
};
export default function AllComments(props) {
	const dispatch = useDispatch();
	const user_Id = useSelector((state) => state.authentication.user.id);
	const comments = useSelector((state) => state.commentManagement.comments);
	const { postId, isOpened } = props;
	const [visibleShowmore, setVisibleShowmore] = useState(false);
	const [loveC, setLoveC] = useState(null);

	useEffect(() => {
		if (postId === isOpened) {
			onShowComments();
		}
	}, [isOpened]);

	const onShowComments = () => {
		dispatch(GetComments({ postId }));
	};
	const onShowMore = (commentId) => () => {
		setVisibleShowmore(commentId);
	};
	const closeShowmore = (e) => {
		setVisibleShowmore(false);
	};
	const onLikeComment = (commentId, postId, user_Id) => () => {
		dispatch(LikeComment({ commentId, postId, user_Id }));
		if (!loveC) {
			setLoveC(commentId);
		} else {
			setLoveC(null);
		}
	};

	// const closeShowmore = (visiblePopover) => {
	// 	setVisibleShowmore(visiblePopover);
	// };
	return (
		<div>
			<Collapse
				isOpened={isOpened === postId}
				theme={theme}
				style={{ marginTop: 20 }}
			>
				{comments &&
					comments.map((comment) => (
						<Row key={comment.id}>
							<Col>
								{comment.User.imageUrl ? (
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
								) : (
									<img
										src={imageUrlDefault}
										alt="avatar"
										style={{
											heigth: 30,
											width: 30,
											borderRadius: "50%",
											marginBottom: 10,
										}}
									/>
								)}
							</Col>
							<Col style={{ border: "1px solid gray", width: "100%" }}>
								{comment.commentContent}
								<div>
									<HeartFilled
										onClick={onLikeComment(comment.id, postId, user_Id)}
										style={{ color: loveC === comment.id ? "red" : "black" }}
									/>
								</div>
								<Popover
									content={
										<div>
											<button style={{ marginLeft: 15 }}>
												<EditSingleComment
													postId={postId}
													commentId={comment.id}
												/>
											</button>
											<br></br>
											<button>
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
