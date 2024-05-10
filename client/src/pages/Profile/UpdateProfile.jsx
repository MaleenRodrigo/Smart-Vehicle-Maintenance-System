import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarAfter";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

const Profile = () => {
  const [vehicleOwner, setVehicleOwner] = useState(null);
  const [profile, setProfile] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({
    nic: "",
    address: "",
    licensenumber: "",
    expirydate: "",
    issueddate: "",
  });
  const [updatedOwnerInfo, setUpdatedOwnerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();

  const deleteProfile = async () => {
    try {
      const response = await axios.delete("/api/profile", {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log(response.data);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Error deleting profile:", error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicleOwnerResponse = await axios.get("/api/auth", {
          headers: {
            "x-auth-token": token,
          },
        });
        setVehicleOwner(vehicleOwnerResponse.data);
        setUpdatedOwnerInfo({
          name: vehicleOwnerResponse.data.name,
          email: vehicleOwnerResponse.data.email,
          phone: vehicleOwnerResponse.data.phone,
        });
      } catch (error) {
        console.error("Error fetching vehicle owner details:", error);
      }

      try {
        const profileResponse = await axios.get("/api/profile/me", {
          headers: {
            "x-auth-token": token,
          },
        });
        setProfile(profileResponse.data);
        setUpdatedProfile(profileResponse.data);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const updateInfo = async () => {
    const expiryDate = new Date(updatedProfile.expirydate);
    const currentDate = new Date();

    if (expiryDate <= currentDate) {
      alert("Expiry date is in the past. Please enter a valid expiry date.");
      return;
    }
    try {
      // Update profile
      const profileResponse = await axios.post("/api/profile", updatedProfile, {
        headers: {
          "x-auth-token": token,
        },
      });
      setProfile(profileResponse.data);

      // Update owner info
      const ownerInfoResponse = await axios.put(
        "/api/auth/update",
        updatedOwnerInfo,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setVehicleOwner(ownerInfoResponse.data);

      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile and owner info:", error);
    }
  };

  const handleInputChange = (e, fieldName, type = "profile") => {
    if (type === "profile") {
      setUpdatedProfile({
        ...updatedProfile,
        [fieldName]: e.target.value,
      });
    } else if (type === "owner") {
      setUpdatedOwnerInfo({
        ...updatedOwnerInfo,
        [fieldName]: e.target.value,
      });
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <div className="text-center">
        <h3 className="text-3xl font-semibold leading-7 text-gray-900 mt-28 mb-10">
          Update Information
        </h3>
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-center">
        <label className="text-sm font-medium leading-6 text-gray-900">
          Full Name
        </label>
        <input
          type="text"
          className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          value={updatedOwnerInfo.name}
          onChange={(e) => handleInputChange(e, "name", "owner")}
        />
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-center">
        <label className="text-sm font-medium leading-6 text-gray-900">
          Email Address
        </label>
        <input
          type="email"
          className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          value={updatedOwnerInfo.email}
          onChange={(e) => handleInputChange(e, "email", "owner")}
        />
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-center">
        <label className="text-sm font-medium leading-6 text-gray-900">
          Phone Number
        </label>
        <input
          type="text"
          className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          value={updatedOwnerInfo.phone}
          onChange={(e) => handleInputChange(e, "phone", "owner")}
        />
      </div>

      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-center">
        <label className="text-sm font-medium leading-6 text-gray-900">
          National Identity Card
        </label>
        <input
          type="text"
          className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          value={updatedProfile.nic}
          onChange={(e) => handleInputChange(e, "nic")}
        />
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-center">
        <label className="text-sm font-medium leading-6 text-gray-900">
          Permanent Address
        </label>
        <input
          type="text"
          className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          value={updatedProfile.address}
          onChange={(e) => handleInputChange(e, "address")}
        />
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-center">
        <label className="text-sm font-medium leading-6 text-gray-900">
          Driving License Number
        </label>
        <input
          type="text"
          className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          value={updatedProfile.licensenumber}
          onChange={(e) => handleInputChange(e, "licensenumber")}
        />
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-center">
        <label className="text-sm font-medium leading-6 text-gray-900">
          Driving Expiry Date
        </label>
        <input
          type="date"
          id = "expiryDate"
          className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          value={updatedProfile.expirydate}
          onChange={(e) => handleInputChange(e, "expirydate")}
        />
      </div>
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 text-center">
        <label className="text-sm font-medium leading-6 text-gray-900">
          Driving Issued Date
        </label>
        <input
          type="date"
          className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          value={updatedProfile.issueddate}
          onChange={(e) => handleInputChange(e, "issueddate")}
        />
      </div>
      
      <div className="flex flex-col items-center mt-6 space-y-4">
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={updateInfo}
        >
          Update Info
        </button>

        <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={deleteProfile}
          >
            Delete Profile
          </button>
      </div>
    </>
  );
};

export default Profile;
