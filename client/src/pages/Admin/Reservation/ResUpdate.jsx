import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import ResponsiveDrawer from "../../Layout/Drawer";


const ResUpdate = () => {
  const location = useLocation();
  const res_ID = location.state?.res_Id; // Use optional chaining to avoid errors if state or res_Id is undefined
  const { res_Id } = useParams(); // Rename res_Id from URL to avoid variable name conflict
  const [resUpdate, setResUpdate] = useState({
    ownername: "",
    vehiclenum: "",
    services: [],
    servicedate: "",
  });

  // Fetch reservation details based on ID
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/reservation/get/${res_ID}`
        );
        setResUpdate(response.data.reservation); // Set reservation data in the state
      } catch (error) {
        console.error("Error fetching reservation:", error);
      }
    };

    fetchReservation();
  }, [res_Id]); // Fetch reservation data on component mount and when ID changes

  // Handle input changes
  const handleChange = (e) => {
    setResUpdate({ ...resUpdate, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:5000/api/reservation/update/${res_ID}`,
        resUpdate
      );
      console.log(response.data); // Log the response after updating reservation
      window.alert("Reservation Updated Successfully");
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  return (
    <ResponsiveDrawer>
      <div>
        <section className="bg-white light:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 light:text-light">
              Update Reservation
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="ownername"
                    className="block mb-2 text-sm font-medium text-gray-900 light:text-light"
                  >
                    Owner's Name
                  </label>
                  <input
                    type="text"
                    name="ownername"
                    id="ownername"
                    value={resUpdate.ownername}
                    onChange={handleChange}
                    className="bg-gray border border-gray-300 text-light-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-primary-500 light:focus:border-primary-500"
                    placeholder="Type owner's name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="vehiclenum"
                    className="block mb-2 text-sm font-medium text-gray-900 light:text-light"
                  >
                    Your Vehicle Number
                  </label>
                  <input
                    type="text"
                    name="vehiclenum"
                    id="vehiclenum"
                    value={resUpdate.vehiclenum}
                    onChange={handleChange}
                    className="bg-gray border border-gray-300 text-light-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-primary-500 light:focus:border-primary-500"
                    placeholder="Enter Vehicle Number"
                    required
                  />
                </div>
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                    value={resUpdate.servicedate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-bold text-center text-white bg-primary rounded-lg"
              >
                Update Reservation
              </button>
            </form>
          </div>
        </section>
      </div>
    </ResponsiveDrawer>
  );
}

export default ResUpdate

