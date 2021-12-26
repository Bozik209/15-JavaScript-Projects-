// select modal-btn,modal-overlay,close-btn
const openBtn = document.querySelector(".modal-btn");
const modalBtn = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-btn");

// listen for click events on modal-btn and close-btn
openBtn.addEventListener("click", function () {
  // when user clicks modal-btn add .open-modal to modal-overlay
  modalBtn.classList.add("open-modal");
});

closeBtn.addEventListener("click", function () {
  // when user clicks close-btn remove .open-modal from modal-overlay
  modalBtn.classList.remove("open-modal");
});
