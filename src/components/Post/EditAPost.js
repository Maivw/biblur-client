import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useParams } from "react-router";
import moment from "moment";
import { editCurrentPost, getAPost } from "../../reducers/postManagement";
import { Row, Col, Card, Modal } from "antd";
import { PictureOutlined } from "@ant-design/icons";

function EditAPost({ visible, onCancel, id }) {
	const post = useSelector((state) => state.postManagement.currentPost);

	const userId = useSelector((state) => state.authentication.user.id);
	const [postEdited, setPostEdited] = useState({
		postContent: "",
		userId,
		location: " ",
		imagePostUrl: "",
		videoPostUrl: "",
	});
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAPost({ id }));
	}, [id]);
	const onChangeEditInput = (e) => {
		e.persist();
		setPostEdited((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const onEdit = (e) => {
		e.preventDefault();
		dispatch(editCurrentPost({ id, ...postEdited }));
		onCancel();
	};

	return (
		<Modal visible={visible} onCancel={onCancel} onOk={onEdit}>
			{post && (
				<Card hoverable>
					<Row>
						<Col span={6}>
							<img
								src={post.User.imageUrl}
								width="60"
								height="60"
								style={{ borderRadius: "50%" }}
							/>
						</Col>
						<Col className="flex justify-center flex-col ml-4" span={6}>
							<Link to={`/users/${post.userId}`}>
								<div className="text-2xl">{post.User.username}</div>
							</Link>
							<div>
								{moment(post.createdAt).format("DD/MM/YYYY h:mm:ss a")} At:{" "}
								{post.location}
							</div>
						</Col>
					</Row>
					<Row>
						<input
							placeholder={post.postContent}
							value={postEdited.postContent}
							name="postContent"
							onChange={onChangeEditInput}
						/>

						{post.imagePostUrl && (
							<input
								onChange={onChangeEditInput}
								value={postEdited.imagePostUrl}
								placeholder={post.imagePostUrl}
								name="imagePostUrl"
							/>
						)}
						{post.videoPostUrl && (
							<Row>
								<input
									onChange={onChangeEditInput}
									value={postEdited.videoPostUrl}
									placeholder={post.videoPostUrl}
									name="videoPostUrl"
								/>
							</Row>
						)}
						<PictureOutlined />
					</Row>
				</Card>
			)}
		</Modal>
	);
}

export default EditAPost;
