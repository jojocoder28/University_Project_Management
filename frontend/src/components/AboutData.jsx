import React, { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  Sky,
  Reflector
} from "@react-three/drei";
import Avatar from './Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

const characters = [
    {
      modelUrl: 'models/swarnadeep.glb',
      name: 'Swarnadeep Das',
      program: 'MCA 2023-25',
      university: 'University of Calcutta',
      role: 'Team Lead',
      animation: 'animations/MaleStandingPose.fbx',
      linkedin: "https://linkedin.com/in/swarnadeep-das-0836b3221/",
    },
    {
      modelUrl: 'models/sukanta.glb',
      name: 'Sukanta Bala',
      program: 'MCA 2023-25',
      university: 'University of Calcutta',
      role: 'Frontend Developer',
      animation: 'animations/MaleStandingPose.fbx',
      linkedin: "https://www.linkedin.com/in/su1nta/",
    },
    {
      modelUrl: 'models/soumyajit.glb',
      name: 'Soumyajit Banerjee',
      program: 'MCA 2023-25',
      university: 'University of Calcutta',
      role: 'Project Member',
      animation: 'animations/MaleStandingPose.fbx',
      linkedin: "https://linkedin.com/in/soumyajit-banerjee-97584820a",
    },
];

const AboutData = () => {

    const handleClick = (linkedin) => {
        // window.open(linkedin);
    };

  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let timer;

    const startTimer = () => {
      setCurrentValue(0);

      timer = setTimeout(() => {
        setCurrentValue(1);

        timer = setTimeout(() => {
          setCurrentValue(2);

          timer = setTimeout(startTimer, 10000); 
        }, 10000); 
      }, 10000); 
    };

    startTimer();

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <div className="container mx-auto flex w-screen h-screen justify-center lg:justify-start mt-5">
    <Canvas shadows camera={{ position: [0, 1, 5], fov: 30 }}>
      {/* <color attach="background" args={["#ececec"]} /> */}
      <OrbitControls />
      {/* <Sky /> */}
      {/* <Environment preset="sunset" /> */}
      <group position-y={-1}>
        <ContactShadows
          opacity={0.50}
          scale={7}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />
        {/* <Reflector
              resolution={512}
              args={[6, 4]}
              mirror={1}
              mixBlur={1}
              mixStrength={10}
              rotation={[0, Math.PI / 18, 0]}
              position={[0, 0, -6]}
            //   blur={[400, 100]}
            >
              {(Material, props) => <Material color="#a0a0a0" metalness={0.5} roughness={0.5} {...props} />}
            </Reflector> */}
            <Avatar modelUrl={characters[currentValue].modelUrl} animation={characters[currentValue].animation} />
      </group>
    </Canvas>
    </div>
    <div className='flex flex-col overflow-hidden absolute mt-2 mx-auto lg:mx-12 text-center lg:text-left uppercase'>
      <h1 className="overflow-hidden font-extrabold lg:font-bold lg:text-4xl text-xl">{characters[currentValue].name}</h1>
      <h1 className="overflow-hidden font-extrabold lg:font-bold lg:text-xl text-m">{characters[currentValue].program}</h1>
      <h1 className="overflow-hidden font-extrabold lg:font-bold lg:text-2xl text-l">{characters[currentValue].university}</h1>
      <div className='static lg:fixed bottom-10 z-10'>
        <h1 className="overflow-hidden font-extrabold lg:font-bold lg:text-4xl text-xl uppercase">
        
        <span className='text-teal-500 dark:text-teal-400'>{characters[currentValue].role}&nbsp;</span>
        <a href={characters[currentValue].linkedin} style={{ border: 'none', background: 'none' }} className='link-neutral'>
            <FontAwesomeIcon icon={faLinkedin} size="1x" style={{ color: '#0077B5' }} />
        </a>
        </h1>
      </div>
    </div>
    </>
  );
};

export default AboutData;
