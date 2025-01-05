import { El } from "../../utils/El.js";
import { BackButton } from "../../components/ui/back_button.js";

const checkout = document.getElementById("checkout");

let selectedAddress = "Home"; // Track selected address
let selectedShipping = null;

checkout.appendChild(CheckoutPage());

function CheckoutPage() {
  return El({
    element: "div",
    className: "pb-32",
    children: [
      Header(),
      ShippingAddress(),
      OrderList(),
      ShippingType(),
      PromoCode(),
      PaymentSummary(),
      CheckoutButton(),
      ShippingAddressModal(),
      ShippingTypeModal(),
    ],
  });
}

function Header() {
  return El({
    element: "div",
    className: "flex justify-between items-center",
    children: [
      BackButton({ text: "Checkout", backURL: "/cart.html" }),
      El({
        element: "button",
        className: " p-2 rounded-full",
        children: [
          El({
            element: "img",
            src: "./pages/checkout/assets/More Circle.svg",
            className: "w-6 h-6",
          }),
        ],
      }),
    ],
  });
}

function ShippingAddress() {
  return El({
    element: "div",
    className: "mt-5 mx-5 border-b-[1px] border-b-gray-200",
    children: [
      El({
        element: "div",
        children: [
          El({
            element: "h3",
            className: "text-[17px] font-medium pb-2",
            children: "Shipping Address",
          }),
        ],
      }),
      El({
        element: "div",
        className: "flex gap-3 p-5 mt-0 mb-5 bg-white shadow-xl rounded-[30px]",
        children: [
          El({
            element: "div",
            className:
              "flex justify-center items-center bg-gray-300 rounded-full w-[60px] h-[60px]",
            children: [
              El({
                element: "div",
                className: "bg-black rounded-full w-[45px] h-[45px] p-3",
                children: [
                  El({
                    element: "img",
                    src: "./pages/checkout/assets/location.svg",
                    restAttrs: {
                      alt: "location icon",
                    },
                  }),
                ],
              }),
            ],
          }),
          El({
            element: "div",
            className: "flex flex-col gap-1 justify-center",
            children: [
              El({
                element: "h3",
                className: "text-[20px] font-medium",
                children: "Home",
              }),
              El({
                element: "p",
                className: "text-[14px] text-gray-500",
                children: "61480 Sunbrook Park PC 5679",
              }),
            ],
          }),
          El({
            element: "div",
            className: "flex items-center ml-auto",
            children: [
              El({
                element: "img",
                src: "./pages/checkout/assets/edit.svg",
                className: "w-6",
                eventListener: [
                  {
                    event: "click",
                    callback: (e) => {
                      e.preventDefault();
                      const addressModal =
                        document.getElementById("addressModal");
                      addressModal.classList.remove("hidden");
                    },
                  },
                ],
                restAttrs: {
                  alt: "edit icon",
                },
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function OrderList() {
  return El({
    element: "div",
    className: "px-4 py-4",
    children: [
      El({
        element: "h2",
        className: "text-lg font-medium mb-4",
        children: "Order List",
      }),
      El({
        element: "div",
        className: "space-y-4",
        children: [
          OrderItem({
            name: "Air Jordan 3 Retro",
            price: "200.00",
            image: "./assets/shoe_card.png",
            quantity: 1,
          }),
          OrderItem({
            name: "Air Jordan 3 Retro",
            price: "200.00",
            image: "./assets/shoe_card.png",
            quantity: 1,
          }),
          OrderItem({
            name: "Air Jordan 3 Retro",
            price: "200.00",
            image: "./assets/shoe_card.png",
            quantity: 1,
          }),
          OrderItem({
            name: "Air Jordan 3 Retro",
            price: "200.00",
            image: "./assets/shoe_card.png",
            quantity: 1,
          }),
        ],
      }),
    ],
  });
}

function OrderItem({ name, price, image, quantity }) {
  return El({
    element: "div",
    className: "shadow-xl flex gap-4 p-5 bg-white rounded-[35px]",
    children: [
      El({
        element: "div",
        className:
          "rounded-[20px] min-w-[130px] overflow-hidden h-[130px] w-[110px]",
        children: [
          El({
            element: "img",
            src: image,
            className: "min-w-[130px]",
          }),
        ],
      }),
      El({
        element: "div",
        className: "flex flex-col justify-between w-full gap-1",
        children: [
          El({
            element: "div",
            className: "flex items-center justify-between",
            children: [
              El({
                element: "h3",
                className: "font-medium text-[18px]",
                children: name,
              }),
            ],
          }),
          El({
            element: "div",
            className: "flex justify-start items-center gap-2",
            children: [
              El({
                element: "div",
                className: "bg-black rounded-full w-4 h-4",
              }),
              El({
                element: "p",
                className: "text-gray-400 text-[12px]",
                children: "Black",
              }),
              El({
                element: "div",
                className: "bg-gray-400 h-[12px] w-[1px]",
              }),
              El({
                element: "p",
                className: "text-gray-400 text-[12px]",
                children: "Size = 42",
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
                      "flex bg-[#ececed] justify-center items-center w-[40px] h-[40px] rounded-full",
                    children: [
                      El({
                        element: "h3",
                        children: [quantity],
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

function ShippingType() {
  return El({
    element: "div",
    className: "px-4 py-4 border-b",
    children: [
      El({
        element: "h2",
        className: "text-lg font-medium mb-4",
        children: "Choose Shipping",
      }),
      El({
        element: "button",
        className:
          "w-full flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl",
        children: [
          El({
            element: "div",
            className: "flex items-center gap-3",
            children: [
              El({
                element: "img",
                src: "./pages/checkout/assets/truck.svg",
                className: "w-9 h-9",
              }),
              selectedShipping !== null
                ? `${selectedShipping.name} • $${selectedShipping.price}`
                : "Choose Shipping Type",
            ],
          }),
          El({
            element: "button",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  const shippingModal =
                    document.getElementById("shippingModal");
                  shippingModal.classList.remove("hidden");
                },
              },
            ],
            children: [
              El({
                element: "img",
                src: "./pages/checkout/assets/next.svg",
                className: "w-5 h-5",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function PromoCode() {
  return El({
    element: "div",
    className: "p-5 pt-0",
    children: [
      El({
        element: "h3",
        className: "pb-5 text-[17px] font-medium",
        children: "Promo Code",
      }),
      El({
        element: "div",
        className:
          "flex gap-5 items-center justify-between bg-gray-100 p-1 rounded-[20px]",
        children: [
          El({
            element: "input",
            className: "outline-none bg-black bg-opacity-0 p-1",
            restAttrs: {
              type: "text",
              placeholder: "Enter Promo Code",
            },
          }),
          El({
            element: "img",
            src: "./pages/checkout/assets/add.svg",
            className: "w-[60px]",
            restAttrs: {
              alt: "",
            },
          }),
        ],
      }),
    ],
  });
}

function PaymentSummary() {
  return El({
    element: "div",
    className: "px-4 py-4 space-y-3",
    children: [
      El({
        element: "div",
        className: "flex justify-between items-center",
        children: [
          El({
            element: "span",
            className: "text-gray-500",
            children: "Amount",
          }),
          El({
            element: "span",
            className: "font-medium",
            children: "$558.00",
          }),
        ],
      }),
      El({
        element: "div",
        className: "flex justify-between items-center",
        children: [
          El({
            element: "span",
            className: "text-gray-500",
            children: "Shipping",
          }),
          El({
            element: "span",
            className: "font-medium",
            children: "$24.00",
          }),
        ],
      }),
      El({
        element: "div",
        className: "pt-3 border-t flex justify-between items-center",
        children: [
          El({
            element: "span",
            className: "text-gray-500",
            children: "Total",
          }),
          El({
            element: "span",
            className: "font-medium text-lg",
            children: "$582.00",
          }),
        ],
      }),
    ],
  });
}

function CheckoutButton() {
  return El({
    element: "div",
    className: "fixed bottom-0 left-0 right-0 bg-white border-t p-4",
    children: [
      El({
        element: "button",
        className:
          "w-full bg-black text-white py-3.5 rounded-full flex items-center justify-center gap-2",
        eventListener: [
          {
            event: "click",
            callback: () => {
              window.location.href = "/payment.html";
            },
          },
        ],
        children: [
          "Continue to Payment",
          El({
            element: "img",
            src: "./assets/right-arrow-white.svg",
            className: "w-4 h-4",
          }),
        ],
      }),
    ],
  });
}

function ShippingAddressModal() {
  const addresses = [
    { name: "Home", address: "4140 Sushoma Park, FC 6679", isDefault: true },
    { name: "Office", address: "5970 Meadow Valley Terra, FC 3627" },
    { name: "Apartment", address: "2983 Clyde Gallagher, FC 4652" },
    { name: "Parent's House", address: "5257 Blue Bill Park, FC 6527" },
  ];

  return El({
    element: "div",
    className: "fixed inset-0 bg-white z-50 hidden",
    id: "addressModal",
    children: [
      // Header
      El({
        element: "div",
        className: "flex items-center gap-3 p-4 border-b",
        children: [
          El({
            element: "button",
            className: "p-1",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  const addressModal = document.getElementById("addressModal");
                  addressModal.classList.add("hidden");
                },
              },
            ],
            children: [
              El({
                element: "img",
                src: "./assets/back_arrow.svg",
                className: "w-6 h-6",
              }),
            ],
          }),
          El({
            element: "h2",
            className: "text-lg font-medium",
            children: "Shipping Address",
          }),
        ],
      }),
      // Address List
      El({
        element: "div",
        className: "p-4 space-y-3",
        children: addresses.map((address) => AddressOption(address)),
      }),
      // Add New Address Button
      El({
        element: "div",
        className: "px-4",
        children: [
          El({
            element: "button",
            className: "w-full py-4 rounded-xl bg-gray-100 text-gray-600",
            children: "Add New Address",
          }),
        ],
      }),
      // Apply Button
      El({
        element: "div",
        className: "fixed bottom-0 left-0 right-0 p-4 bg-white border-t",
        children: [
          El({
            element: "button",
            className: "w-full bg-black text-white py-3.5 rounded-full",
            onclick: () => {
              updateSelectedAddress();
              hideAddressModal();
            },
            children: "Apply",
          }),
        ],
      }),
    ],
  });
}

function AddressOption({ name, address, isDefault }) {
  return El({
    element: "div",
    className: "flex items-center gap-3 py-3",
    children: [
      El({
        element: "div",
        className: "flex-1 flex gap-3",
        children: [
          El({
            element: "div",
            className: "flex items-center",
            children: [
              El({
                element: "img",
                src: "./assets/location.svg",
                className: "w-5 h-5",
              }),
            ],
          }),
          El({
            element: "div",
            className: "flex-1",
            children: [
              El({
                element: "div",
                className: "flex items-center gap-2",
                children: [
                  El({
                    element: "span",
                    className: "font-medium",
                    children: name,
                  }),
                  isDefault &&
                    El({
                      element: "span",
                      className: "text-xs text-gray-400",
                      children: "(Default)",
                    }),
                ],
              }),
              El({
                element: "p",
                className: "text-sm text-gray-500",
                children: address,
              }),
            ],
          }),
        ],
      }),
      El({
        element: "input",
        className: "w-5 h-5 accent-black",
        restAttrs: {
          type: "radio",
          name: "address",
          value: name,
          checked: selectedAddress === name,
        },
      }),
    ],
  });
}

function ShippingTypeModal() {
  const shippingOptions = [
    {
      name: "Economy",
      price: 10,
      eta: "Dec 20-23",
      icon: "truck-slow.svg",
    },
    {
      name: "Regular",
      price: 15,
      eta: "Dec 20-22",
      icon: "truck.svg",
    },
    {
      name: "Cargo",
      price: 20,
      eta: "Dec 19-20",
      icon: "cargo.svg",
    },
    {
      name: "Express",
      price: 30,
      eta: "Dec 18-19",
      icon: "express.svg",
    },
  ];

  return El({
    element: "div",
    className: "fixed inset-0 bg-white z-50 hidden",
    id: "shippingModal",
    children: [
      // Header
      El({
        element: "div",
        className: "flex items-center gap-3 p-4 border-b",
        children: [
          El({
            element: "button",
            className: "p-1",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  const shippingModal =
                    document.getElementById("shippingModal");
                  shippingModal.classList.add("hidden");
                },
              },
            ],
            children: [
              El({
                element: "img",
                src: "./assets/back_arrow.svg",
                className: "w-6 h-6",
              }),
            ],
          }),
          El({
            element: "h2",
            className: "text-lg font-medium",
            children: "Choose Shipping",
          }),
        ],
      }),
      // Shipping Options List
      El({
        element: "div",
        className: "p-4 space-y-3",
        children: shippingOptions.map((option) => ShippingOption(option)),
      }),
      // Apply Button
      El({
        element: "div",
        className: "fixed bottom-0 left-0 right-0 p-4 bg-white border-t",
        children: [
          El({
            element: "button",
            className: "w-full bg-black text-white py-3.5 rounded-full",
            onclick: () => {
              updateSelectedShipping();
              hideShippingModal();
            },
            children: "Apply",
          }),
        ],
      }),
    ],
  });
}

function ShippingOption({ name, price, eta, icon }) {
  return El({
    element: "div",
    className: "flex items-center gap-3 py-3",
    children: [
      El({
        element: "div",
        className: "flex-1 flex gap-3",
        children: [
          El({
            element: "div",
            className: "flex items-center",
            children: [
              El({
                element: "img",
                src: `./assets/${icon}`,
                className: "w-6 h-6",
              }),
            ],
          }),
          El({
            element: "div",
            className: "flex-1",
            children: [
              El({
                element: "span",
                className: "font-medium",
                children: name,
              }),
              El({
                element: "p",
                className: "text-sm text-gray-500",
                children: `Estimated Arrival: ${eta}`,
              }),
            ],
          }),
          El({
            element: "span",
            className: "font-medium",
            children: `$${price}`,
          }),
        ],
      }),
      El({
        element: "input",
        className: "w-5 h-5 accent-black",
        restAttrs: {
          type: "radio",
          name: "shipping",
          value: name,
          checked: selectedShipping?.name === name,
        },
      }),
    ],
  });
}
