// import React, { useState } from 'react';
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";

// function ReservationStatus() {
//   const [formData, setFormData] = useState({
//     owner: "",
//     vehiclenum: "",
//     services: [],
//     servicedate: "",
//   });

//   const { owner, vehiclenum, services, servicedate } = formData;

//   const onChange = (e) => {
//     const { id, value } = e.target;
//     setFormData({
//       ...formData,
//       [id]: value,
//     });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     // You can proceed with form submission or further processing here
//   };

//   return (
//     <div>
//         <Navbar />

//       <div className="mb-5">
//         <label
//           htmlFor="owner"
//           className="block mb-2 text-sm font-medium text-gray-900"
//         >
//           Owner's Name
//         </label>
//         <input
//           type="text"
//           id="owner"
//           value={owner}
//           onChange={onChange}
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//           required
//         />
//       </div>

//       <div className="mb-5">
//         <label
//           htmlFor="vehiclenum"
//           className="block mb-2 text-sm font-medium text-gray-900"
//         >
//           Your Vehicle Number
//         </label>
//         <input
//           type="text"
//           id="vehiclenum"
//           value={vehiclenum}
//           onChange={onChange}
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//           required
//         />
//       </div>

//       {/* Services checkboxes */}
//       {/* Your code for services checkboxes goes here */}

//       <div className="mb-5">
//         <label
//           htmlFor="servicedate"
//           className="block mb-2 text-sm font-medium text-gray-900"
//         >
//           Service Date
//         </label>
//         <input
//           type="date"
//           id="servicedate"
//           value={servicedate}
//           onChange={onChange}
//           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//         />
//       </div>

//       <button
//         type="submit"
//         onClick={onSubmit}
//         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//       >
//         Submit
//       </button>

//       {/* Display submitted data */}
//       <div>
//         <h2>Submitted Data</h2>
//         <p>Owner's Name: {owner}</p>
//         <p>Vehicle Number: {vehiclenum}</p>
//         {/* Add similar lines for services and servicedate */}
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default ReservationStatus;

import React, { useState, useEffect } from "react";
import axios from "axios";

const ReservationStatus = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Define a function to fetch reservations from the API
    const fetchReservations = async () => {
      try {
        const response = await axios.get("/api/users/res"); // Adjust the endpoint URL accordingly
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    // Call the function to fetch reservations when the component mounts
    fetchReservations();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h2>Reservation List</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation._id}>
            <h3>{reservation.ownername}</h3>
            <p>Vehicle Number: {reservation.vehiclenum}</p>
            <p>Services: {reservation.services.join(", ")}</p>
            <p>
              Service Date:{" "}
              {new Date(reservation.servicedate).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationStatus;
