let timer = document.querySelector(".timer");
let itemWrapperDiv = document.querySelector(".zaRenderiranje");
let biddingAmountInput = document.querySelector("#biddingAmountInput");
let biddingBtn = document.querySelector("#biddingBtn");
let divForBidding = document.querySelector(".divForBidding");
localStorage.setItem("auctionBtnClicked", "0");
let divForRender;
let secondsCounter;
let biddingUl = document.createElement("ul");
biddingUl.classList.add("text-center", "list-unstyled");
let minutes = 0;
let seconds = 0;

function initauctionPage() {
  itemWrapperDiv.innerHTML = "";
  let localStorageName = localStorage.getItem("loged In");
  let artistName = document.querySelector(".artistNameAuction");
  divForRender = JSON.parse(localStorage.getItem("item for auction"));

  if (localStorage.getItem("loged In") === "Visitor") {
    if (localStorage.getItem("liveAution") === "true") {
      biddingAmountInput.value = Math.ceil(
        divForRender.price / 2 + parseInt(1)
      );
    }

    biddingBtn.removeAttribute("disabled");

    if (localStorage.getItem("dataIsBidding") === "false") {
      biddingBtn.setAttribute("disabled", true);
    }
  } else {
    artistName.innerText = localStorageName;
    biddingBtn.setAttribute("disabled", true);
  }

  if (localStorage.getItem("item for auction")) {
    let myitemImg = document.createElement("img");
    myitemImg.classList.add("itemImg");
    myitemImg.style.backgroundImage = `url(${divForRender.image})`;
    let itemDescriptionDiv = document.createElement("div");
    itemDescriptionDiv.classList.add("itemDescription");
    let h6 = document.createElement("h6");
    h6.innerText = divForRender.title;
    let small = document.createElement("small");
    small.innerText = divForRender.dateCreated.slice(0, 10);
    let p = document.createElement("p");
    p.innerText = divForRender.description;
    let span = document.createElement("span");
    span.innerText = "$ " + divForRender.price;
    itemDescriptionDiv.append(h6, small, p, span);
    itemWrapperDiv.append(myitemImg, itemDescriptionDiv);

    if (localStorage.getItem("auctionBtnClicked") === "0") {
      let counter = window.localStorage.getItem("timer for auction");
      secondsCounter = parseInt(counter);
      let myTimer = setInterval(function () {
        minutes = Math.floor(secondsCounter / 60);
        seconds = secondsCounter % 60;
        secondsCounter = secondsCounter - 1;
        window.localStorage.setItem("timer for auction", secondsCounter);
        if (localStorage.getItem("timer for auction") >= "0") {
          timer.innerText = `${minutes} min : ${seconds} sec`;
        } else if (minutes === 0 && seconds === 0) {
          timer.innerText = `Bidding is over `;
          let allAuctionBtn = document.querySelectorAll(".btnAuction");
          divForRender.dateSold = new Date()
            .toLocaleDateString("en-GB")
            .slice(0, 10);
          allAuctionBtn.forEach((element) => {
            element.removeAttribute("disabled");
          });
          localStorage.setItem("auctionBtnClicked", "0");
          localStorage.setItem("artistFirstLog", "1");
          localStorage.setItem("timer for auction", "0");
          localStorage.setItem("dataIsBidding", "false");
          localStorage.removeItem("liveAution");
          clearInterval(myTimer);
        }
      }, 1000);

      localStorage.setItem("auctionBtnClicked", "1");
      biddingBtn.addEventListener("click", onBiddingClick);
    }
  }
}

function onBiddingClick() {
  if (localStorage.getItem("timer for auction") > "0") {
    let amount = biddingAmountInput.value;
    if (amount > divForRender.price / 2) {
      let biddingLi = document.createElement("li");
      biddingLi.classList.add("myBid");
      biddingLi.innerHTML = `Your Bid: $ ${amount}`;
      biddingUl.prepend(biddingLi);
      divForBidding.appendChild(biddingUl);
      fetch("https://blooming-sierra-28258.herokuapp.com/bid", {
        method: "POST",
        body: JSON.stringify({ amount }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.isBidding) {
            secondsCounter = parseInt(secondsCounter) + parseInt(60);
            let biddingLi = document.createElement("li");
            biddingLi.classList.add("hisBid");
            biddingLi.innerHTML = `Current Bid: $ ${data.bidAmount}`;
            biddingUl.prepend(biddingLi);
            biddingAmountInput.value = `${data.bidAmount + 50}`;
            divForRender.priceSold = data.bidAmount;
            auctioningMoneyIncome.innerText = `$${data.bidAmount}`;
          } else {
            let biddingLi = document.createElement("li");
            biddingLi.classList.add("biddingDone");
            biddingLi.innerText = "Bidding Done";
            biddingUl.prepend(biddingLi);
            divForRender.dateSold = new Date()
              .toLocaleDateString("en-GB")
              .slice(0, 10);
            divForRender.isAuctioning = false;
            auctioningMoneyIncome.innerText = "Bidding Is Over";
            biddingAmountInput.value = "";
            localStorage.setItem("dataIsBidding", "false");
            biddingBtn.setAttribute("disabled", true);
          }
        });
    } else {
      alert(
        `The minimum bid is ${Math.ceil(divForRender.price / 2 + parseInt(1))}`
      );
    }
  }
}
