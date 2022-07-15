const editSVG = `<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20.1L20 10.1V8L14 2H6M13 3.5L18.5 9H13V3.5M20.1 13C20 13 19.8 13.1 19.7 13.2L18.7 14.2L20.8 16.3L21.8 15.3C22 15.1 22 14.7 21.8 14.5L20.5 13.2C20.4 13.1 20.3 13 20.1 13M18.1 14.8L12 20.9V23H14.1L20.2 16.9L18.1 14.8Z" /></svg>`;
const deleteSVG = `<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>`;
const checkmark = `<svg style="width:35px;height:35px" viewBox="0 0 24 24"><path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>`
const wrongmark = `<svg style="width:35px;height:35px" viewBox="0 -1 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>`

let temporaryIndex = undefined;

let myLibrary = loadPreviousSession();
updateLibrary();

// Object
function Book(title, author, pages, status, readIcon, color) {
  this.title  = title;
  this.author = author;
  this.pages  = pages;
  this.read   = status;
  this.readIcon = readIcon;
  this.color = color;

  this.HTMLTemplate = `
      <h2 class="title">${this.title}</h2>
      <hr>
      <p class="author"> By ${this.author}</p>
      <p class="pages">${this.pages} pages</p>
      <button class="read">Read: <span style="color:${this.color}">${this.readIcon}</span></button>

      <section class="edit-book">
        <div id="editBook" class="edit">${editSVG}</div>
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

const $form   = document.getElementById('bookForm')
const addBook =  document.getElementById('addBook')
const books   = document.querySelector('.books');

const modal     = document.getElementById('myModal');
const cancelBtn = document.getElementById('cancel');
const overlay   = document.querySelector('.overlay');

const pages     = document.querySelector('.number');
const decrement = document.querySelector('.decrement');
const increment = document.querySelector('.increment');

const error = document.querySelector('.error-msg')
const submit = document.querySelector('#submit');

const inputTitle = document.querySelector('[name="title"]') 

// Prevent the site from refreshing when submit is clicked
$form.addEventListener('submit', (e) => {
  e.preventDefault();
})

decrement.onclick = decreasePageNumber;
increment.onclick = increasePageNumber;
submit.onclick    = submitForm;
overlay.onclick   = closePopUp;

inputTitle.addEventListener('keydown', () => {
  error.textContent = "";
})

addBook.onclick   = () => {
  resetForm();
  showModal();
}

cancelBtn.onclick = () => {
  closePopUp();
  resetForm(); 
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    resetForm();
    closePopUp();
  }
})


// Form Functions
function showModal() {
  submit.textContent = "Submit";
  modal.classList.add('show');
  overlay.classList.add('show');
}

function closePopUp() {
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
  temporaryIndex = undefined;
  error.textContent = "";
  const inputs = document.querySelectorAll('input')
  inputs.forEach(input => {
    input.value = "";
    if (input.type == 'number') {
      input.value = 0;
    }
    if (input.type == 'checkbox') {
      input.checked = false;
    }
  })
}

function submitForm() {
  const book = retrieveFormData();
  if (submit.textContent === "Submit") {
    if (!book) return
    addBookToLibrary(book);
    updateLibrary();
    closePopUp();
    resetForm();
  } 
  else if (submit.textContent === "Edit") {
    myLibrary.splice(temporaryIndex, 1, book);
    updateLibrary();
    closePopUp();
    resetForm();
  }
}

function retrieveFormData() {
  // Returns an object consisting the datas
  const title  = document.querySelector('[name="title"]').value.trim();
  const author = document.querySelector('[name="author"]').value.trim();
  const pages  = document.querySelector('[name="pages"]').value;
  const status = document.querySelector('[name="read-status"]').checked;

  myLibrary.forEach(bookTitle => {
    if (bookTitle.title.toLowerCase() === title.toLowerCase()) {
      error.textContent = `"${bookTitle.title}" is already in the list`
      document.querySelector('[name=title').value = "";
    }
  })

  if (title === "" || author === "" || pages === 0) return;

  let icon, color;
  if (status === true) {
    icon = checkmark;
    color = "green"
  }
  else {
    icon = wrongmark;
    color = "red"
  }

  const bookInfo = new Book(title, author, pages, status, icon, color);
  return bookInfo;
}

function autoInputForm(object, index) {
  const submit = document.querySelector('#submit');
  submit.textContent = "Edit";

  const title  = document.querySelector('[name="title"]');
  const author = document.querySelector('[name="author"]');
  const pages  = document.querySelector('[name="pages"]');
  const status = document.querySelector('[name="read-status"]');

  title.value    = object.title;
  author.value   = object.author;
  pages.value    = object.pages;
  status.checked = object.read;
}

// Library Functions
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
  saveToLocal();
}

// Book Functions
function updateHTMLContents(obj) {
  obj.HTMLTemplate = `
    <h2 class="title">${obj.title}</h2>
    <hr>
    <p class="author"> By ${obj.author}</p>
    <p class="pages">${obj.pages} pages</p>
    <button class="read">Read: <span style="color:${obj.color}">${obj.readIcon}</span></button>

    <section class="edit-book">
      <div id="editBook" class="edit">${editSVG}</div>
      <div id="deleteBook" class="delete">${deleteSVG}</div>
    </section>
  `
}

function editBooks() {
  const books = document.querySelectorAll('.book-info')
  books.forEach(book => {
    delBook(book);
    editBookInfo(book);
    updateReadStatus(book);
  })
}

function delBook(book) {
  const del = book.querySelector('#deleteBook');
    del.addEventListener('click', () => {
      // Remove Book From the library Array
      const title = book.querySelector('.title').textContent;
      const index = myLibrary.findIndex(obj => obj.title === title)
      myLibrary.splice(index, 1)
      updateLibrary()
    })
}

function editBookInfo(book) {
  const edit = book.querySelector('#editBook');
    edit.addEventListener('click', () => {
      const title = book.querySelector('.title').textContent;
      const index = myLibrary.findIndex(obj => obj.title === title)
      temporaryIndex = index;
      showModal();
      autoInputForm(myLibrary[index], index);
    })
}

function updateReadStatus(book) {
  const btn = book.querySelector('.read') 
    btn.addEventListener('click', () => {
      btn.classList.add('active')

      const title = book.querySelector('.title').textContent;
      const index = myLibrary.findIndex(obj => obj.title === title)

      let bookObj = myLibrary[index];
      if (bookObj.read === true) {
        bookObj.read = false;
        bookObj.readIcon = wrongmark;
        bookObj.color = "red"
      }
      else {
        bookObj.read = true;
        bookObj.readIcon = checkmark;
        bookObj.color = "green"
      }

      updateHTMLContents(bookObj);
      updateLibrary();
    })
}

// Save to local storage
function saveToLocal() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
}

function loadPreviousSession() {
  const books = JSON.parse(localStorage.getItem("myLibrary"))
  let library;

  if (books) {
    library = books.map((book) => JSONToArray(book))   
  }
  else {
    library = []
  }

  return library
}

function JSONToArray(book) {
  return new Book(book.title, book.author, book.pages, book.read, book.readIcon, book.color)
}