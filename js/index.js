import TwoFactorCodeInput from "./two-factor-code-input.mjs";

// DOM Elements
const twoFactorCodeSection = document.querySelector(".two-factor-code_section");
const messageSection = document.querySelector(".message_section");
const inputs = [...document.querySelector(".twc_inputs").children];
const validateCodeBtn = document.querySelector(".twc_verify-btn");
const seeValidCodeBtn = document.querySelector(".see-valid-code_btn");
const validCodeElem = document.querySelector(".valid-code");

const app = new TwoFactorCodeInput(inputs);

seeValidCodeBtn.addEventListener("click", seeValidCode);
validateCodeBtn.addEventListener("click", onValidateCode);

function seeValidCode(e) {
  e.preventDefault();

  validCodeElem.textContent = app.validCode;
  seeValidCodeBtn.classList.add("hidden");
  validCodeElem.classList.remove("hidden");

  setTimeout(() => {
    seeValidCodeBtn.classList.remove("hidden");
    validCodeElem.classList.add("hidden");
  }, 1500);
}

function onValidateCode(e) {
  e.preventDefault();

  if (app.validateCode()) {
    twoFactorCodeSection.classList.add("hidden");
    messageSection.classList.remove("hidden");
  } else {
    inputs.forEach((input) => {
      input.classList.add("error");

      setTimeout(() => input.classList.remove("error"), 1500);
    });
  }
}
