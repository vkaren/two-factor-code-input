const form = document.getElementById("form");
function loadInputs() {
  let i = 0;
  while (i < 4) {
    form.innerHTML += `
      <input type="text" name="digit" id="digit-${i + 1}" pattern="[0-9]">
      `;
    i++;
  }
  form.innerHTML += '<button type="submit">Submit</button>';
}
loadInputs();

const inputs = Object.values(form.children).filter(
  (element) => element.localName === "input"
);
const validCode = "1973";
let codeToValidate = "";

inputs.forEach((element, i) => {
  element.addEventListener("input", (event) => onInput(event, i));
  element.addEventListener("keyup", (event) => onInput(event, i));
  if (i !== 0) {
    element.disabled = true;
  }
});

function onInput(event, indexInput) {
  const value = event.currentTarget.value;

  const keyPressed = event.key;
  console.log(event.type,value, keyPressed);

  if (!isNaN(value - "")) {
    if (value.length !== 0 && keyPressed !== "Backspace" && event.type === 'input') {
      codeToValidate +=  value[value.length-1];
      console.log(codeToValidate, 'añadiendo');
      if (inputs[indexInput + 1]) {
        inputs[indexInput + 1].disabled = false;
        inputs[indexInput + 1].focus();
      }
    }
    
    if(keyPressed === "Backspace"){
       
       if (value.length === 0 ) {
      
      if (inputs[indexInput - 1]) {
        inputs[indexInput].disabled = true;
        inputs[indexInput - 1].focus();
      }
    }  else {
        codeToValidate = codeToValidate.substring(0,codeToValidate.length-1);
        console.log(codeToValidate, 'borrando');
    }
    }
   
    console.log(codeToValidate);
  }
}
