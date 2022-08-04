import * as React from "react"
import Drawer from "react-modern-drawer"
import "react-modern-drawer/dist/index.css"
import Nav from "./nav"

const NavMenu = props => (
  <>
    <Drawer open={props.isOpen} onClose={props.onClose} direction="right">
      <Nav className="px-2" location={props.location} />
    </Drawer>
  </>
)

export default NavMenu
