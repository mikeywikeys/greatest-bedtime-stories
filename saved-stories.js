document.addEventListener('DOMContentLoaded', function() {
    // Retrieve saved stories from localStorage
    const savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
    const storyList = document.getElementById('storyList');
  
    // If no stories exist, display a message
    if (savedStories.length === 0) {
      const message = document.createElement('li');
      message.className = 'no-stories';
      message.textContent = "No saved stories found.";
      storyList.appendChild(message);
      return;
    }
  
    // Iterate over each saved story and create a list item for its title
    savedStories.forEach((storyObj, index) => {
      // Generate a title from the story text.
      // Here we use the first sentence as a title. Adjust as needed.
      let title = storyObj.story.split('.')[0];
      if (title.length > 50) {
        title = title.substring(0, 50) + '...';
      }
  
      // Create a clickable list item for the story
      const li = document.createElement('li');
      li.className = 'story-item';
      li.textContent = title;
  
      // On click, store the full story in sessionStorage and redirect to story page.
      li.addEventListener('click', function() {
        sessionStorage.setItem('generatedStory', storyObj.story);
        window.location.href = 'story.html';
      });
      storyList.appendChild(li);
    });
  });
  