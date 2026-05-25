import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 1800 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  }, [count])

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const t = Math.random()
      if (t < 0.5) {
        col[i * 3] = 0; col[i * 3 + 1] = 0.83; col[i * 3 + 2] = 1
      } else {
        col[i * 3] = 0; col[i * 3 + 1] = 1; col[i * 3 + 2] = 0.53
      }
    }
    return col
  }, [count])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return g
  }, [positions, colors])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.03
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingMesh({ position, geometry, color, speed, amplitude = 0.4 }) {
  const ref = useRef()
  const phase = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    ref.current.rotation.x = t * speed * 0.5
    ref.current.rotation.y = t * speed * 0.7
    ref.current.position.y = position[1] + Math.sin(t * speed * 0.6 + phase) * amplitude
  })

  return (
    <mesh ref={ref} position={position} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        wireframe
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

function CameraMouseRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useMemo(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.03
    camera.position.y += (mouse.current.y * 0.3 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Scene() {
  const icosahedron = useMemo(() => new THREE.IcosahedronGeometry(1, 1), [])
  const torusKnot = useMemo(() => new THREE.TorusKnotGeometry(0.65, 0.22, 80, 12), [])
  const octahedron = useMemo(() => new THREE.OctahedronGeometry(0.85), [])
  const dodecahedron = useMemo(() => new THREE.DodecahedronGeometry(0.75), [])

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[8, 8, 8]} intensity={2} color="#00d4ff" />
      <pointLight position={[-8, -8, -4]} intensity={1.5} color="#00ff88" />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#7b2ff7" />
      <Particles />
      <CameraMouseRig />
      <FloatingMesh position={[-4, 1.5, -2]} geometry={icosahedron} color="#00d4ff" speed={0.35} />
      <FloatingMesh position={[4, -1, -2]} geometry={torusKnot} color="#00ff88" speed={0.28} amplitude={0.5} />
      <FloatingMesh position={[-1.5, -2.5, -1]} geometry={octahedron} color="#7b2ff7" speed={0.45} />
      <FloatingMesh position={[3, 3, -4]} geometry={dodecahedron} color="#00d4ff" speed={0.22} amplitude={0.6} />
    </>
  )
}

export function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  )
}
