const addBookButton = document.getElementById('addBookButton');
const addBookModal = document.getElementById('addBookModal');

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
  const addBookFormCancel = document.getElementById('addBookFormCancel');
  addBookFormCancel.addEventListener('click', (event) => {
    event.preventDefault();
    addBookModal.classList.remove('open');
  });
});
