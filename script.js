function generateStory() {
    // Get values from dropdowns
    const animal = document.getElementById('animal').value;
    const theme = document.getElementById('theme').value;
    const color = document.getElementById('color').value;
    const length = document.getElementById('length').value;
  
    // Create the request payload
    const payload = { animal, theme, color, length };
  
    // Replace with your actual n8n webhook endpoint
    fetch('https://mikeywikey.app.n8n.cloud/webhook/494df854-ea33-45f4-9a3b-c39c5b9198c5', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      // Assume data.story contains the generated story
      sessionStorage.setItem('generatedStory', data.story);
      window.location.href = 'story.html';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error generating the story. Please try again.');
    });
  }
  
