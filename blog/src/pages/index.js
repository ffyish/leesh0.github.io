import { graphql } from "gatsby"
import * as React from "react"
import Layout from "../components/layout"
import Idea from "../components/post-card/ideas"
import Series from "../components/post-card/series"
import Tech from "../components/post-card/techs"
import Seo from "../components/seo"

const IndexPage = ({ location, data }) => {
  const cardIdClass =
    "text-xl mb-3 pl-2 md:pl-0 flex items-center text-gray-500 font-medium"
  const cardGridClass = "gap-x-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  const techItems = data.techs.nodes
  const ideaItems = data.ideas.nodes
  const seriesItems = data.series.nodes
  return (
    <Layout location={location}>
      <Seo title="Home" />
      <div className="mt-10">
        <div className="my-5">
          <div className="mb-20">
            <div className={cardIdClass}>::Techs</div>
            <div className={cardGridClass}>
              {techItems.map(tech => (
                <Tech data={tech} />
              ))}
            </div>
          </div>

          <div className="mb-20">
            <div className={cardIdClass}>::Series</div>
            <div className={cardGridClass}>
              {seriesItems.map(series => (
                <Series data={series} />
              ))}
            </div>
          </div>

          <div>
            <div className={cardIdClass}>::Ideas</div>
            <div className={cardGridClass}>
              {ideaItems.map(idea => (
                <Idea data={idea} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query IndexPageQuery {
    series: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/content/series/.*/config.(md|mdx)/" }
      }
      limit: 10
    ) {
      nodes {
        thumbnail {
          childImageSharp {
            gatsbyImageData(formats: WEBP, width: 800)
          }
        }
        frontmatter {
          created
          description
          emoji
          order
          series
          seriesID
          slug
          tags
          thumbnail
          title
          updated
        }
      }
    }

    ideas: allMdx(
      filter: { fileAbsolutePath: { regex: "/content/ideas/" } }
      limit: 10
    ) {
      nodes {
        thumbnail {
          childImageSharp {
            gatsbyImageData(formats: WEBP, width: 800)
          }
        }
        frontmatter {
          created
          description
          emoji
          order
          series
          seriesID
          slug
          tags
          thumbnail
          title
          updated
        }
        excerpt
      }
    }

    techs: allMdx(
      filter: { fileAbsolutePath: { regex: "/content/techs/" } }
      limit: 10
    ) {
      nodes {
        thumbnail {
          childImageSharp {
            gatsbyImageData(formats: WEBP, width: 800)
          }
        }
        frontmatter {
          created
          description
          emoji
          order
          series
          seriesID
          slug
          tags
          thumbnail
          title
          updated
        }
        excerpt
      }
    }
  }
`

export default IndexPage
