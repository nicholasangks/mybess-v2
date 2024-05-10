import { API_BASEURL } from "@/constants/common";

export async function api(
  endpoint: string,
  method = "GET",
  body = null,
  headers = {}
) {
  try {
    const response = await fetch(`${API_BASEURL}${endpoint}`, {
      method: method,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        Authorization: "Token 29d4c682a6c0748257a233c4a76a2e79b75b98e8",
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // return response;
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
