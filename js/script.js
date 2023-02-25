const form = document.getElementById("form");
let inputs;
let submitButton;

const validCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000 + "";
let codeToValidate = [];
let deleting = false;

function load() {
  form.innerHTML = `<label for="digit">
                      Valid code: <span id="valid-code">${validCode}</span>
                   </label>
                   <div id="inputs"></div>
                   <button type="submit" id="submit-button">Send code</button>`;

  let i = 0;
  while (i < 4) {
    document.getElementById("inputs").innerHTML += `
      <input type="text" name="digit" id="digit-${i + 1}" pattern="[0-9]">
      `;
    i++;
  }

  inputs = Object.values(document.getElementById("inputs").children);
  submitButton = document.getElementById("submit-button");

  inputs.forEach((input, i) => {
    input.addEventListener("keyup", (event) => onInput(event, i));
    if (i !== 0) {
      input.disabled = true;
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
      changeState(indexInput, value);

      if (inputs[indexInput + 1]) {
        inputs[indexInput + 1].disabled = false;
        inputs[indexInput + 1].focus();
      } else {
        submitButton.focus();
      }
    } else if (keyPressed === "Backspace" && value.length === 0) {
      if (!deleting) {
        changeState(indexInput, value);
      } else if (inputs[indexInput - 1]) {
        inputs[indexInput].disabled = true;
        inputs[indexInput - 1].focus();
        deleting = false;
      }
    }
  } else {
    inputs[indexInput].classList.add("error");
    submitButton.disabled = true;
  }
}

function changeState(indexInput, value) {
  codeToValidate[indexInput] = value;
  deleting = !deleting;
  if (codeToValidate.join("").length === validCode.length) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function sendCode(event) {
  event.preventDefault();

  if (codeToValidate.join("") === validCode) {
    form.style.display = "none";
    document.getElementById("image-dog").style.display = "block";
    codeToValidate = [];
  } else {
    inputs.forEach((input) => input.classList.add("error"));
  }
}

load();
