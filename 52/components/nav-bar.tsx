"use client"

import { useState } from "react"
import { ShoppingCart, Menu, X, ChevronDown, ChevronUp, Zap } from "lucide-react"

interface NavBarProps {
  onCategorySelect: (category: string | null) => void
  selectedCategory: string | null
  cartItemCount: number
  onCartClick: () => void
}

const categories = [
  { id: "frogs", name: "лягушки" },
  { id: "spain", name: "Испания" },
  { id: "mars", name: "Илон Маск" },
  { id: "earthworms", name: "Дождевые черви" },
  { id: "waffle", name: "Вафля" },
]

export default function NavBar({ onCategorySelect, selectedCategory, cartItemCount, onCartClick }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-900 via-black to-pink-900 shadow-lg z-20 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-start">
          <div className="flex items-center">
            <Zap className="text-yellow-300 animate-pulse" size={24} />
            <span className="ml-2 text-yellow-300 font-bold text-2xl" style={{ fontFamily: 'Inter, sans-serif' }}>
              БЕЗУМShop
            </span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6 justify-start">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id === selectedCategory ? null : category.id)}
                className={`px-4 py-2 rounded-md text-lg font-semibold transition-colors duration-300 ${category.id === selectedCategory
                  ? "bg-purple-700 text-white"
                  : "text-gray-300 hover:bg-purple-800 hover:text-white"}`}
              >
                {category.name.split("").map((char, index) => (
                  <span
                    key={index}
                    className={`text-${index % 2 === 0 ? "xl" : "lg"} ${index % 2 === 0 ? "text-blue-300" : "text-pink-400"}`}
                  >
                    {char}
                  </span>
                ))}
              </button>
            ))}

            <button
              onClick={onCartClick}
              className="relative px-4 py-2 rounded-md text-lg font-semibold text-gray-300 hover:bg-purple-800 hover:text-white transition-colors duration-300"
            >
              <ShoppingCart className="inline" size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={onCartClick}
              className="relative px-4 py-2 rounded-md text-lg font-semibold text-gray-300 hover:bg-purple-800 hover:text-white mr-2"
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onCategorySelect(category.id === selectedCategory ? null : category.id)
                  setMobileMenuOpen(false)
                }}
                className={`block px-3 py-2 rounded-md text-lg font-semibold w-full text-left ${
                  category.id === selectedCategory
                    ? "bg-purple-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {category.name.split("").map((char, index) => (
                  <span
                    key={index}
                    className={`text-${index % 2 === 0 ? "xl" : "lg"} ${index % 2 === 0 ? "text-blue-300" : "text-pink-400"}`}
                  >
                    {char}
                  </span>
                ))}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
