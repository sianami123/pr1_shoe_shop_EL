import { Header } from "../../components/header.js";
import { Search } from "../../components/search.js";
import { Brands } from "../../components/brands/brands.js";
import { MostPopular } from "../../components/most_popular.js";
import { BottomNav } from "../../components/bottom_nav/bottom_nav.js";
import { FilterPills } from "../../components/filter_pills.js";
import { ProductGrid } from "../../components/product_grid.js";
import { El } from "../../utils/El.js";
import { getAllProductsController } from "../../controller/controller.js";
import { showLoading, hideLoading } from "../../components/loading.js";
import { getLocalStorage } from "../../controller/localStorage.js";
const urlParams = new URLSearchParams(window.location.search);
const brandsParam = urlParams.get("brands");
console.log("brandsParam:", brandsParam);

let allProducts;

const user = getLocalStorage("user");
console.log("user:", user);
const loadingElement = showLoading();

try {
  allProducts = await getAllProductsController(brandsParam);
  console.log("allProducts in products.js:", allProducts.records);
  hideLoading(loadingElement);
} catch (error) {
  hideLoading(loadingElement);
  console.error("Error loading products:", error);
}

const products = document.getElementById("products");
products.appendChild(ProductsPage());

function ProductsPage() {
  return El({
    element: "div",
    className: "flex flex-col",
    children: [
      Header({ user }),
      Search(),
      Brands(),
      MostPopular(),
      FilterPills(),
      ProductGrid({ products: allProducts.records || [] }),
      BottomNav(),
    ],
  });
}

export { ProductsPage };
