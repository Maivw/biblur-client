import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { SendOutlined } from "@ant-design/icons";
import { Row, Col, Input } from "antd";
import { EditAComment } from "../../reducers/commentManagement";

function EditSingleComment(props) {
	const { postId, commentId } = props;
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.authentication.user.id);
	const [commentContent, setCommentContent] = useState("");
	const [visiblePopover, setVisiblePopover] = useState(false);
	const updateInputComment = (e) => {
		setCommentContent(e.target.value);
	};
	const onEditComment = (e) => {
		dispatch(EditAComment({ postId, commentId, commentContent }));
		// props.onClick(visiblePopover);
	};
	return (
		<div>
			<Input
				onChange={updateInputComment}
				name="commentContent"
				value={commentContent}
				style={{
					heigth: 40,
					borderColor: "#f0f0f0",
					backgroundColor: "grey",
					borderStyle: "solid",
					borderRadius: 5,
				}}
			/>
			<SendOutlined
				onClick={onEditComment}
				style={{
					position: "absolute",
					top: "25%",
					right: 30,
					color: "#15395b",
				}}
			/>
		</div>
	);
}

export default EditSingleComment;
