import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
	getAllPosts,
	repostAPost,
	LikePost,
} from "../../reducers/postManagement";

import { Row, Col, Card, Divider } from "antd";
import moment from "moment";
import {
	MoreOutlined,
	EditOutlined,
	MessageOutlined,
	PictureOutlined,
	YoutubeOutlined,
	ShareAltOutlined,
	HeartFilled,
} from "@ant-design/icons";
import "../../index.css";
import "./GetAllPosts.css";

import CreatePostImageFile from "./CreatePostImageFile";
import CreatePostImageUrl from "./CreatePostImageUrl";
import CreatePostVideoUrl from "./CreatePostVideoUrl";
import EditAPost from "./EditAPost";
import DeleteAPost from "./DeleteAPost";
import AllComments from "../Comment/AllComments";
const imageUrlDefault =
	"https://www.pngkey.com/png/detail/52-522921_kathrine-vangen-profile-pic-empty-png.png";

function GetAllPosts(props) {
	const [collapse, setCollapse] = useState(null);
	const posts = useSelector((state) => state.postManagement.posts);
	const user_Id = useSelector((state) => state.authentication.user.id);
	const [visible, setVisible] = useState(false);
	const [visibleImageUrl, setVisibleImageUrl] = useState(false);
	const [visibleVideoUrl, setVisibleVideoUrl] = useState(false);
	const [activePostId, setActivePostId] = useState();
	const [visibleEditPost, setVisibleEditPost] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllPosts());
	}, []);

	const onShowModal = (e) => {
		setVisible(!visible);
	};
	const onCancel = () => {
		setVisible(!visible);
	};
	const onShowModalVideoUrl = (e) => {
		setVisibleVideoUrl(!visibleVideoUrl);
	};
	const onCancelVideoUrl = () => {
		setVisibleVideoUrl(!visibleVideoUrl);
	};
	const onShowModalImageUrl = (e) => {
		setVisibleImageUrl(!visibleImageUrl);
	};
	const onCancelImageUrl = () => {
		setVisibleImageUrl(!visibleImageUrl);
	};

	const onCancelEditPost = () => {
		setVisibleEditPost(false);
	};

	const onShowEditModal = (postId) => () => {
		setVisibleEditPost(true);
		setActivePostId(postId);
	};
	const onRepost = (post) => () => {
		dispatch(repostAPost(post));
	};
	const onLikePost = (post) => () => {
		dispatch(LikePost({ user_Id, ...post }));
	};

	const onCollapse = (postId) => () => {
		collapse ? setCollapse(null) : setCollapse(postId);
	};
	return (
		<div className="app-container">
			<CreatePostImageFile visible={visible} onCancel={onCancel} />
			<CreatePostImageUrl
				visible={visibleImageUrl}
				onCancel={onCancelImageUrl}
			/>
			<CreatePostVideoUrl
				visible={visibleVideoUrl}
				onCancel={onCancelVideoUrl}
			/>
			{visibleEditPost && (
				<EditAPost
					visible={visibleEditPost}
					onCancel={onCancelEditPost}
					id={activePostId}
				/>
			)}
			<Row className="createPost__options">
				Create Post
				<Col className="text-white" style={{ marginLeft: 30 }}>
					<PictureOutlined onClick={onShowModal} />
				</Col>
				<Col className="text-white" style={{ marginLeft: 30 }}>
					<EditOutlined onClick={onShowModalImageUrl} />
				</Col>
				<Col className="text-white" style={{ marginLeft: 30 }}>
					<YoutubeOutlined onClick={onShowModalVideoUrl} />
				</Col>
			</Row>
			<Row className="allPost">
				{posts &&
					posts.map((post, index) => {
						const likes = post.Likes;
						const love = post.Likes.filter((l) => l.userId === user_Id)[0];

						return (
							<Col key={index} xs={4} sm={6} md={8} lg={10} xl={14}>
								<Card
									className="bg-white mt-2 mb-2"
									style={{ marginBottom: 30 }}
									key={index}
								>
									<Row key={index}>
										<Col span={6}>
											{!post.User.imageUrl ? (
												<img
													src="https://www.pngkey.com/png/detail/52-522921_kathrine-vangen-profile-pic-empty-png.png"
													width="60"
													height="60"
													style={{ borderRadius: "50%" }}
												/>
											) : (
												<img
													src={post.User.imageUrl}
													width="60"
													height="60"
													style={{ borderRadius: "50%" }}
												/>
											)}
										</Col>
										<Col className="flex justify-center flex-col ml-4" span={6}>
											<Link to={`/users/${post.userId}`}>
												<div className="text-2xl">{post.User.username}</div>
											</Link>
											<div>
												{moment(post.createdAt).format("DD/MM/YYYY h:mm:ss a")}{" "}
												At: {post.location}
											</div>
										</Col>

										<Col span={6}>
											<DeleteAPost id={post.id} />
										</Col>
									</Row>
									<Row>
										<div>{post.postContent}</div>
										<div>
											{post.imagePostUrl && (
												<img
													src={post.imagePostUrl}
													style={{
														maxHeight: 540,
														objectFit: "contain",
														width: "100%",
													}}
												></img>
											)}
										</div>
										<div>
											{post.videoPostUrl && (
												<video
													style={{
														maxHeight: 540,
														objectFit: "contain",
														width: "100%",
													}}
													controls
												>
													<source src={post.videoPostUrl} type="video/mp4" />
												</video>
											)}
										</div>
									</Row>
									<Divider style={{ marginTop: 20, marginBottom: 10 }} />
									<Row>
										<Col xl={4} md={4} xs={4} className="text-center mt-1">
											{/* <LikeAPost postId={post.id} /> */}
											<HeartFilled
												onClick={onLikePost(post)}
												style={{ color: love ? "red" : "black" }}
											/>
											<span style={{ color: "#177ddc" }}>
												{post.Likes.filter((like) => !like.commentId).length}
												<span style={{ marginLeft: 7 }}>like</span>
											</span>
										</Col>
										<Col
											xl={4}
											md={4}
											xs={4}
											className="text-center mt-1"
											onClick={onCollapse(post.id)}
										>
											<MessageOutlined />
										</Col>
										<Col xl={6} md={6} xs={6} className="text-center mt-1">
											<ShareAltOutlined onClick={onRepost(post)} />
										</Col>
										<Col xl={4} md={4} xs={4} className="text-center mt-1">
											<MoreOutlined
												className=".flex .justify-end"
												onClick={onShowEditModal(post.id)}
											/>
										</Col>
									</Row>
									<Divider style={{ marginTop: 10, marginBottom: 20 }} />
									<AllComments postId={post.id} isOpened={collapse} />
								</Card>
							</Col>
						);
					})}
			</Row>
		</div>
	);
}

export default GetAllPosts;
