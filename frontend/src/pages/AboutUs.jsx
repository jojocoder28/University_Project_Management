import React from 'react'
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Sky,
} from "@react-three/drei";
import Avatar from '../components/Avatar';
import AboutData from '../components/AboutData';

const AboutUs = () => {
  return (
    <div className="container mx-auto flex w-screen h-screen justify-center lg:justify-start mt-5 overflow-y-hidden">
    <AboutData />
    </div>
  )
}

export default AboutUs