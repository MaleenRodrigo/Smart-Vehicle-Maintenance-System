import API from "../helper/apiHelper";

const getAllReports = async () => {
  try {
    const reports = await new API().get("report/all"); // Assuming endpoint for all owners is "vehicleOwners"
    return reports; // Assuming the response data contains the list of vehicle owners
  } catch (error) {
    console.error("Error fetching reports:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const updateReport = async (report, id) => {
  //   console.log("inquiry.js =>", inquiry);
  //   console.log("inquiry.js =>", token);
  try {
    const updatedReport = await new API().put(`report/getreport/${id}`, report);
    console.log(updatedReport);
    return updatedReport;
  } catch (error) {
    console.error("Error updating report:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const deleteReport = async (id) => {
  try {
    const deletedReport = await new API().delete(`report/deletereport/${id}`);
    console.log("deletedReport => ", deletedReport);
    return deletedReport.data;
  } catch (error) {
    console.error("Error deleting report:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const createReport = async (report) => {
  //   console.log("inquiry.js =>", inquiry);
  //   console.log("inquiry.js =>", token);
  try {
    const createdReport = await new API().post("report", report);
    return createdReport;
  } catch (error) {
    console.error("Error creating report:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

export { getAllReports, updateReport, deleteReport, createReport };
