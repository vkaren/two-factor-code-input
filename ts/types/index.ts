type inputsType = Element[];

interface onEnterDigitParamsInt {
  currentInput: HTMLInputElement;
  nextInput: HTMLInputElement;
  currentInputPosition: number;
  enteredDigit: string;
}

interface onBackspacePressedParamsInt
  extends Omit<onEnterDigitParamsInt, "nextInput & enteredDigit"> {
  prevInput: HTMLInputElement;
}

interface TwoFactorCodeInputInt {
  inputs: inputsType;
  validCode: number;
  codeToValidate: number[];
  isDeleting: boolean;
  getValidCode: () => number;
  onInputCode: () => void;
  onPasteCode: () => void;
  onEnterDigit: (a: onEnterDigitParamsInt) => void;
  onBackspacePressed: (a: onBackspacePressedParamsInt) => void;
}

export {
  inputsType,
  onEnterDigitParamsInt,
  onBackspacePressedParamsInt,
  TwoFactorCodeInputInt,
};
