"use client"

import type React from "react"
import { AlertTriangle, Bell, Heart, Search } from "lucide-react"

import { useState, useRef, useEffect } from "react"
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, RotateCcw } from "lucide-react"
import type * as THREE from "three"

// Extend OrbitControls to be used in the scene
extend({ OrbitControls })

// Cube component that needs to be rotated
function VerificationCube({
  onRotationComplete,
  rotationThreshold,
  isComplete,
}: {
  onRotationComplete: () => void
  rotationThreshold: number
  isComplete: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [totalRotation, setTotalRotation] = useState(0)
  const [prevRotation, setPrevRotation] = useState({ x: 0, y: 0 })

  useFrame(() => {
    if (meshRef.current && !isComplete) {
      // Add some automatic animation
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.005

      // Calculate rotation delta
      const deltaX = Math.abs(meshRef.current.rotation.x - prevRotation.x)
      const deltaY = Math.abs(meshRef.current.rotation.y - prevRotation.y)
      const delta = deltaX + deltaY

      setTotalRotation((prev) => prev + delta)
      setPrevRotation({
        x: meshRef.current.rotation.x,
        y: meshRef.current.rotation.y,
      })

      // Check if rotation threshold is met
      if (totalRotation > rotationThreshold) {
        onRotationComplete()
      }
    }
  })

  // Define cube textures/materials
  const textures = [
    "#f43f5e", // Red
    "#8b5cf6", // Purple
    "#06b6d4", // Cyan
    "#fbbf24", // Yellow
    "#10b981", // Green
    "#3b82f6", // Blue
  ]

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={textures[0]} />
      <meshStandardMaterial color={textures[1]} />
      <meshStandardMaterial color={textures[2]} />
      <meshStandardMaterial color={textures[3]} />
      <meshStandardMaterial color={textures[4]} />
      <meshStandardMaterial color={textures[5]} />
    </mesh>
  )
}

function CameraController({ isComplete }: { isComplete: boolean }) {
  const { camera, gl } = useThree()
  const controlsRef = useRef<any>()

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enableDamping = true
      controlsRef.current.dampingFactor = 0.05
      controlsRef.current.rotateSpeed = isComplete ? 0.3 : 0.7
    }
  }, [isComplete])

  return <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />
}

// Random text generator for console logs
function generateRandomLog() {
  const logs = [
    "正在加载系统模块...",
    "初始化数据库连接...",
    "验证用户凭据...",
    "检查系统完整性...",
    "加载资源文件...",
    "正在分析用户行为...",
    "正在处理请求...",
    "正在执行安全检查...",
    "正在验证身份...",
    "正在加载配置文件...",
    "系统错误代码: 0x8F24A...",
    "尝试重新连接...",
    "正在扫描网络...",
    "检测到异常活动...",
    "正在重新配置系统参数...",
  ]
  return logs[Math.floor(Math.random() * logs.length)]
}

// Banner component
function FloatingBanner({ text, style }: { text: string; style: React.CSSProperties }) {
  return (
    <div className="absolute py-1 px-3 rounded-md font-bold shadow-lg whitespace-nowrap z-10 text-sm" style={style}>
      {text}
    </div>
  )
}

