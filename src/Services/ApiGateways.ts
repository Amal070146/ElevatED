// import axios from "axios";

// function getAccessToken(): string | null {
//   return localStorage.getItem("accessToken");
// }

// privateGateway.interceptors.request.use(
//   function (config) {
//     if (
//       config.url !== "register/" &&
//       config.url !== "login/" &&
//       config.url !== "forgot-password/" &&
//       config.url !== "reset-password/"
//     ) {
//       const accessToken = getAccessToken();
//       if (accessToken) {
//         config.headers["Authorization"] = `Bearer ${accessToken}`;
//       }
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// privateGateway.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     if (error.response && error.response.status === 403) {
//       localStorage.removeItem("accessToken");
//     }
//     return Promise.reject(error);
//   }
// );