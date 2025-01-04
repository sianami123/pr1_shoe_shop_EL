import { loginApi } from "./api.js";
import { setLocalStorage } from "./localStorage.js";
import {
  getAllProductsApi,
  getProductByIdApi,
  searchProductsApi,
  addToCartApi,
  getCartApi,
  addToWishlistApi,
} from "./api.js";

//! LOGIN CONTROLLER START
async function loginController({ email, password }) {
  try {
    const data = await loginApi({ email, password });
    setLocalStorage("accessToken", data.accessToken);
    setLocalStorage("refreshToken", data.refreshToken);
    setLocalStorage("user", email);
    if (data.accessToken) {
      window.location.href = "/home.html";
    }
    return data;
  } catch (error) {
    console.error("Login controller failed", error);
    return error;
  }
}
//! LOGIN CONTROLLER END
//! PRODUCT CONTROLLER START
async function getAllProductsController(brand) {
  try {
    const data = await getAllProductsApi(brand);
    if (data?.message === "Invalid access token") {
      window.location.href = "/login.html";
      return null;
    }
    return data;
  } catch (error) {
    console.error("Get all products controller failed", error);
    window.location.href = "/login.html";
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
//! PRODUCT CONTROLLER END
//! CART CONTROLLER START
async function addToCartController({
  selectedQuantity,
  selectedSize,
  selectedColor,
  productId,
  ...product
}) {
  console.log("add to cart controller:", {
    selectedQuantity,
    selectedSize,
    selectedColor,
    productId,
    ...product,
  });
  try {
    const data = await addToCartApi({
      selectedQuantity,
      selectedSize,
      selectedColor,
      productId,
      ...product,
    });
    return data;
  } catch (error) {
    console.error("Add to cart controller failed", error);
    return error;
  }
}

async function getCartController() {
  try {
    const data = await getCartApi();
    return data;
  } catch (error) {
    console.error("Get cart controller failed", error);
    return error;
  }
}

//! CART CONTROLLER END
//! WISHLIST CONTROLLER START
async function addToWishlistController({ productId, ...product }) {
  console.log("add to wishlist controller:", { productId, ...product });
  try {
    const data = await addToWishlistApi({ productId, ...product });
    return data;
  } catch (error) {
    console.error("Add to wishlist controller failed", error);
    return error;
  }
}

async function getWishlistController() {
  try {
    const data = await getWishlistApi();
    return data;
  } catch (error) {
    console.error("Get wishlist controller failed", error);
    return error;
  }
}
//! WISHLIST CONTROLLER END
export {
  loginController,
  getAllProductsController,
  getProductByIdController,
  searchProductsController,
  addToCartController,
  getCartController,
  addToWishlistController,
  getWishlistController,
};
