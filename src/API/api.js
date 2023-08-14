// api.js

import axios from "axios";

export const getAvailability = async () => {
  try {
    const response = await axios.get(
      `https://lifeshaderapi.azurewebsites.net/api/UserService/GetUserAvailabilityByID?id=4`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching availability:", error);
    throw error;
  }
};

export const updateAvailability = async (newAvailability) => {
  try {
    const response = await axios.put(
      `https://lifeshaderapi.azurewebsites.net/api/UserService/UpdateAvailibility`,
      newAvailability
    );
    return response.data;
  } catch (error) {
    console.error("Error updating availability:", error);
    throw error;
  }
};
