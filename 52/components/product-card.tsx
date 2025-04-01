"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface ProductCardProps {
  product: {
    id: number
    name: string
    description: string
    price: number
    image: string
    category: string
  }
  onAddToCart: () => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [liked, setLiked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)

    if (Math.random() < 0.3) {
      alert("Упс! Что-то пошло не так. Попробуйте еще раз!")
    } else {
      onAddToCart()
      setIsModalOpen(false) // Close modal on add to cart
    }
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    setLiked(!liked)
    if (Math.random() < 0.4) {
      alert(
        `Вы ${liked ? "убрали из избранного" : "добавили в избранное"} товар "${product.name}"! Ваши предпочтения записаны в нашу базу данных!`,
      )
    }
  }

  return (
    <>
      <div
        className={`relative bg-gray-900 border border-gray-800 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
          isShaking ? "animate-[shake_0.5s_ease-in-out]" : ""
        }`}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-48 w-full">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-1 truncate">{product.name}</h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-green-400">{product.price.toLocaleString("ru-RU")} ₽</div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-black/80"> {/* Make the background slightly solid */}
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>{product.description}</DialogDescription>
          </DialogHeader>

          <div className="relative w-full h-60">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover rounded-lg" />
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-1">Характеристики:</h4>
            <ul className="text-xs text-gray-500 space-y-1">
              <li>• Производитель: Неизвестен</li>
              <li>• Гарантия: Отсутствует</li>
              <li>• Качество: {Math.random() < 0.5 ? "Высокое" : "Среднее"}</li>
              <li>
                • Доставка: {Math.floor(Math.random() * 10) + 1}-{Math.floor(Math.random() * 20) + 10} дней
              </li>
            </ul>
          </div>

          <div className="text-xl font-bold text-green-400 mb-3">{product.price.toLocaleString("ru-RU")} ₽</div>

          <div className="flex justify-between gap-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-lg flex-1 ${liked ? "bg-red-600" : "bg-gray-800"} text-white hover:bg-red-700 transition-colors flex items-center justify-center gap-2`}
            >
              <Heart size={16} fill={liked ? "white" : "none"} />
              {liked ? "В избранном" : "Добавить в избранное"}
            </button>

            <button
              onClick={handleAddToCart}
              className="p-2 rounded-lg flex-1 bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} />
              Добавить в корзину
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
