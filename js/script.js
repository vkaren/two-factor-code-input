const form = document.getElementById("form");
let inputs;
let submitButton;

const validCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000 + "";
let codeToValidate = [];
let deletingInput = false;

function load() {
  form.innerHTML = `<label for="digit">
                      Valid code: <span id="valid-code">${validCode}</span>
                   </label>
                   <div id="inputs"></div>
                   <button type="submit" id="submit-button">Send code</button>`;

  for (let i = 0; i < 4; i++) {
    document.getElementById("inputs").innerHTML += `
    <input type="text" name="digit" id="digit-${i + 1}" 
     pattern="[0-9]" minlength="1" maxlength="1">
    `;
  }

  inputs = Object.values(document.getElementById("inputs").children);
  submitButton = document.getElementById("submit-button");

  inputs.forEach((input, i) => {
    input.addEventListener("keyup", (event) => onInput(event, i));
    input.addEventListener("paste", (event) => onPaste(event, i));
    if (i !== 0) {
      input.disabled = true;
    }
  });
  submitButton.disabled = true;
  submitButton.addEventListener("click", sendCode);
}

function update(index, value) {
  codeToValidate[index] = value;
  deletingInput = !deletingInput;
  if (codeToValidate.join("").length === validCode.length) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function onInput(event, index) {
  const value = event.currentTarget.value;
  const keyPressed = event.key;

  if (!isNaN(value - "")) {
    inputs[index].classList.remove("error");

    if (keyPressed !== "Backspace") {
      update(index, value);

      if (inputs[index + 1]) {
        inputs[index + 1].disabled = false;
        inputs[index + 1].focus();
      } 

    } else {
      if (!deletingInput) {
        update(index, value);
      } else {
        if (inputs[index - 1]) {
          inputs[index - 1].focus();
          deletingInput = false;
        }
      }
    }
  } else {
    inputs[index].classList.add("error");
    submitButton.disabled = true;
  }
}

function onPaste(event, index) {
  event.preventDefault();

  if (index === 0) {
    const paste = (event.clipboardData || window.clipboardData).getData("text");

    if (paste.length <= inputs.length) {
      codeToValidate = [];

      inputs.forEach((input) => (input.value = ""));

      paste.split("").forEach((digit, i) => {
        inputs[i].classList.remove("error");
        inputs[i].disabled = false;
        inputs[i].focus();
        inputs[i].value = digit;

        codeToValidate.push(digit);
      });

      update();
    }
  }
}

function sendCode(event) {
  event.preventDefault();

  if (codeToValidate.join("") === validCode) {
    form.style.display = "none";
    document.getElementById("image-dog").classList.add('visible');
  } else {
    inputs.forEach((input) => input.classList.add("error"));
  }
}

load();
