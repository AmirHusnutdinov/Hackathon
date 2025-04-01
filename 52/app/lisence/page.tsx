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
  const [showPopup, setShowPopup] = useState(false);
  const [showAcceptPopup, setShowAcceptPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(11);

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
    accept: { x: 0, y: 0, velX: 2, velY: 2 },
    decline: { x: 0, y: 0, velX: -2, velY: -2 },
    containerWidth: 0,
    containerHeight: 0,
    buttonWidth: 0,
    buttonHeight: 0
  });

  // Constants
  const scrollSpeed = 3000000;
  const timeLimit = 11;

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
        velX: (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1),
        velY: (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1)
      },
      decline: {
        x: Math.random() * (containerWidth - buttonWidth),
        y: Math.random() * (containerHeight - buttonHeight),
        velX: (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1),
        velY: (Math.random() * 3 + 1) * (Math.random() > 0.5 ? 1 : -1)
      },
      containerWidth,
      containerHeight,
      buttonWidth,
      buttonHeight
    });
  };

  // Move buttons animation
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

  // Auto-scroll disclaimer text
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
          behavior: 'auto'
        });
      }
    }, 16);
  };

  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
  };

  // Countdown timer
  const startCountdown = () => {
    setTimeLeft(timeLimit);
    if (countdownElementRef.current) {
      countdownElementRef.current.textContent = timeLimit.toString();
    }
    clearCountdown();

    countdownTimerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (countdownElementRef.current) {
          countdownElementRef.current.textContent = newTime.toString();
        }
        return newTime;
      });
    }, 1000);
  };

  const clearCountdown = () => {
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }
  };

  // Show accept popup handler
  const showAcceptPopupHandler = () => {
    stopAutoScroll();
    clearCountdown();
    setShowPopup(false);
    setShowAcceptPopup(true);
    updateSizes();
    moveButtons();
  };

  // Event handlers
  const handleTermsButtonClick = () => {
    setShowPopup(true);
    if (disclaimerTextRef.current) {
      disclaimerTextRef.current.scrollTop = 0;
    }
    startCountdown();
    startAutoScroll();
  };

  const handleAcceptClick = () => {
    alert('Thank you for accepting our Terms and Conditions!');
    setShowAcceptPopup(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleDeclineClick = () => {
    alert('You must accept the Terms and Conditions to use this site.');
    setShowAcceptPopup(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleOverlayClick = () => {
    setShowPopup(false);
    setShowAcceptPopup(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    stopAutoScroll();
    clearCountdown();
  };

  // Effects
  useEffect(() => {
    if (timeLeft <= 0) {
      showAcceptPopupHandler();
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stopAutoScroll();
      clearCountdown();
    };
  }, []);

  return (
    <div className="app">
      <h1>Hello, <span className="my-name">Your Name</span></h1>
      <button className="terms-button" onClick={handleTermsButtonClick}>
        View Terms and Conditions
      </button>

      <div
        className={`overlay ${showPopup || showAcceptPopup ? 'visible' : ''}`}
        onClick={handleOverlayClick}
      ></div>

      <div className={`popup ${showPopup ? 'visible' : ''}`}>
        <h3 className="popup-title">IMPORTANT DISCLAIMER</h3>
        <div className="time-indicator">
          Time remaining: <span ref={countdownElementRef}>11</span> seconds
        </div>
        <div className="disclaimer-content" ref={disclaimerTextRef}>
          <p><strong>PLEASE READ THIS DISCLAIMER CAREFULLY BEFORE USING OUR SERVICES.</strong></p>

          <p>1. <strong>General Information:</strong> The content provided on this platform is for general informational purposes only. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the platform or the information, products, services, or related graphics contained on the platform for any purpose.</p>

          <p>2. <strong>Professional Advice:</strong> The information provided does not constitute professional advice of any kind. You should not rely on this information as an alternative to professional advice from qualified professionals in the relevant field.</p>

          <p>In the first case it was necessary to renounce the consciousness of an unreal immobility in space and to recognize a motion we did not feel; in the present case it is similarly necessary to renounce a freedom that does not exist, and to recognize a dependence of which we are not conscious. be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this platform.</p>

          <p>4. <strong>External Links:</strong> Through this platform you are able to link to other websites which are not under our control. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</p>

          <p>5. <strong>Content Changes:</strong> We reserve the right to make additions, deletions, or modifications to the contents at any time without prior notice. We do not warrant that the website is free of viruses or other harmful components.</p>

          <p>6. <strong>User Responsibility:</strong> Your use of any information or materials on this platform is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this platform meet your specific requirements.</p>

          <p>7. <strong>Jurisdiction:</strong> Any legal matters will be handled under the jurisdiction of the courts in the location where our company is registered, regardless of where you access this platform from.</p>

          <p><strong>By continuing to use our services, you acknowledge that you have read this disclaimer and agree to its terms.</strong></p>

          <div className="end-of-terms"></div>
        </div>
      </div>

      <div className={`accept-popup ${showAcceptPopup ? 'visible' : ''}`}>
        <h3 className="accept-popup-title">Accept Terms and Conditions</h3>
        <p>Do you accept our Terms and Conditions?</p>
        <div className="button-container" ref={buttonContainerRef}>
          <button
            className="moving-button accept-button"
            ref={finalAcceptButtonRef}
            onClick={handleAcceptClick}
          >
            I Accept
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

        .my-name {
          display: inline-block;
          font-size: 2.5em;
          min-width: 300px;
          padding: 10px;
          margin: 10px;
          border-bottom: 2px solid blueviolet;
          color: blueviolet;
          font-weight: bold;
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
          background: linear-gradient(violet,blue,green,yellow,orange,red);
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(0,0,0,0.3);
          z-index: 1000;
          overflow: hidden;
        }

        .popup.visible {
          display: block;
        }

        .disclaimer-content {
          font-size: 1.4em;
          line-height: 1.6;
          text-align: left;
          height: calc(100% - 30px);
          overflow-y: auto;
          padding-right: 15px;
          scroll-behavior: smooth;
        }

        .disclaimer-content::-webkit-scrollbar {
          display: none;
        }

        .popup-title {
          font-size: 2em;
          margin: 0 0 20px 0;
          text-align: center;
          animation: rainbowBlink 0.3s infinite;
          text-shadow: 0 0 10px currentColor;
        }

        .accept-popup {
          display: none;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 200px;
          padding: 20px;
          background: linear-gradient(yellow,blue,red,violet,green);
          border-radius: 10px;
          box-shadow: 0 0 30px rgba(0,0,0,0.5);
          z-index: 1001;
          text-align: center;
        }

        .accept-popup.visible {
          display: block;
        }

        .accept-popup-title {
          margin-top: 0;
          color: blueviolet;
        }

        .button-container {
          position: relative;
          width: 100%;
          height: 100px;
          margin-top: 20px;
        }

        .moving-button {
          position: absolute;
          padding: 12px 30px;
          font-size: 1.2em;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.1s;
          z-index: 1002;
        }

        .accept-button {
          background: red;
          color: white;
        }

        .decline-button {
          background: green;
          color: white;
        }

        @keyframes rainbowBlink {
          0% { color: red; }
          16% { color: orange; }
          32% { color: yellow; }
          48% { color: green; }
          64% { color: blue; }
          80% { color: indigo; }
          100% { color: violet; }
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

        .terms-button:hover {
          background: #8a2be2;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.3);
        }

        .time-indicator {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MovingButtonsTerms;
