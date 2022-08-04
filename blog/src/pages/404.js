import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <div className="h-60 w-full flex justify-center items-center">
      <div className="text-center">
        <div className="text-center text-8xl font-bold">404</div>
        <p className="text-xl font-medium">NOT FOUND</p>
      </div>
    </div>
  </Layout>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
