"use client";

import { Suspense, useRef } from "react";
import { Canvas /* , useThree */ } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  ScrollControls,
  useProgress,
} from "@react-three/drei";

import SetupScene from "./SetupScene";
// playground scenes
// import SceneOne from "./playground/One";
// import SceneTwo from "./playground/Two";
// import Sea2Scene from "./playground/Sea2Scene";
// main scene
import MainScene from "./MainScene";
//

//
import ControlBar from "./controls/ControlBar";
//

export default function Scene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <>
      <Canvas
        // set to true if you want ortographic camera
        // ------ ortographic camera ------
        // orthographic={true}
        camera={{
          // ---------------------------------------
          // ---------------------------------------
          // ------ ortographic camera------
          // isOrthographicCamera: true,
          // near: -100,
          // far: 100,
          // ---------------------------------------
          // ------ perspective camera ------
          isPerspectiveCamera: true,
          fov: 50,
          near: 0.01,
          far: 100,
          // position: [2, 2, -4],
          // ---------------------------------------
          // aspect: 1, // don't adjust this in any case,
          // it will mess up aspect ratio, don't set it especially
          // for ortographic camera since
          // we are doing it already in scene

          /* lookAt: (ve3) => {
          console.log({ ve3 });
        }, */
        }}
        gl={{
          antialias: true,
        }}
        dpr={[1, 1.5]}
        className="canvas-holder"
        ref={canvasRef}
      >
        <Suspense fallback={<Loader />}>
          {/* <OrbitControls
          // enableZoom={false}
          /> */}
          {/* Scroll controls will block useFrame for some reason */}
          {/* <ScrollControls
          damping={0.5}
          // pages={4}
          infinite
          > */}
          {/* ---------------------------------- */}
          {/* ---------------------------------- */}
          <SetupScene />
          {/* <SceneOne /> */}
          {/* <SceneTwo /> */}
          {/* <Sea2Scene /> */}
          <MainScene />
          {/* ---------------------------------- */}
          {/* ---------------------------------- */}
          {/* </ScrollControls> */}
        </Suspense>
      </Canvas>
      <ControlBar />
    </>
  );
}

function Loader() {
  const { /* active, */ progress } = useProgress();

  return (
    <Html center className="text-3xl text-stone-100">
      {progress.toFixed(1)}% loaded
    </Html>
  );
}
