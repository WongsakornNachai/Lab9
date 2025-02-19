const postsList = document.getElementById("posts-list");
const userName = document.getElementById("user-name");
const userId = new URLSearchParams(window.location.search).get("id"); // เพิ่มบรรทัดนี้

async function fetchPosts() {
  try {
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = await userResponse.json();
    userName.textContent = user.name;

    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    const posts = await postsResponse.json();
    postsList.innerHTML = posts.map(post => `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button class="toggle-comments-btn" onclick="toggleComments(${post.id}, this)">ดูความคิดเห็น</button>
        <div id="comments-${post.id}" class="comments" style="display: none;"></div>
      </div>
    `).join("");
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

async function toggleComments(postId, button) {
  const commentsContainer = document.getElementById(`comments-${postId}`);
  if (commentsContainer.style.display === "none") {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    const comments = await response.json();
    commentsContainer.innerHTML = comments.map(comment => `
      <div class="comment">
        <p><strong>${comment.name}</strong> (${comment.email})</p>
        <p>${comment.body}</p>
      </div>
    `).join("");
    commentsContainer.style.display = "block";
    button.textContent = "ซ่อนความคิดเห็น";
  } else {
    commentsContainer.style.display = "none";
    button.textContent = "ดูความคิดเห็น";
  }
}

fetchPosts();
