"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, Bell, Zap, Heart } from "lucide-react"
import AdBanner from "@/components/ad-banner"
import RandomCursor from "@/components/random-cursor"
import BlinkingText from "@/components/blinking-text"
import PopupAd from "@/components/popup-ad"

export default function Home() {
  const [showPopup, setShowPopup] = useState(false)
  const [popupCount, setPopupCount] = useState(0)

  useEffect(() => {
    // Show popup ad every 10 seconds
    const interval = setInterval(() => {
      setShowPopup(true)
      setPopupCount((prev) => prev + 1)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleButtonClick = () => {
    alert("Поздравляем! Вы выиграли ничего!")
    setShowPopup(true)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <RandomCursor />

      {/* Left side ads */}
      <div className="fixed left-0 top-0 h-full w-20 md:w-40 flex flex-col gap-4 p-2 z-10">
        <AdBanner position="left" />
        <AdBanner position="left" />
        <AdBanner position="left" />
      </div>

      {/* Right side ads */}
      <div className="fixed right-0 top-0 h-full w-20 md:w-40 flex flex-col gap-4 p-2 z-10">
        <AdBanner position="right" />
        <AdBanner position="right" />
        <AdBanner position="right" />
      </div>

      {/* Main content */}
      {/* Main content */}
<main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24 relative">
  <h1 className="text-5xl font-bold text-white mb-6 text-center">САМАЯ ВАЖНАЯ ИНФОРМАЦИЯ В МИРЕ</h1>

  <div className="relative flex flex-col items-center">
    <BlinkingText text="Самая важная информация в мире" className="mb-3 text-4xl font-bold text-center" />
    <h2 className="text-2xl font-semibold text-green-400 mb-8 animate-bounce">52</h2>
    <button onClick={handleButtonClick} className="relative px-6 py-3 font-bold text-black group">
      <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
      <span className="absolute inset-0 w-full h-full border-4 border-lime-500"></span>
      <span className="relative text-xl font-bold">НАЖМИ  МЕНЯ!</span>
    </button>
  </div>

  {showPopup && <PopupAd onClose={() => setShowPopup(false)} count={popupCount} />}
</main>

<footer className="fixed bottom-0 w-full bg-gradient-to-r from-purple-900 via-black to-pink-900 p-2 text-center border-t border-gray-300 z-20">
  <div className="flex justify-center items-center gap-1 mb-1">
    <Heart className="text-red-500" size={16} />
    <span className="text-white text-sm">БЕЗУМhack 2025</span>
    <Heart className="text-red-500" size={16} />
  </div>

  <div className="mt-1 flex justify-center gap-3">
    <Bell className="text-yellow-400 animate-spin" size={14} />
    <AlertTriangle className="text-red-400 animate-bounce" size={14} />
    <Bell className="text-yellow-400 animate-spin" size={14} />
  </div>
</footer>

    </div>
  )
}
