import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";



export const ProductModal = ({ product, toggleProductModal }) => {
    // Function to get status class name based on product status
    function getStatusClassName(status) {
      switch (status) {
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "completed":
          return "bg-green-100 text-green-800";
        case "rejected":
          return "bg-red-100 text-red-800";
        default:
          return ""; // Default case if status doesn't match any case
      }
    }
  
    const [loader, setLoader] = useState(false);
  
    const downloadPDF = () => {
      const capture = document.querySelector(".actual-product-details");
      setLoader(true);
      html2canvas(capture).then((canvas) => {
        const imgData = canvas.toDataURL("img/png");
        const doc = new jsPDF("p", "mm", "a4");
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
        setLoader(false);
        doc.save("product_details.pdf");
      });
    };
  
    return (
      <div
        id="product-modal"
        className="absolute top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="actual-product-details relative p-4 w-full max-w-xl">
          <div className="relative bg-white rounded-lg shadow :bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t :border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 :text-white">
                Product Details
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center :hover:bg-gray-600 :hover:text-white"
                onClick={toggleProductModal}
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
            <div className="mx-10 my-10">
              <div className="flex justify-end">
                <span
                  className={`uppercase font-medium text-sm px-2.5 py-0.5 rounded ${getStatusClassName(
                    product.status
                  )}`}
                >
                  {product.status}
                </span>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="productName"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="productName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  disabled
                  value={product.name}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="productDescription"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Description
                </label>
                <textarea
                  id="productDescription"
                  rows="5"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                  disabled
                  value={product.description}
                  placeholder="Product description here"
                ></textarea>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="productType"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Product Type
                </label>
                <input
                  type="text"
                  id="productType"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  disabled
                  value={product.productType}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="productPhone"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  id="productPhone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  disabled
                  value={product.phone}
                />
              </div>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b :border-gray-600">
              <button
                onClick={downloadPDF}
                disabled={loader}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800"
              >
                {loader ? "Downloading PDF..." : "Download PDF"}
              </button>
              <button
                onClick={toggleProductModal}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 :focus:ring-gray-700 :bg-gray-800 :text-gray-400 :border-gray-600 :hover:text-white :hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  