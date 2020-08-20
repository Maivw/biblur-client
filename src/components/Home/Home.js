import React, { useState } from "react";
import GetAllPosts from "../Post/GetAllPosts";
import Logout from "../Logout/Logout";
import "./Home.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
	DesktopOutlined,
	PieChartOutlined,
	FileOutlined,
	TeamOutlined,
	UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function Home() {
	const [collapsed, setCollapsed] = useState(false);
	const onCollapse = (collapsed) => {
		console.log(collapsed);
		this.setState({ collapsed });
	};
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className="logo" />
				<Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
					<Menu.Item key="1" icon={<PieChartOutlined />}>
						Create a post
					</Menu.Item>
					<Menu.Item key="2" icon={<DesktopOutlined />}>
						Home
					</Menu.Item>
					<SubMenu key="sub1" icon={<UserOutlined />} title="User">
						<Menu.Item key="3">Followers</Menu.Item>
						<Menu.Item key="4">Followings</Menu.Item>
						<Menu.Item key="5">Settings</Menu.Item>
					</SubMenu>
					<Menu.Item key="3">
						<Logout />
					</Menu.Item>
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<Header className="site-layout-background" style={{ padding: 0 }} />
				<Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
					<div
						className="site-layout-background"
						style={{ padding: 24, textAlign: "center" }}
					>
						<GetAllPosts />
					</div>
				</Content>
			</Layout>
		</Layout>
	);
}

export default Home;
