import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavbarAfter";
import axios from "axios";

const token = localStorage.getItem("token");

const CreateProfile = () => {
  const navigate = useNavigate();

  const [newProfile, setNewProfile] = useState({
    nic: "",
    address: "",
    licensenumber: "",
    expirydate: "",
    issueddate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({
      ...newProfile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expiryDate = new Date(newProfile.expirydate);
    const currentDate = new Date();

    if (expiryDate <= currentDate) {
      alert("Expiry date is in the past. Please enter a valid expiry date.");
      return;
    }

    try {
      const response = await axios.post("/api/profile", newProfile, {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log("Profile created:", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <div className="text-center">
        <h3 className="text-3xl font-semibold leading-7 text-gray-900 mt-28 mb-10">
          Add Profile Information
        </h3>
      </div>
      <div className="flex justify-center items-center h-full">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              NIC
            </label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="nic"
              value={newProfile.nic}
              onChange={handleInputChange}
              required
              pattern="[0-9]{9}[vVxX]|[0-9]{12}"
              title="NIC should be 9 digits followed by 'v', 'V', 'x', 'X' or 12 digits"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="address"
              value={newProfile.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Driving License Number
            </label>
            <input
              type="text"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="licensenumber"
              value={newProfile.licensenumber}
              onChange={handleInputChange}
              required
              pattern="[A-Za-z]{1}\d{7}"
              title="License number should start with 1 letter followed by 7 digits"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Issued Date
            </label>
            <input
              type="date"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="issueddate"
              value={newProfile.issueddate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Expiry Date
            </label>
            <input
              type="date"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="expirydate"
              id="expirydate"
              value={newProfile.expirydate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex justify-center mt-12">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProfile;
