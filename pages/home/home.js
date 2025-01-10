import { Header } from "../../components/header.js";
import { Search } from "./components/search.js";
import { Brands } from "../../components/brands/brands.js";
import { MostPopular } from "./components/most_popular.js";
import { BottomNav } from "../../components/bottom_nav/bottom_nav.js";
import { FilterPills } from "../../components/filter_pills.js";
import { ProductGrid } from "../../components/product_grid.js";
import { El } from "../../utils/El.js";
import {
  getAllProductsController,
  getWishlistController,
} from "../../controller/controller.js";
import { showLoading, hideLoading } from "../../components/loading.js";
import { getLocalStorage } from "../../controller/localStorage.js";
const urlParams = new URLSearchParams(window.location.search);
const brandsParam = urlParams.get("brands");

const products = document.getElementById("products");

let allProducts;
let allWishlistIds;

const user = getLocalStorage("user");

const loadingElement = showLoading();

try {
  allProducts = await getAllProductsController(brandsParam);
  allWishlistIds = await getWishlistController({});
  allWishlistIds = allWishlistIds.records.map((item) => item.productId);
  // console.log("allWishlistIds:", allWishlistIds);
  products.appendChild(ProductsPage());
  hideLoading(loadingElement);
} catch (error) {
  hideLoading(loadingElement);
  console.error("Error loading products:", error);
}

function ProductsPage() {
  return El({
    element: "div",
    className: "flex flex-col",
    children: [
      Header({ user }),
      Search(),
      Brands(),
      MostPopular(),
      FilterPills({ url: "/home.html" }),
      ProductGrid({
        products: allProducts.records || [],
        wishlistIds: allWishlistIds,
      }),
      BottomNav(),
    ],
  });
}

export { ProductsPage };
