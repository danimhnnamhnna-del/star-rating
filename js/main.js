const container = document.getElementById("star-container");
const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("rating-text");

let currentRating = 0;

function updateStars(rating, isHover) {
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    let value = i + 1;

    star.classList.remove("filled");
    star.classList.remove("half-filled");
    star.style.webkitTextFillColor = "";

    if (rating >= value) {
      star.classList.add("filled");
    } else if (rating > value - 1 && rating < value) {
      star.classList.add("half-filled");
    }
  }

  if (isHover === false) {
    setRatingText(rating);
  }
}

function setRatingText(rating) {
  if (rating === 0) {
    ratingText.innerText = "waiting your rating";
  } else if (rating <= 2) {
    ratingText.innerText = " (Poor)";
  } else if (rating <= 3.5) {
    ratingText.innerText = " (Good)";
  } else {
    ratingText.innerText = "(Excellent)";
  }
}

container.addEventListener("mousemove", function (e) {
  if (e.target.classList.contains("star")) {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let isHalf = x < rect.width / 2;

    let hoverValue = parseFloat(e.target.dataset.value);

    if (isHalf) {
      hoverValue = hoverValue - 0.5;
    }

    updateStars(hoverValue, true);
  }
});

container.addEventListener("mouseleave", function () {
  updateStars(currentRating, false);
});

container.addEventListener("click", function (e) {
  if (e.target.classList.contains("star")) {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let isHalf = x < rect.width / 2;

    let clickValue = parseFloat(e.target.dataset.value);

    if (isHalf) {
      currentRating = clickValue - 0.5;
    } else {
      currentRating = clickValue;
    }

    updateStars(currentRating, false);
  }
});
