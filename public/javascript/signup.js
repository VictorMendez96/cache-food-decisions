// sign up with us
const signupFormHandler = async(event) => {
    event.preventDefault();
    
    //collect data from the form
    const lastName = document.querySelector("#last-name").value.trim();
    const firstName = document.querySelector("#first-name").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
    
    if (email && password) {
        //send data to the server
        const response = await fetch ("/api/users/signup", {
            method: "POST",
            body: JSON.stringify({lastName, firstName, email, password}),
            headers: { "Content-Type": "application/json" },
        });
        if(response.ok) {
            //then redirect browser to the food choices home page
            alert("Thank you for signing up!");
            document.location.replace("/dashboard");
        } else {
            alert("Your login was unsuccessful, please try again");
        }
        console.log(response);
    }
    
};

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);