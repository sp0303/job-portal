// src/components/AnimatedBackground.js
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';

// 🟦 Floating glowing nodes with theme support
function FloatingNodes({ theme }) {
  const group = useRef();

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  const nodes = useMemo(() => {
    const colors = theme === 'dark' 
      ? ['#00ffff', '#00bfff', '#00ced1', '#20b2aa'] // Brighter cyans for dark theme
      : ['#008b8b', '#0096ff', '#00b4d8', '#48d1cc']; // Muted teals for light theme

    return Array.from({ length: 50 }, (_, i) => (
      <mesh 
        key={i} 
        position={[
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 30
        ]}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color={colors[i % colors.length]}
          emissive={colors[i % colors.length]}
          emissiveIntensity={theme === 'dark' ? 1.5 : 1.0}
          transparent
          opacity={0.8}
        />
      </mesh>
    ));
  }, [theme]);

  return <group ref={group}>{nodes}</group>;
}

// 🟥 Glowing animated grid with theme support
function GlowingGrid({ theme }) {
  const gridRef = useRef();

  useFrame(() => {
    if (gridRef.current?.material?.uniforms?.time) {
      gridRef.current.material.uniforms.time.value += 0.01;
    }
  });

  const gridColor = theme === 'dark' ? '0.0, 1.0, 1.0' : '0.0, 0.5, 0.5'; // Cyan vs teal

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} ref={gridRef}>
      <planeGeometry args={[100, 100, 64, 64]} />
      <shaderMaterial
        transparent
        uniforms={{
          time: { value: 0 },
        }}
        vertexShader={`
          uniform float time;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 2.0 + time) * 0.2;
            pos.z += sin(pos.y * 2.0 + time) * 0.2;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          precision mediump float;
          varying vec2 vUv;
          void main() {
            float grid = step(0.05, abs(sin(vUv.x * 50.0)) * abs(sin(vUv.y * 50.0)));
            vec3 color = mix(vec3(0.0), vec3(${gridColor}), grid);
            gl_FragColor = vec4(color, ${theme === 'dark' ? '0.5' : '0.3'});
          }
        `}
      />
    </mesh>
  );
}

export default function AnimatedBackground() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Detect theme from document class (common in Tailwind)
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };
    
    // Initial check
    checkTheme();
    
    // Watch for changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const bgColor = theme === 'dark' ? 'rgba(10, 15, 20, 0.8)' : 'rgba(240, 248, 255, 0.8)';

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      backgroundColor: bgColor,
      transition: 'background-color 0.5s ease'
    }}>
      <Canvas camera={{ position: [0, 0, 25], fov: 75 }}>
        <ambientLight intensity={theme === 'dark' ? 0.3 : 0.5} />
        <pointLight 
          position={[10, 10, 10]} 
          intensity={theme === 'dark' ? 0.8 : 0.6}
          color={theme === 'dark' ? '#00ffff' : '#ffffff'}
        />
        <GlowingGrid theme={theme} />
        <FloatingNodes theme={theme} />
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}