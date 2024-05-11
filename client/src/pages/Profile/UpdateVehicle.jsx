import React, { useState, useEffect } from 'react';
import Navbar from "../../components/NavbarAfter";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'; 
import axios from 'axios'; 

const VehicleDetails = () => {
  const navigate = useNavigate();
  const { v_id } = useParams(); // Get the vehicle ID from the URL params
  const [vehicle, setVehicle] = useState(null); // State to store the vehicle details
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    registrationnumber: '',
    fueltype: '',
    dailyusage: '',
    licensenumber: '',
    licenseissued: '',
    licenseexpiry: '',
    insurancenumber: '',
    insurancetype: '',
    expirydate: '',
    issueddate: '',
  }); // State to store form data for editing

  useEffect(() => {
    // Fetch vehicle details by ID when the component mounts
    const fetchVehicleDetails = async () => {
      try {
        const res = await axios.get(`/api/profile/vehicle/${v_id}`,{
          headers: {
            "x-auth-token": token,
          },
        });
        setVehicle(res.data);
        // Set the form data with the fetched vehicle details
        setFormData({
          make: res.data.make,
          model: res.data.model,
          year: res.data.year,
          registrationnumber: res.data.registrationnumber,
          fueltype: res.data.fueltype,
          dailyusage: res.data.dailyusage,
          licensenumber: res.data.licensenumber,
          licenseissued: res.data.licenseissued,
          licenseexpiry: res.data.licenseexpiry,
          insurancenumber: res.data.insurancenumber,
          insurancetype: res.data.insurancetype,
          expirydate: res.data.expirydate,
          issueddate: res.data.issueddate,
        });
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchVehicleDetails();
  }, [v_id]); // Fetch details whenever v_id changes

  const handleChange = (e) => {
    // Update form data when input fields change
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/profile/vehicle/${v_id}`, formData,{
        headers: {
          "x-auth-token": token,
        },
      });
      console.log(res.data); // Log the updated vehicle details
      navigate("/ShowVehicle");
    } catch (err) {
      console.error(err.response.data);
    }
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

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <><Navbar />

    <br />

    <div className="text-center">
      <h3 className="text-3xl font-semibold leading-7 text-gray-900 mt-28 mb-10">
        Update Vehicle
      </h3>
    </div>


    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        
    <div className="relative z-0 w-full mb-5 group">
      <label
        htmlFor="make"
        className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Make:
      </label>
      <input
        type="text"
        id="make"
        name="make"
        value={formData.make}
        onChange={handleChange}
        className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
        required
      />
    </div>

    <div class="grid md:grid-cols-2 md:gap-6">

    <div className="relative z-0 w-full mb-5 group">
      <label
        htmlFor="model"
        className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Model:
      </label>
      <input
        type="text"
        id="model"
        name="model"
        value={formData.model}
        onChange={handleChange}
        className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required
      />
    </div>

    <div className="relative z-0 w-full mb-5 group">
      <label
        htmlFor="year"
        className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Year:
      </label>
      <input
        type="text"
        id="year"
        name="year"
        value={formData.year}
        onChange={handleChange}
        pattern="\d{4}" title="Please enter a valid year (4 digits)"
        className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required
      />
    </div>
    </div>

    

    <div className="relative z-0 w-full mb-5 group">
      <label
        htmlFor="registrationnumber"
        className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Registration Number:
      </label>
      <input
        type="text"
        id="registrationnumber"
        name="registrationnumber"
        value={formData.registrationnumber}
        onChange={handleChange}
        pattern="[a-zA-Z]{3}-\d{4}|[a-zA-Z]{2}-\d{4}|\d{2}-\d{3}|\d{3}-\d{3}" title="Please enter a valid registration number"
        className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required
      />
    </div>

    <div class="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
      <label
        htmlFor="fueltype"
        className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Fuel Type:
      </label>
      <select
        id="fueltype"
        name="fueltype"
        value={formData.fueltype}
        onChange={handleChange}
        className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required
      >
        <option value="">Select Fuel Type</option>
        <option value="Gasoline">Petrol</option>
        <option value="Diesel">Diesel</option>
        <option value="Electric">Hybrid</option>
        <option value="Electric">Electric</option>
      </select>
    </div>

    

    <div className="relative z-0 w-full mb-5 group">
      <label
        htmlFor="dailyusage"
        className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Daily Usage in KM:
      </label>
      <input
        type="number"
        id="dailyusage"
        name="dailyusage"
        value={formData.dailyusage}
        onChange={handleChange}
        max="200"
        className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required
      />
    </div>
    </div>

    <div className="relative z-0 w-full mb-5 mt-12 group">
      <label
        htmlFor="licensenumber"
        className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        License Number:
      </label>
      <input
        type="text"
        id="licensenumber"
        name="licensenumber"
        value={formData.licensenumber}
        onChange={handleChange}
        className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required
      />
    </div>

    <div class="grid md:grid-cols-2 md:gap-6">

    <div className="relative z-0 w-full mb-5 group">
      <label
        htmlFor="licenseissued"
        className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        License Issued Date:
      </label>
      <input
        type="date"
        id="licenseissued"
        name="licenseissued"
        value={formatDateToISO(formData.licenseissued)}
        onChange={handleChange}
        className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required
      />
    </div>

    <div className="relative z-0 w-full mb-5 group">
      <label
        htmlFor="licenseexpiry"
        className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        License Expiry Date:
      </label>
      <input
        type="date"
        id="licenseexpiry"
        name="licenseexpiry"
        value={formatDateToISO(formData.licenseexpiry)}
        onChange={handleChange}
        className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required
      />
    </div>
    </div>

    <div className="relative z-0 w-full mb-5 mt-12 group">
      <label
        htmlFor="insurancenumber"
        className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Insurance Number:
      </label>
      <input
        type="text"
        id="insurancenumber"
        name="insurancenumber"
        value={formData.insurancenumber}
        onChange={handleChange}
        className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required
      />
    </div>

    <div className="relative z-0 w-full mb-5 group">
      <label
        htmlFor="insurancetype"
        className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Insurance Type:
      </label>
      <input
        type="text"
        id="insurancetype"
        name="insurancetype"
        value={formData.insurancetype}
        onChange={handleChange}
        className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required
      />
    </div>

    <div class="grid md:grid-cols-2 md:gap-6">
    <div className="relative z-0 w-full mb-5 group">
      <label
        htmlFor="issueddate"
        className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Insurance Issued Date:
      </label>
      <input
        type="date"
        id="issueddate"
        name="issueddate"
        value={formatDateToISO(formData.issueddate)}
        onChange={handleChange}
        className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required
      />
    </div>
    
    <div className="relative z-0 w-full mb-5 group">
      <label
        htmlFor="expirydate"
        className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        Insurance Expiry Date:
      </label>
      <input
        type="date"
        id="expirydate"
        name="expirydate"
        value={formatDateToISO(formData.expirydate)}
        onChange={handleChange}
        className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        required
      />
    </div>
    </div>
    <button
      type="submit"
      className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 block mx-auto mt-8 mb-4">
      Save Changes
    </button>

    <Link to="/ShowVehicle" className="block ">
      <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100  block mx-auto mb-16">
        Go back
      </button>
    </Link> 

  </form>
  <Footer />
  </>
  );
};

export default VehicleDetails;
