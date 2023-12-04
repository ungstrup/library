let myLibrary = [];

if (localStorage.getItem("library") != null) JSON.parse(localStorage.getItem("library")).forEach(item => {
    myLibrary.push(new Book(item.title, item.author, item.pages, item.read));
});

const libraryContainer = document.querySelector('.library');
const newBookBtn = document.querySelector('.new-book-btn');
const openDialog = document.querySelector('.new-book-dialog');
const addBookBtn = document.querySelector('.add-btn');
const closeDialogBtn = document.querySelector('.close-btn');
const inputBoxes = document.querySelectorAll('input');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
};

Book.prototype.readStatus = function() {
    this.read = !this.read;
};   

function updateLibrary() {
    libraryContainer.innerHTML = "";
    myLibrary.forEach(book => {
        let newBook = document.createElement('div');
        newBook.classList.add('book');
        newBook.dataset.book = myLibrary.indexOf(book);
        libraryContainer.appendChild(newBook);
        generateContent(book, newBook);
        readBtn(newBook);
        removeBtn(newBook);
});
    localStorage.setItem("library", JSON.stringify(myLibrary));
};

function generateContent (book, content) {
    let keys = Object.keys(book);
        for (let i = 0; i < 4; i++) {
            let bookContent = document.createElement('p');
            if (keys[i] === "read") {
                bookContent.textContent=`Status: ${book[keys[i]] ? "Read" : "Not read yet"}`;
            } else {
            bookContent.textContent=`${keys[i].charAt(0).toUpperCase() + keys[i].slice(1)}: ${book[keys[i]]}`;
            };
            bookContent.classList.add(`book-${keys[i]}`);
            content.appendChild(bookContent);
        }
}

function readUpdate (book) {
    let index = book.target.parentNode.dataset.book;
    myLibrary[index].readStatus();
    updateLibrary();
};

function readBtn (book) {
    let readButton = document.createElement('button');
        readButton.classList.add('read-btn');
        readButton.textContent = 'Read status';
        readButton.addEventListener('click', (e) => readUpdate(e));
        book.appendChild(readButton);
};

function removeBook(book) {
    let index = book.target.parentNode.dataset.book;
    myLibrary.splice(index, 1);
    updateLibrary();
};

function removeBtn (book) {
    let removeButton = document.createElement('button');
        removeButton.classList.add('remove-btn');
        removeButton.textContent = 'Remove Book';
        book.appendChild(removeButton);
        removeButton.addEventListener('click', (e) => removeBook(e))
};

function addBook(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
    updateLibrary();
};

newBookBtn.addEventListener('click', () => {
    clearInput();
    openDialog.showModal();
});

closeDialogBtn.addEventListener('click', () => {
    openDialog.close();
});

function clearInput() {
    inputBoxes.forEach(input => {
        input.value = "";
    });
};

function bookInfo() {
    let title = document.getElementById('book-title').value;
    let author = document.getElementById('book-author').value;
    let pages = parseInt(document.getElementById('book-pages').value);
    let read = (document.getElementById('book-isread').checked) ? true : false;
    addBook(title, author, pages, read);
};

updateLibrary();