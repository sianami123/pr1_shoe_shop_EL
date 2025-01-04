import { BackButton } from "../../components/ui/back_button.js";
import { FilterPills } from "../../components/filter_pills.js";
import { getAllProductsController } from "../../controller/controller.js";
import { showLoading, hideLoading } from "../../components/loading.js";
import { ProductGrid } from "../../components/product_grid.js";

const mostPopular = document.getElementById("most-popular");

mostPopular.appendChild(BackButton({ text: "most popular", backURL: "/home" }));
mostPopular.appendChild(FilterPills({ url: "/most_popular.html" }));

const url = new URL(window.location.href);
const brandsParam = url.searchParams.get("brands");
const loadingElement = showLoading();

try {
  const products = await getAllProductsController(brandsParam);
  console.log(products.records);
  mostPopular.appendChild(ProductGrid({ products: products.records }));
  hideLoading(loadingElement);
} catch (error) {
  console.error("Error fetching most popular products", error);
}
