import React, { useEffect } from "react";
import { DeleteAComment } from "../../reducers/commentManagement";
import { useDispatch } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

import { Button } from "antd";

export default function DeleteSingleComment({ postId, commentId }) {
	const dispatch = useDispatch();

	const onDeleteComment = (e) => {
		e.preventDefault();

		dispatch(DeleteAComment({ postId, commentId }));
	};

	return (
		<div>
			<Button type="text" onClick={onDeleteComment}>
				<DeleteOutlined style={{ color: "#177ddc" }} />
			</Button>
		</div>
	);
}
