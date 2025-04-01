"use client"

import { useState, useEffect } from "react"
import { X, CreditCard, AlertTriangle } from "lucide-react"
import { ethers } from "ethers"
import { BrowserProvider } from "ethers"

interface ShoppingCartModalProps {
  cart: Array<{ product: any; quantity: number }>
  onClose: () => void
}

export default function ShoppingCartModal({ cart, onClose }: ShoppingCartModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [rainbowMode, setRainbowMode] = useState(false)
  const [hoverClose, setHoverClose] = useState(false)

  // Annoying color changes
  useEffect(() => {
    if (!rainbowMode) return
    const interval = setInterval(() => {
      document.documentElement.style.setProperty('--terrible-color', `hsl(${Math.random() * 360}, 100%, 50%)`)
    }, 100)
    return () => clearInterval(interval)
  }, [rainbowMode])

  // Confusing total calculation
  const total = cart.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity) + (Math.random() > 0.5 ? 0 : Math.random() * 10)
  }, 0)

  const handleCheckout = async () => {
    setIsProcessing(true);
    setRainbowMode(true);

    // Create a full-screen video element
    const video = document.createElement('video');
    video.src = '/VIDEEO.mp4'; // Replace with your actual video path
    video.autoplay = true;
    video.loop = true;
    video.muted = true; // Important for autoplay in most browsers
    video.playsInline = true;

    // Style the video to be full-screen
    video.style.position = 'fixed';
    video.style.top = '0';
    video.style.left = '0';
    video.style.width = '100vw';
    video.style.height = '100vh';
    video.style.objectFit = 'cover';
    video.style.zIndex = '9999';

    // Add to document
    document.body.appendChild(video);

    // Optional: Add a way to close the video after some time or on click
    video.addEventListener('click', () => {
      document.body.removeChild(video);
      setIsProcessing(false);
      setRainbowMode(false);
    });

    // Optional: Auto-close after 10 seconds
    setTimeout(() => {
      if (document.body.contains(video)) {
        document.body.removeChild(video);
        setIsProcessing(false);
        setRainbowMode(false);
      }
    }, 10000);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      style={{ fontFamily: 'Comic Sans MS, cursive' }}
      onClick={onClose}
    >
      <div
        className="relative bg-pink-100 border-4 border-dashed border-yellow-400 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden"
        style={{
          backgroundColor: rainbowMode ? 'var(--terrible-color)' : 'pink',
          borderColor: rainbowMode ? 'var(--terrible-color)' : 'yellow',
          boxShadow: '0 0 20px 5px purple'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hard-to-find close button */}
        <button
          onClick={onClose}
          className={`absolute top-2 right-2 p-1 rounded-full ${hoverClose ? 'bg-red-500' : 'bg-green-500'}`}
          onMouseEnter={() => setHoverClose(true)}
          onMouseLeave={() => setHoverClose(false)}
          style={{
            transition: 'all 0.3s',
            transform: hoverClose ? 'scale(1.5)' : 'scale(1)'
          }}
        >
          <X size={20} color="white" />
        </button>

        {/* Header with terrible styling */}
        <div
          className="p-3 text-center border-b-2 border-purple-500"
          style={{
            backgroundColor: 'yellow',
            textShadow: '2px 2px 3px red'
          }}
        >
          <h2 className="font-bold text-xl">
            🛒 YOUR CART 🛒
          </h2>
          <div className="text-sm text-red-600 font-bold animate-pulse">
            LIMITED TIME OFFER!!!
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="p-4 text-center bg-blue-100">
            <p className="font-bold text-red-600">YOUR CART IS EMPTY! 😢</p>
          </div>
        ) : (
          <>
            <div
              className="p-2 overflow-y-auto"
              style={{
                maxHeight: '50vh',
                backgroundColor: rainbowMode ? 'var(--terrible-color)' : 'lightyellow',
                scrollbarWidth: 'thick'
              }}
            >
              {cart.map((item, index) => (
                <div
                  key={item.product.id}
                  className="flex items-center p-2 mb-2"
                  style={{
                    backgroundColor: index % 2 ? 'rgba(255,255,0,0.3)' : 'rgba(0,255,255,0.3)',
                    border: '2px dotted purple',
                    borderRadius: '10px'
                  }}
                >
                  <div
                    className="w-12 h-12 mr-3 overflow-hidden flex-shrink-0"
                    style={{ border: '3px ridge gold' }}
                  >
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-bold" style={{ color: 'darkblue' }}>
                      {item.product.name.toUpperCase()}
                    </h3>
                    <p className="text-sm" style={{ color: 'darkred' }}>
                      {item.product.price.toLocaleString("ru-RU")} ₽
                    </p>
                  </div>

                  <button
                    onClick={() => alert("ARE YOU SURE???")}
                    className="p-1 bg-red-500 rounded-full"
                  >
                    <X size={16} color="white" />
                  </button>
                </div>
              ))}
            </div>

            <div
              className="p-3"
              style={{
                backgroundColor: 'black',
                borderTop: '3px ridge orange'
              }}
            >
              <div className="flex justify-between mb-2 text-lg" style={{ color: 'cyan' }}>
                <span>TOTAL:</span>
                <span style={{ color: 'lime' }}>
                  {total.toLocaleString("ru-RU")} ₽
                </span>
              </div>

              <div className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  id="soul"
                  className="mr-2"
                  style={{ transform: 'scale(1.3)' }}
                />
                <label htmlFor="soul" className="text-white text-sm">
                  I agree to everything
                </label>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-2 font-bold rounded-lg flex items-center justify-center gap-2"
                style={{
                  backgroundColor: rainbowMode ? 'var(--terrible-color)' : 'magenta',
                  color: 'white',
                  border: '2px double yellow',
                  animation: isProcessing ? 'shake 0.5s infinite' : 'none'
                }}
              >
                {isProcessing ? (
                  <>
                    <span>PROCESSING...</span>
                    <div className="w-4 h-4 border-2 border-white rounded-full animate-spin"></div>
                  </>
                ) : (
                  <>
                    <CreditCard size={16} />
                    <span>PAY NOW!!!</span>
                    <AlertTriangle size={16} color="yellow" />
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Floating emoji */}
      <div
        className="absolute top-1/4 right-1/4 text-2xl"
        style={{ animation: 'float 3s infinite' }}
      >
        💸
      </div>

      <style jsx global>{`
        :root {
          --terrible-color: #ff00ff;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}
