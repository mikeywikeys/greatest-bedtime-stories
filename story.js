// Retrieve the generated story from sessionStorage and display it
const storyContent = sessionStorage.getItem('generatedStory') || "No story generated.";
document.getElementById('storyContent').innerText = storyContent;

// Save story function using localStorage
function saveStory() {
  // Retrieve the current saved stories or initialize an empty array
  let savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
  
  // Create an object to store the story along with a timestamp (optional)
  const storyToSave = {
    story: storyContent,
    savedAt: new Date().toISOString()
  };

  // Add the new story to the array
  savedStories.push(storyToSave);

  // Store the updated array back into localStorage
  localStorage.setItem('savedStories', JSON.stringify(savedStories));
  
  alert("Story saved successfully!");
}
