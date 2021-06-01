const submitBtn = $(".login-signup-btn");

submitBtn.click(function(e) {
    // Stop the browser from submitting the form so we can do so with JavaScript
    e.preventDefault();
  
    // Gather the data from the form elements on the page
    const email = document.querySelector('.email-login').value.trim();
    const password = document.querySelector('.password-login').value.trim();
  
    if (email && password) {
      // Send the e-mail and password to the server
      const response = fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
    //   if (response.ok) {
        document.location.replace('/');
    //   } else {
    //     alert('Failed to log in');
    //   }
    }
});