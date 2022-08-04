import { graphql, Link, useStaticQuery } from "gatsby"
import * as React from "react"
import Tag from "./tag"

const Nav = props => {
  const data = useStaticQuery(graphql`
    query {
      tagData: allMdx {
        group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `)
  const tags = data.tagData.group.map(t => t.tag)

  const location = props.location

  const navItemClass =
    "px-2 py-1 flex items-center  mt-1 cursor-pointer hover:underline"

  const currentPath = location?.pathname ? location.pathname : ""
  const currentPage = currentPath.split("/")[1]
  const isHome = currentPage === "" ? navItemClass + " underline" : navItemClass
  const isTech =
    currentPage === "techs" ? navItemClass + " underline" : navItemClass
  const isIdea =
    currentPage === "ideas" ? navItemClass + " underline" : navItemClass
  const isSeries =
    currentPage === "series" ? navItemClass + " underline" : navItemClass

  return (
    <div>
      <div>
        <div className=" font-medium text-teal-500 px-2">블로그</div>
        <Link to="/" className={isHome}>
          홈
        </Link>
        <Link to="/ideas" className={isIdea}>
          <span>Ideas</span>
        </Link>
        <Link to="/techs" className={isTech}>
          <span>Techs</span>
        </Link>
        <Link to="/series" className={isSeries}>
          <span>Series</span>
        </Link>
      </div>
      <div className="mt-5">
        <div className="font-medium text-teal-500 px-2">태그</div>
        <div className="px-2 flex gap-x-1 gap-y-1 flex-wrap mt-2">
          {tags.map(tag => (
            <Tag name={tag} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Nav
