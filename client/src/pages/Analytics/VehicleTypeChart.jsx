import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategorySclae,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategorySclae,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
function VehicleTypeChart() {
  const [vehicleTypes, setVehicleTypes] = useState({});

  useEffect(() => {
    fetch("../../../routes/api/rentalVehicleReport/vehicle-type-count")
      .then((response) => response.json())
      .then((data) => setVehicleTypes(data))
      .catch((err) => console.error(err));
  }, []);

  const chartData = {
    labels: Object.keys(vehicleTypes),
    datasets: [
      {
        label: "Number of Vehicles",
        data: Object.values(vehicleTypes),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Vehicle Type Distribution</h2>
      <Bar data={chartData} />
    </div>
  );
}

export default VehicleTypeChart;
