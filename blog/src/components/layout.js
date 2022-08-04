/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import * as React from "react"
import Nav from "../components/items/nav"
import NavMenu from "../components/items/nav-menu"
import UserCard from "../components/user-card"

import Header from "./header"

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [isOpen, setIsOpen] = React.useState(false)
  const toggleDrawer = () => {
    setIsOpen(prevState => !prevState)
  }

  return (
    <div className="max-w-screen-lg mx-auto h-full">
      <div className="min-h-full pb-32">
        <NavMenu isOpen={isOpen} onClose={toggleDrawer} location={location} />
        <Header
          siteTitle={data.site.siteMetadata?.title || `Title`}
          menuTrigger={toggleDrawer}
        />
        <div className="mt-10">
          <UserCard
            avatar={false}
            className=" border border-l-2 border-teal-500"
          />
        </div>
        <div className="relative h-full">
          <div className="sticky top-10 right-0 z-50 hidden md:block">
            <div className="absolute right-0 w-40 text-base">
              <Nav location={location} />
            </div>
          </div>
          <div className="min-h-full">
            <main className="md:pr-40 h-full">{children}</main>
          </div>
        </div>
      </div>
      <footer className="h-32 relative -translate-y-full flex items-center justify-center">
        <div>
          © {new Date().getFullYear()} &middot;
          {` `}
          <a href="https://www.gatsbyjs.com">Leesh0</a>
        </div>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
