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
              src: "./pages/splash/assets/shoe.png",
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
      "splash2 flex flex-col items-start justify-end h-screen bg-[url('./pages/splash/assets/splash_wallpaper.png')] bg-cover bg-center",
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

// const swiperData = [
//   {
//     image: "./pages/splash/assets/swiper1.png",
//     description: "We provide high quality products just for you",
//   },
//   {
//     image: "./pages/splash/assets/swiper2.png",
//     description: "Your satisfaction is our number one periority",
//   },
//   {
//     image: "./pages/splash/assets/swiper3.png",
//     description: "Lets fulfill your fashion needs with shoes right now!",
//   },
// ];

function splash3swiper() {
  return El({
    element: "div",
    className: "swiper flex flex-col items-center justify-center",
    children: [
      El({
        element: "img",
        className: "swiper-image",
        restAttrs: {
          src: "./pages/splash/assets/swiper1.png",
          alt: "Swiper 1",
        },
      }),
      El({
        element: "p",
        className: "swiper-description",
        innerText: "We provide high quality products just for you",
      }),
    ],
  });
}

splashController(splashSteps);
