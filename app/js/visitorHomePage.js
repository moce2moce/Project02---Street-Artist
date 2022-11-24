function initVisitorHomePage() {
  let myFistDiv = document.querySelector(".marquee-content");
  let mySecondDiv = document.querySelector(".marquee-content.left-to-right");
  const root = document.documentElement;

  const marqueeContent = document.querySelector("ul.marquee-content");

  root.style.setProperty("--marquee-elements", marqueeContent.children.length);

  function renderPicture(elDiv) {
    items.forEach((artist) => {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.href = "#visitorListingPage";
      let img = document.createElement("img");
      img.srcset = `${artist.image}`;
      a.append(img);
      li.append(a);
      elDiv.append(li);
    });
  }
  renderPicture(myFistDiv);
  renderPicture(mySecondDiv);
}
