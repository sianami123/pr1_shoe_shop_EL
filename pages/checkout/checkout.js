import { El } from "../../utils/El.js";
import { showToast } from "../../components/toast.js";
import { BackButton } from "../../components/ui/back_button.js";
import {
  getCartController,
  getFilteredProductsIdsController,
  createOrderController,
} from "../../controller/controller.js";

const checkout = document.getElementById("checkout");

let selectedAddress = { name: "Home", address: "61480 Sunbrook Park PC 5679" };
let selectedShipping = { name: "Economy", price: 10 };
let mergedProducts;
let activePromoCode = null;
let selectedPaymentMethod = null;

init();

function rerenderUI() {
  checkout.innerHTML = "";
  checkout.append(CheckoutPage());
  calculateAndUpdatePrices();
}

async function init() {
  try {
    const cartProducts = await getCartController({});
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

    console.log("mergedProducts in init:", mergedProducts);

    if (cartProducts.records.length > 0) {
      checkout.innerHTML = "";
      checkout.append(CheckoutPage());
    } else if (cartProducts.records.length === 0) {
      checkout.innerHTML = "";
    }
    calculateAndUpdatePrices();
  } catch (error) {
    console.log("init cart failed", error);
  }
}

function calculateAndUpdatePrices() {
  // Calculate subtotal from products
  let subtotal = mergedProducts.reduce((total, product) => {
    return total + product.price * product.selectedQuantity;
  }, 0);

  // Calculate shipping cost
  const shippingCost = selectedShipping?.price || 0;

  // Calculate promo discount (30% if active)
  const promoDiscount = activePromoCode ? subtotal * 0.3 : 0;

  // Calculate final total
  const total = subtotal + shippingCost - promoDiscount;

  // Update UI elements
  const subtotalElement = document.getElementById("subtotal-amount");
  const shippingElement = document.getElementById("shipping-amount");
  const promoElement = document.getElementById("promo-amount");
  const totalElement = document.getElementById("total-amount");

  if (subtotalElement) {
    subtotalElement.innerHTML = `$${subtotal.toFixed(2)}`;
  }

  if (shippingElement) {
    shippingElement.innerHTML = `$${shippingCost.toFixed(2)}`;
  }

  if (promoElement) {
    promoElement.innerHTML = `-$${promoDiscount.toFixed(2)}`;
  }

  if (totalElement) {
    totalElement.innerHTML = `$${total.toFixed(2)}`;
  }
}

function calculateTotalPrice() {
  // Calculate subtotal from products
  const subtotal = mergedProducts.reduce((total, product) => {
    return total + product.price * product.selectedQuantity;
  }, 0);

  // Get shipping cost from selected shipping option
  const shippingCost = selectedShipping?.price || 0;

  // Calculate total
  const total = subtotal + shippingCost;

  return {
    subtotal,
    shippingCost,
    total,
  };
}

