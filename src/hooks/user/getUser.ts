import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  timeout: 5000,
});

export async function getUser(email: string) {
  try {
    if (!validateEmail(email)) {
      throw new Error("Invalid email format");
    }

    // Extract username from the email
    const username = email;

    const response = await apiClient.get(`/users/${username}`);
    return response.data;
  } catch (error: any) {
    // If a 404 error occurs (user not found), return null without logging
    if (error.response?.status === 404) {
      return null; // Return null to signify no user found
    }

    // If the error is not 404, log it
    console.error("Error fetching user:", error);

    // Return a generic error message
    return {
      success: false,
      message:
        error.response?.data?.error ||
        error.message ||
        "An unknown error occurred",
    };
  }
}

// Helper function to validate email format
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
