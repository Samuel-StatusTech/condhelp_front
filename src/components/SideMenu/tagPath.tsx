type Props = {
  tagName: string
}

const TagPath = ({ tagName }: Props) => {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" className="circle-text">
      <defs>
        <path
          id="circlePath"
          d="M 40,40 m 35,0 a 35,35 0 1,0 -70,0 a 35,35 0 1,0 70,0"
        />
      </defs>
      <text font-size="8" fill="black" font-weight="bold">
        <textPath href="#circlePath" startOffset="60%" text-anchor="middle">
          {tagName}
        </textPath>
      </text>
    </svg>
  )
}

export default TagPath
