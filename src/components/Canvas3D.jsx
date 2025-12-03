// Composant Canvas 3D lazy loaded pour réduire le bundle initial
import { lazy, Suspense } from 'react'

// Lazy load du Canvas et des composants Three.js
const Canvas3DContent = lazy(() => import('./Canvas3DContent'))

function Canvas3D({ rotation, translateY, scale, modelKey, locationPathname }) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <Canvas3DContent 
        rotation={rotation}
        translateY={translateY}
        scale={scale}
        modelKey={modelKey}
        locationPathname={locationPathname}
      />
    </Suspense>
  )
}

export default Canvas3D

