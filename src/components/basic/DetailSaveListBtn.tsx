import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import { UsergroupAddOutlined } from "@ant-design/icons";
import { center } from "@Style";

interface TProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function DetailSaveListBtn({ setOpen }: TProps) {
  return (
    <Wrap onClick={() => setOpen(true)}>
      <UsergroupAddOutlined />
    </Wrap>
  );
}

const Wrap = styled.button`
  ${center};
  position: fixed;
  right: 120px;
  bottom: 50px;
  width: 48px;
  height: 48px;
  font-size: 30px;
  border-radius: 10px;
  z-index: 8;
`;
