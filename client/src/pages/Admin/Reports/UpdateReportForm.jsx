import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { updateReport } from "../../../api/report";

const token = localStorage.getItem("token");

const UpdateReportForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const report = location.state?.report;
  // //   console.log(inquiry);
  const [updateReportData, setUpdateReportData] = useState({
    name: report?.name || "",
    creator: report?.creator || "",
    comments: report?.comments || "",
  });

  const { name, creator, comments } = updateReportData;

  const onChange = (e) =>
    setUpdateReportData({
      ...updateReportData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    const updateReportData = {
      name,
      creator,
      comments,
    };
    // console.log(updateReportData);
    try {
      await updateReport(updateReportData, report?._id);
      //   success();
      navigate("/admin/reports/all");
    } catch (err) {
      console.log("inquiry updating error => ", err);
      //   errorNotify();
    }
  };

  return (
    <>
      <section className="bg-white :bg-gray-900">
        <div className="px-4 mx-auto max-w-2xl py-9">
          <h2 className="mb-4 text-xl font-bold text-gray-900 :text-white">
            Update inquiry
            <span className="ml-2 text-sm text-gray-400">{report._id}</span>
          </h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="flex flex-col gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Report Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                  placeholder="Type inquiry title"
                  required
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Creator name
                </label>
                <input
                  type="text"
                  name="creator"
                  id="creator"
                  value={creator}
                  onChange={(e) => onChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  for="description"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Comments
                </label>
                <textarea
                  id="comments"
                  rows="8"
                  name="comments"
                  value={comments}
                  onChange={(e) => onChange(e)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                  placeholder="Your comments here"
                ></textarea>
              </div>
            </div>
            <br />

            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg"
              // onClick={notify}
            >
              Update Report
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateReportForm;
