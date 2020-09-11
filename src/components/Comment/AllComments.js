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
import "./AllComment.css";

const imageUrlDefault =
	"http://sarangglobaltours.com/wp-content/uploads/2014/02/team.png";

const theme = {
	collapse: "ReactCollapse--collapse",
	content: "ReactCollapse--content",
};
export default function AllComments(props) {
	const dispatch = useDispatch();
	const user_Id = useSelector((state) => state.authentication.user.id);
	const comments = useSelector((state) => state.commentManagement.comments);
	const posts = useSelector((state) => state.postManagement.posts);
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

	return (
		<div>
			<Collapse
				isOpened={isOpened === postId}
				theme={theme}
				style={{ marginTop: 20 }}
			>
				{comments &&
					comments.map((comment) => {
						return (
							<Row key={comment.id}>
								<Col xl={3} md={3} xs={3}>
									{comment.User.imageUrl ? (
										<img
											src={comment.User.imageUrl}
											alt={comment.User.username}
											className="commentAvatar"
										/>
									) : (
										<img
											src={imageUrlDefault}
											alt="avatar"
											className="commentAvatar"
										/>
									)}
								</Col>
								<Col className="commentContent" xl={19} md={19} xs={19}>
									<Row>
										<Col xl={22} md={22} xs={22}>
											{comment.commentContent}
										</Col>
										<Col xl={1} md={1} xs={1} className="commentInputIcon">
											{posts &&
												posts.map((post) => {
													const likes = post.Likes;
													console.log("lll", likes);
													return (
														<HeartFilled
															onClick={onLikeComment(
																comment.id,
																post.id,
																user_Id
															)}
															style={{
																color: loveC === comment.id ? "red" : "black",
															}}
														/>
													);
												})}
											{/* <HeartFilled
												onClick={onLikeComment(comment.id, postId, user_Id)}
												style={{
													color: loveC === comment.id ? "red" : "black",
												}}
											/> */}
										</Col>
										<Col xl={1} md={1} xs={1} className="commentInputIcon">
											<div className="popover">
												<Popover
													content={
														<div>
															<EditSingleComment
																postId={postId}
																commentId={comment.id}
															/>
															<div
																style={{
																	display: "flex",
																	justifyContent: "space-between",
																	marginTop: 10,
																}}
															>
																<DeleteSingleComment
																	postId={postId}
																	commentId={comment.id}
																/>
																<p
																	onClick={closeShowmore}
																	style={{ marginLeft: 15, color: "#8c8c8c" }}
																>
																	Close
																</p>
															</div>
														</div>
													}
													title=""
													trigger="click"
													visible={visibleShowmore === comment.id}
													className="popover"
												></Popover>
											</div>

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
								</Col>
							</Row>
						);
					})}
				<Row xl={24} md={24} xs={24}>
					<Col xl={3} md={3} xs={3}></Col>
					<Col xl={19} md={19} xs={19}>
						<CreateAComment postId={postId} />
					</Col>
				</Row>
			</Collapse>
		</div>
	);
}
