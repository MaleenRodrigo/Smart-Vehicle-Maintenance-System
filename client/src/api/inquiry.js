import API from "../helper/apiHelper";

const createInquiry = async (inquiry, token) => {
  //   console.log("inquiry.js =>", inquiry);
  //   console.log("inquiry.js =>", token);
  try {
    const createdInquiry = await new API().post("inquiries", inquiry, token);
    return createdInquiry;
  } catch (error) {
    console.error("Error creating inquiry:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const getAllInquiry = async (token) => {
  try {
    const inquiries = await new API().get("inquiries", {}, token);
    // console.log("inquiries => ", inquiries);
    return inquiries;
  } catch (error) {
    console.error("Error fetching inquiries:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

export { createInquiry, getAllInquiry };
