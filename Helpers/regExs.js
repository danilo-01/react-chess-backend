// Regular expressions
/* 
I did not create these they can be found here
https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username
https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
https://stackoverflow.com/questions/2385701/regular-expression-for-first-and-last-name
*/

const regExs = {
  username:
    /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z][a-zA-Z0-9._]+(?<![_.])$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  email:
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  name: /^[a-z ,.'-]+$/i,
};

module.exports = regExs;
