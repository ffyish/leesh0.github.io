import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as React from "react"
import Tag from "../items/tag"
const Series = ({ siteTitle, data }) => {
  console.log(data.thumnail)
  return (
    <div>
      <GatsbyImage
        className="aspect-video object-cover"
        image={getImage(data.thumbnail)}
      />
      <div className="px-1 py-1 ">
        <div className="italic pr-1 text-teal-500 font-bold text-sm ">
          Series.
        </div>
        <p className="font-semibold text-base h-12 mb-1 line-clamp-2">
          {data.frontmatter.title}
        </p>
        <div className="flex items-center text-xs">
          {data.frontmatter.tags.map(tag => (
            <Tag name={tag} />
          ))}
        </div>
        <div className="flex justify-end mt-3">
          <div className="text-xs text-gray-400">2022/07/26</div>
        </div>
      </div>
    </div>
  )
}

export default Series
