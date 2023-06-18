// INITIALLY, THE URL IS SPLIT TO GET THE BLOG POST ID
let blogPost = window.location.pathname.split("/");

// TO ALLOW FOR EDITING OF BLOG POSTS FROM THE INDIVIDUAL BLOG POST PAGE, THE BLOG POST ID IS PASSED IN THE URL
const editPost = async (event) => {
  event.preventDefault();
  console.log("clicked me");


  const comment_body = document.getElementById("editBtn").value.trim();

  console.log(blogPost);

  document.location.assign(`/create/${blogPost[2]}`);
};

const editButton = document.querySelectorAll("#editBtn");

// ALL BUTTONS ON THE PAGE ARE ITERATED OVER AND EVENT LISTENERS ARE ADDED TO THE EDIT BUTTONS
for (let i = 0; i < editButton.length; i++) {
  editButton[i].addEventListener("click", editPost);
}
