import { loginApi } from "./api.js";
import { setLocalStorage, getLocalStorage } from "./localStorage.js";
import {
  getAllProductsApi,
  getProductByIdApi,
  searchProductsApi,
  addToCartApi,
  getCartApi,
  getWishlistApi,
  addToWishlistApi,
  removeFromWishlistApi,
  removeFromCartApi,
  getWishlistByBrandApi,
  getFilteredProductsIdsApi,
  updateCartQuantityApi,
  createOrderApi,
  getOrdersApi,
  deleteAllCartItemsApi,
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
async function getFilteredProductsIdsController(productIds) {
  try {
    const data = await getFilteredProductsIdsApi(productIds);
    return data;
  } catch (error) {
    console.error("Get filtered products ids controller failed", error);
    return error;
  }
}

async function getAllProductsController(brand) {
  try {
    const products = await getAllProductsApi(brand);
    if (products?.message === "Invalid access token") {
      window.location.href = "/login.html";
      return null;
    }
    // const wishlist = await getWishlistByBrandApi({});
    // const wishlistIds = wishlist.records.map((item) => item.productId);
    return products;
  } catch (error) {
    console.error("Get all products controller failed", error);
    // window.location.href = "/login.html";
    return error;
  }
}

async function getProductByIdController(id) {
  try {
    const data = await getProductByIdApi(id);
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

async function updateCartQuantityController({ cartId, changedQuantity }) {
  try {
    const data = await updateCartQuantityApi({ cartId, changedQuantity });
    return data;
  } catch (error) {
    console.error("Update cart quantity controller failed", error);
    return error;
  }
}

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
    console.log("data in add to cart controller:", data);
    return data;
  } catch (error) {
    console.error("Add to cart controller failed", error);
    return error;
  }
}

async function removeFromCartController({ id }) {
  try {
    const data = await removeFromCartApi({ id });
    console.log("data in remove from cart controller:", data);
    return data;
  } catch (error) {
    console.error("Remove from cart controller failed", error);
    return error;
  }
}

async function getCartController({ productId }) {
  try {
    const data = await getCartApi({ productId });
    return data;
  } catch (error) {
    console.error("Get cart controller failed", error);
    return error;
  }
}

async function deleteAllCartItemsController() {
  try {
    const data = await deleteAllCartItemsApi();
    console.log("data in delete all cart items controller:", data);
    return data;
  } catch (error) {
    console.error("Delete all cart items controller failed", error);
    return error;
  }
}
//! CART CONTROLLER END
//! WISHLIST CONTROLLER START
async function addToWishlistController({ productId, ...product }) {
  try {
    const wishlistData = await addToWishlistApi({ productId, ...product });
    return wishlistData;
  } catch (error) {
    console.error("Add to wishlist controller failed", error);
    return error;
  }
}

async function removeFromWishlistController({ id }) {
  console.log("remove from wishlist controller:", id);
  try {
    const wishlistData = await removeFromWishlistApi({ id });
    console.log(
      "wishlistData in remove from wishlist controller:",
      wishlistData
    );
    return wishlistData;
  } catch (error) {
    console.error("Remove from wishlist controller failed", error);
    return error;
  }
}

async function getWishlistController({ productId }) {
  console.log("id in get wishlist controller:", productId);
  try {
    const wishlistData = await getWishlistApi({ productId });
    return wishlistData;
  } catch (error) {
    console.error("Get wishlist controller failed", error);
    console.log("wishlistData:", wishlistData);
    return error;
  }
}

async function getWishlistByBrandController({ brand }) {
  console.log("brand in get wishlist by brand controller:", brand);
  try {
    const wishlistData = await getWishlistByBrandApi({ brand });
    return wishlistData;
  } catch (error) {
    console.error("Get wishlist by brand controller failed", error);
    return error;
  }
}

//! WISHLIST CONTROLLER END

//! ORDER CONTROLLER START
async function createOrderController({ orderData }) {
  try {
    const data = await createOrderApi({ orderData });
    return data;
  } catch (error) {
    console.error("Create order controller failed", error);
    return error;
  }
}

async function getOrdersController() {
  try {
    const data = await getOrdersApi();
    return data;
  } catch (error) {
    console.error("Get orders controller failed", error);
    return error;
  }
}
//! ORDER CONTROLLER END

export {
  loginController,
  getAllProductsController,
  getProductByIdController,
  searchProductsController,
  addToCartController,
  getCartController,
  removeFromCartController,
  addToWishlistController,
  getWishlistController,
  removeFromWishlistController,
  getWishlistByBrandController,
  getFilteredProductsIdsController,
  updateCartQuantityController,
  createOrderController,
  getOrdersController,
  deleteAllCartItemsController,
};
