import React from 'react'
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Sky,
} from "@react-three/drei";
import Avatar from '../components/Avatar';

const AboutUs = () => {
  return (
    <div className="container mx-auto flex w-screen h-screen justify-center lg:justify-start mt-5">
    <Canvas shadows camera={{ position: [0, 1, 5], fov: 30 }}>
      {/* <color attach="background" args={["#ececec"]} /> */}
      <OrbitControls />
      {/* <Sky /> */}
      {/* <Environment preset="sunset" /> */}
      <group position-y={-1}>
        <ContactShadows
          opacity={0.42}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />
        <Avatar />
      </group>
    </Canvas>
    <div className='flex flex-col overflow-hidden absolute mt-2 mx-auto lg:mx-12 uppercase'>
      <h1 className="overflow-hidden font-extrabold text-4xl">Swarnadeep Das</h1>
      <h1 className="overflow-hidden font-extrabold text-xl">MCA 2023-25</h1>
      <h1 className="overflow-hidden font-extrabold text-2xl">University of Calcutta</h1>
      <div className='static lg:fixed bottom-10 z-10'>
        <h1 className="overflow-hidden font-extrabold text-4xl uppercase">Team <span className='text-teal-500 dark:text-teal-400'>Lead</span></h1>
      </div>
    </div>
    </div>
  )
}

export default AboutUs