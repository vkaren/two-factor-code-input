const form = document.getElementById("form");
function loadInputs() {
  let i = 0;
  while (i < 4) {
    form.innerHTML += `
      <input type="text" name="digit" id="digit-${i + 1}" pattern="[0-9]">
      `;
    i++;
  }
  form.innerHTML += '<button type="submit" id="submit-button">Submit</button>';
}
loadInputs();

const inputs = Object.values(form.children).filter(
  (element) => element.localName === "input"
);
document.getElementById('submit-button').addEventListener('click', sendCode)
const validCode = "1973";
let codeToValidate = "";  //usar un object instead of a string ?? idk need to think about it

inputs.forEach((element, i) => {
  // element.addEventListener("input", (event) => onInput(event, i));
  element.addEventListener("keyup", (event) => onInput(event, i));
  if (i !== 0) {
    element.disabled = true;
  }
});

function onInput(event, indexInput) {
  const value = event.currentTarget.value;

  const keyPressed = event.key;

  if (!isNaN(value - "")) {
    if (keyPressed !== "Backspace") {
      codeToValidate += value[value.length - 1];

      console.log(codeToValidate, "añadiendo");

      if (inputs[indexInput + 1]) {
        inputs[indexInput + 1].disabled = false;
        inputs[indexInput + 1].focus();
      }
    } else if(keyPressed === "Backspace") {
      let codePave =  codeToValidate
      
      if(validCode.length-codeToValidate.length  !== 1){
         codeToValidate = codeToValidate.substring(0, codeToValidate.length - 1);
         console.log(codePave,codeToValidate, "borrando");
      } 
      
      if(codePave === codeToValidate){
        if (inputs[indexInput - 1]) {
          inputs[indexInput].disabled = true;
          inputs[indexInput - 1].focus();
        }
        console.log(codePave,codeToValidate, "regresando");
      }

    } 

    console.log(codeToValidate);
  }
}

function sendCode(event){
  event.preventDefault()

  if(codeToValidate=== validCode){
    console.log("you're right mmgbo")
  } else {
   console.log('nahh')
  }
}