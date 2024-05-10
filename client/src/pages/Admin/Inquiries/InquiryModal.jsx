import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Chip from "@mui/material/Chip";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const InquiryModal = ({ inquiry, toggleInquiryModal }) => {
  function getStatusColor(status) {
    switch (status) {
      case "pending":
        return "warning";
      case "resolved":
        return "success";
      case "rejected":
        return "error";
      default:
        return ""; // Default case if status doesn't match any case
    }
  }

  const [loader, setLoader] = useState(false);

  const downloadPDF = (inquiry) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Inquiry PDF", 14, 22);

    doc.setFontSize(11);
    doc.setTextColor(100);

    // Customer Details
    doc.text(`Inquiry ID: ${inquiry._id}`, 14, 32);
    doc.text(`Email: ${inquiry.email}`, 14, 42);
    doc.text(`Phone: ${inquiry.phone}`, 14, 52);
    doc.text(`Generated Date: ${new Date().toLocaleString()}`, 14, 62);

    // Table for Items
    autoTable(doc, {
      startY: 72,
      head: [["Title", "Description", "Type", "Status"]],
      body: [
        [
          inquiry.title,
          inquiry.description,
          inquiry.inquiryType,
          inquiry.status,
        ],
      ],
      theme: "grid",
    });
    setLoader(false);

    // Save the PDF
    doc.save("Inquiry_HardCopy.pdf");
  };

  return (
    <Modal
      open={toggleInquiryModal}
      onClose={toggleInquiryModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="relative bg-white rounded-lg shadow :bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t :border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 :text-white">
              Hardcopy view of inquiry
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center :hover:bg-gray-600 :hover:text-white"
              onClick={toggleInquiryModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="mx-10 my-10">
            <div className="flex justify-end">
              <Chip
                size="small"
                label={inquiry.status.toUpperCase()}
                color={getStatusColor(inquiry.status)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 :text-white"
              >
                Inquiry Title
              </label>
              <input
                type="text"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                disabled
                value={inquiry.title}
              />
            </div>
            <div className="flex w-full gap-3">
              <div className="mb-5 w-full">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Inquiry Type
                </label>
                <input
                  type="text"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  required
                  disabled
                  value={inquiry.inquiryType}
                />
              </div>
              <div className="mb-5 w-full">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Contact number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  disabled
                  value={inquiry.phone}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 :text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="5"
                name="description"
                value={inquiry.description}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                placeholder="Your description here"
              ></textarea>
            </div>
          </form>

          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b :border-gray-600">
            <button
              onClick={() => downloadPDF(inquiry)}
              disabled={!(loader === false)}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800"
            >
              {loader ? (
                <span>Downloading PDF</span>
              ) : (
                <span>Download PDF</span>
              )}
            </button>
            <button
              onClick={toggleInquiryModal}
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 :focus:ring-gray-700 :bg-gray-800 :text-gray-400 :border-gray-600 :hover:text-white :hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};
