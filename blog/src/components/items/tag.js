import * as React from "react"

const Tag = props => (
  <div className=" hover:bg-gray-200  rounded-full px-3 text-xs cursor-pointer py-0.5 flex gap-x-1 select-none">
    <span className="text-teal-500">#</span>
    {props.name}
  </div>
)

export default Tag
