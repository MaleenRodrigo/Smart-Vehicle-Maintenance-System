import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ResponsiveDrawer from "../../Layout/Drawer";

function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleEditClick = (reservationId) => {
    // console.log(reservationId);
    const confirmEdit = window.confirm(
      "Are you want to edit this reservation?"
    );
    if (confirmEdit) {
      navigate(`/admin/resUpdate`, { state: { reservationId } });
    }
  };

  const handleDelete = async (reservationId) => {
    const confirmDelete = window.confirm(
      "Are you sure to delete this reservation?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:5000/api/reservation/delete/${reservationId}`
        );
        // Remove the deleted reservation from the local state
        setReservations(
          reservations.filter(
            (reservation) => reservation._id !== reservationId
          )
        );
        console.log("Reservation deleted successfully");
      } catch (error) {
        console.error("Error deleting reservation:", error.message);
      }
    }
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/reservation"
        );
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservation:", error.message);
      }
    };

    fetchReservations();
  }, []);

  // Filter reservations based on search query
  const filteredReservations = reservations.filter((reservation) =>
    reservation.vehiclenum.includes(searchQuery)
  );

  return (
    <div>
      <ResponsiveDrawer>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate("/admin/addreservation")}
            className="inline-flex items-center px-5 py-2.5 text-sm font-bold text-white bg-primary rounded-lg"
          >
            Add reservation
          </button>
          <input
            type="text"
            placeholder="Search by vehicle number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-28 shadow-md rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white :text-white :bg-gray-800">
              All Reservations List
            </caption>

            <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Owner Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Vehicle Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Services
                </th>
                <th scope="col" className="px-6 py-3">
                  Service Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.length > 0 ? (
                filteredReservations.map((reservation) => (
                  <tr
                    key={reservation._id}
                    className="bg-white border-b :bg-gray-800 :border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                      {reservation.ownername}
                    </td>
                    <td className="px-6 py-4">{reservation.vehiclenum}</td>
                    <td className="px-6 py-4 capitalize">
                      {reservation.services}
                    </td>
                    <td className="px-6 py-4 capitalize">
                      {reservation.servicedate}
                    </td>

                    <td className="px-6 py-4 capitalize">
                      <a
                        onClick={() => handleEditClick(reservation._id)}
                        className="font-medium text-gray-400 :text-blue-500 cursor-pointer"
                      >
                        <EditIcon />
                      </a>
                      <a
                        onClick={() => handleDelete(reservation._id)}
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
                    colSpan="6"
                    className="w-full text-md text-gray-600 font-semibold m-10 text-center"
                  >
                    No reservations found matching the search criteria.
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
