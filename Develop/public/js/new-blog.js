// const { Uploader } = require("uploader");
// const process = require('dotenv').config();
  
  const submitForm = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const comment = document.querySelector('#content').value.trim();
    
    console.log(title, comment);
  
    if (title && comment) {
      const response = await fetch('/api/posts/new-post', {
        method: 'POST',
        credentials: 'include',    
        body: JSON.stringify({ title, comment, id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert('Post made!')
        document.location.replace('/dashboard');
      } else {
        alert('Failed to post review!');
      }
    }
  }
  
  document.querySelector('#submit').addEventListener('click', submitForm);