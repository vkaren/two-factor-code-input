const form = document.getElementById("form");
let inputs;
let submitButton;

const validCode = "1973";
let codeToValidate = [];
let deleting = false;

function load() {
  let i = 0;
  while (i < 4) {
    form.innerHTML += `
      <input type="text" name="digit" id="digit-${i + 1}" pattern="[0-9]">
      `;
    i++;
  }
  form.innerHTML += '<button type="submit" id="submit-button">Submit</button>';

  inputs = Object.values(form.children).filter(
    (element) => element.localName === "input"
  );

  submitButton = document.getElementById("submit-button");

  inputs.forEach((element, i) => {
    element.addEventListener("keyup", (event) => onInput(event, i));
    if (i !== 0) {
      element.disabled = true;
    }
  });
  submitButton.disabled = true;
  submitButton.addEventListener("click", sendCode);
}

function onInput(event, indexInput) {
  const value = event.currentTarget.value;
  const keyPressed = event.key;

  if (!isNaN(value - "") && value.length <= 1) {
    inputs[indexInput].classList.remove("error");

    if (keyPressed !== "Backspace") {
      codeToValidate[indexInput] = value;

      if (inputs[indexInput + 1]) {
        inputs[indexInput + 1].disabled = false;
        inputs[indexInput + 1].focus();
      } else {
        submitButton.focus();
      }

      deleting = false;

    } else if (value.length === 0 && keyPressed === "Backspace") {
      if (!deleting) {
        codeToValidate[indexInput] = value;
        deleting = true;

      } else if (inputs[indexInput - 1]) {
        inputs[indexInput].disabled = true;
        inputs[indexInput - 1].focus();
        deleting = false;
      }
    }

    if (codeToValidate.join("").length === validCode.length) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }

  } else {
    inputs[indexInput].classList.add("error");
    submitButton.disabled = true;
  }

  console.log(codeToValidate);
}

function sendCode(event) {
  event.preventDefault();

  inputs.forEach((input) => (input.value = ""));

  codeToValidate = codeToValidate.join("");

  if (codeToValidate === validCode) {
    console.log("you're right mmgbo");
    form.style.display = 'none'
  } else {
    console.log("nahh");
    inputs.forEach(input =>  input.classList.add("error"))
  }
  codeToValidate = [];
}

load();
