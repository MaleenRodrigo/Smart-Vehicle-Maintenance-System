import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavbarAfter";
import Footer from "../../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const token = localStorage.getItem("token");

const Profile = () => {
  const [vehicleOwner, setVehicleOwner] = useState(null);
  const [profile, setProfile] = useState(null);
  const [confirmDelete, setconfirmDelete] = useState(false);

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
    if (!updatedOwnerInfo.name || !updatedOwnerInfo.email || !updatedOwnerInfo.phone || !updatedProfile.nic || !updatedProfile.address) {
      alert("All fields are required.");
      return;
    }

    if (!updatedOwnerInfo.name || !updatedOwnerInfo.name.trim().includes(' ')) {
      alert("Name should contain at least two parts.");
      return;
    }
  
    const nicPattern = /[0-9]{9}[vVxX]|[0-9]{12}/;
    if (!nicPattern.test(updatedProfile.nic)) {
      alert("NIC should be 9 digits followed by 'v', 'V', 'x', 'X' or 12 digits.");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(updatedOwnerInfo.phone)) {
      alert("Phone number should be exactly 10 digits.");
      return;
    }
  
    const expiryDate = new Date(updatedProfile.expirydate);
    const currentDate = new Date();
    if (expiryDate <= currentDate) {
      alert("Expiry date is in the past. Please enter a valid expiry date.");
      return;
    }
  
    try {
      const profileResponse = await axios.post("/api/profile", updatedProfile, {
        headers: {
          "x-auth-token": token,
        },
      });
      setProfile(profileResponse.data);
  
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

  function formatDateToISO(dateString) {
      const date = new Date(dateString);

      if (isNaN(date.getTime())) {
          return null;
      } else {
          const formattedDate = date.toISOString().split('T')[0];
          return formattedDate;
      }
  }

  const handleDeleteConfirmation = () => {
    setconfirmDelete(true); 
  };

  const handleCancelLogout = () => {
    setconfirmDelete(false); 
  };

  const handleconfirmDelete = () => {
    deleteProfile(); 
    setconfirmDelete(false); 
  };


  return (
    <>
      <Navbar />
      <br />
      <div className="text-center">
        <h3 className="text-3xl font-semibold leading-7 text-gray-900 mt-28 mb-10">
          Update Information
        </h3>
        <br/>
      </div>
      

<form class="max-w-md mx-auto">
  <div class="relative z-0 w-full mb-5 group">
      <input type="text" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"  required value={updatedOwnerInfo.name}
      onChange={(e) => handleInputChange(e, "name", "owner")}/>
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name</label>
  </div>

  <div class="relative z-0 w-full mb-5 group">
    <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required value={updatedOwnerInfo.email}
    onChange={(e) => handleInputChange(e, "email", "owner")}/>
    <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email Address</label>
</div>

<div class="relative z-0 w-full mb-5 group">
<input
  type="text"
  name="floating_email"
  id="floating_email"
  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
  required
  value={updatedProfile.nic}
  pattern="[0-9]{9}[vVxX]|[0-9]{12}" 
  title="NIC should be 9 digits followed by 'v', 'V', 'x', 'X' or 12 digits"
  onChange={(e) => handleInputChange(e, "nic")}
/>
    <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">National Identity Card</label>
</div>
  
 
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required value={updatedProfile.address}
        onChange={(e) => handleInputChange(e, "address")}/>
        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Permanent Address</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required value={updatedOwnerInfo.phone}
          onChange={(e) => handleInputChange(e, "phone", "owner")}/>
        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
    </div>
  </div>
  

  <h3 className="text-center text-xl font-semibold leading-7 text-gray-900 mt-8 mb-10">Update Information</h3>

  <div class="relative z-0 w-full mb-5 group">
  <input
    type="text"
    name="floating_email"
    id="floating_email"
    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    required
    value={updatedProfile.licensenumber}
    pattern="[A-Za-z]{1}\d{7}"
    title="License number should start with 1 letter followed by 7 "
    onChange={(e) => handleInputChange(e, "licensenumber")}
  />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Driving License Number</label>
  </div>
    
  
    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative z-0 w-full mb-5 group">
          <input type="date" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required value=
          {formatDateToISO(updatedProfile.issueddate)}
          onChange={(e) => handleInputChange(e, "issueddate")}/>
          <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Issued Date</label>
      </div>
      
      <div class="relative z-0 w-full mb-5 group">
          <input type="date" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required value={formatDateToISO(updatedProfile.expirydate)}
            onChange={(e) => handleInputChange(e, "expirydate")}/>
          <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Expiry Date</label>
      </div>
    </div>
  
</form>

      
      
      <div className="flex flex-col items-center mt-6 mb-14 space-y-4">
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={updateInfo}
        >
          Update Info
        </button>

        <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={handleDeleteConfirmation}
          >
            Delete Profile
          </button>
          <Link to="/Profile" className="block mt-2">
            <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 mb-14">
              Go back
            </button>
          </Link>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="relative z-10 p-6 bg-white shadow-md rounded-xl">
              <p className="mb-4">
                Are you sure you want to delete account?
              </p>
              <div className="flex justify-center">
                <button
                  className="mr-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
                  onClick={handleconfirmDelete} 
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                  onClick={handleCancelLogout} 
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

export default Profile;