function CheckoutPage() {
  return El({
    element: "div",
    className: "pb-32",
    children: [
      Header(),
      ShippingAddress(),
      OrderList({ mergedProducts }),
      ShippingType(),
      PromoCode(),
      El({
        element: "div",
        id: "payment-summary-container",
        children: [PaymentSummary()],
      }),
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
                children: [`${selectedAddress.name}`],
              }),
              El({
                element: "p",
                className: "text-[14px] text-gray-500",
                children: [`${selectedAddress.address}`],
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

function OrderList({ mergedProducts }) {
  return El({
    element: "div",
    className: "px-4 py-4",
    children: [
      El({
        element: "h2",
        className: "text-lg font-medium mb-4",
        children: ["Order List"],
      }),
      El({
        element: "div",
        className: "space-y-4",
        children: mergedProducts.map((product) => {
          return OrderItem({
            name: product.name,
            price: product.price,
            image: product.imageURL?.[0],
            quantity: product.selectedQuantity,
            selectedSize: product.selectedSize,
            selectedColor: product.selectedColor,
          });
        }),
      }),
    ],
  });
}

function OrderItem({
  name,
  price,
  image,
  quantity,
  selectedSize,
  selectedColor,
}) {
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
                children: `$${price * quantity}`,
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
      activePromoCode
        ? // Show applied promo code with close button
          El({
            element: "div",
            className: "flex items-center gap-2",
            children: [
              El({
                element: "div",
                className:
                  "bg-black text-white rounded-full py-2 px-4 flex items-center gap-2",
                children: [
                  El({
                    element: "span",
                    children: "Discount 30% Off",
                  }),
                  El({
                    element: "button",
                    className: "ml-1",
                    eventListener: [
                      {
                        event: "click",
                        callback: () => {
                          activePromoCode = null;
                          rerenderUI();
                        },
                      },
                    ],
                    children: [
                      El({
                        element: "img",
                        src: "./pages/checkout/assets/close.svg",
                        className: "w-4 h-4",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
        : // Show input field when no promo code is applied
          El({
            element: "div",
            className:
              "flex gap-5 items-center justify-between bg-gray-100 p-1 rounded-[20px]",
            children: [
              El({
                element: "input",
                className: "outline-none bg-black bg-opacity-0 p-1 flex-1 ml-3",
                id: "promo-input",
                restAttrs: {
                  type: "text",
                  placeholder: "Enter Promo Code",
                },
              }),
              El({
                element: "button",
                className: "w-[60px]",
                eventListener: [
                  {
                    event: "click",
                    callback: () => {
                      const promoInput = document.getElementById("promo-input");
                      if (promoInput.value.trim() === "gold") {
                        activePromoCode = "30";
                        rerenderUI();
                      }
                    },
                  },
                ],
                children: [
                  El({
                    element: "img",
                    src: "./pages/checkout/assets/add.svg",
                    className: "w-full",
                    restAttrs: {
                      alt: "add promo code",
                    },
                  }),
                ],
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
            id: "subtotal-amount",
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
            id: "shipping-amount",
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
            children: "Promo",
          }),
          El({
            element: "span",
            className: "font-medium",
            id: "promo-amount",
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
            id: "total-amount",
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
          "checkout-button w-full bg-black text-white py-3.5 rounded-full flex items-center justify-center gap-2 cursor-pointer",
        eventListener: [
          {
            event: "click",
            callback: async () => {
              if (!selectedAddress) {
                showToast({ message: "Please select a shipping address" });
                return;
              }
              if (!selectedShipping) {
                showToast({ message: "Please select a shipping method" });
                return;
              }

              showPaymentMethodModal();
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
                src: "./pages/checkout/assets/back-arrow.svg",
                className: "w-6 h-6",
              }),
            ],
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
            className: "w-full py-4 rounded-3xl bg-gray-100 text-gray-600",
            children: ["Add New Address"],
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
            eventListener: [
              {
                event: "click",
                callback: () => {
                  const addressModal = document.getElementById("addressModal");
                  addressModal.classList.add("hidden");
                  rerenderUI();
                },
              },
            ],
            children: ["Apply"],
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
                src: "./pages/checkout/assets/location.svg",
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
                  isDefault
                    ? El({
                        element: "span",
                        className: "text-xs text-gray-400",
                        children: "(Default)",
                      })
                    : El({
                        element: "span",
                        className: "text-xs text-gray-400",
                        children: "",
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
        eventListener: [
          {
            event: "change",
            callback: () => {
              selectedAddress = { name, address };
            },
          },
        ],
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
      icon: "delivered.svg",
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
              const shippingModal = document.getElementById("shippingModal");
              shippingModal.classList.add("hidden");
              rerenderUI();
            },
            children: ["Apply"],
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
                src: `./pages/checkout/assets/${icon}`,
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
        eventListener: [
          {
            event: "change",
            callback: (e) => {
              if (e.target.checked) {
                selectedShipping = { name, price };
                // Update the payment summary
                const paymentSummaryContainer = document.querySelector(
                  "#payment-summary-container"
                );
                if (paymentSummaryContainer) {
                  paymentSummaryContainer.innerHTML = "";
                  paymentSummaryContainer.append(PaymentSummary());
                }
              }
            },
          },
        ],
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

// ! Payment Method Modal /////////////////////////////

const paymentMethods = [
  {
    name: "My Wallet",
    balance: "957.99",
    icon: "wallet.svg",
    id: "wallet",
  },
  {
    name: "PayPal",
    icon: "paypal.svg",
    id: "paypal",
  },
  {
    name: "Google Pay",
    icon: "google.svg",
    id: "google",
  },
  {
    name: "Apple Pay",
    icon: "apple.svg",
    id: "apple",
  },
  {
    name: "•••• •••• •••• 4679",
    icon: "mastercard.svg",
    id: "mastercard",
  },
];

function showPaymentMethodModal() {
  checkout.innerHTML = "";
  checkout.appendChild(PaymentPage());
  checkout.appendChild(showSuccessModal());
}

function PaymentPage() {
  return El({
    element: "div",
    className: "min-h-screen pb-32",
    children: [
      // Header with back button
      El({
        element: "div",
        className: "flex items-center justify-between p-4 border-b",
        children: [
          BackButton({ text: "Payment", backURL: "/cart.html" }),
          El({
            element: "button",
            className: "p-1",
            children: [
              El({
                element: "img",
                src: "./pages/checkout/assets/add.svg",
                className: "w-6 h-6",
              }),
            ],
          }),
        ],
      }),
      // Subtitle
      El({
        element: "p",
        className: "px-4 py-3 text-gray-500 text-sm",
        children: "Select the payment method you want to use",
      }),
      // Payment Methods List
      El({
        element: "div",
        className: "px-4 space-y-3",
        children: paymentMethods.map((method) => PaymentMethodItem(method)),
      }),
      // Confirm Button
      El({
        element: "div",
        className: "fixed bottom-0 left-0 right-0 p-4 bg-white border-t",
        children: [
          El({
            element: "button",
            className: "w-full bg-black text-white py-3.5 rounded-full",
            eventListener: [
              {
                event: "click",
                callback: () => {
                  const successModal = document.getElementById("success-modal");
                  successModal.classList.remove("hidden");
                  submitOrder();
                },
              },
            ],
            children: "Confirm Payment",
          }),
        ],
      }),
    ],
  });
}

function PaymentMethodItem({ name, balance, icon, id }) {
  return El({
    element: "div",
    className: "flex items-center justify-between py-4 ",
    children: [
      El({
        element: "div",
        className: "flex items-center gap-3",
        children: [
          El({
            element: "div",
            className: "w-8 h-8 flex items-center justify-center",
            children: [
              El({
                element: "img",
                src: `./pages/checkout/assets/${icon}`,
                className: "w-6 h-6",
                restAttrs: {
                  alt: name,
                },
              }),
            ],
          }),
          El({
            element: "div",
            className: "flex flex-col",
            children: [
              El({
                element: "span",
                className: "font-medium",
                children: name,
              }),
              balance !== undefined &&
                El({
                  element: "span",
                  className: "text-sm text-gray-500",
                  children: `$${balance}`,
                }),
            ],
          }),
        ],
      }),
      El({
        element: "input",
        className: "w-5 h-5 accent-black",
        eventListener: [
          {
            event: "change",
            callback: (e) => {
              selectedPaymentMethod = e.target.value;
              console.log(selectedPaymentMethod);
            },
          },
        ],
        restAttrs: {
          type: "radio",
          name: "payment",
          value: id,
          checked: id === "wallet", // Default to wallet
        },
      }),
    ],
  });
}

function showSuccessModal() {
  return El({
    element: "div",
    className: "fixed inset-0 z-10 hidden",
    id: "success-modal",
    children: [
      // Overlay
      El({
        element: "div",
        className: "fixed inset-0 bg-black bg-opacity-70",
        eventListener: [
          {
            event: "click",
            callback: () => {
              console.log("click");
              const successModal = document.getElementById("success-modal");
              successModal.classList.add("hidden");
            },
          },
        ],
        children: [
          El({
            element: "div",
            className: "absolute left-0 top-0 z-20 flex w-full h-screen",
            children: [
              El({
                element: "div",
                className:
                  "w-full flex flex-col gap-3 justify-center items-center p-5 bg-white mx-10 h-[508px] mt-[120px] rounded-[50px]",
                children: [
                  El({
                    element: "img",
                    src: "./pages/checkout/assets/payment-confirm.jpg",
                    restAttrs: { alt: "" },
                  }),
                  El({
                    element: "h3",
                    className: "text-[25px] font-medium",
                    children: "Order Successfull!",
                  }),
                  El({
                    element: "p",
                    children: "You have Successfully made order.",
                  }),
                  El({
                    element: "div",
                    className: "flex flex-col pt-3 gap-3 w-full",
                    children: [
                      El({
                        element: "div",
                        className:
                          "bg-black p-5 text-white rounded-full w-full text-center",
                        eventListener: [
                          {
                            event: "click",
                            callback: () => {
                              window.location.href = "/orders.html";
                            },
                          },
                        ],
                        children: [
                          El({
                            element: "h3",
                            children: "View Order",
                          }),
                        ],
                      }),
                      El({
                        element: "div",
                        className:
                          "bg-gray-200 p-5 text-black rounded-full w-full text-center",
                        children: [
                          El({
                            element: "h3",
                            children: "View E-Receipt",
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
      }),
      // Modal Container
    ],
  });
}

// ! Payment Method Modal /////////////////////////////

async function submitOrder() {
  console.log("submitOrder");
  try {
    const orderData = {
      status: "active",
      isDelivered: false,
      ship_address: selectedAddress.address,
      ship_type: selectedShipping?.name?.toLowerCase() || "",
      totalPriceDiscount: calculateTotalWithDiscount(),
      products: mergedProducts.map((product) => ({
        productId: product.id,
        size: product.selectedSize,
        color: product.selectedColor,
        quantity: product.selectedQuantity,
        price: product.price,
        image: product.imageURL?.[0],
        name: product.name,
      })),
    };

    const response = await createOrderController({ orderData });
    console.log("response in checkout page:", response);

    const successModal = document.getElementById("success-modal");
    if (successModal) {
      successModal.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error creating order:", error);
    // Show error toast or message to user
    showToast("Failed to create order. Please try again.");
  }
}

// Helper function to calculate total with discount
function calculateTotalWithDiscount() {
  const subtotal = mergedProducts.reduce((total, product) => {
    return total + product.price * product.selectedQuantity;
  }, 0);

  const shippingCost = selectedShipping?.price || 0;
  const promoDiscount = activePromoCode ? subtotal * 0.3 : 0;

  return subtotal + shippingCost - promoDiscount;
}

// ! Payment Method Modal /////////////////////////////
