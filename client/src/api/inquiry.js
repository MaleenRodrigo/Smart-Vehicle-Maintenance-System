import API from "../helper/apiHelper";
//localhor:500/api/vehicle
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
    // console.log("inquiriesINjs => ", inquiries);
    return inquiries;
  } catch (error) {
    console.error("Error fetching inquiries:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const updateInquiry = async (inquiry, id, token) => {
  //   console.log("inquiry.js =>", inquiry);
  //   console.log("inquiry.js =>", token);
  try {
    const updatedInquiry = await new API().put(
      `inquiries/${id}`,
      inquiry,
      token
    );
    console.log(updatedInquiry);
    return updatedInquiry;
  } catch (error) {
    console.error("Error updating inquiry:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const deleteInquiry = async (id, token) => {
  try {
    const deletedInquiry = await new API().delete(`inquiries/${id}`, token);
    console.log("deletedInquiry => ", deletedInquiry);
    return deletedInquiry.data;
  } catch (error) {
    console.error("Error deleting Inquiry:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

export { createInquiry, getAllInquiry, updateInquiry, deleteInquiry };
