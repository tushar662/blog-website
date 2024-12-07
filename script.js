
let posts = [];


const themeToggleButton = document.getElementById("themeToggle");
let isDarkMode = false; 

function toggleTheme() {
  if (isDarkMode) {
    document.body.classList.remove("dark-mode");
    themeToggleButton.textContent = "Dark Mode";
    themeToggleButton.classList.replace("btn-dark", "btn-outline-secondary");
  } else {
    document.body.classList.add("dark-mode");
    themeToggleButton.textContent = "Light Mode";
    themeToggleButton.classList.replace("btn-outline-secondary", "btn-dark");
  }
  isDarkMode = !isDarkMode;
}

themeToggleButton.addEventListener("click", toggleTheme);

function loadPosts() {
  const postContainer = document.getElementById("postContainer");
  postContainer.innerHTML = "";

  posts.forEach((post, index) => {
    postContainer.innerHTML += `
      <div class="col-md-4">
        <div class="card mb-4">
          <img src="${post.image}" class="card-img-top" alt="${post.title}">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.description}</p>
            <button class="btn btn-danger" onclick="deletePost(${index})">Delete</button>
          </div>
        </div>
      </div>
    `;
  });
}

function addPost(event) {
  event.preventDefault();

  const title = document.getElementById("postTitle").value;
  const description = document.getElementById("postDescription").value;
  const imageInput = document.getElementById("postImage");

  if (!imageInput.files.length) {
    alert("Please upload an image!");
    return;
  }

  const image = URL.createObjectURL(imageInput.files[0]);
  posts.push({ title, description, image });

  loadPosts();
  document.getElementById("addPostForm").reset();
}

function deletePost(index) {
  posts.splice(index, 1);
  loadPosts();
}

document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  alert(`Thank you, ${document.getElementById("contactName").value}! Your message has been sent.`);
  document.getElementById("contactForm").reset();
});

document.getElementById("addPostForm").addEventListener("submit", addPost);

document.addEventListener("DOMContentLoaded", loadPosts);
