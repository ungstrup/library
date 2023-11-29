const myLibrary = [{title: "The Hobbit", author: "J.R.R. Tolkien", pages: 295, read: true}, {title: "A Dance of Dragons", author: "G.R.R. Martin", pages: 354, read: false}];

const libraryContainer = document.querySelector('.library');
const newBookBtn = document.querySelector('.new-book-btn');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = Boolean(read);
};

function updateLibrary() {
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
});
};

function removeBook(book){
    let index = book.target.parentNode.dataset.book;
    libraryContainer.removeChild(book.target.parentNode)
    myLibrary.splice(index, 1);
    console.log(myLibrary);
};

function addBook() {
    
    myLibrary.push(new Book(title, author, pages, read));
    updateLibrary();
};

newBookBtn.addEventListener('click', () => {
    addBook();     
});

updateLibrary();