import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${({ type }) =>
    type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}

  ${({ type }) =>
    type === "horizontal" &&
    css`
      align-items: center;
      justify-content: space-between;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
