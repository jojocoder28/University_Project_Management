import React from 'react'

const CopyrightElement = (props) => {
    const url=props.link
  return (
        <div className="flex flex-wrap items-center md:justify-between justify-center py-5 dark:bg-slate-950 relative w-full bottom-0 flex-grow">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-600 dark:text-gray-200 font-semibold py-1">
              Copyright © {new Date().getFullYear()}{" | "}
              <a
                href={url}
                className="text-gray-600 dark:text-gray-200 dark:hover:text-gray-400 hover:text-gray-900"
              >
                {props.name}
              </a>
            </div>
          </div>
        </div>
  )
}

export default CopyrightElement