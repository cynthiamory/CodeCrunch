// THIS IS THE FUNCTION THAT IS CALLED WHEN THE USER CLICKS THE DELETE BUTTON ON THE INDIVIDUAL BLOG POST PAGE
const deletePostHandler = async (event) => {
  event.preventDefault();
  console.log("clicked me");
  console.log(event.target);

  let blogPost = window.location.pathname.split("/");
  console.log(blogPost);

  const response = await fetch(`/api/blogPost/${blogPost[2]}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.assign(`/dashboard`);
  } else {
    alert(response.statusText);
  }
};

const deleteButton = document.querySelectorAll("#deleteBtn");

// ALL BUTTONS ON THE PAGE ARE ITERATED OVER AND EVENT LISTENERS ARE ADDED TO THE DELETE BUTTONS
for (let i = 0; i < deleteButton.length; i++) {
  deleteButton[i].addEventListener("click", deletePostHandler);
}
