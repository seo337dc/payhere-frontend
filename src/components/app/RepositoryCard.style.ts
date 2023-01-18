import { CheckCircleFilled, PlusCircleOutlined } from "@ant-design/icons";
import styled, { css } from "styled-components";

const commonIconStyle = css`
  font-size: 25px;
  cursor: pointer;
`;

export const Body = styled.div`
  width: 650px;
  min-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  color: rgb(140, 140, 140);
`;

export const Footer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CustomCheckIcon = styled(CheckCircleFilled)`
  ${commonIconStyle}
`;

export const CustomPlusIcon = styled(PlusCircleOutlined)`
  ${commonIconStyle}
`;
