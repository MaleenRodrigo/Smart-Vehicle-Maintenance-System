import React, { useState, useEffect } from "react";
import ApiHelper from "../../helper/apiHelper";
import { Link } from "react-router-dom";
import Navbar from "../../components/NavbarAfter";
import Footer from "../../components/Footer";

const api = new ApiHelper(); // Initialize an instance of ApiHelper

const ShowVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [remainingTime, setRemainingTime] = useState(null);

  const [searchTerm, setSearchTerm] = useState(""); // State variable for the search term
  const [isResponsiveSearch, setIsResponsiveSearch] = useState(false); // State variable for responsive search box

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        // Fetch vehicles using the ApiHelper get method
        const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
        const data = await api.get("profile/vehicles", {}, token);
        setVehicles(data); // Update the vehicles state with the fetched data
        

      } catch (error) {
        console.error("Error fetching vehicles:", error.message);
      }
    };

    fetchVehicles(); // Call the fetchVehicles function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once

  const handleDelete = async (vehicleId) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`profile/vehicle/${vehicleId}`, token);
      setVehicles(vehicles.filter((vehicle) => vehicle._id !== vehicleId));
    } catch (error) {
      console.error("Error deleting vehicle:", error.message);
    }
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
  return (
    <>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="mt-28 text-2xl font-bold mb-4">Vehicles</h1>

      
      {/* <div className="relative w-full max-w-md">
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
      </div> */}


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

                  <span class="mt-1 text-sm leading-7 text-gray-700 sm:col-span-2 sm:mt-0">Average Daily Usage : {vehicle.dailyusage}</span><br/><br/>

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
    </div>
    </>
  );
};

export default ShowVehicle;
