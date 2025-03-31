"use client"

import { useState, useEffect } from "react"

interface BlinkingTextProps {
  text: string
  className?: string
}

export default function BlinkingText({ text, className = "" }: BlinkingTextProps) {
  const [visible, setVisible] = useState(true)
  const [color, setColor] = useState("text-white")

  const neonColors = [
    "text-pink-500",
    "text-purple-500",
    "text-blue-500",
    "text-green-500",
    "text-yellow-500",
    "text-red-500",
    "text-cyan-500",
  ]

  useEffect(() => {
    // Blink the text
    const blinkInterval = setInterval(() => {
      setVisible((prev) => !prev)
    }, 500)

    // Change color every 2 seconds
    const colorInterval = setInterval(() => {
      const randomColor = neonColors[Math.floor(Math.random() * neonColors.length)]
      setColor(randomColor)
    }, 2000)

    return () => {
      clearInterval(blinkInterval)
      clearInterval(colorInterval)
    }
  }, [])

  return (
    <h1
      className={`${className} ${color} ${visible ? "opacity-100" : "opacity-30"} transition-opacity duration-300 text-shadow-neon`}
    >
      {text}
    </h1>
  )
}

