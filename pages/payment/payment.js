import { El } from "../../utils/El.js";
import { BackButton } from "../../components/ui/back_button.js";

const payment = document.getElementById("payment");
const selectedMethod = null;

const paymentMethods = [
  {
    name: "My Wallet",
    balance: "957.99",
    icon: "wallet-black.svg",
    id: "wallet",
  },
  {
    name: "PayPal",
    icon: "paypal.svg",
    id: "paypal",
  },
  {
    name: "Google Pay",
    icon: "google-pay.svg",
    id: "google",
  },
  {
    name: "Apple Pay",
    icon: "apple-pay.svg",
    id: "apple",
  },
  {
    name: "•••• •••• •••• 4679",
    icon: "mastercard.svg",
    id: "mastercard",
  },
];

payment.appendChild(BackButton(), PaymentPage());

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
          El({
            element: "div",
            className: "flex items-center gap-3",
            children: [
              El({
                element: "button",
                className: "p-1",
                onclick: () => history.back(),
                children: [
                  El({
                    element: "img",
                    src: "./assets/back_arrow.svg",
                    className: "w-6 h-6",
                  }),
                ],
              }),
              El({
                element: "h1",
                className: "text-lg font-medium",
                children: "Payment Methods",
              }),
            ],
          }),
          El({
            element: "button",
            className: "p-1",
            children: [
              El({
                element: "img",
                src: "./assets/more.svg",
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
            onclick: () => {
              const modal = showSuccessModal();
              document.body.appendChild(modal);
            },
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
    className: "flex items-center justify-between py-4",
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
                src: `./assets/${icon}`,
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
              balance &&
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
    className: "fixed inset-0 bg-white z-50",
    id: "successModal",
    children: [
      // Success Content
      El({
        element: "div",
        className:
          "flex flex-col items-center justify-center min-h-screen px-4",
        children: [
          // Circle with cart icon and dots
          El({
            element: "div",
            className: "relative mb-6",
            children: [
              // Black circle with cart
              El({
                element: "div",
                className:
                  "w-20 h-20 bg-black rounded-full flex items-center justify-center relative z-10",
                children: [
                  El({
                    element: "img",
                    src: "./assets/cart-white.svg",
                    className: "w-10 h-10",
                  }),
                ],
              }),
            ],
          }),
          // Success text
          El({
            element: "h2",
            className: "text-xl font-medium mb-2 text-center",
            children: "Order Successful!",
          }),
          El({
            element: "p",
            className: "text-gray-500 text-sm mb-8 text-center",
            children: "You have successfully made order",
          }),
          // Action buttons
          El({
            element: "div",
            className: "flex flex-col gap-3 w-full max-w-xs",
            children: [
              El({
                element: "button",
                className:
                  "w-full bg-black text-white py-3.5 rounded-full font-medium",
                onclick: () => {
                  window.location.href = "/orders.html";
                },
                children: "View Order",
              }),
              El({
                element: "button",
                className: "w-full text-gray-500 py-3.5 font-medium",
                onclick: () => {
                  // Handle receipt view
                  console.log("View receipt");
                },
                children: "View E-Receipt",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
