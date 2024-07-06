"use client";

import { useEffect, useRef, useState } from "react";
// import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial, useAnimations } from "@react-three/drei";
import {
  AmbientLight,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  OrthographicCamera,
  PointLight,
  Scene,
  Vector3,
  DirectionalLight,
  MeshStandardMaterial,
  PerspectiveCamera,
  ShaderMaterial,
  Color,
  IcosahedronGeometry,
  Float32BufferAttribute,
  SphereGeometry,
  CircleGeometry,
  BackSide,
  PlaneGeometry,
} from "three";

// -------------------------------------------------------------
import palettes from "nice-color-palettes";
import { backInOut, elasticIn, cubicOut, expoInOut } from "eases";
import bease from "bezier-easing";
import {
  value as randVal,
  setSeed,
  range,
  pick,
  gaussian,
} from "canvas-sketch-util/random";
// -------------------------------------------------------------

import { bg_base } from "@/consts/styles";

// -------------------------------------------------------------
import { usePlayhead } from "@/hooks/usePlayhead";

// -------------------------------------------------------------
// ------------------------ SHADERS ----------------------------
//
import seaVertex from "@/shaders/sea/index.vert";
import seaFragment from "@/shaders/sea/index.frag";

// -------------------------------------------------------------
// -------------------------------------------------------------

export default function SeaScene() {
  // ------------------------------------------------------
  // ------------------------------------------------------
  const zoom = 2;
  // ------------------------------------------------------
  // ------------------------------------------------------

  const {
    gl,
    camera: cam,
    scene: sc,
    clock: { elapsedTime: initialElapsedTime },
    viewport: { aspect },
  } = useThree();

  // ------ CAMMERA, SCENE, LIGHTS, CONTROL
  const scene = sc as unknown as Scene;
  // const camera = cam as unknown as PerspectiveCamera;
  const camera = cam as unknown as OrthographicCamera;

  // --------------------------------------------------------
  // --------------------------------------------------------
  const materialRef = useRef<ShaderMaterial | null>(null);

  // const sphareGeoRef = useRef<SphereGeometry | null>(null);
  // const pointsAmountRef = useRef<number>(0);
  // --------------------------------------------------------
  // --------------------------------------------------------

  // console.log({ aspect });
  // console.log({ clock });
  // const { elapsedTime } = clock;
  // const { offset } = useScroll();
  // -----------------------------------------------------------

  // const [lookAtVector, setLookatVector] = useState<Vector3 | null>(null);

  const { playheadRef, computePlayheadInFrame } = usePlayhead(20, 2, true);

  const pall = pick(palettes);

  useEffect(() => {
    gl.setClearColor(bg_base, 1);
    // gl.setClearColor(bg_base, 1);
    // gl.setClearColor(pick(pick(palettes)), 1);

    const mainVec = new Vector3();
    // setLookatVector(mainVec);
    // camera.lookAt(new Vector3());
    camera.lookAt(mainVec);

    // const directLight = new DirectionalLight("white", 2);
    // const ambientLight = new AmbientLight("#351430", 1);
    // const pointLight = new PointLight("#8c86d6", 2.6, 73.18);
    // ---------------------------------------------------
    // ---------------------------------------------------

    // ---------------------------------------------------
    // ---------------------------------------------------

    const geo = new PlaneGeometry(108, 108, 168, 168);

    const mat = new ShaderMaterial({
      vertexShader: seaVertex,
      fragmentShader: seaFragment,
      uniforms: {
        time: {
          value: initialElapsedTime,
        },
        color: {
          // value: new Vector3(0.7, 0.3, 0.2),
          value: new Color("#971245"),
        },
        circleSize: { value: 0.2 },
      },
      // defines: {
      // POINT_COUNT: 10,
      // },
      wireframe: true,
      vertexColors: true,
    });

    if (!materialRef.current) {
      materialRef.current = mat;
    }

    const mesh = new Mesh(geo, mat);
    scene.add(mesh);
  }, [materialRef]);

  // handle resize for ortographic camera
  // useEffect(() => {
  // if (camera instanceof OrthographicCamera) {
  console.log({ camera });

  camera.left = -zoom * aspect;
  camera.right = zoom * aspect;
  camera.top = zoom;
  camera.bottom = -zoom;

  // near and far already defined
  // but you can define it here if you want

  camera.position.set(zoom, zoom, zoom);

  camera.position.set(0, 0, 20);
  // camera.position.y = 0;

  camera.updateProjectionMatrix();
  //
  // console.log("updated");
  // }

  // ------------------------------------------------------------
  // ANIMATION FRAME
  useFrame(
    (
      { viewport: { aspect }, scene: sc, clock: { elapsedTime: time } },
      delta
    ) => {
      if (materialRef.current) {
        // console.log({ time });
        // materialRef.current.uniforms.circleSize.value = 2;
        // console.log({ time });
        materialRef.current.uniforms.time.value = time * 0.1;
      }
    }
  );

  return (
    <>
      <axesHelper />
      <pointLight color={"white"} intensity={4} position={[-5, 5, 5]} />
    </>
  );
}
