import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavbarAfter";
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

        <div className="text-center">
          <h3 className=" text-3xl font-semibold leading-7 text-gray-900 mt-12 mb-20">
          {vehicleOwner && vehicleOwner.name}'s Profile
          </h3>
        </div>
        
        {/* Start Profile Details */}
        <div className="mt-6 border-t border-gray-100 flex flex-col items-center space-y-4">
          <dl className="divide-y divide-gray-100">
            
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {vehicleOwner && vehicleOwner.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Phone number
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {vehicleOwner && vehicleOwner.phone}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Date registered
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {new Date(vehicleOwner && vehicleOwner.date).toLocaleDateString()}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                National Identity Card
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {profile && profile.nic}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Permanent Address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {profile && profile.address}
              </dd>
            </div>
            
            
          </dl>
        </div>
         {/* End Profile Details */}

        

        {/* License Card start */}
        <div class="my-10 space-y-16">
        <div class="relative m-auto h-48 w-80 rounded-xl bg-gradient-to-r from-gray-500 to-gray-400 text-white shadow-2xl transition-transform sm:h-56 sm:w-96 sm:hover:scale-110">
          <div class="absolute top-4 w-full px-8 sm:top-8">
            <div class="flex justify-between">
              <div class="">
                <p class="font-light">Name</p>
                <p class="font-medium tracking-widest">{ vehicleOwner && vehicleOwner.name}</p>
              </div>

              {remainingTime !== null && remainingTime <= 30 && (
                <button class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  Add New Card
                </button>
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

          {/* Update Profile Buttons */}
          <Link to="/UpdateProfile">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update Profile
            </button>
          </Link>

          {/* Show Vehicle Buttons */}
          
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Show Vehicle
            </button>
          
          
          {/* Logout Buttons */}
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDeleteConfirmation}
          >
            LogOut
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

      
      <div className="flex w-full justify-end px-3 mb-6 lg:mb-0">
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
    </>
  );
};

export default Profile;
