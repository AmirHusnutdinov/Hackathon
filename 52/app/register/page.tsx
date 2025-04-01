"use client"

import { useState, useEffect } from "react"
import RegistrationForm from "@/components/registration-form"
import EmailConfirmation from "@/components/email-confirmation"
import { redirect } from "next/navigation";

export default function Register() {
  const [isRegistered, setIsRegistered] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    // Сброс тёмного и светлого режима при монтировании компонента
    document.documentElement.classList.remove("ultra-dark-mode")
    document.documentElement.classList.remove("ultra-light-mode")

    // Очистка при размонтировании компонента
    return () => {
      document.documentElement.classList.remove("ultra-dark-mode")
      document.documentElement.classList.remove("ultra-light-mode")
    }
  }, [])

  const handleRegistrationSuccess = (email: string) => {
    setUserEmail(email)
    setIsRegistered(true)
    console.log("here")
  }

  return (
    <main className="min-h-screen bg-[repeating-linear-gradient(45deg,#ff00ff,#ff00ff_10px,#00ffff_10px,#00ffff_20px)] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 text-yellow-400 bg-purple-800 p-4 border-4 border-green-500 rounded-lg animate-pulse shadow-lg rainbow-text">
          Форма регистрации
        </h1>

        <div className="bg-[#ffff00] rounded-lg shadow-xl p-6 md:p-8 border-8 border-dashed border-red-600 color-flash">
          {!isRegistered ? (
            <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
          ) : (
            <EmailConfirmation email={userEmail} />
          )}
        </div>

        <p className="text-center mt-8 text-lg text-white bg-black p-2 font-bold blink">
          Пытаясь зарегистрироваться, вы подтверждаете, что полностью отказываетесь прав на свою личность
        </p>
      </div>
    </main>
  )
}
