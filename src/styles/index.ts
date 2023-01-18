import { css } from "styled-components";

export const breakPoint = {
  mobileSm: `(max-width: 300px)`,
  mobile: `(max-width: 428px)`,
  mobileLg: `(max-width: 600px)`,
  mobileTablet: `(max-width: 768px)`,
  tablet: `(max-width: 1200px)`,
  tabletMd: `(max-width: 1290px)`,
  desktop: `(max-width: 1440px)`,
};

export const center = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const centerBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const centerAround = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const centerColumn = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
