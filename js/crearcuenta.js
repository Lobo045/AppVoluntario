document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('registerForm').addEventListener('submit', function(event) {
      event.preventDefault();

      // Limpiar mensajes de error

      let isValid = true;
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const confirmPassword = document.getElementById('confirmPassword').value.trim();

      // Validar nombre
      if (name.length < 3) {
          document.getElementById('nameError').textContent = 'El nombre debe tener al menos 3 caracteres.';
          isValid = false;
      }

      // Validar email
      if (!validateEmail(email)) {
          document.getElementById('emailError').textContent = 'Por favor, ingresa un correo electrónico válido.';
          isValid = false;
      }

      // Validar contraseña
      if (password.length < 6) {
          document.getElementById('passwordError').textContent = 'La contraseña debe tener al menos 6 caracteres.';
          isValid = false;
      }

      // Validar confirmación de contraseña
      if (password !== confirmPassword) {
          document.getElementById('confirmPasswordError').textContent = 'Las contraseñas no coinciden.';
          isValid = false;
      }

      // Si todos los datos son válidos, proceder con el envío del formulario
      if (isValid) {
          alert('Registro exitoso');
          // Aquí puedes agregar la lógica para enviar los datos al backend
      }
  });

  // Función para validar el formato del email
  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
  }
});