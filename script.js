const apikey = "42258355-72c5c997444a62985c929e9b7";

const forsubmit = document.getElementById("search-form");
const searchInput = document.getElementById("searchInput");
const colorInput = document.getElementById("colorInput");
const previousbtn = document.getElementById("previousbtn");
const nextbtn = document.getElementById("nextbtn");
const imageContainer = document.getElementById("results");

let page = 1;
let currentColor = "any color";

forsubmit.addEventListener("submit", function(e) {
  e.preventDefault();
  const keyword = searchInput.value.trim();
  const selectedColor = colorInput.value.trim();
  
  if (keyword) {
    searchImages(keyword, selectedColor);

    previousbtn.style.display = "inline-block";
    nextbtn.style.display = "inline-block";
  } else {
    alert("You have to enter something!");
  }
});

previousbtn.addEventListener("click", function() {
  if (page > 1) {
    page--;
    searchImages(searchInput.value.trim(), colorInput.value.trim());
  }
});

nextbtn.addEventListener("click", function() {
  page++;
  searchImages(searchInput.value.trim(), colorInput.value.trim());
});

async function searchImages(keyword, selectedColor) {
  const url = `https://pixabay.com/api/?key=${apikey}&q=${keyword}&colors=${selectedColor}&image_type=photo&page=${page}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  imageContainer.innerHTML = '';

  data.hits.forEach(image => {
    if (image.tags.toLowerCase().includes(keyword.toLowerCase())) {
      const imgElement = document.createElement('img');
      imgElement.src = image.previewURL; 
      imgElement.alt = image.tags; 
      imageContainer.appendChild(imgElement); 
    }
  });
}

