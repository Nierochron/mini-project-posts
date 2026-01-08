import { log } from "handlebars";
import templatePost from "../templates/post.hbs"


const containerPosts = document.getElementById("postsContainer")
const BASE_URL = "http://localhost:3000/posts";

// Отримання списку постів

async function getPosts() {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Створення нового поста

async function createPost(event) {
  event.preventDefault()
  const title = event.target.titleInput.value
  const content = event.target.contentInput.value

  if (!title || !content) return;

  
  try {
    await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });
    const posts = await getPosts();
    renderPosts(posts);
  } catch (error) {
    console.error(error);
  }
}

// Оновлення поста

async function updatePost(id, title, content) {
  try {
  } catch (error) {
    console.error(error);
  }
}

// Видалення поста

async function deletePost(event) {
  const button = event.target.closest('[data-action="delete"]');;
  if (!button) return;
  const id = button?.dataset.id
  const confirmDelete = confirm("Ви впевнені, що хочете видалити цей коментар?")
  if (!confirmDelete) return;

  try {
    await fetch(`${BASE_URL}/${id}`, {method: 'DELETE'})
    const posts = await getPosts();
    renderPosts(posts)
  } catch (error) {
    console.error(error);
  }
}

// Додавання коментаря до поста

async function createComment(postId, comment) {
  try {
  } catch (error) {
    console.error(error);
  }
}

// Оновлення відображення постів на сторінці

function renderPosts(posts) {
  const markup = templatePost(posts);

  containerPosts.innerHTML = markup;
}

// Обробник події для створення поста

document.getElementById("createPostForm").addEventListener("submit", createPost);

// Обробник події для редагування поста

//  document.addEventListener("click", cb);

// Обробник події для видалення поста

document.addEventListener("click", deletePost);

// Обробник події для додавання коментаря

//  document.addEventListener("submit", cb);

// Запуск додатку

async function startApp() {
  const posts = await getPosts();

  renderPosts(posts);
}

startApp();