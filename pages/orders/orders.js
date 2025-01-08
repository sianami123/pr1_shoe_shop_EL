import { El } from "../../utils/El.js";
import { BottomNav } from "../../components/bottom_nav/bottom_nav.js";
import { getOrdersController } from "../../controller/controller.js";

const orders = document.getElementById("orders");

ordersInit();

async function ordersInit() {
  try {
    const ordersData = await getOrdersController();
    console.log(ordersData.records);
  } catch (error) {
    console.error("Orders init failed", error);
  }
}

// Sample data
const ordersData = [
  {
    name: "Air Jordan 3 Retro",
    selectedColor: "black",
    selectedSize: "42",
    selectedQuantity: 1,
    price: "108.00",
    imageURL: [
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg",
    ],
    status: "active",
  },
  {
    name: "Running Sportwear",
    selectedColor: "Black",
    selectedSize: "42",
    selectedQuantity: 1,
    price: "140.00",
    imageURL: ["./assets/shoe2.jpg"],
    status: "active",
  },
  {
    name: "New Balance 996 V2",
    selectedColor: "Black",
    selectedSize: "42",
    selectedQuantity: 1,
    price: "122.00",
    imageURL: ["./assets/shoe3.jpg"],
    status: "completed",
  },
  {
    name: "Fila Running Sneakers",
    selectedColor: "Black",
    selectedSize: "42",
    selectedQuantity: 1,
    price: "85.00",
    imageURL: ["./assets/shoe4.jpg"],
    status: "completed",
  },
  {
    name: "Fila Running Sneakers",
    selectedColor: "Black",
    selectedSize: "42",
    selectedQuantity: 1,
    price: "85.00",
    imageURL: ["./assets/shoe4.jpg"],
    status: "completed",
  },
];

orders.appendChild(OrdersPage());

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

    const filteredOrders = ordersData.filter(
      (order) => order.status === activeTab
    );

    // Add new orders
    filteredOrders.forEach((order) => {
      // container.appendChild(OrderCard(order));
      container.appendChild(CartItem(order));
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

function CartItem({
  name,
  selectedColor,
  selectedSize,
  selectedQuantity,
  price,
  imageURL,
  status,
}) {
  const colorClass =
    selectedColor.toLowerCase() === "black"
      ? "bg-black"
      : selectedColor.toLowerCase() === "white"
      ? "bg-white"
      : selectedColor.toLowerCase() === "gray"
      ? "bg-gray-100"
      : selectedColor.toLowerCase() === "red"
      ? "bg-red-100"
      : selectedColor.toLowerCase() === "blue"
      ? "bg-blue-100"
      : selectedColor.toLowerCase() === "green"
      ? "bg-green-100"
      : selectedColor.toLowerCase() === "yellow"
      ? "bg-yellow-100"
      : selectedColor.toLowerCase() === "purple"
      ? "bg-purple-100"
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
            src: imageURL[0],
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
            ],
          }),
          El({
            element: "div",
            className: "flex justify-start items-center gap-2",
            children: [
              El({
                element: "div",
                className: `rounded-full w-4 h-4 ${colorClass}`,
              }),
              El({
                element: "p",
                className: "text-gray-400 text-[12px]",
                children: `${selectedColor}`,
              }),
              El({
                element: "div",
                className: "bg-gray-400 h-[12px] w-[1px]",
              }),
              El({
                element: "p",
                className: "text-gray-400 text-[12px]",
                children: `Size = ${selectedSize}`,
              }),
              El({
                element: "div",
                className: "bg-gray-400 h-[12px] w-[1px]",
              }),
              El({
                element: "p",
                className: "text-gray-400 text-[12px]",
                children: `Qty = ${selectedQuantity}`,
              }),
            ],
          }),
          El({
            element: "p",
            className: "bg-gray-100 w-fit px-2 py-1 rounded-full text-sm",
            innerText: `${status === "active" ? "In_Delivery" : "Completed"}`,
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
                    element: "button",
                    className: "bg-black text-white px-4 py-2 rounded-full",
                    children: [
                      `${status === "active" ? "Track_Order" : "Buy_Again"}`,
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
