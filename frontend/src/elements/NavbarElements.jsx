import React from 'react'

const NavbarElements = (props) => {
    const url=props.link;
  return (
    <ul className="flex flex-col lg:flex-row list-none mr-auto">
            <li className="flex items-center">
              <a
                className={"dark:text-white dark:hover:text-teal-500 text-gray-800 hover:text-teal-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"}
                href={url}
              >
                {props.name}
              </a>
            </li>
          </ul>
  )
}

export default NavbarElements