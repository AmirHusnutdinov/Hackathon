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
      <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24 relative">
        <div className="z-10 max-w-5xl w-full items-center justify-between text-sm lg:flex">
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-black via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <div className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
              <Zap className="text-yellow-300 animate-pulse" size={54} />
              <span className="text-yellow-300 font-mono">52</span> {/* Team's name */}
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-purple-600 before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-pink-500 after:via-red-500 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-purple-700 before:dark:opacity-10 after:dark:from-pink-900 after:dark:via-[#ff00ee] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <BlinkingText text="Most important information in the world" className="mb-3 text-4xl font-bold text-center" />
          <h2 className="text-2xl font-semibold text-green-400 mb-8 animate-bounce">52</h2> {/* Team's name */}

          <button onClick={handleButtonClick} className="relative px-6 py-3 font-bold text-black group">
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full border-4 border-lime-500"></span>
            <span className="relative text-xl font-bold">НАЖМИ МЕНЯ!</span>
          </button>
        </div>

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
          <div className="group rounded-lg border border-pink-500 px-5 py-4 m-2 bg-black hover:bg-pink-950 transition-colors">
            <h2 className="mb-3 text-2xl font-semibold text-pink-400">
              UX боли и страданий{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50 text-pink-300">
              Самый ужасный интерфейс среди всех проектов!
            </p>
          </div>

          <div className="group rounded-lg border border-cyan-500 px-5 py-4 m-2 bg-black hover:bg-cyan-950 transition-colors">
            <h2 className="mb-3 text-2xl font-semibold text-cyan-400">
              Абсурдно{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50 text-cyan-300">Неэффективно, но функционально!</p>
          </div>

          <div className="group rounded-lg border border-yellow-500 px-5 py-4 m-2 bg-black hover:bg-yellow-950 transition-colors">
            <h2 className="mb-3 text-2xl font-semibold text-yellow-400">
              Креативно{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50 text-yellow-300">Вызов традиционным принципам UI/UX!</p>
          </div>
        </div>

        {showPopup && <PopupAd onClose={() => setShowPopup(false)} count={popupCount} />}
      </main>

      <footer className="w-full bg-gradient-to-r from-purple-900 via-black to-pink-900 p-4 text-center border-t border-gray-600">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Heart className="text-red-500" size={20} />
          <span className="text-white">БЕЗУМhack 2025</span>
          <Heart className="text-red-500" size={20} />
        </div>
        <p className="text-xs text-gray-400 animate-pulse">
          Сайт специально разработан для категории "UX боли и страданий"
        </p>
        <div className="mt-2 flex justify-center gap-4">
          <Bell className="text-yellow-400 animate-spin" size={16} />
          <AlertTriangle className="text-red-400 animate-bounce" size={16} />
          <Bell className="text-yellow-400 animate-spin" size={16} />
        </div>
      </footer>
    </div>
  )
}
