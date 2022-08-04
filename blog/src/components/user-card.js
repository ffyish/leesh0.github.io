import { graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as React from "react"

const UserCard = props => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          author
          description
        }
      }
    }
  `)
  let author = data.site.siteMetadata.author
  let description = data.site.siteMetadata.description
  return (
    <div className="flex gap-x-3 px-2 border-l-4 border-teal-500">
      {props.avatar ? (
        <StaticImage
          className="w-24 h-24 rounded-full border flex-shrink-0"
          imgClassName="rounded-full"
          src={"https://avatars.githubusercontent.com/u/57043683?v=4"}
          alt="avatar"
        />
      ) : (
        <></>
      )}
      <div>
        <div className="font-bold">{author}</div>
        <div
          className="mt-5"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  )
}
export default UserCard
