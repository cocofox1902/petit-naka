import { useState, useRef, useEffect } from 'react'

function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%231f2937" width="400" height="300"/%3E%3C/svg%3E',
  ...props 
}) {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    let observer
    let isCancelled = false

    if (imgRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isCancelled) {
              const img = new Image()
              img.src = src
              img.onload = () => {
                if (!isCancelled) {
                  setImageSrc(src)
                  setIsLoaded(true)
                }
              }
              img.onerror = () => {
                if (!isCancelled) {
                  setHasError(true)
                }
              }
              observer.unobserve(imgRef.current)
            }
          })
        },
        { rootMargin: '50px' }
      )
      observer.observe(imgRef.current)
    } else {
      // Fallback pour les navigateurs sans IntersectionObserver
      const img = new Image()
      img.src = src
      img.onload = () => {
        if (!isCancelled) {
          setImageSrc(src)
          setIsLoaded(true)
        }
      }
      img.onerror = () => {
        if (!isCancelled) {
          setHasError(true)
        }
      }
    }

    return () => {
      isCancelled = true
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [src])

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-50'} transition-opacity duration-300`}
      loading="lazy"
      onError={() => setHasError(true)}
      aria-label={alt}
      {...props}
    />
  )
}

export default LazyImage

