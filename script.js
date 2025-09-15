document.addEventListener("DOMContentLoaded", () => {

  class Book {
      #id;
      title;
      author;
       category;
       isAvailable;
    constructor(id, title, author, category, isAvailable = true) {
        this.#id=id;
      this.title = title;
      this.author = author;
      this.category = category;
      this.isAvailable = isAvailable;
    }
   
    getId(){
        return this.#id;
    }
   
   displayInfo(searchKeyword = "", categoryFilter = "") {
          const container = document.getElementById("booksContainer");
          container.innerHTML = "";}
    
    
    
  }
  class Library {
      constructor() {
        this.books = [];
        this.filteredBooks = []; 
      }
     getbooks(){
         return this.books;
     }
      addBook(book) {
        this.books.push(book);
        this.displayInfo();
      }
  
      removeBook(index) {
        this.books.splice(index, 1);
        this.displayInfo();
      }
  
      toggleAvailability(index) {
        this.books[index].isAvailable= !this.books[index].isAvailable;
        this.displayInfo();
      }
  
      searchBooks(keyword) {
        const lowerKeyword = keyword.toLowerCase();
        return this.books.filter(book =>
          book.title.toLowerCase().includes(lowerKeyword) ||
          book.author.toLowerCase().includes(lowerKeyword)
        );
      }
  
      filterByCategory(category) {
        if (!category) return this.books;
        return this.books.filter(book => book.category=== category);
      }
  
      displayInfo(searchKeyword = "", categoryFilter = "") {
        const container = document.getElementById("booksContainer");
        container.innerHTML = "";
  
        let booksToDisplay = this.books;
  
        if (searchKeyword) {
          booksToDisplay = this.searchBooks(searchKeyword);
        }
  
        if (categoryFilter) {
          booksToDisplay = booksToDisplay.filter(book => book.category === categoryFilter);
        }
  
        booksToDisplay.forEach((book, index) => {
          const card = document.createElement("div");
          card.classList.add("card");
  
          card.innerHTML = `
            <h3>${book.title}</h3>
            <p>المؤلف: ${book.author}</p>
            <p>التصنيف: ${book.category}</p>
            <p>الحالة: <strong>${book.isAvailable ?"متوفر" : "غير متوفر"}</strong></p>
            <button class="toggleBtn"> ${book.isAvailable ? "غير متاح" : "متاح"}</button>
            <button class="deleteBtn">حذف</button>
          `;
  
          card.querySelector(".deleteBtn").addEventListener("click", () => {
            this.removeBook(this.books.indexOf(book));
          });
  
          card.querySelector(".toggleBtn").addEventListener("click", () => {
            this.toggleAvailability(this.books.indexOf(book));
          });
  
          container.appendChild(card);
        });
      }
    }
  
    const myLibrary = new Library();
    
   
    document.getElementById("addBtn").addEventListener("click", () => {
      const title = document.getElementById("titleInput").value;
      const author = document.getElementById("authorInput").value;
      const category = document.getElementById("categoryInput").value;
  
      if (title && author && category) {
        const newBook = new Book(title, author, category);
        myLibrary.addBook(newBook);
  
        document.getElementById("titleInput").value = "";
        document.getElementById("authorInput").value = "";
        document.getElementById("categoryInput").value = "";
      } else {
        alert("يرجى إدخال كل الحقول!");
      }
    });
  
   
    document.getElementById("searchInput").addEventListener("input", (e) => {
      const keyword = e.target.value;
      const category = document.getElementById("categoryFilter").value;
      myLibrary.displayInfo(keyword, category);
    });
  
  
    document.getElementById("categoryFilter").addEventListener("change", (e) => {
      const category = e.target.value;
      const keyword = document.getElementById("searchInput").value;
      myLibrary.displayInfo(keyword, category);
    });
  
  });
 
class ReferenceBook extends Book{
 #locationcode;
  constructor(title, author, category, isAvailable,locationcode)
  {super(title, author, category, isAvailable);
  this.#locationcode=locationcode;}
  getLocationcode(){
    return this.#locationcode;}
  
  displayInfo(){

      return `
      <h3>${this.getTitle()}</h3>
            <p>المؤلف: ${this.author}</p>
            <p>التصنيف: ${this.category}</p>
            <p>الحالة: <strong>${this.isAvailable? "متوفر" : "غير متوفر"}</strong></p>
            <button class="toggleBtn">${this.isAvailable? "غير متاح" : "متاح"}</button>
           <p> reference book - code :${this.getLocationcode()}</p>
            <button class="deleteBtn">حذف</button>
          `;
      
  }

}
const ref = new ReferenceBook (null, "title", "author", "category","a-12");
ref.displayInfo();