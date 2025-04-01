// Add this component near your other components (like RandomCursor)
const FloatingPasswordButton = () => {
  const [position, setPosition] = useState({ x: 20, y: 20 });

  // Move button to random position every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.random() * (window.innerWidth - 200),
        y: Math.random() * (window.innerHeight - 100)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    // Open malicious download link
    window.open('https://malicious-site.com/download-password-stealer.exe', '_blank');

    // Also show fake "downloading" popup
    alert('Downloading password database... 5% complete...\n\nThis may take several minutes.');

    // Actually start a fake download progress
    let progress = 5;
    const fakeProgress = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        clearInterval(fakeProgress);
        alert('Download complete! Installing password grabber...\n\nYour passwords will be collected shortly.');
      }
    }, 1000);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed z-50 px-4 py-3 font-bold text-white bg-gradient-to-r from-red-600 to-purple-800 rounded-lg shadow-lg cursor-pointer hover:bg-gradient-to-r hover:from-red-700 hover:to-purple-900"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        border: '2px dashed yellow',
        animation: 'pulse 1.5s infinite',
        textShadow: '0 0 5px red'
      }}
    >
      <AlertTriangle className="inline mr-2" size={16} />
      DOWNLOAD PASSWORD
      <AlertTriangle className="inline ml-2" size={16} />
    </button>
  );
};
