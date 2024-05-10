import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ResponsiveDrawer from "../../Layout/Drawer";
import { deleteReport, getAllReports } from "../../../api/report";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Reports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [currentInquiryId, setCurrentInquiryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEditReport = (report) => {
    navigate("/admin/reports/update", { state: { report } });
  };

  const handleDeleteReport = async (id) => {
    // console.log(id);
    try {
      await deleteReport(id);
      alert("Report deleted successfully!");
    } catch (error) {
      console.log("error deleting inquiry => ", error);
    }
  };

  useEffect(() => {
    const getReports = async () => {
      try {
        const res = await getAllReports();
        // console.log("res=>", res);
        setReports(res);
      } catch (error) {
        console.error("Error fetching reports: ", error.message);
      }
    };

    getReports();
    // getCards();
  });

  const filteredReports = reports.filter((report) =>
    report.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <ResponsiveDrawer>
      <a
        to="#"
        className="text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 :bg-primary-600 :hover:bg-primary-700 focus:outline-none :focus:ring-primary-800"
      >
        <Link to="/admin/reports/create">Create Report</Link>
      </a>
      <input
        type="text"
        placeholder="Search by name:"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white :text-white :bg-gray-800">
          All Reports
          {/* <p className="mt-1 text-sm font-normal text-gray-500 :text-gray-400">
              Browse a list of tickets designed to help you work and play, stay
              organized, get answers, keep in touch, grow your business, and
              more.
            </p> */}
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Creator
            </th>
            <th scope="col" className="px-6 py-3">
              Comments
            </th>
            <th scope="col" className="px-6 py-3">
              Created Date
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th> */}
            <th scope="col" className="px-6 py-3">
              <span className="sr-only"></span>
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <tr className="bg-white border-b :bg-gray-800 :border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white"
                >
                  {report.name}
                </th>
                <td className="px-6 py-4">{report.creator}</td>
                <td className="px-6 py-4">{report.comments}</td>
                <td className="px-6 py-4 capitalize">
                  {new Date(report.createdDate).toLocaleDateString()}
                </td>

                <td className="px- py-4 text-right">
                  <a
                    onClick={() => {}}
                    className="font-medium text-gray-400 :text-blue-500 cursor-pointer"
                  >
                    <VisibilityIcon />
                  </a>
                </td>
                <td className="px- py-4 text-right">
                  <a
                    onClick={() => handleEditReport(report)} // Pass report ID
                    className="font-medium text-gray-400 :text-blue-500 cursor-pointer"
                  >
                    <EditIcon />
                  </a>
                </td>
                <td className="px-3 py-4 text-right">
                  <a
                    onClick={() => handleDeleteReport(report._id)}
                    className="font-medium text-red-600 :text-blue-500 cursor-pointer"
                  >
                    <DeleteIcon />
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <div className="w-full text-md text-gray-600 font-semibold m-10 text-center">
              You dont have any reports!
            </div>
          )}
        </tbody>
      </table>
    </ResponsiveDrawer>
  );
};

export default Reports;
