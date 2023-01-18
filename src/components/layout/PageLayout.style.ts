import { Layout, Menu } from "antd";
import styled from "styled-components";

const { Content, Sider } = Layout;

export const ContentWrap = styled(Content)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CustomSider = styled(Sider)`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
`;

export const InnerLayout = styled(Layout)`
  margin-left: 200;
`;
