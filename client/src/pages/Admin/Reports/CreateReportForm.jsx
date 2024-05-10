import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createReport } from "../../../api/report";

const success = () => toast.success("Report Successfully Added");
const errorNotify = () => toast.error("Something wrong");
//const token = localStorage.getItem("token");
// console.log("token => ", token);

const CreateReport = () => {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState({
    name: "",
    creator: "",
    comments: "",
    // inquiryType: "",
  });

  const { name, creator, comments } = reportData;

  const onChange = (e) =>
    setReportData({ ...reportData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log("inquiryData => ", inquiryData);
    const newReport = {
      name,
      creator,
      comments,
    };

    try {
      await createReport(newReport);
      success();
      navigate("/admin/reports/all"); //navigate to view profiles
    } catch (err) {
      console.log("Report creating error => ", err);
      errorNotify();
    }
  };

  return (
    <>
      <section className="bg-white :bg-gray-900">
        <div className="px-4 mx-auto max-w-2xl py-32">
          <h2 className="mb-4 text-xl font-bold text-gray-900 :text-white">
            Make a new report
          </h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="flex flex-col gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Form name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-primary-500 :focus:border-primary-500"
                  placeholder="Type form name"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="creator"
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
                  placeholder="Insert creator na,e"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  for="comments"
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
                  placeholder="Enter Comments Here"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary rounded-lg"
              // onClick={notify}
            >
              Submit Report
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateReport;
