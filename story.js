// Retrieve the generated story from sessionStorage and display it
const storyContent = sessionStorage.getItem('generatedStory') || "No story generated.";
document.getElementById('storyContent').innerText = storyContent;

// Function to show in-app notifications
function showNotification(message) {
  const notificationDiv = document.getElementById('notification');
  notificationDiv.textContent = message;
  notificationDiv.style.display = 'block';
  // Hide notification after 3 seconds
  setTimeout(() => {
    notificationDiv.style.display = 'none';
  }, 3000);
}

// Save story function using localStorage with in-app notification
function saveStory() {
  // Retrieve the current saved stories or initialize an empty array
  let savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
  
  // Create an object to store the story along with a timestamp (optional)
  const storyToSave = {
    story: storyContent,
    savedAt: new Date().toISOString()
  };

  // Add the new story to the saved stories array
  savedStories.push(storyToSave);

  // Save the updated array back into localStorage
  localStorage.setItem('savedStories', JSON.stringify(savedStories));
  
  // Show in-app notification instead of browser alert
  showNotification("Story saved successfully!");
}
