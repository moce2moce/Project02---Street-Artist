let localStorageName = localStorage.getItem("loged In");
let visitorsItemWrapper = document.querySelector(".visitorsItemWrapper");
let visitorsFilterPage = document.querySelector(".visitorsFilterPage");
let filterTitle = document.querySelector("#filterTitle");
let filteredByArtists = document.querySelector("#filteredControlSelect");
let submitBtnFilter = document.querySelector(".filterIconSubmit");
let cancelBtnFilter = document.querySelector(".filterIconCancel");
let minPrice = document.querySelector("#minPrice");
let maxPrice = document.querySelector("#maxPrice");
let typeOfPainting = document.querySelector("#typeOfPainting");
let filterIcon = document.querySelector(".filterIcon");
let myTitle;
let myFilterArtists;
let myMaxPrice;
let myMinPrice;
let myType;

filterIcon.addEventListener("click", function () {
  visitorsFilterPage.classList.toggle("move-right");
  localStorage.setItem("InFilteredItemsMenu", "in");
});

filteredByArtists.innerHTML = "";

let optionMenuFilteredArtist = document.createElement("option");
optionMenuFilteredArtist.setAttribute("disabled", true);
optionMenuFilteredArtist.setAttribute("value", "");
optionMenuFilteredArtist.setAttribute("selected", true);
optionMenuFilteredArtist.innerHTML = `Chose`;
filteredByArtists.append(optionMenuFilteredArtist);

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((artist) =>
    artist.forEach((el) => {
      filteredByArtists.innerHTML += `<option value='${el.name}'>${el.name}</option>`;
    })
  );

typeOfPainting.innerHTML = "";

let optionMenuFilteredByType = document.createElement("option");
optionMenuFilteredByType.setAttribute("disabled", true);
optionMenuFilteredByType.setAttribute("value", "");
optionMenuFilteredByType.setAttribute("selected", true);
optionMenuFilteredByType.innerHTML = `Chose`;
typeOfPainting.append(optionMenuFilteredByType);

itemTypes.forEach((paintings) => {
  typeOfPainting.innerHTML += `<option value='${paintings}'>${paintings}</option>`;
});

let isPublishedFilteretArtist = items.filter((el) => el.isPublished === true);

function initVisitorListingPage() {
  visitorsItemWrapper.innerHTML = "";
  if (localStorage.getItem("InFilteredItemsMenu")) {
    let filtered = isPublishedFilteretArtist.filter(
      (item) =>
        (myTitle ? item.title.includes(myTitle) : true) &&
        (myMinPrice ? item.price >= myMinPrice : true) &&
        (myMaxPrice ? item.price <= myMaxPrice : true) &&
        (myFilterArtists ? item.artist.includes(myFilterArtists) : true) &&
        (myType ? item.type.includes(myType) : true)
    );
    filtered.forEach((artist, idx) => {
      if (idx % 2 == 0) {
        createCard(artist, "wraperDiv");
      } else {
        createCard(artist, "wraperDivOdd");
      }
      localStorage.setItem("neshto", "drugo");
    });
  } else {
    isPublishedFilteretArtist.forEach((artist, idx) => {
      if (idx % 2 == 0) {
        createCard(artist, "wraperDiv");
      } else {
        createCard(artist, "wraperDivOdd");
      }
    });
  }
  localStorage.removeItem("InFilteredItemsMenu");
}

submitBtnFilter.addEventListener("click", function () {
  myTitle = filterTitle.value;
  myFilterArtists = filteredByArtists.value;
  myMaxPrice = maxPrice.value;
  myMinPrice = minPrice.value;
  myType = typeOfPainting.value;
  visitorsFilterPage.classList.toggle("move-right");
  initVisitorListingPage();
});

cancelBtnFilter.addEventListener("click", function () {
  visitorsFilterPage.classList.toggle("move-right");
});
