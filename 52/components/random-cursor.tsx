"use client"

import { useEffect } from "react"

const cursors = [
  "default",
  "pointer",
  "crosshair",
  "move",
  "text",
  "wait",
  "help",
  "progress",
  "not-allowed",
  "grab",
  "zoom-in",
  "cell",
  "alias",
  "copy",
  "no-drop",
  "all-scroll",
  "col-resize",
  "row-resize",
  "n-resize",
  "e-resize",
  "s-resize",
  "w-resize",
  "ne-resize",
  "nw-resize",
  "se-resize",
  "sw-resize",
  "ew-resize",
  "ns-resize",
  "nesw-resize",
  "nwse-resize",
]

export default function RandomCursor() {
  useEffect(() => {
    const changeCursor = () => {
      const randomIndex = Math.floor(Math.random() * cursors.length)
      document.body.style.cursor = cursors[randomIndex]
    }

    // Change cursor every 3 seconds
    const interval = setInterval(changeCursor, 3000)

    // Also change cursor on mouse move occasionally
    const handleMouseMove = () => {
      if (Math.random() < 0.05) {
        // 5% chance to change cursor on mouse move
        changeCursor()
      }
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      clearInterval(interval)
      document.removeEventListener("mousemove", handleMouseMove)
      document.body.style.cursor = "default"
    }
  }, [])

  return null
}

