import React, { useState, useEffect } from 'react';
import Navbar from "../../components/NavbarAfter";
import Footer from "../../components/Footer";
import { useParams } from 'react-router-dom'; 
import axios from 'axios'; 

const VehicleDetails = () => {
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
      // Send a PUT request to update the vehicle details
      const res = await axios.put(`/api/profile/vehicle/${v_id}`, formData,{
        headers: {
          "x-auth-token": token,
        },
      });
      console.log(res.data); // Log the updated vehicle details
    } catch (err) {
      console.error(err.response.data);
    }
  };

  if (!vehicle) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Vehicle Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for editing vehicle details */}
        <input type="text" name="make" value={formData.make} onChange={handleChange} />
        {/* Other input fields go here */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default VehicleDetails;
