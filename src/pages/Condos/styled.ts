import styled from "styled-components"

export const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 16px;
`
