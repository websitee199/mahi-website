const cards = document.querySelectorAll(".icon-card");
const infoText = document.getElementById("infoText");

cards.forEach(card => {

  card.addEventListener("mouseenter", () => {
    infoText.textContent = card.dataset.text;
  });

  card.addEventListener("mouseleave", () => {
    infoText.textContent = "Hover an icon";
  });

});
