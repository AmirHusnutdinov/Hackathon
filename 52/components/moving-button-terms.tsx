"use client"

import React, { useState, useEffect, useRef } from 'react';

interface ButtonPosition {
  x: number;
  y: number;
  velX: number;
  velY: number;
}

const MovingButtonsTerms: React.FC = () => {
  // Refs for DOM elements
  const disclaimerTextRef = useRef<HTMLDivElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const finalAcceptButtonRef = useRef<HTMLButtonElement>(null);
  const finalDeclineButtonRef = useRef<HTMLButtonElement>(null);
  const countdownElementRef = useRef<HTMLSpanElement>(null);

  // State variables
  const [showPopup, setShowPopup] = useState(true);
  const [showAcceptPopup, setShowAcceptPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Increased from 11 to 30 seconds

  // Animation and interval refs
  const animationFrameRef = useRef<number>();
  const scrollIntervalRef = useRef<NodeJS.Timeout>();
  const countdownTimerRef = useRef<NodeJS.Timeout>();

  // Button position and velocity state
  const [buttonState, setButtonState] = useState<{
    accept: ButtonPosition;
    decline: ButtonPosition;
    containerWidth: number;
    containerHeight: number;
    buttonWidth: number;
    buttonHeight: number;
  }>({
    accept: { x: 0, y: 0, velX: 1, velY: 1 }, // Reduced velocity from 2 to 1
    decline: { x: 0, y: 0, velX: -1, velY: -1 }, // Reduced velocity from -2 to -1
    containerWidth: 0,
    containerHeight: 0,
    buttonWidth: 0,
    buttonHeight: 0
  });

  // Constants - Modified values
  const scrollSpeed = 50; // Reduced from 3,000,000 to 50 (much slower scroll)
  const timeLimit = 30; // Increased from 11 to 30 seconds

  // Update container and button sizes
  const updateSizes = () => {
    if (!buttonContainerRef.current || !finalAcceptButtonRef.current) return;

    const containerWidth = buttonContainerRef.current.offsetWidth;
    const containerHeight = buttonContainerRef.current.offsetHeight;
    const buttonWidth = finalAcceptButtonRef.current.offsetWidth;
    const buttonHeight = finalAcceptButtonRef.current.offsetHeight;

    setButtonState({
      accept: {
        x: Math.random() * (containerWidth - buttonWidth),
        y: Math.random() * (containerHeight - buttonHeight),
        velX: (Math.random() * 2 + 0.5) * (Math.random() > 0.5 ? 1 : -1), // Reduced max velocity from 3 to 2 and min from 1 to 0.5
        velY: (Math.random() * 2 + 0.5) * (Math.random() > 0.5 ? 1 : -1)
      },
      decline: {
        x: Math.random() * (containerWidth - buttonWidth),
        y: Math.random() * (containerHeight - buttonHeight),
        velX: (Math.random() * 2 + 0.5) * (Math.random() > 0.5 ? 1 : -1),
        velY: (Math.random() * 2 + 0.5) * (Math.random() > 0.5 ? 1 : -1)
      },
      containerWidth,
      containerHeight,
      buttonWidth,
      buttonHeight
    });
  };

  // Move buttons animation (unchanged except for velocity modifications above)
  const moveButtons = () => {
    setButtonState(prev => {
      const { accept, decline, containerWidth, containerHeight, buttonWidth, buttonHeight } = prev;

      // Update accept button position
      let newAcceptX = accept.x + accept.velX;
      let newAcceptY = accept.y + accept.velY;
      let newAcceptVelX = accept.velX;
      let newAcceptVelY = accept.velY;

      if (newAcceptX + buttonWidth > containerWidth || newAcceptX < 0) {
        newAcceptVelX = -newAcceptVelX;
        newAcceptX = Math.max(0, Math.min(newAcceptX, containerWidth - buttonWidth));
      }
      if (newAcceptY + buttonHeight > containerHeight || newAcceptY < 0) {
        newAcceptVelY = -newAcceptVelY;
        newAcceptY = Math.max(0, Math.min(newAcceptY, containerHeight - buttonHeight));
      }

      // Update decline button position
      let newDeclineX = decline.x + decline.velX;
      let newDeclineY = decline.y + decline.velY;
      let newDeclineVelX = decline.velX;
      let newDeclineVelY = decline.velY;

      if (newDeclineX + buttonWidth > containerWidth || newDeclineX < 0) {
        newDeclineVelX = -newDeclineVelX;
        newDeclineX = Math.max(0, Math.min(newDeclineX, containerWidth - buttonWidth));
      }
      if (newDeclineY + buttonHeight > containerHeight || newDeclineY < 0) {
        newDeclineVelY = -newDeclineVelY;
        newDeclineY = Math.max(0, Math.min(newDeclineY, containerHeight - buttonHeight));
      }

      // Apply new positions to DOM elements
      if (finalAcceptButtonRef.current) {
        finalAcceptButtonRef.current.style.left = `${newAcceptX}px`;
        finalAcceptButtonRef.current.style.top = `${newAcceptY}px`;
      }
      if (finalDeclineButtonRef.current) {
        finalDeclineButtonRef.current.style.left = `${newDeclineX}px`;
        finalDeclineButtonRef.current.style.top = `${newDeclineY}px`;
      }

      return {
        ...prev,
        accept: {
          x: newAcceptX,
          y: newAcceptY,
          velX: newAcceptVelX,
          velY: newAcceptVelY
        },
        decline: {
          x: newDeclineX,
          y: newDeclineY,
          velX: newDeclineVelX,
          velY: newDeclineVelY
        }
      };
    });

    animationFrameRef.current = requestAnimationFrame(moveButtons);
  };

  // Auto-scroll disclaimer text (modified interval timing)
  const startAutoScroll = () => {
    if (!disclaimerTextRef.current) return;

    stopAutoScroll();

    scrollIntervalRef.current = setInterval(() => {
      if (disclaimerTextRef.current) {
        if (disclaimerTextRef.current.scrollTop + disclaimerTextRef.current.clientHeight >=
            disclaimerTextRef.current.scrollHeight - 50) {
          stopAutoScroll();
          showAcceptPopupHandler();
          return;
        }

        disclaimerTextRef.current.scrollBy({
          top: scrollSpeed / 60,
          behavior: 'smooth' // Changed from 'auto' to 'smooth'
        });
      }
    }, 50); // Increased interval from 16ms to 50ms for smoother scroll
  };

  // ... [rest of the code remains the same until the return statement]

  return (
    <div className="app">




      <div className={`popup ${showPopup ? 'visible' : ''}`}>
        <h3 className="popup-title">IMPORTANT DISCLAIMER</h3>
        <div className="time-indicator">
          Time remaining: <span ref={countdownElementRef}>{timeLeft}</span> seconds
        </div>
        <div className="disclaimer-content" ref={disclaimerTextRef}>
          {/* ... [same content as before] ... */}
        </div>
      </div>

      <div className={`accept-popup ${showAcceptPopup ? 'visible' : ''}`}>
        <h3 className="accept-popup-title">Accept Terms and Conditions</h3>
        <p>Do you accept our Terms and Conditions?</p>
        <div className="button-container" ref={buttonContainerRef}>
          <button
            className="moving-button accept-button"
            ref={finalAcceptButtonRef}
          >
            I Accept
          </button>
          <button
            className="moving-button decline-button"
            ref={finalDeclineButtonRef}
          >
            I Decline
          </button>
        </div>
      </div>

      <style jsx>{`
        .app {
          font-family: Arial, sans-serif;
          text-align: center;
          margin-top: 50px;
          background-color: #f5f5f5;
        }

        .terms-button {
          padding: 15px 40px;
          font-size: 1.3em;
          background: blueviolet;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 30px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .popup {
          display: none;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          max-width: 700px;
          height: 60vh;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(0,0,0,0.3);
          z-index: 1000;
          overflow: hidden;
        }

        .popup.visible {
          display: block;
        }

        .disclaimer-content {
          font-size: 1em; /* Reduced from 1.4em for better readability */
          line-height: 1.6;
          text-align: left;
          height: calc(100% - 30px);
          overflow-y: auto;
          padding-right: 15px;
          scroll-behavior: smooth;
        }

        .time-indicator {
          font-size: 1.1em;
          margin-bottom: 10px;
          color: #666;
        }

        .accept-popup {
          display: none;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          padding: 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 0 30px rgba(0,0,0,0.3);
          z-index: 1001;
          text-align: center;
        }

        .button-container {
          position: relative;
          width: 100%;
          height: 150px; /* Increased height for better button movement */
          margin: 20px 0;
          border: 1px dashed #ccc;
          border-radius: 5px;
        }

        .moving-button {
          position: absolute;
          padding: 12px 30px;
          font-size: 1.1em;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: transform 0.2s;
          z-index: 1002;
          min-width: 120px;
        }

        .accept-button {
          background: #4CAF50;
          color: white;
        }

        .accept-button:hover {
          transform: scale(1.05);
        }

        .decline-button {
          background: #f44336;
          color: white;
        }

        .decline-button:hover {
          transform: scale(1.05);
        }

        .overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          z-index: 999;
        }

        .overlay.visible {
          display: block;
        }
      `}</style>
    </div>
  );
};

export default MovingButtonsTerms;
