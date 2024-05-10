import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import toast from "react-hot-toast";
import { useHistory, useNa } from "react-router-dom";

const success = () => toast.success("Reservation submitted successfully");
const errorNotify = () => toast.error("Failed to submit reservation");

function Reservation() {
  const [formData, setFormData] = useState({
    ownername: "",
    vehiclenum: "",
    services: [],
    servicedate: "",
  });

  const { ownername, vehiclenum, services, servicedate } = formData;

  const onChange = (e) => {
    if (e.target.type === "checkbox") {
      const selectedService = e.target.value;
      const isChecked = e.target.checked;

      setFormData((prevFormData) => ({
        ...prevFormData,
        services: isChecked
          ? [...prevFormData.services, selectedService]
          : prevFormData.services.filter(
              (service) => service !== selectedService
            ),
      }));
    } else {
      // Handle date input separately
      if (e.target.id === "servicedate") {
        setFormData({
          ...formData,
          servicedate: e.target.value, // Update servicedate directly with the date string
        });
      } else {
        // For other inputs, update formData as before
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      }
    }
  };

  //   const onSubmit = async (e) => {
  //     e.preventDefault();
  //     console.log(formData);
  //     // You can proceed with form submission or further processing here

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/reservation",
        formData
      );
      alert("Reservation added!!");
      console.log("res => ", response);
      // Clear form after successful submission
      setFormData({
        ownername: "",
        vehiclenum: "",
        services: [],
        servicedate: "",
      });
    } catch (error) {
      console.error("Failed to submit reservation:", error);
      errorNotify();
    }
  };
  //   };

  return (
    <div>
      <Navbar />
      <section className="bg-white py-8 md:py-20">
        <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
          <h3>Happy Reservation</h3>
          <div className="mb-5">
            <label
              htmlFor="ownername"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Owner's Name
            </label>
            <input
              type="text"
              id="ownername"
              value={ownername}
              onChange={onChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="vehiclenum"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your Vehicle Number
            </label>
            <input
              type="text"
              id="vehiclenum"
              value={vehiclenum}
              onChange={onChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          {/* Services checkboxes */}
          <div>
            <label
              htmlFor="services"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Select Services
            </label>
            <br />

            <div className="flex items-center mb-4">
              <input
                id="checkbox-1"
                type="checkbox"
                value="Oil Replacement"
                onChange={onChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="checkbox-1"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Oil Replacement
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                id="checkbox-2"
                type="checkbox"
                value="Tyre Replacement"
                onChange={onChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="checkbox-2"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Tyre Replacement
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                id="checkbox-3"
                type="checkbox"
                value="Body Wash"
                onChange={onChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label
                htmlFor="checkbox-3"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Body Wash
              </label>
            </div>
          </div>

          <br />
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              type="date"
              id="servicedate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              value={servicedate}
              onChange={onChange}
            />
          </div>

          <br />
          <br />
          <br />
          <br />
          <button
            type="submit"
            // onClick={() => navigate("/reservationStatus")}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default Reservation;
