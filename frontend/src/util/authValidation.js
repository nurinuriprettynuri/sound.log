const isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

export const authValidation = (data, formType) => {
  const result = {};
  const { username, email, password, passwordconfirm } = data;

  if (formType !== "signin") {
    username.length === 0 && (result["username"] = "username is required");
    password !== passwordconfirm &&
      (result["passwordconfirm"] = "password don't mach");
  }

  if (email.length === 0) {
    result["email"] = "email is required";
  }
  if (!isValidEmail(email)) {
    result["email"] = "Invalid email";
  }
  if (password.length <= 5) {
    result["password"] = "Insecure password";
  }

  return Object.keys(result).length === 0 ? [true] : [false, result];
};

export const formText = (whichAuth, signin, registerUser) => {
  const submitAction = whichAuth === "signin" ? signin : registerUser;
  const title = whichAuth === "signin" ? "Sign in" : "Create account";
  const buttonText = "Continue";
  const optionText =
    whichAuth === "signin" ? "Join Sound.Log" : "Already have account";
  const switchModal = whichAuth === "signin" ? "register" : "signin";
  return { submitAction, title, buttonText, optionText, switchModal };
};
