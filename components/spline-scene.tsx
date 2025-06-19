"use client"

import { Suspense } from "react"

// Placeholder component for Spline 3D scene
// To integrate actual Spline scenes, install @splinetool/react-spline
// and replace this with: import Spline from '@splinetool/react-spline'

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className = "" }: SplineSceneProps) {
  return (
    <div className={`relative ${className}`}>
      <Suspense
        fallback={
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg animate-pulse flex items-center justify-center">
            <div className="text-blue-600 font-medium">Loading 3D Scene...</div>
          </div>
        }
      >
        {/* Replace this div with actual Spline component */}
        <div className="w-full h-full bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <div className="text-center text-blue-700">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
            </div>
            <p className="text-sm font-medium">3D Scene: {scene}</p>
          </div>
        </div>
        {/* 
        Actual Spline integration would look like:
        <Spline scene={scene} />
        */}
      </Suspense>
    </div>
  )
}
