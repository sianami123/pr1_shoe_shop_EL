import { BackButton } from "../../components/ui/back_button.js";
import { FilterPills } from "../../components/filter_pills.js";
import { ProductGrid } from "../../components/product_grid.js";
import { showLoading, hideLoading } from "../../components/loading.js";
import { El } from "../../utils/El.js";
import { getWishlistByBrandController } from "../../controller/controller.js";
const wishlist = document.getElementById("wishlist");
console.log("test");
wishlist.appendChild(BackButton({ text: "wishlist", backURL: "/home" }));
wishlist.appendChild(FilterPills({ url: "/wishlist.html" }));
init();

async function init() {
  try {
    const loadingElement = showLoading();
    const urlParams = new URLSearchParams(window.location.search);
    const brandParam = urlParams.get("brands");
    const wishlistProducts = await getWishlistByBrandController({
      brand: brandParam,
    });
    wishlist.appendChild(ProductGrid({ products: wishlistProducts.records }));
    hideLoading(loadingElement);
  } catch (error) {
    console.error("Error fetching wishlist products", error);
  }
}
