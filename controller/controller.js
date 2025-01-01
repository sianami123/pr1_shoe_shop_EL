import { loginApi } from "./api.js";
import { setLocalStorage, getLocalStorage } from "./localStorage.js";
import {
  getAllProductsApi,
  getProductByIdApi,
  createProductApi,
} from "./api.js";

async function loginController({ email, password }) {
  try {
    const data = await loginApi({ email, password });
    setLocalStorage("accessToken", data.accessToken);
    setLocalStorage("refreshToken", data.refreshToken);
    if (data.accessToken) {
      window.location.href = "/products.html"; //redirect to products page
    }
    return data;
  } catch (error) {
    console.error("Login controller failed", error);
    return error;
  }
}

async function getAllProductsController() {
  try {
    const data = await getAllProductsApi();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Get all products controller failed", error);
    return error;
  }
}

async function getProductByIdController(id) {
  try {
    const data = await getProductByIdApi(id);
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Get product by id controller failed", error);
  }
}

async function createProductController({ productObject }) {
  try {
    const data = await createProductApi({ productObject });
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Create product controller failed", error);
  }
}

export {
  loginController,
  getAllProductsController,
  createProductController,
  getProductByIdController,
};
