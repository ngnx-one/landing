"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"

export function ThreeCoin({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(600, 600)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Create coin geometry and material
    const coinGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.2, 32)
    
    // Dynamic material based on theme
    const isDarkMode = document.documentElement.classList.contains('dark')
    const coinMaterial = new THREE.MeshStandardMaterial({
      color: isDarkMode ? 0xffd700 : 0xe6c200, // Slightly darker gold in light mode
      metalness: isDarkMode ? 0.8 : 0.6,
      roughness: isDarkMode ? 0.2 : 0.3,
    })
    const coin = new THREE.Mesh(coinGeometry, coinMaterial)
    scene.add(coin)

    // Add embossed "N" on the coin
    const textGeometry = new THREE.RingGeometry(0.3, 0.8, 8)
    const textMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.8,
    })
    const coinText = new THREE.Mesh(textGeometry, textMaterial)
    coinText.position.z = 0.11
    coinText.rotateX(Math.PI / 2)
    scene.add(coinText)

    // Create particles for blockchain network effect
    const particleCount = 200
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 20
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    
    const particleMaterial = new THREE.PointsMaterial({
      color: isDarkMode ? 0x00ff88 : 0x0088ff, // Blue particles in light mode
      size: 0.05,
      transparent: true,
      opacity: isDarkMode ? 0.6 : 0.4, // More subtle in light mode
    })
    
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // Lighting - adjusted for theme
    const ambientLight = new THREE.AmbientLight(
      isDarkMode ? 0x404040 : 0x808080, 
      isDarkMode ? 0.6 : 0.8
    )
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(
      0xffffff, 
      isDarkMode ? 1 : 1.2
    )
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      // Rotate coin
      coin.rotation.y += 0.01
      coin.rotation.x += 0.005

      // Animate particles
      particles.rotation.y += 0.002
      particles.rotation.x += 0.001

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      const width = 600
      const height = 600
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className={className} />
}
