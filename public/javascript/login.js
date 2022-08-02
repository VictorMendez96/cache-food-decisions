const loginForm = async (event) => {
    //stop the browser from submitting the form immediately so we can add in the api response
    event.preventDefault();

    //collect values from the login form
    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
    const errorMessage = document.querySelector(".error");

    if (email && password) {
        //send the email and password to the server with a post request
        const response = await fetch ("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ userName, password }),
            headers: { "Content-Type": "application/json"},
        });

        if(response.ok) {
            //then redirect browser to the food choices home page
            document.location.replace("/")
        } else {
            errorMessage.style.display = "block";
        }
        console.log("message");
    }
};



// sign up with us
const signupForm = async(event) => {
    event.preventDefault();
    
    //collect data from the form
    const userName = document.querySelector("#name-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password").value.trim();
    
    if (name && email && password) {
        //send data to the server
        const response = await fetch ("/api/users", {
            method: "POST",
            body: JSON.stringify({ userName, email, password}),
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            document.location.replace("/api/users");       
        } else {
            alert(response.statusText);
        }
    }
    
};

document.querySelector(".login-form").addEventListener("submit", loginForm);

document.querySelector(".signup-form").addEventListener("submit", signupForm);

