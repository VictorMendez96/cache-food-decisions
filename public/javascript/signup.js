// sign up with us
const signupFormHandler = async(event) => {
    event.preventDefault();
    
    //collect data from the form
    //no id's here yet for first or last name, do we need them?
    const lastName = document.querySelector("#lastName").value.trim();
    const firstName = document.querySelector("first-name").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password").value.trim();
    
    if (email && password) {
        //send data to the server
        const response = await fetch ("/api/users", {
            method: "POST",
            body: JSON.stringify({lastName, firstName, email, password}),
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

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);