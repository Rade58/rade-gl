"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  Vector3,
  type AmbientLight,
  type PointLight,
  type DirectionalLight,
  type AxesHelper,
  type PerspectiveCamera,
  type Scene,
  PointLightHelper,
  DirectionalLightHelper,
} from "three";

import { bg_base } from "@/consts/styles";
import { TrackballControls } from "three/examples/jsm/Addons.js";

// I am using `useThree` only in this component
// because useThree cn cause rerender

export default function SetupScene() {
  // LIGHTS
  const pointLightRef = useRef<PointLight | null>(null);
  const directionalLightRef = useRef<DirectionalLight | null>(null);
  // CONTROLS
  const controlsRef = useRef<TrackballControls | null>(null);
  // HELPERS
  const axesHelperRef = useRef<AxesHelper | null>(null);

  const {
    gl,
    camera: cam,
    // controls: con,   not working from here
    scene: sc,
    // clock: { elapsedTime: initialElapsedTime },
    // viewport: { aspect }, // not needed
    // set,
    // size,
  } = useThree();

  const scene = sc as unknown as Scene;
  const camera = cam as unknown as PerspectiveCamera;

  useEffect(() => {
    console.log("EFFECTED");

    gl.setClearColor(bg_base, 1);

    if (axesHelperRef.current) {
      axesHelperRef.current.setColors("red", "green", "blue");
    }

    if (pointLightRef.current) {
      const pointLightHelper = new PointLightHelper(pointLightRef.current);

      scene.add(pointLightHelper);
    }

    if (directionalLightRef.current) {
      const directionalLightHelper = new DirectionalLightHelper(
        directionalLightRef.current
      );

      scene.add(directionalLightHelper);
    }

    // ------ CAMERA AND CONTROLS ------------
    // -------------------------------------------

    const mainLookAtVec = new Vector3();
    camera.position.set(-114, 12.08, 38);

    camera.lookAt(mainLookAtVec);

    controlsRef.current = new TrackballControls(camera, gl.domElement);

    controlsRef.current.noZoom = true;
    controlsRef.current.noPan = true;
    controlsRef.current.noRotate = true;
    controlsRef.current.update();

    controlsRef.current.object.position.copy(camera.position);
    //
    controlsRef.current.object.position.x = 0;
    controlsRef.current.object.position.y = -54;
    controlsRef.current.object.position.z = 29;
  }, [camera, gl, scene, controlsRef, pointLightRef]);

  useFrame(({ camera, clock: { elapsedTime: time } }) => {
    if (controlsRef.current) {
      controlsRef.current.object.rotation.x = time * 0.9;

      controlsRef.current.update();
    }
  });

  return (
    <>
      {/* ----------- CONTROLS ------------- */}
      {/* not working like this, so I use it the threejs way */}
      {/* <TrackballControls
        args={[camera, gl.domElement]}
        ref={controlsRef}
      /> */}
      {/* ------------ HELPERS ----------- */}
      {/* @ts-ignore ref */}
      <axesHelper ref={axesHelperRef} />
      {/* ------------ LIGHTS -------------- */}
      <pointLight
        // @ts-ignore ref
        ref={pointLightRef}
        args={["purple", 29]}
        position={[0, 2, 29]}
      />
      <ambientLight args={["purple", 12]} position={[0, 2, 36]} />
      <directionalLight
        // @ts-ignore ref
        ref={directionalLightRef}
        args={["white", 19]}
        position={[0, 3, 26]}
      />
    </>
  );
}
