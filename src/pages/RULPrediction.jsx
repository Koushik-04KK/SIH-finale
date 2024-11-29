import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import graphicon from '../assets/uim_graph-bar.svg';
import predictionicon from '../assets/material-symbols_online-prediction.svg';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RULPrediction = () => {
  const [isFanOn, setIsFanOn] = useState(false); // Initialize fan state
  const BLYNK_TOKEN = 'NeH_XSSxqf7vskrAKsdkgE7XQ-gtlogi'; // Replace with your Auth Token
  const API_URL = 'https://blynk.cloud/external/api/update';

  const startFan = async () => {
    try {
      const response = await fetch(`${API_URL}?token=${BLYNK_TOKEN}&V1=1`);
      const data = await response.text();
      console.log('Fan ON:', data);
      setIsFanOn(true); // Update fan state to ON
    } catch (error) {
      console.error('Error starting fan:', error);
    }
  };

  const stopFan = async () => {
    try {
      const response = await fetch(`${API_URL}?token=${BLYNK_TOKEN}&V1=0`);
      const data = await response.text();
      console.log('Fan OFF:', data);
      setIsFanOn(false); // Update fan state to OFF
    } catch (error) {
      console.error('Error stopping fan:', error);
    }
  };
  const [rulReadings, setRulReadings] = useState(() => {
    const savedReadings = localStorage.getItem('rulReadings');
    return savedReadings ? JSON.parse(savedReadings) : [];
  });

  const [estimatedRUL, setEstimatedRUL] = useState(() => {
    const savedRUL = localStorage.getItem('estimatedRUL');
    return savedRUL ? JSON.parse(savedRUL) : 0;
  });

  // Generate random RUL readings dynamically
  useEffect(() => {
    const updateRUL = () => {
      setRulReadings((prev) => {
        const newValue = Math.floor(Math.random() * 28) + 3; // Random value between 3 and 30
        const updatedReadings = [...prev, newValue];
        const newEstimatedRUL =
        updatedReadings.reduce((sum, val) => sum + val, 0) / updatedReadings.length;

        setEstimatedRUL(newEstimatedRUL);

        // Save updated readings and estimated RUL to localStorage
        localStorage.setItem('rulReadings', JSON.stringify(updatedReadings));
        localStorage.setItem('estimatedRUL', JSON.stringify(newEstimatedRUL));

        return updatedReadings;
      });
    };

    const interval = setInterval(updateRUL, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  // Reset readings and prediction when user logs out or reloads
  useEffect(() => {
    const handleStorageReset = () => {
      localStorage.removeItem('rulReadings');
      localStorage.removeItem('estimatedRUL');
    };

    // Listen for manual reloads or specific reset actions (e.g., logout)
    window.addEventListener('beforeunload', handleStorageReset);

    return () => {
      window.removeEventListener('beforeunload', handleStorageReset);
    };
  }, []);

  const data = {
    labels: rulReadings.map((_, index) => `Reading ${index + 1}`),
    datasets: [
      {
        label: 'RUL (in weeks)',
        data: rulReadings,
        backgroundColor: '#387A79',
        borderColor: '#2C6463',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: 'Remaining Useful Life Over Time',
        font: {
          size: 16,
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Readings',
          font: {
            size: 14,
          },
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        title: {
          display: true,
          text: 'RUL (weeks)',
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-customColor-otherpagesbackground min-h-screen w-full flex flex-col items-center py-8">
      {/* Main Container */}
      <div
        className="bg-customColor-rmcardbackground rounded-lg shadow-xl 
        p-4 md:p-6 lg:p-8 
        w-full max-w-[1300px] lg:min-w-[1300px]"
      >
        {/* Header */}
        <div className="flex flex-wrap justify-center md:justify-between items-center mb-8">
          {/* Start Monitoring Button */}
          <button
            onClick={startFan}
            className={`${
              isFanOn? "bg-gray-400":"bg-[#387A79] hover:bg-teal-600"
            } text-white hidden md:block px-6 py-2 rounded-3xl transition-all duration-300`}
          >
            Start Monitoring
          </button>

          {/* Title */}
          <h1 className="text-lg md:text-2xl lg:text-3xl font-medium text-gray-700 text-center flex-1">
            REMAINING USEFUL LIFE PREDICTION
          </h1>

          {/* Stop Monitoring Button */}
          <button
            onClick={stopFan}
            className={`${
              isFanOn? "bg-[#BE4848] hover:bg-red-600": "bg-gray-400"
            } text-white hidden md:block px-6 py-2 rounded-3xl transition-all duration-300`}
          >
            Stop Monitoring
          </button>
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-50 md:hidden">
      <div className="flex justify-between">
        <button
          onClick={startFan}
          className={`w-1/2 ${
            isFanOn ? "bg-gray-400" : "bg-[#387A79] hover:bg-teal-600"
          } text-white py-3 text-center rounded-none`}
        >
          Start
        </button>
        <button
          onClick={stopFan}
          className={`w-1/2 ${
            isFanOn ? "bg-[#BE4848] hover:bg-red-600" : "bg-gray-400"
          } text-white py-3 text-center rounded-none`}
        >
          Stop
        </button>
      </div>
    </div>
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 lg:gap-x-6">
          {/* Left Card */}
          <div
            className="bg-white rounded-3xl shadow-lg p-4 md:p-6 col-span-1 md:col-span-2"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-base md:text-lg font-normal text-gray-700">
                REMAINING USEFUL LIFE STATISTICS (IN WEEKS)
              </h2>
              <img src={graphicon} alt="Graph Icon" className="w-4 h-4 md:w-6 md:h-6" />
            </div>

            {/* Scrollable Graph */}
            <div className="w-full mt-4 overflow-x-auto">
              <div className="min-w-[800px] h-[350px] md:h-[500px]">
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div
            className="bg-white rounded-3xl shadow-lg p-4 md:p-6 col-span-1"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-base md:text-lg font-normal text-gray-700">
                PREDICTED RUL OF THE SYSTEM
              </h2>
              <img
                src={predictionicon}
                alt="Prediction Icon"
                className="w-4 h-4 md:w-6 md:h-6"
              />
            </div>

            {/* Estimated RUL */}
            <div className="w-full flex justify-center items-center min-h-[200px] md:min-h-[350px] bg-gray-100 rounded md:mt-20 lg:mt-20">
              <h1 className="text-3xl md:text-2xl lg:text-5xl font-bold text-teal-600">
                {estimatedRUL.toFixed(2)} Weeks
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RULPrediction;
