import React from 'react'

const FormInput = (props) => {
  return (
    <div>
        <label htmlFor={props.name} className="sr-only">{props.title}</label>
        <input id={props.name} name={props.name} type={props.type} autoComplete={props.name} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-blue-100 dark:bg-white" placeholder={props.placeholder} />
    </div>
  )
}

export default FormInput