import {
  CheckCircleFilled,
  PlusCircleOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import styled, { css } from "styled-components";

const commonIconStyle = css`
  font-size: 25px !important;
  cursor: pointer !important;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 300px;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CustomCheckIcon = styled(CheckCircleFilled)`
  ${commonIconStyle}
`;

export const CustomPlusIcon = styled(PlusCircleOutlined)`
  ${commonIconStyle}
`;

export const CustomLinkIcon = styled(LinkOutlined)`
  ${commonIconStyle}
`;

export const Desc = styled.div`
  min-height: 100px;
`;
