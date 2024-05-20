import React from 'react'
import Hero from '../components/Hero';
import Biography from '../components/Biography';

const Home = () => {
  return ( <>
    <Hero title={"Welcome to UniFolio, the ultimate project management platform for university students"} imageUrl={"/hero1.png"} />
    <button className="btn glass">Glass button</button>
    <Biography />
    </>
  )
}

export default Home