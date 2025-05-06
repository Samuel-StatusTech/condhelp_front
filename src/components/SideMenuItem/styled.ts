import styled from "styled-components"

export const Wrapper = styled.div<{ $active: boolean; $k: number }>`
  border-radius: 4px;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.neutral.soft : "transparent"};
  transition: background-color 0.3s;
  padding: 8px 5px;

  display: flex;
  flex-direction: column;

  & > a,
  & > div:nth-child(1) {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    text-decoration: none;
    filter: saturate(${({ $active }) => ($active ? 1 : 0)});
    opacity: ${({ $active }) => ($active ? 1 : 0.5)};
    transition: filter 0.3s, opacity 0.3s;

    color: ${({ theme }) => theme.colors.green.medium};
    svg {
      width: 24px;
      height: 24px;
    }
  }

  & > a,
  & > div.submenuMenu {
    cursor: pointer;

    &:hover {
      filter: saturate(1);
      opacity: 1;
    }
  }

  &:has(.submenuMenu):hover .subMenuWrapper {
    grid-template-rows: 1fr;
  }

  opacity: 0;
  ${({ $k, theme }) =>
    theme.animations.types.fadeLeft +
    theme.animations.durations.main +
    theme.animations.delays.main($k * 0.6)}
`

export const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
`

export const SubmenuWrapper = styled.div<{ $opened?: boolean }>`
  display: grid;
  grid-template-rows: ${({ $opened }) => Number($opened)}fr;
  transition: grid-template-rows 0.3s;
`

export const SubmenuContainer = styled.div`
  width: 100%;
  min-height: 0;
  overflow: hidden;
`

export const SubmenuContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0 0 28px;
`

export const Sublink = styled.div<{ $active?: boolean }>`
  width: 100%;

  a {
    width: 100%;
    text-decoration: none;
    display: flex;
    padding: 8px;
    border-radius: 4px;
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.neutral.soft : "transparent"};
    text-decoration: none;
    filter: saturate(${({ $active }) => ($active ? 1 : 0)});
    opacity: ${({ $active }) => ($active ? 1 : 0.5)};
    transition: filter 0.3s, opacity 0.3s;
    font-size: 14px;

    color: ${({ theme }) => theme.colors.green.medium};
    cursor: pointer;

    &:hover {
      filter: saturate(1);
      opacity: 1;
    }
  }
`
