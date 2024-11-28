import React, { useState, useEffect } from "react";
import { FaRupeeSign, FaClock } from "react-icons/fa";

const Schedules = () => {
  // Function to generate random dates within a range
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
  const [totalCost, setTotalCost] = useState(0);
  const [timeSinceLastMaintenance, setTimeSinceLastMaintenance] = useState("");

  // Function to update all data
  const updateData = () => {
    // Generate new maintenance data
    const newMaintenanceData = generateMaintenanceData();
    setMaintenanceData(newMaintenanceData);

    // Calculate random total maintenance cost
    const cost = Math.floor(Math.random() * 50000) + 10000; // Between 10,000 and 60,000
    setTotalCost(cost);

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
          <button className="bg-[#387A79] text-white hidden md:block lg:block px-6 py-2 rounded-3xl hover:bg-teal-600">
            Start Monitoring
          </button>
          <h1 className="text-lg md:text-2xl lg:text-3xl font-medium text-gray-700 text-center">
            MAINTENANCE SCHEDULE
          </h1>
          <button className="bg-[#BE4848] text-white hidden md:block lg:block px-6 py-2 rounded-3xl hover:bg-red-600">
            Stop Monitoring
          </button>
        </div>

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
                    <th className="border p-2 bg-[#7BB299] text-white">Serial No</th>
                    <th className="border p-2 bg-[#7BB299] text-white">Component Name</th>
                    <th className="border p-2 bg-[#7BB299] text-white">Last Maintenance</th>
                    <th className="border p-2 bg-[#7BB299] text-white">
                      Predictive Maintenance
                    </th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  {maintenanceData.map((item) => (
                    <tr
                      key={item.id}
                      className="odd:bg-white even:bg-gray-50"
                      style={{ marginBottom: "8px" }}
                    >
                      <td className="border p-3">{item.id}</td>
                      <td className="border p-3">{item.name}</td>
                      <td className="border p-3">{item.lastMaintenance}</td>
                      <td className="border p-3">{item.predictiveMaintenance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col space-y-4 md:space-y-6">
            {/* Total Maintenance Cost */}
            <div className="bg-[#4D8379] rounded-lg shadow-md p-4 md:p-6 relative text-white h-full">
              <h2 className="text-sm md:text-lg font-semibold">
                TOTAL MAINTENANCE COST
              </h2>
              <div className="mt-4 h-[80px] md:h-[100px] rounded-lg flex items-center justify-center text-[40px] text-white">
                ₹ {totalCost.toLocaleString()}
              </div>
              <FaRupeeSign size={24} className="absolute top-5 right-4" />
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