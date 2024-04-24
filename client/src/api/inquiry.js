import API from "../helper/apiHelper";

const createInquiry = async (inquiry, token) => {
  try {
    const createdInquiry = await new API().post("inquiries", inquiry, token);
    return createdInquiry.data;
  } catch (error) {
    console.error("Error creating admin:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

export { createInquiry };
