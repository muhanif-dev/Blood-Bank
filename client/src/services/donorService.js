import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// User-friendly error message extractor
const getErrorMessage = (error) => {
  if (error.response?.data?.message) return error.response.data.message;
  if (error.message === "Network Error")
    return "Unable to connect to the server. Please check your connection.";
  if (error.code === "ECONNABORTED")
    return "Request timed out. Please try again.";
  return "Something went wrong. Please try again.";
};

const donorService = {
  /**
   * Get donors with optional filters and pagination.
   * @param {object} params - { bloodGroup, name, fatherName, place, page, limit }
   */
  getDonors: async (params = {}) => {
    try {
      // Remove empty string params to keep URL clean
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
          ([, v]) => v !== "" && v !== null && v !== undefined,
        ),
      );
      const response = await api.get("/donors", { params: cleanParams });
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  /**
   * Get a single donor by ID.
   * @param {string} id - MongoDB ObjectId
   */
  getDonor: async (id) => {
    try {
      const response = await api.get(`/donors/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  /**
   * Register a new donor.
   * @param {object} data - Donor form data
   */
  createDonor: async (data) => {
    try {
      const response = await api.post("/donors", data);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  /**
   * Update an existing donor.
   * @param {string} id - MongoDB ObjectId
   * @param {object} data - Updated donor data
   */
  updateDonor: async (id, data) => {
    try {
      const response = await api.put(`/donors/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },

  /**
   * Delete a donor.
   * @param {string} id - MongoDB ObjectId
   */
  deleteDonor: async (id) => {
    try {
      const response = await api.delete(`/donors/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  },
};

export default donorService;
