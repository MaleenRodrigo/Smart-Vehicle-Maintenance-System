import React, { useState, useEffect } from "react";
import ApiHelper from "../../helper/apiHelper";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import Navbar from "../../components/NavbarAfter";
import Footer from "../../components/Footer";

const api = new ApiHelper(); // Initialize an instance of ApiHelper

const ShowVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [remainingTime, setRemainingTime] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isResponsiveSearch, setIsResponsiveSearch] = useState(false); 

  const [confirmDelete, setConfirmDelete] = useState(false); 
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await api.get("profile/vehicles", {}, token);
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching vehicles:", error.message);
      }
    };

    fetchVehicles();
  }, []);

  const handleDelete = async (vehicleId) => {
    // Store the vehicle ID to delete in state and show the confirmation modal
    setVehicleToDelete(vehicleId);
    setConfirmDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`profile/vehicle/${vehicleToDelete}`, token);
      setVehicles(vehicles.filter((vehicle) => vehicle._id !== vehicleToDelete));
      setConfirmDelete(false); // Hide the confirmation modal after deletion
    } catch (error) {
      console.error("Error deleting vehicle:", error.message);
    }
  };

  const handleCancelDelete = () => {
    // Hide the confirmation modal
    setConfirmDelete(false);
  };

  // Filter vehicles based on the search term
  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateRemainingTime = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const difference = expiry.getTime() - now.getTime();
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
    return days;
};
function formatDateToISO(dateString) {
  // Create a new Date object from the provided date string
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
      // If the date is invalid, return null or throw an error
      return null;
  } else {
      // Format the date as "YYYY-MM-DD"
      const formattedDate = date.toISOString().split('T')[0];
      return formattedDate;
  }
}


const generateReportPDF = () => {
  const doc = new jsPDF();

  doc.text("Vehicles Report", 105, 10, { align: 'center' }); // Center the title horizontally

  let startY = 20;
  doc.setFontSize(12);

  // Table headers
  const headers = [
    "Make",
    "Model",
    "Year",
    "Registration Number",
    "Fuel Type",
    "Daily Usage",
    "License Number",
    "Insurance Number",
    "Insurance Type"
  ];

  const data = filteredVehicles.map(({ make, model, year, registrationnumber, fueltype, dailyusage, licensenumber, insurancenumber, insurancetype }) => [
    make,
    model,
    year,
    registrationnumber,
    fueltype,
    dailyusage,
    licensenumber,
    insurancenumber,
    insurancetype
  ]);

  doc.autoTable({
    startY,
    head: [headers],
    body: data,
    theme: 'grid',
    styles: {
      fontSize: 10,
      overflow: 'linebreak',
    },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 20 },
      2: { cellWidth: 15 },
      3: { cellWidth: 25 },
      4: { cellWidth: 20 },
      5: { cellWidth: 20 },
      6: { cellWidth: 20 },
      7: { cellWidth: 25 },
      8: { cellWidth: 25 }
      
    },
  });

  doc.save("vehicles_report.pdf");
};


  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="mt-28 text-2xl font-bold mb-4">Vehicles</h1>

      
      
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Search by make"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsResponsiveSearch(true)}
          onBlur={() => setIsResponsiveSearch(false)}
          className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4"
        />
        {isResponsiveSearch && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            
          </div>
        )}
      </div>


      {filteredVehicles.length === 0 ? (
        <p>No vehicles available</p>
      ) : (
        <ul className="w-full max-w-md">
          {filteredVehicles.map((vehicle) => (
            <li key={vehicle._id} >
              
              <div class="flex justify-center mt-12">
              <div class="max-w-xl p-16 pb-8 pt-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-white-800 dark:border-gray-700 items-center text-center">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{vehicle.make} - {vehicle.model}</h5>

                  <span class="mt-1 text-sm leading-7 text-gray-700 sm:col-span-2 sm:mt-0">Registration Number : {vehicle.registrationnumber}</span><br/>
                  

                  <span class="mt-1 text-sm leading-7 text-gray-700 sm:col-span-2 sm:mt-0">Fuel Type : {vehicle.fueltype}</span><br/>

                  <span class="mt-1 text-sm leading-7 text-gray-700 sm:col-span-2 sm:mt-0">Average Daily Usage : {vehicle.dailyusage} Km</span><br/><br/>

                  <span class="mt-1 text-sm leading-7 sm:col-span-2 sm:mt-0" style={{ color: calculateRemainingTime(vehicle.licenseexpiry) < 30 ? 'red' : 'inherit', fontWeight: calculateRemainingTime(vehicle.licenseexpiry) < 30 ? 'bold' : 'normal' }}>License Expires in: {calculateRemainingTime(vehicle.licenseexpiry)} days</span><br/>

                  <span class="mt-1 text-sm leading-7 sm:col-span-2 sm:mt-0" style={{ color: calculateRemainingTime(vehicle.expirydate) < 30 ? 'red' : 'inherit', fontWeight: calculateRemainingTime(vehicle.expirydate) < 30 ? 'bold' : 'normal' }}>Insurance Expires in : {calculateRemainingTime(vehicle.expirydate)} days</span><br/>

                  
                  <button onClick={() => handleDelete(vehicle._id)} class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  Delete
                  </button>
                  <Link to={`/UpdateVehicle/${vehicle._id}`} className="block ">
                    <button class="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Update
                    </button>
                  </Link>
                </div>
              </div>
              
            </li>
          ))}
        </ul>
      )}
      <Link to="/AddVehicles" className="block mt-4">
        <button class="mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Add Vehicle
        </button>
      </Link>
      <Link to="/Profile" className="block ">
        <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 mb-14 mt-5">
          Go back
        </button>
      </Link>

      <button
            onClick={generateReportPDF}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Download Report
          </button>
    </div>

    {confirmDelete && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="relative z-10 p-6 bg-white shadow-md rounded-xl">
              <p className="mb-4">
                Are you sure you want to delete this vehicle?
              </p>
              <div className="flex justify-center">
                <button
                  className="mr-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
                  onClick={handleConfirmDelete} 
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                  onClick={handleCancelDelete} 
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
    )}


    <Footer />
    </>
  );
};

export default ShowVehicle;
