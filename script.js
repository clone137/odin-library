const newBookButton = document.getElementById('newBookButton');
const newBookFormCancel = document.getElementById('newBookFormCancel');
const newBookModal = document.getElementById('newBookModal');

let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}

newBookButton.addEventListener('click', (event) => {
  event.preventDefault();
  newBookModal.classList.add('open');

  // close the modal if you click anywhere outside of the content
  window.onclick = function (event) {
    if (event.target === newBookFormCancel || event.target === newBookModal) {
      newBookModal.classList.remove('open');
    }
  };
});
