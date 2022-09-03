const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category))
    .catch((error) => console.log(error));
};

const displayCategories = (categories) => {
  const categoryUl = document.getElementById("category-container");
  categories.forEach((category) => {
    const categoryLi = document.createElement("li");
    categoryLi.classList.add("nav-item");
    categoryLi.innerHTML = `
        <a class="nav-link" href="#" onclick="loadNews('${category.category_id}')">${category.category_name}</a>
    `;
    categoryUl.appendChild(categoryLi);
  });
};

const loadNews = (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data.data))
    .catch((error) => console.log(error));
};

const displayNews = (data) => {
  console.log(data);
};

loadCategories();
