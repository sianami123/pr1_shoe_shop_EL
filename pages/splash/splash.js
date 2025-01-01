import { El } from "../../utils/El.js";

const splash = document.getElementById("splash");
let splashSteps = 1;

function splashController(step) {
  // Clear previous content
  splash.innerHTML = "";

  switch (step) {
    case 1:
      splash.appendChild(createSplash1());
      setTimeout(() => {
        splashSteps = 2;
        splashController(splashSteps);
      }, 3000);
      break;
    case 2:
      splash.appendChild(createSplash2());
      setTimeout(() => {
        splashSteps = 3;
        splashController(splashSteps);
      }, 3000);
      break;
    case 3:
      splash.appendChild(splash3swiper());
      break;
    case 4:
      window.location.href = "../../pages/login/login.html";
      console.log("home: ", window.location.href);
      break;
    default:
      break;
  }
}

function createSplash1() {
  return El({
    element: "div",
    className:
      "splash1 flex flex-col items-center justify-between h-screen py-8",
    children: [
      El({
        element: "div",
      }),
      El({
        element: "div",
        className: "text-center flex-grow flex items-center justify-center",
        children: [
          El({
            element: "img",
            className: "w-full max-w-md mx-auto",
            restAttrs: {
              src: "./assets/shoe.png",
              alt: "Onboarding",
            },
          }),
        ],
      }),
      El({
        // Loading circle
        element: "div",
        className:
          "mb-[117px] w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin",
      }),
    ],
  });
}

function createSplash2() {
  return El({
    element: "div",
    className:
      "splash2 flex flex-col items-start justify-end h-screen bg-[url('./assets/splash_wallpaper.png')] bg-cover bg-center",
    children: [
      El({
        element: "div",
        className:
          "w-full max-w-md mx-auto flex flex-col gap-4 p-4 items-start",
        children: [
          El({
            element: "p",
            className: "text-white text-3xl font-bold",
            innerText: "Welcome to the app! 👋",
          }),
          El({
            element: "p",
            className: "text-white text-2xl",
            innerText: "Shoea",
          }),
          El({
            element: "p",
            className: "text-white text-xl",
            innerText:
              "The best sneakers & shoes e-commerse app of the century for your fashion needs!",
          }),
        ],
      }),
    ],
  });
}

const swiperData = [
  {
    image: "./assets/swiper1.png",
    description: "We provide high quality products just for you",
  },
  {
    image: "./assets/swiper2.png",
    description: "Your satisfaction is our number one periority",
  },
  {
    image: "./assets/swiper3.png",
    description: "Lets fulfill your fashion needs with shoes right now!",
  },
];

function splash3swiper() {
  return El({
    element: "div",
    className: "h-screen bg-white",
    children: [
      El({
        element: "swiper-container",
        className: "h-full w-full",
        restAttrs: {
          "space-between": "30",
          pagination: "true",
          "pagination-clickable": "true",
        },
        children: swiperData.map((slide) =>
          El({
            element: "swiper-slide",
            className: "flex flex-col items-center justify-between h-full p-8",
            children: [
              El({
                element: "div",
                className:
                  "flex-grow flex flex-col items-center justify-center gap-8",
                children: [
                  El({
                    element: "img",
                    className: "w-full max-w-md mx-auto object-cover",
                    restAttrs: {
                      src: slide.image,
                      alt: "Swiper image",
                    },
                  }),
                  El({
                    element: "p",
                    className: "text-xl text-center max-w-md text-gray-800",
                    innerText: slide.description,
                  }),
                ],
              }),
              // Custom pagination and buttons
              El({
                element: "div",
                className: "flex flex-col gap-8 w-full max-w-md",
                children: [
                  // Pagination dots
                  El({
                    element: "div",
                    className: "flex justify-center gap-2",
                    children: swiperData.map((_, index) =>
                      El({
                        element: "div",
                        className: "w-16 h-1 rounded-full bg-gray-300",
                      })
                    ),
                  }),
                  // Navigation buttons
                  El({
                    element: "div",
                    className: "",
                    children: [
                      El({
                        element: "button",
                        className:
                          "w-full px-8 py-4 rounded-full bg-black text-white hover:bg-gray-800",
                        innerText: "Next",
                        eventListener: [
                          {
                            event: "click",
                            callback: () => {
                              splashSteps = 4;
                              splashController(splashSteps);
                            },
                          },
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          })
        ),
      }),
    ],
  });
}

splashController(splashSteps);
