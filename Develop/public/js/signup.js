const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email_signup').value.trim();
    const password = document.querySelector('#password_signup').value.trim();
  
    if (email && password) {
      //Takes in email and password input values from login handlebars
      //Posts them as an object to the login and user routes
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/newBlog');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);