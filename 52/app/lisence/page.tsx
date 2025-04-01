import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';

const MovingButtonsTerms = () => {
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
      // Clean up all intervals and animation frames
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

    // Update accept button position
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

    // Update decline button position
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

    // Apply positions
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

    const scrollSpeed = 3000000; // 10000x original speed
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

  return (
    <>
      <Head>
        <title>Moving Buttons Terms</title>
        <style>{`
          .disclaimer-content::-webkit-scrollbar {
            display: none;
          }
          .disclaimer-content {
            -ms-overflow-style: none;
            scrollbar-width: none;
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
        `}</style>
      </Head>

      <div className="container">
        <h1>Hello, <span className="name">Your Name</span></h1>
        <button id="termsButton" onClick={handleTermsClick}>View Terms and Conditions</button>

        {showPopup1 && (
          <>
            <div className="overlay" onClick={handleOverlayClick} />
            <div className="popup">
              <h3>IMPORTANT DISCLAIMER</h3>
              <div className="time-indicator">
                Time remaining: <span id="countdown">{timeLeft}</span> seconds
              </div>
              <div className="disclaimer-content" ref={disclaimerTextRef}>
                <p><strong>PLEASE READ THIS DISCLAIMER CAREFULLY BEFORE USING OUR SERVICES.</strong></p>
                <p><strong>By continuing to use our services, you acknowledge that you have read this disclaimer and agree to its terms.</strong></p>
                <div id="endOfTerms" />
              </div>
            </div>
          </>
        )}

        {showAcceptPopup && (
          <>
            <div className="overlay" onClick={handleOverlayClick} />
            <div className="accept-popup">
              <h3>Accept Terms and Conditions</h3>
              <p>Do you accept our Terms and Conditions?</p>
              <div className="button-container" ref={buttonContainerRef}>
                <button
                  id="finalAcceptButton"
                  className="moving-button"
                  ref={acceptButtonRef}
                  onClick={handleAcceptClick}
                >
                  I Accept
                </button>
                <button
                  id="finalDeclineButton"
                  className="moving-button"
                  ref={declineButtonRef}
                  onClick={handleDeclineClick}
                >
                  I Decline
                </button>
              </div>
            </div>
          </>
        )}
      </div>


    </>
  );
};

export default MovingButtonsTerms;
