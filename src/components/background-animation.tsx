"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useThemeAware } from "@/hooks/use-theme-aware"

export function BackgroundAnimation() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef = useRef<number | null>(null)
  const { isDarkMode, mounted } = useThemeAware()

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
    camera.position.z = 50

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Create network mesh
    const geometry = new THREE.BufferGeometry()
    const vertices: number[] = []
    const colors: number[] = []
    
    // Create vertices for network nodes
    for (let i = 0; i < 100; i++) {
      vertices.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200
      )
      
      // Dynamic color based on theme
      const color = new THREE.Color()
      if (isDarkMode) {
        color.setHSL(0.4 + Math.random() * 0.2, 0.6, 0.5) // Original green tones
      } else {
        color.setHSL(0.55 + Math.random() * 0.1, 0.4, 0.6) // Softer blue tones for light mode
      }
      colors.push(color.r, color.g, color.b)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: isDarkMode ? 0.6 : 0.3 // Reduce opacity in light mode
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Create connecting lines
    const lineGeometry = new THREE.BufferGeometry()
    const lineVertices: number[] = []
    const positions = geometry.attributes.position.array as Float32Array

    for (let i = 0; i < positions.length; i += 9) {
      const x1 = positions[i]
      const y1 = positions[i + 1]
      const z1 = positions[i + 2]
      
      const x2 = positions[i + 3]
      const y2 = positions[i + 4]
      const z2 = positions[i + 5]
      
      if (Math.random() < 0.1) { // Only connect some points
        lineVertices.push(x1, y1, z1, x2, y2, z2)
      }
    }

    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(lineVertices, 3))
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: isDarkMode ? 0x404040 : 0x808080,
      transparent: true,
      opacity: isDarkMode ? 0.2 : 0.1 // Even more subtle in light mode
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // Mouse interaction
    const mouse = new THREE.Vector2()
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      // Rotate the entire network
      points.rotation.y += 0.001
      lines.rotation.y += 0.001
      points.rotation.x += 0.0005
      lines.rotation.x += 0.0005

      // Mouse interaction effect
      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.02
      camera.position.y += (-mouse.y * 5 - camera.position.y) * 0.02
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
    }, [isDarkMode, mounted])

  return (
    <div 
      ref={mountRef} 
      className={`fixed inset-0 -z-10 transition-opacity duration-500 ${isDarkMode ? 'opacity-30' : 'opacity-20'}`}
      style={{ pointerEvents: 'none' }}
    />
  )
}
