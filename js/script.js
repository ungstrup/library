const myLibrary = [];

const libraryContainer = document.querySelector('.library');
const newBookBtn = document.querySelector('.new-book-btn');
const openDialog = document.querySelector('.new-book-dialog');
const addBookBtn = document.querySelector('.add-btn');
const closeDialogBtn = document.querySelector('.close-btn');

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
        let bookContent = document.createElement('p');
        bookContent.textContent=`Title: ${book.title}\r\nAuthor: ${book.author}\r\nPages: ${book.pages}\r\n${book.read ? "You have read this book" : "You have not read this book yet"}`;
        newBook.appendChild(bookContent);
        let removeButton = document.createElement('button');
        removeButton.classList.add('remove-btn');
        removeButton.textContent = 'Remove Book';
        newBook.appendChild(removeButton);
        removeButton.addEventListener('click', (e) => removeBook(e))
        let readButton = document.createElement('button');
        readButton.classList.add('read-btn');
        readButton.textContent = book.read ? 'Not read' : 'Read';
        readButton.addEventListener('click', (e) => readUpdate(e));
        newBook.appendChild(readButton);
});
};

function readUpdate(book) {
    let index = book.target.parentNode.dataset.book;
    myLibrary[index].readStatus();
    updateLibrary();
    
};

function removeBook(book) {
    let index = book.target.parentNode.dataset.book;
    libraryContainer.removeChild(book.target.parentNode)
    myLibrary.splice(index, 1);
    updateLibrary();
};

function addBook(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
    updateLibrary();
};

newBookBtn.addEventListener('click', () => {
    openDialog.showModal();
});

closeDialogBtn.addEventListener('click', () => {
    openDialog.close();
});

addBookBtn.addEventListener('click', () => {
    let title = document.getElementById('book-title').value;
    let author = document.getElementById('book-author').value;
    let pages = document.getElementById('book-pages').value;
    let read = (document.getElementById('book-isread').checked) ? true : false;
    addBook(title, author, pages, read);
});

updateLibrary();