import { getLocalStorage } from "./localStorage.js";

const BASE_URL = "http://api.alikooshesh.ir:3000";
const api_key = "siashoea";
const accessToken = await getLocalStorage("accessToken");

const LOGIN_URL = `${BASE_URL}/api/users/login`;
const GET_ALL_PRODUCTS_URL = `${BASE_URL}/api/records/products`;
const GET_PRODUCT_BY_ID_URL = `${BASE_URL}/api/records/products/`;

async function loginApi({ email, password }) {
  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
        api_key,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login API failed", error);
  }
}

async function getAllProductsApi() {
  try {
    const response = await fetch(GET_ALL_PRODUCTS_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        api_key,
      },
    });
  } catch (error) {
    console.error("Get all products API failed", error);
  }
}

async function getProductByIdApi(id) {
  try {
    const response = await fetch(GET_PRODUCT_BY_ID_URL + id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        api_key,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get product by id API failed", error);
  }
}

export { loginApi, getAllProductsApi, getProductByIdApi, createProductApi };

// const CREATE_PRODUCT_URL = `${BASE_URL}/api/records/products`;

// async function createProductApi({ productObject }) {
//   try {
//     const response = await fetch(CREATE_PRODUCT_URL, {
//       method: "POST",
//       body: JSON.stringify(productObject),
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         api_key,
//       },
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Create product API failed", error);
//   }
// }
