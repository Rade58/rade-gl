"use client";

import { useEffect, useRef, /* useMemo, useCallback ,*/ memo } from "react";
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

import { bg_base } from "@/consts/styles";

// -------------------------------------------------------------
import { usePlayhead } from "@/hooks/usePlayhead";

// -------------------------------------------------------------
// ------------------------ SHADERS ----------------------------
//
import seaVertex from "@/shaders/playground/sea_2/index.vert";
import seaFragment from "@/shaders/playground/sea_2/index.frag";

// -------------------------------------------------------------
// -------------------------------------------------------------
const zoom = 6;
const pall = pick(palettes);

// eslint-disable-next-line
const Sea2Scene = memo(() => {
  // ------------------------------------------------------
  // ------------------------------------------------------
  // ------------------------------------------------------
  // ------------------------------------------------------
  const {
    gl,
    camera: cam,
    // controls: con,   not working from here
    scene: sc,
    clock: { elapsedTime: initialElapsedTime },
    viewport: { aspect }, // not needed
    // set,
    // size,
  } = useThree();

  // ------ CAMMERA, SCENE
  const scene = sc as unknown as Scene;
  const camera = cam as unknown as PerspectiveCamera;
  // const camera = cam as unknown as OrthographicCamera;
  // --------------------------------------------------------
  // --------------------------------------------------------
  // MATERIALS
  const seaMaterialRef = useRef<ShaderMaterial | null>(null);
  // CONTROLS
  const controlsRef = useRef<TrackballControls | null>(null);
  // LIGHTS
  const pointLightRef = useRef<PointLight | null>(null);
  const ambientLightRef = useRef<AmbientLight | null>(null);
  const directionalLightRef = useRef<DirectionalLight | null>(null);
  // HELPERS
  const axesHelperRef = useRef<AxesHelper | null>(null);

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

  // handle resizing

  console.log("RERENDERED");

  useEffect(() => {
    console.log("EFFECTED");

    gl.setClearColor(bg_base, 1);
    // gl.setClearColor(bg_base, 1);
    // gl.setClearColor(pick(pick(palettes)), 1);

    // ---- HELPERS SETUP -----
    if (axesHelperRef.current) {
      axesHelperRef.current.setColors("red", "green", "blue");
    }

    if (pointLightRef.current) {
      const pointLightHelper = new PointLightHelper(pointLightRef.current);

      scene.add(pointLightHelper);
    }

    if (ambientLightRef.current) {
      //
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
    // const upVector = new Vector3(0, 0, 1);
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

    // -------------------------------------------
    // -------------------------------------------

    // const directLight = new DirectionalLight("white", 2);
    // const ambientLight = new AmbientLight("#351430", 1);
    // const pointLight = new PointLight("#8c86d6", 2.6, 73.18);
    // ---------------------------------------------------
    // ---------------------------------------------------

    // ---------------------------------------------------
    // ---------------------------------------------------
  }, [
    seaMaterialRef,
    axesHelperRef,
    camera,
    gl,
    scene,
    controlsRef,
    pointLightRef,
  ]);

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

      if (controlsRef.current) {
        controlsRef.current.update();
      }
    }
  );

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
      <ambientLight
        // @ts-ignore ref
        ref={ambientLightRef}
        args={["purple", 12]}
        position={[0, 2, 36]}
      />
      <directionalLight
        // @ts-ignore ref
        ref={directionalLightRef}
        args={["white", 19]}
        position={[0, 3, 26]}
      />
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
});

export default Sea2Scene;
