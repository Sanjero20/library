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

// addBook.addEventListener('click', () => {
//   const div = document.createElement('div');
//   div.classList.add('book-info');
//   books.appendChild(div)
// })

// Modal popup
const closeBtn = document.getElementById('cancel');
const modal = document.getElementById('myModal');

addBook.addEventListener('click', () => {
  modal.classList.add('show')
})

closeBtn.addEventListener('click', () => {
  modal.classList.remove('show')
})

// Page number 
const pages = document.querySelector('.number');
const decrement = document.querySelector('.decrement');
const increment = document.querySelector('.increment');

decrement.addEventListener('click', () => {
  if (pages.value == 0) return 
  let number = Number(pages.value) - 1;
  pages.value = number;
})

increment.addEventListener('click', () => {
  let number = Number(pages.value) + 1;
  pages.value = number;
})
