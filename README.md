## Two factor code input

This is a 4-digit security code input app that allows enter a two-factor authorization code.

 <img src='./readme_imgs/app.png' width='300px'>

## How works?

The app works with a constructor function TwoFactorCodeInput, which expects the inputs from the app, to add event listeners to them, manipulate them and get a random valid code based on the number of inputs.

_js/two-factor-code-input.mjs_

 <img src='./readme_imgs/twc.PNG' width='500px'>

 <img src='./readme_imgs/getValidCode.PNG' width='500px'>

When the user enters the code, the onInput function is invoked by two events: input and keyup. The keyup event is to know if the Backspace key is pressed, that will mean the user is deleting the input values or going back to the previous input. If the input value is a number onEnterDigit is invoked to update the codeToValidate property and focus on the next input if there is one.

 <img src='./readme_imgs/onInput.PNG' width='500px'>

 <img src='./readme_imgs/onEnterCode.PNG' width='500px'>

 <img src='./readme_imgs/onBackspace.PNG' width='500px'>

The user can paste the code but only if it is in the first input and the length of the pasted code is equal to or less than the number of inputs. Depending on this lenght, the next or the last input will be focused.

 <img src='./readme_imgs/onPaste.PNG' width='500px'>

When the user clicks the verify button, the validateCode function will see if the valid code and the entered code are the same.

 <img src='./readme_imgs/validate.PNG' width='500px'>

A plus: the user can see the valid code and depending on the validation they could receive a message or see an error animation.

_js/index.js_

 <img src='./readme_imgs/plus.PNG' width='500px'>
