"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PasswordStrengthMeter from "./password-strength-meter"

// Панель бесполезных кнопок с переключателем тёмного режима
const UselessButtonBar = () => {
  const toggleUltraDarkMode = () => {
    document.documentElement.classList.toggle("ultra-dark-mode")
    // Убедимся, что светлая тема выключена при включении тёмной
    if (document.documentElement.classList.contains("ultra-dark-mode")) {
      document.documentElement.classList.remove("ultra-light-mode")
    }
  }

  const toggleUltraLightMode = () => {
    document.documentElement.classList.toggle("ultra-light-mode")
    // Убедимся, что тёмная тема выключена при включении светлой
    if (document.documentElement.classList.contains("ultra-light-mode")) {
      document.documentElement.classList.remove("ultra-dark-mode")
    }
  }

  return (
    <div className="flex flex-wrap gap-2 my-4 p-3 bg-[#ff00ff] border-2 border-[#32cd32]">
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="bg-black text-white hover:bg-gray-800 text-xs font-bold"
        onClick={toggleUltraDarkMode}
      >
        Темная тема
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="bg-white text-black hover:bg-gray-200 text-xs font-bold"
        onClick={toggleUltraLightMode}
      >
        Светлая тема
      </Button>
    </div>
  )
}

// Компонент для раздражающего выбора числа
const FrustratingNumberSelector = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [currentValue, setCurrentValue] = useState(Number.parseInt(value) || 0)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentValue(Number.parseInt(value) || 0)
  }, [value])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const sensitivity = 0.5 // Сделать супер чувствительным
    const delta = (e.clientX - startX) * sensitivity
    const newValue = Math.max(0, Math.min(999, currentValue + Math.round(delta)))

    setCurrentValue(newValue)
    onChange(newValue.toString())
    setStartX(e.clientX)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener("mouseup", handleGlobalMouseUp)
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [])

  return (
    <div className="w-full">
      <div className="flex items-center mb-2">
        <span className="text-sm mr-2 bg-[#ff00ff] text-[#ffff00] p-1">Текущее значение: {currentValue}</span>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="text-xs ml-auto bg-[#32cd32] text-[#ff0000]"
          onClick={() => {
            const randomValue = Math.floor(Math.random() * 1000)
            setCurrentValue(randomValue)
            onChange(randomValue.toString())
          }}
        >
          Случайное число
        </Button>
      </div>

      <div
        ref={sliderRef}
        className="h-8 bg-gradient-to-r from-[#ff0000] via-[#00ffff] to-[#ffff00] relative rounded-md cursor-ew-resize border-2 border-[#9400d3]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          className="absolute top-0 h-full bg-[#ff00ff] opacity-50 w-4 rounded-md border border-white"
          style={{
            left: `${(currentValue / 999) * 100}%`,
            transform: "translateX(-50%)",
            cursor: "ew-resize",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
          Перетащите, чтобы выбрать любимое число
        </div>
      </div>

      <div className="flex justify-between text-xs mt-1">
        <span className="bg-[#00ffff] text-[#ff0000] p-1">0</span>
        <span className="bg-[#ffff00] text-[#9400d3] p-1">500</span>
        <span className="bg-[#ff00ff] text-[#32cd32] p-1">999</span>
      </div>

      <p className="text-xs text-[#ff0000] mt-1 bg-[#00ffff] p-1">* Точный выбор может быть затруднён специально</p>
    </div>
  )
}

// Компонент для раздражающего ввода номера телефона
const FrustratingPhoneInput = ({
  value,
  onChange,
  error,
}: {
  value: string
  onChange: (value: string) => void
  error?: string
}) => {
  const [digits, setDigits] = useState<string[]>(value ? value.split("").slice(0, 10) : Array(10).fill(""))

  useEffect(() => {
    if (value) {
      const valueDigits = value.replace(/\D/g, "").split("").slice(0, 10)
      setDigits([...valueDigits, ...Array(10 - valueDigits.length).fill("")])
    }
  }, [value])

  const updateDigit = (index: number, newValue: string) => {
    const newDigits = [...digits]
    newDigits[index] = newValue
    setDigits(newDigits)
    onChange(newDigits.join(""))
  }

  return (
    <div className="space-y-2 p-3 bg-[#ffff00] border-4 border-dotted border-[#ff00ff]">
      <div className="text-sm font-medium mb-2 bg-[#9400d3] text-[#32cd32] p-2">
        Используйте ползунки ниже, чтобы выбрать каждую цифру вашего номера телефона
      </div>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="relative"
            style={{ backgroundColor: index % 2 === 0 ? "#ff00ff" : "#00ffff", padding: "5px" }}
          >
            <div
              className="text-center mb-1 text-xs font-bold"
              style={{ color: index % 2 === 0 ? "#32cd32" : "#ff0000" }}
            >
              Цифра {index + 1}
            </div>
            <input
              type="range"
              min="0"
              max="9"
              value={digits[index] ? Number.parseInt(digits[index]) : 0}
              onChange={(e) => updateDigit(index, e.target.value)}
              className="w-full h-8 appearance-none bg-gradient-to-r from-[#ff0000] via-[#ffff00] to-[#32cd32] rounded-lg"
              style={{
                // Сделать ползунок крошечным и трудным для захвата
                WebkitAppearance: "none",
              }}
            />
            <div className="text-center mt-1 text-sm font-bold bg-[#ff8c00] text-[#00ffff] px-1 rounded border border-[#9400d3]">
              {digits[index] || "0"}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center bg-[#9400d3] p-2 rounded-md">
        <div className="text-lg font-bold text-[#ffff00]">Текущий номер: {digits.join("") || "0000000000"}</div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="text-xs bg-[#32cd32] text-[#ff00ff]"
          onClick={() => {
            const randomDigits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10).toString())
            setDigits(randomDigits)
            onChange(randomDigits.join(""))
          }}
        >
          Случайный номер
        </Button>
      </div>

      <div className="flex gap-2 mt-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="text-xs flex-1 bg-[#ff00ff] text-[#ffff00]"
          onClick={() => {
            const newDigits = digits.map((d, i) => (i < 3 ? "5" : i < 6 ? "5" : "5"))
            setDigits(newDigits)
            onChange(newDigits.join(""))
          }}
        >
          Использовать стандартный (555-555-5555)
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="text-xs flex-1 bg-[#00ffff] text-[#ff0000]"
          onClick={() => {
            setDigits(Array(10).fill(""))
            onChange("")
          }}
        >
          Очистить
        </Button>
      </div>

      {error && <p className="text-[#ff0000] text-sm mt-2 bg-[#ffff00] p-1">{error}</p>}

      <p className="text-xs text-[#ff0000] mt-2 italic bg-[#32cd32] p-1">
        * Для лучшего опыта рекомендуем использовать дисковый телефон
      </p>
    </div>
  )
}

// Функция для генерации случайных валидных данных для всех полей
const generateRandomValidData = () => {
  // Генерация случайной истории жизни
  const generateRandomLifeStory = () => {
    const intros = [
      "Я родился в маленьком городке",
      "Моя история началась в большом мегаполисе",
      "С самого детства я мечтал о приключениях",
      "Никогда не думал, что буду заполнять эту форму, но вот моя история",
    ]

    const middles = [
      "Учился в обычной школе, где проявил интерес к наукам",
      "Много путешествовал и видел разные страны и культуры",
      "Работал в различных сферах, от IT до сельского хозяйства",
      "Всегда стремился к саморазвитию и новым знаниям",
    ]

    const endings = [
      "Сейчас я занимаюсь тем, что мне действительно нравится",
      "В будущем планирую открыть собственный бизнес",
      "Моя главная цель - сделать мир лучше",
      "И вот я здесь, заполняю эту нелепую форму регистрации",
    ]

    const fillers = [
      "Это было непростое время, но я справился",
      "Каждый день приносил новые вызовы и возможности",
      "Я встречал удивительных людей на своем пути",
      "Жизнь полна сюрпризов, и это прекрасно",
      "Никогда не знаешь, что ждет за следующим поворотом",
      "Важно оставаться верным себе и своим принципам",
      "Я благодарен всем, кто был рядом в трудные моменты",
      "Опыт научил меня ценить каждый момент жизни",
      "Иногда приходилось начинать все с нуля",
      "Преодоление трудностей сделало меня сильнее",
    ]

    const intro = intros[Math.floor(Math.random() * intros.length)]
    const middle = middles[Math.floor(Math.random() * middles.length)]
    const ending = endings[Math.floor(Math.random() * endings.length)]

    // Добавим случайные наполнители, чтобы сделать историю длиннее
    let story = `${intro}. ${middle}. `

    // Добавим 8-10 случайных предложений-наполнителей, чтобы сделать историю достаточно длинной
    const fillerCount = 8 + Math.floor(Math.random() * 3)
    const usedFillers = new Set()

    for (let i = 0; i < fillerCount; i++) {
      let fillerIndex
      do {
        fillerIndex = Math.floor(Math.random() * fillers.length)
      } while (usedFillers.has(fillerIndex))

      usedFillers.add(fillerIndex)
      story += fillers[fillerIndex] + ". "
    }

    story += ending + "."
    return story
  }
  // Генерация случайных частей имени
  const firstNames = ["Алексей", "Мария", "Иван", "Екатерина", "Дмитрий", "Анна", "Сергей", "Ольга", "Михаил", "Елена"]
  const middleNames = [
    "Александрович",
    "Ивановна",
    "Петрович",
    "Сергеевна",
    "Андреевич",
    "Дмитриевна",
    "Николаевич",
    "Михайловна",
  ]
  const lastNames = [
    "Смирнов",
    "Иванова",
    "Кузнецов",
    "Петрова",
    "Соколов",
    "Новикова",
    "Морозов",
    "Волкова",
    "Лебедев",
    "Козлова",
  ]

  const email = `elonmusk@gmail.com`

  // Генерация валидного пароля со всеми требованиями
  const generateValidPassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const specialChars = "!@#$%^&*()_-+=<>?"
    const emojis = ["😀", "😎", "🔥", "👍", "🚀", "💯", "🎉", "⭐", "💪", "🌈"]

    // Убедимся, что у нас есть хотя бы один символ каждого требуемого типа
    let password = ""
    password += uppercase[Math.floor(Math.random() * uppercase.length)]
    password += lowercase[Math.floor(Math.random() * lowercase.length)]
    password += numbers[Math.floor(Math.random() * numbers.length)]
    password += specialChars[Math.floor(Math.random() * specialChars.length)]
    password += emojis[Math.floor(Math.random() * emojis.length)]

    // Добавим ещё случайных символов, чтобы достичь длины простого числа
    const primeNumbers = [13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
    const targetLength = primeNumbers[Math.floor(Math.random() * primeNumbers.length)]

    const allChars = uppercase + lowercase + numbers + specialChars
    while (password.length < targetLength - 1) {
      password += allChars[Math.floor(Math.random() * allChars.length)]
    }

    // Добавим ещё один эмодзи, чтобы сделать пароль ещё более абсурдным
    password += emojis[Math.floor(Math.random() * emojis.length)]

    return password
  }

  const password = generateValidPassword()

  // Генерация случайного номера телефона
  const generateRandomPhoneNumber = () => {
    let phoneNumber = ""
    for (let i = 0; i < 10; i++) {
      phoneNumber += Math.floor(Math.random() * 10).toString()
    }
    return phoneNumber
  }

  // Генерация случайной даты рождения (18-80 лет)
  const generateRandomBirthdate = () => {
    const now = new Date()
    const minAge = 18
    const maxAge = 80
    const minYear = now.getFullYear() - maxAge
    const maxYear = now.getFullYear() - minAge
    const year = minYear + Math.floor(Math.random() * (maxYear - minYear))
    const month = Math.floor(Math.random() * 12) + 1
    const day = Math.floor(Math.random() * 28) + 1 // Избегаем недействительных дат, используя максимум 28 дней
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
  }

  // Генерация случайного любимого числа
  const securityQuestions = [
    "Какое название у планеты в третьей звездной системе от края галактики?",
    "Сколько песчинок было на пляже, где вы отдыхали в 7 лет?",
    "Какой цвет был у носков вашего соседа во вторник 15 мая 2012 года?",
    "Назовите точное количество волос на голове вашего первого учителя",
    "Какую песню напевала ваша бабушка, когда готовила борщ в 1998 году?",
  ]

  const securityAnswers = ["Никто не знает", "42", "Синий, но это неточно", "Примерно 127,342", "Что-то из Битлз"]

  const securityQuestionIndex = Math.floor(Math.random() * securityQuestions.length)

  // Генерация случайного знака зодиака
  const zodiacSigns = [
    "aries",
    "taurus",
    "gemini",
    "cancer",
    "leo",
    "virgo",
    "libra",
    "scorpio",
    "sagittarius",
    "capricorn",
    "aquarius",
    "pisces",
  ]
  const randomZodiacSign = zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)]

  // Генерация случайной частоты рассылки
  const newsletterFrequencies = ["hourly", "daily", "weekly", "never"]
  const randomNewsletterFrequency = newsletterFrequencies[Math.floor(Math.random() * newsletterFrequencies.length)]

  // Генерация случайного номера карты (16 цифр, начинающихся с 4 или 5)
  const generateRandomCardNumber = () => {
    const firstDigit = Math.random() > 0.5 ? "4" : "5" // Visa или MasterCard
    let cardNumber = firstDigit
    for (let i = 0; i < 15; i++) {
      cardNumber += Math.floor(Math.random() * 10).toString()
    }
    return cardNumber
  }

  // Генерация случай��ого срока действия (будущая дата)
  const generateRandomCardExpiry = () => {
    const now = new Date()
    const currentMonth = now.getMonth() + 1
    const currentYear = now.getFullYear() % 100

    // Срок от 1 до 5 лет в будущем
    const yearOffset = Math.floor(Math.random() * 5) + 1
    const expiryYear = (currentYear + yearOffset) % 100
    const expiryMonth = Math.floor(Math.random() * 12) + 1

    return `${expiryMonth.toString().padStart(2, "0")}/${expiryYear.toString().padStart(2, "0")}`
  }

  // Генерация случайного CVC (  "0")}/${expiryYear.toString().padStart(2, "0")}`
  // Генерация случайного CVC (3 цифры)
  const generateRandomCVC = () => {
    return (Math.floor(Math.random() * 900) + 100).toString()
  }

  const favoriteNumber = Math.floor(Math.random() * 999).toString()

  return {
    // Существующие поля...
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    middleName: middleNames[Math.floor(Math.random() * middleNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    email: email,
    confirmEmail: email,
    password: password,
    confirmPassword: password,
    phoneNumber: generateRandomPhoneNumber(),
    birthdate: generateRandomBirthdate(),
    favoriteColor: ["Красный", "Синий", "Зеленый", "Желтый", "Фиолетовый", "Оранжевый"][Math.floor(Math.random() * 6)],
    petName: ["Барсик", "Шарик", "Мурка", "Рекс", "Пушок", "Тузик"][Math.floor(Math.random() * 6)],
    mothersMaidenName: lastNames[Math.floor(Math.random() * lastNames.length)] + "а",
    firstSchool: [
      "Школа №" + (Math.floor(Math.random() * 100) + 1),
      "Гимназия №" + (Math.floor(Math.random() * 20) + 1),
      "Лицей №" + (Math.floor(Math.random() * 10) + 1),
    ][Math.floor(Math.random() * 3)],
    favoriteFood: ["Пицца", "Суши", "Борщ", "Паста", "Стейк", "Салат"][Math.floor(Math.random() * 6)],
    dreamJob: ["Программист", "Дизайнер", "Врач", "Космонавт", "Писатель", "Путешественник"][
      Math.floor(Math.random() * 6)
    ],
    lifeStory: generateRandomLifeStory(),
    securityQuestion: securityQuestions[securityQuestionIndex],
    securityAnswer: securityAnswers[securityQuestionIndex],
    favoriteNumber: favoriteNumber,
    shoeSize: (Math.floor(Math.random() * 15) + 35).toString(),
    zodiacSign: randomZodiacSign,
    // Новые поля для данных карты
    cardNumber: generateRandomCardNumber(),
    cardExpiry: generateRandomCardExpiry(),
    cardCVC: generateRandomCVC(),
    cardHolder: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    acceptTerms: true,
    marketingEmails: Math.random() > 0.5,
    thirdPartyEmails: Math.random() > 0.5,
    newsletterFrequency: randomNewsletterFrequency,
  }
}

interface RegistrationFormProps {
  onRegistrationSuccess: (email: string) => void
}

export default function RegistrationForm({ onRegistrationSuccess }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    birthdate: "",
    favoriteColor: "",
    petName: "",
    mothersMaidenName: "",
    firstSchool: "",
    favoriteFood: "",
    dreamJob: "",
    lifeStory: "",
    securityQuestion: "",
    securityAnswer: "",
    favoriteNumber: "",
    shoeSize: "",
    zodiacSign: "",
    // Новые поля для данных карты
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    cardHolder: "",
    acceptTerms: false,
    marketingEmails: false,
    thirdPartyEmails: false,
    newsletterFrequency: "daily",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Очистка ошибки при вводе
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }

    // Обновление силы пароля
    if (name === "password") {
      calculatePasswordStrength(value)
    }
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const calculatePasswordStrength = (password: string) => {
    let strength = 0

    // Проверка длины
    if (password.length >= 12) strength += 1

    // Проверка на заглавные буквы
    if (/[A-Z]/.test(password)) strength += 1

    // Проверка на строчные буквы
    if (/[a-z]/.test(password)) strength += 1

    // Проверка на цифры
    if (/[0-9]/.test(password)) strength += 1

    // Проверка на специальные символы
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    // Проверка на эмодзи (абсурдное требование)
    if (/[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(password)) strength += 1

    // Проверка на длину простого числа (абсурдное требование)
    const primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
    if (primeNumbers.includes(password.length)) strength += 1

    // Проверка на палиндром (абсурдное требование)
    const isPalindrome = password === password.split("").reverse().join("")
    if (isPalindrome) strength += 1

    setPasswordStrength(Math.min(strength, 8))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Обязательные поля
    if (!formData.firstName) newErrors.firstName = "Пожалуйста, введите ваше имя. Нам нужно обращаться к вам правильно!"
    if (!formData.lastName)
      newErrors.lastName = "Фамилия обязательна. Как иначе мы будем сортировать пользователей по алфавиту?"
    if (!formData.email) newErrors.email = "Email обязателен. Обещаем отправлять вам только 37 рассылок в день!"
    if (!formData.password) newErrors.password = "Пароль обязателен. Сделайте его максимально сложным!"
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Пожалуйста, подтвердите ваш невозможно-запоминаемый пароль"
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Номер телефона обязателен. Мы никогда не будем звонить, обещаем!"
    if (!formData.birthdate)
      newErrors.birthdate = "Дата рождения обязательна. Нам нужно отправлять вам спам в день рождения!"
    if (!formData.lifeStory)
      newErrors.lifeStory = "Пожалуйста, расскажите историю вашей жизни. Нам действительно интересно (или нет)!"
    if (!formData.acceptTerms)
      newErrors.acceptTerms = "Вы должны принять наши смехотворно длинные условия, которые никто не читает!"

    // Новые проверки для полей карты
    if (!formData.cardNumber) {
      newErrors.cardNumber = "Номер карты обязателен. Как иначе мы спишем с вас деньги?"
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Номер карты должен содержать 16 цифр. Мы не принимаем карты из будущего!"
    }

    if (!formData.cardExpiry) {
      newErrors.cardExpiry = "Срок действия карты обязателен. Мы должны знать, когда она перестанет работать!"
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
      newErrors.cardExpiry = "Срок действия должен быть в формате ММ/ГГ. Не пытайтесь нас запутать!"
    }

    if (!formData.cardCVC) {
      newErrors.cardCVC = "CVC код обязателен. Это те секретные цифры на обратной стороне карты!"
    } else if (!/^\d{3,4}$/.test(formData.cardCVC)) {
      newErrors.cardCVC = "CVC код должен содержать 3 или 4 цифры. Не больше и не меньше!"
    }

    if (!formData.cardHolder) {
      newErrors.cardHolder = "Имя владельца карты обязательно. Мы должны знать, кого благодарить за деньги!"
    }

    // Проверка email
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Пожалуйста, введите действительный email. Иначе мы не сможем отправлять вам спам!"
    }

    // Подтверждение email
    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Email не совпадают. Вы забыли, что набрали 5 секунд назад?"
    }

    // Проверка пароля
    if (formData.password) {
      if (formData.password.length < 12) {
        newErrors.password = "Пароль должен содержать не менее 12 символов. Безопасность или что-то такое!"
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = "Пароль должен содержать хотя бы одну заглавную букву. ВОТ ТАК!"
      } else if (!/[a-z]/.test(formData.password)) {
        newErrors.password = "Пароль должен содержать хотя бы одну строчную букву. вот так!"
      } else if (!/[0-9]/.test(formData.password)) {
        newErrors.password = "Пароль должен содержать хотя бы одну цифру. 1234567890, выберите какие-нибудь!"
      } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
        newErrors.password = "Пароль должен содержать хотя бы один специальный символ. %$#@! - хорошие варианты!"
      } else if (!/[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(formData.password)) {
        newErrors.password =
          "Пароль должен содержать хотя бы один эмодзи. Потому что эксперты по безопасности рекомендуют 😂!"
      }
    }

    // Подтверждение пароля
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают. Вы уже забыли свой невозможный пароль?"
    }

    // Проверка номера телефона
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber =
        "Пожалуйста, введите действительный 10-значный номер телефона. Без кода страны, потому что мы предполагаем, что все из нашей страны!"
    }

    // Проверка любимого числа
    if (formData.favoriteNumber && !/^\d+$/.test(formData.favoriteNumber)) {
      newErrors.favoriteNumber = "Ваше любимое число должно быть числом. Шокирующе, правда?"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Имитация API-запроса
      setTimeout(async () => {
        // Сохраняем данные пользователя в файл
        try {
          const { saveUserToFile } = await import("@/app/actions/user-actions")
          const result = await saveUserToFile(formData.email, formData.password)

          if (result.success) {
            console.log("Пользователь сохранен в файл users.txt")
          } else {
            console.error("Ошибка при сохранении пользователя:", result.message)
          }
        } catch (error) {
          console.error("Ошибка при сохранении пользователя:", error)
        }

        setIsSubmitting(false)
        onRegistrationSuccess(formData.email)
      }, 2000)
    } else {
      // Прокрутка к первой ошибке
      const firstErrorField = Object.keys(errors)[0]
      const element = document.querySelector(`[name="${firstErrorField}"]`)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <UselessButtonBar />
      <div className="p-4 bg-[#ff00ff] border-8 border-double border-[#ffff00] animate-pulse">
        <Button
          type="button"
          className="w-full py-6 text-xl font-extrabold bg-gradient-to-r from-[#32cd32] via-[#ff0000] to-[#00ffff] hover:from-[#ff00ff] hover:to-[#ffff00] border-4 border-[#9400d3] shadow-lg"
          style={{ color: "#ffff00", textShadow: "2px 2px 0 #ff0000, -2px -2px 0 #00ffff" }}
          onClick={() => {
            const randomData = generateRandomValidData()
            setFormData(randomData)
            calculatePasswordStrength(randomData.password)

            // Показать сообщение об успехе
            alert(
              "Форма магически заполнена! Все поля содержат корректные данные. Пароль соответствует всем требованиям!",
            )
          }}
        >
          🎲 МАГИЧЕСКИ ЗАПОЛНИТЬ ВСЕ ПОЛЯ 🎲
        </Button>
      </div>
      <div>
        <Label htmlFor="firstName">Имя</Label>
        <Input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Введите ваше имя"
        />
        {errors.firstName && <p className="text-[#ff0000] text-sm mt-1">{errors.firstName}</p>}
      </div>
      <div>
        <Label htmlFor="middleName">Отчество</Label>
        <Input
          type="text"
          id="middleName"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          placeholder="Введите ваше отчество"
        />
      </div>
      <div>
        <Label htmlFor="lastName">Фамилия</Label>
        <Input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Введите вашу фамилию"
        />
        {errors.lastName && <p className="text-[#ff0000] text-sm mt-1">{errors.lastName}</p>}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Введите ваш email"
        />
        {errors.email && <p className="text-[#ff0000] text-sm mt-1">{errors.email}</p>}
      </div>
      <div>
        <Label htmlFor="confirmEmail">Подтвердите Email</Label>
        <Input
          type="email"
          id="confirmEmail"
          name="confirmEmail"
          value={formData.confirmEmail}
          onChange={handleChange}
          placeholder="Подтвердите ваш email"
        />
        {errors.confirmEmail && <p className="text-[#ff0000] text-sm mt-1">{errors.confirmEmail}</p>}
      </div>
      <div>
        <Label htmlFor="password">Пароль</Label>
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Введите ваш пароль"
        />
        <PasswordStrengthMeter strength={passwordStrength} />
        {errors.password && <p className="text-[#ff0000] text-sm mt-1">{errors.password}</p>}
      </div>
      <div>
        <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Подтвердите ваш пароль"
        />
        {errors.confirmPassword && <p className="text-[#ff0000] text-sm mt-1">{errors.confirmPassword}</p>}
      </div>
      <div>
        <Label htmlFor="phoneNumber">Номер телефона</Label>
        <FrustratingPhoneInput
          value={formData.phoneNumber}
          onChange={(value) => setFormData((prev) => ({ ...prev, phoneNumber: value }))}
          error={errors.phoneNumber}
        />
      </div>
      <div>
        <Label htmlFor="birthdate">Дата рождения</Label>
        <Input type="date" id="birthdate" name="birthdate" value={formData.birthdate} onChange={handleChange} />
        {errors.birthdate && <p className="text-[#ff0000] text-sm mt-1">{errors.birthdate}</p>}
      </div>
      <div>
        <Label htmlFor="favoriteColor">Любимый цвет</Label>
        <Select onValueChange={(value) => handleSelectChange("favoriteColor", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Выберите цвет" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Красный">Красный</SelectItem>
            <SelectItem value="Синий">Синий</SelectItem>
            <SelectItem value="Зеленый">Зеленый</SelectItem>
            <SelectItem value="Желтый">Желтый</SelectItem>
            <SelectItem value="Фиолетовый">Фиолетовый</SelectItem>
            <SelectItem value="Оранжевый">Оранжевый</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="petName">Имя питомца</Label>
        <Input
          type="text"
          id="petName"
          name="petName"
          value={formData.petName}
          onChange={handleChange}
          placeholder="Введите имя вашего питомца"
        />
      </div>
      <div>
        <Label htmlFor="mothersMaidenName">Девичья фамилия матери</Label>
        <Input
          type="text"
          id="mothersMaidenName"
          name="mothersMaidenName"
          value={formData.mothersMaidenName}
          onChange={handleChange}
          placeholder="Введите девичью фамилию вашей матери"
        />
      </div>
      <div>
        <Label htmlFor="firstSchool">Первая школа</Label>
        <Input
          type="text"
          id="firstSchool"
          name="firstSchool"
          value={formData.firstSchool}
          onChange={handleChange}
          placeholder="Введите название вашей первой школы"
        />
      </div>
      <div>
        <Label htmlFor="favoriteFood">Любимая еда</Label>
        <Input
          type="text"
          id="favoriteFood"
          name="favoriteFood"
          value={formData.favoriteFood}
          onChange={handleChange}
          placeholder="Введите вашу любимую еду"
        />
      </div>
      <div>
        <Label htmlFor="dreamJob">Работа мечты</Label>
        <Input
          type="text"
          id="dreamJob"
          name="dreamJob"
          value={formData.dreamJob}
          onChange={handleChange}
          placeholder="Введите вашу работу мечты"
        />
      </div>
      <div>
        <Label htmlFor="zodiacSign">Знак зодиака</Label>
        <Select onValueChange={(value) => handleSelectChange("zodiacSign", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Выберите знак зодиака" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="aries">Овен</SelectItem>
            <SelectItem value="taurus">Телец</SelectItem>
            <SelectItem value="gemini">Близнецы</SelectItem>
            <SelectItem value="cancer">Рак</SelectItem>
            <SelectItem value="leo">Лев</SelectItem>
            <SelectItem value="virgo">Дева</SelectItem>
            <SelectItem value="libra">Весы</SelectItem>
            <SelectItem value="scorpio">Скорпион</SelectItem>
            <SelectItem value="sagittarius">Стрелец</SelectItem>
            <SelectItem value="capricorn">Козерог</SelectItem>
            <SelectItem value="aquarius">Водолей</SelectItem>
            <SelectItem value="pisces">Рыбы</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4 pt-4 border-t-8 border-dotted border-[#ff0000] p-3 bg-[#00ffff] md:col-span-2">
        <h3 className="text-xl font-semibold text-[#ff00ff] bg-[#ffff00] p-2 text-center">
          Данные банковской карты <span className="text-[#ff0000] text-2xl animate-pulse">*</span>
        </h3>
        <p className="text-sm text-[#9400d3] bg-[#32cd32] p-2 mb-4">
          Мы обещаем хранить ваши данные в самом надёжном месте - на стикере на мониторе нашего бухгалтера!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 p-3 bg-[#ff00ff]">
            <Label htmlFor="cardNumber" className="text-lg font-bold text-[#00ffff] uppercase">
              Номер карты <span className="text-[#ffff00] text-2xl animate-pulse">*</span>
            </Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className={errors.cardNumber ? "border-[#ff0000]" : ""}
              style={{ backgroundColor: "#32cd32", color: "#ff0000" }}
            />
            {errors.cardNumber && <p className="text-[#ffff00] text-sm bg-[#9400d3] p-1">{errors.cardNumber}</p>}
          </div>

          <div className="space-y-2 p-3 bg-[#00ffff]">
            <Label htmlFor="cardHolder" className="text-lg text-[#ff0000]">
              Имя владельца <span className="text-[#9400d3]">*</span>
            </Label>
            <Input
              id="cardHolder"
              name="cardHolder"
              value={formData.cardHolder}
              onChange={handleChange}
              placeholder="IVAN IVANOV"
              className={errors.cardHolder ? "border-[#ff0000]" : ""}
              style={{ backgroundColor: "#ff8c00", color: "#00ffff" }}
            />
            {errors.cardHolder && <p className="text-[#32cd32] text-sm bg-[#ff00ff] p-1">{errors.cardHolder}</p>}
          </div>

          <div className="space-y-2 p-3 bg-[#ffff00]">
            <Label htmlFor="cardExpiry" className="text-lg text-[#9400d3]">
              Срок действия <span className="text-[#ff0000]">*</span>
            </Label>
            <Input
              id="cardExpiry"
              name="cardExpiry"
              value={formData.cardExpiry}
              onChange={handleChange}
              placeholder="ММ/ГГ"
              maxLength={5}
              className={errors.cardExpiry ? "border-[#ff0000]" : ""}
              style={{ backgroundColor: "#ff00ff", color: "#32cd32" }}
            />
            {errors.cardExpiry && <p className="text-[#00ffff] text-sm bg-[#ff0000] p-1">{errors.cardExpiry}</p>}
          </div>

          <div className="space-y-2 p-3 bg-[#9400d3]">
            <Label htmlFor="cardCVC" className="text-lg text-[#ffff00]">
              CVC/CVV <span className="text-[#32cd32]">*</span>
            </Label>
            <Input
              id="cardCVC"
              name="cardCVC"
              value={formData.cardCVC}
              onChange={handleChange}
              placeholder="123"
              maxLength={4}
              className={errors.cardCVC ? "border-[#ff0000]" : ""}
              style={{ backgroundColor: "#ff0000", color: "#00ffff" }}
            />
            {errors.cardCVC && <p className="text-[#32cd32] text-sm bg-[#ff00ff] p-1">{errors.cardCVC}</p>}
            <p className="text-xs text-[#ffff00] mt-1 bg-[#ff00ff] p-1 italic">
              * Это те три цифры на обратной стороне карты, которые никому нельзя сообщать
            </p>
          </div>
        </div>

        <div className="mt-4 p-2 bg-[#ff0000] border border-dashed border-[#ffff00] text-center">
          <p className="text-xs text-[#00ffff] font-bold bg-[#9400d3] p-1">
            Не беспокойтесь! Мы используем самую современную защиту - наш сервер находится под столом и накрыт
            скатертью!
          </p>
        </div>
      </div>
      <div>
        <Label htmlFor="lifeStory">История жизни</Label>
        <Textarea
          id="lifeStory"
          name="lifeStory"
          value={formData.lifeStory}
          onChange={handleChange}
          placeholder="Расскажите свою историю жизни"
        />
        {errors.lifeStory && <p className="text-[#ff0000] text-sm mt-1">{errors.lifeStory}</p>}
      </div>
      <div>
        <Label htmlFor="securityQuestion">Секретный вопрос</Label>
        <Input
          type="text"
          id="securityQuestion"
          name="securityQuestion"
          value={formData.securityQuestion}
          onChange={handleChange}
          placeholder="Введите ваш секретный вопрос"
        />
      </div>
      <div>
        <Label htmlFor="securityAnswer">Секретный ответ</Label>
        <Input
          type="text"
          id="securityAnswer"
          name="securityAnswer"
          value={formData.securityAnswer}
          onChange={handleChange}
          placeholder="Введите ваш секретный ответ"
        />
      </div>
      <div>
        <Label htmlFor="favoriteNumber">Любимое число</Label>
        <FrustratingNumberSelector
          value={formData.favoriteNumber}
          onChange={(value) => setFormData((prev) => ({ ...prev, favoriteNumber: value }))}
        />
        {errors.favoriteNumber && <p className="text-[#ff0000] text-sm mt-1">{errors.favoriteNumber}</p>}
      </div>
      <div>
        <Label htmlFor="shoeSize">Размер обуви</Label>
        <Input
          type="number"
          id="shoeSize"
          name="shoeSize"
          value={formData.shoeSize}
          onChange={handleChange}
          placeholder="Введите ваш размер обуви"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="acceptTerms"
          name="acceptTerms"
          checked={formData.acceptTerms}
          onCheckedChange={(checked) => handleCheckboxChange("acceptTerms", !!checked)}
        />
        <Label htmlFor="acceptTerms">Я принимаю условия</Label>
        {errors.acceptTerms && <p className="text-[#ff0000] text-sm mt-1">{errors.acceptTerms}</p>}
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="marketingEmails"
          name="marketingEmails"
          checked={formData.marketingEmails}
          onCheckedChange={(checked) => handleCheckboxChange("marketingEmails", !!checked)}
        />
        <Label htmlFor="marketingEmails">Я хочу получать маркетинговые письма</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="thirdPartyEmails"
          name="thirdPartyEmails"
          checked={formData.thirdPartyEmails}
          onCheckedChange={(checked) => handleCheckboxChange("thirdPartyEmails", !!checked)}
        />
        <Label htmlFor="thirdPartyEmails">Я хочу получать письма от третьих лиц</Label>
      </div>
      <div>
        <Label htmlFor="newsletterFrequency">Частота рассылки</Label>
        <RadioGroup
          defaultValue={formData.newsletterFrequency}
          onValueChange={(value) => handleSelectChange("newsletterFrequency", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hourly" id="newsletter-hourly" />
            <Label htmlFor="newsletter-hourly">Каждый час</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="daily" id="newsletter-daily" />
            <Label htmlFor="newsletter-daily">Каждый день</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekly" id="newsletter-weekly" />
            <Label htmlFor="newsletter-weekly">Каждую неделю</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="never" id="newsletter-never" />
            <Label htmlFor="newsletter-never">Никогда</Label>
          </div>
        </RadioGroup>
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            Регистрация
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          </>
        ) : (
          "Зарегистрироваться"
        )}
      </Button>
    </form>
  )
}
