const userDetail = document.getElementById("user-detail");
const userId = new URLSearchParams(window.location.search).get("id");

document.getElementById("view-posts").addEventListener("click", () => {
  window.location.href = `user-posts.html?id=${userId}`;
});

async function fetchUserDetail() {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = await response.json();
    userDetail.innerHTML = `
      <h2>${user.name}</h2>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
    `;
  } catch (error) {
    console.error("Error fetching user detail:", error);
  }
}

fetchUserDetail();
