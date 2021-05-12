import './App.scss';
import { Suspense, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from 'react-three-fiber';
import { Html, useGLTF } from '@react-three/drei';
import { Flex } from '@react-three/flex';
import { Section } from './Components/section';
//Components
import Header from './Components/Header';

//Page States
import state from './Components/state';

//Animation Configs

const initialAnimation = {
  animate: {
    y: 1,
    transition: {
      duration: 2,
      yoyo: Infinity,
    },
  },
  initial: {
    y: -10,
  },
};

const Model = ({ modelPath }) => {
  let gltf = useGLTF(modelPath);
  //const box = new THREE.Box3().setFromObject( gltf.scene );
  //gltf = box.center( gltf.position );

  //const box = useMemo(() => new THREE.Box3().setFromObject(gltf), [gltf])
  return <primitive object={gltf.scene} dispose={null} />;
};

const Lights = () => {
  return (
    <>
      <directionalLight intensity={0.5} position={[10, 10, 20]} />
      <directionalLight intensity={0.5} position={[-10, 50, -20]} />
    </>
  );
};

const HTMLContent = ({
  children,
  modelPath,
  modelScale,
  modelRotation,
  modelPosition,
  position,
  domContent,
}) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));

  return (
    <Section factor={1.5} offset={1}>
      <group position={position}>
        <mesh
          ref={ref}
          position={modelPosition}
          scale={modelScale}
          rotation={modelRotation}
        >
          <Model modelPath={modelPath} />
        </mesh>
        <Html portal={domContent} fullscreen>
          {children}
        </Html>
      </group>
    </Section>
  );
};

function App() {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (event) => (state.top.current = event.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  return (
    <>
      <Header />
      <Canvas camera={{ position: [0, 0, 10], fov: 70 }}>
        <Flex>
          <Lights />
          <Suspense fallback={null}>
            <HTMLContent
              domContent={domContent}
              position={[0, 20, 0]}
              modelPath="/macClassic.gltf"
              modelScale={[0.006, 0.006, 0.006]}
              modelRotation={[0, 0, 0]}
              modelPosition={[0, 1, 0]}
            >
              <div className="container">
                <motion.h1
                  variants={initialAnimation}
                  transition="transition"
                  animate="animate"
                  initial="initial"
                  className="title"
                >
                  An unforgettable past.
                </motion.h1>
              </div>
            </HTMLContent>
            *
            <HTMLContent
              domContent={domContent}
              modelPath="/imac4k.gltf"
              position={[0, 40, 0]}
              modelScale={[0.15, 0.15, 0.15]}
              modelRotation={[0, 0, 0]}
              modelPosition={[0, -2, 0]}
            >
              <div className="container">
                <motion.h1
                  variants={initialAnimation}
                  transition="transition"
                  animate="animate"
                  initial="initial"
                  className="title"
                >
                  The gift of the present.
                </motion.h1>
              </div>
            </HTMLContent>
          </Suspense>
        </Flex>
      </Canvas>
      <div className="scrollArea" ref={scrollArea}>
        <div style={{ position: 'sticky', top: 0 }} ref={domContent}></div>
        <div style={{ height: `${state.pages * 100}vh` }}> </div>
      </div>
    </>
  );
}

export default App;
