import React from 'react'

const NavbarElements = (props) => {
    const url=props.link;
  return (
    <ul className="flex flex-col lg:flex-row list-none mr-auto">
            <li className="flex items-center">
              <a
                className={"dark:lg:text-white dark:lg:hover:text-gray-300 text-gray-800 dark:text-white lg:hover:text-gray-600 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"}
                href={url}
              >
                {props.name}
              </a>
            </li>
          </ul>
  )
}

export default NavbarElements