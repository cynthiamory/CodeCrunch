// TO SET UP THE FUNCTIONALITY FOR THE NEW BLOG POST PAGE, WE NEED TO CREATE A NEW FILE IN THE PUBLIC/JS DIRECTORY CALLED newPostHandler.js
async function newPostHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#titleInput").value.trim();
  const description = document.querySelector("#bodyInput").value.trim();

  if (title && description) {
    const response = await fetch(`/api/blogPost`, {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

// THIS IS AN EVENT LISTENER 
document
  .querySelector(".createBlogPost")
  .addEventListener("submit", newPostHandler);
