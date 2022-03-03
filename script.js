const addBookButton = document.getElementById('addBookButton');
const addBookFormCancel = document.getElementById('addBookFormCancel');
const addBookModal = document.getElementById('addBookModal');
const addBookModalContent = document.getElementById('addBookModalContent');

let myLibrary = [];

function Book() {
  // the constructor...
}

function addBookToLibrary() {
  // do stuff here
}

addBookButton.addEventListener('click', (event) => {
  event.preventDefault();
  addBookModal.classList.add('open');

  // close the modal if you click anywhere outside of the content
  window.onclick = function (event) {
    if (event.target === addBookFormCancel || event.target === addBookModal) {
      addBookModal.classList.remove('open');
    }
  };
});