// Main 3D Captcha Challenge component
export default function ThreeDCaptchaChallenge() {
  const [verificationState, setVerificationState] = useState<"pending" | "in-progress" | "complete">("pending")
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])
  const [showConsole, setShowConsole] = useState(false)
  const [banners, setBanners] = useState<Array<{ id: number; text: string; style: React.CSSProperties }>>([])
  const [rotationCount, setRotationCount] = useState(0)
  const rotationThreshold = 10

  // Setup banners
  useEffect(() => {
    const chineseBannerTexts = [
      "系统警告",
      "安全验证",
      "请勿关闭",
      "数据处理中",
      "重要信息",
      "紧急通知",
      "系统升级",
      "验证失败",
      "访问受限",
      "危险操作",
      "身份确认",
      "网络错误",
      "请稍等片刻",
      "正在加载",
      "错误代码",
      "安全警报",
      "系统崩溃",
      "数据丢失",
      "未授权访问",
      "操作超时",
      "网络连接中断",
      "服务器错误",
      "请重新尝试",
      "验证码错误",
      "账户锁定",
      "密码错误",
      "非法操作",
      "系统维护中",
      "请联系管理员",
      "访问被拒绝",
      "协议过期",
      "证书无效",
      "内存溢出",
      "缓冲区错误",
      "驱动异常",
      "硬件故障",
      "权限不足",
      "防火墙拦截",
      "IP被封禁",
      "会话过期",
      "令牌失效",
      "数据校验失败",
      "加密解密错误",
      "数据库锁定",
      "磁盘空间不足",
      "进程崩溃",
      "服务未响应",
      "端口冲突",
      "配置损坏",
    ]

    const colorPairs = [
      { bg: "#ff0000", text: "#ffffff" },
      { bg: "#00ff00", text: "#000000" },
      { bg: "#0000ff", text: "#ffffff" },
      { bg: "#ffff00", text: "#000000" },
      { bg: "#ff00ff", text: "#ffffff" },
      { bg: "#ff8800", text: "#000000" },
      { bg: "#8800ff", text: "#ffffff" },
      { bg: "#00ffff", text: "#000000" },
      { bg: "#ff0088", text: "#ffffff" },
      { bg: "#4a148c", text: "#ffffff" },
      { bg: "#b71c1c", text: "#ffffff" },
      { bg: "#1a237e", text: "#ffffff" },
    ]

    // Create a much larger number of banners with more chaotic animations
    const newBanners = Array.from({ length: 100 }, (_, i) => {
      const colorPair = colorPairs[Math.floor(Math.random() * colorPairs.length)]
      const opacity = 0.3 + Math.random() * 0.7
      const size = 10 + Math.random() * 30

      // Generate random animation properties
      const duration = 2 + Math.random() * 20
      const delay = Math.random() * 5
      const animationType = Math.floor(Math.random() * 10)

      // Create different animation types
      let animation = ""
      let transform = ""

      switch (animationType) {
        case 0: // Spinning
          animation = `spin ${duration}s linear infinite`
          break
        case 1: // Bouncing
          animation = `bounce ${duration}s ease-in-out infinite`
          break
        case 2: // Pulsing
          animation = `pulse ${duration}s ease-in-out infinite`
          break
        case 3: // Floating
          animation = `float ${duration}s ease-in-out infinite`
          break
        case 4: // Sliding left
          animation = `slideLeft ${duration}s linear infinite`
          break
        case 5: // Sliding right
          animation = `slideRight ${duration}s linear infinite`
          break
        case 6: // Zigzag
          animation = `zigzag ${duration}s ease-in-out infinite`
          break
        case 7: // Glitching
          animation = `glitch ${duration / 4}s infinite`
          break
        case 8: // 3D rotation
          transform = `perspective(500px) rotateY(${Math.random() * 360}deg)`
          animation = `rotate3D ${duration}s linear infinite`
          break
        case 9: // Shaking
          animation = `shake ${duration / 5}s infinite`
          break
      }

      return {
        id: i,
        text: chineseBannerTexts[Math.floor(Math.random() * chineseBannerTexts.length)],
        style: {
          position: "fixed",
          top: `${Math.random() * 120 - 10}%`,
          left: `${Math.random() * 120 - 10}%`,
          backgroundColor: colorPair.bg,
          color: colorPair.text,
          opacity,
          fontSize: `${size}px`,
          transform: transform || `rotate(${Math.random() * 360}deg)`,
          animation,
          animationDelay: `${delay}s`,
          zIndex: Math.floor(Math.random() * 5),
          padding: `${3 + Math.random() * 10}px`,
          borderRadius: `${Math.random() * 10}px`,
          boxShadow: `0 0 ${Math.random() * 20}px rgba(0,0,0,0.5)`,
          fontWeight: Math.random() > 0.5 ? "bold" : "normal",
          letterSpacing: `${-2 + Math.random() * 4}px`,
        },
      }
    })

    setBanners(newBanners)

    // Add marquee-style banners that move across the screen
    const marqueeCount = 15
    const marqueeTexts = Array.from({ length: marqueeCount }, (_, i) => {
      const colorPair = colorPairs[Math.floor(Math.random() * colorPairs.length)]
      const isHorizontal = Math.random() > 0.3
      const size = 12 + Math.random() * 18
      const duration = 10 + Math.random() * 30
      const direction = Math.random() > 0.5

      // Create a long text string for the marquee
      const textContent = Array.from(
        { length: 5 + Math.floor(Math.random() * 10) },
        () => chineseBannerTexts[Math.floor(Math.random() * chineseBannerTexts.length)],
      ).join(" ★ ")

      return {
        id: 1000 + i,
        text: textContent,
        style: {
          position: "fixed",
          ...(isHorizontal
            ? {
                top: `${5 + Math.random() * 90}%`,
                left: direction ? "-100%" : "100%",
                width: "100%",
                animation: `${direction ? "slideRight" : "slideLeft"} ${duration}s linear infinite`,
              }
            : {
                left: `${5 + Math.random() * 90}%`,
                top: direction ? "-100%" : "100%",
                height: "100%",
                writingMode: "vertical-rl",
                animation: `${direction ? "slideDown" : "slideUp"} ${duration}s linear infinite`,
              }),
          backgroundColor: colorPair.bg,
          color: colorPair.text,
          opacity: 0.3 + Math.random() * 0.7,
          fontSize: `${size}px`,
          zIndex: Math.floor(Math.random() * 5),
          padding: `${3 + Math.random() * 5}px`,
          whiteSpace: "nowrap",
        },
      }
    })

    setBanners((prev) => [...prev, ...marqueeTexts])

    // Add floating characters that move independently
    const floatingChars = Array.from({ length: 50 }, (_, i) => {
      const char = chineseBannerTexts[Math.floor(Math.random() * chineseBannerTexts.length)].charAt(
        Math.floor(Math.random() * 2),
      )
      const colorPair = colorPairs[Math.floor(Math.random() * colorPairs.length)]
      const size = 20 + Math.random() * 60

      return {
        id: 2000 + i,
        text: char,
        style: {
          position: "fixed",
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          color: colorPair.text,
          backgroundColor: "transparent",
          fontSize: `${size}px`,
          fontWeight: "bold",
          opacity: 0.2 + Math.random() * 0.5,
          transform: `rotate(${Math.random() * 360}deg)`,
          animation: `float ${3 + Math.random() * 10}s ease-in-out infinite,
                      fadeInOut ${2 + Math.random() * 5}s ease-in-out infinite`,
          textShadow: `0 0 ${Math.random() * 10}px ${colorPair.bg}`,
          zIndex: 1,
        },
      }
    })

    setBanners((prev) => [...prev, ...floatingChars])
  }, [])

  // Add keyframe animations for the chaotic elements
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-50px); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
      }
      @keyframes fadeInOut {
        0%, 100% { opacity: 0.2; }
        50% { opacity: 1; }
      }
      @keyframes slideLeft {
        0% { transform: translateX(100vw); }
        100% { transform: translateX(-100%); }
      }
      @keyframes slideRight {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100vw); }
      }
      @keyframes slideUp {
        0% { transform: translateY(100vh); }
        100% { transform: translateY(-100%); }
      }
      @keyframes slideDown {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-50px) scale(0.9); }
      }
      @keyframes zigzag {
        0%, 100% { transform: translateX(0) translateY(0); }
        25% { transform: translateX(50px) translateY(-50px); }
        50% { transform: translateX(0) translateY(-100px); }
        75% { transform: translateX(-50px) translateY(-50px); }
      }
      @keyframes rotate3D {
        0% { transform: perspective(500px) rotateY(0deg); }
        100% { transform: perspective(500px) rotateY(360deg); }
      }
      @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-5px, 5px); }
        40% { transform: translate(-5px, -5px); }
        60% { transform: translate(5px, 5px); }
        80% { transform: translate(5px, -5px); }
        100% { transform: translate(0); }
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const handleRotationProgress = () => {
    setRotationCount((prev) => prev + 1)
    const progress = (rotationCount / rotationThreshold) * 100

    if (verificationState === "pending") {
      setVerificationState("in-progress")
      setShowConsole(true)

      // Start logging
      const logInterval = setInterval(() => {
        setConsoleLogs((prev) => [generateRandomLog(), ...prev.slice(0, 29)])
      }, 300)

      // Clean up
      return () => clearInterval(logInterval)
    }
  }

  const handleRotationComplete = () => {
    setVerificationState("complete")
    setConsoleLogs((prev) => ["验证成功! 身份已确认.", ...prev])
  }

  const resetCaptcha = () => {
    setVerificationState("pending")
    setConsoleLogs([])
    setShowConsole(false)
    setRotationCount(0)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden" style={{fontFamily: "Comic Sans MS, cursive"}}>

    <div className="max-w-3xl mx-auto relative z-10">
      {/* Floating banners */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {banners.map((banner) => (
          <FloatingBanner key={banner.id} text={banner.text} style={banner.style} />
        ))}
      </div>

      <div className="p-6 bg-emerald-200 rounded-lg relative overflow-hidden">
        <h1 className="text-4xl font-bold text-yellow-500 mb-8 transform rotate-3 skew-x-6 text-center text-shadow">
          验证系统
        </h1>

        <div className="bg-green-800 p-4 rounded-lg mb-8 transform rotate-1">
          <h2 className="text-purple-300 text-2xl mb-4 text-center">3D 验证码挑战</h2>

          <div className="h-64 border-8 border-dotted border-yellow-400 relative">
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 75 }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
              <CameraController isComplete={verificationState === "complete"} />
              <VerificationCube
                onRotationComplete={handleRotationComplete}
                rotationThreshold={rotationThreshold}
                isComplete={verificationState === "complete"}
              />
            </Canvas>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lime-400 font-bold text-xl z-10">
              {verificationState === "complete" ? "验证成功!" : "旋转立方体"}
            </div>
          </div>

          <p className="text-yellow-200 mt-2 text-center text-sm tracking-tighter">
            请旋转立方体完成验证{" "}
            {verificationState !== "pending" &&
              `(${Math.min(100, Math.round((rotationCount / rotationThreshold) * 100))}%)`}
          </p>
        </div>

        {showConsole && (
          <div className="bg-black p-2 rounded-md transform -rotate-2 mb-8">
            <div className="h-64 overflow-auto font-mono text-green-400 text-xs p-2">
              {consoleLogs.map((log, i) => (
                <div key={i} className="mb-1">
                  [{new Date().toISOString()}] {log}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center space-x-4">
          {verificationState === "complete" ? (
            <Button className="bg-green-500 hover:bg-green-600 flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>验证成功</span>
            </Button>
          ) : (
            <Button variant="destructive" className="flex items-center space-x-2" onClick={handleRotationProgress}>
              <AlertCircle className="h-4 w-4" />
              <span>正在验证</span>
            </Button>
          )}

          <Button variant="outline" onClick={resetCaptcha} className="flex items-center space-x-2">
            <RotateCcw className="h-4 w-4" />
            <span>重置</span>
          </Button>
        </div>

        <div className="mt-8 text-red-600 text-center max-w-md mx-auto transform -skew-x-5">
          <p className="text-lg mb-2">系统警告: 不要关闭此窗口!</p>
          <p className="text-sm opacity-70">验证失败可能导致系统崩溃和数据丢失。请保持耐心并完成所有步骤。</p>
        </div>
      </div>




    </div>
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
