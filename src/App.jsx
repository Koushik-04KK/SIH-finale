import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer.jsx';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import RULPrediction from './pages/RULPrediction';
import Schedules from './pages/Schedules';
import Chatbot from './pages/Chatbot';
import Login from './components/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      const confirmationMessage = "Are you sure you want to reload? You will lose unsaved progress.";
      e.returnValue = confirmationMessage; // Required for Chrome
      return confirmationMessage;
    };

    if (isLoggedIn) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {!isLoggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <Navbar onLogout={handleLogout} />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/rul-prediction" element={<RULPrediction />} />
                <Route path="/schedules" element={<Schedules />} />
                <Route path="/chatbot" element={<Chatbot />} />
              </Routes>
            </div>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
};

export default App;