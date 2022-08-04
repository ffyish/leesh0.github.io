import { HiMenu } from "@react-icons/all-files/hi/HiMenu"
import { HiSearch } from "@react-icons/all-files/hi/HiSearch"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import * as React from "react"

const Header = props => (
  <header>
    <div className="px-2 py-3 flex items-center justify-between">
      <div className="logo-font  text-3xl italic font-semibold">
        {props.siteTitle}
      </div>
      <div className="flex-shrink-0 flex gap-x-4 items-center">
        <Link to="/search" className="text-2xl">
          <HiSearch />
        </Link>
        <HiMenu
          className="md:hidden text-2xl cursor-pointer"
          onClick={props.menuTrigger}
        />
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
