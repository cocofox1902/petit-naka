import { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
// Imports optimisés de Three.js - seulement ce qui est nécessaire
import { MathUtils, Vector3, Box3 } from 'three'
import modelPath from '../assets/models/ramen.glb'

function Model3D({ rotation, translateY, scale }) {
  const { scene: originalScene } = useGLTF(modelPath)
  const modelRef = useRef()
  const initialValuesRef = useRef(null)
  const [clonedScene, setClonedScene] = useState(null)

  // Cloner la scène pour éviter les modifications persistantes
  useEffect(() => {
    if (originalScene && !clonedScene) {
      // Cloner la scène complète de manière asynchrone pour éviter les warnings
      const cloned = originalScene.clone(true)
      setTimeout(() => {
        setClonedScene(cloned)
      }, 0)
    }
    
    // Nettoyer au démontage
    return () => {
      if (clonedScene) {
        clonedScene.traverse((child) => {
          if (child.isMesh) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => {
                if (mat && mat.dispose) mat.dispose()
              })
            } else if (child.material && child.material.dispose) {
              child.material.dispose()
            }
            if (child.geometry && child.geometry.dispose) {
              child.geometry.dispose()
            }
          }
        })
      }
    }
  }, [originalScene, clonedScene])

  // Calculer et stocker les valeurs initiales, et réinitialiser le modèle
  useEffect(() => {
    if (clonedScene) {
      // Réinitialiser initialValuesRef à null pour forcer le recalcul
      initialValuesRef.current = null
      
      const box = new Box3().setFromObject(clonedScene)
      const center = box.getCenter(new Vector3())
      const size = box.getSize(new Vector3())
      
      // Calculer le scale de base
      const maxDim = Math.max(size.x, size.y, size.z)
      const baseScaleFactor = maxDim > 0 ? (2 / maxDim) * 1.7 : 1.7
      
      // Stocker les valeurs initiales (toujours recalculer pour garantir la bonne position)
      initialValuesRef.current = {
        initialX: -center.x - 0.5,
        initialY: -center.y,
        initialZ: -center.z,
        baseScale: baseScaleFactor
      }
      
      // Configurer les matériaux pour supporter la transparence
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              if (mat) mat.transparent = true
            })
          } else if (child.material) {
            child.material.transparent = true
          }
        }
      })
      
      // Fonction pour réinitialiser le modèle
      const resetModel = () => {
        if (modelRef.current && initialValuesRef.current) {
          // Réinitialiser toutes les transformations à chaque montage
          modelRef.current.position.set(
            initialValuesRef.current.initialX,
            initialValuesRef.current.initialY,
            initialValuesRef.current.initialZ
          )
          // Rotation initiale de 90° sur l'axe X pour corriger l'orientation du bol
          modelRef.current.rotation.set(MathUtils.degToRad(-70), 0, 0)
          modelRef.current.scale.set(
            initialValuesRef.current.baseScale,
            initialValuesRef.current.baseScale,
            initialValuesRef.current.baseScale
          )
        }
      }
      
      // Réinitialiser immédiatement et aussi après des délais pour s'assurer que le ref est prêt
      resetModel()
      const timer1 = setTimeout(resetModel, 50)
      const timer2 = setTimeout(resetModel, 200)
      const timer3 = setTimeout(resetModel, 500)
      
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [clonedScene]) // Réinitialiser quand la scène clonée change

  // Appliquer la rotation, la translation et le scale
  useFrame(() => {
    if (modelRef.current && clonedScene && initialValuesRef.current) {
      // Rotation initiale fixe sur X + rotation Z du scroll (au lieu de Y)
      modelRef.current.rotation.x = MathUtils.degToRad(-70)
      modelRef.current.rotation.y = 0
      modelRef.current.rotation.z = MathUtils.degToRad(rotation)
      
      // Appliquer la translation : partir de la position Y initiale et descendre progressivement
      modelRef.current.position.x = initialValuesRef.current.initialX
      modelRef.current.position.y = initialValuesRef.current.initialY - translateY
      modelRef.current.position.z = initialValuesRef.current.initialZ
      
      // Appliquer le scale (multiplier le scale de base par le scale du scroll)
      const newScale = initialValuesRef.current.baseScale * scale
      modelRef.current.scale.set(newScale, newScale, newScale)
    }
  })

  // Opacité fixe à 100% (pas d'effet d'opacité)
  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              if (mat) {
                mat.transparent = false
                mat.opacity = 1
                mat.needsUpdate = true
              }
            })
          } else if (child.material) {
            child.material.transparent = false
            child.material.opacity = 1
            child.material.needsUpdate = true
          }
        }
      })
    }
  }, [clonedScene])

  // Ne pas rendre si la scène clonée n'est pas prête
  if (!clonedScene) {
    return null
  }

  return (
    <primitive 
      ref={modelRef}
      object={clonedScene} 
      position={[0, 0, 0]}
    />
  )
}

// Ne PAS précharger le modèle pour réduire le bundle initial
// Le modèle sera chargé à la demande quand le composant est monté
// useGLTF.preload(modelPath) // Désactivé pour améliorer les performances

export default Model3D
