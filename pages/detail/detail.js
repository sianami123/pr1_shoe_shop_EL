import { El } from "../../utils/El.js";
import { BackButton } from "../../components/ui/back_button.js";
import { showLoading, hideLoading } from "../../components/loading.js";
import { showToast } from "../../components/toast.js";
import {
  addToCartController,
  removeFromCartController,
  getProductByIdController,
  addToWishlistController,
  getCartController,
  getWishlistController,
  removeFromWishlistController,
} from "../../controller/controller.js";

const detail = document.getElementById("detail");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

let detailProduct;
let cartProduct;
let isInCart = false;
let cartId;
let wishlistProduct;
let isInWishlist = false;
let wishlistId;
let quantity = 1;
let selectedSize = null;
let selectedColor = null;

const loadingElement = showLoading();

init();

async function init() {
  detail.innerHTML = "";
  try {
    cartProduct = await getCartController({ productId: id });
    if (cartProduct.records.length > 0) {
      isInCart = true;
      cartId = cartProduct.records[0].id;
    }

    wishlistProduct = await getWishlistController({ productId: id });
    console.log("wishlistProduct:", wishlistProduct.records);
    console.log("wishlistProduct:", wishlistProduct.records.length);

    if (wishlistProduct.records.length > 0) {
      isInWishlist = true;
      wishlistId = wishlistProduct.records[0].id;
    }

    detailProduct = await getProductByIdController(id);
    hideLoading(loadingElement);

    if (detailProduct) {
      detail.appendChild(DetailPage());
    } else {
      hideLoading(loadingElement);
      showToast({
        message: "Product not found",
        type: "error",
      });
    }
  } catch (error) {
    hideLoading(loadingElement);
    console.error("Error loading product:", error);
    showToast({
      message: "Error loading product",
      type: "error",
    });
  }
}

function rerenderDetailPage() {
  detail.innerHTML = "";
  detail.appendChild(DetailPage());
}

function DetailPage() {
  return El({
    element: "div",
    children: [
      BackButton({ text: "Products", backURL: "/home.html" }),
      ProductImageSlider(),
      El({
        element: "div",
        className: "container mx-auto max-w-md p-4",
        children: [
          ProductInfo(),
          El({
            element: "div",
            className: "flex justify-between space-x-4 mt-4 mb-6",
            children: [SizeSelector(), ColorSelector()],
          }),
          QuantitySelector(),
        ],
      }),
      TotalAndCart(),
    ],
  });
}

function ProductImageSlider() {
  return El({
    element: "div",
    className: "mb-6",
    children: [
      El({
        element: "div",
        className: "swiper mySwiper h-[35vh]",
        children: [
          El({
            element: "div",
            className: "swiper-wrapper",
            children: detailProduct.imageURL.map((url) =>
              El({
                element: "div",
                className: "swiper-slide",
                children: [
                  El({
                    element: "img",
                    className: "w-full h-full object-cover",
                    restAttrs: {
                      src: url,
                      alt: detailProduct.name,
                    },
                  }),
                ],
              })
            ),
          }),
          // Pagination
          El({
            element: "div",
            className: "swiper-pagination",
          }),
        ],
      }),
    ],
  });
}

function ProductInfo() {
  return El({
    element: "div",
    className: "space-y-6",
    children: [
      // Title and heart
      El({
        element: "div",
        className: "flex justify-between items-center",
        children: [
          El({
            element: "h1",
            className: "text-2xl font-semibold",
            innerText: detailProduct.name,
          }),
          El({
            element: "button",
            className: "text-2xl text-gray-400 hover:text-red-500",
            eventListener: [
              {
                event: "click",
                callback: async () => {
                  try {
                    if (isInWishlist) {
                      await removeFromWishlistController({
                        id: wishlistId,
                      });
                      console.log("wishlistId:", wishlistId);
                      isInWishlist = false;
                      rerenderDetailPage();
                    } else {
                      const wishlistId2 = await addToWishlistController({
                        productId: detailProduct.id,
                        ...detailProduct,
                      });
                      console.log("wishlistId2:", wishlistId2.id);
                      wishlistId = wishlistId2.id;
                      isInWishlist = true;
                      rerenderDetailPage();
                    }
                  } catch (error) {
                    console.error("Error updating wishlist:", error);
                    showToast({
                      message: "Failed to update wishlist",
                      type: "error",
                    });
                  }
                },
              },
            ],
            children: [
              El({
                element: "img",
                src: `${
                  isInWishlist
                    ? "../../assets/heart_red.svg"
                    : "../../assets/heart.svg"
                }`,
                alt: "heart",
                className: "w-6 h-6",
              }),
            ],
          }),
        ],
      }),
      El({
        element: "div",
        className: "flex items-center space-x-2",
        children: [
          El({
            element: "p",
            className:
              "text-sm text-gray-500 px-2 bg-gray-200 rounded-full mr-2",
            innerText: "5,371 sold",
          }),
          // star rating with svg
          El({
            element: "img",
            src: "../../assets/star.svg",
            alt: "star",
            className: "w-4 h-4",
          }),
          El({
            element: "p",
            className: "text-sm text-gray-500",
            innerText: "4.3 (5,389 reviews)",
          }),
        ],
      }),
      // divider line
      El({
        element: "div",
        className: "h-1 w-full bg-gray-200",
      }),
      // description
      El({
        element: "p",
        className: "text-sm text-gray-500",
        innerText: "Description",
      }),
      El({
        element: "p",
        className: "text-sm text-gray-500",
        innerText:
          "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
      }),

      // Brand, Category, Gender
      El({
        element: "div",
        className: "flex gap-2 text-sm text-gray-500",
        children: [
          El({
            element: "span",
            innerText: detailProduct.brand,
          }),
          El({
            element: "span",
            innerText: "•",
          }),
          El({
            element: "span",
            innerText: detailProduct.category,
          }),
          El({
            element: "span",
            innerText: "•",
          }),
          El({
            element: "span",
            innerText: detailProduct.gender,
          }),
        ],
      }),
      // Inventory///
      //////////////////////////////////////
    ],
  });
}

