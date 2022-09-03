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
        <a class="nav-link" href="#" onclick="loadNews('${category.category_id}','${category.category_name}', true)">${category.category_name}</a>
    `;
    categoryUl.appendChild(categoryLi);
  });
};

const loadNews = (id, categoryName, spin) => {
  if (spin) {
    toggleSpinner(true);
  }
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data.data, categoryName))
    .catch((error) => console.log(error));
};

const displayNews = (data, categoryName) => {
  data.sort((a, b) => (b.total_view !== null ? b.total_view : -Infinity) - (a.total_view !== null ? a.total_view : -Infinity));
  console.log(data);
  //   display news Count
  const newsCountContainer = document.getElementById("news-count-container");
  newsCountContainer.innerHTML = `
    <p class="px-3 py-3">${data.length ? data.length : "No"} News found for ${categoryName} category</p>
  `;
  //   display news
  const newsContainer = document.getElementById("news-container");
  newsContainer.textContent = "";
  data.forEach((news) => {
    let details = news.details;
    const detailsSplit = details.split(" ");
    if (detailsSplit.length > 80) {
      const detailsSliced = detailsSplit.slice(0, 80);
      details = detailsSliced.join(" ") + "...";
    }

    const newsDiv = document.createElement("div");
    newsDiv.classList.add("col");
    newsDiv.innerHTML = `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-3">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-start p-3" alt="..." />
                </div>
                <div class="col-md-9 p-3">
                    <div class="card-body" >
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${details}</p>
                    </div>
                    <div class="row row-cols-3 pt-4">
                        <div class="col ps-4">
                            <img src="${news.author.img}" class="rounded img-fluid rounded-circle" style="width:25px"/>
                            <span class="ps-2">${news.author.name ? news.author.name : "No Data Found"}</span>
                        </div>
                        <div class="col ps-4 text-center">
                            <span class="p-1 text-secondary"><i class="fa-solid fa-eye"></i></span>
                            <span>${news.total_view || news.total_view === 0 ? news.total_view : "No Data Found"}</span>
                        </div>
                        <div class="col ps-4 text-end pe-5">
                            <button onclick="loadDetails('${
                              news._id
                            }')" class="btn btn-primary stretched-link px-3" data-bs-toggle="modal" data-bs-target="#newsModal"><i class="fa-solid fa-arrow-right-long"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    newsContainer.appendChild(newsDiv);
  });
  toggleSpinner(false);
};

// spinner
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  isLoading ? loaderSection.classList.remove("d-none") : loaderSection.classList.add("d-none");
};

const loadDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data[0]))
    .catch((error) => console.log(error));
};

const displayDetails = (news) => {
  console.log(news);
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
          <div class="modal-content">
            <div class="modal-header border-0">
              <p class="text-muted">Published: ${news.author?.published_date ? news.author.published_date : "No Data Found"}</p>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body p-4">
              <div class="card mb-3">
                <img src="${news.image_url}" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">${news.title}</h5>
                  <p class="card-text">${news.details}</p>
                </div>
                <div class="row row-cols-3 py-4 ">
                  <div class="col ps-4">
                    <img src="${news.author.img}" class="rounded img-fluid rounded-circle" style="width: 25px" />
                    <span class="ps-2">${news.author.name ? news.author.name : "No Data Found"}</span>
                  </div>
                  <div class="col ps-4 text-center">
                    <span class="p-1 text-secondary"><i class="fa-solid fa-eye"></i></span>
                    <span>${news.total_view || news.total_view === 0 ? news.total_view : "No Data Found"}</span>
                  </div>
                  <div class="col ps-4 text-center">
                    <p>Rating: ${news.rating?.number ? news.rating.number : "No Data Found"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer border-0">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
  `;
};

loadNews("01", "Breaking News");
loadCategories();
