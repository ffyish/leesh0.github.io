import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import Tag from "../items/tag"

const Idea = ({ data }) => {
  const thumbnail = getImage(data.thumbnail)
  return (
    <div>
      {thumbnail ? (
        <GatsbyImage
          className="aspect-video object-cover bg-gray-100"
          image={thumbnail}
        />
      ) : (
        <div className="aspect-video bg-gray-100 flex items-center justify-center text-6xl select-none">
          {data.frontmatter.emoji}
        </div>
      )}
      <div className="px-1 py-1 ">
        <p className="font-semibold text-base h-12  line-clamp-2">
          {data.frontmatter.title}
        </p>
        <div className="flex items-center text-xs">
          <div className="flex items-center gap-x-1">
            {data.frontmatter.tags.map(tag => (
              <Tag name={tag} />
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <span className="text-xs text-gray-400">
            {data.frontmatter.updated}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Idea
