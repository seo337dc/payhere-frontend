import { useRouter } from "next/router";
import { createElement } from "react";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";

import type { MenuProps } from "antd";

import * as S from "@Components/layout/PageLayout.style";

interface Props {
  children: React.ReactNode;
}

const PageLayout = ({ children }: Props) => {
  const router = useRouter();

  const items: MenuProps["items"] = [UserOutlined, VideoCameraOutlined].map(
    (icon, index) => ({
      key: String(index + 1),
      icon: createElement(icon),
      label: index === 0 ? "Repository" : "Issue",
      onClick: (e) => {
        if (e.key === "1") router.push("/");
        if (e.key === "2") router.push("/issue");
      },
    })
  );

  return (
    <Layout hasSider>
      <S.CustomSider>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={items}
        />
      </S.CustomSider>
      <S.InnerLayout className="site-layout">
        <S.ContentWrap>
          <main>{children}</main>
        </S.ContentWrap>
      </S.InnerLayout>
    </Layout>
  );
};

export default PageLayout;
