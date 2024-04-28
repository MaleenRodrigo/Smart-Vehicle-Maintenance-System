import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavbarAfter";
import axios from "axios";
import CreateProfile from "./CreateProfile";
import { Link } from "react-router-dom";

const token = localStorage.getItem("token");

const Profile = () => {
  const [vehicleOwner, setVehicleOwner] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const vehicleOwnerResponse = await axios.get("/api/auth", {
          headers: {
            "x-auth-token": token,
          },
        });
        setVehicleOwner(vehicleOwnerResponse.data);
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
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

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

  if (!profile && profile !== undefined) {
    return (
      <div>
        <CreateProfile />
      </div>
    );
  }
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-20 ">
        <div className="text-center">
          <h3 className=" text-3xl font-semibold leading-7 text-gray-900 mt-12 mb-20">
            Vehicle Owner Information
          </h3>
        </div>
        <div className="mt-6 border-t border-gray-100 ">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {vehicleOwner.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {vehicleOwner.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Phone number
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {vehicleOwner.phone}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Date registered
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {new Date(vehicleOwner.date).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>

        {profile && (
          <>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                NIC
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {profile.nic}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {profile.address}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                License Number
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {profile.licensenumber}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Expiry Date
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {new Date(profile.expirydate).toLocaleDateString()}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Issued Date
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {new Date(profile.issueddate).toLocaleDateString()}
              </dd>
            </div>
          </>
        )}

<div className="flex flex-col items-center mt-6 space-y-4">
            <Link to="/UpdateProfile">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update Profile
              </button>
            </Link>
            <Link to="/ShowVehicle">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Show Vehicle
              </button>
            </Link>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={deleteProfile}>
              Delete Profile
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>
              LogOut
            </button>
          </div>
          </div>
    </>
  );
};

export default Profile;
