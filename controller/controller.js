import { loginApi } from "./api.js";
import { setLocalStorage } from "./localStorage.js";
import {
  getAllProductsApi,
  getProductByIdApi,
  searchProductsApi,
} from "./api.js";

async function loginController({ email, password }) {
  try {
    const data = await loginApi({ email, password });
    setLocalStorage("accessToken", data.accessToken);
    setLocalStorage("refreshToken", data.refreshToken);
    if (data.accessToken) {
      window.location.href = "/products.html?brands=all"; //redirect to products page
    }
    return data;
  } catch (error) {
    console.error("Login controller failed", error);
    return error;
  }
}

async function getAllProductsController(brand = "") {
  try {
    const data = await getAllProductsApi(brand);
    return data;
  } catch (error) {
    console.error("Get all products controller failed", error);
    return error;
  }
}

async function getProductByIdController(id) {
  try {
    const data = await getProductByIdApi(id);
    // console.log("detail product controller by id:", data);
    return data;
  } catch (error) {
    console.error("Get product by id controller failed", error);
  }
}

async function searchProductsController(searchValue) {
  try {
    const data = await searchProductsApi(searchValue);
    return data;
  } catch (error) {
    console.error("Search products controller failed", error);
    return error;
  }
}

export {
  loginController,
  getAllProductsController,
  getProductByIdController,
  searchProductsController,
};
