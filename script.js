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

const $form   = document.getElementById('bookForm')
const addBook =  document.getElementById('addBook')
const books   = document.querySelector('.books');

const modal     = document.getElementById('myModal');
const cancelBtn = document.getElementById('cancel');

const pages     = document.querySelector('.number');
const decrement = document.querySelector('.decrement');
const increment = document.querySelector('.increment');

const submit = document.querySelector('#submit');

// Prevent the site from refreshing when submit is clicked
$form.addEventListener('submit', (e) => {
  e.preventDefault();
})

// Modal popup
addBook.addEventListener('click', () => {
  modal.classList.add('show')
})

cancelBtn.addEventListener('click', () => {
  resetForm();
  modal.classList.remove('show')
})

// Page number buttons
decrement.addEventListener('click', () => {
  if (pages.value == 0) return 
  let number = Number(pages.value) - 1;
  pages.value = number;
})

increment.addEventListener('click', () => {
  let number = Number(pages.value) + 1;
  pages.value = number;
})

// Submit button create a new book 
submit.addEventListener('click', () => {
  retrieveFormData();
  resetForm();
})


// Functions
function resetForm() {
  const inputs = document.querySelectorAll('input')
  inputs.forEach(input => {
    input.value = "";
    if (input.type == 'number') {
      input.value = 0;
    }
  })
}

function retrieveFormData() {
  // Returns an object consisting the datas
  const title  = document.querySelector('[name="title"]').value;
  const author = document.querySelector('[name="author"]').value;
  const pages  = document.querySelector('[name="pages"]').value;
  const status = document.querySelector('[name="read-status"]').checked;

  if (title === "" || author === "" || pages === 0) return;

  const bookInfo = new Book(title, author, pages, status);
  console.log(bookInfo)
}