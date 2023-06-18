// FUNCTIONALITY: THIS PAGE ALLOWS FOR THE USER TO EDIT AND DELETE BLOG POSTS ON THE DASHBOARD PAGE
const deletePostHandler = async (event) => {
  event.preventDefault();
  console.log("clicked me");
  console.log(event.target);

  let blogPostId = event.target.getAttribute("data-id");
  console.log(blogPostId);

  const response = await fetch(`/api/blogPost/${blogPostId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.assign(`/dashboard`);
  } else {
    alert(response.statusText);
  }
};

// FUNCTION TO EDIT BLOG POSTS
const editBlogPost = async (event) => {
  event.preventDefault();
  console.log("clicked me");

  let blogPostId = event.target.getAttribute("data-id");

  document.location.assign(`/create/${blogPostId}`);
};

const editButton = document.querySelectorAll("#editBtn");

// ALL BUTTONS ON THE PAGE ARE ITERATED OVER AND EVENT LISTENERS ARE ADDED
for (let i = 0; i < editButton.length; i++) {
  editButton[i].addEventListener("click", editBlogPost);
}

const deleteButton = document.querySelectorAll("#deleteBtn");

// ALLOWS FOR THE USER TO DELETE BLOG POSTS
for (let i = 0; i < deleteButton.length; i++) {
  deleteButton[i].addEventListener("click", deletePostHandler);
}
