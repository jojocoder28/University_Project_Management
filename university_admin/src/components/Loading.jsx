import React from 'react'

const Loading = () => {
  return (
    <div className="flex h-screen align-middle mx-auto items-center justify-center my-auto">
    <div className='relative overflow-hidden'>
        <div
            className="dark:text-white inline-block h-48 w-48 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
        </div>
        <span
            className="absolute inset-0 flex items-center justify-center text-black dark:text-white"
        >Loading...</span>
    </div>
</div>


  )
}

export default Loading