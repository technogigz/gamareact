import axios from 'axios';

// CAUTION: It's best to store your base URL in a configuration or environment file (.env).
const API_BASE_URL = 'https://sarra777.net/api/v1';

/**
 * A reusable function to place bids for all game types.
 * @param {string} endpoint - The specific API endpoint path (e.g., '/place-bid').
 * @param {object} body - The request body to send to the server.
 * @returns {Promise<object>} - A promise that resolves with the API response data.
 */
export const placeBids = async (endpoint, body) => {
  try {
    // 1. Get authentication token from storage.
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // If there's no token, we can fail early.
      console.error("Authentication error: No token found in localStorage.");
      return { status: false, msg: "Authentication error: No token found." };
    }

    // 2. Construct the required headers.
    // CAUTION: Replace placeholder device info with your actual device info logic.
    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "deviceId": "qwert",
      "deviceName": "sm2233",
      "accessStatus": "1", // Or get dynamically if it can change
    };

    // 3. Construct the full URL and make the API call.
    const fullApiUrl = `${API_BASE_URL}${endpoint}`;
    
    console.log("Submitting to API:", fullApiUrl);
    console.log("Request Body:", body);

    const response = await axios.post(fullApiUrl, body, { headers });
        console.log("Here's response",response);

    // 4. Return the data from the server's response.
    // We expect the server to return an object with a 'status' property (true/false).
    return response.data;

  } catch (error) {
    // 5. Handle any network or server errors.
    console.error(`API Error for endpoint ${endpoint}:`, error);

    // Return a standardized error object so the component knows what happened.
    return {
      status: false,
      msg: error.response?.data?.msg || 'A network error occurred. Please try again.',
    };
  }
};