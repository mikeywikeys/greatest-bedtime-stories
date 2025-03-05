function generateStory() {
    const waitingIndicator = document.getElementById('waitingIndicator');
    waitingIndicator.style.display = 'block';
    let dotCount = 0;
    const maxDots = 3;
    function getDots(count) {
        let dots = '';
        for (let i = 0; i < count; i++) {
          dots += '.';
        }
        return dots;
      }
      const interval = setInterval(() => {
        dotCount = (dotCount + 1) % (maxDots + 1);
        // Use .repeat() if available; otherwise, use getDots()
        waitingIndicator.textContent = 'Waiting' + ('.'.repeat ? '.'.repeat(dotCount) : getDots(dotCount));
      }, 500);

    // Get values from dropdowns
    const animal = document.getElementById('animal').value;
    const theme = document.getElementById('theme').value;
    const color = document.getElementById('color').value;
    const length = document.getElementById('length').value;
  
    // Create the request payload
    const payload = { animal, theme, color, length };
  
    // Replace with your actual n8n webhook endpoint
    fetch('https://primary-production-cfb3.up.railway.app/webhook/494df854-ea33-45f4-9a3b-c39c5b9198c5', {
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
  
