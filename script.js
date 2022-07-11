let myLibrary = [];

function Book(title, author, pages, read) {
  this.title  = title;
  this.author = author;
  this.pages  = pages;
  this.read   = read;
}

function addBookToLibrary() {
  // do stuff here
}

const addBook =  document.getElementById('addBook')
const books = document.querySelector('.books');

addBook.addEventListener('click', () => {
  const div = document.createElement('div');
  div.classList.add('book-info');
  books.appendChild(div)
})