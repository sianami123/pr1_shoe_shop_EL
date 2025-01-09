import { getLocalStorage } from "./localStorage.js";

const BASE_URL = "http://api.alikooshesh.ir:3000";
const api_key = "siashoea";
const accessToken = await getLocalStorage("accessToken");

const LOGIN_URL = `${BASE_URL}/api/users/login`;
const PRODUCTS_URL = `${BASE_URL}/api/records/products`;
const CART_URL = `${BASE_URL}/api/records/cart`;
const WISHLIST_URL = `${BASE_URL}/api/records/wishlist`;
const ORDER_URL = `${BASE_URL}/api/records/order`;

//! CART API
async function addToCartApi({
  selectedQuantity,
  selectedSize,
  selectedColor,
  ...product
}) {
  try {
    const response = await fetch(CART_URL, {
      method: "POST",
      body: JSON.stringify({
        selectedQuantity,
        selectedSize,
        selectedColor,
        productId: product.id,
        ...product,
      }),
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

async function getCartApi({ productId }) {
  let url = CART_URL;
  if (productId) {
    url = `${CART_URL}?filterKey=productId&filterValue=${productId}`;
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
    console.error("Get cart API failed", error);
  }
}

async function removeFromCartApi({ id }) {
  try {
    const response = await fetch(`${CART_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        api_key,
      },
    });
    const data = await response.json();
    console.log("remove from cart data:", data);
    return data;
  } catch (error) {
    console.error("Remove from cart API failed", error);
  }
}

async function updateCartQuantityApi({ cartId, changedQuantity }) {
  try {
    const response = await fetch(`${CART_URL}/${cartId}`, {
      method: "PUT",
      body: JSON.stringify({ selectedQuantity: changedQuantity }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        api_key,
      },
    });
    const data = await response.json();
    console.log("update cart quantity data:", data);
    return data;
  } catch (error) {
    console.error("Update cart quantity API failed", error);
  }
}

async function deleteAllCartItemsApi() {
  try {
    const response = await fetch(`${CART_URL}/delete-all`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        api_key,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Delete all cart items API failed", error);
  }
}
//! CART API END
//! WISHLIST API START
async function addToWishlistApi({ productId, ...product }) {
  try {
    const response = await fetch(WISHLIST_URL, {
      method: "POST",
      body: JSON.stringify({ productId, ...product }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        api_key,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Add to wishlist API failed", error);
  }
}

async function removeFromWishlistApi({ id }) {
  console.log("remove from wishlist id:", id);
  try {
    const response = await fetch(`${WISHLIST_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        api_key,
      },
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Remove from wishlist API failed", error);
  }
}

async function getWishlistApi({ productId }) {
  let url = WISHLIST_URL;
  if (productId) {
    url = `${WISHLIST_URL}?filterKey=productId&filterValue=${productId}`;
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
    console.error("Get wishlist API failed", error);
  }
}

async function getWishlistByBrandApi({ brand }) {
  console.log("brand in get wishlist by brand api:", brand);
  let url = WISHLIST_URL;
  if (brand && brand !== "" && brand.toLowerCase() !== "all") {
    url = `${WISHLIST_URL}?filterKey=brand&filterValue=${brand}`;
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
    console.error("Get wishlist by brand API failed", error);
  }
}

//! WISHLIST API END
//! PRODUCT API START
async function getAllProductsApi(brand) {
  let url = PRODUCTS_URL;
  if (brand && brand !== "" && brand.toLowerCase() !== "all") {
    url = `${PRODUCTS_URL}?filterKey=brand&filterValue=${brand}`;
  }
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        api_key,
      },
    });
    if (response.status !== 200) {
      window.location.href = "/login.html";
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get all products API failed", error);
  }
}

async function getFilteredProductsIdsApi(productIds) {
  let url = PRODUCTS_URL;
  if (productIds && productIds.length > 0) {
    const filterValues = productIds.map((id) => `filterValue=${id}`).join("&");
    url = `${PRODUCTS_URL}?filterKey=id&${filterValues}`;
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
    console.error("Get filtered products IDs API failed", error);
  }
}

async function getProductByIdApi(id) {
  try {
    const response = await fetch(`${PRODUCTS_URL}/${id}`, {
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
  let url = PRODUCTS_URL;
  if (searchValue !== "" && searchValue !== null) {
    url = `${PRODUCTS_URL}?searchKey=name&searchValue=${searchValue}`;
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
//! PRODUCT API END

//! ORDER API START
async function getOrdersApi() {
  try {
    const response = await fetch(ORDER_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        api_key,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Get orders API failed", error);
  }
}

async function createOrderApi({ orderData }) {
  try {
    const response = await fetch(ORDER_URL, {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        api_key,
      },
    });
    const data = await response.json();
    console.log("create order data:", data);
    return data;
  } catch (error) {
    console.error("Create order API failed", error);
  }
}
//! ORDER API END

//! LOGIN API START
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
//! LOGIN API END
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
  getWishlistByBrandApi,
  getFilteredProductsIdsApi,
  createOrderApi,
  getOrdersApi,
  deleteAllCartItemsApi,
};
