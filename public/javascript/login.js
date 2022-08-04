const loginForm = async (event) => {
    //stop the browser from submitting the form immediately so we can add in the api response
    event.preventDefault();

    //collect values from the login form
    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
    // const errorMessage = document.querySelector(".error");
    console.log(email, password);
    if (email && password) {
        //send the email and password to the server with a post request
        const response = await fetch ("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json"},
        });
        console.log(response);
        if(response.ok) {
            //then redirect browser to the food choices home page
            document.location.replace("/")
        } else {
            alert("Your login was unsuccessful, please try again");
        }
        console.log("message");
    }
};



// sign up with us
const signupForm = async(event) => {
    event.preventDefault();
    
    //collect data from the form
    //no id's here yet for first or last name, do we need them?
    // const name = document.querySelector("name-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password").value.trim();
    
    if (email && password) {
        //send data to the server
        const response = await fetch ("/api/users", {
            method: "POST",
            body: JSON.stringify({email, password}),
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            document.location.replace("/api/users");       
        } else {
            alert("Failed to sign up");
        }
        console.log(response.statusText);
    }
    
};

document.querySelector(".login-form").addEventListener("submit", loginForm);

document.querySelector(".signup-form").addEventListener("submit", signupForm);

