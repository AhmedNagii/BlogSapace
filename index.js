const formEl = document.getElementById("new-post") 
let postsArray = [];


function renderPosts() {
  let html = "";
  for (let post of postsArray) {
    html += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr />
        `;
  }
  document.getElementById("blog-list").innerHTML = html;
 
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((data) => {
    postsArray = data.slice(0, 5);
    renderPosts(data);
  });

  formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const postTitle = document.getElementById("post-title").value;
  const postBody = document.getElementById("post-body").value;
  const data = {
    title: postTitle,
    body: postBody,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((post) => post.json())
    .then((post) => {
      postsArray.unshift(post);
      renderPosts();
      formEl.reset()
    });
});
