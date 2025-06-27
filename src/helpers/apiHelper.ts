import { API_BASEURL } from "@/constants/common";
import { useGlobalStore } from "@/stores/useGlobalStore";

// export async function api(
//   endpoint: string,
//   method = "GET",
//   body = null,
//   headers = {}
// ) {
//   try {
//     const response = await fetch(`${API_BASEURL}${endpoint}`, {
//       method: method,
//       headers: {
//         ...headers,
//         "Content-Type": "application/json",
//         "ngrok-skip-browser-warning": "true", // Add this line
//         Authorization: "Token 29d4c682a6c0748257a233c4a76a2e79b75b98e8",
//       },
//       body: body ? JSON.stringify(body) : null,
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     // return response;
//     return await response.json();
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// }

export async function api(
  endpoint: string,
  method: "GET" | "POST" = "GET",
  body: Record<string, any> | null = null,
  headers: Record<string, string> = {}
) {
  try {
    const response = await fetch(`${API_BASEURL}${endpoint}`, {
      method: method,
      headers: {
        ...headers,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        Authorization: "Token 29d4c682a6c0748257a233c4a76a2e79b75b98e8",
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Update global timestamp
    useGlobalStore.getState().setLastUpdateTime(new Date());

    // return response;
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
