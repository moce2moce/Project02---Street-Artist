function initLandingPage() {
  let dropMenu = document.querySelector("#artist");
  dropMenu.innerHTML = "";

  let optionMenu = document.createElement("option");
  optionMenu.setAttribute("disabled", true);
  optionMenu.setAttribute("selected", true);
  optionMenu.innerHTML = `Chose`;
  dropMenu.append(optionMenu);

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((artists) =>
      artists.forEach((artist) => {
        dropMenu.innerHTML += `<option value="${artist.name}">${artist.name}</option>`;
      })
    );

  dropMenu.addEventListener("change", function () {
    localStorage.setItem(
      "loged In",
      `${document.querySelector("#artist").value}`
    );
    location.hash = "#artistHomePage";
  });

  let visitorDiv = document.querySelector(".joinAsVisitorDiv");
  visitorDiv.addEventListener("click", function () {
    setTimeout(function () {
      localStorage.setItem("loged In", "Visitor");
      location.hash = "#visitorHomePage";
    }, 400);
  });
}

let filteredArtists = localStorage.getItem("loged In");
