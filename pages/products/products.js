import { Header } from "../../components/header.js";
import { Search } from "../../components/search.js";
import { Brands } from "../../components/brands.js";
import { MostPopular } from "../../components/most_popular.js";
import { BottomNav } from "../../components/bottom_nav.js";
import { El } from "../../utils/El.js";

const products = document.getElementById("products");
products.appendChild(renderProductsPage());

renderProductsPage();

function renderProductsPage() {
  return El({
    element: "div",
    className: "flex flex-col",
    children: [Header(), Search(), Brands(), MostPopular(), BottomNav()],
  });
}

export { renderProductsPage };
