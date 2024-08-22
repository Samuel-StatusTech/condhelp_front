import styled from "styled-components"

export const Container = styled.div<{ $size?: number }>`
  flex: ${({ $size }) => $size ?? 1};
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
`
