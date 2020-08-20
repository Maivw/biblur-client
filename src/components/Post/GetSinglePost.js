import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useParams } from "react-router";
import { getAPost } from "../../reducers/postManagement";

function GetSinglePost() {
	const post = useSelector((state) => state.postManagement.currentPost);
	const dispatch = useDispatch();
	let { id } = useParams();
	useEffect(() => {
		dispatch(getAPost({ id }));
	}, [id]);

	return (
		<div>
			<h1>HIHIIHI</h1>
			<div>{post.postContent}</div>
		</div>
	);
}

export default GetSinglePost;
