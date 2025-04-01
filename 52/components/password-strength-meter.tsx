interface PasswordStrengthMeterProps {
  strength: number
}

export default function PasswordStrengthMeter({ strength }: PasswordStrengthMeterProps) {
  const getLabel = () => {
    if (strength === 0) return "Отсутствует"
    if (strength <= 2) return "Слабый"
    if (strength <= 4) return "Средний"
    if (strength <= 6) return "Сильный"
    return "Абсурдно сложный"
  }

  const getColor = () => {
    if (strength === 0) return "bg-gray-200"
    if (strength <= 2) return "bg-red-500"
    if (strength <= 4) return "bg-orange-500"
    if (strength <= 6) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getWidth = () => {
    return `${(strength / 8) * 100}%`
  }

  // Генерация случайных цветов для каждого сегмента
  const segments = Array.from({ length: 8 }, (_, i) => {
    const hue = Math.floor(Math.random() * 360)
    return {
      width: `${100 / 8}%`,
      backgroundColor: `hsl(${hue}, 70%, 50%)`,
      height: "100%",
      display: "inline-block",
      opacity: i < strength ? 1 : 0.3,
    }
  })

  return (
    <div className="space-y-1">
      <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden border-2 border-purple-500">
        {segments.map((style, index) => (
          <div key={index} style={style} className="transition-all duration-300"></div>
        ))}
      </div>
      <div className="flex justify-between text-xs">
        <span className="font-bold" style={{ color: `hsl(${strength * 30}, 70%, 50%)` }}>
          {getLabel()}
        </span>
        <span className="animate-pulse">{strength}/8</span>
      </div>
    </div>
  )
}
