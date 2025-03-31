"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface AdBannerProps {
  position: "left" | "right"
}

export default function AdBanner({ position }: AdBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  const [adType, setAdType] = useState(0)

  useEffect(() => {
    // Randomly select an ad type
    setAdType(Math.floor(Math.random() * 5))

    // Reset the ad after some time if dismissed
    if (dismissed) {
      const timeout = setTimeout(() => {
        setDismissed(false)
        setAdType(Math.floor(Math.random() * 5))
      }, 15000)

      return () => clearTimeout(timeout)
    }
  }, [dismissed])

  if (dismissed) return null

  const getAdContent = () => {
    switch (adType) {
      case 0:
        return (
          <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-2 text-black text-xs animate-pulse">
            <p className="font-bold">ГОРЯЧИЕ СКИДКИ!</p>
            <p>Нажмите здесь!</p>
          </div>
        )
      case 1:
        return (
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 text-white text-xs">
            <p className="font-bold">ВЫ ВЫИГРАЛИ!</p>
            <p>Получите приз!</p>
          </div>
        )
      case 2:
        return (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 text-white text-xs">
            <p className="font-bold">СЕКРЕТНЫЙ МЕТОД</p>
            <p>Узнайте как!</p>
          </div>
        )
      case 3:
        return (
          <div className="bg-gradient-to-r from-blue-600 to-indigo-500 p-2 text-white text-xs animate-bounce">
            <p className="font-bold">ПОСЛЕДНИЙ ШАНС</p>
            <p>Только сегодня!</p>
          </div>
        )
      case 4:
        return (
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 text-white text-xs">
            <p className="font-bold">ВНИМАНИЕ!</p>
            <p>Важное сообщение!</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={`relative w-full border border-gray-700 overflow-hidden ${position === "left" ? "ml-0" : "mr-0"}`}>
      <button onClick={() => setDismissed(true)} className="absolute top-0 right-0 bg-gray-800 p-1 z-20">
        <X size={12} className="text-white" />
      </button>
      {getAdContent()}
    </div>
  )
}
