import { El } from "../../utils/El.js";
import { BottomNav } from "../../components/bottom_nav/bottom_nav.js";
const cart = document.getElementById("cart");
console.log(cart);

let activeItemToRemove = null;
cart.appendChild(RemoveFromCartModal());
cart.appendChild(CartHeader());
cart.appendChild(CartItems());
cart.appendChild(CartFooter());
cart.appendChild(BottomNav());

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
        children: [
          El({ element: "img", src: "./assets/search.svg", className: "w-6" }),
        ],
      }),
    ],
  });
}

function CartItems() {
  return El({
    element: "div",
    className: "px-4 flex flex-col gap-4 py-4 bg-gray-50",
    children: [
      CartItem({
        name: "Air Jordan 3 Retro",
        price: "108.00",
        image: "./assets/shoe_card.png",
        size: "Size • 42",
        color: "Gray",
      }),
      CartItem({
        name: "Running Sportwear",
        price: "240.00",
        image: "./assets/shoe_card.png",
        size: "Size • 42",
        color: "Black",
      }),
      CartItem({
        name: "New Balance 996",
        price: "125.00",
        image: "./assets/shoe_card.png",
        size: "Size • 42",
        color: "Red",
      }),
      CartItem({
        name: "Fila Running Snea...",
        price: "85.00",
        image: "./assets/shoe_card.png",
        size: "Size • 42",
        color: "Black",
      }),
      CartItem({
        name: "Fila Running Snea...",
        price: "85.00",
        image: "./assets/shoe_card.png",
        size: "Size • 42",
        color: "Black",
      }),
    ],
  });
}

function CartItem({ name, price, color, size, image }) {
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
        className: "flex flex-col justify-between w-full gap-1",
        children: [
          El({
            element: "div",
            className: "flex items-center justify-cente justify-between",
            children: [
              El({
                element: "h3",
                className: "font-medium text-[18px]",
                children: name,
              }),
              El({
                element: "button",
                eventListener: [
                  {
                    event: "click",
                    callback: () => {
                      handleShowRemoveModal();
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
            className: "flex justify-cente items-center gap-2",
            children: [
              El({
                element: "div",
                className: `bg-${color.toLowerCase()} rounded-full w-4 h-4`,
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
                children: `$${price}`,
              }),
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
                      }),
                      El({
                        element: "input",
                        className:
                          "bg-black w-full bg-opacity-0 text-center outline-none text-[17px]",
                        id: "quantityInput",
                        restAttrs: {
                          type: "number",
                          value: "0",
                        },
                      }),
                      El({
                        element: "button",
                        className:
                          "rounded-[30px] font-medium text-[17px] py-1 pr-4",
                        id: "quantityPlus",
                        children: "+",
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
            children: "$558.00",
          }),
        ],
      }),
      El({
        element: "button",
        className:
          "w-full bg-black text-white py-3 rounded-full flex items-center justify-center gap-2",
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

function RemoveFromCartModal() {
  return El({
    element: "div",
    id: "removeFromCartModal",
    className:
      "fixed inset-0 bg-black/50 z-50 hidden transition-all duration-3000 ease-in-out",
    eventListener: [
      {
        event: "click",
        callback: () => {
          handleHideRemoveModal();
        },
      },
    ],
    children: [
      El({
        element: "div",
        className:
          "bg-white fixed bottom-0 left-0 right-0 rounded-t-3xl p-4 flex flex-col items-center justify-center gap-4 transform transition-transform duration-300 ease-in-out",
        children: [
          El({
            element: "h3",
            className: "text-2xl font-bold",
            children: "Remove From Cart?",
          }),
          RemoveCartItem({
            productName: "Air Jordan 3 Retro",
            productPrice: "108.00",
            productColor: "Black",
            productSize: "Size • 42",
            productImage: "./assets/shoe_card.png",
          }),
          El({
            element: "div",
            className: "flex justify-between gap-4 px-4 py-3 w-full",
            children: [
              El({
                element: "button",
                className: "py-3 w-full text-center bg-gray-200 rounded-[30px]",
                children: "Cancel",
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
                children: "Yes, Remove",
                eventListener: [
                  {
                    event: "click",
                    callback: () => {
                      handleHideRemoveModal();
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

function RemoveCartItem({
  productName,
  productPrice,
  productColor,
  productSize,
  productImage,
}) {
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
            src: productImage,
            className: "w-full h-full",
            restAttrs: {
              alt: productName,
            },
          }),
        ],
      }),
      El({
        element: "div",
        className: "flex flex-col justify-between w-full gap-4",
        children: [
          El({
            element: "div",
            className: "flex items-center justify-cente justify-between",
            children: [
              El({
                element: "h3",
                className: "font-medium text-[18px]",
                children: productName,
              }),
            ],
          }),
          El({
            element: "div",
            className: "flex justify-cente items-center gap-2",
            children: [
              El({
                element: "div",
                className: `bg-${productColor.toLowerCase()} rounded-full w-4 h-4`,
              }),
              El({
                element: "p",
                className: "text-gray-400 text-[12px]",
                children: `${productColor}`,
              }),
              El({
                element: "div",
                className: "bg-gray-400 h-[12px] w-[1px]",
              }),
              El({
                element: "p",
                className: "text-gray-400 text-[12px]",
                children: `Size = ${productSize}`,
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
                children: `$${productPrice}`,
              }),
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
                      }),
                      El({
                        element: "input",
                        className:
                          "bg-black w-full bg-opacity-0 text-center outline-none text-[17px]",
                        id: "quantityInput",
                        restAttrs: {
                          type: "number",
                          value: "0",
                        },
                      }),
                      El({
                        element: "button",
                        className:
                          "rounded-[30px] font-medium text-[17px] py-1 pr-4",
                        id: "quantityPlus",
                        children: "+",
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

function handleShowRemoveModal() {
  document.getElementById("removeFromCartModal").classList.remove("hidden");
  console.log("show");
}

function handleHideRemoveModal() {
  document.getElementById("removeFromCartModal").classList.add("hidden");
}
