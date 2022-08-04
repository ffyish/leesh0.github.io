const path = require("path")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      series: allMdx(
        filter: {
          fileAbsolutePath: { regex: "/content/series/.*/config.(md|mdx)/" }
        }
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
  `)

  const seriesItems = result.data.series.nodes
  const ideasItems = result.data.ideas.nodes
  const techsItems = result.data.techs.nodes

  const pathPrefixer = name => {
    return pageNumber =>
      pageNumber === 0 ? `/${name}` : `/${name}/page/${pageNumber + 1}`
  }

  const paginator = ({ pageType, itemsPerPage, items, prefixer }) => {
    const itemsCount = items.length
    const maxPage = Math.ceil(itemsCount / itemsPerPage)

    for (const i of Array(maxPage).keys()) {
      let prefix = prefixer(i)
      createPage({
        path: prefix,
        component: path.resolve(`src/templates/blog-page.js`),
        context: {
          skip: itemsPerPage * i,
          limit: itemsPerPage,
          currentPage: i + 1,
          hasNextPage: i + 2 <= maxPage,
          hasPreviousPage: i >= 1,
          totalPage: maxPage,
          items: items,
          pageType: pageType,
        },
      })
    }
  }

  paginator({
    pageType: "series",
    itemsPerPage: 12,
    items: seriesItems,
    prefixer: pathPrefixer("series"),
  })

  paginator({
    pageType: "ideas",
    itemsPerPage: 12,
    items: ideasItems,
    prefixer: pathPrefixer("ideas"),
  })

  paginator({
    pageType: "techs",
    itemsPerPage: 12,
    items: techsItems,
    prefixer: pathPrefixer("techs"),
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
  type Mdx implements Node {
    thumbnail:File @link(from: "fields.localFile")
  }
  `)
}

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  createNodeId,
  getCache,
}) => {
  if (node.internal.type === "Mdx" && node.frontmatter.thumbnail) {
    const fileNode = await createRemoteFileNode({
      url: node.frontmatter.thumbnail,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    })

    if (fileNode) {
      createNodeField({ node, name: "localFile", value: fileNode.id })
    }
  }
}
