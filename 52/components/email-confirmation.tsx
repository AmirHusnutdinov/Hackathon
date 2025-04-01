"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect } from "next/navigation";

import { Loader2, CheckCircle, XCircle, FileText, Unlock } from "lucide-react"

interface EmailConfirmationProps {
  email: string
}

export default function EmailConfirmation({ email }: EmailConfirmationProps) {
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(300) // 5 минут в секундах
  const [attempts, setAttempts] = useState(0)
  const [showUserSavedMessage, setShowUserSavedMessage] = useState(true)
  const [isBruteForcing, setIsBruteForcing] = useState(false)
  const [bruteForceProgress, setBruteForceProgress] = useState(0)
  const [currentBruteForceCode, setCurrentBruteForceCode] = useState("000000")

  useEffect(() => {
    if (timeLeft > 0 && !isVerified) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, isVerified])

  useEffect(() => {
    // Скрываем сообщение о сохранении через 5 секунд
    if (showUserSavedMessage) {
      const timer = setTimeout(() => setShowUserSavedMessage(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showUserSavedMessage])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleVerify = () => {
    setIsVerifying(true)
    setError("")

    // Имитация процесса проверки
    setTimeout(() => {
      setIsVerifying(false)
      setAttempts(attempts + 1)

      if (verificationCode === "525252") {
        setIsVerified(true)
      } else {
        // Разные сообщения об ошибке в зависимости от количества попыток
        if (attempts === 0) {
          setError("Неверный код! Вы вообще проверяли свою почту?")
        } else if (attempts === 1) {
          setError("Всё ещё неверно!")
        } else if (attempts === 2) {
          setError("Серьёзно?")
        } else {
          setError(`Попытка ${attempts + 1}: НЕВЕРНО.`)
        }
      }
    }, 1500)
  }

  const handleResendCode = () => {
    setTimeLeft(300)
    // Имитация повторной отправки кода
    alert("Мы сделали вид, что отправили новый код подтверждения на вашу почту.")
  }
  const handleLoginPage = () => {
    setTimeLeft(300)
    redirect("/login"); // Redirects to `/new-page` automatically

    // Имитация повторной отправки кода
    alert("Мы сделали вид, что отправили новый код подтверждения на вашу почту.")
  }
  const startBruteForce = () => {
    setIsBruteForcing(true)
    setBruteForceProgress(0)
    setCurrentBruteForceCode("000000")

    const totalAttempts = 1000000 // 1 млн возможных комбинаций
    const targetCode = "525252" // наш "секретный" код
    const delay = 50 // задержка между попытками в мс (для анимации)

    let attempts = 0
    let found = false

    const bruteForceInterval = setInterval(() => {
      if (found) {
        clearInterval(bruteForceInterval)
        return
      }

      attempts += 1000 // имитируем 1000 попыток за каждый шаг
      const progress = Math.min(100, (attempts / totalAttempts) * 100)
      setBruteForceProgress(progress)

      // Генерируем случайный код для отображения
      const randomCode = Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
      setCurrentBruteForceCode(randomCode)

      // Если "случайно" нашли код
      if (progress >= 85 && !found) {
        found = true
        setTimeout(() => {
          setCurrentBruteForceCode(targetCode)
          setBruteForceProgress(100)
          setIsBruteForcing(false)
          setVerificationCode(targetCode)
          setTimeout(() => {
            handleVerify()
          }, 1000)
        }, 1500)
      }

      if (attempts >= totalAttempts) {
        clearInterval(bruteForceInterval)
        setIsBruteForcing(false)
      }
    }, delay)
  }

  return (
    <div className="space-y-6 animate-fadeIn bg-gradient-to-r from-[#ff00ff] via-[#ffff00] to-[#00ffff] p-4 border-8 border-dotted border-[#ff0000]">
      {showUserSavedMessage && (
        <div className="bg-[#32cd32] border-4 border-[#ff00ff] rounded-lg p-4 text-center space-y-2 animate-fadeIn">
          <div className="flex items-center justify-center gap-2">
            <FileText className="h-6 w-6 text-[#ffff00]" />
            <h3 className="text-lg font-semibold text-[#9400d3]">Данные сохранены!</h3>
          </div>
          <p className="text-[#ff0000] bg-[#00ffff] p-2 text-sm">
            Ваши данные успешно сохранены в файл users.txt! Мы обещаем хранить их в самом надёжном месте - на
            общедоступном сервере без пароля!
          </p>
        </div>
      )}

      <div className="text-center space-y-4">
        <div className="inline-block p-4 bg-[#32cd32] rounded-full border-4 border-[#9400d3] spin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-[#ff00ff]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#ff0000] bg-[#00ffff] inline-block p-2 rotate-2">
          Подтвердите вашу почту
        </h2>
        <p className="text-[#9400d3] font-bold bg-[#ffff00] p-2">
          Мы отправили курьера с кодом по вашему адресу (не спрашивайте откуда мы его знаем). Ожидайте в течение двух
          недель
          <br />
          Пожалуйста, введите код ниже для подтверждения вашего адреса электронной почты.
        </p>
      </div>

      {isVerified ? (
        <div className="bg-[#32cd32] border border-[#ff00ff] rounded-lg p-6 text-center space-y-4">
          <CheckCircle className="h-12 w-12 text-[#ffff00] mx-auto" />
          <h3 className="text-xl font-semibold text-[#9400d3]">Почта подтверждена!</h3>
          <p className="text-[#ff0000] bg-[#00ffff] p-2">
            Поздравляем! Ваша почта подтверждена. Теперь вы можете получить доступ ко всем функциям, которыми никогда не
            воспользуетесь.
          </p>
          <Button onClick={handleLoginPage} className="bg-[#ff00ff] hover:bg-[#9400d3] text-[#ffff00]">Перейти в личный кабинет</Button>
        </div>
      ) : timeLeft === 0 ? (
        <div className="bg-[#ff0000] border border-[#00ffff] rounded-lg p-6 text-center space-y-4">
          <XCircle className="h-12 w-12 text-[#ffff00] mx-auto" />
          <h3 className="text-xl font-semibold text-[#00ffff]">Код истёк</h3>
          <p className="text-[#32cd32] bg-[#ff00ff] p-2">
            Срок действия вашего кода подтверждения истёк. Пожалуйста, запросите новый.
          </p>
          <Button onClick={handleResendCode} className="bg-[#9400d3] hover:bg-[#ffff00] text-[#00ffff]">
            Отправить код повторно
          </Button>
        </div>
      ) : (
        <div className="space-y-4 bg-[#9400d3] p-4 border-4 border-double border-[#ffff00]">
          <div className="space-y-2">
            <Label htmlFor="verificationCode" className="text-lg text-[#32cd32] bg-[#ff00ff] p-1">
              Код подтверждения
            </Label>
            <Input
              id="verificationCode"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Введите 6-значный код"
              maxLength={6}
              className={error ? "border-[#ff0000]" : ""}
              style={{ backgroundColor: "#ffff00", color: "#ff0000" }}
            />
            {error && <p className="text-[#00ffff] text-sm bg-[#ff0000] p-1">{error}</p>}
          </div>

          {isBruteForcing && (
            <div className="space-y-2 bg-[#ff0000] p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Unlock className="h-5 w-5 text-[#ffff00] animate-pulse" />
                  <span className="text-[#ffff00] font-mono">Подбираем код: {currentBruteForceCode}</span>
                </div>
                <span className="text-[#00ffff] font-bold">{Math.floor(bruteForceProgress)}%</span>
              </div>
              <div className="w-full bg-[#9400d3] rounded-full h-2.5">
                <div
                  className="bg-[#32cd32] h-2.5 rounded-full"
                  style={{ width: `${bruteForceProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-[#ffff00]">
                {bruteForceProgress < 30 && "Начинаем взлом..."}
                {bruteForceProgress >= 30 && bruteForceProgress < 70 && "Анализируем возможные комбинации..."}
                {bruteForceProgress >= 70 && bruteForceProgress < 90 && "Найдено несколько подходящих вариантов..."}
                {bruteForceProgress >= 90 && "Почти нашли! Осталось немного..."}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center bg-[#ff00ff] p-2">
            <p className="text-sm text-[#32cd32]">
              Код истекает через:{" "}
              <span className="font-semibold bg-[#00ffff] text-[#ff0000] p-1">{formatTime(timeLeft)}</span>
            </p>
            <button
              type="button"
              onClick={handleResendCode}
              className="text-sm text-[#ffff00] hover:text-[#00ffff] bg-[#9400d3] p-1"
            >
              Отправить код повторно
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleVerify}
              className="py-6 text-lg font-bold bg-gradient-to-r from-[#32cd32] to-[#ff00ff] hover:from-[#ff0000] hover:to-[#00ffff]"
              disabled={isVerifying || verificationCode.length !== 6}
              style={{ color: "#ffff00", textShadow: "2px 2px 0 #9400d3" }}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Проверка...
                </>
              ) : (
                "Подтвердить почту"
              )}
            </Button>

            <Button
              onClick={startBruteForce}
              className="py-6 text-lg font-bold bg-gradient-to-r from-[#ff0000] to-[#9400d3] hover:from-[#00ffff] hover:to-[#32cd32]"
              disabled={isBruteForcing || isVerifying}
              style={{ color: "#ffff00", textShadow: "2px 2px 0 #ff00ff" }}
            >
              {isBruteForcing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Взлом...
                </>
              ) : (
                <>
                  <Unlock className="mr-2 h-5 w-5" />
                  Брутфорс кода
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      <div className="text-center text-sm text-[#ff0000] bg-[#00ffff] p-2">
        <p>
          Не получили код? Проверьте папку спам или{" "}
          <button
            type="button"
            onClick={handleResendCode}
            className="text-[#9400d3] hover:text-[#ff00ff] bg-[#ffff00] p-1"
          >
            запросите новый
          </button>
          .
        </p>
      </div>

      <div className="mt-4 p-2 bg-[#00ffff] border border-dashed border-[#ff00ff] text-center">
        <p className="text-xs text-[#9400d3] font-bold bg-[#ffff00] p-1">
          Возникли проблемы? Попробуйте нашу премиум-услугу подтверждения всего за 9.99$/месяц!
        </p>
        <Button
          type="button"
          size="sm"
          className="mt-2 bg-[#ff00ff] hover:bg-[#9400d3] text-xs text-[#32cd32]"
          onClick={() => alert("Премиум-услуга недоступна. Но спасибо, что пытались дать нам деньги!")}
        >
          Перейти на Премиум
        </Button>
      </div>
    </div>
  )
}
