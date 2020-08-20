import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getAllPosts } from "../../reducers/postManagement";
import { Row, Col, Card, Divider } from "antd";
import moment from "moment";
import {
	MoreOutlined,
	ZoomInOutlined,
	EditOutlined,
	MessageOutlined,
	ShareAltOutlined,
	PictureOutlined,
	YoutubeOutlined,
} from "@ant-design/icons";

import CreatePostImageFile from "./CreatePostImageFile";
import CreatePostImageUrl from "./CreatePostImageUrl";
import CreatePostVideoUrl from "./CreatePostVideoUrl";
import DeleteAPost from "./DeleteAPost";

function GetAllPosts(props) {
	const posts = useSelector((state) => state.postManagement.posts);
	const [visible, setVisible] = useState(false);
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

	return (
		<div className="app-container">
			<CreatePostImageFile visible={visible} onCancel={onCancel} />
			<CreatePostImageUrl visible={visible} onCancel={onCancel} />
			<CreatePostVideoUrl visible={visible} onCancel={onCancel} />
			<Row className="mb-6 text-white">
				Create Post
				<Col className="text-white" style={{ marginLeft: 30 }}>
					<PictureOutlined onClick={onShowModal} />
				</Col>
				<Col className="text-white" style={{ marginLeft: 30 }}>
					<EditOutlined onClick={onShowModal} />
				</Col>
				<Col className="text-white" style={{ marginLeft: 30 }}>
					<YoutubeOutlined onClick={onShowModal} />
				</Col>
			</Row>
			{posts?.map((post, index) => {
				return (
					<Card
						className="bg-white mt-2 mb-2"
						style={{ marginBottom: 30 }}
						key={index}
					>
						<Row>
							<Col span={2}>
								<img
									src={post.User.imageUrl}
									width="60"
									height="60"
									style={{ borderRadius: "50%" }}
								/>
							</Col>
							<Col className="flex justify-center flex-col ml-4" span={1}>
								<Link to={`/users/${post.userId}`}>
									<div className="text-2xl">{post.User.username}</div>
								</Link>
								<div>
									{moment(post.createdAt).format("DD/MM/YYYY h:mm:ss a")} At:{" "}
									{post.location}
								</div>
							</Col>
							<Col span={21}>
								<MoreOutlined className=".flex .justify-end" />
							</Col>
							<Col>
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
								<span style={{ color: "#177ddc" }}>
									{post.Likes.length}
									<span style={{ marginLeft: 7 }}>like</span>
								</span>
							</Col>
							<Col
								xl={4}
								md={4}
								xs={4}
								className="text-center mt-1"
								// onClick={onCollapse(post.id)}
							>
								<MessageOutlined />
							</Col>
							<Col xl={6} md={6} xs={6} className="text-center mt-1">
								<ShareAltOutlined />
							</Col>
							<Col xl={4} md={4} xs={4} className="text-center mt-1">
								<Link to={`/dashboard/${post.id}`}>
									<ZoomInOutlined />
								</Link>
							</Col>
							{/* <Col xl={4} md={4} xs={4} className="text-center">
								{user_id === post.user_id ? (
									<DeleteSinglePost id={post.id} />
								) : null}
							</Col> */}
						</Row>
						<Divider style={{ marginTop: 10, marginBottom: 20 }} />
						{/* <ShowAllComments postId={post.id} isOpened={collapse} /> */}
					</Card>
				);
			})}
		</div>
	);
}

export default GetAllPosts;
