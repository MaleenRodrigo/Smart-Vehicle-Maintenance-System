// Frontend: ReservationList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ResponsiveDrawer from "../../Layout/Drawer";

function ReservationList() {
  const [vehicleOwners, setVehicleOwners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  //   const handleEditClick = (vehicleOwnerId) => {
  //     const confirmEdit = window.confirm(
  //       "Are you sure you want to edit this vehicle owner?"
  //     );
  //     if (confirmEdit) {
  //       navigate(`/admin/vehicleOwner/update`, { state: { vehicleOwnerId } });
  //     }
  //   };

  const handleDelete = async (vehicleOwnerId) => {
    console.log(vehicleOwnerId);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle owner?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:5000/api/profile/${vehicleOwnerId}`
        );
        // Remove the deleted vehicle owner from the local state
        setVehicleOwners(
          vehicleOwners.filter((owner) => owner._id !== vehicleOwnerId)
        );
        console.log("Vehicle owner deleted successfully");
      } catch (error) {
        console.error("Error deleting vehicle owner:", error.message);
      }
    }
  };

  useEffect(() => {
    const fetchVehicleOwners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/vehicleOwner"
        );
        setVehicleOwners(response.data);
      } catch (error) {
        console.error("Error fetching vehicle owners:", error.message);
      }
    };

    fetchVehicleOwners();
  }, []);

  // Filter vehicle owners based on search query
  const filteredVehicleOwners = vehicleOwners.filter((owner) =>
    owner.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateReportPDF = (vehicleOwners) => {
    if (vehicleOwners.length === 0) {
      alert("No data to generate report.");
      return;
    }

    const doc = new jsPDF();

    doc.text("Vehicle Owners Report", 20, 10);

    let startY = 20;
    doc.setFontSize(12);

    // Table headers
    const headers = [
      "Vehicle Owner Name",
      "Email Address",
      "Contact Number",
      "Created Date",
    ];

    const data = vehicleOwners.map(({ name, email, phone, date }) => [
      name,
      email,
      phone,
      formatDateToISO(date),
    ]);

    doc.autoTable({
      startY,
      head: [headers],
      body: data,
      theme: "grid",
      styles: {
        fontSize: 10,
        overflow: "linebreak",
      },
      columnStyles: {
        0: { cellWidth: 50 }, // Vehicle Owner Name
        1: { cellWidth: 50 }, // Email Address
        2: { cellWidth: 40 }, // Contact Number
        3: { cellWidth: 40 }, // Created Date
      },
    });

    doc.save("vehicle_owners_report.pdf");
  };

  function formatDateToISO(dateString) {
    // Create a new Date object from the provided date string
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      // If the date is invalid, return null or throw an error
      return null;
    } else {
      // Format the date as "YYYY-MM-DD"
      const formattedDate = date.toISOString().split("T")[0];
      return formattedDate;
    }
  }

  return (
    <div>
      <ResponsiveDrawer>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by vehicle owner name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={() => generateReportPDF(filteredVehicleOwners)}
            className="inline-flex items-center px-5 py-2.5 text-sm font-bold text-white bg-green-500 rounded-lg"
          >
            Generate Report
          </button>
        </div>

        <div className="mb-28 shadow-md rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white :text-white :bg-gray-800">
              All Vehicle Owners List
            </caption>

            <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Created date
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicleOwners.length > 0 ? (
                filteredVehicleOwners.map((owner) => (
                  <tr
                    key={owner._id}
                    className="bg-white border-b :bg-gray-800 :border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                      {owner.name}
                    </td>
                    <td className="px-6 py-4">{owner.email}</td>
                    <td className="px-6 py-4">{owner.phone}</td>
                    <td className="px-6 py-4">{formatDateToISO(owner.date)}</td>
                    <td className="px-6 py-4 capitalize">
                      {/* <a
                        onClick={() => handleEditClick(owner._id)}
                        className="font-medium text-gray-400 :text-blue-500 cursor-pointer"
                      >
                        <EditIcon />
                      </a> */}
                      <a
                        onClick={() => handleDelete(owner._id)}
                        className="ml-2 font-medium text-red-600 :text-blue-500 cursor-pointer"
                      >
                        <DeleteIcon />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="w-full text-md text-gray-600 font-semibold m-10 text-center"
                  >
                    No vehicle owners found matching the search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ResponsiveDrawer>
    </div>
  );
}

export default ReservationList;
