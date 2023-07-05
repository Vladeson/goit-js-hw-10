import { fetchBreeds } from "./cat-api"
// import { fetchCatByBreed } from "./cat-api"

const select = document.querySelector(".breed-select")
const catInfo = document.querySelector(".cat-info")
const loader = document.querySelector(".loader")
const error = document.querySelector(".error")

function showLoader() {
  loader.style.display = "block";
}
function hideLoader() {
  loader.style.display = "none";
}
function showSelect() {
  select.style.display = "block";
}
function hideSelect() {
  select.style.display = "none";
}
function hideCatInfo() {
  catInfo.style.display = "none";
}
function showCatInfo() {
  catInfo.style.display = "flex";
}
function showError() {
  error.style.display = "block";
}
function hideError() {
  error.style.display = "none";
}

hideSelect()
hideError()

fetchBreeds('https://api.thecatapi.com/v1/breeds')
    .then((data) => {
        hideSelect()
        showLoader()
        
        data.forEach(function addOption(element) {
            let newOption = document.createElement("option")
            newOption.value = element.id;
            newOption.text = element.name;
            select.appendChild(newOption);
        })

        hideLoader()
        showSelect()
    })
    .catch((err => {
            hideLoader()
            showError()
        }))
        
select.addEventListener("input", () => {
    hideCatInfo()
    hideSelect()
    showLoader()

    const selectedValue = select.value
    fetchBreeds(`https://api.thecatapi.com/v1/images/search?breed_ids=${selectedValue}`)
        .then((data) => {
            const cat = data[0]
            catInfo.innerHTML = '';
            catInfo.insertAdjacentHTML("beforeend",
                `<img src="${cat.url}" class="image" height="500" />
               <div class="section">
                    <p class="breed">${cat.breeds[0].name}</p>
                    <p class="desc">${cat.breeds[0].description}</p>
                    <p class="temp"><span class="title-temp">Temperament: </span>${cat.breeds[0].temperament}</p>
                </div>`
            )
            catInfo.style.cssText = "display: flex; gap: 20px; margin-top: 20px"

            const breed = document.querySelector(".breed")
            breed.style.cssText = "font-size: 40px; font-weight: 900"

            const titleTemp = document.querySelector(".title-temp")
            titleTemp.style.cssText = "font-size: 20px; font-weight: 600"

            hideLoader()
            showSelect()
            showCatInfo()
        })
        .catch((err => {
            hideLoader()
            showError()
        }))
})