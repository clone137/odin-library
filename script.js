const newBookButton = document.getElementById('newBookButton');
const newBookForm = document.getElementById('newBookForm');
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

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary() {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');
  const read = document.getElementById('read');

  console.log(read.checked);
  const newBook = new Book(
    title.value,
    author.value,
    pages.value,
    read.checked
  );

  myLibrary.push(newBook);
  closeNewBookModal();
}

function closeNewBookModal() {
  newBookModal.classList.remove('open');
}

newBookButton.addEventListener('click', (event) => {
  event.preventDefault();

  newBookForm.reset();

  newBookModal.classList.add('open');

  // close the modal if you click anywhere outside of the content
  window.onclick = function (event) {
    if (event.target === newBookFormCancel || event.target === newBookModal) {
      closeNewBookModal();
    }
  };
});

newBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addBookToLibrary();
  renderLibraryHTML();
});

function removeEventHandlers() {
  myLibrary.forEach((book, index) => {
    myLibrary[index].deleteButton = document.getElementById(`${index}`);
    myLibrary[index].deleteButton.removeEventListener(
      'click',
      deleteBookFromLibrary
    );
  });
}

const deleteBookFromLibrary = (event) => {
  const index = event.target.id;
  if (
    confirm(
      `Are you sure you want to delete "${myLibrary[index].title}" from the library?`
    )
  ) {
    myLibrary.splice(index, 1);
    removeEventHandlers();
    renderLibraryHTML();
  }
};

function renderLibraryHTML() {
  libraryContainer.innerHTML = '';
  myLibrary.forEach((book, index) => {
    const bookHtml = `
      <div class="bookCard" id="${index}">
        <div class="bookTitle"><strong>Title:</strong> ${book.title}</div>
        <div class="bookAuthor"><strong>Author:</strong> ${book.author}</div>
        <div class="bookPages"><strong>Pages:</strong> ${book.pages}</div>
        <div class="bookRead"><strong>Read:</strong> ${book.read}</div>
        <div class="bookDelete"><span class="material-icons-outlined md-36 delete-button" id="${index}">delete</span></div>
      </div>
      `;
    libraryContainer.insertAdjacentHTML('afterbegin', bookHtml);

    myLibrary[index].deleteButton = document.getElementById(`${index}`);
    myLibrary[index].deleteButton.addEventListener(
      'click',
      deleteBookFromLibrary
    );
  });
  if (myLibrary.length === 0) {
    libraryContainer.insertAdjacentHTML('afterbegin', `no books here`);
  }
  console.log(myLibrary);
}

renderLibraryHTML();
