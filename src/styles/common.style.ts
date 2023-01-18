import styled from "styled-components";
import { Empty } from "antd";

export const Container = styled.div`
  width: 800px;
  padding: 10px 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CustomEmpty = styled(Empty)`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PagenationWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;