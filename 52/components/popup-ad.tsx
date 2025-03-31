"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, AlertTriangle } from "lucide-react"

interface PopupAdProps {
  onClose: () => void
  count: number
}

export default function PopupAd({ onClose, count }: PopupAdProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [isMoving, setIsMoving] = useState(false)

  useEffect(() => {
    // Move the popup randomly every second
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance to move
        setIsMoving(true)
        setPosition({
          x: Math.max(10, Math.min(80, position.x + (Math.random() * 40 - 20))),
          y: Math.max(10, Math.min(80, position.y + (Math.random() * 40 - 20))),
        })

        setTimeout(() => {
          setIsMoving(false)
        }, 500)
      }
    }, 1500)

    return () => clearInterval(interval)
  }, [position])

  // Make the close button run away from the cursor on hover
  const handleCloseHover = () => {
    setPosition({
      x: Math.max(10, Math.min(80, position.x + (Math.random() * 40 - 20))),
      y: Math.max(10, Math.min(80, position.y + (Math.random() * 40 - 20))),
    })
  }

  const handleActualClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleActualClose}
    >
      <div
        className={`absolute bg-gradient-to-r from-purple-900 to-pink-900 border-4 border-yellow-400 p-4 rounded shadow-lg w-80 transition-all duration-500 ${isMoving ? "scale-105" : "scale-100"}`}
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <AlertTriangle className="text-yellow-400 mr-2" size={20} />
            <h3 className="text-xl font-bold text-white">ВАЖНОЕ СООБЩЕНИЕ #{count}</h3>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold p-1 rounded"
            onMouseEnter={handleCloseHover}
            onClick={handleActualClose}
          >
            <X size={16} />
          </button>
        </div>

        <div className="text-white mb-4">
          <p className="mb-2">Поздравляем! Вы стали нашим {Math.floor(Math.random() * 1000) + 1}-м посетителем!</p>
          <p className="animate-pulse text-yellow-300 font-bold">Нажмите OK чтобы получить ваш приз!</p>
        </div>

        <div className="flex justify-center gap-2">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded animate-bounce"
            onClick={handleActualClose}
          >
            OK
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onMouseEnter={handleCloseHover}
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  )
}
