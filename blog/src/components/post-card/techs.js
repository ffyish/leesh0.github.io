import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import Tag from "../items/tag"
const Tech = ({ location, data }) => {
  const thumbnail = getImage(data.thumbnail)
  return (
    <div className="flex gap-x-3 p-1">
      <div className="bg-gray-100 rounded-md flex justify-center items-center w-24 h-24 p-2 flex-shrink-0">
        {thumbnail ? (
          <GatsbyImage image={thumbnail} />
        ) : (
          <div className="text-6xl">{data.frontmatter.emoji}</div>
        )}
      </div>
      <div>
        <p className="font-semibold text-base h-12 line-clamp-2">
          {data.frontmatter.title}
        </p>
        <div className="flex items-center text-xs my-2">
          {data.frontmatter.tags.map(tag => (
            <Tag name={tag} />
          ))}
        </div>
        <div className="flex justify-end items-center gap-x-2 text-sm text-gray-400">
          <p className="text-xs ">{data.frontmatter.updated}</p>
        </div>
      </div>
    </div>
  )
}

export default Tech
