const newBookButton = document.getElementById('newBookButton');
const newBookFormCancel = document.getElementById('newBookFormCancel');
const newBookModal = document.getElementById('newBookModal');
const libraryContainer = document.getElementById('libraryContainer');

let myLibrary = [
  { title: 'The Stand', author: 'Stephen King', pages: '823', read: true },
  {
    title: 'Fire & Blood',
    author: 'George R. R. Martin',
    pages: '736',
    read: false,
  },
  {
    title: 'Monstrous Regiment',
    author: 'Terry Pratchett',
    pages: '823',
    read: false,
  },
  {
    title: 'The Hobbit',
    author: 'J. R. R. Tolkien',
    pages: '310',
    read: true,
  },
];

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

function renderLibraryHtml() {
  libraryContainer.innerHTML = '';
  myLibrary.forEach((book) => {
    const bookHtml = `
      <div class="bookCard">
        <div class="bookTitle"><p>Title: ${book.title}</p></div>
        <div class="bookAuthor"><p>Author: ${book.author}</p></div>
        <div class="bookPages"><p>Pages: ${book.pages}</p></div>
        <div class="bookRead"><p>Read: ${book.read}</p></div>
      </div>
      `;
    libraryContainer.insertAdjacentHTML('afterbegin', bookHtml);
  });
}

renderLibraryHtml();
