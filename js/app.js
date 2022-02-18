const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const gototop = document.getElementById("gototop");
const xhr = new XMLHttpRequest();
const newsContainer = document.getElementById("newsContainer");

let genre = "general";
let url = `https://saurav.tech/NewsAPI/top-headlines/category/${genre}/in.json`;

xhr.open("GET", url, true);

xhr.onload = function () {
  if (this.status === 200) {
    let json = JSON.parse(this.responseText);
    json["articles"].forEach((element) => {
      if (element["urlToImage"] != null) {
        newsContainer.innerHTML += `<div class="card mx-3 my-3 h-100" style="width: 18rem; display:inline-block;" id="newsArticle">
                                        <img src="${element["urlToImage"]}" class="card-img-top" alt="unable to load the images">
                                        <div class="card-body">
                                            <h5 class="card-title">${element["title"]}</h5>
                                            <p class="card-text">${element["description"]}</p>
                                            <a href="${element["url"]}" target="_blank" class="btn btn-outline-primary">Read more</a>
                                        </div>
                                 </div>`;
      }
    });
  } else {
    console.log("Some error occured");
  }
};

xhr.send();

function fun(newsType) {
  genre = newsType.innerText.toLowerCase();
  newsContainer.innerHTML = "";
  url = `https://saurav.tech/NewsAPI/top-headlines/category/${genre}/in.json`;
  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      json["articles"].forEach((element) => {
        if (element["urlToImage"] != null) {
          newsContainer.innerHTML += `<div class="card mx-3 my-3 h-100" style="width: 18rem; display:inline-block;" id="newsArticle">
                                        <img src="${element["urlToImage"]}" class="card-img-top" alt="unable to load the images">
                                        <div class="card-body">
                                            <h5 class="card-title">${element["title"]}</h5>
                                            <p class="card-text">${element["description"]}</p>
                                            <a href="${element["url"]}" target="_blank" class="btn btn-outline-primary">Read more</a>
                                        </div>
                                 </div>`;
        }
      });
    } else {
      console.log("Some error occured");
    }
  };
  xhr.send();
}

const textArray = ["Whatever I say shall be the truth."];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 500;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

gototop.addEventListener("click", () => {
  document.body.scrollTop = 0;
  console.log("click");
  document.documentElement.scrollTop = 0;
});
