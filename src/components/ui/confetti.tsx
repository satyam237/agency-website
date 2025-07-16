"use client"

import React, { useRef, useCallback } from "react"
import confetti from "canvas-confetti"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ConfettiOptions {
  particleCount?: number
  angle?: number
  spread?: number
  startVelocity?: number
  decay?: number
  gravity?: number
  drift?: number
  ticks?: number
  origin?: { x: number; y: number }
  colors?: string[]
  shapes?: ("square" | "circle")[]
  scalar?: number
  zIndex?: number
  disableForReducedMotion?: boolean
}

interface ConfettiButtonProps extends ButtonProps {
  options?: ConfettiOptions
  onConfettiComplete?: () => void
}

const defaultOptions: ConfettiOptions = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  gravity: 0.5,
  decay: 0.94,
  startVelocity: 30,
  ticks: 100
}

export function ConfettiButton({
  children,
  options = {},
  onConfettiComplete,
  className,
  onClick,
  ...props
}: ConfettiButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const mergedOptions = { ...defaultOptions, ...options }
      
      // Get button position for origin calculation
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        const x = (rect.left + rect.width / 2) / window.innerWidth
        const y = (rect.top + rect.height / 2) / window.innerHeight
        
        mergedOptions.origin = { x, y }
      }

      // Add button animation class
      if (buttonRef.current) {
        buttonRef.current.classList.add('confetti-animation')
        setTimeout(() => {
          buttonRef.current?.classList.remove('confetti-animation')
        }, 400)
      }

      // Fire confetti
      confetti(mergedOptions).then(() => {
        onConfettiComplete?.()
      })

      // Call original onClick handler
      onClick?.(event)
    },
    [options, onConfettiComplete, onClick]
  )

  return (
    <Button
      ref={buttonRef}
      className={cn("transition-transform duration-200", className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Button>
  )
}

// Preset confetti effects
export const confettiPresets = {
  success: {
    particleCount: 100,
    spread: 70,
    colors: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'],
    gravity: 0.5,
    decay: 0.94,
    startVelocity: 30,
    ticks: 100
  },
  celebration: {
    particleCount: 150,
    spread: 360,
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
    gravity: 0.5,
    decay: 0.94,
    startVelocity: 30,
    ticks: 100
  },
  meeting: {
    particleCount: 80,
    spread: 60,
    colors: ['#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'],
    gravity: 0.6,
    decay: 0.95,
    startVelocity: 25,
    ticks: 80
  },
  gentle: {
    particleCount: 50,
    spread: 45,
    colors: ['#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af'],
    gravity: 0.3,
    decay: 0.96,
    startVelocity: 20,
    ticks: 60
  }
}