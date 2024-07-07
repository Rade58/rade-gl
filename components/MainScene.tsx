"use client";

import { useEffect, useRef } from "react";
// import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
  shaderMaterial,
  useAnimations,
  // TrackballControls,
} from "@react-three/drei";
import {
  AmbientLight,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PointLight,
  Vector3,
  DirectionalLight,
  MeshStandardMaterial,
  ShaderMaterial,
  Color,
  IcosahedronGeometry,
  Float32BufferAttribute,
  SphereGeometry,
  CircleGeometry,
  BackSide,
  PlaneGeometry,
  type AxesHelper,
  type PerspectiveCamera,
  type OrthographicCamera,
  type Scene,
  PointLightHelper,
  DirectionalLightHelper,
} from "three";
import { TrackballControls } from "three/examples/jsm/Addons.js";

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

// import { bg_base } from "@/consts/styles";

// -------------------------------------------------------------
import { usePlayhead } from "@/hooks/usePlayhead";

// -------------------------------------------------------------
// ------------------------ SHADERS ----------------------------
//
import seaVertex from "@/shaders/primary/sea/index.vert";
import seaFragment from "@/shaders/primary/sea/index.frag";

// -------------------------------------------------------------
// -------------------------------------------------------------
// const zoom = 6;
// const pall = pick(palettes);

// eslint-disable-next-line
export default function MainScene() {
  // ------------------------------------------------------
  // ------------------------------------------------------
  // ------------------------------------------------------
  // ------------------------------------------------------
  /* const {
    gl,
    camera: cam,
    // controls: con,   not working from here
    scene: sc,
    // clock: { elapsedTime: initialElapsedTime },
    // viewport: { aspect }, // not needed
    // set,
    // size,
  } = useThree(); */

  // ------ CAMMERA, SCENE
  // const scene = sc as unknown as Scene;
  // const camera = cam as unknown as PerspectiveCamera;
  // const camera = cam as unknown as OrthographicCamera;
  // --------------------------------------------------------
  // --------------------------------------------------------
  // MATERIALS
  const seaMaterialRef = useRef<ShaderMaterial | null>(null);

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

  // const { playheadRef, computePlayheadInFrame } = usePlayhead(20, 2, true);

  /* useEffect(() => {
    // 
    // 
  }, [seaMaterialRef]);
 */
  //
  // ------------------------------------------------------------
  // ANIMATION FRAME
  useFrame(
    (
      { viewport: { aspect }, scene: sc, clock: { elapsedTime: time } },
      delta
    ) => {
      // console.log({ seaMaterialRef: seaMaterialRef.current });

      if (seaMaterialRef.current) {
        // console.log({ time });
        // materialRef.current.uniforms.circleSize.value = 2;
        // console.log({ time });
        seaMaterialRef.current.uniforms.time.value = time * 0.1;
      }
    }
  );

  return (
    <>
      {/* ---------- MESHES ---------------- */}
      <mesh>
        <planeGeometry args={[108, 108, 168, 168]} />
        <shaderMaterial
          // @ts-ignore ref
          ref={seaMaterialRef}
          vertexShader={seaVertex}
          fragmentShader={seaFragment}
          uniforms={{
            time: {
              value: 0,
            },
            color: {
              // value: new Vector3(0.7, 0.3, 0.2),
              value: new Color("#971245"),
            },
            circleSize: { value: 0 },
          }}
          vertexColors
          wireframe
        />
      </mesh>
    </>
  );
}
