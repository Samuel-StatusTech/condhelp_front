import styled from "styled-components"

export const Element = styled.div<{
  $img: string | null
  $size?: string | number
}>`
  width: ${({ $size }) =>
    $size ? (typeof $size === "string" ? $size : `${$size}px`) : "64px"};
  aspect-ratio: 1;

  background-image: ${({ $img }) => ($img ? `url("${$img}")` : "")};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: grid;
  place-items: center;
  border-radius: ${({ $size }) =>
    $size ? (typeof $size === "string" ? $size : `${$size}px`) : "64px"};
  overflow: hidden;

  & > svg {
    width: 100%;
    height: 100%;
  }
`
