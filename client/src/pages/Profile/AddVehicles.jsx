import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiHelper from "../../helper/apiHelper";
import { Link } from "react-router-dom";
import Navbar from "../../components/NavbarAfter";
import Footer from "../../components/Footer";

const AddVehicle = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    registrationnumber: "",
    fueltype: "",
    dailyusage: "",
    licensenumber: "",
    licenseissued: "",
    licenseexpiry: "",
    insurancenumber: "",
    insurancetype: "",
    expirydate: "",
    issueddate: "",
  });

  const {
    make,
    model,
    year,
    registrationnumber,
    fueltype,
    dailyusage,
    licensenumber,
    licenseissued,
    licenseexpiry,
    insurancenumber,
    insurancetype,
    expirydate,
    issueddate,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const licenseexpiryDate = new Date(formData.licenseexpiry);
    const insuranceDate = new Date(formData.expirydate);
    const currentDate = new Date();

    if (licenseexpiryDate <= currentDate) {
      alert(
        "License expiry date is in the past. Please enter a valid expiry date."
      );
      return;
    } else if (insuranceDate <= currentDate) {
      alert(
        "Insurance expiry date is in the past. Please enter a valid expiry date."
      );
    }

    try {
      const api = new ApiHelper();
      const token = localStorage.getItem("token");
      await api.put("profile/vehicle", formData, token);

      navigate("/ShowVehicle");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <div className="text-center">
        <h3 className="text-3xl font-semibold leading-7 text-gray-900 mt-28 mb-10">
          Add Vehicle
        </h3>
      </div>

      <form onSubmit={onSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="make"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Make:
          </label>
          <input
            type="text"
            id="make"
            name="make"
            value={make}
            onChange={onChange}
            className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
          />
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="model"
              className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Model:
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={model}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="year"
              className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Year:
            </label>
            <input
              type="text"
              id="year"
              name="year"
              value={year}
              onChange={onChange}
              pattern="\d{4}"
              title="Please enter a valid year (4 digits)"
              className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
          </div>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="registrationnumber"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Registration Number:
          </label>
          <input
            type="text"
            id="registrationnumber"
            name="registrationnumber"
            value={registrationnumber}
            onChange={onChange}
            pattern="[a-zA-Z]{3}-\d{4}|[a-zA-Z]{2}-\d{4}|\d{2}-\d{3}|\d{3}-\d{3}"
            title="Please enter a valid registration number"
            className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
          />
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="fueltype"
              className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Fuel Type:
            </label>
            <select
              id="fueltype"
              name="fueltype"
              value={fueltype}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Gasoline">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="dailyusage"
              className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Daily Usage in KM:
            </label>
            <input
              type="number"
              id="dailyusage"
              name="dailyusage"
              value={dailyusage}
              onChange={onChange}
              max="200"
              className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
          </div>
        </div>

        <div className="relative z-0 w-full mb-5 mt-12 group">
          <label
            htmlFor="licensenumber"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            License Number:
          </label>
          <input
            type="text"
            id="licensenumber"
            name="licensenumber"
            value={licensenumber}
            onChange={onChange}
            className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
          />
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="licenseissued"
              className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              License Issued Date:
            </label>
            <input
              type="date"
              id="licenseissued"
              name="licenseissued"
              value={licenseissued}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="licenseexpiry"
              className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              License Expiry Date:
            </label>
            <input
              type="date"
              id="licenseexpiry"
              name="licenseexpiry"
              value={licenseexpiry}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
          </div>
        </div>

        <div className="relative z-0 w-full mb-5 mt-12 group">
          <label
            htmlFor="insurancenumber"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Insurance Number:
          </label>
          <input
            type="text"
            id="insurancenumber"
            name="insurancenumber"
            value={insurancenumber}
            onChange={onChange}
            className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
          />
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="insurancetype"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Insurance Type:
          </label>
          <input
            type="text"
            id="insurancetype"
            name="insurancetype"
            value={insurancetype}
            onChange={onChange}
            className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
          />
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="issueddate"
              className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Insurance Issued Date:
            </label>
            <input
              type="date"
              id="issueddate"
              name="issueddate"
              value={issueddate}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="expirydate"
              className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Insurance Expiry Date:
            </label>
            <input
              type="date"
              id="expirydate"
              name="expirydate"
              value={expirydate}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-xm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 block mx-auto mt-8 mb-4"
        >
          Add Vehicle
        </button>

        <Link to="/Profile" className="block ">
          <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100  block mx-auto mb-16">
            Go back
          </button>
        </Link>
      </form>
      <Footer />
    </>
  );
};

export default AddVehicle;
