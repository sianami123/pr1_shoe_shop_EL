import { El } from "../../utils/El.js";
import { BackButton } from "../../components/ui/back_button.js";

const payment = document.getElementById("payment");
const selectedMethod = null;

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

payment.appendChild(PaymentPage());
payment.appendChild(showSuccessModal());

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
                src: "./pages/payment/assets/add.svg",
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
                src: `./pages/payment/assets/${icon}`,
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
                    src: "./pages/payment/assets/payment-confirm.jpg",
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
