
function adminSide(){
    // Get input values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate credentials
    if (username === "admin" && password === "123") {
        window.location.href = "../admin/admin.html";
        alert("Login successful!");
    } else {
        alert("Invalid username or password. Please try again.");
        // Optionally, you can clear the password field for better UX
    }
}
