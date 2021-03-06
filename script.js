const newBookButton = document.getElementById('newBookButton');
const newBookForm = document.getElementById('newBookForm');
const newBookFormCancel = document.getElementById('newBookFormCancel');
const newBookModal = document.getElementById('newBookModal');
const libraryContainer = document.getElementById('libraryContainer');

let myLibrary = [];

const myStaticLibrary = [
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
  toggleRead() {
    this.read = !this.read;
  }
}

// save to localStorage
function updateLocalStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// fetch from localStorage
function fetchFromLocalStorage() {
  let cacheLibrary;

  if (localStorage.getItem('myLibrary')) {
    cacheLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  } else {
    cacheLibrary = myStaticLibrary;
  }

  // recreating objects with new because the objects loaded from localStorage were missing the toggleRead method (why?)
  cacheLibrary.forEach((book, index) => {
    const newBook = new Book(
      cacheLibrary[index].title,
      cacheLibrary[index].author,
      cacheLibrary[index].pages,
      cacheLibrary[index].read
    );
    myLibrary.push(newBook);
  });
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
  updateLocalStorage();
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
  const index = event.target.id.replace('delete', '');
  if (
    confirm(
      `Are you sure you want to delete "${myLibrary[index].title}" from the library?`
    )
  ) {
    myLibrary.splice(index, 1);
    updateLocalStorage();
    removeEventHandlers();
    renderLibraryHTML();
  }
};

const toogleBookRead = (event) => {
  const index = event.target.id.replace('toggle', '');
  myLibrary[index].toggleRead();
  updateLocalStorage();
  removeEventHandlers();
  renderLibraryHTML();
};

function renderLibraryHTML() {
  libraryContainer.innerHTML = '';
  myLibrary.forEach((book, index) => {
    let bookRead = book.read === true ? 'Read' : 'Unread';
    let bookReadIcon = book.read === true ? 'book' : 'menu_book';
    const bookHtml = `
      <div class="bookCard" id="${index}">
        <div>
          <div class="bookTitle">${book.title}</div>
          <div class="bookAuthor">by <strong>${book.author}</strong></div>
        </div>
        <div>
          <div class="bookInfo"><span>${book.pages} pages</span><span class="readInfo toggle-button ${bookRead}" id="toggle${index}">${bookRead}</span></div>
          <div class="bookDelete"><span class="material-icons-outlined md-24 delete-button" id="delete${index}">delete</span></div>
        </div>
      </div>
      `;
    libraryContainer.insertAdjacentHTML('beforeend', bookHtml);

    myLibrary[index].deleteButton = document.getElementById(`delete${index}`);
    myLibrary[index].deleteButton.addEventListener(
      'click',
      deleteBookFromLibrary
    );
    myLibrary[index].toggleButton = document.getElementById(`toggle${index}`);
    myLibrary[index].toggleButton.addEventListener('click', toogleBookRead);
  });
  if (myLibrary.length === 0) {
    libraryContainer.insertAdjacentHTML('afterbegin', `no books here`);
  }
  console.log(myLibrary);
}

// localStorage.clear();
fetchFromLocalStorage();
renderLibraryHTML();
