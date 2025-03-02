// Global variable to hold the index of the story pending deletion
let currentDeleteIndex = null;

// Function to display saved stories on the main list
function displayStories() {
  const savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
  const storyList = document.getElementById('storyList');
  storyList.innerHTML = ''; // Clear the current list

  if (savedStories.length === 0) {
    const message = document.createElement('li');
    message.className = 'no-stories';
    message.textContent = "No saved stories found.";
    storyList.appendChild(message);
    return;
  }

  // Create a list item for each saved story
  savedStories.forEach((storyObj, index) => {
    let title = storyObj.story.split('.')[0]; // Use first sentence as title
    if (title.length > 50) {
      title = title.substring(0, 50) + '...';
    }
    
    const li = document.createElement('li');
    li.className = 'story-item';
    li.textContent = title;
    
    // On click, store the full story in sessionStorage and navigate to story.html
    li.addEventListener('click', function() {
      sessionStorage.setItem('generatedStory', storyObj.story);
      window.location.href = 'story.html';
    });
    storyList.appendChild(li);
  });
}

// Function to open the delete modal with a list of stories to choose from
function openDeleteModal() {
  const savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
  const deleteList = document.getElementById('deleteList');
  deleteList.innerHTML = ''; // Clear previous modal list content

  if (savedStories.length === 0) {
    const li = document.createElement('li');
    li.textContent = "No saved stories to delete.";
    deleteList.appendChild(li);
  } else {
    savedStories.forEach((storyObj, index) => {
      let title = storyObj.story.split('.')[0];
      if (title.length > 50) {
        title = title.substring(0, 50) + '...';
      }
      const li = document.createElement('li');

      const titleSpan = document.createElement('span');
      titleSpan.textContent = `${index}: ${title}`;

      const btn = document.createElement('button');
      btn.textContent = 'Delete';
      btn.onclick = function() {
        // Instead of using a browser confirm, open the in-app confirmation modal
        currentDeleteIndex = index;
        document.getElementById('confirmationModal').style.display = 'block';
      };

      li.appendChild(titleSpan);
      li.appendChild(btn);
      deleteList.appendChild(li);
    });
  }
  // Display the delete modal
  document.getElementById('deleteModal').style.display = 'block';
}

// Function to show an in-app notification
function showNotification(message) {
  const notificationDiv = document.getElementById('notification');
  notificationDiv.textContent = message;
  notificationDiv.style.display = 'block';
  // Hide notification after 3 seconds
  setTimeout(() => {
    notificationDiv.style.display = 'none';
  }, 3000);
}

// Attach event listeners for confirmation modal buttons
document.getElementById('confirmYes').onclick = function() {
  const savedStories = JSON.parse(localStorage.getItem('savedStories')) || [];
  if (currentDeleteIndex !== null && currentDeleteIndex < savedStories.length) {
    savedStories.splice(currentDeleteIndex, 1);
    localStorage.setItem('savedStories', JSON.stringify(savedStories));
    showNotification("Story deleted.");
    displayStories();
    // Refresh the delete modal list
    openDeleteModal();
    currentDeleteIndex = null;
    document.getElementById('confirmationModal').style.display = 'none';
  }
};

document.getElementById('confirmNo').onclick = function() {
  currentDeleteIndex = null;
  document.getElementById('confirmationModal').style.display = 'none';
};

// Initialize the page by displaying saved stories
document.addEventListener('DOMContentLoaded', displayStories);
