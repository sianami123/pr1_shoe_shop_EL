import { El } from "../../utils/El.js";
import { BottomNav } from "../../components/bottom_nav/bottom_nav.js";
const cart = document.getElementById("cart");
console.log(cart);

let activeItemToRemove = null;

cart.appendChild(CartHeader());
cart.appendChild(CartItems());
cart.appendChild(CartFooter());
cart.appendChild(BottomNav());
cart.appendChild(RemoveModal());

function CartHeader() {
  return El({
    element: "div",
    className: "flex justify-between items-center px-4 py-3",
    children: [
      El({
        element: "div",
        className: "flex items-center gap-2",
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
    className: "px-4",
    children: [
      CartItem({
        name: "Air Jordan 3 Retro",
        price: "108.00",
        image: "./assets/shoe_card.png",
        size: "Size • 42",
        color: "Black • Gray",
      }),
      CartItem({
        name: "Running Sportwear",
        price: "240.00",
        image: "./assets/shoe2.jpg",
        size: "Size • 42",
        color: "Red • White",
      }),
      CartItem({
        name: "New Balance 996",
        price: "125.00",
        image: "./assets/shoe3.jpg",
        size: "Size • 42",
        color: "Gray • Gray",
      }),
      CartItem({
        name: "Fila Running Snea...",
        price: "85.00",
        image: "./assets/shoe4.jpg",
        size: "Size • 42",
        color: "Black • White",
      }),
    ],
  });
}

function CartItem({ name, price, image, size, color }) {
  return El({
    element: "div",
    className:
      "flex justify-between items-center py-4 border-b border-gray-100",
    children: [
      El({
        element: "div",
        className: "flex gap-4",
        children: [
          El({
            element: "img",
            src: image,
            className: "w-20 h-20 object-cover rounded-lg",
          }),
          El({
            element: "div",
            className: "flex flex-col justify-between",
            children: [
              El({ element: "h3", className: "font-medium", children: name }),
              El({
                element: "p",
                className: "text-gray-500 text-sm",
                children: size,
              }),
              El({
                element: "p",
                className: "text-gray-500 text-sm",
                children: color,
              }),
              El({
                element: "p",
                className: "font-medium",
                children: `$${price}`,
              }),
            ],
          }),
        ],
      }),
      El({
        element: "div",
        className: "flex flex-col items-center gap-3",
        children: [
          El({
            element: "button",
            onclick: () => showRemoveModal({ name, price, image, size, color }),
            children: [
              El({
                element: "img",
                src: "./assets/trash.svg",
                className: "w-5 h-5",
              }),
            ],
          }),
          El({
            element: "div",
            className:
              "flex items-center gap-2 bg-gray-200 rounded-full px-3 py-1",
            children: [
              El({ element: "button", className: "text-xl", children: "−" }),
              El({ element: "span", children: "1" }),
              El({ element: "button", className: "text-xl", children: "+" }),
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

function RemoveModal() {
  return El({
    element: "div",
    className: "fixed inset-0 bg-black/50 z-50 hidden",
    id: "removeModal",
    onclick: (e) => {
      if (e.target.id === "removeModal") hideRemoveModal();
    },
    children: [
      El({
        element: "div",
        className:
          "fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 translate-y-full transition-transform duration-300",
        id: "modalContent",
        children: [
          El({
            element: "div",
            className: "flex flex-col items-center gap-6",
            children: [
              El({
                element: "h3",
                className: "text-xl font-medium",
                children: "Remove From Cart?",
              }),
              El({
                element: "div",
                className: "w-full text-center",
                id: "modalItemDetails",
                // Item details will be inserted here
              }),
              El({
                element: "div",
                className: "flex w-full gap-4",
                children: [
                  El({
                    element: "button",
                    className:
                      "flex-1 py-3.5 rounded-full border border-gray-200 text-sm",
                    onclick: hideRemoveModal,
                    children: "Cancel",
                  }),
                  El({
                    element: "button",
                    className:
                      "flex-1 py-3.5 rounded-full bg-black text-white text-sm",
                    onclick: () => {
                      // Add remove logic here
                      hideRemoveModal();
                    },
                    children: "Yes, Remove",
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

function CartItemDisplay({
  name,
  price,
  image,
  size,
  color,
  showControls = true,
}) {
  return El({
    element: "div",
    className: "flex justify-between items-center py-4",
    children: [
      El({
        element: "div",
        className: "flex gap-3",
        children: [
          El({
            element: "img",
            src: image,
            className: "w-16 h-16 object-cover rounded-xl",
          }),
          El({
            element: "div",
            className: "flex flex-col gap-1",
            children: [
              El({
                element: "h3",
                className: "text-sm font-medium",
                children: name,
              }),
              El({
                element: "p",
                className: "text-gray-400 text-xs",
                children: size,
              }),
              El({
                element: "p",
                className: "text-gray-400 text-xs",
                children: color,
              }),
              El({
                element: "p",
                className: "font-medium text-sm mt-1",
                children: `$${price}`,
              }),
            ],
          }),
        ],
      }),

      El({
        element: "div",
        className: "flex items-center gap-4",
        children: [
          El({
            element: "button",
            className: "text-lg text-gray-400",
            children: "−",
          }),
          El({
            element: "span",
            className: "text-sm",
            children: "1",
          }),
          El({
            element: "button",
            className: "text-lg",
            children: "+",
          }),
        ],
      }),
    ],
  });
}

function showRemoveModal(item) {
  activeItemToRemove = item;
  const modal = document.getElementById("removeModal");
  const modalContent = document.getElementById("modalContent");
  const modalItemDetails = document.getElementById("modalItemDetails");

  // Clear previous content
  modalItemDetails.innerHTML = "";
  // Use CartItemDisplay without controls
  modalItemDetails.appendChild(CartItemDisplay({ ...item }));

  modal.classList.remove("hidden");
  setTimeout(() => {
    modalContent.classList.remove("translate-y-full");
  }, 10);
}

function hideRemoveModal() {
  const modal = document.getElementById("removeModal");
  const modalContent = document.getElementById("modalContent");

  modalContent.classList.add("translate-y-full");
  setTimeout(() => {
    modal.classList.add("hidden");
    activeItemToRemove = null;
  }, 300);
}
