//HANDLER FOR ALREADY REGISTERED USER
const loginFormHandler = async (event) => {
  event.preventDefault();

  // COLLECTION OF VALUES FROM THE LOGIN FORM
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    //SEND THE POST REQUEST TO THE API ENDPOINT
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      //IF THE USER IS SUCCESSFULLY LOGGED IN, THEY ARE REDIRECTED TO THE HOMEPAGE
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

// HANDLER FOR NEW USER SIGNUP
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

// THIS IS AN EVENT LISTENER FOR THE LOGIN FORM
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
