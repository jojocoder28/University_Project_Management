import React from 'react'

const CardsHome = (props) => {
  return (
    <div className={`p-4 top-5 ${props.wh} lg:overflow-hidden bg-blue-100 dark:bg-gray-900
    border-slate-100 dark:border-slate-500
    shadow-lg shadow-slate-200 dark:shadow-slate-900
    rounded-box px-7 py-5
    sm:w-full md:w-full 
    lg:z-0 md:z-50 sm:z-50`}>
        
          <div className="text-2xl py-3 overflow-hidden font-bold">{props.title}</div>
          <div className="text-lg py-4 text-justify">{props.description}</div>
        
      </div>
  )
}

export default CardsHome