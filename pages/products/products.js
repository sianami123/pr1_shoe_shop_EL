import { Header } from "../../components/header.js";
import { Search } from "../../components/search.js";
import { Brands } from "../../components/brands/brands.js";
import { MostPopular } from "../../components/most_popular.js";
import { BottomNav } from "../../components/bottom_nav.js";
import { FilterPills } from "../../components/filter_pills.js";
import { ProductGrid } from "../../components/product_grid.js";
import { El } from "../../utils/El.js";
import { getAllProductsController } from "../../controller/controller.js";
import { showLoading, hideLoading } from "../../components/loading.js";
const urlParams = new URLSearchParams(window.location.search);
const brandsParam = urlParams.get("brands");
console.log("brandsParam:", brandsParam);

let allProducts;

const loadingElement = showLoading();

try {
  allProducts = await getAllProductsController(brandsParam);
  console.log("allProducts", allProducts.records);
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
      Header(),
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
