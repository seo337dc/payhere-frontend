import { Layout, Menu } from "antd";
import styled from "styled-components";

const { Content, Sider } = Layout;

export const ContentWrap = styled(Content)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CustomSider = styled(Sider)`
  overflow: auto !important;
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  bottom: 0 !important;
`;

export const InnerLayout = styled(Layout)`
  margin-left: 200;
`;
