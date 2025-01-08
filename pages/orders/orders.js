import { El } from "../../utils/El.js";
import { BottomNav } from "../../components/bottom_nav/bottom_nav.js";
import { getOrdersController } from "../../controller/controller.js";

const orders = document.getElementById("orders");
let ordersData;
ordersInit();

async function ordersInit() {
  try {
    ordersData = await getOrdersController();
    ordersData = ordersData.records;
    orders.appendChild(OrdersPage());
  } catch (error) {
    console.error("Orders init failed", error);
  }
}

// Sample data

function OrdersPage() {
  return El({
    element: "div",
    children: [Header(), TabBar(), BottomNav()],
  });
}

function OrderCard({
  name,
  selectedColor,
  selectedSize,
  selectedQuantity,
  price,
  imageURL,
}) {
  return El({
    element: "div",
    className: "flex gap-4 bg-white rounded-2xl p-4",
    children: [
      // Product Image
      El({
        element: "div",
        className: "w-24 h-24 bg-gray-100 rounded-xl overflow-hidden",
        children: [
          El({
            element: "img",
            src: imageURL[0],
            className: "w-full h-full object-cover",
            restAttrs: { alt: name },
          }),
        ],
      }),
      // Product Details
      El({
        element: "div",
        className: "flex-1",
        children: [
          El({
            element: "h3",
            className: "font-medium text-lg",
            children: name,
          }),
          El({
            element: "div",
            className: "flex items-center gap-2 text-sm text-gray-500 mt-1",
            children: [
              El({
                element: "span",
                className: "flex items-center gap-1",
                children: [
                  El({
                    element: "div",
                    className: `w-3 h-3 rounded-full bg-${selectedColor.toLowerCase()}`,
                  }),
                  selectedColor,
                ],
              }),
              El({
                element: "span",
                children: `| Size = ${selectedSize} | Qty = ${selectedQuantity}`,
              }),
            ],
          }),
          El({
            element: "div",
            className: "bg-gray-100 text-xs px-2 py-1 rounded w-fit mt-2",
            children: "In Delivery",
          }),
          El({
            element: "div",
            className: "flex items-center justify-between mt-2",
            children: [
              El({
                element: "span",
                className: "font-medium",
                children: `$${price}`,
              }),
              El({
                element: "button",
                className: "bg-black text-white text-xs px-4 py-2 rounded-full",
                children: "Track Order",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function Header() {
  return El({
    element: "header",
    className:
      "flex flex-col py-3 px-6 fixed top-0 left-0 w-full bg-white z-10",
    children: [
      El({
        element: "div",
        className: "flex justify-between w-full",
        children: [
          El({
            element: "div",
            className: "flex items-center justify-items-center",
            children: [
              El({
                element: "img",
                src: "./assets/logo.png",
                className: "w-4",
                restAttrs: { alt: "back button" },
              }),
              El({
                element: "h3",
                className: "mx-5 pb-1 text-[20px] font-semibold",
                children: "My Orders",
              }),
            ],
          }),
          El({
            element: "div",
            className: "flex items-center gap-3 justify-items-center",
            children: [
              El({
                element: "img",
                src: "./assets/search.svg",
                className: "w-6",
                restAttrs: { alt: "search" },
              }),
              El({
                element: "img",
                src: "./assets/More Circle.svg",
                className: "w-6",
                restAttrs: { alt: "search" },
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function TabBar() {
  // Add state management for active tab
  let activeTab = "active"; // Default tab

  const tabContainer = El({
    element: "div",
    className: "px-6 mt-20",
    children: [
      El({
        element: "div",
        className: "flex border-b",
        children: [
          // Active Tab
          El({
            element: "button",
            className: "flex-1 py-4 border-b-2 border-black font-medium",
            children: ["Active"],
            onclick: () => {
              activeTab = "active";
              updateOrders();
            },
          }),
          // Completed Tab
          El({
            element: "button",
            className: "flex-1 py-4 text-gray-400",
            children: ["Completed"],
            onclick: () => {
              activeTab = "completed";
              updateOrders();
            },
          }),
        ],
      }),
      // Orders Container
      El({
        element: "div",
        className: "flex flex-col gap-4 mt-4",
        id: "orders-container", // Add ID to update content
      }),
    ],
  });

  // Function to update orders based on active tab
  function updateOrders() {
    const container = tabContainer.querySelector("#orders-container");
    container.innerHTML = ""; // Clear current orders
    console.log("ordersData:", ordersData);
    const filteredOrders = ordersData.filter(
      (order) => order.status === activeTab
    );
    console.log("ordersData:", ordersData);
    console.log("filteredOrders:", filteredOrders);

    // Add new orders
    filteredOrders.forEach((order) => {
      // container.appendChild(OrderCard(order));
      container.appendChild(OrderItem(order));
    });

    // Update tab styling
    const [activeButton, completedButton] =
      tabContainer.querySelectorAll("button");
    if (activeTab === "active") {
      activeButton.className =
        "flex-1 py-4 border-b-2 border-black font-medium";
      completedButton.className = "flex-1 py-4 text-gray-400";
    } else {
      activeButton.className = "flex-1 py-4 text-gray-400";
      completedButton.className =
        "flex-1 py-4 border-b-2 border-black font-medium";
    }
  }

  // Initial render
  setTimeout(updateOrders, 0);

  return tabContainer;
}

function OrderItem({
  createdAt,
  status,
  ship_address,
  ship_type,
  totalPriceDiscount,
  products,
}) {
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return El({
    element: "div",
    className:
      "flex flex-col gap-2 bg-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer",
    onclick: () =>
      showOrderModal({
        createdAt: formattedDate,
        status,
        ship_address,
        ship_type,
        totalPriceDiscount,
        products,
      }),
    children: [
      // Header with Order ID, Date, and Status
      El({
        element: "div",
        className: "flex justify-between items-center mb-3",
        children: [
          El({
            element: "div",
            className: "flex items-center gap-2",
            children: [
              El({
                element: "span",
                className: "text-sm text-gray-500",
                children: formattedDate,
              }),
              El({
                element: "span",
                className: `px-2 py-1 rounded-full text-xs ${
                  status === "active"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`,
                children: status === "active" ? "active" : "completed",
              }),
            ],
          }),
          El({
            element: "span",
            className: "font-semibold text-lg",
            children: `$${totalPriceDiscount}`,
          }),
        ],
      }),
      // Products Preview
      El({
        element: "div",
        className: "flex gap-2 overflow-x-auto pb-2 scrollbar-hide",
        children: products.map((product) =>
          El({
            element: "div",
            className: "flex-shrink-0 relative",
            children: [
              El({
                element: "img",
                src: product.image,
                className: "w-20 h-20 object-cover rounded-lg",
              }),
              El({
                element: "div",
                className:
                  "absolute bottom-0 right-0 bg-black bg-opacity-60 text-white text-xs px-1.5 py-0.5 rounded-tl-lg",
                children: `x${product.quantity}`,
              }),
            ],
          })
        ),
      }),
      // Footer with Shipping Info
      El({
        element: "div",
        className:
          "flex items-center justify-between mt-2 pt-2 border-t border-gray-100",
        children: [
          El({
            element: "div",
            className: "flex items-center gap-1 text-sm text-gray-500",
            children: [
              El({
                element: "img",
                src: "./pages/orders/assets/truck.svg",
                className: "w-6 h-6",
              }),
              El({
                element: "span",
                children: ship_type,
              }),
            ],
          }),
          El({
            element: "button",
            className: "text-sm text-blue-600 font-medium hover:text-blue-700",
            children: "View Details →",
          }),
        ],
      }),
    ],
  });
}

function OrderModal({
  createdAt,
  status,
  ship_address,
  ship_type,
  totalPriceDiscount,
  products,
}) {
  return El({
    element: "div",
    className:
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
    onclick: (e) => {
      if (e.target === e.currentTarget) {
        e.currentTarget.remove();
      }
    },
    children: [
      El({
        element: "div",
        className:
          "bg-white rounded-2xl p-6 w-[90%] max-w-lg max-h-[90vh] overflow-y-auto",
        children: [
          // Header with close button
          El({
            element: "div",
            className: "flex justify-between items-center mb-4",
            children: [
              El({
                element: "h2",
                className: "text-xl font-semibold",
                children: "Order Details",
              }),
              El({
                element: "button",
                className: "text-gray-500 hover:text-gray-700",
                onclick: (e) => {
                  e.stopPropagation();
                  e.currentTarget.closest(".fixed").remove();
                },
                children: "✕",
              }),
            ],
          }),
          // Order info
          El({
            element: "div",
            className: "space-y-4",
            children: [
              // Date and Status
              El({
                element: "div",
                className: "flex justify-between",
                children: [
                  El({
                    element: "p",
                    className: "text-gray-600",
                    children: `Date: ${createdAt}`,
                  }),
                  El({
                    element: "span",
                    className: "px-2 py-1 bg-gray-100 rounded-full text-sm",
                    children: status,
                  }),
                ],
              }),
              // Shipping Details
              El({
                element: "div",
                className: "border-t pt-4",
                children: [
                  El({
                    element: "h3",
                    className: "font-medium mb-2",
                    children: "Shipping Details",
                  }),
                  El({
                    element: "p",
                    className: "text-gray-600",
                    children: `Address: ${ship_address}`,
                  }),
                  El({
                    element: "p",
                    className: "text-gray-600",
                    children: `Method: ${ship_type}`,
                  }),
                ],
              }),
              // Products List
              El({
                element: "div",
                className: "border-t pt-4",
                children: [
                  El({
                    element: "h3",
                    className: "font-medium mb-2",
                    children: "Products",
                  }),
                  ...products.map((product) =>
                    El({
                      element: "div",
                      className: "flex gap-4 py-2 border-b last:border-b-0",
                      children: [
                        El({
                          element: "img",
                          src: product.image,
                          className: "w-20 h-20 object-cover rounded-lg",
                        }),
                        El({
                          element: "div",
                          className: "flex-1",
                          children: [
                            El({
                              element: "h4",
                              className: "font-medium",
                              children: product.name,
                            }),
                            El({
                              element: "p",
                              className: "text-gray-600 text-sm",
                              children: `Quantity: ${product.quantity}`,
                            }),
                            El({
                              element: "p",
                              className: "text-gray-600 text-sm",
                              children: `$${product.price}`,
                            }),
                          ],
                        }),
                      ],
                    })
                  ),
                ],
              }),
              // Total
              El({
                element: "div",
                className: "border-t pt-4 text-right",
                children: [
                  El({
                    element: "p",
                    className: "font-medium text-lg",
                    children: `Total: $${totalPriceDiscount}`,
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

function showOrderModal(orderData) {
  document.body.appendChild(OrderModal(orderData));
}
