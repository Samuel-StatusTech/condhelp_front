import styled from "styled-components"

export const FileIndicator = styled.div`
  display: grid;
  place-items: center;
  position: absolute;
  top: 32px;
  right: 0;
  bottom: 8px;
  left: 0;
  background-color: rgba(5, 133, 62, 0.1);
  backdrop-filter: blur(4px);
  z-index: 200;
  border-radius: 8px;

  span {
    color: ${({ theme }) => theme.colors.green.medium};
  }
`
