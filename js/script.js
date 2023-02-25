const form = document.getElementById("form");
let inputs;
let submitButton;

const validCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000 + '';
let codeToValidate = [];
let deleting = false;

function load() {
  document.getElementById('valid-code').innerText = validCode

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

      changeStateSubmitButton()
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
        changeStateSubmitButton()
        
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

function sendCode(event) {
  event.preventDefault();

  inputs.forEach((input) => (input.value = ""));

  codeToValidate = codeToValidate.join("");

  if (codeToValidate === validCode) {
    form.style.display = 'none'
    document.getElementById('code').style.display = 'none'
    document.getElementById('image-dog').style.display = 'block'
  } else {
  
    inputs.forEach(input =>  input.classList.add("error"))
  }
  codeToValidate = [];
}

function changeStateSubmitButton(){
  if (codeToValidate.join("").length === validCode.length) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

load();
