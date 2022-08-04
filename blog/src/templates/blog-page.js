import * as React from "react"
import Layout from "../components/layout"
import Idea from "../components/post-card/ideas"
import Series from "../components/post-card/series"
import Tech from "../components/post-card/techs"
import Seo from "../components/seo"

const IndexPage = props => {
  const context = props.pageContext
  let itemCards
  const itemsClass =
    "mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4"
  if (context.pageType === "series") {
    itemCards = context.items.map(item => <Series data={item} />)
  } else if (context.pageType === "ideas") {
    itemCards = context.items.map(item => <Idea data={item} />)
  } else {
    itemCards = context.items.map(item => <Tech data={item} />)
  }
  return (
    <Layout location={props.location}>
      <Seo title={context.pageType} />
      <div className={itemsClass}>{itemCards}</div>
    </Layout>
  )
}

export default IndexPage
