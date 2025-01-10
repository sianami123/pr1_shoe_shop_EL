import { BackButton } from "../../components/ui/back_button.js";
import { loginController } from "../../controller/controller.js";
import { El } from "../../utils/El.js";
import { showToast } from "../../components/toast.js";

const login = document.getElementById("login");

login.append(Login());

async function handleToggleShowPassword() {
  const passwordInput = document.getElementById("password-input");
  const passwordEye = document.getElementById("password-eye");
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  passwordEye.src =
    passwordInput.type === "password"
      ? "./assets/eye-show.png"
      : "./assets/eye-hide.png";
}

async function handleLogin(e) {
  e.preventDefault();
  const emailInput = document.getElementById("email-input");
  const passwordInput = document.getElementById("password-input");

  // if (!emailInput || !passwordInput) {
  //   console.error("Form inputs not found");
  //   return;
  // }

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    showToast({ message: "Please fill in all fields", type: "error" });
    console.error("Please fill in all fields");
    return;
  }

  const data = await loginController({ email, password });
  console.log("data in login.js  :", data);
  if (!data.accessToken) {
    showToast({ message: "Invalid email or password", type: "error" });
    return;
  }
  // if (data) {
  //   window.location.href = "/";
  // }
}

function Login() {
  return El({
    element: "div",
    className: "h-screen p-6 overflow-hidden",
    children: [
      BackButton({ text: "", backURL: "" }),
      El({
        element: "div",
        className: "max-w-md mx-auto h-[calc(100%-4rem)] flex flex-col",
        children: [
          El({
            element: "div",
            className: "mt-10 flex flex-col justify-center items-center",
            children: [
              El({
                element: "img",
                className: "w-[54px] h-[81px] mb-[118px]",
                restAttrs: {
                  src: "./assets/logo.png",
                  alt: "logo",
                },
              }),
              El({
                element: "div",
                className:
                  "text-[#152536] text-[32px] font-semibold font-['Inter'] mb-[48px]",
                children: ["Login to Your Account"],
              }),
              El({
                element: "form",
                className: "space-y-4 w-full",
                children: [
                  // Email Input Group
                  El({
                    element: "div",
                    className: "relative w-full",
                    children: [
                      El({
                        element: "span",
                        className: "absolute left-4 top-4",
                        children: [
                          El({
                            element: "img",
                            className: "h-5 w-5 text-gray-400",
                            restAttrs: {
                              src: "./pages/login/assets/email.png",
                              alt: "email",
                            },
                          }),
                        ],
                      }),
                      El({
                        element: "input",
                        className:
                          "w-full p-4 pl-12 bg-gray-50 rounded-xl text-gray-600 text-sm focus:outline-none",
                        restAttrs: {
                          type: "email",
                          placeholder: "Email",
                          id: "email-input",
                          value: "sianami123@gmail.com",
                        },
                      }),
                    ],
                  }),

                  // Password Input Group
                  El({
                    element: "div",
                    className: "relative w-full",
                    children: [
                      El({
                        element: "span",
                        className: "absolute left-4 top-4",
                        children: [
                          El({
                            element: "img",
                            className: "h-5 w-5 text-gray-400",
                            restAttrs: {
                              src: "./pages/login/assets/password.png",
                              alt: "password",
                            },
                          }),
                        ],
                      }),
                      El({
                        element: "input",
                        className:
                          "w-full p-4 pl-12 pr-12 bg-gray-50 rounded-xl text-gray-600 text-sm focus:outline-none",
                        restAttrs: {
                          type: "password",
                          placeholder: "Password",
                          id: "password-input",
                          value: "12345678",
                        },
                      }),
                      El({
                        element: "button",
                        className: "absolute right-4 top-4",
                        restAttrs: {
                          type: "button",
                        },
                        eventListener: [
                          {
                            event: "click",
                            callback: () => {
                              handleToggleShowPassword();
                            },
                          },
                        ],
                        children: [
                          El({
                            element: "img",
                            className: "h-5 w-5 text-gray-400",
                            id: "password-eye",
                            restAttrs: {
                              src: "./pages/login/assets/eye-show.png",
                              alt: "eye",
                            },
                          }),
                        ],
                      }),
                    ],
                  }),

                  // Remember Me Checkbox
                  El({
                    element: "div",
                    className:
                      "flex items-center justify-center w-full mt-[50px]",
                    children: [
                      El({
                        element: "input",
                        className: "h-4 w-4 rounded border-gray-300",
                        restAttrs: {
                          type: "checkbox",
                          id: "remember",
                        },
                      }),
                      El({
                        element: "label",
                        className: "ml-2 text-sm text-gray-500",
                        restAttrs: {
                          for: "remember",
                        },
                        children: ["Remember me"],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          // Login Button
          El({
            element: "button",
            className: `mb-6 w-full bg-black text-white py-4 rounded-full hover:bg-gray-700 transition-colors mt-auto text-sm font-medium`,
            restAttrs: {
              type: "button",
            },
            children: ["Sign In"],
            eventListener: [
              {
                event: "click",
                callback: handleLogin,
              },
            ],
          }),
        ],
      }),
    ],
  });
}
