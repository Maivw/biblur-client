import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GetAllPosts from "../Post/GetAllPosts";
import Logout from "../Logout/Logout";
import {
	getUserProfile,
	EditLoggedInUser,
} from "../../reducers/authentication";
import "./Home.css";
import { Layout, Menu, Card, Modal } from "antd";
import {
	DesktopOutlined,
	UserOutlined,
	LoginOutlined,
	PictureOutlined,
} from "@ant-design/icons";
const { Meta } = Card;
const imageUrlDefault =
	"http://sarangglobaltours.com/wp-content/uploads/2014/02/team.png";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function Home() {
	const token = useSelector((state) => state.authentication.token);
	const userId = useSelector((state) => state.authentication.user.id);
	const user = useSelector((state) => state.authentication.userLoggedIn);
	const [collapsed, setCollapsed] = useState(false);
	const [visible, setVisible] = useState(false);
	const [visibleEditProfile, setVisibleEditProfile] = useState(false);
	const dispatch = useDispatch();

	const [imageFile, setImageFile] = useState("");
	const [file, setFile] = useState("");
	const [userEdited, setUserEdited] = useState({
		username: "",
		imageUrl: "",
		id: userId,
	});

	const updateUserEditInput = (e) => {
		e.persist();
		const { name, value } = e.target;
		setUserEdited((prev) => ({ ...prev, [name]: e.target.value }));
	};
	const onEditUser = (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append("username", userEdited.username);
		data.append("imageUrl", file);

		dispatch(EditLoggedInUser(data));
		dispatch(getUserProfile({ userId }));
		onCancelEditProfileModal();
	};
	const handleChangeUpload = (e) => {
		setImageFile(URL.createObjectURL(e.target.files[0]));
		setFile(e.target.files[0]);
	};

	const onShowEditProfileModal = (userId) => () => {
		setVisibleEditProfile(userId);
	};

	const onCancelEditProfileModal = () => {
		setVisibleEditProfile(false);
	};

	// //////////
	const onCollapse = (collapsed) => {
		this.setState({ collapsed });
	};

	const onShowProfileModal = (userId) => () => {
		dispatch(getUserProfile({ userId }));
		setVisible(userId);
	};
	const onCancel = () => {
		setVisible(false);
	};
	return (
		<>
			<Modal visible={visible} onCancel={onCancel}>
				<p>Update your profile</p>
				{user && (
					<Card
						hoverable
						style={{ width: 240 }}
						cover={
							user.imageUrl ? (
								<img alt="example" src={user.imageUrl} />
							) : (
								<img alt="example" src={imageUrlDefault} />
							)
						}
					>
						<Meta title={user.username} />
					</Card>
				)}
			</Modal>
			<Modal
				visible={visibleEditProfile}
				onCancel={onCancelEditProfileModal}
				onOk={onEditUser}
			>
				<p>hhh</p>
				{user && (
					<Card
						hoverable
						style={{ width: 240 }}
						cover={
							user.imageUrl ? (
								<img alt="example" src={user.imageUrl} />
							) : (
								<img alt="example" src={imageUrlDefault} />
							)
						}
					>
						<>
							<input
								placeholder={userEdited.username}
								value={userEdited.username}
								name="username"
								onChange={updateUserEditInput}
							/>
							<br />

							<div className="flex justify-around">
								<label style={{ fontSize: "20px", marginLeft: "80%" }}>
									<span>
										<PictureOutlined />
									</span>
									<input
										name="imageUrl"
										type="file"
										style={{ display: "none" }}
										onChange={handleChangeUpload}
										value={userEdited.imageUrl}
									/>
								</label>
								{file && (
									<img src={imageFile} alt="img" style={{ height: 50 }} />
								)}
							</div>
						</>
					</Card>
				)}
			</Modal>
			<Layout style={{ minHeight: "100vh" }}>
				<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
					<div className="logo" />
					<Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
						<Menu.Item key="2" icon={<DesktopOutlined />}>
							<Link to="/">Home</Link>
						</Menu.Item>
						<SubMenu key="sub1" icon={<UserOutlined />} title="User">
							<Menu.Item key="3">Followers</Menu.Item>
							<Menu.Item key="4">Followings</Menu.Item>
							<Menu.Item key="5">
								<div onClick={onShowProfileModal(userId)}>About</div>
							</Menu.Item>
							<Menu.Item key="6">
								<div onClick={onShowEditProfileModal(userId)}>Update</div>
							</Menu.Item>
						</SubMenu>
						<Menu.Item key="3">
							{token ? (
								<Logout />
							) : (
								<Link to="/login">
									<LoginOutlined /> Log in
								</Link>
							)}
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className="site-layout">
					<Header className="site-layout-background" style={{ padding: 0 }}>
						<div className="logo" />

						<Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
							<Menu.Item key="1">
								<Link to="/">
									<img
										src="https://res.cloudinary.com/maivw/image/upload/v1598292590/05f4a9f5-9714-4ba2-85f5-bc6e550b7b35_200x200_djglwy.png"
										style={{ width: 130 }}
									/>
								</Link>
							</Menu.Item>
						</Menu>
					</Header>
					<Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
						<div
							className="site-layout-background"
							style={{ padding: 50, textAlign: "center" }}
						>
							<GetAllPosts />
						</div>
					</Content>
				</Layout>
			</Layout>
		</>
	);
}

export default Home;
