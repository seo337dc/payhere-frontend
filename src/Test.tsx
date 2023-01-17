import React from "react";
import styled from "styled-components";
import { Input } from "antd";

function Test() {
  return (
    <Div>
      <Input />
    </Div>
  );
}

export default Test;

const Div = styled.div`
  border: 1px solid black;
`;
