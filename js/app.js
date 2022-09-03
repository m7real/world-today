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
        <a class="nav-link" href="#" onclick="loadNews('${category.category_id}','${category.category_name}')">${category.category_name}</a>
    `;
    categoryUl.appendChild(categoryLi);
  });
};

const loadNews = (id, categoryName) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data.data, categoryName))
    .catch((error) => console.log(error));
};

const displayNews = (data, categoryName) => {
  data.sort((a, b) => (b.total_view !== null ? b.total_view : -Infinity) - (a.total_view !== null ? a.total_view : -Infinity));
  console.log(data);
  const newsCountContainer = document.getElementById("news-count-container");
  //   newsCountContainer.textContent = ``;
  newsCountContainer.innerHTML = `
    <p class="px-3 py-3">${data.length ? data.length : "No"} News found for ${categoryName} category</p>
  `;
};

loadCategories();
