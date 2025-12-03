// Contenu du Canvas 3D - chargé uniquement quand nécessaire
import { Canvas } from '@react-three/fiber'
// OrbitControls retiré car il était désactivé - économise ~50KB
import Model3D from './Model3D'

function Canvas3DContent({ rotation, translateY, scale, modelKey, locationPathname }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
      style={{ background: 'transparent', pointerEvents: 'none' }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} />
      <Model3D 
        key={`${locationPathname}-${modelKey}`} 
        rotation={rotation} 
        translateY={translateY} 
        scale={scale} 
      />
    </Canvas>
  )
}

export default Canvas3DContent

