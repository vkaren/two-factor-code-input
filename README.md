## Two factor code input

This application facilitates the input of a 4-digit security code for two-factor authorization.

 <img src='./readme_imgs/app.png' width='300px'>

## How it works?

The app works with a constructor function TwoFactorCodeInput, which expects the inputs from the app, to add event listeners, manipulate them and generates a random valid code based on the number of inputs.

_js/two-factor-code-input.mjs_

 <img src='./readme_imgs/twc.PNG' width='500px'>

 <img src='./readme_imgs/getValidCode.PNG' width='500px'>

When a user enters a code, the onInput function is triggered by two events: input and keyup. The keyup event detects if the Backspace key is pressed, indicating input deletion or navigation to the previous input. If the input value is a number, onEnterDigit is called to update the codeToValidate property and focus on the next input if available.

 <img src='./readme_imgs/onInput.PNG' width='500px'>

 <img src='./readme_imgs/onEnterCode.PNG' width='500px'>

 <img src='./readme_imgs/onBackspace.PNG' width='500px'>

Users can paste a code, but only in the first input and if the length of the pasted code is equal to or less than the number of inputs. Depending on the length, the next or the last input will be focused.

 <img src='./readme_imgs/onPaste.PNG' width='500px'>

When the user clicks the verify button,the validateCode function compares the valid code with the entered code.

 <img src='./readme_imgs/validate.PNG' width='500px'>

Additionally, users can view the valid code, and based on the validation outcome, they may receive a message or observe an error animation.

_js/index.js_

 <img src='./readme_imgs/plus.PNG' width='500px'>
