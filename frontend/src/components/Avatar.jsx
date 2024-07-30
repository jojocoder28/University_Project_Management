import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Avatar = (props) => {

    // const { animations : testAnimation } = useFBX(props.animation);
    // testAnimation[0].name='test';

    const { nodes, materials } = useGLTF(props.modelUrl);
    const group = useRef();
    const lightRef = useRef();
    

    useFrame((state) => {
      const target = new THREE.Vector3(state.pointer.x * 10, state.pointer.y * 10, 5);
      lightRef.current.position.lerp(target, 0.1); // Smoothly move the light to the target position
    //   group.current.getObjectByName("Spine2").lookAt(target);
      
    });


  
    return (
      <group {...props} ref={group} dispose={null}>
        {/* Light that follows the mouse */}
        {/* <pointLight ref={lightRef} intensity={150} distance={100} /> */}
        <directionalLight 
        ref={lightRef} 
        intensity={6} 
        color="#ffffff" 
        castShadow 
      />
        
        {/* Avatar elements */}
        <group>
          <primitive object={nodes.Hips} />
          <skinnedMesh
            geometry={nodes.Wolf3D_Body.geometry}
            material={materials.Wolf3D_Body}
            skeleton={nodes.Wolf3D_Body.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
            material={materials.Wolf3D_Outfit_Bottom}
            skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
            material={materials.Wolf3D_Outfit_Footwear}
            skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Wolf3D_Outfit_Top.geometry}
            material={materials.Wolf3D_Outfit_Top}
            skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Wolf3D_Hair.geometry}
            material={materials.Wolf3D_Hair}
            skeleton={nodes.Wolf3D_Hair.skeleton}
          />
          <skinnedMesh 
          geometry={nodes.Wolf3D_Glasses.geometry} 
          material={materials.Wolf3D_Glasses} 
          skeleton={nodes.Wolf3D_Glasses.skeleton}
           />
          <skinnedMesh
            name="EyeLeft"
            geometry={nodes.EyeLeft.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeLeft.skeleton}
            morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
          />
          <skinnedMesh
            name="EyeRight"
            geometry={nodes.EyeRight.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeRight.skeleton}
            morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
          />
          <skinnedMesh
            name="Wolf3D_Head"
            geometry={nodes.Wolf3D_Head.geometry}
            material={materials.Wolf3D_Skin}
            skeleton={nodes.Wolf3D_Head.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
          />
          <skinnedMesh
            name="Wolf3D_Teeth"
            geometry={nodes.Wolf3D_Teeth.geometry}
            material={materials.Wolf3D_Teeth}
            skeleton={nodes.Wolf3D_Teeth.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
          />
        </group>
        
      </group>
    );
  };
  
  export default Avatar;
  
  useGLTF.preload("models/swarnadeep.glb");
  useGLTF.preload("models/sukanta.glb");
  useGLTF.preload("models/soumyajit.glb");

