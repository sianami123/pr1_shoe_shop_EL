import { El } from "../../utils/El.js";
import { BackButton } from "../../components/ui/back_button.js";
import { getProductByIdController } from "../../controller/controller.js";
import { showLoading, hideLoading } from "../../components/loading.js";
import { showToast } from "../../components/toast.js";
import { addToCartController } from "../../controller/controller.js";

const detail = document.getElementById("detail");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Declare detailProduct in the outer scope
let detailProduct;
let quantity = 1;

const loadingElement = showLoading();

try {
  detailProduct = await getProductByIdController(id);
  console.log("detailProduct:", detailProduct);

  hideLoading(loadingElement);

  if (detailProduct) {
    detail.appendChild(DetailPage());
  } else {
    hideLoading(loadingElement);
    showToast({
      message: detailProduct.message,
      type: "error",
    });
  }
} catch (error) {
  // Hide loading if there's an error
  hideLoading(loadingElement);
  console.error("Error loading product:", error);
  showToast({
    message: detailProduct.message,
    type: "error",
  });
}

function rerenderDetailPage() {
  console.log("rerenderDetailPage");
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
            className: "flex justify-between",
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
    className: "mb-6 ",
    children: [
      El({
        element: "swiper-container",
        className: "h-[45vh]",
        restAttrs: {
          "data-swiper-pagination": "true",
          "data-swiper-pagination-clickable": "true",
        },
        innerHTML: detailProduct.imageURL
          .map(
            (url) => `
            <swiper-slide>
              <img 
                class="w-full h-full object-cover" 
                src="${url}" 
                alt="${detailProduct.name}"
              />
            </swiper-slide>
          `
          )
          .join(""),
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
            children: [
              El({
                element: "img",
                src: "../../assets/heart.svg",
                alt: "heart",
                className: "w-6 h-6",
              }),
            ],
          }),
        ],
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
    className: "space-y-3 ",
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
            className: `w-8 h-8 rounded-full border border-gray-300 hover:border-black`,
            innerText: size,
          })
        ),
      }),
    ],
  });
}

function ColorSelector() {
  return El({
    element: "div",
    className: "space-y-3 ",
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
            className: `w-8 h-8 rounded-full border-2 border-black`,
            restAttrs: {
              style: `background-color: ${color}`,
            },
          })
        ),
      }),
    ],
  });
}

function QuantitySelector() {
  return El({
    element: "div",
    className: "space-y-3 flex items-center space-x-4",
    children: [
      El({
        element: "h2",
        className: "font-semibold",
        innerText: "Quantity",
      }),
      El({
        element: "div",
        className: "inline-flex items-center border rounded-full",
        children: [
          El({
            element: "button",
            className: "px-4 py-2 text-xl",
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
            className: "px-4 py-2 text-xl",
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
            className:
              "bg-black text-white px-3 py-2 rounded-full flex items-center gap-2",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  addToCartController({
                    ...detailProduct,
                    quantity,
                    size,
                    color,
                  });
                },
              },
            ],
            children: [
              El({
                element: "img",
                src: "../../assets/cart.svg",
                alt: "cart",
                className: "w-6 h-6 invert ",
              }),
              "Add to Cart",
            ],
          }),
        ],
      }),
    ],
  });
}
