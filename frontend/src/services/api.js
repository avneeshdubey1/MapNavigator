import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Change if needed

// Fetch all locations
export const getAllLocations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/locations/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};

// Fetch user location history
export const getUserHistory = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/history`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user history:", error);
    return [];
  }
};
