"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation";

export default function ExtremelyUglyLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [forgotText, setForgotText] = useState("ЗАБЫЛИ?")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt:", { email, password })
    // Handle login logic here
    redirect("/shop"); // Redirects to `/new-page` automatically

  }

  const handleForgotClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setForgotText("Вспоминай.")
    setTimeout(() => setForgotText("ЗАБЫЛИ?"), 2000) // Возвращаем обратно через 2 секунды
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[repeating-linear-gradient(45deg,#ff00f7,#ff00f7_10px,#00ff62_10px,#00ff62_20px)]">
      <div className="w-full max-w-md rounded-lg border-[15px] border-double border-[#ff6b00] bg-[#00f7ff] p-8 shadow-[12px_12px_0_#ff0000,-12px_-12px_0_#0000ff] transform rotate-3 animate-pulse">
        <h1
          className="mb-6 text-center font-serif text-5xl font-black text-[#ff0000] transform -rotate-5 skew-x-12 animate-bounce"
          style={{ textShadow: "3px 3px 0 #00ff00, -3px -3px 0 #0000ff" }}
        >
          ВХОД В СИСТЕМУ
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="block text-2xl font-bold text-[#9c00ff] uppercase tracking-widest"
              style={{ fontFamily: "cursive" }}
            >
              ЭЛЕКТРОННАЯ ПОЧТА:
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#ffff00] border-8 border-[#ff00aa] text-xl p-4 font-mono placeholder:text-[#7700ff]"
              placeholder="ваша@почта.рф"
              style={{ transform: "skew(-5deg, 2deg)" }}
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="block text-2xl font-bold text-[#ff6600] uppercase tracking-widest"
              style={{ fontFamily: "fantasy" }}
            >
              ПАРОЛЬ:
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#a5ff00] border-8 border-[#0077ff] text-xl p-4 font-mono"
              placeholder="••••••••"
              style={{ transform: "skew(5deg, -2deg)" }}
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <Label className="cursor-pointer flex items-center">
              <Input type="checkbox" className="h-8 w-8 accent-[#ff00aa] mr-2" />
              <span className="text-[#0077ff] font-bold text-xl" style={{ fontFamily: "monospace" }}>
                ЗАПОМНИТЬ МЕНЯ
              </span>
            </Label>
            <a
              href="#"
              onClick={handleForgotClick}
              className="text-[#ff0000] font-bold text-xl underline decoration-wavy decoration-[#00ff00]"
              style={{ fontFamily: "sans-serif" }}
            >
              {forgotText}
            </a>
          </div>

          <Button
            type="submit"
            className="w-full bg-[repeating-radial-gradient(circle,#ff0000,#ffff00,#00ff00,#0000ff,#ff00ff)] text-white text-2xl p-8 rounded-full font-black tracking-wider border-8 border-[#00ffff]"
            style={{
              fontFamily: "Impact, fantasy",
              textShadow: "2px 2px 0 black",
              letterSpacing: "0.2em",
            }}
          >
            ВОЙТИ СЕЙЧАС!!!
          </Button>

          <div className="text-center mt-6">
            <a
              href="#"
              className="text-[#ff00aa] font-bold text-xl underline decoration-double"
              style={{ fontFamily: "Comic Sans MS, cursive" }}
            >
              СОЗДАТЬ НОВЫЙ АККАУНТ
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
