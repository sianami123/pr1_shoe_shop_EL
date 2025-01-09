import { El } from "../../utils/El.js";
import { BottomNav } from "../../components/bottom_nav/bottom_nav.js";
import {
  getCartController,
  removeFromCartController,
  getFilteredProductsIdsController,
  updateCartQuantityController,
} from "../../controller/controller.js";
import { showToast } from "../../components/toast.js";
const cart = document.getElementById("cart");

init();

let cartProducts;
let mergedProducts;

async function init() {
  try {
    cartProducts = await getCartController({});
    const productIds = cartProducts.records.map((product) => product.productId);
    const filteredProducts = await getFilteredProductsIdsController(productIds);

    mergedProducts = cartProducts.records.map((cartItem) => {
      const productDetails = filteredProducts.records.find(
        (product) => product.id === cartItem.productId
      );
      return {
        ...productDetails,
        selectedQuantity: cartItem.selectedQuantity,
        selectedSize: cartItem.selectedSize,
        selectedColor: cartItem.selectedColor,
        cartId: cartItem.id,
      };
    });

    if (cartProducts.records.length > 0) {
      cart.innerHTML = "";
      cart.append(
        CartHeader(),
        CartItems({ cartProducts: mergedProducts }),
        CartFooter(),
        BottomNav()
      );
      document.body.appendChild(RemoveFromCartModal());

      calculateAndUpdatePrices();
    } else if (cartProducts.records.length === 0) {
      cart.innerHTML = "";
      cart.append(CartHeader(), CartEmpty(), BottomNav());
    }
  } catch (error) {
    console.log("init cart failed", error);
  }
}

function CartEmpty() {
  return El({
    element: "div",
    className: "flex flex-col items-center justify-center h-full",
    children: ["Your cart is empty"],
  });
}

function CartHeader() {
  return El({
    element: "div",
    className: "flex justify-between items-center px-4 py-3",
    children: [
      El({
        element: "div",
        className: "flex items-center gap-4",
        children: [
          El({ element: "img", src: "./assets/logo.png", className: "w-5" }),
          "My Cart",
        ],
      }),
      El({
        element: "div",
        className: "flex items-center",
        eventListener: [
          {
            event: "click",
            callback: () => {
              window.location.href = "/search.html";
            },
          },
        ],
        children: [
          El({ element: "img", src: "./assets/search.svg", className: "w-6" }),
        ],
      }),
    ],
  });
}

function CartItems({ cartProducts }) {
  console.log("cartProducts:", cartProducts);
  return El({
    element: "div",
    className: "px-4 flex flex-col gap-4 py-4 bg-gray-50",
    children: cartProducts.map((product) =>
      CartItem({
        name: product.name,
        price: product.price,
        image: product.imageURL?.[0],
        size: product.selectedSize,
        color: product.selectedColor,
        quantity: product.selectedQuantity,
        productId: product.productId,
        cartId: product.cartId,
        itemsLeft: product.items_left,
      })
    ),
  });
}

