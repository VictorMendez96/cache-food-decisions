const loginFormHandler = async (event) => {
  //stop the browser from submitting the form immediately so we can add in the api response
  event.preventDefault();

  //collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    //send the email and password to the server with a post request
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    
    if (response.ok) {
      //then redirect browser to the food choices home page
      document.location.replace("/dashboard");
    } else {
      alert("Your login was unsuccessful, please try again");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
