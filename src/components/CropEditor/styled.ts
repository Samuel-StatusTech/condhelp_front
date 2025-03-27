import styled from "styled-components"

export const EditorAreaWrapper = styled.div`
  display: flex;
  padding: 16px;
  background-color: white;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
`

export const EditorArea = styled.div`
  border-radius: 12px;
  overflow: hidden;
  position: relative !important;
  width: 100%;
  height: 100%;
`

export const ControllersArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const ControllerUXArea = styled.div`
  display: flex;
  gap: 12px;
`

export const ControllersOptionsArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`

export const ControllerOption = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px 18px;
  width: fit-content;
  border-radius: 24px;
  transition: background-color 0.3s;
  background-color: ${({ $active, theme }) =>
    $active ? "rgba(220, 220, 220, 0.7)" : "transparent"};
  color: ${({ theme }) => theme.colors.neutral.main};
`
