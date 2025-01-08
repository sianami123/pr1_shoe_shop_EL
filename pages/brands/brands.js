import { El } from "../../utils/El.js";
import { getAllProductsController } from "../../controller/controller.js";
import { showLoading, hideLoading } from "../../components/loading.js";
import { showToast } from "../../components/toast.js";
import { BackButton } from "../../components/ui/back_button.js";
import { ProductGrid } from "../../components/product_grid.js";

let productsBrands;
let brandsParam;

const pathParams = new URLSearchParams(window.location.search);
brandsParam = pathParams.get("brands");
// console.log("brandsParam:", brandsParam);
const brands = document.getElementById("brands");
brands.appendChild(BackButton({ text: brandsParam, backURL: "/home.html" }));

try {
  const loadingElement = showLoading();
  productsBrands = await getAllProductsController(brandsParam);
  hideLoading(loadingElement);
  productsBrands = productsBrands.records;
  if (productsBrands) {
    brands.appendChild(BrandsPage({ productsBrandsArray: productsBrands }));
  }
} catch (error) {
  console.error("Error loading products:", error);
  showToast({
    message: error.message,
    type: "error",
  });
}

function BrandsPage({ productsBrandsArray = [] }) {
  return El({
    element: "div",
    className: "flex flex-col",
    children: [ProductGrid({ products: productsBrandsArray, wishlistIds: [] })],
  });
}
