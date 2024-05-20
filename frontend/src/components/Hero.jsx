import React from 'react'

const Hero = ({title, imageUrl}) => {
  return (
    <div className='hero container'>
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates labore odio, odit illum itaque obcaecati maiores velit sed quaerat, deleniti eos dolores, quam unde aut a possimus dicta rerum?
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt='hero' className='animated-image' />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  )
}

export default Hero