import {
  TwoFactorCodeInputInt,
  inputsType,
  onBackspacePressedParamsInt,
  onEnterDigitParamsInt,
} from "./types/index";

export default function TwoFactorCodeInput(
  this: TwoFactorCodeInputInt,
  inputs: inputsType
) {
  this.inputs = inputs;
  this.validCode = this.getValidCode();
  this.codeToValidate = [];
  this.isDeleting = false;

  this.inputs.forEach((input) => {
    input.addEventListener("input", this.onInputCode.bind(this));
    input.addEventListener("keyup", this.onInputCode.bind(this));
    input.addEventListener("paste", this.onPasteCode.bind(this));
  });
}

TwoFactorCodeInput.prototype.onInputCode = function (e: any) {
  const currentInput = e.currentTarget;
  const currentInputId = currentInput!.id;
  const currentInputPosition = currentInputId[currentInputId.length - 1] - 1;
  const enteredDigit = currentInput!.value;
  const isANumber = /\d/.test(enteredDigit);
  const isBackspacePressed = e.key === "Backspace";

  if (isANumber) {
    const nextInput = this.inputs[currentInputPosition + 1];

    this.onEnterDigit({
      currentInput,
      currentInputPosition,
      enteredDigit,
      nextInput,
    });
  } else if (isBackspacePressed) {
    const prevInput = this.inputs[currentInputPosition - 1];

    this.onBackspacePressed({ currentInput, currentInputPosition, prevInput });
  }
};

TwoFactorCodeInput.prototype.onEnterDigit = function ({
  currentInput,
  currentInputPosition,
  enteredDigit,
  nextInput,
}: onEnterDigitParamsInt) {
  if (nextInput) {
    currentInput.disabled = true;
    nextInput.disabled = false;
    nextInput.focus();
  }

  this.codeToValidate[currentInputPosition] = enteredDigit;
  this.isDeleting = false;
};

TwoFactorCodeInput.prototype.onBackspacePressed = function ({
  currentInput,
  currentInputPosition,
  prevInput,
}: onBackspacePressedParamsInt) {
  if (!this.isDeleting) {
    this.codeToValidate[currentInputPosition] = "";

    this.isDeleting = true;
  } else if (prevInput) {
    currentInput.disabled = true;
    prevInput.disabled = false;
    prevInput.focus();

    this.isDeleting = false;
  }
};

TwoFactorCodeInput.prototype.onPasteCode = function (e: any) {
  e.preventDefault();
  const isPastedOnFirstInput = e.currentTarget.id === "digit-1";

  if (isPastedOnFirstInput) {
    const pastedCode = e.clipboardData.getData("text");
    const isANumber = /\d/.test(pastedCode);

    if (isANumber && pastedCode.length <= this.inputs.length) {
      pastedCode.split("").forEach((digit: string, i: number) => {
        this.inputs[i].value = digit;
        this.codeToValidate[i] = digit;

        if (i === pastedCode.length - 1) {
          (this.inputs[i + 1] || this.inputs[i]).disabled = false;
          (this.inputs[i + 1] || this.inputs[i]).focus();
        } else {
          this.inputs[i].disabled = true;
        }
      });
    }
  }
};

TwoFactorCodeInput.prototype.getValidCode = function () {
  const maxValidCode = Math.pow(10, this.inputs.length) - 1;
  const minValidCode = Math.pow(10, this.inputs.length - 1);

  const validCode =
    Math.floor(Math.random() * (maxValidCode - minValidCode + 1)) +
    minValidCode;

  return validCode;
};

TwoFactorCodeInput.prototype.validateCode = function () {
  return this.validCode == this.codeToValidate.join("");
};
