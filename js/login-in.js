var frameContainer1 = document.getElementById("frameContainer1");
if (frameContainer1) {
  frameContainer1.addEventListener("click", function (e) {
    window.location.href = "./crear-cuenta.html";
  });
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Replace these with actual username and password values for demo purposes
    const validUsername = 'admin';
    const validPassword = 'admin123';

    if (username === validUsername && password === validPassword) {
        alert('Login successful!');
        window.location.href = "./index.html";
        // Redirect to another page or perform further actions
    } else {
        errorMessage.textContent = 'Invalid username or password. Please try again.';
    }
});

