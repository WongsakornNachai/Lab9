const userList = document.getElementById("user-list");

async function fetchUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    userList.innerHTML = users.map(user => `
      <div class="user" onclick="viewUser(${user.id})">
        <p>${user.name}</p>
      </div>
    `).join("");
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

function viewUser(userId) {
  window.location.href = `user-detail.html?id=${userId}`;
}

fetchUsers();