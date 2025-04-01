"use client"

import { useEffect, useState, useRef } from "react"
import { AlertTriangle, Bell, Zap, Heart } from "lucide-react"
import AdBanner from "@/components/ad-banner"
import RandomCursor from "@/components/random-cursor"
import BlinkingText from "@/components/blinking-text"
import PopupAd from "@/components/popup-ad"

export default function Home() {
  const [showPopup, setShowPopup] = useState(false)
  const [popupCount, setPopupCount] = useState(0)

  const [showPopup1, setshowPopup1] = useState(false);
  const [showAcceptPopup, setShowAcceptPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(11);
  const [countdownActive, setCountdownActive] = useState(false);

  const disclaimerTextRef = useRef<HTMLDivElement>(null);
  const acceptButtonRef = useRef<HTMLButtonElement>(null);
  const declineButtonRef = useRef<HTMLButtonElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  const acceptPos = useRef({ x: 0, y: 0 });
  const declinePos = useRef({ x: 0, y: 0 });
  const acceptVel = useRef({ x: 2, y: 2 });
  const declineVel = useRef({ x: -2, y: -2 });

  const animationFrameRef = useRef<number>();
  const scrollIntervalRef = useRef<NodeJS.Timeout>();
  const countdownTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, []);

  const updateSizes = () => {
    if (!buttonContainerRef.current || !acceptButtonRef.current || !declineButtonRef.current) return;

    const containerWidth = buttonContainerRef.current.offsetWidth;
    const containerHeight = buttonContainerRef.current.offsetHeight;
    const buttonWidth = acceptButtonRef.current.offsetWidth;
    const buttonHeight = acceptButtonRef.current.offsetHeight;

    acceptPos.current = {
      x: Math.random() * (containerWidth - buttonWidth),
      y: Math.random() * (containerHeight - buttonHeight)
    };

    declinePos.current = {
      x: Math.random() * (containerWidth - buttonWidth),
      y: Math.random() * (containerHeight - buttonHeight)
    };

    acceptVel.current = {
      x: (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1),
      y: (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1)
    };

    declineVel.current = {
      x: (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1),
      y: (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1)
    };
  };

  const moveButtons = () => {
    if (!buttonContainerRef.current || !acceptButtonRef.current || !declineButtonRef.current) {
      animationFrameRef.current = requestAnimationFrame(moveButtons);
      return;
    }

    const containerWidth = buttonContainerRef.current.offsetWidth;
    const containerHeight = buttonContainerRef.current.offsetHeight;
    const buttonWidth = acceptButtonRef.current.offsetWidth;
    const buttonHeight = acceptButtonRef.current.offsetHeight;

    acceptPos.current.x += acceptVel.current.x;
    acceptPos.current.y += acceptVel.current.y;

    if (acceptPos.current.x + buttonWidth > containerWidth || acceptPos.current.x < 0) {
      acceptVel.current.x = -acceptVel.current.x;
      acceptPos.current.x = Math.max(0, Math.min(acceptPos.current.x, containerWidth - buttonWidth));
    }
    if (acceptPos.current.y + buttonHeight > containerHeight || acceptPos.current.y < 0) {
      acceptVel.current.y = -acceptVel.current.y;
      acceptPos.current.y = Math.max(0, Math.min(acceptPos.current.y, containerHeight - buttonHeight));
    }

    declinePos.current.x += declineVel.current.x;
    declinePos.current.y += declineVel.current.y;

    if (declinePos.current.x + buttonWidth > containerWidth || declinePos.current.x < 0) {
      declineVel.current.x = -declineVel.current.x;
      declinePos.current.x = Math.max(0, Math.min(declinePos.current.x, containerWidth - buttonWidth));
    }
    if (declinePos.current.y + buttonHeight > containerHeight || declinePos.current.y < 0) {
      declineVel.current.y = -declineVel.current.y;
      declinePos.current.y = Math.max(0, Math.min(declinePos.current.y, containerHeight - buttonHeight));
    }

    if (acceptButtonRef.current) {
      acceptButtonRef.current.style.left = `${acceptPos.current.x}px`;
      acceptButtonRef.current.style.top = `${acceptPos.current.y}px`;
    }
    if (declineButtonRef.current) {
      declineButtonRef.current.style.left = `${declinePos.current.x}px`;
      declineButtonRef.current.style.top = `${declinePos.current.y}px`;
    }

    animationFrameRef.current = requestAnimationFrame(moveButtons);
  };

  const startAutoScroll = () => {
    if (!disclaimerTextRef.current) return;

    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);

    const scrollSpeed = 3000000;
    scrollIntervalRef.current = setInterval(() => {
      if (!disclaimerTextRef.current) return;

      if (
        disclaimerTextRef.current.scrollTop + disclaimerTextRef.current.clientHeight >=
        disclaimerTextRef.current.scrollHeight - 50
      ) {
        stopAutoScroll();
        showAcceptPopupHandler();
        return;
      }

      disclaimerTextRef.current.scrollBy({
        top: scrollSpeed / 60,
        behavior: 'auto' as ScrollBehavior,
      });
    }, 16);
  };

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
  };

  const startCountdown = () => {
    setTimeLeft(11);
    setCountdownActive(true);

    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);

    countdownTimerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimerRef.current);
          showAcceptPopupHandler();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const showAcceptPopupHandler = () => {
    stopAutoScroll();
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    setshowPopup1(false);
    setShowAcceptPopup(true);
    updateSizes();
    moveButtons();
  };

  const handleTermsClick = () => {
    setshowPopup1(true);
    if (disclaimerTextRef.current) {
      disclaimerTextRef.current.scrollTop = 0;
    }
    startCountdown();
    startAutoScroll();
  };

  const handleAcceptClick = () => {
    alert('Thank you for accepting our Terms and Conditions!');
    setShowAcceptPopup(false);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
  };

  const handleDeclineClick = () => {
    alert('You must accept the Terms and Conditions to use this site.');
    setShowAcceptPopup(false);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
  };

  const handleOverlayClick = () => {
    setshowPopup1(false);
    setShowAcceptPopup(false);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    stopAutoScroll();
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup(true)
      setPopupCount((prev) => prev + 1)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleButtonClick = () => {
    alert("Поздравляем! Вы выиграли ничего!")
    setshowPopup1(true)
    setShowPopup(true)
  }

  return (
    <div className={`min-h-screen bg-black relative overflow-x-hidden ${(showPopup1 || showAcceptPopup) ? 'pointer-events-none' : ''}`}>
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
        <h1 className="text-5xl font-bold text-white mb-6 text-center">BEZUMSHOP 2025</h1>

        <div className="relative flex flex-col items-center">
          <BlinkingText text="Самая важная информация в мире" className="mb-3 text-4xl font-bold text-center" />
          <h2 className="text-2xl font-semibold text-green-400 mb-8 animate-bounce">52</h2>
          <button onClick={handleButtonClick} className="relative px-6 py-3 font-bold text-black group">
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full border-4 border-lime-500"></span>
            <span className="relative text-xl font-bold">НАЖМИ МЕНЯ!</span>
          </button>
        </div>


      </main>

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
