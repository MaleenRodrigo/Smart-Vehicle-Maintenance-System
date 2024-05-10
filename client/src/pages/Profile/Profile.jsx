import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavbarAfter";
import Footer from "../../components/Footer";
import axios from "axios";
import CreateProfile from "./CreateProfile";
import { Link } from "react-router-dom";
import CreditCard from "../../components/CreditCard";

const token = localStorage.getItem("token");
const userID = localStorage.getItem("userId");

const Profile = () => {
  const [vehicleOwner, setVehicleOwner] = useState(null);
  const [profile, setProfile] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [confirmLogout, setconfirmLogout] = useState(false);

  // State to hold remaining time
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const getCards = async () => {
    console.log("userID=>", userID);

    try {
      const res = await axios.get(
        "/api/cards/user/" + localStorage.getItem("userId")
      );
      console.log(res);
      // console.log(res);
      setCards(res.data?.cards);
    } catch (err) {
      console.error("Error fetching cards");
    }
  };

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
        // Calculate remaining time when profile data is fetched
        calculateRemainingTime(profileResponse.data.expirydate);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    if (token) {
      fetchUserData();
      getCards();
    }
  }, [token]);

  // Function to calculate remaining time
  const calculateRemainingTime = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const difference = expiry.getTime() - now.getTime();
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
    setRemainingTime(days);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    getCards();
  }, [token]);

  // Logout check
  const handleDeleteConfirmation = () => {
    setconfirmLogout(true); 
  };

  const handleCancelLogout = () => {
    setconfirmLogout(false); 
  };

  const handleconfirmLogout = () => {
    logout(); 
    setconfirmLogout(false); 
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-20 ">

      {/* Start Profile Details */}
      <div class="flex justify-center mt-12">
        <div class="max-w-xl p-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-white-800 dark:border-gray-700 items-center text-center">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{vehicleOwner && vehicleOwner.name}'s Profile</h5>

            <span class="mt-1 text-sm leading-7 text-gray-700 sm:col-span-2 sm:mt-0">Email : {vehicleOwner && vehicleOwner.email}</span><br/>
            <span class="mt-1 text-sm leading-7 text-gray-700 sm:col-span-2 sm:mt-0">Contact Number : {vehicleOwner && vehicleOwner.phone}</span><br/>
            <span class="mt-1 text-sm leading-7 text-gray-700 sm:col-span-2 sm:mt-0">NIC : {profile && profile.nic}</span><br/>
            <p class="mt-1 text-sm leading-7 text-gray-700 sm:col-span-2 sm:mt-0">Address : {profile && profile.address}</p><br/>

            <span class="mt-1 text-sm leading-7 text-gray-700 sm:col-span-2 sm:mt-0">Created Date : {new Date(vehicleOwner && vehicleOwner.date).toLocaleDateString()}</span><br/>
            
            <Link to="/UpdateProfile" class="mt-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Update Profile
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Link>
        </div>
      </div>
      {/* End Profile Details */}

        
      
      {/* License Card start */}
      <div class="my-10 space-y-16">
      <div class="relative m-auto h-48 w-80 rounded-xl bg-gradient-to-r from-gray-500 to-gray-400 text-white shadow-2xl transition-transform sm:h-56 sm:w-96 ">
        <div class="absolute top-4 w-full px-8 sm:top-8">
          <div class="flex justify-between">
            <div class="">
              <p class="font-light">Name</p>
              <p class="font-medium tracking-widest">{ vehicleOwner && vehicleOwner.name}</p>
            </div>

            {remainingTime !== null && remainingTime <= 30 && (
          
              <h1 class="text-red-600 font-bold" >Update Licenses</h1>
            )}
          
          </div>
          <div class="pt-1">
            <p class="font-light">Driving License Number</p>
            <p class="tracking-more-wider font-medium">{profile && profile.licensenumber}</p>
          </div>
          <div class="pt-4 pr-6 sm:pt-6">
            <div class="flex justify-between">
              <div class="">
                <p class="text-xs font-light">Valid From</p>
                <p class="text-base font-medium tracking-widest">{new Date(profile && profile.issueddate).toLocaleDateString()}</p>
              </div>
              <div class="">
                <p class="text-xs font-light">Expiry</p>
                <p class="text-base font-medium tracking-widest">{new Date(profile && profile.expirydate).toLocaleDateString()}</p>
              </div>

              <div class="">
                <p class="text-xs font-light">Expires in</p>
                <p class="tracking-more-wider text-sm font-bold">{remainingTime !== null ? remainingTime : "Loading..."} days
                </p>

                
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      {/* License Card End */}


      {/* Buttons */}
      <div className="flex flex-col items-center mt-6 space-y-4">
        {/* Show Vehicle Buttons */}
        <Link to="/ShowVehicle">
          <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Show Vehicle
          </button>
        </Link>
        
        {/* Logout Buttons */}
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          onClick={handleDeleteConfirmation}
        >
          Logout
        </button>
        
      </div>
    </div>
    {/* Logout confirmation  */}
    {confirmLogout && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="relative z-10 p-6 bg-white shadow-md rounded-xl">
              <p className="mb-4">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-center">
                <button
                  className="mr-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
                  onClick={handleconfirmLogout} // Attach handleconfirmLogout function to onClick event
                >
                  Logout
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                  onClick={handleCancelLogout} // Attach handleCancelLogout function to onClick event
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End of Logout confirmation  */}

      
      <div className="justify-center flex w-full px-3 mb-6 lg:mb-0">
        <div className=" flex flex-col min-w-0 mt-6 break-words bg-white border-0 border-transparent border-solid shadow-xl :bg-slate-850 :shadow--xl rounded-2xl bg-clip-border">
          <div className="p-4 pb-0 mb-0 border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
            <div className="flex flex-wrap -mx-3">
              <div className="flex items-center flex-none w-1/2 max-w-full px-3">
                <h6 className="mb-0 dar:text-white">Payment Method</h6>
              </div>
              <div className="flex-none w-1/2 max-w-full px-3 text-right">
                <a
                  className="inline-block px-5 py-2.5 font-bold leading-normal text-center text-white align-middle transition-all bg-transparent rounded-lg cursor-pointer text-sm ease-in shadow-md bg-150 bg-gradient-to-tl from-zinc-800 to-zinc-700 :bg-gradient-to-tl :from-slate-750 :to-gray-850 hover:shadow-xs active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25"
                  href="javascript:;"
                  style={{ marginRight: 8 }}
                >
                  {" "}
                  {/* <i className="fas fa-plus"> </i>&nbsp;&nbsp;Add New Card */}
                  <Link to="/profile/cart">My Cart</Link>
                </a>
                <a
                  className="inline-block px-5 py-2.5 font-bold leading-normal text-center text-white align-middle transition-all bg-transparent rounded-lg cursor-pointer text-sm ease-in shadow-md bg-150 bg-gradient-to-tl from-zinc-800 to-zinc-700 dark:bg-gradient-to-tl dark:from-slate-750 dark:to-gray-850 hover:shadow-xs active:opacity-85 hover:-translate-y-px tracking-tight-rem bg-x-25"
                  href="javascript:;"
                >
                  {" "}
                  {/* <i className="fas fa-plus"> </i>&nbsp;&nbsp;Add New Card */}
                  <Link to="/profile/card">Add New Card</Link>
                </a>
              </div>
            </div>
          </div>
          <div className="flex-auto p-4">
            <div className="flex flex-wrap -mx-3">
              {cards.map((card) => (
                <CreditCard card={card} key={card?.id} refersher={getCards} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
