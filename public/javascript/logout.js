const logout = async () => {
    //make a post request to destroy the session
    const response = await fetch("/api/users/logout", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });
    console.log(response);

    if (response.ok) {
        //if successful logout, redirect to login page
        document.location.replace("/login");
    } else {
        alert("Failed to logout");
    }
};

document.querySelector("#logout").addEventListener("click", logout);