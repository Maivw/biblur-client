import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useParams } from "react-router";
import { removeAPost } from "../../reducers/postManagement";
import { DeleteOutlined } from "@ant-design/icons";

function DeleteAPost({ id }) {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.authentication.token);
	const onDelete = (e) => {
		e.preventDefault();
		dispatch(removeAPost({ id }));
	};

	return (
		<div>
			<div type="text" onClick={onDelete}>
				<DeleteOutlined
					style={{ color: "#177ddc", fontSize: "20px", marginLeft: 10 }}
				/>
			</div>
		</div>
	);
}

export default DeleteAPost;
