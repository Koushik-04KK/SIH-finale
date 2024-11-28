// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import fangif from "../assets/fangif.gif";
import fangifstill from "../assets/fangifstill.png"
// import emerge from "../assets/alarm.gif";

// const BLYNK_AUTH_TOKEN = "YourAuthToken"; // Replace with your Blynk Auth Token
// const BLYNK_API_URL = "https://blynk.cloud/external/api";
const Dashboard = () => {
  const [sensorData, setSensorData] = useState({
    rpm: "Fetching...",
    current: "Fetching...",
    vibration: "Fetching...",
    temperature: "Fetching...",
    airPressure: "Fetching...",
    sensorsPlaced: "Fetching...",
    predictedFault: "Predicting...",
  });
  // const BLYNK_TOKEN = 'NeH_XSSxqf7vskrAKsdkgE7XQ-gtlogi'; // Replace with your Auth Token
  // const API_URL = 'https://blynk.cloud/external/api/update';

  // const startFan = async () => {
  //   try {
  //     const response = await fetch(`${API_URL}?token=${BLYNK_TOKEN}&V1=1`);
  //     const data = await response.text();
  //     console.log('Fan ON:', data);
  //   } catch (error) {
  //     console.error('Error starting fan:', error);
  //   }
  // };

  // const stopFan = async () => {
  //   try {
  //     const response = await fetch(`${API_URL}?token=${BLYNK_TOKEN}&V1=0`);
  //     const data = await response.text();
  //     console.log('Fan OFF:', data);
  //   } catch (error) {
  //     console.error('Error stopping fan:', error);
  //   }
  // };
  
  const [isFault, setIsFault] = useState(false);
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
  // State to manage fault condition
  // const [isFanOn, setIsFanOn] = useState(false); // State to manage fan status

  // const ESP32_IP = "192.168.26.124"; // Replace with your ESP32 IP address

  // const startFan = () => {
  //   fetch(`http://${ESP32_IP}/start`)
  //     .then((response) => response.text())
  //     .then((data) => {
  //       console.log(data);
  //        // Set fan status to ON
  //     })
  //     .catch((error) => console.error("Error:", error));
  //     setIsFanOn(true);
  // };

  // const stopFan = () => {
  //   fetch(`http://${ESP32_IP}/stop`)
  //     .then((response) => response.text())
  //     .then((data) => {
  //       console.log(data);
  //        // Set fan status to OFF
  //     })
  //     .catch((error) => console.error("Error:", error));
  //     setIsFanOn(false);
  // };
 

  useEffect(() => {
    // Function to generate random values and fault prediction
    const generateRandomData = () => {
      // Simulate random fault prediction (true for fault, false for no fault)
      const faultCondition = Math.random() > 0.5; // 50% chance of fault

      setSensorData({
        rpm: `${Math.floor(Math.random() * 1000)} RPM`, // Random RPM between 0 and 1000
        current: `${(Math.random() * 10).toFixed(2)} A`, // Random current between 0 and 10 Amps
        vibration: `${(Math.random() * 5).toFixed(2)} g`, // Random vibration between 0 and 5 g
        temperature: `${(Math.random() * 100).toFixed(2)} °C`, // Random temperature between 0 and 100°C
        airPressure: `${(Math.random() * 10).toFixed(2)} bar`, // Random pressure between 0 and 10 bar
        sensorsPlaced: `${Math.floor(Math.random() * 100)} Sensors`, // Random number of sensors between 0 and 100
        predictedFault: faultCondition ? "FAULT" : "NO FAULT", // Random fault prediction
      });
      setIsFault(faultCondition); // Update fault condition
    };

    // Initial data fetch
    generateRandomData();

    // Update every 5 seconds
    const intervalId = setInterval(generateRandomData, 3000);

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
      <div className="bg-customColor-otherpagesbackground w-full flex flex-col items-center py-8">
        <div className="bg-customColor-rmcardbackground rounded-lg shadow-xl p-4 md:p-6 lg:p-8 w-full max-w-[1300px]">
          <div className="flex flex-wrap justify-center items-center mb-8 md:justify-between">
          <button
            onClick={stopFan}
            className={`${
              isFanOn? "bg-gray-400":"bg-[#387A79] hover:bg-teal-600"
            } text-white hidden md:block px-6 py-2 rounded-3xl transition-all duration-300`}
          >
            Start Monitoring
          </button>
          <h1 className="text-lg md:text-2xl lg:text-3xl font-medium text-gray-700 text-center">
            REALTIME METRICS
          </h1>
          <button
            onClick={startFan}
            className={`${
              isFanOn? "bg-[#BE4848] hover:bg-red-600": "bg-gray-400"
            } text-white hidden md:block px-6 py-2 rounded-3xl transition-all duration-300`}
          >
            Stop Monitoring
          </button>
          </div>
          
          {/* Fault alert message */}
          {isFault && (
  <div className="bg-red-600 text-white md:text-lg lg:text-xl text-center py-3 px-4 rounded-2xl mb-4 lg:mx-56 lg:mb-10 flex items-center justify-center space-x-4">
    {/* <img src={emerge} alt="icons" className="h-10 w-10 rounded-full" /> */}
    <span>Alert: A fault has been detected!</span>
  </div>
)}


  
<div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-50 md:hidden">
            <div className="flex justify-between">
              <button
                className="w-1/2 bg-[#387A79] text-white py-3 text-center hover:bg-teal-600 rounded-none"
              >
                Start
              </button>
              <button
                className="w-1/2 bg-[#BE4848] text-white py-3 text-center hover:bg-red-600 rounded-none"
              >
                Stop
              </button>
            </div>
          </div>
  
        <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8 md:grid md:grid-cols-3 md:gap-8 md:flex-row lg:flex-row">
          <div className="flex flex-col gap-4 md:gap-6 lg:gap-6">
            {[{ title: "SPEED", value: sensorData.rpm, icon: <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 14C4 12.9494 4.20693 11.9091 4.60896 10.9385C5.011 9.96793 5.60028 9.08601 6.34315 8.34314C7.08602 7.60028 7.96793 7.011 8.93853 6.60896C9.90914 6.20693 10.9494 6 12 6C13.0506 6 14.0909 6.20693 15.0615 6.60897C16.0321 7.011 16.914 7.60028 17.6569 8.34315C18.3997 9.08602 18.989 9.96793 19.391 10.9385C19.7931 11.9091 20 12.9494 20 14" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinejoin="round"/>
  <path d="M10 15C10 14.7374 10.0517 14.4773 10.1522 14.2346C10.2528 13.992 10.4001 13.7715 10.5858 13.5858C10.7715 13.4001 10.992 13.2528 11.2346 13.1522C11.4773 13.0517 11.7374 13 12 13C12.2626 13 12.5227 13.0517 12.7654 13.1522C13.008 13.2528 13.2285 13.4001 13.4142 13.5858C13.5999 13.7715 13.7473 13.992 13.8478 14.2346C13.9483 14.4773 14 14.7374 14 15" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinejoin="round"/>
  <path d="M13 13L15 10" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M20 14V15C20 15.5523 19.5523 16 19 16H5C4.44772 16 4 15.5523 4 15V14" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg> },
              { title: "CURRENT DRAWN", value: sensorData.current, icon: <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>current</title>
                <path d="M16.67,17A4.58,4.58,0,0,1,13,15.05L9.36,10.16A2.57,2.57,0,0,0,7.23,9a2.79,2.79,0,0,0-2.16,1.51l-1.21,2-1.72-1,1.21-2A4.73,4.73,0,0,1,7.12,7,4.51,4.51,0,0,1,11,9l3.68,4.89A2.56,2.56,0,0,0,16.77,15a2.78,2.78,0,0,0,2.16-1.51l1.21-2,1.72,1-1.21,2A4.73,4.73,0,0,1,16.88,17Z" 
                      stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" 
                      strokeWidth="3" fill="none"/>
                
              </svg>
              
               },
              { title: "VIBRATION", value: sensorData.vibration, icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6L3.06051 7.11942C3.58133 7.66918 3.56352 8.53546 3.02055 9.06335L3 9.08333C2.45233 9.61579 2.45233 10.4953 3 11.0278V11.0278C3.54767 11.5602 3.54767 12.4398 3 12.9722V12.9722C2.45233 13.5047 2.45233 14.3842 3 14.9167L3.02055 14.9366C3.56351 15.4645 3.58132 16.3308 3.0605 16.8806L2 18" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L20.9395 7.11942C20.4187 7.66918 20.4365 8.53546 20.9794 9.06335L21 9.08333C21.5477 9.61579 21.5477 10.4953 21 11.0278V11.0278C20.4523 11.5602 20.4523 12.4398 21 12.9722V12.9722C21.5477 13.5047 21.5477 14.3842 21 14.9167L20.9795 14.9366C20.4365 15.4645 20.4187 16.3308 20.9395 16.8806L22 18" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 5L7 19C7 20.1046 7.89543 21 9 21H15C16.1046 21 17 20.1046 17 19V5C17 3.89543 16.1046 3 15 3L9 3C7.89543 3 7 3.89543 7 5Z" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
               }].map((metric, index) => (
                <div
                  key={index}
                  className={`bg-gray-100 p-6 rounded-3xl shadow-lg flex items-center justify-between h-28 transition-transform duration-300 hover:shadow-xl hover:scale-105 group ${
                    isFault ? "shadow-[#BE4848]" : "shadow-[#387A79]"
                  } ${index === 2 ? "mb-4 sm:mb-0" : ""}`}
                >
                  <div className="flex flex-col items-start">
                    <p className="font-bold text-sm md:text-base lg:text-base text-gray-600 mb-2">
                      {metric.title}
                    </p>
                    <div className="text-xl md:text-lg lg:text-2xl font-semibold">
                      <span className={metric.value === "Fetching..." ? "animate-pulse" : ""}>
                        {metric.value}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-8 md:w-6 lg:w-10 transition-transform duration-300 group-hover:rotate-12 ${
                      isFault ? "stroke-[#BE4848]" : "stroke-[#387A79]"
                    }`}
                  >
                    {metric.icon}
                  </div>
                </div>
              ))}
          </div>

          <div className="flex justify-center items-center my-6 lg:my-0 order-first sm:order-first md:order-none lg:order-none">
            {isFanOn === true ? <img
              className="w-64 md:w-64 lg:w-[386px] animate-spin-slow"
              src={fangif}
              alt="Fan Animation"
            /> : 
            <img 
            className="w-64 md:w-64 lg:w-[378px] animate-spin-slow"
            src={fangifstill}
            alt="Fan Still"
            />
            }
          </div>

          <div className="flex flex-col gap-4 md:gap-6 lg:gap-6">
            {[{ title: "AIR PRESSURE", value: sensorData.airPressure, icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.6933 17.3294C21.0506 15.9959 21.0964 14.5982 20.8271 13.2442C20.5577 11.8902 19.9806 10.6164 19.1402 9.52115C18.2998 8.42593 17.2187 7.53872 15.9806 6.92815C14.7425 6.31757 13.3805 6 12 6C10.6195 6 9.25752 6.31757 8.0194 6.92815C6.78128 7.53872 5.70021 8.42593 4.85982 9.52115C4.01943 10.6164 3.44225 11.8902 3.17293 13.2442C2.90361 14.5982 2.94937 15.9959 3.30667 17.3294" stroke="{sensorData.airPressure === 'FAULT' || sensorData.airPressure === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round"/>
  <path d="M12.7657 15.5823C13.2532 16.2916 12.9104 17.3738 12 17.9994C11.0897 18.625 9.95652 18.5571 9.46906 17.8477C8.94955 17.0917 7.15616 12.8409 6.06713 10.2114C5.86203 9.71621 6.4677 9.3 6.85648 9.669C8.92077 11.6283 12.2462 14.8263 12.7657 15.5823Z" stroke="{sensorData.airPressure === 'FAULT' || sensorData.airPressure === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2"/>
  <path d="M12 6V8" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round"/>
  <path d="M5.63599 8.63574L7.0502 10.05" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.airPressure === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round"/>
  <path d="M18.364 8.63574L16.9498 10.05" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round"/>
  <path d="M20.6934 17.3291L18.7615 16.8115" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round"/>
  <path d="M3.30664 17.3291L5.23849 16.8115" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round"/>
</svg>
},
              { title: "TEMPERATURE", value: sensorData.temperature, icon: <svg width="40" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15.9998C11.4477 15.9998 11 16.4475 11 16.9998C11 17.5521 11.4477 17.9998 12 17.9998C12.5523 17.9998 13 17.5521 13 16.9998C13 16.4475 12.5523 15.9998 12 15.9998ZM12 15.9998L12.0071 10.5M12 16.9998L12.0071 17.0069M16 16.9998C16 19.209 14.2091 20.9998 12 20.9998C9.79086 20.9998 8 19.209 8 16.9998C8 15.9854 8.37764 15.0591 9 14.354L9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V14.354C15.6224 15.0591 16 15.9854 16 16.9998Z" 
                  stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" 
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
               },
              { title: "SENSORS PLACED", value: sensorData.sensorsPlaced, icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 9C5 7.11438 5 6.17157 5.58579 5.58579C6.17157 5 7.11438 5 9 5H12H15C16.8856 5 17.8284 5 18.4142 5.58579C19 6.17157 19 7.11438 19 9V12V15C19 16.8856 19 17.8284 18.4142 18.4142C17.8284 19 16.8856 19 15 19H12H9C7.11438 19 6.17157 19 5.58579 18.4142C5 17.8284 5 16.8856 5 15V12V9Z" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M9 12C9 11.0681 9 10.6022 9.15224 10.2346C9.35523 9.74458 9.74458 9.35523 10.2346 9.15224C10.6022 9 11.0681 9 12 9V9V9C12.9319 9 13.3978 9 13.7654 9.15224C14.2554 9.35523 14.6448 9.74458 14.8478 10.2346C15 10.6022 15 11.0681 15 12V12V12C15 12.9319 15 13.3978 14.8478 13.7654C14.6448 14.2554 14.2554 14.6448 13.7654 14.8478C13.3978 15 12.9319 15 12 15V15V15C11.0681 15 10.6022 15 10.2346 14.8478C9.74458 14.6448 9.35523 14.2554 9.15224 13.7654C9 13.3978 9 12.9319 9 12V12V12Z" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M8 5L8 3" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 21L8 19" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round"/>
                <path d="M21 16L19 16" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round"/>
                <path d="M5 16L3 16" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 5L16 3" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 21L16 19" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round"/>
                <path d="M21 8L19 8" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round"/>
                <path d="M5 8L3 8" stroke="{sensorData.predictedFault === 'FAULT' || sensorData.predictedFault === 'NO FAULT' ? 'currentColor' : 'gray'}" strokeWidth="2" strokeLinecap="round"/>
              </svg> }].map((metric, index) => (
                <div
                  key={index}
                  className={`bg-gray-100 p-6 rounded-3xl shadow-lg flex items-center justify-between h-28 transition-transform duration-300 hover:shadow-xl hover:scale-105 group ${
                    isFault ? "shadow-[#BE4848]" : "shadow-[#387A79]"
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <p className="font-bold text-sm md:text-base lg:text-base text-gray-600 mb-2">
                      {metric.title}
                    </p>
                    <div className="text-xl md:text-lg lg:text-2xl font-semibold">
                      <span className={metric.value === "Fetching..." ? "animate-pulse" : ""}>
                        {metric.value}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-8 md:w-6 lg:w-10 transition-transform duration-300 group-hover:rotate-12 ${
                      isFault ? "stroke-[#BE4848]" : "stroke-[#387A79]"
                    }`}
                  >
                    {metric.icon}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Predicted Fault Card */}
        <div
  className={`bg-gray-100 mt-8 p-4 rounded-3xl shadow-lg flex items-center justify-between h-28 md:w-[70%] mx-auto transition-transform duration-300 hover:shadow-xl hover:scale-105 group ${
    sensorData.predictedFault === "FAULT" ? "shadow-[#BE4848]" : "shadow-[#387A79]"
  }`}
>
  <div className="flex flex-col items-center justify-center md:text-center w-full">
    <p className="font-bold text-xl md:text-2xl ml-8 md:ml-16 lg:ml-16 lg:text-3xl text-gray-600 mb-2">
      PREDICTED FAULT
    </p>
    <div className="text-lg md:text-xl lg:text-2xl ml-8 md:ml-16 lg:ml-16 font-semibold text-black">
      <span
        className={
          sensorData.predictedFault === "Fetching..." ||
          sensorData.predictedFault === "Predicting..."
            ? "animate-pulse"
            : ""
        }
      >
        {sensorData.predictedFault === "Predicting..." ||
        sensorData.predictedFault === "Fetching..."
          ? "Fetching..."
          : sensorData.predictedFault}
      </span>
    </div>
  </div>
  <div
    className={`w-8 md:w-8 lg:w-10 ml-4 transition-transform duration-300 group-hover:rotate-12`}
  >
    {/* Fault Icon SVG */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        stroke={sensorData.predictedFault === "FAULT" ? "#BE4848" : "#387A79"} 
        strokeWidth="2" 
      />
      <line
        x1="12"
        y1="7"
        x2="12"
        y2="12"
        stroke={sensorData.predictedFault === "FAULT" ? "#BE4848" : "#387A79"}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="17"
        x2="12"
        y2="16"
        stroke={sensorData.predictedFault === "FAULT" ? "#BE4848" : "#387A79"}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  </div>
</div>

      </div>
    </div>
  );
};

export default Dashboard;