function SizeSelector() {
  return El({
    element: "div",
    className: "space-y-3",
    children: [
      El({
        element: "h2",
        className: "font-semibold",
        innerText: "Size",
      }),
      El({
        element: "div",
        className: "flex gap-3",
        children: detailProduct.sizes.map((size) =>
          El({
            element: "button",
            className: `w-8 h-8 rounded-full border ${
              selectedSize === size
                ? "border-black bg-black text-white"
                : "border-gray-300 hover:border-black"
            }`,
            innerText: size,
            eventListener: [
              {
                event: "click",
                callback: () => {
                  selectedSize = size;
                  rerenderDetailPage();
                },
              },
            ],
          })
        ),
      }),
    ],
  });
}

function ColorSelector() {
  return El({
    element: "div",
    className: "space-y-3",
    children: [
      El({
        element: "h2",
        className: "font-semibold",
        innerText: "Color",
      }),
      El({
        element: "div",
        className: "flex gap-3",
        children: detailProduct.colors.map((color) =>
          El({
            element: "button",
            className: `w-8 h-8 rounded-full ${
              selectedColor === color
                ? "border-4 border-black"
                : "border-2 border-gray-300"
            }`,
            restAttrs: {
              style: `background-color: ${color}`,
            },
            eventListener: [
              {
                event: "click",
                callback: () => {
                  selectedColor = color;
                  rerenderDetailPage();
                },
              },
            ],
          })
        ),
      }),
    ],
  });
}

function QuantitySelector() {
  return El({
    element: "div",
    className: "space-y-3 flex items-center space-x-6",
    children: [
      El({
        element: "h2",
        className: "font-semibold ",
        innerText: "Quantity",
      }),
      El({
        element: "div",
        className: "flex items-center border rounded-full",
        children: [
          El({
            element: "button",
            className: "px-1 py-2 text-xl",
            innerText: "−",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  if (quantity > 1) {
                    quantity--;
                    document.getElementById("quantityValue").innerText =
                      quantity;
                    rerenderDetailPage();
                  }
                },
              },
            ],
          }),
          El({
            element: "span",
            className: "px-4 py-2",
            id: "quantityValue",
            innerText: quantity,
          }),
          El({
            element: "button",
            className: "px-1 py-2 text-xl",
            innerText: "+",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  if (quantity < detailProduct.items_left) {
                    console.log("quantity:", quantity);
                    quantity++;
                    document.getElementById("quantityValue").innerText =
                      quantity;
                    rerenderDetailPage();
                  }
                },
              },
            ],
          }),
        ],
      }),
      El({
        element: "span",
        className: "text-gray-600",
        innerText: `${detailProduct.items_left} items left`,
      }),
    ],
  });
}

function TotalAndCart() {
  return El({
    element: "div",
    className: "bg-white border-t fixed bottom-0 w-full p-4",
    children: [
      El({
        element: "div",
        className:
          "container mx-auto max-w-md flex justify-between items-center",
        children: [
          El({
            element: "div",
            className: "space-y-1",
            children: [
              El({
                element: "span",
                className: "text-sm text-gray-500",
                innerText: "Total price",
              }),
              El({
                element: "p",
                className: "text-xl font-semibold",
                innerText: `$${detailProduct.price * quantity}`,
              }),
            ],
          }),
          El({
            element: "button",
            className: `w-[250px] bg-black text-white px-3 py-2 rounded-full flex items-center justify-center gap-2 ${
              !isInCart && (!selectedSize || !selectedColor)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`,
            disabled: !isInCart && (!selectedSize || !selectedColor),
            eventListener: [
              {
                event: "click",
                callback: async () => {
                  if (!isInCart && (!selectedSize || !selectedColor)) {
                    showToast({
                      message: "Please select size and color",
                      type: "error",
                    });
                    return;
                  }
                  if (isInCart) {
                    await removeFromCartController({
                      id: cartId,
                    });
                    isInCart = false;
                    rerenderDetailPage();
                  } else {
                    const addedCartId = await addToCartController({
                      ...detailProduct,
                      selectedColor,
                      selectedSize,
                      productId: detailProduct.id,
                      selectedQuantity: quantity,
                    });
                    isInCart = true;
                    cartId = addedCartId.id;
                    rerenderDetailPage();
                  }
                },
              },
            ],
            children: [
              El({
                element: "img",
                src: "../../pages/detail/assets/bag.png",
                alt: "cart",
                className: "w-6 h-6",
              }),
              El({
                element: "span",
                innerText: `${isInCart ? "Remove from cart" : "Add to Cart"}`,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 2,
  centeredSlides: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