function CartItem({
  name,
  price,
  color,
  size,
  image,
  quantity,
  productId,
  cartId,
  itemsLeft,
}) {
  console.log("itemsLeft:", itemsLeft);
  const colorClass =
    color.toLowerCase() === "black"
      ? "bg-black"
      : color.toLowerCase() === "brown"
      ? "bg-brown-500"
      : color.toLowerCase() === "white"
      ? "bg-white"
      : color.toLowerCase() === "gray"
      ? "bg-gray-100"
      : color.toLowerCase() === "red"
      ? "bg-red-500"
      : color.toLowerCase() === "blue"
      ? "bg-blue-500"
      : color.toLowerCase() === "green"
      ? "bg-green-500"
      : color.toLowerCase() === "yellow"
      ? "bg-yellow-500"
      : color.toLowerCase() === "purple"
      ? "bg-purple-500"
      : "bg-white";
  return El({
    element: "div",
    className: "shadow-xl flex items-center gap-4 p-5 bg-white rounded-[35px]",
    children: [
      El({
        element: "div",
        className:
          "rounded-[20px] min-w-[130px] overflow-hidden h-[130px] w-[110px]",
        children: [
          El({
            element: "img",
            src: image,
            className: "min-w-[130px] h-[160px]",
            restAttrs: {
              alt: name,
            },
          }),
        ],
      }),
      El({
        element: "div",
        className: "flex flex-col justify-between w-full gap-3",
        children: [
          El({
            element: "div",
            className: "flex items-center justify-cente justify-between",
            children: [
              El({
                element: "h3",
                className: "font-medium text-[18px] truncate w-[180px]",
                children: name,
              }),
              El({
                element: "button",
                eventListener: [
                  {
                    event: "click",
                    callback: () => {
                      const oldModal = document.getElementById(
                        "removeFromCartModal"
                      );
                      if (oldModal) oldModal.remove();
                      document.body.appendChild(
                        RemoveFromCartModal({
                          name,
                          price,
                          color,
                          size,
                          image,
                          quantity,
                          productId,
                          cartId,
                        })
                      );
                      document
                        .getElementById("removeFromCartModal")
                        .classList.remove("hidden");
                    },
                  },
                ],
                children: [
                  El({
                    element: "img",
                    src: "../../assets/trash.svg",
                    className: "w-[30px] p-1",
                    restAttrs: {
                      alt: "remove item",
                    },
                  }),
                ],
              }),
            ],
          }),
          El({
            element: "div",
            className: "flex justify-start items-center gap-2",
            children: [
              El({
                element: "div",
                className: `${colorClass} rounded-full w-4 h-4`,
              }),
              El({
                element: "p",
                className: "text-gray-400 text-[12px]",
                children: `${color}`,
              }),
              El({
                element: "div",
                className: "bg-gray-400 h-[12px] w-[1px]",
              }),
              El({
                element: "p",
                className: "text-gray-400 text-[12px]",
                children: `Size = ${size}`,
              }),
            ],
          }),
          El({
            element: "div",
            className: "flex items-center justify-between",
            children: [
              El({
                element: "p",
                className: "text-[20px] font-medium",
                id: `price-${cartId}`,
                innerHTML: `$${price}`,
              }),
              //! Quantity /////////
              El({
                element: "div",
                className: "flex items-center ml-5 gap-3",
                children: [
                  El({
                    element: "div",
                    className:
                      "flex bg-[#ececed] justify-between w-[90px] rounded-[30px]",
                    children: [
                      El({
                        element: "button",
                        className:
                          "rounded-[30px] font-medium text-[17px] py-1 pl-4",
                        id: "quantityNegative",
                        children: "-",
                        eventListener: [
                          {
                            event: "click",
                            callback: () => {
                              const quantityNumber = parseInt(
                                document.getElementById(`quantity-${cartId}`)
                                  .innerHTML
                              );
                              if (quantityNumber > 1) {
                                handleIncreaseDecreaseQuantity(
                                  cartId,
                                  "decrease",
                                  price
                                );
                              }
                            },
                          },
                        ],
                      }),
                      El({
                        element: "p",
                        className:
                          "bg-black w-full bg-opacity-0 text-center outline-none text-[17px]",
                        id: `quantity-${cartId}`,
                        innerHTML: `${quantity}`,
                      }),
                      El({
                        element: "button",
                        className:
                          "rounded-[30px] font-medium text-[17px] py-1 pr-4",
                        id: "quantityPlus",
                        children: "+",
                        eventListener: [
                          {
                            event: "click",
                            callback: () => {
                              const quantityNumber = parseInt(
                                document.getElementById(`quantity-${cartId}`)
                                  .innerHTML
                              );
                              if (quantityNumber < itemsLeft) {
                                handleIncreaseDecreaseQuantity(
                                  cartId,
                                  "increase",
                                  price
                                );
                              }
                            },
                          },
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function CartFooter() {
  let totalPrice;
  return El({
    element: "div",
    className:
      "fixed bottom-[72px] left-0 right-0 bg-white px-4 py-4 border-t border-gray-100 flex justify-between items-center gap-6",
    children: [
      El({
        element: "div",
        className: "items-center mb-4 flex flex-col",
        children: [
          El({
            element: "span",
            className: "text-gray-500",
            children: "Total:",
          }),
          El({
            element: "span",
            className: "font-bold text-xl",
            id: "totalPriceId",
            innerHTML: `$${totalPrice || 0}`,
          }),
        ],
      }),
      El({
        element: "button",
        className:
          "w-full bg-black text-white py-3 rounded-full flex items-center justify-center gap-2",
        eventListener: [
          {
            event: "click",
            callback: () => {
              window.location.href = "/checkout.html";
            },
          },
        ],
        children: [
          "Checkout",
          El({
            element: "img",
            src: "./assets/right-arrow-white.svg",
            className: "w-4",
          }),
        ],
      }),
    ],
  });
}

function RemoveFromCartModal({
  name = "",
  price = 0,
  color = "",
  size = "",
  image = "",
  quantity = 0,
  productId = null,
  cartId = null,
} = {}) {
  const colorClass =
    color.toLowerCase() === "black"
      ? "bg-black"
      : color.toLowerCase() === "white"
      ? "bg-white"
      : color.toLowerCase() === "gray"
      ? "bg-gray-100"
      : color.toLowerCase() === "red"
      ? "bg-red-500"
      : color.toLowerCase() === "blue"
      ? "bg-blue-500"
      : color.toLowerCase() === "green"
      ? "bg-green-500"
      : color.toLowerCase() === "yellow"
      ? "bg-yellow-500"
      : color.toLowerCase() === "purple"
      ? "bg-purple-500"
      : "bg-white";

  return El({
    element: "div",
    id: "removeFromCartModal",
    className:
      "fixed inset-0 bg-black/50 z-50 hidden transition-all duration-3000 ease-in-out",
    eventListener: [
      {
        event: "click",
        callback: (e) => {
          if (e.target.id === "removeFromCartModal") {
            handleHideRemoveModal();
          }
        },
      },
    ],
    children: [
      El({
        element: "div",
        className:
          "bg-white fixed bottom-0 left-0 right-0 rounded-t-3xl p-4 flex flex-col items-center justify-center gap-4",
        children: [
          El({
            element: "h3",
            className: "text-2xl font-bold",
            children: ["Remove From Cart?"],
          }),
          El({
            element: "div",
            className:
              "shadow-xl flex items-center gap-4 p-5 bg-white rounded-[35px] w-full",
            children: name
              ? [
                  El({
                    element: "div",
                    className:
                      "rounded-[20px] min-w-[130px] overflow-hidden h-[130px] w-[110px]",
                    children: [
                      El({
                        element: "img",
                        src: `${image}`,
                        className: "min-w-[130px] h-[160px] object-cover",
                        restAttrs: {
                          alt: name,
                        },
                      }),
                    ],
                  }),
                  El({
                    element: "div",
                    className: "flex flex-col justify-between w-full gap-2",
                    children: [
                      El({
                        element: "h3",
                        className: "font-medium text-[18px]",
                        children: [name],
                      }),
                      El({
                        element: "div",
                        className: "flex justify-start items-start gap-2",
                        children: [
                          El({
                            element: "div",
                            className: `rounded-full w-4 h-4 ${colorClass}`,
                          }),
                          El({
                            element: "p",
                            className: "text-gray-400 text-[12px]",
                            children: [color],
                          }),
                          El({
                            element: "div",
                            className: "bg-gray-400 h-[12px] w-[1px]",
                          }),
                          El({
                            element: "p",
                            className: "text-gray-400 text-[12px]",
                            children: [`Size = ${size}`],
                          }),
                        ],
                      }),
                      El({
                        element: "div",
                        className: "flex items-center justify-between mt-2",
                        children: [
                          El({
                            element: "p",
                            className: "text-[20px] font-medium",
                            children: [`$${price}`],
                          }),
                        ],
                      }),
                    ],
                  }),
                ]
              : [
                  El({
                    element: "p",
                    className: "text-gray-500",
                    children: ["Loading..."],
                  }),
                ],
          }),
          El({
            element: "div",
            className: "flex justify-between gap-4 w-full",
            children: [
              El({
                element: "button",
                className: "py-3 w-full text-center bg-gray-200 rounded-[30px]",
                children: ["Cancel"],
                eventListener: [
                  {
                    event: "click",
                    callback: () => {
                      handleHideRemoveModal();
                    },
                  },
                ],
              }),
              El({
                element: "button",
                className:
                  "py-3 w-full text-center text-white bg-black shadow-xl rounded-[30px]",
                children: ["Yes, Remove"],
                eventListener: [
                  {
                    event: "click",
                    callback: async () => {
                      try {
                        if (cartId) {
                          console.log("cartId:", cartId);
                          console.log("productId:", productId);
                          await removeFromCartController({
                            id: cartId,
                          });
                          handleHideRemoveModal();
                          init();
                        }
                      } catch (error) {
                        console.error("Error removing item from cart:", error);
                        showToast({
                          message: "Failed to remove item from cart",
                          type: "error",
                        });
                      }
                    },
                  },
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function calculateAndUpdatePrices() {
  console.log("mergedProducts:", mergedProducts);
  const allPriceElements = document.querySelectorAll('[id^="price-"]');
  let totalPrice = 0;

  allPriceElements.forEach((priceElement) => {
    const id = priceElement.id.replace("price-", "");
    const quantityElement = document.getElementById(`quantity-${id}`);

    if (quantityElement) {
      const quantity = parseInt(quantityElement.innerHTML);

      const product = mergedProducts.find((p) => p.cartId === id);

      if (product) {
        console.log("product:", product);
        const productPrice = product.price * quantity;
        console.log("productPrice:", productPrice);
        priceElement.innerHTML = `$${productPrice}`;
        totalPrice += productPrice;
      }
    }
  });

  const totalPriceElement = document.getElementById("totalPriceId");
  if (totalPriceElement) {
    totalPriceElement.innerHTML = `$${totalPrice}`;
  }
}

async function handleIncreaseDecreaseQuantity(cartId, type) {
  const quantityElement = document.getElementById(`quantity-${cartId}`);
  let quantity = parseInt(quantityElement.innerHTML);
  if (type === "increase") {
    quantity += 1;
  } else {
    quantity -= 1;
  }
  quantityElement.innerHTML = quantity;

  const matchedProduct = cartProducts.records.find(
    (product) => product.id === cartId
  );

  if (matchedProduct) {
    matchedProduct.selectedQuantity = quantity;
    await updateCartQuantityController({
      cartId,
      changedQuantity: quantity,
    });
  }

  calculateAndUpdatePrices();
}

function handleHideRemoveModal() {
  document.getElementById("removeFromCartModal").classList.add("hidden");
  init();
}

function handleCheckout() {
  console.log("checkout");
}
