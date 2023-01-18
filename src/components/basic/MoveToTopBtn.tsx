import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { CaretUpOutlined } from "@ant-design/icons";
import { center } from "@Style";

export default function MoveToTopBtn() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MoveToTopBtnContainer onClick={moveToTop} scrollPosition={scrollPosition}>
      <CaretUpOutlined />
    </MoveToTopBtnContainer>
  );
}

const MoveToTopBtnContainer = styled.button<{ scrollPosition: number }>`
  ${center};
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 48px;
  height: 48px;
  background-color: #1180f1;
  opacity: ${({ scrollPosition }) => (scrollPosition > 100 ? "0.5" : "0")};
  font-size: 30px;
  color: white;
  border-radius: 10px;
  transition: opacity 0.3s;
  z-index: 8;

  &:hover {
    opacity: ${({ scrollPosition }) => scrollPosition > 100 && "1"};
  }
`;
