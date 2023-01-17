import { useRouter } from "next/router";
import React from "react";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import styled from "styled-components";

import type { MenuProps } from "antd";

const { Header, Content, Footer, Sider } = Layout;

interface Props {
  children: React.ReactNode;
}

const PageLayout = ({ children }: Props) => {
  const router = useRouter();

  const items: MenuProps["items"] = [UserOutlined, VideoCameraOutlined].map(
    (icon, index) => ({
      key: String(index + 1),
      icon: React.createElement(icon),
      label: index === 0 ? "Repository" : "Issue",
      onClick: (e) => {
        if (e.key === "1") router.push("/");
        if (e.key === "2") router.push("/mypage");
      },
    })
  );

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={items}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <ContentWrap>
          <main>{children}</main>
        </ContentWrap>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default PageLayout;

const ContentWrap = styled(Content)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
