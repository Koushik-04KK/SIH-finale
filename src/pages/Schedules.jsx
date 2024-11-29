import React, { useState, useEffect } from "react";
import { FaClock, FaExclamationTriangle } from "react-icons/fa";
const Schedules = () => {
  // Function to generate random dates within a range
  const [faults, setFaults] = useState(() => {
    const savedFaults = localStorage.getItem("faults");
    return savedFaults ? JSON.parse(savedFaults) : [];
  });

  // Function to simulate adding faults
  useEffect(() => {
    const faultInterval = setInterval(() => {
      
      const newFault = {
        id: Date.now(),
        message: `Fault detected at component ${Math.ceil(Math.random() * 5)}`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setFaults((prevFaults) => {
        const updatedFaults = [...prevFaults, newFault];
        localStorage.setItem("faults", JSON.stringify(updatedFaults)); // Save to localStorage
        return updatedFaults;
      });
    }, 5000); // Simulate a fault every 5 seconds
    return () => clearInterval(faultInterval); // Cleanup on unmount
  }, []);

  // Function to clear a fault from the list
  const clearFault = (faultId) => {
    setFaults((prevFaults) => {
      const updatedFaults = prevFaults.filter((fault) => fault.id !== faultId);
      localStorage.setItem("faults", JSON.stringify(updatedFaults)); // Update localStorage
      return updatedFaults;
    });
  };
  
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
  const generateRandomDate = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return new Date(
      startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
    )
      .toISOString()
      .slice(0, 10); // Format as YYYY-MM-DD
  };

  // Function to generate maintenance data
  const generateMaintenanceData = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const lastMaintenance = generateRandomDate("2024-01-01", "2024-12-31");
      const predictiveMaintenance = generateRandomDate("2024-12-01", "2025-12-31");
      return {
        id: index + 1,
        name: ["Axle", "Brake Pads", "Gearbox", "Traction Motor", "Coupler"][index],
        lastMaintenance,
        predictiveMaintenance,
      };
    });
  };

  // State for maintenance data, cost, and time since last maintenance
  const [maintenanceData, setMaintenanceData] = useState(generateMaintenanceData());
  const [timeSinceLastMaintenance, setTimeSinceLastMaintenance] = useState("");

  // Function to update all data
  const updateData = () => {
    // Generate new maintenance data
    const newMaintenanceData = generateMaintenanceData();
    setMaintenanceData(newMaintenanceData);

    // Calculate random total maintenance cost
    // const cost = Math.floor(Math.random() * 50000) + 10000; // Between 10,000 and 60,000
    // setTotalCost(cost);

    // Calculate time since the most recent maintenance
    const recentDate = newMaintenanceData
      .map((item) => new Date(item.lastMaintenance))
      .sort((a, b) => b - a)[0]; // Get the most recent last maintenance date
    const now = new Date();
    const diffTime = Math.abs(now - recentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffDays / 30);
    const days = diffDays % 30;

    setTimeSinceLastMaintenance(`${months} months, ${days} days`);
  };

  // Use effect to refresh data every 3 seconds
  useEffect(() => {
    updateData(); // Initial data load
    const interval = setInterval(updateData, 2000); // Refresh every 3 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="bg-customColor-otherpagesbackground w-auto flex flex-col items-center py-8">
      <div
        className="bg-customColor-rmcardbackground rounded-lg shadow-xl 
      p-4 md:p-6 lg:p-8 
      w-full max-w-[1300px] lg:min-w-[1300px]"
      >
        {/* Header */}
        <div className="flex flex-wrap justify-center items-center mb-8 md:justify-between">
        <button
            onClick={startFan}
            className={`${
              isFanOn? "bg-gray-400":"bg-[#387A79] hover:bg-teal-600"
            } text-white hidden md:block px-6 py-2 rounded-3xl transition-all duration-300`}
          >
            Start Monitoring
          </button>
          <h1 className="text-lg md:text-2xl lg:text-3xl font-medium text-gray-700 text-center">
            MAINTENANCE SCHEDULE
          </h1>
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

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 lg:gap-6">
          {/* Left: Maintenance of Components */}
          <div
            className="col-span-1 md:col-span-2
              bg-white rounded-lg shadow-md p-4 flex flex-col relative"
          >
            <h2 className="text-base md:text-xl font-normal text-[#387A79] absolute md:left-6 top-4 lg:left-1/2 transform lg:-translate-x-1/2">
              MAINTENANCE OF COMPONENTS
            </h2>
            <div className="mt-16 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-500">
                  <tr>
                    <th className="border p-3 bg-[#7BB299] text-white">Serial No</th>
                    <th className="border p-3 bg-[#7BB299] text-white">Component Name</th>
                    <th className="border p-3 bg-[#7BB299] text-white">Last Maintenance</th>
                    <th className="border p-3 bg-[#7BB299] text-white">
                      Predictive Maintenance
                    </th>
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  {maintenanceData.map((item) => (
                    <tr
                      key={item.id}
                      className="odd:bg-white even:bg-gray-50"
                      style={{ marginBottom: "8px" }}
                    >
                      <td className="border p-4">{item.id}</td>
                      <td className="border p-4">{item.name}</td>
                      <td className="border p-4">{item.lastMaintenance}</td>
                      <td className="border p-4">{item.predictiveMaintenance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col space-y-4 md:space-y-6">
          
            <div className="bg-[#4D8379] rounded-lg shadow-md p-4 md:p-3 relative text-white h-full">
  {/* Card Header with Fault Icon */}
  <div className="flex justify-between items-center mb-2">
    <div>
      <h2 className="text-sm md:text-lg font-semibold ml-3">FAULT LOGGER</h2>
      <p className="text-xs md:text-lg ml-3 text-gray-300">
        {new Date().toLocaleDateString()}
      </p>
    </div>
    <FaExclamationTriangle className="text-white mr-1 text-lg md:text-2xl" />
  </div>

  {/* Fault List Section */}
  <div className="mt-4 h-[150px] overflow-y-auto px-3 rounded-lg text-white">
    {faults.length === 0 ? (
      <div className="flex items-center justify-center h-full">
        <p className="text-center text-sm md:text-xl font-semibold md:mb-10">
          No faults detected
        </p>
      </div>
    ) : (
      <ul>
        {faults.map((fault) => (
          <li
            key={fault.id}
            className="flex justify-between items-center bg-[#7BB299] p-2 rounded-md mb-2"
          >
            <div>
              <p className="text-xs md:text-lg font-medium">{fault.message}</p>
              <span className="text-xs md:text-base text-gray-200">
                {fault.timestamp}
              </span>
            </div>
            <button
              onClick={() => clearFault(fault.id)}
              className="bg-white px-3 py-1 ml-1 text-customColor-landingfooter rounded-full hover:bg-customColor-landingfooter hover:text-white"
            >
              ✔
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>


            {/* Time Since Last Maintenance */}
            <div className="bg-[#7BB299] rounded-lg shadow-md p-4 md:p-6 relative text-white h-full">
              <h2 className="text-sm md:text-lg font-semibold">
                TIME SINCE LAST MAINTENANCE
              </h2>
              <div className="mt-4 h-[80px] md:h-[100px] rounded-lg flex items-center justify-center text-[30px] md:text-[35px] text-white">
                {timeSinceLastMaintenance}
              </div>
              <FaClock size={24} className="absolute top-5 right-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedules;