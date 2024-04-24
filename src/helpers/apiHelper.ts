import axios, { AxiosRequestConfig } from "axios";
import { API_BASEURL } from "@/constants/common";
// const CryptoJS = require("crypto-js");

// export async function api(
//   requestURL: string,
//   requestMethod: string = "GET",
//   data: any = {},
//   headers: any = {}
// ): Promise<any> {
//   // Define default headers
//   const defaultHeaders = {
//     "Content-Type": "application/json",
//     // Add more default headers as needed
//     'Authorization': 'Token 29d4c682a6c0748257a233c4a76a2e79b75b98e8',
//   };

//   // Merge default headers with provided headers
//   const mergedHeaders = { ...defaultHeaders, ...headers };

//   const requestConfig: AxiosRequestConfig = {
//     method: requestMethod,
//     url: `${API_BASEURL}${requestURL}`,
//     headers: mergedHeaders,
//   };

//   if (["POST", "PUT", "PATCH"].includes(requestMethod)) {
//     requestConfig.data = data;
//   } else if (requestMethod === "GET") {
//     requestConfig.params = data;
//   }

//   try {
//     const response = await axios(requestConfig);
//     return response.data;
//   } catch (error: any) {
//     console.error(
//       `Error making ${requestMethod.toUpperCase()} request:`,
//       error
//     );
//     throw error;
//   }
// }

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

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
