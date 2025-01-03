import { getLocalStorage } from "./localStorage.js";

const BASE_URL = "http://api.alikooshesh.ir:3000";
const api_key = "siashoea";
const accessToken = await getLocalStorage("accessToken");

const LOGIN_URL = `${BASE_URL}/api/users/login`;
const GET_ALL_PRODUCTS_URL = `${BASE_URL}/api/records/products`;
const GET_PRODUCT_BY_ID_URL = `${BASE_URL}/api/records/products/`;
const CART_URL = `${BASE_URL}/api/records/cart`;
const WISHLIST_URL = `${BASE_URL}/api/records/wishlist`;

// CART API
async function addToCartApi({ quantity, size, color, ...product }) {
  try {
    const response = await fetch(CART_URL, {
      method: "POST",
      body: JSON.stringify({ quantity, size, color, ...product }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        api_key,
      },
    });
    const data = await response.json();
    console.log("add to cart data:", data);
    return data;
  } catch (error) {
    console.error("Add to cart API failed", error);
  }
}

async function getCartApi() {
  try {
    const response = await fetch(CART_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        api_key,
      },
    });
    const data = await response.json();
    console.log("get cart data:", data);
    return data;
  } catch (error) {
    console.error("Get cart API failed", error);
  }
}

async function removeFromCartApi(id) {
  try {
    const response = await fetch(`${CART_URL}/${id}`, { method: "DELETE" });
    const data = await response.json();
    console.log("remove from cart data:", data);
    return data;
  } catch (error) {
    console.error("Remove from cart API failed", error);
  }
}

async function updateCartQuantityApi(id, quantity) {
  try {
    const response = await fetch(`${CART_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
    const data = await response.json();
    console.log("update cart quantity data:", data);
    return data;
  } catch (error) {
    console.error("Update cart quantity API failed", error);
  }
}
// CART API END

// WISHLIST API
async function addToWishlistApi({ id, name, imageURL, price, brand }) {
  try {
    const response = await fetch(WISHLIST_URL, {
      method: "POST",
      body: JSON.stringify({ id, name, imageURL, price, brand }),
    });
    const data = await response.json();
    console.log("add to wishlist data:", data);
    return data;
  } catch (error) {
    console.error("Add to wishlist API failed", error);
  }
}

async function getWishlistApi() {
  try {
    const response = await fetch(WISHLIST_URL);
    const data = await response.json();
    console.log("get wishlist data:", data);
    return data;
  } catch (error) {
    console.error("Get wishlist API failed", error);
  }
}

async function removeFromWishlistApi(id) {
  try {
    const response = await fetch(`${WISHLIST_URL}/${id}`, { method: "DELETE" });
    const data = await response.json();
    console.log("remove from wishlist data:", data);
    return data;
  } catch (error) {
    console.error("Remove from wishlist API failed", error);
  }
}
// WISHLIST API END

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

async function getAllProductsApi(brand) {
  console.log("brand:", brand);
  let url = GET_ALL_PRODUCTS_URL;
  if (brand && brand !== "" && brand.toLowerCase() !== "all") {
    url = `${GET_ALL_PRODUCTS_URL}?filterKey=brand&filterValue=${brand}`;
  }
  console.log("url:", url);
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        api_key,
      },
    });
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
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

async function searchProductsApi(searchValue) {
  let url = GET_ALL_PRODUCTS_URL;
  if (searchValue !== "" && searchValue !== null) {
    url = `${GET_ALL_PRODUCTS_URL}?searchKey=name&searchValue=${searchValue}`;
  }
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        api_key,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Search products API failed", error);
  }
}

export {
  loginApi,
  getAllProductsApi,
  getProductByIdApi,
  searchProductsApi,
  addToCartApi,
  getCartApi,
  removeFromCartApi,
  updateCartQuantityApi,
  addToWishlistApi,
  getWishlistApi,
  removeFromWishlistApi,
};
