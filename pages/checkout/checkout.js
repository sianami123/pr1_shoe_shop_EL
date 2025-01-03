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
      BackButton({ route: "/cart.html", text: "Checkout" }),
      ShippingAddress(),
      OrderList(),
      ShippingType(),
      PromoCode(),
      PaymentSummary(),
      CheckoutButton(),
    ],
  });
}

function ShippingAddress() {
  return El({
    element: "div",
    className: "px-4 py-4 border-b",
    children: [
      El({
        element: "div",
        className: "flex justify-between items-center mb-4",
        children: [
          El({
            element: "h2",
            className: "text-lg font-medium",
            children: "Shipping Address",
          }),
          El({
            element: "button",
            className: "text-gray-400",
            eventListener: [
              {
                event: "click",
                callback: showAddressModal,
              },
            ],
            children: [
              El({
                element: "img",
                src: "./assets/edit.svg",
                className: "w-5 h-5",
              }),
            ],
          }),
        ],
      }),
      El({
        element: "p",
        className: "text-gray-600",
        children: "Home",
      }),
      El({
        element: "p",
        className: "text-sm text-gray-500 mt-1",
        children: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
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
            name: "Running Sportwear",
            price: "240.00",
            image: "./assets/shoe2.jpg",
            quantity: 1,
          }),
          OrderItem({
            name: "New Balance 996",
            price: "125.00",
            image: "./assets/shoe3.jpg",
            quantity: 1,
          }),
          OrderItem({
            name: "Fila Running Snea...",
            price: "85.00",
            image: "./assets/shoe4.jpg",
            quantity: 1,
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
        onclick: showShippingModal,
        children: [
          El({
            element: "div",
            className: "flex items-center gap-3",
            children: [
              El({
                element: "img",
                src: "./assets/truck.svg",
                className: "w-6 h-6",
              }),
              selectedShipping !== null
                ? `${selectedShipping.name} • $${selectedShipping.price}`
                : "Choose Shipping Type",
            ],
          }),
          El({
            element: "img",
            src: "./assets/chevron-right.svg",
            className: "w-5 h-5",
          }),
        ],
      }),
    ],
  });
}

function PromoCode() {
  return El({
    element: "div",
    className: "px-4 py-4 border-b",
    children: [
      El({
        element: "h2",
        className: "text-lg font-medium mb-4",
        children: "Promo Code",
      }),
      El({
        element: "div",
        className: "flex gap-2",
        children: [
          El({
            element: "input",
            className:
              "flex-1 px-4 py-3 bg-gray-50 rounded-xl text-sm placeholder:text-gray-400",
            restAttrs: {
              type: "text",
              placeholder: "Enter Promo Code",
            },
          }),
          El({
            element: "button",
            className: "bg-black text-white p-3 rounded-xl",
            children: [
              El({
                element: "img",
                src: "./assets/plus.svg",
                className: "w-5 h-5",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function OrderItem({ name, price, image, quantity }) {
  return El({
    element: "div",
    className: "flex items-center gap-3",
    children: [
      El({
        element: "img",
        src: image,
        className: "w-16 h-16 object-cover rounded-xl",
      }),
      El({
        element: "div",
        className: "flex-1",
        children: [
          El({
            element: "h3",
            className: "font-medium",
            children: name,
          }),
          El({
            element: "p",
            className: "text-gray-500 text-sm",
            children: `$${price}`,
          }),
        ],
      }),
      El({
        element: "div",
        className: "flex flex-col items-center",
        children: [
          El({
            element: "span",
            className: "text-sm text-gray-500",
            children: `x${quantity}`,
          }),
          El({
            element: "img",
            src: "./assets/minus.svg",
            className: "w-2 h-2",
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
    className: "fixed inset-0 bg-white z-50",
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
            onclick: hideAddressModal,
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
    className: "fixed inset-0 bg-white z-50",
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
            onclick: hideShippingModal,
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

// Modal control functions
function showAddressModal() {
  const modal = ShippingAddressModal();
  document.body.appendChild(modal);
}

function hideAddressModal() {
  const modal = document.getElementById("addressModal");
  if (modal) modal.remove();
}

function updateSelectedAddress() {
  const selectedRadio = document.querySelector('input[name="address"]:checked');
  if (selectedRadio) {
    selectedAddress = selectedRadio.value;
    // Update the displayed address in the main view
    // You might want to store this in state or localStorage
  }
}

function showShippingModal() {
  const modal = ShippingTypeModal();
  document.body.appendChild(modal);
}

function hideShippingModal() {
  const modal = document.getElementById("shippingModal");
  if (modal) modal.remove();
}

function updateSelectedShipping() {
  const selectedRadio = document.querySelector(
    'input[name="shipping"]:checked'
  );

  if (selectedRadio) {
    const shippingOptions = [
      { name: "Economy", price: 10, eta: "Dec 20-23" },
      { name: "Regular", price: 15, eta: "Dec 20-22" },
      { name: "Cargo", price: 20, eta: "Dec 19-20" },
      { name: "Express", price: 30, eta: "Dec 18-19" },
    ];
    selectedShipping = shippingOptions.find(
      (option) => option.name === selectedRadio.value
    );
    // You might want to update the shipping cost in PaymentSummary here
  }
}
