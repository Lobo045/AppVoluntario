document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validación simple de contraseñas
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Las contraseñas no coinciden';
        return;
    }

    // Datos del usuario
    const userData = { name, email, password };

    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Usuario registrado exitosamente');
            // Puedes redirigir al usuario o limpiar el formulario aquí
        } else {
            document.getElementById('emailError').textContent = result.message || 'Error al registrar el usuario';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('emailError').textContent = 'Error al conectar con la API';
    }
});
