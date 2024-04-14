import styled from "styled-components";

const PriceStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${({ ispaid }) =>
    ispaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${({ ispaid }) =>
    ispaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

function Price({ children }) {
  return <PriceStyled>{children}</PriceStyled>;
}

export default Price;
