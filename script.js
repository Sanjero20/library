const editSVG = `<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20.1L20 10.1V8L14 2H6M13 3.5L18.5 9H13V3.5M20.1 13C20 13 19.8 13.1 19.7 13.2L18.7 14.2L20.8 16.3L21.8 15.3C22 15.1 22 14.7 21.8 14.5L20.5 13.2C20.4 13.1 20.3 13 20.1 13M18.1 14.8L12 20.9V23H14.1L20.2 16.9L18.1 14.8Z" /></svg>`;
const deleteSVG = `<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>`;

let myLibrary = [];

function Book(title, author, pages, status) {
  this.title  = title;
  this.author = author;
  this.pages  = pages;
  this.read   = status;

  this.HTMLTemplate = `
      <h2 class="title">${this.title}</h2>
      <hr>
      <p class="author"> By ${this.author}</p>
      <p class="pages">${this.pages} pages</p>
      <div class="read">Read</div>

      <section class="edit-book">
        <div id=editBook class="edit">${editSVG}</div>
        <div id="deleteBook" class="delete">${deleteSVG}</div>
      </section>
    `;

  this.createDiv = function() {
    const div = document.createElement("div");
    div.className = "book-info";
    div.innerHTML = this.HTMLTemplate
    return div;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book)
}

function updateLibrary() {
  const bookContainer = document.querySelector('.books');
  bookContainer.innerHTML = "";

  myLibrary.forEach(book => {
    const div = book.createDiv();
    bookContainer.appendChild(div)
  })

  editBooks();
}

function editBooks() {
  const books = document.querySelectorAll('.book-info')
  books.forEach(book => {
    const del = book.querySelector('#deleteBook');

    del.addEventListener('click', () => {
      //removes in book from the myLibrary array
      const title = book.querySelector('.title').textContent;
      const index = myLibrary.findIndex(obj => obj.title === title)
      myLibrary.splice(index, 1)
      
      updateLibrary()
    })

    // Add edit existing book eventlistener
  })
}

const $form   = document.getElementById('bookForm')
const addBook =  document.getElementById('addBook')
const books   = document.querySelector('.books');

const modal     = document.getElementById('myModal');
const cancelBtn = document.getElementById('cancel');
const overlay   = document.querySelector('.overlay');

const pages     = document.querySelector('.number');
const decrement = document.querySelector('.decrement');
const increment = document.querySelector('.increment');

const submit = document.querySelector('#submit');

// Prevent the site from refreshing when submit is clicked
$form.addEventListener('submit', (e) => {
  e.preventDefault();
})

addBook.onclick   = showModal;
cancelBtn.onclick = closePopUp;
decrement.onclick = decreasePageNumber;
increment.onclick = increasePageNumber;
submit.onclick    = submitForm;

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePopUp();
})


// Functions
function showModal() {
  modal.classList.add('show');
  overlay.classList.add('show');
}

function closePopUp() {
  resetForm();
  modal.classList.remove('show');
  overlay.classList.remove('show');
}

function decreasePageNumber() {
  if (pages.value == 0) return 
  let number = Number(pages.value) - 1;
  pages.value = number;
}

function increasePageNumber() {
  let number = Number(pages.value) + 1;
  pages.value = number;
}

function resetForm() {
  const inputs = document.querySelectorAll('input')
  inputs.forEach(input => {
    input.value = "";
    if (input.type == 'number') {
      input.value = 0;
    }
  })
}

function submitForm() {
  const book = retrieveFormData();
  if (!book) return
  addBookToLibrary(book);
  updateLibrary();
  resetForm();
  closePopUp();
}

function retrieveFormData() {
  // Returns an object consisting the datas
  const title  = document.querySelector('[name="title"]').value;
  const author = document.querySelector('[name="author"]').value;
  const pages  = document.querySelector('[name="pages"]').value;
  const status = document.querySelector('[name="read-status"]').checked;

  if (title === "" || author === "" || pages === 0) return;

  const bookInfo = new Book(title, author, pages, status);
  return bookInfo;
}